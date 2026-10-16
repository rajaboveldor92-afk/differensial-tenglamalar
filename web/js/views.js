/* Main views: home, lessons, topic, lesson, practice, results, labs list. */
(function () {
  const DT = window.DT, h = DT.h, t = DT.t, tx = DT.tx;
  const P = () => DT.state.progress;

  /* ---------- progress helpers ---------- */
  DT.topicStats = function (topicOutline) {
    const id = topicOutline.id, T = DT.TOPICS[id];
    const lessons = T ? T.lessons.map(l => l.id) : [];
    const read = lessons.filter(l => P().lessons[l] && P().lessons[l].read).length;
    const opened = Object.keys(P().lessons).some(k => k.startsWith(id + '.'));
    const quiz = P().quiz[id] || [];
    const best = quiz.reduce((m, r) => Math.max(m, r.score / r.total), 0);
    const solved = T ? T.exercises.filter(e => DT.exerciseSolved(e.id)).length : Object.keys(P().ex).filter(k => k.startsWith(id + '.') && DT.exerciseSolved(k)).length;
    const mastered = best >= 0.75 && solved >= 3;
    return { lessons: lessons.length, read, opened, best, last: quiz.length ? quiz[quiz.length - 1].score / quiz[quiz.length - 1].total : null, attempts: quiz.length, solved, mastered,
      status: mastered ? 'mastered' : (lessons.length && read === lessons.length) ? 'read' : opened ? 'started' : 'notStarted' };
  };
  DT.statusLabel = s => t({ mastered: 'stMastered', read: 'stRead', started: 'stStarted', notStarted: 'stNotStarted' }[s]);
  DT.statusIcon = s => ({ mastered: 'check', read: 'book', started: 'route', notStarted: 'target' }[s]);
  function counts() {
    const lessonsRead = Object.values(P().lessons).filter(l => l.read).length;
    const checks = Object.values(P().ex).filter(a => a.length).length + Object.values(P().quiz).reduce((s, a) => s + a.length, 0);
    return { lessonsRead, checks };
  }

  /* ---------- HOME ---------- */
  DT.views.home = function (root) {
    const hero = h('section', { class: 'hero', 'aria-labelledby': 'hero-title' });
    const cv = h('canvas', { 'aria-hidden': 'true' });
    hero.appendChild(cv);
    hero.appendChild(h('div', { class: 'hero-text' },
      h('div', { class: 'small muted', text: t('appSubtitle') }),
      h('h1', { id: 'hero-title', text: t('appTitle') }),
      h('p', { text: t('courseDesc') })));
    hero.appendChild(h('div', { class: 'hero-caption', text: t('heroCaption') }));
    root.appendChild(hero);
    requestAnimationFrame(() => DT.drawHeroField(cv));

    const wrap = h('div', { class: 'view-narrow' });
    root.appendChild(wrap);
    // continue
    const last = P().last;
    const cont = h('button', { class: 'continue', onclick: () => DT.go(last ? last.route : '#/topic/t01') },
      DT.iconEl('play'),
      h('div', {}, h('div', { class: 't', text: last ? t('continueLearning') : t('startLearning') }),
        h('div', { class: 'small', text: last ? (t('lastOpened') + ': ' + tx(last.title)) : tx(DT.OUTLINE[0].title) })));
    wrap.appendChild(cont);
    // stats
    const c = counts();
    const mastered = DT.OUTLINE.filter(o => !o.extra && DT.topicStats(o).mastered).length;
    wrap.appendChild(h('div', { class: 'stat-row' },
      h('div', { class: 'stat' }, h('b', { text: String(c.lessonsRead) }), h('span', { text: t('lessonsRead') })),
      h('div', { class: 'stat s2' }, h('b', { text: String(c.checks) }), h('span', { text: t('checksDone') })),
      h('div', { class: 'stat s3' }, h('b', { text: mastered + ' / 15' }), h('span', { text: t('topicsMastered') }))));
    // course map
    wrap.appendChild(h('div', { class: 'section-title' }, h('h2', { text: t('courseMap') })));
    wrap.appendChild(h('p', { class: 'small muted', text: t('courseMapHint') }));
    wrap.appendChild(DT.courseMap());
    // review
    wrap.appendChild(h('h2', { text: t('reviewSuggested') }));
    const rev = DT.reviewTopics();
    if (!rev.length) wrap.appendChild(h('p', { class: 'muted', text: t('noReview') }));
    else { const ul = h('div'); rev.forEach(r => ul.appendChild(rowLink(r.o, h('span', { class: 'chip warn', text: '× ' + r.count }), '#/practice/' + r.o.id))); wrap.appendChild(ul); }
    // saved
    wrap.appendChild(h('h2', { text: t('saved') }));
    if (!DT.state.bookmarks.length) wrap.appendChild(h('p', { class: 'muted', text: t('noSaved') }));
    else { const ul = h('div'); DT.state.bookmarks.slice(-5).reverse().forEach(b => ul.appendChild(h('button', { class: 'row-link', onclick: () => DT.go(b.route) }, DT.iconEl('flagFill'), h('div', { class: 'body' }, h('div', { class: 'title', text: tx(b.label) })), DT.iconEl('chev', 'chev')))); wrap.appendChild(ul); }
    // quick links
    const ql = h('div', { class: 'btn-row' });
    [['#/videos', 'video', 'videoLessons'], ['#/diag', 'target', 'diagnostic'], ['#/chooser', 'compass', 'methodChooser'], ['#/formulas', 'map', 'formulaMap']].forEach(([r, ic, k]) => ql.appendChild(h('a', { class: 'btn', href: r, html: DT.icon(ic) + DT.esc(t(k)) })));
    wrap.appendChild(ql);
  };
  DT.reviewTopics = function () {
    const by = {};
    for (const id in P().mistakes) { const m = P().mistakes[id]; if (m.resolved) continue; by[m.topic] = (by[m.topic] || 0) + m.count; }
    return Object.keys(by).map(k => ({ o: DT.outline(k), count: by[k] })).filter(r => r.o).sort((a, b) => b.count - a.count).slice(0, 4);
  };
  function rowLink(o, right, route) {
    return h('button', { class: 'row-link', onclick: () => DT.go(route || '#/topic/' + o.id) },
      h('span', { class: 'num', text: String(o.num) }),
      h('div', { class: 'body' }, h('div', { class: 'title', text: tx(o.title) }), right || null),
      DT.iconEl('chev', 'chev'));
  }
  DT.rowLink = rowLink;

  /* hero: logistic direction field, drawn once (static unless motion allowed) */
  DT.drawHeroField = function (cv) {
    const W = cv.clientWidth, H = cv.clientHeight; if (!W) return;
    const dpr = window.devicePixelRatio || 1; cv.width = W * dpr; cv.height = H * dpr;
    const c = cv.getContext('2d'); c.scale(dpr, dpr);
    const xmin = 0, xmax = 8, ymin = -0.6, ymax = 1.7, f = (x, y) => y * (1 - y);
    const X = x => (x - xmin) / (xmax - xmin) * W, Y = y => H - (y - ymin) / (ymax - ymin) * H;
    c.strokeStyle = DT.css('--grid'); c.lineWidth = 1;
    const nx = Math.round(W / 28), ny = Math.round(H / 26);
    c.beginPath();
    for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
      const x = xmin + (i + .5) * (xmax - xmin) / nx, y = ymin + (j + .5) * (ymax - ymin) / ny;
      let px = W / (xmax - xmin), py = -f(x, y) * H / (ymax - ymin); const m = Math.hypot(px, py); px /= m; py /= m;
      c.moveTo(X(x) - px * 7, Y(y) - py * 7); c.lineTo(X(x) + px * 7, Y(y) + py * 7);
    }
    c.stroke();
    const cols = [DT.css('--teal'), DT.css('--ochre'), DT.css('--plum'), DT.css('--sky')];
    [0.02, 0.1, 0.3, 1.5, -0.05, 1.2].forEach((y0, k) => {
      const pts = DT.ODE.integralCurve(f, 0, y0, { xmin, xmax, ymin, ymax }, 0.02);
      c.strokeStyle = cols[k % 4]; c.lineWidth = 1.6; c.globalAlpha = .55; c.beginPath();
      pts.forEach((p, i) => i ? c.lineTo(X(p[0]), Y(p[1])) : c.moveTo(X(p[0]), Y(p[1]))); c.stroke(); c.globalAlpha = 1;
    });
  };

  /* course map: SVG graph with 4 bands */
  DT.courseMap = function () {
    const NS = 'http://www.w3.org/2000/svg';
    const pos = {
      t01: [0, 0], t02: [1, 0], t03: [2, 0], t04: [3, 0], t05: [4, 0],
      t06: [3, 1], t07: [2, 1], t08: [1, 1], t09: [0, 1], t10: [0, 2],
      t11: [4, 1], t12: [1, 2], tL: [2, 2],
      t13: [1, 3], t14: [2, 3], t15: [3, 3]
    };
    const W = 132, H = 62, gx = 24, gy = 34, ox = 10, oy = 26;
    const svgW = ox * 2 + 5 * W + 4 * gx, svgH = oy + 4 * (H + gy) - gy + 14;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + svgW + ' ' + svgH); svg.setAttribute('class', 'coursemap'); svg.setAttribute('role', 'group'); svg.setAttribute('aria-label', t('courseMap'));
    const cx = id => ox + pos[id][0] * (W + gx), cy = id => oy + pos[id][1] * (H + gy);
    const bandNames = ['bandFirst', 'bandHigher', 'bandSystems', 'bandPDE'];
    bandNames.forEach((b, i) => { const tt = document.createElementNS(NS, 'text'); tt.setAttribute('x', ox); tt.setAttribute('y', oy + i * (H + gy) - 8); tt.setAttribute('class', 'band'); tt.textContent = t(b); svg.appendChild(tt); });
    // edges
    const defs = document.createElementNS(NS, 'defs');
    defs.innerHTML = '<marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="' + DT.css('--ink-3') + '"/></marker>';
    svg.appendChild(defs);
    DT.OUTLINE.forEach(o => o.req.forEach(r => {
      const x1 = cx(r) + W / 2, y1 = cy(r) + H / 2, x2 = cx(o.id) + W / 2, y2 = cy(o.id) + H / 2;
      // clip to box edges
      const clipPt = (x, y, tx2, ty2) => { const dx = tx2 - x, dy = ty2 - y; const s = Math.min(Math.abs((W / 2 + 2) / (dx || 1e-9)), Math.abs((H / 2 + 2) / (dy || 1e-9))); return [x + dx * s, y + dy * s]; };
      const a = clipPt(x1, y1, x2, y2), b = clipPt(x2, y2, x1, y1);
      const p = document.createElementNS(NS, 'path'); p.setAttribute('d', 'M' + a[0] + ' ' + a[1] + 'L' + b[0] + ' ' + b[1]); p.setAttribute('class', 'edge'); p.setAttribute('marker-end', 'url(#arr)'); svg.appendChild(p);
    }));
    DT.OUTLINE.forEach(o => {
      const st = DT.topicStats(o);
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'node ' + (o.extra ? 'extra ' : '') + (st.mastered ? 'done' : st.opened ? 'started' : ''));
      g.setAttribute('tabindex', '0'); g.setAttribute('role', 'link');
      g.setAttribute('aria-label', (o.extra ? t('extraModule') : t('topic') + ' ' + o.num) + ': ' + tx(o.title) + '. ' + DT.statusLabel(st.status));
      g.setAttribute('transform', 'translate(' + cx(o.id) + ',' + cy(o.id) + ')');
      const rect = document.createElementNS(NS, 'rect'); rect.setAttribute('width', W); rect.setAttribute('height', H); rect.setAttribute('rx', 6); g.appendChild(rect);
      const n = document.createElementNS(NS, 'text'); n.setAttribute('x', 8); n.setAttribute('y', 17); n.setAttribute('class', 'n'); n.textContent = o.extra ? 'L' : String(o.num); g.appendChild(n);
      const stt = document.createElementNS(NS, 'text'); stt.setAttribute('x', W - 6); stt.setAttribute('y', 16); stt.setAttribute('text-anchor', 'end'); stt.setAttribute('class', 'st');
      stt.textContent = (st.mastered ? '✓ ' : st.opened ? '◐ ' : '○ ') + DT.statusLabel(st.status); g.appendChild(stt);
      // wrap title in 3 lines
      const words = tx(o.title).split(' '); const lines = ['']; words.forEach(w => { if ((lines[lines.length - 1] + ' ' + w).trim().length > 21 && lines.length < 3) lines.push(w); else lines[lines.length - 1] = (lines[lines.length - 1] + ' ' + w).trim(); });
      lines.slice(0, 3).forEach((ln, i) => { const tt = document.createElementNS(NS, 'text'); tt.setAttribute('x', 8); tt.setAttribute('y', 31 + i * 12); tt.textContent = ln.length > 24 ? ln.slice(0, 23) + '…' : ln; g.appendChild(tt); });
      const open = () => DT.go('#/topic/' + o.id);
      g.addEventListener('click', open); g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
      svg.appendChild(g);
    });
    return h('div', { class: 'coursemap-wrap' }, svg);
  };

  /* ---------- LESSONS LIST ---------- */
  DT.views.lessons = function (root) {
    const wrap = h('div', { class: 'view-narrow' });
    root.appendChild(wrap);
    wrap.appendChild(h('h1', { text: t('navLessons') }));
    const bands = [[0, 'bandFirst'], [1, 'bandHigher'], [2, 'bandSystems'], [3, 'bandPDE']];
    bands.forEach(([b, name]) => {
      wrap.appendChild(h('h2', { text: t(name) }));
      DT.OUTLINE.filter(o => o.band === b).forEach(o => {
        const st = DT.topicStats(o);
        const chip = h('span', { class: 'chip' + (st.mastered ? ' ok' : ''), html: DT.icon(DT.statusIcon(st.status)) + DT.esc(DT.statusLabel(st.status)) });
        const meta = h('div', { class: 'status-row' }, chip, o.extra ? h('span', { class: 'chip info', text: t('extraModule') }) : h('span', { class: 'chip', text: o.syl }));
        wrap.appendChild(rowLink(o, meta));
      });
    });
    wrap.appendChild(h('div', { class: 'btn-row' },
      h('a', { class: 'btn', href: '#/geometry', html: DT.icon('field') + DT.esc(t('geometry')) }),
      h('a', { class: 'btn', href: '#/videos', html: DT.icon('video') + DT.esc(t('videoLessons')) })));
  };

  /* ---------- TOPIC ---------- */
  function draftBadge(T) {
    const lang = DT.lang();
    if (!T.textStatus || T.textStatus[lang] === 'reviewed') return null;
    return h('div', { class: 'badge-draft', role: 'note', html: DT.icon('alert') + DT.esc(lang === 'uz' ? t('draftOriginal') : t('draftTranslation')) });
  }
  DT.draftBadge = draftBadge;
  DT.views.topic = function (root, id, tab) {
    return DT.loadTopic(id).then(T => {
      const o = DT.outline(id);
      tab = tab || 'theory';
      const wrap = h('div', { class: 'view-narrow' });
      root.appendChild(wrap);
      wrap.appendChild(h('div', { class: 'lesson-head' },
        h('div', { class: 'kicker', text: o.extra ? t('extraModule') : t('topic') + ' ' + o.num + ' · ' + o.syl }),
        h('h1', { text: tx(T.title) })));
      const db = draftBadge(T); if (db) wrap.appendChild(db);
      if (o.extra) wrap.appendChild(h('div', { class: 'blk note', html: DT.md(DT.UI.extraModuleNote) }));
      const tabs = [['theory', 'tabTheory'], ['examples', 'tabExamples'], ['practice', 'tabPractice'], ['quiz', 'tabQuiz'], ['more', 'tabMore']];
      const tl = h('div', { class: 'tabs', role: 'tablist' });
      tabs.forEach(([k, lbl]) => tl.appendChild(h('button', { role: 'tab', 'aria-selected': String(k === tab), onclick: () => DT.go('#/topic/' + id + '/' + k, true) }, t(lbl))));
      wrap.appendChild(tl);
      const body = h('div', { role: 'tabpanel' });
      wrap.appendChild(body);
      if (tab === 'theory') {
        const st = DT.topicStats(o);
        body.appendChild(h('h2', { text: t('outcomes') }));
        body.appendChild(h('ul', { class: 'prose', html: T.outcomes.map(x => '<li>' + DT.inline(tx(x)) + '</li>').join('') }));
        body.appendChild(h('h2', { text: t('prereqs') }));
        body.appendChild(h('ul', { class: 'prose', html: T.prereqKnowledge.map(x => '<li>' + DT.inline(tx(x)) + '</li>').join('') }));
        body.appendChild(h('h2', { text: t('contents') }));
        T.lessons.forEach((L, i) => {
          const done = P().lessons[L.id] && P().lessons[L.id].read;
          body.appendChild(h('button', { class: 'row-link', onclick: () => DT.go('#/lesson/' + id + '/' + (i + 1)) },
            h('span', { class: 'num', text: o.num + '.' + (i + 1) }),
            h('div', { class: 'body' }, h('div', { class: 'title', text: tx(L.title) }), done ? h('span', { class: 'chip ok', html: DT.icon('check') + DT.esc(t('stRead')) }) : null),
            DT.iconEl('chev', 'chev')));
        });
        body.appendChild(h('div', { class: 'btn-row' },
          h('a', { class: 'btn primary', href: '#/lesson/' + id + '/1', html: DT.icon('book') + DT.esc(st.read ? t('continueLearning') : t('startLearning')) }),
          T.labs && T.labs.length ? h('a', { class: 'btn', href: '#/lab/' + T.labs[0], html: DT.icon('flask') + DT.esc(t('openLab')) }) : null,
          h('a', { class: 'btn', href: '#/video/' + id, html: DT.icon('video') + DT.esc(t('watchVideo')) })));
      } else if (tab === 'examples') {
        let n = 0;
        T.lessons.forEach(L => L.blocks.filter(b => b.type === 'example').forEach(b => { n++; body.appendChild(DT.renderBlock(b, T, n)); }));
      } else if (tab === 'practice') {
        DT.renderPracticeList(T, body);
      } else if (tab === 'quiz') {
        const mode = DT._quizMode || 'learn';
        const seg = h('div', { class: 'seg', role: 'group', 'aria-label': t('tabQuiz') });
        [['learn', 'modeLearn'], ['exam', 'modeExam']].forEach(([m, k]) => seg.appendChild(h('button', { 'aria-pressed': String(m === mode), onclick: () => { DT._quizMode = m; DT.go('#/topic/' + id + '/quiz', true); } }, t(k))));
        body.appendChild(h('div', { class: 'btn-row' }, seg));
        const qhost = h('div'); body.appendChild(qhost);
        DT.renderQuiz(T, qhost, mode);
      } else if (tab === 'more') {
        body.appendChild(h('h2', { text: t('commonMistakes') }));
        T.mistakes.forEach(m => body.appendChild(h('div', { class: 'blk warn', html: '<div class="blk-label">' + DT.icon('alert') + DT.esc(t('warnLabel')) + '</div>' + DT.md(m) })));
        body.appendChild(h('h2', { text: t('syllabusRef') }));
        body.appendChild(h('dl', { class: 'kv' },
          h('dt', { text: t('lesson') }), h('dd', { text: o.syl }),
          h('dt', { text: 'TN' }), h('dd', { text: (T.syllabus && T.syllabus.outcomes || []).join(', ') || '—' }),
          h('dt', { text: t('independent') }), h('dd', { text: (T.syllabus && T.syllabus.independent || []).map(n => '№' + n).join(', ') || '—' })));
        body.appendChild(h('h2', { text: t('topicSources') }));
        body.appendChild(DT.sourceList(T.sources));
      }
      DT.setLast('#/topic/' + id, T.title);
    });
  };
  DT.sourceList = function (list) {
    const ul = h('ul', { class: 'list-plain' });
    list.forEach(s => {
      const src = DT.SOURCES[s.id]; if (!src) return;
      ul.appendChild(h('li', { class: 'gl-item' },
        h('div', { text: src.cite }),
        h('div', { class: 'status-row' },
          h('span', { class: 'chip', text: s.ref }),
          s.verified ? h('span', { class: 'chip ok', html: DT.icon('check') + DT.esc(t('verified')) }) : h('span', { class: 'chip warn', html: DT.icon('alert') + DT.esc(t('unverified')) }))));
    });
    return ul;
  };
  DT.setLast = function (route, title) { P().last = { route, title, ts: Date.now() }; DT.save(); };

  /* ---------- content blocks ---------- */
  const BLK = { def: ['def', 'defLabel'], thm: ['thm', 'thmLabel'], example: ['example', 'exampleLabel'], proof: ['proof', 'proofLabel'], warn: ['alert', 'warnLabel'], lab: ['flask', 'labLabel'], intro: ['lightbulb', 'introLabel'], note: ['info', 'noteLabel'], formula: ['def', 'formulaLabel'] };
  DT.renderBlock = function (b, T, exNum, anchor) {
    if (b.type === 'text') return h('div', { class: 'prose', 'data-anchor': anchor, html: DT.md(b.body) });
    const [ic, lbl] = BLK[b.type] || BLK.note;
    const el = h('section', { class: 'blk ' + b.type, 'data-anchor': anchor });
    el.appendChild(h('div', { class: 'blk-label', html: DT.icon(ic) + DT.esc(t(lbl)) + (b.type === 'example' && exNum ? ' ' + exNum : '') }));
    if (b.title) el.appendChild(h('h3', { class: 'blk-title', text: tx(b.title) }));
    if (b.conds) el.appendChild(h('div', { class: 'conds prose', html: '<strong>' + DT.esc(t('conditions')) + '.</strong>' + DT.md(b.conds) }));
    if (b.body) el.appendChild(h('div', { class: 'prose', html: (b.conds ? '<strong>' + DT.esc(t('conclusion')) + '.</strong>' : '') + DT.md(b.body) }));
    if (b.steps) {
      const ol = h('ol', { class: 'steps' });
      b.steps.forEach((s, i) => ol.appendChild(h('li', { class: i > 0 ? 'hidden-step' : '', html: DT.md(s) })));
      el.appendChild(ol);
      const chk = b.check ? h('div', { class: 'check-line', hidden: true, html: '<b>' + DT.esc(t('verification')) + ':</b> ' + DT.inline(tx(b.check)) }) : null;
      if (chk) el.appendChild(chk);
      const nextBtn = h('button', { class: 'btn small', html: DT.icon('chev') + DT.esc(t('showNextStep')) });
      const allBtn = h('button', { class: 'btn small ghost', text: t('showAllSteps') });
      const update = () => { const hidden = DT.$$('.hidden-step', ol); if (!hidden.length) { nextBtn.hidden = true; allBtn.hidden = true; if (chk) chk.hidden = false; } };
      nextBtn.onclick = () => { const n = DT.$('.hidden-step', ol); if (n) n.classList.remove('hidden-step'); update(); };
      allBtn.onclick = () => { DT.$$('.hidden-step', ol).forEach(x => x.classList.remove('hidden-step')); update(); };
      el.appendChild(h('div', { class: 'blk-actions' }, nextBtn, allBtn,
        h('button', { class: 'btn small ghost', html: DT.icon('ai') + DT.esc(t('askAI')), onclick: () => DT.openAI({ topicId: T.id, block: b, mode: 'explain' }) })));
      if (b.steps.length === 1) update();
    }
    if (b.type === 'lab' && b.lab) el.appendChild(h('div', { class: 'blk-actions' }, h('a', { class: 'btn small', href: '#/lab/' + b.lab, html: DT.icon('flask') + DT.esc(t('openLab')) })));
    if (b.type === 'def' || b.type === 'thm') el.appendChild(h('div', { class: 'blk-actions' }, h('button', { class: 'btn small ghost', html: DT.icon('ai') + DT.esc(t('askAI')), onclick: () => DT.openAI({ topicId: T.id, block: b, mode: 'explain' }) })));
    return el;
  };

  /* ---------- LESSON ---------- */
  DT.views.lesson = function (root, id, n) {
    return DT.loadTopic(id).then(T => {
      const o = DT.outline(id);
      const idx = Math.max(0, Math.min(T.lessons.length - 1, (+n || 1) - 1));
      const L = T.lessons[idx];
      P().lessons[L.id] = P().lessons[L.id] || {};
      P().lessons[L.id].opened = Date.now();
      DT.setLast('#/lesson/' + id + '/' + (idx + 1), { uz: o.num + '.' + (idx + 1) + ' ' + L.title.uz, ru: o.num + '.' + (idx + 1) + ' ' + L.title.ru, en: o.num + '.' + (idx + 1) + ' ' + L.title.en });
      const layout = h('div', { class: 'lesson-layout' });
      const main = h('article', { class: 'lesson-main' });
      const aside = h('aside', { class: 'lesson-aside', 'aria-label': t('contents') });
      layout.appendChild(main); layout.appendChild(aside);
      root.appendChild(layout);
      main.appendChild(h('div', { class: 'lesson-head' },
        h('div', { class: 'kicker', text: (o.extra ? t('extraModule') : t('topic') + ' ' + o.num) + ' · ' + t('lesson') + ' ' + (idx + 1) + '/' + T.lessons.length }),
        h('h1', { text: tx(L.title) })));
      const db = draftBadge(T); if (db) main.appendChild(db);
      // toolbar
      const isBm = () => DT.state.bookmarks.some(b => b.route === DT.currentRoute());
      const bmBtn = h('button', { class: 'btn small ghost', 'aria-pressed': String(isBm()), html: DT.icon(isBm() ? 'flagFill' : 'flag') + DT.esc(t('bookmark')), onclick: () => {
        const r = DT.currentRoute();
        if (isBm()) { DT.state.bookmarks = DT.state.bookmarks.filter(b => b.route !== r); DT.toast(t('unbookmarked')); }
        else { DT.state.bookmarks.push({ route: r, ts: Date.now(), label: { uz: o.num + '.' + (idx + 1) + ' ' + L.title.uz, ru: o.num + '.' + (idx + 1) + ' ' + L.title.ru, en: o.num + '.' + (idx + 1) + ' ' + L.title.en } }); DT.toast(t('bookmarked')); }
        DT.save(); bmBtn.setAttribute('aria-pressed', String(isBm())); bmBtn.innerHTML = DT.icon(isBm() ? 'flagFill' : 'flag') + DT.esc(t('bookmark'));
      } });
      main.appendChild(h('div', { class: 'btn-row' }, bmBtn,
        h('button', { class: 'btn small ghost', html: DT.icon('note') + DT.esc(t('addNote')), onclick: () => DT.noteEditor(L.id, L.title) }),
        h('button', { class: 'btn small ghost', html: DT.icon('ai') + DT.esc(t('askAI')), onclick: () => DT.openAI({ topicId: id, lesson: L, mode: 'explain' }) }),
        h('a', { class: 'btn small ghost', href: '#/video/' + id, html: DT.icon('video') + DT.esc(t('videoLessons')) })));
      let exN = 0;
      T.lessons.slice(0, idx).forEach(l => l.blocks.forEach(b => { if (b.type === 'example') exN++; }));
      L.blocks.forEach((b, bi) => main.appendChild(DT.renderBlock(b, T, b.type === 'example' ? ++exN : null, L.id + '#' + bi)));
      // mark read (only after reaching the end)
      const sentinel = h('div', { 'aria-hidden': 'true', style: { height: '1px' } });
      main.appendChild(sentinel);
      const already = P().lessons[L.id].read;
      const readBtn = h('button', { class: 'btn ' + (already ? '' : 'primary'), disabled: !already, html: DT.icon('check') + DT.esc(already ? t('markedRead') : t('markRead')) });
      const readHint = h('p', { class: 'small muted', text: already ? t('markReadHint') : t('scrollToEnd') });
      readBtn.onclick = () => { P().lessons[L.id].read = Date.now(); DT.saveNow(); readBtn.innerHTML = DT.icon('check') + DT.esc(t('markedRead')); readBtn.classList.remove('primary'); readBtn.disabled = true; readHint.textContent = t('markReadHint'); DT.toast(t('markedRead')); };
      main.appendChild(h('div', { class: 'panel' }, readBtn, readHint));
      if (!already) {
        const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { readBtn.disabled = false; readHint.textContent = t('markReadHint'); io.disconnect(); } });
        io.observe(sentinel);
        DT._cleanup.push(() => io.disconnect());
      }
      // prev / next
      const nav = h('div', { class: 'btn-row', style: { justifyContent: 'space-between' } });
      nav.appendChild(idx > 0 ? h('a', { class: 'btn', href: '#/lesson/' + id + '/' + idx, html: DT.icon('back') + DT.esc(t('prevLesson')) }) : h('a', { class: 'btn', href: '#/topic/' + id, html: DT.icon('back') + DT.esc(t('contents')) }));
      nav.appendChild(idx < T.lessons.length - 1 ? h('a', { class: 'btn primary', href: '#/lesson/' + id + '/' + (idx + 2), html: DT.esc(t('nextLesson')) + DT.icon('chev') })
        : h('a', { class: 'btn primary', href: '#/topic/' + id + '/practice', html: DT.esc(t('tabPractice')) + DT.icon('chev') }));
      main.appendChild(nav);
      // aside contents
      aside.appendChild(h('h2', { class: 'small muted', text: tx(T.title) }));
      T.lessons.forEach((l, i) => aside.appendChild(h('a', { class: 'row-link', href: '#/lesson/' + id + '/' + (i + 1), 'aria-current': i === idx ? 'page' : null, style: i === idx ? { fontWeight: 700 } : null }, h('span', { class: 'num', text: o.num + '.' + (i + 1) }), h('div', { class: 'body', text: tx(l.title) }))));
      aside.appendChild(h('div', { class: 'btn-row' }, h('a', { class: 'btn small', href: '#/topic/' + id + '/practice', text: t('tabPractice') }), h('a', { class: 'btn small', href: '#/topic/' + id + '/quiz', text: t('tabQuiz') })));
    });
  };

  /* ---------- PRACTICE ---------- */
  DT.renderPracticeList = function (T, host) {
    const mode = DT._exMode || 'learn';
    const seg = h('div', { class: 'seg', role: 'group' });
    [['learn', 'modeLearn'], ['exam', 'modeExam']].forEach(([m, k]) => seg.appendChild(h('button', { 'aria-pressed': String(m === mode), onclick: () => { DT._exMode = m; DT.render(); } }, t(k))));
    host.appendChild(h('div', { class: 'btn-row' }, seg));
    host.appendChild(h('p', { class: 'small muted', text: mode === 'exam' ? t('modeExamHint') : t('modeLearnHint') }));
    const order = { easy: 0, mid: 1, hard: 2 };
    const list = T.exercises.slice().sort((a, b) => order[a.level] - order[b.level]);
    const rendered = list.map((ex, i) => DT.renderExercise(ex, { mode, topicId: T.id, index: i + 1 }));
    rendered.forEach(e => host.appendChild(e));
    if (mode === 'exam') {
      const btn = h('button', { class: 'btn primary', html: DT.icon('check') + DT.esc(t('finishQuiz')), onclick: () => {
        rendered.forEach(el => {
          const r = el.dataset.result; const ex = el._ex;
          const kind = r === 'ok' ? 'ok' : r === 'bad' ? 'bad' : 'unk';
          el.appendChild(h('div', { class: 'feedback ' + kind, html: '<div class="fb-title">' + DT.esc(r === 'ok' ? t('correct') : r === 'bad' ? t('incorrect') : (r ? t('cannotVerify') : '—')) + '</div>' + DT.md(ex.solution || ex.explain || '') }));
          if (el._reveal) el._reveal();
        });
        btn.remove();
      } });
      host.appendChild(btn);
    }
  };
  DT.views.practice = function (root, id) {
    const wrap = h('div', { class: 'view-narrow' }); root.appendChild(wrap);
    if (id) {
      return DT.loadTopic(id).then(T => {
        wrap.appendChild(h('div', { class: 'lesson-head' }, h('div', { class: 'kicker', text: t('navPractice') }), h('h1', { text: tx(T.title) })));
        const db = draftBadge(T); if (db) wrap.appendChild(db);
        DT.renderPracticeList(T, wrap);
      });
    }
    wrap.appendChild(h('h1', { text: t('navPractice') }));
    wrap.appendChild(h('p', { text: t('practiceIntro') }));
    wrap.appendChild(h('p', { class: 'small muted', text: t('officialNote') }));
    const mis = Object.keys(P().mistakes).filter(k => !P().mistakes[k].resolved);
    wrap.appendChild(h('button', { class: 'continue', onclick: () => DT.go('#/review') }, DT.iconEl('reset'), h('div', {}, h('div', { class: 't', text: t('mixedReview') + (mis.length ? ' (' + mis.length + ')' : '') }), h('div', { class: 'small', text: t('mixedReviewHint') }))));
    DT.OUTLINE.forEach(o => {
      const st = DT.topicStats(o);
      wrap.appendChild(rowLink(o, h('div', { class: 'status-row' },
        h('span', { class: 'chip', text: t('exercisesSolved') + ': ' + st.solved }),
        st.attempts ? h('span', { class: 'chip' + (st.best >= .75 ? ' ok' : ''), text: t('bestScore') + ': ' + Math.round(st.best * 100) + '%' }) : null), '#/practice/' + o.id));
    });
  };
  DT.views.review = function (root) {
    const wrap = h('div', { class: 'view-narrow' }); root.appendChild(wrap);
    wrap.appendChild(h('h1', { text: t('mixedReview') }));
    const ids = Object.keys(P().mistakes).filter(k => !P().mistakes[k].resolved);
    if (!ids.length) { wrap.appendChild(h('p', { class: 'muted', text: t('noMistakes') })); return; }
    const topics = [...new Set(ids.map(i => P().mistakes[i].topic))];
    return Promise.all(topics.map(id => DT.loadTopic(id).catch(() => null))).then(() => {
      ids.forEach(iid => {
        const T = DT.TOPICS[P().mistakes[iid].topic]; if (!T) return;
        const item = T.exercises.find(e => e.id === iid) || (T.quiz.find(q => q.id === iid) && Object.assign({ type: 'mcq' }, T.quiz.find(q => q.id === iid)));
        if (item) { wrap.appendChild(h('p', { class: 'small muted', text: tx(T.title) })); wrap.appendChild(DT.renderExercise(item, { mode: 'learn', topicId: T.id })); }
      });
    });
  };

  /* ---------- RESULTS ---------- */
  DT.views.results = function (root) {
    const wrap = h('div', { class: 'view-narrow' }); root.appendChild(wrap);
    wrap.appendChild(h('h1', { text: t('resultsTitle') }));
    const c = counts();
    const mastered = DT.OUTLINE.filter(o => !o.extra && DT.topicStats(o).mastered).length;
    wrap.appendChild(h('div', { class: 'stat-row' },
      h('div', { class: 'stat' }, h('b', { text: String(c.lessonsRead) }), h('span', { text: t('lessonsRead') })),
      h('div', { class: 'stat s2' }, h('b', { text: String(c.checks) }), h('span', { text: t('checksDone') })),
      h('div', { class: 'stat s3' }, h('b', { text: mastered + ' / 15' }), h('span', { text: t('topicsMastered') }))));
    wrap.appendChild(h('details', { class: 'panel' }, h('summary', { text: t('masteryRule') }), h('p', { text: t('masteryRuleBody') }), h('p', { class: 'small muted', text: t('officialNote') })));
    return DT.loadAllTopics().then(() => {
      const tbl = h('table', { class: 'data' });
      tbl.appendChild(h('thead', {}, h('tr', {}, h('th', { text: t('topic') }), h('th', { text: t('stRead') }), h('th', { text: t('exercisesSolved') }), h('th', { text: t('bestScore') }), h('th', { text: t('lastScore') }), h('th', { text: t('attempts') }))));
      const tb = h('tbody'); tbl.appendChild(tb);
      DT.OUTLINE.forEach(o => {
        const s = DT.topicStats(o);
        tb.appendChild(h('tr', {},
          h('td', {}, h('a', { href: '#/topic/' + o.id, text: (o.extra ? 'L' : o.num) + '. ' + tx(o.title) }), s.mastered ? h('span', { class: 'chip ok', style: { marginLeft: '6px' }, html: DT.icon('check') + DT.esc(t('stMastered')) }) : null),
          h('td', { text: s.read + '/' + s.lessons }),
          h('td', { text: String(s.solved) }),
          h('td', { text: s.attempts ? Math.round(s.best * 100) + '%' : '—' }),
          h('td', { text: s.last != null ? Math.round(s.last * 100) + '%' : '—' }),
          h('td', { text: String(s.attempts) })));
      });
      wrap.appendChild(h('div', { class: 'table-scroll' }, tbl));
      // history
      wrap.appendChild(h('h2', { text: t('history') }));
      const hist = [];
      for (const tid in P().quiz) P().quiz[tid].forEach(r => hist.push({ ts: r.ts, text: (DT.outline(tid) ? tx(DT.outline(tid).title) : tid) + ' — ' + t('tabQuiz') + ' (' + t(r.mode === 'exam' ? 'modeExam' : 'modeLearn') + '): ' + r.score + '/' + r.total }));
      for (const eid in P().ex) P().ex[eid].forEach(a => hist.push({ ts: a.ts, text: eid + ' — ' + (a.result === 'ok' ? t('correct') : a.result === 'bad' ? t('incorrect') : t('cannotVerify')) }));
      hist.sort((a, b) => b.ts - a.ts);
      if (!hist.length) wrap.appendChild(h('p', { class: 'muted', text: t('noHistory') }));
      else { const ul = h('ul', { class: 'list-plain small' }); hist.slice(0, 60).forEach(x => ul.appendChild(h('li', { class: 'gl-item' }, h('span', { class: 'muted', text: DT.fmtDate(x.ts) + ' · ' }), x.text))); wrap.appendChild(ul); }
      // export / import
      wrap.appendChild(h('h2', { text: t('exportData') + ' / ' + t('importData') }));
      wrap.appendChild(h('div', { class: 'btn-row' },
        h('button', { class: 'btn', html: DT.icon('download') + DT.esc(t('exportData')), onclick: DT.exportProgress }),
        h('button', { class: 'btn', html: DT.icon('upload') + DT.esc(t('importData')), onclick: DT.importProgress }),
        h('button', { class: 'btn ghost', html: DT.icon('trash') + DT.esc(t('resetAll')), onclick: () => { if (DT.confirm(t('resetConfirm'))) { const s = DT.state.settings; DT.state = DT.freshState(); DT.state.settings = s; DT.saveNow(); DT.render(); } } })));
    });
  };
  DT.exportProgress = function () {
    const data = JSON.stringify({ app: 'uz.cyber.dt', exported: new Date().toISOString(), state: DT.state }, null, 1);
    const name = 'dt-natijalar-' + new Date().toISOString().slice(0, 10) + '.json';
    if (window.Android && Android.saveFile) { Android.saveFile(name, data); return; }
    const a = h('a', { href: URL.createObjectURL(new Blob([data], { type: 'application/json' })), download: name });
    document.body.appendChild(a); a.click(); a.remove(); DT.toast(t('exportDone'));
  };
  DT.applyImport = function (text) {
    try {
      const obj = JSON.parse(text);
      let s = obj && obj.state ? obj.state : obj;
      if (!s || typeof s.schema !== 'number' || !s.progress) throw new Error('format');
      s = DT.deepFill(DT.migrate(s), DT.freshState());
      if (!DT.confirm(t('importConfirm'))) return;
      DT.state = s; DT.saveNow(); DT.applySettings(); DT.toast(t('importDone')); DT.render();
    } catch (e) { DT.toast(t('importBad')); }
  };
  DT.importProgress = function () {
    if (window.Android && Android.openFile) { Android.openFile('import'); return; }
    const inp = h('input', { type: 'file', accept: 'application/json,.json' });
    inp.onchange = () => { const f = inp.files[0]; if (!f) return; f.text().then(DT.applyImport); };
    inp.click();
  };
  /* called by the native layer after a file was picked */
  DT.onNativeFile = function (purpose, text) { if (purpose === 'import') DT.applyImport(text); else if (DT._nativeFileCb) DT._nativeFileCb(purpose, text); };
  DT.onNativeSaved = function (ok) { DT.toast(ok ? t('exportDone') : t('aiError')); };

  /* ---------- LABS LIST ---------- */
  DT.views.labs = function (root) {
    const wrap = h('div', { class: 'view-narrow' }); root.appendChild(wrap);
    wrap.appendChild(h('h1', { text: t('navLab') }));
    wrap.appendChild(h('p', { text: t('labsIntro') }));
    DT.LABS.forEach((lab, i) => {
      const thumb = h('canvas', { width: 128, height: 128, 'aria-hidden': 'true' });
      wrap.appendChild(h('button', { class: 'lab-card', onclick: () => DT.go('#/lab/' + lab.id) }, thumb,
        h('div', {}, h('div', { class: 'title', text: (i + 1) + '. ' + tx(lab.title) }), h('div', { class: 'small muted', html: DT.inline(tx(lab.goal)) }), lab.topics ? h('div', { class: 'status-row' }, lab.topics.map(tp => h('span', { class: 'chip', text: tp === 'tL' ? ({ uz: 'Laplas moduli', ru: 'Модуль Лапласа', en: 'Laplace module' })[DT.lang()] : t('topic') + ' ' + (DT.outline(tp) ? DT.outline(tp).num : tp) }))) : null)));
      if (lab.thumb) requestAnimationFrame(() => lab.thumb(thumb));
    });
  };
})();
