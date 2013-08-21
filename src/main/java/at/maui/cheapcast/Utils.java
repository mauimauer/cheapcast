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

package at.maui.cheapcast;

import android.content.Context;
import android.content.res.AssetManager;
import android.net.wifi.WifiManager;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

public class Utils {
    public static NetworkInterface getActiveNetworkInterface(WifiManager manager) {

        Enumeration<NetworkInterface> interfaces = null;
        try {
            interfaces = NetworkInterface.getNetworkInterfaces();
        } catch (SocketException e) {
            return null;
        }

        while (interfaces.hasMoreElements()) {
            NetworkInterface iface = interfaces.nextElement();
            Enumeration<InetAddress> inetAddresses = iface.getInetAddresses();

            /* Check if we have a non-local address. If so, this is the active
             * interface.
             *
             * This isn't a perfect heuristic: I have devices which this will
             * still detect the wrong interface on, but it will handle the
             * common cases of wifi-only and Ethernet-only.
             */
            while (inetAddresses.hasMoreElements()) {
                InetAddress addr = inetAddresses.nextElement();

                if (!(addr.isLoopbackAddress() || addr.isLinkLocalAddress())) {
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
            if (addr instanceof Inet4Address && !addr.isLoopbackAddress())
                return addr;
        }
        return null;
    }

    public static String readerToString(BufferedReader reader) {
        StringBuffer rawBody = new StringBuffer();
        String line = null;
        try {
            while ((line = reader.readLine()) != null)
                rawBody.append(line);
        } catch (Exception e) { /*report an error*/ }
        return rawBody.toString();
    }

    public static String inputStreamToString(InputStream is) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        StringBuilder sb = new StringBuilder();
        String line = null;

        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }

        is.close();

        return sb.toString();
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
