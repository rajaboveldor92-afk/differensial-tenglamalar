/* Video lessons: script registry, slide renderer (also used to render the video frames), player with speed control,
   subtitles, transcript, chapters, resume; offline pack manager (download / import / verify / delete via the Android shell). */
(function () {
  const DT = window.DT, h = DT.h, t = DT.t, tx = DT.tx;
  const X = (uz, ru, en) => ({ uz, ru, en })[DT.lang()];
  const P = () => DT.state.progress;
  const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const QUALITIES = ['480', '720'];
  DT.VIDEO = {};
  DT.addVideo = v => { DT.VIDEO[v.topic] = v; };
  DT.loadVideo = topic => DT.VIDEO[topic] ? Promise.resolve(DT.VIDEO[topic]) : DT.loadScript('content/video/' + topic + '.js').then(() => DT.VIDEO[topic] || null, () => null);
  /* media index produced by tools/video/build.py: per part and audio language the segment start times and duration,
     plus the list of packs (file names, sizes, SHA-256). */
  DT.loadMediaIndex = () => DT.VIDEO_MEDIA ? Promise.resolve(DT.VIDEO_MEDIA) : DT.loadScript('video/index.js').then(() => DT.VIDEO_MEDIA || { parts: {}, packs: [] }, () => (DT.VIDEO_MEDIA = { parts: {}, packs: [] }));
  const fmtT = s => { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const fmtMB = b => (b / 1048576).toFixed(b < 10485760 ? 1 : 0) + ' MB';
  const audioLang = () => { const a = DT.state.settings.audioLang; return a && a !== 'same' ? a : DT.lang(); };
  const subLang = () => { const s = DT.state.settings.subLang; return s === 'off' ? null : (s && s !== 'same' ? s : DT.lang()); };

  /* ---------- native pack bridge ---------- */
  function installed() { try { return window.Android && Android.packList ? JSON.parse(Android.packList() || '{}') : {}; } catch (e) { return {}; } }
  DT.packInstalled = installed;
  const packId = (topic, lang, q) => topic + '-' + lang + '-' + q;
  /* best source for a part: downloaded pack, then bundled file, then the configured server */
  function sourceFor(media, part, lang) {
    const inst = installed();
    for (const q of QUALITIES.slice().reverse()) {
      const id = packId(part.topic, lang, q);
      if (inst[id] && inst[id].dir) return { url: 'file://' + inst[id].dir + '/' + part.id + '-' + lang + '-' + q + '.mp4', kind: 'pack', q };
    }
    for (const q of QUALITIES) { const pk = (media.packs || []).find(p => p.id === packId(part.topic, lang, q) && p.bundled); if (pk) return { url: 'video/' + part.id + '-' + lang + '-' + q + '.mp4', kind: 'bundled', q }; }
    const base = DT.state.settings.videoUrl;
    const pk = (media.packs || []).find(p => p.id === packId(part.topic, lang, '480'));
    if (base && pk) return { url: base + '/' + part.id + '-' + lang + '-480.mp4', kind: 'stream', q: '480' };
    return null;
  }

  /* ---------- subtitle cues computed from the script + measured segment timings ---------- */
  function splitSentences(s) { return s.match(/[^.!?…]+[.!?…]*\s*/g) || [s]; }
  /* Subtitles in the narration language use the measured length of each sentence (timing.sw, written by
     tools/video/build.py); subtitles in another language share the segment in proportion to text length. */
  function cues(part, timing, lang, audioLang) {
    const out = [];
    const sw = audioLang === lang ? timing.sw : null;
    part.segments.forEach((seg, i) => {
      const a = timing.starts[i], b = i + 1 < timing.starts.length ? timing.starts[i + 1] : timing.dur;
      const sents = splitSentences(seg.say[lang]).map(s => s.trim()).filter(Boolean);
      // long sentences are split at commas so a cue stays readable
      const parts = []; sents.forEach(s => { if (s.length <= 110) parts.push(s); else { let cur = ''; s.split(/(?<=,)\s/).forEach(c => { if ((cur + ' ' + c).length > 110 && cur) { parts.push(cur); cur = c; } else cur = cur ? cur + ' ' + c : c; }); if (cur) parts.push(cur); } });
      const end = Math.max(a + 0.1, b - 0.25); let x = a;
      if (sw && sw[i] && sw[i].length === parts.length) {
        parts.forEach((p, k) => { const y = k === parts.length - 1 ? end : Math.min(x + sw[i][k], end); out.push({ start: x, end: Math.max(y, x + 0.05), text: p, seg: i }); x = y; });
        return;
      }
      const total = parts.reduce((s, p) => s + p.length, 0) || 1, span = end - a;
      parts.forEach(p => { const d = span * p.length / total; out.push({ start: x, end: x + d, text: p, seg: i }); x += d; });
    });
    return out;
  }
  DT.videoCues = cues;
  DT.toVTT = function (cs) {
    const ts = s => { const ms = Math.round(s * 1000); const hh = Math.floor(ms / 3600000), mm = Math.floor(ms / 60000) % 60, ss = Math.floor(ms / 1000) % 60, r = ms % 1000; return String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0') + '.' + String(r).padStart(3, '0'); };
    return 'WEBVTT\n\n' + cs.map((c, i) => (i + 1) + '\n' + ts(c.start) + ' --> ' + ts(c.end) + '\n' + c.text + '\n').join('\n');
  };

  /* ---------- slide renderer (in-app slides and video frames share it) ---------- */
  /* captions written as plain text with ^{..} / _{..} get real super/subscripts */
  const capHtml = s => s.includes('$') ? DT.inline(s) : DT.esc(s).replace(/\^\{([^}]*)\}/g, '<sup>$1</sup>').replace(/\^(\w)/g, '<sup>$1</sup>').replace(/_\{([^}]*)\}/g, '<sub>$1</sub>');
  DT.renderSlide = function (show, part, lang, opts) {
    opts = opts || {};
    const L = o => (o && typeof o === 'object' && !Array.isArray(o)) ? (o[lang] || o.uz) : o;
    const el = h('div', { class: 'slide slide-' + show.kind });
    if (show.kind !== 'title') { const o = DT.outline(part.topic); el.appendChild(h('div', { class: 'slide-head' }, h('span', { text: o ? (o.extra ? 'L' : String(o.num)) : '' }), h('span', { html: DT.inline(L(part.title)) }))); }
    if (show.kind === 'title') {
      el.appendChild(h('div', { class: 'slide-kicker', text: tx(DT.outline(part.topic) ? (DT.outline(part.topic).extra ? DT.L('Qo‘shimcha modul', 'Дополнительный модуль', 'Extra module') : DT.L('Mavzu ' + DT.outline(part.topic).num, 'Тема ' + DT.outline(part.topic).num, 'Topic ' + DT.outline(part.topic).num)) : '') }));
      el.appendChild(h('h2', { html: DT.inline(L(part.title)) }));
      el.appendChild(h('p', { html: DT.inline(L(show.text || part.objective)) }));
    } else if (show.kind === 'tex') {
      el.appendChild(h('div', { class: 'slide-math', html: DT.katexStr(show.tex, true) }));
      if (show.caption) el.appendChild(h('p', { class: 'slide-cap', html: capHtml(L(show.caption)) }));
    } else if (show.kind === 'steps') {
      const ol = h('div', { class: 'slide-steps' });
      show.tex.forEach(s => ol.appendChild(h('div', { class: 'slide-math', html: DT.katexStr(s, true) })));
      el.appendChild(ol);
      if (show.caption) el.appendChild(h('p', { class: 'slide-cap', html: capHtml(L(show.caption)) }));
    } else if (show.kind === 'plot') {
      const host = h('div', { class: 'slide-plot' }); el.appendChild(host);
      if (show.caption) el.appendChild(h('p', { class: 'slide-cap', html: capHtml(L(show.caption)) }));
      requestAnimationFrame(() => drawSlidePlot(host, show));
    } else if (show.kind === 'check') {
      const c = part.check;
      el.appendChild(h('div', { class: 'slide-kicker', text: L(DT.UI.checkQuestion) }));
      el.appendChild(h('h3', { html: DT.inline(L(c.q)) }));
      const ul = h('ol', { type: 'A' }); c.options.forEach(o => ul.appendChild(h('li', { html: DT.inline(L(o)) }))); el.appendChild(ul);
    } else if (show.kind === 'sources') {
      el.appendChild(h('div', { class: 'slide-kicker', text: L(DT.UI.sources) }));
      const ul = h('ul'); (part.sources || []).forEach(s => ul.appendChild(h('li', { text: s }))); el.appendChild(ul);
      el.appendChild(h('p', { class: 'slide-cap', text: L(DT.UI.syntheticVoice) }));
    }
    return el;
  };
  function drawSlidePlot(host, s) {
    const p = new DT.Plot(host, { xmin: s.x[0], xmax: s.x[1], ymin: s.y[0], ymax: s.y[1], aspect: 0.5, maxH: 2000 });
    const cols = ['--curve-1', '--curve-2', '--curve-3', '--curve-4'].map(DT.css);
    const draw = () => {
      p.resize(); p.clear(); p.axes();
      const comp = (e, vars) => { const a = DT.Expr.parse(e, vars); return a; };
      try {
        if (s.field) {
          const a = comp(s.field, ['x', 'y']); const f = (x, y) => DT.Expr.ev(a, { x, y });
          p.field(f);
          (s.curves || []).forEach((c, i) => { p.line(DT.ODE.integralCurve(f, c[0], c[1], { xmin: s.x[0], xmax: s.x[1], ymin: s.y[0], ymax: s.y[1] }), { color: cols[i % 4], width: 3 }); p.dot(c[0], c[1], { color: cols[i % 4], ring: true }); });
        }
        (s.fns || []).forEach((e, i) => { const a = comp(e, ['x']); p.fn(x => DT.Expr.ev(a, { x }), { color: cols[i % 4], width: 3 }); });
      } catch (e) { console.error(e); }
    };
    draw(); p.onResize = draw;
  }

  /* ---------- VIDEOS LIST + PACK MANAGER ---------- */
  DT.views.videos = function (root) {
    const w = h('div', { class: 'view-narrow' }); root.appendChild(w);
    w.appendChild(h('h1', { text: t('videoLessons') }));
    w.appendChild(h('p', { class: 'muted', text: t('videoIntro') }));
    w.appendChild(h('div', { class: 'blk note' }, h('div', { class: 'prose', text: t('syntheticVoice') })));
    const host = h('div'); w.appendChild(host);
    return Promise.all([DT.loadMediaIndex(), Promise.all(DT.OUTLINE.map(o => DT.loadVideo(o.id)))]).then(([media, vids]) => {
      const inst = installed();
      const canDownload = !!(window.Android && Android.packDownload);
      DT.OUTLINE.forEach((o, i) => {
        const v = vids[i];
        const row = h('div', { class: 'gl-item video-row', 'data-anchor': 'v-' + o.id });
        row.appendChild(h('div', { class: 'status-row' }, h('strong', { text: (o.extra ? 'L' : o.num) + '. ' + tx(o.title) })));
        if (!v) { row.appendChild(h('div', { class: 'small muted', text: t('videoNotAvailable') })); host.appendChild(row); return; }
        v.parts.forEach((pt, k) => row.appendChild(h('a', { class: 'row-link', href: '#/video/' + o.id + '/' + (k + 1) }, DT.iconEl('play'), h('div', { class: 'body' }, h('div', { class: 'title', html: DT.inline(tx(pt.title)) }), h('div', { class: 'small muted', html: DT.inline(tx(pt.objective)) }), P().video[pt.id] && P().video[pt.id].done ? h('span', { class: 'chip ok', html: DT.icon('check') + DT.esc(X('Ko‘rilgan', 'Просмотрено', 'Watched')) }) : null), DT.iconEl('chev', 'chev'))));
        // status per language: script / subtitles / video / downloaded
        const tbl = h('div', { class: 'pack-grid' });
        DT.LANGS.forEach(l => {
          const hasTiming = v.parts.every(pt => media.parts[pt.id] && media.parts[pt.id][l]);
          const pk = QUALITIES.map(q => (media.packs || []).find(p => p.id === packId(o.id, l, q))).filter(Boolean);
          const local = QUALITIES.filter(q => inst[packId(o.id, l, q)]);
          const chips = [h('span', { class: 'chip ok', text: t('vsScript') })];
          chips.push(hasTiming ? h('span', { class: 'chip ok', text: t('subtitles') }) : h('span', { class: 'chip warn', text: t('subtitles') + ' —' }));
          chips.push(pk.length ? h('span', { class: 'chip ok', text: t('vsReady') }) : h('span', { class: 'chip warn', text: X('Video tayyor emas', 'Видео не готово', 'Video not produced') }));
          if (pk.some(p => p.bundled)) chips.push(h('span', { class: 'chip ok', text: X('Ilovada', 'В приложении', 'Built in') }));
          if (local.length) chips.push(h('span', { class: 'chip ok', html: DT.icon('check') + DT.esc(t('vsDownloaded') + ' ' + local.map(q => q + 'p').join(', ')) }));
          const actions = h('div', { class: 'btn-row' });
          pk.forEach(p => {
            if (p.bundled) return;
            const id = p.id, q = id.split('-').pop();
            if (inst[id]) actions.appendChild(h('button', { class: 'btn small ghost', html: DT.icon('trash') + DT.esc(t('deletePack') + ' ' + q + 'p'), onclick: () => { if (DT.confirm(t('deletePack') + '? ' + X('O‘quv natijalari saqlanib qoladi.', 'Результаты обучения сохранятся.', 'Your progress is kept.'))) { Android.packDelete(id); DT.toast(t('packDeleted')); DT._keepScroll = true; DT.render(); } } }));
            else actions.appendChild(h('button', { class: 'btn small', id: 'dl-' + id, disabled: !canDownload || !DT.state.settings.videoUrl ? true : null, html: DT.icon('download') + DT.esc(t('download') + ' ' + q + 'p · ' + fmtMB(p.bytes)), onclick: () => startDownload(p) }));
          });
          tbl.appendChild(h('div', { class: 'pack-row' }, h('div', { class: 'pack-lang', text: DT.LANG_NAMES[l] }), h('div', { class: 'status-row' }, chips), actions, h('div', { class: 'small muted pack-prog', id: 'prog-' + o.id + '-' + l })));
        });
        row.appendChild(tbl);
        host.appendChild(row);
      });
      const tools = h('div', { class: 'btn-row' });
      if (window.Android && Android.importPack) tools.appendChild(h('button', { class: 'btn', html: DT.icon('upload') + DT.esc(t('importPack')), onclick: () => Android.importPack(JSON.stringify(media.packs || [])) }));
      w.insertBefore(tools, host);
      if (!canDownload) w.insertBefore(h('p', { class: 'small muted', text: X('Paketlarni yuklab olish va o‘chirish Android ilovasida ishlaydi.', 'Загрузка и удаление пакетов работают в Android-приложении.', 'Downloading and deleting packs works in the Android app.') }), host);
      else if (!DT.state.settings.videoUrl) w.insertBefore(h('p', { class: 'small muted', html: DT.esc(t('noVideoServer')) + ' <a href="#/settings">' + DT.esc(t('settings')) + '</a>' }), host);
    });
  };
  function startDownload(p) {
    const base = DT.state.settings.videoUrl; if (!base) { DT.toast(t('noVideoServer')); return; }
    const b = DT.$('#dl-' + p.id); if (b) b.disabled = true;
    Android.packDownload(p.id, base, JSON.stringify(p.files));
  }
  /* called by the Android shell */
  DT.onPackProgress = function (id, done, total, state, msg) {
    const [topic, lang] = id.split('-');
    const el = DT.$('#prog-' + topic + '-' + lang);
    if (el) el.textContent = state === 'run' ? id.split('-').pop() + 'p: ' + fmtMB(done) + ' / ' + fmtMB(total) + ' (' + Math.round(100 * done / Math.max(1, total)) + '%)' : state === 'verify' ? X('Butunligi tekshirilmoqda…', 'Проверка целостности…', 'Checking integrity…') : state === 'ok' ? '✓ ' + t('vsDownloaded') : state === 'error' ? '⚠ ' + (msg || X('Xatolik. Qayta bosing — yuklash to‘xtagan joyidan davom etadi.', 'Ошибка. Нажмите снова — загрузка продолжится с места остановки.', 'Error. Tap again — the download resumes where it stopped.')) : '';
    if (state === 'ok' || state === 'error') { DT._keepScroll = true; setTimeout(() => { if (DT.currentRoute().startsWith('#/videos')) DT.render(); }, 600); }
  };
  DT.onPackImported = function (ok, msg) { DT.toast(ok ? t('importDone') : (msg || t('importBad'))); DT._keepScroll = true; DT.render(); };

  /* ---------- PLAYER ---------- */
  DT.views.video = function (root, topic, n) {
    return Promise.all([DT.loadVideo(topic), DT.loadMediaIndex(), DT.loadTopic(topic).catch(() => null)]).then(([v, media, T]) => {
      const o = DT.outline(topic);
      const w = h('div', { class: 'view-narrow video-page' }); root.appendChild(w);
      if (!v) { w.appendChild(h('h1', { text: t('videoLessons') })); w.appendChild(h('p', { text: t('videoNotAvailable') })); return; }
      const idx = Math.max(0, Math.min(v.parts.length - 1, (+n || 1) - 1));
      const part = Object.assign({ topic }, v.parts[idx]);
      DT.setLast('#/video/' + topic + '/' + (idx + 1), part.title);
      w.appendChild(h('div', { class: 'kicker', text: t('videoLessons') + ' · ' + (o.extra ? 'L' : t('topic') + ' ' + o.num) + ' · ' + (idx + 1) + '/' + v.parts.length }));
      w.appendChild(h('h1', { html: DT.inline(tx(part.title)) }));
      w.appendChild(h('p', { html: '<strong>' + DT.esc(t('objective')) + ':</strong> ' + DT.inline(tx(part.objective)) }));
      w.appendChild(h('p', { class: 'small synth', html: DT.icon('audio') + ' ' + DT.esc(t('syntheticVoice')) }));
      new Player(w, part, media, T);
      // part navigation
      const nav = h('div', { class: 'btn-row' });
      if (idx > 0) nav.appendChild(h('a', { class: 'btn', href: '#/video/' + topic + '/' + idx, html: DT.icon('back') + DT.esc(tx(v.parts[idx - 1].title)) }));
      if (idx + 1 < v.parts.length) nav.appendChild(h('a', { class: 'btn', href: '#/video/' + topic + '/' + (idx + 2), html: DT.esc(tx(v.parts[idx + 1].title)) + DT.icon('chev') }));
      nav.appendChild(h('a', { class: 'btn ghost', href: '#/topic/' + topic, html: DT.icon('book') + DT.esc(t('topic') + ' ' + o.num) }));
      w.appendChild(nav);
    });
  };

  function Player(host, part, media, T) {
    const self = this;
    this.part = part; this.media = media;
    this.lang = audioLang();
    const S = DT.state.settings;
    const box = h('div', { class: 'player', tabindex: '-1' });
    const stage = h('div', { class: 'player-stage' });
    const video = h('video', { playsinline: '', preload: 'metadata', 'aria-label': tx(part.title) });
    const slideHost = h('div', { class: 'slide-host', 'aria-live': 'polite' });
    const sub = h('div', { class: 'player-sub', 'aria-hidden': 'true' });
    const audioCover = h('div', { class: 'audio-cover', hidden: true }, DT.iconEl('audio'), h('div', { text: t('audioOnly') }));
    stage.append(video, slideHost, audioCover, sub);
    box.appendChild(stage);
    const slideText = h('div', { class: 'slide-text', hidden: true, 'aria-live': 'polite' });
    box.appendChild(slideText);
    // controls
    const btn = (ic, label, fn, extra) => h('button', Object.assign({ class: 'pbtn', 'aria-label': label, title: label, html: DT.icon(ic), onclick: fn }, extra || {}));
    const playB = btn('play', t('play'), () => this.toggle());
    const backB = btn('rewind', X('10 soniya orqaga', 'Назад на 10 секунд', 'Back 10 seconds'), () => this.seek(this.time() - 10));
    const fwdB = btn('forward', X('10 soniya oldinga', 'Вперёд на 10 секунд', 'Forward 10 seconds'), () => this.seek(this.time() + 10));
    const timeL = h('span', { class: 'ptime', text: '0:00 / 0:00' });
    const bar = h('input', { type: 'range', class: 'pbar', min: 0, max: 1000, value: 0, step: 1, 'aria-label': X('Vaqt shkalasi', 'Шкала времени', 'Timeline') });
    bar.addEventListener('input', () => this.seek(bar.value / 1000 * this.duration()));
    const speedB = h('button', { class: 'pbtn speed', 'aria-haspopup': 'true', 'aria-label': t('speed'), title: t('speed') });
    const oneB = h('button', { class: 'pbtn one', text: '1×', 'aria-label': t('speed') + ' 1×', title: t('speed') + ' 1×', onclick: () => this.setSpeed(1) });
    const speedMenu = h('div', { class: 'speed-menu', role: 'menu', hidden: true });
    SPEEDS.forEach(s => speedMenu.appendChild(h('button', { role: 'menuitemradio', 'data-s': s, text: s + '×', onclick: () => { this.setSpeed(s); speedMenu.hidden = true; } })));
    speedB.onclick = () => { speedMenu.hidden = !speedMenu.hidden; if (!speedMenu.hidden) { const cur = DT.$('button[aria-checked="true"]', speedMenu); if (cur) cur.focus(); } };
    const ccB = btn('cc', t('subtitles'), () => this.openLangSheet());
    const audB = btn('audio', t('audioOnly'), () => this.setAudioOnly(!this.audioOnly), { 'aria-pressed': 'false' });
    const fullB = btn('full', t('fullscreen'), () => this.fullscreen());
    const ctl = h('div', { class: 'player-bar' }, h('div', { class: 'prow' }, bar), h('div', { class: 'prow' }, playB, backB, fwdB, timeL, h('span', { style: { flex: 1 } }), oneB, h('span', { class: 'speed-wrap' }, speedB, speedMenu), ccB, audB, fullB));
    box.appendChild(ctl);
    host.appendChild(box);
    this.els = { video, slideHost, sub, slideText, playB, timeL, bar, speedB, oneB, speedMenu, audB, audioCover, box, stage };
    // info line
    this.info = h('p', { class: 'small muted' }); host.appendChild(this.info);
    // chapters + transcript
    const chap = h('div', { class: 'chapters' });
    host.appendChild(h('h2', { text: t('chapters') })); host.appendChild(chap);
    const trHead = h('div', { class: 'status-row' }, h('h2', { text: t('transcript'), style: { margin: 0 } }), h('span', { style: { flex: 1 } }),
      h('button', { class: 'btn small ghost', html: DT.icon('ai') + DT.esc(t('explainHere')), onclick: () => this.explainHere() }));
    const tr = h('div', { class: 'transcript', role: 'list' });
    host.appendChild(trHead); host.appendChild(tr);
    this.chapEl = chap; this.trEl = tr;
    // check question
    const chk = h('div'); host.appendChild(h('h2', { text: t('checkQuestion') })); host.appendChild(chk);
    this.renderCheck(chk);
    // events
    video.addEventListener('timeupdate', () => this.tick());
    video.addEventListener('play', () => this.syncPlay());
    video.addEventListener('pause', () => { this.syncPlay(); this.savePos(); });
    video.addEventListener('ended', () => { P().video[part.id] = Object.assign(P().video[part.id] || {}, { done: true, ts: Date.now(), pos: 0 }); DT.saveNow(); this.syncPlay(); });
    video.addEventListener('loadedmetadata', () => { this.applySpeed(); if (this._pendingSeek != null) { video.currentTime = this._pendingSeek; this._pendingSeek = null; } this.tick(); });
    video.addEventListener('ratechange', () => this.showSpeed());
    video.addEventListener('error', () => { this.info.textContent = X('Videoni ochib bo‘lmadi. Slaydlar va matn rejimi ishlaydi.', 'Не удалось открыть видео. Работает режим слайдов и текста.', 'The video could not be opened. Slides-and-text mode works.'); this.useSlides(); });
    const keys = e => { if (e.target.tagName === 'INPUT' && e.target.type !== 'range') return; if (e.key === ' ' || e.key === 'k') { e.preventDefault(); this.toggle(); } else if (e.key === 'ArrowLeft' && e.target !== bar) this.seek(this.time() - 10); else if (e.key === 'ArrowRight' && e.target !== bar) this.seek(this.time() + 10); else if (e.key === 'Escape') speedMenu.hidden = true; };
    box.addEventListener('keydown', keys);
    DT._cleanup.push(() => { this.savePos(); try { video.pause(); video.removeAttribute('src'); video.load(); } catch (e) {} });
    DT.onLangRestoreVideo = st => { if (st && st.seg != null) { this._resumeSeg = st; } };
    this.current = DT._restore && DT._restore.vstate ? DT._restore.vstate : null;
    this.load(true);
  }
  Player.prototype.timing = function (lang) { const m = this.media.parts[this.part.id]; return m && m[lang || this.lang]; };
  Player.prototype.load = function (first) {
    const part = this.part, { video } = this.els;
    this.timingNow = this.timing();
    const src = this.timingNow ? sourceFor(this.media, part, this.lang) : null;
    this.slidesMode = !src;
    const subL = subLang();
    this.cues = this.timingNow && subL ? cues(part, this.timingNow, subL, this.lang) : [];
    this.renderChapters(); this.renderTranscript();
    const prev = P().video[part.id];
    if (src) {
      video.hidden = false; this.els.slideHost.hidden = true;
      video.src = src.url;
      this.info.textContent = (src.kind === 'pack' ? t('vsDownloaded') : src.kind === 'bundled' ? X('Ilovaga kiritilgan video', 'Встроенное видео', 'Built-in video') : X('Serverdan oqim', 'Потоковое воспроизведение с сервера', 'Streaming from server')) + ' · ' + src.q + 'p · ' + DT.LANG_NAMES[this.lang];
      let at = null;
      const rs = DT._videoSwitch; DT._videoSwitch = null;
      if (rs && rs.part === part.id) at = this.segTime(rs.seg, rs.frac);
      else if (first && prev && prev.pos > 5 && !prev.done && prev.lang === this.lang) at = prev.pos;
      else if (first && prev && prev.pos > 5 && !prev.done && prev.seg != null) at = this.segTime(prev.seg, prev.frac || 0);
      if (at != null) { this._pendingSeek = at; if (first && !rs) DT.toast(t('resumeFrom') + ' ' + fmtT(at)); }
      if (rs && rs.playing) video.play().catch(() => {});
    } else this.useSlides();
    this.showSpeed();
  };
  Player.prototype.useSlides = function () {
    this.slidesMode = true;
    const { video, slideHost } = this.els;
    video.hidden = true; slideHost.hidden = false;
    if (!this.info.textContent) this.info.textContent = (DT.state.settings.videoUrl ? '' : t('noVideoServer') + ' ') + X('Slaydlar va matn rejimi: bosqichlarni tugmalar bilan almashtiring.', 'Режим слайдов и текста: переключайте шаги кнопками.', 'Slides-and-text mode: step through with the buttons.');
    this.slideIdx = this.slideIdx || 0; this.drawSlide();
  };
  Player.prototype.drawSlide = function () {
    const { slideHost, sub, timeL, bar } = this.els, segs = this.part.segments, i = this.slideIdx;
    slideHost.innerHTML = ''; slideHost.appendChild(DT.renderSlide(segs[i].show, this.part, DT.lang()));
    sub.textContent = ''; sub.hidden = true;
    this.els.slideText.hidden = false; this.els.slideText.textContent = segs[i].say[subLang() || DT.lang()];
    timeL.textContent = (i + 1) + ' / ' + segs.length; bar.value = 1000 * i / Math.max(1, segs.length - 1);
    this.highlight(i);
    P().video[this.part.id] = Object.assign(P().video[this.part.id] || {}, { seg: i, frac: 0, ts: Date.now(), done: i === segs.length - 1 || (P().video[this.part.id] || {}).done });
    DT.save();
  };
  Player.prototype.segTime = function (seg, frac) { const tm = this.timingNow; if (!tm) return 0; const a = tm.starts[seg] || 0, b = seg + 1 < tm.starts.length ? tm.starts[seg + 1] : tm.dur; return a + (b - a) * (frac || 0); };
  Player.prototype.segAt = function (time) { const s = this.timingNow ? this.timingNow.starts : [0]; let i = 0; while (i + 1 < s.length && s[i + 1] <= time + 0.01) i++; return i; };
  Player.prototype.time = function () { return this.slidesMode ? this.slideIdx : this.els.video.currentTime || 0; };
  Player.prototype.duration = function () { return this.slidesMode ? this.part.segments.length - 1 : (this.els.video.duration || (this.timingNow && this.timingNow.dur) || 0); };
  Player.prototype.seek = function (x) {
    if (this.slidesMode) { this.slideIdx = Math.max(0, Math.min(this.part.segments.length - 1, Math.round(x))); this.drawSlide(); return; }
    const v = this.els.video; x = Math.max(0, Math.min(this.duration() - 0.05, x));
    if (v.readyState < 1) this._pendingSeek = x; else v.currentTime = x;
    this.tick();
  };
  Player.prototype.toggle = function () {
    if (this.slidesMode) { this.seek(this.slideIdx + 1); return; }
    const v = this.els.video; if (v.paused) { this.applySpeed(); v.play().catch(() => {}); } else v.pause();
  };
  Player.prototype.syncPlay = function () {
    const p = this.els.playB; const playing = !this.slidesMode && !this.els.video.paused;
    p.innerHTML = DT.icon(this.slidesMode ? 'chev' : playing ? 'pause' : 'play');
    const l = this.slidesMode ? X('Keyingi bosqich', 'Следующий шаг', 'Next step') : playing ? t('pause') : t('play'); p.setAttribute('aria-label', l); p.title = l;
  };
  Player.prototype.tick = function () {
    if (this.slidesMode) return;
    const v = this.els.video, cur = v.currentTime || 0, d = this.duration();
    this.els.timeL.textContent = fmtT(cur) + ' / ' + fmtT(d);
    if (document.activeElement !== this.els.bar) this.els.bar.value = d ? 1000 * cur / d : 0;
    const c = this.cues.find(c => cur >= c.start && cur < c.end);
    this.els.sub.textContent = c ? c.text : '';
    this.els.sub.hidden = !c;
    const si = this.segAt(cur); if (si !== this._lastSeg) { this._lastSeg = si; this.highlight(si); }
    this.syncPlay();
    if (Date.now() - (this._lastSave || 0) > 4000) this.savePos();
  };
  Player.prototype.savePos = function () {
    if (this.slidesMode) return; const v = this.els.video; if (!v.duration) return;
    this._lastSave = Date.now();
    const seg = this.segAt(v.currentTime), a = this.segTime(seg, 0), b = this.segTime(seg, 1);
    P().video[this.part.id] = Object.assign(P().video[this.part.id] || {}, { pos: v.currentTime, seg, frac: b > a ? (v.currentTime - a) / (b - a) : 0, lang: this.lang, ts: Date.now() });
    DT.save();
  };
  /* speed: 0.5–2×, pitch preserved, remembered across lessons */
  Player.prototype.applySpeed = function () { const v = this.els.video, s = DT.state.settings.speed || 1; v.preservesPitch = true; v.mozPreservesPitch = true; v.webkitPreservesPitch = true; v.defaultPlaybackRate = s; v.playbackRate = s; };
  Player.prototype.setSpeed = function (s) { DT.state.settings.speed = s; DT.save(); this.applySpeed(); this.showSpeed(); DT.toast(t('speed') + ': ' + s + '×'); };
  Player.prototype.showSpeed = function () {
    const s = DT.state.settings.speed || 1, { speedB, oneB, speedMenu } = this.els;
    speedB.innerHTML = DT.icon('speed') + '<span>' + s + '×</span>'; speedB.setAttribute('aria-label', t('speed') + ' ' + s + '×');
    oneB.hidden = s === 1 || this.slidesMode; speedB.parentNode.hidden = this.slidesMode;
    DT.$$('button', speedMenu).forEach(b => { b.setAttribute('aria-checked', String(+b.dataset.s === s)); b.setAttribute('aria-pressed', String(+b.dataset.s === s)); });
  };
  Player.prototype.setAudioOnly = function (on) {
    this.audioOnly = on; const { video, audioCover, audB, stage } = this.els;
    audB.setAttribute('aria-pressed', String(on)); stage.classList.toggle('audio-only', on);
    audioCover.hidden = !on || this.slidesMode;
    video.style.visibility = on ? 'hidden' : '';
    this.applySpeed();
  };
  Player.prototype.fullscreen = function () {
    const el = this.els.box;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else if (el.requestFullscreen) el.requestFullscreen().then(() => { try { screen.orientation.lock('landscape').catch(() => {}); } catch (e) {} }).catch(() => DT.toast(X('To‘liq ekran mavjud emas', 'Полноэкранный режим недоступен', 'Fullscreen not available')));
  };
  Player.prototype.openLangSheet = function () {
    const S = DT.state.settings, box = h('div');
    const group = (title, key, withOff) => {
      box.appendChild(h('h3', { text: title }));
      const opts = [['same', X('Ilova tili', 'Язык приложения', 'App language')]].concat(DT.LANGS.map(l => [l, DT.LANG_NAMES[l]]));
      if (withOff) opts.push(['off', t('off')]);
      opts.forEach(([v, l]) => box.appendChild(h('button', { class: 'opt', 'aria-pressed': String((S[key] || 'same') === v), html: '<span>' + DT.esc(l) + '</span>', onclick: () => { this.switchLang(key, v); DT.closeSheet(); } })));
    };
    group(t('audioLang'), 'audioLang'); group(t('subtitles'), 'subLang', true);
    DT.openSheet(t('subtitles') + ' / ' + t('audioLang'), box);
  };
  /* switching audio language keeps the place: same segment, same fraction of it */
  Player.prototype.switchLang = function (key, v) {
    const S = DT.state.settings; const v0 = this.els.video;
    const st = !this.slidesMode && v0.duration ? { part: this.part.id, seg: this.segAt(v0.currentTime), frac: 0, playing: !v0.paused } : null;
    if (st) { const a = this.segTime(st.seg, 0), b = this.segTime(st.seg, 1); st.frac = b > a ? (v0.currentTime - a) / (b - a) : 0; }
    S[key] = v; DT.save();
    if (key === 'audioLang' && audioLang() !== this.lang) { this.lang = audioLang(); DT._videoSwitch = st; this.info.textContent = ''; this.load(false); }
    else { this.cues = this.timingNow && subLang() ? cues(this.part, this.timingNow, subLang(), this.lang) : []; this.tick(); if (this.slidesMode) this.drawSlide(); }
  };
  Player.prototype.renderChapters = function () {
    const c = this.chapEl; c.innerHTML = '';
    this.part.segments.forEach((s, i) => { if (!s.chapter) return; c.appendChild(h('button', { class: 'chip', 'data-seg': i, html: (this.timingNow ? '<b>' + fmtT(this.segTime(i, 0)) + '</b> ' : '') + DT.esc(tx(s.chapter)), onclick: () => this.seek(this.slidesMode ? i : this.segTime(i, 0) + 0.01) })); });
  };
  Player.prototype.renderTranscript = function () {
    const tr = this.trEl; tr.innerHTML = '';
    const lang = this.slidesMode ? (subLang() || DT.lang()) : this.lang;
    this.part.segments.forEach((s, i) => tr.appendChild(h('button', { class: 'tr-line', role: 'listitem', 'data-seg': i, onclick: () => { this.seek(this.slidesMode ? i : this.segTime(i, 0) + 0.01); if (!this.slidesMode && this.els.video.paused) { this.applySpeed(); this.els.video.play().catch(() => {}); } } },
      h('span', { class: 'tr-time', text: this.timingNow && !this.slidesMode ? fmtT(this.segTime(i, 0)) : String(i + 1) }), h('span', { text: s.say[lang] }))));
  };
  Player.prototype.highlight = function (i) {
    DT.$$('.tr-line', this.trEl).forEach(b => { const on = +b.dataset.seg === i; b.classList.toggle('on', on); if (on) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    const cur = DT.$('.tr-line.on', this.trEl);
    if (cur && !this.trEl.matches(':hover')) { const r = cur.getBoundingClientRect(), rr = this.trEl.getBoundingClientRect(); if (r.top < rr.top || r.bottom > rr.bottom) this.trEl.scrollTop += r.top - rr.top - 40; }
  };
  /* "Explain this part": sends only the current transcript passage and topic to the AI helper */
  Player.prototype.explainHere = function () {
    const i = this.slidesMode ? this.slideIdx : this.segAt(this.time());
    const seg = this.part.segments[i];
    if (!this.slidesMode) this.els.video.pause();
    DT.openAI({ topicId: this.part.topic, mode: 'explain', transcript: seg.say[DT.lang()], videoTitle: tx(this.part.title), show: seg.show && seg.show.tex ? [].concat(seg.show.tex).join('\n') : '' });
  };
  Player.prototype.renderCheck = function (host) {
    const c = this.part.check; if (!c) return;
    const box = h('div', { class: 'ex' }, h('div', { class: 'ex-q prose', html: DT.md(tx(c.q)) }));
    const fb = h('div', { class: 'feedback', hidden: true });
    c.options.forEach((o, k) => box.appendChild(h('button', { class: 'opt', html: '<span class="mark">' + 'ABCD'[k] + '</span><span>' + DT.inline(tx(o)) + '</span>', onclick: e => {
      DT.$$('.opt', box).forEach((b, j) => { b.classList.toggle('ok', j === c.correct); b.classList.toggle('bad', j === k && k !== c.correct); });
      fb.hidden = false; fb.className = 'feedback ' + (k === c.correct ? 'ok' : 'bad');
      fb.innerHTML = DT.esc(k === c.correct ? t('correct') : t('incorrect')) + '<div class="prose">' + DT.md(tx(c.explain)) + '</div>';
    } })));
    box.appendChild(fb); host.appendChild(box);
  };
})();
