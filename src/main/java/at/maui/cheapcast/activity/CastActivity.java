package at.maui.cheapcast.activity;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.*;
import android.widget.FrameLayout;
import android.widget.VideoView;
import at.maui.cheapcast.R;
import at.maui.cheapcast.ws.WebSocketFactory;


public class CastActivity extends Activity {

    public static final String LOG_TAG = "CastActivity";
    public static final String LOG_TAG_JS = "JS-CastActivity";

    private WebView mWebView;
    Runnable patchMusic;
    private Handler mHandler = new Handler();


    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);    //To change body of overridden methods use File | Settings | File Templates.
        Log.d(LOG_TAG, "onNewIntent()");


        injectWebsocket(mWebView);
        mWebView.loadUrl(intent.getDataString());
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // remove title
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_cast);

        mWebView = (WebView)findViewById(R.id.webView);

        mWebView.getSettings().setAllowContentAccess(true);
        mWebView.getSettings().setAllowFileAccessFromFileURLs(true);
        mWebView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.getSettings().setDomStorageEnabled(true);
        mWebView.getSettings().setGeolocationEnabled(true);
        mWebView.getSettings().setLoadWithOverviewMode(true);
        mWebView.getSettings().setUseWideViewPort(true);
        mWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        mWebView.getSettings().setUserAgentString("Mozilla/5.0 (CrKey - 0.9.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1573.2 Safari/537.36");
        mWebView.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                super.onReceivedError(view, errorCode, description, failingUrl);    //To change body of overridden methods use File | Settings | File Templates.
                Log.e(LOG_TAG,"Error. Code: "+errorCode+", "+description);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url){
                view.loadUrl(url);
                return false; // then it is not handled by default action
            }

            @Override
            public void onPageFinished(WebView view, String url)
            {
                Log.d(LOG_TAG,url+" finished");
               /* mWebView.loadUrl("javascript:(function() { " +
                        "var global = window;"+
                        "var WebSocket = global.WebSocket = function(url, protocol) {" +
                        "this.socket = WebSocketFactory.getInstance(url);" +
                        "this.bufferedAmount = 0;" +
                        "this.extensions = '';" +
                        "this.__events = {};" +
                        "if (!protocols) { protocols = []; } else if (typeof protocols == 'string') { this.protocol = [protocol]; }" +
                        "this.readyState = 0;" +
                        "this.binaryType = 'blob';"+
                        "this.url = url;" +
                        "if(this.socket) { WebSocket.store[this.socket.getId()] = this; } else { throw new Error('Websocket instantiation failed! Address might be wrong.'); }" +
                        "};" +
                        "WebSocket.store = {};" +
                        "WebSocket.onmessage = function (evt) { WebSocket.store[evt._target]['onmessage'].call(global, evt); };" +
                        "WebSocket.onopen = function (evt) { WebSocket.store[evt._target]['onopen'].call(global); };" +
                        "WebSocket.onclose = function (evt) { WebSocket.store[evt._target]['onclose'].call(global); };" +
                        "WebSocket.onerror = function (evt) { WebSocket.store[evt._target]['onerror'].call(global, evt); };" +
                        "WebSocket.onreadystate = function (evt) { WebSocket.store[evt._target]['onreadystate'].call(global, evt); };" +
                        "WebSocket.__handleEvent = function (evt) { WebSocket.store[evt._target]['__handleEvent'].call(global, evt); };" +
                        "WebSocket.prototype.send = function(data) { this.socket.send(data); return true; };" +
                        "WebSocket.prototype.close  = function() { this.socket.close(); };" +
                        "WebSocket.prototype.getReadyState = function() { return this.socket.getReadyState(); };" +
                        "WebSocket.prototype.addEventListener = function(type, listener, useCapture) { if (!(type in this.__events)) { this.__events[type] = []; } this.__events[type].push(listener); };" +
                        "WebSocket.prototype.dispatchEvent = function(event) { var events = this.__events[event.type] || []; for (var i = 0; i < events.length; ++i) { events[i](event); } var handler = this['on' + event.type]; if (handler) handler.apply(this, [event]); };" +
                        "WebSocket.prototype.removeEventListener = function(type, listener, useCapture) { if (!(type in this.__events)) return; var events = this.__events[type]; for (var i = events.length - 1; i >= 0; --i) { if (events[i] === listener) { events.splice(i, 1); break; } } };" +
                        "WebSocket.prototype.onopen = function(msg) { console.log('onopen not implemented.'); };" +
                        "WebSocket.prototype.onmessage = function(msg) { console.log('onmessage not implemented.'); };" +
                        "WebSocket.prototype.onerror = function(msg) { console.log('onerror not implemented.'); };" +
                        "WebSocket.prototype.onreadystate = function(msg) { this.readyState = parseInt(msg.data); };" +
                        "WebSocket.prototype.onclose  = function(msg) { console.log('onclose not implemented.'); };" +
                        "WebSocket.prototype.__handleEvent  = function(msg) { console.log('onclose not implemented.'); };" +
                        "})()");  */

                        injectWebsocket(view);

                view.loadUrl("javascript:(function() { " +
                        "if(skyjam) skyjam.cast.Player.BUFFERING_SPINNER_TIMEOUT_MS_ = 9000;"+
                        "})()");
            }
        });
        mWebView.setWebChromeClient(new WebChromeClient() {

            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.d(LOG_TAG_JS, consoleMessage.message()+", "+ consoleMessage.lineNumber());
                return super.onConsoleMessage(consoleMessage);    //To change body of overridden methods use File | Settings | File Templates.
            }
        });
        mWebView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                return true;
            }
        });


        mHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Log.d(LOG_TAG,"Play2!!!");
                mWebView.loadUrl("javascript:(function() { document.getElementsByTagName('video')[0].play(); })()");
                mWebView.loadUrl("javascript:(function() { document.getElementsByTagName('video')[0].setAttribute('style','width: 100%; height:100%;'); })()");
            }
        }, 8000);

        patchMusic = new Runnable() {
            @Override
            public void run() {
                mWebView.loadUrl("javascript:(function() { " +
                        "if(skyjam) skyjam.cast.Player.BUFFERING_SPINNER_TIMEOUT_MS_ = 99000;"+
                        "})()");
                mHandler.postDelayed(patchMusic, 2000);
            }
        };
        mHandler.postDelayed(patchMusic, 2000);


        mWebView.addJavascriptInterface(new WebSocketFactory(mWebView), "WebSocketFactory");
        injectWebsocket(mWebView);
        mWebView.loadUrl(getIntent().getDataString());
        //mWebView.loadUrl("javascript:var output='This string is defined before html loaded.'");

        //mWebView.loadUrl("file:///android_asset/test2.html");
    }

    private void injectWebsocket(WebView webView) {
        webView.loadUrl("javascript:(function() { " +
                "var global = window;"+
                "if(global.WebSocket) return;"+
                "var WebSocket = global.WebSocket = function(url, protocols) {" +
                "this.socket = WebSocketFactory.getInstance(url);" +
                "this.bufferedAmount = 0;" +
                "this.extensions = '';" +
                "this.__events = {};" +
                "if (!protocols) { protocols = []; } else if (typeof protocols == 'string') { this.protocols = [protocols]; }" +
                "this.readyState = 0;" +
                "this.binaryType = 'blob';"+
                "this.url = url;" +
                "if(this.socket) { WebSocket.store[this.socket.getId()] = this; } else { throw new Error('Websocket instantiation failed! Address might be wrong.'); }" +
                "};" +
                "WebSocket.store = {};" +
                "WebSocket.onmessage = function (evt) { WebSocket.store[evt._target]['onmessage'].call(global, evt); };" +
                "WebSocket.onopen = function (evt) { WebSocket.store[evt._target].readyState = 1; WebSocket.store[evt._target]['onopen'].call(global, evt); };" +
                "WebSocket.onclose = function (evt) { WebSocket.store[evt._target].readyState = 3; WebSocket.store[evt._target]['onclose'].call(global, evt); };" +
                "WebSocket.onerror = function (evt) { WebSocket.store[evt._target]['onerror'].call(global, evt); };" +
                //"WebSocket.onreadystate = function (evt) { WebSocket.store[evt._target]['onreadystate'].call(global, evt); };" +
                //"WebSocket.__handleEvent = function (evt) { WebSocket.store[evt._target]['__handleEvent'].call(global, evt); };" +
                "WebSocket.prototype.send = function(data) { this.socket.send(data); return true; };" +
                "WebSocket.prototype.close  = function() { WebSocket.store[evt._target].readyState = 2; this.socket.close(); };" +
                "WebSocket.prototype.getReadyState = function() { return this.socket.getReadyState(); };" +
                //"WebSocket.prototype.addEventListener = function(type, listener, useCapture) { console.log('adel'); if (!(type in this.__events)) { this.__events[type] = []; } this.__events[type].push(listener); };" +
                //"WebSocket.prototype.dispatchEvent = function(event) { console.log('disp'); var events = this.__events[event.type] || []; for (var i = 0; i < events.length; ++i) { events[i](event); } var handler = this['on' + event.type]; if (handler) handler.apply(this, [event]); };" +
                //"WebSocket.prototype.removeEventListener = function(type, listener, useCapture) { console.log('rem'); if (!(type in this.__events)) return; var events = this.__events[type]; for (var i = events.length - 1; i >= 0; --i) { if (events[i] === listener) { events.splice(i, 1); break; } } };" +
                "WebSocket.prototype.onopen = function(msg) { console.log('onopen not implemented.'); };" +
                "WebSocket.prototype.onmessage = function(msg) { console.log('onmessage not implemented.'); };" +
                "WebSocket.prototype.onerror = function(msg) { console.log('onerror not implemented.'); };" +
                //"WebSocket.prototype.onreadystate = function(msg) { this.readyStatedd = parseInt(msg.data); };" +
                "WebSocket.prototype.onclose  = function(msg) { console.log('onclose not implemented.'); };" +
                //"WebSocket.prototype.__handleEvent  = function(msg) { console.log('onclose not implemented.'); };" +
                "})()");
    }
}
