// Usage: node overflow.js <WxH> <lang> route... — lists elements wider than the viewport
const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const [size, lang, ...routes] = process.argv.slice(2); const [W, H] = size.split('x').map(Number);
  const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: W, height: H } })).newPage();
  await p.goto('http://localhost:8765/index.html#/home');
  await p.evaluate(l => { DT.state.settings.lang = l; DT.saveNow(); }, lang);
  for (const r of routes) {
    await p.goto('http://localhost:8765/index.html' + r); await p.reload(); await p.waitForTimeout(800);
    const out = await p.evaluate(() => { const W = innerWidth, res = []; document.querySelectorAll('#view *').forEach(e => { const q = e.getBoundingClientRect(); if (q.right > W + 1 && !e.closest('.table-scroll,.coursemap-wrap,pre,.tabs,.katex-mathml')) res.push(e.tagName + '.' + e.className + ' ' + Math.round(q.right) + ' ' + (e.textContent || '').slice(0, 40)); }); return [document.documentElement.scrollWidth - W].concat(res.slice(0, 8)); });
    console.log(r, out.length ? '\n  ' + out.join('\n  ') : 'ok');
  }
  await b.close();
})();
