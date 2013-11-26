package at.maui.cheapcast.activity;

import android.app.Activity;
import android.content.*;
import android.os.*;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.text.TextUtils;
import android.util.Log;
import android.view.*;
import android.webkit.*;
import at.maui.cheapcast.App;
import at.maui.cheapcast.Const;
import at.maui.cheapcast.R;
import at.maui.cheapcast.service.CheapCastService;
import at.maui.cheapcast.service.ICheapCastCallback;
import at.maui.cheapcast.service.ICheapCastService;
import org.chromium.base.ChromiumActivity;
import org.chromium.content.app.LibraryLoader;
import org.chromium.content.browser.*;
import org.chromium.content.common.CommandLine;
import org.chromium.content.common.ProcessInitException;
import org.chromium.content_shell.Shell;
import org.chromium.content_shell.ShellManager;
import org.chromium.content_shell_apk.ContentShellActivity;
import org.chromium.content_shell_apk.ContentShellFragment;
import org.chromium.ui.WindowAndroid;

/**
 * Created with IntelliJ IDEA.
 * User: maui
 * Date: 09.09.13
 * Time: 15:29
 * To change this template use File | Settings | File Templates.
 */
public class ChromiumCastActivity extends ChromiumActivity {
    public static final String LOG_TAG = "ChromiumCastActivity";
    public static final String LOG_TAG_JS = "JS-ChromiumCastActivity";


    public static final String COMMAND_LINE_FILE = "/data/local/tmp/content-shell-command-line";
    private static final String TAG = ContentShellActivity.class.getName();

    private static final String ACTIVE_SHELL_URL_KEY = "activeUrl";
    private static final String ACTION_START_TRACE =
            "org.chromium.content_shell.action.PROFILE_START";
    private static final String ACTION_STOP_TRACE =
            "org.chromium.content_shell.action.PROFILE_STOP";
    public static final String COMMAND_LINE_ARGS_KEY = "commandLineArgs";

    private ShellManager mShellManager;
    private WindowAndroid mWindowAndroid;
    private BroadcastReceiver mReceiver;

    private PowerManager mPowerManager;
    private PowerManager.WakeLock mWakeLock;

