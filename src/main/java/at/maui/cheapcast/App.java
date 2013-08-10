package at.maui.cheapcast;

import android.app.Application;
import android.util.Log;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 06.08.13
 * Time: 23:42
 * To change this template use File | Settings | File Templates.
 */
public class App extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        Log.d("SSDP", Installation.id(this));



        // work-around for Android defect 9431
        System.setProperty("java.net.preferIPv4Stack", "true");
        System.setProperty("java.net.preferIPv6Addresses", "false");
        System.setProperty("org.eclipse.jetty.util.UrlEncoded.charset", "utf-8");
    }
}
