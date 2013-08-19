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

import android.util.Log;
import android.webkit.WebView;
import java.net.URI;
import java.util.Random;

public class WebSocketFactory {

    private WebView mWebView;

    public WebSocketFactory(WebView appView) {
        this.mWebView = appView;
    }

    public WebSocket getInstance(String url) {
        WebSocket socket = null;
        Thread th = null;
        try {
            socket = new WebSocket(mWebView, new URI(url), getRandomUniqueId());
            socket.connect();
            return socket;
        } catch (Exception e) {
            Log.v("websocket", e.toString());
            if(th != null) {
                th.interrupt();
            }
        }
        return null;
    }

    /**
     * Generates random unique ids for WebSocket instances
     *
     * @return String
     */
    private String getRandomUniqueId() {
        return "WEBSOCKET." + new Random().nextInt(100);
    }
}
