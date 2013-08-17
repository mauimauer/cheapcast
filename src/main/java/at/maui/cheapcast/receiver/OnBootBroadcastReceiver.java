package at.maui.cheapcast.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import at.maui.cheapcast.Const;
import at.maui.cheapcast.service.CheapCastService;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 11.08.13
 * Time: 21:58
 * To change this template use File | Settings | File Templates.
 */
public class OnBootBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
        if (intent.getAction().equals("android.intent.action.BOOT_COMPLETED") && preferences.getBoolean("start_on_boot", Const.PREF_START_ON_BOOT_DEFAULT)) {
            Intent serviceLauncher = new Intent(context, CheapCastService.class);
            context.startService(serviceLauncher);
        }
    }
}
