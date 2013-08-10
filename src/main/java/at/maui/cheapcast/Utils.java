package at.maui.cheapcast;

import android.content.Context;
import android.content.res.AssetManager;
import android.net.wifi.WifiManager;

import java.io.IOException;
import java.io.InputStream;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 06.08.13
 * Time: 22:30
 * To change this template use File | Settings | File Templates.
 */
public class Utils {
    public static NetworkInterface getWifiNetworkInterface(WifiManager manager) {

        Enumeration<NetworkInterface> interfaces = null;
        try {
            //the WiFi network interface will be one of these.
            interfaces = NetworkInterface.getNetworkInterfaces();
        } catch (SocketException e) {
            return null;
        }

        //We'll use the WiFiManager's ConnectionInfo IP address and compare it with
        //the ips of the enumerated NetworkInterfaces to find the WiFi NetworkInterface.

        //Wifi manager gets a ConnectionInfo object that has the ipAdress as an int
        //It's endianness could be different as the one on java.net.InetAddress
        //maybe this varies from device to device, the android API has no documentation on this method.
        int wifiIP = manager.getConnectionInfo().getIpAddress();

        //so I keep the same IP number with the reverse endianness
        int reverseWifiIP = Integer.reverseBytes(wifiIP);

        while (interfaces.hasMoreElements()) {

            NetworkInterface iface = interfaces.nextElement();

            //since each interface could have many InetAddresses...
            Enumeration<InetAddress> inetAddresses = iface.getInetAddresses();
            while (inetAddresses.hasMoreElements()) {
                InetAddress nextElement = inetAddresses.nextElement();
                int byteArrayToInt = byteArrayToInt(nextElement.getAddress(),0);

                //grab that IP in byte[] form and convert it to int, then compare it
                //to the IP given by the WifiManager's ConnectionInfo. We compare
                //in both endianness to make sure we get it.
                if (byteArrayToInt == wifiIP || byteArrayToInt == reverseWifiIP) {
                    return iface;
                }
            }
        }

        return null;
    }

    public static InetAddress getLocalV4Address(NetworkInterface netif)
    {
        Enumeration addrs = netif.getInetAddresses();
        while (addrs.hasMoreElements())
        {
            InetAddress addr = (InetAddress) addrs.nextElement();
            if (addr instanceof Inet4Address)
                return addr;
        }
        return null;
    }

    public static String readAsset(Context context, String assetPath) throws IOException {
        String asset = null;
        AssetManager am = context.getAssets();
        try {
            InputStream is = am.open(assetPath);
            int length = is.available();
            byte[] data = new byte[length];
            is.read(data);
            is.close();
            asset = new String(data, "ASCII");
        } catch (IOException e1) {
            e1.printStackTrace();
        }

        return asset;
    }

    public static final int byteArrayToInt(byte[] arr, int offset) {
        if (arr == null || arr.length - offset < 4)
            return -1;

        int r0 = (arr[offset] & 0xFF) << 24;
        int r1 = (arr[offset + 1] & 0xFF) << 16;
        int r2 = (arr[offset + 2] & 0xFF) << 8;
        int r3 = arr[offset + 3] & 0xFF;
        return r0 + r1 + r2 + r3;
    }
}
