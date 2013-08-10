package at.maui.cheapcast.ws;

import android.util.Log;
import android.webkit.WebView;

import java.net.URI;
import java.util.Random;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 08.08.13
 * Time: 02:32
 * To change this template use File | Settings | File Templates.
 */
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
