#!/usr/bin/env python3
"""Second listen for doubtful sentences: each clip is transcribed again with half a second of silence
in front (so a first word is not lost at the clip edge) and together with its neighbouring sentences,
by two recognizer models. Usage: voice_recheck.py <video-dir> <scripts.json> <out.jsonl> id [id ...]
(id = part-lang-segment-sentence, e.g. v14a-ru-4-0)"""
import json, os, subprocess, sys, tempfile, wave
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
from build import split_sentences  # noqa: E402
from faster_whisper import WhisperModel

video, scripts, out = sys.argv[1:4]; ids = sys.argv[4:]
M = json.load(open(os.path.join(video, 'manifest.json'))); S = json.load(open(scripts))
parts = {p['id']: p for t in S for p in S[t]['parts']}
models = {m: WhisperModel(m, device='cpu', compute_type='int8') for m in ['large-v3-turbo', 'large-v3']}
tmp = tempfile.mkdtemp()


def clip(mp4, a, d, pad):
    w = os.path.join(tmp, 'c.wav')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', '%.3f' % a, '-t', '%.3f' % d, '-i', mp4, '-af',
                    'adelay=%d' % (pad * 1000), '-ac', '1', '-ar', '16000', w], check=True)
    with wave.open(w) as r:
        return np.frombuffer(r.readframes(r.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0


with open(out, 'w') as f:
    for i in ids:
        pid, lang, si, k = i.rsplit('-', 3)[0], i.rsplit('-', 3)[1], int(i.rsplit('-', 3)[2]), int(i.rsplit('-', 3)[3])
        tm = M['parts'][pid][lang]; sw = tm['sw'][si]
        a = tm['starts'][si] + sum(sw[:k]); d = sw[k]
        mp4 = os.path.join(video, '%s-%s-480.mp4' % (pid, lang))
        sent = split_sentences(parts[pid]['segments'][si]['say'][lang])[k]
        rec = {'id': i, 'text': sent}
        for name, m in models.items():
            for tag, pcm in [('padded', clip(mp4, a, d, 0.5)), ('context', clip(mp4, max(0, a - 2.0), d + 4.0, 0.3))]:
                segs, _ = m.transcribe(pcm, language=lang, beam_size=5, vad_filter=False, condition_on_previous_text=False, temperature=0)
                rec['%s/%s' % (name, tag)] = ' '.join(s.text.strip() for s in segs)
        f.write(json.dumps(rec, ensure_ascii=False) + '\n'); f.flush(); print(i, flush=True)
