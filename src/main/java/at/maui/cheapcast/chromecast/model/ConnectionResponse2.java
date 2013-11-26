package at.maui.cheapcast.chromecast.model;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 10.09.13
 * Time: 02:29
 * To change this template use File | Settings | File Templates.
 */
public class ConnectionResponse2 {
    private String URL, type;
    private int requestId;
    private Sender senderId;

    public String getURL() {
        return URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Sender getSenderId() {
        return senderId;
    }

    public void setSenderId(Sender senderId) {
        this.senderId = senderId;
    }

    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }
}