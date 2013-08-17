package at.maui.cheapcast.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
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
