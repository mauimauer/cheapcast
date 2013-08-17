package at.maui.cheapcast.chromecast.model;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 16.08.13
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 */
public class Detail {
    private int senderId;
    private String appName;

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }
}