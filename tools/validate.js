// Validate topic content files: schema, three languages, KaTeX, answer self-checks.
// Usage: node tools/validate.js web/content/t01.js [...]
const fs = require('fs'), vm = require('vm'), path = require('path');
const katex = require(path.join(__dirname, '../web/vendor/katex/katex.min.js'));
const ctx = { window: {}, Math, console };
ctx.window.DT = { TOPICS: {} }; ctx.DT = ctx.window.DT;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '../web/js/expr.js'), 'utf8'), ctx);
const DT = ctx.DT;
DT.L = (uz, ru, en) => ({ uz, ru, en }); DT.R = String.raw; DT.addTopic = t => { DT.TOPICS[t.id] = t; };
const SRC = fs.readFileSync(path.join(__dirname, '../web/js/sources.js'), 'utf8');
vm.runInContext(SRC, ctx);
let errors = 0, warns = 0;
const E = (f, m) => { errors++; console.log('ERROR', f, m); }, W = (f, m) => { warns++; console.log('warn ', f, m); };
function texCheck(where, s) {
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g; let m;
  const stripped = s.replace(/\\\$/g, '');
  while ((m = re.exec(stripped))) {
    const tex = m[1] || m[2];
    try { katex.renderToString(tex, { throwOnError: true, displayMode: !!m[1], strict: 'ignore' }); }
    catch (e) { E(where, 'KaTeX: ' + e.message.slice(0, 120) + ' in: ' + tex.slice(0, 80)); }
  }
  const dollars = (stripped.replace(/\$\$/g, '').match(/\$/g) || []).length;
  if (dollars % 2) E(where, 'odd number of $ delimiters');
}
function L3(where, o, allowStr) {
  if (o == null) { E(where, 'missing'); return; }
  if (typeof o === 'string') { if (!allowStr) W(where, 'plain string (not translated)'); texCheck(where, o); return; }
  for (const l of ['uz', 'ru', 'en']) {
    if (typeof o[l] !== 'string' || !o[l].trim()) E(where, 'missing language ' + l);
    else texCheck(where + '.' + l, o[l]);
  }
  // same formulas in all languages
  const f = l => ((o[l] || '').match(/\$[^$]+\$/g) || []).length;
  if (o.uz && o.ru && o.en && (f('uz') !== f('ru') || f('uz') !== f('en'))) W(where, `formula count differs uz=${f('uz')} ru=${f('ru')} en=${f('en')}`);
}
function checkEx(fid, ex, isQuiz) {
  const w = fid + ' ' + ex.id;
  L3(w + '.q', ex.q);
  const type = isQuiz ? (ex.type || 'mcq') : ex.type;
  if (!isQuiz && !['easy', 'mid', 'hard'].includes(ex.level)) E(w, 'bad level');
  if (!isQuiz && !ex.solution && !ex.explain) E(w, 'needs solution or explain');
  if (ex.solution) L3(w + '.solution', ex.solution); if (ex.hint) L3(w + '.hint', ex.hint); if (ex.explain) L3(w + '.explain', ex.explain);
  switch (type) {
    case 'mcq':
      if (!Array.isArray(ex.options) || ex.options.length < 2) E(w, 'options'); else ex.options.forEach((o, i) => L3(w + '.opt' + i, o));
      if (!(ex.correct >= 0 && ex.correct < ex.options.length)) E(w, 'correct index');
      if (isQuiz) { if (!ex.explain) E(w, 'quiz needs explain'); if (!ex.why || ex.why.length !== ex.options.length) E(w, 'quiz needs why[] per option'); else ex.why.forEach((y, i) => { if (i === ex.correct) { if (y) W(w, 'why on correct'); } else if (!y) E(w, 'why missing for option ' + i); else L3(w + '.why' + i, y); }); }
      break;
    case 'numeric': case 'formula': {
      const c = ex.check; if (!c) { E(w, 'no check'); break; }
      if (c.kind === 'numeric') { if (typeof c.value !== 'number') E(w, 'numeric value'); break; }
      if (!ex.answer) { E(w, 'formula exercise needs answer field'); break; }
      const fn = c.kind === 'ode' ? DT.Expr.checkOdeSolution : c.kind === 'integral' ? DT.Expr.checkFirstIntegral : DT.Expr.checkEquiv;
      for (let k = 0; k < 3; k++) { const r = fn(ex.answer, c); if (r.res !== 'ok') { E(w, `reference answer "${ex.answer}" -> ${r.res} ${r.why || ''}`); break; } }
      const wrong = fn('(' + ex.answer.replace(/^.*=/, '') + ')*1.3+x', c);
      if (wrong.res === 'ok') W(w, 'a perturbed answer also passes: checker may be too weak');
      break; }
    case 'match': if (!ex.pairs || ex.pairs.length < 3) E(w, 'pairs'); else ex.pairs.forEach((p, i) => { L3(w + '.l' + i, p.left); L3(w + '.r' + i, p.right); }); break;
    case 'order': if (!ex.items || ex.items.length < 3) E(w, 'items'); else ex.items.forEach((p, i) => L3(w + '.i' + i, p)); break;
    case 'finderror': if (!ex.lines || !(ex.wrong >= 0 && ex.wrong < ex.lines.length)) E(w, 'lines/wrong'); else ex.lines.forEach((p, i) => L3(w + '.ln' + i, p)); break;
    case 'steps': if (!ex.steps || ex.steps.length < 2) E(w, 'steps'); else ex.steps.forEach((s, i) => { L3(w + '.s' + i, s.q); s.options.forEach((o, j) => L3(w + '.s' + i + 'o' + j, o)); if (!(s.correct >= 0 && s.correct < s.options.length)) E(w, 'step correct'); }); break;
    default: E(w, 'unknown type ' + type);
  }
}
for (const f of process.argv.slice(2)) {
  const before = Object.keys(DT.TOPICS);
  try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f }); } catch (e) { E(f, 'syntax/runtime: ' + e.message); continue; }
  const id = Object.keys(DT.TOPICS).find(k => !before.includes(k));
  if (!id) { E(f, 'no addTopic'); continue; }
  const T = DT.TOPICS[id]; const fid = path.basename(f);
  L3(fid + '.title', T.title);
  ['outcomes', 'prereqKnowledge', 'mistakes'].forEach(k => { if (!Array.isArray(T[k]) || T[k].length < (k === 'mistakes' ? 3 : 2)) E(fid, k + ' too short'); else T[k].forEach((x, i) => L3(fid + '.' + k + i, x)); });
  if (!T.sources || !T.sources.length) E(fid, 'sources'); else T.sources.forEach(s => { if (!DT.SOURCES[s.id]) E(fid, 'unknown source ' + s.id); if (typeof s.verified !== 'boolean') E(fid, 'source.verified'); if (DT.SOURCES[s.id] && DT.SOURCES[s.id].status === 'notAvailable' && s.verified) E(fid, 'source ' + s.id + ' marked verified but no copy available'); });
  if (!T.textStatus) E(fid, 'textStatus');
  const ids = new Set(); let examples = 0, interactive = 0;
  (T.lessons || []).forEach((Ls, li) => {
    if (!Ls.id || !Ls.id.startsWith(id + '.')) E(fid, 'lesson id ' + Ls.id);
    L3(fid + '.' + Ls.id + '.title', Ls.title);
    Ls.blocks.forEach((b, bi) => {
      const w = fid + '.' + Ls.id + '#' + bi;
      if (!['def', 'thm', 'example', 'proof', 'warn', 'lab', 'intro', 'note', 'text', 'formula'].includes(b.type)) E(w, 'block type ' + b.type);
      if (b.title) L3(w + '.title', b.title); if (b.body) L3(w + '.body', b.body); if (b.conds) L3(w + '.conds', b.conds); if (b.check) L3(w + '.check', b.check);
      if (b.steps) b.steps.forEach((s, i) => L3(w + '.step' + i, s));
      if (b.type === 'example') { examples++; if (!b.steps || b.steps.length < 2) E(w, 'example needs steps'); }
      if (b.type === 'lab') { interactive++; if (!b.lab) E(w, 'lab block needs lab id'); }
      if (b.type === 'thm' && !b.conds) W(w, 'theorem without explicit conditions');
    });
  });
  if (!T.lessons || !T.lessons.some(l => l.blocks.some(b => b.type === 'intro'))) E(fid, 'needs an intro (warm-up) block');
  if (examples < 3) E(fid, 'needs >= 3 worked examples, has ' + examples);
  if (interactive < 1 && !(T.exercises || []).some(e => e.type === 'order' || e.type === 'steps' || e.type === 'match')) E(fid, 'needs >= 1 interactive activity');
  if (!T.exercises || T.exercises.length < 5) E(fid, 'needs >= 5 exercises');
  else { const lv = new Set(T.exercises.map(e => e.level)); ['easy', 'mid', 'hard'].forEach(l => { if (!lv.has(l)) E(fid, 'no ' + l + ' exercise'); }); T.exercises.forEach(e => { if (ids.has(e.id)) E(fid, 'dup id ' + e.id); ids.add(e.id); if (!e.id.startsWith(id + '.')) E(fid, 'id prefix ' + e.id); checkEx(fid, e, false); }); }
  if (!T.quiz || T.quiz.length < 8) E(fid, 'needs >= 8 quiz questions');
  else T.quiz.forEach(q => { if (ids.has(q.id)) E(fid, 'dup id ' + q.id); ids.add(q.id); checkEx(fid, q, true); });
  console.log(`${fid}: lessons=${T.lessons.length} examples=${examples} exercises=${(T.exercises||[]).length} quiz=${(T.quiz||[]).length}`);
}
console.log(`\n${errors} errors, ${warns} warnings`);
process.exit(errors ? 1 : 0);
