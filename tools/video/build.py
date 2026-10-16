#!/usr/bin/env python3
"""Builds the video lessons from the scripts in web/content/video/*.js.

For every part and narration language:
  1. synthesizes each segment with espeak-ng (synthetic voice, labelled as such in the app),
  2. renders each segment's slide at 1280x720 with the app's own slide renderer (web/slide.html, Playwright),
  3. joins slides + audio with ffmpeg into MP4 (720p and 480p),
  4. writes WebVTT subtitles for every audio/subtitle language pair and a plain-text transcript,
then writes web/video/index.js (segment timings + pack list with sizes and SHA-256).

Usage: python3 tools/video/build.py [--topics t01,t02] [--bundle t01] [--out dist/video]
The web server must serve web/ on http://localhost:8765 (python3 -m http.server 8765 -d web).
"""
import argparse, array, hashlib, json, os, re, shutil, subprocess, sys, wave

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
LANGS = ['uz', 'ru', 'en']
VOICE = {'uz': 'uz', 'ru': 'ru', 'en': 'en-us'}
SPEED = {'uz': 140, 'ru': 150, 'en': 155}   # words per minute for espeak-ng
GAP = 0.6                                   # silence after each segment, seconds
QUAL = {'720': (1280, 720, 28), '480': (854, 480, 30)}


def run(cmd, **kw):
    r = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, **kw)
    if r.returncode != 0:
        sys.stderr.write(r.stderr.decode(errors='replace')[-2000:])
        raise SystemExit('command failed: ' + ' '.join(cmd[:4]))
    return r.stdout


# --- what the synthesizer reads (subtitles keep the original text) ---
# espeak-ng switches to its English voice for Latin letters inside Russian text and reads Uzbek x/y as letters
# of the Uzbek alphabet ("xa", "ye"); here they are replaced by the names used when reading formulas aloud.
RU_LETTERS = {'a': 'а', 'b': 'бэ', 'c': 'цэ', 'd': 'дэ', 'e': 'е', 'f': 'эф', 'g': 'гэ', 'h': 'аш', 'i': 'и', 'j': 'йот', 'k': 'ка',
              'l': 'эль', 'm': 'эм', 'n': 'эн', 'o': 'о', 'p': 'пэ', 'q': 'ку', 'r': 'эр', 's': 'эс', 't': 'тэ', 'u': 'у', 'v': 'вэ',
              'w': 'дубль-вэ', 'x': 'икс', 'y': 'игрек', 'z': 'зэт'}
RU_WORDS = {'Kohler': 'Кохлер', 'Johnson': 'Джонсон', 'Logan': 'Логан', 'SciPy': 'СайПай', 'solve': 'солв', 'ivp': 'ай-ви-пи'}
UZ_LETTERS = {'x': 'iks', 'X': 'iks', 'y': 'igrek', 'Y': 'igrek', 'c': 'se', 'C': 'se', 'w': 'dubl-ve', 'W': 'dubl-ve', 'q': 'ku', 'h': 'ash'}
NOT_LETTER = r"A-Za-z0-9А-Яа-яЁёʻ‘’'"


def speakable(text, lang):
    if lang == 'ru':
        def word(m):
            w = m.group(0)
            if w in RU_WORDS:
                return RU_WORDS[w]
            return ' '.join(RU_LETTERS[ch.lower()] for ch in w if ch.lower() in RU_LETTERS) if len(w) <= 3 else w
        return re.sub(r'(?<![%s])[A-Za-z]+(?![%s])' % (NOT_LETTER, NOT_LETTER), word, text.replace('_', ' '))
    if lang == 'uz':
        return re.sub(r'(?<![%s])[xXyYcCwWqh](?![%s])' % (NOT_LETTER, NOT_LETTER), lambda m: UZ_LETTERS[m.group(0)], text)
    return text


MIN_PAUSE = 0.3  # seconds of silence at the end of every sentence


def trailing_silence(fr, thr=300):
    """Number of trailing 16-bit mono samples below the threshold."""
    a = array.array('h', fr); n = 0
    for v in reversed(a):
        if abs(v) > thr:
            break
        n += 1
    return n


def wav_dur(p):
    with wave.open(p) as w:
        return w.getnframes() / float(w.getframerate())


def split_sentences(s):
    parts = re.findall(r'[^.!?…]+[.!?…]*\s*', s) or [s]
    out = []
    for p in (x.strip() for x in parts):
        if not p:
            continue
        if len(p) <= 110:
            out.append(p); continue
        cur = ''
        for c in re.split(r'(?<=,)\s', p):
            if len(cur + ' ' + c) > 110 and cur:
                out.append(cur); cur = c
            else:
                cur = (cur + ' ' + c) if cur else c
        if cur:
            out.append(cur)
    return out


