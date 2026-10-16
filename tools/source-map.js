// Writes docs/SOURCE_MAP.md: topic — source — chapter/§ — status — material created (same data as the in-app Sources screen).
const fs = require('fs'), vm = require('vm'), path = require('path');
const R = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const ctx = { window: {}, console }; ctx.window.DT = {}; ctx.DT = ctx.window.DT; vm.createContext(ctx);
ctx.DT.addTopic = T => { (ctx.TOPICS = ctx.TOPICS || []).push(T); }; ctx.DT.L = (uz, ru, en) => ({ uz, ru, en }); ctx.DT.R = String.raw; ctx.Math = Math;
vm.runInContext(R('web/js/sources.js'), ctx);
const ids = ['t01','t02','t03','t04','t05','t06','t07','t08','t09','t10','t11','t12','t13','t14','t15','tL'];
for (const id of ids) vm.runInContext(R('web/content/' + id + '.js'), ctx);
const S = ctx.DT.SOURCES;
const shortCite = c => { const p = c.split('. '); const out = []; for (const x of p) { out.push(x); if (x.length > 12 && !x.includes(',')) break; } return out.join('. '); };
let md = '# Mavzu — manba — bob/paragraf — yaratilgan material\n\n“✓” — bob/paragraf loyihadagi nusxada tekshirilgan. “⚠ tekshirilmagan” — nusxa yo‘q, ko‘rsatkich taxminiy (asosiy kitoblar uchun sahifa raqami berilmaydi).\n\n| Mavzu | Manba | Bob/§ | Holat | Yaratilgan material |\n|---|---|---|---|---|\n';
ctx.TOPICS.forEach((T, i) => {
  const nEx = T.lessons.reduce((a, l) => a + l.blocks.filter(b => b.type === 'example').length, 0);
  const made = `${T.lessons.length} dars, ${nEx} misol, ${T.exercises.length} mashq, ${T.quiz.length} test`;
  const name = (ids[i] === 'tL' ? 'Laplas (qo‘shimcha) — ' : (i + 1) + '. ') + T.title.uz;
  (T.sources || []).forEach((s, j) => {
    const src = S[s.id]; const short = src ? shortCite(src.cite) : s.id;
    md += `| ${j === 0 ? name : ''} | ${short.replace(/\|/g, '/')} | ${s.ref} | ${s.verified ? '✓' : '⚠ tekshirilmagan'} | ${j === 0 ? made : ''} |\n`;
  });
});
fs.writeFileSync(path.join(__dirname, '../docs/SOURCE_MAP.md'), md);
console.log('topics', ctx.TOPICS.length);
