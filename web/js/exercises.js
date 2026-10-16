/* Exercise and quiz engine. Types: mcq, numeric, formula, match, order, finderror, steps.
   Modes: 'learn' (hints, retries, explanations) and 'exam' (one attempt, feedback deferred). */
(function () {
  const DT = window.DT, h = DT.h, t = DT.t, tx = DT.tx;
  const P = () => DT.state.progress;

  DT.recordExercise = function (ex, topicId, result, answer, mode) {
    const arr = P().ex[ex.id] = P().ex[ex.id] || [];
    arr.push({ ts: Date.now(), mode, result, answer: typeof answer === 'string' ? answer.slice(0, 300) : answer });
    if (arr.length > 50) arr.shift();
    DT.recordMistake(ex.id, topicId, result);
    DT.save();
  };
  DT.recordMistake = function (itemId, topicId, result) {
    const m = P().mistakes;
    if (result === 'bad') { m[itemId] = m[itemId] || { topic: topicId, count: 0 }; m[itemId].count++; m[itemId].last = Date.now(); m[itemId].resolved = false; }
    else if (result === 'ok' && m[itemId]) { m[itemId].resolved = true; }
  };
  DT.exerciseSolved = id => (P().ex[id] || []).some(a => a.result === 'ok');

  function levelChip(level) {
    const name = { easy: 'levelEasy', mid: 'levelMid', hard: 'levelHard' }[level] || 'levelMid';
    const bars = { easy: 1, mid: 2, hard: 3 }[level] || 2;
    return h('span', { class: 'chip', html: '<span aria-hidden="true">' + '▮'.repeat(bars) + '▯'.repeat(3 - bars) + '</span> ' + DT.esc(t(name)) });
  }
  function feedback(kind, title, bodyHtml) {
    const icon = kind === 'ok' ? 'check' : kind === 'bad' ? 'x' : 'question';
    return h('div', { class: 'feedback ' + kind, role: 'status', html: '<div class="fb-title">' + DT.icon(icon) + DT.esc(title) + '</div>' + (bodyHtml || '') });
  }
  const shuffle = (a, seed) => { const r = a.slice(); let s = seed || 1; for (let i = r.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor(s / 233280 * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
  function hashStr(s) { let x = 7; for (const c of s) x = (x * 31 + c.charCodeAt(0)) % 100000; return x + 1; }

  /* Render one exercise. opts: { mode, topicId, onDone(result), showHead, index } */
  DT.renderExercise = function (ex, opts) {
    opts = Object.assign({ mode: 'learn', showHead: true }, opts);
    const box = h('div', { class: 'ex', 'data-anchor': ex.id, id: 'ex-' + ex.id.replace(/\./g, '-') });
    if (opts.showHead) {
      const head = h('div', { class: 'ex-head' });
      if (opts.index != null) head.appendChild(h('strong', { text: t('question') + ' ' + opts.index }));
      if (ex.level) head.appendChild(levelChip(ex.level));
      if (DT.exerciseSolved(ex.id)) head.appendChild(h('span', { class: 'chip ok', html: DT.icon('check') + DT.esc(t('correct')) }));
      box.appendChild(head);
    }
    box.appendChild(h('div', { class: 'ex-q prose', html: DT.md(ex.q) }));
    const body = h('div');
    box.appendChild(body);
    const fbArea = h('div');
    const actions = h('div', { class: 'btn-row' });
    box.appendChild(actions);
    box.appendChild(fbArea);
    let locked = false;
    const finish = (res, answer, extraHtml) => {
      DT.recordExercise(ex, opts.topicId, res, answer, opts.mode);
      if (opts.mode === 'exam') { locked = true; box.dataset.result = res; fbArea.innerHTML = ''; fbArea.appendChild(h('p', { class: 'muted small', text: '✓' })); if (opts.onDone) opts.onDone(res); return; }
      fbArea.innerHTML = '';
      if (res === 'ok') fbArea.appendChild(feedback('ok', t('correct'), (ex.explain ? DT.md(ex.explain) : '') + (extraHtml || '')));
      else if (res === 'bad') fbArea.appendChild(feedback('bad', t('incorrect'), (extraHtml || '')));
      else fbArea.appendChild(feedback('unk', t('cannotVerify'), '<p>' + DT.esc(t('cannotVerifyBody')) + '</p>' + (extraHtml || '')));
      if (res !== 'ok') showSolutionButton();
      if (opts.onDone) opts.onDone(res);
    };
    const showSolutionButton = () => {
      if (!ex.solution && !ex.explain) return;
      if (DT.$('.btn-sol', actions)) return;
      actions.appendChild(h('button', { class: 'btn small btn-sol', onclick: () => {
        const sol = h('div', { class: 'feedback ok', html: '<div class="fb-title">' + DT.icon('lightbulb') + DT.esc(t('showSolution')) + '</div>' + DT.md(ex.solution || ex.explain) });
        fbArea.appendChild(sol);
      } }, t('showSolution')));
    };
    if (opts.mode === 'learn' && ex.hint) {
      actions.appendChild(h('button', { class: 'btn small ghost', html: DT.icon('lightbulb') + DT.esc(t('hint')), onclick: e => {
        e.currentTarget.disabled = true; fbArea.appendChild(h('div', { class: 'feedback unk', html: DT.md(ex.hint) }));
      } }));
    }
    if (opts.mode === 'learn' && DT.openAI) {
      actions.appendChild(h('button', { class: 'btn small ghost', html: DT.icon('ai') + DT.esc(t('askAI')), onclick: () => DT.openAI({ topicId: opts.topicId, item: ex, mode: 'hint' }) }));
    }
    const seed = hashStr(ex.id);

    switch (ex.type) {
      case 'mcq': {
        let sel = null;
        const order = ex.noShuffle ? ex.options.map((_, i) => i) : shuffle(ex.options.map((_, i) => i), seed);
        const btns = order.map((oi, k) => {
          const b = h('button', { class: 'opt', 'aria-pressed': 'false', html: '<span class="mark">' + String.fromCharCode(65 + k) + '</span><span>' + DT.inline(tx(ex.options[oi])) + '</span>', onclick: () => {
            if (locked) return; sel = oi; btns.forEach(x => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true');
            if (opts.mode === 'exam') finishMcq();
          } });
          b.dataset.oi = oi; return b;
        });
        btns.forEach(b => body.appendChild(b));
        const finishMcq = () => {
          if (sel == null) return;
          const ok = sel === ex.correct;
          if (opts.mode === 'learn') {
            btns.forEach(b => { b.classList.remove('correct', 'wrong'); });
            const chosen = btns.find(b => +b.dataset.oi === sel);
            chosen.classList.add(ok ? 'correct' : 'wrong');
            let extra = '';
            if (!ok && ex.why && ex.why[sel]) extra = '<p><strong>' + DT.esc(t('whyWrong')) + ':</strong> ' + DT.inline(tx(ex.why[sel])) + '</p>';
            finish(ok ? 'ok' : 'bad', sel, extra);
          } else finish(ok ? 'ok' : 'bad', sel);
        };
        if (opts.mode === 'learn') actions.prepend(h('button', { class: 'btn primary small', onclick: finishMcq }, t('check')));
        box._reveal = () => { btns.forEach(b => { const oi = +b.dataset.oi; if (oi === ex.correct) b.classList.add('correct'); else if (oi === sel) b.classList.add('wrong'); }); };
        break;
      }
      case 'numeric':
      case 'formula': {
        const isF = ex.type === 'formula';
        const id = 'in-' + ex.id.replace(/\./g, '-');
        const input = h('input', { class: 'input', id, type: 'text', inputmode: isF ? 'text' : 'decimal', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', placeholder: isF ? t('answerPlaceholder') : t('numericAnswer'), 'aria-describedby': id + '-help' });
        const prev = h('div', { class: 'mathinput-preview', 'aria-live': 'polite' });
        body.appendChild(h('div', { class: 'field' }, h('label', { for: id, text: t('yourAnswer') }), input));
        if (isF) {
          body.appendChild(h('div', { class: 'small muted', id: id + '-help', text: t('formulaHelp') }));
          const keys = ['^', '*', '/', '(', ')', 'exp(', 'ln(', 'sqrt(', 'sin(', 'cos(', 'C', 'pi'];
          const kr = h('div', { class: 'kbd-row' });
          keys.forEach(k => kr.appendChild(h('button', { type: 'button', text: k, onclick: () => { const p = input.selectionStart || input.value.length; input.value = input.value.slice(0, p) + k + input.value.slice(p); input.focus(); input.setSelectionRange(p + k.length, p + k.length); update(); } })));
          body.appendChild(kr);
          body.appendChild(h('div', { class: 'small muted', text: t('preview') + ':' }));
          body.appendChild(prev);
        }
        const update = () => {
          if (!isF) return;
          const vars = ex.check.kind === 'ode' ? ['x', ...(ex.check.consts || ['C'])] : Object.keys(ex.check.vars || { x: 1, y: 1 });
          const tex = DT.previewTex(input.value, vars);
          prev.innerHTML = input.value.trim() ? (tex ? DT.katexStr(tex, false) : '<span class="muted small">' + DT.esc(t('parseError')) + '</span>') : '';
        };
        input.addEventListener('input', update);
        const run = () => {
          if (locked) return;
          const v = input.value;
          let r;
          try {
            const c = ex.check;
            r = c.kind === 'numeric' ? DT.Expr.checkNumeric(v, c) : c.kind === 'ode' ? DT.Expr.checkOdeSolution(v, c) : c.kind === 'integral' ? DT.Expr.checkFirstIntegral(v, c) : DT.Expr.checkEquiv(v, c);
          } catch (e) { r = { res: 'unk' }; }
          let extra = '';
          if (r.why === 'parse') extra = '<p>' + DT.esc(t('parseError')) + '. ' + DT.esc(t('formulaHelp')) + '</p>';
          else if (r.why === 'consts') extra = '<p>' + DT.esc({ uz: 'Umumiy yechimda mustaqil ixtiyoriy o‘zgarmas(lar) bo‘lishi kerak.', ru: 'В общем решении должны быть независимые произвольные постоянные.', en: 'A general solution must contain independent arbitrary constant(s).' }[DT.lang()]) + '</p>';
          else if (r.why === 'ivp') extra = '<p>' + DT.esc({ uz: 'Tenglama qanoatlantirildi, lekin boshlang‘ich shart bajarilmadi.', ru: 'Уравнение выполнено, но начальное условие — нет.', en: 'The equation is satisfied but the initial condition is not.' }[DT.lang()]) + '</p>';
          else if (r.why === 'vars') extra = '<p>' + DT.esc({ uz: 'Ifodada ortiqcha o‘zgaruvchi bor: ', ru: 'В выражении лишняя переменная: ', en: 'Unexpected variable: ' }[DT.lang()] + r.extra.join(', ')) + '</p>';
          if (opts.mode === 'exam' && r.res === 'unk' && r.why === 'parse') { fbArea.innerHTML = ''; fbArea.appendChild(feedback('unk', t('parseError'), '<p>' + DT.esc(t('formulaHelp')) + '</p>')); return; }
          finish(r.res, v, extra);
        };
        input.addEventListener('keydown', e => { if (e.key === 'Enter') run(); });
        actions.prepend(h('button', { class: 'btn primary small', onclick: run }, t('check')));
        break;
      }
      case 'match': {
        const rights = shuffle(ex.pairs.map((p, i) => i), seed);
        const grid = h('div', { class: 'match-grid' });
        const sels = ex.pairs.map((p, i) => {
          const sel = h('select', { class: 'input', 'aria-label': t('chooseMatch') + ' ' + (i + 1) });
          sel.appendChild(h('option', { value: '', text: '—' }));
          rights.forEach(ri => sel.appendChild(h('option', { value: ri, text: DT.plain(ex.pairs[ri].right) })));
          grid.appendChild(h('div', { class: 'match-row' }, h('div', { html: DT.inline(tx(p.left)) }), sel));
          return sel;
        });
        body.appendChild(grid);
        actions.prepend(h('button', { class: 'btn primary small', onclick: () => {
          if (locked) return;
          const ans = sels.map(s => s.value === '' ? -1 : +s.value);
          if (ans.some(a => a < 0)) { DT.toast(t('chooseMatch')); return; }
          const ok = ans.every((a, i) => a === i);
          if (opts.mode === 'learn') sels.forEach((s, i) => { s.style.borderColor = ans[i] === i ? DT.css('--moss') : DT.css('--rust'); });
          finish(ok ? 'ok' : 'bad', ans.join(','));
        } }, t('check')));
        break;
      }
      case 'order': {
        let cur = shuffle(ex.items.map((_, i) => i), seed);
        if (cur.every((v, i) => v === i)) cur = cur.slice().reverse();
        const list = h('ol', { class: 'order-list' });
        const draw = () => {
          list.innerHTML = '';
          cur.forEach((ii, k) => {
            const up = h('button', { class: 'icon-btn', 'aria-label': t('moveUp'), html: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 15l6-6 6 6"/></svg>', disabled: k === 0, onclick: () => { [cur[k - 1], cur[k]] = [cur[k], cur[k - 1]]; draw(); list.children[k - 1].querySelector('button').focus(); } });
            const dn = h('button', { class: 'icon-btn', 'aria-label': t('moveDown'), html: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>', disabled: k === cur.length - 1, onclick: () => { [cur[k + 1], cur[k]] = [cur[k], cur[k + 1]]; draw(); list.children[k + 1].querySelectorAll('button')[1].focus(); } });
            list.appendChild(h('li', {}, h('span', { class: 'pos', text: String(k + 1) }), h('span', { class: 'txt', html: DT.inline(tx(ex.items[ii])) }), up, dn));
          });
        };
        draw();
        body.appendChild(list);
        actions.prepend(h('button', { class: 'btn primary small', onclick: () => { if (locked) return; finish(cur.every((v, i) => v === i) ? 'ok' : 'bad', cur.join(',')); } }, t('check')));
        break;
      }
      case 'finderror': {
        let sel = null;
        const ul = h('ul', { class: 'lines-list' });
        const btns = ex.lines.map((ln, i) => {
          const b = h('button', { 'aria-pressed': 'false', html: '<strong>' + (i + 1) + '.</strong> ' + DT.inline(tx(ln)), onclick: () => { if (locked) return; sel = i; btns.forEach(x => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); } });
          ul.appendChild(h('li', {}, b)); return b;
        });
        body.appendChild(h('p', { class: 'small muted', text: t('selectWrongLine') }));
        body.appendChild(ul);
        actions.prepend(h('button', { class: 'btn primary small', onclick: () => { if (locked || sel == null) return; finish(sel === ex.wrong ? 'ok' : 'bad', sel); } }, t('check')));
        break;
      }
      case 'steps': {
        let k = 0, allOk = true;
        const area = h('div');
        body.appendChild(area);
        const drawStep = () => {
          const st = ex.steps[k];
          const wrap = h('div', { class: 'panel' }, h('div', { class: 'small muted', text: (k + 1) + ' / ' + ex.steps.length + ' ' + t('stepOf') }), h('div', { class: 'prose', html: DT.md(st.q) }));
          st.options.forEach((o, oi) => {
            const b = h('button', { class: 'opt', html: '<span class="mark">' + String.fromCharCode(65 + oi) + '</span><span>' + DT.inline(tx(o)) + '</span>', onclick: () => {
              if (wrap.dataset.done) return;
              const ok = oi === st.correct;
              if (!ok && opts.mode === 'learn') { b.classList.add('wrong'); allOk = false; return; }
              if (!ok) allOk = false;
              wrap.dataset.done = '1';
              b.classList.add(ok ? 'correct' : (opts.mode === 'exam' ? '' : 'wrong'));
              k++;
              if (k < ex.steps.length) drawStep(); else finish(allOk ? 'ok' : 'bad', allOk ? 'all' : 'some');
            } });
            wrap.appendChild(b);
          });
          area.appendChild(wrap);
        };
        drawStep();
        break;
      }
    }
    box._ex = ex;
    return box;
  };

  /* -------- quiz (8+ MCQ per topic) -------- */
  DT.renderQuiz = function (topic, host, mode) {
    host.innerHTML = '';
    const qs = topic.quiz;
    const results = {};
    host.appendChild(h('p', { class: 'small muted', text: mode === 'exam' ? t('modeExamHint') : t('modeLearnHint') }));
    const items = qs.map((q, i) => {
      const ex = Object.assign({ type: 'mcq' }, q);
      return DT.renderExercise(ex, { mode, topicId: topic.id, index: i + 1, onDone: r => { results[q.id] = r; } });
    });
    items.forEach(el => host.appendChild(el));
    const finishBtn = h('button', { class: 'btn primary', html: DT.icon('check') + DT.esc(t('finishQuiz')), onclick: () => {
      const total = qs.length, score = qs.filter(q => results[q.id] === 'ok').length;
      const rec = { ts: Date.now(), mode, score, total, wrong: qs.filter(q => results[q.id] && results[q.id] !== 'ok').map(q => q.id), answered: Object.keys(results).length };
      (DT.state.progress.quiz[topic.id] = DT.state.progress.quiz[topic.id] || []).push(rec);
      DT.saveNow();
      if (mode === 'exam') items.forEach(el => {
        if (el._reveal) el._reveal();
        const q = el._ex; const fb = h('div', { class: 'feedback ' + (results[q.id] === 'ok' ? 'ok' : 'bad'), html: '<div class="fb-title">' + DT.icon(results[q.id] === 'ok' ? 'check' : 'x') + DT.esc(results[q.id] === 'ok' ? t('correct') : t('incorrect')) + '</div>' + DT.md(q.explain) });
        el.appendChild(fb);
      });
      const pct = Math.round(100 * score / total);
      const res = h('div', { class: 'panel', role: 'status' }, h('h3', { text: t('quizResult') + ': ' + score + ' / ' + total + ' (' + pct + '%)' }), h('p', { class: 'small muted', text: t('officialNote') }));
      finishBtn.replaceWith(res);
      res.scrollIntoView({ block: 'center' });
    } });
    host.appendChild(finishBtn);
  };
})();
