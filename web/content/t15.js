(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't15', num: 15,
  title: L('Tor tebranishi: Dalamber formulasi va Furye usuli', 'Колебания струны: формула Даламбера и метод Фурье', 'The vibrating string: d’Alembert’s formula and Fourier’s method'),
  syllabus: { lecture: 'M15', seminar: 'S15', outcomes: ['TN5', 'TN6'], independent: [8, 18] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L('Chegaralanmagan tor uchun Koshi masalasini qo‘ya olasiz va Dalamber formulasi bilan yecha olasiz.', 'Ставить задачу Коши для неограниченной струны и решать её по формуле Даламбера.', 'Pose the Cauchy problem for an infinite string and solve it with d’Alembert’s formula.'),
    L('Yechimni yuguruvchi to‘lqinlar va bog‘liqlik oralig‘i orqali talqin qila olasiz.', 'Истолковывать решение через бегущие волны и промежуток зависимости.', 'Interpret the solution through travelling waves and the interval of dependence.'),
    L('Uchlari mahkamlangan tor uchun Furye usulini qo‘llay olasiz: xos qiymatlar, xos funksiyalar, qator va koeffitsiyentlar.', 'Применять метод Фурье для струны с закреплёнными концами: собственные значения, собственные функции, ряд и коэффициенты.', 'Apply Fourier’s method to a string with fixed ends: eigenvalues, eigenfunctions, series and coefficients.'),
    L('Furye usuli bilan sterjendagi issiqlik tarqalishi masalasini yecha olasiz.', 'Решать методом Фурье задачу о распространении тепла в стержне.', 'Solve the heat problem in a rod by Fourier’s method.'),
    L('Topilgan yechimni tenglama, boshlang‘ich va chegaraviy shartlarga qo‘yib tekshira olasiz.', 'Проверять найденное решение подстановкой в уравнение, начальные и граничные условия.', 'Check a solution by substituting it into the equation and the initial and boundary conditions.')
  ],
  prereqKnowledge: [
    L(R`To‘lqin tenglamasining kanonik ko‘rinishi va umumiy yechimi $u=f(x-at)+g(x+at)$ (14-mavzu).`, R`Канонический вид волнового уравнения и общее решение $u=f(x-at)+g(x+at)$ (тема 14).`, R`The canonical form of the wave equation and its general solution $u=f(x-at)+g(x+at)$ (topic 14).`),
    L(R`$X''+\lambda X=0$ tenglamani yechish (7-mavzu) va chegaraviy masala tushunchasi.`, R`Решение уравнения $X''+\lambda X=0$ (тема 7) и понятие краевой задачи.`, R`Solving $X''+\lambda X=0$ (topic 7) and the notion of a boundary value problem.`),
    L(R`Aniq integrallar, bo‘laklab integrallash, sinuslarning ortogonalligi.`, R`Определённые интегралы, интегрирование по частям, ортогональность синусов.`, R`Definite integrals, integration by parts, orthogonality of sines.`)
  ],
  sources: [
    { id: 'kohler', ref: '9.2, 9.3, 9.4, 9.6', verified: true },
    { id: 'goode', ref: '8.10 (Project: stretched string)', verified: true },
    { id: 'dilmurodov', ref: '§15.1, §15.4', verified: true },
    { id: 'ergashev', ref: '3.3', verified: true },
    { id: 'zikirov', ref: 'Matematik fizika tenglamalari', verified: false },
    { id: 'sabitov', ref: 'Гл. 2–3', verified: false },
    { id: 'boyce', ref: 'Ch. 10', verified: false }
  ],
  labs: ['L10', 'L09'],
  lessons: [
    {
      id: 't15.1',
      title: L('Chegaralanmagan tor. Dalamber formulasi', 'Неограниченная струна. Формула Даламбера', 'The infinite string. D’Alembert’s formula'),
      blocks: [
        { type: 'intro', title: L('Uzun kabel bo‘ylab yuguruvchi impuls', 'Импульс, бегущий по длинному кабелю', 'A pulse running along a long cable'),
          body: L(R`Uzun arqonning bir joyini tortib qo‘yib yuboring: “do‘mboq” ikkiga bo‘linib, chapga va o‘ngga bir xil tezlikda yuguradi. Uzun aloqa liniyasidagi kuchlanish impulsi ham shunday tarqaladi.

14-mavzuda $u_{tt}=a^2u_{xx}$ ning umumiy yechimini topdik: $u=f(x-at)+g(x+at)$. Mashq: $f(s)=g(s)=\frac12 e^{-s^2}$ deb oling. $t=0$ da $u=e^{-x^2}$ — bitta do‘mboq. $t=3$, $a=1$ da $u=\frac12e^{-(x-3)^2}+\frac12e^{-(x+3)^2}$ — balandligi yarim bo‘lgan ikki do‘mboq, $x=\pm3$ nuqtalarda. Shakl o‘zgarmaydi, faqat siljiydi!`,
          R`Оттяните участок длинной верёвки и отпустите: «горб» делится надвое и бежит влево и вправо с одной скоростью. Так же распространяется импульс напряжения в длинной линии связи.

В теме 14 мы нашли общее решение $u_{tt}=a^2u_{xx}$: $u=f(x-at)+g(x+at)$. Упражнение: возьмите $f(s)=g(s)=\frac12 e^{-s^2}$. При $t=0$ $u=e^{-x^2}$ — один горб. При $t=3$, $a=1$: $u=\frac12e^{-(x-3)^2}+\frac12e^{-(x+3)^2}$ — два горба половинной высоты в точках $x=\pm3$. Форма не меняется, а только сдвигается!`,
          R`Pull a point of a long rope and let go: the “bump” splits in two and runs left and right with the same speed. A voltage pulse on a long communication line travels the same way.

In topic 14 we found the general solution of $u_{tt}=a^2u_{xx}$: $u=f(x-at)+g(x+at)$. Exercise: take $f(s)=g(s)=\frac12 e^{-s^2}$. At $t=0$, $u=e^{-x^2}$, a single bump. At $t=3$ with $a=1$, $u=\frac12e^{-(x-3)^2}+\frac12e^{-(x+3)^2}$: two bumps of half the height at $x=\pm3$. The shape does not change, it only shifts!`) },
        { type: 'def', title: L('Chegaralanmagan tor uchun Koshi masalasi', 'Задача Коши для неограниченной струны', 'The Cauchy problem for an infinite string'),
          body: L(R`Shunday $u(x,t)$ ni topingki,
$$u_{tt}=a^2u_{xx},\quad -\infty<x<\infty,\ t>0;\qquad u(x,0)=\varphi(x),\quad u_t(x,0)=\psi(x).$$
$\varphi$ — torning boshlang‘ich shakli, $\psi$ — boshlang‘ich tezligi. Chegaraviy shartlar yo‘q: tor shunchalik uzunki, uchlardan qaytgan to‘lqinlar qaralayotgan vaqtda yetib kelmaydi.`,
          R`Найти $u(x,t)$ такую, что
$$u_{tt}=a^2u_{xx},\quad -\infty<x<\infty,\ t>0;\qquad u(x,0)=\varphi(x),\quad u_t(x,0)=\psi(x).$$
$\varphi$ — начальная форма струны, $\psi$ — начальная скорость. Граничных условий нет: струна настолько длинная, что волны, отражённые от концов, за рассматриваемое время не приходят.`,
          R`Find $u(x,t)$ such that
$$u_{tt}=a^2u_{xx},\quad -\infty<x<\infty,\ t>0;\qquad u(x,0)=\varphi(x),\quad u_t(x,0)=\psi(x).$$
$\varphi$ is the initial shape of the string and $\psi$ its initial velocity. There are no boundary conditions: the string is so long that waves reflected from its ends do not arrive within the time considered.`) },
        { type: 'thm', title: L('Dalamber formulasi', 'Формула Даламбера', 'D’Alembert’s formula'),
          conds: L(R`$a>0$ — o‘zgarmas; $\varphi\in C^2(\mathbb R)$, $\psi\in C^1(\mathbb R)$.`, R`$a>0$ — постоянная; $\varphi\in C^2(\mathbb R)$, $\psi\in C^1(\mathbb R)$.`, R`$a>0$ is a constant; $\varphi\in C^2(\mathbb R)$, $\psi\in C^1(\mathbb R)$.`),
          body: L(R`Koshi masalasining yagona klassik yechimi mavjud va u
$$u(x,t)=\frac{\varphi(x-at)+\varphi(x+at)}{2}+\frac{1}{2a}\int_{x-at}^{x+at}\psi(s)\,ds.$$
Bundan tashqari, masala korrekt: agar $|\varphi_1-\varphi_2|\le\varepsilon_1$, $|\psi_1-\psi_2|\le\varepsilon_2$ bo‘lsa, $0\le t\le T$ da $|u_1-u_2|\le\varepsilon_1+T\varepsilon_2$.`,
          R`Задача Коши имеет единственное классическое решение
$$u(x,t)=\frac{\varphi(x-at)+\varphi(x+at)}{2}+\frac{1}{2a}\int_{x-at}^{x+at}\psi(s)\,ds.$$
Кроме того, задача корректна: если $|\varphi_1-\varphi_2|\le\varepsilon_1$, $|\psi_1-\psi_2|\le\varepsilon_2$, то при $0\le t\le T$ $|u_1-u_2|\le\varepsilon_1+T\varepsilon_2$.`,
          R`The Cauchy problem has a unique classical solution,
$$u(x,t)=\frac{\varphi(x-at)+\varphi(x+at)}{2}+\frac{1}{2a}\int_{x-at}^{x+at}\psi(s)\,ds.$$
Moreover the problem is well-posed: if $|\varphi_1-\varphi_2|\le\varepsilon_1$ and $|\psi_1-\psi_2|\le\varepsilon_2$, then $|u_1-u_2|\le\varepsilon_1+T\varepsilon_2$ for $0\le t\le T$.`) },
        { type: 'proof', body: L(R`Har qanday yechim $u=f(x-at)+g(x+at)$ ko‘rinishida. Shartlar: $f(x)+g(x)=\varphi(x)$, $-af'(x)+ag'(x)=\psi(x)$. Ikkinchisini integrallaymiz: $-f(x)+g(x)=\frac1a\int_0^x\psi(s)\,ds+K$. Ikki tenglamadan $g(x)=\frac{\varphi(x)}2+\frac1{2a}\int_0^x\psi\,ds+\frac K2$, $f(x)=\frac{\varphi(x)}2-\frac1{2a}\int_0^x\psi\,ds-\frac K2$. $f(x-at)+g(x+at)$ ni qo‘shsak, $K$ qisqaradi va formula hosil bo‘ladi. Yagonalik: har qanday yechim shu yo‘l bilan aynan shu formulaga keladi. Baho: birinchi qo‘shiluvchi farqi $\le\varepsilon_1$, integral uzunligi $2at$ bo‘lgani uchun ikkinchisi $\le\frac{2at}{2a}\varepsilon_2\le T\varepsilon_2$.`,
          R`Любое решение имеет вид $u=f(x-at)+g(x+at)$. Условия: $f(x)+g(x)=\varphi(x)$, $-af'(x)+ag'(x)=\psi(x)$. Интегрируем второе: $-f(x)+g(x)=\frac1a\int_0^x\psi(s)\,ds+K$. Из двух уравнений $g(x)=\frac{\varphi(x)}2+\frac1{2a}\int_0^x\psi\,ds+\frac K2$, $f(x)=\frac{\varphi(x)}2-\frac1{2a}\int_0^x\psi\,ds-\frac K2$. Складывая $f(x-at)+g(x+at)$, получаем формулу, $K$ сокращается. Единственность: любое решение этим путём приводится именно к этой формуле. Оценка: разность первых слагаемых $\le\varepsilon_1$, длина промежутка интегрирования $2at$, поэтому второе $\le\frac{2at}{2a}\varepsilon_2\le T\varepsilon_2$.`,
          R`Every solution has the form $u=f(x-at)+g(x+at)$. The conditions give $f(x)+g(x)=\varphi(x)$ and $-af'(x)+ag'(x)=\psi(x)$. Integrating the second: $-f(x)+g(x)=\frac1a\int_0^x\psi(s)\,ds+K$. Solving, $g(x)=\frac{\varphi(x)}2+\frac1{2a}\int_0^x\psi\,ds+\frac K2$ and $f(x)=\frac{\varphi(x)}2-\frac1{2a}\int_0^x\psi\,ds-\frac K2$. Adding $f(x-at)+g(x+at)$ gives the formula and $K$ cancels. Uniqueness: every solution leads by this route to exactly this formula. Estimate: the first terms differ by at most $\varepsilon_1$; the integration interval has length $2at$, so the second term differs by at most $\frac{2at}{2a}\varepsilon_2\le T\varepsilon_2$.`) },
        { type: 'example', title: L('Ko‘phad berilganlar', 'Полиномиальные данные', 'Polynomial data'),
          body: L(R`$u_{tt}=9u_{xx}$, $u(x,0)=x^2$, $u_t(x,0)=x$.`, R`$u_{tt}=9u_{xx}$, $u(x,0)=x^2$, $u_t(x,0)=x$.`, R`$u_{tt}=9u_{xx}$, $u(x,0)=x^2$, $u_t(x,0)=x$.`),
          steps: [
            L(R`$a=3$, $\varphi=x^2$, $\psi=x$.`, R`$a=3$, $\varphi=x^2$, $\psi=x$.`, R`$a=3$, $\varphi=x^2$, $\psi=x$.`),
            L(R`Birinchi qism: $\frac{(x-3t)^2+(x+3t)^2}{2}=x^2+9t^2$.`, R`Первая часть: $\frac{(x-3t)^2+(x+3t)^2}{2}=x^2+9t^2$.`, R`First part: $\frac{(x-3t)^2+(x+3t)^2}{2}=x^2+9t^2$.`),
            L(R`Ikkinchi qism: $\frac16\int_{x-3t}^{x+3t}s\,ds=\frac1{12}\big((x+3t)^2-(x-3t)^2\big)=\frac{12xt}{12}=xt$.`, R`Вторая часть: $\frac16\int_{x-3t}^{x+3t}s\,ds=\frac1{12}\big((x+3t)^2-(x-3t)^2\big)=\frac{12xt}{12}=xt$.`, R`Second part: $\frac16\int_{x-3t}^{x+3t}s\,ds=\frac1{12}\big((x+3t)^2-(x-3t)^2\big)=\frac{12xt}{12}=xt$.`),
            L(R`Javob: $u=x^2+9t^2+xt$.`, R`Ответ: $u=x^2+9t^2+xt$.`, R`Answer: $u=x^2+9t^2+xt$.`)
          ],
          check: L(R`$u_{tt}=18$, $9u_{xx}=9\cdot2=18$ ✓; $u(x,0)=x^2$ ✓; $u_t=18t+x$, $u_t(x,0)=x$ ✓.`, R`$u_{tt}=18$, $9u_{xx}=9\cdot2=18$ ✓; $u(x,0)=x^2$ ✓; $u_t=18t+x$, $u_t(x,0)=x$ ✓.`, R`$u_{tt}=18$, $9u_{xx}=9\cdot2=18$ ✓; $u(x,0)=x^2$ ✓; $u_t=18t+x$, $u_t(x,0)=x$ ✓.`) },
        { type: 'example', title: L('Turg‘un to‘lqin ikki yuguruvchi to‘lqin yig‘indisi', 'Стоячая волна как сумма двух бегущих', 'A standing wave as the sum of two travelling waves'),
          body: L(R`$u_{tt}=4u_{xx}$, $u(x,0)=\sin x$, $u_t(x,0)=0$.`, R`$u_{tt}=4u_{xx}$, $u(x,0)=\sin x$, $u_t(x,0)=0$.`, R`$u_{tt}=4u_{xx}$, $u(x,0)=\sin x$, $u_t(x,0)=0$.`),
          steps: [
            L(R`$a=2$, $\psi=0$ — integral qism yo‘q.`, R`$a=2$, $\psi=0$ — интегральной части нет.`, R`$a=2$ and $\psi=0$, so there is no integral term.`),
            L(R`$u=\frac{\sin(x-2t)+\sin(x+2t)}2$ — o‘ngga va chapga yuguruvchi ikki sinusoida.`, R`$u=\frac{\sin(x-2t)+\sin(x+2t)}2$ — две синусоиды, бегущие вправо и влево.`, R`$u=\frac{\sin(x-2t)+\sin(x+2t)}2$: two sine waves running right and left.`),
            L(R`Yig‘indini ko‘paytmaga aylantiramiz: $u=\sin x\cos 2t$. Bu **turg‘un to‘lqin**: $x=k\pi$ nuqtalar (tugunlar) har doim harakatsiz, shakl faqat “nafas oladi”.`, R`Превращаем сумму в произведение: $u=\sin x\cos 2t$. Это **стоячая волна**: точки $x=k\pi$ (узлы) всегда неподвижны, форма лишь «дышит».`, R`Turn the sum into a product: $u=\sin x\cos 2t$. This is a **standing wave**: the points $x=k\pi$ (nodes) never move, the shape only “breathes”.`)
          ],
          check: L(R`$u_{tt}=-4\sin x\cos2t$, $4u_{xx}=-4\sin x\cos 2t$ ✓; $u(x,0)=\sin x$ ✓; $u_t(x,0)=-2\sin x\sin0=0$ ✓.`, R`$u_{tt}=-4\sin x\cos2t$, $4u_{xx}=-4\sin x\cos 2t$ ✓; $u(x,0)=\sin x$ ✓; $u_t(x,0)=-2\sin x\sin0=0$ ✓.`, R`$u_{tt}=-4\sin x\cos2t$, $4u_{xx}=-4\sin x\cos 2t$ ✓; $u(x,0)=\sin x$ ✓; $u_t(x,0)=-2\sin x\sin0=0$ ✓.`) },
        { type: 'example', title: L('Impulsning bo‘linishi va bog‘liqlik oralig‘i', 'Расщепление импульса и промежуток зависимости', 'Splitting of a pulse and the interval of dependence'),
          body: L(R`$u_{tt}=u_{xx}$, $u(x,0)=\dfrac1{1+x^2}$, $u_t(x,0)=0$. $u(0,1)$ va $u(3,3)$ ni toping.`, R`$u_{tt}=u_{xx}$, $u(x,0)=\dfrac1{1+x^2}$, $u_t(x,0)=0$. Найдите $u(0,1)$ и $u(3,3)$.`, R`$u_{tt}=u_{xx}$, $u(x,0)=\dfrac1{1+x^2}$, $u_t(x,0)=0$. Find $u(0,1)$ and $u(3,3)$.`),
          steps: [
            L(R`$u=\frac12\left(\dfrac1{1+(x-t)^2}+\dfrac1{1+(x+t)^2}\right)$ — balandligi $\frac12$ bo‘lgan ikki impuls, markazlari $x=\pm t$.`, R`$u=\frac12\left(\dfrac1{1+(x-t)^2}+\dfrac1{1+(x+t)^2}\right)$ — два импульса высоты $\frac12$ с центрами $x=\pm t$.`, R`$u=\frac12\left(\dfrac1{1+(x-t)^2}+\dfrac1{1+(x+t)^2}\right)$: two pulses of height $\frac12$ centred at $x=\pm t$.`),
            L(R`$u(0,1)=\frac12\left(\frac12+\frac12\right)=\frac12$: markaz bir birlik vaqtda ikki baravar pasaydi.`, R`$u(0,1)=\frac12\left(\frac12+\frac12\right)=\frac12$: центр за единицу времени опустился вдвое.`, R`$u(0,1)=\frac12\left(\frac12+\frac12\right)=\frac12$: the centre dropped to half in one time unit.`),
            L(R`$u(3,3)=\frac12\left(1+\frac1{37}\right)=\frac{19}{37}\approx0{,}514$: o‘ngga ketgan impuls cho‘qqisi shu yerda.`, R`$u(3,3)=\frac12\left(1+\frac1{37}\right)=\frac{19}{37}\approx0{,}514$: здесь вершина импульса, ушедшего вправо.`, R`$u(3,3)=\frac12\left(1+\frac1{37}\right)=\frac{19}{37}\approx0.514$: the peak of the right-moving pulse is here.`),
            L(R`$u(x_0,t_0)$ faqat $[x_0-at_0,\ x_0+at_0]$ oraliqdagi berilganlarga bog‘liq — **bog‘liqlik oralig‘i**. Signal $a$ dan tez tarqalmaydi.`, R`$u(x_0,t_0)$ зависит только от данных на отрезке $[x_0-at_0,\ x_0+at_0]$ — **промежуток зависимости**. Сигнал не распространяется быстрее $a$.`, R`$u(x_0,t_0)$ depends only on the data on $[x_0-at_0,\ x_0+at_0]$, the **interval of dependence**. Signals travel no faster than $a$.`)
          ],
          check: L(R`$t=0$ da $u=\frac1{1+x^2}$ ✓, $u_t(x,0)=\frac12\big(\varphi'(x)-\varphi'(x)\big)=0$ ✓; $f(x-t)+g(x+t)$ ko‘rinishi tenglamani qanoatlantiradi ✓.`, R`При $t=0$ $u=\frac1{1+x^2}$ ✓, $u_t(x,0)=\frac12\big(\varphi'(x)-\varphi'(x)\big)=0$ ✓; вид $f(x-t)+g(x+t)$ удовлетворяет уравнению ✓.`, R`At $t=0$, $u=\frac1{1+x^2}$ ✓, $u_t(x,0)=\frac12\big(\varphi'(x)-\varphi'(x)\big)=0$ ✓; the form $f(x-t)+g(x+t)$ satisfies the equation ✓.`) },
        { type: 'warn', body: L(R`Dalamber formulasida integral oldidagi ko‘paytuvchi $\frac1{2a}$, $\frac12$ emas; chegaralar $x-at$ dan $x+at$ gacha ($0$ dan $t$ gacha emas). Formulani faqat chegaralanmagan tor uchun to‘g‘ridan-to‘g‘ri qo‘llang: uchlari mahkamlangan torda qaytgan to‘lqinlar hisobga olinmaydi.`,
          R`В формуле Даламбера множитель перед интегралом равен $\frac1{2a}$, а не $\frac12$; пределы от $x-at$ до $x+at$ (а не от $0$ до $t$). Применяйте формулу напрямую только для неограниченной струны: для струны с закреплёнными концами она не учитывает отражённые волны.`,
          R`In d’Alembert’s formula the factor in front of the integral is $\frac1{2a}$, not $\frac12$, and the limits are $x-at$ to $x+at$ (not $0$ to $t$). Apply the formula directly only to an infinite string: for a string with fixed ends it ignores the reflected waves.`) }
      ]
    },
    {
      id: 't15.2',
      title: L('Chegaralangan tor. Furye usuli', 'Ограниченная струна. Метод Фурье', 'The finite string. Fourier’s method'),
      blocks: [
        { type: 'def', title: L('Uchlari mahkamlangan tor uchun aralash masala', 'Смешанная задача для струны с закреплёнными концами', 'The mixed problem for a string with fixed ends'),
          body: L(R`$$u_{tt}=a^2u_{xx},\quad 0<x<l,\ t>0;$$
$$u(0,t)=0,\quad u(l,t)=0\quad\text{(chegaraviy)};\qquad u(x,0)=\varphi(x),\quad u_t(x,0)=\psi(x)\quad\text{(boshlang‘ich)}.$$
**Furye usuli** (o‘zgaruvchilarni ajratish): avval chegaraviy shartlarni qanoatlantiruvchi $u=X(x)T(t)$ ko‘rinishidagi nolmas yechimlarni topamiz, so‘ng ularning yig‘indisi (qator) bilan boshlang‘ich shartlarni qanoatlantiramiz.`,
          R`$$u_{tt}=a^2u_{xx},\quad 0<x<l,\ t>0;$$
$$u(0,t)=0,\quad u(l,t)=0\quad\text{(граничные)};\qquad u(x,0)=\varphi(x),\quad u_t(x,0)=\psi(x)\quad\text{(начальные)}.$$
**Метод Фурье** (разделение переменных): сначала находим ненулевые решения вида $u=X(x)T(t)$, удовлетворяющие граничным условиям, затем их суммой (рядом) удовлетворяем начальным условиям.`,
          R`$$u_{tt}=a^2u_{xx},\quad 0<x<l,\ t>0;$$
$$u(0,t)=0,\quad u(l,t)=0\quad\text{(boundary)};\qquad u(x,0)=\varphi(x),\quad u_t(x,0)=\psi(x)\quad\text{(initial)}.$$
**Fourier’s method** (separation of variables): first find nonzero solutions of the form $u=X(x)T(t)$ that satisfy the boundary conditions, then use their sum (a series) to satisfy the initial conditions.`) },
        { type: 'thm', title: L('Shturm–Liuvill masalasi: xos qiymatlar va xos funksiyalar', 'Задача Штурма–Лиувилля: собственные значения и функции', 'The Sturm–Liouville problem: eigenvalues and eigenfunctions'),
          conds: L(R`$X''+\lambda X=0$, $0<x<l$; $X(0)=0$, $X(l)=0$; $\lambda$ — haqiqiy son, $X\not\equiv0$ izlanadi.`, R`$X''+\lambda X=0$, $0<x<l$; $X(0)=0$, $X(l)=0$; $\lambda$ — вещественное число, ищется $X\not\equiv0$.`, R`$X''+\lambda X=0$, $0<x<l$; $X(0)=0$, $X(l)=0$; $\lambda$ real, $X\not\equiv0$ sought.`),
          body: L(R`Nolmas yechim faqat
$$\lambda_n=\left(\frac{n\pi}{l}\right)^2,\qquad X_n(x)=\sin\frac{n\pi x}{l},\qquad n=1,2,3,\dots$$
da mavjud (o‘zgarmas ko‘paytuvchi aniqligida).`,
          R`Ненулевые решения существуют только при
$$\lambda_n=\left(\frac{n\pi}{l}\right)^2,\qquad X_n(x)=\sin\frac{n\pi x}{l},\qquad n=1,2,3,\dots$$
(с точностью до постоянного множителя).`,
          R`Nonzero solutions exist only for
$$\lambda_n=\left(\frac{n\pi}{l}\right)^2,\qquad X_n(x)=\sin\frac{n\pi x}{l},\qquad n=1,2,3,\dots$$
(up to a constant factor).`) },
        { type: 'proof', body: L(R`- $\lambda=-\mu^2<0$: $X=A\cosh\mu x+B\sinh\mu x$; $X(0)=A=0$, $X(l)=B\sinh\mu l=0\Rightarrow B=0$.
- $\lambda=0$: $X=A+Bx$; $A=0$, $Bl=0\Rightarrow X\equiv0$.
- $\lambda=\mu^2>0$: $X=A\cos\mu x+B\sin\mu x$; $A=0$, $B\sin\mu l=0$. $B\ne0$ uchun $\sin\mu l=0$, $\mu=\frac{n\pi}{l}$.`,
          R`- $\lambda=-\mu^2<0$: $X=A\cosh\mu x+B\sinh\mu x$; $X(0)=A=0$, $X(l)=B\sinh\mu l=0\Rightarrow B=0$.
- $\lambda=0$: $X=A+Bx$; $A=0$, $Bl=0\Rightarrow X\equiv0$.
- $\lambda=\mu^2>0$: $X=A\cos\mu x+B\sin\mu x$; $A=0$, $B\sin\mu l=0$. При $B\ne0$: $\sin\mu l=0$, $\mu=\frac{n\pi}{l}$.`,
          R`- $\lambda=-\mu^2<0$: $X=A\cosh\mu x+B\sinh\mu x$; $X(0)=A=0$, $X(l)=B\sinh\mu l=0\Rightarrow B=0$.
- $\lambda=0$: $X=A+Bx$; $A=0$, $Bl=0\Rightarrow X\equiv0$.
- $\lambda=\mu^2>0$: $X=A\cos\mu x+B\sin\mu x$; $A=0$, $B\sin\mu l=0$. For $B\ne0$ we need $\sin\mu l=0$, $\mu=\frac{n\pi}{l}$.`) },
        { type: 'thm', title: L('Furye qatori ko‘rinishidagi yechim', 'Решение в виде ряда Фурье', 'Solution as a Fourier series'),
          conds: L(R`$\varphi\in C^2[0,l]$, $\varphi'''$ bo‘lakli uzluksiz, $\varphi(0)=\varphi(l)=\varphi''(0)=\varphi''(l)=0$; $\psi\in C^1[0,l]$, $\psi''$ bo‘lakli uzluksiz, $\psi(0)=\psi(l)=0$.`, R`$\varphi\in C^2[0,l]$, $\varphi'''$ кусочно непрерывна, $\varphi(0)=\varphi(l)=\varphi''(0)=\varphi''(l)=0$; $\psi\in C^1[0,l]$, $\psi''$ кусочно непрерывна, $\psi(0)=\psi(l)=0$.`, R`$\varphi\in C^2[0,l]$ with $\varphi'''$ piecewise continuous and $\varphi(0)=\varphi(l)=\varphi''(0)=\varphi''(l)=0$; $\psi\in C^1[0,l]$ with $\psi''$ piecewise continuous and $\psi(0)=\psi(l)=0$.`),
          body: L(R`Aralash masalaning klassik yechimi
$$u(x,t)=\sum_{n=1}^{\infty}\left(A_n\cos\frac{an\pi t}{l}+B_n\sin\frac{an\pi t}{l}\right)\sin\frac{n\pi x}{l},$$
$$A_n=\frac2l\int_0^l\varphi(x)\sin\frac{n\pi x}{l}\,dx,\qquad B_n=\frac{2}{an\pi}\int_0^l\psi(x)\sin\frac{n\pi x}{l}\,dx.$$
Har bir had — chastotasi $\omega_n=\dfrac{an\pi}{l}$ bo‘lgan **turg‘un to‘lqin** (moda); $T_n''+\omega_n^2T_n=0$ — 8-mavzudagi garmonik ossillyator.`,
          R`Классическое решение смешанной задачи
$$u(x,t)=\sum_{n=1}^{\infty}\left(A_n\cos\frac{an\pi t}{l}+B_n\sin\frac{an\pi t}{l}\right)\sin\frac{n\pi x}{l},$$
$$A_n=\frac2l\int_0^l\varphi(x)\sin\frac{n\pi x}{l}\,dx,\qquad B_n=\frac{2}{an\pi}\int_0^l\psi(x)\sin\frac{n\pi x}{l}\,dx.$$
Каждый член — **стоячая волна** (мода) с частотой $\omega_n=\dfrac{an\pi}{l}$; $T_n''+\omega_n^2T_n=0$ — гармонический осциллятор из темы 8.`,
          R`The classical solution of the mixed problem is
$$u(x,t)=\sum_{n=1}^{\infty}\left(A_n\cos\frac{an\pi t}{l}+B_n\sin\frac{an\pi t}{l}\right)\sin\frac{n\pi x}{l},$$
$$A_n=\frac2l\int_0^l\varphi(x)\sin\frac{n\pi x}{l}\,dx,\qquad B_n=\frac{2}{an\pi}\int_0^l\psi(x)\sin\frac{n\pi x}{l}\,dx.$$
Each term is a **standing wave** (mode) with frequency $\omega_n=\dfrac{an\pi}{l}$; $T_n''+\omega_n^2T_n=0$ is the harmonic oscillator of topic 8.`) },
        { type: 'example', title: L('Berilganlar xos funksiyalardan iborat', 'Данные состоят из собственных функций', 'Data made of eigenfunctions'),
          body: L(R`$u_{tt}=u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=2\sin x-\sin3x$, $u_t(x,0)=4\sin 2x$.`, R`$u_{tt}=u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=2\sin x-\sin3x$, $u_t(x,0)=4\sin 2x$.`, R`$u_{tt}=u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=2\sin x-\sin3x$, $u_t(x,0)=4\sin 2x$.`),
          steps: [
            L(R`$l=\pi$, $a=1$: $X_n=\sin nx$, $\omega_n=n$. $u=\sum(A_n\cos nt+B_n\sin nt)\sin nx$.`, R`$l=\pi$, $a=1$: $X_n=\sin nx$, $\omega_n=n$. $u=\sum(A_n\cos nt+B_n\sin nt)\sin nx$.`, R`$l=\pi$, $a=1$: $X_n=\sin nx$, $\omega_n=n$. $u=\sum(A_n\cos nt+B_n\sin nt)\sin nx$.`),
            L(R`$t=0$: $\sum A_n\sin nx=2\sin x-\sin 3x$ — integral kerak emas, koeffitsiyentlarni solishtiramiz: $A_1=2$, $A_3=-1$, qolganlari $0$.`, R`$t=0$: $\sum A_n\sin nx=2\sin x-\sin 3x$ — интеграл не нужен, сравниваем коэффициенты: $A_1=2$, $A_3=-1$, остальные $0$.`, R`$t=0$: $\sum A_n\sin nx=2\sin x-\sin 3x$; no integral is needed, compare coefficients: $A_1=2$, $A_3=-1$, all others $0$.`),
            L(R`$u_t(x,0)=\sum nB_n\sin nx=4\sin2x$: $2B_2=4$, $B_2=2$, qolganlari $0$.`, R`$u_t(x,0)=\sum nB_n\sin nx=4\sin2x$: $2B_2=4$, $B_2=2$, остальные $0$.`, R`$u_t(x,0)=\sum nB_n\sin nx=4\sin2x$: $2B_2=4$, so $B_2=2$, all others $0$.`),
            L(R`Javob: $u=2\sin x\cos t+2\sin2x\sin2t-\sin3x\cos3t$.`, R`Ответ: $u=2\sin x\cos t+2\sin2x\sin2t-\sin3x\cos3t$.`, R`Answer: $u=2\sin x\cos t+2\sin2x\sin2t-\sin3x\cos3t$.`)
          ],
          check: L(R`Har bir had $\sin nx\cdot(\cos nt$ yoki $\sin nt)$: $u_{tt}=-n^2(\dots)=u_{xx}$ ✓; $x=0,\pi$ da $\sin nx=0$ ✓; $u(x,0)=2\sin x-\sin3x$ ✓; $u_t(x,0)=4\sin2x$ ✓.`, R`Каждый член $\sin nx\cdot(\cos nt$ или $\sin nt)$: $u_{tt}=-n^2(\dots)=u_{xx}$ ✓; при $x=0,\pi$ $\sin nx=0$ ✓; $u(x,0)=2\sin x-\sin3x$ ✓; $u_t(x,0)=4\sin2x$ ✓.`, R`Each term is $\sin nx\cdot(\cos nt$ or $\sin nt)$: $u_{tt}=-n^2(\dots)=u_{xx}$ ✓; $\sin nx=0$ at $x=0,\pi$ ✓; $u(x,0)=2\sin x-\sin3x$ ✓; $u_t(x,0)=4\sin2x$ ✓.`) },
        { type: 'example', title: L('Tortib qo‘yib yuborilgan tor', 'Оттянутая и отпущенная струна', 'A string pulled and released'),
          body: L(R`$u_{tt}=u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=x(\pi-x)$, $u_t(x,0)=0$.`, R`$u_{tt}=u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=x(\pi-x)$, $u_t(x,0)=0$.`, R`$u_{tt}=u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=x(\pi-x)$, $u_t(x,0)=0$.`),
          steps: [
            L(R`$\psi=0\Rightarrow B_n=0$. $A_n=\dfrac2\pi\int_0^\pi x(\pi-x)\sin nx\,dx$.`, R`$\psi=0\Rightarrow B_n=0$. $A_n=\dfrac2\pi\int_0^\pi x(\pi-x)\sin nx\,dx$.`, R`$\psi=0\Rightarrow B_n=0$. $A_n=\dfrac2\pi\int_0^\pi x(\pi-x)\sin nx\,dx$.`),
            L(R`Ikki marta bo‘laklab integrallash: $\int_0^\pi x(\pi-x)\sin nx\,dx=\dfrac{2\big(1-(-1)^n\big)}{n^3}$.`, R`Дважды интегрируем по частям: $\int_0^\pi x(\pi-x)\sin nx\,dx=\dfrac{2\big(1-(-1)^n\big)}{n^3}$.`, R`Integrate by parts twice: $\int_0^\pi x(\pi-x)\sin nx\,dx=\dfrac{2\big(1-(-1)^n\big)}{n^3}$.`),
            L(R`$A_n=\dfrac{4\big(1-(-1)^n\big)}{\pi n^3}$: juft $n$ da $0$, toq $n$ da $\dfrac{8}{\pi n^3}$ ($A_1=\frac8\pi\approx2{,}546$).`, R`$A_n=\dfrac{4\big(1-(-1)^n\big)}{\pi n^3}$: при чётных $n$ — $0$, при нечётных $n$ — $\dfrac{8}{\pi n^3}$ ($A_1=\frac8\pi\approx2{,}546$).`, R`$A_n=\dfrac{4\big(1-(-1)^n\big)}{\pi n^3}$: $0$ for even $n$, $\dfrac{8}{\pi n^3}$ for odd $n$ ($A_1=\frac8\pi\approx2.546$).`),
            L(R`$u=\dfrac8\pi\displaystyle\sum_{k=0}^\infty\frac{\sin(2k+1)x\,\cos(2k+1)t}{(2k+1)^3}$. Koeffitsiyentlar $n^3$ kabi kamayadi: asosiy ton ustun, yuqori obertonlar kuchsiz.`, R`$u=\dfrac8\pi\displaystyle\sum_{k=0}^\infty\frac{\sin(2k+1)x\,\cos(2k+1)t}{(2k+1)^3}$. Коэффициенты убывают как $n^3$: преобладает основной тон, высокие обертоны слабые.`, R`$u=\dfrac8\pi\displaystyle\sum_{k=0}^\infty\frac{\sin(2k+1)x\,\cos(2k+1)t}{(2k+1)^3}$. The coefficients decay like $1/n^3$: the fundamental dominates, high overtones are weak.`)
          ],
          check: L(R`$t=0$, $x=\frac\pi2$: $\frac8\pi\left(1-\frac1{27}+\frac1{125}-\dots\right)\approx2{,}4674$, $\varphi(\frac\pi2)=\frac{\pi^2}4\approx2{,}4674$ ✓ (200 ta had bo‘yicha hisoblangan).`, R`$t=0$, $x=\frac\pi2$: $\frac8\pi\left(1-\frac1{27}+\frac1{125}-\dots\right)\approx2{,}4674$, $\varphi(\frac\pi2)=\frac{\pi^2}4\approx2{,}4674$ ✓ (подсчитано по 200 членам).`, R`$t=0$, $x=\frac\pi2$: $\frac8\pi\left(1-\frac1{27}+\frac1{125}-\dots\right)\approx2.4674$ and $\varphi(\frac\pi2)=\frac{\pi^2}4\approx2.4674$ ✓ (summed over 200 terms).`) },
        { type: 'note', title: L('Tovush, obertonlar va rezonans', 'Звук, обертоны и резонанс', 'Sound, overtones and resonance'),
          body: L(R`Asosiy chastota $f_1=\dfrac{\omega_1}{2\pi}=\dfrac{a}{2l}=\dfrac1{2l}\sqrt{\dfrac{T_0}{\rho}}$: torni qisqartirsangiz yoki tarangroq tortsangiz, tovush balandlashadi. Obertonlar $f_n=nf_1$ — tovush tembrini beradi.

Agar torga tashqi davriy kuch ($u_{tt}=a^2u_{xx}+F(x)\cos\omega t$) ta’sir etsa va $\omega$ biror $\omega_n$ ga teng bo‘lsa (hamda $F$ ning $n$-Furye koeffitsiyenti nol bo‘lmasa), shu moda uchun 8-mavzudagi **rezonans** yuz beradi: amplituda $t$ ga proporsional o‘sadi.`,
          R`Основная частота $f_1=\dfrac{\omega_1}{2\pi}=\dfrac{a}{2l}=\dfrac1{2l}\sqrt{\dfrac{T_0}{\rho}}$: если укоротить струну или сильнее натянуть, звук станет выше. Обертоны $f_n=nf_1$ задают тембр.

Если на струну действует внешняя периодическая сила ($u_{tt}=a^2u_{xx}+F(x)\cos\omega t$) и $\omega$ совпадает с одной из $\omega_n$ (а $n$-й коэффициент Фурье функции $F$ не равен нулю), для этой моды возникает **резонанс** из темы 8: амплитуда растёт пропорционально $t$.`,
          R`The fundamental frequency is $f_1=\dfrac{\omega_1}{2\pi}=\dfrac{a}{2l}=\dfrac1{2l}\sqrt{\dfrac{T_0}{\rho}}$: shortening the string or tightening it raises the pitch. The overtones $f_n=nf_1$ give the timbre.

If a periodic external force acts on the string ($u_{tt}=a^2u_{xx}+F(x)\cos\omega t$) and $\omega$ equals one of the $\omega_n$ (with a nonzero $n$-th Fourier coefficient of $F$), that mode shows the **resonance** of topic 8: its amplitude grows proportionally to $t$.`) },
        { type: 'lab', lab: 'L10', body: L(R`Laboratoriyada boshlang‘ich shaklni tanlang va torning harakatini kuzating: chegaralanmagan torda Dalamber bo‘yicha impuls ikkiga bo‘linadi, chegaralangan torda esa Furye qatorining bir nechta modasi qo‘shiladi. Qatordagi hadlar sonini o‘zgartirib ko‘ring.`, R`В лаборатории выберите начальную форму и наблюдайте движение струны: на неограниченной струне по Даламберу импульс делится надвое, на ограниченной складываются несколько мод ряда Фурье. Поменяйте число членов ряда.`, R`In the lab, choose an initial shape and watch the string: on an infinite string the pulse splits in two (d’Alembert), on a finite string several Fourier modes add up. Try changing the number of terms in the series.`) }
      ]
    },
    {
      id: 't15.3',
      title: L('Sterjendagi issiqlik: Furye usuli', 'Теплопроводность в стержне: метод Фурье', 'Heat in a rod: Fourier’s method'),
      blocks: [
        { type: 'def', title: L('Masala va uning yechimi', 'Задача и её решение', 'The problem and its solution'),
          body: L(R`$$u_t=a^2u_{xx},\quad 0<x<l,\ t>0;\qquad u(0,t)=u(l,t)=0;\qquad u(x,0)=\varphi(x).$$
$u=X(x)T(t)$ ni qo‘yamiz: $\dfrac{T'}{a^2T}=\dfrac{X''}{X}=-\lambda$. $X$ uchun xuddi tordagi masala: $\lambda_n=(n\pi/l)^2$, $X_n=\sin\frac{n\pi x}l$. Endi $T$ birinchi tartibli: $T_n'=-a^2\lambda_nT_n$, $T_n=e^{-a^2\lambda_nt}$. Natija:
$$u(x,t)=\sum_{n=1}^\infty C_n\,e^{-\left(\frac{an\pi}{l}\right)^2t}\sin\frac{n\pi x}{l},\qquad C_n=\frac2l\int_0^l\varphi(x)\sin\frac{n\pi x}{l}\,dx.$$
Agar $\varphi$ $[0,l]$ da uzluksiz, bo‘lakli silliq va $\varphi(0)=\varphi(l)=0$ bo‘lsa, bu qator klassik yechim beradi.`,
          R`$$u_t=a^2u_{xx},\quad 0<x<l,\ t>0;\qquad u(0,t)=u(l,t)=0;\qquad u(x,0)=\varphi(x).$$
Подставляем $u=X(x)T(t)$: $\dfrac{T'}{a^2T}=\dfrac{X''}{X}=-\lambda$. Для $X$ та же задача, что и для струны: $\lambda_n=(n\pi/l)^2$, $X_n=\sin\frac{n\pi x}l$. Теперь $T$ первого порядка: $T_n'=-a^2\lambda_nT_n$, $T_n=e^{-a^2\lambda_nt}$. Итог:
$$u(x,t)=\sum_{n=1}^\infty C_n\,e^{-\left(\frac{an\pi}{l}\right)^2t}\sin\frac{n\pi x}{l},\qquad C_n=\frac2l\int_0^l\varphi(x)\sin\frac{n\pi x}{l}\,dx.$$
Если $\varphi$ непрерывна на $[0,l]$, кусочно гладкая и $\varphi(0)=\varphi(l)=0$, ряд даёт классическое решение.`,
          R`$$u_t=a^2u_{xx},\quad 0<x<l,\ t>0;\qquad u(0,t)=u(l,t)=0;\qquad u(x,0)=\varphi(x).$$
Substitute $u=X(x)T(t)$: $\dfrac{T'}{a^2T}=\dfrac{X''}{X}=-\lambda$. The problem for $X$ is the same as for the string: $\lambda_n=(n\pi/l)^2$, $X_n=\sin\frac{n\pi x}l$. Now $T$ is first order: $T_n'=-a^2\lambda_nT_n$, $T_n=e^{-a^2\lambda_nt}$. Result:
$$u(x,t)=\sum_{n=1}^\infty C_n\,e^{-\left(\frac{an\pi}{l}\right)^2t}\sin\frac{n\pi x}{l},\qquad C_n=\frac2l\int_0^l\varphi(x)\sin\frac{n\pi x}{l}\,dx.$$
If $\varphi$ is continuous on $[0,l]$, piecewise smooth and $\varphi(0)=\varphi(l)=0$, the series gives a classical solution.`) },
        { type: 'example', title: L('Ikki modali boshlang‘ich harorat', 'Начальная температура из двух мод', 'An initial temperature with two modes'),
          body: L(R`$u_t=u_{xx}$, $0<x<1$; $u(0,t)=u(1,t)=0$; $u(x,0)=5\sin\pi x+2\sin3\pi x$.`, R`$u_t=u_{xx}$, $0<x<1$; $u(0,t)=u(1,t)=0$; $u(x,0)=5\sin\pi x+2\sin3\pi x$.`, R`$u_t=u_{xx}$, $0<x<1$; $u(0,t)=u(1,t)=0$; $u(x,0)=5\sin\pi x+2\sin3\pi x$.`),
          steps: [
            L(R`$l=1$, $a=1$: modalar $e^{-n^2\pi^2t}\sin n\pi x$.`, R`$l=1$, $a=1$: моды $e^{-n^2\pi^2t}\sin n\pi x$.`, R`$l=1$, $a=1$: modes $e^{-n^2\pi^2t}\sin n\pi x$.`),
            L(R`Solishtirish: $C_1=5$, $C_3=2$, qolganlari $0$.`, R`Сравнение: $C_1=5$, $C_3=2$, остальные $0$.`, R`Comparing: $C_1=5$, $C_3=2$, the rest are $0$.`),
            L(R`$u=5e^{-\pi^2t}\sin\pi x+2e^{-9\pi^2t}\sin3\pi x$.`, R`$u=5e^{-\pi^2t}\sin\pi x+2e^{-9\pi^2t}\sin3\pi x$.`, R`$u=5e^{-\pi^2t}\sin\pi x+2e^{-9\pi^2t}\sin3\pi x$.`),
            L(R`Uchinchi moda birinchisidan $9$ marta tezroq so‘nadi: tez orada profil deyarli $5e^{-\pi^2t}\sin\pi x$ bo‘ladi. Birinchi moda amplitudasi $t=\frac{\ln2}{\pi^2}\approx0{,}070$ da ikki marta kamayadi.`, R`Третья мода затухает в $9$ раз быстрее первой: вскоре профиль почти равен $5e^{-\pi^2t}\sin\pi x$. Амплитуда первой моды уменьшается вдвое при $t=\frac{\ln2}{\pi^2}\approx0{,}070$.`, R`The third mode decays $9$ times faster than the first: soon the profile is almost $5e^{-\pi^2t}\sin\pi x$. The first mode halves at $t=\frac{\ln2}{\pi^2}\approx0.070$.`)
          ],
          check: L(R`Har bir had: $u_t=-n^2\pi^2(\dots)=u_{xx}$ ✓; $x=0,1$ da $0$ ✓; $t=0$ da $5\sin\pi x+2\sin3\pi x$ ✓.`, R`Каждый член: $u_t=-n^2\pi^2(\dots)=u_{xx}$ ✓; при $x=0,1$ равен $0$ ✓; при $t=0$ $5\sin\pi x+2\sin3\pi x$ ✓.`, R`Each term: $u_t=-n^2\pi^2(\dots)=u_{xx}$ ✓; equal to $0$ at $x=0,1$ ✓; at $t=0$ it equals $5\sin\pi x+2\sin3\pi x$ ✓.`) },
        { type: 'example', title: L('Bir xil isitilgan sterjen sovuq uchlar bilan', 'Равномерно нагретый стержень с холодными концами', 'A uniformly heated rod with cold ends'),
          body: L(R`$u_t=u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=100$.`, R`$u_t=u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=100$.`, R`$u_t=u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=100$.`),
          steps: [
            L(R`$C_n=\dfrac2\pi\int_0^\pi100\sin nx\,dx=\dfrac{200}{\pi}\cdot\dfrac{1-(-1)^n}{n}$.`, R`$C_n=\dfrac2\pi\int_0^\pi100\sin nx\,dx=\dfrac{200}{\pi}\cdot\dfrac{1-(-1)^n}{n}$.`, R`$C_n=\dfrac2\pi\int_0^\pi100\sin nx\,dx=\dfrac{200}{\pi}\cdot\dfrac{1-(-1)^n}{n}$.`),
            L(R`Juft $n$ da $0$, toq $n$ da $\dfrac{400}{\pi n}$.`, R`При чётных $n$ — $0$, при нечётных $n$ — $\dfrac{400}{\pi n}$.`, R`$0$ for even $n$, $\dfrac{400}{\pi n}$ for odd $n$.`),
            L(R`$u=\dfrac{400}{\pi}\displaystyle\sum_{k=0}^\infty\frac{e^{-(2k+1)^2t}\sin(2k+1)x}{2k+1}$. $t\to\infty$ da $u\to0$ — sterjen uchlar haroratigacha soviydi.`, R`$u=\dfrac{400}{\pi}\displaystyle\sum_{k=0}^\infty\frac{e^{-(2k+1)^2t}\sin(2k+1)x}{2k+1}$. При $t\to\infty$ $u\to0$ — стержень остывает до температуры концов.`, R`$u=\dfrac{400}{\pi}\displaystyle\sum_{k=0}^\infty\frac{e^{-(2k+1)^2t}\sin(2k+1)x}{2k+1}$. As $t\to\infty$, $u\to0$: the rod cools to the temperature of its ends.`)
          ],
          check: L(R`Har bir had issiqlik tenglamasini va chegaraviy shartlarni qanoatlantiradi ✓. $t>0$ da qator tez yaqinlashadi; $t=0$ da $0<x<\pi$ nuqtalarda yig‘indi $100$ ga teng ($\frac{400}\pi\cdot\frac\pi4=100$, $x=\frac\pi2$ da Leybnits qatori).`, R`Каждый член удовлетворяет уравнению и граничным условиям ✓. При $t>0$ ряд быстро сходится; при $t=0$ в точках $0<x<\pi$ сумма равна $100$ ($\frac{400}\pi\cdot\frac\pi4=100$ при $x=\frac\pi2$, ряд Лейбница).`, R`Each term satisfies the equation and the boundary conditions ✓. For $t>0$ the series converges fast; at $t=0$ the sum equals $100$ at points $0<x<\pi$ ($\frac{400}\pi\cdot\frac\pi4=100$ at $x=\frac\pi2$, the Leibniz series).`) },
        { type: 'warn', body: L(R`Oxirgi misolda $\varphi(0)=100\ne0$ — chegaraviy shart bilan **mos kelmaydi**. Fizik jihatdan bu mumkin (issiq sterjen muzga tegizildi), ammo $t=0$ da uchlarda yechim uzilishga ega va qatorning $t=0$ dagi qisman yig‘indilari uchlar yonida “sakraydi” (Gibbs hodisasi). $t>0$ da yechim silliq.

Issiqlik va to‘lqin farqi: issiqlikda modalar $e^{-\lambda_na^2t}$ kabi **so‘nadi** (yuqori modalar tezroq), torda esa $\cos\omega_nt$, $\sin\omega_nt$ kabi **tebranadi** va so‘nmaydi.`,
          R`В последнем примере $\varphi(0)=100\ne0$ — **несогласовано** с граничным условием. Физически это возможно (горячий стержень коснулся льда), но при $t=0$ решение разрывно на концах, и частичные суммы ряда при $t=0$ «выскакивают» около концов (явление Гиббса). При $t>0$ решение гладкое.

Разница тепла и волн: в теплопроводности моды **затухают** как $e^{-\lambda_na^2t}$ (высокие быстрее), а у струны они **колеблются** как $\cos\omega_nt$, $\sin\omega_nt$ и не затухают.`,
          R`In the last example $\varphi(0)=100\ne0$, which is **incompatible** with the boundary condition. Physically it is possible (a hot rod touched to ice), but at $t=0$ the solution is discontinuous at the ends, and the partial sums at $t=0$ overshoot near the ends (the Gibbs phenomenon). For $t>0$ the solution is smooth.

Heat versus waves: heat modes **decay** like $e^{-\lambda_na^2t}$ (higher modes faster), while string modes **oscillate** like $\cos\omega_nt$, $\sin\omega_nt$ and do not decay.`) },
        { type: 'note', title: L('Issiqlik o‘tkazmaydigan uchlar (Neyman)', 'Теплоизолированные концы (Нейман)', 'Insulated ends (Neumann)'),
          body: L(R`$u_x(0,t)=u_x(l,t)=0$ bo‘lsa, $X''+\lambda X=0$, $X'(0)=X'(l)=0$ masalasi $\lambda_0=0$, $X_0=1$ va $\lambda_n=(n\pi/l)^2$, $X_n=\cos\frac{n\pi x}l$ ni beradi. Shuning uchun $u=C_0+\sum C_ne^{-(an\pi/l)^2t}\cos\frac{n\pi x}l$, va $t\to\infty$ da $u\to C_0=\frac1l\int_0^l\varphi\,dx$ — boshlang‘ich haroratning **o‘rtachasi** (issiqlik chiqib ketmaydi). Masalan, $l=\pi$, $\varphi=1+\cos2x$: $u=1+e^{-4t}\cos2x\to1$.`,
          R`При $u_x(0,t)=u_x(l,t)=0$ задача $X''+\lambda X=0$, $X'(0)=X'(l)=0$ даёт $\lambda_0=0$, $X_0=1$ и $\lambda_n=(n\pi/l)^2$, $X_n=\cos\frac{n\pi x}l$. Поэтому $u=C_0+\sum C_ne^{-(an\pi/l)^2t}\cos\frac{n\pi x}l$, и при $t\to\infty$ $u\to C_0=\frac1l\int_0^l\varphi\,dx$ — **среднее** начальной температуры (тепло не уходит). Например, $l=\pi$, $\varphi=1+\cos2x$: $u=1+e^{-4t}\cos2x\to1$.`,
          R`With $u_x(0,t)=u_x(l,t)=0$ the problem $X''+\lambda X=0$, $X'(0)=X'(l)=0$ gives $\lambda_0=0$, $X_0=1$ and $\lambda_n=(n\pi/l)^2$, $X_n=\cos\frac{n\pi x}l$. Hence $u=C_0+\sum C_ne^{-(an\pi/l)^2t}\cos\frac{n\pi x}l$, and as $t\to\infty$, $u\to C_0=\frac1l\int_0^l\varphi\,dx$, the **average** of the initial temperature (no heat escapes). For example, $l=\pi$, $\varphi=1+\cos2x$: $u=1+e^{-4t}\cos2x\to1$.`) },
        { type: 'lab', lab: 'L09', body: L(R`Laboratoriyada boshlang‘ich harorat profilini tanlang va Furye qatori bo‘yicha harorat qanday so‘nishini kuzating. Hadlar sonini $1,3,10$ qilib, $t=0$ yaqinida va kattaroq $t$ da farqni solishtiring.`, R`В лаборатории выберите начальный профиль температуры и наблюдайте затухание по ряду Фурье. Возьмите $1,3,10$ членов и сравните разницу около $t=0$ и при больших $t$.`, R`In the lab, choose an initial temperature profile and watch it decay via the Fourier series. Use $1,3,10$ terms and compare the difference near $t=0$ and for larger $t$.`) }
      ]
    }
  ],
  mistakes: [
    L(R`Dalamber formulasida $\frac1{2a}$ o‘rniga $\frac12$ yozish yoki integralni $0$ dan $t$ gacha olish.`, R`Писать в формуле Даламбера $\frac12$ вместо $\frac1{2a}$ или брать интеграл от $0$ до $t$.`, R`Writing $\frac12$ instead of $\frac1{2a}$ in d’Alembert’s formula, or integrating from $0$ to $t$.`),
    L(R`Xos qiymatlar masalasida $\lambda\le0$ holni tekshirmaslik yoki $n=0$ ni qo‘shish: Dirixle shartlarida $X_0=\sin0\equiv0$ — yechim emas.`, R`Не проверять случай $\lambda\le0$ в задаче на собственные значения или добавлять $n=0$: при условиях Дирихле $X_0=\sin0\equiv0$ — не собственная функция.`, R`Skipping the case $\lambda\le0$ in the eigenvalue problem or including $n=0$: with Dirichlet conditions $X_0=\sin0\equiv0$ is not an eigenfunction.`),
    L(R`$B_n$ ni $\frac2l\int\psi\sin$ deb hisoblash, $\frac{l}{an\pi}$ ko‘paytuvchini unutish: $u_t(x,0)=\sum B_n\omega_n\sin\frac{n\pi x}{l}$.`, R`Вычислять $B_n$ как $\frac2l\int\psi\sin$, забывая множитель $\frac{l}{an\pi}$: $u_t(x,0)=\sum B_n\omega_n\sin\frac{n\pi x}{l}$.`, R`Computing $B_n$ as $\frac2l\int\psi\sin$ and forgetting the factor $\frac{l}{an\pi}$: $u_t(x,0)=\sum B_n\omega_n\sin\frac{n\pi x}{l}$.`),
    L(R`Issiqlik tenglamasida eksponentani xato yozish: $e^{-(an\pi/l)^2t}$, $e^{-an\pi t/l}$ emas.`, R`Ошибаться в показателе для уравнения теплопроводности: $e^{-(an\pi/l)^2t}$, а не $e^{-an\pi t/l}$.`, R`Getting the exponent wrong in the heat equation: it is $e^{-(an\pi/l)^2t}$, not $e^{-an\pi t/l}$.`),
    L(R`Berilganlar xos funksiyalar yig‘indisi bo‘lsa ham integral hisoblash — koeffitsiyentlarni solishtirish kifoya.`, R`Вычислять интегралы, когда данные уже являются суммой собственных функций, — достаточно сравнить коэффициенты.`, R`Computing integrals when the data are already a sum of eigenfunctions; comparing coefficients is enough.`),
    L(R`Torda modalar so‘nadi deb o‘ylash: so‘nish faqat issiqlik tenglamasida (yoki ishqalanishli torda) bor.`, R`Думать, что моды струны затухают: затухание есть только в уравнении теплопроводности (или у струны с трением).`, R`Thinking that string modes decay: decay occurs only in the heat equation (or for a string with friction).`)
  ],
  exercises: [
    { id: 't15.x1', level: 'easy', type: 'formula',
      q: L(R`$u_{tt}=4u_{xx}$, $u(x,0)=x^2$, $u_t(x,0)=0$ ($-\infty<x<\infty$). $u(x,t)=\ ?$`, R`$u_{tt}=4u_{xx}$, $u(x,0)=x^2$, $u_t(x,0)=0$ ($-\infty<x<\infty$). $u(x,t)=\ ?$`, R`$u_{tt}=4u_{xx}$, $u(x,0)=x^2$, $u_t(x,0)=0$ ($-\infty<x<\infty$). $u(x,t)=\ ?$`),
      check: { kind: 'equiv', ref: 'x^2+4*t^2', vars: { x: [-2, 2], t: [0, 2] }, lhs: 'u' }, answer: 'u = x^2 + 4t^2',
      hint: L(R`$a=2$; $\frac{(x-2t)^2+(x+2t)^2}{2}$.`, R`$a=2$; $\frac{(x-2t)^2+(x+2t)^2}{2}$.`, R`$a=2$; $\frac{(x-2t)^2+(x+2t)^2}{2}$.`),
      solution: L(R`$u=\frac{(x-2t)^2+(x+2t)^2}{2}=x^2+4t^2$. Tekshiruv: $u_{tt}=8=4\cdot2$ ✓.`, R`$u=\frac{(x-2t)^2+(x+2t)^2}{2}=x^2+4t^2$. Проверка: $u_{tt}=8=4\cdot2$ ✓.`, R`$u=\frac{(x-2t)^2+(x+2t)^2}{2}=x^2+4t^2$. Check: $u_{tt}=8=4\cdot2$ ✓.`) },
    { id: 't15.x2', level: 'easy', type: 'numeric',
      q: L(R`$X''+\lambda X=0$, $X(0)=X(2)=0$ masalasining uchinchi xos qiymati $\lambda_3$ ni kiriting (3 xona aniqlikda).`, R`Введите третье собственное значение $\lambda_3$ задачи $X''+\lambda X=0$, $X(0)=X(2)=0$ (3 знака после запятой).`, R`Enter the third eigenvalue $\lambda_3$ of $X''+\lambda X=0$, $X(0)=X(2)=0$ (3 decimals).`),
      check: { kind: 'numeric', value: 22.2066, tol: 2e-3 },
      hint: L(R`$\lambda_n=(n\pi/l)^2$, $l=2$.`, R`$\lambda_n=(n\pi/l)^2$, $l=2$.`, R`$\lambda_n=(n\pi/l)^2$, $l=2$.`),
      solution: L(R`$\lambda_3=\left(\frac{3\pi}{2}\right)^2=\frac{9\pi^2}{4}\approx22{,}207$.`, R`$\lambda_3=\left(\frac{3\pi}{2}\right)^2=\frac{9\pi^2}{4}\approx22{,}207$.`, R`$\lambda_3=\left(\frac{3\pi}{2}\right)^2=\frac{9\pi^2}{4}\approx22.207$.`) },
    { id: 't15.x3', level: 'mid', type: 'formula',
      q: L(R`$u_{tt}=u_{xx}$, $u(x,0)=0$, $u_t(x,0)=\sin x$ ($-\infty<x<\infty$). $u(x,t)=\ ?$`, R`$u_{tt}=u_{xx}$, $u(x,0)=0$, $u_t(x,0)=\sin x$ ($-\infty<x<\infty$). $u(x,t)=\ ?$`, R`$u_{tt}=u_{xx}$, $u(x,0)=0$, $u_t(x,0)=\sin x$ ($-\infty<x<\infty$). $u(x,t)=\ ?$`),
      check: { kind: 'equiv', ref: 'sin(x)*sin(t)', vars: { x: [-3, 3], t: [0, 3] }, lhs: 'u' }, answer: 'u = sin(x)*sin(t)',
      hint: L(R`$\frac12\int_{x-t}^{x+t}\sin s\,ds$.`, R`$\frac12\int_{x-t}^{x+t}\sin s\,ds$.`, R`$\frac12\int_{x-t}^{x+t}\sin s\,ds$.`),
      solution: L(R`$u=\frac12\big(\cos(x-t)-\cos(x+t)\big)=\sin x\sin t$.`, R`$u=\frac12\big(\cos(x-t)-\cos(x+t)\big)=\sin x\sin t$.`, R`$u=\frac12\big(\cos(x-t)-\cos(x+t)\big)=\sin x\sin t$.`) },
    { id: 't15.x4', level: 'mid', type: 'formula',
      q: L(R`$u_t=u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=4\sin2x-\sin5x$. $u(x,t)=\ ?$`, R`$u_t=u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=4\sin2x-\sin5x$. $u(x,t)=\ ?$`, R`$u_t=u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=4\sin2x-\sin5x$. $u(x,t)=\ ?$`),
      check: { kind: 'equiv', ref: '4*exp(-4*t)*sin(2*x)-exp(-25*t)*sin(5*x)', vars: { x: [0, 3], t: [0, 0.3] }, lhs: 'u' }, answer: 'u = 4exp(-4t)sin(2x) - exp(-25t)sin(5x)',
      hint: L(R`$\sin nx$ moda $e^{-n^2t}$ kabi so‘nadi.`, R`Мода $\sin nx$ затухает как $e^{-n^2t}$.`, R`The mode $\sin nx$ decays like $e^{-n^2t}$.`),
      solution: L(R`$C_2=4$, $C_5=-1$: $u=4e^{-4t}\sin2x-e^{-25t}\sin5x$.`, R`$C_2=4$, $C_5=-1$: $u=4e^{-4t}\sin2x-e^{-25t}\sin5x$.`, R`$C_2=4$, $C_5=-1$: $u=4e^{-4t}\sin2x-e^{-25t}\sin5x$.`) },
    { id: 't15.x5', level: 'mid', type: 'numeric',
      q: L(R`Tor $0<x<\pi$, $u(x,0)=x(\pi-x)$. $A_1=\frac2\pi\int_0^\pi x(\pi-x)\sin x\,dx$ ni kiriting (3 xona).`, R`Струна $0<x<\pi$, $u(x,0)=x(\pi-x)$. Введите $A_1=\frac2\pi\int_0^\pi x(\pi-x)\sin x\,dx$ (3 знака).`, R`String $0<x<\pi$, $u(x,0)=x(\pi-x)$. Enter $A_1=\frac2\pi\int_0^\pi x(\pi-x)\sin x\,dx$ (3 decimals).`),
      check: { kind: 'numeric', value: 2.5465, tol: 2e-3 },
      hint: L(R`$\int_0^\pi x(\pi-x)\sin x\,dx=4$.`, R`$\int_0^\pi x(\pi-x)\sin x\,dx=4$.`, R`$\int_0^\pi x(\pi-x)\sin x\,dx=4$.`),
      solution: L(R`$A_1=\frac2\pi\cdot4=\frac8\pi\approx2{,}546$.`, R`$A_1=\frac2\pi\cdot4=\frac8\pi\approx2{,}546$.`, R`$A_1=\frac2\pi\cdot4=\frac8\pi\approx2.546$.`) },
    { id: 't15.x6', level: 'mid', type: 'finderror',
      q: L(R`Talaba $X''+\lambda X=0$, $X(0)=X(l)=0$ ni yechdi. Qaysi qatorda xato bor?`, R`Студент решил $X''+\lambda X=0$, $X(0)=X(l)=0$. В какой строке ошибка?`, R`A student solved $X''+\lambda X=0$, $X(0)=X(l)=0$. Which line is wrong?`),
      lines: [
        L(R`$\lambda=0$: $X=A+Bx$, shartlardan $X\equiv0$.`, R`$\lambda=0$: $X=A+Bx$, из условий $X\equiv0$.`, R`$\lambda=0$: $X=A+Bx$, the conditions give $X\equiv0$.`),
        L(R`$\lambda=-\mu^2<0$: $X=B\sinh\mu x$, bu nolmas xos funksiya.`, R`$\lambda=-\mu^2<0$: $X=B\sinh\mu x$ — ненулевая собственная функция.`, R`$\lambda=-\mu^2<0$: $X=B\sinh\mu x$ is a nonzero eigenfunction.`),
        L(R`$\lambda=\mu^2>0$: $X=B\sin\mu x$, $\sin\mu l=0$.`, R`$\lambda=\mu^2>0$: $X=B\sin\mu x$, $\sin\mu l=0$.`, R`$\lambda=\mu^2>0$: $X=B\sin\mu x$, $\sin\mu l=0$.`),
        L(R`$\lambda_n=(n\pi/l)^2$, $n=1,2,\dots$`, R`$\lambda_n=(n\pi/l)^2$, $n=1,2,\dots$`, R`$\lambda_n=(n\pi/l)^2$, $n=1,2,\dots$`)
      ],
      wrong: 1,
      explain: L(R`$X(l)=B\sinh\mu l=0$, $\sinh\mu l\ne0$, demak $B=0$: manfiy xos qiymat yo‘q.`, R`$X(l)=B\sinh\mu l=0$, $\sinh\mu l\ne0$, значит $B=0$: отрицательных собственных значений нет.`, R`$X(l)=B\sinh\mu l=0$ and $\sinh\mu l\ne0$, so $B=0$: there are no negative eigenvalues.`) },
    { id: 't15.x7', level: 'hard', type: 'formula',
      q: L(R`$u_{tt}=4u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=0$, $u_t(x,0)=\sin x$. $u(x,t)=\ ?$`, R`$u_{tt}=4u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=0$, $u_t(x,0)=\sin x$. $u(x,t)=\ ?$`, R`$u_{tt}=4u_{xx}$, $0<x<\pi$; $u(0,t)=u(\pi,t)=0$; $u(x,0)=0$, $u_t(x,0)=\sin x$. $u(x,t)=\ ?$`),
      check: { kind: 'equiv', ref: 'sin(x)*sin(2*t)/2', vars: { x: [0, 3], t: [0, 3] }, lhs: 'u' }, answer: 'u = sin(x)*sin(2t)/2',
      hint: L(R`$a=2$, $\omega_1=2$; $u_t(x,0)=\omega_1B_1\sin x$.`, R`$a=2$, $\omega_1=2$; $u_t(x,0)=\omega_1B_1\sin x$.`, R`$a=2$, $\omega_1=2$; $u_t(x,0)=\omega_1B_1\sin x$.`),
      solution: L(R`$A_n=0$; $2B_1=1\Rightarrow B_1=\frac12$. $u=\frac12\sin x\sin2t$. Tekshiruv: $u_{tt}=-2\sin x\sin2t=4u_{xx}$ ✓, $u_t(x,0)=\sin x$ ✓.`, R`$A_n=0$; $2B_1=1\Rightarrow B_1=\frac12$. $u=\frac12\sin x\sin2t$. Проверка: $u_{tt}=-2\sin x\sin2t=4u_{xx}$ ✓, $u_t(x,0)=\sin x$ ✓.`, R`$A_n=0$; $2B_1=1\Rightarrow B_1=\frac12$. $u=\frac12\sin x\sin2t$. Check: $u_{tt}=-2\sin x\sin2t=4u_{xx}$ ✓, $u_t(x,0)=\sin x$ ✓.`) },
    { id: 't15.x8', level: 'hard', type: 'numeric',
      q: L(R`Gitara tori: $l=0{,}65$ m, $T_0=73{,}5$ N, $\rho=0{,}0005$ kg/m. Asosiy chastota $f_1=\frac{a}{2l}$ ni Gs da kiriting (butungacha).`, R`Гитарная струна: $l=0{,}65$ м, $T_0=73{,}5$ Н, $\rho=0{,}0005$ кг/м. Введите основную частоту $f_1=\frac{a}{2l}$ в Гц (до целых).`, R`Guitar string: $l=0.65$ m, $T_0=73.5$ N, $\rho=0.0005$ kg/m. Enter the fundamental frequency $f_1=\frac{a}{2l}$ in Hz (to the nearest integer).`),
      check: { kind: 'numeric', value: 294.93, tol: 1 },
      hint: L(R`$a=\sqrt{T_0/\rho}$.`, R`$a=\sqrt{T_0/\rho}$.`, R`$a=\sqrt{T_0/\rho}$.`),
      solution: L(R`$a=\sqrt{147000}\approx383{,}4$ m/s, $f_1=\frac{383{,}4}{1{,}3}\approx295$ Gs (taxminan “re” notasi).`, R`$a=\sqrt{147000}\approx383{,}4$ м/с, $f_1=\frac{383{,}4}{1{,}3}\approx295$ Гц (примерно нота «ре»).`, R`$a=\sqrt{147000}\approx383.4$ m/s, $f_1=\frac{383.4}{1.3}\approx295$ Hz (roughly the note D).`) },
    { id: 't15.x9', level: 'hard', type: 'order',
      q: L(R`Furye usuli bosqichlarini to‘g‘ri tartibga qo‘ying.`, R`Расположите шаги метода Фурье в правильном порядке.`, R`Put the steps of Fourier’s method in order.`),
      items: [
        L(R`$u=X(x)T(t)$ ni tenglamaga qo‘yib, o‘zgaruvchilarni ajratish`, R`Подставить $u=X(x)T(t)$ и разделить переменные`, R`Substitute $u=X(x)T(t)$ and separate variables`),
        L(R`$X$ uchun chegaraviy masaladan $\lambda_n$, $X_n$ ni topish`, R`Найти $\lambda_n$, $X_n$ из краевой задачи для $X$`, R`Find $\lambda_n$, $X_n$ from the boundary problem for $X$`),
        L(R`Har bir $\lambda_n$ uchun $T_n(t)$ ni topish`, R`Найти $T_n(t)$ для каждого $\lambda_n$`, R`Find $T_n(t)$ for each $\lambda_n$`),
        L(R`Yechimni $\sum X_nT_n$ qator ko‘rinishida yozish`, R`Записать решение рядом $\sum X_nT_n$`, R`Write the solution as the series $\sum X_nT_n$`),
        L(R`Boshlang‘ich shartlardan koeffitsiyentlarni topish va tekshirish`, R`Найти коэффициенты из начальных условий и проверить`, R`Find the coefficients from the initial conditions and check`)
      ],
      explain: L(R`Chegaraviy shartlar $X$ ga, boshlang‘ich shartlar oxirida koeffitsiyentlarga ishlatiladi.`, R`Граничные условия используются для $X$, начальные — в конце для коэффициентов.`, R`Boundary conditions are used for $X$; initial conditions at the end for the coefficients.`) },
    { id: 't15.x10', level: 'hard', type: 'numeric',
      q: L(R`$u_{tt}=u_{xx}$, $u(x,0)=\frac1{1+x^2}$, $u_t(x,0)=0$ ($-\infty<x<\infty$). $u(3,3)$ ni kiriting (3 xona).`, R`$u_{tt}=u_{xx}$, $u(x,0)=\frac1{1+x^2}$, $u_t(x,0)=0$ ($-\infty<x<\infty$). Введите $u(3,3)$ (3 знака).`, R`$u_{tt}=u_{xx}$, $u(x,0)=\frac1{1+x^2}$, $u_t(x,0)=0$ ($-\infty<x<\infty$). Enter $u(3,3)$ (3 decimals).`),
      check: { kind: 'numeric', value: 0.51351, tol: 2e-3 },
      hint: L(R`$u=\frac12\big(\varphi(x-t)+\varphi(x+t)\big)$.`, R`$u=\frac12\big(\varphi(x-t)+\varphi(x+t)\big)$.`, R`$u=\frac12\big(\varphi(x-t)+\varphi(x+t)\big)$.`),
      solution: L(R`$u(3,3)=\frac12\big(\varphi(0)+\varphi(6)\big)=\frac12\left(1+\frac1{37}\right)=\frac{19}{37}\approx0{,}514$.`, R`$u(3,3)=\frac12\big(\varphi(0)+\varphi(6)\big)=\frac12\left(1+\frac1{37}\right)=\frac{19}{37}\approx0{,}514$.`, R`$u(3,3)=\frac12\big(\varphi(0)+\varphi(6)\big)=\frac12\left(1+\frac1{37}\right)=\frac{19}{37}\approx0.514$.`) }
  ],
  quiz: [
    { id: 't15.q1', q: L(R`Dalamber formulasida integral oldidagi ko‘paytuvchi:`, R`Множитель перед интегралом в формуле Даламбера:`, R`The factor in front of the integral in d’Alembert’s formula is:`),
      options: [L(R`$\frac1{2a}$`, R`$\frac1{2a}$`, R`$\frac1{2a}$`), L(R`$\frac12$`, R`$\frac12$`, R`$\frac12$`), L(R`$\frac1a$`, R`$\frac1a$`, R`$\frac1a$`), L(R`$2a$`, R`$2a$`, R`$2a$`)], correct: 0,
      explain: L(R`$-af'+ag'=\psi$ dan integrallashda $\frac1a$, so‘ng ikkiga bo‘lish $\frac1{2a}$ beradi.`, R`Интегрирование $-af'+ag'=\psi$ даёт $\frac1a$, деление пополам — $\frac1{2a}$.`, R`Integrating $-af'+ag'=\psi$ gives $\frac1a$, and halving gives $\frac1{2a}$.`),
      why: [null, L(R`$a$ yo‘qolgan; $a=1$ dagina to‘g‘ri.`, R`Потеряно $a$; верно лишь при $a=1$.`, R`$a$ was dropped; only right for $a=1$.`), L('Ikkiga bo‘linmagan.', 'Не поделено на два.', 'Not halved.'), L('Teskari.', 'Перевёрнуто.', 'Inverted.')] },
    { id: 't15.q2', q: L(R`$u(x_0,t_0)$ qiymati (cheksiz torda) qaysi oraliqdagi berilganlarga bog‘liq?`, R`От данных на каком отрезке зависит $u(x_0,t_0)$ (бесконечная струна)?`, R`On which interval do the data determine $u(x_0,t_0)$ (infinite string)?`),
      options: [L(R`$[x_0-at_0,\ x_0+at_0]$`, R`$[x_0-at_0,\ x_0+at_0]$`, R`$[x_0-at_0,\ x_0+at_0]$`), L(R`butun o‘q`, R`вся ось`, R`the whole line`), L(R`$[0,x_0]$`, R`$[0,x_0]$`, R`$[0,x_0]$`), L(R`faqat $x_0$ nuqta`, R`только точка $x_0$`, R`only the point $x_0$`)], correct: 0,
      explain: L(R`Formulada faqat $\varphi(x_0\pm at_0)$ va $\psi$ ning shu oraliqdagi integrali qatnashadi.`, R`В формулу входят только $\varphi(x_0\pm at_0)$ и интеграл $\psi$ по этому отрезку.`, R`The formula uses only $\varphi(x_0\pm at_0)$ and the integral of $\psi$ over that interval.`),
      why: [null, L(R`To‘lqin tezligi chekli: $a$.`, R`Скорость волн конечна: $a$.`, R`The wave speed is finite: $a$.`), L('Oraliq $x_0$ ga nisbatan simmetrik.', 'Отрезок симметричен относительно $x_0$.', 'The interval is symmetric about $x_0$.'), L(R`$t_0>0$ da boshqa nuqtalar ham ta’sir qiladi.`, R`При $t_0>0$ влияют и другие точки.`, R`For $t_0>0$ other points matter too.`)] },
    { id: 't15.q3', q: L(R`$X''+\lambda X=0$, $X(0)=X(l)=0$ xos funksiyalari:`, R`Собственные функции $X''+\lambda X=0$, $X(0)=X(l)=0$:`, R`The eigenfunctions of $X''+\lambda X=0$, $X(0)=X(l)=0$ are:`),
      options: [L(R`$\sin\frac{n\pi x}{l}$, $n\ge1$`, R`$\sin\frac{n\pi x}{l}$, $n\ge1$`, R`$\sin\frac{n\pi x}{l}$, $n\ge1$`), L(R`$\cos\frac{n\pi x}{l}$, $n\ge0$`, R`$\cos\frac{n\pi x}{l}$, $n\ge0$`, R`$\cos\frac{n\pi x}{l}$, $n\ge0$`), L(R`$e^{n x}$`, R`$e^{n x}$`, R`$e^{n x}$`), L(R`$\sin nx$, har qanday $l$ da`, R`$\sin nx$ при любом $l$`, R`$\sin nx$ for any $l$`)], correct: 0,
      explain: L(R`$X(0)=0$ kosinusni yo‘qotadi, $X(l)=0$ esa $\sin\mu l=0$ ni beradi.`, R`$X(0)=0$ исключает косинус, $X(l)=0$ даёт $\sin\mu l=0$.`, R`$X(0)=0$ removes the cosine and $X(l)=0$ gives $\sin\mu l=0$.`),
      why: [null, L('Bu Neyman shartlari uchun.', 'Это для условий Неймана.', 'That is for Neumann conditions.'), L(R`$\lambda<0$ da nolmas yechim yo‘q.`, R`При $\lambda<0$ ненулевых решений нет.`, R`There are no nonzero solutions for $\lambda<0$.`), L(R`Faqat $l=\pi$ da.`, R`Только при $l=\pi$.`, R`Only for $l=\pi$.`)] },
    { id: 't15.q4', q: L(R`Uzunligi $l$ bo‘lgan torning $n$-moda burchak chastotasi:`, R`Угловая частота $n$-й моды струны длины $l$:`, R`The angular frequency of the $n$-th mode of a string of length $l$ is:`),
      options: [L(R`$\frac{an\pi}{l}$`, R`$\frac{an\pi}{l}$`, R`$\frac{an\pi}{l}$`), L(R`$\left(\frac{an\pi}{l}\right)^2$`, R`$\left(\frac{an\pi}{l}\right)^2$`, R`$\left(\frac{an\pi}{l}\right)^2$`), L(R`$\frac{n\pi}{al}$`, R`$\frac{n\pi}{al}$`, R`$\frac{n\pi}{al}$`), L(R`$\frac{a}{2l}$`, R`$\frac{a}{2l}$`, R`$\frac{a}{2l}$`)], correct: 0,
      explain: L(R`$T''+a^2\lambda_nT=0$, $\omega_n=a\sqrt{\lambda_n}=\frac{an\pi}l$.`, R`$T''+a^2\lambda_nT=0$, $\omega_n=a\sqrt{\lambda_n}=\frac{an\pi}l$.`, R`$T''+a^2\lambda_nT=0$, $\omega_n=a\sqrt{\lambda_n}=\frac{an\pi}l$.`),
      why: [null, L('Bu $\\omega_n^2$.', 'Это $\\omega_n^2$.', 'That is $\\omega_n^2$.'), L(R`$a$ suratda bo‘lishi kerak.`, R`$a$ должно быть в числителе.`, R`$a$ belongs in the numerator.`), L(R`Bu Gs dagi $f_1$, burchak chastota emas.`, R`Это $f_1$ в герцах, а не угловая частота.`, R`That is $f_1$ in hertz, not an angular frequency.`)] },
    { id: 't15.q5', q: L(R`Issiqlik tenglamasida ($u_t=a^2u_{xx}$, uchlarida $0$) $n$-moda vaqt bo‘yicha:`, R`В уравнении теплопроводности ($u_t=a^2u_{xx}$, на концах $0$) $n$-я мода по времени:`, R`In the heat equation ($u_t=a^2u_{xx}$, $0$ at the ends) the $n$-th mode behaves in time as:`),
      options: [L(R`$e^{-(an\pi/l)^2t}$`, R`$e^{-(an\pi/l)^2t}$`, R`$e^{-(an\pi/l)^2t}$`), L(R`$\cos\frac{an\pi t}{l}$`, R`$\cos\frac{an\pi t}{l}$`, R`$\cos\frac{an\pi t}{l}$`), L(R`$e^{-an\pi t/l}$`, R`$e^{-an\pi t/l}$`, R`$e^{-an\pi t/l}$`), L(R`$e^{(an\pi/l)^2t}$`, R`$e^{(an\pi/l)^2t}$`, R`$e^{(an\pi/l)^2t}$`)], correct: 0,
      explain: L(R`$T'=-a^2\lambda_nT$, $\lambda_n=(n\pi/l)^2$.`, R`$T'=-a^2\lambda_nT$, $\lambda_n=(n\pi/l)^2$.`, R`$T'=-a^2\lambda_nT$, $\lambda_n=(n\pi/l)^2$.`),
      why: [null, L('Bu tor uchun.', 'Это для струны.', 'That is for the string.'), L('Kvadrat yo‘qolgan.', 'Потерян квадрат.', 'The square is missing.'), L('Harorat cheksiz o‘smaydi; ishora xato.', 'Температура не растёт неограниченно; знак неверен.', 'Temperature does not blow up; wrong sign.')] },
    { id: 't15.q6', q: L(R`$u_{tt}=u_{xx}$, $u(x,0)=\sin x$, $u_t(x,0)=0$ (cheksiz tor) yechimi:`, R`Решение $u_{tt}=u_{xx}$, $u(x,0)=\sin x$, $u_t(x,0)=0$ (бесконечная струна):`, R`The solution of $u_{tt}=u_{xx}$, $u(x,0)=\sin x$, $u_t(x,0)=0$ (infinite string) is:`),
      options: [L(R`$\sin x\cos t$`, R`$\sin x\cos t$`, R`$\sin x\cos t$`), L(R`$\sin x\sin t$`, R`$\sin x\sin t$`, R`$\sin x\sin t$`), L(R`$\sin(x-t)$`, R`$\sin(x-t)$`, R`$\sin(x-t)$`), L(R`$e^{-t}\sin x$`, R`$e^{-t}\sin x$`, R`$e^{-t}\sin x$`)], correct: 0,
      explain: L(R`$\frac{\sin(x-t)+\sin(x+t)}2=\sin x\cos t$.`, R`$\frac{\sin(x-t)+\sin(x+t)}2=\sin x\cos t$.`, R`$\frac{\sin(x-t)+\sin(x+t)}2=\sin x\cos t$.`),
      why: [null, L(R`$t=0$ da $0$ beradi, $\sin x$ emas.`, R`При $t=0$ даёт $0$, а не $\sin x$.`, R`At $t=0$ this gives $0$, not $\sin x$.`), L(R`$u_t(x,0)=-\cos x\ne0$.`, R`$u_t(x,0)=-\cos x\ne0$.`, R`$u_t(x,0)=-\cos x\ne0$.`), L('Bu issiqlik tenglamasining yechimi.', 'Это решение уравнения теплопроводности.', 'That solves the heat equation.')] },
    { id: 't15.q7', q: L(R`Torda $u_t(x,0)=\psi(x)$ bo‘lsa, $B_n$ koeffitsiyent:`, R`Для струны с $u_t(x,0)=\psi(x)$ коэффициент $B_n$:`, R`For a string with $u_t(x,0)=\psi(x)$, the coefficient $B_n$ is:`),
      options: [L(R`$\frac{2}{an\pi}\int_0^l\psi\sin\frac{n\pi x}l\,dx$`, R`$\frac{2}{an\pi}\int_0^l\psi\sin\frac{n\pi x}l\,dx$`, R`$\frac{2}{an\pi}\int_0^l\psi\sin\frac{n\pi x}l\,dx$`), L(R`$\frac{2}{l}\int_0^l\psi\sin\frac{n\pi x}l\,dx$`, R`$\frac{2}{l}\int_0^l\psi\sin\frac{n\pi x}l\,dx$`, R`$\frac{2}{l}\int_0^l\psi\sin\frac{n\pi x}l\,dx$`), L(R`$\frac{an\pi}{l}\int_0^l\psi\sin\frac{n\pi x}l\,dx$`, R`$\frac{an\pi}{l}\int_0^l\psi\sin\frac{n\pi x}l\,dx$`, R`$\frac{an\pi}{l}\int_0^l\psi\sin\frac{n\pi x}l\,dx$`), L(R`$\frac{1}{l}\int_0^l\psi\,dx$`, R`$\frac{1}{l}\int_0^l\psi\,dx$`, R`$\frac{1}{l}\int_0^l\psi\,dx$`)], correct: 0,
      explain: L(R`$\omega_nB_n=\frac2l\int\psi\sin$, $\omega_n=\frac{an\pi}l$.`, R`$\omega_nB_n=\frac2l\int\psi\sin$, $\omega_n=\frac{an\pi}l$.`, R`$\omega_nB_n=\frac2l\int\psi\sin$ with $\omega_n=\frac{an\pi}l$.`),
      why: [null, L(R`Bu $\omega_nB_n$; $\omega_n$ ga bo‘lish kerak.`, R`Это $\omega_nB_n$; нужно разделить на $\omega_n$.`, R`That is $\omega_nB_n$; divide by $\omega_n$.`), L(R`Ko‘paytirish emas, bo‘lish.`, R`Не умножать, а делить.`, R`Divide, do not multiply.`), L('Bu o‘rtacha qiymat, Furye koeffitsiyenti emas.', 'Это среднее, а не коэффициент Фурье.', 'That is an average, not a Fourier coefficient.')] },
    { id: 't15.q8', q: L(R`Uchlari issiqlik o‘tkazmaydigan sterjenda $t\to\infty$ da harorat:`, R`В стержне с теплоизолированными концами при $t\to\infty$ температура:`, R`In a rod with insulated ends, as $t\to\infty$ the temperature tends to:`),
      options: [L('boshlang‘ich haroratning o‘rtachasiga intiladi', 'стремится к среднему начальной температуры', 'the average of the initial temperature'), L('nolga intiladi', 'стремится к нулю', 'zero'), L('cheksiz o‘sadi', 'неограниченно растёт', 'infinity'), L('tebranishda davom etadi', 'продолжает колебаться', 'keeps oscillating')], correct: 0,
      explain: L(R`$u\to C_0=\frac1l\int_0^l\varphi\,dx$: issiqlik saqlanadi va tekis taqsimlanadi.`, R`$u\to C_0=\frac1l\int_0^l\varphi\,dx$: тепло сохраняется и выравнивается.`, R`$u\to C_0=\frac1l\int_0^l\varphi\,dx$: heat is conserved and evens out.`),
      why: [null, L('Nol — Dirixle (uchlar 0°) holida.', 'Нуль — в случае Дирихле (концы при 0°).', 'Zero is the Dirichlet case (ends at 0°).'), L('Manba yo‘q.', 'Источников нет.', 'There are no sources.'), L('Issiqlik modalari tebranmaydi, so‘nadi.', 'Тепловые моды не колеблются, а затухают.', 'Heat modes decay, they do not oscillate.')] },
    { id: 't15.q9', q: L(R`Torni ikki marta tarangroq tortsak ($T_0\to4T_0$), asosiy chastota:`, R`Если натяжение струны увеличить в 4 раза ($T_0\to4T_0$), основная частота:`, R`If the string tension is quadrupled ($T_0\to4T_0$), the fundamental frequency:`),
      options: [L('2 marta ortadi', 'увеличится в 2 раза', 'doubles'), L('4 marta ortadi', 'увеличится в 4 раза', 'quadruples'), L('o‘zgarmaydi', 'не изменится', 'does not change'), L('2 marta kamayadi', 'уменьшится в 2 раза', 'halves')], correct: 0,
      explain: L(R`$f_1=\frac1{2l}\sqrt{T_0/\rho}$, $\sqrt4=2$.`, R`$f_1=\frac1{2l}\sqrt{T_0/\rho}$, $\sqrt4=2$.`, R`$f_1=\frac1{2l}\sqrt{T_0/\rho}$, $\sqrt4=2$.`),
      why: [null, L('Ildiz unutilgan.', 'Забыт корень.', 'The square root was forgotten.'), L(R`$a$ taranglikka bog‘liq.`, R`$a$ зависит от натяжения.`, R`$a$ depends on the tension.`), L('Teskari bog‘liqlik emas.', 'Зависимость не обратная.', 'The dependence is not inverse.')] },
    { id: 't15.q10', q: L(R`Nega Furye usulida avval $X$ uchun chegaraviy masala, keyin boshlang‘ich shartlar ishlatiladi?`, R`Почему в методе Фурье сначала решают краевую задачу для $X$, а начальные условия используют потом?`, R`Why does Fourier’s method use the boundary problem for $X$ first and the initial conditions afterwards?`),
      options: [L(R`Chegaraviy shartlar bir jinsli: har bir $X_nT_n$ va ularning yig‘indisi ularni saqlaydi`, R`Граничные условия однородны: каждое $X_nT_n$ и их сумма им удовлетворяют`, R`The boundary conditions are homogeneous: each $X_nT_n$ and their sum satisfy them`), L('Boshlang‘ich shartlar muhim emas', 'Начальные условия неважны', 'The initial conditions do not matter'), L('Shunchaki an’ana', 'Просто традиция', 'Just tradition'), L(R`$T$ uchun chegaraviy shart yo‘q, shuning uchun $T$ ni topib bo‘lmaydi`, R`Для $T$ нет граничных условий, поэтому $T$ найти нельзя`, R`There are no boundary conditions for $T$, so $T$ cannot be found`)], correct: 0,
      explain: L(R`Superpozitsiya bir jinsli shartlarni buzmaydi; bir jinsli bo‘lmagan boshlang‘ich shartlar esa yig‘indi koeffitsiyentlari bilan qanoatlantiriladi.`, R`Суперпозиция не нарушает однородные условия, а неоднородные начальные условия удовлетворяются подбором коэффициентов суммы.`, R`Superposition preserves homogeneous conditions, and the nonhomogeneous initial conditions are met by choosing the coefficients of the sum.`),
      why: [null, L('Ular koeffitsiyentlarni aniqlaydi.', 'Они определяют коэффициенты.', 'They determine the coefficients.'), L('Matematik sabab bor: bir jinslilik.', 'Есть математическая причина: однородность.', 'There is a mathematical reason: homogeneity.'), L(R`$T_n$ ODT dan $\lambda_n$ bilan topiladi.`, R`$T_n$ находится из ОДУ с $\lambda_n$.`, R`$T_n$ is found from an ODE with $\lambda_n$.`)] }
  ]
});
})();
