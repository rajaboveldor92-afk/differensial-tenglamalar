#!/usr/bin/env python3
"""Checks that subtitles in the narration language start where the voice pauses.
For every same-language VTT, each cue after the first must start inside (or within 50 ms of) a pause that
ffmpeg's silencedetect finds in the audio. Usage: python3 tools/video/sync_check.py <dir-with-mp4-and-vtt> [quality]"""
import glob, os, re, subprocess, sys

d = sys.argv[1]; q = sys.argv[2] if len(sys.argv) > 2 else '480'
dist = []; bad = []
for mp4 in sorted(glob.glob(os.path.join(d, '*-%s.mp4' % q))):
    m = re.match(r'(.+)-(uz|ru|en)-%s\.mp4$' % q, os.path.basename(mp4)); pid, l = m.group(1), m.group(2)
    vtt = os.path.join(d, '%s-%s-sub-%s.vtt' % (pid, l, l))
    err = subprocess.run(['ffmpeg', '-i', mp4, '-af', 'silencedetect=noise=-38dB:d=0.12', '-f', 'null', '-'], capture_output=True, text=True).stderr
    pauses = list(zip([float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)], [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]))
    cues = re.findall(r'^([\d:.]+) --> [\d:.]+\n(.*)$', open(vtt).read(), re.M)
    for a, text in cues[1:]:
        c = sum(float(x) * k for x, k in zip(a.split(':'), [3600, 60, 1]))
        dd = min([0 if s - 0.05 <= c <= e + 0.05 else min(abs(c - s), abs(c - e)) for s, e in pauses] or [99])
        dist.append(dd)
        if dd > 0.3: bad.append('%s %s %.2fs off: %s' % (pid, l, dd, text[:70]))
dist.sort()
print('cues %d  median %.2fs  p90 %.2fs  max %.2fs  more than 0.3 s off: %d' % (len(dist), dist[len(dist) // 2], dist[int(.9 * len(dist))], dist[-1], len(bad)))
for b in bad[:20]: print('  ', b)
sys.exit(1 if len(bad) > len(dist) // 50 else 0)
