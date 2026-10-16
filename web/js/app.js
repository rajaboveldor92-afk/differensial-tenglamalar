/* App bootstrap: navigation, drawer, routing, settings, language switching that keeps your place. */
(function () {
  const DT = window.DT, h = DT.h, t = DT.t;
  const NAV = [['home', '#/home', 'home', 'navHome'], ['lessons', '#/lessons', 'book', 'navLessons'], ['lab', '#/lab', 'flask', 'navLab'], ['practice', '#/practice', 'pencil', 'navPractice'], ['results', '#/results', 'chart', 'navResults']];
  const SECTION = { home: 'home', lessons: 'lessons', topic: 'lessons', lesson: 'lessons', video: 'lessons', videos: 'lessons', geometry: 'lessons', lab: 'lab', practice: 'practice', review: 'practice', results: 'results' };

  DT.applySettings = function () {
    const s = DT.state.settings, root = document.documentElement;
    let theme = s.theme;
    if (theme === 'auto') theme = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.dataset.theme = theme;
    root.dataset.fs = s.fs || 'md';
    if (s.reduceMotion === 'auto') delete root.dataset.reduceMotion; else root.dataset.reduceMotion = s.reduceMotion === 'on' ? '1' : '0';
    root.lang = s.lang;
    if (window.Android && Android.setDark) { try { Android.setDark(theme === 'dark'); } catch (e) {} }
  };
  DT.reduceMotion = () => { const r = document.documentElement.dataset.reduceMotion; return r === '1' || (r !== '0' && window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); };

  function buildChrome(section) {
    const nav = DT.$('#mainnav'); nav.innerHTML = '';
    nav.setAttribute('aria-label', t('menu'));
    NAV.forEach(([k, r, ic, lbl]) => nav.appendChild(h('button', { 'aria-current': section === k ? 'page' : null, html: DT.icon(ic) + '<span>' + DT.esc(t(lbl)) + '</span>', onclick: () => DT.go(r) })));
    const bs = DT.$('#btn-search'); bs.innerHTML = DT.icon('search'); bs.setAttribute('aria-label', t('search')); bs.title = t('search');
    const bl = DT.$('#btn-lang'); bl.innerHTML = DT.icon('globe') + '<span class="lbl">' + DT.LANG_SHORT[DT.lang()] + '</span>'; bl.setAttribute('aria-label', t('changeLanguage')); bl.title = t('changeLanguage');
    const bm = DT.$('#btn-menu'); bm.innerHTML = DT.icon('menu'); bm.setAttribute('aria-label', t('menu')); bm.title = t('menu');
    const bb = DT.$('#btn-back'); bb.innerHTML = DT.icon('back'); bb.setAttribute('aria-label', t('back')); bb.title = t('back');
  }
  function openDrawer() {
    const d = DT.$('#drawer');
    const item = (route, ic, key) => h('button', { class: 'drawer-item', onclick: () => { closeDrawer(); DT.go(route); } }, DT.iconEl(ic), h('span', { text: t(key) }));
    const panel = h('div', { class: 'drawer-panel', role: 'dialog', 'aria-modal': 'true', 'aria-label': t('menu') },
      h('div', { style: { display: 'flex', justifyContent: 'flex-end', padding: '0 8px' } }, h('button', { class: 'icon-btn', 'aria-label': t('close'), html: DT.icon('close'), onclick: closeDrawer })),
      h('h2', { text: t('secStudy') }),
      item('#/videos', 'video', 'videoLessons'), item('#/topic/tL', 'sparkle', 'laplaceModule'), item('#/geometry', 'field', 'geometry'), item('#/independent', 'tasks', 'independent'), item('#/python', 'code', 'python'),
      h('h2', { text: t('secTools') }),
      item('#/diag', 'target', 'diagnostic'), item('#/chooser', 'compass', 'methodChooser'), item('#/formulas', 'map', 'formulaMap'), item('#/glossary', 'glossary', 'glossary'), item('#/notebook', 'note', 'notebook'), item('#/sources', 'sources', 'sources'), item('#/syllabus', 'list', 'syllabus'),
      h('h2', { text: t('secApp') }),
      item('#/settings', 'gear', 'settings'), item('#/help', 'help', 'help'), item('#/about', 'info', 'about'));
    d.innerHTML = ''; d.appendChild(panel); d.hidden = false;
    d.onclick = e => { if (e.target === d) closeDrawer(); };
    setTimeout(() => DT.$('button', panel).focus(), 20);
  }
  function closeDrawer() { const d = DT.$('#drawer'); d.hidden = true; d.innerHTML = ''; }
  DT.closeDrawer = closeDrawer;

  function openLangSheet() {
    const box = h('div');
    DT.LANGS.forEach(l => box.appendChild(h('button', { class: 'opt', 'aria-pressed': String(l === DT.lang()), html: '<span class="mark">' + DT.LANG_SHORT[l] + '</span><span>' + DT.esc(DT.LANG_NAMES[l]) + '</span>', onclick: () => { DT.closeSheet(); DT.setLang(l); } })));
    DT.openSheet(t('language'), box);
  }
  /* Switch language without losing the place: remember the first visible anchored block and scroll back to it. */
  DT.setLang = function (l) {
    if (l === DT.lang()) return;
    const anchors = DT.$$('[data-anchor]', DT.$('#view'));
    const top = DT.$('#topbar').getBoundingClientRect().bottom;
    let anchor = null, offset = 0;
    for (const a of anchors) { const r = a.getBoundingClientRect(); if (r.bottom > top + 4) { anchor = a.getAttribute('data-anchor'); offset = r.top - top; break; } }
    const scrollY = window.scrollY;
    const video = DT.$('video'); const vstate = video ? { t: video.currentTime, paused: video.paused } : null;
    DT.state.settings.lang = l; DT.saveNow(); DT.applySettings();
    DT._restore = { anchor, offset, scrollY, vstate };
    DT.render();
    DT.toast(t('langChanged'));
  };

  /* ---------- routes ---------- */
  DT.route('/home', r => DT.views.home(r));
  DT.route('/lessons', r => DT.views.lessons(r));
  DT.route('/topic/:id', (r, id) => DT.views.topic(r, id));
  DT.route('/topic/:id/:tab', (r, id, tab) => DT.views.topic(r, id, tab));
  DT.route('/lesson/:id/:n', (r, id, n) => DT.views.lesson(r, id, n));
  DT.route('/lab', r => DT.views.labs(r));
  DT.route('/lab/:id', (r, id) => DT.views.lab(r, id));
  DT.route('/practice', r => DT.views.practice(r));
  DT.route('/practice/:id', (r, id) => DT.views.practice(r, id));
  DT.route('/review', r => DT.views.review(r));
  DT.route('/results', r => DT.views.results(r));
  DT.route('/videos', r => DT.views.videos(r));
  DT.route('/video/:id', (r, id) => DT.views.video(r, id, 1));
  DT.route('/video/:id/:n', (r, id, n) => DT.views.video(r, id, n));
  ['glossary', 'sources', 'notebook', 'settings', 'help', 'about', 'diag', 'chooser', 'formulas', 'independent', 'python', 'geometry', 'syllabus', 'search'].forEach(k => DT.route('/' + k, (r, q) => DT.views[k](r, DT.parseQuery(q))));

  let renderSeq = 0;
  DT.render = function () {
    const seq = ++renderSeq;
    DT._cleanup.forEach(f => { try { f(); } catch (e) {} }); DT._cleanup = [];
    const hash = DT.currentRoute().slice(1) || '/home';
    let match = null;
    for (const r of DT.routes) { const m = hash.match(r.re); if (m) { match = { r, args: m.slice(1).filter(x => x !== undefined) }; break; } }
    if (!match) { DT.go('#/home', true); return; }
    const first = hash.split('/')[1];
    const section = SECTION[first] || null;
    buildChrome(section);
    const isRoot = ['home', 'lessons', 'lab', 'practice', 'results'].includes(first) && hash.split('/').length === 2;
    DT.$('#btn-back').hidden = isRoot;
    const view = DT.$('#view');
    view.innerHTML = '';
    DT.$('#topbar-title').textContent = t('appTitle');
    document.title = t('appTitle');
    let out;
    try { out = match.r.handler(view, ...match.args); }
    catch (e) { console.error(e); view.appendChild(h('div', { class: 'panel', text: String(e) })); }
    const after = () => {
      if (seq !== renderSeq) return;
      const R = DT._restore; DT._restore = null;
      if (R && R.anchor) {
        const el = DT.$('[data-anchor="' + CSS.escape(R.anchor) + '"]', view);
        if (el) { const top = DT.$('#topbar').getBoundingClientRect().bottom; window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - top - R.offset); }
        else window.scrollTo(0, R.scrollY);
      } else if (R) window.scrollTo(0, R.scrollY);
      else if (!DT._keepScroll) window.scrollTo(0, 0);
      DT._keepScroll = false;
      if (R && R.vstate && DT.onLangRestoreVideo) DT.onLangRestoreVideo(R.vstate);
    };
    if (out && out.then) out.then(after).catch(e => { console.error(e); view.appendChild(h('div', { class: 'panel', text: t('comingSoon') })); });
    else after();
  };

  function init() {
    DT.applySettings();
    DT.$('#btn-menu').onclick = openDrawer;
    DT.$('#btn-lang').onclick = openLangSheet;
    DT.$('#btn-search').onclick = () => DT.go('#/search');
    DT.$('#btn-back').onclick = () => { if (history.length > 1) history.back(); else DT.go('#/home'); };
    window.addEventListener('hashchange', DT.render);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (DT._sheetOpen) DT.closeSheet(); else if (!DT.$('#drawer').hidden) closeDrawer(); } });
    if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener('change', DT.applySettings);
    window.addEventListener('online', () => DT.toast(t('online')));
    window.addEventListener('offline', () => DT.toast(t('offline')));
    if (!location.hash) history.replaceState(null, '', '#/home');
    DT.render();
  }
  /* Android back button: close overlays first, then navigate back, else let the app exit. */
  DT.onBack = function () {
    if (DT._sheetOpen) { DT.closeSheet(); return true; }
    if (!DT.$('#drawer').hidden) { closeDrawer(); return true; }
    const hash = DT.currentRoute();
    if (hash === '#/home' || hash === '#/' || hash === '') return false;
    history.back(); return true;
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
