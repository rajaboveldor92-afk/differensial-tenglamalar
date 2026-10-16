package uz.cyber.dt;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

/**
 * Thin shell around the offline web app in assets/web. Everything (lessons, tests, labs) runs locally;
 * the network is used only for the optional AI server and video pack downloads that the user configures.
 */
public class MainActivity extends Activity {
    static final int REQ_SAVE = 11, REQ_OPEN = 12, REQ_PACK = 13;
    WebView web;
    NativeBridge bridge;
    private View customView;
    private WebChromeClient.CustomViewCallback customCallback;
    private int savedOrientation;
    private FrameLayout root;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        root = new FrameLayout(this);
        web = new WebView(this);
        root.addView(web, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(root);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);              // assets + downloaded video packs in the app's private folder
        s.setAllowContentAccess(false);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setTextZoom(100);                      // the app has its own font-size setting
        s.setBuiltInZoomControls(false);
        s.setSupportZoom(false);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        if (BuildConfigLite.DEBUG) WebView.setWebContentsDebuggingEnabled(true);

        bridge = new NativeBridge(this);
        web.addJavascriptInterface(bridge, "Android");
        web.setWebViewClient(new WebViewClient() {
            // API 24+ variant (overrides at runtime; compiled against API 23 headers)
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest req) {
                return openExternal(req.getUrl());
            }
            @SuppressWarnings("deprecation")
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, String url) {
                return openExternal(Uri.parse(url));
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onShowCustomView(View view, CustomViewCallback cb) { enterFullscreen(view, cb); }
            @Override
            public void onHideCustomView() { exitFullscreen(); }
            @Override
            public boolean onConsoleMessage(ConsoleMessage m) { return !BuildConfigLite.DEBUG; }
        });
        web.setBackgroundColor(Color.parseColor("#F6F2E9"));
        // after the system recreated the activity, restore the WebView; if that fails, start the app again (progress is in storage)
        if (state == null || web.restoreState(state) == null) web.loadUrl("file:///android_asset/web/index.html");
    }

    /** Links to the web open in the browser; in-app navigation stays inside. */
    boolean openExternal(Uri uri) {
        String scheme = uri.getScheme();
        if ("file".equals(scheme)) return false;
        if ("http".equals(scheme) || "https".equals(scheme) || "mailto".equals(scheme)) {
            try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); } catch (Exception ignored) { }
        }
        return true;
    }

    void enterFullscreen(View view, WebChromeClient.CustomViewCallback cb) {
        if (customView != null) { cb.onCustomViewHidden(); return; }
        customView = view; customCallback = cb;
        savedOrientation = getRequestedOrientation();
        root.addView(view, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        web.setVisibility(View.GONE);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
    }

    void exitFullscreen() {
        if (customView == null) return;
        root.removeView(customView);
        customView = null;
        web.setVisibility(View.VISIBLE);
        getWindow().getDecorView().setSystemUiVisibility(bridge.isDark ? 0 : View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        setRequestedOrientation(savedOrientation);
        if (customCallback != null) customCallback.onCustomViewHidden();
        customCallback = null;
    }

    /** Status/navigation bar colours follow the app theme. */
    void applyBars(boolean dark) {
        Window w = getWindow();
        int c = dark ? Color.parseColor("#14191C") : Color.parseColor("#F6F2E9");
        w.setStatusBarColor(c);
        w.setNavigationBarColor(c);
        if (customView == null) w.getDecorView().setSystemUiVisibility(dark ? 0 : View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        web.setBackgroundColor(c);
    }

    @SuppressWarnings("deprecation")
    @Override
    public void onBackPressed() {
        if (customView != null) { exitFullscreen(); return; }
        web.evaluateJavascript("(window.DT && DT.onBack) ? String(DT.onBack()) : 'false'", new android.webkit.ValueCallback<String>() { public void onReceiveValue(String value) {
            if (value == null || !value.contains("true")) finishAfterBack();
        }});
    }
    private void finishAfterBack() { moveTaskToBack(true); }

    @Override
    protected void onSaveInstanceState(Bundle out) { super.onSaveInstanceState(out); web.saveState(out); }

    @Override
    protected void onPause() {
        super.onPause();
        web.evaluateJavascript("window.DT && DT.saveNow && DT.saveNow(); var v=document.querySelector('video'); if(v) v.pause();", null);
        web.onPause();
    }

    @Override
    protected void onResume() { super.onResume(); web.onResume(); }

    @Override
    protected void onDestroy() { bridge.shutdown(); web.destroy(); super.onDestroy(); }

    @Override
    protected void onActivityResult(int req, int res, Intent data) {
        super.onActivityResult(req, res, data);
        Uri uri = (res == RESULT_OK && data != null) ? data.getData() : null;
        if (req == REQ_SAVE) bridge.onSaveResult(uri);
        else if (req == REQ_OPEN) bridge.onOpenResult(uri);
        else if (req == REQ_PACK) bridge.onPackResult(uri);
    }

    /** Run JavaScript on the UI thread (bridge callbacks come from worker threads). */
    void js(final String code) {
        runOnUiThread(new Runnable() { public void run() { if (web != null) web.evaluateJavascript(code, null); } });
    }

    static boolean atLeast(int api) { return Build.VERSION.SDK_INT >= api; }
}
