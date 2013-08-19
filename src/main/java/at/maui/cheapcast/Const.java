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

    public static final String APP_INFO = "<?xml version='1.0' encoding='UTF-8'?>\n" +
            "    <service xmlns='urn:dial-multiscreen-org:schemas:dial'>\n" +
            "        <name>#name#</name>\n" +
            "        <options allowStop='true'/>\n" +
            "        <activity-status xmlns='urn:chrome.google.com:cast'>\n" +
            "            <description>Legacy</description>\n" +
            "        </activity-status>\n" +
            "        <servicedata xmlns='urn:chrome.google.com:cast'>\n" +
            "            <connectionSvcURL>#connectionSvcURL#</connectionSvcURL>\n" +
            "            <protocols>#protocols#</protocols>\n" +
            "        </servicedata>\n" +
            "        <state>#state#</state>\n" +
            "        #link#\n" +
            "    </service>";

    public static final String PAYPAL_USER = "sebastian@n-unity.de";
    public static final String PAYPAL_CURRENCY_CODE = "EUR";
    public static final String FLATTR_URL = "flattr.com/thing/3a3d7f62aac8b54f1cd3938824a28052";
    public static final String FLATTR_PROJECT_URL = "https://github.com/mauimauer/cheapcast/";
    public static final String APP_EXTRA = "at.maui.cheapcast.app";
    public static final String ACTION_RESTART = "at.maui.cheapcast.RESTART_SERVICE";
    public static final String ACTION_STOP = "at.maui.cheapcast.STOP_SERVICE";

    public static final boolean PREF_START_ON_BOOT_DEFAULT = false;
}
