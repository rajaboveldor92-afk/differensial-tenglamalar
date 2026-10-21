#!/usr/bin/env python3
"""Compatibility shim: expose neural Microsoft Edge TTS through the tiny espeak-ng CLI subset used by build.py.

The video builder currently invokes:
  espeak-ng -v <voice> -s <speed> -w <output.wav> <text>

This shim keeps that interface but synthesizes female neural voices instead:
  uz -> uz-UZ-MadinaNeural
  ru -> ru-RU-SvetlanaNeural
  en-us -> en-US-JennyNeural

It is intended to be placed earlier in PATH than the real espeak-ng executable.
"""
import os
import subprocess
import sys

VOICE_MAP = {
    'uz': 'uz-UZ-MadinaNeural',
    'ru': 'ru-RU-SvetlanaNeural',
    'en': 'en-US-JennyNeural',
    'en-us': 'en-US-JennyNeural',
}

# Deliberately slower than the old robotic narration. The lesson player can still
# speed playback up later, but the source audio should remain easy to follow.
RATE_MAP = {
    'uz': '-10%',
    'ru': '-8%',
    'en': '-6%',
    'en-us': '-6%',
}


def fail(msg):
    print('neural-espeak-shim:', msg, file=sys.stderr)
    raise SystemExit(2)


def main():
    args = sys.argv[1:]
    voice = 'en-us'
    out = None
    text = []

    i = 0
    while i < len(args):
        a = args[i]
        if a == '-v' and i + 1 < len(args):
            voice = args[i + 1]
            i += 2
        elif a == '-s' and i + 1 < len(args):
            # Accepted for espeak-ng compatibility. Neural speed is deliberately
            # tuned with RATE_MAP instead of copying the old robotic WPM value.
            i += 2
        elif a == '-w' and i + 1 < len(args):
            out = args[i + 1]
            i += 2
        elif a.startswith('-'):
            fail('unsupported espeak-ng option: ' + a)
        else:
            text.extend(args[i:])
            break

    if not out:
        fail('missing -w output.wav')
    spoken = ' '.join(text).strip()
    if not spoken:
        fail('empty narration text')

    key = voice.lower()
    neural_voice = VOICE_MAP.get(key)
    if not neural_voice:
        fail('no neural female voice mapping for ' + voice)
    rate = RATE_MAP.get(key, '-8%')

    os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
    mp3 = out + '.edge.mp3'
    try:
        subprocess.run([
            'edge-tts', '--voice', neural_voice, '--rate=' + rate,
            '--text', spoken, '--write-media', mp3,
        ], check=True)
        subprocess.run([
            'ffmpeg', '-y', '-loglevel', 'error', '-i', mp3,
            '-af', 'loudnorm=I=-16:LRA=7:TP=-1.5',
            '-ar', '24000', '-ac', '1', '-c:a', 'pcm_s16le', out,
        ], check=True)
    finally:
        if os.path.exists(mp3):
            os.remove(mp3)


if __name__ == '__main__':
    main()
