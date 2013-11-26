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

import android.util.Log;
import at.maui.cheapcast.chromecast.model.ConnectionCommand;
import at.maui.cheapcast.chromecast.model.ConnectionResponse;
import at.maui.cheapcast.service.CheapCastService;
import com.google.gson.Gson;
import org.eclipse.jetty.websocket.WebSocket;

import java.io.IOException;

public class ConnectionSocket implements WebSocket, WebSocket.OnTextMessage, WebSocket.OnFrame {

    public static final String LOG_TAG = "ConnectionSocket";

    protected FrameConnection mFrameConnection;
    protected Connection mConnection;
    private Gson mGson;
    private CheapCastService mService;
    private App mApp;

    public ConnectionSocket(CheapCastService service) {
        mService = service;
        mGson = new Gson();
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
    public void onMessage(String message) {
        Log.d(LOG_TAG, "ConnectionSocket, Message: " + message);
        ConnectionCommand cmd = mGson.fromJson(message, ConnectionCommand.class);

        if(cmd.getType().equals("REGISTER")) {
            mApp = mService.getApp(cmd.getName().replace("Dev",""));
            mApp.setControlChannel(this);

            ConnectionResponse response = new ConnectionResponse();
            response.setType("CHANNELREQUEST");
            response.setRequestId(mApp.getRemotes().size());
            response.setSenderId(mApp.getSender());
            try {
                mConnection.sendMessage(mGson.toJson(response));
                Log.d(LOG_TAG, "replied to REGISTER");
            } catch (IOException e) {
                Log.e(LOG_TAG, "reply Failed", e);
            }
        } else if(cmd.getType().equals("CHANNELRESPONSE")) {
            ConnectionResponse response = new ConnectionResponse();
            response.setType("NEWCHANNEL");
            response.setRequestId(mApp.getRemotes().size());
            response.setSenderId(mApp.getSender());
            response.setURL(String.format("ws://localhost:8008/receiver/%s", mApp.getName()));
            try {
                mConnection.sendMessage(mGson.toJson(response));
                Log.d(LOG_TAG, "replied to CHANNELRESPONSE");
            } catch (IOException e) {
                Log.e(LOG_TAG, "reply Failed", e);
            }
        }
    }

    @Override
    public void onOpen(Connection connection) {
        Log.d(LOG_TAG, "ConnectionSocket: onOpen();");
        connection.setMaxIdleTime(Integer.MAX_VALUE);
        connection.setMaxTextMessageSize(64*1024);
        connection.setMaxBinaryMessageSize(64*1024);
        mConnection = connection;
    }

    @Override
    public void onClose(int i, String s) {

        Log.d(LOG_TAG, String.format("onClose(%d, %s)",i,s));
        if(mApp != null) {
            mApp.stop();
            mApp.setControlChannel(null);
        }
    }

    @Override
    public boolean onFrame(byte b, byte b2, byte[] bytes, int i, int i2) {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void onHandshake(FrameConnection frameConnection) {
        mFrameConnection = frameConnection;
    }
}