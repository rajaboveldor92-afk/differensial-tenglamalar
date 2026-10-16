/* AI helper: Explain / Hint / Check my solution / Ask. Talks only to the course's own backend (Settings → AI server);
   the API key lives on that server, never in the app. Without a server the panel says so and offers the lesson's
   built-in hints — it never shows invented answers. */
(function () {
  const DT = window.DT, h = DT.h, t = DT.t, tx = DT.tx;
  const X = (uz, ru, en) => ({ uz, ru, en })[DT.lang()];
  const clip = (s, n) => (s = String(s || '')).length > n ? s.slice(0, n) + '…' : s;

  function blockText(b) {
    if (!b) return '';
    return [b.title && tx(b.title), b.conds && tx(b.conds), b.body && tx(b.body), (b.steps || []).map(s => tx(s)).join('\n'), b.check && tx(b.check)].filter(Boolean).join('\n');
  }
  function contextOf(o) {
    if (o.transcript) return (o.videoTitle ? o.videoTitle + '\n' : '') + o.transcript + (o.show ? '\n' + o.show : '');
    if (o.block) return blockText(o.block);
    if (o.lesson) return tx(o.lesson.title) + '\n' + o.lesson.blocks.map(blockText).join('\n\n');
    return '';
  }
  function exerciseOf(o) {
    const e = o.exercise || o.item; if (!e) return '';
    return [tx(e.q), e.options ? e.options.map((x, i) => 'ABCD'[i] + ') ' + tx(x)).join('\n') : ''].filter(Boolean).join('\n');
  }
  function builtinHints(o) {
    const out = [];
    const e = o.exercise || o.item;
    if (e) { (e.hints || (e.hint ? [e.hint] : [])).forEach(x => out.push(tx(x))); }
    if (o.block && o.block.steps) out.push(X('Misol qadamlarini birma-bir oching: «Keyingi qadam» tugmasi.', 'Открывайте шаги примера по одному: кнопка «Следующий шаг».', 'Reveal the example steps one at a time with “Next step”.'));
    return out;
  }

  DT.openAI = function (o) {
    o = o || {};
    const S = DT.state.settings;
    const box = h('div', { class: 'ai-panel' });
    const exam = !!o.exam;
    let mode = exam ? 'hint' : (o.mode || 'explain');
    const ctx = clip(contextOf(o), 4000), exText = clip(exerciseOf(o), 2000);
    const topic = o.topicId && DT.outline(o.topicId) ? (DT.outline(o.topicId).extra ? 'Laplace transform (extra module)' : 'Topic ' + DT.outline(o.topicId).num + ': ' + DT.outline(o.topicId).title.en) : '';

    box.appendChild(h('p', { class: 'small muted', text: t('aiDisclaimer') }));
    if (exam) box.appendChild(h('p', { class: 'small', html: DT.icon('alert') + ' ' + DT.esc(t('aiExamLimited')) }));
    // mode selector
    const modes = [['explain', t('aiExplain')], ['hint', t('aiHint')], ['check', t('aiCheck')], ['ask', t('aiAsk')]].filter(m => !exam || m[0] === 'hint');
    const seg = h('div', { class: 'seg', role: 'radiogroup', 'aria-label': t('aiAssistant') });
    const ta = h('textarea', { class: 'input', rows: 4 });
    const setMode = m => { mode = m; DT.$$('button', seg).forEach(b => b.setAttribute('aria-checked', String(b.dataset.m === m))); ta.placeholder = m === 'check' ? t('aiSolutionPh') : m === 'ask' ? t('question') : X('Ixtiyoriy: nima tushunarsiz?', 'Необязательно: что непонятно?', 'Optional: what is unclear?'); ta.setAttribute('aria-label', ta.placeholder); };
    modes.forEach(([k, l]) => seg.appendChild(h('button', { role: 'radio', 'data-m': k, text: l, onclick: () => setMode(k) })));
    box.appendChild(seg);
    // what will be sent
    const sent = h('details', { class: 'small' }, h('summary', { text: X('Serverga nima yuboriladi?', 'Что будет отправлено на сервер?', 'What is sent to the server?') }),
      h('p', { text: t('aiPrivacy') }),
      ctx ? h('pre', { class: 'code', text: clip(ctx, 600) }) : null);
    box.appendChild(sent);
    box.appendChild(ta);
    const out = h('div', { class: 'ai-out', 'aria-live': 'polite' });
    const sendB = h('button', { class: 'btn primary', html: DT.icon('ai') + DT.esc(t('aiSend')) });
    box.appendChild(h('div', { class: 'btn-row' }, sendB));
    box.appendChild(out);
    setMode(mode);

    const notConnected = () => {
      out.innerHTML = '';
      out.appendChild(h('div', { class: 'blk note' }, h('div', { class: 'prose', html: DT.md(t('aiNotConnected')) }),
        h('a', { class: 'btn small', href: '#/settings', onclick: () => DT.closeSheet(), html: DT.icon('gear') + DT.esc(t('settings')) })));
      const hints = builtinHints(o);
      if (hints.length) { out.appendChild(h('h4', { text: t('builtinHints') })); const ul = h('ul', { class: 'prose' }); hints.forEach(x => ul.appendChild(h('li', { html: DT.inline(x) }))); out.appendChild(ul); }
    };
    if (!S.aiUrl) { notConnected(); sendB.disabled = true; }

    sendB.onclick = async () => {
      if (!S.aiUrl) return notConnected();
      if (navigator.onLine === false) { out.innerHTML = ''; out.appendChild(h('p', { class: 'feedback bad', text: t('aiOffline') })); return; }
      const text = ta.value.trim();
      if ((mode === 'check' || mode === 'ask') && !text) { ta.focus(); return; }
      const hist = DT.state.ai.history.filter(m => m.topic === o.topicId).slice(-3).flatMap(m => [{ role: 'user', text: m.q || m.mode }, { role: 'assistant', text: m.a }]);
      const body = { mode, lang: DT.lang(), topic, context: ctx, exercise: exText, exam, history: hist };
      if (mode === 'check') body.solution = text; else if (text) body.question = text;
      sendB.disabled = true; out.innerHTML = ''; out.appendChild(h('p', { class: 'muted', text: t('thinking') }));
      try {
        const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), 70000);
        const r = await fetch(S.aiUrl + '/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctl.signal });
        clearTimeout(timer);
        const j = await r.json().catch(() => ({}));
        out.innerHTML = '';
        if (!r.ok || !j.ok) {
          const msg = r.status === 503 ? t('aiNotConnected') : r.status === 429 ? X('So‘rovlar chegarasiga yetildi. Birozdan keyin urinib ko‘ring.', 'Достигнут лимит запросов. Попробуйте позже.', 'Request limit reached. Please try again later.') : j.error === 'refusal' ? X('Yordamchi bu so‘rovga javob bera olmadi. Savolni boshqacha yozib ko‘ring.', 'Помощник не смог ответить на этот запрос. Попробуйте переформулировать.', 'The assistant could not answer this request. Try rephrasing.') : t('aiError');
          out.appendChild(h('p', { class: 'feedback bad', text: msg }));
        } else {
          out.appendChild(h('div', { class: 'ai-msg prose', html: DT.md(j.text) }));
          if (j.truncated) out.appendChild(h('p', { class: 'small muted', text: '…' }));
          DT.state.ai.history.push({ ts: Date.now(), topic: o.topicId || null, mode, q: clip(text, 500), a: clip(j.text, 3000) });
          if (DT.state.ai.history.length > 60) DT.state.ai.history = DT.state.ai.history.slice(-60);
          DT.save();
        }
      } catch (e) {
        out.innerHTML = ''; out.appendChild(h('p', { class: 'feedback bad', text: t('aiError') }));
      } finally { sendB.disabled = false; }
    };
    DT.openSheet(t('aiAssistant'), box);
  };
})();
