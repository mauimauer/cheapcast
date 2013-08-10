package at.maui.cheapcast.chromecast;

import android.util.Log;
import org.eclipse.jetty.websocket.WebSocket;

public class SystemControlSocket implements WebSocket, WebSocket.OnTextMessage {

    public static final String LOG_TAG = "SystemControlSocket";
    protected FrameConnection _connection;

    public FrameConnection getConnection()
    {
        return _connection;
    }

    @Override
    public void onMessage(String s) {
        Log.d(LOG_TAG, "onMessage(); " + s);
    }


    @Override
    public void onOpen(Connection connection) {
        connection.setMaxTextMessageSize(64*1024);
        connection.setMaxBinaryMessageSize(64*1024);
        connection.setMaxIdleTime(Integer.MAX_VALUE);
        Log.d(LOG_TAG, "SystemControlSocket: onOpen(); ");
    }

    @Override
    public void onClose(int i, String s) {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
