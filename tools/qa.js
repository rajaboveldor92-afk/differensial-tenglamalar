// Visits every screen in a language/theme/size, reports JS errors and horizontal overflow.
// Usage: node tools/qa.js <WxH> <lang> <theme> <fs>
const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const [size, lang, theme, fs] = process.argv.slice(2); const [W, H] = size.split('x').map(Number);
  const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: W, height: H } })).newPage();
  let errs = []; p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
  await p.goto('http://localhost:8765/index.html#/home');
  await p.evaluate(([l, t, f]) => { DT.state.settings.lang = l; DT.state.settings.theme = t; DT.state.settings.fs = f; DT.saveNow(); }, [lang, theme, fs]);
  const topics = await p.evaluate(() => DT.loadAllTopics().then(a => a.map(T => T ? [T.id, T.lessons.length] : null)));
  const routes = ['#/home', '#/lessons', '#/lab', '#/practice', '#/results', '#/review', '#/videos', '#/video/t01/1', '#/video/t12/2', '#/glossary', '#/formulas', '#/diag', '#/chooser', '#/chooser?p=0', '#/independent', '#/python', '#/geometry', '#/syllabus', '#/sources', '#/notebook', '#/settings', '#/help', '#/about', '#/search?q=koshi'];
  topics.forEach(x => { if (!x) return; routes.push('#/topic/' + x[0]); ['examples', 'practice', 'quiz', 'more'].forEach(tb => routes.push('#/topic/' + x[0] + '/' + tb)); for (let i = 1; i <= x[1]; i++) routes.push('#/lesson/' + x[0] + '/' + i); routes.push('#/practice/' + x[0]); });
  for (let i = 1; i <= 12; i++) routes.push('#/lab/L' + String(i).padStart(2, '0'));
  const bad = [];
  for (const r of routes) {
    errs = [];
    await p.evaluate(r => { location.hash = r; }, r); await p.waitForTimeout(r.includes('lesson') || r.includes('sources') || r.includes('search') ? 700 : 350);
    const res = await p.evaluate(() => {
      const W = innerWidth, over = document.documentElement.scrollWidth - W;
      const wide = []; if (over > 0) document.querySelectorAll('#view *').forEach(e => { const q = e.getBoundingClientRect(); if (q.right > W + 1 && !e.closest('.table-scroll,.coursemap-wrap,pre,.tabs,.katex-mathml,.katex-display,.slide-math,.status-row')) wide.push(e.tagName + '.' + String(e.className).slice(0, 30) + ':' + (e.textContent || '').slice(0, 30)); });
      const kerr = document.querySelectorAll('.katex-error,.math-err').length;
      const empty = document.querySelector('#view').innerText.trim().length < 20;
      return { over, wide: wide.slice(0, 3), kerr, empty };
    });
    if (errs.length || res.over > 0 || res.kerr || res.empty) bad.push(r + ' ' + JSON.stringify({ errs: errs.slice(0, 2), ...res }));
  }
  console.log(`${lang} ${theme} ${fs} ${size}: ${routes.length} screens, ${bad.length} with problems`);
  bad.forEach(x => console.log('  ' + x));
  await b.close();
})();
