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

package at.maui.cheapcast.ws;

import android.webkit.WebView;
import java.net.URI;

public class WebSocket implements WebSocketClient.Listener {

    private WebView mWebView;
    private WebSocketClient mClient;
    private String mId;
    private int mReadyState = WEBSOCKET_STATE_CONNECTING;

    public final static int WEBSOCKET_STATE_CONNECTING = 0;
    public final static int WEBSOCKET_STATE_OPEN = 1;
    public final static int WEBSOCKET_STATE_CLOSING = 2;
    public final static int WEBSOCKET_STATE_CLOSED = 3;

    private static String BLANK_MESSAGE = "";
    private static String EVENT_ON_OPEN = "onopen";
    private static String EVENT_ON_MESSAGE = "onmessage";
    private static String EVENT_ON_READYSTATE = "onreadystate";
    private static String EVENT_ON_CLOSE = "onclose";
    private static String EVENT_ON_ERROR = "onerror";

    protected WebSocket(WebView webView, URI uri, String id) {
        mWebView = webView;
        mClient = new WebSocketClient(uri, this, null);
        mId = id;
    }

    private String buildJavaScriptData(String event, String msg) {
        String _d = "javascript:WebSocket." + event + "(" + "{" + "\"_target\":\"" + mId + "\"," + "\"data\":'" + msg.replaceAll("'", "\\\\'")
                + "'" + "}" + ")";

        return _d;
    }

    public void connect() {
        setReadyState(WEBSOCKET_STATE_CONNECTING);
        mClient.connect();
    }

    private void setReadyState(int readyState) {
        mReadyState = readyState;
    }

    @Override
    public void onConnect() {
        setReadyState(WEBSOCKET_STATE_OPEN);
        mWebView.post(new Runnable() {
            @Override
            public void run() {
                mWebView.loadUrl(buildJavaScriptData(EVENT_ON_OPEN, BLANK_MESSAGE));
            }
        });
       /* mWebView.postDelayed(new Runnable() {
            @Override
            public void run() {
                // self._write_frame(True, 0x9, data)

                mClient.sendFrame();
            }
        },5000);*/
    }

    @Override
    public void onMessage(final String message) {
        mWebView.post(new Runnable() {
            @Override
            public void run() {
                mWebView.loadUrl(buildJavaScriptData(EVENT_ON_MESSAGE, message));
            }
        });
    }

    @Override
    public void onMessage(final byte[] data) {
        mWebView.post(new Runnable() {
            @Override
            public void run() {
                mWebView.loadUrl(buildJavaScriptData(EVENT_ON_MESSAGE, new String(data)));
            }
        });
    }

    @Override
    public void onDisconnect(int code, String reason) {
        setReadyState(WEBSOCKET_STATE_CLOSED);
        mWebView.post(new Runnable() {
            @Override
            public void run() {
                mWebView.loadUrl(buildJavaScriptData(EVENT_ON_CLOSE, BLANK_MESSAGE));
            }
        });
    }

    @Override
    public void onError(final Exception error) {
        mWebView.post(new Runnable() {
            @Override
            public void run() {
                mWebView.loadUrl(buildJavaScriptData(EVENT_ON_ERROR, error.getMessage()));
            }
        });
    }

    public void send(String message) {
        mClient.send(message);
    }

    public void close() {
        setReadyState(WEBSOCKET_STATE_CLOSING);
        mClient.disconnect();
    }

    public int getReadyState() {
        return mReadyState;
    }

    public String getId() {
        return mId;
    }
}
