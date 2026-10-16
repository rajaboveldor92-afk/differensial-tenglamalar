// The player computes subtitles itself (web/js/video.js); they must equal the VTT files written by tools/video/build.py.
// Usage: node tools/test-cues.js dist/video
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = process.argv[2] || 'dist/video';
const ctx = { window: {}, console, Math, document: { addEventListener() {} } }; ctx.window.DT = { views: {}, addVideo: v => { (ctx.V = ctx.V || {})[v.topic] = v; } }; ctx.DT = ctx.window.DT; vm.createContext(ctx);
const src = fs.readFileSync(path.join(__dirname, '../web/js/video.js'), 'utf8').replace("function cues(", "DT.__cues = cues; function cues(");
vm.runInContext('(function(){' + src.slice(src.indexOf('function splitSentences'), src.indexOf('DT.toVTT')) + ';DT.__cues = cues; DT.__split = splitSentences;})()', ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '../web/video/index.js'), 'utf8'), ctx);
const scripts = JSON.parse(require('child_process').execFileSync('node', [path.join(__dirname, 'video/dump.js')], { maxBuffer: 1 << 26 }));
const M = ctx.DT.VIDEO_MEDIA; let n = 0, bad = 0;
const parseVtt = s => [...s.matchAll(/^([\d:.]+) --> ([\d:.]+)\n(.*)$/gm)].map(m => [m[1], m[2], m[3]]);
const ts = x => { const ms = Math.round(x * 1000); return [ms / 3600000 | 0, (ms / 60000 | 0) % 60, (ms / 1000 | 0) % 60].map(v => String(v).padStart(2, '0')).join(':') + '.' + String(ms % 1000).padStart(3, '0'); };
for (const t of Object.keys(scripts)) for (const part of scripts[t].parts) for (const al of ['uz', 'ru', 'en']) for (const sl of ['uz', 'ru', 'en']) {
  const f = path.join(dir, `${part.id}-${al}-sub-${sl}.vtt`); if (!fs.existsSync(f)) continue;
  const want = parseVtt(fs.readFileSync(f, 'utf8')), got = ctx.DT.__cues(part, M.parts[part.id][al], sl, al).map(c => [ts(c.start), ts(c.end), c.text]);
  n++; const diff = want.length !== got.length || want.some((w, i) => Math.abs(parseFloat(w[0].slice(6)) - parseFloat(got[i][0].slice(6))) > 0.002 && w[0] !== got[i][0] || w[2] !== got[i][2]);
  if (diff) { bad++; if (bad < 4) console.log('MISMATCH', f, want.length, got.length, JSON.stringify(want[1]), JSON.stringify(got[1])); }
}
console.log(`${n} subtitle files compared, ${bad} differ`); process.exit(bad ? 1 : 0);
