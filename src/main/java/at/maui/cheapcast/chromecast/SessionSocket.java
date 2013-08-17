package at.maui.cheapcast.chromecast;

import android.util.Log;
import at.maui.cheapcast.service.CheapCastService;
import org.eclipse.jetty.websocket.WebSocket;
import java.io.IOException;

public class SessionSocket implements WebSocket, WebSocket.OnTextMessage {

    public static final String LOG_TAG = "SessionSocket";

    protected FrameConnection mFrameConnection;
    protected Connection mConnection;
    private CheapCastService mService;
    private App mApp;

    public SessionSocket(CheapCastService service, App app) {
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
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        } else {

            ReceiverSocket receiver = mApp.getReceiver();
            if(receiver == null)
                mApp.getMessageBuffer().push(s);
            else {
                try {
                    receiver.send(s);
                } catch (IOException e) {
                    e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }
            }
        }
    }

    public void send(String s) throws IOException {
        if(mConnection != null) {
            mConnection.sendMessage(s);
            Log.d(LOG_TAG, ">>" + s);
        } else {
            Log.d(LOG_TAG, "Could not send, already closed.");
        }
    }

    @Override
    public void onOpen(Connection connection) {
        connection.setMaxTextMessageSize(64*1024);
        connection.setMaxBinaryMessageSize(64 * 1024);
        connection.setMaxIdleTime(Integer.MAX_VALUE);
        mConnection = connection;
        mApp.addRemote(this);
        Log.d(LOG_TAG, "onOpen();");
    }

    @Override
    public void onClose(int i, String s) {
        Log.d(LOG_TAG, String.format("onClose(%d, %s)",i,s));
        mConnection = null;
        mApp.removeRemote(this);
    }
}