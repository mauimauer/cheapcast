package at.maui.cheapcast.chromecast;

import android.util.Log;
import at.maui.cheapcast.service.CheapCastService;
import org.eclipse.jetty.websocket.WebSocket;

import java.io.IOException;

public class ReceiverSocket implements WebSocket, WebSocket.OnTextMessage {

    public static final String LOG_TAG = "ReceiverSocket";

    protected FrameConnection mFrameConnection;
    protected Connection mConnection;
    private CheapCastService mService;
    private App mApp;

    public ReceiverSocket(CheapCastService service, App app) {
        mService = service;
        mApp = app;
    }

    public FrameConnection getConnection()
    {
        return mFrameConnection;
    }

    public void close() {
        if(mConnection != null)
            mConnection.close();
    }

    @Override
    public void onMessage(String s) {
        Log.d(LOG_TAG, "<<" + s);

        if(s.contains("ping")) {
            try {
                send("[\"cm\",{\"type\":\"pong\"}]");
            } catch (IOException e) {
                Log.e(LOG_TAG, "Pong reply failed.", e);
            }
        }

            for(SessionSocket session : mApp.getRemotes()) {
                try {

                    session.send(s);

                    /*if(s.contains("\"state\":1") && s.contains("\"type\":\"STATUS\"")) {
                        Log.d(LOG_TAG, "inject force play");
                        send("[\"ramp\",{\"type\":\"PLAY\",\"cmd_id\":0}]");
                    }*/

                } catch (IOException e) {
                    e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }
            }

            /*SessionSocket session = mApp.getRemote();
            if(session != null) {
                try {

                    session.send(s);

                } catch (IOException e) {
                    e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }
            }*/
    }

    @Override
    public void onOpen(Connection connection) {
        Log.d(LOG_TAG, "onOpen");
        mConnection = connection;
        connection.setMaxTextMessageSize(64*1024);
        connection.setMaxBinaryMessageSize(64 * 1024);
        connection.setMaxIdleTime(Integer.MAX_VALUE);
        mApp.addReceiver(this);

        for (String s; (s = mApp.getMessageBuffer().poll()) != null;){
            try {
                send(s);
                Log.d(LOG_TAG, "Sending Buffered: "+ s);
            } catch (IOException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        }
    }

    public void send(String s) throws IOException {
        if(mConnection != null) {
            mConnection.sendMessage(s);
            Log.d(LOG_TAG, ">>" + s);
        } else {
            Log.d(LOG_TAG, "Socket is null");
        }
    }

    @Override
    public void onClose(int i, String s) {
        Log.d(LOG_TAG, String.format("onClose(%d, %s)",i,s));
        mConnection = null;
        mApp.removeReceiver(this);
    }
}