(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't13', num: 13,
  title: L('Xususiy hosilali tenglamalar: issiqlik, to‘lqin va Laplas', 'Уравнения в частных производных: теплопроводность, волны, Лаплас', 'Partial differential equations: heat, wave and Laplace'),
  syllabus: { lecture: 'M13', seminar: 'S13', outcomes: ['TN5', 'TN6'], independent: [8, 18] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L('Xususiy hosilali tenglamaning tartibini, chiziqliligini va bir jinsliligini aniqlay olasiz.', 'Определять порядок, линейность и однородность уравнения в частных производных.', 'Determine the order, linearity and homogeneity of a partial differential equation.'),
    L('Berilgan funksiya xususiy hosilali tenglamaning yechimi ekanini tekshira olasiz.', 'Проверять, является ли данная функция решением уравнения в частных производных.', 'Check whether a given function solves a partial differential equation.'),
    L('Tor tebranishi, sterjendagi issiqlik va Laplas tenglamalarini fizik ma’nosi bilan yoza olasiz.', 'Записывать уравнения колебаний струны, теплопроводности в стержне и Лапласа, понимая их физический смысл.', 'Write down the string, heat-in-a-rod and Laplace equations and explain their physical meaning.'),
    L('Boshlang‘ich va chegaraviy shartlarni (Dirixle, Neyman, Robin) farqlay olasiz va masalaga mos shartlarni qo‘ya olasiz.', 'Различать начальные и граничные условия (Дирихле, Неймана, Робена) и ставить подходящие условия.', 'Distinguish initial and boundary conditions (Dirichlet, Neumann, Robin) and pose the right ones for a problem.'),
    L('Masalaning korrektligi (Adamar bo‘yicha) nimani anglatishini tushuntira olasiz.', 'Объяснять, что означает корректность задачи (по Адамару).', 'Explain what well-posedness (in Hadamard’s sense) means.'),
    L('Laplas tenglamasi uchun Dirixle va Neyman masalalarini qo‘ya olasiz va oddiy hollarda yecha olasiz.', 'Ставить задачи Дирихле и Неймана для уравнения Лапласа и решать их в простых случаях.', 'Pose the Dirichlet and Neumann problems for Laplace’s equation and solve them in simple cases.')
  ],
  prereqKnowledge: [
    L('Ko‘p o‘zgaruvchili funksiyaning xususiy hosilalari, ikkinchi tartibli hosilalar.', 'Частные производные функции нескольких переменных, производные второго порядка.', 'Partial derivatives of functions of several variables, second-order derivatives.'),
    L(R`Garmonik tebranish tenglamasi $mx''+kx=0$ va majburiy tebranishlar, rezonans (8-mavzu).`, R`Уравнение гармонических колебаний $mx''+kx=0$, вынужденные колебания и резонанс (тема 8).`, R`The harmonic oscillator $mx''+kx=0$, forced oscillations and resonance (topic 8).`),
    L('Oddiy differensial tenglama uchun Koshi masalasi va chegaraviy masala tushunchalari.', 'Понятия задачи Коши и краевой задачи для ОДУ.', 'The notions of a Cauchy problem and a boundary value problem for ODEs.')
  ],
  sources: [
    { id: 'kohler', ref: '9.1, 9.2, 9.7', verified: true },
    { id: 'logan', ref: '2.6', verified: true },
    { id: 'goode', ref: '8.10 (Project: stretched string)', verified: true },
    { id: 'dilmurodov', ref: '§1.1, §15.1, §16.1', verified: true },
    { id: 'zikirov', ref: 'Matematik fizika tenglamalari', verified: false },
    { id: 'sabitov', ref: 'Гл. 1', verified: false },
    { id: 'boyce', ref: 'Ch. 10', verified: false }
  ],
  labs: ['L09', 'L10'],
  lessons: [
    {
      id: 't13.1',
      title: L('Xususiy hosilali tenglama: asosiy tushunchalar', 'Уравнение в частных производных: основные понятия', 'Partial differential equations: basic notions'),
      blocks: [
        { type: 'intro', title: L('Protsessor radiatorining qovurg‘asi', 'Ребро радиатора процессора', 'A fin of a CPU heat sink'),
          body: L(R`Protsessor radiatorining ingichka metall qovurg‘asini sterjen deb olaylik. Uning harorati endi faqat vaqtga emas, balki qovurg‘a bo‘ylab nuqtaning o‘rniga ham bog‘liq: $u=u(x,t)$. Shuning uchun hosilalar ham ikkita: $u_t$ — nuqtadagi haroratning o‘zgarish tezligi, $u_{xx}$ — harorat profilining egriligi.

Tajriba: profil “botiq” bo‘lgan joyda ($u_{xx}>0$) qo‘shnilar issiqroq, shuning uchun nuqta isiydi ($u_t>0$). Eng sodda model:
$$u_t=u_{xx}.$$
Mashq: $u=e^{-t}\sin x$ ni qo‘yib ko‘ring. $u_t=-e^{-t}\sin x$, $u_{xx}=-e^{-t}\sin x$ — teng! Demak, bu funksiya modelni qanoatlantiradi: profil shaklini saqlagan holda eksponensial so‘nadi.`,
          R`Тонкое металлическое ребро радиатора процессора будем считать стержнем. Его температура зависит теперь не только от времени, но и от положения точки вдоль ребра: $u=u(x,t)$. Поэтому и производных две: $u_t$ — скорость изменения температуры в точке, $u_{xx}$ — кривизна температурного профиля.

Опыт: там, где профиль «вогнут» ($u_{xx}>0$), соседи теплее, и точка нагревается ($u_t>0$). Простейшая модель:
$$u_t=u_{xx}.$$
Упражнение: подставьте $u=e^{-t}\sin x$. $u_t=-e^{-t}\sin x$, $u_{xx}=-e^{-t}\sin x$ — равны! Значит, функция удовлетворяет модели: профиль сохраняет форму и экспоненциально затухает.`,
          R`Treat a thin metal fin of a CPU heat sink as a rod. Its temperature now depends not only on time but also on the position along the fin: $u=u(x,t)$. So there are two derivatives: $u_t$, the rate of change of temperature at a point, and $u_{xx}$, the curvature of the temperature profile.

Experience: where the profile is “cupped up” ($u_{xx}>0$) the neighbours are warmer, so the point heats up ($u_t>0$). The simplest model is
$$u_t=u_{xx}.$$
Exercise: substitute $u=e^{-t}\sin x$. $u_t=-e^{-t}\sin x$ and $u_{xx}=-e^{-t}\sin x$ are equal! So this function satisfies the model: the profile keeps its shape and decays exponentially.`) },
        { type: 'def', title: L('Xususiy hosilali tenglama va uning tartibi', 'Уравнение в частных производных и его порядок', 'Partial differential equation and its order'),
          body: L(R`Noma’lum $u(x,y,\dots)$ funksiya ikki yoki undan ortiq erkli o‘zgaruvchiga bog‘liq bo‘lib, tenglamada uning **xususiy hosilalari** qatnashsa, bunday tenglama **xususiy hosilali differensial tenglama** (XHDT) deyiladi. Ikki o‘zgaruvchi uchun ikkinchi tartibli umumiy ko‘rinish:
$$F\big(x,y,u,u_x,u_y,u_{xx},u_{xy},u_{yy}\big)=0.$$
Tenglamadagi eng yuqori xususiy hosilaning tartibi — **tenglamaning tartibi**. Belgilash: $u_x=\dfrac{\partial u}{\partial x}$, $u_{xy}=\dfrac{\partial^2 u}{\partial x\,\partial y}$.`,
          R`Если неизвестная функция $u(x,y,\dots)$ зависит от двух или более независимых переменных и в уравнение входят её **частные производные**, уравнение называется **уравнением в частных производных** (УЧП). Общий вид уравнения второго порядка с двумя переменными:
$$F\big(x,y,u,u_x,u_y,u_{xx},u_{xy},u_{yy}\big)=0.$$
Порядок старшей частной производной — **порядок уравнения**. Обозначения: $u_x=\dfrac{\partial u}{\partial x}$, $u_{xy}=\dfrac{\partial^2 u}{\partial x\,\partial y}$.`,
          R`If the unknown function $u(x,y,\dots)$ depends on two or more independent variables and its **partial derivatives** appear in the equation, the equation is a **partial differential equation** (PDE). The general second-order equation in two variables is
$$F\big(x,y,u,u_x,u_y,u_{xx},u_{xy},u_{yy}\big)=0.$$
The order of the highest partial derivative is the **order of the equation**. Notation: $u_x=\dfrac{\partial u}{\partial x}$, $u_{xy}=\dfrac{\partial^2 u}{\partial x\,\partial y}$.`) },
        { type: 'def', title: L('Chiziqlilik va bir jinslilik', 'Линейность и однородность', 'Linearity and homogeneity'),
          body: L(R`- Tenglama **chiziqli**, agar $u$ va uning barcha hosilalari birinchi darajada qatnashsa va ular bir-biriga ko‘paytirilmasa; koeffitsiyentlar faqat erkli o‘zgaruvchilarga bog‘liq:
$$a\,u_{xx}+2b\,u_{xy}+c\,u_{yy}+d\,u_x+e\,u_y+g\,u=f(x,y).$$
- Chiziqli tenglama **bir jinsli**, agar $f\equiv0$. Bir jinsli chiziqli tenglama uchun **superpozitsiya prinsipi** o‘rinli: $u_1,u_2$ yechim bo‘lsa, $C_1u_1+C_2u_2$ ham yechim.
- Agar eng yuqori hosilalar chiziqli, ammo koeffitsiyentlar $u$ yoki uning quyi hosilalariga bog‘liq bo‘lsa — **kvazichiziqli** (masalan, $u_t+u\,u_x=0$).`,
          R`- Уравнение **линейно**, если $u$ и все его производные входят в первой степени и не перемножаются; коэффициенты зависят только от независимых переменных:
$$a\,u_{xx}+2b\,u_{xy}+c\,u_{yy}+d\,u_x+e\,u_y+g\,u=f(x,y).$$
- Линейное уравнение **однородно**, если $f\equiv0$. Для однородного линейного уравнения справедлив **принцип суперпозиции**: если $u_1,u_2$ — решения, то и $C_1u_1+C_2u_2$ — решение.
- Если старшие производные входят линейно, но коэффициенты зависят от $u$ или её младших производных, уравнение **квазилинейное** (например, $u_t+u\,u_x=0$).`,
          R`- An equation is **linear** if $u$ and all its derivatives appear to the first power and are not multiplied together; the coefficients depend only on the independent variables:
$$a\,u_{xx}+2b\,u_{xy}+c\,u_{yy}+d\,u_x+e\,u_y+g\,u=f(x,y).$$
- A linear equation is **homogeneous** if $f\equiv0$. For a homogeneous linear equation the **superposition principle** holds: if $u_1,u_2$ are solutions, so is $C_1u_1+C_2u_2$.
- If the highest derivatives appear linearly but the coefficients depend on $u$ or its lower derivatives, the equation is **quasilinear** (for example $u_t+u\,u_x=0$).`) },
        { type: 'example', title: L('Tenglamalarni tasniflash', 'Классификация уравнений', 'Classifying equations'),
          body: L(R`Har bir tenglamaning tartibini, chiziqliligini va bir jinsliligini aniqlang.`, R`Определите порядок, линейность и однородность каждого уравнения.`, R`Find the order, linearity and homogeneity of each equation.`),
          steps: [
            L(R`$u_{tt}=4u_{xx}$: **2-tartibli, chiziqli, bir jinsli** (to‘lqin tenglamasi).`, R`$u_{tt}=4u_{xx}$: **2-го порядка, линейное, однородное** (волновое уравнение).`, R`$u_{tt}=4u_{xx}$: **second order, linear, homogeneous** (the wave equation).`),
            L(R`$u_{xx}+u_{yy}=x^2+y^2$: **2-tartibli, chiziqli, bir jinsli emas** (Puasson tenglamasi). O‘ng tomon noma’lumga bog‘liq emas, shuning uchun chiziqlilik buzilmaydi.`, R`$u_{xx}+u_{yy}=x^2+y^2$: **2-го порядка, линейное, неоднородное** (уравнение Пуассона). Правая часть не зависит от неизвестной, поэтому линейность не нарушается.`, R`$u_{xx}+u_{yy}=x^2+y^2$: **second order, linear, nonhomogeneous** (Poisson’s equation). The right side does not involve the unknown, so linearity is not affected.`),
            L(R`$u_t+u\,u_x=0$: **1-tartibli, chiziqli emas** ($u\,u_x$ — noma’lum va uning hosilasi ko‘paytmasi); bu kvazichiziqli Byurgers tenglamasi.`, R`$u_t+u\,u_x=0$: **1-го порядка, нелинейное** ($u\,u_x$ — произведение неизвестной и её производной); это квазилинейное уравнение Бюргерса.`, R`$u_t+u\,u_x=0$: **first order, nonlinear** ($u\,u_x$ is a product of the unknown and its derivative); it is the quasilinear Burgers equation.`),
            L(R`$x\,u_{xy}+e^y u=0$: **2-tartibli, chiziqli, bir jinsli** — koeffitsiyentlar $x$, $e^y$ faqat erkli o‘zgaruvchilarga bog‘liq.`, R`$x\,u_{xy}+e^y u=0$: **2-го порядка, линейное, однородное** — коэффициенты $x$, $e^y$ зависят только от независимых переменных.`, R`$x\,u_{xy}+e^y u=0$: **second order, linear, homogeneous**; the coefficients $x$, $e^y$ depend only on the independent variables.`)
          ] },
        { type: 'def', title: L('Yechim', 'Решение', 'Solution'),
          body: L(R`$D$ sohada aniqlangan va tenglamadagi barcha hosilalari $D$ da uzluksiz bo‘lgan $u$ funksiya **klassik yechim** deyiladi, agar uni qo‘yganda $D$ ning har bir nuqtasida ayniyat hosil bo‘lsa.

Muhim farq: ODT ning umumiy yechimi ixtiyoriy **o‘zgarmaslarga** bog‘liq, XHDT ning umumiy yechimi esa ixtiyoriy **funksiyalarga** bog‘liq bo‘lishi mumkin.`,
          R`Функция $u$, определённая в области $D$ и имеющая в $D$ непрерывные производные, входящие в уравнение, называется **классическим решением**, если после подстановки получается тождество в каждой точке $D$.

Важное отличие: общее решение ОДУ зависит от произвольных **постоянных**, а общее решение УЧП может зависеть от произвольных **функций**.`,
          R`A function $u$ defined on a domain $D$, whose derivatives appearing in the equation are continuous on $D$, is a **classical solution** if substituting it gives an identity at every point of $D$.

An important difference: the general solution of an ODE depends on arbitrary **constants**, while the general solution of a PDE may depend on arbitrary **functions**.`) },
        { type: 'example', title: L('Umumiy yechimda ixtiyoriy funksiyalar', 'Произвольные функции в общем решении', 'Arbitrary functions in the general solution'),
          body: L(R`$u_{xy}=0$ va $u_{xx}=0$ tenglamalarning umumiy yechimini toping ($u=u(x,y)$).`, R`Найдите общее решение уравнений $u_{xy}=0$ и $u_{xx}=0$ ($u=u(x,y)$).`, R`Find the general solutions of $u_{xy}=0$ and $u_{xx}=0$ ($u=u(x,y)$).`),
          steps: [
            L(R`$u_{xy}=(u_x)_y=0$: $u_x$ $y$ ga bog‘liq emas, ya’ni $u_x=h(x)$ — ixtiyoriy funksiya (o‘zgarmas emas!).`, R`$u_{xy}=(u_x)_y=0$: $u_x$ не зависит от $y$, т.е. $u_x=h(x)$ — произвольная функция (а не постоянная!).`, R`$u_{xy}=(u_x)_y=0$: $u_x$ does not depend on $y$, so $u_x=h(x)$, an arbitrary function (not a constant!).`),
            L(R`$x$ bo‘yicha integrallaymiz: $u=f(x)+g(y)$, bu yerda $f'=h$, $g$ — ixtiyoriy. “Integrallash o‘zgarmasi” endi $y$ ning funksiyasi.`, R`Интегрируем по $x$: $u=f(x)+g(y)$, где $f'=h$, $g$ — произвольная. «Постоянная интегрирования» теперь функция от $y$.`, R`Integrate in $x$: $u=f(x)+g(y)$ with $f'=h$ and $g$ arbitrary. The “constant of integration” is now a function of $y$.`),
            L(R`$u_{xx}=0$: $y$ ni o‘zgarmas deb, ikki marta $x$ bo‘yicha integrallaymiz: $u_x=f(y)$, $u=x\,f(y)+g(y)$.`, R`$u_{xx}=0$: считая $y$ постоянным, дважды интегрируем по $x$: $u_x=f(y)$, $u=x\,f(y)+g(y)$.`, R`$u_{xx}=0$: treat $y$ as fixed and integrate twice in $x$: $u_x=f(y)$, $u=x\,f(y)+g(y)$.`)
          ],
          check: L(R`$u=f(x)+g(y)$: $u_x=f'(x)$, $u_{xy}=0$ ✓. $u=xf(y)+g(y)$: $u_x=f(y)$, $u_{xx}=0$ ✓.`, R`$u=f(x)+g(y)$: $u_x=f'(x)$, $u_{xy}=0$ ✓. $u=xf(y)+g(y)$: $u_x=f(y)$, $u_{xx}=0$ ✓.`, R`$u=f(x)+g(y)$: $u_x=f'(x)$, $u_{xy}=0$ ✓. $u=xf(y)+g(y)$: $u_x=f(y)$, $u_{xx}=0$ ✓.`) },
        { type: 'warn', body: L(R`“Bir jinsli” so‘zi bu yerda **o‘ng tomoni nol bo‘lgan chiziqli tenglama** ma’nosida (7–8-mavzulardagi kabi), $y'=f(y/x)$ ma’nosida emas. Bir jinsli bo‘lmagan tenglamada superpozitsiya faqat “bir jinsli yechim + xususiy yechim” ko‘rinishida ishlaydi.`,
          R`Слово «однородное» здесь означает **линейное уравнение с нулевой правой частью** (как в темах 7–8), а не уравнение вида $y'=f(y/x)$. Для неоднородного уравнения суперпозиция работает только в виде «решение однородного + частное решение».`,
          R`“Homogeneous” here means a **linear equation with zero right-hand side** (as in topics 7–8), not an equation of the form $y'=f(y/x)$. For a nonhomogeneous equation superposition only works as “homogeneous solution + particular solution”.`) }
      ]
    },
    {
      id: 't13.2',
      title: L('Matematik fizikaning asosiy tenglamalari', 'Основные уравнения математической физики', 'The main equations of mathematical physics'),
      blocks: [
        { type: 'note', title: L('Tebranishlardan torga', 'От колебаний к струне', 'From oscillators to a string'),
          body: L(R`8-mavzuda bitta yuk–prujina tizimini o‘rgandik: $m x''+kx=0$ yoki tashqi kuch bilan $m x''+kx=F_0\cos\omega t$. Elektr zanjirida xuddi shu tenglama: $L q''+q/C=E(t)$. Agar $\omega$ xususiy chastota $\sqrt{k/m}$ ga teng bo‘lsa, **rezonans** yuz beradi.

Endi torni bir-biriga prujina bilan ulangan juda ko‘p kichik yuklar zanjiri deb tasavvur qiling. Yuklar soni cheksizga intilganda $k$-yukning siljishi $x_k(t)$ uzluksiz funksiyaga $u(x,t)$ aylanadi, qo‘shnilar farqi esa $u_{xx}$ ga. Natijada ODT sistemasi o‘rniga bitta **xususiy hosilali** tenglama hosil bo‘ladi. Torning har bir tebranish shakli (moda) o‘z chastotasiga ega bo‘lgan garmonik ossillyator kabi ishlaydi — buni 15-mavzuda ko‘ramiz.`,
          R`В теме 8 мы изучили одну систему «груз–пружина»: $m x''+kx=0$ или с внешней силой $m x''+kx=F_0\cos\omega t$. В электрической цепи то же уравнение: $L q''+q/C=E(t)$. Если $\omega$ совпадает с собственной частотой $\sqrt{k/m}$, возникает **резонанс**.

Теперь представьте струну как цепочку из очень многих маленьких грузов, соединённых пружинками. Когда число грузов стремится к бесконечности, смещение $k$-го груза $x_k(t)$ превращается в непрерывную функцию $u(x,t)$, а разность соседей — в $u_{xx}$. Вместо системы ОДУ получается одно уравнение **в частных производных**. Каждая форма колебаний струны (мода) ведёт себя как гармонический осциллятор со своей частотой — это мы увидим в теме 15.`,
          R`In topic 8 we studied one mass–spring system: $m x''+kx=0$, or with an external force $m x''+kx=F_0\cos\omega t$. An electric circuit gives the same equation: $L q''+q/C=E(t)$. If $\omega$ equals the natural frequency $\sqrt{k/m}$, **resonance** occurs.

Now picture a string as a chain of very many small masses joined by springs. As the number of masses tends to infinity, the displacement $x_k(t)$ of the $k$-th mass becomes a continuous function $u(x,t)$ and the difference of neighbours becomes $u_{xx}$. Instead of a system of ODEs we get a single **partial** differential equation. Each shape of vibration of the string (a mode) behaves like a harmonic oscillator with its own frequency; we will see this in topic 15.`) },
        { type: 'def', title: L('Tor tebranishi (to‘lqin) tenglamasi', 'Уравнение колебаний струны (волновое уравнение)', 'The vibrating string (wave) equation'),
          body: L(R`Taranglik kuchi $T_0$, chiziqli zichligi $\rho$ bo‘lgan torning kichik ko‘ndalang tebranishlari $u(x,t)$:
$$u_{tt}=a^2u_{xx}+f(x,t),\qquad a^2=\frac{T_0}{\rho}.$$
Bu yerda $a$ — to‘lqinning tarqalish tezligi, $f=F/\rho$ — birlik massaga ta’sir qiluvchi tashqi kuch ($f\ne0$ — **majburiy tebranishlar**). Hosil qilish g‘oyasi: torning $[x,x+\Delta x]$ bo‘lagiga Nyutonning 2-qonuni $\rho\,\Delta x\,u_{tt}\approx T_0\big(u_x(x+\Delta x,t)-u_x(x,t)\big)$; $\Delta x$ ga bo‘lib, $\Delta x\to0$.

Yo‘qotishsiz uzun elektr liniyasidagi kuchlanish ham shu tenglamaga bo‘ysunadi: $v_{tt}=\dfrac{1}{LC}v_{xx}$ ($L$, $C$ — birlik uzunlikdagi induktivlik va sig‘im).`,
          R`Малые поперечные колебания $u(x,t)$ струны с натяжением $T_0$ и линейной плотностью $\rho$:
$$u_{tt}=a^2u_{xx}+f(x,t),\qquad a^2=\frac{T_0}{\rho}.$$
Здесь $a$ — скорость распространения волны, $f=F/\rho$ — внешняя сила на единицу массы ($f\ne0$ — **вынужденные колебания**). Идея вывода: для куска струны $[x,x+\Delta x]$ второй закон Ньютона даёт $\rho\,\Delta x\,u_{tt}\approx T_0\big(u_x(x+\Delta x,t)-u_x(x,t)\big)$; делим на $\Delta x$ и переходим к пределу $\Delta x\to0$.

Напряжение в длинной линии без потерь подчиняется тому же уравнению: $v_{tt}=\dfrac{1}{LC}v_{xx}$ ($L$, $C$ — индуктивность и ёмкость на единицу длины).`,
          R`Small transverse vibrations $u(x,t)$ of a string with tension $T_0$ and linear density $\rho$ satisfy
$$u_{tt}=a^2u_{xx}+f(x,t),\qquad a^2=\frac{T_0}{\rho}.$$
Here $a$ is the wave speed and $f=F/\rho$ is the external force per unit mass ($f\ne0$ gives **forced vibrations**). Idea of the derivation: for the piece $[x,x+\Delta x]$ Newton’s second law gives $\rho\,\Delta x\,u_{tt}\approx T_0\big(u_x(x+\Delta x,t)-u_x(x,t)\big)$; divide by $\Delta x$ and let $\Delta x\to0$.

The voltage on a long lossless transmission line obeys the same equation: $v_{tt}=\dfrac{1}{LC}v_{xx}$ ($L$, $C$ are inductance and capacitance per unit length).`) },
        { type: 'def', title: L('Sterjendagi issiqlik tarqalishi tenglamasi', 'Уравнение теплопроводности в стержне', 'The heat equation in a rod'),
          body: L(R`Yon sirti issiqlik o‘tkazmaydigan ingichka bir jinsli sterjendagi harorat $u(x,t)$:
$$u_t=a^2u_{xx}+f(x,t),\qquad a^2=\frac{k}{c\rho},$$
$k$ — issiqlik o‘tkazuvchanlik, $c$ — solishtirma issiqlik sig‘imi, $\rho$ — zichlik, $f$ — ichki issiqlik manbalari. G‘oya: Furye qonuni bo‘yicha issiqlik oqimi $q=-k\,u_x$ (issiqlik issiqdan sovuqqa oqadi), bo‘lakdagi energiya balansi $c\rho\,u_t=-q_x$.

Bu tenglama faqat issiqlik uchun emas: diffuziya (kontsentratsiya), g‘ovak muhitdagi bosim va hatto tasvirni silliqlash (blur) algoritmlari ham shu ko‘rinishda.`,
          R`Температура $u(x,t)$ в тонком однородном стержне с теплоизолированной боковой поверхностью:
$$u_t=a^2u_{xx}+f(x,t),\qquad a^2=\frac{k}{c\rho},$$
$k$ — теплопроводность, $c$ — удельная теплоёмкость, $\rho$ — плотность, $f$ — внутренние источники тепла. Идея: по закону Фурье поток тепла $q=-k\,u_x$ (тепло идёт от горячего к холодному), баланс энергии в куске $c\rho\,u_t=-q_x$.

Это уравнение описывает не только тепло: диффузию (концентрацию), давление в пористой среде и даже алгоритмы сглаживания (размытия) изображений.`,
          R`The temperature $u(x,t)$ in a thin homogeneous rod with insulated lateral surface satisfies
$$u_t=a^2u_{xx}+f(x,t),\qquad a^2=\frac{k}{c\rho},$$
where $k$ is the thermal conductivity, $c$ the specific heat, $\rho$ the density and $f$ internal heat sources. Idea: by Fourier’s law the heat flux is $q=-k\,u_x$ (heat flows from hot to cold), and the energy balance of a piece is $c\rho\,u_t=-q_x$.

The equation is not only about heat: diffusion (concentration), pressure in porous media and even image blurring algorithms have the same form.`) },
        { type: 'def', title: L('Laplas va Puasson tenglamalari', 'Уравнения Лапласа и Пуассона', 'Laplace’s and Poisson’s equations'),
          body: L(R`Agar jarayon **statsionar** bo‘lsa (vaqt bo‘yicha o‘zgarmasa, $u_t=0$), tekislikdagi issiqlik tenglamasi
$$\Delta u\equiv u_{xx}+u_{yy}=0\quad\text{(Laplas)},\qquad \Delta u=-f(x,y)\quad\text{(Puasson)}$$
ko‘rinishiga keladi. Laplas tenglamasining yechimlari **garmonik funksiyalar** deyiladi. Laplas tenglamasiga keltiriladigan masalalar: statsionar harorat taqsimoti, elektrostatik potensial (zaryadsiz sohada), siqilmaydigan suyuqlikning potensial oqimi, egilgan membrananing muvozanat shakli.`,
          R`Если процесс **стационарен** (не меняется во времени, $u_t=0$), уравнение теплопроводности на плоскости принимает вид
$$\Delta u\equiv u_{xx}+u_{yy}=0\quad\text{(Лаплас)},\qquad \Delta u=-f(x,y)\quad\text{(Пуассон)}.$$
Решения уравнения Лапласа называются **гармоническими функциями**. К уравнению Лапласа приводят: стационарное распределение температуры, электростатический потенциал (в области без зарядов), потенциальное течение несжимаемой жидкости, равновесная форма натянутой мембраны.`,
          R`If the process is **steady** (does not change in time, $u_t=0$), the planar heat equation becomes
$$\Delta u\equiv u_{xx}+u_{yy}=0\quad\text{(Laplace)},\qquad \Delta u=-f(x,y)\quad\text{(Poisson)}.$$
Solutions of Laplace’s equation are called **harmonic functions**. Problems leading to Laplace’s equation: steady temperature distributions, the electrostatic potential (in a charge-free region), potential flow of an incompressible fluid, the equilibrium shape of a stretched membrane.`) },
        { type: 'example', title: L('Garmonik funksiyalarni tanish', 'Распознавание гармонических функций', 'Recognising harmonic functions'),
          body: L(R`Qaysi funksiyalar Laplas tenglamasini qanoatlantiradi: $u_1=x^2-y^2$, $u_2=x^2+y^2$, $u_3=e^x\cos y$, $u_4=\ln(x^2+y^2)$ ($(x,y)\ne(0,0)$)?`, R`Какие функции удовлетворяют уравнению Лапласа: $u_1=x^2-y^2$, $u_2=x^2+y^2$, $u_3=e^x\cos y$, $u_4=\ln(x^2+y^2)$ ($(x,y)\ne(0,0)$)?`, R`Which functions satisfy Laplace’s equation: $u_1=x^2-y^2$, $u_2=x^2+y^2$, $u_3=e^x\cos y$, $u_4=\ln(x^2+y^2)$ ($(x,y)\ne(0,0)$)?`),
          steps: [
            L(R`$u_1$: $u_{xx}=2$, $u_{yy}=-2$, $\Delta u_1=0$ — garmonik.`, R`$u_1$: $u_{xx}=2$, $u_{yy}=-2$, $\Delta u_1=0$ — гармоническая.`, R`$u_1$: $u_{xx}=2$, $u_{yy}=-2$, $\Delta u_1=0$: harmonic.`),
            L(R`$u_2$: $\Delta u_2=2+2=4\ne0$ — garmonik emas (u $\Delta u=4$ Puasson tenglamasini qanoatlantiradi).`, R`$u_2$: $\Delta u_2=2+2=4\ne0$ — не гармоническая (она удовлетворяет уравнению Пуассона $\Delta u=4$).`, R`$u_2$: $\Delta u_2=2+2=4\ne0$: not harmonic (it satisfies the Poisson equation $\Delta u=4$).`),
            L(R`$u_3$: $u_{xx}=e^x\cos y$, $u_{yy}=-e^x\cos y$, yig‘indisi $0$ — garmonik.`, R`$u_3$: $u_{xx}=e^x\cos y$, $u_{yy}=-e^x\cos y$, сумма $0$ — гармоническая.`, R`$u_3$: $u_{xx}=e^x\cos y$, $u_{yy}=-e^x\cos y$, the sum is $0$: harmonic.`),
            L(R`$u_4$: $u_{xx}=\dfrac{2(y^2-x^2)}{(x^2+y^2)^2}$, $u_{yy}=\dfrac{2(x^2-y^2)}{(x^2+y^2)^2}$, yig‘indisi $0$ — koordinata boshidan tashqarida garmonik (nuqtaviy manba potensiali).`, R`$u_4$: $u_{xx}=\dfrac{2(y^2-x^2)}{(x^2+y^2)^2}$, $u_{yy}=\dfrac{2(x^2-y^2)}{(x^2+y^2)^2}$, сумма $0$ — гармоническая вне начала координат (потенциал точечного источника).`, R`$u_4$: $u_{xx}=\dfrac{2(y^2-x^2)}{(x^2+y^2)^2}$, $u_{yy}=\dfrac{2(x^2-y^2)}{(x^2+y^2)^2}$, the sum is $0$: harmonic away from the origin (the potential of a point source).`)
          ],
          check: L(R`Javob: $u_1,u_3,u_4$ garmonik, $u_2$ emas.`, R`Ответ: $u_1,u_3,u_4$ гармонические, $u_2$ — нет.`, R`Answer: $u_1,u_3,u_4$ are harmonic, $u_2$ is not.`) },
        { type: 'lab', lab: 'L10', body: L(R`Laboratoriyada tor tebranishini animatsiyada ko‘ring: tor shakli vaqt o‘tishi bilan qanday o‘zgaradi va $a$ tezlik ortganda tebranish qanday tezlashadi.`, R`В лаборатории посмотрите анимацию колебаний струны: как меняется её форма со временем и как ускоряются колебания при увеличении скорости $a$.`, R`In the lab, watch an animation of the vibrating string: how its shape changes in time and how the motion speeds up when the speed $a$ increases.`) }
      ]
    },
    {
      id: 't13.3',
      title: L('Boshlang‘ich va chegaraviy shartlar. Korrektlik', 'Начальные и граничные условия. Корректность', 'Initial and boundary conditions. Well-posedness'),
      blocks: [
        { type: 'def', title: L('Boshlang‘ich shartlar', 'Начальные условия', 'Initial conditions'),
          body: L(R`Boshlang‘ich shartlar $t=0$ paytdagi holatni beradi. Ularning soni tenglamadagi vaqt bo‘yicha hosilaning tartibiga teng:
- issiqlik tenglamasi ($u_t$, 1-tartib): **bitta** shart $u(x,0)=\varphi(x)$ — boshlang‘ich harorat;
- to‘lqin tenglamasi ($u_{tt}$, 2-tartib): **ikkita** shart $u(x,0)=\varphi(x)$ (boshlang‘ich shakl), $u_t(x,0)=\psi(x)$ (boshlang‘ich tezlik);
- Laplas tenglamasida vaqt yo‘q — boshlang‘ich shart qo‘yilmaydi, faqat chegaraviy shartlar.`,
          R`Начальные условия задают состояние в момент $t=0$. Их число равно порядку производной по времени:
- уравнение теплопроводности ($u_t$, 1-й порядок): **одно** условие $u(x,0)=\varphi(x)$ — начальная температура;
- волновое уравнение ($u_{tt}$, 2-й порядок): **два** условия $u(x,0)=\varphi(x)$ (начальная форма), $u_t(x,0)=\psi(x)$ (начальная скорость);
- в уравнении Лапласа времени нет — начальные условия не ставятся, только граничные.`,
          R`Initial conditions describe the state at $t=0$. Their number equals the order of the time derivative:
- heat equation ($u_t$, first order): **one** condition $u(x,0)=\varphi(x)$, the initial temperature;
- wave equation ($u_{tt}$, second order): **two** conditions $u(x,0)=\varphi(x)$ (initial shape) and $u_t(x,0)=\psi(x)$ (initial velocity);
- Laplace’s equation has no time: no initial conditions, only boundary conditions.`) },
        { type: 'def', title: L('Chegaraviy shartlarning uch turi', 'Три типа граничных условий', 'Three types of boundary conditions'),
          body: L(R`$[0,l]$ sterjen (yoki tor) uchun $x=l$ uchida:
- **1-tur (Dirixle):** $u(l,t)=\mu(t)$ — uchidagi harorat (siljish) berilgan. Masalan, mahkamlangan tor uchi: $u(l,t)=0$.
- **2-tur (Neyman):** $u_x(l,t)=\nu(t)$ — oqim (kuch) berilgan. Issiqlik o‘tkazmaydigan uch yoki torning erkin uchi: $u_x(l,t)=0$.
- **3-tur (Robin):** $u_x(l,t)+h\,u(l,t)=\theta(t)$, $h>0$ — uch atrof-muhit bilan Nyuton qonuni bo‘yicha issiqlik almashadi: $-k\,u_x=H\,(u-u_{\text{muhit}})$.

Chap uchda ($x=0$) tashqi normal teskari yo‘nalgan, shuning uchun Robin sharti $-u_x(0,t)+h\,u(0,t)=\theta(t)$ ko‘rinishda yoziladi.`,
          R`Для стержня (или струны) $[0,l]$ на конце $x=l$:
- **1-го рода (Дирихле):** $u(l,t)=\mu(t)$ — задана температура (смещение) конца. Например, закреплённый конец струны: $u(l,t)=0$.
- **2-го рода (Неймана):** $u_x(l,t)=\nu(t)$ — задан поток (сила). Теплоизолированный конец или свободный конец струны: $u_x(l,t)=0$.
- **3-го рода (Робена):** $u_x(l,t)+h\,u(l,t)=\theta(t)$, $h>0$ — конец обменивается теплом со средой по закону Ньютона: $-k\,u_x=H\,(u-u_{\text{среды}})$.

На левом конце ($x=0$) внешняя нормаль направлена в другую сторону, поэтому условие Робена записывается как $-u_x(0,t)+h\,u(0,t)=\theta(t)$.`,
          R`For a rod (or string) $[0,l]$, at the end $x=l$:
- **First kind (Dirichlet):** $u(l,t)=\mu(t)$, the temperature (displacement) of the end is given. Example: a fixed string end, $u(l,t)=0$.
- **Second kind (Neumann):** $u_x(l,t)=\nu(t)$, the flux (force) is given. An insulated end or a free string end: $u_x(l,t)=0$.
- **Third kind (Robin):** $u_x(l,t)+h\,u(l,t)=\theta(t)$, $h>0$: the end exchanges heat with the surroundings by Newton’s law, $-k\,u_x=H\,(u-u_{\text{env}})$.

At the left end ($x=0$) the outward normal points the other way, so the Robin condition reads $-u_x(0,t)+h\,u(0,t)=\theta(t)$.`) },
        { type: 'example', title: L('Statsionar harorat: Dirixle va Robin', 'Стационарная температура: Дирихле и Робен', 'Steady temperature: Dirichlet and Robin'),
          body: L(R`Sterjenda statsionar holat ($u_t=0$) bo‘lsa, $u_t=a^2u_{xx}$ dan $u''(x)=0$ qoladi. a) $u(0)=20$, $u(2)=80$; b) $u(0)=100$, $u'(1)+u(1)=0$ ($[0,1]$ da) masalalarini yeching.`, R`В стационарном режиме ($u_t=0$) из $u_t=a^2u_{xx}$ остаётся $u''(x)=0$. Решите задачи: а) $u(0)=20$, $u(2)=80$; б) $u(0)=100$, $u'(1)+u(1)=0$ (на $[0,1]$).`, R`In the steady state ($u_t=0$) the equation $u_t=a^2u_{xx}$ reduces to $u''(x)=0$. Solve: a) $u(0)=20$, $u(2)=80$; b) $u(0)=100$, $u'(1)+u(1)=0$ (on $[0,1]$).`),
          steps: [
            L(R`$u''=0$ ning umumiy yechimi: $u=A+Bx$ (statsionar profil — to‘g‘ri chiziq).`, R`Общее решение $u''=0$: $u=A+Bx$ (стационарный профиль — прямая).`, R`The general solution of $u''=0$ is $u=A+Bx$ (a steady profile is a straight line).`),
            L(R`a) Dirixle: $u(0)=A=20$, $u(2)=20+2B=80\Rightarrow B=30$. $u=20+30x$; masalan, $u(0{,}5)=35$.`, R`а) Дирихле: $u(0)=A=20$, $u(2)=20+2B=80\Rightarrow B=30$. $u=20+30x$; например, $u(0{,}5)=35$.`, R`a) Dirichlet: $u(0)=A=20$, $u(2)=20+2B=80\Rightarrow B=30$. $u=20+30x$; for example $u(0.5)=35$.`),
            L(R`b) $u(0)=A=100$. Robin sharti: $u'(1)+u(1)=B+(100+B)=0\Rightarrow B=-50$.`, R`б) $u(0)=A=100$. Условие Робена: $u'(1)+u(1)=B+(100+B)=0\Rightarrow B=-50$.`, R`b) $u(0)=A=100$. Robin condition: $u'(1)+u(1)=B+(100+B)=0\Rightarrow B=-50$.`),
            L(R`$u=100-50x$: o‘ng uch $50^\circ$ gacha soviydi, chunki u atrofga ($0^\circ$) issiqlik beradi.`, R`$u=100-50x$: правый конец охлаждается до $50^\circ$, потому что отдаёт тепло среде ($0^\circ$).`, R`$u=100-50x$: the right end cools to $50^\circ$ because it gives heat to the surroundings (at $0^\circ$).`)
          ],
          check: L(R`a) $u(0)=20$, $u(2)=80$ ✓. b) $u(0)=100$; $u'(1)+u(1)=-50+50=0$ ✓; ikkalasida $u''=0$ ✓.`, R`а) $u(0)=20$, $u(2)=80$ ✓. б) $u(0)=100$; $u'(1)+u(1)=-50+50=0$ ✓; в обоих случаях $u''=0$ ✓.`, R`a) $u(0)=20$, $u(2)=80$ ✓. b) $u(0)=100$; $u'(1)+u(1)=-50+50=0$ ✓; in both cases $u''=0$ ✓.`) },
        { type: 'def', title: L('Korrekt qo‘yilgan masala (Adamar)', 'Корректно поставленная задача (Адамар)', 'Well-posed problem (Hadamard)'),
          body: L(R`Masala **korrekt qo‘yilgan** deyiladi, agar:
1. yechim **mavjud**;
2. yechim **yagona**;
3. yechim berilganlarga (boshlang‘ich va chegaraviy funksiyalarga) **uzluksiz bog‘liq** — berilganlardagi kichik xato yechimda ham kichik o‘zgarish beradi (turg‘unlik).

Uchinchi shart amaliyotda juda muhim: o‘lchovlar doim xatoli, kompyuter hisobi esa yaxlitlash bilan ishlaydi.`,
          R`Задача называется **корректно поставленной**, если:
1. решение **существует**;
2. решение **единственно**;
3. решение **непрерывно зависит** от данных (начальных и граничных функций) — малая ошибка в данных даёт малое изменение решения (устойчивость).

Третье условие очень важно на практике: измерения всегда с погрешностью, а компьютерный расчёт идёт с округлением.`,
          R`A problem is **well-posed** if:
1. a solution **exists**;
2. the solution is **unique**;
3. the solution **depends continuously** on the data (initial and boundary functions): a small error in the data gives a small change in the solution (stability).

The third condition matters a lot in practice: measurements always have errors and computers round.`) },
        { type: 'example', title: L('Adamar misoli: Laplas tenglamasi uchun Koshi masalasi korrekt emas', 'Пример Адамара: задача Коши для уравнения Лапласа некорректна', 'Hadamard’s example: the Cauchy problem for Laplace’s equation is ill-posed'),
          body: L(R`$u_{xx}+u_{yy}=0$, $y>0$; $u(x,0)=0$, $u_y(x,0)=\dfrac{\sin nx}{n}$ masalasini qarang.`, R`Рассмотрите задачу $u_{xx}+u_{yy}=0$, $y>0$; $u(x,0)=0$, $u_y(x,0)=\dfrac{\sin nx}{n}$.`, R`Consider $u_{xx}+u_{yy}=0$, $y>0$; $u(x,0)=0$, $u_y(x,0)=\dfrac{\sin nx}{n}$.`),
          steps: [
            L(R`Yechim: $u_n=\dfrac{\sinh ny\,\sin nx}{n^2}$. Tekshiruv: $u_{xx}=-\sinh ny\sin nx$, $u_{yy}=\sinh ny\sin nx$, yig‘indi $0$.`, R`Решение: $u_n=\dfrac{\sinh ny\,\sin nx}{n^2}$. Проверка: $u_{xx}=-\sinh ny\sin nx$, $u_{yy}=\sinh ny\sin nx$, сумма $0$.`, R`Solution: $u_n=\dfrac{\sinh ny\,\sin nx}{n^2}$. Check: $u_{xx}=-\sinh ny\sin nx$, $u_{yy}=\sinh ny\sin nx$, the sum is $0$.`),
            L(R`Shartlar: $u_n(x,0)=0$ ✓, $(u_n)_y(x,0)=\dfrac{n\cosh 0\,\sin nx}{n^2}=\dfrac{\sin nx}{n}$ ✓.`, R`Условия: $u_n(x,0)=0$ ✓, $(u_n)_y(x,0)=\dfrac{n\cosh 0\,\sin nx}{n^2}=\dfrac{\sin nx}{n}$ ✓.`, R`Conditions: $u_n(x,0)=0$ ✓, $(u_n)_y(x,0)=\dfrac{n\cosh 0\,\sin nx}{n^2}=\dfrac{\sin nx}{n}$ ✓.`),
            L(R`$n\to\infty$ da berilganlar $|u_y(x,0)|\le\frac1n\to0$ — nolga yaqin (nol berilganlarning yechimi $u\equiv0$).`, R`При $n\to\infty$ данные $|u_y(x,0)|\le\frac1n\to0$ — близки к нулю (при нулевых данных решение $u\equiv0$).`, R`As $n\to\infty$ the data satisfy $|u_y(x,0)|\le\frac1n\to0$, close to zero (zero data give $u\equiv0$).`),
            L(R`Lekin istalgan $y>0$ da $\dfrac{\sinh ny}{n^2}\to\infty$: yechim nol yechimdan juda uzoqlashadi. 3-shart buzildi — masala **korrekt emas**. Elliptik tenglamalarga chegaraviy, Koshi masalasi emas, mos keladi.`, R`Но при любом $y>0$ $\dfrac{\sinh ny}{n^2}\to\infty$: решение сколь угодно далеко от нулевого. Условие 3 нарушено — задача **некорректна**. Для эллиптических уравнений естественны краевые задачи, а не задача Коши.`, R`But for any $y>0$, $\dfrac{\sinh ny}{n^2}\to\infty$: the solution moves arbitrarily far from zero. Condition 3 fails, so the problem is **ill-posed**. Elliptic equations go with boundary value problems, not with Cauchy problems.`)
          ] },
        { type: 'warn', body: L(R`Boshlang‘ich shart ($t=0$ da, butun $x$ oralig‘ida) va chegaraviy shartni ($x=0$ yoki $x=l$ da, barcha $t$ uchun) aralashtirmang. Tor uchun “aralash masala”: tenglama + **2 ta** boshlang‘ich + **2 ta** chegaraviy shart; sterjen uchun: tenglama + **1 ta** boshlang‘ich + **2 ta** chegaraviy shart.`,
          R`Не путайте начальное условие (при $t=0$, на всём отрезке по $x$) и граничное условие (при $x=0$ или $x=l$, для всех $t$). «Смешанная задача» для струны: уравнение + **2** начальных + **2** граничных условия; для стержня: уравнение + **1** начальное + **2** граничных условия.`,
          R`Do not confuse an initial condition (at $t=0$, along the whole $x$-interval) with a boundary condition (at $x=0$ or $x=l$, for all $t$). The “mixed problem” for a string is: equation + **2** initial + **2** boundary conditions; for a rod: equation + **1** initial + **2** boundary conditions.`) },
        { type: 'lab', lab: 'L09', body: L(R`Laboratoriyada sterjendagi harorat profilini kuzating: uchlari $0^\circ$ da ushlab turilganda (Dirixle) va uchlari issiqlik o‘tkazmaganda (Neyman) profil qanday holatga intiladi?`, R`В лаборатории наблюдайте профиль температуры в стержне: к чему стремится профиль, когда концы держат при $0^\circ$ (Дирихле) и когда концы теплоизолированы (Нейман)?`, R`In the lab, watch the temperature profile in a rod: what does it tend to when the ends are held at $0^\circ$ (Dirichlet) and when the ends are insulated (Neumann)?`) }
      ]
    },
    {
      id: 't13.4',
      title: L('Laplas tenglamasi uchun Dirixle va Neyman masalalari', 'Задачи Дирихле и Неймана для уравнения Лапласа', 'Dirichlet and Neumann problems for Laplace’s equation'),
      blocks: [
        { type: 'def', title: L('Dirixle va Neyman masalalari', 'Задачи Дирихле и Неймана', 'The Dirichlet and Neumann problems'),
          body: L(R`$D$ — chegarasi $\Gamma$ bo‘lgan chegaralangan soha, $n$ — $\Gamma$ ga tashqi normal.
- **Dirixle masalasi:** $\Delta u=0$ ($D$ da), $u\big|_\Gamma=\varphi$ — chegarada harorat (potensial) berilgan.
- **Neyman masalasi:** $\Delta u=0$ ($D$ da), $\dfrac{\partial u}{\partial n}\Big|_\Gamma=\psi$ — chegara orqali oqim berilgan.`,
          R`$D$ — ограниченная область с границей $\Gamma$, $n$ — внешняя нормаль к $\Gamma$.
- **Задача Дирихле:** $\Delta u=0$ в $D$, $u\big|_\Gamma=\varphi$ — на границе задана температура (потенциал).
- **Задача Неймана:** $\Delta u=0$ в $D$, $\dfrac{\partial u}{\partial n}\Big|_\Gamma=\psi$ — задан поток через границу.`,
          R`Let $D$ be a bounded domain with boundary $\Gamma$, and let $n$ be the outward normal to $\Gamma$.
- **Dirichlet problem:** $\Delta u=0$ in $D$, $u\big|_\Gamma=\varphi$: the temperature (potential) on the boundary is given.
- **Neumann problem:** $\Delta u=0$ in $D$, $\dfrac{\partial u}{\partial n}\Big|_\Gamma=\psi$: the flux through the boundary is given.`) },
        { type: 'thm', title: L('Yagonalik va Neyman masalasining yechilish sharti', 'Единственность и условие разрешимости задачи Неймана', 'Uniqueness and the solvability condition for the Neumann problem'),
          conds: L(R`$D$ — silliq chegarali chegaralangan soha; $u\in C^2(D)\cap C^1(\overline D)$ — klassik yechim; $\varphi$, $\psi$ — $\Gamma$ da uzluksiz.`, R`$D$ — ограниченная область с гладкой границей; $u\in C^2(D)\cap C^1(\overline D)$ — классическое решение; $\varphi$, $\psi$ непрерывны на $\Gamma$.`, R`$D$ is a bounded domain with smooth boundary; $u\in C^2(D)\cap C^1(\overline D)$ is a classical solution; $\varphi$, $\psi$ are continuous on $\Gamma$.`),
          body: L(R`1. Dirixle masalasining yechimi **yagona**.
2. Neyman masalasi yechimga ega bo‘lishi uchun $\displaystyle\oint_\Gamma\psi\,ds=0$ bo‘lishi **zarur** (statsionar holatda kirgan va chiqqan issiqlik teng). Yechim mavjud bo‘lsa, u **o‘zgarmas qo‘shiluvchigacha** yagona: $u$ va $u+C$ ikkalasi ham yechim.`,
          R`1. Решение задачи Дирихле **единственно**.
2. Для разрешимости задачи Неймана **необходимо** $\displaystyle\oint_\Gamma\psi\,ds=0$ (в стационарном режиме приток тепла равен оттоку). Если решение существует, оно единственно **с точностью до постоянного слагаемого**: $u$ и $u+C$ — оба решения.`,
          R`1. The solution of the Dirichlet problem is **unique**.
2. For the Neumann problem to be solvable it is **necessary** that $\displaystyle\oint_\Gamma\psi\,ds=0$ (in a steady state the heat flowing in equals the heat flowing out). If a solution exists, it is unique **up to an additive constant**: $u$ and $u+C$ are both solutions.`) },
        { type: 'proof', body: L(R`Ikki yechim ayirmasi $w=u_1-u_2$ uchun $\Delta w=0$. Grin formulasidan $\displaystyle\iint_D|\nabla w|^2\,dx\,dy=\oint_\Gamma w\,\frac{\partial w}{\partial n}\,ds$. Dirixle holida $\Gamma$ da $w=0$, Neyman holida $\partial w/\partial n=0$; ikkalasida ham o‘ng tomon $0$, demak $\nabla w\equiv0$, $w\equiv$ const. Dirixle holida chegarada $w=0$, shuning uchun $w\equiv0$. Zaruriy shart esa Gauss–Ostrogradskiy formulasidan: $\oint_\Gamma \partial u/\partial n\,ds=\iint_D\Delta u\,dx\,dy=0$.`,
          R`Для разности двух решений $w=u_1-u_2$ имеем $\Delta w=0$. Из формулы Грина $\displaystyle\iint_D|\nabla w|^2\,dx\,dy=\oint_\Gamma w\,\frac{\partial w}{\partial n}\,ds$. В случае Дирихле на $\Gamma$ $w=0$, в случае Неймана $\partial w/\partial n=0$; в обоих случаях правая часть $0$, значит $\nabla w\equiv0$, $w\equiv$ const. В случае Дирихле на границе $w=0$, поэтому $w\equiv0$. Необходимое условие следует из формулы Гаусса–Остроградского: $\oint_\Gamma \partial u/\partial n\,ds=\iint_D\Delta u\,dx\,dy=0$.`,
          R`The difference of two solutions $w=u_1-u_2$ satisfies $\Delta w=0$. Green’s formula gives $\displaystyle\iint_D|\nabla w|^2\,dx\,dy=\oint_\Gamma w\,\frac{\partial w}{\partial n}\,ds$. In the Dirichlet case $w=0$ on $\Gamma$, in the Neumann case $\partial w/\partial n=0$; either way the right side is $0$, so $\nabla w\equiv0$ and $w\equiv$ const. In the Dirichlet case $w=0$ on the boundary, hence $w\equiv0$. The necessary condition follows from the divergence theorem: $\oint_\Gamma \partial u/\partial n\,ds=\iint_D\Delta u\,dx\,dy=0$.`) },
        { type: 'example', title: L('To‘g‘ri to‘rtburchakdagi Dirixle masalasi', 'Задача Дирихле в прямоугольнике', 'A Dirichlet problem in a rectangle'),
          body: L(R`$0<x<\pi$, $0<y<1$ to‘g‘ri to‘rtburchakda $\Delta u=0$; $u(0,y)=u(\pi,y)=0$, $u(x,0)=0$, $u(x,1)=\sin x$. (Uch tomoni $0^\circ$ da, yuqori tomonida harorat $\sin x$.)`, R`В прямоугольнике $0<x<\pi$, $0<y<1$: $\Delta u=0$; $u(0,y)=u(\pi,y)=0$, $u(x,0)=0$, $u(x,1)=\sin x$. (Три стороны при $0^\circ$, на верхней стороне температура $\sin x$.)`, R`In the rectangle $0<x<\pi$, $0<y<1$: $\Delta u=0$; $u(0,y)=u(\pi,y)=0$, $u(x,0)=0$, $u(x,1)=\sin x$. (Three sides at $0^\circ$, temperature $\sin x$ on the top side.)`),
          steps: [
            L(R`Yon tomonlardagi nol shartlarni $\sin x$ qanoatlantiradi, shuning uchun $u=\sin x\cdot Y(y)$ ko‘rinishida izlaymiz.`, R`Нулевым условиям на боковых сторонах удовлетворяет $\sin x$, поэтому ищем $u=\sin x\cdot Y(y)$.`, R`The zero conditions on the vertical sides are satisfied by $\sin x$, so look for $u=\sin x\cdot Y(y)$.`),
            L(R`Qo‘yamiz: $-\sin x\,Y+\sin x\,Y''=0\Rightarrow Y''=Y$, $Y=A\cosh y+B\sinh y$.`, R`Подставляем: $-\sin x\,Y+\sin x\,Y''=0\Rightarrow Y''=Y$, $Y=A\cosh y+B\sinh y$.`, R`Substitute: $-\sin x\,Y+\sin x\,Y''=0\Rightarrow Y''=Y$, $Y=A\cosh y+B\sinh y$.`),
            L(R`$Y(0)=0\Rightarrow A=0$; $Y(1)=1\Rightarrow B=\dfrac1{\sinh 1}$.`, R`$Y(0)=0\Rightarrow A=0$; $Y(1)=1\Rightarrow B=\dfrac1{\sinh 1}$.`, R`$Y(0)=0\Rightarrow A=0$; $Y(1)=1\Rightarrow B=\dfrac1{\sinh 1}$.`),
            L(R`Javob: $u=\dfrac{\sin x\,\sinh y}{\sinh 1}$. Yagonalik teoremasiga ko‘ra boshqa yechim yo‘q.`, R`Ответ: $u=\dfrac{\sin x\,\sinh y}{\sinh 1}$. По теореме единственности других решений нет.`, R`Answer: $u=\dfrac{\sin x\,\sinh y}{\sinh 1}$. By the uniqueness theorem there is no other solution.`)
          ],
          check: L(R`$u_{xx}+u_{yy}=\dfrac{(-\sin x+\sin x)\sinh y}{\sinh 1}=0$ ✓; $u(0,y)=u(\pi,y)=0$, $u(x,0)=0$, $u(x,1)=\sin x$ ✓.`, R`$u_{xx}+u_{yy}=\dfrac{(-\sin x+\sin x)\sinh y}{\sinh 1}=0$ ✓; $u(0,y)=u(\pi,y)=0$, $u(x,0)=0$, $u(x,1)=\sin x$ ✓.`, R`$u_{xx}+u_{yy}=\dfrac{(-\sin x+\sin x)\sinh y}{\sinh 1}=0$ ✓; $u(0,y)=u(\pi,y)=0$, $u(x,0)=0$, $u(x,1)=\sin x$ ✓.`) },
        { type: 'example', title: L('Bir o‘lchovli Neyman masalasi: yechim yo‘q yoki cheksiz ko‘p', 'Одномерная задача Неймана: решения нет или их бесконечно много', 'A one-dimensional Neumann problem: no solution or infinitely many'),
          body: L(R`Statsionar sterjen: $u''=0$, $0<x<1$. a) $u'(0)=0$, $u'(1)=1$; b) $u'(0)=u'(1)=0$.`, R`Стационарный стержень: $u''=0$, $0<x<1$. а) $u'(0)=0$, $u'(1)=1$; б) $u'(0)=u'(1)=0$.`, R`A steady rod: $u''=0$, $0<x<1$. a) $u'(0)=0$, $u'(1)=1$; b) $u'(0)=u'(1)=0$.`),
          steps: [
            L(R`$u=A+Bx$, $u'=B$ — butun sterjenda bir xil.`, R`$u=A+Bx$, $u'=B$ — одинакова по всему стержню.`, R`$u=A+Bx$, so $u'=B$ is the same along the whole rod.`),
            L(R`a) $B=0$ va $B=1$ bir vaqtda bo‘lmaydi — **yechim yo‘q**. Fizik ma’nosi: o‘ng uchdan issiqlik kirmoqda, chap uchdan chiqmayapti; statsionar holat bo‘lishi mumkin emas (yechilish sharti buzilgan).`, R`а) $B=0$ и $B=1$ одновременно невозможно — **решения нет**. Физически: через правый конец тепло входит, через левый не выходит; стационарного режима быть не может (нарушено условие разрешимости).`, R`a) $B=0$ and $B=1$ cannot both hold: **no solution**. Physically, heat enters through the right end and cannot leave through the left; there is no steady state (the solvability condition fails).`),
            L(R`b) $B=0$, $A$ — ixtiyoriy: $u\equiv A$. **Yechim cheksiz ko‘p** (o‘zgarmasgacha yagona). Qaysi $A$ ekanini oqimlar emas, sterjendagi umumiy issiqlik miqdori aniqlaydi.`, R`б) $B=0$, $A$ — любое: $u\equiv A$. **Решений бесконечно много** (единственность с точностью до постоянной). Какое именно $A$, определяют не потоки, а общее количество тепла в стержне.`, R`b) $B=0$ and $A$ is arbitrary: $u\equiv A$. **Infinitely many solutions** (unique up to a constant). Which $A$ is right is fixed not by fluxes but by the total heat in the rod.`)
          ],
          check: L(R`b) $u\equiv A$: $u''=0$, $u'(0)=u'(1)=0$ ✓ har qanday $A$ uchun.`, R`б) $u\equiv A$: $u''=0$, $u'(0)=u'(1)=0$ ✓ при любом $A$.`, R`b) $u\equiv A$: $u''=0$, $u'(0)=u'(1)=0$ ✓ for every $A$.`) },
        { type: 'warn', body: L(R`Neyman masalasida javob topilgach, unga ixtiyoriy o‘zgarmas qo‘shish mumkinligini unutmang va avval $\oint_\Gamma\psi\,ds=0$ shartni tekshiring. Bu shart bajarilmasa, hisoblash usuli “nimadir” chiqarsa ham, haqiqiy yechim yo‘q.`,
          R`В задаче Неймана не забывайте, что к найденному ответу можно добавить любую постоянную, и сначала проверяйте условие $\oint_\Gamma\psi\,ds=0$. Если оно не выполнено, решения нет, даже если вычислительная процедура что-то выдаёт.`,
          R`In a Neumann problem remember that any constant can be added to an answer, and check $\oint_\Gamma\psi\,ds=0$ first. If it fails there is no solution, even if a computational procedure outputs “something”.`) }
      ]
    }
  ],
  mistakes: [
    L(R`XHDT ning umumiy yechimida ixtiyoriy o‘zgarmas yozish: $u_{xy}=0$ uchun $u=f(x)+g(y)$, $u=C_1x+C_2y$ emas.`, R`Писать в общем решении УЧП произвольные постоянные: для $u_{xy}=0$ ответ $u=f(x)+g(y)$, а не $u=C_1x+C_2y$.`, R`Writing arbitrary constants in the general solution of a PDE: for $u_{xy}=0$ the answer is $u=f(x)+g(y)$, not $u=C_1x+C_2y$.`),
    L(R`To‘lqin tenglamasiga faqat bitta boshlang‘ich shart berish. $u_{tt}$ uchun shakl ham, tezlik ham kerak.`, R`Задавать для волнового уравнения только одно начальное условие. Для $u_{tt}$ нужны и форма, и скорость.`, R`Giving only one initial condition for the wave equation. With $u_{tt}$ you need both the shape and the velocity.`),
    L(R`Boshlang‘ich va chegaraviy shartlarni aralashtirish: $u(0,t)=0$ — chegaraviy (uchda), $u(x,0)=\varphi(x)$ — boshlang‘ich.`, R`Путать начальные и граничные условия: $u(0,t)=0$ — граничное (на конце), $u(x,0)=\varphi(x)$ — начальное.`, R`Confusing initial and boundary conditions: $u(0,t)=0$ is a boundary condition (at an end), $u(x,0)=\varphi(x)$ is an initial one.`),
    L(R`Issiqlik o‘tkazmaydigan uchni $u=0$ deb yozish. To‘g‘risi: oqim nol, ya’ni $u_x=0$ (Neyman).`, R`Записывать теплоизолированный конец как $u=0$. Правильно: поток равен нулю, т.е. $u_x=0$ (Нейман).`, R`Writing an insulated end as $u=0$. Correct: zero flux, i.e. $u_x=0$ (Neumann).`),
    L(R`O‘ng tomonda erkli o‘zgaruvchilarning funksiyasi bo‘lgani uchun tenglamani chiziqli emas deb hisoblash: $\Delta u=x^2+y^2$ — chiziqli (bir jinsli emas).`, R`Считать уравнение нелинейным из-за функции независимых переменных в правой части: $\Delta u=x^2+y^2$ — линейное (неоднородное).`, R`Calling an equation nonlinear because of a function of the independent variables on the right: $\Delta u=x^2+y^2$ is linear (nonhomogeneous).`),
    L(R`Neyman masalasining javobini yagona deb hisoblash: u faqat o‘zgarmas qo‘shiluvchigacha aniqlanadi.`, R`Считать ответ задачи Неймана единственным: он определён лишь с точностью до постоянной.`, R`Treating the answer of a Neumann problem as unique: it is determined only up to a constant.`)
  ],
  exercises: [
    { id: 't13.x1', level: 'easy', type: 'numeric',
      q: L(R`$u_t=u_{xxxx}+u\,u_x$ tenglamaning tartibini kiriting.`, R`Введите порядок уравнения $u_t=u_{xxxx}+u\,u_x$.`, R`Enter the order of $u_t=u_{xxxx}+u\,u_x$.`),
      check: { kind: 'numeric', value: 4, tol: 0 },
      hint: L(R`Eng yuqori xususiy hosilaga qarang.`, R`Смотрите на старшую частную производную.`, R`Look at the highest partial derivative.`),
      solution: L(R`$u_{xxxx}$ — to‘rtinchi tartibli hosila, shuning uchun tartib $4$ (tenglama chiziqli emas, $u\,u_x$ hadi tufayli).`, R`$u_{xxxx}$ — производная четвёртого порядка, поэтому порядок $4$ (уравнение нелинейное из-за $u\,u_x$).`, R`$u_{xxxx}$ is a fourth-order derivative, so the order is $4$ (the equation is nonlinear because of $u\,u_x$).`) },
    { id: 't13.x2', level: 'easy', type: 'match',
      q: L(R`Tenglamani nomi bilan moslang.`, R`Сопоставьте уравнение с его названием.`, R`Match each equation with its name.`),
      pairs: [
        { left: L(R`$u_{tt}=a^2u_{xx}$`, R`$u_{tt}=a^2u_{xx}$`, R`$u_{tt}=a^2u_{xx}$`), right: L('Tor tebranishi (to‘lqin)', 'Колебания струны (волновое)', 'Vibrating string (wave)') },
        { left: L(R`$u_t=a^2u_{xx}$`, R`$u_t=a^2u_{xx}$`, R`$u_t=a^2u_{xx}$`), right: L('Issiqlik o‘tkazuvchanlik', 'Теплопроводность', 'Heat conduction') },
        { left: L(R`$u_{xx}+u_{yy}=0$`, R`$u_{xx}+u_{yy}=0$`, R`$u_{xx}+u_{yy}=0$`), right: L('Laplas', 'Лаплас', 'Laplace') },
        { left: L(R`$u_{xx}+u_{yy}=-f(x,y)$`, R`$u_{xx}+u_{yy}=-f(x,y)$`, R`$u_{xx}+u_{yy}=-f(x,y)$`), right: L('Puasson', 'Пуассон', 'Poisson') }
      ],
      explain: L(R`Vaqt bo‘yicha ikkinchi hosila — to‘lqin, birinchi hosila — issiqlik, vaqt yo‘q — statsionar (Laplas/Puasson).`, R`Вторая производная по времени — волны, первая — теплопроводность, времени нет — стационарный случай (Лаплас/Пуассон).`, R`Second time derivative: waves; first time derivative: heat; no time: steady state (Laplace/Poisson).`) },
    { id: 't13.x3', level: 'mid', type: 'numeric',
      q: L(R`$u=e^{-kt}\sin 3x$ funksiya $u_t=2u_{xx}$ tenglamani qanoatlantirishi uchun $k$ nimaga teng bo‘lishi kerak?`, R`При каком $k$ функция $u=e^{-kt}\sin 3x$ удовлетворяет уравнению $u_t=2u_{xx}$?`, R`For which $k$ does $u=e^{-kt}\sin 3x$ satisfy $u_t=2u_{xx}$?`),
      check: { kind: 'numeric', value: 18, tol: 1e-9 },
      hint: L(R`$u_t$ va $u_{xx}$ ni hisoblab, tenglashtiring.`, R`Вычислите $u_t$ и $u_{xx}$ и приравняйте.`, R`Compute $u_t$ and $u_{xx}$ and equate.`),
      solution: L(R`$u_t=-k\,u$, $u_{xx}=-9u$. $-k\,u=2\cdot(-9u)\Rightarrow k=18$.`, R`$u_t=-k\,u$, $u_{xx}=-9u$. $-k\,u=2\cdot(-9u)\Rightarrow k=18$.`, R`$u_t=-k\,u$, $u_{xx}=-9u$. $-k\,u=2\cdot(-9u)\Rightarrow k=18$.`) },
    { id: 't13.x4', level: 'mid', type: 'formula',
      q: L(R`Sterjenda statsionar harorat: $u''(x)=0$, $u(0)=10$, $u(4)=50$. $u(x)=\ ?$`, R`Стационарная температура в стержне: $u''(x)=0$, $u(0)=10$, $u(4)=50$. $u(x)=\ ?$`, R`Steady temperature in a rod: $u''(x)=0$, $u(0)=10$, $u(4)=50$. $u(x)=\ ?$`),
      check: { kind: 'equiv', ref: '10+10*x', vars: { x: [0, 4] }, lhs: 'u' }, answer: 'u = 10 + 10x',
      hint: L(R`$u=A+Bx$; ikki shartdan $A$ va $B$ ni toping.`, R`$u=A+Bx$; найдите $A$ и $B$ из двух условий.`, R`$u=A+Bx$; find $A$ and $B$ from the two conditions.`),
      solution: L(R`$A=10$, $10+4B=50\Rightarrow B=10$. $u=10+10x$.`, R`$A=10$, $10+4B=50\Rightarrow B=10$. $u=10+10x$.`, R`$A=10$, $10+4B=50\Rightarrow B=10$. $u=10+10x$.`) },
    { id: 't13.x5', level: 'mid', type: 'mcq',
      q: L(R`$[0,l]$ sterjenning o‘ng uchi issiqlik o‘tkazmaydigan qilib o‘ralgan. Qaysi shart to‘g‘ri?`, R`Правый конец стержня $[0,l]$ теплоизолирован. Какое условие верно?`, R`The right end of the rod $[0,l]$ is insulated. Which condition is correct?`),
      options: [L(R`$u(l,t)=0$`, R`$u(l,t)=0$`, R`$u(l,t)=0$`), L(R`$u_x(l,t)=0$`, R`$u_x(l,t)=0$`, R`$u_x(l,t)=0$`), L(R`$u(x,0)=0$`, R`$u(x,0)=0$`, R`$u(x,0)=0$`), L(R`$u_t(l,t)=0$`, R`$u_t(l,t)=0$`, R`$u_t(l,t)=0$`)], correct: 1,
      explain: L(R`Issiqlik oqimi $-k\,u_x$; uch orqali oqim yo‘q, demak $u_x(l,t)=0$ — Neyman sharti.`, R`Поток тепла $-k\,u_x$; через конец потока нет, значит $u_x(l,t)=0$ — условие Неймана.`, R`The heat flux is $-k\,u_x$; no flux through the end means $u_x(l,t)=0$, a Neumann condition.`) },
    { id: 't13.x6', level: 'mid', type: 'finderror',
      q: L(R`Talaba torning aralash masalasini yozdi ($0<x<l$, $t>0$). Qaysi qatorda xato bor?`, R`Студент записал смешанную задачу для струны ($0<x<l$, $t>0$). В какой строке ошибка?`, R`A student wrote the mixed problem for a string ($0<x<l$, $t>0$). Which line contains the error?`),
      lines: [
        L(R`Tenglama: $u_{tt}=a^2u_{xx}$`, R`Уравнение: $u_{tt}=a^2u_{xx}$`, R`Equation: $u_{tt}=a^2u_{xx}$`),
        L(R`Chegaraviy shartlar: $u(0,t)=0$, $u(l,t)=0$`, R`Граничные условия: $u(0,t)=0$, $u(l,t)=0$`, R`Boundary conditions: $u(0,t)=0$, $u(l,t)=0$`),
        L(R`Boshlang‘ich shart: $u(x,0)=\varphi(x)$ — boshqa shart kerak emas`, R`Начальное условие: $u(x,0)=\varphi(x)$ — других условий не нужно`, R`Initial condition: $u(x,0)=\varphi(x)$, no other condition is needed`),
        L(R`Fizik ma’nosi: uchlari mahkamlangan tor`, R`Физический смысл: струна с закреплёнными концами`, R`Physical meaning: a string with fixed ends`)
      ],
      wrong: 2,
      explain: L(R`Tenglamada $u_{tt}$ bor, shuning uchun boshlang‘ich tezlik ham kerak: $u_t(x,0)=\psi(x)$.`, R`В уравнении есть $u_{tt}$, поэтому нужна и начальная скорость: $u_t(x,0)=\psi(x)$.`, R`The equation contains $u_{tt}$, so the initial velocity is also needed: $u_t(x,0)=\psi(x)$.`) },
    { id: 't13.x7', level: 'hard', type: 'formula',
      q: L(R`Statsionar sterjen $[0,1]$ da: $u''=0$, $u(0)=100$, $u'(1)+u(1)=0$ (o‘ng uch $0^\circ$ li muhit bilan issiqlik almashadi). $u(x)=\ ?$`, R`Стационарный стержень на $[0,1]$: $u''=0$, $u(0)=100$, $u'(1)+u(1)=0$ (правый конец обменивается теплом со средой при $0^\circ$). $u(x)=\ ?$`, R`Steady rod on $[0,1]$: $u''=0$, $u(0)=100$, $u'(1)+u(1)=0$ (the right end exchanges heat with surroundings at $0^\circ$). $u(x)=\ ?$`),
      check: { kind: 'equiv', ref: '100-50*x', vars: { x: [0, 1] }, lhs: 'u' }, answer: 'u = 100 - 50x',
      hint: L(R`$u=A+Bx$; Robin sharti: $B+(A+B)=0$.`, R`$u=A+Bx$; условие Робена: $B+(A+B)=0$.`, R`$u=A+Bx$; Robin condition: $B+(A+B)=0$.`),
      solution: L(R`$A=100$; $B+100+B=0\Rightarrow B=-50$. $u=100-50x$.`, R`$A=100$; $B+100+B=0\Rightarrow B=-50$. $u=100-50x$.`, R`$A=100$; $B+100+B=0\Rightarrow B=-50$. $u=100-50x$.`) },
    { id: 't13.x8', level: 'hard', type: 'formula',
      q: L(R`$0<x<\pi$, $0<y<2$ to‘g‘ri to‘rtburchakda $\Delta u=0$; $u(0,y)=u(\pi,y)=0$, $u(x,0)=0$, $u(x,2)=\sin x$. $u(x,y)=\ ?$`, R`В прямоугольнике $0<x<\pi$, $0<y<2$: $\Delta u=0$; $u(0,y)=u(\pi,y)=0$, $u(x,0)=0$, $u(x,2)=\sin x$. $u(x,y)=\ ?$`, R`In the rectangle $0<x<\pi$, $0<y<2$: $\Delta u=0$; $u(0,y)=u(\pi,y)=0$, $u(x,0)=0$, $u(x,2)=\sin x$. $u(x,y)=\ ?$`),
      check: { kind: 'equiv', ref: 'sin(x)*sinh(y)/sinh(2)', vars: { x: [0, 3], y: [0, 2] }, lhs: 'u' }, answer: 'u = sin(x)*sinh(y)/sinh(2)',
      hint: L(R`$u=\sin x\,Y(y)$, $Y''=Y$, $Y(0)=0$, $Y(2)=1$.`, R`$u=\sin x\,Y(y)$, $Y''=Y$, $Y(0)=0$, $Y(2)=1$.`, R`$u=\sin x\,Y(y)$, $Y''=Y$, $Y(0)=0$, $Y(2)=1$.`),
      solution: L(R`$Y=B\sinh y$, $B\sinh2=1$. $u=\dfrac{\sin x\,\sinh y}{\sinh 2}$.`, R`$Y=B\sinh y$, $B\sinh2=1$. $u=\dfrac{\sin x\,\sinh y}{\sinh 2}$.`, R`$Y=B\sinh y$, $B\sinh2=1$. $u=\dfrac{\sin x\,\sinh y}{\sinh 2}$.`) },
    { id: 't13.x9', level: 'hard', type: 'steps',
      q: L(R`Neyman masalasi: $u''=0$ ($0<x<1$), $u'(0)=0$, $u'(1)=2$. Bosqichma-bosqich tahlil qiling.`, R`Задача Неймана: $u''=0$ ($0<x<1$), $u'(0)=0$, $u'(1)=2$. Исследуйте пошагово.`, R`Neumann problem: $u''=0$ ($0<x<1$), $u'(0)=0$, $u'(1)=2$. Analyse step by step.`),
      steps: [
        { q: L(R`$u''=0$ ning umumiy yechimi?`, R`Общее решение $u''=0$?`, R`General solution of $u''=0$?`), options: [L(R`$u=A+Bx$`, R`$u=A+Bx$`, R`$u=A+Bx$`), L(R`$u=Ae^x+Be^{-x}$`, R`$u=Ae^x+Be^{-x}$`, R`$u=Ae^x+Be^{-x}$`)], correct: 0 },
        { q: L(R`Shartlardan $B$ haqida nima kelib chiqadi?`, R`Что следует из условий для $B$?`, R`What do the conditions say about $B$?`), options: [L(R`$B=0$ va $B=2$ — qarama-qarshilik`, R`$B=0$ и $B=2$ — противоречие`, R`$B=0$ and $B=2$: a contradiction`), L(R`$B=1$`, R`$B=1$`, R`$B=1$`)], correct: 0 },
        { q: L('Xulosa?', 'Вывод?', 'Conclusion?'), options: [L('Yechim yo‘q: oqimlar yig‘indisi nol emas', 'Решения нет: суммарный поток не равен нулю', 'No solution: the net flux is not zero'), L('Yechim yagona', 'Решение единственно', 'The solution is unique'), L('Yechim o‘zgarmasgacha yagona', 'Решение единственно с точностью до постоянной', 'The solution is unique up to a constant')], correct: 0 }
      ],
      explain: L(R`Bir o‘lchovda yechilish sharti: chegaradan kiruvchi oqimlar yig‘indisi $u'(1)-u'(0)=0$ bo‘lishi kerak. Bu yerda $2\ne0$, statsionar holat yo‘q.`, R`В одномерном случае условие разрешимости: суммарный поток через границу $u'(1)-u'(0)=0$. Здесь $2\ne0$, стационарного режима нет.`, R`In one dimension the solvability condition is that the net boundary flux $u'(1)-u'(0)$ be zero. Here it is $2\ne0$, so there is no steady state.`) }
  ],
  quiz: [
    { id: 't13.q1', q: L(R`Qaysi tenglama chiziqli?`, R`Какое уравнение линейное?`, R`Which equation is linear?`),
      options: [L(R`$u_t+u\,u_x=0$`, R`$u_t+u\,u_x=0$`, R`$u_t+u\,u_x=0$`), L(R`$u_{xx}+u_{yy}=\sin(xy)$`, R`$u_{xx}+u_{yy}=\sin(xy)$`, R`$u_{xx}+u_{yy}=\sin(xy)$`), L(R`$u_x^2+u_y^2=1$`, R`$u_x^2+u_y^2=1$`, R`$u_x^2+u_y^2=1$`), L(R`$u_{tt}=u_{xx}+u^3$`, R`$u_{tt}=u_{xx}+u^3$`, R`$u_{tt}=u_{xx}+u^3$`)], correct: 1,
      explain: L(R`$u$ va hosilalar birinchi darajada; $\sin(xy)$ — faqat erkli o‘zgaruvchilarga bog‘liq ozod had.`, R`$u$ и производные в первой степени; $\sin(xy)$ — свободный член, зависящий только от независимых переменных.`, R`$u$ and its derivatives appear to the first power; $\sin(xy)$ is a free term depending only on the independent variables.`),
      why: [L(R`$u\,u_x$ — ko‘paytma.`, R`$u\,u_x$ — произведение.`, R`$u\,u_x$ is a product.`), null, L(R`Hosilalar kvadratda.`, R`Производные в квадрате.`, R`The derivatives are squared.`), L(R`$u^3$ — chiziqli emas.`, R`$u^3$ — нелинейный член.`, R`$u^3$ is nonlinear.`)] },
    { id: 't13.q2', q: L(R`$u_{xy}=0$ ning umumiy yechimi:`, R`Общее решение $u_{xy}=0$:`, R`The general solution of $u_{xy}=0$ is:`),
      options: [L(R`$u=C_1x+C_2y$`, R`$u=C_1x+C_2y$`, R`$u=C_1x+C_2y$`), L(R`$u=f(x)+g(y)$`, R`$u=f(x)+g(y)$`, R`$u=f(x)+g(y)$`), L(R`$u=f(x)\,g(y)$`, R`$u=f(x)\,g(y)$`, R`$u=f(x)\,g(y)$`), L(R`$u=f(x+y)$`, R`$u=f(x+y)$`, R`$u=f(x+y)$`)], correct: 1,
      explain: L(R`$u_x=h(x)$, integrallab $u=f(x)+g(y)$ — ixtiyoriy funksiyalar.`, R`$u_x=h(x)$, интегрируя, $u=f(x)+g(y)$ — произвольные функции.`, R`$u_x=h(x)$; integrating gives $u=f(x)+g(y)$ with arbitrary functions.`),
      why: [L('Bu xususiy hol, umumiy yechim emas.', 'Это частный случай, а не общее решение.', 'This is a special case, not the general solution.'), null, L(R`Masalan $u=xy$: $u_{xy}=1\ne0$.`, R`Например, $u=xy$: $u_{xy}=1\ne0$.`, R`For example $u=xy$ gives $u_{xy}=1\ne0$.`), L(R`$u=(x+y)^2$: $u_{xy}=2\ne0$.`, R`$u=(x+y)^2$: $u_{xy}=2\ne0$.`, R`$u=(x+y)^2$ gives $u_{xy}=2\ne0$.`)] },
    { id: 't13.q3', q: L(R`To‘lqin tenglamasi $u_{tt}=a^2u_{xx}$ da $a^2$ nimaga teng ($T_0$ — taranglik, $\rho$ — chiziqli zichlik)?`, R`Чему равно $a^2$ в волновом уравнении $u_{tt}=a^2u_{xx}$ ($T_0$ — натяжение, $\rho$ — линейная плотность)?`, R`In the wave equation $u_{tt}=a^2u_{xx}$, what is $a^2$ ($T_0$ tension, $\rho$ linear density)?`),
      options: [L(R`$T_0/\rho$`, R`$T_0/\rho$`, R`$T_0/\rho$`), L(R`$\rho/T_0$`, R`$\rho/T_0$`, R`$\rho/T_0$`), L(R`$T_0\rho$`, R`$T_0\rho$`, R`$T_0\rho$`), L(R`$\sqrt{T_0/\rho}$`, R`$\sqrt{T_0/\rho}$`, R`$\sqrt{T_0/\rho}$`)], correct: 0,
      explain: L(R`$\rho\,u_{tt}=T_0\,u_{xx}$; tortilgan va yengil tor tezroq tebranadi.`, R`$\rho\,u_{tt}=T_0\,u_{xx}$; натянутая лёгкая струна колеблется быстрее.`, R`$\rho\,u_{tt}=T_0\,u_{xx}$; a tight, light string vibrates faster.`),
      why: [null, L('Teskari: og‘ir tor sekinroq.', 'Наоборот: тяжёлая струна медленнее.', 'Inverted: a heavy string is slower.'), L('O‘lchov birligi mos kelmaydi.', 'Не совпадают размерности.', 'The units do not match.'), L(R`Bu $a$, $a^2$ emas.`, R`Это $a$, а не $a^2$.`, R`That is $a$, not $a^2$.`)] },
    { id: 't13.q4', q: L('Sterjendagi issiqlik masalasi uchun nechta boshlang‘ich shart kerak?', 'Сколько начальных условий нужно для задачи теплопроводности в стержне?', 'How many initial conditions does the heat problem in a rod need?'),
      options: [L('0', '0', '0'), L('1', '1', '1'), L('2', '2', '2'), L('4', '4', '4')], correct: 1,
      explain: L(R`Vaqt bo‘yicha birinchi tartib ($u_t$): faqat $u(x,0)=\varphi(x)$.`, R`Первый порядок по времени ($u_t$): только $u(x,0)=\varphi(x)$.`, R`First order in time ($u_t$): only $u(x,0)=\varphi(x)$.`),
      why: [L('Boshlang‘ich harorat bo‘lmasa, jarayon aniqlanmaydi.', 'Без начальной температуры процесс не определён.', 'Without the initial temperature the process is undetermined.'), null, L('Ikkita — to‘lqin tenglamasi uchun.', 'Два — для волнового уравнения.', 'Two is for the wave equation.'), L('Chegaraviy shartlar bilan aralashtirildi.', 'Перепутаны с граничными условиями.', 'Confused with boundary conditions.')] },
    { id: 't13.q5', q: L(R`$u_x(0,t)-h\,u(0,t)=0$ ($h>0$) qanday shart?`, R`Каким является условие $u_x(0,t)-h\,u(0,t)=0$ ($h>0$)?`, R`What kind of condition is $u_x(0,t)-h\,u(0,t)=0$ ($h>0$)?`),
      options: [L('Dirixle', 'Дирихле', 'Dirichlet'), L('Neyman', 'Неймана', 'Neumann'), L('Robin (3-tur)', 'Робена (3-го рода)', 'Robin (third kind)'), L('Boshlang‘ich', 'Начальное', 'Initial')], correct: 2,
      explain: L(R`$u$ va $u_x$ ning chiziqli kombinatsiyasi — 3-tur shart (Nyuton bo‘yicha issiqlik almashish).`, R`Линейная комбинация $u$ и $u_x$ — условие 3-го рода (теплообмен по Ньютону).`, R`A linear combination of $u$ and $u_x$ is a third-kind condition (Newton heat exchange).`),
      why: [L(R`Dirixle faqat $u$ ni beradi.`, R`Дирихле задаёт только $u$.`, R`Dirichlet prescribes only $u$.`), L(R`Neyman faqat $u_x$ ni beradi.`, R`Нейман задаёт только $u_x$.`, R`Neumann prescribes only $u_x$.`), null, L(R`$x=0$ da (uchda) berilgan, $t=0$ da emas.`, R`Задано при $x=0$ (на конце), а не при $t=0$.`, R`It is given at $x=0$ (an end), not at $t=0$.`)] },
    { id: 't13.q6', q: L(R`Qaysi funksiya garmonik?`, R`Какая функция гармоническая?`, R`Which function is harmonic?`),
      options: [L(R`$x^2+y^2$`, R`$x^2+y^2$`, R`$x^2+y^2$`), L(R`$xy$`, R`$xy$`, R`$xy$`), L(R`$e^x\sin x$`, R`$e^x\sin x$`, R`$e^x\sin x$`), L(R`$x^3$`, R`$x^3$`, R`$x^3$`)], correct: 1,
      explain: L(R`$(xy)_{xx}=0$, $(xy)_{yy}=0$.`, R`$(xy)_{xx}=0$, $(xy)_{yy}=0$.`, R`$(xy)_{xx}=0$ and $(xy)_{yy}=0$.`),
      why: [L(R`$\Delta=4$.`, R`$\Delta=4$.`, R`$\Delta=4$.`), null, L(R`$\Delta=2e^x\cos x\ne0$.`, R`$\Delta=2e^x\cos x\ne0$.`, R`$\Delta=2e^x\cos x\ne0$.`), L(R`$\Delta=6x\ne0$.`, R`$\Delta=6x\ne0$.`, R`$\Delta=6x\ne0$.`)] },
    { id: 't13.q7', q: L('Adamar bo‘yicha korrektlikning uchinchi sharti:', 'Третье условие корректности по Адамару:', 'Hadamard’s third condition of well-posedness is:'),
      options: [L('Yechim mavjud', 'Решение существует', 'A solution exists'), L('Yechim yagona', 'Решение единственно', 'The solution is unique'), L('Yechim berilganlarga uzluksiz bog‘liq', 'Решение непрерывно зависит от данных', 'The solution depends continuously on the data'), L('Yechim analitik', 'Решение аналитично', 'The solution is analytic')], correct: 2,
      explain: L('Kichik xato — kichik o‘zgarish (turg‘unlik).', 'Малая ошибка — малое изменение (устойчивость).', 'Small error, small change (stability).'),
      why: [L('Bu birinchi shart.', 'Это первое условие.', 'That is the first condition.'), L('Bu ikkinchi shart.', 'Это второе условие.', 'That is the second condition.'), null, L('Bunday shart yo‘q.', 'Такого условия нет.', 'There is no such condition.')] },
    { id: 't13.q8', q: L(R`Neyman masalasi $\Delta u=0$, $\partial u/\partial n|_\Gamma=\psi$ yechimga ega bo‘lsa, u:`, R`Если задача Неймана $\Delta u=0$, $\partial u/\partial n|_\Gamma=\psi$ разрешима, то её решение:`, R`If the Neumann problem $\Delta u=0$, $\partial u/\partial n|_\Gamma=\psi$ is solvable, its solution is:`),
      options: [L('yagona', 'единственно', 'unique'), L('o‘zgarmas qo‘shiluvchigacha yagona', 'единственно с точностью до постоянной', 'unique up to an additive constant'), L('har doim nol', 'всегда нулевое', 'always zero'), L('cheksiz ko‘p, ixtiyoriy funksiyaga bog‘liq', 'бесконечно много, зависит от произвольной функции', 'infinitely many, depending on an arbitrary function')], correct: 1,
      explain: L(R`Faqat hosilalar berilgan; $u+C$ ham shartlarni qanoatlantiradi.`, R`Заданы только производные; $u+C$ тоже удовлетворяет условиям.`, R`Only derivatives are prescribed; $u+C$ also satisfies the conditions.`),
      why: [L(R`$u+C$ ham yechim.`, R`$u+C$ тоже решение.`, R`$u+C$ is also a solution.`), null, L(R`$\psi\ne0$ bo‘lsa, nol yechim emas.`, R`При $\psi\ne0$ нуль не решение.`, R`If $\psi\ne0$, zero is not a solution.`), L('Erkinlik faqat bitta o‘zgarmas.', 'Свобода — лишь одна постоянная.', 'The only freedom is one constant.')] },
    { id: 't13.q9', q: L(R`Laplas tenglamasi uchun Koshi masalasi (Adamar misoli) nima uchun korrekt emas?`, R`Почему задача Коши для уравнения Лапласа (пример Адамара) некорректна?`, R`Why is the Cauchy problem for Laplace’s equation (Hadamard’s example) ill-posed?`),
      options: [L('Yechim mavjud emas', 'Решение не существует', 'No solution exists'), L('Yechim yagona emas', 'Решение не единственно', 'The solution is not unique'), L('Kichik berilganlar ixtiyoriy katta yechim beradi', 'Малые данные дают сколь угодно большие решения', 'Small data give arbitrarily large solutions'), L('Tenglama chiziqli emas', 'Уравнение нелинейно', 'The equation is nonlinear')], correct: 2,
      explain: L(R`$u_y(x,0)=\frac{\sin nx}{n}\to0$, lekin $u_n=\frac{\sinh ny\sin nx}{n^2}$ istalgan $y>0$ da cheksiz o‘sadi.`, R`$u_y(x,0)=\frac{\sin nx}{n}\to0$, но $u_n=\frac{\sinh ny\sin nx}{n^2}$ неограниченно растёт при любом $y>0$.`, R`$u_y(x,0)=\frac{\sin nx}{n}\to0$, yet $u_n=\frac{\sinh ny\sin nx}{n^2}$ grows without bound for every $y>0$.`),
      why: [L(R`Yechim aniq yozilgan: $u_n$.`, R`Решение выписано явно: $u_n$.`, R`The solution is written explicitly: $u_n$.`), L('Yagonalik buzilmaydi.', 'Единственность не нарушена.', 'Uniqueness is not the issue.'), null, L('Laplas tenglamasi chiziqli.', 'Уравнение Лапласа линейно.', 'Laplace’s equation is linear.')] },
    { id: 't13.q10', q: L(R`Statsionar sterjenda ($u''=0$) $u(0)=0$, $u(5)=100$. $u(2)$ ga teng:`, R`Стационарный стержень ($u''=0$), $u(0)=0$, $u(5)=100$. $u(2)$ равно:`, R`Steady rod ($u''=0$), $u(0)=0$, $u(5)=100$. Then $u(2)$ is:`),
      options: [L('20', '20', '20'), L('40', '40', '40'), L('50', '50', '50'), L('80', '80', '80')], correct: 1,
      explain: L(R`$u=20x$, $u(2)=40$.`, R`$u=20x$, $u(2)=40$.`, R`$u=20x$, so $u(2)=40$.`),
      why: [L('Qiyalik 20, qiymat emas.', 'Наклон равен 20, это не значение.', '20 is the slope, not the value.'), null, L('Bu o‘rta nuqta $x=2{,}5$ dagi qiymat.', 'Это значение в середине $x=2{,}5$.', 'That is the value at the midpoint $x=2.5$.'), L('Uchlar almashtirildi.', 'Перепутаны концы.', 'The ends were swapped.')] }
  ]
});
})();
