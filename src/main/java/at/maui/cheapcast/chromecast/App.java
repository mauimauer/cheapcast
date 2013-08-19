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

import java.util.ArrayList;
import java.util.LinkedList;

public class App {

    public static final String LOG_TAG = "ChromeCast-App";
    private String mName, mState, mLink, mConnectionSvcURL, mReceiverUrl;
    private ArrayList<String> mProtocols;

    private ConnectionSocket mControlChannel;
    private ArrayList<SessionSocket> mRemotes;
    private ArrayList<ReceiverSocket> mReceivers;
    private LinkedList<String> mMessageBuffer;

    public App(String name, String receiverUrl, String[] protocols) {
        this(name, receiverUrl);

        for(int i = 0; i < protocols.length; i++) {
            mProtocols.add(protocols[i]);
        }
    }

    public App(String name, String receiverUrl, ArrayList<String> protocols) {
        this(name, receiverUrl);

        mProtocols = protocols;
    }

    public App(String name, String receiverUrl) {
        mName = name;
        mReceiverUrl = receiverUrl;
        mState = "stopped";
        mLink = "";
        mConnectionSvcURL = "";
        mProtocols = new ArrayList<String>();
        mProtocols.add("ramp");
        mRemotes = new ArrayList<SessionSocket>();
        mReceivers = new ArrayList<ReceiverSocket>();
        mMessageBuffer = new LinkedList<String>();
    }

    public String getProtocols() {
        if(mState == "stopped")
            return "";
        else {
            String p = "";
            for(String proto : mProtocols) {
                p += String.format("<protocol>%s</protocol>", proto);
            }
            return p;
        }
    }

    public String getProtocolList() {
        String p = "";
        for(String proto : mProtocols) {
            p += String.format(" %s ", proto);
        }
        return p;
    }

    public String getState() {
        return mState;
    }

    public void setState(String mState) {
        this.mState = mState;
    }

    public String getLink() {
        return mLink;
    }

    public void setLink(String mLink) {
        this.mLink = mLink;
    }

    public String getConnectionSvcURL() {
        return mConnectionSvcURL;
    }

    public void setConnectionSvcURL(String svc) {
        mConnectionSvcURL = svc;
    }

    public String getName() {
        return mName;
    }

    public void setName(String mName) {
        this.mName = mName;
    }

    public void addProtocol(String protocol) {
        mProtocols.add(protocol);
    }

    public String getReceiverUrl() {
        return mReceiverUrl;
    }

    public void setReceiverUrl(String mReceiverUrl) {
        this.mReceiverUrl = mReceiverUrl;
    }

    public void stop() {
        mState = "stopped";
        mConnectionSvcURL = "";
        mLink = "";
        mMessageBuffer.clear();
        mReceivers.clear();
        mRemotes.clear();
    }

    public ConnectionSocket getControlChannel() {
        return mControlChannel;
    }

    public void setControlChannel(ConnectionSocket mControlChannel) {
        this.mControlChannel = mControlChannel;
    }

    public ArrayList<ReceiverSocket> getReceivers() {
        return mReceivers;
    }

    public ArrayList<SessionSocket> getRemotes() {
        return mRemotes;
    }

    public void addReceiver(ReceiverSocket receiver) {
        mReceivers.add(receiver);
    }

    public void removeReceiver(ReceiverSocket receiver) {
        mReceivers.remove(receiver);
        Log.d(LOG_TAG, String.format("%d ReceiverSockets remaining.", mReceivers.size()));
    }

    public void addRemote(SessionSocket session) {
        mRemotes.add(session);
    }

    public void removeRemote(SessionSocket session) {
        mRemotes.remove(session);
        Log.d(LOG_TAG, String.format("%d SessionSockets remaining.", mRemotes.size()));
    }

    public LinkedList<String> getMessageBuffer() {
        return mMessageBuffer;
    }

    public SessionSocket getRemote() {
        if(mRemotes.size() == 0)
            return null;
        else
            return mRemotes.get(0);
    }

    public ReceiverSocket getReceiver() {
        if(mReceivers.size() == 0)
            return null;
        else
            return mReceivers.get(0);
    }
}
