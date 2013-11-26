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

package at.maui.cheapcast.chromecast;

import at.maui.cheapcast.Const;
import at.maui.cheapcast.chromecast.model.ChromeCastApp;
import at.maui.cheapcast.chromecast.model.ChromeCastConfig;
import com.google.gson.FieldNamingPolicy;
import com.google.gson.FieldNamingStrategy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 25.11.13
 * Time: 19:46
 * To change this template use File | Settings | File Templates.
 */
public class ChromeCastConfigClient {

    public void getApps(final ChromeCastConfigListener listener) {

        if(listener == null)
            return;

        new Thread() {
            @Override
            public void run() {
                try {
                    URL u = new URL(Const.CHROME_CAST_CONFIG_URL);
                    HttpURLConnection c = (HttpURLConnection) u.openConnection();
                    c.setRequestMethod("GET");
                    c.setRequestProperty("Content-length", "0");
                    c.setUseCaches(false);
                    c.setAllowUserInteraction(false);
                    c.connect();
                    int status = c.getResponseCode();

                    switch (status) {
                        case 200:
                        case 201:
                            BufferedReader br = new BufferedReader(new InputStreamReader(c.getInputStream()));
                            StringBuilder sb = new StringBuilder();
                            String line;
                            while ((line = br.readLine()) != null) {
                                sb.append(line+"\n");
                            }
                            br.close();
                            Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES).create();
                            ChromeCastConfig conf = gson.fromJson(sb.toString().substring(4), ChromeCastConfig.class);
                            listener.onGotAppConfigurations(conf.getApplications());
                            return;
                    }

                } catch (MalformedURLException ex) {
                } catch (IOException ex) {
                }
                listener.onGotAppConfigurations(new ArrayList<ChromeCastApp>());
            }
        }.start();

    }

    public interface ChromeCastConfigListener {
        void onGotAppConfigurations(List<ChromeCastApp> apps);
    }
}
