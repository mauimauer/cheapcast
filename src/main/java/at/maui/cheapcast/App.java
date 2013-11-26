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

package at.maui.cheapcast;

import android.app.Application;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.util.Log;
import com.google.analytics.tracking.android.ExceptionReporter;
import com.google.analytics.tracking.android.GAServiceManager;
import com.google.analytics.tracking.android.GoogleAnalytics;
import com.google.analytics.tracking.android.Tracker;
import org.chromium.content_shell_apk.ContentShellApplication;

public class App extends ContentShellApplication {

    private GoogleAnalytics mGoogleAnalytics;
    private static App mInstance = null;
    private Tracker mGaTracker;
    private SharedPreferences mPreferences;

    public static App getInstance() {
        return mInstance;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;

        mPreferences = PreferenceManager.getDefaultSharedPreferences(this);

        mGoogleAnalytics = GoogleAnalytics.getInstance(this);
        mGaTracker = mGoogleAnalytics.getTracker(getString(R.string.ga_trackingId));
        mGoogleAnalytics.setAppOptOut(mPreferences.getBoolean("analytics", false));

        Thread.UncaughtExceptionHandler myHandler = new ExceptionReporter(
                mGaTracker,                                        // Currently used Tracker.
                GAServiceManager.getInstance(),                   // GAServiceManager singleton.
                Thread.getDefaultUncaughtExceptionHandler(), this);     // Current default uncaught exception handler.

        // Make myHandler the new default uncaught exception handler.
        Thread.setDefaultUncaughtExceptionHandler(myHandler);

        // work-around for Android defect 9431
        System.setProperty("java.net.preferIPv4Stack", "true");
        System.setProperty("java.net.preferIPv6Addresses", "false");
        System.setProperty("org.eclipse.jetty.util.UrlEncoded.charset", "utf-8");
    }

    public Tracker getTracker() {
        return mGaTracker;
    }

    public GoogleAnalytics getGoogleAnalytics() {
        return mGoogleAnalytics;
    }

}
