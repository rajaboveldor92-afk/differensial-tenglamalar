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

        // Android 15+ enforces edge-to-edge for modern targets; Android 16 removes the opt-out.
        // Keep the WebView outside system bars/cutouts and above the IME while letting the root background fill the window.
        if (Build.VERSION.SDK_INT >= 35) Api30Ui.enableEdgeToEdge(this, root);
        applyBars(false);

        // targetSdk 36 no longer dispatches the legacy Back key callback on Android 16.
        if (Build.VERSION.SDK_INT >= 33) Api33Back.register(this);

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
            @Override
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
        root.setPadding(0, 0, 0, 0);
        root.addView(view, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        web.setVisibility(View.GONE);
        if (Build.VERSION.SDK_INT >= 30) {
            Api30Ui.hideSystemBars(getWindow());
        } else {
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
        }
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
    }

    void exitFullscreen() {
        if (customView == null) return;
        root.removeView(customView);
        customView = null;
        web.setVisibility(View.VISIBLE);
        if (Build.VERSION.SDK_INT >= 30) Api30Ui.showSystemBars(getWindow());
        setRequestedOrientation(savedOrientation);
        if (customCallback != null) customCallback.onCustomViewHidden();
        customCallback = null;
        applyBars(bridge != null && bridge.isDark);
        root.requestApplyInsets();
    }

    /** Status/navigation bar appearance follows the app theme. */
    void applyBars(boolean dark) {
        Window w = getWindow();
        int c = dark ? Color.parseColor("#14191C") : Color.parseColor("#F6F2E9");
        if (root != null) root.setBackgroundColor(c);
        if (Build.VERSION.SDK_INT >= 35) {
            // With enforced edge-to-edge the window background, not an opaque system-bar color, supplies the backdrop.
            w.setStatusBarColor(Color.TRANSPARENT);
            w.setNavigationBarColor(Color.TRANSPARENT);
        } else {
            w.setStatusBarColor(c);
            w.setNavigationBarColor(c);
        }
        if (customView == null) {
            if (Build.VERSION.SDK_INT >= 30) Api30Ui.setLightSystemBars(w, !dark);
            else w.getDecorView().setSystemUiVisibility(dark ? 0 : View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        }
        if (web != null) web.setBackgroundColor(c);
    }

    /** Shared back-navigation path for legacy and Android 13+ predictive-back dispatch. */
    private void handleBack() {
        if (customView != null) { exitFullscreen(); return; }
        web.evaluateJavascript("(window.DT && DT.onBack) ? String(DT.onBack()) : 'false'", new android.webkit.ValueCallback<String>() {
            public void onReceiveValue(String value) {
                if (value == null || !value.contains("true")) finishAfterBack();
            }
        });
    }

    @SuppressWarnings("deprecation")
    @Override
    public void onBackPressed() {
        // Kept for Android 12L and older. Android 13+ uses Api33Back below.
        handleBack();
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

    /** API 33 symbols are isolated so this activity still loads safely on minSdk 24. */
    private static final class Api33Back {
        static void register(final MainActivity activity) {
            activity.getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                    android.window.OnBackInvokedDispatcher.PRIORITY_DEFAULT,
                    new android.window.OnBackInvokedCallback() {
                        @Override public void onBackInvoked() { activity.handleBack(); }
                    });
        }
    }

    /** Modern system-bar and inset APIs, called only on API 30+ (edge-to-edge setup only on API 35+). */
    private static final class Api30Ui {
        static void enableEdgeToEdge(final MainActivity activity, final View root) {
            activity.getWindow().setDecorFitsSystemWindows(false);
            root.setOnApplyWindowInsetsListener(new View.OnApplyWindowInsetsListener() {
                @Override
                public android.view.WindowInsets onApplyWindowInsets(View v, android.view.WindowInsets insets) {
                    if (activity.customView != null) {
                        v.setPadding(0, 0, 0, 0);
                        return insets;
                    }
                    android.graphics.Insets bars = insets.getInsets(
                            android.view.WindowInsets.Type.systemBars() | android.view.WindowInsets.Type.displayCutout());
                    android.graphics.Insets ime = insets.getInsets(android.view.WindowInsets.Type.ime());
                    v.setPadding(bars.left, bars.top, bars.right, Math.max(bars.bottom, ime.bottom));
                    return insets;
                }
            });
            root.requestApplyInsets();
        }

        static void setLightSystemBars(Window window, boolean light) {
            android.view.WindowInsetsController controller = window.getInsetsController();
            if (controller == null) return;
            int mask = android.view.WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                    | android.view.WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS;
            controller.setSystemBarsAppearance(light ? mask : 0, mask);
        }

        static void hideSystemBars(Window window) {
            android.view.WindowInsetsController controller = window.getInsetsController();
            if (controller == null) return;
            controller.setSystemBarsBehavior(android.view.WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            controller.hide(android.view.WindowInsets.Type.systemBars());
        }

        static void showSystemBars(Window window) {
            android.view.WindowInsetsController controller = window.getInsetsController();
            if (controller != null) controller.show(android.view.WindowInsets.Type.systemBars());
        }
    }
}
