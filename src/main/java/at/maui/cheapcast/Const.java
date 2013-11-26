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

public class Const {

    public static final String DEVICE_DESC = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
            "    <root xmlns=\"urn:schemas-upnp-org:device-1-0\">\n" +
            "        <specVersion>\n" +
            "        <major>1</major>\n" +
            "        <minor>0</minor>\n" +
            "        </specVersion>\n" +
            "        <URLBase>#base#</URLBase>\n" +
            "        <device>\n" +
            "            <deviceType>urn:schemas-upnp-org:device:dial:1</deviceType>\n" +
            "            <friendlyName>#friendlyname#</friendlyName>\n" +
            "            <manufacturer>Google Inc.</manufacturer>\n" +
            "            <modelName>Eureka Dongle</modelName>\n" +
            "            <UDN>uuid:#uuid#</UDN>\n" +
            "            <serviceList>\n" +
            "                <service>\n" +
            "                    <serviceType>urn:schemas-upnp-org:service:dial:1</serviceType>\n" +
            "                    <serviceId>urn:upnp-org:serviceId:dial</serviceId>\n" +
            "                    <controlURL>/ssdp/notfound</controlURL>\n" +
            "                    <eventSubURL>/ssdp/notfound</eventSubURL>\n" +
            "                    <SCPDURL>/ssdp/notfound</SCPDURL>\n" +
            "                </service>\n" +
            "            </serviceList>\n" +
            "        </device>\n" +
            "    </root>";

    public static final String APP_INFO_1 = "<?xml version='1.0' encoding='UTF-8'?>\n" +
            "    <service xmlns='urn:dial-multiscreen-org:schemas:dial'>\n" +
            "        <name>#name#</name>\n" +
            "        <options allowStop='true'/>\n";


    public static final String APP_SERVICE_DATA =
            "        <servicedata xmlns='urn:chrome.google.com:cast'>\n" +
            "            <connectionSvcURL>#connectionSvcURL#</connectionSvcURL>\n" +
            "            <protocols>#protocols#</protocols>\n" +
            "        </servicedata>\n";

    public static final String APP_INFO_2 =
            "        <state>#state#</state>\n";

    public static final String APP_ACTIVITY_STATUS =
            "        <activity-status xmlns='urn:chrome.google.com:cast'>\n" +
            "            <description>#name# Receiver</description>\n" +
            "        </activity-status>\n" +
            "        #link#\n";

    public static final String APP_INFO_3 =
            "    </service>";

    public static final String APP_EXTRA = "at.maui.cheapcast.app";
    public static final String ACTION_RESTART = "at.maui.cheapcast.RESTART_SERVICE";
    public static final String ACTION_STOP = "at.maui.cheapcast.STOP_SERVICE";

    public static final boolean PREF_START_ON_BOOT_DEFAULT = false;

    public static final String CHROME_CAST_CONFIG_URL = "https://clients3.google.com/cast/chromecast/device/config";
    public static final String SUPPORT_URL = "https://plus.google.com/communities/106486569778358341271";
    public static final String PLUS_URL = "https://plus.google.com/u/0/107130354111162483072";

    public static class Billing {
        public static final String PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmcpBqYTR+Q18iEbawAbaiSj5G2+Da8vVUNYyW8IhFWT3pUht2WqIRB/aZLhG+LCXVTyK2lZXuvetEnrFya8M77hRpnjE1phKP+kM0yI4X/wco4Q4LHOxAUgEfyK4GOGe0kGZ4MhMjlUOr0BPOTwtXiV88EokGGBT/zmW+f2FB+6m4nQ6AgOcfThIvfKLgGW1iSi+wK0PI1F2bSqa+4t8aqezlfS2yqny7ECB4XYU6KxP1yJUyZfrFM7RBu+up4mgthS9YDLov/OYlboA94hKLc0rltmaWbbB5ZLUnDGFjXabipYyLIQKbeHUEN+PKwTa8u3qn9dC1RuTiOYfKcT4GwIDAQAB";

        public static final String DONATION_PREFIX = "donation.";

        public static final String SKU_DONATION_1 = "donation.1";
        public static final String SKU_DONATION_2 = "donation.2";
        public static final String SKU_DONATION_3 = "donation.3";

        public static final String[] ALL_SKUS = new String[]{
                SKU_DONATION_1,
                SKU_DONATION_2,
                SKU_DONATION_3,
        };
    }
}


