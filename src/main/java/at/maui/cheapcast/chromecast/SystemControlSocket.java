package at.maui.cheapcast.chromecast;

import android.content.Context;
import android.media.AudioManager;
import android.util.Log;
import com.google.gson.Gson;
import org.eclipse.jetty.websocket.WebSocket;

import java.io.IOException;

public class SystemControlSocket implements WebSocket, WebSocket.OnTextMessage {

    public static final String LOG_TAG = "SystemControlSocket";
    protected FrameConnection _connection;
    private Connection mConnection;

    private Context mContext;
    private AudioManager mAudioManager;

    private Gson mGson;

    public SystemControlSocket(Context ctx) {
        mContext = ctx;
        mAudioManager = (AudioManager)ctx.getSystemService(Context.AUDIO_SERVICE);
        mGson = new Gson();
    }

    public FrameConnection getConnection()
    {
        return _connection;
    }

    @Override
    public void onMessage(String s) {
        Log.d(LOG_TAG, "<< " + s);



       /* if(s.contains("GET_VOLUME")) {
            double volume = mAudioManager.getStreamVolume(AudioManager.STREAM_MUSIC) / mAudioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC);

        } else if(s.contains("GET_MUTED")) {
            double volume = mAudioManager.getStreamVolume(AudioManager.STREAM_MUSIC) / mAudioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC);
        } else if(s.contains("SET_VOLUME")) {
            double volume = mAudioManager.getStreamVolume(AudioManager.STREAM_MUSIC) / mAudioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC);

        }    */
    }

    public void send(String s) throws IOException {
        if(mConnection != null) {
            mConnection.sendMessage(s);
            Log.d(LOG_TAG, ">>" + s);
        }
    }

    @Override
    public void onOpen(Connection connection) {
        mConnection = connection;
        connection.setMaxTextMessageSize(64*1024);
        connection.setMaxBinaryMessageSize(64*1024);
        connection.setMaxIdleTime(Integer.MAX_VALUE);
        Log.d(LOG_TAG, "SystemControlSocket: onOpen(); ");
    }

    @Override
    public void onClose(int i, String s) {
        Log.d(LOG_TAG, String.format("onClose(%d, %s)",i,s));
    }
}