def cues(part, timing, lang, audio_lang=None):
    """Same algorithm as cues() in web/js/video.js. When the subtitles are in the narration language, each cue uses the
    measured length of its own sentence ('sw'); for another language the segment is shared in proportion to text length."""
    res = []
    starts, dur = timing['starts'], timing['dur']
    sw = timing.get('sw') if audio_lang == lang else None
    for i, seg in enumerate(part['segments']):
        a = starts[i]; b = starts[i + 1] if i + 1 < len(starts) else dur
        ps = split_sentences(seg['say'][lang]); end = max(a + 0.1, b - 0.25); x = a
        if sw and len(sw[i]) == len(ps):
            for k, (p, d) in enumerate(zip(ps, sw[i])):
                y = end if k == len(ps) - 1 else min(x + d, end); res.append((x, max(y, x + 0.05), p)); x = y
            continue
        total = sum(len(p) for p in ps) or 1; span = end - a
        for p in ps:
            d = span * len(p) / total; res.append((x, x + d, p)); x += d
    return res


def vtt(cs):
    def ts(s):
        ms = int(round(s * 1000))
        return '%02d:%02d:%02d.%03d' % (ms // 3600000, ms // 60000 % 60, ms // 1000 % 60, ms % 1000)
    return 'WEBVTT\n\n' + '\n'.join('%d\n%s --> %s\n%s\n' % (i + 1, ts(a), ts(b), t) for i, (a, b, t) in enumerate(cs))


def sha(p):
    h = hashlib.sha256()
    with open(p, 'rb') as f:
        for chunk in iter(lambda: f.read(1 << 20), b''):
            h.update(chunk)
    return h.hexdigest()


def render_slides(jobs, work):
    """jobs: list of (topic, partIdx, segIdx, lang, outPng). Uses the app's own renderer."""
    script = r"""
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const jobs = JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'));
(async () => {
  const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8765/slide.html'); await p.waitForFunction(() => window.renderSlide);
  for (const [topic, part, seg, lang, out] of jobs) {
    await p.evaluate(a => window.renderSlide(...a), [topic, part, seg, lang]);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: out });
  }
  if (errs.length) console.error(errs.join('\n'));
  await b.close();
})();
"""
    js = os.path.join(work, 'render.js'); open(js, 'w').write(script)
    jf = os.path.join(work, 'jobs.json'); json.dump(jobs, open(jf, 'w'))
    out = subprocess.run(['node', js, jf], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if out.returncode != 0 or out.stderr:
        sys.stderr.write(out.stderr.decode()[-3000:])
        if out.returncode != 0:
            raise SystemExit('slide rendering failed')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--topics', default='')
    ap.add_argument('--bundle', default='t01', help='topics whose 480p video is shipped inside the APK')
    ap.add_argument('--out', default=os.path.join(ROOT, 'dist', 'video'))
    ap.add_argument('--work', default=os.path.join(ROOT, 'build', 'video-work'))
    ap.add_argument('--quals', default='480,720')
    ap.add_argument('--langs', default=','.join(LANGS), help='narration languages to (re)build')
    ap.add_argument('--reuse-slides', action='store_true', help='keep slide images already rendered in --work')
    a = ap.parse_args()
    scripts = json.loads(run(['node', os.path.join(ROOT, 'tools/video/dump.js')]))
    topics = [t for t in (a.topics.split(',') if a.topics else scripts.keys()) if t in scripts]
    bundle = set(filter(None, a.bundle.split(',')))
    quals = a.quals.split(',')
    os.makedirs(a.out, exist_ok=True); os.makedirs(a.work, exist_ok=True)
    bundled_dir = os.path.join(ROOT, 'web', 'video'); os.makedirs(bundled_dir, exist_ok=True)
    index_path = os.path.join(bundled_dir, 'index.js')
    index = {'parts': {}, 'packs': []}
    if os.path.exists(index_path):  # keep entries of topics not rebuilt now
        txt = open(index_path).read()
        m = re.search(r'DT\.VIDEO_MEDIA = (\{.*\});', txt, re.S)
        if m:
            index = json.loads(m.group(1))
    for topic in topics:
        parts = scripts[topic]['parts']
        index['packs'] = [p for p in index['packs'] if not (p['topic'] == topic and p['lang'] in a.langs.split(','))]
        # slides first (one Playwright session per topic)
        jobs = []
        for pi, part in enumerate(parts):
            for lang in LANGS:
                for si in range(len(part['segments'])):
                    if a.reuse_slides and os.path.exists(os.path.join(a.work, '%s-%s-%02d.png' % (part['id'], lang, si))):
                        continue
                    jobs.append([topic, pi, si, lang, os.path.join(a.work, '%s-%s-%02d.png' % (part['id'], lang, si))])
        if jobs:
            render_slides(jobs, a.work)
        for lang in a.langs.split(','):
            files = {q: [] for q in quals}
            for pi, part in enumerate(parts):
                pid = part['id']; starts = []; t = 0.0; wavs = []; sw = []
                for si, seg in enumerate(part['segments']):
                    # each subtitle sentence is synthesized on its own and the pieces are joined, so the subtitle
                    # timings are the exact boundaries in the narration, not an estimate
                    w = os.path.join(a.work, '%s-%s-%02d.wav' % (pid, lang, si))
                    frames = []; params = None; sl = []
                    for k, sent in enumerate(split_sentences(seg['say'][lang])):
                        ws = os.path.join(a.work, '%s-%s-%02d-%02d.wav' % (pid, lang, si, k))
                        run(['espeak-ng', '-v', VOICE[lang], '-s', str(SPEED[lang]), '-w', ws, speakable(sent, lang)])
                        with wave.open(ws) as r:
                            params = r.getparams(); fr = r.readframes(r.getnframes()); sr = r.getframerate()
                        fr += b'\x00\x00' * max(0, int(MIN_PAUSE * sr) - trailing_silence(fr))  # a short pause between sentences
                        frames.append(fr); sl.append(len(fr) / 2.0 / sr)
                    with wave.open(w, 'wb') as o:
                        o.setparams(params); o.writeframes(b''.join(frames))
                    wd = wav_dur(w); d = wd + GAP; starts.append(round(t, 3)); t += d; wavs.append((w, d))
                    sw.append([round(x, 3) for x in sl])
                timing = {'starts': starts, 'dur': round(t, 3), 'sw': sw}
                index['parts'].setdefault(pid, {})[lang] = timing
                # audio track
                alist = os.path.join(a.work, '%s-%s-audio.txt' % (pid, lang))
                with open(alist, 'w') as f:
                    for w, d in wavs:
                        f.write("file '%s'\n" % w)
                pad = os.path.join(a.work, '%s-%s.wav' % (pid, lang))
                # concatenate segments, each padded with GAP seconds of silence
                filt = ''.join('[%d:a]apad=whole_dur=%.3f[a%d];' % (i, d, i) for i, (w, d) in enumerate(wavs)) + ''.join('[a%d]' % i for i in range(len(wavs))) + 'concat=n=%d:v=0:a=1[out]' % len(wavs)
                cmd = ['ffmpeg', '-y', '-loglevel', 'error']
                for w, d in wavs:
                    cmd += ['-i', w]
                run(cmd + ['-filter_complex', filt, '-map', '[out]', '-ar', '22050', '-ac', '1', pad])
                # slide list with durations
                vlist = os.path.join(a.work, '%s-%s-video.txt' % (pid, lang))
                with open(vlist, 'w') as f:
                    for si, (w, d) in enumerate(wavs):
                        f.write("file '%s'\nduration %.3f\n" % (os.path.join(a.work, '%s-%s-%02d.png' % (pid, lang, si)), d))
                    f.write("file '%s'\n" % os.path.join(a.work, '%s-%s-%02d.png' % (pid, lang, len(wavs) - 1)))
                for q in quals:
                    W, H, crf = QUAL[q]
                    name = '%s-%s-%s.mp4' % (pid, lang, q)
                    out = os.path.join(a.out, name)
                    run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', vlist, '-i', pad,
                         '-vf', 'scale=%d:%d:flags=lanczos,fps=5,format=yuv420p' % (W, H), '-c:v', 'libx264', '-preset', 'veryslow', '-tune', 'stillimage', '-crf', str(crf),
                         '-g', '50', '-c:a', 'aac', '-b:a', '40k', '-ac', '1', '-shortest', '-movflags', '+faststart', out])
                    files[q].append(name)
                # subtitles for every subtitle language under this audio language, and the transcript
                for sl in LANGS:
                    name = '%s-%s-sub-%s.vtt' % (pid, lang, sl)
                    open(os.path.join(a.out, name), 'w').write(vtt(cues(part, timing, sl, lang)))
                    for q in quals:
                        files[q].append(name)
                tname = '%s-%s-transcript.txt' % (pid, lang)
                with open(os.path.join(a.out, tname), 'w') as f:
                    f.write(part['title'][lang] + '\n\n')
                    for si, seg in enumerate(part['segments']):
                        s = starts[si]
                        f.write('[%d:%02d] %s\n\n' % (int(s) // 60, int(s) % 60, seg['say'][lang]))
                for q in quals:
                    files[q].append(tname)
            for q in quals:
                fl = [{'name': n, 'bytes': os.path.getsize(os.path.join(a.out, n)), 'sha256': sha(os.path.join(a.out, n))} for n in files[q]]
                is_b = topic in bundle and q == '480'
                if is_b:
                    for f in fl:
                        if f['name'].endswith('.mp4'):
                            shutil.copy(os.path.join(a.out, f['name']), os.path.join(bundled_dir, f['name']))
                index['packs'].append({'id': '%s-%s-%s' % (topic, lang, q), 'topic': topic, 'lang': lang, 'q': q,
                                       'bytes': sum(f['bytes'] for f in fl), 'files': fl, 'bundled': is_b})
            print(topic, lang, 'done', flush=True)
    index['packs'].sort(key=lambda p: (p['topic'], p['lang'], p['q']))
    index['voice'] = 'espeak-ng (synthetic)'
    with open(index_path, 'w') as f:
        f.write('/* Generated by tools/video/build.py — do not edit. */\nDT.VIDEO_MEDIA = ' + json.dumps(index, ensure_ascii=False, separators=(',', ':')) + ';\n')
    json.dump(index, open(os.path.join(a.out, 'manifest.json'), 'w'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
