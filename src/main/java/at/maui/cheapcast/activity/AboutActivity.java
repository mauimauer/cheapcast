package at.maui.cheapcast.activity;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.support.v4.view.ViewPager;
import android.util.Log;
import at.maui.cheapcast.App;
import at.maui.cheapcast.R;
import at.maui.cheapcast.fragment.AboutFragment;
import at.maui.cheapcast.fragment.ChangelogFragment;
import at.maui.cheapcast.fragment.ExtLibrariesFragment;
import com.actionbarsherlock.view.MenuItem;
import com.github.rtyley.android.sherlock.roboguice.activity.RoboSherlockFragmentActivity;
import com.viewpagerindicator.TitlePageIndicator;
import roboguice.inject.InjectView;


public class AboutActivity extends RoboSherlockFragmentActivity{
    private static String LOG_TAG = "CheapCast-AboutActivity";

    @InjectView(R.id.pager)
    private ViewPager mViewPager;

    @InjectView(R.id.titles)
    private TitlePageIndicator mIndicator;

    private AboutPagerAdapter mViewPagerAdapter;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_about);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(true);
        getSupportActionBar().setIcon(R.drawable.ic_ab);
        getSupportActionBar().setTitle(R.string.about);


        mIndicator.setOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int i, float v, int i2) {
                //To change body of implemented methods use File | Settings | File Templates.
            }

            @Override
            public void onPageSelected(int i) {
                Log.d(LOG_TAG, "onPageSelected()");
                trackViewPagerPage(i);
            }

            @Override
            public void onPageScrollStateChanged(int i) {
                //To change body of implemented methods use File | Settings | File Templates.
            }
        });

        mViewPagerAdapter = new AboutPagerAdapter(this, getSupportFragmentManager());
        mViewPager.setAdapter(mViewPagerAdapter);
        mIndicator.setViewPager(mViewPager);
    }

    private void trackViewPagerPage(int position) {
        Log.d(LOG_TAG, "trackViewPagerPage()");
        App.getInstance().getTracker().sendView(String.format("/About/%s", getResources().getStringArray(R.array.about_tabs)[position]));
    }

    @Override
    protected void onStart() {
        super.onStart();
        App.getInstance().getTracker().sendView("/About");
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        if(item.getItemId() == android.R.id.home) {
            finish();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public class AboutPagerAdapter extends FragmentStatePagerAdapter {
        private Context mContext;

        public AboutPagerAdapter(Context ctx, FragmentManager fm) {
            super(fm);
            mContext = ctx;
        }

        @Override
        public int getItemPosition(Object object) {
            return POSITION_NONE;
        }

        @Override
        public int getCount() {
            return mContext.getResources().getStringArray(R.array.about_tabs).length;
        }

        @Override
        public Fragment getItem(int position) {
            switch(position) {
                case 0:
                    return new AboutFragment();
                case 1:
                    return new ChangelogFragment();
                case 2:
                    return new ExtLibrariesFragment();
            }
            return null;
        }

        @Override
        public CharSequence getPageTitle(int position) {
            return mContext.getResources().getStringArray(R.array.about_tabs)[position];
        }
    }
}
