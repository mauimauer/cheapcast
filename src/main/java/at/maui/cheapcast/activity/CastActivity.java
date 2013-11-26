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

package at.maui.cheapcast.activity;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.*;
import android.util.Log;
import android.view.*;
import android.webkit.*;
import at.maui.cheapcast.App;
import at.maui.cheapcast.Const;
import at.maui.cheapcast.R;
import at.maui.cheapcast.service.CheapCastService;
import at.maui.cheapcast.service.ICheapCastCallback;
import at.maui.cheapcast.service.ICheapCastService;
import at.maui.cheapcast.ws.WebSocketFactory;

import java.io.IOException;


public class CastActivity extends Activity {

    public static final String LOG_TAG = "CastActivity";
    public static final String LOG_TAG_JS = "JS-CastActivity";

    private WebView mWebView;
    private Runnable mPatch;
    private Handler mHandler = new Handler();
    private PowerManager mPowerManager;
    private PowerManager.WakeLock mWakeLock;

    private ICheapCastService mCheapCastService;
    private ServiceConnection mConnection = new ServiceConnection() {
        // Called when the connection with the service is established
        public void onServiceConnected(ComponentName className, IBinder service) {
            Log.d(LOG_TAG, "Connected to CheapCastService");
            mCheapCastService = ICheapCastService.Stub.asInterface(service);
            try {
                mCheapCastService.addListener(mCallback);
            } catch (RemoteException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            load();
        }

        // Called when the connection with the service disconnects unexpectedly
        public void onServiceDisconnected(ComponentName className) {
            Log.d(LOG_TAG, "Disconnected from CheapCastService");
            mCheapCastService = null;
            CastActivity.this.finish();
        }
    };

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);    //To change body of overridden methods use File | Settings | File Templates.
        Log.d(LOG_TAG, "onNewIntent()");


