(function () {
const L = DT.L, R = DT.R;
/* Tables are written once with decimal points; uz/ru get decimal commas. */
const cm = s => s.replace(/(\d)\.(\d)/g, '$1{,}$2');
const TAB_EULER = R`\begin{array}{c|c|c|c}
x_n & y_n & y(x_n) & y(x_n)-y_n\\ \hline
0 & 1 & 1 & 0\\
0.1 & 1.1 & 1.110342 & 0.010342\\
0.2 & 1.22 & 1.242806 & 0.022806\\
0.3 & 1.362 & 1.399718 & 0.037718\\
0.4 & 1.5282 & 1.583649 & 0.055449\\
0.5 & 1.72102 & 1.797443 & 0.076423
\end{array}`;
const TAB_CMP = R`\begin{array}{c|c|c|c}
x_n & e_n\ (\text{E}) & e_n\ (\text{H}) & e_n\ (\text{RK4})\\ \hline
0.1 & 1.03\cdot10^{-2} & 3.42\cdot10^{-4} & 1.70\cdot10^{-7}\\
0.2 & 2.28\cdot10^{-2} & 7.56\cdot10^{-4} & 3.75\cdot10^{-7}\\
0.3 & 3.77\cdot10^{-2} & 1.25\cdot10^{-3} & 6.21\cdot10^{-7}\\
0.4 & 5.54\cdot10^{-2} & 1.85\cdot10^{-3} & 9.15\cdot10^{-7}\\
0.5 & 7.64\cdot10^{-2} & 2.55\cdot10^{-3} & 1.26\cdot10^{-6}
\end{array}`;
const TAB_ORDER = R`\begin{array}{c|c|c|c}
h & \text{E} & \text{H} & \text{RK4}\\ \hline
0.1 & 7.64\cdot10^{-2} & 2.55\cdot10^{-3} & 1.26\cdot10^{-6}\\
0.05 & 3.97\cdot10^{-2} & 6.62\cdot10^{-4} & 8.24\cdot10^{-8}\\
0.025 & 2.02\cdot10^{-2} & 1.69\cdot10^{-4} & 5.26\cdot10^{-9}\\ \hline
\text{ratio} & 1.93;\ 1.96 & 3.85;\ 3.93 & 15.3;\ 15.7
\end{array}`;
const TAB_STAB = R`\begin{array}{c|c|c|c}
n & h=0.05 & h=0.01 & e^{-0.5n}\\ \hline
0 & 1 & 1 & 1\\
1 & -1.5 & 0.5 & 0.6065\\
2 & 2.25 & 0.25 & 0.3679\\
3 & -3.375 & 0.125 & 0.2231\\
4 & 5.0625 & 0.0625 & 0.1353\\
5 & -7.59375 & 0.03125 & 0.0821
\end{array}`;
const tUZ = s => s.replace('\\text{ratio}', '\\text{nisbat}');
const tRU = s => s.replace('\\text{ratio}', '\\text{отношение}');
DT.addTopic({
  id: 't11', num: 11,
  title: L('Sonli usullar: Eyler, takomillashtirilgan Eyler, Runge–Kutta', 'Численные методы: Эйлер, улучшенный Эйлер, Рунге–Кутта', 'Numerical methods: Euler, improved Euler, Runge–Kutta'),
  syllabus: { lecture: 'M11', seminar: 'S11', outcomes: ['TN4', 'TN2'], independent: [5, 14, 16] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L('Koshi masalasining yechimini Teylor qatori usuli bilan boshlang‘ich nuqta atrofida taqribiy topa olasiz.', 'Находить приближённое решение задачи Коши вблизи начальной точки методом рядов Тейлора.', 'Approximate the solution of a Cauchy problem near the initial point by the Taylor-series method.'),
    L('Eyler, takomillashtirilgan Eyler (Hoyn) va RK4 usullarida qo‘lda bir necha qadam hisoblay olasiz.', 'Выполнять вручную несколько шагов методов Эйлера, улучшенного Эйлера (Хойна) и РК4.', 'Carry out several steps of Euler’s, the improved Euler (Heun) and the RK4 methods by hand.'),
    L('Lokal va global xatoni farqlay olasiz va usul tartibini ($O(h)$, $O(h^2)$, $O(h^4)$) jadvaldan aniqlay olasiz.', 'Различать локальную и глобальную погрешность и определять порядок метода ($O(h)$, $O(h^2)$, $O(h^4)$) по таблице.', 'Distinguish local and global error and read the order of a method ($O(h)$, $O(h^2)$, $O(h^4)$) from a table.'),
    L('Oshkor Eyler usulining $y\'=-\\lambda y$ uchun barqarorlik shartini ($h<2/\\lambda$) tushuntira olasiz.', 'Объяснять условие устойчивости явного метода Эйлера для $y\'=-\\lambda y$ ($h<2/\\lambda$).', 'Explain the stability condition of explicit Euler for $y\'=-\\lambda y$ ($h<2/\\lambda$).'),
    L('Python (SciPy `solve_ivp`) yordamida masalani yechib, natijani aniq yechim bilan solishtira olasiz.', 'Решать задачу в Python (SciPy `solve_ivp`) и сравнивать результат с точным решением.', 'Solve a problem in Python (SciPy `solve_ivp`) and compare the result with the exact solution.')
  ],
  prereqKnowledge: [
    L('Koshi masalasi va yo‘nalish maydoni (1-mavzu).', 'Задача Коши и поле направлений (тема 1).', 'The Cauchy problem and direction fields (topic 1).'),
    L('Teylor formulasi va ikki o‘zgaruvchili funksiyaning xususiy hosilalari.', 'Формула Тейлора и частные производные функции двух переменных.', 'Taylor’s formula and partial derivatives of a function of two variables.'),
    L('Birinchi tartibli chiziqli tenglamani yechish (aniq yechim bilan solishtirish uchun).', 'Решение линейного уравнения первого порядка (для сравнения с точным решением).', 'Solving a first-order linear equation (to compare with the exact solution).')
  ],
  sources: [
    { id: 'dilmurodov', ref: '§3.3', verified: true },
    { id: 'ergashev', ref: '6.2.1, 6.3.1–6.3.2', verified: true },
    { id: 'kohler', ref: '2.10; 7.1–7.4, Appendix 1–2', verified: true },
    { id: 'logan', ref: '6.2', verified: true },
    { id: 'goode', ref: '1.10', verified: true },
    { id: 'boyce', ref: 'Ch. 8', verified: false }
  ],
  labs: ['L07'],
  lessons: [
    {
      id: 't11.1',
      title: L('Taqribiy yechish g‘oyasi. Teylor qatori usuli', 'Идея приближённого решения. Метод рядов Тейлора', 'The idea of approximate solution. The Taylor-series method'),
      blocks: [
        { type: 'intro', title: L('Tarmoqda virus qancha tez tarqaladi?', 'Как быстро распространяется вирус в сети?', 'How fast does a worm spread in a network?'),
          body: L(R`1000 ta kompyuterli tarmoqda $t=0$ da $I(0)=100$ tasi zararlangan. Logistik model: $I'=0{,}5\,I\,(1-I/1000)$ ($t$ — sutkalarda).

Formulasiz taxmin qiling: $t=0{,}2$ da nechta kompyuter zararlangan bo‘ladi? Boshlang‘ich nuqtadagi tezlik $I'(0)=0{,}5\cdot100\cdot0{,}9=45$. Agar tezlik qisqa vaqt deyarli o‘zgarmasa,
$$I(0{,}2)\approx I(0)+0{,}2\cdot I'(0)=100+9=109.$$
Aniq yechim $I=\dfrac{1000}{1+9e^{-0{,}5t}}$ beradi: $I(0{,}2)\approx109{,}37$. Urinma bo‘yicha bitta kichik qadam — bu **Eyler usulining** asosiy g‘oyasi. Ko‘p tenglamalarni (masalan, $y'=x^2+y^2$) elementar funksiyalarda yechib bo‘lmaydi, shuning uchun bunday qadamlar amaliyotda asosiy vosita.`,
          R`В сети из 1000 компьютеров при $t=0$ заражено $I(0)=100$. Логистическая модель: $I'=0{,}5\,I\,(1-I/1000)$ ($t$ — в сутках).

Оцените без формулы: сколько компьютеров будет заражено при $t=0{,}2$? Скорость в начальной точке $I'(0)=0{,}5\cdot100\cdot0{,}9=45$. Если скорость за короткое время почти не меняется, то
$$I(0{,}2)\approx I(0)+0{,}2\cdot I'(0)=100+9=109.$$
Точное решение $I=\dfrac{1000}{1+9e^{-0{,}5t}}$ даёт $I(0{,}2)\approx109{,}37$. Один маленький шаг по касательной — основная идея **метода Эйлера**. Многие уравнения (например, $y'=x^2+y^2$) не решаются в элементарных функциях, поэтому такие шаги — главный практический инструмент.`,
          R`In a network of 1000 computers, $I(0)=100$ are infected at $t=0$. Logistic model: $I'=0.5\,I\,(1-I/1000)$ ($t$ in days).

Estimate without a formula: how many computers are infected at $t=0.2$? The rate at the start is $I'(0)=0.5\cdot100\cdot0.9=45$. If the rate hardly changes over a short time,
$$I(0.2)\approx I(0)+0.2\cdot I'(0)=100+9=109.$$
The exact solution $I=\dfrac{1000}{1+9e^{-0.5t}}$ gives $I(0.2)\approx109.37$. One small step along the tangent is the core idea of **Euler’s method**. Many equations (for example $y'=x^2+y^2$) cannot be solved in elementary functions, so such steps are the main practical tool.`) },
        { type: 'def', title: L('To‘r, qadam va taqribiy qiymatlar', 'Сетка, шаг и приближённые значения', 'Grid, step size and approximate values'),
          body: L(R`$y'=f(x,y)$, $y(x_0)=y_0$ Koshi masalasini $[x_0,X]$ da taqribiy yechish uchun **to‘r** olinadi:
$$x_n=x_0+nh,\qquad n=0,1,\dots,N,\qquad h=\frac{X-x_0}{N}.$$
$h>0$ — **qadam**. Sonli usul $y_n\approx y(x_n)$ sonlarni ketma-ket hisoblaydi. **Bir qadamli usul** $y_{n+1}$ ni faqat $(x_n,y_n)$ orqali topadi.

Sonli usul formulani emas, **sonlar jadvalini** beradi. Uning sifati xato $e_n=y(x_n)-y_n$ bilan o‘lchanadi.`,
          R`Для приближённого решения задачи Коши $y'=f(x,y)$, $y(x_0)=y_0$ на $[x_0,X]$ берётся **сетка**:
$$x_n=x_0+nh,\qquad n=0,1,\dots,N,\qquad h=\frac{X-x_0}{N}.$$
$h>0$ — **шаг**. Численный метод последовательно вычисляет числа $y_n\approx y(x_n)$. **Одношаговый метод** находит $y_{n+1}$ только по $(x_n,y_n)$.

Численный метод даёт не формулу, а **таблицу чисел**. Его качество измеряется погрешностью $e_n=y(x_n)-y_n$.`,
          R`To solve the Cauchy problem $y'=f(x,y)$, $y(x_0)=y_0$ approximately on $[x_0,X]$ we take a **grid**:
$$x_n=x_0+nh,\qquad n=0,1,\dots,N,\qquad h=\frac{X-x_0}{N}.$$
$h>0$ is the **step size**. A numerical method computes numbers $y_n\approx y(x_n)$ one after another. A **one-step method** finds $y_{n+1}$ from $(x_n,y_n)$ only.

A numerical method gives not a formula but a **table of numbers**. Its quality is measured by the error $e_n=y(x_n)-y_n$.`) },
        { type: 'def', title: L('Teylor qatori usuli', 'Метод рядов Тейлора', 'The Taylor-series method'),
          body: L(R`Agar yechim $x_0$ atrofida Teylor qatoriga yoyilsa,
$$y(x)=y_0+y'(x_0)(x-x_0)+\frac{y''(x_0)}{2!}(x-x_0)^2+\frac{y'''(x_0)}{3!}(x-x_0)^3+\dots$$
Hosilalarni **tenglamaning o‘zidan** topamiz: $y'=f(x,y)$, so‘ng murakkab funksiya hosilasi qoidasi bilan
$$y''=f_x+f_y\,y'=f_x+f_y f,\qquad y'''=\frac{d}{dx}\,y'' \ \text{va hokazo.}$$
Bir nechta had bilan cheklanib, $x_0$ ga yaqin $x$ larda ko‘phad ko‘rinishidagi taqribiy yechim olinadi.`,
          R`Если решение раскладывается в ряд Тейлора около $x_0$, то
$$y(x)=y_0+y'(x_0)(x-x_0)+\frac{y''(x_0)}{2!}(x-x_0)^2+\frac{y'''(x_0)}{3!}(x-x_0)^3+\dots$$
Производные находим **из самого уравнения**: $y'=f(x,y)$, затем по правилу дифференцирования сложной функции
$$y''=f_x+f_y\,y'=f_x+f_y f,\qquad y'''=\frac{d}{dx}\,y'' \ \text{и т. д.}$$
Ограничившись несколькими членами, получаем приближённое решение в виде многочлена при $x$, близких к $x_0$.`,
          R`If the solution has a Taylor expansion about $x_0$,
$$y(x)=y_0+y'(x_0)(x-x_0)+\frac{y''(x_0)}{2!}(x-x_0)^2+\frac{y'''(x_0)}{3!}(x-x_0)^3+\dots$$
We get the derivatives **from the equation itself**: $y'=f(x,y)$, then by the chain rule
$$y''=f_x+f_y\,y'=f_x+f_y f,\qquad y'''=\frac{d}{dx}\,y'' \ \text{and so on.}$$
Keeping a few terms gives a polynomial approximation valid for $x$ close to $x_0$.`) },
        { type: 'example', title: L('Rikkati tenglamasi uchun Teylor ko‘phadi', 'Многочлен Тейлора для уравнения Риккати', 'A Taylor polynomial for a Riccati equation'),
          body: L(R`$y'=x^2+y^2$, $y(0)=1$ yechimining 4-darajali Teylor ko‘phadini toping va $y(0{,}1)$ ni baholang.`, R`Найдите многочлен Тейлора 4-й степени для решения $y'=x^2+y^2$, $y(0)=1$ и оцените $y(0{,}1)$.`, R`Find the degree-4 Taylor polynomial of the solution of $y'=x^2+y^2$, $y(0)=1$ and estimate $y(0.1)$.`),
          steps: [
            L(R`$y'(0)=0^2+1^2=1$.`, R`$y'(0)=0^2+1^2=1$.`, R`$y'(0)=0^2+1^2=1$.`),
            L(R`Differensiallaymiz: $y''=2x+2yy'$, $y''(0)=0+2\cdot1\cdot1=2$.`, R`Дифференцируем: $y''=2x+2yy'$, $y''(0)=0+2\cdot1\cdot1=2$.`, R`Differentiate: $y''=2x+2yy'$, so $y''(0)=0+2\cdot1\cdot1=2$.`),
            L(R`$y'''=2+2(y')^2+2yy''$, $y'''(0)=2+2+4=8$.`, R`$y'''=2+2(y')^2+2yy''$, $y'''(0)=2+2+4=8$.`, R`$y'''=2+2(y')^2+2yy''$, so $y'''(0)=2+2+4=8$.`),
            L(R`$y^{(4)}=6y'y''+2yy'''$, $y^{(4)}(0)=12+16=28$.`, R`$y^{(4)}=6y'y''+2yy'''$, $y^{(4)}(0)=12+16=28$.`, R`$y^{(4)}=6y'y''+2yy'''$, so $y^{(4)}(0)=12+16=28$.`),
            L(R`Ko‘phad: $P_4(x)=1+x+x^2+\frac43x^3+\frac76x^4$. $P_4(0{,}1)=1{,}11145$. Yuqori aniqlikdagi sonli yechim $y(0{,}1)=1{,}111463$ beradi: xato $\approx1{,}3\cdot10^{-5}$.`, R`Многочлен: $P_4(x)=1+x+x^2+\frac43x^3+\frac76x^4$. $P_4(0{,}1)=1{,}11145$. Высокоточное численное решение даёт $y(0{,}1)=1{,}111463$: погрешность $\approx1{,}3\cdot10^{-5}$.`, R`The polynomial is $P_4(x)=1+x+x^2+\frac43x^3+\frac76x^4$, and $P_4(0.1)=1.11145$. A high-accuracy numerical solution gives $y(0.1)=1.111463$: the error is $\approx1.3\cdot10^{-5}$.`)
          ],
          check: L(R`$P_4'-(x^2+P_4^2)=-6x^4+O(x^5)$: tenglama $x^3$ gacha bo‘lgan hadlarda aniq bajariladi ✓.`, R`$P_4'-(x^2+P_4^2)=-6x^4+O(x^5)$: уравнение выполняется точно до членов $x^3$ ✓.`, R`$P_4'-(x^2+P_4^2)=-6x^4+O(x^5)$: the equation holds exactly up to the $x^3$ terms ✓.`) },
        { type: 'example', title: L('Teylor ko‘phadini aniq yechim bilan solishtirish', 'Сравнение многочлена Тейлора с точным решением', 'Comparing a Taylor polynomial with the exact solution'),
          body: L(R`$y'=x-y$, $y(0)=1$. 3-darajali Teylor ko‘phadini toping va aniq yechim $y=x-1+2e^{-x}$ ning yoyilmasi bilan solishtiring.`, R`$y'=x-y$, $y(0)=1$. Найдите многочлен Тейлора 3-й степени и сравните с разложением точного решения $y=x-1+2e^{-x}$.`, R`$y'=x-y$, $y(0)=1$. Find the degree-3 Taylor polynomial and compare it with the expansion of the exact solution $y=x-1+2e^{-x}$.`),
          steps: [
            L(R`$y'(0)=0-1=-1$; $y''=1-y'$, $y''(0)=2$; $y'''=-y''$, $y'''(0)=-2$.`, R`$y'(0)=0-1=-1$; $y''=1-y'$, $y''(0)=2$; $y'''=-y''$, $y'''(0)=-2$.`, R`$y'(0)=0-1=-1$; $y''=1-y'$, $y''(0)=2$; $y'''=-y''$, $y'''(0)=-2$.`),
            L(R`$P_3(x)=1-x+x^2-\frac{x^3}{3}$.`, R`$P_3(x)=1-x+x^2-\frac{x^3}{3}$.`, R`$P_3(x)=1-x+x^2-\frac{x^3}{3}$.`),
            L(R`$2e^{-x}=2-2x+x^2-\frac{x^3}{3}+\dots$, shuning uchun $x-1+2e^{-x}=1-x+x^2-\frac{x^3}{3}+\dots$ — bir xil ✓. Teylor usuli aniq yechimning yoyilmasini beradi, lekin faqat $x_0$ atrofida aniq.`, R`$2e^{-x}=2-2x+x^2-\frac{x^3}{3}+\dots$, поэтому $x-1+2e^{-x}=1-x+x^2-\frac{x^3}{3}+\dots$ — совпадает ✓. Метод Тейлора даёт разложение точного решения, но точен лишь около $x_0$.`, R`$2e^{-x}=2-2x+x^2-\frac{x^3}{3}+\dots$, so $x-1+2e^{-x}=1-x+x^2-\frac{x^3}{3}+\dots$, the same ✓. The Taylor method reproduces the expansion of the exact solution, but it is accurate only near $x_0$.`)
          ],
          check: L(R`$y=x-1+2e^{-x}$: $y'=1-2e^{-x}$, $x-y=1-2e^{-x}$ ✓, $y(0)=1$ ✓.`, R`$y=x-1+2e^{-x}$: $y'=1-2e^{-x}$, $x-y=1-2e^{-x}$ ✓, $y(0)=1$ ✓.`, R`$y=x-1+2e^{-x}$: $y'=1-2e^{-x}$, $x-y=1-2e^{-x}$ ✓, $y(0)=1$ ✓.`) },
        { type: 'warn', body: L(R`Teylor ko‘phadi $x_0$ dan uzoqlashganda tez yomonlashadi va $f$ ning yuqori hosilalari kerak bo‘ladi — ular tez murakkablashadi. Shuning uchun amalda **qadamli** usullar ishlatiladi: kichik qadam qo‘yib, har bir yangi nuqtadan qaytadan boshlanadi. Runge–Kutta usullari Teylor usuli aniqligini hosilalarsiz, faqat $f$ qiymatlari orqali beradi.`,
          R`Многочлен Тейлора быстро портится при удалении от $x_0$, и нужны высшие производные $f$, которые быстро усложняются. Поэтому на практике используют **шаговые** методы: делают маленький шаг и начинают заново из каждой новой точки. Методы Рунге–Кутты дают точность метода Тейлора без производных, только по значениям $f$.`,
          R`A Taylor polynomial degrades quickly away from $x_0$, and it needs higher derivatives of $f$, which become messy fast. In practice one therefore uses **step-by-step** methods: take a small step and restart from each new point. Runge–Kutta methods achieve the accuracy of the Taylor method without derivatives, using only values of $f$.`) }
      ]
    },
    {
      id: 't11.2',
      title: L('Eyler usuli. Lokal va global xato', 'Метод Эйлера. Локальная и глобальная погрешность', 'Euler’s method. Local and global error'),
      blocks: [
        { type: 'def', title: L('Eyler usuli', 'Метод Эйлера', 'Euler’s method'),
          body: L(R`$$y_{n+1}=y_n+h\,f(x_n,y_n),\qquad x_{n+1}=x_n+h.$$
Geometrik ma’nosi: $(x_n,y_n)$ nuqtadan yo‘nalish maydoni ko‘rsatgan og‘ish bilan $h$ masofaga to‘g‘ri chiziq bo‘ylab yuramiz. Nuqtalarni tutashtirib, **Eyler siniq chizig‘i** hosil bo‘ladi; $h\to0$ da u integral chiziqqa yaqinlashadi (Dilmuradov, §3.3).

Bu Teylor qatorining birinchi ikki hadi: $y(x_n+h)\approx y(x_n)+h\,y'(x_n)$.`,
          R`$$y_{n+1}=y_n+h\,f(x_n,y_n),\qquad x_{n+1}=x_n+h.$$
Геометрически: из точки $(x_n,y_n)$ идём на расстояние $h$ по прямой с наклоном, заданным полем направлений. Соединив точки, получаем **ломаную Эйлера**; при $h\to0$ она приближается к интегральной кривой (Дилмурадов, §3.3).

Это первые два члена ряда Тейлора: $y(x_n+h)\approx y(x_n)+h\,y'(x_n)$.`,
          R`$$y_{n+1}=y_n+h\,f(x_n,y_n),\qquad x_{n+1}=x_n+h.$$
Geometrically: from $(x_n,y_n)$ we move a distance $h$ along the straight line whose slope is given by the direction field. Joining the points gives the **Euler polygon**; as $h\to0$ it approaches the integral curve (Dilmuradov, §3.3).

These are the first two terms of the Taylor series: $y(x_n+h)\approx y(x_n)+h\,y'(x_n)$.`) },
        { type: 'example', title: L('Eyler usuli jadvali', 'Таблица метода Эйлера', 'An Euler table'),
          body: L(R`$y'=x+y$, $y(0)=1$, $h=0{,}1$. $[0;\,0{,}5]$ da Eyler usulini qo‘llang va aniq yechim $y=2e^x-x-1$ bilan solishtiring.`, R`$y'=x+y$, $y(0)=1$, $h=0{,}1$. Примените метод Эйлера на $[0;\,0{,}5]$ и сравните с точным решением $y=2e^x-x-1$.`, R`$y'=x+y$, $y(0)=1$, $h=0.1$. Apply Euler’s method on $[0,0.5]$ and compare with the exact solution $y=2e^x-x-1$.`),
          steps: [
            L(R`1-qadam: $y_1=1+0{,}1\cdot(0+1)=1{,}1$.`, R`Шаг 1: $y_1=1+0{,}1\cdot(0+1)=1{,}1$.`, R`Step 1: $y_1=1+0.1\cdot(0+1)=1.1$.`),
            L(R`2-qadam: $y_2=1{,}1+0{,}1\cdot(0{,}1+1{,}1)=1{,}22$. 3-qadam: $y_3=1{,}22+0{,}1\cdot1{,}42=1{,}362$.`, R`Шаг 2: $y_2=1{,}1+0{,}1\cdot(0{,}1+1{,}1)=1{,}22$. Шаг 3: $y_3=1{,}22+0{,}1\cdot1{,}42=1{,}362$.`, R`Step 2: $y_2=1.1+0.1\cdot(0.1+1.1)=1.22$. Step 3: $y_3=1.22+0.1\cdot1.42=1.362$.`),
            L(R`Davom ettirib, jadvalni olamiz (oxirgi ustun — global xato):

$$` + cm(TAB_EULER) + R`$$`, R`Продолжая, получаем таблицу (последний столбец — глобальная погрешность):

$$` + cm(TAB_EULER) + R`$$`, R`Continuing, we get the table (the last column is the global error):

$$` + TAB_EULER + R`$$`),
            L(R`Xato har qadamda o‘sib boradi: Eyler siniq chizig‘i qavariq yechimning urinmalari bo‘ylab ketadi va doim pastda qoladi ($y''=2e^x>0$).`, R`Погрешность растёт с каждым шагом: ломаная идёт по касательным к выпуклой кривой и всегда остаётся ниже ($y''=2e^x>0$).`, R`The error grows with each step: the polygon follows tangents of a convex curve and always stays below it ($y''=2e^x>0$).`)
          ],
          check: L(R`$y=2e^x-x-1$: $y'=2e^x-1$, $x+y=2e^x-1$ ✓, $y(0)=1$ ✓.`, R`$y=2e^x-x-1$: $y'=2e^x-1$, $x+y=2e^x-1$ ✓, $y(0)=1$ ✓.`, R`$y=2e^x-x-1$: $y'=2e^x-1$, $x+y=2e^x-1$ ✓, $y(0)=1$ ✓.`) },
        { type: 'def', title: L('Lokal va global xato. Usul tartibi', 'Локальная и глобальная погрешность. Порядок метода', 'Local and global error. Order of a method'),
          body: L(R`- **Lokal xato** — aniq qiymatdan $y_n=y(x_n)$ boshlab **bitta** qadamda yo‘l qo‘yilgan xato. Eyler uchun Teylor formulasidan: $\ y(x_n+h)-y(x_n)-hf=\frac{h^2}{2}y''(\xi)=O(h^2)$.
- **Global xato** — $N$ ta qadamdan keyingi to‘plangan xato $e_N=y(X)-y_N$.
- Usul **$p$-tartibli**, agar global xato $O(h^p)$ bo‘lsa. Odatda lokal xato $O(h^{p+1})$, qadamlar soni esa $N=(X-x_0)/h$, shuning uchun global xatoda $h$ ning darajasi bittaga kamayadi.

Amaliy belgisi: $h$ ni ikki marta kamaytirsak, $p$-tartibli usulning xatosi taxminan $2^p$ marta kamayadi.`,
          R`- **Локальная погрешность** — ошибка **одного** шага, сделанного из точного значения $y_n=y(x_n)$. Для Эйлера по формуле Тейлора: $\ y(x_n+h)-y(x_n)-hf=\frac{h^2}{2}y''(\xi)=O(h^2)$.
- **Глобальная погрешность** — накопленная ошибка после $N$ шагов $e_N=y(X)-y_N$.
- Метод имеет **порядок $p$**, если глобальная погрешность есть $O(h^p)$. Обычно локальная погрешность $O(h^{p+1})$, а число шагов $N=(X-x_0)/h$, поэтому в глобальной погрешности степень $h$ на единицу меньше.

Практический признак: при уменьшении $h$ вдвое погрешность метода порядка $p$ уменьшается примерно в $2^p$ раз.`,
          R`- The **local error** is the error made in **one** step started from the exact value $y_n=y(x_n)$. For Euler, Taylor’s formula gives $\ y(x_n+h)-y(x_n)-hf=\frac{h^2}{2}y''(\xi)=O(h^2)$.
- The **global error** is the error accumulated after $N$ steps, $e_N=y(X)-y_N$.
- A method has **order $p$** if the global error is $O(h^p)$. Usually the local error is $O(h^{p+1})$ and there are $N=(X-x_0)/h$ steps, so the power of $h$ in the global error is one less.

Practical test: halving $h$ reduces the error of an order-$p$ method by a factor of about $2^p$.`) },
        { type: 'thm', title: L('Eyler usuli xatosining bahosi', 'Оценка погрешности метода Эйлера', 'Error bound for Euler’s method'),
          conds: L(R`1. $f$ $\ [x_0,X]\times\mathbb R$ polosada uzluksiz va $y$ bo‘yicha $L>0$ o‘zgarmasli Lipshits shartini qanoatlantiradi;
2. Koshi masalasining yechimi $[x_0,X]$ da ikki marta uzluksiz differensiallanuvchi va $|y''(x)|\le M$;
3. $y_n$ — $h$ qadamli Eyler usuli qiymatlari, $x_n\in[x_0,X]$ (yaxlitlash xatolari hisobga olinmaydi).`,
          R`1. $f$ непрерывна в полосе $[x_0,X]\times\mathbb R$ и удовлетворяет условию Липшица по $y$ с постоянной $L>0$;
2. решение задачи Коши дважды непрерывно дифференцируемо на $[x_0,X]$ и $|y''(x)|\le M$;
3. $y_n$ — значения метода Эйлера с шагом $h$, $x_n\in[x_0,X]$ (ошибки округления не учитываются).`,
          R`1. $f$ is continuous on the strip $[x_0,X]\times\mathbb R$ and Lipschitz in $y$ with constant $L>0$;
2. the solution of the Cauchy problem is twice continuously differentiable on $[x_0,X]$ with $|y''(x)|\le M$;
3. $y_n$ are the Euler values with step $h$, $x_n\in[x_0,X]$ (round-off is ignored).`),
          body: L(R`U holda
$$|y(x_n)-y_n|\le\frac{Mh}{2L}\Big(e^{L(x_n-x_0)}-1\Big).$$
Demak, global xato $O(h)$: Eyler usuli **birinchi tartibli**. O‘zgarmas $e^{L(X-x_0)}$ uzun oraliqlarda juda katta bo‘lishi mumkin.`,
          R`Тогда
$$|y(x_n)-y_n|\le\frac{Mh}{2L}\Big(e^{L(x_n-x_0)}-1\Big).$$
Значит, глобальная погрешность $O(h)$: метод Эйлера **первого порядка**. Множитель $e^{L(X-x_0)}$ на длинных отрезках может быть очень большим.`,
          R`Then
$$|y(x_n)-y_n|\le\frac{Mh}{2L}\Big(e^{L(x_n-x_0)}-1\Big).$$
So the global error is $O(h)$: Euler’s method is **first order**. The factor $e^{L(X-x_0)}$ can be very large on long intervals.`) },
        { type: 'proof', body: L(R`$e_{n+1}=e_n+h\big(f(x_n,y(x_n))-f(x_n,y_n)\big)+\frac{h^2}{2}y''(\xi_n)$. Lipshits shartidan $|e_{n+1}|\le(1+hL)|e_n|+\frac{Mh^2}{2}$. Bu rekurrent tengsizlikni yechib, $(1+hL)^n\le e^{nhL}$ dan foydalansak, bahoga kelamiz: har qadamdagi $O(h^2)$ xato $n\sim1/h$ marta to‘planadi.`,
          R`$e_{n+1}=e_n+h\big(f(x_n,y(x_n))-f(x_n,y_n)\big)+\frac{h^2}{2}y''(\xi_n)$. Из условия Липшица $|e_{n+1}|\le(1+hL)|e_n|+\frac{Mh^2}{2}$. Решая это рекуррентное неравенство и используя $(1+hL)^n\le e^{nhL}$, получаем оценку: ошибка $O(h^2)$ на шаге накапливается $n\sim1/h$ раз.`,
          R`$e_{n+1}=e_n+h\big(f(x_n,y(x_n))-f(x_n,y_n)\big)+\frac{h^2}{2}y''(\xi_n)$. The Lipschitz condition gives $|e_{n+1}|\le(1+hL)|e_n|+\frac{Mh^2}{2}$. Solving this recursive inequality and using $(1+hL)^n\le e^{nhL}$ yields the bound: an $O(h^2)$ error per step is accumulated $n\sim1/h$ times.`) },
        { type: 'example', title: L('Qadamni kamaytirish va tartibni aniqlash', 'Уменьшение шага и определение порядка', 'Halving the step and reading off the order'),
          body: L(R`Shu masala uchun $x=0{,}5$ dagi Eyler xatosi: $h=0{,}1$ da $0{,}0764$, $h=0{,}05$ da $0{,}0397$, $h=0{,}025$ da $0{,}0202$. Usul tartibini aniqlang va xatoni aniq yechimsiz baholang.`, R`Для той же задачи погрешность Эйлера в $x=0{,}5$: при $h=0{,}1$ — $0{,}0764$, при $h=0{,}05$ — $0{,}0397$, при $h=0{,}025$ — $0{,}0202$. Определите порядок и оцените погрешность без точного решения.`, R`For the same problem the Euler error at $x=0.5$ is $0.0764$ for $h=0.1$, $0.0397$ for $h=0.05$ and $0.0202$ for $h=0.025$. Find the order and estimate the error without the exact solution.`),
          steps: [
            L(R`Nisbatlar: $0{,}0764/0{,}0397\approx1{,}93$, $0{,}0397/0{,}0202\approx1{,}96$, ya’ni $\approx2=2^1$. Demak $p=1$.`, R`Отношения: $0{,}0764/0{,}0397\approx1{,}93$, $0{,}0397/0{,}0202\approx1{,}96$, т. е. $\approx2=2^1$. Значит, $p=1$.`, R`Ratios: $0.0764/0.0397\approx1.93$ and $0.0397/0.0202\approx1.96$, i.e. $\approx2=2^1$. Hence $p=1$.`),
            L(R`Aniq yechim noma’lum bo‘lsa, ikki qadam bilan hisoblaymiz: $y_h(0{,}5)=1{,}72102$, $y_{h/2}(0{,}5)=1{,}75779$.`, R`Если точное решение неизвестно, считаем с двумя шагами: $y_h(0{,}5)=1{,}72102$, $y_{h/2}(0{,}5)=1{,}75779$.`, R`If the exact solution is unknown, compute with two step sizes: $y_h(0.5)=1.72102$, $y_{h/2}(0.5)=1.75779$.`),
            L(R`Runge qoidasi: $y-y_{h/2}\approx\dfrac{y_{h/2}-y_h}{2^p-1}=0{,}0368$. Haqiqiy xato $0{,}0397$ — baho to‘g‘ri tartibni beradi.`, R`Правило Рунге: $y-y_{h/2}\approx\dfrac{y_{h/2}-y_h}{2^p-1}=0{,}0368$. Истинная погрешность $0{,}0397$ — оценка верна по порядку величины.`, R`Runge’s rule: $y-y_{h/2}\approx\dfrac{y_{h/2}-y_h}{2^p-1}=0.0368$. The true error is $0.0397$, so the estimate has the right size.`)
          ],
          check: L(R`$y(0{,}5)=2e^{0{,}5}-1{,}5=1{,}797443$; $1{,}797443-1{,}757789=0{,}039654$ ✓.`, R`$y(0{,}5)=2e^{0{,}5}-1{,}5=1{,}797443$; $1{,}797443-1{,}757789=0{,}039654$ ✓.`, R`$y(0.5)=2e^{0.5}-1.5=1.797443$; $1.797443-1.757789=0.039654$ ✓.`) },
        { type: 'warn', body: L(R`Lokal xato $O(h^2)$ bo‘lsa ham, global xato $O(h)$: kichik xatolar har qadamda **to‘planadi**. “Eyler usuli ikkinchi tartibli” deyish — keng tarqalgan xato. Bundan tashqari, $h$ ni juda kichik qilsak, kompyuterda yaxlitlash xatolari ko‘payadi: qadam soni ortadi.`,
          R`Хотя локальная погрешность $O(h^2)$, глобальная — $O(h)$: малые ошибки **накапливаются** на каждом шаге. Говорить «метод Эйлера второго порядка» — распространённая ошибка. Кроме того, при очень малом $h$ растут ошибки округления: шагов становится больше.`,
          R`Although the local error is $O(h^2)$, the global error is $O(h)$: small errors **accumulate** at every step. Saying “Euler’s method is second order” is a common mistake. Also, with a very small $h$ round-off errors grow because the number of steps grows.`) }
      ]
    },
    {
      id: 't11.3',
      title: L('Takomillashtirilgan Eyler (Hoyn) va Runge–Kutta usullari', 'Улучшенный метод Эйлера (Хойна) и методы Рунге–Кутты', 'The improved Euler (Heun) and Runge–Kutta methods'),
      blocks: [
        { type: 'def', title: L('Takomillashtirilgan Eyler (Hoyn) usuli', 'Улучшенный метод Эйлера (метод Хойна)', 'The improved Euler (Heun) method'),
          body: L(R`Avval Eyler bilan **bashorat** qilamiz, keyin ikki uchdagi og‘ishlarning o‘rtachasi bilan **tuzatamiz**:
$$k_1=f(x_n,y_n),\qquad k_2=f(x_n+h,\ y_n+hk_1),\qquad y_{n+1}=y_n+\frac h2\,(k_1+k_2).$$
Bu trapetsiya formulasi $\int_{x_n}^{x_{n+1}}f\,dx\approx\frac h2(f_n+f_{n+1})$ ga mos keladi. Bir qadamga $f$ ning **ikki** qiymati sarflanadi.`,
          R`Сначала делаем **прогноз** по Эйлеру, затем **коррекцию** средним наклоном на концах шага:
$$k_1=f(x_n,y_n),\qquad k_2=f(x_n+h,\ y_n+hk_1),\qquad y_{n+1}=y_n+\frac h2\,(k_1+k_2).$$
Это соответствует формуле трапеций $\int_{x_n}^{x_{n+1}}f\,dx\approx\frac h2(f_n+f_{n+1})$. На шаг тратится **два** значения $f$.`,
          R`First **predict** with Euler, then **correct** using the average of the slopes at both ends of the step:
$$k_1=f(x_n,y_n),\qquad k_2=f(x_n+h,\ y_n+hk_1),\qquad y_{n+1}=y_n+\frac h2\,(k_1+k_2).$$
This corresponds to the trapezoidal rule $\int_{x_n}^{x_{n+1}}f\,dx\approx\frac h2(f_n+f_{n+1})$. Each step costs **two** evaluations of $f$.`) },
        { type: 'def', title: L('Klassik Runge–Kutta usuli (RK4)', 'Классический метод Рунге–Кутты (РК4)', 'The classical Runge–Kutta method (RK4)'),
          body: L(R`$$\begin{aligned}k_1&=f(x_n,y_n), & k_2&=f\!\left(x_n+\tfrac h2,\ y_n+\tfrac h2k_1\right),\\ k_3&=f\!\left(x_n+\tfrac h2,\ y_n+\tfrac h2k_2\right), & k_4&=f(x_n+h,\ y_n+hk_3),\end{aligned}$$
$$y_{n+1}=y_n+\frac h6\,(k_1+2k_2+2k_3+k_4).$$
Bu og‘ishlarning vaznli o‘rtachasi (Simpson formulasiga o‘xshash). Bir qadamga $f$ ning **to‘rt** qiymati sarflanadi.`,
          R`$$\begin{aligned}k_1&=f(x_n,y_n), & k_2&=f\!\left(x_n+\tfrac h2,\ y_n+\tfrac h2k_1\right),\\ k_3&=f\!\left(x_n+\tfrac h2,\ y_n+\tfrac h2k_2\right), & k_4&=f(x_n+h,\ y_n+hk_3),\end{aligned}$$
$$y_{n+1}=y_n+\frac h6\,(k_1+2k_2+2k_3+k_4).$$
Это взвешенное среднее наклонов (аналог формулы Симпсона). На шаг тратится **четыре** значения $f$.`,
          R`$$\begin{aligned}k_1&=f(x_n,y_n), & k_2&=f\!\left(x_n+\tfrac h2,\ y_n+\tfrac h2k_1\right),\\ k_3&=f\!\left(x_n+\tfrac h2,\ y_n+\tfrac h2k_2\right), & k_4&=f(x_n+h,\ y_n+hk_3),\end{aligned}$$
$$y_{n+1}=y_n+\frac h6\,(k_1+2k_2+2k_3+k_4).$$
It is a weighted average of slopes (similar to Simpson’s rule). Each step costs **four** evaluations of $f$.`) },
        { type: 'thm', title: L('Usullarning tartibi', 'Порядок методов', 'Order of the methods'),
          conds: L(R`1. $f$ va uning $x,y$ bo‘yicha $p$-tartibgacha bo‘lgan barcha xususiy hosilalari yechim grafigini o‘z ichiga olgan sohada uzluksiz va chegaralangan ($p=1$ Eyler, $p=2$ Hoyn, $p=4$ RK4);
2. $f$ $y$ bo‘yicha Lipshits shartini qanoatlantiradi;
3. hisoblash $[x_0,X]$ chekli oraliqda, yaxlitlash xatolarisiz olib boriladi.`,
          R`1. $f$ и все её частные производные по $x,y$ до порядка $p$ непрерывны и ограничены в области, содержащей график решения ($p=1$ Эйлер, $p=2$ Хойн, $p=4$ РК4);
2. $f$ удовлетворяет условию Липшица по $y$;
3. вычисления ведутся на конечном отрезке $[x_0,X]$ без ошибок округления.`,
          R`1. $f$ and all its partial derivatives in $x,y$ up to order $p$ are continuous and bounded in a region containing the graph of the solution ($p=1$ Euler, $p=2$ Heun, $p=4$ RK4);
2. $f$ is Lipschitz in $y$;
3. the computation runs on a finite interval $[x_0,X]$ without round-off.`),
          body: L(R`U holda lokal xato $O(h^{p+1})$, global xato esa
$$\max_n|y(x_n)-y_n|\le C\,h^p,$$
bu yerda $C$ $h$ ga bog‘liq emas. Eyler — $O(h)$, Hoyn — $O(h^2)$, RK4 — $O(h^4)$.`,
          R`Тогда локальная погрешность $O(h^{p+1})$, а глобальная
$$\max_n|y(x_n)-y_n|\le C\,h^p,$$
где $C$ не зависит от $h$. Эйлер — $O(h)$, Хойн — $O(h^2)$, РК4 — $O(h^4)$.`,
          R`Then the local error is $O(h^{p+1})$ and the global error satisfies
$$\max_n|y(x_n)-y_n|\le C\,h^p,$$
with $C$ independent of $h$. Euler: $O(h)$; Heun: $O(h^2)$; RK4: $O(h^4)$.`) },
        { type: 'example', title: L('RK4 ning bitta qadami qo‘lda', 'Один шаг РК4 вручную', 'One RK4 step by hand'),
          body: L(R`$y'=x+y$, $y(0)=1$, $h=0{,}1$. $y_1$ ni RK4 bilan toping.`, R`$y'=x+y$, $y(0)=1$, $h=0{,}1$. Найдите $y_1$ методом РК4.`, R`$y'=x+y$, $y(0)=1$, $h=0.1$. Find $y_1$ by RK4.`),
          steps: [
            L(R`$k_1=f(0;\,1)=1$.`, R`$k_1=f(0;\,1)=1$.`, R`$k_1=f(0,1)=1$.`),
            L(R`$k_2=f(0{,}05;\ 1+0{,}05\cdot1)=0{,}05+1{,}05=1{,}1$.`, R`$k_2=f(0{,}05;\ 1+0{,}05\cdot1)=0{,}05+1{,}05=1{,}1$.`, R`$k_2=f(0.05,\ 1+0.05\cdot1)=0.05+1.05=1.1$.`),
            L(R`$k_3=f(0{,}05;\ 1+0{,}05\cdot1{,}1)=0{,}05+1{,}055=1{,}105$.`, R`$k_3=f(0{,}05;\ 1+0{,}05\cdot1{,}1)=0{,}05+1{,}055=1{,}105$.`, R`$k_3=f(0.05,\ 1+0.05\cdot1.1)=0.05+1.055=1.105$.`),
            L(R`$k_4=f(0{,}1;\ 1+0{,}1\cdot1{,}105)=0{,}1+1{,}1105=1{,}2105$.`, R`$k_4=f(0{,}1;\ 1+0{,}1\cdot1{,}105)=0{,}1+1{,}1105=1{,}2105$.`, R`$k_4=f(0.1,\ 1+0.1\cdot1.105)=0.1+1.1105=1.2105$.`),
            L(R`$y_1=1+\frac{0{,}1}{6}(1+2{,}2+2{,}21+1{,}2105)=1+\frac{0{,}1\cdot6{,}6205}{6}=1{,}1103417$.`, R`$y_1=1+\frac{0{,}1}{6}(1+2{,}2+2{,}21+1{,}2105)=1+\frac{0{,}1\cdot6{,}6205}{6}=1{,}1103417$.`, R`$y_1=1+\frac{0.1}{6}(1+2.2+2.21+1.2105)=1+\frac{0.1\cdot6.6205}{6}=1.1103417$.`)
          ],
          check: L(R`Aniq qiymat $y(0{,}1)=2e^{0{,}1}-1{,}1=1{,}1103418$; xato $1{,}7\cdot10^{-7}$ ✓ (Eyler bilan $1{,}0\cdot10^{-2}$ edi).`, R`Точное значение $y(0{,}1)=2e^{0{,}1}-1{,}1=1{,}1103418$; погрешность $1{,}7\cdot10^{-7}$ ✓ (у Эйлера было $1{,}0\cdot10^{-2}$).`, R`Exact value $y(0.1)=2e^{0.1}-1.1=1.1103418$; error $1.7\cdot10^{-7}$ ✓ (Euler gave $1.0\cdot10^{-2}$).`) },
        { type: 'example', title: L('Uchala usulni jadvalda solishtirish', 'Сравнение трёх методов в таблице', 'Comparing the three methods in a table'),
          body: L(R`$y'=x+y$, $y(0)=1$, $h=0{,}1$. Eyler (E), Hoyn (H) va RK4 xatolarini $e_n=y(x_n)-y_n$ solishtiring.`, R`$y'=x+y$, $y(0)=1$, $h=0{,}1$. Сравните погрешности $e_n=y(x_n)-y_n$ методов Эйлера (E), Хойна (H) и РК4.`, R`$y'=x+y$, $y(0)=1$, $h=0.1$. Compare the errors $e_n=y(x_n)-y_n$ of Euler (E), Heun (H) and RK4.`),
          steps: [
            L(R`Hoyn birinchi qadami: $k_1=1$, $k_2=f(0{,}1;\,1{,}1)=1{,}2$, $y_1=1+0{,}05\cdot2{,}2=1{,}11$.`, R`Первый шаг Хойна: $k_1=1$, $k_2=f(0{,}1;\,1{,}1)=1{,}2$, $y_1=1+0{,}05\cdot2{,}2=1{,}11$.`, R`First Heun step: $k_1=1$, $k_2=f(0.1,1.1)=1.2$, $y_1=1+0.05\cdot2.2=1.11$.`),
            L(R`Dastur bilan (Python) olingan xatolar:

$$` + cm(TAB_CMP) + R`$$`, R`Погрешности, полученные программой (Python):

$$` + cm(TAB_CMP) + R`$$`, R`Errors computed with a program (Python):

$$` + TAB_CMP + R`$$`),
            L(R`Bir xil $h$ da RK4 Eylerdan taxminan $6\cdot10^4$ marta aniqroq, garchi har qadamda 4 marta ko‘p hisoblasa ham.`, R`При одном и том же $h$ РК4 точнее Эйлера примерно в $6\cdot10^4$ раз, хотя на шаге вычисляет в 4 раза больше.`, R`With the same $h$, RK4 is about $6\cdot10^4$ times more accurate than Euler, although each step costs 4 times as much.`)
          ],
          check: L(R`$x=0{,}5$ da: $1{,}797443-1{,}794894=2{,}55\cdot10^{-3}$ (H) ✓, $1{,}7974425-1{,}7974413=1{,}26\cdot10^{-6}$ (RK4) ✓.`, R`При $x=0{,}5$: $1{,}797443-1{,}794894=2{,}55\cdot10^{-3}$ (H) ✓, $1{,}7974425-1{,}7974413=1{,}26\cdot10^{-6}$ (РК4) ✓.`, R`At $x=0.5$: $1.797443-1.794894=2.55\cdot10^{-3}$ (H) ✓, $1.7974425-1.7974413=1.26\cdot10^{-6}$ (RK4) ✓.`) },
        { type: 'example', title: L('Tartibni tajribada tekshirish', 'Экспериментальная проверка порядка', 'Checking the order experimentally'),
          body: L(R`Shu masalada $x=0{,}5$ dagi xatolarni $h=0{,}1;\ 0{,}05;\ 0{,}025$ uchun solishtiring.`, R`В той же задаче сравните погрешности в $x=0{,}5$ при $h=0{,}1;\ 0{,}05;\ 0{,}025$.`, R`For the same problem compare the errors at $x=0.5$ for $h=0.1,\ 0.05,\ 0.025$.`),
          steps: [
            L(R`$$` + tUZ(cm(TAB_ORDER)) + R`$$`, R`$$` + tRU(cm(TAB_ORDER)) + R`$$`, R`$$` + TAB_ORDER + R`$$`),
            L(R`Nisbatlar $2^1=2$, $2^2=4$, $2^4=16$ ga yaqin: tartiblar $1,\ 2,\ 4$ ✓.`, R`Отношения близки к $2^1=2$, $2^2=4$, $2^4=16$: порядки $1,\ 2,\ 4$ ✓.`, R`The ratios are close to $2^1=2$, $2^2=4$, $2^4=16$: the orders are $1,\ 2,\ 4$ ✓.`),
            L(R`Bir xil ish hajmida (20 ta $f$ hisoblash): Eyler $h=0{,}025$ — $2{,}0\cdot10^{-2}$, Hoyn $h=0{,}05$ — $6{,}6\cdot10^{-4}$, RK4 $h=0{,}1$ — $1{,}3\cdot10^{-6}$. Yuqori tartibli usul arzonroq.`, R`При одинаковой работе (20 вычислений $f$): Эйлер $h=0{,}025$ — $2{,}0\cdot10^{-2}$, Хойн $h=0{,}05$ — $6{,}6\cdot10^{-4}$, РК4 $h=0{,}1$ — $1{,}3\cdot10^{-6}$. Метод высокого порядка выгоднее.`, R`For equal work (20 evaluations of $f$): Euler with $h=0.025$ gives $2.0\cdot10^{-2}$, Heun with $h=0.05$ gives $6.6\cdot10^{-4}$, RK4 with $h=0.1$ gives $1.3\cdot10^{-6}$. The higher-order method is cheaper.`)
          ],
          check: L(R`$7{,}64/3{,}97\approx1{,}93$; $2{,}55/0{,}662\approx3{,}85$; $1{,}26\cdot10^{-6}/8{,}24\cdot10^{-8}\approx15{,}3$ ✓.`, R`$7{,}64/3{,}97\approx1{,}93$; $2{,}55/0{,}662\approx3{,}85$; $1{,}26\cdot10^{-6}/8{,}24\cdot10^{-8}\approx15{,}3$ ✓.`, R`$7.64/3.97\approx1.93$; $2.55/0.662\approx3.85$; $1.26\cdot10^{-6}/8.24\cdot10^{-8}\approx15.3$ ✓.`) },
        { type: 'lab', lab: 'L07', body: L(R`Laboratoriyada bitta masalani Eyler, Hoyn va RK4 bilan yeching, $h$ ni o‘zgartiring va xatolar jadvalini kuzating. $h$ ikki marta kamayganda har bir ustundagi xato necha marta kamayishini tekshiring (mustaqil ish 14).`, R`В лаборатории решите одну задачу методами Эйлера, Хойна и РК4, меняйте $h$ и следите за таблицей погрешностей. Проверьте, во сколько раз уменьшается погрешность в каждом столбце при уменьшении $h$ вдвое (самостоятельная работа 14).`, R`In the lab, solve one problem with Euler, Heun and RK4, change $h$ and watch the error table. Check by what factor the error in each column drops when $h$ is halved (independent task 14).`) }
      ]
    },
    {
      id: 't11.4',
      title: L('Barqarorlik. Matematik paketlarda yechish', 'Устойчивость. Решение в математических пакетах', 'Stability. Solving with mathematical software'),
      blocks: [
        { type: 'def', title: L('Test tenglamasi va barqarorlik', 'Тестовое уравнение и устойчивость', 'The test equation and stability'),
          body: L(R`$y'=-\lambda y$, $\lambda>0$, aniq yechimi $y=y_0e^{-\lambda x}\to0$. Eyler usuli beradi:
$$y_{n+1}=y_n-h\lambda y_n=(1-h\lambda)\,y_n,\qquad y_n=(1-h\lambda)^n y_0.$$
Usul shu tenglama uchun **barqaror**, agar $y_n$ ham so‘nsa, ya’ni $|1-h\lambda|<1$. Bu $0<h\lambda<2$ ga teng kuchli:
$$h<\frac{2}{\lambda}.$$
$h>2/\lambda$ da sonli yechim ishorasini almashtirib, cheksiz o‘sadi, garchi aniq yechim nolga intilsa ham.`,
          R`$y'=-\lambda y$, $\lambda>0$, точное решение $y=y_0e^{-\lambda x}\to0$. Метод Эйлера даёт
$$y_{n+1}=y_n-h\lambda y_n=(1-h\lambda)\,y_n,\qquad y_n=(1-h\lambda)^n y_0.$$
Метод **устойчив** на этом уравнении, если $y_n$ тоже затухает, т. е. $|1-h\lambda|<1$. Это равносильно $0<h\lambda<2$:
$$h<\frac{2}{\lambda}.$$
При $h>2/\lambda$ численное решение меняет знак и неограниченно растёт, хотя точное стремится к нулю.`,
          R`$y'=-\lambda y$, $\lambda>0$, has the exact solution $y=y_0e^{-\lambda x}\to0$. Euler’s method gives
$$y_{n+1}=y_n-h\lambda y_n=(1-h\lambda)\,y_n,\qquad y_n=(1-h\lambda)^n y_0.$$
The method is **stable** on this equation if $y_n$ also decays, i.e. $|1-h\lambda|<1$. This is equivalent to $0<h\lambda<2$:
$$h<\frac{2}{\lambda}.$$
For $h>2/\lambda$ the numerical solution alternates in sign and grows without bound, although the exact one tends to zero.`) },
        { type: 'thm', title: L('Oshkor Eyler usulining barqarorlik sharti', 'Условие устойчивости явного метода Эйлера', 'Stability condition of explicit Euler'),
          conds: L(R`1. Tenglama $y'=-\lambda y$, $\lambda>0$ o‘zgarmas;
2. qadam $h>0$ o‘zgarmas, $y_0\ne0$.`,
          R`1. Уравнение $y'=-\lambda y$, $\lambda>0$ — постоянная;
2. шаг $h>0$ постоянный, $y_0\ne0$.`,
          R`1. The equation is $y'=-\lambda y$ with a constant $\lambda>0$;
2. the step $h>0$ is constant and $y_0\ne0$.`),
          body: L(R`- $h<2/\lambda$ bo‘lsa, $y_n\to0$;
- $h=2/\lambda$ bo‘lsa, $y_n=(-1)^ny_0$ — so‘nmaydi;
- $h>2/\lambda$ bo‘lsa, $|y_n|\to\infty$.

Hoyn usulida ham interval $0<h\lambda<2$; RK4 uchun u biroz kengroq: $0<h\lambda\lessapprox2{,}785$.`,
          R`- при $h<2/\lambda$ $y_n\to0$;
- при $h=2/\lambda$ $y_n=(-1)^ny_0$ — не затухает;
- при $h>2/\lambda$ $|y_n|\to\infty$.

У метода Хойна интервал тот же: $0<h\lambda<2$; у РК4 немного шире: $0<h\lambda\lessapprox2{,}785$.`,
          R`- if $h<2/\lambda$, then $y_n\to0$;
- if $h=2/\lambda$, then $y_n=(-1)^ny_0$ does not decay;
- if $h>2/\lambda$, then $|y_n|\to\infty$.

Heun’s method has the same interval $0<h\lambda<2$; for RK4 it is slightly wider: $0<h\lambda\lessapprox2.785$.`) },
        { type: 'example', title: L('Tez so‘nuvchi jarayon: $\\lambda=50$', 'Быстро затухающий процесс: $\\lambda=50$', 'A fast-decaying process: $\\lambda=50$'),
          body: L(R`$y'=-50y$, $y(0)=1$ (masalan, kondensatorning tez zaryadsizlanishi). Eyler usulini $h=0{,}05$ va $h=0{,}01$ bilan solishtiring.`, R`$y'=-50y$, $y(0)=1$ (например, быстрая разрядка конденсатора). Сравните метод Эйлера с $h=0{,}05$ и $h=0{,}01$.`, R`$y'=-50y$, $y(0)=1$ (for example, the fast discharge of a capacitor). Compare Euler’s method with $h=0.05$ and $h=0.01$.`),
          steps: [
            L(R`Chegara: $2/\lambda=0{,}04$. $h=0{,}05$ da ko‘paytuvchi $1-2{,}5=-1{,}5$; $h=0{,}01$ da $1-0{,}5=0{,}5$.`, R`Граница: $2/\lambda=0{,}04$. При $h=0{,}05$ множитель $1-2{,}5=-1{,}5$; при $h=0{,}01$ — $1-0{,}5=0{,}5$.`, R`Threshold: $2/\lambda=0.04$. With $h=0.05$ the factor is $1-2.5=-1.5$; with $h=0.01$ it is $1-0.5=0.5$.`),
            L(R`$$` + cm(TAB_STAB) + R`$$
Oxirgi ustun — aniq yechim $x=0{,}01n$ nuqtalarda.`, R`$$` + cm(TAB_STAB) + R`$$
Последний столбец — точное решение в точках $x=0{,}01n$.`, R`$$` + TAB_STAB + R`$$
The last column is the exact solution at $x=0.01n$.`),
            L(R`$h=0{,}05$ da “yechim” $x=0{,}25$ da $-7{,}6$ ga yetdi, aniq qiymat esa $e^{-12{,}5}\approx3{,}7\cdot10^{-6}$. Bu aniqlik emas, **barqarorlik** muammosi. $h=0{,}01$ da sifat jihatdan to‘g‘ri so‘nish bor.`, R`При $h=0{,}05$ «решение» в $x=0{,}25$ достигло $-7{,}6$, а точное значение $e^{-12{,}5}\approx3{,}7\cdot10^{-6}$. Это проблема не точности, а **устойчивости**. При $h=0{,}01$ затухание качественно верное.`, R`With $h=0.05$ the “solution” reaches $-7.6$ at $x=0.25$, whereas the exact value is $e^{-12.5}\approx3.7\cdot10^{-6}$. This is a **stability** problem, not an accuracy problem. With $h=0.01$ the decay is qualitatively correct.`)
          ],
          check: L(R`$(-1{,}5)^5=-7{,}59375$ ✓; $0{,}5^5=0{,}03125$ ✓; $h=0{,}04$ da $(1-2)^n=(-1)^n$ — chegaraviy holat.`, R`$(-1{,}5)^5=-7{,}59375$ ✓; $0{,}5^5=0{,}03125$ ✓; при $h=0{,}04$ $(1-2)^n=(-1)^n$ — пограничный случай.`, R`$(-1.5)^5=-7.59375$ ✓; $0.5^5=0.03125$ ✓; for $h=0.04$, $(1-2)^n=(-1)^n$ is the borderline case.`) },
        { type: 'note', title: L('Qattiq (stiff) tenglamalar va oshkormas usullar', 'Жёсткие уравнения и неявные методы', 'Stiff equations and implicit methods'),
          body: L(R`Agar tizimda juda tez va sekin jarayonlar birga bo‘lsa (katta $\lambda$), oshkor usullar barqarorlik uchun juda kichik $h$ talab qiladi — bunday tenglamalar **qattiq** deyiladi. **Oshkormas** Eyler usuli $y_{n+1}=y_n+hf(x_{n+1},y_{n+1})$ test tenglamasi uchun $y_{n+1}=\dfrac{y_n}{1+h\lambda}$ beradi va istalgan $h>0$ da barqaror.`,
          R`Если в системе сочетаются очень быстрые и медленные процессы (большое $\lambda$), явные методы требуют для устойчивости очень малого $h$ — такие уравнения называют **жёсткими**. **Неявный** метод Эйлера $y_{n+1}=y_n+hf(x_{n+1},y_{n+1})$ на тестовом уравнении даёт $y_{n+1}=\dfrac{y_n}{1+h\lambda}$ и устойчив при любом $h>0$.`,
          R`When a system combines very fast and slow processes (large $\lambda$), explicit methods need a very small $h$ just for stability; such equations are called **stiff**. The **implicit** Euler method $y_{n+1}=y_n+hf(x_{n+1},y_{n+1})$ gives $y_{n+1}=\dfrac{y_n}{1+h\lambda}$ on the test equation and is stable for every $h>0$.`) },
        { type: 'note', title: L('Matematik paketlar: SciPy solve_ivp', 'Математические пакеты: SciPy solve_ivp', 'Mathematical software: SciPy solve_ivp'),
          body: L('Amaliyotda qadamni qo‘lda tanlamaymiz. Python’dagi `scipy.integrate.solve_ivp` funksiyasi standart holda `RK45` (Dormand–Prins juftligi: 5- va 4-tartibli formulalar) ishlatadi. U har qadamda ikki formulaning farqi bo‘yicha lokal xatoni baholaydi va **qadamni avtomatik o‘zgartiradi** (adaptiv qadam): yechim tez o‘zgarsa kichraytiradi, silliq joyda kattalashtiradi. Aniqlik `rtol` va `atol` parametrlari bilan beriladi. Qattiq masalalar uchun `method=\'Radau\'`, `\'BDF\'` yoki `\'LSODA\'` tanlanadi.\n\nMisol (mustaqil ish 16): `sol = solve_ivp(lambda x, y: x + y, (0, 0.5), [1.0], rtol=1e-8)` dan keyin `sol.y[0][-1]` ni $2e^{0.5}-1.5$ bilan solishtiring va `matplotlib` bilan grafik chizing.',
          'На практике шаг вручную не выбирают. Функция `scipy.integrate.solve_ivp` в Python по умолчанию использует `RK45` (пара Дорманда–Принса: формулы 5-го и 4-го порядка). На каждом шаге она оценивает локальную погрешность по разности двух формул и **автоматически меняет шаг** (адаптивный шаг): уменьшает его, где решение меняется быстро, и увеличивает на гладких участках. Точность задаётся параметрами `rtol` и `atol`. Для жёстких задач выбирают `method=\'Radau\'`, `\'BDF\'` или `\'LSODA\'`.\n\nПример (самостоятельная работа 16): `sol = solve_ivp(lambda x, y: x + y, (0, 0.5), [1.0], rtol=1e-8)`, затем сравните `sol.y[0][-1]` с $2e^{0.5}-1.5$ и постройте график в `matplotlib`.',
          'In practice nobody picks the step by hand. Python’s `scipy.integrate.solve_ivp` uses `RK45` by default (the Dormand–Prince pair of order 5 and 4 formulas). At each step it estimates the local error from the difference of the two formulas and **changes the step automatically** (adaptive step size): smaller where the solution changes fast, larger where it is smooth. Accuracy is set by `rtol` and `atol`. For stiff problems choose `method=\'Radau\'`, `\'BDF\'` or `\'LSODA\'`.\n\nExample (independent task 16): run `sol = solve_ivp(lambda x, y: x + y, (0, 0.5), [1.0], rtol=1e-8)`, then compare `sol.y[0][-1]` with $2e^{0.5}-1.5$ and plot it with `matplotlib`.') },
        { type: 'note', title: L('Eyler usuli Python’da (mustaqil ish 5)', 'Метод Эйлера на Python (самостоятельная работа 5)', 'Euler’s method in Python (independent task 5)'),
          body: L('`def euler(f, x, y, h, n):`\n`    for i in range(n):`\n`        y = y + h * f(x, y)`\n`        x = x + h`\n`    return y`\n\n`euler(lambda x, y: x + y, 0, 1, 0.1, 5)` natijasi $1.72102$ (jadvaldagi $1{,}72102$ bilan bir xil).',
          '`def euler(f, x, y, h, n):`\n`    for i in range(n):`\n`        y = y + h * f(x, y)`\n`        x = x + h`\n`    return y`\n\nРезультат `euler(lambda x, y: x + y, 0, 1, 0.1, 5)` равен $1.72102$ (совпадает с $1{,}72102$ из таблицы).',
          '`def euler(f, x, y, h, n):`\n`    for i in range(n):`\n`        y = y + h * f(x, y)`\n`        x = x + h`\n`    return y`\n\n`euler(lambda x, y: x + y, 0, 1, 0.1, 5)` returns $1.72102$ (the same as $1.72102$ in the table).') },
        { type: 'warn', body: L(R`Sonli usul har doim **qandaydir** sonlarni chiqaradi. U yechim yagona emasligini (1-mavzu, $y'=3y^{2/3}$) yoki yechim chekli nuqtada cheksizlikka ketishini ($y'=y^2$, $y(0)=1$, $x\to1$) o‘zi sezmaydi. Avval nazariy tahlil (mavjudlik, oraliq), keyin hisob. Natijani doim ikki xil $h$ (yoki ikki xil **rtol**) bilan tekshiring.`,
          R`Численный метод всегда выдаёт **какие-то** числа. Он сам не замечает, что решение не единственно (тема 1, $y'=3y^{2/3}$) или что решение уходит в бесконечность в конечной точке ($y'=y^2$, $y(0)=1$, $x\to1$). Сначала теоретический анализ (существование, интервал), потом расчёт. Всегда проверяйте результат с двумя разными $h$ (или двумя **rtol**).`,
          R`A numerical method always prints **some** numbers. It does not notice by itself that a solution is not unique (topic 1, $y'=3y^{2/3}$) or that it blows up at a finite point ($y'=y^2$, $y(0)=1$, $x\to1$). Analyse first (existence, interval), then compute. Always check the result with two different values of $h$ (or two values of **rtol**).`) }
      ]
    }
  ],
  mistakes: [
    L(R`Eyler formulasida og‘ishni yangi nuqtada olish: $y_{n+1}=y_n+hf(x_{n+1},y_n)$. To‘g‘ri: $f(x_n,y_n)$.`, R`Брать наклон в новой точке: $y_{n+1}=y_n+hf(x_{n+1},y_n)$. Правильно: $f(x_n,y_n)$.`, R`Taking the slope at the new point, $y_{n+1}=y_n+hf(x_{n+1},y_n)$. The correct slope is $f(x_n,y_n)$.`),
    L(R`Lokal va global xatoni aralashtirish: Eyler usulining lokal xatosi $O(h^2)$, lekin usul **birinchi** tartibli.`, R`Путать локальную и глобальную погрешность: локальная у Эйлера $O(h^2)$, но метод **первого** порядка.`, R`Confusing local and global error: Euler’s local error is $O(h^2)$, but the method is **first** order.`),
    L(R`RK4 da $k_2,k_3$ ni $x_n+h$ da hisoblash yoki $\frac h6(k_1+k_2+k_3+k_4)$ deb yozish (2 ko‘paytuvchini unutish).`, R`В РК4 вычислять $k_2,k_3$ в $x_n+h$ или писать $\frac h6(k_1+k_2+k_3+k_4)$ (забыть множители 2).`, R`In RK4, evaluating $k_2,k_3$ at $x_n+h$, or writing $\frac h6(k_1+k_2+k_3+k_4)$ (forgetting the factors 2).`),
    L(R`Katta $h$ dagi tebranuvchi o‘sishni “tenglamaning xossasi” deb talqin qilish. $y'=-\lambda y$ da bu $h>2/\lambda$ dagi beqarorlik.`, R`Считать колебательный рост при большом $h$ «свойством уравнения». Для $y'=-\lambda y$ это неустойчивость при $h>2/\lambda$.`, R`Reading oscillating growth at large $h$ as a “property of the equation”. For $y'=-\lambda y$ it is the instability for $h>2/\lambda$.`),
    L(R`Teylor ko‘phadini $x_0$ dan uzoqda ishlatish yoki $y''$ ni hisoblashda $y'$ ni $f$ bilan almashtirishni unutish ($y''=f_x+f_yf$).`, R`Использовать многочлен Тейлора далеко от $x_0$ или забыть заменить $y'$ на $f$ при вычислении $y''$ ($y''=f_x+f_yf$).`, R`Using a Taylor polynomial far from $x_0$, or forgetting to replace $y'$ by $f$ when computing $y''$ ($y''=f_x+f_yf$).`)
  ],
  exercises: [
    { id: 't11.x1', level: 'easy', type: 'numeric',
      q: L(R`$y'=2x+y$, $y(0)=1$, $h=0{,}1$. Eyler usulining ikki qadamidan keyin $y_2\approx y(0{,}2)$ ni kiriting.`, R`$y'=2x+y$, $y(0)=1$, $h=0{,}1$. Введите $y_2\approx y(0{,}2)$ после двух шагов метода Эйлера.`, R`$y'=2x+y$, $y(0)=1$, $h=0.1$. Enter $y_2\approx y(0.2)$ after two Euler steps.`),
      check: { kind: 'numeric', value: 1.23, tol: 1e-6 },
      hint: L(R`$y_1=1+0{,}1\cdot f(0,1)$, keyin $y_2=y_1+0{,}1\cdot f(0{,}1;\,y_1)$.`, R`$y_1=1+0{,}1\cdot f(0,1)$, затем $y_2=y_1+0{,}1\cdot f(0{,}1;\,y_1)$.`, R`$y_1=1+0.1\cdot f(0,1)$, then $y_2=y_1+0.1\cdot f(0.1,y_1)$.`),
      solution: L(R`$y_1=1+0{,}1\cdot1=1{,}1$; $y_2=1{,}1+0{,}1\cdot(0{,}2+1{,}1)=1{,}23$.`, R`$y_1=1+0{,}1\cdot1=1{,}1$; $y_2=1{,}1+0{,}1\cdot(0{,}2+1{,}1)=1{,}23$.`, R`$y_1=1+0.1\cdot1=1.1$; $y_2=1.1+0.1\cdot(0.2+1.1)=1.23$.`) },
    { id: 't11.x2', level: 'easy', type: 'mcq',
      q: L('Klassik RK4 usulining global xatosi qanday?', 'Какова глобальная погрешность классического метода РК4?', 'What is the global error of the classical RK4 method?'),
      options: [L('$O(h)$', '$O(h)$', '$O(h)$'), L('$O(h^2)$', '$O(h^2)$', '$O(h^2)$'), L('$O(h^4)$', '$O(h^4)$', '$O(h^4)$'), L('$O(h^5)$', '$O(h^5)$', '$O(h^5)$')], correct: 2,
      solution: L(R`RK4 — to‘rtinchi tartibli usul: lokal xato $O(h^5)$, global $O(h^4)$.`, R`РК4 — метод четвёртого порядка: локальная погрешность $O(h^5)$, глобальная $O(h^4)$.`, R`RK4 is a fourth-order method: local error $O(h^5)$, global error $O(h^4)$.`) },
    { id: 't11.x3', level: 'mid', type: 'numeric',
      q: L(R`$y'=y-x$, $y(0)=2$, $h=0{,}2$. Takomillashtirilgan Eyler (Hoyn) usulining bitta qadamidan keyin $y_1$ ni kiriting.`, R`$y'=y-x$, $y(0)=2$, $h=0{,}2$. Введите $y_1$ после одного шага улучшенного метода Эйлера (Хойна).`, R`$y'=y-x$, $y(0)=2$, $h=0.2$. Enter $y_1$ after one step of the improved Euler (Heun) method.`),
      check: { kind: 'numeric', value: 2.42, tol: 1e-6 },
      hint: L(R`$k_1=f(0,2)$; bashorat $2+0{,}2k_1$; $k_2=f(0{,}2;\ \text{bashorat})$.`, R`$k_1=f(0,2)$; прогноз $2+0{,}2k_1$; $k_2=f(0{,}2;\ \text{прогноз})$.`, R`$k_1=f(0,2)$; predictor $2+0.2k_1$; $k_2=f(0.2,\ \text{predictor})$.`),
      solution: L(R`$k_1=2$; bashorat $2{,}4$; $k_2=2{,}4-0{,}2=2{,}2$; $y_1=2+0{,}1\cdot(2+2{,}2)=2{,}42$. Aniq yechim $y=x+1+e^x$: $y(0{,}2)=2{,}42140$.`, R`$k_1=2$; прогноз $2{,}4$; $k_2=2{,}4-0{,}2=2{,}2$; $y_1=2+0{,}1\cdot(2+2{,}2)=2{,}42$. Точное решение $y=x+1+e^x$: $y(0{,}2)=2{,}42140$.`, R`$k_1=2$; predictor $2.4$; $k_2=2.4-0.2=2.2$; $y_1=2+0.1\cdot(2+2.2)=2.42$. The exact solution $y=x+1+e^x$ gives $y(0.2)=2.42140$.`) },
    { id: 't11.x4', level: 'mid', type: 'formula',
      q: L(R`$y'=x-y$, $y(0)=1$ yechimining 3-darajali Teylor ko‘phadini yozing: $y\approx\ ?$`, R`Запишите многочлен Тейлора 3-й степени решения $y'=x-y$, $y(0)=1$: $y\approx\ ?$`, R`Write the degree-3 Taylor polynomial of the solution of $y'=x-y$, $y(0)=1$: $y\approx\ ?$`),
      check: { kind: 'equiv', ref: '1 - x + x^2 - x^3/3', vars: { x: [-1, 1] } }, answer: '1 - x + x^2 - x^3/3',
      hint: L(R`$y'(0)=-1$, $y''=1-y'$, $y'''=-y''$.`, R`$y'(0)=-1$, $y''=1-y'$, $y'''=-y''$.`, R`$y'(0)=-1$, $y''=1-y'$, $y'''=-y''$.`),
      solution: L(R`$y'(0)=-1$, $y''(0)=2$, $y'''(0)=-2$, shuning uchun $y\approx1-x+\frac{2}{2}x^2-\frac{2}{6}x^3=1-x+x^2-\frac{x^3}{3}$.`, R`$y'(0)=-1$, $y''(0)=2$, $y'''(0)=-2$, поэтому $y\approx1-x+\frac{2}{2}x^2-\frac{2}{6}x^3=1-x+x^2-\frac{x^3}{3}$.`, R`$y'(0)=-1$, $y''(0)=2$, $y'''(0)=-2$, so $y\approx1-x+\frac{2}{2}x^2-\frac{2}{6}x^3=1-x+x^2-\frac{x^3}{3}$.`) },
    { id: 't11.x5', level: 'mid', type: 'numeric',
      q: L(R`$y'=-40y$ uchun oshkor Eyler usuli barqaror bo‘ladigan qadamning chegarasi $h^*$ ni kiriting ($0<h<h^*$).`, R`Введите границу шага $h^*$, при которой явный метод Эйлера устойчив для $y'=-40y$ ($0<h<h^*$).`, R`Enter the step bound $h^*$ for which explicit Euler is stable on $y'=-40y$ ($0<h<h^*$).`),
      check: { kind: 'numeric', value: 0.05, tol: 1e-9 },
      hint: L(R`$|1-h\lambda|<1$.`, R`$|1-h\lambda|<1$.`, R`$|1-h\lambda|<1$.`),
      solution: L(R`$h<2/\lambda=2/40=0{,}05$.`, R`$h<2/\lambda=2/40=0{,}05$.`, R`$h<2/\lambda=2/40=0.05$.`) },
    { id: 't11.x6', level: 'mid', type: 'order',
      q: L('RK4 ning bitta qadamidagi hisoblarni to‘g‘ri tartibga qo‘ying.', 'Расположите вычисления одного шага РК4 в правильном порядке.', 'Put the computations of one RK4 step in the correct order.'),
      items: [
        L(R`$k_1=f(x_n,y_n)$`, R`$k_1=f(x_n,y_n)$`, R`$k_1=f(x_n,y_n)$`),
        L(R`$k_2=f(x_n+\frac h2,\,y_n+\frac h2k_1)$`, R`$k_2=f(x_n+\frac h2,\,y_n+\frac h2k_1)$`, R`$k_2=f(x_n+\frac h2,\,y_n+\frac h2k_1)$`),
        L(R`$k_3=f(x_n+\frac h2,\,y_n+\frac h2k_2)$`, R`$k_3=f(x_n+\frac h2,\,y_n+\frac h2k_2)$`, R`$k_3=f(x_n+\frac h2,\,y_n+\frac h2k_2)$`),
        L(R`$k_4=f(x_n+h,\,y_n+hk_3)$`, R`$k_4=f(x_n+h,\,y_n+hk_3)$`, R`$k_4=f(x_n+h,\,y_n+hk_3)$`),
        L(R`$y_{n+1}=y_n+\frac h6(k_1+2k_2+2k_3+k_4)$`, R`$y_{n+1}=y_n+\frac h6(k_1+2k_2+2k_3+k_4)$`, R`$y_{n+1}=y_n+\frac h6(k_1+2k_2+2k_3+k_4)$`)
      ],
      explain: L(R`Har bir $k_{i+1}$ oldingi $k_i$ dan foydalanadi, shuning uchun tartib qat’iy.`, R`Каждое $k_{i+1}$ использует предыдущее $k_i$, поэтому порядок жёсткий.`, R`Each $k_{i+1}$ uses the previous $k_i$, so the order is fixed.`) },
    { id: 't11.x7', level: 'mid', type: 'match',
      q: L('Usulni uning global xatosi bilan moslang.', 'Сопоставьте метод и его глобальную погрешность.', 'Match each method with its global error.'),
      pairs: [
        { left: L('Eyler', 'Эйлер', 'Euler'), right: L('$O(h)$', '$O(h)$', '$O(h)$') },
        { left: L('Hoyn (takomillashtirilgan Eyler)', 'Хойн (улучшенный Эйлер)', 'Heun (improved Euler)'), right: L('$O(h^2)$', '$O(h^2)$', '$O(h^2)$') },
        { left: L('Klassik RK4', 'Классический РК4', 'Classical RK4'), right: L('$O(h^4)$', '$O(h^4)$', '$O(h^4)$') },
        { left: L('3-darajali Teylor usuli', 'Метод Тейлора 3-й степени', 'Third-degree Taylor method'), right: L('$O(h^3)$', '$O(h^3)$', '$O(h^3)$') }
      ],
      explain: L(R`$p$-tartibli usulning lokal xatosi $O(h^{p+1})$, global xatosi $O(h^p)$. $k$-darajali Teylor usuli $k$-tartibli.`, R`У метода порядка $p$ локальная погрешность $O(h^{p+1})$, глобальная $O(h^p)$. Метод Тейлора степени $k$ имеет порядок $k$.`, R`An order-$p$ method has local error $O(h^{p+1})$ and global error $O(h^p)$. The degree-$k$ Taylor method has order $k$.`) },
    { id: 't11.x8', level: 'hard', type: 'numeric',
      q: L(R`$y'=y$, $y(0)=1$, $h=0{,}2$. RK4 ning bitta qadami bilan $y_1$ ni kiriting (4 xona aniqlikda).`, R`$y'=y$, $y(0)=1$, $h=0{,}2$. Введите $y_1$ после одного шага РК4 (4 знака после запятой).`, R`$y'=y$, $y(0)=1$, $h=0.2$. Enter $y_1$ after one RK4 step (4 decimal places).`),
      check: { kind: 'numeric', value: 1.2214, tol: 1e-4 },
      hint: L(R`$f=y$ uchun RK4 $1+h+\frac{h^2}2+\frac{h^3}6+\frac{h^4}{24}$ ni beradi.`, R`Для $f=y$ РК4 даёт $1+h+\frac{h^2}2+\frac{h^3}6+\frac{h^4}{24}$.`, R`For $f=y$, RK4 gives $1+h+\frac{h^2}2+\frac{h^3}6+\frac{h^4}{24}$.`),
      solution: L(R`$k_1=1$, $k_2=1{,}1$, $k_3=1{,}11$, $k_4=1{,}222$; $y_1=1+\frac{0{,}2}{6}(1+2{,}2+2{,}22+1{,}222)=1{,}2214$. Aniq: $e^{0{,}2}=1{,}221403$.`, R`$k_1=1$, $k_2=1{,}1$, $k_3=1{,}11$, $k_4=1{,}222$; $y_1=1+\frac{0{,}2}{6}(1+2{,}2+2{,}22+1{,}222)=1{,}2214$. Точно: $e^{0{,}2}=1{,}221403$.`, R`$k_1=1$, $k_2=1.1$, $k_3=1.11$, $k_4=1.222$; $y_1=1+\frac{0.2}{6}(1+2.2+2.22+1.222)=1.2214$. Exact: $e^{0.2}=1.221403$.`) },
    { id: 't11.x9', level: 'hard', type: 'numeric',
      q: L(R`RK4 bilan $h=0{,}2$ da $x=1$ dagi xato $3{,}2\cdot10^{-6}$ chiqdi. $h=0{,}1$ da xato taxminan qancha bo‘ladi?`, R`РК4 с $h=0{,}2$ дал в $x=1$ погрешность $3{,}2\cdot10^{-6}$. Какой примерно будет погрешность при $h=0{,}1$?`, R`RK4 with $h=0.2$ gave an error of $3.2\cdot10^{-6}$ at $x=1$. Roughly what will the error be with $h=0.1$?`),
      check: { kind: 'numeric', value: 2e-7, tol: 0.05 },
      hint: L(R`Global xato $\approx Ch^4$.`, R`Глобальная погрешность $\approx Ch^4$.`, R`Global error $\approx Ch^4$.`),
      solution: L(R`$h$ ikki marta kamaysa, xato $2^4=16$ marta kamayadi: $3{,}2\cdot10^{-6}/16=2\cdot10^{-7}$.`, R`При уменьшении $h$ вдвое погрешность уменьшается в $2^4=16$ раз: $3{,}2\cdot10^{-6}/16=2\cdot10^{-7}$.`, R`Halving $h$ divides the error by $2^4=16$: $3.2\cdot10^{-6}/16=2\cdot10^{-7}$.`) },
    { id: 't11.x10', level: 'hard', type: 'finderror',
      q: L(R`Talaba $y'=x\,y$, $y(1)=2$, $h=0{,}1$ uchun Hoyn usulining bir qadamini hisobladi. Qaysi qatorda xato bor?`, R`Студент выполнил один шаг метода Хойна для $y'=x\,y$, $y(1)=2$, $h=0{,}1$. В какой строке ошибка?`, R`A student did one Heun step for $y'=x\,y$, $y(1)=2$, $h=0.1$. Which line contains the error?`),
      lines: [
        L(R`$k_1=f(1;\,2)=2$`, R`$k_1=f(1;\,2)=2$`, R`$k_1=f(1,2)=2$`),
        L(R`Bashorat: $2+0{,}1\cdot2=2{,}2$`, R`Прогноз: $2+0{,}1\cdot2=2{,}2$`, R`Predictor: $2+0.1\cdot2=2.2$`),
        L(R`$k_2=f(1;\,2{,}2)=2{,}2$`, R`$k_2=f(1;\,2{,}2)=2{,}2$`, R`$k_2=f(1,2.2)=2.2$`),
        L(R`$y_1=2+0{,}05\cdot(k_1+k_2)$`, R`$y_1=2+0{,}05\cdot(k_1+k_2)$`, R`$y_1=2+0.05\cdot(k_1+k_2)$`)
      ],
      wrong: 2,
      explain: L(R`$k_2$ yangi nuqtada, $x=1{,}1$ da olinadi: $k_2=f(1{,}1;\,2{,}2)=2{,}42$. Shunda $y_1=2+0{,}05\cdot4{,}42=2{,}221$. Aniq yechim $y=2e^{(x^2-1)/2}$: $y(1{,}1)=2{,}2214$.`, R`$k_2$ берётся в новой точке $x=1{,}1$: $k_2=f(1{,}1;\,2{,}2)=2{,}42$. Тогда $y_1=2+0{,}05\cdot4{,}42=2{,}221$. Точное решение $y=2e^{(x^2-1)/2}$: $y(1{,}1)=2{,}2214$.`, R`$k_2$ must be taken at the new point $x=1.1$: $k_2=f(1.1,2.2)=2.42$. Then $y_1=2+0.05\cdot4.42=2.221$. The exact solution $y=2e^{(x^2-1)/2}$ gives $y(1.1)=2.2214$.`) },
    { id: 't11.x11', level: 'hard', type: 'steps',
      q: L(R`$y'=-100y$, $y(0)=1$ masalani $[0;\,1]$ da Eyler usuli bilan yechish rejasini tuzing.`, R`Составьте план решения задачи $y'=-100y$, $y(0)=1$ на $[0;\,1]$ методом Эйлера.`, R`Plan the solution of $y'=-100y$, $y(0)=1$ on $[0,1]$ by Euler’s method.`),
      steps: [
        { q: L('Barqarorlik chegarasi qanday?', 'Какова граница устойчивости?', 'What is the stability bound?'), options: [L('$h<0{,}02$', '$h<0{,}02$', '$h<0.02$'), L('$h<0{,}01$', '$h<0{,}01$', '$h<0.01$'), L('$h<2$', '$h<2$', '$h<2$')], correct: 0 },
        { q: L(R`$h=0{,}1$ olsak nima bo‘ladi?`, R`Что будет при $h=0{,}1$?`, R`What happens with $h=0.1$?`), options: [L(R`$y_n=(-9)^n$ — portlaydi`, R`$y_n=(-9)^n$ — «взрыв»`, R`$y_n=(-9)^n$: it blows up`), L('Kichik xato bilan so‘nadi', 'Затухает с малой погрешностью', 'It decays with a small error')], correct: 0 },
        { q: L('Butun oraliqda kam qadam bilan barqaror hisoblash uchun nima qilish kerak?', 'Что сделать, чтобы считать устойчиво с небольшим числом шагов?', 'How can we compute stably with few steps?'), options: [L('Oshkormas usul (masalan, `BDF`)', 'Неявный метод (например, `BDF`)', 'Use an implicit method (e.g. `BDF`)'), L('RK4 ni $h=0{,}1$ bilan', 'РК4 с $h=0{,}1$', 'RK4 with $h=0.1$')], correct: 0 }
      ],
      explain: L(R`$2/\lambda=0{,}02$. $h=0{,}1$ da $1-h\lambda=-9$. RK4 ning chegarasi $h\lambda\lessapprox2{,}785$, ya’ni $h\lessapprox0{,}028$ — $h=0{,}1$ ham beqaror. Qattiq masala uchun oshkormas usullar kerak.`, R`$2/\lambda=0{,}02$. При $h=0{,}1$ $1-h\lambda=-9$. У РК4 граница $h\lambda\lessapprox2{,}785$, т. е. $h\lessapprox0{,}028$ — $h=0{,}1$ тоже неустойчив. Для жёсткой задачи нужны неявные методы.`, R`$2/\lambda=0.02$. With $h=0.1$, $1-h\lambda=-9$. RK4’s bound is $h\lambda\lessapprox2.785$, i.e. $h\lessapprox0.028$, so $h=0.1$ is unstable too. A stiff problem calls for implicit methods.`) }
  ],
  quiz: [
    { id: 't11.q1', q: L('Eyler usulining formulasi:', 'Формула метода Эйлера:', 'Euler’s method is:'),
      options: [L(R`$y_{n+1}=y_n+hf(x_n,y_n)$`, R`$y_{n+1}=y_n+hf(x_n,y_n)$`, R`$y_{n+1}=y_n+hf(x_n,y_n)$`), L(R`$y_{n+1}=y_n+f(x_n,y_n)$`, R`$y_{n+1}=y_n+f(x_n,y_n)$`, R`$y_{n+1}=y_n+f(x_n,y_n)$`), L(R`$y_{n+1}=hf(x_n,y_n)$`, R`$y_{n+1}=hf(x_n,y_n)$`, R`$y_{n+1}=hf(x_n,y_n)$`), L(R`$y_{n+1}=y_n+h\,y_n$`, R`$y_{n+1}=y_n+h\,y_n$`, R`$y_{n+1}=y_n+h\,y_n$`)], correct: 0,
      explain: L('Urinma bo‘yicha $h$ qadam: o‘sish = og‘ish × qadam.', 'Шаг $h$ по касательной: приращение = наклон × шаг.', 'A step $h$ along the tangent: increment = slope × step.'),
      why: [null, L('$h$ ko‘paytuvchisi yo‘q.', 'Нет множителя $h$.', 'The factor $h$ is missing.'), L('$y_n$ qo‘shilmagan.', 'Не прибавлено $y_n$.', '$y_n$ is not added.'), L('Bu faqat $f=y$ hol uchun.', 'Это только для $f=y$.', 'That holds only for $f=y$.')] },
    { id: 't11.q2', q: L('$h$ ikki marta kamaytirilsa, Hoyn usulining global xatosi taxminan:', 'При уменьшении $h$ вдвое глобальная погрешность метода Хойна примерно:', 'If $h$ is halved, the global error of Heun’s method is roughly:'),
      options: [L('2 marta kamayadi', 'уменьшится в 2 раза', 'halved'), L('4 marta kamayadi', 'уменьшится в 4 раза', 'divided by 4'), L('16 marta kamayadi', 'уменьшится в 16 раз', 'divided by 16'), L('o‘zgarmaydi', 'не изменится', 'unchanged')], correct: 1,
      explain: L('Hoyn — 2-tartibli: $2^2=4$.', 'Хойн — 2-го порядка: $2^2=4$.', 'Heun is second order: $2^2=4$.'),
      why: [L('Bu Eyler (1-tartib).', 'Это Эйлер (1-й порядок).', 'That is Euler (order 1).'), null, L('Bu RK4 (4-tartib).', 'Это РК4 (4-й порядок).', 'That is RK4 (order 4).'), L('Izchil usulning xatosi $h$ bilan kamayadi.', 'Погрешность сходящегося метода уменьшается с $h$.', 'The error of a convergent method decreases with $h$.')] },
    { id: 't11.q3', q: L('Eyler usulining lokal xatosi:', 'Локальная погрешность метода Эйлера:', 'The local error of Euler’s method is:'),
      options: [L('$O(h)$', '$O(h)$', '$O(h)$'), L('$O(h^2)$', '$O(h^2)$', '$O(h^2)$'), L('$O(h^3)$', '$O(h^3)$', '$O(h^3)$'), L('$O(1)$', '$O(1)$', '$O(1)$')], correct: 1,
      explain: L(R`Teylor qoldig‘i $\frac{h^2}{2}y''(\xi)$.`, R`Остаток Тейлора $\frac{h^2}{2}y''(\xi)$.`, R`The Taylor remainder is $\frac{h^2}{2}y''(\xi)$.`),
      why: [L('Bu global xato.', 'Это глобальная погрешность.', 'That is the global error.'), null, L('Bu Hoyn usulining lokal xatosi.', 'Это локальная погрешность метода Хойна.', 'That is Heun’s local error.'), L('Xato $h\\to0$ da nolga intiladi.', 'Погрешность стремится к нулю при $h\\to0$.', 'The error tends to zero as $h\\to0$.')] },
    { id: 't11.q4', q: L(R`$y'=-20y$ uchun oshkor Eyler usuli qaysi $h$ da barqaror?`, R`При каком $h$ явный метод Эйлера устойчив для $y'=-20y$?`, R`For which $h$ is explicit Euler stable on $y'=-20y$?`),
      options: [L('$h=0{,}05$', '$h=0{,}05$', '$h=0.05$'), L('$h=0{,}1$', '$h=0{,}1$', '$h=0.1$'), L('$h=0{,}2$', '$h=0{,}2$', '$h=0.2$'), L('$h=0{,}15$', '$h=0{,}15$', '$h=0.15$')], correct: 0,
      explain: L(R`$h<2/20=0{,}1$. Faqat $h=0{,}05$ mos.`, R`$h<2/20=0{,}1$. Подходит только $h=0{,}05$.`, R`$h<2/20=0.1$. Only $h=0.05$ qualifies.`),
      why: [null, L(R`$h=0{,}1$ da $1-h\lambda=-1$: so‘nmaydi.`, R`При $h=0{,}1$ $1-h\lambda=-1$: не затухает.`, R`At $h=0.1$, $1-h\lambda=-1$: no decay.`), L(R`$1-h\lambda=-3$: portlaydi.`, R`$1-h\lambda=-3$: «взрыв».`, R`$1-h\lambda=-3$: blow-up.`), L(R`$1-h\lambda=-2$: portlaydi.`, R`$1-h\lambda=-2$: «взрыв».`, R`$1-h\lambda=-2$: blow-up.`)] },
    { id: 't11.q5', q: L('RK4 bir qadamda $f$ ni necha marta hisoblaydi?', 'Сколько вычислений $f$ на шаге требует РК4?', 'How many evaluations of $f$ does one RK4 step need?'),
      options: [L('1', '1', '1'), L('2', '2', '2'), L('4', '4', '4'), L('6', '6', '6')], correct: 2,
      explain: L('$k_1,k_2,k_3,k_4$.', '$k_1,k_2,k_3,k_4$.', '$k_1,k_2,k_3,k_4$.'),
      why: [L('Bu Eyler.', 'Это Эйлер.', 'That is Euler.'), L('Bu Hoyn.', 'Это Хойн.', 'That is Heun.'), null, L('6 — formuladagi maxraj, hisoblashlar soni emas.', '6 — знаменатель в формуле, а не число вычислений.', '6 is the denominator in the formula, not the number of evaluations.')] },
    { id: 't11.q6', q: L(R`$y'=x^2+y^2$, $y(0)=1$ uchun $y''(0)$:`, R`Для $y'=x^2+y^2$, $y(0)=1$ значение $y''(0)$:`, R`For $y'=x^2+y^2$, $y(0)=1$, $y''(0)$ equals:`),
      options: [L('1', '1', '1'), L('2', '2', '2'), L('0', '0', '0'), L('8', '8', '8')], correct: 1,
      explain: L(R`$y''=2x+2yy'$, $y''(0)=2\cdot1\cdot1=2$.`, R`$y''=2x+2yy'$, $y''(0)=2\cdot1\cdot1=2$.`, R`$y''=2x+2yy'$, $y''(0)=2\cdot1\cdot1=2$.`),
      why: [L('Bu $y\'(0)$.', 'Это $y\'(0)$.', 'That is $y\'(0)$.'), null, L('$2yy\'$ hadi unutilgan.', 'Забыт член $2yy\'$.', 'The term $2yy\'$ was forgotten.'), L('Bu $y\'\'\'(0)$.', 'Это $y\'\'\'(0)$.', 'That is $y\'\'\'(0)$.')] },
    { id: 't11.q7', q: L('Hoyn usulida $k_2$ qayerda hisoblanadi?', 'Где вычисляется $k_2$ в методе Хойна?', 'Where is $k_2$ evaluated in Heun’s method?'),
      options: [L(R`$(x_n+h,\ y_n+hk_1)$`, R`$(x_n+h,\ y_n+hk_1)$`, R`$(x_n+h,\ y_n+hk_1)$`), L(R`$(x_n,\ y_n+hk_1)$`, R`$(x_n,\ y_n+hk_1)$`, R`$(x_n,\ y_n+hk_1)$`), L(R`$(x_n+\frac h2,\ y_n)$`, R`$(x_n+\frac h2,\ y_n)$`, R`$(x_n+\frac h2,\ y_n)$`), L(R`$(x_n+h,\ y_n)$`, R`$(x_n+h,\ y_n)$`, R`$(x_n+h,\ y_n)$`)], correct: 0,
      explain: L('Eyler bashorat qilgan nuqtada — qadamning oxirida.', 'В точке, предсказанной Эйлером, — в конце шага.', 'At the point predicted by Euler, at the end of the step.'),
      why: [null, L('$x$ ham siljishi kerak.', '$x$ тоже должен сдвинуться.', '$x$ must move too.'), L('Bu o‘rta nuqta usuliga o‘xshaydi, lekin $y$ siljimagan.', 'Похоже на метод средней точки, но $y$ не сдвинут.', 'Resembles the midpoint method, but $y$ was not moved.'), L('$y$ bashorat qilinmagan.', '$y$ не спрогнозирован.', '$y$ was not predicted.')] },
    { id: 't11.q8', q: L(R`$y'=x+y$, $y(0)=1$, $h=0{,}1$ da Eylerning $x=0{,}5$ dagi xatosi $0{,}076$. $h=0{,}05$ da taxminan:`, R`Для $y'=x+y$, $y(0)=1$, $h=0{,}1$ погрешность Эйлера в $x=0{,}5$ равна $0{,}076$. При $h=0{,}05$ примерно:`, R`For $y'=x+y$, $y(0)=1$, $h=0.1$ the Euler error at $x=0.5$ is $0.076$. With $h=0.05$ it is about:`),
      options: [L('$0{,}038$', '$0{,}038$', '$0.038$'), L('$0{,}019$', '$0{,}019$', '$0.019$'), L('$0{,}005$', '$0{,}005$', '$0.005$'), L('$0{,}152$', '$0{,}152$', '$0.152$')], correct: 0,
      explain: L('1-tartib: xato taxminan 2 marta kamayadi (haqiqatda $0{,}0397$).', '1-й порядок: погрешность уменьшается примерно вдвое (на самом деле $0{,}0397$).', 'Order 1: the error roughly halves (in fact $0.0397$).'),
      why: [null, L('Bu 2-tartibli usul uchun.', 'Это для метода 2-го порядка.', 'That would be an order-2 method.'), L('Bu 4-tartibli usul uchun.', 'Это для метода 4-го порядка.', 'That would be an order-4 method.'), L('Kichikroq $h$ xatoni oshirmaydi.', 'Меньший $h$ не увеличивает погрешность.', 'A smaller $h$ does not increase the error.')] },
    { id: 't11.q9', q: L('SciPy `solve_ivp` ning standart `RK45` usuli qadamni qanday tanlaydi?', 'Как стандартный метод `RK45` в SciPy `solve_ivp` выбирает шаг?', 'How does the default `RK45` method of SciPy `solve_ivp` choose the step?'),
      options: [L('Lokal xato bahosiga ko‘ra avtomatik (adaptiv)', 'Автоматически по оценке локальной погрешности (адаптивно)', 'Automatically, from a local error estimate (adaptive)'), L('Doim $h=0{,}1$', 'Всегда $h=0{,}1$', 'Always $h=0.1$'), L('Foydalanuvchi har qadamni beradi', 'Пользователь задаёт каждый шаг', 'The user supplies every step'), L('Faqat Eyler qadami bilan', 'Только шагом Эйлера', 'Only with Euler steps')], correct: 0,
      explain: L('5- va 4-tartibli formulalar farqi xatoni baholaydi, `rtol`/`atol` ga qarab qadam o‘zgaradi.', 'Разность формул 5-го и 4-го порядка оценивает погрешность, шаг меняется по `rtol`/`atol`.', 'The difference of the order-5 and order-4 formulas estimates the error; the step adapts to `rtol`/`atol`.'),
      why: [null, L('Qadam o‘zgaruvchan.', 'Шаг переменный.', 'The step varies.'), L('`t_eval` faqat chiqish nuqtalarini belgilaydi.', '`t_eval` задаёт лишь точки вывода.', '`t_eval` only sets output points.'), L('RK45 — Runge–Kutta juftligi.', 'RK45 — пара Рунге–Кутты.', 'RK45 is a Runge–Kutta pair.')] },
    { id: 't11.q10', q: L(R`Eyler usuli $y'=-\lambda y$ da $h>2/\lambda$ bo‘lsa:`, R`Если в методе Эйлера для $y'=-\lambda y$ взять $h>2/\lambda$, то:`, R`For Euler on $y'=-\lambda y$ with $h>2/\lambda$:`),
      options: [L('sonli yechim ishorasini almashtirib o‘sadi', 'численное решение растёт, меняя знак', 'the numerical solution grows with alternating sign'), L('aniqlik ortadi', 'точность растёт', 'accuracy improves'), L('sonli yechim monoton so‘nadi', 'численное решение монотонно затухает', 'the numerical solution decays monotonically'), L('aniq yechim ham o‘sadi', 'точное решение тоже растёт', 'the exact solution grows too')], correct: 0,
      explain: L(R`$1-h\lambda<-1$, shuning uchun $|y_n|=|1-h\lambda|^n\to\infty$.`, R`$1-h\lambda<-1$, поэтому $|y_n|=|1-h\lambda|^n\to\infty$.`, R`$1-h\lambda<-1$, so $|y_n|=|1-h\lambda|^n\to\infty$.`),
      why: [null, L('Katta $h$ aniqlikni oshirmaydi.', 'Большой $h$ не повышает точность.', 'A large $h$ does not improve accuracy.'), L('Monoton so‘nish $0<h<1/\\lambda$ da.', 'Монотонное затухание при $0<h<1/\\lambda$.', 'Monotone decay happens for $0<h<1/\\lambda$.'), L(R`Aniq yechim $e^{-\lambda x}\to0$.`, R`Точное решение $e^{-\lambda x}\to0$.`, R`The exact solution $e^{-\lambda x}\to0$.`)] },
    { id: 't11.q11', q: L('Teylor qatori usulining asosiy kamchiligi:', 'Главный недостаток метода рядов Тейлора:', 'The main drawback of the Taylor-series method is:'),
      options: [L('$f$ ning yuqori hosilalari kerak va $x_0$ dan uzoqda aniqligi pasayadi', 'нужны высшие производные $f$ и точность падает вдали от $x_0$', 'it needs higher derivatives of $f$ and loses accuracy away from $x_0$'), L('faqat chiziqli tenglamalarga qo‘llanadi', 'применим только к линейным уравнениям', 'it works only for linear equations'), L('har doim beqaror', 'всегда неустойчив', 'it is always unstable'), L('boshlang‘ich shart kerak emas', 'не нужно начальное условие', 'it needs no initial condition')], correct: 0,
      explain: L(R`Hosilalar $y''=f_x+f_yf$, ... tez murakkablashadi; qator faqat $x_0$ atrofida yaxshi.`, R`Производные $y''=f_x+f_yf$, ... быстро усложняются; ряд хорош лишь около $x_0$.`, R`The derivatives $y''=f_x+f_yf$, ... get complicated fast; the series is good only near $x_0$.`),
      why: [null, L('Misolda $y\'=x^2+y^2$ — chiziqli emas.', 'В примере $y\'=x^2+y^2$ — нелинейное.', 'The example $y\'=x^2+y^2$ is nonlinear.'), L('Barqarorlik $h$ ga bog‘liq.', 'Устойчивость зависит от $h$.', 'Stability depends on $h$.'), L('Hosilalar aynan $(x_0,y_0)$ da hisoblanadi.', 'Производные вычисляются именно в $(x_0,y_0)$.', 'The derivatives are evaluated exactly at $(x_0,y_0)$.')] }
  ]
});
})();
