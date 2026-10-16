(function () {
const L = DT.L, R = DT.R;
const TAB = R`\begin{array}{c|c|c}
f(t) & F(s)=\mathcal L\{f\} & s>\\ \hline
1 & \dfrac1s & 0\\[4pt]
t^n\ (n=0,1,\dots) & \dfrac{n!}{s^{n+1}} & 0\\[4pt]
e^{at} & \dfrac1{s-a} & a\\[4pt]
\sin bt & \dfrac{b}{s^2+b^2} & 0\\[4pt]
\cos bt & \dfrac{s}{s^2+b^2} & 0\\[4pt]
e^{at}\sin bt & \dfrac{b}{(s-a)^2+b^2} & a\\[4pt]
e^{at}\cos bt & \dfrac{s-a}{(s-a)^2+b^2} & a\\[4pt]
t^ne^{at} & \dfrac{n!}{(s-a)^{n+1}} & a\\[4pt]
u(t-c)\ (c\ge0) & \dfrac{e^{-cs}}{s} & 0\\[4pt]
\delta(t-c)\ (c\ge0) & e^{-cs} & -
\end{array}`;
DT.addTopic({
  id: 'tL', num: 'L',
  title: L('Qo‘shimcha modul: Laplas almashtirishi', 'Дополнительный модуль: преобразование Лапласа', 'Extra module: the Laplace transform'),
  syllabus: { lecture: '—', seminar: '—', outcomes: ['TN3'], independent: [12, 13] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L('Laplas almashtirishini ta’rif bo‘yicha hisoblay olasiz va uning mavjudlik shartlarini ayta olasiz.', 'Вычислять преобразование Лапласа по определению и формулировать условия его существования.', 'Compute a Laplace transform from the definition and state when it exists.'),
    L('Jadval, chiziqlilik va siljish teoremalari yordamida to‘g‘ri va teskari almashtirishni topa olasiz.', 'Находить прямое и обратное преобразование с помощью таблицы, линейности и теорем смещения.', 'Find direct and inverse transforms with the table, linearity and the shift theorems.'),
    L('Boshlang‘ich shartli chiziqli tenglama va sistemalarni Laplas usuli bilan yecha olasiz (sodda kasrlarga ajratish bilan).', 'Решать линейные уравнения и системы с начальными условиями методом Лапласа (с разложением на простейшие дроби).', 'Solve linear initial value problems and systems by the Laplace method (with partial fractions).'),
    L('Pog‘onali funksiya, impuls ($\\delta$) va o‘ram (konvolyutsiya) bilan ishlay olasiz.', 'Работать со ступенчатой функцией, импульсом ($\\delta$) и свёрткой.', 'Work with step functions, impulses ($\\delta$) and convolution.'),
    L('RC va RLC zanjirlari modellarini Laplas usuli bilan tahlil qila olasiz.', 'Анализировать модели RC- и RLC-цепей методом Лапласа.', 'Analyse RC and RLC circuit models with the Laplace method.')
  ],
  prereqKnowledge: [
    L('Xosmas integrallar va ularning yaqinlashishi.', 'Несобственные интегралы и их сходимость.', 'Improper integrals and their convergence.'),
    L('Ratsional kasrni sodda kasrlarga ajratish.', 'Разложение рациональной дроби на простейшие.', 'Partial-fraction decomposition of rational functions.'),
    L('O‘zgarmas koeffitsientli chiziqli tenglamalar va sistemalar (8–9, 12-mavzular).', 'Линейные уравнения и системы с постоянными коэффициентами (темы 8–9, 12).', 'Constant-coefficient linear equations and systems (topics 8–9, 12).')
  ],
  sources: [
    { id: 'logan', ref: '3.1–3.4', verified: true },
    { id: 'kohler', ref: '5.1–5.7', verified: true },
    { id: 'goode', ref: '10.1–10.9', verified: true },
    { id: 'syllabus', ref: 'TN3; mustaqil ish 12–13', verified: true },
    { id: 'boyce', ref: 'Ch. 6', verified: false }
  ],
  labs: ['L12'],
  lessons: [
    {
      id: 'tL.1',
      title: L('Ta’rif, mavjudlik va asosiy jadval', 'Определение, существование и основная таблица', 'Definition, existence and the basic table'),
      blocks: [
        { type: 'note', title: L('Bu modul haqida', 'Об этом модуле', 'About this module'),
          body: L(R`Bu — **qo‘shimcha modul**. U tasdiqlangan o‘quv dasturining ma’ruza soatlariga (M1–M15) kirmaydi. Dastur Laplas almashtirishini ta’lim natijasi TN3 va mustaqil ishlar 12–13 da talab qiladi, shuning uchun material mustaqil o‘rganish uchun berilgan. Imtihon talablarini o‘qituvchingizdan aniqlang.`,
          R`Это **дополнительный модуль**. Он не входит в лекционные часы утверждённой программы (M1–M15). Программа требует преобразование Лапласа в результате обучения TN3 и в самостоятельных работах 12–13, поэтому материал дан для самостоятельного изучения. Требования к экзамену уточните у преподавателя.`,
          R`This is a **supplementary module**. It is not part of the lecture hours of the approved syllabus (M1–M15). The syllabus asks for the Laplace transform in learning outcome TN3 and in independent tasks 12–13, so the material is offered for self-study. Ask your instructor what is required for the exam.`) },
        { type: 'intro', title: L('Kalitni ulash: tenglamani algebraga aylantirish', 'Включение рубильника: уравнение превращается в алгебру', 'Closing a switch: turning an equation into algebra'),
          body: L(R`RC zanjirida $t=0$ da $E=10$ V kuchlanish ulanadi: $q'+2q=10$, $q(0)=0$ ($R=1$, $C=0{,}5$). Har bir $t$ ning funksiyasini $s$ ning funksiyasiga o‘tkazadigan amal bor, unda **hosila $s$ ga ko‘paytirishga** aylanadi: $q'\mapsto sQ-q(0)$. Shunda
$$sQ+2Q=\frac{10}{s}\ \Rightarrow\ Q=\frac{10}{s(s+2)}=\frac5s-\frac5{s+2}\ \Rightarrow\ q=5-5e^{-2t}.$$
Differensial tenglama o‘rniga oddiy algebraik tenglama yechildi. Bu amal — **Laplas almashtirishi**; muhandislar uni zanjirlar, signallar va boshqaruv tizimlarida keng ishlatadi.`,
          R`В RC-цепи при $t=0$ включается напряжение $E=10$ В: $q'+2q=10$, $q(0)=0$ ($R=1$, $C=0{,}5$). Есть операция, переводящая функцию от $t$ в функцию от $s$, при которой **производная становится умножением на $s$**: $q'\mapsto sQ-q(0)$. Тогда
$$sQ+2Q=\frac{10}{s}\ \Rightarrow\ Q=\frac{10}{s(s+2)}=\frac5s-\frac5{s+2}\ \Rightarrow\ q=5-5e^{-2t}.$$
Вместо дифференциального уравнения решили алгебраическое. Эта операция — **преобразование Лапласа**; инженеры широко применяют её в цепях, сигналах и системах управления.`,
          R`In an RC circuit a voltage $E=10$ V is switched on at $t=0$: $q'+2q=10$, $q(0)=0$ ($R=1$, $C=0.5$). There is an operation that maps a function of $t$ to a function of $s$ and turns **differentiation into multiplication by $s$**: $q'\mapsto sQ-q(0)$. Then
$$sQ+2Q=\frac{10}{s}\ \Rightarrow\ Q=\frac{10}{s(s+2)}=\frac5s-\frac5{s+2}\ \Rightarrow\ q=5-5e^{-2t}.$$
We solved an algebraic equation instead of a differential one. The operation is the **Laplace transform**; engineers use it widely for circuits, signals and control systems.`) },
        { type: 'def', title: L('Laplas almashtirishi', 'Преобразование Лапласа', 'The Laplace transform'),
          body: L(R`$t\ge0$ da aniqlangan $f(t)$ funksiyaning **Laplas almashtirishi**:
$$F(s)=\mathcal L\{f\}(s)=\int_0^{\infty}e^{-st}f(t)\,dt,$$
integral yaqinlashadigan $s$ lar uchun. $f$ — **original**, $F$ — **tasvir**. Teskari almashtirish $f=\mathcal L^{-1}\{F\}$ deb yoziladi.`,
          R`**Преобразование Лапласа** функции $f(t)$, определённой при $t\ge0$:
$$F(s)=\mathcal L\{f\}(s)=\int_0^{\infty}e^{-st}f(t)\,dt$$
для тех $s$, при которых интеграл сходится. $f$ — **оригинал**, $F$ — **изображение**. Обратное преобразование записывают $f=\mathcal L^{-1}\{F\}$.`,
          R`The **Laplace transform** of a function $f(t)$ defined for $t\ge0$ is
$$F(s)=\mathcal L\{f\}(s)=\int_0^{\infty}e^{-st}f(t)\,dt$$
for those $s$ where the integral converges. $f$ is the **original**, $F$ its **image** (transform). The inverse transform is written $f=\mathcal L^{-1}\{F\}$.`) },
        { type: 'thm', title: L('Mavjudlik teoremasi', 'Теорема существования', 'Existence theorem'),
          conds: L(R`1. $f$ har bir chekli $[0,T]$ kesmada **bo‘lakli uzluksiz** (chekli sondagi birinchi tur uzilishlar);
2. $f$ **eksponensial tartibli**: shunday $M>0$, $a$, $T_0$ mavjudki, $t\ge T_0$ da $|f(t)|\le Me^{at}$.`,
          R`1. $f$ **кусочно непрерывна** на каждом конечном отрезке $[0,T]$ (конечное число разрывов первого рода);
2. $f$ **экспоненциального порядка**: существуют $M>0$, $a$, $T_0$ такие, что $|f(t)|\le Me^{at}$ при $t\ge T_0$.`,
          R`1. $f$ is **piecewise continuous** on every finite interval $[0,T]$ (finitely many jump discontinuities);
2. $f$ is of **exponential order**: there are $M>0$, $a$, $T_0$ with $|f(t)|\le Me^{at}$ for $t\ge T_0$.`),
          body: L(R`U holda $F(s)$ barcha $s>a$ uchun mavjud va $s\to\infty$ da $F(s)\to0$. Bu shartlar **yetarli**, lekin zarur emas. Masalan, $e^{t^2}$ eksponensial tartibli emas va uning almashtirishi yo‘q; $1/\sqrt t$ esa $t=0$ da chegaralanmagan, lekin $\mathcal L\{t^{-1/2}\}=\sqrt{\pi/s}$ mavjud.`,
          R`Тогда $F(s)$ существует при всех $s>a$ и $F(s)\to0$ при $s\to\infty$. Условия **достаточные**, но не необходимые. Например, $e^{t^2}$ не экспоненциального порядка, и преобразования у неё нет; а $1/\sqrt t$ не ограничена при $t=0$, но $\mathcal L\{t^{-1/2}\}=\sqrt{\pi/s}$ существует.`,
          R`Then $F(s)$ exists for all $s>a$, and $F(s)\to0$ as $s\to\infty$. The conditions are **sufficient** but not necessary. For example, $e^{t^2}$ is not of exponential order and has no transform, while $1/\sqrt t$ is unbounded at $t=0$ yet $\mathcal L\{t^{-1/2}\}=\sqrt{\pi/s}$ exists.`) },
        { type: 'example', title: L('Ta’rif bo‘yicha hisoblash', 'Вычисление по определению', 'Computing from the definition'),
          body: L(R`$\mathcal L\{e^{at}\}$ va $\mathcal L\{\sin bt\}$ ni toping.`, R`Найдите $\mathcal L\{e^{at}\}$ и $\mathcal L\{\sin bt\}$.`, R`Find $\mathcal L\{e^{at}\}$ and $\mathcal L\{\sin bt\}$.`),
          steps: [
            L(R`$\displaystyle\int_0^\infty e^{-st}e^{at}dt=\int_0^\infty e^{-(s-a)t}dt=\left[\frac{-e^{-(s-a)t}}{s-a}\right]_0^\infty=\frac1{s-a}$, faqat $s>a$ da (aks holda integral uzoqlashadi).`, R`$\displaystyle\int_0^\infty e^{-st}e^{at}dt=\int_0^\infty e^{-(s-a)t}dt=\left[\frac{-e^{-(s-a)t}}{s-a}\right]_0^\infty=\frac1{s-a}$, только при $s>a$ (иначе интеграл расходится).`, R`$\displaystyle\int_0^\infty e^{-st}e^{at}dt=\int_0^\infty e^{-(s-a)t}dt=\left[\frac{-e^{-(s-a)t}}{s-a}\right]_0^\infty=\frac1{s-a}$, only for $s>a$ (otherwise the integral diverges).`),
            L(R`$\sin bt=\dfrac{e^{ibt}-e^{-ibt}}{2i}$ va birinchi natija ($a=\pm ib$, $s>0$): $\dfrac1{2i}\left(\dfrac1{s-ib}-\dfrac1{s+ib}\right)$.`, R`$\sin bt=\dfrac{e^{ibt}-e^{-ibt}}{2i}$ и первый результат ($a=\pm ib$, $s>0$): $\dfrac1{2i}\left(\dfrac1{s-ib}-\dfrac1{s+ib}\right)$.`, R`$\sin bt=\dfrac{e^{ibt}-e^{-ibt}}{2i}$ and the first result ($a=\pm ib$, $s>0$): $\dfrac1{2i}\left(\dfrac1{s-ib}-\dfrac1{s+ib}\right)$.`),
            L(R`$=\dfrac1{2i}\cdot\dfrac{2ib}{s^2+b^2}=\dfrac{b}{s^2+b^2}$, $s>0$.`, R`$=\dfrac1{2i}\cdot\dfrac{2ib}{s^2+b^2}=\dfrac{b}{s^2+b^2}$, $s>0$.`, R`$=\dfrac1{2i}\cdot\dfrac{2ib}{s^2+b^2}=\dfrac{b}{s^2+b^2}$, $s>0$.`)
          ],
          check: L(R`$b=1$, $s=1$: $\int_0^\infty e^{-t}\sin t\,dt=\frac12$ va $\frac{1}{1+1}=\frac12$ ✓.`, R`$b=1$, $s=1$: $\int_0^\infty e^{-t}\sin t\,dt=\frac12$ и $\frac{1}{1+1}=\frac12$ ✓.`, R`$b=1$, $s=1$: $\int_0^\infty e^{-t}\sin t\,dt=\frac12$ and $\frac{1}{1+1}=\frac12$ ✓.`) },
        { type: 'formula', title: L('Asosiy almashtirishlar jadvali', 'Таблица основных преобразований', 'Table of basic transforms'),
          body: L(R`$$` + TAB + R`$$
$u(t-c)$ — Xevisayd pog‘onali funksiyasi, $\delta(t-c)$ — Dirak impulsi (3-dars).`, R`$$` + TAB + R`$$
$u(t-c)$ — ступенчатая функция Хевисайда, $\delta(t-c)$ — импульс Дирака (урок 3).`, R`$$` + TAB + R`$$
$u(t-c)$ is the Heaviside step function and $\delta(t-c)$ the Dirac impulse (lesson 3).`) },
        { type: 'example', title: L('Chiziqlilik', 'Линейность', 'Linearity'),
          body: L(R`$\mathcal L\{3-2e^{-t}+4\sin2t\}$ ni toping.`, R`Найдите $\mathcal L\{3-2e^{-t}+4\sin2t\}$.`, R`Find $\mathcal L\{3-2e^{-t}+4\sin2t\}$.`),
          steps: [
            L(R`Integral chiziqli: $\mathcal L\{\alpha f+\beta g\}=\alpha F+\beta G$.`, R`Интеграл линеен: $\mathcal L\{\alpha f+\beta g\}=\alpha F+\beta G$.`, R`The integral is linear: $\mathcal L\{\alpha f+\beta g\}=\alpha F+\beta G$.`),
            L(R`$3\cdot\dfrac1s-2\cdot\dfrac1{s+1}+4\cdot\dfrac2{s^2+4}=\dfrac3s-\dfrac2{s+1}+\dfrac8{s^2+4}$, $s>0$.`, R`$3\cdot\dfrac1s-2\cdot\dfrac1{s+1}+4\cdot\dfrac2{s^2+4}=\dfrac3s-\dfrac2{s+1}+\dfrac8{s^2+4}$, $s>0$.`, R`$3\cdot\dfrac1s-2\cdot\dfrac1{s+1}+4\cdot\dfrac2{s^2+4}=\dfrac3s-\dfrac2{s+1}+\dfrac8{s^2+4}$, $s>0$.`)
          ],
          check: L(R``+'`laplace_transform`'+R` xuddi shu natijani beradi ✓.`, R``+'`laplace_transform`'+R` даёт тот же результат ✓.`, R``+'`laplace_transform`'+R` gives the same result ✓.`) },
        { type: 'warn', body: L(R`Ko‘paytmaning almashtirishi almashtirishlar ko‘paytmasiga teng **emas**: $\mathcal L\{fg\}\ne FG$. Masalan, $\mathcal L\{t\cdot t\}=\frac2{s^3}$, lekin $\frac1{s^2}\cdot\frac1{s^2}=\frac1{s^4}$. $FG$ ko‘paytma o‘ramga (konvolyutsiyaga) mos keladi (3-dars).`,
          R`Преобразование произведения **не равно** произведению преобразований: $\mathcal L\{fg\}\ne FG$. Например, $\mathcal L\{t\cdot t\}=\frac2{s^3}$, но $\frac1{s^2}\cdot\frac1{s^2}=\frac1{s^4}$. Произведению $FG$ соответствует свёртка (урок 3).`,
          R`The transform of a product is **not** the product of the transforms: $\mathcal L\{fg\}\ne FG$. For example $\mathcal L\{t\cdot t\}=\frac2{s^3}$, but $\frac1{s^2}\cdot\frac1{s^2}=\frac1{s^4}$. The product $FG$ corresponds to convolution (lesson 3).`) }
      ]
    },
    {
      id: 'tL.2',
      title: L('Hosilalar, siljish va boshlang‘ich masalalar', 'Производные, смещение и начальные задачи', 'Derivatives, shifting and initial value problems'),
      blocks: [
        { type: 'thm', title: L('Hosilaning almashtirishi', 'Преобразование производной', 'Transform of a derivative'),
          conds: L(R`1. $f,f',\dots,f^{(n-1)}$ $[0,\infty)$ da uzluksiz va eksponensial tartibli ($|f^{(k)}|\le Me^{at}$);
2. $f^{(n)}$ har bir $[0,T]$ da bo‘lakli uzluksiz;
3. $s>a$.`,
          R`1. $f,f',\dots,f^{(n-1)}$ непрерывны на $[0,\infty)$ и экспоненциального порядка ($|f^{(k)}|\le Me^{at}$);
2. $f^{(n)}$ кусочно непрерывна на каждом $[0,T]$;
3. $s>a$.`,
          R`1. $f,f',\dots,f^{(n-1)}$ are continuous on $[0,\infty)$ and of exponential order ($|f^{(k)}|\le Me^{at}$);
2. $f^{(n)}$ is piecewise continuous on every $[0,T]$;
3. $s>a$.`),
          body: L(R`$$\mathcal L\{f'\}=sF-f(0),\qquad \mathcal L\{f''\}=s^2F-sf(0)-f'(0),$$
$$\mathcal L\{f^{(n)}\}=s^nF-s^{n-1}f(0)-\dots-f^{(n-1)}(0).$$
Boshlang‘ich shartlar formulaga **avtomatik** kiradi — o‘zgarmaslarni alohida topish shart emas.`,
          R`$$\mathcal L\{f'\}=sF-f(0),\qquad \mathcal L\{f''\}=s^2F-sf(0)-f'(0),$$
$$\mathcal L\{f^{(n)}\}=s^nF-s^{n-1}f(0)-\dots-f^{(n-1)}(0).$$
Начальные условия входят в формулу **автоматически** — искать постоянные отдельно не нужно.`,
          R`$$\mathcal L\{f'\}=sF-f(0),\qquad \mathcal L\{f''\}=s^2F-sf(0)-f'(0),$$
$$\mathcal L\{f^{(n)}\}=s^nF-s^{n-1}f(0)-\dots-f^{(n-1)}(0).$$
The initial conditions enter the formula **automatically**; there are no constants to find separately.`) },
        { type: 'proof', body: L(R`Bo‘laklab integrallash: $\int_0^\infty e^{-st}f'dt=\big[e^{-st}f\big]_0^\infty+s\int_0^\infty e^{-st}f\,dt=-f(0)+sF$; $s>a$ da $e^{-st}f\to0$. Yuqori tartiblar uchun formulani takrorlaymiz.`,
          R`Интегрирование по частям: $\int_0^\infty e^{-st}f'dt=\big[e^{-st}f\big]_0^\infty+s\int_0^\infty e^{-st}f\,dt=-f(0)+sF$; при $s>a$ $e^{-st}f\to0$. Для старших порядков повторяем.`,
          R`Integrate by parts: $\int_0^\infty e^{-st}f'dt=\big[e^{-st}f\big]_0^\infty+s\int_0^\infty e^{-st}f\,dt=-f(0)+sF$, since $e^{-st}f\to0$ for $s>a$. Repeat for higher orders.`) },
        { type: 'def', title: L('Birinchi siljish teoremasi', 'Первая теорема смещения', 'First shifting theorem'),
          body: L(R`Agar $\mathcal L\{f\}=F(s)$ ($s>a$) bo‘lsa,
$$\mathcal L\{e^{ct}f(t)\}=F(s-c),\qquad s>a+c.$$
$t$ bo‘yicha eksponentaga ko‘paytirish $s$ bo‘yicha siljishga aylanadi. Teskari yo‘nalishda: maxrajda $(s-c)^2+b^2$ ko‘rsangiz, javobda $e^{ct}\cos bt$, $e^{ct}\sin bt$ bo‘ladi.`,
          R`Если $\mathcal L\{f\}=F(s)$ ($s>a$), то
$$\mathcal L\{e^{ct}f(t)\}=F(s-c),\qquad s>a+c.$$
Умножение на экспоненту по $t$ превращается в сдвиг по $s$. Обратно: если в знаменателе $(s-c)^2+b^2$, в ответе будут $e^{ct}\cos bt$, $e^{ct}\sin bt$.`,
          R`If $\mathcal L\{f\}=F(s)$ ($s>a$), then
$$\mathcal L\{e^{ct}f(t)\}=F(s-c),\qquad s>a+c.$$
Multiplying by an exponential in $t$ becomes a shift in $s$. Conversely, a denominator $(s-c)^2+b^2$ signals $e^{ct}\cos bt$ and $e^{ct}\sin bt$ in the answer.`) },
        { type: 'example', title: L('Teskari almashtirish: kvadratni to‘ldirish', 'Обратное преобразование: выделение полного квадрата', 'Inverse transform: completing the square'),
          body: L(R`$\mathcal L^{-1}\left\{\dfrac{s+3}{s^2+2s+5}\right\}$ ni toping.`, R`Найдите $\mathcal L^{-1}\left\{\dfrac{s+3}{s^2+2s+5}\right\}$.`, R`Find $\mathcal L^{-1}\left\{\dfrac{s+3}{s^2+2s+5}\right\}$.`),
          steps: [
            L(R`$s^2+2s+5=(s+1)^2+4$ — haqiqiy ildizlari yo‘q.`, R`$s^2+2s+5=(s+1)^2+4$ — вещественных корней нет.`, R`$s^2+2s+5=(s+1)^2+4$ has no real roots.`),
            L(R`Suratni $s+1$ orqali yozamiz: $\dfrac{(s+1)+2}{(s+1)^2+4}=\dfrac{s+1}{(s+1)^2+4}+\dfrac{2}{(s+1)^2+4}$.`, R`Записываем числитель через $s+1$: $\dfrac{(s+1)+2}{(s+1)^2+4}=\dfrac{s+1}{(s+1)^2+4}+\dfrac{2}{(s+1)^2+4}$.`, R`Write the numerator through $s+1$: $\dfrac{(s+1)+2}{(s+1)^2+4}=\dfrac{s+1}{(s+1)^2+4}+\dfrac{2}{(s+1)^2+4}$.`),
            L(R`Jadval va siljish ($c=-1$, $b=2$): $f(t)=e^{-t}\cos2t+e^{-t}\sin2t$.`, R`Таблица и смещение ($c=-1$, $b=2$): $f(t)=e^{-t}\cos2t+e^{-t}\sin2t$.`, R`Table and shift ($c=-1$, $b=2$): $f(t)=e^{-t}\cos2t+e^{-t}\sin2t$.`)
          ],
          check: L(R`$\mathcal L\{e^{-t}\cos2t\}+\mathcal L\{e^{-t}\sin2t\}=\frac{s+1}{(s+1)^2+4}+\frac{2}{(s+1)^2+4}=\frac{s+3}{s^2+2s+5}$ ✓.`, R`$\mathcal L\{e^{-t}\cos2t\}+\mathcal L\{e^{-t}\sin2t\}=\frac{s+1}{(s+1)^2+4}+\frac{2}{(s+1)^2+4}=\frac{s+3}{s^2+2s+5}$ ✓.`, R`$\mathcal L\{e^{-t}\cos2t\}+\mathcal L\{e^{-t}\sin2t\}=\frac{s+1}{(s+1)^2+4}+\frac{2}{(s+1)^2+4}=\frac{s+3}{s^2+2s+5}$ ✓.`) },
        { type: 'example', title: L('Ikkinchi tartibli boshlang‘ich masala', 'Начальная задача второго порядка', 'A second-order initial value problem'),
          body: L(R`$y''-3y'+2y=e^{3t}$, $y(0)=1$, $y'(0)=0$.`, R`$y''-3y'+2y=e^{3t}$, $y(0)=1$, $y'(0)=0$.`, R`$y''-3y'+2y=e^{3t}$, $y(0)=1$, $y'(0)=0$.`),
          steps: [
            L(R`Almashtiramiz: $(s^2Y-s)-3(sY-1)+2Y=\dfrac1{s-3}$.`, R`Преобразуем: $(s^2Y-s)-3(sY-1)+2Y=\dfrac1{s-3}$.`, R`Transform: $(s^2Y-s)-3(sY-1)+2Y=\dfrac1{s-3}$.`),
            L(R`$(s-1)(s-2)Y=s-3+\dfrac1{s-3}=\dfrac{s^2-6s+10}{s-3}$, $\ Y=\dfrac{s^2-6s+10}{(s-1)(s-2)(s-3)}$.`, R`$(s-1)(s-2)Y=s-3+\dfrac1{s-3}=\dfrac{s^2-6s+10}{s-3}$, $\ Y=\dfrac{s^2-6s+10}{(s-1)(s-2)(s-3)}$.`, R`$(s-1)(s-2)Y=s-3+\dfrac1{s-3}=\dfrac{s^2-6s+10}{s-3}$, so $Y=\dfrac{s^2-6s+10}{(s-1)(s-2)(s-3)}$.`),
            L(R`Sodda kasrlar (“yopish” usuli: maxrajdagi ko‘paytuvchini yopib, ildizni qo‘yamiz): $A=\frac{1-6+10}{(-1)(-2)}=\frac52$, $B=\frac{4-12+10}{(1)(-1)}=-2$, $C=\frac{9-18+10}{(2)(1)}=\frac12$.`, R`Простейшие дроби (метод «закрывания»: закрываем множитель знаменателя и подставляем корень): $A=\frac{1-6+10}{(-1)(-2)}=\frac52$, $B=\frac{4-12+10}{(1)(-1)}=-2$, $C=\frac{9-18+10}{(2)(1)}=\frac12$.`, R`Partial fractions (cover-up: cover the factor and substitute its root): $A=\frac{1-6+10}{(-1)(-2)}=\frac52$, $B=\frac{4-12+10}{(1)(-1)}=-2$, $C=\frac{9-18+10}{(2)(1)}=\frac12$.`),
            L(R`$y=\frac52e^t-2e^{2t}+\frac12e^{3t}$.`, R`$y=\frac52e^t-2e^{2t}+\frac12e^{3t}$.`, R`$y=\frac52e^t-2e^{2t}+\frac12e^{3t}$.`)
          ],
          check: L(R`$y(0)=\frac52-2+\frac12=1$ ✓; $y'(0)=\frac52-4+\frac32=0$ ✓; $e^{3t}$ oldida: $\frac12(9-9+2)=1$ ✓, $e^t$: $\frac52(1-3+2)=0$, $e^{2t}$: $-2(4-6+2)=0$ ✓.`, R`$y(0)=\frac52-2+\frac12=1$ ✓; $y'(0)=\frac52-4+\frac32=0$ ✓; при $e^{3t}$: $\frac12(9-9+2)=1$ ✓, $e^t$: $\frac52(1-3+2)=0$, $e^{2t}$: $-2(4-6+2)=0$ ✓.`, R`$y(0)=\frac52-2+\frac12=1$ ✓; $y'(0)=\frac52-4+\frac32=0$ ✓; coefficient of $e^{3t}$: $\frac12(9-9+2)=1$ ✓; $e^t$: $\frac52(1-3+2)=0$; $e^{2t}$: $-2(4-6+2)=0$ ✓.`) },
        { type: 'warn', body: L(R`$\mathcal L\{y''\}=s^2Y-sy(0)-y'(0)$: $s$ ko‘paytuvchi $y(0)$ oldida turadi, $y'(0)$ oldida emas. Ishoralarni ham tekshiring. Javobni har doim boshlang‘ich shartlarga qo‘yib tekshiring.`,
          R`$\mathcal L\{y''\}=s^2Y-sy(0)-y'(0)$: множитель $s$ стоит при $y(0)$, а не при $y'(0)$. Проверяйте и знаки. Ответ всегда проверяйте подстановкой в начальные условия.`,
          R`$\mathcal L\{y''\}=s^2Y-sy(0)-y'(0)$: the factor $s$ goes with $y(0)$, not with $y'(0)$. Check the signs too, and always substitute the answer into the initial conditions.`) }
      ]
    },
    {
      id: 'tL.3',
      title: L('Pog‘onali funksiya, impuls va o‘ram', 'Ступенчатая функция, импульс и свёртка', 'Step functions, impulses and convolution'),
      blocks: [
        { type: 'def', title: L('Xevisayd funksiyasi va ikkinchi siljish teoremasi', 'Функция Хевисайда и вторая теорема смещения', 'The Heaviside function and the second shifting theorem'),
          body: L(R`$u(t-c)=\begin{cases}0,&t<c,\\1,&t\ge c\end{cases}$ ($c\ge0$) — $t=c$ da “kalit ulanadi”. $\mathcal L\{u(t-c)\}=\dfrac{e^{-cs}}{s}$.

**Ikkinchi siljish teoremasi**: agar $\mathcal L\{f\}=F$ bo‘lsa,
$$\mathcal L\{u(t-c)\,f(t-c)\}=e^{-cs}F(s).$$
Vaqt bo‘yicha kechikish $e^{-cs}$ ko‘paytuvchiga aylanadi. Diqqat: argument $t-c$ bo‘lishi kerak.`,
          R`$u(t-c)=\begin{cases}0,&t<c,\\1,&t\ge c\end{cases}$ ($c\ge0$) — «рубильник включается» при $t=c$. $\mathcal L\{u(t-c)\}=\dfrac{e^{-cs}}{s}$.

**Вторая теорема смещения**: если $\mathcal L\{f\}=F$, то
$$\mathcal L\{u(t-c)\,f(t-c)\}=e^{-cs}F(s).$$
Запаздывание по времени превращается в множитель $e^{-cs}$. Внимание: аргумент должен быть $t-c$.`,
          R`$u(t-c)=\begin{cases}0,&t<c,\\1,&t\ge c\end{cases}$ ($c\ge0$): a “switch closes” at $t=c$. $\mathcal L\{u(t-c)\}=\dfrac{e^{-cs}}{s}$.

**Second shifting theorem**: if $\mathcal L\{f\}=F$, then
$$\mathcal L\{u(t-c)\,f(t-c)\}=e^{-cs}F(s).$$
A time delay becomes the factor $e^{-cs}$. Careful: the argument must be $t-c$.`) },
        { type: 'example', title: L('Kechikib ulangan manba', 'Источник, включённый с запаздыванием', 'A source switched on with a delay'),
          body: L(R`$y'+y=u(t-1)$, $y(0)=0$.`, R`$y'+y=u(t-1)$, $y(0)=0$.`, R`$y'+y=u(t-1)$, $y(0)=0$.`),
          steps: [
            L(R`$(s+1)Y=\dfrac{e^{-s}}{s}$, $\ Y=e^{-s}\cdot\dfrac1{s(s+1)}=e^{-s}\left(\dfrac1s-\dfrac1{s+1}\right)$.`, R`$(s+1)Y=\dfrac{e^{-s}}{s}$, $\ Y=e^{-s}\cdot\dfrac1{s(s+1)}=e^{-s}\left(\dfrac1s-\dfrac1{s+1}\right)$.`, R`$(s+1)Y=\dfrac{e^{-s}}{s}$, so $Y=e^{-s}\cdot\dfrac1{s(s+1)}=e^{-s}\left(\dfrac1s-\dfrac1{s+1}\right)$.`),
            L(R`$\mathcal L^{-1}\left\{\frac1s-\frac1{s+1}\right\}=1-e^{-t}$.`, R`$\mathcal L^{-1}\left\{\frac1s-\frac1{s+1}\right\}=1-e^{-t}$.`, R`$\mathcal L^{-1}\left\{\frac1s-\frac1{s+1}\right\}=1-e^{-t}$.`),
            L(R`Ikkinchi siljish: $y=u(t-1)\big(1-e^{-(t-1)}\big)$: $t<1$ da $0$, $t\ge1$ da $1-e^{1-t}$.`, R`Вторая теорема смещения: $y=u(t-1)\big(1-e^{-(t-1)}\big)$: $0$ при $t<1$, $1-e^{1-t}$ при $t\ge1$.`, R`Second shift: $y=u(t-1)\big(1-e^{-(t-1)}\big)$, i.e. $0$ for $t<1$ and $1-e^{1-t}$ for $t\ge1$.`)
          ],
          check: L(R`$t>1$: $y'=e^{1-t}$, $y'+y=1$ ✓; $t<1$: $0+0=0$ ✓; $t=1$ da $y$ uzluksiz ($0$) ✓.`, R`$t>1$: $y'=e^{1-t}$, $y'+y=1$ ✓; $t<1$: $0+0=0$ ✓; при $t=1$ $y$ непрерывна ($0$) ✓.`, R`$t>1$: $y'=e^{1-t}$, $y'+y=1$ ✓; $t<1$: $0+0=0$ ✓; $y$ is continuous at $t=1$ (value $0$) ✓.`) },
        { type: 'def', title: L('Dirak impulsi', 'Импульс Дирака', 'The Dirac impulse'),
          body: L(R`Juda qisqa, lekin kuchli zarba (bolg‘a zarbasi, chaqmoq, qisqa signal) ideal holda $\delta(t-c)$ bilan modellanadi: u $t\ne c$ da nol va $\int f(t)\delta(t-c)\,dt=f(c)$. Bu oddiy funksiya emas, balki **umumlashgan funksiya**: $\delta(t-c)=\lim_{\varepsilon\to0}\frac1\varepsilon\big(u(t-c)-u(t-c-\varepsilon)\big)$ deb tushunish mumkin.
$$\mathcal L\{\delta(t-c)\}=e^{-cs}\quad(c\ge0).$$`,
          R`Очень короткий, но сильный удар (удар молотка, молния, короткий сигнал) идеализируется как $\delta(t-c)$: она равна нулю при $t\ne c$ и $\int f(t)\delta(t-c)\,dt=f(c)$. Это не обычная, а **обобщённая функция**: можно понимать $\delta(t-c)=\lim_{\varepsilon\to0}\frac1\varepsilon\big(u(t-c)-u(t-c-\varepsilon)\big)$.
$$\mathcal L\{\delta(t-c)\}=e^{-cs}\quad(c\ge0).$$`,
          R`A very short but strong kick (a hammer blow, lightning, a short signal) is idealised as $\delta(t-c)$: it vanishes for $t\ne c$ and $\int f(t)\delta(t-c)\,dt=f(c)$. It is not an ordinary function but a **generalised function**; one may think of $\delta(t-c)=\lim_{\varepsilon\to0}\frac1\varepsilon\big(u(t-c)-u(t-c-\varepsilon)\big)$.
$$\mathcal L\{\delta(t-c)\}=e^{-cs}\quad(c\ge0).$$`) },
        { type: 'example', title: L('Prujinaga zarba', 'Удар по пружине', 'A blow to a spring'),
          body: L(R`$y''+y=\delta(t-\pi)$, $y(0)=y'(0)=0$ (tinch turgan yukka $t=\pi$ da zarba).`, R`$y''+y=\delta(t-\pi)$, $y(0)=y'(0)=0$ (покоящийся груз получает удар при $t=\pi$).`, R`$y''+y=\delta(t-\pi)$, $y(0)=y'(0)=0$ (a mass at rest is struck at $t=\pi$).`),
          steps: [
            L(R`$(s^2+1)Y=e^{-\pi s}$, $\ Y=e^{-\pi s}\dfrac1{s^2+1}$.`, R`$(s^2+1)Y=e^{-\pi s}$, $\ Y=e^{-\pi s}\dfrac1{s^2+1}$.`, R`$(s^2+1)Y=e^{-\pi s}$, so $Y=e^{-\pi s}\dfrac1{s^2+1}$.`),
            L(R`$y=u(t-\pi)\sin(t-\pi)=-u(t-\pi)\sin t$.`, R`$y=u(t-\pi)\sin(t-\pi)=-u(t-\pi)\sin t$.`, R`$y=u(t-\pi)\sin(t-\pi)=-u(t-\pi)\sin t$.`),
            L(R`$t<\pi$ da yuk tinch; zarbadan keyin u amplitudasi 1 bo‘lgan tebranishni boshlaydi. $y$ uzluksiz, $y'$ esa $t=\pi$ da $1$ ga sakraydi (impuls tezlikni o‘zgartiradi).`, R`При $t<\pi$ груз покоится; после удара начинаются колебания с амплитудой 1. $y$ непрерывна, а $y'$ при $t=\pi$ скачком меняется на $1$ (импульс меняет скорость).`, R`For $t<\pi$ the mass is at rest; after the blow it oscillates with amplitude 1. $y$ is continuous, while $y'$ jumps by $1$ at $t=\pi$ (the impulse changes the velocity).`)
          ],
          check: L(R`$t>\pi$: $y=-\sin t$, $y''+y=0$ ✓; $y'(\pi^+)=-\cos\pi=1$, $y'(\pi^-)=0$: sakrash $1$ ✓.`, R`$t>\pi$: $y=-\sin t$, $y''+y=0$ ✓; $y'(\pi^+)=-\cos\pi=1$, $y'(\pi^-)=0$: скачок $1$ ✓.`, R`$t>\pi$: $y=-\sin t$ and $y''+y=0$ ✓; $y'(\pi^+)=-\cos\pi=1$, $y'(\pi^-)=0$: jump $1$ ✓.`) },
        { type: 'thm', title: L('O‘ram (konvolyutsiya) teoremasi', 'Теорема о свёртке', 'The convolution theorem'),
          conds: L(R`1. $f$ va $g$ har bir $[0,T]$ da bo‘lakli uzluksiz va eksponensial tartibli ($|f|,|g|\le Me^{at}$);
2. $s>a$.`,
          R`1. $f$ и $g$ кусочно непрерывны на каждом $[0,T]$ и экспоненциального порядка ($|f|,|g|\le Me^{at}$);
2. $s>a$.`,
          R`1. $f$ and $g$ are piecewise continuous on every $[0,T]$ and of exponential order ($|f|,|g|\le Me^{at}$);
2. $s>a$.`),
          body: L(R`O‘ram $(f*g)(t)=\displaystyle\int_0^t f(\tau)\,g(t-\tau)\,d\tau$ uchun
$$\mathcal L\{f*g\}=F(s)\,G(s).$$
Ya’ni tasvirlar **ko‘paytmasi** originallar **o‘ramiga** mos keladi.`,
          R`Для свёртки $(f*g)(t)=\displaystyle\int_0^t f(\tau)\,g(t-\tau)\,d\tau$
$$\mathcal L\{f*g\}=F(s)\,G(s).$$
То есть **произведению** изображений соответствует **свёртка** оригиналов.`,
          R`For the convolution $(f*g)(t)=\displaystyle\int_0^t f(\tau)\,g(t-\tau)\,d\tau$,
$$\mathcal L\{f*g\}=F(s)\,G(s).$$
So a **product** of transforms corresponds to the **convolution** of the originals.`) },
        { type: 'example', title: L('O‘ram orqali teskari almashtirish', 'Обратное преобразование через свёртку', 'An inverse transform via convolution'),
          body: L(R`$\mathcal L^{-1}\left\{\dfrac1{s(s^2+1)}\right\}$ ni o‘ram yordamida toping.`, R`Найдите $\mathcal L^{-1}\left\{\dfrac1{s(s^2+1)}\right\}$ с помощью свёртки.`, R`Find $\mathcal L^{-1}\left\{\dfrac1{s(s^2+1)}\right\}$ using convolution.`),
          steps: [
            L(R`$\dfrac1s\cdot\dfrac1{s^2+1}$: $f=1$, $g=\sin t$.`, R`$\dfrac1s\cdot\dfrac1{s^2+1}$: $f=1$, $g=\sin t$.`, R`$\dfrac1s\cdot\dfrac1{s^2+1}$: $f=1$, $g=\sin t$.`),
            L(R`$(1*\sin)(t)=\displaystyle\int_0^t\sin(t-\tau)\,d\tau=\big[\cos(t-\tau)\big]_0^t=1-\cos t$.`, R`$(1*\sin)(t)=\displaystyle\int_0^t\sin(t-\tau)\,d\tau=\big[\cos(t-\tau)\big]_0^t=1-\cos t$.`, R`$(1*\sin)(t)=\displaystyle\int_0^t\sin(t-\tau)\,d\tau=\big[\cos(t-\tau)\big]_0^t=1-\cos t$.`)
          ],
          check: L(R`$\mathcal L\{1-\cos t\}=\frac1s-\frac s{s^2+1}=\frac{s^2+1-s^2}{s(s^2+1)}=\frac1{s(s^2+1)}$ ✓.`, R`$\mathcal L\{1-\cos t\}=\frac1s-\frac s{s^2+1}=\frac{s^2+1-s^2}{s(s^2+1)}=\frac1{s(s^2+1)}$ ✓.`, R`$\mathcal L\{1-\cos t\}=\frac1s-\frac s{s^2+1}=\frac{s^2+1-s^2}{s(s^2+1)}=\frac1{s(s^2+1)}$ ✓.`) },
        { type: 'warn', body: L(R`$u(t-c)f(t)$ ni almashtirishda $e^{-cs}F(s)$ deb yozish — xato. Avval $f(t)$ ni $t-c$ orqali yozing: masalan, $u(t-1)\,t=u(t-1)\big((t-1)+1\big)$, demak $\mathcal L=e^{-s}\left(\frac1{s^2}+\frac1s\right)$.`,
          R`Писать $e^{-cs}F(s)$ для $u(t-c)f(t)$ — ошибка. Сначала выразите $f(t)$ через $t-c$: например, $u(t-1)\,t=u(t-1)\big((t-1)+1\big)$, значит, $\mathcal L=e^{-s}\left(\frac1{s^2}+\frac1s\right)$.`,
          R`Writing $e^{-cs}F(s)$ for $u(t-c)f(t)$ is a mistake. First express $f(t)$ through $t-c$: for example $u(t-1)\,t=u(t-1)\big((t-1)+1\big)$, so $\mathcal L=e^{-s}\left(\frac1{s^2}+\frac1s\right)$.`) }
      ]
    },
    {
      id: 'tL.4',
      title: L('Sistemalar va elektr zanjirlari', 'Системы и электрические цепи', 'Systems and electric circuits'),
      blocks: [
        { type: 'example', title: L('Sistemani Laplas usuli bilan yechish', 'Решение системы методом Лапласа', 'Solving a system with the Laplace method'),
          body: L(R`$x'=-2x+y$, $y'=x-2y$, $x(0)=1$, $y(0)=0$ (masalan, ikki xona orasida issiqlik almashinuvi).`, R`$x'=-2x+y$, $y'=x-2y$, $x(0)=1$, $y(0)=0$ (например, теплообмен между двумя комнатами).`, R`$x'=-2x+y$, $y'=x-2y$, $x(0)=1$, $y(0)=0$ (e.g. heat exchange between two rooms).`),
          steps: [
            L(R`Almashtiramiz: $sX-1=-2X+Y$, $sY=X-2Y$, ya’ni $(s+2)X-Y=1$, $-X+(s+2)Y=0$.`, R`Преобразуем: $sX-1=-2X+Y$, $sY=X-2Y$, т. е. $(s+2)X-Y=1$, $-X+(s+2)Y=0$.`, R`Transform: $sX-1=-2X+Y$, $sY=X-2Y$, i.e. $(s+2)X-Y=1$, $-X+(s+2)Y=0$.`),
            L(R`Kramer: $\Delta=(s+2)^2-1=(s+1)(s+3)$; $X=\dfrac{s+2}{(s+1)(s+3)}$, $Y=\dfrac{1}{(s+1)(s+3)}$.`, R`По Крамеру: $\Delta=(s+2)^2-1=(s+1)(s+3)$; $X=\dfrac{s+2}{(s+1)(s+3)}$, $Y=\dfrac{1}{(s+1)(s+3)}$.`, R`Cramer’s rule: $\Delta=(s+2)^2-1=(s+1)(s+3)$; $X=\dfrac{s+2}{(s+1)(s+3)}$, $Y=\dfrac{1}{(s+1)(s+3)}$.`),
            L(R`$X=\dfrac{1/2}{s+1}+\dfrac{1/2}{s+3}$, $Y=\dfrac{1/2}{s+1}-\dfrac{1/2}{s+3}$: $\ x=\frac12(e^{-t}+e^{-3t})$, $y=\frac12(e^{-t}-e^{-3t})$.`, R`$X=\dfrac{1/2}{s+1}+\dfrac{1/2}{s+3}$, $Y=\dfrac{1/2}{s+1}-\dfrac{1/2}{s+3}$: $\ x=\frac12(e^{-t}+e^{-3t})$, $y=\frac12(e^{-t}-e^{-3t})$.`, R`$X=\dfrac{1/2}{s+1}+\dfrac{1/2}{s+3}$, $Y=\dfrac{1/2}{s+1}-\dfrac{1/2}{s+3}$: $\ x=\frac12(e^{-t}+e^{-3t})$, $y=\frac12(e^{-t}-e^{-3t})$.`)
          ],
          check: L(R`$x'=\frac12(-e^{-t}-3e^{-3t})$; $-2x+y=-e^{-t}-e^{-3t}+\frac12e^{-t}-\frac12e^{-3t}=\frac12(-e^{-t}-3e^{-3t})$ ✓; $x(0)=1$, $y(0)=0$ ✓.`, R`$x'=\frac12(-e^{-t}-3e^{-3t})$; $-2x+y=-e^{-t}-e^{-3t}+\frac12e^{-t}-\frac12e^{-3t}=\frac12(-e^{-t}-3e^{-3t})$ ✓; $x(0)=1$, $y(0)=0$ ✓.`, R`$x'=\frac12(-e^{-t}-3e^{-3t})$ and $-2x+y=-e^{-t}-e^{-3t}+\frac12e^{-t}-\frac12e^{-3t}=\frac12(-e^{-t}-3e^{-3t})$ ✓; $x(0)=1$, $y(0)=0$ ✓.`) },
        { type: 'def', title: L('RC va RLC zanjirlari', 'RC- и RLC-цепи', 'RC and RLC circuits'),
          body: L(R`Kirxgof qonuni bo‘yicha zaryad $q(t)$ (tok $i=q'$):
- RC: $Rq'+\dfrac1Cq=E(t)$; $E=E_0$, $q(0)=0$ da $q=CE_0\big(1-e^{-t/(RC)}\big)$, $RC$ — vaqt doimiysi.
- RLC: $Lq''+Rq'+\dfrac1Cq=E(t)$.

Nol boshlang‘ich shartlarda $Q(s)=H(s)\,\mathcal E(s)$, bu yerda $H(s)=\dfrac1{Ls^2+Rs+1/C}$ — **uzatish funksiyasi**. $h=\mathcal L^{-1}\{H\}$ — **impuls javobi** ($E=\delta(t)$ ga javob), ixtiyoriy kirishga javob esa o‘ram: $q=h*E$.`,
          R`По закону Кирхгофа для заряда $q(t)$ (ток $i=q'$):
- RC: $Rq'+\dfrac1Cq=E(t)$; при $E=E_0$, $q(0)=0$: $q=CE_0\big(1-e^{-t/(RC)}\big)$, $RC$ — постоянная времени.
- RLC: $Lq''+Rq'+\dfrac1Cq=E(t)$.

При нулевых начальных условиях $Q(s)=H(s)\,\mathcal E(s)$, где $H(s)=\dfrac1{Ls^2+Rs+1/C}$ — **передаточная функция**. $h=\mathcal L^{-1}\{H\}$ — **импульсная характеристика** (отклик на $E=\delta(t)$), а отклик на любой вход — свёртка: $q=h*E$.`,
          R`Kirchhoff’s law for the charge $q(t)$ (current $i=q'$):
- RC: $Rq'+\dfrac1Cq=E(t)$; with $E=E_0$, $q(0)=0$: $q=CE_0\big(1-e^{-t/(RC)}\big)$, where $RC$ is the time constant.
- RLC: $Lq''+Rq'+\dfrac1Cq=E(t)$.

With zero initial conditions $Q(s)=H(s)\,\mathcal E(s)$, where $H(s)=\dfrac1{Ls^2+Rs+1/C}$ is the **transfer function**. $h=\mathcal L^{-1}\{H\}$ is the **impulse response** (the response to $E=\delta(t)$), and the response to any input is the convolution $q=h*E$.`) },
        { type: 'example', title: L('RLC zanjiri: kuchlanish ulanadi', 'RLC-цепь: включение напряжения', 'RLC circuit: switching on a voltage'),
          body: L(R`$L=1$ H, $R=2$ Om, $C=0{,}2$ F, $t=0$ da $E=10$ V ulanadi, $q(0)=q'(0)=0$: $q''+2q'+5q=10$. $q(t)$ va impuls javobini toping.`, R`$L=1$ Гн, $R=2$ Ом, $C=0{,}2$ Ф, при $t=0$ включается $E=10$ В, $q(0)=q'(0)=0$: $q''+2q'+5q=10$. Найдите $q(t)$ и импульсную характеристику.`, R`$L=1$ H, $R=2$ Ω, $C=0.2$ F, a voltage $E=10$ V is switched on at $t=0$, $q(0)=q'(0)=0$: $q''+2q'+5q=10$. Find $q(t)$ and the impulse response.`),
          steps: [
            L(R`$(s^2+2s+5)Q=\dfrac{10}s$, $Q=\dfrac{10}{s(s^2+2s+5)}=\dfrac2s-\dfrac{2(s+2)}{(s+1)^2+4}$.`, R`$(s^2+2s+5)Q=\dfrac{10}s$, $Q=\dfrac{10}{s(s^2+2s+5)}=\dfrac2s-\dfrac{2(s+2)}{(s+1)^2+4}$.`, R`$(s^2+2s+5)Q=\dfrac{10}s$, $Q=\dfrac{10}{s(s^2+2s+5)}=\dfrac2s-\dfrac{2(s+2)}{(s+1)^2+4}$.`),
            L(R`$\dfrac{2(s+2)}{(s+1)^2+4}=\dfrac{2(s+1)}{(s+1)^2+4}+\dfrac{2}{(s+1)^2+4}$, shuning uchun $q=2-e^{-t}(2\cos2t+\sin2t)$.`, R`$\dfrac{2(s+2)}{(s+1)^2+4}=\dfrac{2(s+1)}{(s+1)^2+4}+\dfrac{2}{(s+1)^2+4}$, поэтому $q=2-e^{-t}(2\cos2t+\sin2t)$.`, R`$\dfrac{2(s+2)}{(s+1)^2+4}=\dfrac{2(s+1)}{(s+1)^2+4}+\dfrac{2}{(s+1)^2+4}$, hence $q=2-e^{-t}(2\cos2t+\sin2t)$.`),
            L(R`$t\to\infty$ da $q\to CE=2$ Kl (kondensator zaryadlandi), o‘tish jarayoni so‘nuvchi tebranish ($\tau=-2<0$, kompleks ildizlar).`, R`При $t\to\infty$ $q\to CE=2$ Кл (конденсатор заряжен), переходный процесс — затухающие колебания (корни комплексные, $\operatorname{Re}=-1$).`, R`As $t\to\infty$, $q\to CE=2$ C (the capacitor is charged); the transient is a damped oscillation (complex roots with real part $-1$).`),
            L(R`Impuls javobi: $H=\dfrac1{(s+1)^2+4}$, $h(t)=\frac12e^{-t}\sin2t$. Haqiqatan $q=h*10$.`, R`Импульсная характеристика: $H=\dfrac1{(s+1)^2+4}$, $h(t)=\frac12e^{-t}\sin2t$. Действительно, $q=h*10$.`, R`Impulse response: $H=\dfrac1{(s+1)^2+4}$, $h(t)=\frac12e^{-t}\sin2t$. Indeed $q=h*10$.`)
          ],
          check: L(R`$q''+2q'+5q=10$, $q(0)=0$, $q'(0)=0$ ✓.`, R`$q''+2q'+5q=10$, $q(0)=0$, $q'(0)=0$ ✓.`, R`$q''+2q'+5q=10$, $q(0)=0$, $q'(0)=0$ ✓.`) },
        { type: 'lab', lab: 'L12', body: L(R`Laboratoriyada tenglama koeffitsiyentlari, boshlang‘ich shartlar va o‘ng tomonni (o‘zgarmas, eksponenta, $\sin$, pog‘ona, impuls) tanlang. Yechuvchi $Y(s)$ ni, sodda kasrlarni va $y(t)$ ni bosqichma-bosqich ko‘rsatadi (mustaqil ishlar 12–13).`, R`В лаборатории выберите коэффициенты уравнения, начальные условия и правую часть (константа, экспонента, $\sin$, ступенька, импульс). Решатель пошагово покажет $Y(s)$, простейшие дроби и $y(t)$ (самостоятельные работы 12–13).`, R`In the lab, choose the coefficients, initial conditions and right-hand side (constant, exponential, $\sin$, step, impulse). The solver shows $Y(s)$, the partial fractions and $y(t)$ step by step (independent tasks 12–13).`) },
        { type: 'warn', body: L(R`Laplas usuli **o‘zgarmas koeffitsientli chiziqli** tenglamalar uchun qulay va boshlang‘ich shartlar $t=0$ da berilganda ishlaydi. Shart $t_0\ne0$ da berilsa, avval $\tau=t-t_0$ almashtirish qiling. Nochiziqli tenglamalarga ($y'=y^2$) u bevosita qo‘llanmaydi.`,
          R`Метод Лапласа удобен для **линейных уравнений с постоянными коэффициентами** и работает, когда начальные условия заданы при $t=0$. Если условие задано в $t_0\ne0$, сначала сделайте замену $\tau=t-t_0$. К нелинейным уравнениям ($y'=y^2$) он напрямую не применяется.`,
          R`The Laplace method suits **linear equations with constant coefficients** with initial conditions given at $t=0$. If the condition is at $t_0\ne0$, substitute $\tau=t-t_0$ first. It does not apply directly to nonlinear equations ($y'=y^2$).`) }
      ]
    }
  ],
  mistakes: [
    L(R`$\mathcal L\{y''\}$ da boshlang‘ich shartlarni noto‘g‘ri joylash: $s^2Y-y(0)-sy'(0)$ emas, $s^2Y-sy(0)-y'(0)$.`, R`Неверно расставлять начальные условия в $\mathcal L\{y''\}$: не $s^2Y-y(0)-sy'(0)$, а $s^2Y-sy(0)-y'(0)$.`, R`Misplacing the initial values in $\mathcal L\{y''\}$: it is $s^2Y-sy(0)-y'(0)$, not $s^2Y-y(0)-sy'(0)$.`),
    L(R`$\mathcal L\{fg\}=FG$ deb hisoblash. Ko‘paytma o‘ramga mos keladi.`, R`Считать $\mathcal L\{fg\}=FG$. Произведению изображений соответствует свёртка.`, R`Assuming $\mathcal L\{fg\}=FG$. A product of images corresponds to a convolution.`),
    L(R`$u(t-c)f(t)$ uchun $e^{-cs}F(s)$ yozish (argumentni $t-c$ ga keltirmasdan).`, R`Писать $e^{-cs}F(s)$ для $u(t-c)f(t)$, не приведя аргумент к $t-c$.`, R`Writing $e^{-cs}F(s)$ for $u(t-c)f(t)$ without rewriting the argument as $t-c$.`),
    L(R`Kvadratni to‘ldirishda suratni ham siljitishni unutish: $\frac{s+3}{(s+1)^2+4}\ne\mathcal L\{e^{-t}\cos2t\}$; avval $s+3=(s+1)+2$.`, R`Забывать сдвинуть и числитель при выделении квадрата: $\frac{s+3}{(s+1)^2+4}\ne\mathcal L\{e^{-t}\cos2t\}$; сначала $s+3=(s+1)+2$.`, R`Forgetting to shift the numerator too when completing the square: $\frac{s+3}{(s+1)^2+4}\ne\mathcal L\{e^{-t}\cos2t\}$; first write $s+3=(s+1)+2$.`),
    L(R`Almashtirish mavjud bo‘ladigan $s$ sohasini ko‘rsatmaslik: $\mathcal L\{e^{3t}\}=\frac1{s-3}$ faqat $s>3$ da.`, R`Не указывать область $s$, где преобразование существует: $\mathcal L\{e^{3t}\}=\frac1{s-3}$ только при $s>3$.`, R`Not stating the range of $s$ where the transform exists: $\mathcal L\{e^{3t}\}=\frac1{s-3}$ only for $s>3$.`)
  ],
  exercises: [
    { id: 'tL.x1', level: 'easy', type: 'formula',
      q: L(R`$\mathcal L\{t^3\}$ ni toping: $F(s)=\ ?$`, R`Найдите $\mathcal L\{t^3\}$: $F(s)=\ ?$`, R`Find $\mathcal L\{t^3\}$: $F(s)=\ ?$`),
      check: { kind: 'equiv', ref: '6/s^4', vars: { s: [1, 4] }, lhs: 'F' }, answer: '6/s^4',
      hint: L(R`$\mathcal L\{t^n\}=\frac{n!}{s^{n+1}}$.`, R`$\mathcal L\{t^n\}=\frac{n!}{s^{n+1}}$.`, R`$\mathcal L\{t^n\}=\frac{n!}{s^{n+1}}$.`),
      solution: L(R`$\frac{3!}{s^4}=\frac6{s^4}$, $s>0$.`, R`$\frac{3!}{s^4}=\frac6{s^4}$, $s>0$.`, R`$\frac{3!}{s^4}=\frac6{s^4}$, $s>0$.`) },
    { id: 'tL.x2', level: 'easy', type: 'mcq',
      q: L(R`$\mathcal L\{e^{-3t}\}$ =`, R`$\mathcal L\{e^{-3t}\}$ =`, R`$\mathcal L\{e^{-3t}\}$ =`),
      options: [L(R`$\frac1{s+3}$, $s>-3$`, R`$\frac1{s+3}$, $s>-3$`, R`$\frac1{s+3}$, $s>-3$`), L(R`$\frac1{s-3}$, $s>3$`, R`$\frac1{s-3}$, $s>3$`, R`$\frac1{s-3}$, $s>3$`), L(R`$\frac3{s^2+9}$`, R`$\frac3{s^2+9}$`, R`$\frac3{s^2+9}$`), L(R`$-\frac3s$`, R`$-\frac3s$`, R`$-\frac3s$`)], correct: 0,
      solution: L(R`$\frac1{s-a}$ da $a=-3$.`, R`В $\frac1{s-a}$ $a=-3$.`, R`In $\frac1{s-a}$ take $a=-3$.`) },
    { id: 'tL.x3', level: 'mid', type: 'formula',
      q: L(R`$\mathcal L\{e^{2t}\cos3t\}$ ni toping: $F(s)=\ ?$`, R`Найдите $\mathcal L\{e^{2t}\cos3t\}$: $F(s)=\ ?$`, R`Find $\mathcal L\{e^{2t}\cos3t\}$: $F(s)=\ ?$`),
      check: { kind: 'equiv', ref: '(s-2)/((s-2)^2+9)', vars: { s: [2.5, 6] }, lhs: 'F' }, answer: '(s-2)/((s-2)^2+9)',
      hint: L(R`Birinchi siljish: $\mathcal L\{\cos3t\}=\frac s{s^2+9}$, $s\to s-2$.`, R`Первое смещение: $\mathcal L\{\cos3t\}=\frac s{s^2+9}$, $s\to s-2$.`, R`First shift: $\mathcal L\{\cos3t\}=\frac s{s^2+9}$, $s\to s-2$.`),
      solution: L(R`$\dfrac{s-2}{(s-2)^2+9}$, $s>2$.`, R`$\dfrac{s-2}{(s-2)^2+9}$, $s>2$.`, R`$\dfrac{s-2}{(s-2)^2+9}$, $s>2$.`) },
    { id: 'tL.x4', level: 'mid', type: 'formula',
      q: L(R`$\mathcal L^{-1}\left\{\dfrac{2s+1}{s^2+s-2}\right\}$ ni toping: $f(t)=\ ?$`, R`Найдите $\mathcal L^{-1}\left\{\dfrac{2s+1}{s^2+s-2}\right\}$: $f(t)=\ ?$`, R`Find $\mathcal L^{-1}\left\{\dfrac{2s+1}{s^2+s-2}\right\}$: $f(t)=\ ?$`),
      check: { kind: 'equiv', ref: 'exp(t) + exp(-2*t)', vars: { t: [0, 2] }, lhs: 'f' }, answer: 'exp(t) + exp(-2*t)',
      hint: L(R`$s^2+s-2=(s-1)(s+2)$.`, R`$s^2+s-2=(s-1)(s+2)$.`, R`$s^2+s-2=(s-1)(s+2)$.`),
      solution: L(R`$\frac{2s+1}{(s-1)(s+2)}=\frac{A}{s-1}+\frac{B}{s+2}$: $A=\frac{3}{3}=1$, $B=\frac{-3}{-3}=1$. $f=e^t+e^{-2t}$.`, R`$\frac{2s+1}{(s-1)(s+2)}=\frac{A}{s-1}+\frac{B}{s+2}$: $A=\frac{3}{3}=1$, $B=\frac{-3}{-3}=1$. $f=e^t+e^{-2t}$.`, R`$\frac{2s+1}{(s-1)(s+2)}=\frac{A}{s-1}+\frac{B}{s+2}$: $A=\frac{3}{3}=1$, $B=\frac{-3}{-3}=1$. $f=e^t+e^{-2t}$.`) },
    { id: 'tL.x5', level: 'mid', type: 'formula',
      q: L(R`Laplas usuli bilan yeching: $y'+3y=e^{-t}$, $y(0)=0$. $y(t)=\ ?$`, R`Решите методом Лапласа: $y'+3y=e^{-t}$, $y(0)=0$. $y(t)=\ ?$`, R`Solve by the Laplace method: $y'+3y=e^{-t}$, $y(0)=0$. $y(t)=\ ?$`),
      check: { kind: 'equiv', ref: '(exp(-t) - exp(-3*t))/2', vars: { t: [0, 3] } }, answer: '(exp(-t) - exp(-3*t))/2',
      hint: L(R`$Y=\dfrac1{(s+1)(s+3)}$.`, R`$Y=\dfrac1{(s+1)(s+3)}$.`, R`$Y=\dfrac1{(s+1)(s+3)}$.`),
      solution: L(R`$(s+3)Y=\frac1{s+1}$, $Y=\frac{1/2}{s+1}-\frac{1/2}{s+3}$, $y=\frac12(e^{-t}-e^{-3t})$.`, R`$(s+3)Y=\frac1{s+1}$, $Y=\frac{1/2}{s+1}-\frac{1/2}{s+3}$, $y=\frac12(e^{-t}-e^{-3t})$.`, R`$(s+3)Y=\frac1{s+1}$, $Y=\frac{1/2}{s+1}-\frac{1/2}{s+3}$, $y=\frac12(e^{-t}-e^{-3t})$.`) },
    { id: 'tL.x6', level: 'mid', type: 'match',
      q: L('Originalni tasvir bilan moslang.', 'Сопоставьте оригинал и изображение.', 'Match each original with its transform.'),
      pairs: [
        { left: L(R`$\sin3t$`, R`$\sin3t$`, R`$\sin3t$`), right: L(R`$\frac3{s^2+9}$`, R`$\frac3{s^2+9}$`, R`$\frac3{s^2+9}$`) },
        { left: L(R`$te^{-2t}$`, R`$te^{-2t}$`, R`$te^{-2t}$`), right: L(R`$\frac1{(s+2)^2}$`, R`$\frac1{(s+2)^2}$`, R`$\frac1{(s+2)^2}$`) },
        { left: L(R`$u(t-3)$`, R`$u(t-3)$`, R`$u(t-3)$`), right: L(R`$\frac{e^{-3s}}s$`, R`$\frac{e^{-3s}}s$`, R`$\frac{e^{-3s}}s$`) },
        { left: L(R`$\delta(t-2)$`, R`$\delta(t-2)$`, R`$\delta(t-2)$`), right: L(R`$e^{-2s}$`, R`$e^{-2s}$`, R`$e^{-2s}$`) },
        { left: L(R`$e^{-t}\sin2t$`, R`$e^{-t}\sin2t$`, R`$e^{-t}\sin2t$`), right: L(R`$\frac2{(s+1)^2+4}$`, R`$\frac2{(s+1)^2+4}$`, R`$\frac2{(s+1)^2+4}$`) }
      ],
      explain: L('Jadval va siljish teoremalari.', 'Таблица и теоремы смещения.', 'The table and the shifting theorems.') },
    { id: 'tL.x7', level: 'hard', type: 'formula',
      q: L(R`$y'+y=u(t-2)$, $y(0)=0$. $t>2$ uchun $y(t)=\ ?$`, R`$y'+y=u(t-2)$, $y(0)=0$. При $t>2$: $y(t)=\ ?$`, R`$y'+y=u(t-2)$, $y(0)=0$. For $t>2$: $y(t)=\ ?$`),
      check: { kind: 'equiv', ref: '1 - exp(2 - t)', vars: { t: [2.1, 6] } }, answer: '1 - exp(-(t-2))',
      hint: L(R`$Y=e^{-2s}\left(\frac1s-\frac1{s+1}\right)$.`, R`$Y=e^{-2s}\left(\frac1s-\frac1{s+1}\right)$.`, R`$Y=e^{-2s}\left(\frac1s-\frac1{s+1}\right)$.`),
      solution: L(R`$y=u(t-2)\big(1-e^{-(t-2)}\big)$; $t>2$ da $y=1-e^{2-t}$ ($t<2$ da $0$).`, R`$y=u(t-2)\big(1-e^{-(t-2)}\big)$; при $t>2$ $y=1-e^{2-t}$ (при $t<2$ — $0$).`, R`$y=u(t-2)\big(1-e^{-(t-2)}\big)$; for $t>2$, $y=1-e^{2-t}$ (and $0$ for $t<2$).`) },
    { id: 'tL.x8', level: 'hard', type: 'numeric',
      q: L(R`$(1*\sin)(t)=\int_0^t\sin(t-\tau)\,d\tau$ o‘ramning $t=\pi$ dagi qiymatini kiriting.`, R`Введите значение свёртки $(1*\sin)(t)=\int_0^t\sin(t-\tau)\,d\tau$ при $t=\pi$.`, R`Enter the value of the convolution $(1*\sin)(t)=\int_0^t\sin(t-\tau)\,d\tau$ at $t=\pi$.`),
      check: { kind: 'numeric', value: 2, tol: 1e-6 },
      hint: L(R`$(1*\sin)(t)=1-\cos t$.`, R`$(1*\sin)(t)=1-\cos t$.`, R`$(1*\sin)(t)=1-\cos t$.`),
      solution: L(R`$1-\cos\pi=2$.`, R`$1-\cos\pi=2$.`, R`$1-\cos\pi=2$.`) },
    { id: 'tL.x9', level: 'hard', type: 'finderror',
      q: L(R`Talaba $y''+4y=0$, $y(0)=0$, $y'(0)=2$ ni yechdi. Qaysi qatorda xato bor?`, R`Студент решил $y''+4y=0$, $y(0)=0$, $y'(0)=2$. В какой строке ошибка?`, R`A student solved $y''+4y=0$, $y(0)=0$, $y'(0)=2$. Which line is wrong?`),
      lines: [
        L(R`$\mathcal L\{y''\}=s^2Y-y(0)-sy'(0)=s^2Y-2s$`, R`$\mathcal L\{y''\}=s^2Y-y(0)-sy'(0)=s^2Y-2s$`, R`$\mathcal L\{y''\}=s^2Y-y(0)-sy'(0)=s^2Y-2s$`),
        L(R`$(s^2+4)Y=2s$`, R`$(s^2+4)Y=2s$`, R`$(s^2+4)Y=2s$`),
        L(R`$y=2\cos2t$`, R`$y=2\cos2t$`, R`$y=2\cos2t$`)
      ],
      wrong: 0,
      explain: L(R`To‘g‘risi $s^2Y-sy(0)-y'(0)=s^2Y-2$. Shunda $Y=\frac2{s^2+4}$, $y=\sin2t$ ($y(0)=0$ ✓, $y'(0)=2$ ✓). Talabaning javobi $y(0)=2$ beradi — shartga zid.`, R`Правильно $s^2Y-sy(0)-y'(0)=s^2Y-2$. Тогда $Y=\frac2{s^2+4}$, $y=\sin2t$ ($y(0)=0$ ✓, $y'(0)=2$ ✓). Ответ студента даёт $y(0)=2$ — противоречит условию.`, R`The correct form is $s^2Y-sy(0)-y'(0)=s^2Y-2$. Then $Y=\frac2{s^2+4}$ and $y=\sin2t$ ($y(0)=0$ ✓, $y'(0)=2$ ✓). The student’s answer gives $y(0)=2$, contradicting the condition.`) },
    { id: 'tL.x10', level: 'mid', type: 'order',
      q: L('Laplas usuli bilan boshlang‘ich masalani yechish qadamlarini tartiblang.', 'Упорядочьте шаги решения начальной задачи методом Лапласа.', 'Order the steps of solving an initial value problem by the Laplace method.'),
      items: [
        L('Tenglamaning ikkala tomonini almashtirish (boshlang‘ich shartlarni qo‘yib)', 'Преобразовать обе части уравнения (с начальными условиями)', 'Transform both sides (inserting the initial values)'),
        L(R`Algebraik tenglamadan $Y(s)$ ni topish`, R`Найти $Y(s)$ из алгебраического уравнения`, R`Solve the algebraic equation for $Y(s)$`),
        L(R`$Y(s)$ ni sodda kasrlarga ajratish`, R`Разложить $Y(s)$ на простейшие дроби`, R`Split $Y(s)$ into partial fractions`),
        L(R`Jadval bo‘yicha $y(t)=\mathcal L^{-1}\{Y\}$`, R`По таблице $y(t)=\mathcal L^{-1}\{Y\}$`, R`Use the table: $y(t)=\mathcal L^{-1}\{Y\}$`),
        L('Tenglama va shartlarga qo‘yib tekshirish', 'Проверить подстановкой в уравнение и условия', 'Check by substituting into the equation and conditions')
      ],
      explain: L('Almashtirish → algebra → sodda kasrlar → teskari almashtirish → tekshiruv.', 'Преобразование → алгебра → простейшие дроби → обратное преобразование → проверка.', 'Transform → algebra → partial fractions → inverse transform → check.') },
    { id: 'tL.x11', level: 'hard', type: 'steps',
      q: L(R`RC zanjiri: $R=2$, $C=0{,}5$, $Rq'+q/C=E(t)$, $q(0)=0$. $E=\delta(t)$ (qisqa impuls) bo‘lsin.`, R`RC-цепь: $R=2$, $C=0{,}5$, $Rq'+q/C=E(t)$, $q(0)=0$. Пусть $E=\delta(t)$ (короткий импульс).`, R`RC circuit: $R=2$, $C=0.5$, $Rq'+q/C=E(t)$, $q(0)=0$. Let $E=\delta(t)$ (a short pulse).`),
      steps: [
        { q: L(R`Tenglama $Rq'+q/C=E$ ni $R=2$ ga bo‘lsak:`, R`Деля $Rq'+q/C=E$ на $R=2$, получаем:`, R`Dividing $Rq'+q/C=E$ by $R=2$ gives:`), options: [L(R`$q'+q=E/2$`, R`$q'+q=E/2$`, R`$q'+q=E/2$`), L(R`$q'+q=E$`, R`$q'+q=E$`, R`$q'+q=E$`)], correct: 0 },
        { q: L(R`$E=\delta(t)$ da $Q(s)$:`, R`При $E=\delta(t)$: $Q(s)=$`, R`With $E=\delta(t)$, $Q(s)$ is:`), options: [L(R`$\frac{1/2}{s+1}$`, R`$\frac{1/2}{s+1}$`, R`$\frac{1/2}{s+1}$`), L(R`$\frac{1}{s(s+1)}$`, R`$\frac{1}{s(s+1)}$`, R`$\frac{1}{s(s+1)}$`)], correct: 0 },
        { q: L('Impuls javobi:', 'Импульсная характеристика:', 'Impulse response:'), options: [L(R`$q=\frac12e^{-t}$`, R`$q=\frac12e^{-t}$`, R`$q=\frac12e^{-t}$`), L(R`$q=1-e^{-t}$`, R`$q=1-e^{-t}$`, R`$q=1-e^{-t}$`)], correct: 0 }
      ],
      explain: L(R`$2q'+2q=E$, ya’ni $q'+q=E/2$. $\mathcal L\{\delta\}=1$, $Q=\frac{1/2}{s+1}$, $q=\frac12e^{-t}$: impuls zaryadni bir zumda $\frac12$ ga ko‘taradi, keyin $RC=1$ vaqt doimiysi bilan so‘nadi.`, R`$2q'+2q=E$, т. е. $q'+q=E/2$. $\mathcal L\{\delta\}=1$, $Q=\frac{1/2}{s+1}$, $q=\frac12e^{-t}$: импульс мгновенно поднимает заряд до $\frac12$, затем он затухает с постоянной времени $RC=1$.`, R`$2q'+2q=E$, i.e. $q'+q=E/2$. $\mathcal L\{\delta\}=1$, $Q=\frac{1/2}{s+1}$, $q=\frac12e^{-t}$: the pulse lifts the charge to $\frac12$ instantly, then it decays with time constant $RC=1$.`) }
  ],
  quiz: [
    { id: 'tL.q1', q: L(R`$\mathcal L\{1\}$ =`, R`$\mathcal L\{1\}$ =`, R`$\mathcal L\{1\}$ =`),
      options: [L(R`$\frac1s$, $s>0$`, R`$\frac1s$, $s>0$`, R`$\frac1s$, $s>0$`), L(R`$1$`, R`$1$`, R`$1$`), L(R`$s$`, R`$s$`, R`$s$`), L(R`$\frac1{s^2}$`, R`$\frac1{s^2}$`, R`$\frac1{s^2}$`)], correct: 0,
      explain: L(R`$\int_0^\infty e^{-st}dt=\frac1s$.`, R`$\int_0^\infty e^{-st}dt=\frac1s$.`, R`$\int_0^\infty e^{-st}dt=\frac1s$.`),
      why: [null, L(R`$1$ — bu $\mathcal L\{\delta(t)\}$.`, R`$1$ — это $\mathcal L\{\delta(t)\}$.`, R`$1$ is $\mathcal L\{\delta(t)\}$.`), L(R`$F(s)\to0$ bo‘lishi kerak.`, R`Должно быть $F(s)\to0$.`, R`We need $F(s)\to0$.`), L(R`Bu $\mathcal L\{t\}$.`, R`Это $\mathcal L\{t\}$.`, R`That is $\mathcal L\{t\}$.`)] },
    { id: 'tL.q2', q: L('Qaysi funksiyaning Laplas almashtirishi mavjud emas?', 'У какой функции нет преобразования Лапласа?', 'Which function has no Laplace transform?'),
      options: [L(R`$e^{t^2}$`, R`$e^{t^2}$`, R`$e^{t^2}$`), L(R`$e^{5t}$`, R`$e^{5t}$`, R`$e^{5t}$`), L(R`$t^{10}$`, R`$t^{10}$`, R`$t^{10}$`), L(R`$u(t-1)$`, R`$u(t-1)$`, R`$u(t-1)$`)], correct: 0,
      explain: L(R`$e^{t^2}$ har qanday $e^{at}$ dan tez o‘sadi — eksponensial tartibli emas va integral uzoqlashadi.`, R`$e^{t^2}$ растёт быстрее любой $e^{at}$ — не экспоненциального порядка, интеграл расходится.`, R`$e^{t^2}$ grows faster than every $e^{at}$; it is not of exponential order and the integral diverges.`),
      why: [null, L(R`$\frac1{s-5}$, $s>5$.`, R`$\frac1{s-5}$, $s>5$.`, R`$\frac1{s-5}$, $s>5$.`), L(R`$\frac{10!}{s^{11}}$.`, R`$\frac{10!}{s^{11}}$.`, R`$\frac{10!}{s^{11}}$.`), L(R`$\frac{e^{-s}}s$.`, R`$\frac{e^{-s}}s$.`, R`$\frac{e^{-s}}s$.`)] },
    { id: 'tL.q3', q: L(R`$\mathcal L\{y'\}$ =`, R`$\mathcal L\{y'\}$ =`, R`$\mathcal L\{y'\}$ =`),
      options: [L(R`$sY-y(0)$`, R`$sY-y(0)$`, R`$sY-y(0)$`), L(R`$sY+y(0)$`, R`$sY+y(0)$`, R`$sY+y(0)$`), L(R`$Y/s$`, R`$Y/s$`, R`$Y/s$`), L(R`$sY$`, R`$sY$`, R`$sY$`)], correct: 0,
      explain: L('Bo‘laklab integrallash natijasi.', 'Результат интегрирования по частям.', 'The result of integration by parts.'),
      why: [null, L('Ishora noto‘g‘ri.', 'Неверный знак.', 'Wrong sign.'), L(R`Bu $\int_0^t y\,d\tau$ ning tasviri.`, R`Это изображение $\int_0^t y\,d\tau$.`, R`That is the transform of $\int_0^t y\,d\tau$.`), L(R`$y(0)$ unutilgan.`, R`Забыто $y(0)$.`, R`$y(0)$ is missing.`)] },
    { id: 'tL.q4', q: L(R`$\mathcal L^{-1}\left\{\frac{1}{(s-2)^2}\right\}$ =`, R`$\mathcal L^{-1}\left\{\frac{1}{(s-2)^2}\right\}$ =`, R`$\mathcal L^{-1}\left\{\frac{1}{(s-2)^2}\right\}$ =`),
      options: [L(R`$te^{2t}$`, R`$te^{2t}$`, R`$te^{2t}$`), L(R`$e^{2t}$`, R`$e^{2t}$`, R`$e^{2t}$`), L(R`$t^2e^{2t}$`, R`$t^2e^{2t}$`, R`$t^2e^{2t}$`), L(R`$e^{-2t}t$`, R`$e^{-2t}t$`, R`$e^{-2t}t$`)], correct: 0,
      explain: L(R`$\mathcal L\{t\}=\frac1{s^2}$ va birinchi siljish $c=2$.`, R`$\mathcal L\{t\}=\frac1{s^2}$ и первое смещение $c=2$.`, R`$\mathcal L\{t\}=\frac1{s^2}$ and the first shift with $c=2$.`),
      why: [null, L(R`Bu $\frac1{s-2}$.`, R`Это $\frac1{s-2}$.`, R`That is $\frac1{s-2}$.`), L(R`Bu $\frac2{(s-2)^3}$.`, R`Это $\frac2{(s-2)^3}$.`, R`That is $\frac2{(s-2)^3}$.`), L('Siljish yo‘nalishi noto‘g‘ri.', 'Неверное направление сдвига.', 'Wrong shift direction.')] },
    { id: 'tL.q5', q: L(R`$e^{-3s}F(s)$ tasvirning originali:`, R`Оригинал изображения $e^{-3s}F(s)$:`, R`The original of $e^{-3s}F(s)$ is:`),
      options: [L(R`$u(t-3)f(t-3)$`, R`$u(t-3)f(t-3)$`, R`$u(t-3)f(t-3)$`), L(R`$e^{-3t}f(t)$`, R`$e^{-3t}f(t)$`, R`$e^{-3t}f(t)$`), L(R`$u(t-3)f(t)$`, R`$u(t-3)f(t)$`, R`$u(t-3)f(t)$`), L(R`$f(t+3)$`, R`$f(t+3)$`, R`$f(t+3)$`)], correct: 0,
      explain: L('Ikkinchi siljish teoremasi.', 'Вторая теорема смещения.', 'The second shifting theorem.'),
      why: [null, L(R`Bu $F(s+3)$ ning originali.`, R`Это оригинал $F(s+3)$.`, R`That is the original of $F(s+3)$.`), L(R`Argument $t-3$ bo‘lishi kerak.`, R`Аргумент должен быть $t-3$.`, R`The argument must be $t-3$.`), L('Kechikish, oldinga siljish emas.', 'Запаздывание, а не опережение.', 'A delay, not an advance.')] },
    { id: 'tL.q6', q: L(R`$\mathcal L\{\delta(t-4)\}$ =`, R`$\mathcal L\{\delta(t-4)\}$ =`, R`$\mathcal L\{\delta(t-4)\}$ =`),
      options: [L(R`$e^{-4s}$`, R`$e^{-4s}$`, R`$e^{-4s}$`), L(R`$\frac{e^{-4s}}s$`, R`$\frac{e^{-4s}}s$`, R`$\frac{e^{-4s}}s$`), L(R`$1$`, R`$1$`, R`$1$`), L(R`$\frac1{s-4}$`, R`$\frac1{s-4}$`, R`$\frac1{s-4}$`)], correct: 0,
      explain: L(R`$\int_0^\infty e^{-st}\delta(t-4)dt=e^{-4s}$.`, R`$\int_0^\infty e^{-st}\delta(t-4)dt=e^{-4s}$.`, R`$\int_0^\infty e^{-st}\delta(t-4)dt=e^{-4s}$.`),
      why: [null, L(R`Bu $u(t-4)$ ning tasviri.`, R`Это изображение $u(t-4)$.`, R`That is the transform of $u(t-4)$.`), L(R`Bu $\delta(t)$ uchun.`, R`Это для $\delta(t)$.`, R`That is for $\delta(t)$.`), L(R`Bu $e^{4t}$ ning tasviri.`, R`Это изображение $e^{4t}$.`, R`That is the transform of $e^{4t}$.`)] },
    { id: 'tL.q7', q: L(R`$F(s)G(s)$ ko‘paytmaga qaysi original mos keladi?`, R`Какой оригинал соответствует произведению $F(s)G(s)$?`, R`Which original corresponds to the product $F(s)G(s)$?`),
      options: [L(R`$\int_0^tf(\tau)g(t-\tau)\,d\tau$`, R`$\int_0^tf(\tau)g(t-\tau)\,d\tau$`, R`$\int_0^tf(\tau)g(t-\tau)\,d\tau$`), L(R`$f(t)g(t)$`, R`$f(t)g(t)$`, R`$f(t)g(t)$`), L(R`$f(t)+g(t)$`, R`$f(t)+g(t)$`, R`$f(t)+g(t)$`), L(R`$f(g(t))$`, R`$f(g(t))$`, R`$f(g(t))$`)], correct: 0,
      explain: L('O‘ram teoremasi.', 'Теорема о свёртке.', 'The convolution theorem.'),
      why: [null, L(R`$\mathcal L\{fg\}\ne FG$.`, R`$\mathcal L\{fg\}\ne FG$.`, R`$\mathcal L\{fg\}\ne FG$.`), L(R`Yig‘indiga $F+G$ mos.`, R`Сумме соответствует $F+G$.`, R`A sum corresponds to $F+G$.`), L('Kompozitsiyaning oddiy formulasi yo‘q.', 'Для композиции простой формулы нет.', 'There is no simple formula for composition.')] },
    { id: 'tL.q8', q: L(R`RLC zanjirida $q''+2q'+5q=E(t)$. Uzatish funksiyasi $H(s)$:`, R`В RLC-цепи $q''+2q'+5q=E(t)$. Передаточная функция $H(s)$:`, R`For the RLC circuit $q''+2q'+5q=E(t)$ the transfer function $H(s)$ is:`),
      options: [L(R`$\frac1{s^2+2s+5}$`, R`$\frac1{s^2+2s+5}$`, R`$\frac1{s^2+2s+5}$`), L(R`$s^2+2s+5$`, R`$s^2+2s+5$`, R`$s^2+2s+5$`), L(R`$\frac{s}{s^2+2s+5}$`, R`$\frac{s}{s^2+2s+5}$`, R`$\frac{s}{s^2+2s+5}$`), L(R`$\frac{10}{s(s^2+2s+5)}$`, R`$\frac{10}{s(s^2+2s+5)}$`, R`$\frac{10}{s(s^2+2s+5)}$`)], correct: 0,
      explain: L(R`Nol shartlarda $Q=H\cdot\mathcal E$, $H=1/(s^2+2s+5)$.`, R`При нулевых условиях $Q=H\cdot\mathcal E$, $H=1/(s^2+2s+5)$.`, R`With zero initial conditions $Q=H\cdot\mathcal E$, $H=1/(s^2+2s+5)$.`),
      why: [null, L('Teskarisi kerak.', 'Нужна обратная величина.', 'It is the reciprocal.'), L(R`$s$ ortiqcha.`, R`Лишний множитель $s$.`, R`The factor $s$ is extra.`), L(R`Bu $E=10$ dagi $Q(s)$.`, R`Это $Q(s)$ при $E=10$.`, R`That is $Q(s)$ for $E=10$.`)] },
    { id: 'tL.q9', q: L(R`$\frac{s+1}{(s+1)^2+9}$ ning originali:`, R`Оригинал $\frac{s+1}{(s+1)^2+9}$:`, R`The original of $\frac{s+1}{(s+1)^2+9}$ is:`),
      options: [L(R`$e^{-t}\cos3t$`, R`$e^{-t}\cos3t$`, R`$e^{-t}\cos3t$`), L(R`$e^{t}\cos3t$`, R`$e^{t}\cos3t$`, R`$e^{t}\cos3t$`), L(R`$e^{-t}\sin3t$`, R`$e^{-t}\sin3t$`, R`$e^{-t}\sin3t$`), L(R`$\cos3t$`, R`$\cos3t$`, R`$\cos3t$`)], correct: 0,
      explain: L(R`$\mathcal L\{\cos3t\}=\frac s{s^2+9}$, $s\to s+1$.`, R`$\mathcal L\{\cos3t\}=\frac s{s^2+9}$, $s\to s+1$.`, R`$\mathcal L\{\cos3t\}=\frac s{s^2+9}$, $s\to s+1$.`),
      why: [null, L('Ishora: $s+1=s-(-1)$.', 'Знак: $s+1=s-(-1)$.', 'Sign: $s+1=s-(-1)$.'), L(R`$\sin$ ga suratda $3$ kerak.`, R`Для $\sin$ в числителе нужно $3$.`, R`$\sin$ needs $3$ in the numerator.`), L('Siljish unutilgan.', 'Забыт сдвиг.', 'The shift was forgotten.')] },
    { id: 'tL.q10', q: L('Laplas usuli qaysi masalaga to‘g‘ridan-to‘g‘ri eng qulay?', 'К какой задаче метод Лапласа применим удобнее всего?', 'For which problem is the Laplace method most directly suited?'),
      options: [L(R`$y''+3y'+2y=u(t-1)$, $y(0)=y'(0)=0$`, R`$y''+3y'+2y=u(t-1)$, $y(0)=y'(0)=0$`, R`$y''+3y'+2y=u(t-1)$, $y(0)=y'(0)=0$`), L(R`$y'=y^2$, $y(0)=1$`, R`$y'=y^2$, $y(0)=1$`, R`$y'=y^2$, $y(0)=1$`), L(R`$x^2y''+y=0$`, R`$x^2y''+y=0$`, R`$x^2y''+y=0$`), L(R`$u_t=u_{xx}$ ni $x$ bo‘yicha`, R`$u_t=u_{xx}$ по $x$`, R`$u_t=u_{xx}$ in $x$`)], correct: 0,
      explain: L('O‘zgarmas koeffitsientli chiziqli tenglama, uzilishli o‘ng tomon, shartlar $t=0$ da.', 'Линейное уравнение с постоянными коэффициентами, разрывная правая часть, условия при $t=0$.', 'A linear constant-coefficient equation with a discontinuous right side and conditions at $t=0$.'),
      why: [null, L('Nochiziqli.', 'Нелинейное.', 'Nonlinear.'), L('Koeffitsiyent o‘zgaruvchan.', 'Переменный коэффициент.', 'A variable coefficient.'), L('XHDT; bu kursda Furye usuli ishlatiladi.', 'УЧП; в курсе для этого используется метод Фурье.', 'A PDE; this course uses the Fourier method for it.')] }
  ]
});
})();
