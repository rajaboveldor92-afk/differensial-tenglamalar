/* "Qaysi usulni tanlayman?" — decision helper (not a solver). Convention for PDEs: a u_xx + 2b u_xy + c u_yy, Δ = b² − ac. */
(function () {
const L = DT.L, R = DT.R;
const yes = L('Ha', 'Да', 'Yes'), no = L('Yo‘q', 'Нет', 'No');
DT.CHOOSER = {
  start: 'n1',
  nodes: {
    n1: { q: L('Noma’lum nima va u nechta o‘zgaruvchiga bog‘liq?', 'Что неизвестно и от скольких переменных оно зависит?', 'What is unknown, and how many variables does it depend on?'),
      hint: L(R`Masalan, $y(x)$ — bitta o‘zgaruvchi; $u(x,t)$ — ikki o‘zgaruvchi, tenglamada $u_t$, $u_{xx}$ kabi xususiy hosilalar bo‘ladi.`, R`Например, $y(x)$ — одна переменная; $u(x,t)$ — две переменные, в уравнении частные производные $u_t$, $u_{xx}$.`, R`For example, $y(x)$ depends on one variable; $u(x,t)$ on two, and the equation then contains partial derivatives such as $u_t$, $u_{xx}$.`),
      options: [
        { label: L(R`Bitta funksiya $y(x)$ — oddiy differensial tenglama`, R`Одна функция $y(x)$ — обыкновенное дифференциальное уравнение`, R`One function $y(x)$: an ordinary differential equation`), next: 'n2' },
        { label: L(R`Bir nechta funksiya $x(t), y(t),\dots$ — sistema`, R`Несколько функций $x(t), y(t),\dots$ — система`, R`Several functions $x(t), y(t),\dots$: a system`), next: 'n40' },
        { label: L(R`Ko‘p o‘zgaruvchili $u(x,t)$ yoki $u(x,y)$ — xususiy hosilali tenglama`, R`Функция нескольких переменных $u(x,t)$ или $u(x,y)$ — уравнение в частных производных`, R`A function of several variables $u(x,t)$ or $u(x,y)$: a partial differential equation`), next: 'n50' },
        { label: L('Menga faqat sonli qiymatlar yoki grafik kerak', 'Мне нужны только числа или график', 'I only need numbers or a graph'), result: 'r_numeric' }
      ] },
    n2: { q: L('Tenglamaning tartibi qanday (eng yuqori hosila tartibi)?', 'Каков порядок уравнения (порядок старшей производной)?', 'What is the order (the highest derivative that occurs)?'),
      options: [
        { label: L(R`Birinchi: faqat $y'$`, R`Первый: только $y'$`, R`First: only $y'$`), next: 'n3' },
        { label: L(R`Ikkinchi yoki undan yuqori: $y''$, $y'''$, …`, R`Второй или выше: $y''$, $y'''$, …`, R`Second or higher: $y''$, $y'''$, …`), next: 'n20' }
      ] },
    n3: { q: L(R`Tenglamani $y'=f(x,y)$ ko‘rinishida yozish mumkinmi?`, R`Можно ли записать уравнение в виде $y'=f(x,y)$?`, R`Can the equation be written as $y'=f(x,y)$?`),
      hint: L(R`$y'$ birinchi darajada qatnashsa — odatda ha. $y'^2$, $e^{y'}$, $y=xy'+y'^2$ kabi bo‘lsa — yo‘q.`, R`Если $y'$ входит в первой степени — обычно да. Если есть $y'^2$, $e^{y'}$, $y=xy'+y'^2$ и т. п. — нет.`, R`If $y'$ occurs to the first power, usually yes. If you see $y'^2$, $e^{y'}$, $y=xy'+y'^2$ and the like, no.`),
      options: [{ label: yes, next: 'n4' }, { label: L(R`Yo‘q: $F(x,y,y')=0$, $y'$ chiziqsiz qatnashadi`, R`Нет: $F(x,y,y')=0$, $y'$ входит нелинейно`, R`No: $F(x,y,y')=0$ with $y'$ entering nonlinearly`), next: 'n10' }] },
    n4: { q: L(R`$f(x,y)=g(x)\,h(y)$ ko‘paytma ko‘rinishiga keladimi?`, R`Раскладывается ли $f(x,y)=g(x)\,h(y)$ в произведение?`, R`Does $f(x,y)$ factor as $g(x)\,h(y)$?`),
      hint: L(R`Masalan, $y'=xy^2$ — ha; $y'=x+y$ — yo‘q.`, R`Например, $y'=xy^2$ — да; $y'=x+y$ — нет.`, R`For example $y'=xy^2$: yes; $y'=x+y$: no.`),
      options: [{ label: yes, result: 'r_sep' }, { label: no, next: 'n5' }] },
    n5: { q: L(R`$f(x,y)$ quyidagilardan biriga o‘xshaydimi?`, R`Похожа ли $f(x,y)$ на один из видов?`, R`Does $f(x,y)$ have one of these forms?`),
      options: [
        { label: L(R`Faqat $y/x$ ga bog‘liq: $f(tx,ty)=f(x,y)$`, R`Зависит только от $y/x$: $f(tx,ty)=f(x,y)$`, R`Depends only on $y/x$: $f(tx,ty)=f(x,y)$`), result: 'r_hom' },
        { label: L(R`$F\!\left(\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$`, R`$F\!\left(\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$`, R`$F\!\left(\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$`), result: 'r_redhom' },
        { label: L(R`$F(ax+by+c)$`, R`$F(ax+by+c)$`, R`$F(ax+by+c)$`), result: 'r_linsub' },
        { label: L('Hech biri', 'Ни один', 'None of these'), next: 'n6' }
      ] },
    n6: { q: L(R`$y$ tenglamada qanday qatnashadi?`, R`Как входит $y$ в уравнение?`, R`How does $y$ enter the equation?`),
      options: [
        { label: L(R`Chiziqli: $y'+p(x)y=q(x)$`, R`Линейно: $y'+p(x)y=q(x)$`, R`Linearly: $y'+p(x)y=q(x)$`), result: 'r_linear' },
        { label: L(R`$y'+p(x)y=q(x)y^n$, $n\ne 0,1$`, R`$y'+p(x)y=q(x)y^n$, $n\ne 0,1$`, R`$y'+p(x)y=q(x)y^n$, $n\ne 0,1$`), result: 'r_bernoulli' },
        { label: L(R`$y'=a(x)y^2+b(x)y+c(x)$, $a\not\equiv 0$`, R`$y'=a(x)y^2+b(x)y+c(x)$, $a\not\equiv 0$`, R`$y'=a(x)y^2+b(x)y+c(x)$, $a\not\equiv 0$`), next: 'n7' },
        { label: L('Boshqacha', 'Иначе', 'Some other way'), next: 'n8' }
      ] },
    n7: { q: L(R`Bitta xususiy yechim $y_1(x)$ ma’lummi (yoki uni taxmin qilish oson: $y_1=ax+b$, $a/x$, $ae^{kx}$)?`, R`Известно ли одно частное решение $y_1(x)$ (или его легко угадать: $y_1=ax+b$, $a/x$, $ae^{kx}$)?`, R`Is one particular solution $y_1(x)$ known (or easy to guess: $y_1=ax+b$, $a/x$, $ae^{kx}$)?`),
      options: [{ label: yes, result: 'r_riccati' }, { label: no, result: 'r_riccati_none' }] },
    n8: { q: L(R`Tenglamani $M(x,y)\,dx+N(x,y)\,dy=0$ ko‘rinishida yozing. $\dfrac{\partial M}{\partial y}=\dfrac{\partial N}{\partial x}$ bajariladimi?`, R`Запишите уравнение в виде $M(x,y)\,dx+N(x,y)\,dy=0$. Выполняется ли $\dfrac{\partial M}{\partial y}=\dfrac{\partial N}{\partial x}$?`, R`Write the equation as $M(x,y)\,dx+N(x,y)\,dy=0$. Does $\dfrac{\partial M}{\partial y}=\dfrac{\partial N}{\partial x}$ hold?`),
      options: [{ label: yes, result: 'r_exact' }, { label: no, next: 'n9' }] },
    n9: { q: L('Integrallovchi ko‘paytuvchini tekshiring. Qaysi ifoda faqat bitta o‘zgaruvchiga bog‘liq?', 'Проверьте интегрирующий множитель. Какое выражение зависит только от одной переменной?', 'Test for an integrating factor. Which expression depends on one variable only?'),
      options: [
        { label: L(R`$\dfrac{M_y-N_x}{N}$ faqat $x$ ga bog‘liq`, R`$\dfrac{M_y-N_x}{N}$ зависит только от $x$`, R`$\dfrac{M_y-N_x}{N}$ depends only on $x$`), result: 'r_mux' },
        { label: L(R`$\dfrac{N_x-M_y}{M}$ faqat $y$ ga bog‘liq`, R`$\dfrac{N_x-M_y}{M}$ зависит только от $y$`, R`$\dfrac{N_x-M_y}{M}$ depends only on $y$`), result: 'r_muy' },
        { label: L('Hech biri', 'Ни одно', 'Neither'), result: 'r_first_other' }
      ] },
    n10: { q: L(R`$p=y'$ deb belgilang. Tenglama qaysi ko‘rinishda?`, R`Обозначьте $p=y'$. Какой вид имеет уравнение?`, R`Write $p=y'$. Which form does the equation have?`),
      options: [
        { label: L(R`$y=xp+\psi(p)$ (Klero)`, R`$y=xp+\psi(p)$ (Клеро)`, R`$y=xp+\psi(p)$ (Clairaut)`), result: 'r_clairaut' },
        { label: L(R`$y=x\varphi(p)+\psi(p)$, $\varphi(p)\not\equiv p$ (Lagranj)`, R`$y=x\varphi(p)+\psi(p)$, $\varphi(p)\not\equiv p$ (Лагранж)`, R`$y=x\varphi(p)+\psi(p)$, $\varphi(p)\not\equiv p$ (Lagrange)`), result: 'r_lagrange' },
        { label: L(R`Boshqa: $y=f(x,p)$, $x=f(y,p)$ yoki $p$ ga nisbatan bir nechta tarmoqqa yechiladi`, R`Другое: $y=f(x,p)$, $x=f(y,p)$ или разрешается относительно $p$ в несколько ветвей`, R`Other: $y=f(x,p)$, $x=f(y,p)$, or it can be solved for $p$ in several branches`), result: 'r_param' }
      ] },
    n20: { q: L(R`Tenglama $y, y', \dots, y^{(n)}$ ga nisbatan chiziqlimi: $a_0(x)y^{(n)}+\dots+a_n(x)y=f(x)$?`, R`Линейно ли уравнение относительно $y, y', \dots, y^{(n)}$: $a_0(x)y^{(n)}+\dots+a_n(x)y=f(x)$?`, R`Is the equation linear in $y, y', \dots, y^{(n)}$: $a_0(x)y^{(n)}+\dots+a_n(x)y=f(x)$?`),
      hint: L(R`$yy''$, $(y')^2$, $\sin y$ kabi hadlar bo‘lsa — chiziqli emas.`, R`Если есть $yy''$, $(y')^2$, $\sin y$ — уравнение нелинейное.`, R`Terms like $yy''$, $(y')^2$ or $\sin y$ make it nonlinear.`),
      options: [{ label: yes, next: 'n21' }, { label: no, next: 'n25' }] },
    n21: { q: L('Koeffitsiyentlar qanday?', 'Какие коэффициенты?', 'What are the coefficients like?'),
      options: [
        { label: L('O‘zgarmas sonlar', 'Постоянные числа', 'Constant numbers'), next: 'n22' },
        { label: L(R`Eyler–Koshi: $x^2y''+axy'+by=f(x)$`, R`Эйлера–Коши: $x^2y''+axy'+by=f(x)$`, R`Euler–Cauchy: $x^2y''+axy'+by=f(x)$`), result: 'r_euler' },
        { label: L(R`Boshqa o‘zgaruvchan koeffitsiyentlar`, R`Другие переменные коэффициенты`, R`Other variable coefficients`), next: 'n23' }
      ] },
    n22: { q: L(R`O‘ng tomon $f(x)$ qanday?`, R`Какая правая часть $f(x)$?`, R`What is the right-hand side $f(x)$?`),
      options: [
        { label: L(R`$f\equiv 0$ (bir jinsli)`, R`$f\equiv 0$ (однородное)`, R`$f\equiv 0$ (homogeneous)`), result: 'r_char' },
        { label: L(R`Maxsus: $e^{\alpha x}\big(P(x)\cos\beta x+Q(x)\sin\beta x\big)$ yoki shunday hadlar yig‘indisi`, R`Специальная: $e^{\alpha x}\big(P(x)\cos\beta x+Q(x)\sin\beta x\big)$ или сумма таких слагаемых`, R`Special: $e^{\alpha x}\big(P(x)\cos\beta x+Q(x)\sin\beta x\big)$ or a sum of such terms`), result: 'r_undet' },
        { label: L(R`Boshqa: $\tan x$, $1/x$, $\ln x$, $e^x/x$, …`, R`Другая: $\tan x$, $1/x$, $\ln x$, $e^x/x$, …`, R`Other: $\tan x$, $1/x$, $\ln x$, $e^x/x$, …`), result: 'r_varpar' },
        { label: L(R`$t=0$ dagi boshlang‘ich shartli masala, o‘ng tomon bo‘lakli, pog‘onali yoki impuls ($\delta$)`, R`Задача с начальными условиями при $t=0$, правая часть кусочная, ступенчатая или импульс ($\delta$)`, R`An initial value problem at $t=0$ with a piecewise, step or impulse ($\delta$) input`), result: 'r_laplace' }
      ] },
    n23: { q: L('Nima ma’lum?', 'Что известно?', 'What do you know?'),
      options: [
        { label: L(R`Bir jinsli tenglamaning bitta noldan farqli yechimi $y_1$`, R`Одно ненулевое решение $y_1$ однородного уравнения`, R`One nonzero solution $y_1$ of the homogeneous equation`), result: 'r_reduce' },
        { label: L('Bir jinsli tenglamaning fundamental yechimlar sistemasi; bir jinsli bo‘lmagan tenglama kerak', 'Фундаментальная система решений однородного уравнения; нужно неоднородное', 'A fundamental set for the homogeneous equation; the nonhomogeneous one is needed'), result: 'r_varpar' },
        { label: L(R`Hech narsa, lekin koeffitsiyentlar $x_0$ atrofida darajali qatorga yoyiladi va $a_0(x_0)\ne 0$`, R`Ничего, но коэффициенты раскладываются в степенной ряд около $x_0$ и $a_0(x_0)\ne 0$`, R`Nothing, but the coefficients are power series around $x_0$ and $a_0(x_0)\ne 0$`), result: 'r_series' },
        { label: L('Hech narsa', 'Ничего', 'Nothing'), result: 'r_numeric' }
      ] },
    n25: { q: L('Chiziqsiz yuqori tartibli tenglama. Qaysi belgi bor?', 'Нелинейное уравнение высшего порядка. Какой признак есть?', 'A nonlinear higher-order equation. Which feature does it have?'),
      options: [
        { label: L(R`$y^{(n)}=f(x)$`, R`$y^{(n)}=f(x)$`, R`$y^{(n)}=f(x)$`), result: 'r_repint' },
        { label: L(R`$y$ oshkor qatnashmaydi: $F(x,y',y'')=0$`, R`Нет $y$ явно: $F(x,y',y'')=0$`, R`No explicit $y$: $F(x,y',y'')=0$`), result: 'r_noy' },
        { label: L(R`$x$ oshkor qatnashmaydi: $F(y,y',y'')=0$`, R`Нет $x$ явно: $F(y,y',y'')=0$`, R`No explicit $x$: $F(y,y',y'')=0$`), result: 'r_nox' },
        { label: L(R`$y,y',y''$ ga nisbatan bir jinsli: $F(x,ty,ty',ty'')=t^kF(x,y,y',y'')$`, R`Однородно по $y,y',y''$: $F(x,ty,ty',ty'')=t^kF(x,y,y',y'')$`, R`Homogeneous in $y,y',y''$: $F(x,ty,ty',ty'')=t^kF(x,y,y',y'')$`), result: 'r_genhom' },
        { label: L('Hech biri', 'Ничего из этого', 'None of these'), result: 'r_numeric' }
      ] },
    n40: { q: L('Sistema qanday?', 'Какая система?', 'What kind of system?'),
      options: [
        { label: L(R`Chiziqli, o‘zgarmas koeffitsiyentli: $X'=AX$ yoki $X'=AX+F(t)$`, R`Линейная с постоянными коэффициентами: $X'=AX$ или $X'=AX+F(t)$`, R`Linear with constant coefficients: $X'=AX$ or $X'=AX+F(t)$`), next: 'n41' },
        { label: L('Chiziqsiz (masalan, SIR, yirtqich–o‘lja) yoki o‘zgaruvchan koeffitsiyentli', 'Нелинейная (например, SIR, хищник–жертва) или с переменными коэффициентами', 'Nonlinear (for example SIR, predator–prey) or with variable coefficients'), result: 'r_qual' }
      ] },
    n41: { q: L(R`$t=0$ dagi boshlang‘ich shartlar va pog‘onali/impuls kirish bormi?`, R`Есть ли начальные условия при $t=0$ и ступенчатый/импульсный вход?`, R`Are there initial conditions at $t=0$ and a step/impulse input?`),
      options: [
        { label: L(R`Yo‘q: $X'=AX$ yoki silliq $F(t)$`, R`Нет: $X'=AX$ или гладкая $F(t)$`, R`No: $X'=AX$ or a smooth $F(t)$`), result: 'r_system' },
        { label: yes, result: 'r_laplace' }
      ] },
    n50: { q: L(R`Bu ikki o‘zgaruvchili ikkinchi tartibli chiziqli tenglamami: $a u_{xx}+2b u_{xy}+c u_{yy}+(\text{kichik hadlar})=0$?`, R`Это линейное уравнение второго порядка с двумя переменными: $a u_{xx}+2b u_{xy}+c u_{yy}+(\text{младшие члены})=0$?`, R`Is it a linear second-order equation in two variables: $a u_{xx}+2b u_{xy}+c u_{yy}+(\text{lower-order terms})=0$?`),
      options: [{ label: yes, next: 'n51' }, { label: L('Yo‘q (birinchi tartibli, chiziqsiz yoki uchta o‘zgaruvchi)', 'Нет (первого порядка, нелинейное или три переменных)', 'No (first order, nonlinear or three variables)'), result: 'r_pde_other' }] },
    n51: { q: L('Nima kerak?', 'Что нужно?', 'What do you need?'),
      options: [
        { label: L('Turini aniqlash va kanonik ko‘rinishga keltirish', 'Определить тип и привести к каноническому виду', 'Find the type and the canonical form'), result: 'r_classify' },
        { label: L('Aniq masalani yechish (boshlang‘ich/chegaraviy shartlar bilan)', 'Решить конкретную задачу (с начальными/граничными условиями)', 'Solve a concrete problem (with initial/boundary conditions)'), next: 'n52' }
      ] },
    n52: { q: L('Qaysi masala?', 'Какая задача?', 'Which problem?'),
      options: [
        { label: L(R`Kesmada $[0,l]$: sterjenda issiqlik yoki uchlari mahkamlangan tor (chegaraviy shartlar bilan)`, R`На отрезке $[0,l]$: теплопроводность в стержне или струна с закреплёнными концами (с граничными условиями)`, R`On a segment $[0,l]$: heat in a rod or a string with fixed ends (with boundary conditions)`), result: 'r_fourier' },
        { label: L(R`Cheksiz tor: $-\infty<x<\infty$, faqat boshlang‘ich shartlar`, R`Бесконечная струна: $-\infty<x<\infty$, только начальные условия`, R`Infinite string: $-\infty<x<\infty$, initial conditions only`), result: 'r_dalembert' },
        { label: L('Boshqa soha yoki shartlar', 'Другая область или условия', 'Another domain or other conditions'), result: 'r_pde_other' }
      ] }
  },
  results: {
    r_sep: { title: L('O‘zgaruvchilari ajraladigan tenglama', 'Уравнение с разделяющимися переменными', 'Separable equation'), topics: ['t02'], labs: ['L02', 'L01'],
      body: L(R`**Belgisi:** $y'=g(x)h(y)$ yoki $M_1(x)N_1(y)dx+M_2(x)N_2(y)dy=0$.

**Birinchi qadam:** $h(y)\ne0$ da ajrating: $\dfrac{dy}{h(y)}=g(x)\,dx$, keyin ikkala tomonni integrallang.

**Diqqat:**
- $h(y_0)=0$ bo‘lgan o‘zgarmas yechimlar $y\equiv y_0$ ni alohida yozing — bo‘lishda ular yo‘qoladi.
- $\int dy/y=\ln|y|$; modulni unutmang.
- Javobni aniqlanish oralig‘i bilan bering.

**Qachon ishlamaydi:** $f(x,y)$ ko‘paytmaga ajralmasa (masalan $y'=x+y$). Unda bir jinsli, chiziqli yoki boshqa turni tekshiring.`,
      R`**Признак:** $y'=g(x)h(y)$ или $M_1(x)N_1(y)dx+M_2(x)N_2(y)dy=0$.

**Первый шаг:** при $h(y)\ne0$ разделите: $\dfrac{dy}{h(y)}=g(x)\,dx$, затем проинтегрируйте обе части.

**Внимание:**
- Постоянные решения $y\equiv y_0$ с $h(y_0)=0$ выпишите отдельно — при делении они теряются.
- $\int dy/y=\ln|y|$; не забывайте модуль.
- Указывайте интервал, на котором определён ответ.

**Когда не работает:** если $f(x,y)$ не раскладывается в произведение (например, $y'=x+y$). Тогда проверьте однородное, линейное и другие типы.`,
      R`**How to recognize:** $y'=g(x)h(y)$ or $M_1(x)N_1(y)dx+M_2(x)N_2(y)dy=0$.

**First step:** where $h(y)\ne0$, separate: $\dfrac{dy}{h(y)}=g(x)\,dx$, then integrate both sides.

**Watch out:**
- Write the constant solutions $y\equiv y_0$ with $h(y_0)=0$ separately: dividing by $h(y)$ loses them.
- $\int dy/y=\ln|y|$; keep the absolute value.
- State the interval on which the answer is defined.

**When it does not apply:** when $f(x,y)$ does not factor (for example $y'=x+y$). Then check the homogeneous, linear and other types.`) },
    r_linsub: { title: L(R`$y'=F(ax+by+c)$: almashtirish`, R`$y'=F(ax+by+c)$: замена`, R`$y'=F(ax+by+c)$: substitution`), topics: ['t02'], labs: ['L02'],
      body: L(R`**Belgisi:** o‘ng tomon faqat bitta chiziqli ifoda $ax+by+c$ ga bog‘liq.

**Birinchi qadam:** $z=ax+by+c$ deb oling. Unda $z'=a+bF(z)$ — o‘zgaruvchilari ajraladigan tenglama.

**Diqqat:** $a+bF(z_0)=0$ bo‘lgan $z\equiv z_0$ ham yechim beradi: $ax+by+c=z_0$ to‘g‘ri chiziq. $b=0$ bo‘lsa tenglama shundoq ham ajraladi.

**Qachon ishlamaydi:** $x$ va $y$ boshqa kombinatsiyalarda ham qatnashsa.`,
      R`**Признак:** правая часть зависит только от одного линейного выражения $ax+by+c$.

**Первый шаг:** положите $z=ax+by+c$. Тогда $z'=a+bF(z)$ — уравнение с разделяющимися переменными.

**Внимание:** $z\equiv z_0$ с $a+bF(z_0)=0$ тоже даёт решение — прямую $ax+by+c=z_0$. При $b=0$ уравнение и так разделяется.

**Когда не работает:** если $x$ и $y$ входят и в другие комбинации.`,
      R`**How to recognize:** the right side depends only on one linear expression $ax+by+c$.

**First step:** put $z=ax+by+c$. Then $z'=a+bF(z)$, which is separable.

**Watch out:** $z\equiv z_0$ with $a+bF(z_0)=0$ also gives a solution, the line $ax+by+c=z_0$. If $b=0$ the equation is already separable.

**When it does not apply:** if $x$ and $y$ also occur in other combinations.`) },
    r_hom: { title: L(R`Bir jinsli tenglama ($y/x$)`, R`Однородное уравнение ($y/x$)`, R`Homogeneous equation ($y/x$)`), topics: ['t03'], labs: ['L03'],
      body: L(R`**Belgisi:** $f(tx,ty)=f(x,y)$ (nolinchi darajali bir jinsli), ya’ni $y'=\varphi(y/x)$. Bu «bir jinsli»ning chiziqli tenglamalardagi ma’nosidan ($f\equiv0$) farq qiladi.

**Birinchi qadam:** $y=u(x)\,x$, $y'=u+xu'$. Natija: $xu'=\varphi(u)-u$ — ajraladigan tenglama.

**Diqqat:**
- $\varphi(u_0)=u_0$ ildizlari $y=u_0x$ yechimlarini beradi; ularni yo‘qotmang.
- $x\ne0$ deb bo‘lamiz; $x=0$ ni alohida tekshiring.

**Qachon ishlamaydi:** $f$ ni $y/x$ orqali ifodalab bo‘lmasa, masalan $y'=x+y^2$.`,
      R`**Признак:** $f(tx,ty)=f(x,y)$ (однородная функция нулевой степени), т. е. $y'=\varphi(y/x)$. Это другой смысл слова «однородное», чем у линейных уравнений ($f\equiv0$).

**Первый шаг:** $y=u(x)\,x$, $y'=u+xu'$. Получаем $xu'=\varphi(u)-u$ — уравнение с разделяющимися переменными.

**Внимание:**
- Корни $\varphi(u_0)=u_0$ дают решения $y=u_0x$; не теряйте их.
- Делим на $x\ne0$; случай $x=0$ проверьте отдельно.

**Когда не работает:** если $f$ нельзя выразить через $y/x$, например $y'=x+y^2$.`,
      R`**How to recognize:** $f(tx,ty)=f(x,y)$ (homogeneous of degree zero), i.e. $y'=\varphi(y/x)$. This is a different meaning of “homogeneous” than for linear equations ($f\equiv0$).

**First step:** $y=u(x)\,x$, $y'=u+xu'$. You get $xu'=\varphi(u)-u$, which is separable.

**Watch out:**
- Roots of $\varphi(u_0)=u_0$ give solutions $y=u_0x$; do not lose them.
- You divide by $x\ne0$; check $x=0$ separately.

**When it does not apply:** if $f$ cannot be written through $y/x$, e.g. $y'=x+y^2$.`) },
    r_redhom: { title: L('Bir jinsliga keltiriladigan tenglama', 'Уравнение, приводящееся к однородному', 'Equation reducible to homogeneous'), topics: ['t03'], labs: ['L03'],
      body: L(R`**Belgisi:** $y'=F\!\left(\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$.

**Birinchi qadam:** $\Delta=\begin{vmatrix}a_1&b_1\\a_2&b_2\end{vmatrix}$ ni hisoblang.
- $\Delta\ne0$: to‘g‘ri chiziqlarning kesishish nuqtasi $(x_0,y_0)$ ni toping, $x=X+x_0$, $y=Y+y_0$ — bir jinsli tenglama hosil bo‘ladi.
- $\Delta=0$: $z=a_1x+b_1y$ (yoki proporsional ifoda) — ajraladigan tenglama.

**Diqqat:** oxirida eski o‘zgaruvchilarga qayting; $c_1=c_2=0$ bo‘lsa tenglama allaqachon bir jinsli.

**Qachon ishlamaydi:** surat yoki maxraj chiziqli bo‘lmasa (masalan $x^2$ bor bo‘lsa).`,
      R`**Признак:** $y'=F\!\left(\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$.

**Первый шаг:** вычислите $\Delta=\begin{vmatrix}a_1&b_1\\a_2&b_2\end{vmatrix}$.
- $\Delta\ne0$: найдите точку пересечения прямых $(x_0,y_0)$, $x=X+x_0$, $y=Y+y_0$ — получится однородное уравнение.
- $\Delta=0$: $z=a_1x+b_1y$ (или пропорциональное выражение) — уравнение с разделяющимися переменными.

**Внимание:** в конце вернитесь к старым переменным; при $c_1=c_2=0$ уравнение уже однородное.

**Когда не работает:** если числитель или знаменатель нелинейны (например, есть $x^2$).`,
      R`**How to recognize:** $y'=F\!\left(\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$.

**First step:** compute $\Delta=\begin{vmatrix}a_1&b_1\\a_2&b_2\end{vmatrix}$.
- $\Delta\ne0$: find the intersection point $(x_0,y_0)$ of the two lines and set $x=X+x_0$, $y=Y+y_0$; the result is homogeneous.
- $\Delta=0$: put $z=a_1x+b_1y$ (or the proportional expression); the result is separable.

**Watch out:** return to the original variables at the end; if $c_1=c_2=0$ the equation is already homogeneous.

**When it does not apply:** if the numerator or denominator is not linear (e.g. contains $x^2$).`) },
    r_linear: { title: L('Birinchi tartibli chiziqli tenglama', 'Линейное уравнение первого порядка', 'First-order linear equation'), topics: ['t04'], labs: ['L03'],
      body: L(R`**Belgisi:** $y'+p(x)y=q(x)$: $y$ va $y'$ faqat birinchi darajada, ko‘paytmasiz.

**Birinchi qadam:** integrallovchi ko‘paytuvchi $\mu(x)=e^{\int p\,dx}$. Unda $(\mu y)'=\mu q$, ya’ni
$$y=\frac{1}{\mu(x)}\left(\int\mu(x)q(x)\,dx+C\right).$$
(Yoki Bernulli usuli $y=uv$, yoki o‘zgarmasni variatsiyalash — natija bir xil.)

**Diqqat:** avval $y'$ oldidagi koeffitsiyentga bo‘ling. Yechim $p,q$ uzluksiz bo‘lgan oraliqda mavjud va yagona.

**Qachon ishlamaydi:** $y^2$, $\sin y$ kabi hadlar bo‘lsa. Lekin $x$ ni $y$ ning funksiyasi deb qarasangiz, tenglama $x'(y)+P(y)x=Q(y)$ chiziqli bo‘lib qolishi mumkin — tekshirib ko‘ring.`,
      R`**Признак:** $y'+p(x)y=q(x)$: $y$ и $y'$ только в первой степени, без произведений.

**Первый шаг:** интегрирующий множитель $\mu(x)=e^{\int p\,dx}$. Тогда $(\mu y)'=\mu q$, т. е.
$$y=\frac{1}{\mu(x)}\left(\int\mu(x)q(x)\,dx+C\right).$$
(Или метод Бернулли $y=uv$, или вариация постоянной — результат тот же.)

**Внимание:** сначала разделите на коэффициент при $y'$. Решение существует и единственно на интервале, где $p,q$ непрерывны.

**Когда не работает:** если есть $y^2$, $\sin y$ и т. п. Но если считать $x$ функцией от $y$, уравнение может стать линейным: $x'(y)+P(y)x=Q(y)$ — проверьте.`,
      R`**How to recognize:** $y'+p(x)y=q(x)$: $y$ and $y'$ appear only to the first power, never multiplied together.

**First step:** integrating factor $\mu(x)=e^{\int p\,dx}$. Then $(\mu y)'=\mu q$, so
$$y=\frac{1}{\mu(x)}\left(\int\mu(x)q(x)\,dx+C\right).$$
(The substitution $y=uv$ or variation of the constant give the same result.)

**Watch out:** first divide by the coefficient of $y'$. The solution exists and is unique on any interval where $p,q$ are continuous.

**When it does not apply:** if terms like $y^2$ or $\sin y$ occur. But regarding $x$ as a function of $y$ may make it linear, $x'(y)+P(y)x=Q(y)$; check that.`) },
    r_bernoulli: { title: L('Bernulli tenglamasi', 'Уравнение Бернулли', 'Bernoulli equation'), topics: ['t04'], labs: ['L03'],
      body: L(R`**Belgisi:** $y'+p(x)y=q(x)y^n$, $n\ne0,1$ (n kasr ham bo‘lishi mumkin).

**Birinchi qadam:** $y^n$ ga bo‘ling va $z=y^{1-n}$ deb oling: $z'+(1-n)p(x)z=(1-n)q(x)$ — chiziqli tenglama.

**Diqqat:**
- $n>0$ da $y\equiv0$ ham yechim; bo‘lishda u yo‘qoladi.
- Kasr $n$ da $y^{1-n}$ ning aniqlanish sohasini kuzating.

**Qachon ishlamaydi:** $n=0$ yoki $n=1$ — bu oddiy chiziqli tenglama; o‘ng tomonda $y$ ning boshqa funksiyasi bo‘lsa.`,
      R`**Признак:** $y'+p(x)y=q(x)y^n$, $n\ne0,1$ ($n$ может быть дробным).

**Первый шаг:** разделите на $y^n$ и положите $z=y^{1-n}$: $z'+(1-n)p(x)z=(1-n)q(x)$ — линейное уравнение.

**Внимание:**
- При $n>0$ $y\equiv0$ тоже решение; при делении оно теряется.
- При дробном $n$ следите за областью определения $y^{1-n}$.

**Когда не работает:** при $n=0$ или $n=1$ — это просто линейное уравнение; если справа другая функция от $y$.`,
      R`**How to recognize:** $y'+p(x)y=q(x)y^n$, $n\ne0,1$ ($n$ may be a fraction).

**First step:** divide by $y^n$ and put $z=y^{1-n}$: $z'+(1-n)p(x)z=(1-n)q(x)$, a linear equation.

**Watch out:**
- For $n>0$, $y\equiv0$ is also a solution and is lost by dividing.
- For fractional $n$, watch the domain of $y^{1-n}$.

**When it does not apply:** $n=0$ or $n=1$ (then it is simply linear), or when the right side is some other function of $y$.`) },
    r_riccati: { title: L('Rikkati tenglamasi (xususiy yechim ma’lum)', 'Уравнение Риккати (известно частное решение)', 'Riccati equation (a particular solution is known)'), topics: ['t04'], labs: ['L03'],
      body: L(R`**Belgisi:** $y'=a(x)y^2+b(x)y+c(x)$ va bitta yechim $y_1$ ma’lum.

**Birinchi qadam:** $y=y_1+\dfrac1z$ almashtirish: $z'=-\big(2a y_1+b\big)z-a$ — $z$ ga nisbatan chiziqli tenglama. ($y=y_1+u$ esa $n=2$ li Bernulli tenglamasini beradi.)

**Diqqat:** $y_1$ ni albatta tenglamaga qo‘yib tekshiring. $y_1$ ning o‘zi ham yechim (u $z\to\infty$ ga mos).

**Qachon ishlamaydi:** $y_1$ topilmasa — umumiy holda Rikkati tenglamasi kvadraturalarda yechilmaydi.`,
      R`**Признак:** $y'=a(x)y^2+b(x)y+c(x)$ и известно одно решение $y_1$.

**Первый шаг:** замена $y=y_1+\dfrac1z$: $z'=-\big(2a y_1+b\big)z-a$ — линейное уравнение относительно $z$. (Замена $y=y_1+u$ даёт уравнение Бернулли с $n=2$.)

**Внимание:** обязательно проверьте $y_1$ подстановкой. Само $y_1$ тоже решение (ему соответствует $z\to\infty$).

**Когда не работает:** если $y_1$ не найдено — в общем случае уравнение Риккати не интегрируется в квадратурах.`,
      R`**How to recognize:** $y'=a(x)y^2+b(x)y+c(x)$ and one solution $y_1$ is known.

**First step:** substitute $y=y_1+\dfrac1z$: $z'=-\big(2a y_1+b\big)z-a$, linear in $z$. (Substituting $y=y_1+u$ gives a Bernoulli equation with $n=2$.)

**Watch out:** always check $y_1$ by substitution. $y_1$ itself is also a solution (it corresponds to $z\to\infty$).

**When it does not apply:** without $y_1$; in general a Riccati equation cannot be solved by quadratures.`) },
    r_riccati_none: { title: L('Rikkati tenglamasi: xususiy yechim noma’lum', 'Уравнение Риккати: частное решение неизвестно', 'Riccati equation with no known solution'), topics: ['t04', 't11'], labs: ['L07'],
      body: L(R`**Halol javob:** umumiy holda Rikkati tenglamasi elementar funksiyalar va integrallar orqali yechilmaydi (Liuvill).

**Nima qilish mumkin:**
- $y_1$ ni koeffitsiyentlarga qarab taxmin qiling: $ax+b$, $a/x$, $ax^k$, $ae^{kx}$ ko‘rinishida qo‘yib, koeffitsiyentlarni tenglashtiring.
- $a,b,c$ o‘zgarmas bo‘lsa, tenglama ajraladi.
- Taxmin ishlamasa — sonli usul (RK4) va yo‘nalish maydoni.

**Diqqat:** yechim chekli $x$ da cheksizga ketishi mumkin (portlash), shuning uchun sonli hisobda qadamni kuzating.`,
      R`**Честный ответ:** в общем случае уравнение Риккати не решается через элементарные функции и интегралы (Лиувилль).

**Что можно сделать:**
- Угадайте $y_1$ по виду коэффициентов: подставьте $ax+b$, $a/x$, $ax^k$, $ae^{kx}$ и приравняйте коэффициенты.
- Если $a,b,c$ постоянные, уравнение разделяется.
- Если угадать не удаётся — численный метод (РК4) и поле направлений.

**Внимание:** решение может уходить в бесконечность при конечном $x$ (взрыв), поэтому следите за шагом.`,
      R`**Honest answer:** in general a Riccati equation cannot be solved in terms of elementary functions and integrals (Liouville).

**What you can do:**
- Guess $y_1$ from the coefficients: try $ax+b$, $a/x$, $ax^k$, $ae^{kx}$ and match coefficients.
- If $a,b,c$ are constants, the equation is separable.
- If guessing fails, use a numerical method (RK4) and the direction field.

**Watch out:** the solution may blow up at a finite $x$, so watch the step size.`) },
    r_exact: { title: L('To‘la differensialli tenglama', 'Уравнение в полных дифференциалах', 'Exact equation'), topics: ['t04'], labs: ['L03'],
      body: L(R`**Belgisi:** $M\,dx+N\,dy=0$ va $M_y=N_x$ (bir bog‘lamli sohada, $M,N$ va ularning xususiy hosilalari uzluksiz).

**Birinchi qadam:** $U_x=M$ dan $U=\int M\,dx+\varphi(y)$; keyin $U_y=N$ shartidan $\varphi'(y)$ ni toping. Umumiy integral: $U(x,y)=C$.

**Diqqat:** $\varphi'(y)$ faqat $y$ ga bog‘liq bo‘lishi kerak — aks holda hisobda xato bor. Javobni differensiallab tekshiring: $dU=M\,dx+N\,dy$.

**Qachon ishlamaydi:** $M_y\ne N_x$ bo‘lsa — integrallovchi ko‘paytuvchini qidiring.`,
      R`**Признак:** $M\,dx+N\,dy=0$ и $M_y=N_x$ (в односвязной области, $M,N$ и их частные производные непрерывны).

**Первый шаг:** из $U_x=M$: $U=\int M\,dx+\varphi(y)$; затем из $U_y=N$ найдите $\varphi'(y)$. Общий интеграл: $U(x,y)=C$.

**Внимание:** $\varphi'(y)$ должна зависеть только от $y$ — иначе в вычислениях ошибка. Проверьте дифференцированием: $dU=M\,dx+N\,dy$.

**Когда не работает:** при $M_y\ne N_x$ — ищите интегрирующий множитель.`,
      R`**How to recognize:** $M\,dx+N\,dy=0$ with $M_y=N_x$ (on a simply connected region, with $M,N$ and their partial derivatives continuous).

**First step:** from $U_x=M$, $U=\int M\,dx+\varphi(y)$; then $U_y=N$ gives $\varphi'(y)$. General integral: $U(x,y)=C$.

**Watch out:** $\varphi'(y)$ must depend on $y$ only, otherwise there is a mistake. Check by differentiating: $dU=M\,dx+N\,dy$.

**When it does not apply:** if $M_y\ne N_x$; then look for an integrating factor.`) },
    r_mux: { title: L(R`Integrallovchi ko‘paytuvchi $\mu(x)$`, R`Интегрирующий множитель $\mu(x)$`, R`Integrating factor $\mu(x)$`), topics: ['t04'], labs: ['L03'],
      body: L(R`**Belgisi:** $\dfrac{M_y-N_x}{N}=\varphi(x)$ faqat $x$ ga bog‘liq.

**Birinchi qadam:** $\mu(x)=e^{\int\varphi(x)\,dx}$. Tenglamani $\mu$ ga ko‘paytiring — u to‘la differensialli bo‘ladi; endi $M_y=N_x$ ni qayta tekshiring.

**Diqqat:** $\mu=0$ yoki $\mu$ aniqlanmagan nuqtalarda yechimlar qo‘shilishi yoki yo‘qolishi mumkin — ularni alohida tekshiring.

**Qachon ishlamaydi:** ifoda $y$ ga ham bog‘liq bo‘lsa. Unda $\mu(y)$ yoki $\mu(x+y)$, $\mu(xy)$ kabi maxsus ko‘rinishlarni sinang.`,
      R`**Признак:** $\dfrac{M_y-N_x}{N}=\varphi(x)$ зависит только от $x$.

**Первый шаг:** $\mu(x)=e^{\int\varphi(x)\,dx}$. Умножьте уравнение на $\mu$ — оно станет уравнением в полных дифференциалах; снова проверьте $M_y=N_x$.

**Внимание:** в точках, где $\mu=0$ или не определён, решения могут появиться или потеряться — проверьте их отдельно.

**Когда не работает:** если выражение зависит и от $y$. Тогда попробуйте $\mu(y)$ или специальные виды $\mu(x+y)$, $\mu(xy)$.`,
      R`**How to recognize:** $\dfrac{M_y-N_x}{N}=\varphi(x)$ depends on $x$ only.

**First step:** $\mu(x)=e^{\int\varphi(x)\,dx}$. Multiply the equation by $\mu$; it becomes exact. Re-check $M_y=N_x$.

**Watch out:** where $\mu=0$ or is undefined, solutions may be gained or lost; check those points separately.

**When it does not apply:** if the expression also depends on $y$. Then try $\mu(y)$ or special forms like $\mu(x+y)$, $\mu(xy)$.`) },
    r_muy: { title: L(R`Integrallovchi ko‘paytuvchi $\mu(y)$`, R`Интегрирующий множитель $\mu(y)$`, R`Integrating factor $\mu(y)$`), topics: ['t04'], labs: ['L03'],
      body: L(R`**Belgisi:** $\dfrac{N_x-M_y}{M}=\psi(y)$ faqat $y$ ga bog‘liq.

**Birinchi qadam:** $\mu(y)=e^{\int\psi(y)\,dy}$. Ko‘paytirgandan keyin tenglama to‘la differensialli; $M_y=N_x$ ni qayta tekshiring.

**Diqqat:** ishora: bu yerda surat $N_x-M_y$, $\mu(x)$ dagidan teskari. $\mu$ nolga aylanadigan $y$ qiymatlarini alohida tekshiring.

**Qachon ishlamaydi:** ifoda $x$ ga ham bog‘liq bo‘lsa. Umumiy holda $\mu$ ni topish xususiy hosilali tenglamani yechishga teng va oson emas.`,
      R`**Признак:** $\dfrac{N_x-M_y}{M}=\psi(y)$ зависит только от $y$.

**Первый шаг:** $\mu(y)=e^{\int\psi(y)\,dy}$. После умножения уравнение в полных дифференциалах; снова проверьте $M_y=N_x$.

**Внимание:** знак: здесь в числителе $N_x-M_y$, наоборот по сравнению с $\mu(x)$. Значения $y$, где $\mu$ обращается в ноль, проверьте отдельно.

**Когда не работает:** если выражение зависит и от $x$. В общем случае поиск $\mu$ равносилен решению уравнения в частных производных и непрост.`,
      R`**How to recognize:** $\dfrac{N_x-M_y}{M}=\psi(y)$ depends on $y$ only.

**First step:** $\mu(y)=e^{\int\psi(y)\,dy}$. After multiplying, the equation is exact; re-check $M_y=N_x$.

**Watch out:** the sign: the numerator is $N_x-M_y$, the reverse of the $\mu(x)$ test. Check separately the values of $y$ where $\mu$ vanishes.

**When it does not apply:** if the expression also depends on $x$. In general, finding $\mu$ means solving a PDE and is not easy.`) },
    r_first_other: { title: L('Standart tur topilmadi (1-tartib)', 'Стандартный тип не найден (1-й порядок)', 'No standard type found (first order)'), topics: ['t01', 't04', 't11'], labs: ['L01', 'L07'],
      body: L(R`**Halol javob:** ko‘p birinchi tartibli tenglamalar yopiq formulada yechilmaydi.

**Yana nimani sinash mumkin:**
- $x$ ni $y$ ning funksiyasi deb qarang: $\dfrac{dx}{dy}=\dfrac{1}{f(x,y)}$ chiziqli yoki Bernulli bo‘lib qolishi mumkin.
- Umumlashgan bir jinsli: $y=z^m$ almashtirish (darajalarni tenglashtiring).
- $\mu(x+y)$, $\mu(xy)$, $\mu(x^ay^b)$ ko‘rinishidagi integrallovchi ko‘paytuvchi.

**Agar bular yordam bermasa:** mavjudlik–yagonalik shartlarini tekshiring, keyin yo‘nalish maydoni va sonli usuldan foydalaning.`,
      R`**Честный ответ:** многие уравнения первого порядка не решаются в замкнутом виде.

**Что ещё можно попробовать:**
- Считайте $x$ функцией от $y$: $\dfrac{dx}{dy}=\dfrac{1}{f(x,y)}$ может оказаться линейным или уравнением Бернулли.
- Обобщённо однородное: замена $y=z^m$ (приравняйте степени).
- Интегрирующий множитель вида $\mu(x+y)$, $\mu(xy)$, $\mu(x^ay^b)$.

**Если не помогло:** проверьте условия существования и единственности, затем используйте поле направлений и численный метод.`,
      R`**Honest answer:** many first-order equations have no closed-form solution.

**What else to try:**
- Regard $x$ as a function of $y$: $\dfrac{dx}{dy}=\dfrac{1}{f(x,y)}$ may be linear or Bernoulli.
- Generalized homogeneous: substitute $y=z^m$ (match the powers).
- An integrating factor of the form $\mu(x+y)$, $\mu(xy)$, $\mu(x^ay^b)$.

**If none helps:** check the existence and uniqueness hypotheses, then use the direction field and a numerical method.`) },
    r_clairaut: { title: L('Klero tenglamasi', 'Уравнение Клеро', 'Clairaut equation'), topics: ['t05'],
      body: L(R`**Belgisi:** $y=xp+\psi(p)$, $p=y'$.

**Birinchi qadam:** $x$ bo‘yicha differensiallang: $\big(x+\psi'(p)\big)p'=0$.
- $p'=0\Rightarrow p=C$: umumiy yechim $y=Cx+\psi(C)$ — to‘g‘ri chiziqlar oilasi.
- $x+\psi'(p)=0$: parametrik maxsus yechim $x=-\psi'(p)$, $y=-p\psi'(p)+\psi(p)$ — to‘g‘ri chiziqlarning o‘ramasi.

**Diqqat:** maxsus yechim umumiy formuladan hech bir $C$ da chiqmaydi; uni yo‘qotmang. $\psi$ chiziqli bo‘lsa, o‘rama yo‘q.

**Qachon ishlamaydi:** $x$ oldida $p$ emas, boshqa $\varphi(p)$ tursa — bu Lagranj tenglamasi.`,
      R`**Признак:** $y=xp+\psi(p)$, $p=y'$.

**Первый шаг:** продифференцируйте по $x$: $\big(x+\psi'(p)\big)p'=0$.
- $p'=0\Rightarrow p=C$: общее решение $y=Cx+\psi(C)$ — семейство прямых.
- $x+\psi'(p)=0$: особое решение в параметрическом виде $x=-\psi'(p)$, $y=-p\psi'(p)+\psi(p)$ — огибающая прямых.

**Внимание:** особое решение не получается из общей формулы ни при каком $C$; не теряйте его. Если $\psi$ линейна, огибающей нет.

**Когда не работает:** если при $x$ стоит не $p$, а другая $\varphi(p)$ — это уравнение Лагранжа.`,
      R`**How to recognize:** $y=xp+\psi(p)$, $p=y'$.

**First step:** differentiate in $x$: $\big(x+\psi'(p)\big)p'=0$.
- $p'=0\Rightarrow p=C$: general solution $y=Cx+\psi(C)$, a family of lines.
- $x+\psi'(p)=0$: singular solution in parametric form $x=-\psi'(p)$, $y=-p\psi'(p)+\psi(p)$, the envelope of the lines.

**Watch out:** the singular solution is not obtained from the general formula for any $C$; do not lose it. If $\psi$ is linear there is no envelope.

**When it does not apply:** if the coefficient of $x$ is some $\varphi(p)$ other than $p$; that is a Lagrange equation.`) },
    r_lagrange: { title: L('Lagranj tenglamasi', 'Уравнение Лагранжа', 'Lagrange equation'), topics: ['t05'],
      body: L(R`**Belgisi:** $y=x\varphi(p)+\psi(p)$, $\varphi(p)\not\equiv p$.

**Birinchi qadam:** $x$ bo‘yicha differensiallang: $p=\varphi(p)+\big(x\varphi'(p)+\psi'(p)\big)\dfrac{dp}{dx}$. $x$ ni $p$ ning funksiyasi deb qarasak,
$$\big(p-\varphi(p)\big)\frac{dx}{dp}=x\varphi'(p)+\psi'(p)$$
— $x(p)$ ga nisbatan chiziqli. Yechim parametrik: $x=x(p,C)$, $y=x\varphi(p)+\psi(p)$.

**Diqqat:** $p_0=\varphi(p_0)$ ildizlari $y=x\varphi(p_0)+\psi(p_0)$ to‘g‘ri chiziqlarni beradi — ular maxsus bo‘lishi mumkin; alohida tekshiring.

**Qachon ishlamaydi:** $\varphi(p)\equiv p$ (Klero) yoki $y$ ni $p$ va $x$ orqali shunday chiziqli ko‘rinishda yozib bo‘lmasa.`,
      R`**Признак:** $y=x\varphi(p)+\psi(p)$, $\varphi(p)\not\equiv p$.

**Первый шаг:** продифференцируйте по $x$: $p=\varphi(p)+\big(x\varphi'(p)+\psi'(p)\big)\dfrac{dp}{dx}$. Считая $x$ функцией от $p$,
$$\big(p-\varphi(p)\big)\frac{dx}{dp}=x\varphi'(p)+\psi'(p)$$
— линейное уравнение для $x(p)$. Решение параметрическое: $x=x(p,C)$, $y=x\varphi(p)+\psi(p)$.

**Внимание:** корни $p_0=\varphi(p_0)$ дают прямые $y=x\varphi(p_0)+\psi(p_0)$ — они могут быть особыми; проверьте отдельно.

**Когда не работает:** при $\varphi(p)\equiv p$ (Клеро) или если $y$ нельзя записать в таком линейном по $x$ виде.`,
      R`**How to recognize:** $y=x\varphi(p)+\psi(p)$, $\varphi(p)\not\equiv p$.

**First step:** differentiate in $x$: $p=\varphi(p)+\big(x\varphi'(p)+\psi'(p)\big)\dfrac{dp}{dx}$. Treating $x$ as a function of $p$,
$$\big(p-\varphi(p)\big)\frac{dx}{dp}=x\varphi'(p)+\psi'(p),$$
which is linear in $x(p)$. The solution is parametric: $x=x(p,C)$, $y=x\varphi(p)+\psi(p)$.

**Watch out:** roots of $p_0=\varphi(p_0)$ give lines $y=x\varphi(p_0)+\psi(p_0)$, which may be singular; check them separately.

**When it does not apply:** if $\varphi(p)\equiv p$ (Clairaut) or $y$ cannot be written in this form, linear in $x$.`) },
    r_param: { title: L('Parametr kiritish usuli', 'Метод введения параметра', 'Introducing a parameter'), topics: ['t05'],
      body: L(R`**Belgisi:** $F(x,y,y')=0$, $y'$ ga nisbatan oson yechilmaydi, lekin $y$ yoki $x$ ga nisbatan yechiladi.

**Birinchi qadam:**
- $p$ ga nisbatan yechilsa ($p=f_1(x,y)$, $p=f_2(x,y)$, …) — har bir tarmoqni oddiy tenglama sifatida yeching.
- $y=f(x,p)$: differensiallang, $p=f_x+f_p\,\dfrac{dp}{dx}$ — $x$ va $p$ dagi tenglama.
- $x=f(y,p)$: $\dfrac1p=f_y+f_p\,\dfrac{dp}{dy}$ — $y$ va $p$ dagi tenglama.

**Diqqat:** natija ko‘pincha parametrik ko‘rinishda; $p$ ni yo‘qotish shart emas. $F=0$, $F_p=0$ dan $p$-diskriminant chizig‘i chiqadi — u maxsus yechim bo‘lishi mumkin, lekin buni tenglamaga qo‘yib tekshirish kerak.

**Qachon ishlamaydi:** hosil bo‘lgan tenglama ham yechilmasa — sonli usul.`,
      R`**Признак:** $F(x,y,y')=0$ не разрешается легко относительно $y'$, но разрешается относительно $y$ или $x$.

**Первый шаг:**
- Если разрешается относительно $p$ ($p=f_1(x,y)$, $p=f_2(x,y)$, …) — решите каждую ветвь как обычное уравнение.
- $y=f(x,p)$: продифференцируйте, $p=f_x+f_p\,\dfrac{dp}{dx}$ — уравнение для $x$ и $p$.
- $x=f(y,p)$: $\dfrac1p=f_y+f_p\,\dfrac{dp}{dy}$ — уравнение для $y$ и $p$.

**Внимание:** ответ часто параметрический; исключать $p$ не обязательно. Из $F=0$, $F_p=0$ получается $p$-дискриминантная кривая — она может быть особым решением, но это проверяют подстановкой.

**Когда не работает:** если и полученное уравнение не решается — численный метод.`,
      R`**How to recognize:** $F(x,y,y')=0$ is hard to solve for $y'$ but can be solved for $y$ or $x$.

**First step:**
- If it can be solved for $p$ ($p=f_1(x,y)$, $p=f_2(x,y)$, …), solve each branch as an ordinary equation.
- $y=f(x,p)$: differentiate, $p=f_x+f_p\,\dfrac{dp}{dx}$, an equation in $x$ and $p$.
- $x=f(y,p)$: $\dfrac1p=f_y+f_p\,\dfrac{dp}{dy}$, an equation in $y$ and $p$.

**Watch out:** the answer is often parametric; you need not eliminate $p$. $F=0$, $F_p=0$ give the $p$-discriminant curve; it may be a singular solution, but check by substitution.

**When it does not apply:** if the resulting equation cannot be solved either; then use a numerical method.`) },
    r_repint: { title: L(R`$y^{(n)}=f(x)$: ketma-ket integrallash`, R`$y^{(n)}=f(x)$: последовательное интегрирование`, R`$y^{(n)}=f(x)$: repeated integration`), topics: ['t06'],
      body: L(R`**Belgisi:** faqat eng yuqori hosila va $x$.

**Birinchi qadam:** $n$ marta integrallang; har safar yangi o‘zgarmas qo‘shing — jami $C_1,\dots,C_n$.

**Diqqat:** Koshi masalasida o‘zgarmaslarni har bosqichda topish qulay: $y^{(n-1)}(x_0)$, keyin $y^{(n-2)}(x_0)$, …

**Qachon ishlamaydi:** o‘ng tomonda $y$ yoki uning past hosilalari bo‘lsa.`,
      R`**Признак:** только старшая производная и $x$.

**Первый шаг:** проинтегрируйте $n$ раз; каждый раз добавляйте новую постоянную — всего $C_1,\dots,C_n$.

**Внимание:** в задаче Коши постоянные удобно находить на каждом шаге: $y^{(n-1)}(x_0)$, затем $y^{(n-2)}(x_0)$, …

**Когда не работает:** если справа есть $y$ или его младшие производные.`,
      R`**How to recognize:** only the highest derivative and $x$ appear.

**First step:** integrate $n$ times, adding a new constant each time: $C_1,\dots,C_n$ in total.

**Watch out:** in a Cauchy problem it is convenient to fix constants at each stage: $y^{(n-1)}(x_0)$, then $y^{(n-2)}(x_0)$, …

**When it does not apply:** if the right side contains $y$ or its lower derivatives.`) },
    r_noy: { title: L(R`$y$ qatnashmaydi: tartibni pasaytirish`, R`Нет $y$: понижение порядка`, R`No $y$: reduction of order`), topics: ['t06'],
      body: L(R`**Belgisi:** $F(x,y^{(k)},\dots,y^{(n)})=0$, $y,\dots,y^{(k-1)}$ yo‘q (masalan $xy''=y'$).

**Birinchi qadam:** $z=y^{(k)}$ deb oling; tartib $k$ ga kamayadi. $z$ ni topgach, $k$ marta integrallang.

**Diqqat:** har bir integrallashda o‘zgarmas qo‘shing; $z$ ga bo‘lganda $z\equiv0$ yechimini yo‘qotmang.

**Qachon ishlamaydi:** $y$ oshkor qatnashsa — $x$ yo‘qligini yoki bir jinslilikni tekshiring.`,
      R`**Признак:** $F(x,y^{(k)},\dots,y^{(n)})=0$, нет $y,\dots,y^{(k-1)}$ (например, $xy''=y'$).

**Первый шаг:** положите $z=y^{(k)}$; порядок понижается на $k$. Найдя $z$, проинтегрируйте $k$ раз.

**Внимание:** на каждом интегрировании добавляйте постоянную; при делении на $z$ не теряйте решение $z\equiv0$.

**Когда не работает:** если $y$ входит явно — проверьте отсутствие $x$ или однородность.`,
      R`**How to recognize:** $F(x,y^{(k)},\dots,y^{(n)})=0$ with no $y,\dots,y^{(k-1)}$ (e.g. $xy''=y'$).

**First step:** put $z=y^{(k)}$; the order drops by $k$. Once $z$ is found, integrate $k$ times.

**Watch out:** add a constant at every integration; when dividing by $z$ do not lose $z\equiv0$.

**When it does not apply:** if $y$ occurs explicitly; then check for missing $x$ or homogeneity.`) },
    r_nox: { title: L(R`$x$ qatnashmaydi (avtonom): $y'=p(y)$`, R`Нет $x$ (автономное): $y'=p(y)$`, R`No $x$ (autonomous): $y'=p(y)$`), topics: ['t06'],
      body: L(R`**Belgisi:** $F(y,y',y'')=0$ (masalan $yy''=(y')^2$, $y''=-\sin y$).

**Birinchi qadam:** $y'=p(y)$, $y''=p\dfrac{dp}{dy}$. Tenglama $y$ va $p$ dagi birinchi tartibli tenglamaga aylanadi. Keyin $\dfrac{dy}{p(y)}=dx$.

**Diqqat:** $p\equiv0$, ya’ni $y\equiv\text{const}$ yechimlarni alohida yozing — $p$ ga bo‘lganda ular yo‘qoladi.

**Qachon ishlamaydi:** $x$ oshkor qatnashsa. Chiziqli tenglamada esa xarakteristik tenglama yoki boshqa usul qulayroq.`,
      R`**Признак:** $F(y,y',y'')=0$ (например, $yy''=(y')^2$, $y''=-\sin y$).

**Первый шаг:** $y'=p(y)$, $y''=p\dfrac{dp}{dy}$. Получается уравнение первого порядка в $y$ и $p$. Затем $\dfrac{dy}{p(y)}=dx$.

**Внимание:** решения $p\equiv0$, т. е. $y\equiv\text{const}$, выпишите отдельно — при делении на $p$ они теряются.

**Когда не работает:** если $x$ входит явно. Для линейного уравнения удобнее характеристическое уравнение или другой метод.`,
      R`**How to recognize:** $F(y,y',y'')=0$ (e.g. $yy''=(y')^2$, $y''=-\sin y$).

**First step:** $y'=p(y)$, $y''=p\dfrac{dp}{dy}$. You get a first-order equation in $y$ and $p$; then $\dfrac{dy}{p(y)}=dx$.

**Watch out:** list the solutions $p\equiv0$, i.e. $y\equiv\text{const}$, separately; dividing by $p$ loses them.

**When it does not apply:** if $x$ occurs explicitly. For a linear equation the characteristic equation or another method is more convenient.`) },
    r_genhom: { title: L(R`$y,y',y''$ ga nisbatan bir jinsli tenglama`, R`Уравнение, однородное по $y,y',y''$`, R`Equation homogeneous in $y,y',y''$`), topics: ['t06'],
      body: L(R`**Belgisi:** $F(x,ty,ty',ty'')=t^kF(x,y,y',y'')$ (masalan $xyy''-x(y')^2=yy'$).

**Birinchi qadam:** $y'=yz(x)$, ya’ni $y=e^{\int z\,dx}$; $y''=y(z'+z^2)$. $y^k$ ga qisqartirgach, $z$ uchun birinchi tartibli tenglama qoladi.

**Diqqat:** $y\equiv0$ yechimini alohida tekshiring.

**Qachon ishlamaydi:** daraja sharti bajarilmasa. Umumlashgan bir jinsli holatda $x=e^t$, $y=e^{mt}u(t)$ almashtirishni sinang.`,
      R`**Признак:** $F(x,ty,ty',ty'')=t^kF(x,y,y',y'')$ (например, $xyy''-x(y')^2=yy'$).

**Первый шаг:** $y'=yz(x)$, т. е. $y=e^{\int z\,dx}$; $y''=y(z'+z^2)$. После сокращения на $y^k$ остаётся уравнение первого порядка для $z$.

**Внимание:** решение $y\equiv0$ проверьте отдельно.

**Когда не работает:** если условие однородности не выполнено. В обобщённо однородном случае попробуйте $x=e^t$, $y=e^{mt}u(t)$.`,
      R`**How to recognize:** $F(x,ty,ty',ty'')=t^kF(x,y,y',y'')$ (e.g. $xyy''-x(y')^2=yy'$).

**First step:** $y'=yz(x)$, i.e. $y=e^{\int z\,dx}$; $y''=y(z'+z^2)$. After cancelling $y^k$ a first-order equation for $z$ remains.

**Watch out:** check $y\equiv0$ separately.

**When it does not apply:** if the homogeneity condition fails. In the generalized homogeneous case try $x=e^t$, $y=e^{mt}u(t)$.`) },
    r_char: { title: L('Xarakteristik tenglama', 'Характеристическое уравнение', 'Characteristic equation'), topics: ['t08'], labs: ['L05'],
      body: L(R`**Belgisi:** $a_0y^{(n)}+a_1y^{(n-1)}+\dots+a_ny=0$, $a_k$ — o‘zgarmas sonlar.

**Birinchi qadam:** $y=e^{kx}$ qo‘ying: $a_0k^n+\dots+a_n=0$. Ildizlar bo‘yicha:
- haqiqiy oddiy $k$: $e^{kx}$;
- karrali $k$ (karrali $m$): $e^{kx},xe^{kx},\dots,x^{m-1}e^{kx}$;
- $\alpha\pm i\beta$: $e^{\alpha x}\cos\beta x$, $e^{\alpha x}\sin\beta x$ (karrali bo‘lsa, $x^j$ ga ko‘paytiring).

**Diqqat:** fundamental sistemada jami $n$ ta funksiya bo‘lishi kerak. Ildizlarni tenglamaga qo‘yib tekshiring.

**Qachon ishlamaydi:** koeffitsiyentlar $x$ ga bog‘liq bo‘lsa ($e^{kx}$ umuman yechim bo‘lmaydi). Istisno — Eyler–Koshi tenglamasi.`,
      R`**Признак:** $a_0y^{(n)}+a_1y^{(n-1)}+\dots+a_ny=0$, $a_k$ — постоянные числа.

**Первый шаг:** подставьте $y=e^{kx}$: $a_0k^n+\dots+a_n=0$. По корням:
- простой действительный $k$: $e^{kx}$;
- кратный $k$ (кратности $m$): $e^{kx},xe^{kx},\dots,x^{m-1}e^{kx}$;
- $\alpha\pm i\beta$: $e^{\alpha x}\cos\beta x$, $e^{\alpha x}\sin\beta x$ (при кратности умножайте на $x^j$).

**Внимание:** в фундаментальной системе ровно $n$ функций. Проверьте корни подстановкой.

**Когда не работает:** если коэффициенты зависят от $x$ ($e^{kx}$ вообще не решение). Исключение — уравнение Эйлера–Коши.`,
      R`**How to recognize:** $a_0y^{(n)}+a_1y^{(n-1)}+\dots+a_ny=0$ with constant numbers $a_k$.

**First step:** substitute $y=e^{kx}$: $a_0k^n+\dots+a_n=0$. By the roots:
- simple real $k$: $e^{kx}$;
- repeated $k$ of multiplicity $m$: $e^{kx},xe^{kx},\dots,x^{m-1}e^{kx}$;
- $\alpha\pm i\beta$: $e^{\alpha x}\cos\beta x$, $e^{\alpha x}\sin\beta x$ (multiply by $x^j$ if repeated).

**Watch out:** a fundamental set has exactly $n$ functions. Check the roots by substitution.

**When it does not apply:** if the coefficients depend on $x$ (then $e^{kx}$ is generally not a solution). The exception is the Euler–Cauchy equation.`) },
    r_undet: { title: L('Noma’lum koeffitsiyentlar usuli', 'Метод неопределённых коэффициентов', 'Method of undetermined coefficients'), topics: ['t09', 't08'], labs: ['L06', 'L05'],
      body: L(R`**Belgisi:** o‘zgarmas koeffitsiyentlar **va** $f(x)=e^{\alpha x}\big(P_m(x)\cos\beta x+Q_l(x)\sin\beta x\big)$ (yoki shunday hadlar yig‘indisi).

**Birinchi qadam:** avval bir jinsli tenglamani yeching (xarakteristik tenglama). $\sigma=\alpha+i\beta$ xarakteristik tenglamaning $s$ karrali ildizi bo‘lsa ($s=0$ — ildiz emas),
$$y_p=x^s e^{\alpha x}\big(R_N(x)\cos\beta x+S_N(x)\sin\beta x\big),\quad N=\max(m,l).$$
Noma’lum koeffitsiyentlarni qo‘yib topasiz; $y=y_0+y_p$.

**Diqqat:**
- Rezonans: $\sigma$ ildiz bo‘lsa $x^s$ ko‘paytuvchini unutmang — aks holda tenglamalar sistemasi yechimsiz chiqadi.
- $\beta\ne0$ bo‘lsa, $f$ da faqat $\cos$ bo‘lsa ham $\cos$ va $\sin$ ikkalasini oling.
- Yig‘indi uchun har bir hadga alohida $y_p$ (superpozitsiya).

**Qachon ishlamaydi:** $f=\tan x$, $1/x$, $\ln x$ va hokazo yoki koeffitsiyentlar o‘zgaruvchan — o‘zgarmaslarni variatsiyalang.`,
      R`**Признак:** постоянные коэффициенты **и** $f(x)=e^{\alpha x}\big(P_m(x)\cos\beta x+Q_l(x)\sin\beta x\big)$ (или сумма таких слагаемых).

**Первый шаг:** сначала решите однородное уравнение (характеристическое уравнение). Если $\sigma=\alpha+i\beta$ — корень кратности $s$ ($s=0$, если не корень),
$$y_p=x^s e^{\alpha x}\big(R_N(x)\cos\beta x+S_N(x)\sin\beta x\big),\quad N=\max(m,l).$$
Коэффициенты находите подстановкой; $y=y_0+y_p$.

**Внимание:**
- Резонанс: если $\sigma$ — корень, не забудьте множитель $x^s$, иначе система для коэффициентов несовместна.
- При $\beta\ne0$ берите и $\cos$, и $\sin$, даже если в $f$ только $\cos$.
- Для суммы — отдельное $y_p$ для каждого слагаемого (суперпозиция).

**Когда не работает:** при $f=\tan x$, $1/x$, $\ln x$ и т. п. или переменных коэффициентах — используйте вариацию постоянных.`,
      R`**How to recognize:** constant coefficients **and** $f(x)=e^{\alpha x}\big(P_m(x)\cos\beta x+Q_l(x)\sin\beta x\big)$ (or a sum of such terms).

**First step:** solve the homogeneous equation first (characteristic equation). If $\sigma=\alpha+i\beta$ is a root of multiplicity $s$ ($s=0$ if it is not a root),
$$y_p=x^s e^{\alpha x}\big(R_N(x)\cos\beta x+S_N(x)\sin\beta x\big),\quad N=\max(m,l).$$
Find the coefficients by substitution; $y=y_0+y_p$.

**Watch out:**
- Resonance: if $\sigma$ is a root, include the factor $x^s$, otherwise the system for the coefficients has no solution.
- For $\beta\ne0$ take both $\cos$ and $\sin$ even if $f$ has only $\cos$.
- For a sum, find a separate $y_p$ for each term (superposition).

**When it does not apply:** $f=\tan x$, $1/x$, $\ln x$ and so on, or variable coefficients; use variation of parameters.`) },
    r_varpar: { title: L('O‘zgarmaslarni variatsiyalash', 'Вариация постоянных', 'Variation of parameters'), topics: ['t10'],
      body: L(R`**Belgisi:** $y''+p(x)y'+q(x)y=f(x)$, bir jinsli tenglamaning fundamental yechimlar sistemasi $y_1,y_2$ ma’lum (yoki topiladi), $f$ ixtiyoriy uzluksiz.

**Birinchi qadam:** $y=C_1(x)y_1+C_2(x)y_2$,
$$C_1'y_1+C_2'y_2=0,\qquad C_1'y_1'+C_2'y_2'=f(x).$$
Yechim: $C_1'=-\dfrac{y_2f}{W}$, $C_2'=\dfrac{y_1f}{W}$, $W=y_1y_2'-y_1'y_2$.

**Diqqat:** formula $y''$ oldidagi koeffitsiyent 1 bo‘lganda to‘g‘ri — avval bo‘ling. Integrallardagi o‘zgarmaslar umumiy yechimni beradi.

**Qachon ishlamaydi:** fundamental sistema noma’lum bo‘lsa (o‘zgaruvchan koeffitsiyentlarda uni topish asosiy qiyinchilik), yoki tenglama chiziqsiz bo‘lsa. Maxsus o‘ng tomonda noma’lum koeffitsiyentlar odatda tezroq.`,
      R`**Признак:** $y''+p(x)y'+q(x)y=f(x)$, известна (или находится) фундаментальная система $y_1,y_2$ однородного уравнения, $f$ — любая непрерывная.

**Первый шаг:** $y=C_1(x)y_1+C_2(x)y_2$,
$$C_1'y_1+C_2'y_2=0,\qquad C_1'y_1'+C_2'y_2'=f(x).$$
Отсюда $C_1'=-\dfrac{y_2f}{W}$, $C_2'=\dfrac{y_1f}{W}$, $W=y_1y_2'-y_1'y_2$.

**Внимание:** формулы верны, когда коэффициент при $y''$ равен 1 — сначала разделите. Постоянные интегрирования дают общее решение.

**Когда не работает:** если фундаментальная система неизвестна (при переменных коэффициентах это главная трудность) или уравнение нелинейно. При специальной правой части метод неопределённых коэффициентов обычно быстрее.`,
      R`**How to recognize:** $y''+p(x)y'+q(x)y=f(x)$, a fundamental set $y_1,y_2$ of the homogeneous equation is known (or can be found), $f$ is any continuous function.

**First step:** $y=C_1(x)y_1+C_2(x)y_2$ with
$$C_1'y_1+C_2'y_2=0,\qquad C_1'y_1'+C_2'y_2'=f(x).$$
Hence $C_1'=-\dfrac{y_2f}{W}$, $C_2'=\dfrac{y_1f}{W}$, $W=y_1y_2'-y_1'y_2$.

**Watch out:** the formulas assume the coefficient of $y''$ is 1; divide first. The constants of integration give the general solution.

**When it does not apply:** if no fundamental set is known (the main difficulty for variable coefficients) or the equation is nonlinear. For a special right side, undetermined coefficients is usually faster.`) },
    r_laplace: { title: L('Laplas almashtirishi (qo‘shimcha modul)', 'Преобразование Лапласа (доп. модуль)', 'Laplace transform (extra module)'), topics: ['tL'], labs: ['L12'],
      body: L(R`**Belgisi:** o‘zgarmas koeffitsiyentli chiziqli tenglama yoki sistema, shartlar $t=0$ da berilgan, o‘ng tomon bo‘lakli-uzluksiz, pog‘ona $u(t-a)$ yoki impuls $\delta(t-a)$.

**Birinchi qadam:** ikkala tomonga $\mathcal L$ qo‘llang: $\mathcal L\{y'\}=sY-y(0)$, $\mathcal L\{y''\}=s^2Y-sy(0)-y'(0)$. $Y(s)$ ni algebraik toping, sodda kasrlarga ajratib, jadval bo‘yicha qaytaring.

**Diqqat:** $\mathcal L\{u(t-a)f(t-a)\}=e^{-as}F(s)$ — siljishni to‘g‘ri yozing. Boshlang‘ich shartlar avtomatik kiradi, alohida o‘zgarmaslar kerak emas.

**Qachon ishlamaydi:** chiziqsiz tenglamalar; umumiy o‘zgaruvchan koeffitsiyentlar; shartlar boshqa nuqtada (chegaraviy masala) — bu holda usul noqulay. Mavzu ma’ruzalar rejasida yo‘q, ilovada qo‘shimcha modul sifatida berilgan.`,
      R`**Признак:** линейное уравнение или система с постоянными коэффициентами, условия при $t=0$, правая часть кусочно-непрерывная, ступенька $u(t-a)$ или импульс $\delta(t-a)$.

**Первый шаг:** примените $\mathcal L$ к обеим частям: $\mathcal L\{y'\}=sY-y(0)$, $\mathcal L\{y''\}=s^2Y-sy(0)-y'(0)$. Найдите $Y(s)$ алгебраически, разложите на простейшие дроби и вернитесь по таблице.

**Внимание:** $\mathcal L\{u(t-a)f(t-a)\}=e^{-as}F(s)$ — правильно записывайте сдвиг. Начальные условия входят автоматически, отдельные постоянные не нужны.

**Когда не работает:** нелинейные уравнения; общие переменные коэффициенты; условия в другой точке (краевая задача) — метод неудобен. Темы нет в плане лекций, в приложении это дополнительный модуль.`,
      R`**How to recognize:** a linear equation or system with constant coefficients, conditions given at $t=0$, a piecewise continuous input, a step $u(t-a)$ or an impulse $\delta(t-a)$.

**First step:** apply $\mathcal L$ to both sides: $\mathcal L\{y'\}=sY-y(0)$, $\mathcal L\{y''\}=s^2Y-sy(0)-y'(0)$. Solve for $Y(s)$ algebraically, split into partial fractions and invert using the table.

**Watch out:** $\mathcal L\{u(t-a)f(t-a)\}=e^{-as}F(s)$; write the shift correctly. Initial conditions enter automatically, no separate constants are needed.

**When it does not apply:** nonlinear equations; general variable coefficients; conditions at another point (boundary value problems), where it is awkward. The topic is not in the lecture plan; the app offers it as an extra module.`) },
    r_euler: { title: L('Eyler–Koshi tenglamasi', 'Уравнение Эйлера–Коши', 'Euler–Cauchy equation'), topics: ['t08', 't10'], labs: ['L05'],
      body: L(R`**Belgisi:** $x^2y''+axy'+by=f(x)$: $y^{(k)}$ oldida $x^k$ (o‘zgarmas ko‘paytuvchi bilan).

**Birinchi qadam:** $x>0$ da $x=e^t$: $x y'=\dot y$, $x^2y''=\ddot y-\dot y$. Natija o‘zgarmas koeffitsiyentli tenglama:
$$\ddot y+(a-1)\dot y+by=f(e^t).$$
Yoki bevosita $y=x^r$: $r(r-1)+ar+b=0$.

**Diqqat:** karrali ildizda $x^r\ln x$; kompleks $\alpha\pm i\beta$ da $x^\alpha\cos(\beta\ln x)$, $x^\alpha\sin(\beta\ln x)$. $x<0$ da $|x|$ oling; $x=0$ maxsus nuqta.

**Qachon ishlamaydi:** daraja $x$ ning hosila tartibiga mos kelmasa (masalan $x y''+y=0$) — darajali qator yoki boshqa usul kerak.`,
      R`**Признак:** $x^2y''+axy'+by=f(x)$: при $y^{(k)}$ стоит $x^k$ (с постоянным множителем).

**Первый шаг:** при $x>0$ замена $x=e^t$: $x y'=\dot y$, $x^2y''=\ddot y-\dot y$. Получаем уравнение с постоянными коэффициентами:
$$\ddot y+(a-1)\dot y+by=f(e^t).$$
Или сразу $y=x^r$: $r(r-1)+ar+b=0$.

**Внимание:** при кратном корне $x^r\ln x$; при комплексных $\alpha\pm i\beta$ — $x^\alpha\cos(\beta\ln x)$, $x^\alpha\sin(\beta\ln x)$. При $x<0$ берите $|x|$; $x=0$ — особая точка.

**Когда не работает:** если степень $x$ не совпадает с порядком производной (например, $x y''+y=0$) — нужен степенной ряд или другой метод.`,
      R`**How to recognize:** $x^2y''+axy'+by=f(x)$: the coefficient of $y^{(k)}$ is $x^k$ (times a constant).

**First step:** for $x>0$ put $x=e^t$: $x y'=\dot y$, $x^2y''=\ddot y-\dot y$. This gives a constant-coefficient equation:
$$\ddot y+(a-1)\dot y+by=f(e^t).$$
Or directly try $y=x^r$: $r(r-1)+ar+b=0$.

**Watch out:** a repeated root gives $x^r\ln x$; complex roots $\alpha\pm i\beta$ give $x^\alpha\cos(\beta\ln x)$, $x^\alpha\sin(\beta\ln x)$. For $x<0$ use $|x|$; $x=0$ is a singular point.

**When it does not apply:** if the power of $x$ does not match the order of the derivative (e.g. $x y''+y=0$); then a power series or another method is needed.`) },
    r_reduce: { title: L('Ma’lum yechim orqali tartibni pasaytirish (Ostrogradskiy–Liuvill)', 'Понижение порядка по известному решению (Остроградский–Лиувилль)', 'Reduction of order from a known solution (Abel–Liouville)'), topics: ['t10', 't07', 't06'],
      body: L(R`**Belgisi:** $y''+p(x)y'+q(x)y=0$ va bitta noldan farqli yechim $y_1$ ma’lum (ko‘pincha taxmin qilinadi: $x^k$, $e^{kx}$, ko‘phad).

**Birinchi qadam:** Ostrogradskiy–Liuvill formulasi $W=Ce^{-\int p\,dx}$ dan
$$y_2=y_1\int\frac{e^{-\int p\,dx}}{y_1^2}\,dx.$$
(Yoki $y=y_1u$ almashtirish — $u'$ uchun birinchi tartibli tenglama.)

**Diqqat:** $p$ — $y''$ oldidagi koeffitsiyent 1 bo‘lgandagi $y'$ koeffitsiyenti. $y_1=0$ nuqtalaridan qochib, oraliqni ko‘rsating. Bir jinsli bo‘lmagan tenglama uchun keyin o‘zgarmaslarni variatsiyalang.

**Qachon ishlamaydi:** $y_1$ topilmasa — darajali qator yoki sonli usul.`,
      R`**Признак:** $y''+p(x)y'+q(x)y=0$ и известно одно ненулевое решение $y_1$ (часто угадывается: $x^k$, $e^{kx}$, многочлен).

**Первый шаг:** из формулы Остроградского–Лиувилля $W=Ce^{-\int p\,dx}$
$$y_2=y_1\int\frac{e^{-\int p\,dx}}{y_1^2}\,dx.$$
(Или замена $y=y_1u$ — уравнение первого порядка для $u'$.)

**Внимание:** $p$ — коэффициент при $y'$ после деления на коэффициент при $y''$. Избегайте нулей $y_1$, укажите интервал. Для неоднородного уравнения далее — вариация постоянных.

**Когда не работает:** если $y_1$ не найдено — степенной ряд или численный метод.`,
      R`**How to recognize:** $y''+p(x)y'+q(x)y=0$ and one nonzero solution $y_1$ is known (often guessed: $x^k$, $e^{kx}$, a polynomial).

**First step:** from the Abel (Ostrogradsky–Liouville) formula $W=Ce^{-\int p\,dx}$,
$$y_2=y_1\int\frac{e^{-\int p\,dx}}{y_1^2}\,dx.$$
(Or substitute $y=y_1u$, which gives a first-order equation for $u'$.)

**Watch out:** $p$ is the coefficient of $y'$ after dividing by the coefficient of $y''$. Avoid zeros of $y_1$ and state the interval. For a nonhomogeneous equation continue with variation of parameters.

**When it does not apply:** if no $y_1$ can be found; then use a power series or a numerical method.`) },
    r_series: { title: L('Darajali qatorlar (oddiy nuqta atrofida)', 'Степенные ряды (около обыкновенной точки)', 'Power series near an ordinary point'), topics: ['t09'],
      body: L(R`**Belgisi:** $P(x)y''+Q(x)y'+R(x)y=0$, $P(x_0)\ne0$ va $Q/P$, $R/P$ $x_0$ atrofida darajali qatorga yoyiladi ($x_0$ — oddiy nuqta).

**Birinchi qadam:** $y=\sum_{n\ge0}c_n(x-x_0)^n$ ni qo‘ying, bir xil darajalarni yig‘ib, rekurrent formulani toping; $c_0=y(x_0)$, $c_1=y'(x_0)$ erkin.

**Diqqat:** indekslarni siljitganda chegaralarni to‘g‘ri yozing. Qator kamida $x_0$ dan eng yaqin maxsus nuqtagacha (kompleks ham) bo‘lgan masofada yaqinlashadi.

**Qachon ishlamaydi:** $x_0$ maxsus nuqta ($P(x_0)=0$) bo‘lsa, oddiy qator yaramasligi mumkin — Frobenius usuli kerak (kurs doirasidan tashqari). Tenglama chiziqsiz bo‘lsa, Teylor qatori Koshi masalasi uchun bir necha hadni beradi, xolos.`,
      R`**Признак:** $P(x)y''+Q(x)y'+R(x)y=0$, $P(x_0)\ne0$, а $Q/P$, $R/P$ раскладываются в степенной ряд около $x_0$ ($x_0$ — обыкновенная точка).

**Первый шаг:** подставьте $y=\sum_{n\ge0}c_n(x-x_0)^n$, соберите одинаковые степени и найдите рекуррентную формулу; $c_0=y(x_0)$, $c_1=y'(x_0)$ свободны.

**Внимание:** при сдвиге индексов правильно пишите пределы. Ряд сходится как минимум до ближайшей особой точки (в том числе комплексной).

**Когда не работает:** если $x_0$ — особая точка ($P(x_0)=0$), обычный ряд может не подойти — нужен метод Фробениуса (вне курса). Для нелинейного уравнения ряд Тейлора даёт лишь несколько членов решения задачи Коши.`,
      R`**How to recognize:** $P(x)y''+Q(x)y'+R(x)y=0$ with $P(x_0)\ne0$, and $Q/P$, $R/P$ are power series around $x_0$ ($x_0$ is an ordinary point).

**First step:** substitute $y=\sum_{n\ge0}c_n(x-x_0)^n$, collect equal powers and find the recurrence; $c_0=y(x_0)$, $c_1=y'(x_0)$ are free.

**Watch out:** get the summation limits right when shifting indices. The series converges at least up to the nearest singular point (complex ones included).

**When it does not apply:** if $x_0$ is a singular point ($P(x_0)=0$) an ordinary series may fail; the Frobenius method is needed (beyond this course). For a nonlinear equation a Taylor series gives only a few terms of the Cauchy problem solution.`) },
    r_numeric: { title: L('Sonli usullar va sifat tahlili', 'Численные методы и качественный анализ', 'Numerical methods and qualitative analysis'), topics: ['t11', 't01'], labs: ['L07', 'L01'],
      body: L(R`**Qachon:** yopiq formula topilmadi yoki aniq sonlar/grafik kerak; masala Koshi masalasi $y'=f(x,y)$, $y(x_0)=y_0$ (yuqori tartib — sistemaga keltiriladi).

**Birinchi qadam:** mavjudlik–yagonalik shartlarini tekshiring ($f$ va $f_y$ uzluksiz). Keyin RK4 (global xato $O(h^4)$) yoki Eyler ($O(h)$) bilan hisoblang; qadamni ikki marta kichraytirib natijalarni solishtiring.

**Diqqat:**
- Sonli yechim — taqribiy; xatoni baholang.
- Qattiq (stiff) masalalarda oshkor usullar katta qadamda beqaror.
- Yechim chekli nuqtada portlashi mumkin.
- Yo‘nalish maydoni va muvozanat holatlari yechim xulqini formulasiz ham ko‘rsatadi.

**Qachon ishlamaydi:** umumiy yechim (o‘zgarmasli formula) kerak bo‘lsa; shartlar chegarada berilgan bo‘lsa (otish usuli kerak); $f$ uzilishli bo‘lsa — avval masalani tahlil qiling.`,
      R`**Когда:** замкнутая формула не найдена или нужны числа/график; задача Коши $y'=f(x,y)$, $y(x_0)=y_0$ (высший порядок сводится к системе).

**Первый шаг:** проверьте условия существования и единственности ($f$ и $f_y$ непрерывны). Затем считайте РК4 (глобальная погрешность $O(h^4)$) или Эйлером ($O(h)$); уменьшите шаг вдвое и сравните результаты.

**Внимание:**
- Численное решение приближённое; оценивайте погрешность.
- В жёстких задачах явные методы неустойчивы при большом шаге.
- Решение может уйти в бесконечность в конечной точке.
- Поле направлений и положения равновесия показывают поведение решения без формулы.

**Когда не работает:** если нужно общее решение (формула с постоянными); если условия заданы на границе (нужен метод стрельбы); если $f$ разрывна — сначала проанализируйте задачу.`,
      R`**When:** no closed form was found, or you need numbers/a graph; the problem is a Cauchy problem $y'=f(x,y)$, $y(x_0)=y_0$ (higher order is rewritten as a system).

**First step:** check the existence and uniqueness hypotheses ($f$ and $f_y$ continuous). Then compute with RK4 (global error $O(h^4)$) or Euler ($O(h)$); halve the step and compare.

**Watch out:**
- A numerical solution is approximate; estimate the error.
- For stiff problems explicit methods are unstable with large steps.
- The solution may blow up at a finite point.
- The direction field and equilibria show the behaviour without any formula.

**When it does not apply:** when you need the general solution (a formula with constants); when conditions are given at a boundary (a shooting method is needed); when $f$ is discontinuous, analyse the problem first.`) },
    r_system: { title: L(R`Chiziqli sistema $X'=AX$: xos qiymatlar`, R`Линейная система $X'=AX$: собственные значения`, R`Linear system $X'=AX$: eigenvalues`), topics: ['t12'], labs: ['L08'],
      body: L(R`**Belgisi:** $X'=AX(+F(t))$, $A$ — o‘zgarmas matritsa.

**Birinchi qadam:** $\det(A-\lambda I)=0$ dan xos qiymatlar, $(A-\lambda I)v=0$ dan xos vektorlar.
- Har xil haqiqiy $\lambda_k$: $X=\sum C_ke^{\lambda_kt}v_k$.
- Kompleks $\lambda=\alpha\pm i\beta$: $e^{\lambda t}v$ ning haqiqiy va mavhum qismlari.
- Karrali $\lambda$, xos vektor yetmasa: $e^{\lambda t}(tv+w)$, $(A-\lambda I)w=v$.

Muqobil: o‘zgarmaslarni yo‘qotish (bitta yuqori tartibli tenglamaga keltirish) — ma’ruzadagi usul.

**Diqqat:** xos qiymatlar faza portreti turini belgilaydi (tugun, egar, fokus, markaz). $F(t)$ bo‘lsa — noma’lum koeffitsiyentlar yoki variatsiya.

**Qachon ishlamaydi:** $A$ $t$ ga bog‘liq yoki sistema chiziqsiz bo‘lsa — $e^{\lambda t}v$ yechim bo‘lmaydi.`,
      R`**Признак:** $X'=AX(+F(t))$, $A$ — постоянная матрица.

**Первый шаг:** собственные значения из $\det(A-\lambda I)=0$, собственные векторы из $(A-\lambda I)v=0$.
- Различные действительные $\lambda_k$: $X=\sum C_ke^{\lambda_kt}v_k$.
- Комплексные $\lambda=\alpha\pm i\beta$: действительная и мнимая части $e^{\lambda t}v$.
- Кратное $\lambda$ при нехватке собственных векторов: $e^{\lambda t}(tv+w)$, $(A-\lambda I)w=v$.

Альтернатива: метод исключения (сведение к одному уравнению высшего порядка) — метод из лекции.

**Внимание:** собственные значения определяют тип фазового портрета (узел, седло, фокус, центр). При $F(t)$ — неопределённые коэффициенты или вариация.

**Когда не работает:** если $A$ зависит от $t$ или система нелинейна — $e^{\lambda t}v$ не является решением.`,
      R`**How to recognize:** $X'=AX(+F(t))$ with a constant matrix $A$.

**First step:** eigenvalues from $\det(A-\lambda I)=0$, eigenvectors from $(A-\lambda I)v=0$.
- Distinct real $\lambda_k$: $X=\sum C_ke^{\lambda_kt}v_k$.
- Complex $\lambda=\alpha\pm i\beta$: real and imaginary parts of $e^{\lambda t}v$.
- Repeated $\lambda$ without enough eigenvectors: $e^{\lambda t}(tv+w)$ with $(A-\lambda I)w=v$.

Alternative: elimination (reduce to one higher-order equation), the method named in the lecture plan.

**Watch out:** the eigenvalues determine the phase portrait type (node, saddle, focus, centre). With $F(t)$ use undetermined coefficients or variation of parameters.

**When it does not apply:** if $A$ depends on $t$ or the system is nonlinear; then $e^{\lambda t}v$ is not a solution.`) },
    r_qual: { title: L('Chiziqsiz sistema: sifat tahlili va sonli yechim', 'Нелинейная система: качественный анализ и численное решение', 'Nonlinear system: qualitative analysis and numerics'), topics: ['t12', 't11'], labs: ['L08', 'L07'],
      body: L(R`**Qachon:** $X'=F(X)$ chiziqsiz (SIR, yirtqich–o‘lja, tarmoqdagi virus tarqalishi) yoki o‘zgaruvchan koeffitsiyentli.

**Birinchi qadam:** muvozanat holatlarini toping: $F(X^*)=0$. Yakobi matritsasi $J(X^*)$ ning xos qiymatlari bo‘yicha turini aniqlang. Keyin RK4 bilan traektoriyalarni hisoblang.

**Diqqat:** chiziqlilashtirish faqat xos qiymatlarning haqiqiy qismlari noldan farqli bo‘lganda ishonchli; sof mavhum xos qiymatlarda (markaz) xulosa chiqarib bo‘lmaydi.

**Qachon ishlamaydi:** yopiq formulani bu yo‘l bilan olmaysiz; u faqat xulqni (barqarorlik, tebranish) va sonli yechimni beradi.`,
      R`**Когда:** $X'=F(X)$ нелинейна (SIR, хищник–жертва, распространение вируса в сети) или с переменными коэффициентами.

**Первый шаг:** найдите положения равновесия $F(X^*)=0$. По собственным значениям матрицы Якоби $J(X^*)$ определите их тип. Затем постройте траектории методом РК4.

**Внимание:** линеаризация надёжна, только если действительные части собственных значений ненулевые; при чисто мнимых (центр) вывод сделать нельзя.

**Когда не работает:** замкнутую формулу так не получить; метод даёт только поведение (устойчивость, колебания) и численное решение.`,
      R`**When:** $X'=F(X)$ is nonlinear (SIR, predator–prey, virus spread in a network) or has variable coefficients.

**First step:** find the equilibria $F(X^*)=0$. Classify each by the eigenvalues of the Jacobian $J(X^*)$. Then compute trajectories with RK4.

**Watch out:** linearization is reliable only when all eigenvalues have nonzero real parts; with purely imaginary eigenvalues (centre) no conclusion follows.

**When it does not apply:** this gives no closed form; only behaviour (stability, oscillation) and numerical solutions.`) },
    r_classify: { title: L('PDE ni tasniflash va kanonik ko‘rinish', 'Классификация УЧП и канонический вид', 'Classifying a PDE and its canonical form'), topics: ['t14'], labs: ['L11'],
      body: L(R`**Kelishuv:** $a u_{xx}+2b u_{xy}+c u_{yy}+\dots=0$, $\Delta=b^2-ac$ (ba’zi kitoblarda $u_{xy}$ oldida $b$, unda $b^2-4ac$ — koeffitsiyentni tekshiring).

**Birinchi qadam:** nuqtadagi turini aniqlang:
- $\Delta>0$ — giperbolik; $\Delta=0$ — parabolik; $\Delta<0$ — elliptik.

Keyin xarakteristik tenglama $a\,dy^2-2b\,dx\,dy+c\,dx^2=0$, ya’ni $\dfrac{dy}{dx}=\dfrac{b\pm\sqrt\Delta}{a}$ ($a\ne0$). Integrallar $\varphi(x,y)=C$ yangi o‘zgaruvchilarni beradi: giperbolikda $\xi=\varphi_1$, $\eta=\varphi_2$ ($u_{\xi\eta}=\dots$); parabolikda $\xi=\varphi$, $\eta$ — ixtiyoriy mustaqil; elliptikda $\xi=\operatorname{Re}\varphi$, $\eta=\operatorname{Im}\varphi$.

**Diqqat:** o‘zgaruvchan koeffitsiyentlarda tur sohaga qarab o‘zgarishi mumkin (masalan $u_{xx}+xu_{yy}=0$). Almashtirish Yakobiani noldan farqli bo‘lsin.

**Qachon ishlamaydi:** chiziqsiz yoki uch va undan ko‘p o‘zgaruvchili tenglamalar uchun bu sxema bevosita qo‘llanmaydi.`,
      R`**Соглашение:** $a u_{xx}+2b u_{xy}+c u_{yy}+\dots=0$, $\Delta=b^2-ac$ (в некоторых книгах при $u_{xy}$ стоит $b$, тогда $b^2-4ac$ — проверьте коэффициент).

**Первый шаг:** определите тип в точке:
- $\Delta>0$ — гиперболический; $\Delta=0$ — параболический; $\Delta<0$ — эллиптический.

Затем характеристическое уравнение $a\,dy^2-2b\,dx\,dy+c\,dx^2=0$, т. е. $\dfrac{dy}{dx}=\dfrac{b\pm\sqrt\Delta}{a}$ ($a\ne0$). Интегралы $\varphi(x,y)=C$ дают новые переменные: в гиперболическом случае $\xi=\varphi_1$, $\eta=\varphi_2$ ($u_{\xi\eta}=\dots$); в параболическом $\xi=\varphi$, $\eta$ — любая независимая; в эллиптическом $\xi=\operatorname{Re}\varphi$, $\eta=\operatorname{Im}\varphi$.

**Внимание:** при переменных коэффициентах тип может меняться по областям (например, $u_{xx}+xu_{yy}=0$). Якобиан замены должен быть ненулевым.

**Когда не работает:** для нелинейных уравнений и уравнений с тремя и более переменными эта схема напрямую не применяется.`,
      R`**Convention:** $a u_{xx}+2b u_{xy}+c u_{yy}+\dots=0$, $\Delta=b^2-ac$ (some books write $b$ in front of $u_{xy}$ and use $b^2-4ac$; check the coefficient).

**First step:** find the type at a point:
- $\Delta>0$ hyperbolic; $\Delta=0$ parabolic; $\Delta<0$ elliptic.

Then the characteristic equation $a\,dy^2-2b\,dx\,dy+c\,dx^2=0$, i.e. $\dfrac{dy}{dx}=\dfrac{b\pm\sqrt\Delta}{a}$ ($a\ne0$). Its integrals $\varphi(x,y)=C$ give new variables: hyperbolic $\xi=\varphi_1$, $\eta=\varphi_2$ ($u_{\xi\eta}=\dots$); parabolic $\xi=\varphi$, $\eta$ any independent function; elliptic $\xi=\operatorname{Re}\varphi$, $\eta=\operatorname{Im}\varphi$.

**Watch out:** with variable coefficients the type may change from region to region (e.g. $u_{xx}+xu_{yy}=0$). The Jacobian of the change of variables must be nonzero.

**When it does not apply:** this scheme does not directly apply to nonlinear equations or to equations in three or more variables.`) },
    r_fourier: { title: L('Furye usuli (kesmada)', 'Метод Фурье (на отрезке)', 'Fourier method (on a segment)'), topics: ['t13', 't15'], labs: ['L09', 'L10'],
      body: L(R`**Belgisi:** chiziqli bir jinsli tenglama (issiqlik $u_t=a^2u_{xx}$ yoki tor $u_{tt}=a^2u_{xx}$), $0<x<l$, **bir jinsli** chegaraviy shartlar (masalan $u(0,t)=u(l,t)=0$) va boshlang‘ich shartlar.

**Birinchi qadam:** $u=X(x)T(t)$: $X''+\lambda X=0$, $X(0)=X(l)=0$ $\Rightarrow$ $\lambda_n=(n\pi/l)^2$, $X_n=\sin\dfrac{n\pi x}{l}$.
- Issiqlik: $u=\sum b_ne^{-(n\pi a/l)^2t}\sin\dfrac{n\pi x}{l}$, $b_n=\dfrac2l\int_0^l\varphi(x)\sin\dfrac{n\pi x}{l}dx$.
- Tor: $u=\sum\Big(A_n\cos\dfrac{n\pi at}{l}+B_n\sin\dfrac{n\pi at}{l}\Big)\sin\dfrac{n\pi x}{l}$; $A_n$ — $u(x,0)$ dan, $B_n\dfrac{n\pi a}{l}$ — $u_t(x,0)$ dan.

**Diqqat:** chegaraviy shartlar turi (Dirixle/Neyman) xos funksiyalarni o‘zgartiradi ($\cos$, $\lambda_0=0$). To‘g‘ri to‘rtburchakdagi Laplas tenglamasi ham shunday yechiladi.

**Qachon ishlamaydi:** chegaraviy shartlar bir jinsli emas — avval $u=v+w$ bilan bir jinsliga keltiring; cheksiz soha — Dalamber yoki integral almashtirishlar; chiziqsiz tenglama.`,
      R`**Признак:** линейное однородное уравнение (теплопроводности $u_t=a^2u_{xx}$ или струны $u_{tt}=a^2u_{xx}$), $0<x<l$, **однородные** граничные условия (например, $u(0,t)=u(l,t)=0$) и начальные условия.

**Первый шаг:** $u=X(x)T(t)$: $X''+\lambda X=0$, $X(0)=X(l)=0$ $\Rightarrow$ $\lambda_n=(n\pi/l)^2$, $X_n=\sin\dfrac{n\pi x}{l}$.
- Теплопроводность: $u=\sum b_ne^{-(n\pi a/l)^2t}\sin\dfrac{n\pi x}{l}$, $b_n=\dfrac2l\int_0^l\varphi(x)\sin\dfrac{n\pi x}{l}dx$.
- Струна: $u=\sum\Big(A_n\cos\dfrac{n\pi at}{l}+B_n\sin\dfrac{n\pi at}{l}\Big)\sin\dfrac{n\pi x}{l}$; $A_n$ — из $u(x,0)$, $B_n\dfrac{n\pi a}{l}$ — из $u_t(x,0)$.

**Внимание:** тип граничных условий (Дирихле/Нейман) меняет собственные функции ($\cos$, $\lambda_0=0$). Уравнение Лапласа в прямоугольнике решается так же.

**Когда не работает:** неоднородные граничные условия — сначала сведите к однородным через $u=v+w$; бесконечная область — Даламбер или интегральные преобразования; нелинейное уравнение.`,
      R`**How to recognize:** a linear homogeneous equation (heat $u_t=a^2u_{xx}$ or string $u_{tt}=a^2u_{xx}$) on $0<x<l$, **homogeneous** boundary conditions (e.g. $u(0,t)=u(l,t)=0$) and initial conditions.

**First step:** $u=X(x)T(t)$: $X''+\lambda X=0$, $X(0)=X(l)=0$ $\Rightarrow$ $\lambda_n=(n\pi/l)^2$, $X_n=\sin\dfrac{n\pi x}{l}$.
- Heat: $u=\sum b_ne^{-(n\pi a/l)^2t}\sin\dfrac{n\pi x}{l}$, $b_n=\dfrac2l\int_0^l\varphi(x)\sin\dfrac{n\pi x}{l}dx$.
- String: $u=\sum\Big(A_n\cos\dfrac{n\pi at}{l}+B_n\sin\dfrac{n\pi at}{l}\Big)\sin\dfrac{n\pi x}{l}$; $A_n$ from $u(x,0)$, $B_n\dfrac{n\pi a}{l}$ from $u_t(x,0)$.

**Watch out:** the type of boundary condition (Dirichlet/Neumann) changes the eigenfunctions ($\cos$, $\lambda_0=0$). Laplace’s equation in a rectangle is solved the same way.

**When it does not apply:** nonhomogeneous boundary conditions (first reduce them with $u=v+w$); an infinite domain (d’Alembert or integral transforms); a nonlinear equation.`) },
    r_dalembert: { title: L('Dalamber formulasi', 'Формула Даламбера', 'd’Alembert’s formula'), topics: ['t15'], labs: ['L10'],
      body: L(R`**Belgisi:** $u_{tt}=a^2u_{xx}$, $-\infty<x<\infty$, $u(x,0)=\varphi(x)$, $u_t(x,0)=\psi(x)$.

**Birinchi qadam:**
$$u(x,t)=\frac{\varphi(x-at)+\varphi(x+at)}{2}+\frac{1}{2a}\int_{x-at}^{x+at}\psi(s)\,ds.$$

**Diqqat:** yechim ikki yo‘nalishda tarqaluvchi to‘lqinlar yig‘indisi; $(x,t)$ dagi qiymat faqat $[x-at,x+at]$ dagi boshlang‘ich ma’lumotlarga bog‘liq. Klassik yechim uchun $\varphi\in C^2$, $\psi\in C^1$.

**Qachon ishlamaydi:** chegaralangan tor (uchlari mahkamlangan) — Furye usuli (yoki toq davom ettirish); bir jinsli bo‘lmagan tenglama $u_{tt}=a^2u_{xx}+f$ — Dyuamel qo‘shimchasi kerak; issiqlik tenglamasiga tegishli emas.`,
      R`**Признак:** $u_{tt}=a^2u_{xx}$, $-\infty<x<\infty$, $u(x,0)=\varphi(x)$, $u_t(x,0)=\psi(x)$.

**Первый шаг:**
$$u(x,t)=\frac{\varphi(x-at)+\varphi(x+at)}{2}+\frac{1}{2a}\int_{x-at}^{x+at}\psi(s)\,ds.$$

**Внимание:** решение — сумма волн, бегущих в две стороны; значение в $(x,t)$ зависит только от начальных данных на $[x-at,x+at]$. Для классического решения $\varphi\in C^2$, $\psi\in C^1$.

**Когда не работает:** ограниченная струна (закреплённые концы) — метод Фурье (или нечётное продолжение); неоднородное уравнение $u_{tt}=a^2u_{xx}+f$ — нужно слагаемое Дюамеля; к уравнению теплопроводности не относится.`,
      R`**How to recognize:** $u_{tt}=a^2u_{xx}$, $-\infty<x<\infty$, $u(x,0)=\varphi(x)$, $u_t(x,0)=\psi(x)$.

**First step:**
$$u(x,t)=\frac{\varphi(x-at)+\varphi(x+at)}{2}+\frac{1}{2a}\int_{x-at}^{x+at}\psi(s)\,ds.$$

**Watch out:** the solution is a sum of waves travelling in both directions; the value at $(x,t)$ depends only on the initial data on $[x-at,x+at]$. For a classical solution, $\varphi\in C^2$, $\psi\in C^1$.

**When it does not apply:** a bounded string with fixed ends (use the Fourier method or odd extension); the nonhomogeneous equation $u_{tt}=a^2u_{xx}+f$ (a Duhamel term is needed); it is not for the heat equation.`) },
    r_pde_other: { title: L('Kurs doirasidan tashqari PDE', 'УЧП вне рамок курса', 'A PDE outside this course'), topics: ['t13', 't14'],
      body: L(R`**Halol javob:** ilova va kurs ikki o‘zgaruvchili ikkinchi tartibli chiziqli tenglamalarni, kesmadagi Furye usulini va cheksiz tor uchun Dalamber formulasini qamraydi.

**Nima qilish mumkin:**
- Birinchi tartibli chiziqli PDE — xarakteristikalar usuli (darsliklarda).
- Yarim to‘g‘ri chiziq — toq yoki juft davom ettirib, Dalamberga keltirish.
- Cheksiz sterjenda issiqlik — Puasson integrali (Furye almashtirishi).
- Chiziqsiz yoki ko‘p o‘lchovli masala — sonli usullar (chekli ayirmalar).

**Diqqat:** masala to‘g‘ri qo‘yilganini (tenglama turi va shartlar soni mosligini) avval tekshiring.`,
      R`**Честный ответ:** приложение и курс охватывают линейные уравнения второго порядка с двумя переменными, метод Фурье на отрезке и формулу Даламбера для бесконечной струны.

**Что можно сделать:**
- Линейное УЧП первого порядка — метод характеристик (по учебникам).
- Полупрямая — нечётное или чётное продолжение и сведение к Даламберу.
- Теплопроводность в бесконечном стержне — интеграл Пуассона (преобразование Фурье).
- Нелинейная или многомерная задача — численные методы (конечные разности).

**Внимание:** сначала проверьте корректность постановки (соответствие типа уравнения и числа условий).`,
      R`**Honest answer:** the app and the course cover linear second-order equations in two variables, the Fourier method on a segment and d’Alembert’s formula for the infinite string.

**What you can do:**
- First-order linear PDE: the method of characteristics (see textbooks).
- Half-line: odd or even extension, reducing to d’Alembert.
- Heat in an infinite rod: the Poisson integral (Fourier transform).
- Nonlinear or multidimensional problems: numerical methods (finite differences).

**Watch out:** first check that the problem is well posed (the equation type matches the number and kind of conditions).`) }
  }
};
})();
