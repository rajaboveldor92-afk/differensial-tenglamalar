/* Twelve interactive labs. Every graph is computed from the stated model; nothing is decorative. */
(function () {
  const DT = window.DT, h = DT.h, t = DT.t, tx = DT.tx, L = DT.L, R = DT.R;
  const css = n => DT.css(n);
  const C1 = () => css('--curve-1'), C2 = () => css('--curve-2'), C3 = () => css('--curve-3'), C4 = () => css('--curve-4');
  const fmt = (v, d) => (v == null || !isFinite(v)) ? '—' : (+v.toFixed(d == null ? 3 : d)).toString().replace('-', '−');

  /* ---------- controls ---------- */
  function slider(spec, state, onChange) {
    const id = 'c-' + spec.key + '-' + Math.random().toString(36).slice(2, 6);
    const rng = h('input', { type: 'range', id, min: spec.min, max: spec.max, step: spec.step, value: state[spec.key], 'aria-label': tx(spec.label) });
    const num = h('input', { type: 'number', min: spec.min, max: spec.max, step: spec.step, value: state[spec.key], 'aria-label': tx(spec.label) });
    const set = v => { v = Math.min(spec.max, Math.max(spec.min, +v)); if (!isFinite(v)) return; state[spec.key] = v; rng.value = v; num.value = v; onChange(); };
    rng.addEventListener('input', () => set(rng.value));
    num.addEventListener('change', () => set(num.value));
    const el = h('div', { class: 'ctrl' }, h('div', { class: 'ctrl-head' }, h('label', { for: id, html: DT.inline(tx(spec.label)) }), num), rng, spec.hint ? h('div', { class: 'hint', html: DT.inline(tx(spec.hint)) }) : null);
    el._set = v => { state[spec.key] = v; rng.value = v; num.value = v; };
    return el;
  }
  function select(label, options, value, onChange) {
    const id = 's-' + Math.random().toString(36).slice(2, 7);
    const sel = h('select', { class: 'input', id });
    options.forEach(o => sel.appendChild(h('option', { value: o.value, text: DT.plain(o.label) })));
    sel.value = value;
    sel.addEventListener('change', () => onChange(sel.value));
    return h('div', { class: 'field' }, h('label', { for: id, text: tx(label) }), sel);
  }
  function readout() { return h('div', { class: 'readout', 'aria-live': 'polite' }); }
  const Lx = L; // shorthand

  /* common lab texts */
  const LABS = [];
  DT.LABS = LABS;
  DT.lab = id => LABS.find(l => l.id === id);

  /* ======================= L01 Direction field ======================= */
  LABS.push({
    id: 'L01', topics: ['t01', 't02'],
    title: L('Yo‘nalish maydoni va integral chiziq', 'Поле направлений и интегральная кривая', 'Direction field and integral curves'),
    goal: L('$y\'=f(x,y)$ tenglamaning geometrik ma’nosini ko‘rish: integral chiziqlar maydon kesmalariga urinadi.', 'Увидеть геометрический смысл $y\'=f(x,y)$: интегральные кривые касаются отрезков поля.', 'See the geometric meaning of $y\'=f(x,y)$: integral curves are tangent to the field segments.'),
    howto: L('Tenglamani tanlang yoki o‘zingiz yozing. Grafikka bosing yoki $x_0, y_0$ ni kiriting: shu nuqtadan o‘tuvchi integral chiziq chiziladi.', 'Выберите уравнение или введите своё. Нажмите на график или введите $x_0, y_0$: будет построена интегральная кривая через эту точку.', 'Pick an equation or type your own. Tap the graph or enter $x_0, y_0$ to draw the integral curve through that point.'),
    model: L('Maydon: har bir tugunda burchak koeffitsiyenti $f(x,y)$ bo‘lgan kesma. Integral chiziq: RK4 usuli, qadam oyna kengligining 1/600 qismi, ikki yo‘nalishda. Cheklovlar: $f$ aniqlanmagan nuqtalarda (masalan, nolga bo‘lish) chiziq to‘xtaydi; yagonalik buzilgan joyda (masalan, $y\'=3y^{2/3}$, $y=0$) sonli usul faqat bitta egri chiziqni ko‘rsatadi.', 'Поле: в каждом узле отрезок с угловым коэффициентом $f(x,y)$. Интегральная кривая: метод RK4, шаг 1/600 ширины окна, в обе стороны. Ограничения: в точках, где $f$ не определена (например, деление на ноль), кривая обрывается; там, где нарушена единственность (например, $y\'=3y^{2/3}$, $y=0$), численный метод показывает лишь одну кривую.', 'Field: at each grid node a segment with slope $f(x,y)$. Integral curve: RK4, step 1/600 of the window width, in both directions. Limits: the curve stops where $f$ is undefined (e.g. division by zero); where uniqueness fails (e.g. $y\'=3y^{2/3}$ at $y=0$) the numerical method shows only one of the curves.'),
    observe: L('Integral chiziqlar bir-birini kesib o‘tadimi? Qaysi tenglamada kesishish mumkin va nega?', 'Пересекаются ли интегральные кривые? В каком уравнении пересечение возможно и почему?', 'Do integral curves cross each other? For which equation can they meet, and why?'),
    expected: L('Pikar teoremasi shartlari bajarilgan sohada integral chiziqlar kesishmaydi. $y\'=3y^{2/3}$ da $y=0$ to‘g‘ri chiziqqa $y=(x-c)^3$ chiziqlar urinadi — u yerda $f_y$ chegaralanmagan.', 'Там, где выполнены условия теоремы Пикара, интегральные кривые не пересекаются. У $y\'=3y^{2/3}$ кривые $y=(x-c)^3$ касаются прямой $y=0$ — там $f_y$ не ограничена.', 'Where Picard’s hypotheses hold, integral curves never cross. For $y\'=3y^{2/3}$ the curves $y=(x-c)^3$ touch the line $y=0$, where $f_y$ is unbounded.'),
    presets: [
      { value: 'x^2+y^2', label: "y' = x² + y²", box: [-2, 2, -2, 2] },
      { value: 'y*(1-y)', label: "y' = y(1 − y)", box: [-1, 6, -1, 2] },
      { value: 'x-y', label: "y' = x − y", box: [-3, 3, -3, 3] },
      { value: '-x/y', label: "y' = −x / y", box: [-3, 3, -3, 3] },
      { value: '3*abs(y)^(2/3)', label: "y' = 3|y|^(2/3)", box: [-2, 2, -2, 2] },
      { value: 'y^2', label: "y' = y²", box: [-3, 3, -3, 3] },
      { value: 'sin(x)*y', label: "y' = y·sin x", box: [-6, 6, -3, 3] }
    ],
    build(host) {
      const st = { eq: this.presets[0].value, box: this.presets[0].box.slice(), pts: [[0, 0.5], [0, -0.5]], x0: 0, y0: 1 };
      let f;
      const p = DT.plotBox({ xlabel: 'x', ylabel: 'y', label: tx(this.title) });
      const ro = readout();
      const errBox = h('div', { class: 'small', style: { color: css('--rust') } });
      const compile = s => { try { const ast = DT.Expr.parse(s, ['x', 'y']); return (x, y) => DT.Expr.ev(ast, { x, y }); } catch (e) { return null; } };
      const draw = () => {
        const [xmin, xmax, ymin, ymax] = st.box; p.setView({ xmin, xmax, ymin, ymax }); p.clear(); p.axes();
        if (!f) return;
        p.field(f);
        const cols = [C1(), C2(), C3(), C4()];
        st.pts.forEach((pt, i) => { const pts = DT.ODE.integralCurve(f, pt[0], pt[1], { xmin, xmax, ymin, ymax }); p.line(pts, { color: cols[i % 4], width: 2.4 }); p.dot(pt[0], pt[1], { color: cols[i % 4], ring: true }); });
        const last = st.pts[st.pts.length - 1];
        ro.textContent = last ? `(x₀, y₀) = (${fmt(last[0], 2)}, ${fmt(last[1], 2)});  f(x₀, y₀) = ${fmt(f(last[0], last[1]))}` : '';
        p.caption(t('textDescription') + ': ' + { uz: `y' = ${st.eq} tenglamaning yo‘nalish maydoni, ${st.pts.length} ta integral chiziq.`, ru: `Поле направлений уравнения y' = ${st.eq}, интегральных кривых: ${st.pts.length}.`, en: `Direction field of y' = ${st.eq} with ${st.pts.length} integral curve(s).` }[DT.lang()]);
      };
      const setEq = s => { const g = compile(s); if (!g) { errBox.textContent = t('parseError'); return false; } errBox.textContent = ''; f = g; st.eq = s; return true; };
      setEq(st.eq);
      p.onResize = draw;
      p.onTap((x, y) => { st.pts.push([x, y]); if (st.pts.length > 12) st.pts.shift(); draw(); });
      const custom = h('input', { class: 'input', value: st.eq, 'aria-label': "f(x, y)" });
      const ctr = h('div');
      ctr.appendChild(select(t('equation'), this.presets, st.eq, v => { const pr = this.presets.find(q => q.value === v); st.box = pr.box.slice(); st.pts = [[pr.box[0] + (pr.box[1] - pr.box[0]) / 2, (pr.box[2] + pr.box[3]) / 2 + 0.3]]; custom.value = v; setEq(v); draw(); }));
      ctr.appendChild(h('div', { class: 'field' }, h('label', { text: "f(x, y) =" }), custom, errBox));
      custom.addEventListener('change', () => { if (setEq(custom.value)) draw(); });
      const xin = h('input', { class: 'input', type: 'number', step: '0.1', value: 0, 'aria-label': 'x₀' }), yin = h('input', { class: 'input', type: 'number', step: '0.1', value: 1, 'aria-label': 'y₀' });
      ctr.appendChild(h('p', { class: 'small muted', text: t('tapToAdd') }));
      ctr.appendChild(h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' } }, h('div', { class: 'field' }, h('label', { text: 'x₀' }), xin), h('div', { class: 'field' }, h('label', { text: 'y₀' }), yin)));
      ctr.appendChild(h('div', { class: 'btn-row' }, h('button', { class: 'btn small primary', text: t('addCurve'), onclick: () => { st.pts.push([+xin.value, +yin.value]); draw(); } }), h('button', { class: 'btn small', text: t('clearCurves'), onclick: () => { st.pts = []; draw(); } })));
      ctr.appendChild(ro);
      host.plot.appendChild(p.el); host.ctrl.appendChild(ctr);
      host.reset = () => { st.eq = this.presets[0].value; st.box = this.presets[0].box.slice(); st.pts = [[0, 0.5], [0, -0.5]]; custom.value = st.eq; setEq(st.eq); DT.$('select', ctr).value = st.eq; draw(); };
      draw();
    },
    thumb(cv) { thumbField(cv, (x, y) => y * (1 - y), [-1, 6, -1, 2]); }
  });

  /* ======================= L02 Separation of variables step builder ======================= */
  LABS.push({
    id: 'L02', topics: ['t02'],
    title: L('O‘zgaruvchilarni ajratish bosqichlari', 'Шаги разделения переменных', 'Separation of variables, step by step'),
    goal: L('Ajratish usulining to‘g‘ri tartibini va yo‘qolishi mumkin bo‘lgan doimiy yechimlarni topishni mashq qilish.', 'Отработать правильный порядок метода разделения и поиск теряемых постоянных решений.', 'Practise the right order of the method and finding constant solutions that can be lost.'),
    howto: L('Tenglamani tanlang. Har bir qadamda to‘g‘ri harakatni tanlang. Oxirida $C$ ni o‘zgartirib, yechimlar oilasini ko‘ring.', 'Выберите уравнение. На каждом шаге выберите верное действие. В конце меняйте $C$ и смотрите семейство решений.', 'Choose an equation. At each step pick the correct action. At the end vary $C$ to see the family of solutions.'),
    model: L('Yechimlar oilasi analitik formula bo‘yicha chiziladi (formulalar kompyuterda tekshirilgan). Cheklov: faqat uchta tanlangan tenglama; bu umumiy yechuvchi emas.', 'Семейство решений строится по аналитической формуле (формулы проверены на компьютере). Ограничение: только три выбранных уравнения; это не универсальный решатель.', 'The family is drawn from the analytic formula (formulas checked by computer). Limitation: only three chosen equations; this is not a general solver.'),
    observe: L('Qaysi qadamda yechim yo‘qolishi mumkin edi va u grafikda qanday ko‘rinadi?', 'На каком шаге можно было потерять решение и как оно выглядит на графике?', 'At which step could a solution be lost, and how does it look on the graph?'),
    expected: L('$g(y)$ ga bo‘lishda $g(y)=0$ ildizlari — doimiy yechimlar ($y=0$ kabi gorizontal to‘g‘ri chiziqlar) — yo‘qolishi mumkin. Ular umumiy formuladan ba’zan hech qanday $C$ da olinmaydi.', 'При делении на $g(y)$ можно потерять постоянные решения — корни $g(y)=0$ (горизонтальные прямые вроде $y=0$). Иногда они не получаются из общей формулы ни при каком $C$.', 'Dividing by $g(y)$ can lose the constant solutions, the roots of $g(y)=0$ (horizontal lines such as $y=0$). Sometimes no value of $C$ in the general formula gives them.'),
    eqs: [
      { key: 'a', label: "y' = x·y", sol: (x, C) => C * Math.exp(x * x / 2), constSol: [0], box: [-2, 2, -4, 4],
        steps: [
          { q: L('$y\'=xy$. Birinchi qadam?', '$y\'=xy$. Первый шаг?', '$y\'=xy$. First step?'), o: [L('$\\dfrac{dy}{dx}=xy$ deb yozish', 'Записать $\\dfrac{dy}{dx}=xy$', 'Write $\\dfrac{dy}{dx}=xy$'), L('Ikkala tomonni $x$ bo‘yicha integrallash', 'Проинтегрировать обе части по $x$', 'Integrate both sides in $x$')], c: 0 },
          { q: L('Ajratishdan oldin nimani tekshirish kerak?', 'Что проверить перед разделением?', 'What must be checked before dividing?'), o: [L('$y=0$ yechimmi: ha, $0=x\\cdot0$', 'Является ли $y=0$ решением: да, $0=x\\cdot0$', 'Whether $y=0$ is a solution: yes, $0=x\\cdot0$'), L('Hech narsa', 'Ничего', 'Nothing')], c: 0 },
          { q: L('$y\\ne0$ da ajratamiz:', 'При $y\\ne0$ разделяем:', 'For $y\\ne0$ separate:'), o: [L('$\\dfrac{dy}{y}=x\\,dx$', '$\\dfrac{dy}{y}=x\\,dx$', '$\\dfrac{dy}{y}=x\\,dx$'), L('$y\\,dy=x\\,dx$', '$y\\,dy=x\\,dx$', '$y\\,dy=x\\,dx$')], c: 0 },
          { q: L('Integrallaymiz:', 'Интегрируем:', 'Integrate:'), o: [L('$\\ln|y|=\\dfrac{x^2}{2}+C_1$', '$\\ln|y|=\\dfrac{x^2}{2}+C_1$', '$\\ln|y|=\\dfrac{x^2}{2}+C_1$'), L('$\\ln y=\\dfrac{x^2}{2}$', '$\\ln y=\\dfrac{x^2}{2}$', '$\\ln y=\\dfrac{x^2}{2}$')], c: 0 },
          { q: L('Yakuniy javob:', 'Итоговый ответ:', 'Final answer:'), o: [L('$y=Ce^{x^2/2}$, $C\\in\\mathbb R$ ($C=0$ yo‘qolgan $y=0$ ni beradi)', '$y=Ce^{x^2/2}$, $C\\in\\mathbb R$ ($C=0$ даёт потерянное $y=0$)', '$y=Ce^{x^2/2}$, $C\\in\\mathbb R$ ($C=0$ restores $y=0$)'), L('$y=e^{x^2/2}+C$', '$y=e^{x^2/2}+C$', '$y=e^{x^2/2}+C$')], c: 0 }
        ] },
      { key: 'b', label: "y' = y² − 1", sol: (x, C) => (1 + C * Math.exp(2 * x)) / (1 - C * Math.exp(2 * x)), constSol: [1, -1], box: [-3, 3, -3, 3],
        steps: [
          { q: L('$y\'=y^2-1$. Doimiy yechimlar?', '$y\'=y^2-1$. Постоянные решения?', '$y\'=y^2-1$. Constant solutions?'), o: [L('$y=1$ va $y=-1$', '$y=1$ и $y=-1$', '$y=1$ and $y=-1$'), L('Yo‘q', 'Нет', 'None')], c: 0 },
          { q: L('Ajratish:', 'Разделение:', 'Separate:'), o: [L('$\\dfrac{dy}{y^2-1}=dx$', '$\\dfrac{dy}{y^2-1}=dx$', '$\\dfrac{dy}{y^2-1}=dx$'), L('$(y^2-1)\\,dy=dx$', '$(y^2-1)\\,dy=dx$', '$(y^2-1)\\,dy=dx$')], c: 0 },
          { q: L('Chap integral:', 'Левый интеграл:', 'Left integral:'), o: [L('$\\dfrac12\\ln\\left|\\dfrac{y-1}{y+1}\\right|$', '$\\dfrac12\\ln\\left|\\dfrac{y-1}{y+1}\\right|$', '$\\dfrac12\\ln\\left|\\dfrac{y-1}{y+1}\\right|$'), L('$\\arctan y$', '$\\arctan y$', '$\\arctan y$')], c: 0 },
          { q: L('Javob:', 'Ответ:', 'Answer:'), o: [L('$\\dfrac{y-1}{y+1}=Ce^{2x}$, ya’ni $y=\\dfrac{1+Ce^{2x}}{1-Ce^{2x}}$, hamda $y=-1$', '$\\dfrac{y-1}{y+1}=Ce^{2x}$, т.е. $y=\\dfrac{1+Ce^{2x}}{1-Ce^{2x}}$, а также $y=-1$', '$\\dfrac{y-1}{y+1}=Ce^{2x}$, i.e. $y=\\dfrac{1+Ce^{2x}}{1-Ce^{2x}}$, and also $y=-1$'), L('$y=\\tan(x+C)$', '$y=\\tan(x+C)$', '$y=\\tan(x+C)$')], c: 0 }
        ] },
      { key: 'c', label: "y' = 2x(1 + y²)", sol: (x, C) => Math.tan(x * x + C), constSol: [], box: [-1.6, 1.6, -4, 4],
        steps: [
          { q: L('$1+y^2=0$ ning haqiqiy ildizi bormi?', 'Есть ли у $1+y^2=0$ вещественные корни?', 'Does $1+y^2=0$ have real roots?'), o: [L('Yo‘q, doimiy yechim yo‘q', 'Нет, постоянных решений нет', 'No, so there is no constant solution'), L('Ha, $y=\\pm1$', 'Да, $y=\\pm1$', 'Yes, $y=\\pm1$')], c: 0 },
          { q: L('Ajratish va integrallash:', 'Разделение и интегрирование:', 'Separate and integrate:'), o: [L('$\\arctan y=x^2+C$', '$\\arctan y=x^2+C$', '$\\arctan y=x^2+C$'), L('$\\ln(1+y^2)=x^2+C$', '$\\ln(1+y^2)=x^2+C$', '$\\ln(1+y^2)=x^2+C$')], c: 0 },
          { q: L('Javob va aniqlanish oralig‘i:', 'Ответ и интервал определения:', 'Answer and interval:'), o: [L('$y=\\tan(x^2+C)$, $|x^2+C|<\\pi/2$ bo‘lgan oraliqda', '$y=\\tan(x^2+C)$ на интервале, где $|x^2+C|<\\pi/2$', '$y=\\tan(x^2+C)$ on an interval where $|x^2+C|<\\pi/2$'), L('$y=\\tan(x^2+C)$, butun $\\mathbb R$ da', '$y=\\tan(x^2+C)$ на всей $\\mathbb R$', '$y=\\tan(x^2+C)$ on all of $\\mathbb R$')], c: 0 }
        ] }
    ],
    build(host) {
      const lab = this;
      let eq = lab.eqs[0];
      const st = { C: 1 };
      const area = h('div');
      const p = DT.plotBox({ xlabel: 'x', ylabel: 'y' });
      const cs = slider({ key: 'C', label: L('$C$', '$C$', '$C$'), min: -3, max: 3, step: 0.1 }, st, () => draw());
      const draw = () => {
        const [xmin, xmax, ymin, ymax] = eq.box; p.setView({ xmin, xmax, ymin, ymax }); p.clear(); p.axes();
        [-2, -1, -0.5, 0.5, 1, 2].forEach(c => p.fn(x => eq.sol(x, c), { color: css('--ink-3'), width: 1 }));
        p.fn(x => eq.sol(x, st.C), { color: C1(), width: 2.6 });
        eq.constSol.forEach(c => p.fn(() => c, { color: C2(), width: 2.2, dash: [6, 4] }));
        p.legend([{ color: C1(), label: 'C = ' + fmt(st.C, 1) }, { color: C2(), dash: 'dash', label: { uz: 'doimiy yechim(lar)', ru: 'постоянные решения', en: 'constant solution(s)' }[DT.lang()] }]);
        p.caption(t('textDescription') + ': ' + eq.label + '. ' + { uz: 'Kulrang — boshqa C qiymatlari.', ru: 'Серые — другие значения C.', en: 'Grey: other values of C.' }[DT.lang()]);
      };
      p.onResize = draw;
      const runSteps = () => {
        area.innerHTML = '';
        const ex = { id: 'lab.L02.' + eq.key, type: 'steps', q: L(eq.label, eq.label, eq.label), steps: eq.steps.map(s => ({ q: s.q, options: s.o, correct: s.c })), explain: lab.expected };
        area.appendChild(DT.renderExercise(ex, { mode: 'learn', topicId: 't02', showHead: false }));
      };
      host.ctrl.appendChild(select(t('equation'), lab.eqs.map(e => ({ value: e.key, label: e.label })), eq.key, v => { eq = lab.eqs.find(e => e.key === v); runSteps(); draw(); }));
      host.ctrl.appendChild(area);
      host.ctrl.appendChild(cs);
      host.plot.appendChild(p.el);
      host.reset = () => { st.C = 1; cs._set(1); runSteps(); draw(); };
      runSteps(); draw();
    },
    thumb(cv) { thumbFns(cv, [x => Math.exp(x * x / 2), x => -Math.exp(x * x / 2), x => 0.4 * Math.exp(x * x / 2)], [-2, 2, -4, 4]); }
  });

  /* ======================= L03 Method chooser ======================= */
  const METHODS = {
    sep: L('O‘zgaruvchilari ajraladigan', 'С разделяющимися переменными', 'Separable'),
    hom: L('Bir jinsli ($y=ux$)', 'Однородное ($y=ux$)', 'Homogeneous ($y=ux$)'),
    lin: L('Chiziqli (integrallovchi ko‘paytuvchi)', 'Линейное (интегрирующий множитель)', 'Linear (integrating factor)'),
    ber: L('Bernulli ($z=y^{1-n}$)', 'Бернулли ($z=y^{1-n}$)', 'Bernoulli ($z=y^{1-n}$)'),
    exa: L('To‘la differensialli', 'В полных дифференциалах', 'Exact'),
    ric: L('Rikkati (xususiy yechim ma’lum bo‘lsa)', 'Риккати (если известно частное решение)', 'Riccati (if a particular solution is known)'),
    cla: L('Klero / Lagranj (parametr kiritish)', 'Клеро / Лагранж (введение параметра)', 'Clairaut / Lagrange (parameter)')
  };
  DT.METHODS = METHODS;
  LABS.push({
    id: 'L03', topics: ['t02', 't03', 't04', 't05'],
    title: L('Birinchi tartibli tenglama uchun usul tanlash', 'Выбор метода для уравнения первого порядка', 'Choosing a method for a first-order equation'),
    goal: L('Tenglama ko‘rinishiga qarab mos usulni tanib olish.', 'Узнавать подходящий метод по виду уравнения.', 'Recognise the right method from the form of the equation.'),
    howto: L('Tenglamani o‘qing va usulni tanlang. Javobdan keyin sabab ko‘rsatiladi. Ba’zi tenglamalarga bir nechta usul to‘g‘ri keladi.', 'Прочитайте уравнение и выберите метод. После ответа показывается причина. Некоторым уравнениям подходят несколько методов.', 'Read the equation and choose a method. The reason is shown after you answer. Some equations admit several methods.'),
    model: L('Bu tanib olish mashqi; tenglamalar oldindan tekshirilgan. Universal avtomatik yechuvchi emas.', 'Это упражнение на распознавание; уравнения заранее проверены. Это не универсальный решатель.', 'A recognition exercise with pre-checked equations. Not a universal solver.'),
    observe: L('Qaysi belgilar usulni tez aniqlashga yordam berdi?', 'Какие признаки помогли быстро определить метод?', 'Which features helped you identify the method quickly?'),
    expected: L('$f(x)g(y)$ ko‘paytma — ajratish; $f(y/x)$ — bir jinsli; $y$ va $y\'$ birinchi darajada — chiziqli; $y^n$ qo‘shimcha had — Bernulli; $M_y=N_x$ — to‘la differensial; $y=xy\'+\\psi(y\')$ — Klero.', 'Произведение $f(x)g(y)$ — разделение; $f(y/x)$ — однородное; $y$ и $y\'$ в первой степени — линейное; добавочный член $y^n$ — Бернулли; $M_y=N_x$ — полный дифференциал; $y=xy\'+\\psi(y\')$ — Клеро.', 'A product $f(x)g(y)$: separable; $f(y/x)$: homogeneous; $y$ and $y\'$ to the first power: linear; an extra $y^n$ term: Bernoulli; $M_y=N_x$: exact; $y=xy\'+\\psi(y\')$: Clairaut.'),
    items: [
      { eq: "y' = e^{x}\\cos^2 y", ok: ['sep'], why: L('O‘ng tomon $e^x\\cdot\\cos^2y$ — $x$ va $y$ funksiyalari ko‘paytmasi.', 'Правая часть $e^x\\cdot\\cos^2y$ — произведение функций от $x$ и от $y$.', 'The right side $e^x\\cdot\\cos^2y$ is a product of a function of $x$ and a function of $y$.') },
      { eq: "y' = \\dfrac{x^2+y^2}{xy}", ok: ['hom'], why: L('$\\dfrac{x^2+y^2}{xy}=\\dfrac{x}{y}+\\dfrac{y}{x}$ — faqat $y/x$ ga bog‘liq.', '$\\dfrac{x^2+y^2}{xy}=\\dfrac{x}{y}+\\dfrac{y}{x}$ зависит только от $y/x$.', '$\\dfrac{x^2+y^2}{xy}=\\dfrac{x}{y}+\\dfrac{y}{x}$ depends only on $y/x$.') },
      { eq: "y' + \\dfrac{2}{x}y = x^3", ok: ['lin'], why: L('$y\'+p(x)y=q(x)$ ko‘rinishi.', 'Вид $y\'+p(x)y=q(x)$.', 'The form $y\'+p(x)y=q(x)$.') },
      { eq: "y' - y = x\\,y^3", ok: ['ber'], why: L('$y\'+p(x)y=q(x)y^n$, $n=3$.', '$y\'+p(x)y=q(x)y^n$, $n=3$.', '$y\'+p(x)y=q(x)y^n$ with $n=3$.') },
      { eq: "(2xy+1)\\,dx + (x^2+3y^2)\\,dy = 0", ok: ['exa'], why: L('$M_y=2x=N_x$.', '$M_y=2x=N_x$.', '$M_y=2x=N_x$.') },
      { eq: "y' = y^2 - \\dfrac{2}{x^2}", ok: ['ric'], why: L('$y\'=P y^2+Qy+R$; xususiy yechim $y=-1/x$ (tekshiring). Almashtirish $y=-1/x+1/z$.', '$y\'=P y^2+Qy+R$; частное решение $y=-1/x$ (проверьте). Замена $y=-1/x+1/z$.', '$y\'=Py^2+Qy+R$; a particular solution is $y=-1/x$ (check it). Substitute $y=-1/x+1/z$.') },
      { eq: "y = x\\,y' + (y')^2", ok: ['cla'], why: L('$y=xp+\\psi(p)$ — Klero tenglamasi; $y\'=p$ parametr kiritiladi.', '$y=xp+\\psi(p)$ — уравнение Клеро; вводим параметр $y\'=p$.', '$y=xp+\\psi(p)$ is Clairaut’s equation; introduce $p=y\'$.') },
      { eq: "y' = \\dfrac{y}{x} + x", ok: ['lin'], why: L('$y\'-\\dfrac1x y=x$ — chiziqli. ($y/x$ bor, lekin $+x$ hadi bir jinslilikni buzadi.)', '$y\'-\\dfrac1x y=x$ — линейное. (Есть $y/x$, но член $+x$ нарушает однородность.)', '$y\'-\\dfrac1x y=x$ is linear. (It contains $y/x$, but the $+x$ term breaks homogeneity.)') },
      { eq: "y' = \\dfrac{y}{x}", ok: ['sep', 'hom', 'lin'], why: L('Uchala usul ham to‘g‘ri: $\\dfrac{dy}{y}=\\dfrac{dx}{x}$, $f(y/x)=y/x$, yoki $y\'-\\dfrac1x y=0$.', 'Подходят все три: $\\dfrac{dy}{y}=\\dfrac{dx}{x}$, $f(y/x)=y/x$ или $y\'-\\dfrac1x y=0$.', 'All three work: $\\dfrac{dy}{y}=\\dfrac{dx}{x}$, $f(y/x)=y/x$, or $y\'-\\dfrac1x y=0$.') }
    ],
    build(host) {
      const lab = this; let k = 0, score = 0;
      const box = h('div');
      const draw = () => {
        box.innerHTML = '';
        if (k >= lab.items.length) { box.appendChild(h('div', { class: 'panel' }, h('h3', { text: t('quizResult') + ': ' + score + ' / ' + lab.items.length }), h('a', { class: 'btn', href: '#/chooser', html: DT.icon('compass') + DT.esc(t('methodChooser')) }))); return; }
        const it = lab.items[k];
        box.appendChild(h('div', { class: 'small muted', text: (k + 1) + ' / ' + lab.items.length }));
        box.appendChild(h('div', { class: 'math-display', html: DT.katexStr(it.eq, true) }));
        const fb = h('div');
        Object.keys(METHODS).forEach(m => box.appendChild(h('button', { class: 'opt', html: '<span>' + DT.inline(tx(METHODS[m])) + '</span>', onclick: e => {
          if (fb.dataset.done) return; fb.dataset.done = '1';
          const ok = it.ok.includes(m); if (ok) score++;
          e.currentTarget.classList.add(ok ? 'correct' : 'wrong');
          fb.appendChild(h('div', { class: 'feedback ' + (ok ? 'ok' : 'bad'), html: '<div class="fb-title">' + DT.esc(ok ? t('correct') : t('incorrect')) + '</div><p>' + DT.inline(tx(it.why)) + '</p>' }));
          fb.appendChild(h('button', { class: 'btn primary small', text: t('nextLesson').split(' ')[0] === 'Keyingi' ? 'Keyingi' : (DT.lang() === 'ru' ? 'Далее' : 'Next'), onclick: () => { k++; draw(); } }));
        } })));
        box.appendChild(fb);
      };
      host.ctrl.appendChild(box); host.plot.remove();
      host.reset = () => { k = 0; score = 0; draw(); };
      draw();
    },
    thumb(cv) { thumbText(cv, '?'); }
  });

  /* ======================= L04 Exponential vs logistic ======================= */
  LABS.push({
    id: 'L04', topics: ['t02', 't04'],
    title: L('Eksponensial va logistik o‘sish', 'Экспоненциальный и логистический рост', 'Exponential vs logistic growth'),
    goal: L('Ikki modelni solishtirish: cheksiz o‘sish va sig‘im bilan chegaralangan o‘sish.', 'Сравнить две модели: неограниченный рост и рост, ограниченный ёмкостью.', 'Compare unlimited growth with growth limited by a carrying capacity.'),
    howto: L('$P_0$, $r$ va $K$ ni o‘zgartiring. Masalan, $P(t)$ — tarmoqda zararlangan kompyuterlar soni, $K$ — jami kompyuterlar.', 'Меняйте $P_0$, $r$ и $K$. Например, $P(t)$ — число заражённых компьютеров в сети, $K$ — всего компьютеров.', 'Vary $P_0$, $r$ and $K$. For instance $P(t)$ = infected computers in a network, $K$ = all computers.'),
    model: L('$P\'=rP\\Rightarrow P=P_0e^{rt}$; $P\'=rP(1-P/K)\\Rightarrow P=\\dfrac{K}{1+\\left(\\frac{K}{P_0}-1\\right)e^{-rt}}$. Analitik formulalar. Cheklov: real tarmoqlarda tuzalish, qayta ulanish va tasodifiylik hisobga olinmagan.', '$P\'=rP\\Rightarrow P=P_0e^{rt}$; $P\'=rP(1-P/K)\\Rightarrow P=\\dfrac{K}{1+\\left(\\frac{K}{P_0}-1\\right)e^{-rt}}$. Аналитические формулы. Ограничение: не учитываются лечение, переподключение и случайность.', '$P\'=rP\\Rightarrow P=P_0e^{rt}$; $P\'=rP(1-P/K)\\Rightarrow P=\\dfrac{K}{1+\\left(\\frac{K}{P_0}-1\\right)e^{-rt}}$. Analytic formulas. Limitation: recovery, reconnection and randomness are ignored.'),
    observe: L('Logistik egri chiziq qayerda eng tez o‘sadi? Boshida ikki model qanday farq qiladi?', 'Где логистическая кривая растёт быстрее всего? Чем модели различаются в начале?', 'Where does the logistic curve grow fastest? How do the models differ at the start?'),
    expected: L('Eng katta tezlik $P=K/2$ da (burilish nuqtasi, $t^*=\\frac1r\\ln\\left(\\frac{K}{P_0}-1\\right)$). $P\\ll K$ da ikkala model deyarli bir xil.', 'Наибольшая скорость при $P=K/2$ (точка перегиба, $t^*=\\frac1r\\ln\\left(\\frac{K}{P_0}-1\\right)$). При $P\\ll K$ модели почти совпадают.', 'The fastest growth is at $P=K/2$ (inflection, $t^*=\\frac1r\\ln\\left(\\frac{K}{P_0}-1\\right)$). While $P\\ll K$ the two models almost coincide.'),
    build(host) {
      const st = { P0: 10, r: 0.5, K: 1000, T: 25 };
      const p = DT.plotBox({ xlabel: 't', ylabel: 'P' }); const ro = readout();
      const draw = () => {
        p.setView({ xmin: 0, xmax: st.T, ymin: 0, ymax: st.K * 1.3 }); p.clear(); p.axes();
        p.fn(tt => st.K, { color: css('--ink-3'), width: 1.2, dash: [4, 4] });
        p.fn(tt => st.P0 * Math.exp(st.r * tt), { color: C2(), width: 2.2, dash: [7, 4] });
        const lg = tt => st.K / (1 + (st.K / st.P0 - 1) * Math.exp(-st.r * tt));
        p.fn(lg, { color: C1(), width: 2.6 });
        const ts = st.P0 < st.K ? Math.log(st.K / st.P0 - 1) / st.r : NaN;
        if (isFinite(ts) && ts > 0) p.dot(ts, st.K / 2, { color: C1() });
        p.legend([{ color: C1(), label: { uz: 'logistik', ru: 'логистическая', en: 'logistic' }[DT.lang()] }, { color: C2(), dash: 'dash', label: { uz: 'eksponensial', ru: 'экспоненциальная', en: 'exponential' }[DT.lang()] }, { color: css('--ink-3'), dash: 'dash', label: 'K' }]);
        ro.textContent = `t* (P = K/2) = ${fmt(ts, 2)};  T₂ = ln2 / r = ${fmt(Math.log(2) / st.r, 2)};  P_log(${st.T}) = ${fmt(lg(st.T), 1)};  P_exp(${st.T}) = ${fmt(st.P0 * Math.exp(st.r * st.T), 0)}`;
        p.caption(t('textDescription') + ': ' + { uz: `P₀=${st.P0}, r=${st.r}, K=${st.K}. Logistik egri chiziq K ga yaqinlashadi, eksponensial cheksiz o‘sadi.`, ru: `P₀=${st.P0}, r=${st.r}, K=${st.K}. Логистическая кривая приближается к K, экспоненциальная растёт неограниченно.`, en: `P₀=${st.P0}, r=${st.r}, K=${st.K}. The logistic curve approaches K; the exponential grows without bound.` }[DT.lang()]);
      };
      p.onResize = draw;
      const sl = [slider({ key: 'P0', label: L('$P_0$ (boshlang‘ich)', '$P_0$ (начальное)', '$P_0$ (initial)'), min: 1, max: 500, step: 1 }, st, draw),
        slider({ key: 'r', label: L('$r$ (o‘sish koeffitsiyenti)', '$r$ (коэффициент роста)', '$r$ (growth rate)'), min: 0.05, max: 2, step: 0.05 }, st, draw),
        slider({ key: 'K', label: L('$K$ (sig‘im)', '$K$ (ёмкость)', '$K$ (capacity)'), min: 100, max: 5000, step: 50 }, st, draw),
        slider({ key: 'T', label: L('Vaqt oralig‘i', 'Интервал времени', 'Time window'), min: 5, max: 60, step: 1 }, st, draw)];
      sl.forEach(s => host.ctrl.appendChild(s)); host.ctrl.appendChild(ro); host.plot.appendChild(p.el);
      host.reset = () => { Object.assign(st, { P0: 10, r: 0.5, K: 1000, T: 25 }); sl[0]._set(10); sl[1]._set(0.5); sl[2]._set(1000); sl[3]._set(25); draw(); };
      draw();
    },
    thumb(cv) { thumbFns(cv, [x => 1 / (1 + 30 * Math.exp(-x)), x => Math.exp(x) / 31], [0, 8, 0, 1.3]); }
  });

  /* ======================= L05 Characteristic roots ======================= */
  LABS.push({
    id: 'L05', topics: ['t08'],
    title: L('Xarakteristik ildizlar va yechim ko‘rinishi', 'Характеристические корни и вид решения', 'Characteristic roots and the shape of solutions'),
    goal: L('$ay\'\'+by\'+cy=0$ tenglamada ildizlar joylashuvi yechim xatti-harakatini qanday belgilashini ko‘rish.', 'Увидеть, как расположение корней определяет поведение решений $ay\'\'+by\'+cy=0$.', 'See how the roots determine the behaviour of solutions of $ay\'\'+by\'+cy=0$.'),
    howto: L('$a, b, c$ va boshlang‘ich shartlarni o‘zgartiring. Chapda ildizlar kompleks tekislikda, o‘ngda Koshi masalasining yechimi.', 'Меняйте $a, b, c$ и начальные условия. Слева корни на комплексной плоскости, справа решение задачи Коши.', 'Vary $a, b, c$ and the initial data. Left: roots in the complex plane; right: the solution of the IVP.'),
    model: L('Ildizlar $ar^2+br+c=0$ dan. Yechim: har xil haqiqiy ildizlar $C_1e^{r_1t}+C_2e^{r_2t}$; karrali $(C_1+C_2t)e^{rt}$; kompleks $e^{\\alpha t}(C_1\\cos\\beta t+C_2\\sin\\beta t)$. $C_1, C_2$ boshlang‘ich shartlardan analitik topiladi.', 'Корни $ar^2+br+c=0$. Решение: различные вещественные $C_1e^{r_1t}+C_2e^{r_2t}$; кратный $(C_1+C_2t)e^{rt}$; комплексные $e^{\\alpha t}(C_1\\cos\\beta t+C_2\\sin\\beta t)$. $C_1, C_2$ находятся аналитически из начальных условий.', 'Roots of $ar^2+br+c=0$. Solution: distinct real $C_1e^{r_1t}+C_2e^{r_2t}$; double $(C_1+C_2t)e^{rt}$; complex $e^{\\alpha t}(C_1\\cos\\beta t+C_2\\sin\\beta t)$. $C_1, C_2$ come analytically from the initial data.'),
    observe: L('Ildizlar mavhum o‘qning qaysi tomonida bo‘lsa, yechim so‘nadi? Qachon tebranish paydo bo‘ladi?', 'С какой стороны мнимой оси должны лежать корни, чтобы решение затухало? Когда появляются колебания?', 'On which side of the imaginary axis must the roots be for decay? When do oscillations appear?'),
    expected: L('Ikkala ildizning haqiqiy qismi manfiy bo‘lsa, yechim nolga intiladi. Ildizlar kompleks ($b^2<4ac$) bo‘lsa, tebranish bor; chastota $\\beta$, so‘nish $e^{\\alpha t}$.', 'Если вещественные части обоих корней отрицательны, решение стремится к нулю. При комплексных корнях ($b^2<4ac$) есть колебания с частотой $\\beta$ и множителем $e^{\\alpha t}$.', 'If both roots have negative real part the solution tends to zero. Complex roots ($b^2<4ac$) give oscillation with frequency $\\beta$ and envelope $e^{\\alpha t}$.'),
    build(host) {
      const st = { a: 1, b: 0.5, c: 4, y0: 1, v0: 0 };
      const pr = DT.plotBox({ xlabel: 'Re r', ylabel: 'Im r', aspect: 0.7 });
      const ps = DT.plotBox({ xlabel: 't', ylabel: 'y' });
      const ro = readout();
      const sol = () => {
        const { a, b, c, y0, v0 } = st; const q = DT.ODE.quadRoots(a, b, c);
        if (q.type === 'real') { const C2 = (v0 - q.r1 * y0) / (q.r2 - q.r1), C1 = y0 - C2; return { q, f: tt => C1 * Math.exp(q.r1 * tt) + C2 * Math.exp(q.r2 * tt), txt: `y = ${fmt(C1)}·e^(${fmt(q.r1)}t) + ${fmt(C2)}·e^(${fmt(q.r2)}t)` }; }
        if (q.type === 'double') { const C1 = y0, C2 = v0 - q.r * y0; return { q, f: tt => (C1 + C2 * tt) * Math.exp(q.r * tt), txt: `y = (${fmt(C1)} + ${fmt(C2)}t)·e^(${fmt(q.r)}t)` }; }
        const C1 = y0, C2 = (v0 - q.alpha * y0) / q.beta; return { q, f: tt => Math.exp(q.alpha * tt) * (C1 * Math.cos(q.beta * tt) + C2 * Math.sin(q.beta * tt)), txt: `y = e^(${fmt(q.alpha)}t)·(${fmt(C1)}cos ${fmt(q.beta)}t + ${fmt(C2)}sin ${fmt(q.beta)}t)` };
      };
      const draw = () => {
        if (Math.abs(st.a) < 1e-9) { ro.textContent = 'a ≠ 0'; return; }
        const S = sol(), q = S.q;
        const pts = q.type === 'real' ? [[q.r1, 0], [q.r2, 0]] : q.type === 'double' ? [[q.r, 0]] : [[q.alpha, q.beta], [q.alpha, -q.beta]];
        const M = Math.max(3, ...pts.map(p => Math.max(Math.abs(p[0]), Math.abs(p[1]))) ) * 1.2;
        pr.setView({ xmin: -M, xmax: M, ymin: -M * .7, ymax: M * .7 }); pr.clear(); pr.axes();
        pr.ctx.fillStyle = css('--moss-soft'); const b = pr.box(); pr.ctx.globalAlpha = .5; pr.ctx.fillRect(b.x0, b.y0, pr.X(0) - b.x0, b.y1 - b.y0); pr.ctx.globalAlpha = 1;
        pts.forEach(p => pr.dot(p[0], p[1], { color: C2(), r: 6 }));
        if (q.type === 'double') pr.text(q.r, 0, '×2', { dx: 8, dy: -6 });
        pr.caption({ uz: 'Yashil soha: Re r < 0 (so‘nish).', ru: 'Зелёная область: Re r < 0 (затухание).', en: 'Green region: Re r < 0 (decay).' }[DT.lang()]);
        const ymax = Math.max(1.5, Math.abs(st.y0) * 1.6, ...Array.from({ length: 60 }, (_, i) => Math.abs(S.f(i * 0.1)))) ;
        const yl = Math.min(ymax, 12);
        ps.setView({ xmin: 0, xmax: 12, ymin: -yl, ymax: yl }); ps.clear(); ps.axes();
        if (q.type === 'complex' && Math.abs(st.y0) + Math.abs(st.v0) > 0) { const A = Math.hypot(st.y0, (st.v0 - q.alpha * st.y0) / q.beta); ps.fn(tt => A * Math.exp(q.alpha * tt), { color: css('--ink-3'), width: 1, dash: [4, 4] }); ps.fn(tt => -A * Math.exp(q.alpha * tt), { color: css('--ink-3'), width: 1, dash: [4, 4] }); }
        ps.fn(S.f, { color: C1(), width: 2.6 });
        const kind = { real: { uz: 'ikki xil haqiqiy ildiz', ru: 'два различных вещественных корня', en: 'two distinct real roots' }, double: { uz: 'karrali ildiz', ru: 'кратный корень', en: 'a double root' }, complex: { uz: 'kompleks qo‘shma ildizlar', ru: 'комплексно-сопряжённые корни', en: 'complex conjugate roots' } }[q.type][DT.lang()];
        ro.textContent = `D = b² − 4ac = ${fmt(q.D)} → ${kind}\n${S.txt}`;
        ps.caption(t('textDescription') + ': ' + kind + '. ' + S.txt);
      };
      pr.onResize = draw; ps.onResize = draw;
      const sl = [slider({ key: 'a', label: L('$a$', '$a$', '$a$'), min: 0.2, max: 3, step: 0.1 }, st, draw), slider({ key: 'b', label: L('$b$', '$b$', '$b$'), min: -3, max: 6, step: 0.1 }, st, draw), slider({ key: 'c', label: L('$c$', '$c$', '$c$'), min: -4, max: 10, step: 0.1 }, st, draw), slider({ key: 'y0', label: L('$y(0)$', '$y(0)$', '$y(0)$'), min: -2, max: 2, step: 0.1 }, st, draw), slider({ key: 'v0', label: L('$y\'(0)$', '$y\'(0)$', '$y\'(0)$'), min: -3, max: 3, step: 0.1 }, st, draw)];
      sl.forEach(s => host.ctrl.appendChild(s)); host.ctrl.appendChild(ro);
      host.plot.appendChild(pr.el); host.plot.appendChild(ps.el);
      host.reset = () => { const d = { a: 1, b: 0.5, c: 4, y0: 1, v0: 0 }; Object.assign(st, d); sl.forEach(s => s._set(d[Object.keys(d)[sl.indexOf(s)]])); draw(); };
      draw();
    },
    thumb(cv) { thumbFns(cv, [x => Math.exp(-0.3 * x) * Math.cos(2 * x)], [0, 10, -1.2, 1.2]); }
  });

  /* ======================= L06 Damped & forced oscillations ======================= */
  LABS.push({
    id: 'L06', topics: ['t08', 't09', 't13'],
    title: L('So‘nuvchi va majburiy tebranishlar', 'Затухающие и вынужденные колебания', 'Damped and forced oscillations'),
    goal: L('$mx\'\'+cx\'+kx=F_0\\cos\\omega t$ modelida so‘nish va rezonansni o‘rganish.', 'Изучить затухание и резонанс в модели $mx\'\'+cx\'+kx=F_0\\cos\\omega t$.', 'Explore damping and resonance in $mx\'\'+cx\'+kx=F_0\\cos\\omega t$.'),
    howto: L('Parametrlarni o‘zgartiring. Yuqorida $x(t)$, pastda barqaror tebranish amplitudasi $A(\\omega)$; nuqta — joriy $\\omega$. Xuddi shu tenglama RLC zanjirini ham tasvirlaydi: $L q\'\'+Rq\'+q/C=E(t)$.', 'Меняйте параметры. Сверху $x(t)$, снизу амплитуда установившихся колебаний $A(\\omega)$; точка — текущая $\\omega$. Это же уравнение описывает RLC-цепь: $L q\'\'+Rq\'+q/C=E(t)$.', 'Change the parameters. Top: $x(t)$; bottom: the steady-state amplitude $A(\\omega)$, the dot marks the current $\\omega$. The same equation describes an RLC circuit: $Lq\'\'+Rq\'+q/C=E(t)$.'),
    model: L('$x(t)$ — RK4 (qadam 0,01), $x(0)=x_0$, $x\'(0)=0$. Amplituda: $A(\\omega)=\\dfrac{F_0}{\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}}$ (analitik). $c=0$ va $\\omega=\\sqrt{k/m}$ da amplituda chiziqli o‘sadi (rezonans).', '$x(t)$ — RK4 (шаг 0,01), $x(0)=x_0$, $x\'(0)=0$. Амплитуда: $A(\\omega)=\\dfrac{F_0}{\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}}$ (аналитически). При $c=0$ и $\\omega=\\sqrt{k/m}$ амплитуда растёт линейно (резонанс).', '$x(t)$ by RK4 (step 0.01), $x(0)=x_0$, $x\'(0)=0$. Amplitude: $A(\\omega)=\\dfrac{F_0}{\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}}$ (analytic). With $c=0$ and $\\omega=\\sqrt{k/m}$ the amplitude grows linearly (resonance).'),
    observe: L('$c$ ni kamaytirib, $\\omega$ ni $\\omega_0=\\sqrt{k/m}$ ga yaqinlashtiring. Nima bo‘ladi?', 'Уменьшайте $c$ и приближайте $\\omega$ к $\\omega_0=\\sqrt{k/m}$. Что происходит?', 'Decrease $c$ and move $\\omega$ towards $\\omega_0=\\sqrt{k/m}$. What happens?'),
    expected: L('Kichik so‘nishda $\\omega\\approx\\omega_0$ da amplituda keskin oshadi (rezonans cho‘qqisi). $c=0$ da aniq rezonansda yechim $t\\sin\\omega_0t$ kabi cheksiz o‘sadi.', 'При малом затухании амплитуда резко растёт при $\\omega\\approx\\omega_0$ (резонансный пик). При $c=0$ и точном резонансе решение растёт как $t\\sin\\omega_0t$.', 'With small damping the amplitude peaks sharply near $\\omega\\approx\\omega_0$. With $c=0$ at exact resonance the solution grows like $t\\sin\\omega_0t$.'),
    build(host) {
      const st = { m: 1, c: 0.3, k: 4, F0: 1, w: 1.5, x0: 0 };
      const p1 = DT.plotBox({ xlabel: 't', ylabel: 'x' }), p2 = DT.plotBox({ xlabel: 'ω', ylabel: 'A', aspect: .5 }); const ro = readout();
      const draw = () => {
        const { m, c, k, F0, w, x0 } = st;
        const f = (tt, u) => [u[1], (F0 * Math.cos(w * tt) - c * u[1] - k * u[0]) / m];
        const S = DT.ODE.solve('rk4', f, 0, [x0, 0], 40, 4000);
        const pts = S.xs.map((x, i) => [x, S.ys[i][0]]);
        const M = Math.max(0.5, ...pts.map(p => Math.abs(p[1]))) * 1.15;
        p1.setView({ xmin: 0, xmax: 40, ymin: -M, ymax: M }); p1.clear(); p1.axes(); p1.line(pts, { color: C1(), width: 1.8 });
        const w0 = Math.sqrt(k / m), A = om => F0 / Math.sqrt((k - m * om * om) ** 2 + (c * om) ** 2);
        const zeta = c / (2 * Math.sqrt(k * m));
        const Amax = Math.min(50, Math.max(...Array.from({ length: 300 }, (_, i) => A(0.01 + i * 4 * w0 / 300))));
        p2.setView({ xmin: 0, xmax: 3 * w0, ymin: 0, ymax: Math.max(A(w), Math.min(Amax, 30)) * 1.15 }); p2.clear(); p2.axes();
        p2.fn(A, { color: C3(), width: 2.2 }); p2.dot(w, Math.min(A(w), 1e6), { color: C2() });
        const regime = c === 0 ? { uz: 'so‘nishsiz', ru: 'без затухания', en: 'undamped' } : zeta < 1 ? { uz: 'kuchsiz so‘nish (tebranma)', ru: 'слабое затухание (колебательное)', en: 'underdamped' } : Math.abs(zeta - 1) < 1e-9 ? { uz: 'kritik so‘nish', ru: 'критическое затухание', en: 'critically damped' } : { uz: 'kuchli so‘nish', ru: 'сильное затухание', en: 'overdamped' };
        ro.textContent = `ω₀ = √(k/m) = ${fmt(w0)};  ζ = c / (2√(km)) = ${fmt(zeta)} → ${regime[DT.lang()]};  A(ω) = ${fmt(A(w))}`;
        p1.caption(t('textDescription') + ': x(t), ' + regime[DT.lang()] + ', ω = ' + w);
        p2.caption({ uz: 'Barqaror tebranish amplitudasi chastotaga bog‘liq.', ru: 'Амплитуда установившихся колебаний в зависимости от частоты.', en: 'Steady-state amplitude as a function of driving frequency.' }[DT.lang()]);
      };
      p1.onResize = draw; p2.onResize = draw;
      const defs = { m: 1, c: 0.3, k: 4, F0: 1, w: 1.5, x0: 0 };
      const sl = [['m', L('$m$ (massa)', '$m$ (масса)', '$m$ (mass)'), 0.2, 5, 0.1], ['c', L('$c$ (so‘nish)', '$c$ (затухание)', '$c$ (damping)'), 0, 5, 0.05], ['k', L('$k$ (bikrlik)', '$k$ (жёсткость)', '$k$ (stiffness)'), 0.2, 20, 0.1], ['F0', L('$F_0$ (tashqi kuch)', '$F_0$ (внешняя сила)', '$F_0$ (forcing)'), 0, 3, 0.1], ['w', L('$\\omega$ (chastota)', '$\\omega$ (частота)', '$\\omega$ (frequency)'), 0.1, 6, 0.05], ['x0', L('$x(0)$', '$x(0)$', '$x(0)$'), -2, 2, 0.1]].map(([key, label, min, max, step]) => slider({ key, label, min, max, step }, st, draw));
      sl.forEach(s => host.ctrl.appendChild(s)); host.ctrl.appendChild(ro);
      host.plot.appendChild(p1.el); host.plot.appendChild(p2.el);
      host.reset = () => { Object.assign(st, defs); sl.forEach((s, i) => s._set(defs[Object.keys(defs)[i]])); draw(); };
      draw();
    },
    thumb(cv) { thumbFns(cv, [x => x * Math.sin(2 * x) / 10], [0, 12, -1.3, 1.3]); }
  });

  /* ======================= L07 Euler / Heun / RK4 ======================= */
  LABS.push({
    id: 'L07', topics: ['t11'],
    title: L('Eyler, takomillashtirilgan Eyler va RK4', 'Эйлер, улучшенный Эйлер и RK4', 'Euler, improved Euler and RK4'),
    goal: L('Sonli usullarni aniq yechim bilan solishtirish, qadam va xato orasidagi bog‘lanishni ko‘rish.', 'Сравнить численные методы с точным решением и увидеть связь шага и погрешности.', 'Compare numerical methods with the exact solution and see how the error depends on the step.'),
    howto: L('Masala va qadam $h$ ni tanlang. Jadvalda oxirgi nuqtadagi xatolar va $h$ ni ikki marta kamaytirgandagi xatolar nisbati.', 'Выберите задачу и шаг $h$. В таблице — погрешности в конечной точке и их отношение при уменьшении $h$ вдвое.', 'Choose a problem and a step $h$. The table shows the errors at the end point and their ratio when $h$ is halved.'),
    model: L('Eyler: $y_{k+1}=y_k+hf_k$ (1-tartib). Heun: $y_{k+1}=y_k+\\frac h2(k_1+k_2)$ (2-tartib). RK4: 4-tartib. Xato nisbati $\\approx 2^p$, $p$ — usul tartibi. Cheklov: o‘zgarmas qadam; $y\'=-15y$ misolida Eyler $h>2/15$ da beqaror.', 'Эйлер: $y_{k+1}=y_k+hf_k$ (1-й порядок). Хойн: $y_{k+1}=y_k+\\frac h2(k_1+k_2)$ (2-й порядок). RK4: 4-й порядок. Отношение погрешностей $\\approx 2^p$, $p$ — порядок метода. Ограничение: постоянный шаг; в примере $y\'=-15y$ метод Эйлера неустойчив при $h>2/15$.', 'Euler: $y_{k+1}=y_k+hf_k$ (order 1). Heun: $y_{k+1}=y_k+\\frac h2(k_1+k_2)$ (order 2). RK4: order 4. Error ratio $\\approx 2^p$ where $p$ is the order. Limitation: fixed step; for $y\'=-15y$ Euler is unstable when $h>2/15$.'),
    observe: L('$h$ ni ikki marta kamaytirganda har bir usul xatosi necha marta kamayadi?', 'Во сколько раз уменьшается погрешность каждого метода при уменьшении $h$ вдвое?', 'By what factor does each method’s error shrink when $h$ is halved?'),
    expected: L('Taxminan 2, 4 va 16 marta — usullarning tartibi 1, 2 va 4.', 'Примерно в 2, 4 и 16 раз — порядки методов 1, 2 и 4.', 'About 2, 4 and 16 times: the methods have order 1, 2 and 4.'),
    probs: [
      { key: 'exp', label: "y' = y, y(0) = 1, [0, 2]", f: (x, y) => y, ex: x => Math.exp(x), x0: 0, y0: 1, x1: 2 },
      { key: 'gauss', label: "y' = −2xy, y(0) = 1, [0, 2]", f: (x, y) => -2 * x * y, ex: x => Math.exp(-x * x), x0: 0, y0: 1, x1: 2 },
      { key: 'lin', label: "y' = x + y, y(0) = 0, [0, 1]", f: (x, y) => x + y, ex: x => Math.exp(x) - x - 1, x0: 0, y0: 0, x1: 1 },
      { key: 'stiff', label: "y' = −15y, y(0) = 1, [0, 1]", f: (x, y) => -15 * y, ex: x => Math.exp(-15 * x), x0: 0, y0: 1, x1: 1 }
    ],
    build(host) {
      const lab = this; let pb = lab.probs[0]; const st = { h: 0.25 };
      const p = DT.plotBox({ xlabel: 'x', ylabel: 'y' }); const tb = h('div', { class: 'table-scroll' });
      const draw = () => {
        const n = Math.max(1, Math.round((pb.x1 - pb.x0) / st.h));
        const res = ['euler', 'heun', 'rk4'].map(m => DT.ODE.solve(m, pb.f, pb.x0, pb.y0, pb.x1, n));
        const res2 = ['euler', 'heun', 'rk4'].map(m => DT.ODE.solve(m, pb.f, pb.x0, pb.y0, pb.x1, 2 * n));
        const ys = res.flatMap(r => r.ys).concat([pb.ex(pb.x0), pb.ex(pb.x1)]).filter(isFinite);
        let lo = Math.min(...ys), hi = Math.max(...ys); if (hi - lo < 1e-6) { hi += 1; lo -= 1; }
        lo = Math.max(lo, -5); hi = Math.min(hi, 10);
        p.setView({ xmin: pb.x0, xmax: pb.x1, ymin: lo - .1 * (hi - lo), ymax: hi + .1 * (hi - lo) }); p.clear(); p.axes();
        p.fn(pb.ex, { color: css('--ink'), width: 2.4 });
        const cols = [C2(), C4(), C3()], dashes = [[6, 4], [3, 3], []];
        res.forEach((r, i) => { p.line(r.xs.map((x, k) => [x, r.ys[k]]), { color: cols[i], width: 1.8, dash: dashes[i] }); r.xs.forEach((x, k) => { if (r.xs.length < 60) p.dot(x, r.ys[k], { color: cols[i], r: 2.6 }); }); });
        p.legend([{ color: css('--ink'), label: { uz: 'aniq', ru: 'точное', en: 'exact' }[DT.lang()] }, { color: cols[0], dash: 'dash', label: { uz: 'Eyler', ru: 'Эйлер', en: 'Euler' }[DT.lang()] }, { color: cols[1], dash: 'dot', label: { uz: 'Heun', ru: 'Хойн', en: 'Heun' }[DT.lang()] }, { color: cols[2], label: 'RK4' }]);
        const exact = pb.ex(pb.x1);
        const names = [{ uz: 'Eyler', ru: 'Эйлер', en: 'Euler' }[DT.lang()], { uz: 'Heun', ru: 'Хойн', en: 'Heun' }[DT.lang()], 'RK4'];
        let html = `<table class="data"><thead><tr><th>${DT.esc({ uz: 'Usul', ru: 'Метод', en: 'Method' }[DT.lang()])}</th><th>y(${pb.x1}), h</th><th>|xato|, h</th><th>|xato|, h/2</th><th>${DT.esc({ uz: 'nisbat', ru: 'отношение', en: 'ratio' }[DT.lang()])}</th></tr></thead><tbody>`;
        res.forEach((r, i) => { const e1 = Math.abs(r.ys[r.ys.length - 1] - exact), e2 = Math.abs(res2[i].ys[res2[i].ys.length - 1] - exact); html += `<tr><td>${names[i]}</td><td>${fmt(r.ys[r.ys.length - 1], 5)}</td><td>${e1.toExponential(1)}</td><td>${e2.toExponential(1)}</td><td>${fmt(e1 / e2, 2)}</td></tr>`; });
        html += `<tr><td>${DT.esc({ uz: 'Aniq', ru: 'Точное', en: 'Exact' }[DT.lang()])}</td><td>${fmt(exact, 5)}</td><td></td><td></td><td></td></tr></tbody></table>`;
        tb.innerHTML = html.replace('|xato|', { uz: '|xato|', ru: '|погр.|', en: '|error|' }[DT.lang()]).replace('|xato|', { uz: '|xato|', ru: '|погр.|', en: '|error|' }[DT.lang()]);
        p.caption(t('textDescription') + ': ' + pb.label + ', h = ' + st.h + ', n = ' + n);
      };
      p.onResize = draw;
      host.ctrl.appendChild(select(t('equation'), lab.probs.map(q => ({ value: q.key, label: q.label })), pb.key, v => { pb = lab.probs.find(q => q.key === v); draw(); }));
      const hs = slider({ key: 'h', label: L('Qadam $h$', 'Шаг $h$', 'Step $h$'), min: 0.025, max: 0.5, step: 0.025 }, st, draw);
      host.ctrl.appendChild(hs);
      host.plot.appendChild(p.el); host.plot.appendChild(tb);
      host.reset = () => { st.h = 0.25; hs._set(0.25); draw(); };
      draw();
    },
    thumb(cv) { thumbFns(cv, [x => Math.exp(x), x => Math.pow(1.25, x / 0.25)], [0, 2, 0, 8]); }
  });

  /* ======================= L08 Phase portrait ======================= */
  const CLS = {
    'saddle': L('egar', 'седло', 'saddle'), 'stable-node': L('turg‘un tugun', 'устойчивый узел', 'stable node'), 'unstable-node': L('noturg‘un tugun', 'неустойчивый узел', 'unstable node'),
    'stable-focus': L('turg‘un fokus', 'устойчивый фокус', 'stable focus (spiral)'), 'unstable-focus': L('noturg‘un fokus', 'неустойчивый фокус', 'unstable focus (spiral)'), 'center': L('markaz', 'центр', 'centre'),
    'stable-degenerate-node': L('turg‘un aynigan tugun', 'устойчивый вырожденный узел', 'stable degenerate node'), 'unstable-degenerate-node': L('noturg‘un aynigan tugun', 'неустойчивый вырожденный узел', 'unstable degenerate node'), 'degenerate': L('aynigan holat ($\\det A=0$)', 'вырожденный случай ($\\det A=0$)', 'degenerate case ($\\det A=0$)')
  };
  LABS.push({
    id: 'L08', topics: ['t12'],
    title: L('Ikki o‘lchamli chiziqli sistema faza portreti', 'Фазовый портрет двумерной линейной системы', 'Phase portrait of a 2D linear system'),
    goal: L('$X\'=AX$ sistemada xos qiymatlar va muvozanat turi orasidagi bog‘lanishni ko‘rish.', 'Увидеть связь собственных значений и типа равновесия в системе $X\'=AX$.', 'Relate eigenvalues to the type of equilibrium for $X\'=AX$.'),
    howto: L('$A$ matritsa elementlarini o‘zgartiring. Grafikka bosib, yangi trayektoriya qo‘shing. Xos vektorlar (haqiqiy bo‘lsa) uzuq chiziq bilan.', 'Меняйте элементы матрицы $A$. Нажмите на график, чтобы добавить траекторию. Собственные векторы (если вещественны) — пунктиром.', 'Change the entries of $A$. Tap to add a trajectory. Real eigenvectors are dashed.'),
    model: L('$x\'=ax+by,\\ y\'=cx+dy$. Trayektoriyalar RK4 bilan (qadam 0,02) oldinga va orqaga. Tasnif: iz $\\tau$, determinant $\\Delta$, $\\tau^2-4\\Delta$. Strelkalar — vektor maydon yo‘nalishi (uzunligi normallashtirilgan).', '$x\'=ax+by,\\ y\'=cx+dy$. Траектории методом RK4 (шаг 0,02) вперёд и назад. Классификация: след $\\tau$, определитель $\\Delta$, $\\tau^2-4\\Delta$. Стрелки — направление векторного поля (длина нормирована).', '$x\'=ax+by,\\ y\'=cx+dy$. Trajectories by RK4 (step 0.02) forward and backward. Classification by trace $\\tau$, determinant $\\Delta$ and $\\tau^2-4\\Delta$. Arrows show direction (normalised length).'),
    observe: L('$\\Delta<0$ bo‘lganda trayektoriyalar qanday? $\\tau=0$, $\\Delta>0$ da-chi?', 'Как ведут себя траектории при $\\Delta<0$? А при $\\tau=0$, $\\Delta>0$?', 'What do trajectories look like when $\\Delta<0$? And when $\\tau=0$, $\\Delta>0$?'),
    expected: L('$\\Delta<0$ — egar: ikki xos yo‘nalish, trayektoriyalar giperbolaga o‘xshaydi. $\\tau=0,\\ \\Delta>0$ — markaz: yopiq ellipslar (davriy yechimlar).', '$\\Delta<0$ — седло: два собственных направления, траектории похожи на гиперболы. $\\tau=0,\\ \\Delta>0$ — центр: замкнутые эллипсы (периодические решения).', '$\\Delta<0$: a saddle with two eigen-directions and hyperbola-like trajectories. $\\tau=0,\\ \\Delta>0$: a centre with closed ellipses (periodic solutions).'),
    presets: [{ v: 'f', l: L('Turg‘un fokus', 'Устойчивый фокус', 'Stable focus'), A: [-0.5, -2, 2, -0.5] }, { v: 's', l: L('Egar', 'Седло', 'Saddle'), A: [1, 1, 4, -2] }, { v: 'c', l: L('Markaz', 'Центр', 'Centre'), A: [0, 1, -4, 0] }, { v: 'n', l: L('Noturg‘un tugun', 'Неустойчивый узел', 'Unstable node'), A: [2, 0.5, 0.5, 1] }, { v: 'd', l: L('Aynigan tugun', 'Вырожденный узел', 'Degenerate node'), A: [-1, 1, 0, -1] }],
    build(host) {
      const lab = this; const st = { a: -0.5, b: -2, c: 2, d: -0.5 };
      let extra = [];
      const p = DT.plotBox({ xlabel: 'x', ylabel: 'y', aspect: 0.9, xmin: -3, xmax: 3, ymin: -3, ymax: 3 }); const ro = readout();
      const draw = () => {
        const { a, b, c, d } = st; const F = (x, y) => [a * x + b * y, c * x + d * y];
        p.setView({ xmin: -3, xmax: 3, ymin: -3, ymax: 3 }); p.clear(); p.axes(); p.field(F, { vector: true, nx: 15, ny: 15 });
        const e = DT.ODE.eig2(a, b, c, d);
        if (e.real) [e.l1, e.l2].forEach(l => { let v = Math.abs(b) > 1e-9 ? [b, l - a] : Math.abs(c) > 1e-9 ? [l - d, c] : (Math.abs(l - a) < 1e-9 ? [1, 0] : [0, 1]); const n = Math.hypot(...v); v = [v[0] / n, v[1] / n]; p.line([[-5 * v[0], -5 * v[1]], [5 * v[0], 5 * v[1]]], { color: C4(), width: 1.4, dash: [5, 4] }); });
        const starts = [];
        for (let i = 0; i < 8; i++) { const th = i * Math.PI / 4 + .2; starts.push([2.6 * Math.cos(th), 2.6 * Math.sin(th)], [1.2 * Math.cos(th + .4), 1.2 * Math.sin(th + .4)]); }
        starts.concat(extra).forEach((s0, i) => { const tr = DT.ODE.trajectory(F, s0, 12, 0.02, 3); p.line(tr.bwd.slice().reverse().concat(tr.fwd), { color: i >= starts.length ? C2() : C1(), width: i >= starts.length ? 2.4 : 1.5 }); });
        p.dot(0, 0, { color: css('--ink') });
        const cls = DT.ODE.classify2(a, b, c, d);
        ro.innerHTML = DT.esc(`τ = ${fmt(e.tr)}, Δ = ${fmt(e.det)}, τ² − 4Δ = ${fmt(e.disc)}`) + '<br>' + DT.esc('λ = ' + (e.real ? `${fmt(e.l1)}, ${fmt(e.l2)}` : `${fmt(e.re)} ± ${fmt(e.im)}i`)) + '<br><strong>' + DT.inline(tx(CLS[cls])) + '</strong>';
        p.caption(t('textDescription') + ': ' + DT.plain(CLS[cls]) + '. A = [[' + [a, b].join(', ') + '], [' + [c, d].join(', ') + ']]');
      };
      p.onResize = draw; p.onTap((x, y) => { extra.push([x, y]); if (extra.length > 6) extra.shift(); draw(); });
      const sl = ['a', 'b', 'c', 'd'].map(k => slider({ key: k, label: L('$' + k + '$', '$' + k + '$', '$' + k + '$'), min: -4, max: 4, step: 0.1 }, st, draw));
      host.ctrl.appendChild(select({ uz: 'Namuna', ru: 'Пример', en: 'Preset' }, lab.presets.map(q => ({ value: q.v, label: tx(q.l) })), 'f', v => { const pr = lab.presets.find(q => q.v === v); ['a', 'b', 'c', 'd'].forEach((k, i) => { st[k] = pr.A[i]; sl[i]._set(pr.A[i]); }); extra = []; draw(); }));
      host.ctrl.appendChild(h('div', { class: 'math-display', html: DT.katexStr('A=\\begin{pmatrix} a & b\\\\ c & d\\end{pmatrix}', true) }));
      sl.forEach(s => host.ctrl.appendChild(s)); host.ctrl.appendChild(ro); host.plot.appendChild(p.el);
      host.reset = () => { Object.assign(st, { a: -0.5, b: -2, c: 2, d: -0.5 }); sl.forEach((s, i) => s._set([-0.5, -2, 2, -0.5][i])); extra = []; draw(); };
      draw();
    },
    thumb(cv) { thumbPhase(cv); }
  });

  /* ======================= L09 Heat equation ======================= */
  const heatProfiles = {
    sin: { label: L('$\\sin\\pi x$', '$\\sin\\pi x$', '$\\sin\\pi x$'), phi: x => Math.sin(Math.PI * x), b: n => n === 1 ? 1 : 0 },
    tri: { label: L('Uchburchak (cho‘qqi $x=0{,}5$)', 'Треугольник (вершина $x=0{,}5$)', 'Triangle (peak at $x=0.5$)'), phi: x => 1 - Math.abs(2 * x - 1), b: n => 8 * Math.sin(n * Math.PI / 2) / (n * n * Math.PI * Math.PI) },
    step: { label: L('Pog‘ona: $[0{,}25;\\,0{,}75]$ da 1', 'Ступенька: 1 на $[0{,}25;\\,0{,}75]$', 'Step: 1 on $[0.25, 0.75]$'), phi: x => (x > 0.25 && x < 0.75) ? 1 : 0, b: n => 2 * (Math.cos(n * Math.PI / 4) - Math.cos(3 * n * Math.PI / 4)) / (n * Math.PI) }
  };
  LABS.push({
    id: 'L09', topics: ['t13', 't15'],
    title: L('Issiqlik tenglamasi: profilning vaqt bo‘yicha o‘zgarishi', 'Уравнение теплопроводности: профиль во времени', 'Heat equation: the profile over time'),
    goal: L('Sterjendagi harorat taqsimotining tekislanishini va yuqori garmonikalarning tez so‘nishini ko‘rish.', 'Увидеть выравнивание температуры в стержне и быстрое затухание высоких гармоник.', 'See how temperature in a rod smooths out and why high harmonics decay fast.'),
    howto: L('Boshlang‘ich profilni tanlang, $t$ va $\\alpha$ ni o‘zgartiring. $N$ — Furye qatoridagi hadlar soni.', 'Выберите начальный профиль, меняйте $t$ и $\\alpha$. $N$ — число членов ряда Фурье.', 'Pick an initial profile and vary $t$ and $\\alpha$. $N$ is the number of Fourier terms.'),
    model: L('$u_t=\\alpha u_{xx}$, $0<x<1$, $u(0,t)=u(1,t)=0$. Yechim: $u=\\sum_{n=1}^{N} b_n e^{-\\alpha n^2\\pi^2 t}\\sin n\\pi x$, $b_n=2\\int_0^1\\varphi(x)\\sin n\\pi x\\,dx$ (analitik, kompyuterda tekshirilgan). Cheklov: qator $N$ da kesiladi; uzilishli profilda $t=0$ yaqinida Gibbs tebranishlari ko‘rinadi.', '$u_t=\\alpha u_{xx}$, $0<x<1$, $u(0,t)=u(1,t)=0$. Решение: $u=\\sum_{n=1}^{N} b_n e^{-\\alpha n^2\\pi^2 t}\\sin n\\pi x$, $b_n=2\\int_0^1\\varphi(x)\\sin n\\pi x\\,dx$ (аналитически, проверено на компьютере). Ограничение: ряд обрезан на $N$; для разрывного профиля около $t=0$ видны колебания Гиббса.', '$u_t=\\alpha u_{xx}$, $0<x<1$, $u(0,t)=u(1,t)=0$. Solution $u=\\sum_{n=1}^{N} b_n e^{-\\alpha n^2\\pi^2 t}\\sin n\\pi x$ with $b_n=2\\int_0^1\\varphi(x)\\sin n\\pi x\\,dx$ (analytic, checked by computer). Limitation: the series is truncated at $N$; a discontinuous profile shows Gibbs ripples near $t=0$.'),
    observe: L('Pog‘ona profilda burchaklar nega tez silliqlanadi?', 'Почему углы ступенчатого профиля сглаживаются так быстро?', 'Why do the corners of the step profile smooth out so quickly?'),
    expected: L('$n$-garmonika $e^{-\\alpha n^2\\pi^2t}$ marta kamayadi: yuqori garmonikalar (o‘tkir burchaklar) birinchi bo‘lib yo‘qoladi, keyin profil $\\sin\\pi x$ ga o‘xshab qoladi.', '$n$-я гармоника убывает как $e^{-\\alpha n^2\\pi^2t}$: высокие гармоники (острые углы) исчезают первыми, затем профиль становится похож на $\\sin\\pi x$.', 'The $n$-th harmonic decays like $e^{-\\alpha n^2\\pi^2t}$: high harmonics (sharp corners) vanish first, then the profile looks like $\\sin\\pi x$.'),
    build(host) {
      const st = { t: 0.01, alpha: 1, N: 25 }; let prof = 'step';
      const p = DT.plotBox({ xlabel: 'x', ylabel: 'u' }); const ro = readout();
      const u = (x, tt) => { let s = 0; for (let n = 1; n <= st.N; n++) s += heatProfiles[prof].b(n) * Math.exp(-st.alpha * n * n * Math.PI * Math.PI * tt) * Math.sin(n * Math.PI * x); return s; };
      const draw = () => {
        p.setView({ xmin: 0, xmax: 1, ymin: -0.15, ymax: 1.2 }); p.clear(); p.axes();
        p.fn(heatProfiles[prof].phi, { color: css('--ink-3'), width: 1.4, dash: [5, 4] });
        [0.02, 0.05, 0.1].forEach(k => { if (k > st.t) p.fn(x => u(x, k), { color: css('--rule'), width: 1 }); });
        p.fn(x => u(x, st.t), { color: C2(), width: 2.6 });
        ro.textContent = `u(0.5, t) = ${fmt(u(0.5, st.t), 4)};  b₁ = ${fmt(heatProfiles[prof].b(1), 4)};  e^(−απ²t) = ${fmt(Math.exp(-st.alpha * Math.PI * Math.PI * st.t), 4)}`;
        p.legend([{ color: css('--ink-3'), dash: 'dash', label: 'φ(x) = u(x, 0)' }, { color: C2(), label: 'u(x, t), t = ' + st.t }]);
        p.caption(t('textDescription') + ': ' + { uz: 'sterjen uchlari 0 haroratda; profil vaqt o‘tishi bilan pasayadi va silliqlanadi.', ru: 'концы стержня при нулевой температуре; профиль со временем опускается и сглаживается.', en: 'rod ends held at zero; the profile drops and smooths over time.' }[DT.lang()]);
      };
      p.onResize = draw;
      host.ctrl.appendChild(select({ uz: 'Boshlang‘ich profil', ru: 'Начальный профиль', en: 'Initial profile' }, Object.keys(heatProfiles).map(k => ({ value: k, label: tx(heatProfiles[k].label) })), prof, v => { prof = v; draw(); }));
      const sl = [slider({ key: 't', label: L('Vaqt $t$', 'Время $t$', 'Time $t$'), min: 0, max: 0.3, step: 0.002 }, st, draw), slider({ key: 'alpha', label: L('$\\alpha$ (issiqlik o‘tkazuvchanlik)', '$\\alpha$ (температуропроводность)', '$\\alpha$ (diffusivity)'), min: 0.1, max: 3, step: 0.1 }, st, draw), slider({ key: 'N', label: L('$N$ (hadlar soni)', '$N$ (число членов)', '$N$ (terms)'), min: 1, max: 80, step: 1 }, st, draw)];
      sl.forEach(s => host.ctrl.appendChild(s)); host.ctrl.appendChild(ro); host.plot.appendChild(p.el);
      host.reset = () => { Object.assign(st, { t: 0.01, alpha: 1, N: 25 }); sl[0]._set(0.01); sl[1]._set(1); sl[2]._set(25); draw(); };
      draw();
    },
    thumb(cv) { thumbFns(cv, [x => Math.exp(-0.3) * Math.sin(Math.PI * x) * 1.1, x => (x > .25 && x < .75) ? 1 : 0], [0, 1, -0.1, 1.2]); }
  });

  /* ======================= L10 Vibrating string ======================= */
  LABS.push({
    id: 'L10', topics: ['t13', 't15'],
    title: L('Tor tebranishi animatsiyasi', 'Анимация колебаний струны', 'Vibrating string animation'),
    goal: L('Cheksiz torda Dalamber formulasini va chegaralangan torda Furye yechimini ko‘rish.', 'Увидеть формулу Даламбера для бесконечной струны и решение Фурье для закреплённой струны.', 'See d’Alembert’s formula on an infinite string and Fourier’s solution on a fixed string.'),
    howto: L('Rejimni tanlang. «Ijro» animatsiyani boshlaydi; vaqtni slayder bilan ham o‘zgartirish mumkin. Animatsiyani kamaytirish yoqilgan bo‘lsa, faqat slayder ishlaydi.', 'Выберите режим. «Пуск» запускает анимацию; время можно менять и ползунком. При включённом уменьшении анимации работает только ползунок.', 'Choose a mode. Play starts the animation; you can also move time with the slider. With reduced motion on, only the slider is used.'),
    model: L('Cheksiz tor: $u=\\frac12[\\varphi(x-at)+\\varphi(x+at)]$, $\\varphi=e^{-x^2/0{,}1}$, $\\psi=0$. Chegaralangan tor ($0\\le x\\le1$, uchlari mahkam): $u=\\sum_{n=1}^N b_n\\cos(n\\pi at)\\sin n\\pi x$, tortilgan uchburchak profil, $b_n=\\frac{8}{n^2\\pi^2}\\sin\\frac{n\\pi}{2}$.', 'Бесконечная струна: $u=\\frac12[\\varphi(x-at)+\\varphi(x+at)]$, $\\varphi=e^{-x^2/0{,}1}$, $\\psi=0$. Закреплённая струна ($0\\le x\\le1$): $u=\\sum_{n=1}^N b_n\\cos(n\\pi at)\\sin n\\pi x$, оттянутый треугольный профиль, $b_n=\\frac{8}{n^2\\pi^2}\\sin\\frac{n\\pi}{2}$.', 'Infinite string: $u=\\frac12[\\varphi(x-at)+\\varphi(x+at)]$ with $\\varphi=e^{-x^2/0.1}$, $\\psi=0$. Fixed string ($0\\le x\\le1$): $u=\\sum_{n=1}^N b_n\\cos(n\\pi at)\\sin n\\pi x$ for a plucked triangle, $b_n=\\frac{8}{n^2\\pi^2}\\sin\\frac{n\\pi}{2}$.'),
    observe: L('Cheksiz torda boshlang‘ich “do‘nglik” bilan nima sodir bo‘ladi? Chegaralangan torda $t=1/a$ da profil qanday?', 'Что происходит с начальным «горбом» на бесконечной струне? Каков профиль закреплённой струны при $t=1/a$?', 'What happens to the initial bump on the infinite string? What is the fixed string’s profile at $t=1/a$?'),
    expected: L('Do‘nglik ikkiga bo‘linadi, yarim balandlikdagi ikki to‘lqin $a$ tezlik bilan qarama-qarshi tomonga ketadi. Chegaralangan torda $t=1/a$ da profil teskari ($-\\varphi$), $t=2/a$ da boshlang‘ich holatga qaytadi.', 'Горб распадается на две волны половинной высоты, бегущие в разные стороны со скоростью $a$. У закреплённой струны при $t=1/a$ профиль перевёрнут ($-\\varphi$), при $t=2/a$ возвращается к исходному.', 'The bump splits into two half-height waves moving apart at speed $a$. The fixed string is inverted ($-\\varphi$) at $t=1/a$ and back to the start at $t=2/a$.'),
    build(host) {
      const st = { t: 0, a: 1, N: 30 }; let mode = 'inf', raf = null, last = 0;
      const p = DT.plotBox({ xlabel: 'x', ylabel: 'u', aspect: 0.55 }); const ro = readout();
      const phi = x => Math.exp(-x * x / 0.1);
      const draw = () => {
        if (mode === 'inf') {
          p.setView({ xmin: -4, xmax: 4, ymin: -0.3, ymax: 1.15 }); p.clear(); p.axes();
          p.fn(phi, { color: css('--ink-3'), width: 1.2, dash: [5, 4] });
          p.fn(x => 0.5 * (phi(x - st.a * st.t) + phi(x + st.a * st.t)), { color: C1(), width: 2.6 });
          ro.textContent = `x = ±a·t = ±${fmt(st.a * st.t, 2)}`;
        } else {
          p.setView({ xmin: 0, xmax: 1, ymin: -1.15, ymax: 1.15 }); p.clear(); p.axes();
          const u = x => { let s = 0; for (let n = 1; n <= st.N; n += 2) s += 8 * Math.sin(n * Math.PI / 2) / (n * n * Math.PI * Math.PI) * Math.cos(n * Math.PI * st.a * st.t) * Math.sin(n * Math.PI * x); return s; };
          p.fn(x => 1 - Math.abs(2 * x - 1), { color: css('--ink-3'), width: 1.2, dash: [5, 4] });
          p.fn(u, { color: C1(), width: 2.6 }); p.dot(0, 0, { color: css('--ink') }); p.dot(1, 0, { color: css('--ink') });
          ro.textContent = `u(0.5, t) = ${fmt(u(0.5), 3)};  T = 2/a = ${fmt(2 / st.a, 2)}`;
        }
        p.caption(t('textDescription') + ': t = ' + fmt(st.t, 2) + (mode === 'inf' ? { uz: '; ikki to‘lqin qarama-qarshi tomonga harakatlanadi.', ru: '; две волны движутся в противоположные стороны.', en: '; two waves travel in opposite directions.' }[DT.lang()] : { uz: '; uchlari mahkamlangan tor.', ru: '; струна с закреплёнными концами.', en: '; string with fixed ends.' }[DT.lang()]));
      };
      p.onResize = draw;
      const ts = slider({ key: 't', label: L('Vaqt $t$', 'Время $t$', 'Time $t$'), min: 0, max: 4, step: 0.01 }, st, draw);
      const playBtn = h('button', { class: 'btn small primary', html: DT.icon('play') + DT.esc(t('play')) });
      const stop = () => { if (raf) cancelAnimationFrame(raf); raf = null; playBtn.innerHTML = DT.icon('play') + DT.esc(t('play')); };
      const step = now => { const dt = Math.min(0.05, (now - last) / 1000); last = now; st.t += dt * 0.5; if (st.t > 4) st.t = 0; ts._set(+st.t.toFixed(2)); draw(); raf = requestAnimationFrame(step); };
      playBtn.onclick = () => { if (raf) { stop(); return; } if (DT.reduceMotion()) { DT.toast(t('reduceMotion') + ': ' + t('on')); return; } last = performance.now(); raf = requestAnimationFrame(step); playBtn.innerHTML = DT.icon('pause') + DT.esc(t('pause')); };
      DT._cleanup.push(stop);
      host.ctrl.appendChild(select({ uz: 'Rejim', ru: 'Режим', en: 'Mode' }, [{ value: 'inf', label: { uz: 'Cheksiz tor (Dalamber)', ru: 'Бесконечная струна (Даламбер)', en: 'Infinite string (d’Alembert)' }[DT.lang()] }, { value: 'fin', label: { uz: 'Chegaralangan tor (Furye)', ru: 'Закреплённая струна (Фурье)', en: 'Fixed string (Fourier)' }[DT.lang()] }], mode, v => { mode = v; st.t = 0; ts._set(0); draw(); }));
      host.ctrl.appendChild(h('div', { class: 'btn-row' }, playBtn));
      host.ctrl.appendChild(ts);
      host.ctrl.appendChild(slider({ key: 'a', label: L('$a$ (to‘lqin tezligi)', '$a$ (скорость волны)', '$a$ (wave speed)'), min: 0.2, max: 2, step: 0.1 }, st, draw));
      host.ctrl.appendChild(ro); host.plot.appendChild(p.el);
      host.reset = () => { stop(); st.t = 0; st.a = 1; ts._set(0); draw(); };
      draw();
    },
    thumb(cv) { thumbFns(cv, [x => 0.5 * (Math.exp(-((x - 1.5) ** 2) / .1) + Math.exp(-((x + 1.5) ** 2) / .1))], [-4, 4, -0.2, 1]); }
  });

  /* ======================= L11 PDE type ======================= */
  LABS.push({
    id: 'L11', topics: ['t14'],
    title: L('Ikkinchi tartibli PDE turini aniqlash', 'Определение типа УЧП второго порядка', 'Type of a second-order PDE'),
    goal: L('Koeffitsiyentlar bo‘yicha turini (giperbolik, parabolik, elliptik) aniqlash va tur sohaga qarab o‘zgarishini ko‘rish.', 'Определять тип (гиперболический, параболический, эллиптический) по коэффициентам и видеть, как тип меняется по областям.', 'Determine the type (hyperbolic, parabolic, elliptic) from the coefficients and see how it can change across regions.'),
    howto: L('Koeffitsiyentlarni $x$ va $y$ ning ifodasi sifatida kiriting. Xarita har bir nuqtadagi turni ko‘rsatadi (rang va harf).', 'Введите коэффициенты как выражения от $x$ и $y$. Карта показывает тип в каждой точке (цветом и буквой).', 'Enter the coefficients as expressions in $x$ and $y$. The map shows the type at each point (colour and letter).'),
    model: L('Konvensiya: $a\\,u_{xx}+2b\\,u_{xy}+c\\,u_{yy}+\\dots=0$, $\\Delta=b^2-ac$: $\\Delta>0$ giperbolik (G), $\\Delta=0$ parabolik (P), $\\Delta<0$ elliptik (E). Agar tenglama $A u_{xx}+Bu_{xy}+Cu_{yy}$ ko‘rinishida yozilsa, $b=B/2$ va $\\Delta=\\frac{B^2-4AC}{4}$ — ishora bir xil.', 'Соглашение: $a\\,u_{xx}+2b\\,u_{xy}+c\\,u_{yy}+\\dots=0$, $\\Delta=b^2-ac$: $\\Delta>0$ гиперболический (Г), $\\Delta=0$ параболический (П), $\\Delta<0$ эллиптический (Э). Если уравнение записано как $A u_{xx}+Bu_{xy}+Cu_{yy}$, то $b=B/2$ и $\\Delta=\\frac{B^2-4AC}{4}$ — знак тот же.', 'Convention: $a\\,u_{xx}+2b\\,u_{xy}+c\\,u_{yy}+\\dots=0$, $\\Delta=b^2-ac$: $\\Delta>0$ hyperbolic (H), $\\Delta=0$ parabolic (P), $\\Delta<0$ elliptic (E). If written as $A u_{xx}+Bu_{xy}+Cu_{yy}$, then $b=B/2$ and $\\Delta=\\frac{B^2-4AC}{4}$, with the same sign.'),
    observe: L('Trikomi tenglamasi $y\\,u_{xx}+u_{yy}=0$ da tur qayerda o‘zgaradi?', 'Где меняется тип уравнения Трикоми $y\\,u_{xx}+u_{yy}=0$?', 'Where does the type of the Tricomi equation $y\\,u_{xx}+u_{yy}=0$ change?'),
    expected: L('$\\Delta=-y$: $y>0$ da elliptik, $y<0$ da giperbolik, $y=0$ chiziqda parabolik.', '$\\Delta=-y$: эллиптический при $y>0$, гиперболический при $y<0$, параболический на прямой $y=0$.', '$\\Delta=-y$: elliptic for $y>0$, hyperbolic for $y<0$, parabolic on the line $y=0$.'),
    presets: [{ v: 'tri', l: 'y·u_xx + u_yy (Trikomi)', a: 'y', b: '0', c: '1', form: '2b' }, { v: 'wave', l: 'u_xx − u_yy', a: '1', b: '0', c: '-1', form: '2b' }, { v: 'heat', l: 'u_xx − u_y', a: '1', b: '0', c: '0', form: '2b' }, { v: 'lap', l: 'u_xx + u_yy', a: '1', b: '0', c: '1', form: '2b' }, { v: 'mix', l: 'u_xx + 4u_xy + 3u_yy (B = 4)', a: '1', b: '4', c: '3', form: 'B' }, { v: 'xy', l: 'x²u_xx − y²u_yy', a: 'x^2', b: '0', c: '-y^2', form: '2b' }],
    build(host) {
      const lab = this; const st = { a: 'y', b: '0', c: '1', form: '2b' };
      const p = DT.plotBox({ xlabel: 'x', ylabel: 'y', aspect: 0.9, xmin: -2, xmax: 2, ymin: -2, ymax: 2 }); const ro = readout();
      const err = h('div', { class: 'small', style: { color: css('--rust') } });
      const ins = {};
      const comp = s => { const ast = DT.Expr.parse(s, ['x', 'y']); return (x, y) => DT.Expr.ev(ast, { x, y }); };
      const draw = () => {
        let A, B, Cc; try { A = comp(st.a); B = comp(st.b); Cc = comp(st.c); err.textContent = ''; } catch (e) { err.textContent = t('parseError'); return; }
        const delta = (x, y) => { const b = st.form === 'B' ? B(x, y) / 2 : B(x, y); return b * b - A(x, y) * Cc(x, y); };
        p.setView({ xmin: -2, xmax: 2, ymin: -2, ymax: 2 }); p.clear();
        const c = p.ctx, bx = p.box(), n = 40, cw = (bx.x1 - bx.x0) / n, chh = (bx.y1 - bx.y0) / n;
        const col = { H: css('--sky-soft'), P: css('--ochre-soft'), E: css('--moss-soft') };
        const lbl = { uz: { H: 'G', P: 'P', E: 'E' }, ru: { H: 'Г', P: 'П', E: 'Э' }, en: { H: 'H', P: 'P', E: 'E' } }[DT.lang()];
        const typ = d => Math.abs(d) < 1e-9 ? 'P' : d > 0 ? 'H' : 'E';
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const [x, y] = p.inv(bx.x0 + (i + .5) * cw, bx.y0 + (j + .5) * chh); c.fillStyle = col[typ(delta(x, y))]; c.fillRect(bx.x0 + i * cw, bx.y0 + j * chh, cw + .5, chh + .5); }
        c.fillStyle = css('--ink-2'); c.font = '11px ' + css('--sans'); c.textAlign = 'center'; c.textBaseline = 'middle';
        for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { const px = bx.x0 + (i + .5) * (bx.x1 - bx.x0) / 8, py = bx.y0 + (j + .5) * (bx.y1 - bx.y0) / 8; const [x, y] = p.inv(px, py); c.fillText(lbl[typ(delta(x, y))], px, py); }
        p.axes();
        const d0 = delta(1, 1), d1 = delta(1, -1);
        ro.textContent = `Δ(1, 1) = ${fmt(d0)} → ${lbl[typ(d0)]};  Δ(1, −1) = ${fmt(d1)} → ${lbl[typ(d1)]}`;
        p.legend([{ color: col.H, label: lbl.H + ' — ' + { uz: 'giperbolik', ru: 'гиперболический', en: 'hyperbolic' }[DT.lang()] }, { color: col.P, label: lbl.P + ' — ' + { uz: 'parabolik', ru: 'параболический', en: 'parabolic' }[DT.lang()] }, { color: col.E, label: lbl.E + ' — ' + { uz: 'elliptik', ru: 'эллиптический', en: 'elliptic' }[DT.lang()] }]);
        p.caption(t('textDescription') + ': ' + { uz: 'har bir katakda Δ = b² − ac ishorasi bo‘yicha tur.', ru: 'в каждой клетке тип по знаку Δ = b² − ac.', en: 'each cell shows the type from the sign of Δ = b² − ac.' }[DT.lang()]);
      };
      p.onResize = draw;
      const formSel = select({ uz: 'Aralash had yozilishi', ru: 'Запись смешанного члена', en: 'Mixed term written as' }, [{ value: '2b', label: '2b·u_xy' }, { value: 'B', label: 'B·u_xy (b = B/2)' }], st.form, v => { st.form = v; draw(); });
      host.ctrl.appendChild(select({ uz: 'Namuna', ru: 'Пример', en: 'Preset' }, lab.presets.map(q => ({ value: q.v, label: q.l })), 'tri', v => { const pr = lab.presets.find(q => q.v === v); ['a', 'b', 'c'].forEach(k => { st[k] = pr[k]; ins[k].value = pr[k]; }); st.form = pr.form; DT.$('select', formSel).value = pr.form; draw(); }));
      host.ctrl.appendChild(formSel);
      ['a', 'b', 'c'].forEach(k => { ins[k] = h('input', { class: 'input', value: st[k], 'aria-label': k }); ins[k].addEventListener('change', () => { st[k] = ins[k].value; draw(); }); host.ctrl.appendChild(h('div', { class: 'field' }, h('label', { text: k === 'b' ? { uz: 'b (yoki B)', ru: 'b (или B)', en: 'b (or B)' }[DT.lang()] : k }), ins[k])); });
      host.ctrl.appendChild(err); host.ctrl.appendChild(ro); host.plot.appendChild(p.el);
      host.reset = () => { Object.assign(st, { a: 'y', b: '0', c: '1', form: '2b' }); ['a', 'b', 'c'].forEach(k => ins[k].value = st[k]); DT.$('select', formSel).value = '2b'; draw(); };
      draw();
    },
    thumb(cv) { const c = cv.getContext('2d'); c.fillStyle = css('--moss-soft'); c.fillRect(0, 0, 128, 64); c.fillStyle = css('--sky-soft'); c.fillRect(0, 64, 128, 64); c.fillStyle = css('--ink-2'); c.font = '20px sans-serif'; c.fillText('E', 56, 40); c.fillText('H', 56, 104); }
  });

  /* ======================= L12 Laplace transform solver (verified examples) ======================= */
  LABS.push({
    id: 'L12', topics: ['tL'],
    title: L('Laplas almashtirishi bilan yechish (tekshirilgan misollar)', 'Решение преобразованием Лапласа (проверенные примеры)', 'Solving with the Laplace transform (verified examples)'),
    goal: L('Koshi masalasini Laplas usulida bosqichma-bosqich yechishni ko‘rish va natijani sonli yechim bilan solishtirish.', 'Пошагово решить задачу Коши методом Лапласа и сравнить с численным решением.', 'Solve an IVP step by step with the Laplace transform and compare with a numerical solution.'),
    howto: L('Misolni tanlang va qadamlarni birma-bir oching. Grafikda analitik javob va RK4 natijasi ustma-ust tushishi kerak.', 'Выберите пример и раскрывайте шаги по одному. На графике аналитический ответ и результат RK4 должны совпасть.', 'Pick an example and reveal the steps one by one. On the graph, the analytic answer and the RK4 result should coincide.'),
    model: L('Faqat oldindan kompyuterda (SymPy) tekshirilgan 4 ta misol. Tekshiruv: RK4, qadam 0,005. Bu umumiy Laplas yechuvchisi emas.', 'Только 4 примера, заранее проверенных на компьютере (SymPy). Проверка: RK4, шаг 0,005. Это не универсальный решатель.', 'Only 4 examples, verified in advance with SymPy. Check: RK4 with step 0.005. Not a general Laplace solver.'),
    observe: L('Qaysi qadamda boshlang‘ich shartlar avtomatik hisobga olinadi?', 'На каком шаге начальные условия учитываются автоматически?', 'At which step are the initial conditions built in automatically?'),
    expected: L('Hosilaning almashtirishida: $\\mathcal L[y\']=sY-y(0)$, $\\mathcal L[y\'\']=s^2Y-sy(0)-y\'(0)$. Shuning uchun alohida $C_1, C_2$ topish kerak emas.', 'При преобразовании производных: $\\mathcal L[y\']=sY-y(0)$, $\\mathcal L[y\'\']=s^2Y-sy(0)-y\'(0)$. Поэтому не нужно отдельно искать $C_1, C_2$.', 'In the transform of derivatives: $\\mathcal L[y\']=sY-y(0)$, $\\mathcal L[y\'\']=s^2Y-sy(0)-y\'(0)$. So no separate $C_1, C_2$ are needed.'),
    ex: [
      { key: 'e1', title: "y'' + 3y' + 2y = 0,  y(0)=1, y'(0)=0", ord: 2, f: (tt, u) => [u[1], -3 * u[1] - 2 * u[0]], u0: [1, 0], sol: tt => 2 * Math.exp(-tt) - Math.exp(-2 * tt),
        steps: ['s^2Y-s\\cdot1-0+3(sY-1)+2Y=0', '(s^2+3s+2)\\,Y=s+3', 'Y=\\dfrac{s+3}{(s+1)(s+2)}=\\dfrac{2}{s+1}-\\dfrac{1}{s+2}', 'y(t)=2e^{-t}-e^{-2t}'] },
      { key: 'e2', title: "y' + y = 1,  y(0)=0", ord: 1, f: (tt, u) => [1 - u[0]], u0: [0], sol: tt => 1 - Math.exp(-tt),
        steps: ['sY-0+Y=\\dfrac1s', 'Y=\\dfrac{1}{s(s+1)}=\\dfrac1s-\\dfrac{1}{s+1}', 'y(t)=1-e^{-t}'] },
      { key: 'e3', title: "y'' + 4y = sin t,  y(0)=0, y'(0)=0", ord: 2, f: (tt, u) => [u[1], Math.sin(tt) - 4 * u[0]], u0: [0, 0], sol: tt => Math.sin(tt) / 3 - Math.sin(2 * tt) / 6,
        steps: ['s^2Y+4Y=\\dfrac{1}{s^2+1}', 'Y=\\dfrac{1}{(s^2+1)(s^2+4)}=\\dfrac13\\cdot\\dfrac{1}{s^2+1}-\\dfrac13\\cdot\\dfrac{1}{s^2+4}', 'y(t)=\\dfrac13\\sin t-\\dfrac16\\sin 2t'] },
      { key: 'e4', title: "y' + y = u(t − 1),  y(0)=0  (RC)", ord: 1, f: (tt, u) => [(tt >= 1 ? 1 : 0) - u[0]], u0: [0], sol: tt => tt >= 1 ? 1 - Math.exp(-(tt - 1)) : 0,
        steps: ['sY+Y=\\dfrac{e^{-s}}{s}', 'Y=e^{-s}\\left(\\dfrac1s-\\dfrac{1}{s+1}\\right)', 'y(t)=u(t-1)\\left(1-e^{-(t-1)}\\right)'] }
    ],
    build(host) {
      const lab = this; let ex = lab.ex[0];
      const p = DT.plotBox({ xlabel: 't', ylabel: 'y' }); const ro = readout(); const stepsBox = h('div');
      const draw = () => {
        const S = DT.ODE.solve('rk4', ex.f, 0, ex.u0.slice(), 8, 1600);
        const num = S.xs.map((x, i) => [x, S.ys[i][0]]);
        const ys = num.map(q => q[1]); const lo = Math.min(...ys, 0), hi = Math.max(...ys, 0.2);
        p.setView({ xmin: 0, xmax: 8, ymin: lo - .15 * (hi - lo), ymax: hi + .15 * (hi - lo) }); p.clear(); p.axes();
        p.fn(ex.sol, { color: C1(), width: 4 });
        p.line(num, { color: C2(), width: 1.6, dash: [5, 4] });
        const maxErr = Math.max(...num.map(q => Math.abs(q[1] - ex.sol(q[0])).valueOf()).filter(isFinite));
        ro.textContent = `max |y_RK4 − y_Laplace| = ${maxErr.toExponential(2)}`;
        p.legend([{ color: C1(), label: 'Laplace' }, { color: C2(), dash: 'dash', label: 'RK4' }]);
        p.caption(t('textDescription') + ': ' + ex.title);
      };
      const showSteps = () => {
        stepsBox.innerHTML = '';
        const ol = h('ol', { class: 'steps' });
        ex.steps.forEach((s, i) => ol.appendChild(h('li', { class: i ? 'hidden-step' : '', html: DT.katexStr(s, true) })));
        stepsBox.appendChild(ol);
        stepsBox.appendChild(h('button', { class: 'btn small', html: DT.icon('chev') + DT.esc(t('showNextStep')), onclick: () => { const n = DT.$('.hidden-step', ol); if (n) n.classList.remove('hidden-step'); } }));
      };
      p.onResize = draw;
      host.ctrl.appendChild(select(t('equation'), lab.ex.map(e => ({ value: e.key, label: e.title })), ex.key, v => { ex = lab.ex.find(e => e.key === v); showSteps(); draw(); }));
      host.ctrl.appendChild(stepsBox); host.ctrl.appendChild(ro); host.plot.appendChild(p.el);
      host.reset = () => { showSteps(); draw(); };
      showSteps(); draw();
    },
    thumb(cv) { thumbFns(cv, [x => 2 * Math.exp(-x) - Math.exp(-2 * x)], [0, 6, -0.1, 1.1]); }
  });

  /* ---------- thumbnails ---------- */
  function thumbCtx(cv) { const c = cv.getContext('2d'); c.fillStyle = css('--sheet'); c.fillRect(0, 0, cv.width, cv.height); return c; }
  function thumbFns(cv, fns, box) {
    const c = thumbCtx(cv), [x0, x1, y0, y1] = box, W = cv.width, H = cv.height;
    const cols = [css('--curve-1'), css('--curve-2'), css('--curve-3')];
    fns.forEach((f, k) => { c.strokeStyle = cols[k % 3]; c.lineWidth = 3; c.beginPath(); for (let i = 0; i <= 64; i++) { const x = x0 + (x1 - x0) * i / 64, y = f(x); const X = i / 64 * W, Y = H - (y - y0) / (y1 - y0) * H; i ? c.lineTo(X, Y) : c.moveTo(X, Y); } c.stroke(); });
  }
  function thumbField(cv, f, box) {
    const c = thumbCtx(cv), [x0, x1, y0, y1] = box, W = cv.width, H = cv.height;
    c.strokeStyle = css('--ink-3'); c.lineWidth = 2; c.beginPath();
    for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) { const x = x0 + (i + .5) * (x1 - x0) / 7, y = y0 + (j + .5) * (y1 - y0) / 7; let px = W / (x1 - x0), py = -f(x, y) * H / (y1 - y0); const m = Math.hypot(px, py); px /= m; py /= m; const X = (i + .5) * W / 7, Y = H - (j + .5) * H / 7; c.moveTo(X - px * 7, Y - py * 7); c.lineTo(X + px * 7, Y + py * 7); }
    c.stroke();
  }
  function thumbPhase(cv) { const c = thumbCtx(cv); c.strokeStyle = css('--curve-1'); c.lineWidth = 2.5; c.beginPath(); for (let i = 0; i < 300; i++) { const th = i * 0.06, r = 55 * Math.exp(-0.08 * th); const X = 64 + r * Math.cos(th), Y = 64 + r * Math.sin(th); i ? c.lineTo(X, Y) : c.moveTo(X, Y); } c.stroke(); }
  function thumbText(cv, s) { const c = thumbCtx(cv); c.fillStyle = css('--teal'); c.font = 'bold 64px serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, 64, 68); }

  /* ---------- lab page ---------- */
  DT.views.lab = function (root, id) {
    const lab = DT.lab(id);
    if (!lab) { DT.go('#/lab', true); return; }
    const idx = LABS.indexOf(lab);
    const wrap = h('div'); root.appendChild(wrap);
    wrap.appendChild(h('div', { class: 'lesson-head' }, h('div', { class: 'kicker', text: t('navLab') + ' ' + (idx + 1) + ' / ' + LABS.length }), h('h1', { text: tx(lab.title) })));
    wrap.appendChild(h('div', { class: 'blk lab', 'data-anchor': id + '-goal' },
      h('div', { class: 'blk-label', html: DT.icon('target') + DT.esc(t('goal')) }), h('div', { class: 'prose', html: DT.md(lab.goal) }),
      h('div', { class: 'blk-label', style: { marginTop: '8px' }, html: DT.icon('info') + DT.esc(t('howTo')) }), h('div', { class: 'prose', html: DT.md(lab.howto) })));
    const layout = h('div', { class: 'lab-layout', 'data-anchor': id + '-main' });
    const plotCol = h('div'), ctrlCol = h('div', { class: 'panel' });
    layout.appendChild(plotCol); layout.appendChild(ctrlCol); wrap.appendChild(layout);
    const host = { plot: plotCol, ctrl: ctrlCol, reset: null };
    lab.build(host);
    if (!plotCol.parentNode) layout.style.display = 'block';
    ctrlCol.appendChild(h('div', { class: 'btn-row' }, h('button', { class: 'btn small', html: DT.icon('reset') + DT.esc(t('reset')), onclick: () => host.reset && host.reset() })));
    // observation
    const obs = DT.state.observations[id] || [];
    const ta = h('textarea', { class: 'input', placeholder: t('observePlaceholder'), 'aria-label': t('observe') });
    const exp = h('div', { class: 'feedback ok', hidden: true, html: DT.md(lab.expected) });
    wrap.appendChild(h('section', { class: 'panel', 'data-anchor': id + '-obs' },
      h('h2', { text: t('observe') }), h('div', { class: 'prose', html: DT.md(lab.observe) }), ta,
      h('div', { class: 'btn-row' },
        h('button', { class: 'btn small primary', text: t('save'), onclick: () => { if (!ta.value.trim()) return; (DT.state.observations[id] = DT.state.observations[id] || []).push({ ts: Date.now(), text: ta.value.trim() }); DT.save(); ta.value = ''; DT.toast(t('saved')); } }),
        h('button', { class: 'btn small', text: t('showExpected'), onclick: () => { exp.hidden = !exp.hidden; } })),
      exp,
      obs.length ? h('ul', { class: 'list-plain small' }, obs.slice(-3).map(o => h('li', { class: 'gl-item' }, h('span', { class: 'muted', text: DT.fmtDate(o.ts) + ' · ' }), o.text))) : null));
    wrap.appendChild(h('details', { class: 'panel', 'data-anchor': id + '-model' }, h('summary', { text: t('modelInfo') }), h('div', { class: 'prose', html: DT.md(lab.model) })));
    if (lab.topics) wrap.appendChild(h('div', { class: 'btn-row' }, lab.topics.map(tp => h('a', { class: 'btn small', href: '#/topic/' + tp, text: t('topic') + ' ' + (DT.outline(tp) ? DT.outline(tp).num : '') }))));
    DT.setLast('#/lab/' + id, lab.title);
  };
})();
