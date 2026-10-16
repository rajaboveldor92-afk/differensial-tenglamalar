/* Core: storage (with schema migrations), i18n helpers, router, UI helpers, icons. */
(function () {
  const DT = window.DT;
  const STORE_KEY = 'dt.store';
  const SCHEMA = 2;

  /* ---------------- storage ---------------- */
  function freshState() {
    return {
      schema: SCHEMA,
      created: Date.now(),
      settings: { lang: 'uz', theme: 'auto', fs: 'md', reduceMotion: 'auto', aiUrl: '', videoUrl: '', speed: 1, subLang: 'same', audioLang: 'same' },
      progress: {
        lessons: {},      // lessonId -> { opened: ts, read: ts }
        last: null,       // { route, ts }
        quiz: {},         // topicId -> [ { ts, mode, score, total, wrong:[qid] } ]
        ex: {},           // exerciseId -> [ { ts, mode, result: 'ok'|'bad'|'unk', answer } ]
        mistakes: {},     // itemId -> { topic, count, last, resolved }
        diag: null,       // { ts, score, weak:[area] }
        video: {}         // videoId -> { pos, ts, done }
      },
      bookmarks: [],      // { route, ts, label:{uz,ru,en}|string }
      notes: {},          // key -> [ { ts, text } ]
      observations: {},   // labId -> [ { ts, text } ]
      ai: { history: [] }
    };
  }
  /* Migrations keep user data when the app is updated. Each step upgrades from version n to n+1. */
  const MIGRATIONS = {
    1: function (s) { // v1 stored settings at top level; v2 nests them and adds video progress
      const st = freshState();
      st.settings = Object.assign(st.settings, s.settings || {});
      ['lang', 'theme', 'fs'].forEach(k => { if (s[k]) st.settings[k] = s[k]; });
      st.progress = Object.assign(st.progress, s.progress || {});
      st.progress.video = st.progress.video || {};
      st.bookmarks = s.bookmarks || [];
      st.notes = s.notes || {};
      st.observations = s.observations || {};
      st.schema = 2;
      return st;
    }
  };
  function migrate(s) {
    let guard = 0;
    while (s && s.schema < SCHEMA && guard++ < 20) {
      const step = MIGRATIONS[s.schema];
      if (!step) break;
      s = step(s);
    }
    return s;
  }
  function deepFill(target, defaults) {
    for (const k in defaults) {
      if (target[k] === undefined) target[k] = defaults[k];
      else if (defaults[k] && typeof defaults[k] === 'object' && !Array.isArray(defaults[k]) && typeof target[k] === 'object') deepFill(target[k], defaults[k]);
    }
    return target;
  }
  function load() {
    let raw = null;
    try { raw = localStorage.getItem(STORE_KEY); } catch (e) { /* storage blocked */ }
    if (!raw) return freshState();
    try {
      let s = JSON.parse(raw);
      if (!s || typeof s !== 'object' || typeof s.schema !== 'number') return freshState();
      s = migrate(s);
      return deepFill(s, freshState());
    } catch (e) {
      try { localStorage.setItem(STORE_KEY + '.corrupt.' + Date.now(), raw); } catch (e2) {}
      return freshState();
    }
  }
  let saveTimer = null;
  function saveNow() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(DT.state)); } catch (e) { console.warn('save failed', e); }
    if (window.Android && Android.backup) { try { Android.backup(JSON.stringify(DT.state)); } catch (e) {} }
  }
  DT.save = function () { clearTimeout(saveTimer); saveTimer = setTimeout(saveNow, 150); };
  DT.saveNow = saveNow;
  DT.state = load();
  /* Native backup restore: if WebView storage was cleared but the native copy exists, restore it. */
  if (window.Android && Android.restore && DT.state.progress && Object.keys(DT.state.progress.lessons).length === 0) {
    try {
      const nb = Android.restore();
      if (nb) { const s = deepFill(migrate(JSON.parse(nb)), freshState()); if (s && s.schema === SCHEMA) DT.state = s; }
    } catch (e) {}
  }
  DT.SCHEMA = SCHEMA;
  DT.views = {};
  DT._cleanup = [];
  DT.freshState = freshState;
  DT.migrate = migrate;
  DT.deepFill = deepFill;
  window.addEventListener('pagehide', saveNow);
  document.addEventListener('visibilitychange', () => { if (document.hidden) saveNow(); });

  /* ---------------- i18n ---------------- */
  DT.lang = () => DT.state.settings.lang || 'uz';
  DT.t = function (key) {
    const e = DT.UI[key];
    if (!e) { console.warn('missing ui key', key); return key; }
    return e[DT.lang()] || e.uz;
  };
  /* tx: pick the current language from a {uz,ru,en} object (strings pass through). */
  DT.tx = function (o) {
    if (o == null) return '';
    if (typeof o === 'string' || typeof o === 'number') return String(o);
    return o[DT.lang()] != null ? o[DT.lang()] : (o.uz != null ? o.uz : '');
  };

  /* ---------------- helpers ---------------- */
  DT.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  DT.$ = (sel, root) => (root || document).querySelector(sel);
  DT.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  DT.h = function (tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return el;
  };
  DT.fmtDate = ts => { const d = new Date(ts); return d.toLocaleDateString(DT.lang() === 'en' ? 'en-GB' : (DT.lang() === 'ru' ? 'ru-RU' : 'uz-UZ')) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); };
  DT.toast = function (msg) {
    const el = DT.$('#toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(DT._toastT); DT._toastT = setTimeout(() => el.classList.remove('show'), 2600);
  };
  DT.isOnline = () => navigator.onLine !== false;

  /* ---------------- icons (inline SVG, stroke = currentColor) ---------------- */
  const P = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
    book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3"/><path d="M20 4v14h-7"/>',
    flask: '<path d="M9 3h6"/><path d="M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7.5 15h9"/>',
    pencil: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    chart: '<path d="M4 20V4"/><path d="M4 20h16"/><path d="M7 15l4-5 3 3 5-7"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    chev: '<path d="M9 5l7 7-7 7"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
    play: '<path d="M7 5v14l12-7z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
    glossary: '<path d="M5 4h11l3 3v13H5z"/><path d="M8 10h8M8 14h8M8 18h5"/>',
    sources: '<path d="M4 19V5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2 2 2 0 0 0 2 2h12"/>',
    note: '<path d="M5 3h10l4 4v14H5z"/><path d="M9 12h6M9 16h4"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7"/><path d="M12 17h.01"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
    flagFill: '<path d="M5 21V4" /><path d="M5 4h11l-2 4 2 4H5z" fill="currentColor"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7"/><path d="M12 17h.01"/>',
    def: '<path d="M4 6h16M4 12h10M4 18h7"/>',
    thm: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    example: '<path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/>',
    proof: '<path d="M5 12l4 4L19 6"/><rect x="3" y="3" width="18" height="18" rx="2"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
    ai: '<rect x="4" y="6" width="16" height="12" rx="3"/><path d="M9 11h.01M15 11h.01M9 15h6"/><path d="M12 3v3"/>',
    download: '<path d="M12 4v11"/><path d="M7 10l5 5 5-5"/><path d="M5 20h14"/>',
    upload: '<path d="M12 20V9"/><path d="M7 14l5-5 5 5"/><path d="M5 4h14"/>',
    trash: '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>',
    rewind: '<path d="M11 6L5 12l6 6"/><path d="M19 6l-6 6 6 6"/>',
    forward: '<path d="M13 6l6 6-6 6"/><path d="M5 6l6 6-6 6"/>',
    full: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    cc: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 10.5a2 2 0 1 0 0 3M17 10.5a2 2 0 1 0 0 3"/>',
    speed: '<path d="M12 14l4-6"/><path d="M4 18a8 8 0 1 1 16 0"/>',
    audio: '<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16 9a4 4 0 0 1 0 6"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    reset: '<path d="M4 4v6h6"/><path d="M5.5 15a7 7 0 1 0 1.6-7.4L4 10"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".5"/>',
    code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    tasks: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
    field: '<path d="M4 18l3-2M10 18l3-3M16 18l3-4M4 12l3-1M10 12l3-2M16 12l3-3M4 6l3 0M10 6l3-1M16 6l3-2"/>',
    lightbulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>'
  };
  DT.icon = function (name, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (P[name] || P.info) + '</svg>';
  };
  DT.iconEl = function (name, cls) { const s = document.createElement('span'); s.style.display = 'contents'; s.innerHTML = DT.icon(name, cls); return s.firstChild; };

  /* ---------------- router ---------------- */
  DT.routes = [];
  DT.route = function (pattern, handler) { DT.routes.push({ re: new RegExp('^' + pattern.replace(/:(\w+)/g, '([^/?]+)') + '(?:\\?(.*))?$'), handler }); };
  DT.go = function (hash, replace) {
    if (!hash.startsWith('#')) hash = '#' + hash;
    if (replace) { history.replaceState(null, '', hash); DT.render(); }
    else if (location.hash === hash) DT.render(); else location.hash = hash;
  };
  DT.currentRoute = () => location.hash || '#/home';
  DT.parseQuery = function (q) { const o = {}; (q || '').split('&').forEach(p => { if (!p) return; const [k, v] = p.split('='); o[decodeURIComponent(k)] = decodeURIComponent(v || ''); }); return o; };

  /* ---------------- sheet (modal) ---------------- */
  DT.openSheet = function (title, bodyEl, opts) {
    const sheet = DT.$('#sheet');
    sheet.innerHTML = '';
    const closeBtn = DT.h('button', { class: 'icon-btn', 'aria-label': DT.t('close'), html: DT.icon('close'), onclick: DT.closeSheet });
    const panel = DT.h('div', { class: 'sheet-panel', role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
      DT.h('div', { class: 'sheet-head' }, DT.h('h2', { text: title }), closeBtn), bodyEl);
    sheet.appendChild(panel);
    sheet.hidden = false;
    sheet.onclick = e => { if (e.target === sheet) DT.closeSheet(); };
    DT._sheetOpen = true;
    setTimeout(() => closeBtn.focus(), 30);
    if (opts && opts.onClose) DT._sheetOnClose = opts.onClose;
  };
  DT.closeSheet = function () {
    const sheet = DT.$('#sheet'); sheet.hidden = true; sheet.innerHTML = ''; DT._sheetOpen = false;
    if (DT._sheetOnClose) { const f = DT._sheetOnClose; DT._sheetOnClose = null; f(); }
  };
  DT.confirm = function (msg) { return window.confirm(msg); };
})();
