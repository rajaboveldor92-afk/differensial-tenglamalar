/* Content registry. Topic files (content/tNN.js) call DT.addTopic; they are loaded lazily by script tag. */
(function () {
  const DT = window.DT;
  DT.L = (uz, ru, en) => ({ uz, ru, en });
  DT.R = String.raw;
  DT.TOPICS = {};
  /* Course outline (always loaded): ids, titles, map positions and prerequisite links. */
  const L = DT.L;
  DT.OUTLINE = [
    { id: 't01', num: 1, band: 0, req: [], syl: 'M1/S1', title: L('Differensial tenglama, yechim va Koshi masalasi', 'Дифференциальное уравнение, решение и задача Коши', 'Differential equations, solutions and the Cauchy problem') },
    { id: 't02', num: 2, band: 0, req: ['t01'], syl: 'M2/S2', title: L('O‘zgaruvchilari ajraladigan tenglamalar', 'Уравнения с разделяющимися переменными', 'Separable equations') },
    { id: 't03', num: 3, band: 0, req: ['t02'], syl: 'M3/S3', title: L('Bir jinsli va bir jinsliga keltiriladigan tenglamalar', 'Однородные и приводящиеся к однородным уравнения', 'Homogeneous equations and reducible forms') },
    { id: 't04', num: 4, band: 0, req: ['t02'], syl: 'M4/S4', title: L('Chiziqli, Bernulli, Rikkati va to‘la differensialli tenglamalar', 'Линейные уравнения, уравнения Бернулли, Риккати и в полных дифференциалах', 'Linear, Bernoulli, Riccati and exact equations') },
    { id: 't05', num: 5, band: 0, req: ['t04'], syl: 'M5/S5', title: L('Hosilaga nisbatan yechilmagan tenglamalar. Lagranj va Klero', 'Уравнения, не разрешённые относительно производной. Лагранж и Клеро', 'Equations not solved for the derivative. Lagrange and Clairaut') },
    { id: 't06', num: 6, band: 1, req: ['t04'], syl: 'M6/S6', title: L('Yuqori tartibli tenglamalar va tartibni pasaytirish', 'Уравнения высших порядков и понижение порядка', 'Higher-order equations and reduction of order') },
    { id: 't07', num: 7, band: 1, req: ['t06'], syl: 'M7/S7', title: L('Chiziqli tenglamalar nazariyasi. Vronskian', 'Теория линейных уравнений. Вронскиан', 'Theory of linear equations. The Wronskian') },
    { id: 't08', num: 8, band: 1, req: ['t07'], syl: 'M8/S8', title: L('O‘zgarmas koeffitsiyentli bir jinsli chiziqli tenglamalar', 'Линейные однородные уравнения с постоянными коэффициентами', 'Homogeneous linear equations with constant coefficients') },
    { id: 't09', num: 9, band: 1, req: ['t08'], syl: 'M9/S9', title: L('Bir jinsli bo‘lmagan tenglamalar: noma’lum koeffitsiyentlar va qatorlar', 'Неоднородные уравнения: неопределённые коэффициенты и степенные ряды', 'Nonhomogeneous equations: undetermined coefficients and power series') },
    { id: 't10', num: 10, band: 1, req: ['t09'], syl: 'M10/S10', title: L('O‘zgarmaslarni variatsiyalash. Ostrogradskiy–Liuvill formulasi', 'Вариация постоянных. Формула Остроградского–Лиувилля', 'Variation of parameters. The Abel–Liouville formula') },
    { id: 't11', num: 11, band: 2, req: ['t01'], syl: 'M11/S11', title: L('Sonli usullar: Eyler, takomillashtirilgan Eyler, Runge–Kutta', 'Численные методы: Эйлер, улучшенный Эйлер, Рунге–Кутта', 'Numerical methods: Euler, improved Euler, Runge–Kutta') },
    { id: 't12', num: 12, band: 2, req: ['t08'], syl: 'M12/S12', title: L('Differensial tenglamalar sistemalari va faza portreti', 'Системы дифференциальных уравнений и фазовый портрет', 'Systems of differential equations and phase portraits') },
    { id: 't13', num: 13, band: 3, req: ['t08'], syl: 'M13/S13', title: L('Xususiy hosilali tenglamalar: issiqlik, to‘lqin va Laplas', 'Уравнения в частных производных: теплопроводность, волны, Лаплас', 'Partial differential equations: heat, wave and Laplace') },
    { id: 't14', num: 14, band: 3, req: ['t13'], syl: 'M14/S14', title: L('Ikkinchi tartibli PDE larni tasniflash va kanonik ko‘rinish', 'Классификация и канонический вид уравнений второго порядка', 'Classification and canonical form of second-order PDEs') },
    { id: 't15', num: 15, band: 3, req: ['t14'], syl: 'M15/S15', title: L('Tor tebranishi: Dalamber formulasi va Furye usuli', 'Колебания струны: формула Даламбера и метод Фурье', 'The vibrating string: d’Alembert’s formula and Fourier’s method') },
    { id: 'tL', num: 'L', band: 2, req: ['t09'], extra: true, syl: '—', title: L('Qo‘shimcha modul: Laplas almashtirishi', 'Дополнительный модуль: преобразование Лапласа', 'Extra module: the Laplace transform') }
  ];
  DT.outline = id => DT.OUTLINE.find(o => o.id === id);
  DT.addTopic = function (t) { DT.TOPICS[t.id] = t; };
  const loading = {};
  DT.loadTopic = function (id) {
    if (DT.TOPICS[id]) return Promise.resolve(DT.TOPICS[id]);
    if (loading[id]) return loading[id];
    loading[id] = new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = 'content/' + id + '.js';
      s.onload = () => DT.TOPICS[id] ? res(DT.TOPICS[id]) : rej(new Error('no topic ' + id));
      s.onerror = () => { delete loading[id]; rej(new Error('load ' + id)); };
      document.head.appendChild(s);
    });
    return loading[id];
  };
  DT.loadAllTopics = () => Promise.all(DT.OUTLINE.map(o => DT.loadTopic(o.id).catch(() => null)));
  DT.loadScript = function (src) {
    return new Promise((res, rej) => { if (DT.$('script[src="' + src + '"]')) return res(); const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  };
})();
