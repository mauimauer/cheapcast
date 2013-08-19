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

import android.os.Bundle;
import android.support.v4.app.FragmentTransaction;
import at.maui.cheapcast.App;
import at.maui.cheapcast.Const;
import at.maui.cheapcast.R;
import at.maui.cheapcast.fragment.DonationsFragment;
import com.github.rtyley.android.sherlock.roboguice.activity.RoboSherlockFragmentActivity;

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
