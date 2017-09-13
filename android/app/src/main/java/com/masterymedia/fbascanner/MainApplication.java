package com.masterymedia.fbascanner;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.rnziparchive.RNZipArchivePackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.anyline.reactnative.AnylinePackage;
import com.taessina.paypal.RNPaypalWrapperPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnfs.RNFSPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.pgsqlite.SQLitePluginPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNZipArchivePackage(),
            new ReactNativeYouTube(),
            new RNPaypalWrapperPackage(),
            new VectorIconsPackage(),
            new RNFSPackage(),
            new RCTCameraPackage(),
            new BarcodeScannerPackage(),
            new SQLitePluginPackage(),
              new AnylinePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
