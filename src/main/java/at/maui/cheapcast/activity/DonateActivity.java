package at.maui.cheapcast.activity;

import android.os.Bundle;
import android.support.v4.app.FragmentTransaction;
import at.maui.cheapcast.App;
import at.maui.cheapcast.Const;
import at.maui.cheapcast.R;
import at.maui.cheapcast.fragment.DonationsFragment;
import com.github.rtyley.android.sherlock.roboguice.activity.RoboSherlockFragmentActivity;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 11.08.13
 * Time: 20:40
 * To change this template use File | Settings | File Templates.
 */
public class DonateActivity extends RoboSherlockFragmentActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_donate);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(true);
        getSupportActionBar().setIcon(R.drawable.ic_ab);

        FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
        DonationsFragment donationsFragment = DonationsFragment.newInstance(false, true, Const.PAYPAL_USER,
                Const.PAYPAL_CURRENCY_CODE, getString(R.string.donation_paypal_item), false, Const.FLATTR_PROJECT_URL, Const.FLATTR_URL);
        ft.replace(R.id.content, donationsFragment, "donationsFragment");
        ft.commit();
    }

    @Override
    protected void onStart() {
        super.onStart();
        App.getInstance().getTracker().sendView("/Donate");
    }
}
