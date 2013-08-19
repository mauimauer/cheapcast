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

package at.maui.cheapcast.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import at.maui.cheapcast.Const;
import at.maui.cheapcast.service.CheapCastService;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 12.08.13
 * Time: 01:27
 * To change this template use File | Settings | File Templates.
 */
public class ServiceControlReceiver extends BroadcastReceiver {

    private static final String LOG_TAG = "ServiceControlReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        Intent service = new Intent(context, CheapCastService.class);

        if(intent != null && intent.getAction().equals(Const.ACTION_RESTART)) {
            // Restart Service
            context.stopService(service);
            context.startService(service);
        } else {
            // Stop Service
            context.stopService(service);
        }
    }
}
