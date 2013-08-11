package at.maui.cheapcast.activity;

import android.content.Intent;
import android.os.Bundle;
import at.maui.cheapcast.R;
import at.maui.cheapcast.service.CheapCastService;
import com.actionbarsherlock.app.SherlockPreferenceActivity;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 11.08.13
 * Time: 00:06
 * To change this template use File | Settings | File Templates.
 */
public class PreferenceActivity extends SherlockPreferenceActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);    //To change body of overridden methods use File | Settings | File Templates.

        getSupportActionBar().setIcon(R.drawable.ic_ab);
        Intent i=new Intent(this, CheapCastService.class);
        startService(i);

        addPreferencesFromResource(R.xml.settings);
    }
}
