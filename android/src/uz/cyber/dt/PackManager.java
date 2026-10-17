package uz.cyber.dt;

import android.net.Uri;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * Offline video packs in the app's private folder: files/packs/<packId>/.
 * Downloads resume from partial files (HTTP Range), every file is checked against its SHA-256 from the manifest,
 * and a pack is marked complete only after all files verify. Deleting a pack never touches learning progress.
 */
class PackManager {
    private static final long MAX_IMPORT_BYTES = 128L * 1024 * 1024;
    private final MainActivity act;
    private final File dir;
    private final ExecutorService pool = Executors.newSingleThreadExecutor();
    private final Set<String> running = new HashSet<>();

    PackManager(MainActivity a) { act = a; dir = new File(a.getFilesDir(), "packs"); dir.mkdirs(); }
    void shutdown() { pool.shutdownNow(); }

    JSONObject list() {
        JSONObject o = new JSONObject();
        File[] ds = dir.listFiles();
        if (ds != null) for (File d : ds) {
            File ok = new File(d, ".complete");
            if (d.isDirectory() && ok.exists()) {
                try { o.put(d.getName(), new JSONObject().put("dir", d.getAbsolutePath()).put("bytes", size(d))); } catch (Exception ignored) { }
            }
        }
        return o;
    }

    void delete(String id) {
        if (!safeId(id)) return;
        File d = new File(dir, id);
        File[] fs = d.listFiles();
        if (fs != null) for (File f : fs) f.delete();
        d.delete();
    }

    void download(final String id, final String baseUrl, final JSONArray files) {
        if (!safeId(id) || !baseUrl.startsWith("https://")) { progress(id, 0, 0, "error", "https only"); return; }
        synchronized (running) { if (running.contains(id)) return; running.add(id); }
        pool.execute(new Runnable() { public void run() {
            try {
                File d = new File(dir, id); d.mkdirs();
                new File(d, ".complete").delete();
                long total = 0, done = 0;
                for (int i = 0; i < files.length(); i++) {
                    JSONObject f = files.getJSONObject(i);
                    validateFileSpec(f);
                    total = Math.addExact(total, f.getLong("bytes"));
                }
                for (int i = 0; i < files.length(); i++) {
                    JSONObject f = files.getJSONObject(i);
                    String name = f.getString("name");
                    long expected = f.getLong("bytes");
                    File out = new File(d, name);
                    if (out.exists() && out.length() == expected && sha256(out).equalsIgnoreCase(f.getString("sha256"))) { done += out.length(); continue; }
                    File part = new File(d, name + ".part");
                    done = fetch(baseUrl + "/" + name, part, expected, id, done, total);
                    progress(id, done, total, "verify", null);
                    if (part.length() != expected || !sha256(part).equalsIgnoreCase(f.getString("sha256"))) { part.delete(); throw new Exception("checksum or size"); }
                    if (!part.renameTo(out)) throw new Exception("rename");
                }
                new FileOutputStream(new File(d, ".complete")).close();
                progress(id, total, total, "ok", null);
            } catch (Exception e) {
                progress(id, 0, 0, "error", null);
            } finally {
                synchronized (running) { running.remove(id); }
            }
        }});
    }

    /** Downloads into .part, resuming from its current length. Returns the new overall byte count. */
    private long fetch(String url, File part, long expected, String id, long doneBefore, long total) throws Exception {
        long have = part.exists() ? part.length() : 0;
        if (have > expected) { part.delete(); have = 0; }
        HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
        c.setConnectTimeout(15000); c.setReadTimeout(30000);
        c.setInstanceFollowRedirects(true);
        if (have > 0) c.setRequestProperty("Range", "bytes=" + have + "-");
        int code = c.getResponseCode();
        boolean append = code == 206;
        if (code != 200 && code != 206) throw new Exception("http " + code);
        if (!append) have = 0;
        long current = have, done = doneBefore + have, last = 0;
        try (InputStream in = c.getInputStream(); OutputStream o = new FileOutputStream(part, append)) {
            byte[] buf = new byte[65536]; int n;
            while ((n = in.read(buf)) > 0) {
                current += n;
                if (current > expected) throw new Exception("download larger than manifest");
                o.write(buf, 0, n); done += n;
                long now = System.currentTimeMillis();
                if (now - last > 400) { last = now; progress(id, done, total, "run", null); }
            }
        } finally { c.disconnect(); }
        if (current != expected) throw new Exception("download size mismatch");
        return done;
    }

