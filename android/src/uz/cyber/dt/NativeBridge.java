package uz.cyber.dt;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.webkit.JavascriptInterface;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/** Methods the web app calls as window.Android.* — all small, all local except pack downloads. */
public class NativeBridge {
    private static final int MAX_STATE_BYTES = 5 * 1024 * 1024;
    private final MainActivity act;
    private final PackManager packs;
    volatile boolean isDark;
    private String pendingSave, pendingOpenPurpose, pendingPacksJson;

    NativeBridge(MainActivity a) { act = a; packs = new PackManager(a); }
    void shutdown() { packs.shutdown(); }

    /* ---- progress backup: a copy of the learning state outside WebView storage ---- */
    @JavascriptInterface
    public void backup(String json) {
        try {
            File tmp = new File(act.getFilesDir(), "state.json.tmp");
            try (OutputStream o = new FileOutputStream(tmp)) { o.write(json.getBytes(StandardCharsets.UTF_8)); }
            tmp.renameTo(new File(act.getFilesDir(), "state.json"));
        } catch (Exception ignored) { }
    }

    @JavascriptInterface
    public String restore() {
        try (InputStream in = new java.io.FileInputStream(new File(act.getFilesDir(), "state.json"))) {
            return new String(readAll(in, MAX_STATE_BYTES), StandardCharsets.UTF_8);
        } catch (Exception e) { return ""; }
    }

    @JavascriptInterface
    public void setDark(final boolean dark) { isDark = dark; act.runOnUiThread(new Runnable() { public void run() { act.applyBars(dark); } }); }

    @JavascriptInterface
    public String buildInfo() {
        try {
            String v = act.getPackageManager().getPackageInfo(act.getPackageName(), 0).versionName;
            return "Android " + android.os.Build.VERSION.RELEASE + " · " + v + (BuildConfigLite.DEBUG ? " · test" : "");
        } catch (Exception e) { return ""; }
    }

    @JavascriptInterface
    public void copyText(String s) {
        act.runOnUiThread(new Runnable() { public void run() {
            ClipboardManager cm = (ClipboardManager) act.getSystemService(Context.CLIPBOARD_SERVICE);
            if (cm != null) cm.setPrimaryClip(ClipData.newPlainText("code", s));
        }});
    }

    /* ---- export / import of progress through the system file picker (no storage permission needed) ---- */
    @JavascriptInterface
    public void saveFile(final String name, final String content) {
        pendingSave = content;
        act.runOnUiThread(new Runnable() { public void run() {
            Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT);
            i.addCategory(Intent.CATEGORY_OPENABLE);
            i.setType("application/json");
            i.putExtra(Intent.EXTRA_TITLE, name);
            try { act.startActivityForResult(i, MainActivity.REQ_SAVE); } catch (Exception e) { act.js("DT.onNativeSaved(false)"); }
        }});
    }

    void onSaveResult(Uri uri) {
        boolean ok = false;
        if (uri != null && pendingSave != null) {
            try (OutputStream o = act.getContentResolver().openOutputStream(uri, "wt")) {
                o.write(pendingSave.getBytes(StandardCharsets.UTF_8)); ok = true;
            } catch (Exception ignored) { }
        }
        pendingSave = null;
        if (uri != null) act.js("DT.onNativeSaved(" + ok + ")");
    }

    @JavascriptInterface
    public void openFile(final String purpose) {
        pendingOpenPurpose = purpose;
        act.runOnUiThread(new Runnable() { public void run() {
            Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT);
            i.addCategory(Intent.CATEGORY_OPENABLE);
            i.setType("*/*");
            i.putExtra(Intent.EXTRA_MIME_TYPES, new String[]{"application/json", "text/plain", "application/octet-stream"});
            try { act.startActivityForResult(i, MainActivity.REQ_OPEN); } catch (Exception ignored) { }
        }});
    }

    void onOpenResult(Uri uri) {
        if (uri == null) return;
        try (InputStream in = act.getContentResolver().openInputStream(uri)) {
            // Enforce the cap while reading so a huge selected file cannot first exhaust memory.
            byte[] b = readAll(in, MAX_STATE_BYTES);
            String text = new String(b, StandardCharsets.UTF_8);
            act.js("DT.onNativeFile(" + JSONObject.quote(pendingOpenPurpose) + "," + JSONObject.quote(text) + ")");
        } catch (Exception e) {
            act.js("DT.toast(DT.t('importBad'))");
        }
    }

    /* ---- offline video packs ---- */
    @JavascriptInterface
    public String packList() { return packs.list().toString(); }

    @JavascriptInterface
    public void packDownload(String id, String baseUrl, String filesJson) {
        try { packs.download(id, baseUrl, new JSONArray(filesJson)); }
        catch (Exception e) { act.js("DT.onPackProgress(" + JSONObject.quote(id) + ",0,0,'error')"); }
    }

    @JavascriptInterface
    public void packDelete(String id) { packs.delete(id); }

    @JavascriptInterface
    public void importPack(String packsJson) {
        pendingPacksJson = packsJson;
        act.runOnUiThread(new Runnable() { public void run() {
            Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT);
            i.addCategory(Intent.CATEGORY_OPENABLE);
            i.setType("application/zip");
            i.putExtra(Intent.EXTRA_MIME_TYPES, new String[]{"application/zip", "application/x-zip-compressed", "application/octet-stream"});
            try { act.startActivityForResult(i, MainActivity.REQ_PACK); } catch (Exception ignored) { }
        }});
    }

    void onPackResult(Uri uri) {
        if (uri == null || pendingPacksJson == null) return;
        final String pj = pendingPacksJson;
        pendingPacksJson = null;
        packs.importZip(uri, pj);
    }

    static byte[] readAll(InputStream in, int maxBytes) throws java.io.IOException {
        ByteArrayOutputStream bo = new ByteArrayOutputStream();
        byte[] buf = new byte[16384]; int n, total = 0;
        while ((n = in.read(buf)) > 0) {
            total += n;
            if (total > maxBytes) throw new java.io.IOException("input too large");
            bo.write(buf, 0, n);
        }
        return bo.toByteArray();
    }
}