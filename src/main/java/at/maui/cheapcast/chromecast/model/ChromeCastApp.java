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

package at.maui.cheapcast.chromecast.model;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 25.11.13
 * Time: 19:39
 * To change this template use File | Settings | File Templates.
 */
public class ChromeCastApp {
    private boolean useChannel, allowEmptyPostData, allowRestart, external = false;
    private String appName, url, dialInfo, commandLine;

    public boolean isUseChannel() {
        return useChannel;
    }

    public boolean isAllowEmptyPostData() {
        return allowEmptyPostData;
    }

    public boolean isAllowRestart() {
        return allowRestart;
    }

    public boolean isExternal() {
        return external;
    }

    public String getAppName() {
        return appName;
    }

    public String getUrl() {
        return url;
    }

    public String getDialInfo() {
        return dialInfo;
    }

    public String getCommandLine() {
        return commandLine;
    }
}
