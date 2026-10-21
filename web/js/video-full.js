/* Build full-length lesson videos directly from the same lesson blocks used by the app.
   Browser: replaces the old short video scripts with generated full lesson parts.
   Node: exposes DT.makeFullVideo(topic) for tools/video/dump.js. */
(function (root) {
  const DT = root.DT;
  if (!DT) return;
  const LANGS = ['uz', 'ru', 'en'];
  const TYPE_LABEL = {
    text: DT.L('Izoh', 'Пояснение', 'Explanation'),
    intro: DT.L('Kirish', 'Введение', 'Introduction'),
    def: DT.L('Ta’rif', 'Определение', 'Definition'),
    thm: DT.L('Teorema', 'Теорема', 'Theorem'),
    proof: DT.L('Isbot', 'Доказательство', 'Proof'),
    example: DT.L('Misol', 'Пример', 'Example'),
    warn: DT.L('Muhim eslatma', 'Важное замечание', 'Important note'),
    note: DT.L('Eslatma', 'Замечание', 'Note'),
    formula: DT.L('Formula', 'Формула', 'Formula'),
    lab: DT.L('Tajriba', 'Эксперимент', 'Experiment')
  };

  function pick(v, lang) {
    if (v == null) return '';
    return typeof v === 'object' && !Array.isArray(v) ? (v[lang] || v.uz || '') : String(v);
  }
  function L3(fn) { return { uz: fn('uz'), ru: fn('ru'), en: fn('en') }; }
  function cleanMd(s) {
    return String(s || '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`([^`]*)`/g, '$1')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\*\*|__|\*|_/g, ' ')
      .replace(/^\s*[-+•]\s+/gm, '')
      .replace(/^\s*\d+[.)]\s+/gm, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  function texToSpeech(s, lang) {
    const rootWord = { uz: 'ildiz', ru: 'корень', en: 'square root' }[lang];
    const fracWord = { uz: 'bo‘lingan', ru: 'делённое на', en: 'divided by' }[lang];
    let x = String(s || '');
    x = x.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (_, a, b) => a + ' ' + fracWord + ' ' + b);
    x = x.replace(/\\sqrt\{([^{}]+)\}/g, (_, a) => rootWord + ' ' + a);
    const cmd = {
      '\\cdot': ' ', '\\times': ' ', '\\pm': ' plus-minus ', '\\mp': ' minus-plus ',
      '\\le': ' <= ', '\\ge': ' >= ', '\\neq': ' != ', '\\approx': ' approx ',
      '\\to': ' to ', '\\infty': ' infinity ', '\\sin': ' sin ', '\\cos': ' cos ',
      '\\tan': ' tan ', '\\ln': ' ln ', '\\log': ' log ', '\\exp': ' exp ',
      '\\alpha': ' alpha ', '\\beta': ' beta ', '\\gamma': ' gamma ', '\\lambda': ' lambda ',
      '\\mu': ' mu ', '\\omega': ' omega ', '\\pi': ' pi '
    };
    Object.keys(cmd).forEach(k => { x = x.split(k).join(cmd[k]); });
    x = x.replace(/\\[A-Za-z]+/g, ' ')
      .replace(/[{}]/g, ' ')
      .replace(/\^/g, ' power ')
      .replace(/\\,/g, ' ')
      .replace(/\\;/g, ' ')
      .replace(/\\!/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return x;
  }
  function speech(s, lang) {
    let x = String(s || '');
    x = x.replace(/\$\$([\s\S]*?)\$\$/g, (_, m) => ' ' + texToSpeech(m, lang) + '. ');
    x = x.replace(/\$([^$]+)\$/g, (_, m) => ' ' + texToSpeech(m, lang) + ' ');
    return cleanMd(x).replace(/\s+/g, ' ').trim();
  }
  function sentenceList(s) {
    const t = String(s || '').trim();
    if (!t) return [];
    return t.match(/[^.!?…]+[.!?…]*\s*/g)?.map(x => x.trim()).filter(Boolean) || [t];
  }
  function chunkToN(s, n) {
    const text = String(s || '').trim();
    if (!text) return Array(n).fill('');
    let units = sentenceList(text);
    if (units.length < n) {
      const words = text.split(/\s+/);
      units = [];
      const per = Math.max(1, Math.ceil(words.length / n));
      for (let i = 0; i < words.length; i += per) units.push(words.slice(i, i + per).join(' '));
    }
    const out = Array.from({ length: n }, () => '');
    const total = units.reduce((a, u) => a + u.length, 0) || 1;
    let idx = 0, used = 0;
    units.forEach((u, k) => {
      const remainUnits = units.length - k, remainSlots = n - idx;
      if (idx < n - 1 && out[idx] && (used + u.length > total * (idx + 1) / n) && remainUnits >= remainSlots) idx++;
      out[idx] = (out[idx] + ' ' + u).trim();
      used += u.length;
    });
    return out;
  }
  function explodeLocalized(v, maxChars) {
    maxChars = maxChars || 420;
    const raw = {};
    let n = 1;
    LANGS.forEach(lang => {
      raw[lang] = pick(v, lang).trim();
      n = Math.max(n, Math.ceil(raw[lang].length / maxChars));
    });
    const chunks = {};
    LANGS.forEach(lang => { chunks[lang] = chunkToN(raw[lang], n); });
    return Array.from({ length: n }, (_, i) => ({ uz: chunks.uz[i], ru: chunks.ru[i], en: chunks.en[i] }));
  }
  function addFieldSegments(out, block, field, title, label, chapter) {
    if (!block[field]) return;
    explodeLocalized(block[field]).forEach(piece => {
      if (!piece.uz && !piece.ru && !piece.en) return;
      out.push({
        chapter,
        show: { kind: 'prose', label, title, text: piece, tone: block.type || 'note' },
        say: L3(lang => speech((pick(title, lang) ? pick(title, lang) + '. ' : '') + pick(piece, lang), lang))
      });
    });
  }
  function makePart(topic, lesson, li) {
    const idBase = topic.id === 'tL' ? 'L' : topic.id.replace(/^t/, '');
    const pid = 'v' + idBase + 'f' + (li + 1);
    const label = TYPE_LABEL.intro;
    const segments = [{
      chapter: lesson.title,
      show: { kind: 'title', text: lesson.title },
      say: L3(lang => ({
        uz: 'To‘liq dars. ', ru: 'Полный урок. ', en: 'Full lesson. '
      }[lang] + speech(pick(lesson.title, lang), lang)))
    }];
    (lesson.blocks || []).forEach((b, bi) => {
      const typeLabel = TYPE_LABEL[b.type] || TYPE_LABEL.note;
      const title = b.title || typeLabel;
      const chapter = b.title || typeLabel;
      addFieldSegments(segments, b, 'conds', title, typeLabel, chapter);
      addFieldSegments(segments, b, 'body', title, typeLabel, chapter);
      (b.steps || []).forEach(step => {
        explodeLocalized(step, 360).forEach(piece => {
          segments.push({
            chapter,
            show: { kind: 'prose', label: TYPE_LABEL.example, title, text: piece, tone: b.type || 'example' },
            say: L3(lang => speech((pick(title, lang) ? pick(title, lang) + '. ' : '') + pick(piece, lang), lang))
          });
        });
      });
      if (!b.conds && !b.body && !(b.steps || []).length && b.title) {
        segments.push({
          chapter,
          show: { kind: 'prose', label: typeLabel, title, text: b.title, tone: b.type || 'note' },
          say: L3(lang => speech(pick(b.title, lang), lang))
        });
      }
    });
    return {
      id: pid,
      title: lesson.title,
      objective: lesson.title,
      segments
    };
  }

  DT.makeFullVideo = function (topic) {
    return { topic: topic.id, full: true, parts: (topic.lessons || []).map((lesson, li) => makePart(topic, lesson, li)) };
  };

  /* Browser-only slide renderer and loader override. */
  if (typeof window !== 'undefined' && DT.renderSlide) {
    const baseRenderSlide = DT.renderSlide;
    DT.renderSlide = function (show, part, lang, opts) {
      if (!show || show.kind !== 'prose') return baseRenderSlide(show, part, lang, opts);
      const h = DT.h;
      const L = v => pick(v, lang);
      const el = h('div', { class: 'slide slide-prose slide-tone-' + (show.tone || 'note') });
      const o = DT.outline && DT.outline(part.topic);
      el.appendChild(h('div', { class: 'slide-head' },
        h('span', { text: o ? (o.extra ? 'L' : String(o.num)) : '' }),
        h('span', { html: DT.inline ? DT.inline(L(part.title)) : DT.esc(L(part.title)) })));
      if (show.label) el.appendChild(h('div', { class: 'slide-kicker', text: L(show.label) }));
      if (show.title) el.appendChild(h('h3', { class: 'slide-prose-title', html: DT.inline ? DT.inline(L(show.title)) : DT.esc(L(show.title)) }));
      el.appendChild(h('div', { class: 'slide-prose-body prose', html: DT.md ? DT.md(L(show.text)) : DT.esc(L(show.text)) }));
      return el;
    };

    if (DT.loadTopic && DT.loadVideo) {
      const shortLoader = DT.loadVideo;
      DT.loadVideo = function (topicId) {
        return DT.loadTopic(topicId).then(topic => {
          const full = DT.makeFullVideo(topic);
          DT.VIDEO[topicId] = full;
          return full;
        }).catch(() => shortLoader(topicId));
      };
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);
