package at.maui.cheapcast.chromecast.model;

import java.util.ArrayList;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 12.08.13
 * Time: 15:56
 * To change this template use File | Settings | File Templates.
 */
public class AppRegistration {
    private String appName, appUrl;
    private ArrayList<String> protocols;

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getAppUrl() {
        return appUrl;
    }

    public void setAppUrl(String appUrl) {
        this.appUrl = appUrl;
    }

    public ArrayList<String> getProtocols() {
        return protocols;
    }

    public void setProtocols(ArrayList<String> protocols) {
        this.protocols = protocols;
    }
}
