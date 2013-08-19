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

package at.maui.cheapcast.chromecast;

import android.content.Context;
import android.media.AudioManager;
import android.util.Log;
import at.maui.cheapcast.chromecast.model.syscontrol.SetVolumeMessage;
import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
        mGson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
                .create();
    }

    public FrameConnection getConnection()
    {
        return _connection;
    }

    @Override
    public void onMessage(String s) {
        Log.d(LOG_TAG, "<< " + s);

        if(s.contains("SET_VOLUME")) {
            SetVolumeMessage message = mGson.fromJson(s, SetVolumeMessage.class);
            Log.d(LOG_TAG, "Setting volume");
            mAudioManager.setStreamVolume(AudioManager.STREAM_MUSIC, (int)(message.getLevel() * mAudioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)),0);
        }

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
