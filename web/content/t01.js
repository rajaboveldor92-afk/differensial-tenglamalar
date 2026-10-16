(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't01', num: 1,
  title: L('Differensial tenglama, yechim va Koshi masalasi', 'Дифференциальное уравнение, решение и задача Коши', 'Differential equations, solutions and the Cauchy problem'),
  syllabus: { lecture: 'M1', seminar: 'S1', outcomes: ['TN1', 'TN2'], independent: [1] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L('Differensial tenglamani, uning tartibini va (mumkin bo‘lsa) darajasini aniqlay olasiz.', 'Определять дифференциальное уравнение, его порядок и (если он определён) степень.', 'Identify a differential equation, its order and (when defined) its degree.'),
    L('Berilgan funksiya tenglamaning yechimi ekanini tekshira olasiz.', 'Проверять, является ли данная функция решением уравнения.', 'Check whether a given function solves an equation.'),
    L('Umumiy, xususiy va maxsus yechimlarni farqlay olasiz.', 'Различать общее, частное и особое решения.', 'Distinguish general, particular and singular solutions.'),
    L('Koshi masalasini qo‘ya olasiz va mavjudlik–yagonalik teoremasining shartlarini tekshira olasiz.', 'Ставить задачу Коши и проверять условия теоремы существования и единственности.', 'Pose a Cauchy (initial value) problem and check the hypotheses of the existence and uniqueness theorem.'),
    L('Yo‘nalish maydoni va integral chiziqni geometrik talqin qila olasiz.', 'Геометрически истолковывать поле направлений и интегральные кривые.', 'Interpret direction fields and integral curves geometrically.')
  ],
  prereqKnowledge: [
    L('Hosila va uning geometrik ma’nosi (urinma burchak koeffitsiyenti).', 'Производная и её геометрический смысл (угловой коэффициент касательной).', 'The derivative and its meaning as the slope of the tangent line.'),
    L('Boshlang‘ich funksiya va aniqmas integral.', 'Первообразная и неопределённый интеграл.', 'Antiderivatives and indefinite integrals.'),
    L('Ko‘p o‘zgaruvchili funksiyaning xususiy hosilasi.', 'Частные производные функции нескольких переменных.', 'Partial derivatives of functions of several variables.')
  ],
  sources: [
    { id: 'dilmurodov', ref: '§1.1–§1.3, §3.1', verified: true },
    { id: 'ergashev', ref: '1.1', verified: true },
    { id: 'kohler', ref: '1.1–1.3, 2.5', verified: true },
    { id: 'logan', ref: '1.1', verified: true },
    { id: 'filippov', ref: '§1', verified: false },
    { id: 'boyce', ref: 'Ch. 1; §2.4, §2.8', verified: false }
  ],
  labs: ['L01'],
  lessons: [
    {
      id: 't01.1',
      title: L('Differensial tenglama nima?', 'Что такое дифференциальное уравнение?', 'What is a differential equation?'),
      blocks: [
        { type: 'intro', title: L('Choy qanday soviydi?', 'Как остывает чай?', 'How does tea cool down?'),
          body: L(R`Stakandagi choyning harorati $T(t)$, xona harorati $20^\circ\mathrm{C}$. Tajriba shuni ko‘rsatadi: choy qancha issiq bo‘lsa, shuncha tez soviydi. Sovish tezligi $T'(t)$ harorat farqi $T-20$ ga proporsional deb olaylik.

Bu gapni formula bilan yozing. Javobda noma’lum narsa son emas, balki **funksiya** $T(t)$ bo‘ladi va tenglamada uning hosilasi qatnashadi:
$$T'(t) = -k\,(T(t)-20),\qquad k>0.$$
Minus ishorasi: $T>20$ bo‘lsa, $T'<0$, ya’ni harorat kamayadi. Bu Nyutonning sovish qonuni.`,
          R`Температура чая в стакане $T(t)$, температура комнаты $20^\circ\mathrm{C}$. Опыт показывает: чем горячее чай, тем быстрее он остывает. Будем считать, что скорость остывания $T'(t)$ пропорциональна разности температур $T-20$.

Запишите это формулой. Неизвестным будет не число, а **функция** $T(t)$, и в уравнение входит её производная:
$$T'(t) = -k\,(T(t)-20),\qquad k>0.$$
Знак минус: при $T>20$ имеем $T'<0$, то есть температура убывает. Это закон охлаждения Ньютона.`,
          R`Tea in a cup has temperature $T(t)$; the room is at $20^\circ\mathrm{C}$. Experience says the hotter the tea, the faster it cools. Assume the cooling rate $T'(t)$ is proportional to the temperature difference $T-20$.

Write this as a formula. The unknown is not a number but a **function** $T(t)$, and its derivative appears in the equation:
$$T'(t) = -k\,(T(t)-20),\qquad k>0.$$
The minus sign means: if $T>20$ then $T'<0$, so the temperature decreases. This is Newton’s law of cooling.`) },
        { type: 'def', title: L('Oddiy differensial tenglama', 'Обыкновенное дифференциальное уравнение', 'Ordinary differential equation'),
          body: L(R`Noma’lum $y(x)$ funksiya, erkli o‘zgaruvchi $x$ va $y$ ning hosilalarini bog‘lovchi tenglama **oddiy differensial tenglama** (ODT) deyiladi:
$$F\big(x,\,y,\,y',\,\dots,\,y^{(n)}\big)=0.$$
Tenglamada qatnashgan eng yuqori hosilaning tartibi $n$ — **tenglamaning tartibi**.

Agar noma’lum funksiya bir nechta o‘zgaruvchiga bog‘liq bo‘lib, tenglamada xususiy hosilalar qatnashsa, u **xususiy hosilali differensial tenglama** (XHDT) deyiladi. Masalan, issiqlik tenglamasi $u_t = a^2u_{xx}$.`,
          R`Уравнение, связывающее независимую переменную $x$, неизвестную функцию $y(x)$ и её производные, называется **обыкновенным дифференциальным уравнением** (ОДУ):
$$F\big(x,\,y,\,y',\,\dots,\,y^{(n)}\big)=0.$$
Наивысший порядок $n$ входящей в уравнение производной — **порядок уравнения**.

Если неизвестная функция зависит от нескольких переменных и в уравнение входят частные производные, это **уравнение в частных производных** (УЧП). Например, уравнение теплопроводности $u_t = a^2u_{xx}$.`,
          R`An equation relating an independent variable $x$, an unknown function $y(x)$ and its derivatives is an **ordinary differential equation** (ODE):
$$F\big(x,\,y,\,y',\,\dots,\,y^{(n)}\big)=0.$$
The highest order $n$ of a derivative that appears is the **order of the equation**.

If the unknown function depends on several variables and partial derivatives appear, the equation is a **partial differential equation** (PDE), for example the heat equation $u_t = a^2u_{xx}$.`) },
        { type: 'def', title: L('Normal ko‘rinish, chiziqlilik va daraja', 'Нормальная форма, линейность и степень', 'Normal form, linearity and degree'),
          body: L(R`- $y^{(n)} = f(x,y,y',\dots,y^{(n-1)})$ ko‘rinishi — **hosilaga nisbatan yechilgan** (normal) ko‘rinish. Birinchi tartibda bu $y'=f(x,y)$.
- Tenglama **chiziqli**, agar u $y, y', \dots, y^{(n)}$ ga nisbatan birinchi darajali va ularning ko‘paytmalarini o‘z ichiga olmasa: $a_n(x)y^{(n)}+\dots+a_1(x)y'+a_0(x)y=g(x)$. Koeffitsiyentlar $x$ ga istalgancha murakkab bog‘liq bo‘lishi mumkin.
- Tenglama eng yuqori hosilaga nisbatan ko‘phad bo‘lsa, shu hosilaning eng katta darajasi tenglamaning **darajasi** deyiladi. **Tartib** va **daraja** turli tushunchalar: $(y'')^3+y=0$ — ikkinchi tartibli, uchinchi darajali tenglama.`,
          R`- Вид $y^{(n)} = f(x,y,y',\dots,y^{(n-1)})$ — **разрешённый относительно старшей производной** (нормальный) вид. Для первого порядка это $y'=f(x,y)$.
- Уравнение **линейно**, если оно первой степени относительно $y, y', \dots, y^{(n)}$ и не содержит их произведений: $a_n(x)y^{(n)}+\dots+a_1(x)y'+a_0(x)y=g(x)$. Коэффициенты могут как угодно сложно зависеть от $x$.
- Если уравнение — многочлен относительно старшей производной, наибольшая степень этой производной называется **степенью** уравнения. **Порядок** и **степень** — разные понятия: $(y'')^3+y=0$ — уравнение второго порядка и третьей степени.`,
          R`- The form $y^{(n)} = f(x,y,y',\dots,y^{(n-1)})$ is **solved for the highest derivative** (normal form). For first order it is $y'=f(x,y)$.
- An equation is **linear** if it is of first degree in $y, y', \dots, y^{(n)}$ and contains no products of them: $a_n(x)y^{(n)}+\dots+a_1(x)y'+a_0(x)y=g(x)$. The coefficients may depend on $x$ in any way.
- If the equation is a polynomial in the highest derivative, the highest power of that derivative is the **degree** of the equation. **Order** and **degree** are different: $(y'')^3+y=0$ has order two and degree three.`) },
        { type: 'example', title: L('Tenglamalarni tasniflash', 'Классификация уравнений', 'Classifying equations'),
          body: L(R`Har bir tenglamaning turini, tartibini va chiziqli yoki chiziqli emasligini aniqlang.`, R`Для каждого уравнения определите тип, порядок и линейность.`, R`For each equation find its type, its order and whether it is linear.`),
          steps: [
            L(R`$y''+x\,y'-y=\sin x$: oddiy, **2-tartibli, chiziqli** ($y,y',y''$ birinchi darajada, koeffitsiyentlar faqat $x$ ga bog‘liq).`, R`$y''+x\,y'-y=\sin x$: обыкновенное, **2-го порядка, линейное** ($y,y',y''$ в первой степени, коэффициенты зависят только от $x$).`, R`$y''+x\,y'-y=\sin x$: ordinary, **second order, linear** ($y,y',y''$ appear to the first power; coefficients depend only on $x$).`),
            L(R`$y'=y^2+x$: oddiy, **1-tartibli, chiziqli emas** ($y^2$ hadi bor). Bu Rikkati tenglamasi.`, R`$y'=y^2+x$: обыкновенное, **1-го порядка, нелинейное** (есть член $y^2$). Это уравнение Риккати.`, R`$y'=y^2+x$: ordinary, **first order, nonlinear** (the term $y^2$). This is a Riccati equation.`),
            L(R`$(y'')^3+y=0$: oddiy, **2-tartibli, 3-darajali, chiziqli emas**.`, R`$(y'')^3+y=0$: обыкновенное, **2-го порядка, 3-й степени, нелинейное**.`, R`$(y'')^3+y=0$: ordinary, **second order, degree three, nonlinear**.`),
            L(R`$u_t=u_{xx}$: **xususiy hosilali**, 2-tartibli, chiziqli (issiqlik tenglamasi).`, R`$u_t=u_{xx}$: **в частных производных**, 2-го порядка, линейное (уравнение теплопроводности).`, R`$u_t=u_{xx}$: **partial**, second order, linear (the heat equation).`)
          ] },
        { type: 'warn', body: L(R`“Bir jinsli” so‘zi kursda **ikki xil ma’noda** ishlatiladi: $y'=f(y/x)$ ko‘rinishidagi tenglama (3-mavzu) va o‘ng tomoni nolga teng chiziqli tenglama (7–8-mavzular). Qaysi ma’no nazarda tutilganini kontekstdan aniqlang.`,
          R`Слово «однородное» в курсе употребляется **в двух смыслах**: уравнение вида $y'=f(y/x)$ (тема 3) и линейное уравнение с нулевой правой частью (темы 7–8). Смысл определяйте по контексту.`,
          R`The word “homogeneous” has **two different meanings** in this course: an equation of the form $y'=f(y/x)$ (topic 3) and a linear equation with zero right-hand side (topics 7–8). Decide from the context which one is meant.`) }
      ]
    },
    {
      id: 't01.2',
      title: L('Yechim, integral chiziq va yo‘nalish maydoni', 'Решение, интегральная кривая и поле направлений', 'Solutions, integral curves and direction fields'),
      blocks: [
        { type: 'def', title: L('Yechim', 'Решение', 'Solution'),
          body: L(R`$I$ oraliqda $n$ marta differensiallanuvchi $y=\varphi(x)$ funksiya $F(x,y,\dots,y^{(n)})=0$ tenglamaning **yechimi** deyiladi, agar uni tenglamaga qo‘yganda $I$ dagi barcha $x$ uchun ayniyat hosil bo‘lsa. Yechim har doim **biror oraliq bilan birga** qaraladi — bu oraliq yechimning aniqlanish oralig‘i.

Yechim $\Phi(x,y)=0$ ko‘rinishida oshkormas berilishi ham mumkin; bunda u **integral** deyiladi.`,
          R`Функция $y=\varphi(x)$, $n$ раз дифференцируемая на интервале $I$, называется **решением** уравнения $F(x,y,\dots,y^{(n)})=0$, если после подстановки получается тождество для всех $x\in I$. Решение всегда рассматривается **вместе с интервалом** — интервалом определения решения.

Решение может быть задано неявно, $\Phi(x,y)=0$; тогда его называют **интегралом**.`,
          R`A function $y=\varphi(x)$ that is $n$ times differentiable on an interval $I$ is a **solution** of $F(x,y,\dots,y^{(n)})=0$ if substituting it gives an identity for every $x\in I$. A solution always comes **together with an interval**, its interval of definition.

A solution may also be given implicitly as $\Phi(x,y)=0$; it is then called an **integral**.`) },
        { type: 'example', title: L('Yechimni tekshirish', 'Проверка решения', 'Checking a solution'),
          body: L(R`$y=Ce^{2x}$ funksiyalar oilasi $y'=2y$ tenglamaning yechimi ekanini ko‘rsating va $y(0)=3$ shartni qanoatlantiruvchi yechimni toping.`, R`Покажите, что семейство $y=Ce^{2x}$ является решением уравнения $y'=2y$, и найдите решение с условием $y(0)=3$.`, R`Show that the family $y=Ce^{2x}$ solves $y'=2y$ and find the solution with $y(0)=3$.`),
          steps: [
            L(R`Hosilani topamiz: $y'=2Ce^{2x}$.`, R`Находим производную: $y'=2Ce^{2x}$.`, R`Differentiate: $y'=2Ce^{2x}$.`),
            L(R`Tenglamaga qo‘yamiz: chap tomon $2Ce^{2x}$, o‘ng tomon $2\cdot Ce^{2x}$. Barcha $x\in\mathbb R$ uchun teng, demak har qanday $C$ da yechim.`, R`Подставляем: слева $2Ce^{2x}$, справа $2\cdot Ce^{2x}$. Равенство верно при всех $x\in\mathbb R$, значит, это решение при любом $C$.`, R`Substitute: the left side is $2Ce^{2x}$, the right side is $2\cdot Ce^{2x}$. They agree for every $x\in\mathbb R$, so it is a solution for every $C$.`),
            L(R`Boshlang‘ich shart: $y(0)=Ce^{0}=C=3$. Javob: $y=3e^{2x}$, $x\in\mathbb R$.`, R`Начальное условие: $y(0)=Ce^{0}=C=3$. Ответ: $y=3e^{2x}$, $x\in\mathbb R$.`, R`Initial condition: $y(0)=Ce^{0}=C=3$. Answer: $y=3e^{2x}$, $x\in\mathbb R$.`)
          ],
          check: L(R`$y=3e^{2x}$: $y'=6e^{2x}=2y$ ✓, $y(0)=3$ ✓.`, R`$y=3e^{2x}$: $y'=6e^{2x}=2y$ ✓, $y(0)=3$ ✓.`, R`$y=3e^{2x}$: $y'=6e^{2x}=2y$ ✓, $y(0)=3$ ✓.`) },
        { type: 'def', title: L('Umumiy, xususiy va maxsus yechimlar', 'Общее, частное и особое решения', 'General, particular and singular solutions'),
          body: L(R`- **Umumiy yechim** — $n$ ta mustaqil ixtiyoriy o‘zgarmasga bog‘liq $y=\varphi(x,C_1,\dots,C_n)$ yechimlar oilasi; o‘zgarmaslarni tanlab, qaralayotgan sohadagi har qanday Koshi masalasining yechimini olish mumkin.
- **Xususiy yechim** — umumiy yechimdan o‘zgarmaslarning aniq qiymatlarida olingan yechim.
- **Maxsus yechim** — har bir nuqtasida yagonalik buziladigan yechim; u odatda umumiy yechimdan hech qanday $C$ da olinmaydi.`,
          R`- **Общее решение** — семейство решений $y=\varphi(x,C_1,\dots,C_n)$, зависящее от $n$ независимых произвольных постоянных; подбором постоянных можно получить решение любой задачи Коши в рассматриваемой области.
- **Частное решение** — решение, получаемое из общего при конкретных значениях постоянных.
- **Особое решение** — решение, в каждой точке которого нарушается единственность; обычно оно не получается из общего ни при каком $C$.`,
          R`- The **general solution** is a family $y=\varphi(x,C_1,\dots,C_n)$ depending on $n$ independent arbitrary constants; choosing the constants gives the solution of any Cauchy problem in the region considered.
- A **particular solution** is obtained from the general one for specific values of the constants.
- A **singular solution** is one at every point of which uniqueness fails; usually it is not obtained from the general solution for any $C$.`) },
        { type: 'def', title: L('Integral chiziq va yo‘nalish maydoni', 'Интегральная кривая и поле направлений', 'Integral curves and the direction field'),
          body: L(R`$y'=f(x,y)$ tenglama har bir $(x,y)$ nuqtaga burchak koeffitsiyenti $f(x,y)$ bo‘lgan kichik kesmani mos qo‘yadi. Bu kesmalar to‘plami — **yo‘nalish maydoni**. Yechimning grafigi — **integral chiziq**: u har bir nuqtasida maydon kesmasiga urinadi.

$f(x,y)=k$ chiziq — **izoklina**: unda barcha kesmalar bir xil og‘ishga ega. Izoklinalar yordamida maydonni qo‘lda tez chizish mumkin.`,
          R`Уравнение $y'=f(x,y)$ сопоставляет каждой точке $(x,y)$ короткий отрезок с угловым коэффициентом $f(x,y)$. Совокупность отрезков — **поле направлений**. График решения — **интегральная кривая**: в каждой своей точке она касается отрезка поля.

Линия $f(x,y)=k$ — **изоклина**: на ней все отрезки имеют одинаковый наклон. С помощью изоклин поле удобно строить вручную.`,
          R`The equation $y'=f(x,y)$ attaches to each point $(x,y)$ a short segment of slope $f(x,y)$. These segments form the **direction field**. The graph of a solution is an **integral curve**: at every point it is tangent to the field segment.

The curve $f(x,y)=k$ is an **isocline**: all segments on it have the same slope. Isoclines make it easy to sketch the field by hand.`) },
        { type: 'example', title: L('Izoklinalar', 'Изоклины', 'Isoclines'),
          body: L(R`$y'=x^2+y^2$ tenglama uchun izoklinalarni toping.`, R`Найдите изоклины уравнения $y'=x^2+y^2$.`, R`Find the isoclines of $y'=x^2+y^2$.`),
          steps: [
            L(R`Izoklina tenglamasi: $x^2+y^2=k$, $k\ge 0$.`, R`Уравнение изоклины: $x^2+y^2=k$, $k\ge 0$.`, R`Isocline equation: $x^2+y^2=k$, $k\ge 0$.`),
            L(R`$k>0$ da bu markazi koordinata boshida, radiusi $\sqrt k$ bo‘lgan aylana; $k=0$ da faqat $(0,0)$ nuqta.`, R`При $k>0$ это окружность радиуса $\sqrt k$ с центром в начале координат; при $k=0$ — одна точка $(0,0)$.`, R`For $k>0$ it is the circle of radius $\sqrt k$ centred at the origin; for $k=0$ it is the single point $(0,0)$.`),
            L(R`Masalan, $x^2+y^2=1$ aylanada barcha kesmalar $45^\circ$ burchak ostida. Koordinata boshidan uzoqlashgan sari integral chiziqlar tikroq ko‘tariladi.`, R`Например, на окружности $x^2+y^2=1$ все отрезки наклонены под углом $45^\circ$. С удалением от начала координат интегральные кривые поднимаются круче.`, R`For example, on the circle $x^2+y^2=1$ every segment has slope 1 (angle $45^\circ$). Farther from the origin the integral curves climb more steeply.`)
          ] },
        { type: 'lab', lab: 'L01', body: L(R`Laboratoriyada $y'=x^2+y^2$, $y'=y(1-y)$ va boshqa tenglamalarning yo‘nalish maydonini chizing. Grafikka bosib, shu nuqtadan o‘tuvchi integral chiziqni hosil qiling.`, R`В лаборатории постройте поле направлений для $y'=x^2+y^2$, $y'=y(1-y)$ и других уравнений. Нажмите на график, чтобы провести интегральную кривую через выбранную точку.`, R`In the lab, draw the direction field of $y'=x^2+y^2$, $y'=y(1-y)$ and other equations. Tap the graph to draw the integral curve through that point.`) },
        { type: 'example', title: L('Egri chiziqlar oilasining differensial tenglamasi', 'Дифференциальное уравнение семейства кривых', 'The differential equation of a family of curves'),
          body: L(R`$y=Cx^2$ parabolalar oilasining differensial tenglamasini tuzing ($x\ne0$).`, R`Составьте дифференциальное уравнение семейства парабол $y=Cx^2$ ($x\ne0$).`, R`Find the differential equation of the family of parabolas $y=Cx^2$ ($x\ne0$).`),
          steps: [
            L(R`Differensiallaymiz: $y'=2Cx$.`, R`Дифференцируем: $y'=2Cx$.`, R`Differentiate: $y'=2Cx$.`),
            L(R`Oila tenglamasidan $C=y/x^2$.`, R`Из уравнения семейства $C=y/x^2$.`, R`From the family, $C=y/x^2$.`),
            L(R`$C$ ni chiqarib tashlaymiz: $y'=\dfrac{2y}{x}$. Bir parametrli oila birinchi tartibli tenglamaga olib keladi.`, R`Исключаем $C$: $y'=\dfrac{2y}{x}$. Однопараметрическое семейство приводит к уравнению первого порядка.`, R`Eliminate $C$: $y'=\dfrac{2y}{x}$. A one-parameter family leads to a first-order equation.`)
          ],
          check: L(R`$y=Cx^2$: $y'=2Cx$ va $2y/x=2Cx$ ✓.`, R`$y=Cx^2$: $y'=2Cx$ и $2y/x=2Cx$ ✓.`, R`$y=Cx^2$: $y'=2Cx$ and $2y/x=2Cx$ ✓.`) }
      ]
    },
    {
      id: 't01.3',
      title: L('Koshi masalasi. Mavjudlik va yagonalik', 'Задача Коши. Существование и единственность', 'The Cauchy problem. Existence and uniqueness'),
      blocks: [
        { type: 'def', title: L('Koshi masalasi', 'Задача Коши', 'The Cauchy (initial value) problem'),
          body: L(R`$y'=f(x,y)$ tenglamaning $y(x_0)=y_0$ shartni qanoatlantiruvchi yechimini topish masalasi **Koshi masalasi** (boshlang‘ich masala) deyiladi. Geometrik ma’nosi: $(x_0,y_0)$ nuqtadan o‘tuvchi integral chiziqni topish.

$n$-tartibli $y^{(n)}=f(x,y,\dots,y^{(n-1)})$ tenglama uchun $n$ ta shart beriladi: $y(x_0)=y_0,\ y'(x_0)=y_1,\ \dots,\ y^{(n-1)}(x_0)=y_{n-1}$.`,
          R`Задача нахождения решения уравнения $y'=f(x,y)$, удовлетворяющего условию $y(x_0)=y_0$, называется **задачей Коши** (начальной задачей). Геометрически: найти интегральную кривую, проходящую через точку $(x_0,y_0)$.

Для уравнения $n$-го порядка $y^{(n)}=f(x,y,\dots,y^{(n-1)})$ задаются $n$ условий: $y(x_0)=y_0,\ y'(x_0)=y_1,\ \dots,\ y^{(n-1)}(x_0)=y_{n-1}$.`,
          R`Finding a solution of $y'=f(x,y)$ that satisfies $y(x_0)=y_0$ is the **Cauchy problem** (initial value problem). Geometrically: find the integral curve through $(x_0,y_0)$.

For an $n$-th order equation $y^{(n)}=f(x,y,\dots,y^{(n-1)})$ one prescribes $n$ conditions: $y(x_0)=y_0,\ y'(x_0)=y_1,\ \dots,\ y^{(n-1)}(x_0)=y_{n-1}$.`) },
        { type: 'thm', title: L('Mavjudlik va yagonalik (Pikar teoremasi)', 'Существование и единственность (теорема Пикара)', 'Existence and uniqueness (Picard’s theorem)'),
          conds: L(R`1. $f(x,y)$ yopiq to‘g‘ri to‘rtburchak $R=\{|x-x_0|\le a,\ |y-y_0|\le b\}$ da uzluksiz;
2. $f$ $R$ da $y$ bo‘yicha Lipshits shartini qanoatlantiradi: $|f(x,y_1)-f(x,y_2)|\le L|y_1-y_2|$. (Yetarli shart: $\partial f/\partial y$ $R$ da uzluksiz.)`,
          R`1. $f(x,y)$ непрерывна в замкнутом прямоугольнике $R=\{|x-x_0|\le a,\ |y-y_0|\le b\}$;
2. $f$ удовлетворяет в $R$ условию Липшица по $y$: $|f(x,y_1)-f(x,y_2)|\le L|y_1-y_2|$. (Достаточно, чтобы $\partial f/\partial y$ была непрерывна в $R$.)`,
          R`1. $f(x,y)$ is continuous on the closed rectangle $R=\{|x-x_0|\le a,\ |y-y_0|\le b\}$;
2. $f$ satisfies a Lipschitz condition in $y$ on $R$: $|f(x,y_1)-f(x,y_2)|\le L|y_1-y_2|$. (It suffices that $\partial f/\partial y$ is continuous on $R$.)`),
          body: L(R`U holda $M=\max_R|f|$, $h=\min\left(a,\ \dfrac bM\right)$ deb olsak, Koshi masalasi $|x-x_0|\le h$ oraliqda **yagona** yechimga ega. ($M=0$ bo‘lsa, $h=a$.)

Faqat 1-shart bajarilsa (Peano teoremasi), yechim **mavjud**, lekin yagona bo‘lmasligi mumkin.`,
          R`Тогда при $M=\max_R|f|$, $h=\min\left(a,\ \dfrac bM\right)$ задача Коши имеет **единственное** решение на отрезке $|x-x_0|\le h$. (Если $M=0$, то $h=a$.)

Если выполнено только условие 1 (теорема Пеано), решение **существует**, но может быть не единственным.`,
          R`Then, with $M=\max_R|f|$ and $h=\min\left(a,\ \dfrac bM\right)$, the Cauchy problem has a **unique** solution on $|x-x_0|\le h$. (If $M=0$, take $h=a$.)

If only hypothesis 1 holds (Peano’s theorem), a solution **exists** but need not be unique.`) },
        { type: 'proof', body: L(R`Koshi masalasi integral tenglamaga teng kuchli: $y(x)=y_0+\int_{x_0}^{x}f(t,y(t))\,dt$. Ketma-ket yaqinlashishlar $y_{k+1}(x)=y_0+\int_{x_0}^{x}f(t,y_k(t))\,dt$ quriladi. $h\le b/M$ shart grafiklar $R$ dan chiqmasligini, Lipshits sharti esa $|y_{k+1}-y_k|\le M L^k|x-x_0|^{k+1}/(k+1)!$ bahoni beradi; bu yaqinlashishni va yagonalikni ta’minlaydi (Dilmuradov, §3.1).`,
          R`Задача Коши равносильна интегральному уравнению $y(x)=y_0+\int_{x_0}^{x}f(t,y(t))\,dt$. Строятся последовательные приближения $y_{k+1}(x)=y_0+\int_{x_0}^{x}f(t,y_k(t))\,dt$. Условие $h\le b/M$ гарантирует, что графики не выходят из $R$, а условие Липшица даёт оценку $|y_{k+1}-y_k|\le M L^k|x-x_0|^{k+1}/(k+1)!$, откуда следуют сходимость и единственность (Дилмурадов, §3.1).`,
          R`The Cauchy problem is equivalent to the integral equation $y(x)=y_0+\int_{x_0}^{x}f(t,y(t))\,dt$. One builds successive approximations $y_{k+1}(x)=y_0+\int_{x_0}^{x}f(t,y_k(t))\,dt$. The condition $h\le b/M$ keeps the graphs inside $R$, and the Lipschitz condition gives $|y_{k+1}-y_k|\le M L^k|x-x_0|^{k+1}/(k+1)!$, which yields convergence and uniqueness (Dilmuradov, §3.1).`) },
        { type: 'example', title: L('Yagonalik buzilganda', 'Когда единственность нарушается', 'When uniqueness fails'),
          body: L(R`$y'=3y^{2/3}$, $y(0)=0$ masalasini qarang.`, R`Рассмотрите задачу $y'=3y^{2/3}$, $y(0)=0$.`, R`Consider $y'=3y^{2/3}$, $y(0)=0$.`),
          steps: [
            L(R`$y\equiv0$ yechim: $0=3\cdot0$ ✓.`, R`$y\equiv0$ — решение: $0=3\cdot0$ ✓.`, R`$y\equiv0$ is a solution: $0=3\cdot0$ ✓.`),
            L(R`$y=x^3$ ham yechim: $y'=3x^2$, $3(x^3)^{2/3}=3x^2$ ✓, $y(0)=0$ ✓. Demak, bitta nuqtadan ikkita integral chiziq o‘tadi.`, R`$y=x^3$ тоже решение: $y'=3x^2$, $3(x^3)^{2/3}=3x^2$ ✓, $y(0)=0$ ✓. Значит, через одну точку проходят две интегральные кривые.`, R`$y=x^3$ is also a solution: $y'=3x^2$, $3(x^3)^{2/3}=3x^2$ ✓, $y(0)=0$ ✓. So two integral curves pass through one point.`),
            L(R`Sababi: $f=3y^{2/3}$ uzluksiz (mavjudlik bor), lekin $f_y=2y^{-1/3}$ $y=0$ atrofida chegaralanmagan — Lipshits sharti bajarilmaydi.`, R`Причина: $f=3y^{2/3}$ непрерывна (существование есть), но $f_y=2y^{-1/3}$ не ограничена около $y=0$ — условие Липшица не выполнено.`, R`Reason: $f=3y^{2/3}$ is continuous (so a solution exists), but $f_y=2y^{-1/3}$ is unbounded near $y=0$; the Lipschitz condition fails.`),
            L(R`Aslida $y=(x-c)^3$ ($x\ge c$), $y=0$ ($x<c$) ko‘rinishidagi cheksiz ko‘p yechim bor. $y\equiv0$ — maxsus yechim: uning har bir nuqtasida yagonalik buziladi.`, R`На самом деле решений бесконечно много: $y=(x-c)^3$ при $x\ge c$, $y=0$ при $x<c$. Решение $y\equiv0$ особое: в каждой его точке единственность нарушается.`, R`In fact there are infinitely many solutions: $y=(x-c)^3$ for $x\ge c$ and $y=0$ for $x<c$. The solution $y\equiv0$ is singular: uniqueness fails at each of its points.`)
          ] },
        { type: 'example', title: L('Yechim butun o‘qda mavjud bo‘lmasligi mumkin', 'Решение может существовать не на всей оси', 'A solution may not exist on the whole line'),
          body: L(R`$y'=y^2$, $y(0)=1$. Teorema kafolatlaydigan $h$ ni va haqiqiy yechim oralig‘ini solishtiring.`, R`$y'=y^2$, $y(0)=1$. Сравните гарантированный теоремой $h$ с настоящим интервалом существования решения.`, R`$y'=y^2$, $y(0)=1$. Compare the $h$ guaranteed by the theorem with the actual interval of existence.`),
          steps: [
            L(R`$f=y^2$, $f_y=2y$ — butun tekislikda uzluksiz, shuning uchun teorema qo‘llaniladi.`, R`$f=y^2$, $f_y=2y$ непрерывны на всей плоскости, поэтому теорема применима.`, R`$f=y^2$ and $f_y=2y$ are continuous everywhere, so the theorem applies.`),
            L(R`$R:\ |x|\le a,\ |y-1|\le b$ da $M=(1+b)^2$, $h=\min\left(a,\ \dfrac{b}{(1+b)^2}\right)$. $\dfrac{b}{(1+b)^2}$ ning eng katta qiymati $b=1$ da $\dfrac14$. Demak, teorema faqat $|x|\le\frac14$ ni kafolatlaydi.`, R`В $R:\ |x|\le a,\ |y-1|\le b$ имеем $M=(1+b)^2$, $h=\min\left(a,\ \dfrac{b}{(1+b)^2}\right)$. Наибольшее значение $\dfrac{b}{(1+b)^2}$ равно $\dfrac14$ при $b=1$. Значит, теорема гарантирует только $|x|\le\frac14$.`, R`On $R:\ |x|\le a,\ |y-1|\le b$ we have $M=(1+b)^2$ and $h=\min\left(a,\ \dfrac{b}{(1+b)^2}\right)$. The largest value of $\dfrac{b}{(1+b)^2}$ is $\dfrac14$, at $b=1$. So the theorem guarantees only $|x|\le\frac14$.`),
            L(R`Haqiqiy yechim: $y=\dfrac{1}{1-x}$ (tekshiring: $y'=\dfrac1{(1-x)^2}=y^2$). U $(-\infty,1)$ da aniqlangan va $x\to1^-$ da cheksizlikka ketadi.`, R`Настоящее решение: $y=\dfrac{1}{1-x}$ (проверьте: $y'=\dfrac1{(1-x)^2}=y^2$). Оно определено на $(-\infty,1)$ и уходит в бесконечность при $x\to1^-$.`, R`The actual solution is $y=\dfrac{1}{1-x}$ (check: $y'=\dfrac1{(1-x)^2}=y^2$). It is defined on $(-\infty,1)$ and blows up as $x\to1^-$.`),
            L(R`Xulosa: teorema **lokal** — kafolatlangan $h$ odatda haqiqiy oraliqdan kichik. Funksiya silliq bo‘lsa ham yechim chekli $x$ da “portlashi” mumkin.`, R`Вывод: теорема **локальная** — гарантированное $h$ обычно меньше настоящего интервала. Даже при гладкой $f$ решение может «взорваться» при конечном $x$.`, R`Conclusion: the theorem is **local**; the guaranteed $h$ is usually smaller than the true interval. Even with smooth $f$ a solution can blow up at a finite $x$.`)
          ] },
        { type: 'warn', body: L(R`Mavjudlik–yagonalik teoremasining shartlari **yetarli**, lekin zarur emas. Shartlar bajarilmasa, yagonalik buzilishi mumkin, lekin buzilishi shart emas. Sonli usul (11-mavzu) yagona bo‘lmagan masalada ham bitta egri chiziq chizadi — bu yechim yagona degani emas.`,
          R`Условия теоремы существования и единственности **достаточные**, но не необходимые. Если они не выполнены, единственность может нарушиться, но не обязана. Численный метод (тема 11) и в неединственной задаче нарисует одну кривую — это не означает единственности.`,
          R`The hypotheses of the existence and uniqueness theorem are **sufficient but not necessary**. If they fail, uniqueness may fail, but it does not have to. A numerical method (topic 11) will draw a single curve even for a non-unique problem; that does not prove uniqueness.`) }
      ]
    }
  ],
  mistakes: [
    L(R`Tartib va darajani aralashtirish: $(y')^3=x$ — **birinchi** tartibli, uchinchi darajali tenglama.`, R`Путать порядок и степень: $(y')^3=x$ — уравнение **первого** порядка и третьей степени.`, R`Mixing up order and degree: $(y')^3=x$ is a **first**-order equation of degree three.`),
    L(R`Koeffitsiyentlar $x$ ga murakkab bog‘liq bo‘lsa, tenglamani chiziqli emas deb hisoblash. $x^5y''+e^xy=\ln x$ — chiziqli.`, R`Считать уравнение нелинейным из-за сложных коэффициентов. $x^5y''+e^xy=\ln x$ — линейное.`, R`Calling an equation nonlinear because its coefficients are complicated functions of $x$. $x^5y''+e^xy=\ln x$ is linear.`),
    L(R`Yechimni aniqlanish oralig‘isiz yozish. $y=\frac1{1-x}$ $y(0)=1$ masalaning yechimi faqat $(-\infty,1)$ da.`, R`Записывать решение без интервала определения. $y=\frac1{1-x}$ — решение задачи с $y(0)=1$ только на $(-\infty,1)$.`, R`Writing a solution without its interval. $y=\frac1{1-x}$ solves the problem with $y(0)=1$ only on $(-\infty,1)$.`),
    L(R`Teorema shartlari bajarilmasa, “yechim yo‘q” deb xulosa qilish. Shartlar faqat yetarli.`, R`Делать вывод «решения нет», если условия теоремы не выполнены. Условия лишь достаточные.`, R`Concluding “there is no solution” when the hypotheses fail. They are only sufficient.`),
    L(R`$C$ ni yechim oxirida emas, oraliq hisob-kitoblarda yo‘qotib qo‘yish yoki ikki marta qo‘shish.`, R`Терять постоянную $C$ в промежуточных выкладках или добавлять её дважды.`, R`Losing the constant $C$ in intermediate steps, or adding it twice.`)
  ],
  exercises: [
    { id: 't01.x1', level: 'easy', type: 'numeric',
      q: L(R`$y'''-(y')^4+y=0$ tenglamaning tartibini kiriting.`, R`Введите порядок уравнения $y'''-(y')^4+y=0$.`, R`Enter the order of $y'''-(y')^4+y=0$.`),
      check: { kind: 'numeric', value: 3, tol: 0 },
      hint: L(R`Eng yuqori hosilaga qarang, darajaga emas.`, R`Смотрите на старшую производную, а не на степень.`, R`Look at the highest derivative, not at powers.`),
      solution: L(R`Eng yuqori hosila $y'''$, shuning uchun tartib $3$. $(y')^4$ dagi $4$ — daraja emas, chunki u eng yuqori hosilaga tegishli emas.`, R`Старшая производная $y'''$, поэтому порядок $3$. Число $4$ в $(y')^4$ не относится к старшей производной.`, R`The highest derivative is $y'''$, so the order is $3$. The $4$ in $(y')^4$ is not attached to the highest derivative.`) },
    { id: 't01.x2', level: 'easy', type: 'formula',
      q: L(R`$y'=3x^2$ tenglamaning umumiy yechimini yozing: $y=\ ?$ (o‘zgarmasni $C$ bilan belgilang).`, R`Запишите общее решение уравнения $y'=3x^2$: $y=\ ?$ (постоянную обозначьте $C$).`, R`Write the general solution of $y'=3x^2$: $y=\ ?$ (use $C$ for the constant).`),
      check: { kind: 'ode', residual: 'yp - 3*x^2', order: 1, consts: ['C'], x: [-2, 2] }, answer: 'x^3 + C',
      hint: L(R`Ikkala tomonni $x$ bo‘yicha integrallang.`, R`Проинтегрируйте обе части по $x$.`, R`Integrate both sides with respect to $x$.`),
      solution: L(R`$y=\int 3x^2\,dx=x^3+C$.`, R`$y=\int 3x^2\,dx=x^3+C$.`, R`$y=\int 3x^2\,dx=x^3+C$.`) },
    { id: 't01.x3', level: 'mid', type: 'formula',
      q: L(R`$y=Ce^{2x}$ — $y'=2y$ ning umumiy yechimi. $y(0)=5$ shartni qanoatlantiruvchi xususiy yechimni yozing.`, R`$y=Ce^{2x}$ — общее решение $y'=2y$. Запишите частное решение с условием $y(0)=5$.`, R`$y=Ce^{2x}$ is the general solution of $y'=2y$. Write the particular solution with $y(0)=5$.`),
      check: { kind: 'equiv', ref: '5*exp(2*x)', vars: { x: [-1, 1] } }, answer: '5*exp(2*x)',
      hint: L(R`$x=0$ ni qo‘yib, $C$ ni toping.`, R`Подставьте $x=0$ и найдите $C$.`, R`Substitute $x=0$ and find $C$.`),
      solution: L(R`$y(0)=C=5$, demak $y=5e^{2x}$.`, R`$y(0)=C=5$, значит $y=5e^{2x}$.`, R`$y(0)=C=5$, so $y=5e^{2x}$.`) },
    { id: 't01.x4', level: 'mid', type: 'formula',
      q: L(R`$y=Ce^{x}+x$ egri chiziqlar oilasining differensial tenglamasini tuzing. $y'$ ni $x$ va $y$ orqali ifodalang: $y'=\ ?$`, R`Составьте дифференциальное уравнение семейства $y=Ce^{x}+x$. Выразите $y'$ через $x$ и $y$: $y'=\ ?$`, R`Find the differential equation of the family $y=Ce^{x}+x$. Express $y'$ in terms of $x$ and $y$: $y'=\ ?$`),
      check: { kind: 'equiv', ref: 'y - x + 1', vars: { x: [-2, 2], y: [-2, 2] }, lhs: "y'" }, answer: "y' = y - x + 1",
      hint: L(R`$y'=Ce^x+1$. Oila tenglamasidan $Ce^x=y-x$.`, R`$y'=Ce^x+1$. Из уравнения семейства $Ce^x=y-x$.`, R`$y'=Ce^x+1$. From the family, $Ce^x=y-x$.`),
      solution: L(R`$y'=Ce^x+1=(y-x)+1$, ya’ni $y'=y-x+1$.`, R`$y'=Ce^x+1=(y-x)+1$, то есть $y'=y-x+1$.`, R`$y'=Ce^x+1=(y-x)+1$, so $y'=y-x+1$.`) },
    { id: 't01.x5', level: 'mid', type: 'finderror',
      q: L(R`Talaba $y'=y^2$, $y(0)=1$ masalani yechdi. Qaysi qatorda xato bor?`, R`Студент решил задачу $y'=y^2$, $y(0)=1$. В какой строке ошибка?`, R`A student solved $y'=y^2$, $y(0)=1$. Which line contains the error?`),
      lines: [
        L(R`$\dfrac{dy}{y^2}=dx$`, R`$\dfrac{dy}{y^2}=dx$`, R`$\dfrac{dy}{y^2}=dx$`),
        L(R`$-\dfrac1y=x+C$`, R`$-\dfrac1y=x+C$`, R`$-\dfrac1y=x+C$`),
        L(R`$y(0)=1\Rightarrow C=-1$, $y=\dfrac1{1-x}$`, R`$y(0)=1\Rightarrow C=-1$, $y=\dfrac1{1-x}$`, R`$y(0)=1\Rightarrow C=-1$, $y=\dfrac1{1-x}$`),
        L(R`$f=y^2$ silliq, shuning uchun yechim butun $\mathbb R$ da mavjud.`, R`$f=y^2$ гладкая, поэтому решение существует на всей $\mathbb R$.`, R`$f=y^2$ is smooth, so the solution exists on all of $\mathbb R$.`)
      ],
      wrong: 3,
      explain: L(R`Silliqlik faqat **lokal** yagonalikni beradi. $y=\frac1{1-x}$ $x\to1^-$ da cheksizlikka ketadi, shuning uchun yechim faqat $(-\infty,1)$ da mavjud.`, R`Гладкость даёт лишь **локальную** единственность. $y=\frac1{1-x}$ уходит в бесконечность при $x\to1^-$, поэтому решение существует только на $(-\infty,1)$.`, R`Smoothness only gives **local** existence and uniqueness. $y=\frac1{1-x}$ blows up as $x\to1^-$, so the solution exists only on $(-\infty,1)$.`) },
    { id: 't01.x6', level: 'mid', type: 'match',
      q: L(R`Tenglamani uning tavsifi bilan moslang.`, R`Сопоставьте уравнение и его описание.`, R`Match each equation with its description.`),
      pairs: [
        { left: L(R`$y''+x^2y=e^x$`, R`$y''+x^2y=e^x$`, R`$y''+x^2y=e^x$`), right: L('2-tartibli, chiziqli', '2-го порядка, линейное', 'second order, linear') },
        { left: L(R`$y'=\sin y$`, R`$y'=\sin y$`, R`$y'=\sin y$`), right: L('1-tartibli, chiziqli emas', '1-го порядка, нелинейное', 'first order, nonlinear') },
        { left: L(R`$(y'')^2+y'=0$`, R`$(y'')^2+y'=0$`, R`$(y'')^2+y'=0$`), right: L('2-tartibli, 2-darajali', '2-го порядка, 2-й степени', 'second order, degree two') },
        { left: L(R`$u_{tt}=u_{xx}$`, R`$u_{tt}=u_{xx}$`, R`$u_{tt}=u_{xx}$`), right: L('xususiy hosilali', 'в частных производных', 'partial differential equation') }
      ],
      explain: L(R`Tartib — eng yuqori hosila; chiziqlilik — $y$ va hosilalar birinchi darajada; daraja — eng yuqori hosilaning darajasi.`, R`Порядок — старшая производная; линейность — $y$ и производные в первой степени; степень — степень старшей производной.`, R`Order: highest derivative. Linearity: $y$ and its derivatives to the first power. Degree: power of the highest derivative.`) },
    { id: 't01.x7', level: 'hard', type: 'numeric',
      q: L(R`$y'=y^2$, $y(0)=1$ uchun $R=\{|x|\le1,\ |y-1|\le b\}$. Pikar teoremasidagi $h=\min(1,\ b/M)$ ning $b>0$ bo‘yicha eng katta qiymatini kiriting.`, R`Для $y'=y^2$, $y(0)=1$ и $R=\{|x|\le1,\ |y-1|\le b\}$ найдите наибольшее по $b>0$ значение $h=\min(1,\ b/M)$ из теоремы Пикара.`, R`For $y'=y^2$, $y(0)=1$ and $R=\{|x|\le1,\ |y-1|\le b\}$, enter the largest value over $b>0$ of $h=\min(1,\ b/M)$ from Picard’s theorem.`),
      check: { kind: 'numeric', value: 0.25, tol: 1e-3 },
      hint: L(R`$M=\max_R y^2=(1+b)^2$. $g(b)=b/(1+b)^2$ funksiyani maksimallashtiring.`, R`$M=\max_R y^2=(1+b)^2$. Найдите максимум $g(b)=b/(1+b)^2$.`, R`$M=\max_R y^2=(1+b)^2$. Maximise $g(b)=b/(1+b)^2$.`),
      solution: L(R`$g'(b)=\dfrac{1-b}{(1+b)^3}=0\Rightarrow b=1$, $g(1)=\frac14$. $h=\min(1,\frac14)=0{,}25$.`, R`$g'(b)=\dfrac{1-b}{(1+b)^3}=0\Rightarrow b=1$, $g(1)=\frac14$. $h=\min(1,\frac14)=0{,}25$.`, R`$g'(b)=\dfrac{1-b}{(1+b)^3}=0\Rightarrow b=1$, $g(1)=\frac14$. $h=\min(1,\frac14)=0.25$.`) },
    { id: 't01.x8', level: 'hard', type: 'steps',
      q: L(R`$y'=\sqrt{|y|}$, $y(0)=0$ masalasini bosqichma-bosqich tahlil qiling.`, R`Пошагово исследуйте задачу $y'=\sqrt{|y|}$, $y(0)=0$.`, R`Analyse $y'=\sqrt{|y|}$, $y(0)=0$ step by step.`),
      steps: [
        { q: L(R`$f(x,y)=\sqrt{|y|}$ uzluksizmi?`, R`Непрерывна ли $f(x,y)=\sqrt{|y|}$?`, R`Is $f(x,y)=\sqrt{|y|}$ continuous?`), options: [L('Ha, butun tekislikda', 'Да, на всей плоскости', 'Yes, on the whole plane'), L('Yo‘q, $y=0$ da uziladi', 'Нет, разрывна при $y=0$', 'No, it is discontinuous at $y=0$')], correct: 0 },
        { q: L(R`$y=0$ atrofida $f_y$ chegaralanganmi?`, R`Ограничена ли $f_y$ около $y=0$?`, R`Is $f_y$ bounded near $y=0$?`), options: [L('Ha', 'Да', 'Yes'), L(R`Yo‘q: $y>0$ da $f_y=\frac1{2\sqrt y}\to\infty$`, R`Нет: при $y>0$ $f_y=\frac1{2\sqrt y}\to\infty$`, R`No: for $y>0$, $f_y=\frac1{2\sqrt y}\to\infty$`)], correct: 1 },
        { q: L(R`$y=\frac{x^2}{4}$ ($x\ge0$) yechimmi?`, R`Является ли $y=\frac{x^2}{4}$ ($x\ge0$) решением?`, R`Is $y=\frac{x^2}{4}$ ($x\ge0$) a solution?`), options: [L(R`Ha: $y'=\frac x2=\sqrt{x^2/4}$`, R`Да: $y'=\frac x2=\sqrt{x^2/4}$`, R`Yes: $y'=\frac x2=\sqrt{x^2/4}$`), L('Yo‘q', 'Нет', 'No')], correct: 0 },
        { q: L('Xulosa?', 'Вывод?', 'Conclusion?'), options: [L('Yechim mavjud, lekin yagona emas', 'Решение существует, но не единственно', 'A solution exists but is not unique'), L('Yechim yo‘q', 'Решения нет', 'There is no solution'), L('Yechim yagona', 'Решение единственно', 'The solution is unique')], correct: 0 }
      ],
      explain: L(R`$y\equiv0$ va $y=x^2/4$ ($x\ge0$; $x<0$ da $0$) — ikkala funksiya ham $(0,0)$ dan o‘tadi. Peano bo‘yicha mavjudlik bor, Lipshits sharti esa buzilgan.`, R`И $y\equiv0$, и $y=x^2/4$ ($x\ge0$; $0$ при $x<0$) проходят через $(0,0)$. Существование есть по Пеано, а условие Липшица нарушено.`, R`Both $y\equiv0$ and $y=x^2/4$ ($x\ge0$; $0$ for $x<0$) pass through $(0,0)$. Existence holds by Peano, but the Lipschitz condition fails.`) }
  ],
  quiz: [
    { id: 't01.q1', q: L(R`$y''+(y')^3=x$ tenglamaning tartibi:`, R`Порядок уравнения $y''+(y')^3=x$:`, R`The order of $y''+(y')^3=x$ is:`),
      options: [L('1', '1', '1'), L('2', '2', '2'), L('3', '3', '3'), L('5', '5', '5')], correct: 1,
      explain: L(R`Eng yuqori hosila $y''$.`, R`Старшая производная $y''$.`, R`The highest derivative is $y''$.`),
      why: [L(R`$y'$ dan yuqori hosila ham bor.`, R`Есть производная выше $y'$.`, R`A higher derivative than $y'$ appears.`), null, L(R`3 — $(y')^3$ dagi daraja, tartib emas.`, R`3 — степень в $(y')^3$, а не порядок.`, R`3 is the power in $(y')^3$, not the order.`), L('Tartiblar qo‘shilmaydi.', 'Порядки не складываются.', 'Orders are not added.')] },
    { id: 't01.q2', q: L('Qaysi tenglama chiziqli?', 'Какое уравнение линейное?', 'Which equation is linear?'),
      options: [L(R`$y\,y'=1$`, R`$y\,y'=1$`, R`$y\,y'=1$`), L(R`$y'=\sin y$`, R`$y'=\sin y$`, R`$y'=\sin y$`), L(R`$y''+x^2y=e^x$`, R`$y''+x^2y=e^x$`, R`$y''+x^2y=e^x$`), L(R`$(y')^2=x$`, R`$(y')^2=x$`, R`$(y')^2=x$`)], correct: 2,
      explain: L(R`$y''$ va $y$ birinchi darajada, koeffitsiyentlar faqat $x$ ga bog‘liq.`, R`$y''$ и $y$ в первой степени, коэффициенты зависят только от $x$.`, R`$y''$ and $y$ appear to the first power; coefficients depend only on $x$.`),
      why: [L(R`$y\cdot y'$ — noma’lumlar ko‘paytmasi.`, R`$y\cdot y'$ — произведение неизвестных.`, R`$y\cdot y'$ is a product of unknowns.`), L(R`$\sin y$ — $y$ ning chiziqli bo‘lmagan funksiyasi.`, R`$\sin y$ — нелинейная функция от $y$.`, R`$\sin y$ is a nonlinear function of $y$.`), null, L(R`$y'$ kvadratda.`, R`$y'$ в квадрате.`, R`$y'$ is squared.`)] },
    { id: 't01.q3', q: L(R`$y=e^{-x}$ qaysi tenglamaning yechimi?`, R`Решением какого уравнения является $y=e^{-x}$?`, R`Which equation does $y=e^{-x}$ solve?`),
      options: [L(R`$y'-y=0$`, R`$y'-y=0$`, R`$y'-y=0$`), L(R`$y'+y=0$`, R`$y'+y=0$`, R`$y'+y=0$`), L(R`$y''+y=0$`, R`$y''+y=0$`, R`$y''+y=0$`), L(R`$y'=x\,y$`, R`$y'=x\,y$`, R`$y'=x\,y$`)], correct: 1,
      explain: L(R`$y'=-e^{-x}$, demak $y'+y=0$.`, R`$y'=-e^{-x}$, значит $y'+y=0$.`, R`$y'=-e^{-x}$, so $y'+y=0$.`),
      why: [L(R`$y'-y=-2e^{-x}\ne0$.`, R`$y'-y=-2e^{-x}\ne0$.`, R`$y'-y=-2e^{-x}\ne0$.`), null, L(R`$y''+y=2e^{-x}\ne0$.`, R`$y''+y=2e^{-x}\ne0$.`, R`$y''+y=2e^{-x}\ne0$.`), L(R`$-e^{-x}\ne xe^{-x}$ (umuman olganda).`, R`$-e^{-x}\ne xe^{-x}$ (в общем случае).`, R`$-e^{-x}\ne xe^{-x}$ in general.`)] },
    { id: 't01.q4', q: L('Ikkinchi tartibli tenglama uchun Koshi masalasida nechta shart beriladi?', 'Сколько условий задаётся в задаче Коши для уравнения второго порядка?', 'How many conditions does a Cauchy problem for a second-order equation have?'),
      options: [L('1 ta: $y(x_0)$', '1: $y(x_0)$', 'One: $y(x_0)$'), L('2 ta: $y(x_0)$ va $y\'(x_0)$', '2: $y(x_0)$ и $y\'(x_0)$', 'Two: $y(x_0)$ and $y\'(x_0)$'), L('2 ta: $y(x_0)$ va $y(x_1)$', '2: $y(x_0)$ и $y(x_1)$', 'Two: $y(x_0)$ and $y(x_1)$'), L('3 ta', '3', 'Three')], correct: 1,
      explain: L(R`$n$-tartibda bir nuqtada $y,\dots,y^{(n-1)}$ beriladi.`, R`Для порядка $n$ в одной точке задаются $y,\dots,y^{(n-1)}$.`, R`For order $n$, $y,\dots,y^{(n-1)}$ are given at one point.`),
      why: [L('Bitta shart ikkita o‘zgarmasni aniqlamaydi.', 'Одно условие не определяет две постоянные.', 'One condition cannot fix two constants.'), null, L('Ikki nuqtadagi shartlar — chegaraviy masala, Koshi masalasi emas.', 'Условия в двух точках — краевая задача, а не задача Коши.', 'Conditions at two points form a boundary value problem, not a Cauchy problem.'), L('Uchinchi shart ortiqcha.', 'Третье условие лишнее.', 'A third condition is too many.')] },
    { id: 't01.q5', q: L(R`$y'=3y^{2/3}$, $y(0)=0$ masalada Pikar teoremasining qaysi sharti buziladi?`, R`Какое условие теоремы Пикара нарушено в задаче $y'=3y^{2/3}$, $y(0)=0$?`, R`Which hypothesis of Picard’s theorem fails for $y'=3y^{2/3}$, $y(0)=0$?`),
      options: [L('$f$ ning uzluksizligi', 'Непрерывность $f$', 'Continuity of $f$'), L('$y$ bo‘yicha Lipshits sharti', 'Условие Липшица по $y$', 'The Lipschitz condition in $y$'), L('Hech biri', 'Никакое', 'None'), L('$x$ bo‘yicha differensiallanuvchanlik', 'Дифференцируемость по $x$', 'Differentiability in $x$')], correct: 1,
      explain: L(R`$f_y=2y^{-1/3}$ $y=0$ atrofida chegaralanmagan.`, R`$f_y=2y^{-1/3}$ не ограничена около $y=0$.`, R`$f_y=2y^{-1/3}$ is unbounded near $y=0$.`),
      why: [L(R`$3y^{2/3}$ uzluksiz.`, R`$3y^{2/3}$ непрерывна.`, R`$3y^{2/3}$ is continuous.`), null, L('Unda yechim yagona bo‘lardi, lekin $y=0$ va $y=x^3$ bor.', 'Тогда решение было бы единственным, но есть $y=0$ и $y=x^3$.', 'Then the solution would be unique, yet $y=0$ and $y=x^3$ both work.'), L('Teoremada bunday shart yo‘q.', 'Такого условия в теореме нет.', 'The theorem has no such hypothesis.')] },
    { id: 't01.q6', q: L(R`$y'=y^2$, $y(0)=1$ yechim qaysi oraliqda mavjud?`, R`На каком интервале существует решение $y'=y^2$, $y(0)=1$?`, R`On which interval does the solution of $y'=y^2$, $y(0)=1$ exist?`),
      options: [L(R`$\mathbb R$`, R`$\mathbb R$`, R`$\mathbb R$`), L(R`$(-\infty,1)$`, R`$(-\infty,1)$`, R`$(-\infty,1)$`), L(R`$(-1,1)$`, R`$(-1,1)$`, R`$(-1,1)$`), L(R`$(1,\infty)$`, R`$(1,\infty)$`, R`$(1,\infty)$`)], correct: 1,
      explain: L(R`$y=\frac1{1-x}$, $x=1$ da uzilish; boshlang‘ich nuqta $0$ ni o‘z ichiga olgan oraliq $(-\infty,1)$.`, R`$y=\frac1{1-x}$, разрыв при $x=1$; интервал, содержащий начальную точку $0$, — $(-\infty,1)$.`, R`$y=\frac1{1-x}$ breaks down at $x=1$; the interval containing the initial point $0$ is $(-\infty,1)$.`),
      why: [L('$x=1$ da yechim cheksizlikka ketadi.', 'При $x=1$ решение уходит в бесконечность.', 'The solution blows up at $x=1$.'), null, L('Chap tomonda cheklov yo‘q.', 'Слева ограничений нет.', 'There is no obstruction on the left.'), L('Bu oraliq $x_0=0$ ni o‘z ichiga olmaydi.', 'Этот интервал не содержит $x_0=0$.', 'This interval does not contain $x_0=0$.')] },
    { id: 't01.q7', q: L(R`$y'=f(x,y)$ ning integral chizig‘i har bir nuqtada nimaga urinadi?`, R`Чего касается интегральная кривая уравнения $y'=f(x,y)$ в каждой точке?`, R`At every point, the integral curve of $y'=f(x,y)$ is tangent to:`),
      options: [L('Izoklinaga', 'Изоклины', 'the isocline'), L(R`Burchak koeffitsiyenti $f(x,y)$ bo‘lgan maydon kesmasiga`, R`Отрезка поля с угловым коэффициентом $f(x,y)$`, R`the field segment with slope $f(x,y)$`), L('$Ox$ o‘qiga', 'Оси $Ox$', 'the $x$-axis'), L('Boshqa integral chiziqqa', 'Другой интегральной кривой', 'another integral curve')], correct: 1,
      explain: L(R`Bu $y'=f(x,y)$ ning geometrik ma’nosi.`, R`Это и есть геометрический смысл $y'=f(x,y)$.`, R`This is exactly the geometric meaning of $y'=f(x,y)$.`),
      why: [L('Izoklina integral chiziqni kesib o‘tadi, umuman olganda urinmaydi.', 'Изоклина пересекает интегральную кривую и в общем случае её не касается.', 'An isocline generally crosses integral curves rather than touching them.'), null, L('Faqat $f=0$ bo‘lgan nuqtalarda.', 'Только в точках, где $f=0$.', 'Only where $f=0$.'), L('Yagonalik bo‘lsa, integral chiziqlar urinmaydi ham, kesishmaydi ham.', 'При единственности интегральные кривые не касаются и не пересекаются.', 'With uniqueness, integral curves neither touch nor cross.')] },
    { id: 't01.q8', q: L(R`$y'=x^2+y^2$ uchun $k=4$ izoklina:`, R`Изоклина $k=4$ для $y'=x^2+y^2$:`, R`The isocline $k=4$ of $y'=x^2+y^2$ is:`),
      options: [L(R`radiusi 2 bo‘lgan aylana`, R`окружность радиуса 2`, R`the circle of radius 2`), L(R`radiusi 4 bo‘lgan aylana`, R`окружность радиуса 4`, R`the circle of radius 4`), L(R`$y=4x$ to‘g‘ri chiziq`, R`прямая $y=4x$`, R`the line $y=4x$`), L(R`$y=x^2+4$ parabola`, R`парабола $y=x^2+4$`, R`the parabola $y=x^2+4$`)], correct: 0,
      explain: L(R`$x^2+y^2=4$ — radiusi $\sqrt4=2$.`, R`$x^2+y^2=4$ — радиус $\sqrt4=2$.`, R`$x^2+y^2=4$ has radius $\sqrt4=2$.`),
      why: [null, L('Radius $\\sqrt k$, $k$ emas.', 'Радиус равен $\\sqrt k$, а не $k$.', 'The radius is $\\sqrt k$, not $k$.'), L('Izoklina $f(x,y)=k$, bu yerda $f$ chiziqli emas.', 'Изоклина — $f(x,y)=k$, здесь $f$ нелинейна.', 'The isocline is $f(x,y)=k$, and here $f$ is not linear.'), L('$y^2$ hadi hisobga olinmagan.', 'Не учтён член $y^2$.', 'The $y^2$ term was ignored.')] },
    { id: 't01.q9', q: L('Qaysi tenglama xususiy hosilali?', 'Какое уравнение — в частных производных?', 'Which is a partial differential equation?'),
      options: [L(R`$y''=-y$`, R`$y''=-y$`, R`$y''=-y$`), L(R`$u_t=u_{xx}$`, R`$u_t=u_{xx}$`, R`$u_t=u_{xx}$`), L(R`$x'(t)=y,\ y'(t)=-x$`, R`$x'(t)=y,\ y'(t)=-x$`, R`$x'(t)=y,\ y'(t)=-x$`), L(R`$(y')^2=1-y^2$`, R`$(y')^2=1-y^2$`, R`$(y')^2=1-y^2$`)], correct: 1,
      explain: L(R`$u(x,t)$ ikki o‘zgaruvchiga bog‘liq, tenglamada xususiy hosilalar bor.`, R`$u(x,t)$ зависит от двух переменных, в уравнение входят частные производные.`, R`$u(x,t)$ depends on two variables and partial derivatives appear.`),
      why: [L('Bitta erkli o‘zgaruvchi — ODT.', 'Одна независимая переменная — ОДУ.', 'One independent variable: an ODE.'), null, L('Bu ODT sistemasi: hamma noma’lumlar faqat $t$ ga bog‘liq.', 'Это система ОДУ: все неизвестные зависят только от $t$.', 'This is a system of ODEs: all unknowns depend only on $t$.'), L('Bitta erkli o‘zgaruvchi — ODT.', 'Одна независимая переменная — ОДУ.', 'One independent variable: an ODE.')] },
    { id: 't01.q10', q: L(R`$(y'')^3+(y')^5+y=0$ tenglamaning darajasi:`, R`Степень уравнения $(y'')^3+(y')^5+y=0$:`, R`The degree of $(y'')^3+(y')^5+y=0$ is:`),
      options: [L('2', '2', '2'), L('3', '3', '3'), L('5', '5', '5'), L('8', '8', '8')], correct: 1,
      explain: L(R`Daraja — eng yuqori hosila $y''$ ning darajasi: 3.`, R`Степень — степень старшей производной $y''$: 3.`, R`The degree is the power of the highest derivative $y''$: 3.`),
      why: [L('2 — tartib.', '2 — это порядок.', '2 is the order.'), null, L(R`5 — $y'$ ning darajasi, u eng yuqori hosila emas.`, R`5 — степень $y'$, а это не старшая производная.`, R`5 is the power of $y'$, which is not the highest derivative.`), L('Darajalar qo‘shilmaydi.', 'Степени не складываются.', 'Powers are not added.')] }
  ]
});
})();
