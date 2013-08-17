package at.maui.cheapcast.fragment;

import android.os.Bundle;
import android.text.Html;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import at.maui.cheapcast.R;
import at.maui.cheapcast.Utils;
import com.github.rtyley.android.sherlock.roboguice.fragment.RoboSherlockFragment;
import roboguice.inject.InjectView;

import java.io.IOException;
import java.io.InputStream;

public class ExtLibrariesFragment extends HtmlAssetFragment {

    @Override
    public String getAssetPath() {
        return "third_party.html";  //To change body of implemented methods use File | Settings | File Templates.
    }
}