        injectWebsocket(mWebView);
        mWebView.loadUrl(intent.getDataString());
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // remove title
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_cast);

        mPowerManager = (PowerManager) getSystemService(POWER_SERVICE);
        mWakeLock = mPowerManager.newWakeLock(PowerManager.ACQUIRE_CAUSES_WAKEUP | PowerManager.FULL_WAKE_LOCK | PowerManager.ON_AFTER_RELEASE, "cheapcast");
        mWakeLock.acquire();

        mWebView = (WebView)findViewById(R.id.webView);

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            mWebView.getSettings().setAllowFileAccessFromFileURLs(true);
            mWebView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        }

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
            mWebView.getSettings().setAllowContentAccess(true);
        }

        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.getSettings().setDomStorageEnabled(true);
        mWebView.getSettings().setGeolocationEnabled(true);
        mWebView.getSettings().setLoadWithOverviewMode(true);
        mWebView.getSettings().setUseWideViewPort(true);
        mWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        mWebView.getSettings().setUserAgentString("Mozilla/5.0 (CrKey - 1.1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1573.2 Safari/537.36");
        mWebView.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                super.onReceivedError(view, errorCode, description, failingUrl);    //To change body of overridden methods use File | Settings | File Templates.
                Log.e(LOG_TAG,"Error. Code: "+errorCode+", "+description);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url){
                view.loadUrl(url);
                return false; // then it is not handled by default action
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
                Log.d("Interceptor", url);

                return super.shouldInterceptRequest(view, url);    //To change body of overridden methods use File | Settings | File Templates.
            }

            @Override
            public void onPageFinished(WebView view, String url)
            {
                Log.d(LOG_TAG,url+" finished");
                injectWebsocket(view);
            }
        });
        mWebView.setWebChromeClient(new WebChromeClient() {

            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.d(LOG_TAG_JS, consoleMessage.message()+", "+ consoleMessage.lineNumber());

                // Ugly fix for broken autoplay
                if(consoleMessage.message().contains("loadedmetadata")) {
                    Log.d(LOG_TAG, "Audio patch");
                    musicPatch(mWebView);
                } else if(consoleMessage.message().contains("Dispatch OPEN event to ramp") || consoleMessage.message().contains("video added")) {
                    Log.d(LOG_TAG, "Video patch 1");
                    mHandler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            mWebView.loadUrl("javascript:(function() { var itm = document.getElementsByTagName('video')[0]; if(itm) { itm.play(); console.log('play already video'); } })()");
                        }
                    },1500);
                } else if(consoleMessage.message().contains("PLAY")) {
                    Log.d(LOG_TAG, "Video patch 2");
                    mWebView.loadUrl("javascript:(function() { var itm = document.getElementsByTagName('video')[0]; if(itm) { itm.play(); console.log('play already video'); } })()");
                    mHandler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            mWebView.loadUrl("javascript:(function() { var itm = document.getElementsByTagName('video')[0]; if(itm) { itm.play(); console.log('play already video'); } })()");
                        }
                    },2500);
                }

                return super.onConsoleMessage(consoleMessage);    //To change body of overridden methods use File | Settings | File Templates.
            }
        });
        mWebView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                return true;
            }
        });
        mWebView.addJavascriptInterface(new WebSocketFactory(mWebView), "WebSocketFactory");

        mPatch = new Runnable() {
            @Override
            public void run() {
                if(mWebView != null){
                    //mWebView.loadUrl("javascript:(function() { var itm = document.getElementsByTagName('video')[0]; if(itm)itm.setAttribute('style','width: 100%; height:100%;'); })()");
                    mWebView.loadUrl("javascript:(function() { var itm = document.getElementsByTagName('video')[0]; if(itm) itm.setAttribute('style','width: 100%; height:100%;'); })()");
                    //mWebView.loadUrl("javascript:(function() { var itm = document.getElementsByTagName('video')[0]; if(itm) { itm.play(); console.log('play already video'); } })()");
                    //mWebView.loadUrl("javascript:(function() { var itm = document.getElementsByTagName('audio')[0]; if(itm) { itm.setAttribute('poster',undefined); } })()");
                    mHandler.postDelayed(mPatch, 2000);
                }
            }
        };
        mHandler.postDelayed(mPatch, 2000);

        Intent serviceIntent = new Intent(CastActivity.this, CheapCastService.class);
        bindService(serviceIntent, mConnection, 0);
    }

    public void load() {
        injectWebsocket(mWebView);
        mWebView.loadUrl(getIntent().getDataString());
    }

    @Override
    protected void onStart() {
        super.onStart();
        App.getInstance().getTracker().sendView("/Cast/"+getIntent().getStringExtra(Const.APP_EXTRA));
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if(keyCode == KeyEvent.KEYCODE_BACK || keyCode == KeyEvent.KEYCODE_HOME)
            finish();

        return super.onKeyDown(keyCode, event);    //To change body of overridden methods use File | Settings | File Templates.
    }

    private void musicPatch(WebView webView) {
        webView.loadUrl("javascript:(function() { var itm = document.getElementsByTagName('audio')[0]; if(itm) { itm.play(); console.log('play already'); } })()");
        webView.loadUrl("javascript:(function() { var itm = document.getElementsByTagName('video')[0]; if(itm) { itm.play(); console.log('play already'); } })()");
    }

    private void injectWebsocket(WebView webView) {
        if(webView == null)
            return;

        webView.loadUrl("javascript:(function() { " +
                "var global = window;"+
                "if(global.WebSocket) return;"+
                "var WebSocket = global.WebSocket = function(url, protocols) {" +
                "this.socket = WebSocketFactory.getInstance(url);" +
                "this.bufferedAmount = 0;" +
                "this.extensions = '';" +
                "this.__events = {};" +
                "if (!protocols) { protocols = []; } else if (typeof protocols == 'string') { this.protocols = [protocols]; }" +
                "this.readyState = 0;" +
                "this.binaryType = 'blob';"+
                "this.url = url;" +
                "if(this.socket) { WebSocket.store[this.socket.getId()] = this; } else { throw new Error('Websocket instantiation failed! Address might be wrong.'); }" +
                "};" +
                "WebSocket.store = {};" +
                "WebSocket.onmessage = function (evt) { WebSocket.store[evt._target]['onmessage'].call(global, evt); };" +
                "WebSocket.onopen = function (evt) { WebSocket.store[evt._target].readyState = 1; WebSocket.store[evt._target]['onopen'].call(global, evt); };" +
                "WebSocket.onclose = function (evt) { WebSocket.store[evt._target].readyState = 3; WebSocket.store[evt._target]['onclose'].call(global, evt); };" +
                "WebSocket.onerror = function (evt) { WebSocket.store[evt._target]['onerror'].call(global, evt); };" +

                "WebSocket.prototype.send = function(data) { this.socket.send(data); return true; };" +
                "WebSocket.prototype.close  = function() { this.socket.close(); };" +
                "WebSocket.prototype.getReadyState = function() { return this.socket.getReadyState(); };" +
                "WebSocket.prototype.onopen = function(msg) { console.log('onopen not implemented.'); };" +
                "WebSocket.prototype.onmessage = function(msg) { console.log('onmessage not implemented.'); };" +
                "WebSocket.prototype.onerror = function(msg) { console.log('onerror not implemented.'); };" +
                "WebSocket.prototype.onclose  = function(msg) { console.log('onclose not implemented.'); };" +
                "})()");

        webView.loadUrl("javascript:(function() {" +
                "document.addEventListener('DOMNodeInserted', function(event) { if (event.target.nodeName.toLowerCase() === \"video\"){ console.log('video added'); } }, false); "+
                " })()");

        webView.loadUrl("javascript:(function() { var itm = document.getElementsByTagName('audio')[0]; if(itm) { itm.addEventListener('loadedmetadata', function(evt) { console.log('loadedmetadata'); },false); } })()");
    }

    private ICheapCastCallback mCallback = new ICheapCastCallback.Stub() {

        @Override
        public void onAppStopped(String appName) throws RemoteException {
            CastActivity.this.finish();
        }
    };


    @Override
    protected void onDestroy() {
        Log.d(LOG_TAG, "onDestroy");
        super.onDestroy();

        if(mCheapCastService != null) {
            try {
                mCheapCastService.removeListener();
            } catch (RemoteException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        }

        mHandler.removeCallbacks(mPatch);

        if(mWakeLock.isHeld()) {
            mWakeLock.release();
            mWakeLock = null;
        }

        if(mConnection != null)
            unbindService(mConnection);

    }

    @Override
    protected void onPause() {
        super.onPause();
        mWebView.stopLoading();
        mWebView.loadUrl("");
        mWebView.reload();
        mWebView = null;
        finish();
    }
}
