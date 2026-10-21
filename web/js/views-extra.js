/* Secondary sections: glossary, sources, notebook, settings, help, about, diagnostic test, method chooser,
   formula map, independent tasks, Python samples, geometric interpretation, syllabus, search.
   Large data sets live in js/data/*.js and are loaded only when a section is opened. */
(function () {
  const DT = window.DT, h = DT.h, t = DT.t, tx = DT.tx;
  const X = (uz, ru, en) => ({ uz, ru, en })[DT.lang()];
  const P = () => DT.state.progress;
  DT.VERSION = '1.0.2';
  DT.VERSION_CODE = 1;

  const DATA = { glossary: 'GLOSSARY', formulas: 'FORMULAS', diag: 'DIAG', chooser: 'CHOOSER', independent: 'INDEPENDENT', python: 'PYTHON', geometry: 'GEOMETRY', syllabus: 'SYLLABUS' };
  DT.need = function (...names) {
    return Promise.all(names.map(n => (DT[DATA[n]] && (!Array.isArray(DT[DATA[n]]) || DT[DATA[n]].length)) ? null : DT.loadScript('js/data/' + n + '.js').catch(() => null)));
  };
  const page = (root, title, intro) => {
    const w = h('div', { class: 'view-narrow' }); root.appendChild(w);
    w.appendChild(h('h1', { text: title }));
    if (intro) w.appendChild(h('p', { class: 'muted', html: DT.inline(intro) }));
    return w;
  };
  const missing = w => w.appendChild(h('div', { class: 'panel', text: t('notAvailable') }));
  const topicChip = id => { const o = DT.outline(id); if (!o) return null; return h('a', { class: 'chip', href: '#/topic/' + id, text: o.extra ? X('Laplas moduli', 'Модуль Лапласа', 'Laplace module') : t('topic') + ' ' + o.num }); };
  const searchBox = (ph, value, onInput) => {
    const inp = h('input', { class: 'input', type: 'search', placeholder: ph, 'aria-label': ph, value: value || '' });
    let tm; inp.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => onInput(inp.value.trim()), 150); });
    return inp;
  };
  const norm = s => String(s || '').toLowerCase().replace(/[‘’ʻʼ'`]/g, '').replace(/ё/g, 'е');
  function tabs(items, current, onPick) {
    const bar = h('div', { class: 'tabs', role: 'tablist' });
    items.forEach(([k, label]) => bar.appendChild(h('button', { role: 'tab', 'aria-selected': String(k === current), text: label, onclick: () => onPick(k) })));
    return bar;
  }

  /* ---------------- GLOSSARY ---------------- */
  DT.views.glossary = function (root, q) {
    const w = page(root, t('glossary'), X('Har bir atama uch tilda. Atamani bosing — u kiritilgan mavzu ochiladi.', 'Каждый термин на трёх языках. Нажмите на тему, чтобы открыть место, где термин вводится.', 'Every term in three languages. Tap the topic chip to open where the term is introduced.'));
    return DT.need('glossary').then(() => {
      const G = DT.GLOSSARY || []; if (!G.length) return missing(w);
      const list = h('div');
      const draw = s => {
        list.innerHTML = '';
        const ns = norm(s);
        const items = G.filter(g => !ns || ['uz', 'ru', 'en'].some(l => norm(g.term[l]).includes(ns)) || norm(DT.plain(tx(g.def))).includes(ns))
          .sort((a, b) => tx(a.term).localeCompare(tx(b.term), DT.lang()));
        if (!items.length) list.appendChild(h('p', { class: 'muted', text: t('notFound') }));
        items.forEach(g => list.appendChild(h('div', { class: 'gl-item', id: 'g-' + g.id, 'data-anchor': 'g-' + g.id },
          h('div', { class: 'gl-terms' }, h('strong', { text: tx(g.term) }), ' ', DT.LANGS.filter(l => l !== DT.lang()).map(l => h('span', { class: 'small muted', text: ' · ' + DT.LANG_SHORT[l] + ': ' + g.term[l] }))),
          h('div', { class: 'prose', html: DT.md(tx(g.def)) }),
          h('div', { class: 'status-row' }, g.topic ? topicChip(g.topic) : null,
            (g.see || []).map(id => { const o = G.find(x => x.id === id); return o ? h('button', { class: 'chip', text: '→ ' + tx(o.term), onclick: () => { inp.value = ''; draw(''); setTimeout(() => { const el = DT.$('#g-' + id); if (el) el.scrollIntoView({ block: 'start' }); }, 30); } }) : null })))));
      };
      const inp = searchBox(t('searchPlaceholder'), q && q.q, draw);
      w.appendChild(inp); w.appendChild(h('p', { class: 'small muted', text: G.length + ' ' + X('ta atama', 'терминов', 'terms') }));
      w.appendChild(list); draw(q && q.q || '');
      if (q && q.id) setTimeout(() => { const el = DT.$('#g-' + q.id); if (el) el.scrollIntoView({ block: 'start' }); }, 50);
    });
  };

  /* ---------------- SOURCES ---------------- */
  const STATUS = {
    inProject: () => h('span', { class: 'chip ok', html: DT.icon('check') + DT.esc(X('Nusxa loyihada, tekshirilgan', 'Экземпляр в проекте, сверено', 'Copy in project, checked')) }),
    notAvailable: () => h('span', { class: 'chip warn', html: DT.icon('alert') + DT.esc(X('Nusxa yo‘q, tekshirilmagan', 'Экземпляра нет, не сверено', 'No copy, not checked')) })
  };
  DT.views.sources = function (root) {
    const w = page(root, t('sources'));
    w.appendChild(h('div', { class: 'blk warn' }, h('div', { class: 'prose', html: DT.md(X(
      'Dasturdagi to‘rtta **asosiy** kitob (Boyce–DiPrima–Meade, N. Euler, A. A’zam, V. V. Stepanov) ilovani tayyorlashda **mavjud bo‘lmagan**. Shuning uchun ularga havolalar faqat bob darajasida va «tekshirilmagan» belgisi bilan berilgan. Matnlar loyihadagi mavjud kitoblar asosida, o‘z so‘zlarimiz bilan yozilgan. Kitoblar nusxasi berilsa, havolalar tekshirilib yangilanadi. Sahifa raqamlari ko‘rsatilmaydi.',
      'Четыре **основные** книги программы (Boyce–DiPrima–Meade, N. Euler, A. A’zam, В. В. Степанов) при подготовке приложения **не были доступны**. Ссылки на них даны только на уровне глав и с пометкой «не сверено». Тексты написаны своими словами по книгам, имеющимся в проекте. Если будут предоставлены экземпляры, ссылки будут сверены и обновлены. Номера страниц не указываются.',
      'The four **main** syllabus books (Boyce–DiPrima–Meade, N. Euler, A. A’zam, V. V. Stepanov) were **not available** while the app was prepared. References to them are chapter-level only and marked “not checked”. The text is written in our own words from the books that are in the project. If copies are provided, the references will be checked and updated. Page numbers are not given.')) })));
    const S = DT.SOURCES;
    const group = (title, filter) => {
      const ids = Object.keys(S).filter(k => filter(S[k])); if (!ids.length) return;
      w.appendChild(h('h2', { text: title }));
      ids.forEach(k => { const s = S[k]; w.appendChild(h('div', { class: 'gl-item', id: 'src-' + k },
        h('div', { text: (s.syllabusNo ? '[' + s.syllabusNo + '] ' : '') + s.cite }),
        s.note ? h('div', { class: 'small muted', text: tx(s.note) }) : null,
        h('div', { class: 'status-row' }, (STATUS[s.status] || STATUS.notAvailable)()))); });
    };
    group(X('Dasturdagi asosiy adabiyotlar', 'Основная литература программы', 'Main syllabus literature'), s => s.role === 'main');
    group(X('Dasturdagi qo‘shimcha adabiyotlar', 'Дополнительная литература программы', 'Additional syllabus literature'), s => s.role === 'extra');
    group(X('Ilovada ishlatilgan boshqa manbalar', 'Другие источники, использованные в приложении', 'Other sources used in the app'), s => s.role !== 'main' && s.role !== 'extra');
    w.appendChild(h('h2', { text: X('Mavzu — manba — bob/paragraf — yaratilgan material', 'Тема — источник — глава/параграф — созданный материал', 'Topic — source — chapter/section — material created') }));
    const tb = h('div', { class: 'table-scroll' }, h('p', { class: 'muted', text: t('thinking') }));
    w.appendChild(tb);
    DT.shortCite = DT.shortCite || (c => { const p = c.split('. '); const out = []; for (const x of p) { out.push(x); if (x.length > 12 && !x.includes(',')) break; } return out.join('. '); });
    return DT.loadAllTopics().then(all => {
      let html = '<table class="data src-map"><thead><tr><th>' + DT.esc(t('topic')) + '</th><th>' + DT.esc(X('Manba', 'Источник', 'Source')) + '</th><th>' + DT.esc(X('Bob/§', 'Глава/§', 'Ch./§')) + '</th><th>' + DT.esc(X('Holat', 'Статус', 'Status')) + '</th><th>' + DT.esc(X('Yaratilgan material', 'Созданный материал', 'Material created')) + '</th></tr></thead><tbody>';
      all.forEach((T, i) => {
        const o = DT.OUTLINE[i];
        if (!T) { html += '<tr><td>' + o.num + '</td><td colspan="4">' + DT.esc(t('comingSoon')) + '</td></tr>'; return; }
        const nEx = T.lessons.reduce((a, l) => a + l.blocks.filter(b => b.type === 'example').length, 0);
        const made = X(`${T.lessons.length} dars, ${nEx} misol, ${T.exercises.length} mashq, ${T.quiz.length} test`, `${T.lessons.length} ур., ${nEx} прим., ${T.exercises.length} упр., ${T.quiz.length} тест.`, `${T.lessons.length} lessons, ${nEx} examples, ${T.exercises.length} exercises, ${T.quiz.length} quiz items`);
        (T.sources || []).forEach((s, j) => {
          const src = S[s.id]; const short = src ? DT.shortCite(src.cite) : s.id;
          html += '<tr>' + (j === 0 ? '<td rowspan="' + T.sources.length + '"><a href="#/topic/' + o.id + '">' + o.num + '</a></td>' : '') +
            '<td>' + DT.esc(short) + '</td><td>' + DT.esc(s.ref) + '</td><td>' + (s.verified ? '✓ ' + DT.esc(t('verified')) : '⚠ ' + DT.esc(t('unverified'))) + '</td>' +
            (j === 0 ? '<td rowspan="' + T.sources.length + '">' + DT.esc(made) + '</td>' : '') + '</tr>';
        });
      });
      tb.innerHTML = html + '</tbody></table>';
      w.appendChild(h('p', { class: 'small muted', text: X('«Tekshirilgan» — paragraf nomi loyihadagi kitob matnidan qidirib topilgan. Matn ko‘chirilmagan: tushuntirishlar, misollar va testlar ilova uchun yangidan yozilgan va sympy bilan tekshirilgan.', '«Сверено» — название параграфа найдено в тексте книги из проекта. Текст не копировался: объяснения, примеры и тесты написаны заново и проверены в sympy.', '“Checked” means the section was located in the text of a book in the project. No text was copied: explanations, examples and tests were written anew and checked with sympy.') }));
    });
  };

  /* ---------------- NOTEBOOK ---------------- */
  DT.noteEditor = function (key, title) {
    const box = h('div');
    const list = h('div');
    const drawList = () => {
      list.innerHTML = '';
      (DT.state.notes[key] || []).slice().reverse().forEach(n => list.appendChild(h('div', { class: 'gl-item' },
        h('div', { class: 'small muted', text: DT.fmtDate(n.ts) }), h('div', { text: n.text, style: { whiteSpace: 'pre-wrap' } }),
        h('button', { class: 'btn small ghost', html: DT.icon('trash') + DT.esc(t('delete')), onclick: () => { DT.state.notes[key] = DT.state.notes[key].filter(x => x !== n); if (!DT.state.notes[key].length) delete DT.state.notes[key]; DT.save(); drawList(); } }))));
    };
    const ta = h('textarea', { class: 'input', rows: 5, placeholder: t('notePlaceholder'), 'aria-label': t('notePlaceholder') });
    box.appendChild(h('p', { class: 'small muted', text: tx(title) }));
    box.appendChild(ta);
    box.appendChild(h('div', { class: 'btn-row' }, h('button', { class: 'btn primary', text: t('save'), onclick: () => {
      const v = ta.value.trim(); if (!v) return;
      (DT.state.notes[key] = DT.state.notes[key] || []).push({ ts: Date.now(), text: v, label: title, route: DT.currentRoute() });
      DT.saveNow(); ta.value = ''; drawList(); DT.toast(t('saved'));
    } })));
    box.appendChild(list); drawList();
    DT.openSheet(t('notes'), box);
    setTimeout(() => ta.focus(), 50);
  };
  DT.views.notebook = function (root, q) {
    const w = page(root, t('notebook'));
    const cur = (q && q.tab) || 'bookmarks';
    w.appendChild(tabs([['bookmarks', t('bookmarks')], ['notes', t('notes')], ['obs', t('observations')]], cur, k => DT.go('#/notebook?tab=' + k, true)));
    const body = h('div', { style: { marginTop: '12px' } }); w.appendChild(body);
    const del = (fn) => h('button', { class: 'icon-btn', 'aria-label': t('delete'), title: t('delete'), html: DT.icon('trash'), onclick: fn });
    if (cur === 'bookmarks') {
      const B = DT.state.bookmarks;
      if (!B.length) body.appendChild(h('p', { class: 'muted', text: t('noSaved') }));
      B.slice().reverse().forEach(b => body.appendChild(h('div', { class: 'row-link', style: { cursor: 'default' } },
        DT.iconEl('flagFill'), h('a', { class: 'body', href: b.route }, h('div', { class: 'title', text: tx(b.label) }), h('div', { class: 'small muted', text: DT.fmtDate(b.ts) })),
        del(() => { DT.state.bookmarks = DT.state.bookmarks.filter(x => x !== b); DT.save(); DT.render(); }))));
    } else if (cur === 'notes') {
      const keys = Object.keys(DT.state.notes);
      if (!keys.length) body.appendChild(h('p', { class: 'muted', text: t('noNotes') }));
      keys.forEach(k => DT.state.notes[k].slice().reverse().forEach(n => body.appendChild(h('div', { class: 'gl-item' },
        h('div', { class: 'status-row' }, n.route ? h('a', { href: n.route, text: tx(n.label || k) }) : h('strong', { text: tx(n.label || k) }), h('span', { class: 'small muted', text: DT.fmtDate(n.ts) })),
        h('div', { text: n.text, style: { whiteSpace: 'pre-wrap' } }),
        h('div', { class: 'btn-row' }, h('button', { class: 'btn small ghost', html: DT.icon('trash') + DT.esc(t('delete')), onclick: () => { DT.state.notes[k] = DT.state.notes[k].filter(x => x !== n); if (!DT.state.notes[k].length) delete DT.state.notes[k]; DT.save(); DT.render(); } }))))));
    } else {
      const O = DT.state.observations, keys = Object.keys(O);
      if (!keys.some(k => O[k].length)) body.appendChild(h('p', { class: 'muted', text: t('noNotes') }));
      keys.forEach(k => { const lab = DT.lab && DT.lab(k); O[k].slice().reverse().forEach(n => body.appendChild(h('div', { class: 'gl-item' },
        h('div', { class: 'status-row' }, h('a', { href: '#/lab/' + k, text: lab ? tx(lab.title) : k }), h('span', { class: 'small muted', text: DT.fmtDate(n.ts) })),
        h('div', { text: n.text, style: { whiteSpace: 'pre-wrap' } }),
        h('div', { class: 'btn-row' }, h('button', { class: 'btn small ghost', html: DT.icon('trash') + DT.esc(t('delete')), onclick: () => { O[k] = O[k].filter(x => x !== n); DT.save(); DT.render(); } }))))); });
    }
  };

  /* ---------------- SETTINGS ---------------- */
  DT.views.settings = function (root) {
    const w = page(root, t('settings'));
    const S = DT.state.settings;
    const seg = (label, key, opts, after) => {
      const row = h('div', { class: 'seg', role: 'radiogroup', 'aria-label': label });
      opts.forEach(([v, l]) => row.appendChild(h('button', { role: 'radio', 'aria-checked': String(S[key] === v), text: l, onclick: () => { S[key] = v; DT.saveNow(); DT.applySettings(); if (after) after(); DT._keepScroll = true; DT.render(); } })));
      return h('div', { class: 'field' }, h('div', { class: 'small', style: { fontWeight: 600, marginBottom: '6px' }, text: label }), row);
    };
    w.appendChild(h('h2', { text: t('language') }));
    const lr = h('div', { class: 'seg', role: 'radiogroup', 'aria-label': t('language') });
    DT.LANGS.forEach(l => lr.appendChild(h('button', { role: 'radio', 'aria-checked': String(S.lang === l), text: DT.LANG_NAMES[l], onclick: () => DT.setLang(l) })));
    w.appendChild(lr);
    w.appendChild(h('h2', { text: X('Ko‘rinish', 'Вид', 'Appearance') }));
    w.appendChild(seg(t('theme'), 'theme', [['auto', t('themeAuto')], ['light', t('themeLight')], ['dark', t('themeDark')]]));
    w.appendChild(seg(t('fontSize'), 'fs', [['md', 'A'], ['lg', 'A+'], ['xl', 'A++'], ['xxl', 'A+++']]));
    w.appendChild(seg(t('reduceMotion'), 'reduceMotion', [['auto', t('themeAuto')], ['on', t('on')], ['off', t('off')]]));
    w.appendChild(h('div', { class: 'blk note' }, h('div', { class: 'prose', html: DT.md(X('Namuna formula: $$y(x)=e^{-\\int p\\,dx}\\left(\\int q\\,e^{\\int p\\,dx}dx+C\\right)$$', 'Пример формулы: $$y(x)=e^{-\\int p\\,dx}\\left(\\int q\\,e^{\\int p\\,dx}dx+C\\right)$$', 'Sample formula: $$y(x)=e^{-\\int p\\,dx}\\left(\\int q\\,e^{\\int p\\,dx}dx+C\\right)$$')) })));

    w.appendChild(h('h2', { text: t('videoLessons') }));
    const spd = h('select', { class: 'input', 'aria-label': t('speed') });
    [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].forEach(v => spd.appendChild(h('option', { value: v, text: v + '×' })));
    spd.value = S.speed || 1; spd.onchange = () => { S.speed = +spd.value; DT.save(); };
    w.appendChild(h('div', { class: 'field' }, h('label', { text: t('speed') }), spd));
    const langSel = (key, label) => { const s = h('select', { class: 'input', 'aria-label': label }); s.appendChild(h('option', { value: 'same', text: X('Ilova tili bilan bir xil', 'Как язык приложения', 'Same as app language') })); DT.LANGS.forEach(l => s.appendChild(h('option', { value: l, text: DT.LANG_NAMES[l] }))); if (key === 'subLang') s.appendChild(h('option', { value: 'off', text: t('off') })); s.value = S[key] || 'same'; s.onchange = () => { S[key] = s.value; DT.save(); }; return h('div', { class: 'field' }, h('label', { text: label }), s); };
    w.appendChild(langSel('audioLang', t('audioLang')));
    w.appendChild(langSel('subLang', t('subtitles')));
    const urlField = (key, label, hint) => {
      const inp = h('input', { class: 'input', type: 'url', inputmode: 'url', placeholder: 'https://…', value: S[key] || '', 'aria-label': label });
      inp.onchange = () => { const v = inp.value.trim(); if (v && !/^https:\/\//i.test(v) && !/^http:\/\/(localhost|127\.0\.0\.1|10\.0\.2\.2)/i.test(v)) { DT.toast(X('Faqat https:// manzil', 'Только адрес https://', 'https:// addresses only')); inp.value = S[key] || ''; return; } S[key] = v.replace(/\/+$/, ''); DT.saveNow(); DT.toast(t('saved')); };
      return h('div', { class: 'field' }, h('label', { text: label }), inp, h('div', { class: 'small muted', text: hint }));
    };
    w.appendChild(urlField('videoUrl', t('videoServer'), t('videoServerHint')));
    w.appendChild(h('h2', { text: t('aiAssistant') }));
    w.appendChild(urlField('aiUrl', t('aiServer'), t('aiServerHint')));
    w.appendChild(h('p', { class: 'small muted', text: t('aiPrivacy') }));
    w.appendChild(h('div', { class: 'btn-row' }, h('button', { class: 'btn ghost', html: DT.icon('trash') + DT.esc(t('aiClear')), onclick: () => { DT.state.ai.history = []; DT.saveNow(); DT.toast(t('aiClear') + ' ✓'); } })));

    w.appendChild(h('h2', { text: X('Ma’lumotlar', 'Данные', 'Data') }));
    w.appendChild(h('p', { class: 'small muted', text: X('Saqlanadi (faqat shu qurilmada): oxirgi joy, o‘qilgan darslar, urinishlar, xatolar, xatcho‘plar, eslatmalar, kuzatuvlar, sozlamalar, AI tarixi. Ro‘yxatdan o‘tish talab qilinmaydi.', 'Хранится (только на этом устройстве): последнее место, прочитанные уроки, попытки, ошибки, закладки, заметки, наблюдения, настройки, история ИИ. Регистрация не требуется.', 'Stored on this device only: last place, lessons read, attempts, mistakes, bookmarks, notes, observations, settings, AI history. No registration is required.') }));
    w.appendChild(h('div', { class: 'btn-row' },
      h('button', { class: 'btn', html: DT.icon('download') + DT.esc(t('exportData')), onclick: DT.exportProgress }),
      h('button', { class: 'btn', html: DT.icon('upload') + DT.esc(t('importData')), onclick: DT.importProgress }),
      h('button', { class: 'btn ghost', html: DT.icon('trash') + DT.esc(t('resetAll')), onclick: () => { if (DT.confirm(t('resetConfirm'))) { const s = DT.state.settings; DT.state = DT.freshState(); DT.state.settings = s; DT.saveNow(); DT.render(); DT.toast(t('resetAll') + ' ✓'); } } })));
    w.appendChild(h('h2', { text: t('masteryRule') }));
    w.appendChild(h('p', { text: t('masteryRuleBody') }));
  };

  /* ---------------- HELP / ABOUT ---------------- */
  DT.views.help = function (root) {
    const w = page(root, t('help'));
    w.appendChild(h('div', { class: 'prose', html: DT.md(t('helpBody')) }));
    const faq = [
      [X('Dars «o‘qildi» qachon hisoblanadi?', 'Когда урок считается прочитанным?', 'When does a lesson count as read?'), X('Dars oxirigacha o‘qilgandan keyin «O‘qidim» tugmasi faollashadi. Sahifani ochishning o‘zi o‘zlashtirish hisoblanmaydi.', 'Кнопка «Прочитано» становится активной после прокрутки до конца урока. Просто открыть страницу недостаточно.', 'The “Mark as read” button activates after you scroll to the end. Opening a page alone does not count.')],
      [t('masteryRule'), t('masteryRuleBody')],
      [X('Javobim tekshirilmadi — bu xatomi?', 'Ответ не удалось проверить — это ошибка?', 'My answer could not be verified — is it wrong?'), t('cannotVerifyBody')],
      [X('Formulani qanday kiritaman?', 'Как вводить формулы?', 'How do I type formulas?'), t('formulaHelp')],
      [X('Video ko‘rinmayapti', 'Видео не отображается', 'The video does not show'), t('noVideoServer')],
      [X('AI yordamchi ishlamayapti', 'ИИ-помощник не работает', 'The AI assistant does not work'), t('aiNotConnected')],
      [X('Natijalarimni boshqa telefonga qanday o‘tkazaman?', 'Как перенести результаты на другой телефон?', 'How do I move my progress to another phone?'), X('Sozlamalar → «Eksport» faylni saqlaydi; yangi qurilmada «Import» orqali oching.', 'Настройки → «Экспорт» сохраняет файл; на новом устройстве откройте его через «Импорт».', 'Settings → Export saves a file; open it on the new device with Import.')]
    ];
    faq.forEach(([q, a]) => w.appendChild(h('details', { class: 'panel' }, h('summary', { text: q }), h('div', { class: 'prose', html: DT.md(a) }))));
  };
  DT.views.about = function (root) {
    const w = page(root, t('about'));
    w.appendChild(h('dl', { class: 'kv' },
      h('dt', { text: t('appTitle') }), h('dd', { text: X('Interaktiv o‘quv qo‘llanma, MAT203, 4-semestr', 'Интерактивное учебное пособие, MAT203, 4 семестр', 'Interactive study guide, MAT203, semester 4') }),
      h('dt', { text: t('owner') }), h('dd', { text: 'Rajabov Eldor Odilbekovich' }),
      h('dt', { text: t('version') }), h('dd', { text: DT.VERSION + ' (' + DT.VERSION_CODE + ')' + (window.Android && Android.buildInfo ? ' · ' + Android.buildInfo() : '') }),
      h('dt', { text: 'Android' }), h('dd', { text: X('7.0 va yuqori (API 24+)', '7.0 и выше (API 24+)', '7.0 or newer (API 24+)') }),
      h('dt', { text: X('Tarmoq', 'Сеть', 'Network') }), h('dd', { text: X('Darslar, testlar, laboratoriyalar oflayn ishlaydi. Internet faqat AI yordamchi va video yuklash uchun.', 'Уроки, тесты и лаборатории работают офлайн. Интернет нужен только для ИИ-помощника и загрузки видео.', 'Lessons, tests and labs work offline. Internet is used only for the AI assistant and video downloads.') })));
    w.appendChild(h('h2', { text: X('Holat', 'Статус', 'Status') }));
    w.appendChild(h('p', { text: X('Matnlar holati: qoralama (o‘qituvchi tekshiruvi kutilmoqda). Rus va ingliz matnlari mashina tarjimasi emas, lekin hali mutaxassis tomonidan tahrir qilinmagan. Matematik formulalar va javoblar sympy bilan tekshirilgan.', 'Статус текстов: черновик (ожидает проверки преподавателем). Русский и английский тексты не являются машинным переводом, но ещё не отредактированы специалистом. Формулы и ответы проверены в sympy.', 'Text status: draft (awaiting instructor review). Russian and English texts are not raw machine translation, but have not yet been edited by a specialist. Formulas and answers were checked with sympy.') }));
    w.appendChild(h('h2', { text: X('Litsenziyalar', 'Лицензии', 'Licenses') }));
    const lic = [['KaTeX 0.16.11', 'MIT License — © 2013–2020 Khan Academy and other contributors', 'https://github.com/KaTeX/KaTeX'], ['KaTeX fonts', 'SIL Open Font License 1.1', 'https://github.com/KaTeX/katex-fonts'], ['Microsoft neural TTS (Madina, Svetlana, Jenny) — ' + X('video ovozi, edge-tts orqali yaratilgan; ilovada dastur sifatida yo‘q', 'голос видео, создан через edge-tts; программа в приложение не входит', 'video narration, generated with edge-tts; the software is not shipped in the app'), X('Foydalanish shartlari tekshirilishi kerak (STATUS.md)', 'Условия использования нужно проверить (STATUS.md)', 'Terms of use still to be checked (STATUS.md)'), 'https://github.com/rany2/edge-tts']];
    const ul = h('ul', { class: 'list-plain' });
    lic.forEach(([n, l, u]) => ul.appendChild(h('li', { class: 'gl-item' }, h('strong', { text: n }), h('div', { class: 'small', text: l }), h('div', { class: 'small muted', text: u }))));
    w.appendChild(ul);
    w.appendChild(h('p', { class: 'small muted', text: X('Ilova kodi va o‘quv materiallari: loyiha egasiga tegishli. Kitoblardan matn ko‘chirilmagan.', 'Код приложения и учебные материалы принадлежат владельцу проекта. Текст из книг не копировался.', 'App code and study materials belong to the project owner. No text was copied from the books.') }));
  };

  /* ---------------- DIAGNOSTIC ---------------- */
  DT.views.diag = function (root) {
    const w = page(root, t('diagnostic'), t('diagIntro'));
    return DT.need('diag').then(() => {
      const D = DT.DIAG || []; if (!D.length) return missing(w);
      const prev = P().diag;
      if (prev) w.appendChild(h('p', { class: 'small muted', text: X('Oldingi natija', 'Предыдущий результат', 'Previous result') + ': ' + prev.score + '/' + prev.total + ' · ' + DT.fmtDate(prev.ts) }));
      const ans = {};
      D.forEach((q, i) => {
        const box = h('div', { class: 'ex', 'data-anchor': 'diag-' + q.id });
        box.appendChild(h('div', { class: 'ex-head' }, h('span', { class: 'small muted', text: (i + 1) + '/' + D.length + ' · ' + tx(q.area) })));
        box.appendChild(h('div', { class: 'ex-q prose', html: DT.md(tx(q.q)) }));
        const opts = h('div');
        q.options.forEach((o, k) => opts.appendChild(h('button', { class: 'opt', 'aria-pressed': 'false', html: '<span class="mark">' + 'ABCD'[k] + '</span><span>' + DT.inline(tx(o)) + '</span>', onclick: e => { ans[q.id] = k; DT.$$('.opt', opts).forEach((b, j) => b.setAttribute('aria-pressed', String(j === k))); } })));
        box.appendChild(opts); box._q = q; box._opts = opts;
        w.appendChild(box);
      });
      const res = h('div');
      w.appendChild(h('div', { class: 'btn-row' }, h('button', { class: 'btn primary', html: DT.icon('check') + DT.esc(t('check')), onclick: () => {
        let score = 0; const weak = {};
        DT.$$('.ex', w).forEach(box => {
          const q = box._q; if (!q) return; const a = ans[q.id];
          DT.$$('.opt', box._opts).forEach((b, j) => { b.classList.toggle('ok', j === q.correct); b.classList.toggle('bad', j === a && a !== q.correct); });
          let fb = DT.$('.feedback', box); if (!fb) { fb = h('div', { class: 'feedback' }); box.appendChild(fb); }
          if (a === q.correct) { score++; fb.className = 'feedback ok'; fb.innerHTML = DT.icon('check') + ' ' + DT.esc(t('correct')); }
          else { (q.topics || []).forEach(tp => weak[tp] = (weak[tp] || []).concat([tx(q.area)])); fb.className = 'feedback bad'; fb.innerHTML = DT.icon('close') + ' ' + DT.esc(a == null ? X('Javob berilmagan', 'Нет ответа', 'Not answered') : t('incorrect')) + '<div class="prose">' + DT.md(tx(q.explain)) + '</div>'; }
        });
        P().diag = { ts: Date.now(), score, total: D.length, weak: Object.keys(weak) }; DT.saveNow();
        res.innerHTML = '';
        res.appendChild(h('h2', { text: t('quizResult') + ': ' + score + '/' + D.length }));
        const ks = Object.keys(weak);
        if (!ks.length) res.appendChild(h('p', { text: t('diagAllGood') }));
        else { res.appendChild(h('h3', { text: t('diagReview') })); ks.forEach(k => { const o = DT.outline(k); if (o) res.appendChild(DT.rowLink(o, h('div', { class: 'small muted', text: Array.from(new Set(weak[k])).join(', ') }))); }); }
        res.scrollIntoView({ block: 'start' });
      } })));
      w.appendChild(res);
    });
  };

  /* ---------------- METHOD CHOOSER ---------------- */
  DT.views.chooser = function (root, q) {
    const w = page(root, t('methodChooser'));
    w.appendChild(h('div', { class: 'blk warn' }, h('div', { class: 'prose', text: t('notSolver') })));
    return DT.need('chooser').then(() => {
      const C = DT.CHOOSER; if (!C || !C.nodes) return missing(w);
      const path = (q && q.p ? q.p.split('.') : []).filter(Boolean);
      // walk the path: each element is an option index
      let node = C.nodes[C.start], crumbs = [], result = null;
      for (const step of path) {
        const opt = node && node.options[+step]; if (!opt) break;
        crumbs.push(tx(opt.label));
        if (opt.result) { result = C.results[opt.result]; break; }
        node = C.nodes[opt.next];
      }
      if (crumbs.length) {
        const ol = h('ol', { class: 'small muted', style: { paddingLeft: '20px' } }); crumbs.forEach(c => ol.appendChild(h('li', { html: DT.inline(c) }))); w.appendChild(ol);
      }
      const go = p => DT.go('#/chooser' + (p.length ? '?p=' + p.join('.') : ''));
      if (result) {
        const el = h('section', { class: 'blk thm', 'data-anchor': 'result' });
        el.appendChild(h('h2', { class: 'blk-title', html: DT.inline(tx(result.title)) }));
        el.appendChild(h('div', { class: 'prose', html: DT.md(tx(result.body)) }));
        el.appendChild(h('div', { class: 'status-row' }, (result.topics || []).map(topicChip), (result.labs || []).map(l => h('a', { class: 'chip', href: '#/lab/' + l, html: DT.icon('flask') + DT.esc(l) }))));
        w.appendChild(el);
      } else if (node) {
        const box = h('div', { class: 'ex' });
        box.appendChild(h('div', { class: 'ex-q prose', html: DT.md(tx(node.q)) }));
        if (node.hint) box.appendChild(h('div', { class: 'small muted prose', html: DT.md(tx(node.hint)) }));
        node.options.forEach((o, i) => box.appendChild(h('button', { class: 'opt', html: '<span class="mark">' + (i + 1) + '</span><span>' + DT.inline(tx(o.label)) + '</span>', onclick: () => go(path.concat([i])) })));
        w.appendChild(box);
      }
      w.appendChild(h('div', { class: 'btn-row' },
        path.length ? h('button', { class: 'btn', html: DT.icon('back') + DT.esc(t('back')), onclick: () => go(path.slice(0, -1)) }) : null,
        path.length ? h('button', { class: 'btn ghost', html: DT.icon('reset') + DT.esc(t('restart')), onclick: () => go([]) }) : null));
    });
  };

  /* ---------------- FORMULA MAP ---------------- */
  DT.views.formulas = function (root, q) {
    const w = page(root, t('formulaMap'), X('Asosiy formulalar mavzular bo‘yicha. Har bir formula yonida qachon qo‘llanishi yozilgan.', 'Основные формулы по темам. Рядом с каждой — когда её можно применять.', 'Key formulas by topic, each with when it applies.'));
    return DT.need('formulas').then(() => {
      const F = DT.FORMULAS || []; if (!F.length) return missing(w);
      const cur = q && q.t;
      const chips = h('div', { class: 'status-row', style: { marginBottom: '8px' } });
      chips.appendChild(h('button', { class: 'chip', 'aria-pressed': String(!cur), text: X('Hammasi', 'Все', 'All'), onclick: () => DT.go('#/formulas', true) }));
      DT.OUTLINE.forEach(o => { if (F.some(f => f.topic === o.id)) chips.appendChild(h('button', { class: 'chip', 'aria-pressed': String(cur === o.id), text: o.extra ? 'L' : String(o.num), 'aria-label': tx(o.title), onclick: () => DT.go('#/formulas?t=' + o.id, true) })); });
      w.appendChild(chips);
      DT.OUTLINE.forEach(o => {
        const fs = F.filter(f => f.topic === o.id && (!cur || cur === o.id)); if (!fs.length) return;
        w.appendChild(h('h2', { class: 'section-title' }, h('a', { href: '#/topic/' + o.id, text: (o.extra ? 'L' : o.num) + '. ' + tx(o.title) })));
        fs.forEach((f, i) => w.appendChild(h('section', { class: 'blk formula', 'data-anchor': o.id + '-f' + i },
          h('h3', { class: 'blk-title', html: DT.inline(tx(f.title)) }),
          h('div', { class: 'prose', html: DT.md('$$' + f.tex + '$$') }),
          h('div', { class: 'conds prose', html: '<strong>' + DT.esc(t('whenApplies')) + ':</strong> ' + DT.md(tx(f.when)) }),
          f.note ? h('div', { class: 'small prose', html: DT.icon('alert') + ' ' + DT.inline(tx(f.note)) }) : null)));
      });
    });
  };

  /* ---------------- INDEPENDENT TASKS ---------------- */
  DT.views.independent = function (root) {
    const w = page(root, t('independent'), X('Dasturdagi 18 ta mustaqil ish (har biri 5 soat, jami 90 soat). Har biri uchun ko‘rsatma, topshiriladigan natija va o‘zini tekshirish savollari.', '18 заданий самостоятельной работы по программе (по 5 часов, всего 90). Для каждого: инструкция, что сдавать и вопросы для самопроверки.', 'The 18 independent-study tasks from the syllabus (5 h each, 90 h in total), each with instructions, the expected output and self-check questions.'));
    return DT.need('independent').then(() => {
      const I = DT.INDEPENDENT || []; if (!I.length) return missing(w);
      const done = P().tasks = P().tasks || {};
      w.appendChild(h('p', { class: 'small muted', text: X('Bajarilgan', 'Выполнено', 'Done') + ': ' + Object.keys(done).filter(k => done[k]).length + '/' + I.length }));
      I.forEach(it => {
        const cb = h('input', { type: 'checkbox', id: 'task-' + it.n, checked: done[it.n] ? true : null, onchange: e => { done[it.n] = e.target.checked ? Date.now() : 0; DT.save(); } });
        const sec = (title, arr, ordered) => { if (!arr || !arr.length) return null; const l = h(ordered ? 'ol' : 'ul'); arr.forEach(s => l.appendChild(h('li', { html: DT.inline(tx(s)) }))); return [h('h4', { text: title }), l]; };
        w.appendChild(h('details', { class: 'panel', 'data-anchor': 'task-' + it.n },
          h('summary', {}, h('strong', { text: '№' + it.n + '. ' }), h('span', { html: DT.inline(tx(it.title)) }), h('span', { class: 'small muted', text: ' · ' + (it.hours || 5) + ' ' + t('hours') })),
          h('div', { class: 'prose' },
            h('p', { class: 'small muted', html: '<em>' + DT.esc(X('Dasturdagi matn', 'Текст программы', 'Syllabus text')) + ':</em> ' + DT.inline(tx(it.syllabusText)) }),
            h('p', { html: '<strong>' + DT.esc(t('goal')) + ':</strong> ' + DT.inline(tx(it.goal)) }),
            sec(t('howTo'), it.steps, true),
            h('p', { html: '<strong>' + DT.esc(t('resultForm')) + ':</strong> ' + DT.inline(tx(it.output)) }),
            sec(t('criteria'), it.criteria), sec(t('selfCheck'), it.selfcheck),
            it.note ? h('p', { class: 'small', html: DT.icon('alert') + ' ' + DT.inline(tx(it.note)) }) : null),
          h('div', { class: 'status-row' }, (it.topics || []).map(topicChip)),
          h('label', { class: 'status-row', for: 'task-' + it.n, style: { marginTop: '8px' } }, cb, h('span', { text: X('Bajarildi deb belgilash', 'Отметить как выполненное', 'Mark as done') }))));
      });
      w.appendChild(h('p', { class: 'small muted', text: t('officialNote') }));
    });
  };

  /* ---------------- PYTHON ---------------- */
  DT.views.python = function (root) {
    const w = page(root, t('python'));
    w.appendChild(h('div', { class: 'blk note' }, h('div', { class: 'prose', text: t('noRunHere') })));
    return DT.need('python').then(() => {
      const Pz = DT.PYTHON || []; if (!Pz.length) return missing(w);
      Pz.forEach((s, i) => {
        const copy = h('button', { class: 'btn small ghost', html: DT.icon('copy') + DT.esc(t('copy')), onclick: () => {
          const done = () => DT.toast(t('copied'));
          if (window.Android && Android.copyText) { Android.copyText(s.code); done(); }
          else if (navigator.clipboard) navigator.clipboard.writeText(s.code).then(done, () => {});
        } });
        w.appendChild(h('details', { class: 'panel', 'data-anchor': s.id, open: i === 0 ? true : null },
          h('summary', {}, h('strong', { text: (i + 1) + '. ' }), h('span', { html: DT.inline(tx(s.title)) })),
          h('div', { class: 'prose', html: DT.md(tx(s.about)) }),
          h('div', { class: 'btn-row' }, copy, s.topic ? topicChip(s.topic) : null),
          h('pre', { class: 'code', tabindex: '0' }, h('code', { text: s.code })),
          s.output ? [h('h4', { text: t('expectedOutput') }), h('pre', { class: 'code out', tabindex: '0' }, h('code', { text: s.output }))] : null,
          s.img ? h('figure', { class: 'plot-wrap' }, h('img', { src: s.img, alt: tx(s.imgAlt) || '', loading: 'lazy', style: { width: '100%', height: 'auto' } }), h('figcaption', { class: 'plot-caption', text: t('textDescription') + ': ' + tx(s.imgAlt) })) : null,
          s.task ? h('p', { html: '<strong>' + DT.esc(t('task')) + ':</strong> ' + DT.inline(tx(s.task)) }) : null));
      });
    });
  };

  /* ---------------- GEOMETRY ---------------- */
  function compile2(s) { const ast = DT.Expr.parse(s, ['x', 'y', 'C']); return (x, y, C) => DT.Expr.ev(ast, { x, y, C }); }
  function geoPlot(spec) {
    const p = DT.plotBox({ xmin: spec.x[0], xmax: spec.x[1], ymin: spec.y[0], ymax: spec.y[1], aspect: .8 });
    const cols = ['--curve-1', '--curve-2', '--curve-3', '--curve-4'];
    const draw = () => {
      p.clear(); p.axes();
      const box = { xmin: spec.x[0], xmax: spec.x[1], ymin: spec.y[0], ymax: spec.y[1] };
      try {
        if (spec.kind === 'field') {
          const f = compile2(spec.f); const g = (x, y) => f(x, y, 0);
          p.field(g);
          (spec.curves || []).forEach((c, i) => { p.line(DT.ODE.integralCurve(g, c[0], c[1], box), { color: DT.css(cols[i % 4]), width: 2.2 }); p.dot(c[0], c[1], { color: DT.css(cols[i % 4]), ring: true }); });
          p.caption(t('textDescription') + ': ' + "y' = " + spec.f + X(' yo‘nalish maydoni va integral chiziqlar.', ': поле направлений и интегральные кривые.', ': direction field and integral curves.'));
        } else if (spec.kind === 'vector') {
          const fx = compile2(spec.fx), fy = compile2(spec.fy); const F = (x, y) => [fx(x, y, 0), fy(x, y, 0)];
          p.field(F, { vector: true });
          (spec.traj || []).forEach((c, i) => { const tr = DT.ODE.trajectory(([x, y]) => F(x, y), c, 12, 0.02, box); p.line(tr, { color: DT.css(cols[i % 4]), width: 2 }); p.dot(c[0], c[1], { color: DT.css(cols[i % 4]), ring: true }); });
          p.caption(t('textDescription') + ": x' = " + spec.fx + ", y' = " + spec.fy + X(' vektor maydoni va trayektoriyalar.', ': векторное поле и траектории.', ': vector field and trajectories.'));
        } else if (spec.kind === 'family') {
          (spec.fns || []).forEach((s, k) => { const f = compile2(s); (spec.C || [0]).forEach((C, i) => p.fn(x => f(x, 0, C), { color: DT.css(cols[(k * 2 + (i === Math.floor(spec.C.length / 2) ? 1 : 0)) % 4]), width: k ? 2.4 : 1.6, dash: k ? [6, 4] : [] })); });
          p.caption(t('textDescription') + ': ' + spec.fns.join('; ') + ', C ∈ {' + (spec.C || []).join(', ') + '}');
        }
      } catch (e) { p.caption(t('parseError')); }
    };
    p.onResize = draw; requestAnimationFrame(draw);
    DT._cleanup.push(() => p.destroy());
    return p.el;
  }
  DT.views.geometry = function (root, q) {
    const w = page(root, t('geometry'), X('Differensial tenglamalarning geometrik ma’nosi: yo‘nalish maydoni, egri chiziqlar oilasi, o‘rama, faza tekisligi va xarakteristikalar.', 'Геометрический смысл дифференциальных уравнений: поле направлений, семейства кривых, огибающая, фазовая плоскость и характеристики.', 'The geometry of differential equations: direction fields, families of curves, envelopes, the phase plane and characteristics.'));
    return DT.need('geometry').then(() => {
      const G = DT.GEOMETRY || []; if (!G.length) return missing(w);
      const toc = h('ol', { class: 'small' }); G.forEach(s => toc.appendChild(h('li', {}, h('a', { href: '#/geometry?s=' + s.id, html: DT.inline(tx(s.title)) })))); w.appendChild(toc);
      G.forEach(s => {
        const sec = h('section', { id: 'geo-' + s.id, 'data-anchor': 'geo-' + s.id });
        sec.appendChild(h('h2', { html: DT.inline(tx(s.title)) }));
        let exN = 0;
        (s.blocks || []).forEach((b, bi) => { sec.appendChild(DT.renderBlock(b, { id: (s.topics || ['t01'])[0] }, b.type === 'example' ? ++exN : null, s.id + '#' + bi)); if (bi === 0 && s.plot) sec.appendChild(geoPlot(s.plot)); });
        if (s.plot && !(s.blocks || []).length) sec.appendChild(geoPlot(s.plot));
        sec.appendChild(h('div', { class: 'status-row' }, (s.topics || []).map(topicChip)));
        w.appendChild(sec);
      });
      if (q && q.s) setTimeout(() => { const el = DT.$('#geo-' + q.s); if (el) el.scrollIntoView({ block: 'start' }); }, 60);
    });
  };

  /* ---------------- SYLLABUS ---------------- */
  DT.views.syllabus = function (root) {
    const w = page(root, t('syllabus'));
    return DT.need('syllabus').then(() => {
      const S = DT.SYLLABUS; if (!S) return missing(w);
      w.appendChild(h('dl', { class: 'kv' },
        h('dt', { text: X('Fan', 'Дисциплина', 'Course') }), h('dd', { text: S.code + ' · ' + t('appTitle') }),
        h('dt', { text: X('Semestr / kredit', 'Семестр / кредиты', 'Semester / credits') }), h('dd', { text: S.semester + ' / ' + S.credits }),
        h('dt', { text: t('hours') }), h('dd', { text: X(`jami ${S.hours.total}: ma’ruza ${S.hours.lecture}, amaliy ${S.hours.seminar}, mustaqil ${S.hours.independent}`, `всего ${S.hours.total}: лекции ${S.hours.lecture}, практика ${S.hours.seminar}, самостоятельно ${S.hours.independent}`, `total ${S.hours.total}: lectures ${S.hours.lecture}, seminars ${S.hours.seminar}, independent ${S.hours.independent}`) }),
        h('dt', { text: X('Yo‘nalishlar', 'Направления', 'Programmes') }), h('dd', { text: (S.directions || []).map(tx).join('; ') })));
      if (S.aim) w.appendChild(h('div', { class: 'prose', html: DT.md(tx(S.aim)) }));
      if (S.outcomes) { w.appendChild(h('h2', { text: t('outcomes') })); const ul = h('ul', { class: 'prose' }); S.outcomes.forEach(o => ul.appendChild(h('li', { html: '<strong>' + o.id + '.</strong> ' + DT.inline(tx(o.text)) }))); w.appendChild(ul); }
      w.appendChild(h('h2', { text: X('Ma’ruza va amaliy mashg‘ulotlar', 'Лекции и практические занятия', 'Lectures and seminars') }));
      const tb = h('div', { class: 'table-scroll' }); let html = '<table class="data"><thead><tr><th>' + DT.esc(X('Ma’ruza', 'Лекция', 'Lecture')) + '</th><th>' + DT.esc(X('Amaliy', 'Практика', 'Seminar')) + '</th><th>' + DT.esc(t('topic')) + '</th></tr></thead><tbody>';
      (S.lectures || []).forEach((m, i) => { const s = (S.seminars || [])[i]; const o = DT.outline(m.topic); html += '<tr><td>' + m.id + '. ' + DT.inline(tx(m.title)) + '</td><td>' + (s ? s.id + '. ' + DT.inline(tx(s.title)) : '') + '</td><td>' + (o ? '<a href="#/topic/' + o.id + '">' + o.num + '</a>' : '—') + '</td></tr>'; });
      tb.innerHTML = html + '</tbody></table>'; w.appendChild(tb);
      w.appendChild(h('p', { class: 'small muted', text: t('extraModuleNote') }));
      if (S.assessment) { w.appendChild(h('h2', { text: X('Baholash (ma’lumot uchun)', 'Оценивание (для справки)', 'Assessment (for information)') })); w.appendChild(h('p', { text: t('officialNote') })); if (S.assessment.rule) w.appendChild(h('p', { class: 'small', text: tx(S.assessment.rule) })); }
      w.appendChild(h('h2', { text: t('sources') })); w.appendChild(h('a', { class: 'btn', href: '#/sources', html: DT.icon('sources') + DT.esc(t('sources')) }));
      if (S.links && S.links.length) { const ul = h('ul'); S.links.forEach(l => ul.appendChild(h('li', {}, h('span', { text: tx(l.title) + ': ' }), h('span', { class: 'small muted', style: { overflowWrap: 'anywhere' }, text: l.url })))); w.appendChild(ul); }
      if (S.issues && S.issues.length) {
        w.appendChild(h('h2', { text: X('Dastur hujjatidagi kamchiliklar', 'Замечания к документу программы', 'Issues noticed in the syllabus document') }));
        const ul = h('ul', { class: 'prose' }); S.issues.forEach(s => ul.appendChild(h('li', { html: DT.inline(tx(s)) }))); w.appendChild(ul);
      }
    });
  };

  /* ---------------- SEARCH ---------------- */
  DT.views.search = function (root, q) {
    const w = page(root, t('search'));
    const out = h('div');
    const inp = searchBox(t('searchPlaceholder'), q && q.q, s => { history.replaceState(null, '', '#/search' + (s ? '?q=' + encodeURIComponent(s) : '')); run(s); });
    w.appendChild(inp); w.appendChild(out);
    setTimeout(() => inp.focus(), 50);
    let ready = null;
    const load = () => ready || (ready = Promise.all([DT.loadAllTopics(), DT.need('glossary', 'formulas')]));
    function hit(icon, title, sub, route) { return h('a', { class: 'row-link', href: route }, DT.iconEl(icon), h('div', { class: 'body' }, h('div', { class: 'title', html: DT.inline(title) }), sub ? h('div', { class: 'small muted', text: sub }) : null), DT.iconEl('chev', 'chev')); }
    function snippet(text, ns) { const p = DT.plain(text.replace(/\$\$[\s\S]*?\$\$/g, ' … ').replace(/\$[^$]{25,}\$/g, ' … ')).replace(/\\[a-zA-Z]+/g, '').replace(/[{}]/g, '').replace(/\s+/g, ' '); const i = norm(p).indexOf(ns); if (i < 0) return ''; return (i > 30 ? '…' : '') + p.slice(Math.max(0, i - 30), i + 70) + '…'; }
    function run(s) {
      out.innerHTML = '';
      const ns = norm(s); if (ns.length < 2) { out.appendChild(h('p', { class: 'small muted', text: X('Kamida 2 ta belgi kiriting. Qidiruv joriy tilda ishlaydi.', 'Введите не меньше 2 символов. Поиск идёт на текущем языке.', 'Type at least 2 characters. Search uses the current language.') })); return; }
      out.appendChild(h('p', { class: 'muted', text: t('thinking') }));
      load().then(([topics]) => {
        out.innerHTML = ''; let n = 0;
        const add = el => { if (n++ < 60) out.appendChild(el); };
        DT.OUTLINE.forEach(o => { if (norm(tx(o.title)).includes(ns)) add(hit('book', tx(o.title), t('topic') + ' ' + o.num, '#/topic/' + o.id)); });
        topics.forEach((T, ti) => { if (!T) return; T.lessons.forEach((L, li) => {
          const inTitle = norm(tx(L.title)).includes(ns);
          const b = L.blocks.find(b => norm(DT.plain(tx(b.title || '') + ' ' + tx(b.body || ''))).includes(ns));
          if (inTitle || b) add(hit('book', DT.OUTLINE[ti].num + '.' + (li + 1) + ' ' + tx(L.title), b ? snippet(tx(b.title || '') + ' ' + tx(b.body || ''), ns) : '', '#/lesson/' + T.id + '/' + (li + 1)));
        }); });
        (DT.GLOSSARY || []).forEach(g => { if (['uz', 'ru', 'en'].some(l => norm(g.term[l]).includes(ns))) add(hit('glossary', tx(g.term), t('glossary'), '#/glossary?id=' + g.id)); });
        (DT.LABS || []).forEach(l => { if (norm(DT.plain(tx(l.title) + ' ' + tx(l.goal))).includes(ns)) add(hit('flask', tx(l.title), t('navLab'), '#/lab/' + l.id)); });
        (DT.FORMULAS || []).forEach(f => { if (norm(DT.plain(tx(f.title))).includes(ns)) add(hit('map', tx(f.title), t('formulaMap'), '#/formulas?t=' + f.topic)); });
        if (!n) out.appendChild(h('p', { class: 'muted', text: t('notFound') }));
        else out.insertBefore(h('p', { class: 'small muted', text: X('Topildi', 'Найдено', 'Found') + ': ' + n }), out.firstChild);
      });
    }
    run((q && q.q) || '');
  };

  ['videos', 'video'].forEach(k => { DT.views[k] = DT.views[k] || function (r) { r.appendChild(h('p', { text: t('comingSoon') })); }; });
})();
