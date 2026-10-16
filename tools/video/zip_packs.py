"""Makes one zip per video pack (for 'Import pack from file' in the app) from dist/video/manifest.json.
Usage: python3 tools/video/zip_packs.py [dist/video] [dist/video-zips]"""
import json, os, sys, zipfile
src = sys.argv[1] if len(sys.argv) > 1 else 'dist/video'
dst = sys.argv[2] if len(sys.argv) > 2 else 'dist/video-zips'
os.makedirs(dst, exist_ok=True)
for p in json.load(open(os.path.join(src, 'manifest.json')))['packs']:
    out = os.path.join(dst, p['id'] + '.zip')
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_STORED) as z:  # mp4 is already compressed
        for f in p['files']:
            z.write(os.path.join(src, f['name']), f['name'])
    print(p['id'], os.path.getsize(out))