    private ICheapCastService mCheapCastService;
    private ServiceConnection mConnection = new ServiceConnection() {
        // Called when the connection with the service is established
        public void onServiceConnected(ComponentName className, IBinder service) {
            Log.d(LOG_TAG, "Connected to CheapCastService");
            mCheapCastService = ICheapCastService.Stub.asInterface(service);
            try {
                mCheapCastService.addListener(mCallback);
            } catch (RemoteException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        }

        // Called when the connection with the service disconnects unexpectedly
        public void onServiceDisconnected(ComponentName className) {
            Log.d(LOG_TAG, "Disconnected from CheapCastService");
            mCheapCastService = null;
            ChromiumCastActivity.this.finish();

        }
    };

    @Override
    protected void onNewIntent(Intent intent) {
        Log.d(LOG_TAG, "onNewIntent()");

        if (getCommandLineParamsFromIntent(intent) != null) {
            Log.i(TAG, "Ignoring command line params: can only be set when creating the activity.");
        }

        String url = getUrlFromIntent(intent);
        if (!TextUtils.isEmpty(url)) {
            Shell activeView = getActiveShell();
            if (activeView != null) {
                activeView.loadUrl(url);
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(LOG_TAG, "onResume()");

        ContentView view = getActiveContentView();
        if (view != null) view.onActivityResume();
        IntentFilter intentFilter = new IntentFilter(ACTION_START_TRACE);
        intentFilter.addAction(ACTION_STOP_TRACE);
        mReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
                String extra = intent.getStringExtra("file");
                if (ACTION_START_TRACE.equals(action)) {
                    if (extra.isEmpty()) {
                        Log.e(TAG, "Can not start tracing without specifing saving location");
                    } else {
                        TracingIntentHandler.beginTracing(extra);
                        Log.i(TAG, "start tracing");
                    }
                } else if (ACTION_STOP_TRACE.equals(action)) {
                    Log.i(TAG, "stop tracing");
                    TracingIntentHandler.endTracing();
                }
            }
        };
        registerReceiver(mReceiver, intentFilter);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(LOG_TAG, "onCreate()");


        if(Build.VERSION.SDK_INT  >= Build.VERSION_CODES.KITKAT) {
            getWindow().getDecorView().setSystemUiVisibility(

                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        } else {
            // remove title
            requestWindowFeature(Window.FEATURE_NO_TITLE);
            getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                    WindowManager.LayoutParams.FLAG_FULLSCREEN);
        }

        mPowerManager = (PowerManager) getSystemService(POWER_SERVICE);
        mWakeLock = mPowerManager.newWakeLock(PowerManager.ACQUIRE_CAUSES_WAKEUP | PowerManager.FULL_WAKE_LOCK | PowerManager.ON_AFTER_RELEASE, "cheapcast");
        mWakeLock.acquire();

        Intent serviceIntent = new Intent(ChromiumCastActivity.this, CheapCastService.class);
        bindService(serviceIntent, mConnection, 0);

        // Initializing the command line must occur before loading the library.
        if (!CommandLine.isInitialized()) {
            CommandLine.init(null);
            String[] commandLineParams = getCommandLineParamsFromIntent(getIntent());
            if (commandLineParams != null) {
                CommandLine.getInstance().appendSwitchesAndArguments(commandLineParams);
            }
        }
        waitForDebuggerIfNeeded();

        DeviceUtils.addDeviceSpecificUserAgentSwitch(this);
        try {
            LibraryLoader.ensureInitialized();
            setContentView(R.layout.activity_chromiumcast);

            mShellManager = (ShellManager) findViewById(org.chromium.R.id.shell_container);
            mWindowAndroid = new WindowAndroid(this);
            mWindowAndroid.restoreInstanceState(savedInstanceState);
            mShellManager.setWindow(mWindowAndroid);
            ContentVideoView.registerContentVideoViewContextDelegate(
                    new ActivityContentVideoViewDelegate(this));

            String startupUrl = getUrlFromIntent(getIntent());
            if (!TextUtils.isEmpty(startupUrl)) {
                mShellManager.setStartupUrl(Shell.sanitizeUrl(startupUrl));
            }
            if (!AndroidBrowserProcess.init(this, AndroidBrowserProcess.MAX_RENDERERS_AUTOMATIC)) {
                String shellUrl = ShellManager.DEFAULT_SHELL_URL;
                if (savedInstanceState != null
                        && savedInstanceState.containsKey(ACTIVE_SHELL_URL_KEY)) {
                    shellUrl = savedInstanceState.getString(ACTIVE_SHELL_URL_KEY);
                }
                mShellManager.launchShell(shellUrl);
            }
            mShellManager.getActiveShell().getContentView().setUserAgent("Mozilla/5.0 (CrKey - 1.1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1573.2 Safari/537.36");
        } catch (ProcessInitException e) {
            Log.e(TAG, "ContentView initialization failed.", e);
            finish();
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        Log.d(LOG_TAG, "onSaveInstanceState()");
        Shell activeShell = getActiveShell();
        if (activeShell != null) {
            outState.putString(ACTIVE_SHELL_URL_KEY, activeShell.getContentView().getUrl());
        }


        mWindowAndroid.saveInstanceState(outState);
    }

    private void waitForDebuggerIfNeeded() {
        if (CommandLine.getInstance().hasSwitch(CommandLine.WAIT_FOR_JAVA_DEBUGGER)) {
            Log.e(TAG, "Waiting for Java debugger to connect...");
            android.os.Debug.waitForDebugger();
            Log.e(TAG, "Java debugger connected. Resuming execution.");
        }
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d(LOG_TAG, "onStart()");

        String url = getUrlFromIntent(getIntent());
        if (!TextUtils.isEmpty(url)) {
            Shell activeView = getActiveShell();
            if (activeView != null) {
                activeView.loadUrl(url);
            }
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if(keyCode == KeyEvent.KEYCODE_BACK || keyCode == KeyEvent.KEYCODE_HOME)
            finish();

        return super.onKeyDown(keyCode, event);    //To change body of overridden methods use File | Settings | File Templates.
    }


    private ICheapCastCallback mCallback = new ICheapCastCallback.Stub() {

        @Override
        public void onAppStopped(String appName) throws RemoteException {
            Log.d(TAG, "onAppStopped()");
            ChromiumCastActivity.this.finish();
        }
    };


    @Override
    protected void onDestroy() {
        Log.d(LOG_TAG, "onDestroy");
        super.onDestroy();

        Shell activeView = getActiveShell();
        if (activeView != null) {
            activeView.loadUrl("about:blank");
        }

        ContentView view = getActiveContentView();
        if (view != null) view.destroy();

        if(mCheapCastService != null) {
            try {
                mCheapCastService.removeListener();
            } catch (RemoteException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        }

        if(mWakeLock.isHeld()) {
            mWakeLock.release();
            mWakeLock = null;
        }

        if(mConnection != null)
            unbindService(mConnection);

    }

    @Override
    protected void onPause() {
        Log.d(LOG_TAG, "onPause()");
        ContentView view = getActiveContentView();
        if (view != null) view.onActivityPause();

        super.onPause();
        unregisterReceiver(mReceiver);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Log.d(LOG_TAG, "onActivityResult()");
        mWindowAndroid.onActivityResult(requestCode, resultCode, data);
    }

    private static String getUrlFromIntent(Intent intent) {
        return intent != null ? intent.getDataString() : null;
    }

    private static String[] getCommandLineParamsFromIntent(Intent intent) {
        return intent != null ? intent.getStringArrayExtra(COMMAND_LINE_ARGS_KEY) : null;
    }

    /**
     * @return The {@link org.chromium.content_shell.ShellManager} configured for the activity or null if it has not been
     *         created yet.
     */
    public ShellManager getShellManager() {
        return mShellManager;
    }

    /**
     * @return The currently visible {@link org.chromium.content_shell.Shell} or null if one is not showing.
     */
    public Shell getActiveShell() {
        return mShellManager != null ? mShellManager.getActiveShell() : null;
    }

    /**
     * @return The {@link org.chromium.content.browser.ContentView} owned by the currently visible {@link org.chromium.content_shell.Shell} or null if one
     *         is not showing.
     */
    public ContentView getActiveContentView() {
        Shell shell = getActiveShell();
        return shell != null ? shell.getContentView() : null;
    }
}
