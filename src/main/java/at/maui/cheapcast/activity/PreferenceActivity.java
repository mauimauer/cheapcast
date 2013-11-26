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

package at.maui.cheapcast.activity;

import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.preference.CheckBoxPreference;
import android.preference.Preference;
import android.preference.PreferenceScreen;
import android.util.Log;
import at.maui.cheapcast.App;
import at.maui.cheapcast.Const;
import at.maui.cheapcast.R;
import at.maui.cheapcast.service.CheapCastService;
import com.actionbarsherlock.app.SherlockPreferenceActivity;
import com.actionbarsherlock.view.Menu;
import com.actionbarsherlock.view.MenuItem;

public class PreferenceActivity extends SherlockPreferenceActivity {

    private static final String LOG_TAG = "PreferenceActivity";
    private Intent mServiceIntent;
    private boolean mConnected = false;
    private SharedPreferences mPreferences;

    private ServiceConnection mConnection = new ServiceConnection() {
        // Called when the connection with the service is established
        public void onServiceConnected(ComponentName className, IBinder service) {
            Log.d(LOG_TAG, "Connected to CheapCastService");
            mConnected = true;
            invalidateOptionsMenu();
        }

        // Called when the connection with the service disconnects unexpectedly
        public void onServiceDisconnected(ComponentName className) {
            Log.d(LOG_TAG, "Disconnected from CheapCastService");
            mConnected = false;
            invalidateOptionsMenu();
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getSupportActionBar().setIcon(R.drawable.ic_ab);

        getPreferenceManager().setSharedPreferencesName("cheapcast");
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
            getPreferenceManager().setSharedPreferencesMode(MODE_PRIVATE | MODE_MULTI_PROCESS);
        } else {
            getPreferenceManager().setSharedPreferencesMode(MODE_PRIVATE);
        }
        if(!getPreferenceManager().getSharedPreferences().contains("friendly_name")) {
            getPreferenceManager().getSharedPreferences().edit().putString("friendly_name", getString(R.string.cheapcast)+"_"+Build.MODEL).commit();
        }

        addPreferencesFromResource(R.xml.settings);
        mServiceIntent = new Intent(PreferenceActivity.this, CheapCastService.class);

    }

    @Override
    public void invalidateOptionsMenu() {
        super.invalidateOptionsMenu();    //To change body of overridden methods use File | Settings | File Templates.
    }

    @Override
    protected void onResume() {
        super.onStart();
        bindService(mServiceIntent, mConnection, 0);
    }

    @Override
    protected void onPause() {
        if(mConnected)
            unbindService(mConnection);
        super.onPause();    //To change body of overridden methods use File | Settings | File Templates.
    }

    @Override
    public boolean onPreferenceTreeClick(PreferenceScreen preferenceScreen, Preference preference) {

        if(preference.getKey().equals("about")) {
            Intent aboutIntent = new Intent(PreferenceActivity.this, AboutActivity.class);
            startActivity(aboutIntent);
            return true;
        } else if(preference.getKey().equals("donate")) {
            Intent donateIntent = new Intent(PreferenceActivity.this, DonateActivity.class);
            startActivity(donateIntent);
            return true;
        } else if(preference.getKey().equals("analytics")) {
            CheckBoxPreference cb = (CheckBoxPreference) preference;
            App.getInstance().getGoogleAnalytics().setAppOptOut(cb.isChecked());
        } else if(preference.getKey().equals("help")) {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(Const.SUPPORT_URL));
            startActivity(browserIntent);
        }


        return super.onPreferenceTreeClick(preferenceScreen, preference);    //To change body of overridden methods use File | Settings | File Templates.
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        menu.clear();
        if(mConnected) {
            getSupportMenuInflater().inflate(R.menu.preferences_menu, menu);
        } else {
            getSupportMenuInflater().inflate(R.menu.preferences_menu_start, menu);
        }
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        Intent serviceIntent = new Intent(this, CheapCastService.class);

        switch(item.getItemId()) {
            case R.id.stopService:
                stopService(serviceIntent);
                return true;
            case R.id.restartService:
                stopService(serviceIntent);
                startService(serviceIntent);
                bindService(mServiceIntent, mConnection, 0);
                return true;
            case R.id.startService:
                startService(serviceIntent);
                if(!mConnected) bindService(mServiceIntent, mConnection, 0);
                return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