    /** Imports a zip whose files belong to one pack listed in the manifest; every file must match its checksum. */
    void importZip(final Uri uri, final String packsJson) {
        pool.execute(new Runnable() { public void run() {
            File tmp = new File(dir, ".import"); deleteDir(tmp); tmp.mkdirs();
            try {
                JSONArray packs = new JSONArray(packsJson);
                Map<String, Long> maxBytesByName = new HashMap<>();
                for (int i = 0; i < packs.length(); i++) {
                    JSONObject p = packs.getJSONObject(i);
                    String packId = p.getString("id");
                    if (!safeId(packId)) throw new Exception("bad pack id");
                    JSONArray fs = p.getJSONArray("files");
                    for (int k = 0; k < fs.length(); k++) {
                        JSONObject f = fs.getJSONObject(k);
                        validateFileSpec(f);
                        String name = f.getString("name"); long bytes = f.getLong("bytes");
                        Long old = maxBytesByName.get(name);
                        if (old == null || bytes > old) maxBytesByName.put(name, bytes);
                    }
                }

                Set<String> seen = new HashSet<>();
                long imported = 0;
                try (ZipInputStream z = new ZipInputStream(act.getContentResolver().openInputStream(uri))) {
                    ZipEntry e;
                    while ((e = z.getNextEntry()) != null) {
                        if (e.isDirectory()) continue;
                        String n = e.getName(); n = n.substring(n.lastIndexOf('/') + 1);
                        if (!safeName(n) || !maxBytesByName.containsKey(n)) throw new Exception("unexpected file");
                        if (!seen.add(n)) throw new Exception("duplicate file");
                        long expectedMax = maxBytesByName.get(n), written = 0;
                        try (OutputStream o = new FileOutputStream(new File(tmp, n))) {
                            byte[] b = new byte[65536]; int r;
                            while ((r = z.read(b)) > 0) {
                                written += r; imported += r;
                                if (written > expectedMax || imported > MAX_IMPORT_BYTES) throw new Exception("zip too large");
                                o.write(b, 0, r);
                            }
                        }
                    }
                }

                // Find the pack all of whose files are present and valid. Extra/unknown files were rejected above.
                String found = null;
                for (int i = 0; i < packs.length() && found == null; i++) {
                    JSONObject p = packs.getJSONObject(i); JSONArray fs = p.getJSONArray("files"); boolean all = true;
                    for (int k = 0; k < fs.length() && all; k++) {
                        JSONObject f = fs.getJSONObject(k); File x = new File(tmp, f.getString("name"));
                        all = x.exists() && x.length() == f.getLong("bytes") && sha256(x).equalsIgnoreCase(f.getString("sha256"));
                    }
                    if (all) found = p.getString("id");
                }
                if (found == null || !safeId(found)) throw new Exception("no matching pack");
                File d = new File(dir, found); deleteDir(d);
                if (!tmp.renameTo(d)) throw new Exception("rename");
                new FileOutputStream(new File(d, ".complete")).close();
                act.js("DT.onPackImported(true)");
            } catch (Exception e) {
                deleteDir(tmp);
                act.js("DT.onPackImported(false)");
            }
        }});
    }

    private static void validateFileSpec(JSONObject f) throws Exception {
        String name = f.getString("name");
        long bytes = f.getLong("bytes");
        String hash = f.getString("sha256");
        if (!safeName(name) || bytes < 0 || bytes > MAX_IMPORT_BYTES || hash == null || !hash.matches("(?i)[0-9a-f]{64}")) throw new Exception("bad manifest file");
    }

    private void progress(String id, long done, long total, String state, String msg) {
        act.js("DT.onPackProgress && DT.onPackProgress(" + JSONObject.quote(id) + "," + done + "," + total + ",'" + state + "'" + (msg != null ? "," + JSONObject.quote(msg) : "") + ")");
    }

    static String sha256(File f) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        try (InputStream in = new FileInputStream(f)) { byte[] b = new byte[65536]; int n; while ((n = in.read(b)) > 0) md.update(b, 0, n); }
        StringBuilder sb = new StringBuilder();
        for (byte x : md.digest()) sb.append(String.format("%02x", x));
        return sb.toString();
    }
    private static long size(File d) { long s = 0; File[] fs = d.listFiles(); if (fs != null) for (File f : fs) s += f.length(); return s; }
    private static void deleteDir(File d) { File[] fs = d.listFiles(); if (fs != null) for (File f : fs) f.delete(); d.delete(); }
    private static boolean safeId(String s) { return s != null && s.matches("[A-Za-z0-9-]{3,40}"); }
    private static boolean safeName(String s) { return s != null && s.matches("[A-Za-z0-9._-]{1,80}") && !s.startsWith("."); }
}