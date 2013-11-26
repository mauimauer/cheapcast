package at.maui.cheapcast.chromecast.model;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 10.09.13
 * Time: 02:24
 * To change this template use File | Settings | File Templates.
 */
public class ConnectionRequest {

    private int channel;
    private Sender senderId;

    public int getChannel() {
        return channel;
    }

    public void setChannel(int channel) {
        this.channel = channel;
    }

    public Sender getSenderId() {
        return senderId;
    }

    public void setSenderId(Sender senderId) {
        this.senderId = senderId;
    }
}
