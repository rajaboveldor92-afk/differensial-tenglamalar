// Usage: node shot.js <outdir> <WxH> <lang> <theme> route1 route2 ...
const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const [out, size, lang, theme, ...routes] = process.argv.slice(2);
  const [W, H] = size.split('x').map(Number);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); });
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await page.goto('http://localhost:8765/index.html#/home');
  await page.evaluate(([l, th]) => { const s = JSON.parse(localStorage.getItem('dt.store') || 'null'); if (s) { s.settings.lang = l; s.settings.theme = th; localStorage.setItem('dt.store', JSON.stringify(s)); } else { DT.state.settings.lang = l; DT.state.settings.theme = th; DT.saveNow(); } }, [lang, theme]);
  for (const r of routes) {
    await page.goto('http://localhost:8765/index.html' + r.split('@')[0]);
    await page.reload();
    await page.waitForTimeout(700);
    const name = r.replace(/[#\/?=@]+/g, '_').replace(/^_+/, '') || 'home';
    const full = r.includes('@full');
    await page.screenshot({ path: `${out}/${name}-${lang}-${theme}-${W}.png`, fullPage: full });
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (ov > 0) errs.push(`overflow ${ov}px on ${r}`);
  }
  console.log(errs.length ? errs.join('\n') : 'no errors');
  await browser.close();
})();
