#!/usr/bin/env python3
"""Listens to the narration with a speech recognizer and compares every sentence with its script.

Each sentence is cut out of the 480p video using the exact sentence timings in manifest.json ('sw'),
transcribed with faster-whisper in the narration language, and written as one JSON line with the
script text, what the recognizer heard, a similarity score and the speaking rate. Low scores point
at sentences worth listening to (a skipped or garbled word, wrong language, cut-off audio).

Usage: python3 tools/video/voice_review.py <video-dir> <scripts.json> <out.jsonl> --lang uz [--shard 0/4] [--model large-v3-turbo]
"""
import argparse, difflib, json, os, re, subprocess, sys, tempfile, unicodedata

sys.path.insert(0, os.path.dirname(__file__))
from build import speakable, split_sentences  # noqa: E402

APOS = "ʻ‘’`'ʼ"


def norm(s):
    s = unicodedata.normalize('NFC', s.lower())
    for ch in APOS:
        s = s.replace(ch, "'")
    s = s.replace('ё', 'е')
    s = re.sub(r"[^\w' ]+", ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('video'); ap.add_argument('scripts'); ap.add_argument('out')
    ap.add_argument('--lang', required=True)
    ap.add_argument('--shard', default='0/1')
    ap.add_argument('--model', default='large-v3-turbo')
    a = ap.parse_args()
    from faster_whisper import WhisperModel
    model = WhisperModel(a.model, device='cpu', compute_type='int8')
    M = json.load(open(os.path.join(a.video, 'manifest.json')))
    S = json.load(open(a.scripts))
    parts = [(t, p) for t in sorted(S) for p in S[t]['parts']]
    k, n = map(int, a.shard.split('/'))
    parts = parts[k::n]
    tmp = tempfile.mkdtemp()
    with open(a.out, 'w') as out:
        for topic, part in parts:
            tm = M['parts'][part['id']][a.lang]
            mp4 = os.path.join(a.video, '%s-%s-480.mp4' % (part['id'], a.lang))
            for si, seg in enumerate(part['segments']):
                x = tm['starts'][si]
                for j, sent in enumerate(split_sentences(seg['say'][a.lang])):
                    d = tm['sw'][si][j]
                    wav = os.path.join(tmp, 'c.wav')
                    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', '%.3f' % x, '-t', '%.3f' % d, '-i', mp4,
                                    '-ac', '1', '-ar', '16000', wav], check=True)
                    segs, _ = model.transcribe(wav, language=a.lang, beam_size=5, vad_filter=False,
                                               condition_on_previous_text=False, temperature=0)
                    hyp = ' '.join(s.text.strip() for s in segs).strip()
                    spoken = speakable(sent, a.lang)
                    sim = difflib.SequenceMatcher(None, norm(spoken), norm(hyp)).ratio()
                    out.write(json.dumps({'topic': topic, 'part': part['id'], 'lang': a.lang, 'seg': si, 'k': j,
                                          'start': round(x, 2), 'dur': d, 'text': sent, 'spoken': spoken, 'heard': hyp,
                                          'sim': round(sim, 3), 'cps': round(len(spoken) / max(d, 0.01), 1)},
                                         ensure_ascii=False) + '\n')
                    out.flush()
                    x += d
            print(part['id'], a.lang, 'done', flush=True)


if __name__ == '__main__':
    main()
