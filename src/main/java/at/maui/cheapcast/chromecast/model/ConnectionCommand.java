package at.maui.cheapcast.chromecast.model;

import java.util.ArrayList;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 08.08.13
 * Time: 14:28
 * To change this template use File | Settings | File Templates.
 */
public class ConnectionCommand extends Command {
    private String name;
    private ArrayList<String> protocols;
    private int version, pingInterval, eventChannel;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<String> getProtocols() {
        return protocols;
    }

    public void setProtocols(ArrayList<String> protocols) {
        this.protocols = protocols;
    }

    public int getPingInterval() {
        return pingInterval;
    }

    public void setPingInterval(int pingInterval) {
        this.pingInterval = pingInterval;
    }

    public int getEventChannel() {
        return eventChannel;
    }

    public void setEventChannel(int eventChannel) {
        this.eventChannel = eventChannel;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }
}
