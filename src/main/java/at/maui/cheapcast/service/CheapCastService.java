/*
 * Copyright 2013 Sebastian Mauer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package at.maui.cheapcast.service;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.IBinder;
import android.os.RemoteException;
import android.preference.PreferenceManager;
import android.support.v4.app.NotificationCompat;
import android.util.Log;
import at.maui.cheapcast.Const;
import at.maui.cheapcast.Installation;
import at.maui.cheapcast.R;
import at.maui.cheapcast.Utils;
import at.maui.cheapcast.activity.CastActivity;
import at.maui.cheapcast.activity.PreferenceActivity;
import at.maui.cheapcast.chromecast.*;
import at.maui.cheapcast.chromecast.model.AppRegistration;
import at.maui.cheapcast.ssdp.SSDP;
import com.google.analytics.tracking.android.ExceptionReporter;
import com.google.analytics.tracking.android.GAServiceManager;
import com.google.analytics.tracking.android.GoogleAnalytics;
import com.google.analytics.tracking.android.Tracker;
import com.google.gson.Gson;
import org.eclipse.jetty.server.AbstractHttpConnection;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.AbstractHandler;
import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketHandler;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.NetworkInterface;
import java.util.HashMap;

public class CheapCastService extends Service {

    public static final String LOG_TAG = "CheapCastService";
    private NotificationManager mNotificationManager;
    private HashMap<String, App> mRegisteredApps;

    private WifiManager mWifiManager;
    private NetworkInterface mNetIf;
    private WifiManager.MulticastLock mMulticastLock;

    private SSDP mSsdp;
    private Server mServer;

    private Gson mGson;
    private SharedPreferences mPreferences;
    private Tracker mGaTracker;
    private GoogleAnalytics mGoogleAnalytics;
    private boolean mRunning = false;
    private ICheapCastCallback mCallback;
    private App mLastApp;

    private final ICheapCastService.Stub mBinder = new ICheapCastService.Stub() {
        @Override
        public void addListener(ICheapCastCallback cb) throws RemoteException {
            mCallback = cb;
        }

        @Override
        public void removeListener() throws RemoteException {
            mCallback = null;
        }
    };

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(LOG_TAG, "onCreate()");

        mWifiManager = (WifiManager)getSystemService(Context.WIFI_SERVICE);
        mNetIf = Utils.getActiveNetworkInterface(mWifiManager);

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
            mPreferences = getSharedPreferences("cheapcast", MODE_PRIVATE | MODE_MULTI_PROCESS);
        } else {
            mPreferences = getSharedPreferences("cheapcast", MODE_PRIVATE);
        }
        Log.d(LOG_TAG, String.format("Starting up: friendlyName: %s", mPreferences.getString("friendly_name","CheapCasto")));
        mGson = new Gson();

        mGoogleAnalytics = GoogleAnalytics.getInstance(this);
        mGaTracker = mGoogleAnalytics.getTracker(getString(R.string.ga_trackingId));
        mGoogleAnalytics.setAppOptOut(mPreferences.getBoolean("analytics", false));

        Thread.UncaughtExceptionHandler myHandler = new ExceptionReporter(
                mGaTracker,                                        // Currently used Tracker.
                GAServiceManager.getInstance(),                   // GAServiceManager singleton.
                Thread.getDefaultUncaughtExceptionHandler(), this);     // Current default uncaught exception handler.


        mGaTracker.sendEvent("CheapCastService","ServiceStart", null,null);

        mRegisteredApps = new HashMap<String, App>();
        registerApp(new App("ChromeCast", "https://www.gstatic.com/cv/receiver.html?$query"));
        registerApp(new App("YouTube", "https://www.youtube.com/tv?$query"));
        registerApp(new App("PlayMovies", "https://play.google.com/video/avi/eureka?$query", new String[]{"play-movies", "ramp"}));
        registerApp(new App("GoogleMusic", "https://play.google.com/music/cast/player"));

        registerApp(new App("GoogleCastSampleApp", "http://anzymrcvr.appspot.com/receiver/anzymrcvr.html"));
        registerApp(new App("GoogleCastPlayer", "https://www.gstatic.com/eureka/html/gcp.html"));
        registerApp(new App("Fling", "$query"));
        registerApp(new App("TicTacToe", "http://www.gstatic.com/eureka/sample/tictactoe/tictactoe.html", new String[]{"com.google.chromecast.demo.tictactoe"}));
    }

    private void registerApp(App app) {
        mRegisteredApps.put(app.getName(), app);
        Log.d(LOG_TAG, String.format("Registered app: %s",app.getName()));
    }

    public void renderAppStatus(HttpServletResponse httpServletResponse, App app) throws IOException {

        String appDesc = Const.APP_INFO;
        appDesc = appDesc.replaceAll("#name#", app.getName());
        appDesc = appDesc.replaceAll("#connectionSvcURL#", app.getConnectionSvcURL());
        appDesc = appDesc.replaceAll("#protocols#", app.getProtocols());
        appDesc = appDesc.replaceAll("#state#", app.getState());
        appDesc = appDesc.replaceAll("#link#", app.getLink());

        httpServletResponse.setContentType("application/xml;charset=utf-8");
        httpServletResponse.setHeader("Access-Control-Allow-Method", "GET, POST, DELETE, OPTIONS");
        httpServletResponse.setHeader("Access-Control-Expose-Headers", "Location");
        httpServletResponse.setHeader("Cache-control", "no-cache, must-revalidate, no-store");
        httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        httpServletResponse.getWriter().print(appDesc);
    }

    public App getApp(String appName) {
        return mRegisteredApps.get(appName);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(LOG_TAG, "onStartCommand()");

        Notification n = null;
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            Notification.Builder mBuilder = new Notification.Builder(this)
                .setSmallIcon(R.drawable.ic_service)
                .setContentTitle("CheapCast")
                .setContentText("Service enabled.")
                .setOngoing(true)
                .addAction(R.drawable.ic_reload, getString(R.string.restart_service), PendingIntent.getBroadcast(this, 1, new Intent(Const.ACTION_RESTART), PendingIntent.FLAG_ONE_SHOT))
                .addAction(R.drawable.ic_stop, getString(R.string.stop_service), PendingIntent.getBroadcast(this, 2, new Intent(Const.ACTION_STOP), PendingIntent.FLAG_ONE_SHOT));

            Intent i = new Intent(this, PreferenceActivity.class);
            i.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);

            PendingIntent pi = PendingIntent.getActivity(this, 0, i, 0);
            mBuilder.setContentIntent(pi);
            n = mBuilder.build();
        } else {
            Intent i = new Intent(this, PreferenceActivity.class);
            i.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);

            PendingIntent pi = PendingIntent.getActivity(this, 0, i, 0);

            NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(this)
                .setSmallIcon(R.drawable.ic_service)
                .setContentTitle("CheapCast")
                .setContentText("Service enabled.")
                .setOngoing(true)
                .setContentIntent(pi);
            n = mBuilder.getNotification();
        }

        startForeground(1337, n);

        if(!mRunning)
            initService();

        return START_STICKY;
    }

    private void initService() {

        if(mWifiManager != null){
            mMulticastLock = mWifiManager.createMulticastLock("SSDP");
            mMulticastLock.acquire();
        }

        try {
            mServer = new Server(8008);
            mServer.setSendDateHeader(true);
            mServer.setSendServerVersion(false);

            mServer.setHandler(mWsHandler);
            mWsHandler.setHandler(mHttpHandler);
            mServer.start();

            Log.d(LOG_TAG, "Initialized HTTP/WS Server");
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }


        try {
            mSsdp = new SSDP(this);
            mSsdp.start();
            Log.d(LOG_TAG, "Initialized SSDP/DIAL Discovery");
        } catch (IOException e) {
            Log.e(LOG_TAG, "SSDP Init failed", e);
        }

        mRunning = true;
    }

    @Override
    public void onDestroy() {
        Log.d(LOG_TAG, "onDestroy()");

        mGaTracker.sendEvent("CheapCastService","ServiceStop", null,null);

        mSsdp.shutdown();

        try {
            mServer.stop();
        } catch (Exception e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        stopForeground(true);
    }

    private WebSocketHandler mWsHandler = new WebSocketHandler() {

        @Override
        public WebSocket doWebSocketConnect(HttpServletRequest httpServletRequest, String protocol) {
            Log.d(LOG_TAG,"WS Requested "+ httpServletRequest.getPathInfo());

            if(httpServletRequest.getPathInfo().equals("/system/control")) {
                return new SystemControlSocket(CheapCastService.this);
            } else if(httpServletRequest.getPathInfo().equals("/connection")) {
                return new ConnectionSocket(CheapCastService.this);
            } else if(httpServletRequest.getPathInfo().startsWith("/session/")) {
                String appName = httpServletRequest.getPathInfo().replace("/session/","");
                return new SessionSocket(CheapCastService.this, getApp(appName));
            } else if(httpServletRequest.getPathInfo().startsWith("/receiver/")) {
                String appName = httpServletRequest.getPathInfo().replace("/receiver/","");
                return new ReceiverSocket(CheapCastService.this, getApp(appName));
            } else {
                Log.e(LOG_TAG, "WS FAIL");
            }

            return null;  //To change body of implemented methods use File | Settings | File Templates.
        }
    };

    private Handler mHttpHandler = new AbstractHandler() {
        @Override
        public void handle(String s, Request request, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException, ServletException {
            String server = Utils.getLocalV4Address(mNetIf).getHostAddress();
            httpServletResponse.setHeader("Access-Control-Allow-Origin","*");

            if(httpServletRequest.getPathInfo().startsWith("/ssdp/device-desc.xml") && httpServletRequest.getMethod().equals("GET")) {
                Log.d(LOG_TAG, "GET /ssdp/device-desc.xml" + " from "+httpServletRequest.getRemoteAddr() + ", "+httpServletRequest.getHeader("User-Agent"));

                String deviceDesc = Const.DEVICE_DESC;
                deviceDesc = deviceDesc.replaceAll("#uuid#", Installation.id(CheapCastService.this));
                deviceDesc = deviceDesc.replaceAll("#friendlyname#", mPreferences.getString("friendly_name", getString(R.string.cheapcast)+"_"+Build.MODEL));
                deviceDesc = deviceDesc.replaceAll("#base#", "http://"+server+":8008");

                httpServletResponse.setHeader("Access-Control-Allow-Method", "GET, POST, DELETE, OPTIONS");
                httpServletResponse.setHeader("Access-Control-Expose-Headers", "Location");

                httpServletResponse.setContentType("application/xml");
                httpServletResponse.setStatus(HttpServletResponse.SC_OK);
                httpServletResponse.addHeader("Application-URL", "http://"+server+":8008/apps");
                httpServletResponse.getWriter().print(deviceDesc);
            } else if(httpServletRequest.getPathInfo().equals("/apps") && httpServletRequest.getMethod().equals("GET")) {

                App activeApp = null;
                for(App app : mRegisteredApps.values()) {
                    if(app.getState().equals("running")) {
                        activeApp = app;
                        break;
                    }
                }

                if(activeApp != null) {
                    Log.d(LOG_TAG, String.format("GET /apps: Redirecting to %s", activeApp.getName()));
                    httpServletResponse.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
                    httpServletResponse.addHeader("Location", String.format("http://%s:8008/apps/%s", server, activeApp.getName()));
                } else {
                    Log.d(LOG_TAG, String.format("GET /apps: SC_NO_CONTENT at /apps"));
                    httpServletResponse.setStatus(HttpServletResponse.SC_NO_CONTENT);
                    httpServletResponse.setContentType("application/xml;charset=utf-8");
                    httpServletResponse.setHeader("Access-Control-Allow-Method", "GET, POST, DELETE, OPTIONS");
                    httpServletResponse.setHeader("Access-Control-Expose-Headers", "Location");
                }
            } else if(httpServletRequest.getPathInfo().startsWith("/apps/") && httpServletRequest.getMethod().equals("GET")) {
                String appName = httpServletRequest.getPathInfo().replace("/apps/","");
                Log.d(LOG_TAG, String.format("GET /apps/%s",appName));
                App app = mRegisteredApps.get(appName);

                renderAppStatus(httpServletResponse, app);
            } else if(httpServletRequest.getPathInfo().startsWith("/apps/") && httpServletRequest.getMethod().equals("DELETE")) {
                String appName = httpServletRequest.getPathInfo().replace("/apps/","").replace("/web-1","");
                App app = mRegisteredApps.get(appName);

                if(app != null) {
                    app.stop();

                    mGaTracker.sendEvent("CheapCastService","AppStop", appName, null);

                    if(mCallback != null && app.getReceivers().size() == 0)
                        try {
                            mCallback.onAppStopped(appName);
                        } catch (RemoteException e) {
                            e.printStackTrace();
                        }

                    renderAppStatus(httpServletResponse, app);
                }
            } else if(httpServletRequest.getPathInfo().startsWith("/apps/") && httpServletRequest.getMethod().equals("POST")) {
                String appName = httpServletRequest.getPathInfo().replace("/apps/","");


                Log.d(LOG_TAG, String.format("POST /apps/%s",appName));
                App app = mRegisteredApps.get(appName);

                if(app != null) {

                   // if(mLastApp == null || !mLastApp.equals(app) || !app.getState().equals("running")) {
                        mGaTracker.sendEvent("CheapCastService","AppStart", appName, null);
                        app.setLink("<link rel='run' href='web-1'/>");
                        app.setConnectionSvcURL(String.format("http://%s:8008/connection/%s", server, appName));
                        app.addProtocol("ramp");
                        app.setState("running");

                        String params = Utils.readerToString(httpServletRequest.getReader());

                        Log.d(LOG_TAG, "Addtl. App params: "+ params);
                        String appUrl = app.getReceiverUrl().replace("$query", params);
                        //Intent i = new Intent(Intent.ACTION_VIEW, null);
                        //i.setComponent(ComponentName.unflattenFromString("com.android.chrome/com.android.chrome.Main"));
                        //i.addCategory("android.intent.category.LAUNCHER");
                        Intent i = new Intent(CheapCastService.this, CastActivity.class);
                        i.setData(Uri.parse(appUrl));
                        i.putExtra(Const.APP_EXTRA, app.getName());
                        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        //if(mCallback == null) {
                            startActivity(i);
                        //}

                        mLastApp = app;

                        httpServletResponse.setContentType("text/html; charset=utf-8");
                        httpServletResponse.setHeader("Location", String.format("http://%s:8008/apps/%s/web-1", server, appName));
                        httpServletResponse.setStatus(HttpServletResponse.SC_CREATED);
                   /* } else {
                        Log.d(LOG_TAG, String.format("App %s already started.", app.getName()));

                        httpServletResponse.setContentType("text/html; charset=utf-8");
                        httpServletResponse.setHeader("Location", String.format("http://%s:8008/apps/%s/web-2", server, appName));
                        httpServletResponse.setStatus(HttpServletResponse.SC_CREATED);
                    }*/

                }
            } else if(httpServletRequest.getPathInfo().startsWith("/connection/") && httpServletRequest.getMethod().equals("POST")) {
                String appName = httpServletRequest.getPathInfo().replace("/connection/","");
                Log.d(LOG_TAG, String.format("POST /connection/%s",appName));
                App app = mRegisteredApps.get(appName);

                if(app != null) {
                    httpServletResponse.setHeader("Access-Control-Allow-Method", "POST, OPTIONS");
                    httpServletResponse.setHeader("Access-Control-Allow-Headers", "Content-Type");
                    httpServletResponse.setContentType("application/json; charset=utf-8");
                    httpServletResponse.setStatus(HttpServletResponse.SC_OK);
                    httpServletResponse.getWriter().print(String.format("{\"URL\":\"ws://%s:8008/session/%s?%d\",\"pingInterval\":3}", server, appName, app.getRemotes().size()));
                }
            } else if(httpServletRequest.getPathInfo().equals("/registerApp") && httpServletRequest.getMethod().equals("POST")) {

                Log.d(LOG_TAG, "POST /registerApp/");

                if(mPreferences.getBoolean("allow_custom_apps", false)) {
                    String rawBody = Utils.readerToString(httpServletRequest.getReader());
                    AppRegistration reg = mGson.fromJson(rawBody, AppRegistration.class);

                    if(reg != null) {
                        mGaTracker.sendEvent("CheapCastService","RegisterApp", reg.getAppName(),null);
                        registerApp(new App(reg.getAppName(), reg.getAppUrl(), reg.getProtocols()));
                        httpServletResponse.setStatus(HttpServletResponse.SC_OK);
                        httpServletResponse.setContentType("application/json; charset=utf-8");
                        httpServletResponse.getWriter().print("{\"msg\":\"OK\"}");
                    } else {
                        httpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    }
                } else {
                    httpServletResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
                }

            } else {
                Log.d(LOG_TAG,"Requested "+ httpServletRequest.getPathInfo());
                Log.d(LOG_TAG,"The princess is in another castle");
                httpServletResponse.setContentType("text/html");
                httpServletResponse.setStatus(HttpServletResponse.SC_OK);
                httpServletResponse.getWriter().println("<h1>This is CheapCast :D</h1>");

                if(mPreferences.getBoolean("allow_custom_apps", false)) {
                    httpServletResponse.getWriter().println("<h3>Registered Apps:</h3>");
                    httpServletResponse.getWriter().print("<ul>");
                    for(App app : mRegisteredApps.values()) {
                        httpServletResponse.getWriter().println(String.format("<li>%s - %s, Protocols: %s</li>", app.getName(), app.getReceiverUrl(), app.getProtocolList()));
                    }
                    httpServletResponse.getWriter().print("</ul>");
                }
            }

            AbstractHttpConnection connection = AbstractHttpConnection.getCurrentConnection();
            String ct = connection.getResponseFields().getStringField("Content-Type");
            if(ct.contains(";")) {
                AbstractHttpConnection.getCurrentConnection().getResponseFields().put("Content-Type", ct.split(";")[0]);
            }

            ((Request) httpServletRequest).setHandled(true);
        }
    };

}
