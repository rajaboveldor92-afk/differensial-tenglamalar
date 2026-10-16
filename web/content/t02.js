(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't02', num: 2,
  title: L('O‘zgaruvchilari ajraladigan tenglamalar', 'Уравнения с разделяющимися переменными', 'Separable equations'),
  syllabus: { lecture: 'M2', seminar: 'S2', outcomes: ['TN2', 'TN3'], independent: [2, 3] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L('O‘zgaruvchilari ajraladigan tenglamani taniy olasiz va uni $y\'=f(x)g(y)$ yoki $M_1(x)N_1(y)\\,dx+M_2(x)N_2(y)\\,dy=0$ ko‘rinishga keltira olasiz.', 'Распознавать уравнение с разделяющимися переменными и приводить его к виду $y\'=f(x)g(y)$ или $M_1(x)N_1(y)\\,dx+M_2(x)N_2(y)\\,dy=0$.', 'Recognise a separable equation and bring it to the form $y\'=f(x)g(y)$ or $M_1(x)N_1(y)\\,dx+M_2(x)N_2(y)\\,dy=0$.'),
    L('O‘zgaruvchilarni ajratib, umumiy integralni topa olasiz va bo‘lishda yo‘qolgan o‘zgarmas yechimlarni qaytara olasiz.', 'Разделять переменные, находить общий интеграл и восстанавливать постоянные решения, потерянные при делении.', 'Separate the variables, find the general integral and recover the constant solutions lost by division.'),
    L('$y\'=f(ax+by+c)$ tenglamani $z=ax+by+c$ almashtirish bilan ajraladiganga keltira olasiz.', 'Сводить уравнение $y\'=f(ax+by+c)$ к уравнению с разделяющимися переменными заменой $z=ax+by+c$.', 'Reduce $y\'=f(ax+by+c)$ to a separable equation with the substitution $z=ax+by+c$.'),
    L('Yemirilish, sovish, populyatsiya va tarmoqda virus tarqalishi masalalarini differensial tenglama sifatida tuzib, yecha olasiz.', 'Составлять и решать дифференциальные уравнения для задач распада, охлаждения, роста популяции и распространения вируса в сети.', 'Set up and solve differential equations for decay, cooling, population growth and the spread of a virus in a network.'),
    L('Koshi masalasi yechimining aniqlanish oralig‘ini ko‘rsata olasiz.', 'Указывать интервал определения решения задачи Коши.', 'State the interval of definition of the solution of a Cauchy problem.')
  ],
  prereqKnowledge: [
    L('Aniqmas integral: $\\int\\frac{dx}{x}=\\ln|x|+C$, $\\int\\frac{dx}{1+x^2}=\\arctan x+C$, $\\int e^{kx}dx=\\frac1k e^{kx}+C$.', 'Неопределённый интеграл: $\\int\\frac{dx}{x}=\\ln|x|+C$, $\\int\\frac{dx}{1+x^2}=\\arctan x+C$, $\\int e^{kx}dx=\\frac1k e^{kx}+C$.', 'Indefinite integrals: $\\int\\frac{dx}{x}=\\ln|x|+C$, $\\int\\frac{dx}{1+x^2}=\\arctan x+C$, $\\int e^{kx}dx=\\frac1k e^{kx}+C$.'),
    L('Koshi masalasi, umumiy va xususiy yechim (1-mavzu).', 'Задача Коши, общее и частное решения (тема 1).', 'The Cauchy problem, general and particular solutions (topic 1).'),
    L('Logarifm va eksponentaning xossalari, sodda kasrlarga ajratish.', 'Свойства логарифма и экспоненты, разложение на простейшие дроби.', 'Properties of logarithms and exponentials, partial fractions.')
  ],
  sources: [
    { id: 'dilmurodov', ref: '§2.1', verified: true },
    { id: 'ergashev', ref: '1.2, 1.11', verified: true },
    { id: 'logan', ref: '1.3', verified: true },
    { id: 'kohler', ref: '2.4, 2.6, 2.8', verified: true },
    { id: 'goode', ref: '1.4, 1.5', verified: true },
    { id: 'filippov', ref: '§2', verified: false },
    { id: 'boyce', ref: '§2.2, §2.3, §2.5', verified: false }
  ],
  labs: ['L02', 'L04', 'L01'],
  lessons: [
    {
      id: 't02.1',
      title: L('O‘zgaruvchilarni ajratish usuli', 'Метод разделения переменных', 'The method of separating variables'),
      blocks: [
        { type: 'intro', title: L('Tarmoqda virus: dastlabki soatlar', 'Вирус в сети: первые часы', 'A virus in a network: the first hours'),
          body: L(R`Katta kompyuter tarmog‘ida virus tarqalmoqda. Dastlabki bosqichda zararlangan kompyuterlar soni $I(t)$ tarmoqqa nisbatan juda kichik, shuning uchun har bir zararlangan kompyuter vaqt birligida taxminan bir xil miqdordagi yangi kompyuterni zararlaydi:
$$I'(t)=k\,I(t),\qquad k>0.$$
O‘ng tomon “$t$ ning funksiyasi” va “$I$ ning funksiyasi” ko‘paytmasi ($1\cdot kI$). Bunday tenglamalarda $I$ ni bir tomonga, $t$ ni ikkinchi tomonga yig‘ish mumkin:
$$\frac{dI}{I}=k\,dt\ \Rightarrow\ \ln|I|=kt+C_1\ \Rightarrow\ I=I_0e^{kt}.$$
Agar $I_0=10$ va $k=0{,}7$ (1/soat) bo‘lsa, 3 soatdan keyin $I\approx10e^{2{,}1}\approx82$. Bu mavzuda shu usulni umumiy holda o‘rganamiz.`,
          R`В большой компьютерной сети распространяется вирус. На начальном этапе число заражённых компьютеров $I(t)$ очень мало по сравнению с сетью, поэтому каждый заражённый компьютер в единицу времени заражает примерно одно и то же число новых:
$$I'(t)=k\,I(t),\qquad k>0.$$
Правая часть — произведение «функции от $t$» и «функции от $I$» ($1\cdot kI$). В таких уравнениях $I$ можно собрать в одной части, а $t$ — в другой:
$$\frac{dI}{I}=k\,dt\ \Rightarrow\ \ln|I|=kt+C_1\ \Rightarrow\ I=I_0e^{kt}.$$
Если $I_0=10$ и $k=0{,}7$ (1/ч), то через 3 часа $I\approx10e^{2{,}1}\approx82$. В этой теме мы изучим этот приём в общем виде.`,
          R`A virus spreads in a large computer network. At the early stage the number of infected computers $I(t)$ is tiny compared with the network, so each infected computer infects roughly the same number of new ones per unit time:
$$I'(t)=k\,I(t),\qquad k>0.$$
The right side is a product of “a function of $t$” and “a function of $I$” ($1\cdot kI$). In such equations we can collect $I$ on one side and $t$ on the other:
$$\frac{dI}{I}=k\,dt\ \Rightarrow\ \ln|I|=kt+C_1\ \Rightarrow\ I=I_0e^{kt}.$$
If $I_0=10$ and $k=0.7$ (per hour), after 3 hours $I\approx10e^{2.1}\approx82$. In this topic we study this trick in general.`) },
        { type: 'def', title: L('O‘zgaruvchilari ajraladigan tenglama', 'Уравнение с разделяющимися переменными', 'Separable equation'),
          body: L(R`Ushbu ko‘rinishdagi tenglama **o‘zgaruvchilari ajraladigan** tenglama deyiladi:
$$y'=f(x)\,g(y).$$
Differensiallarda yozilgan shakli:
$$M_1(x)N_1(y)\,dx+M_2(x)N_2(y)\,dy=0,$$
ya’ni $dx$ va $dy$ oldidagi koeffitsiyentlarning har biri “faqat $x$ ga bog‘liq” va “faqat $y$ ga bog‘liq” ko‘paytuvchilarga ajraladi.

Xususiy hol: $y'=g(y)$ — **avtonom** tenglama (o‘ng tomonda $x$ yo‘q).`,
          R`Уравнение вида
$$y'=f(x)\,g(y)$$
называется **уравнением с разделяющимися переменными**. Его запись в дифференциалах:
$$M_1(x)N_1(y)\,dx+M_2(x)N_2(y)\,dy=0,$$
то есть каждый коэффициент при $dx$ и $dy$ распадается на множители «только от $x$» и «только от $y$».

Частный случай: $y'=g(y)$ — **автономное** уравнение (в правой части нет $x$).`,
          R`An equation of the form
$$y'=f(x)\,g(y)$$
is called **separable**. Written with differentials:
$$M_1(x)N_1(y)\,dx+M_2(x)N_2(y)\,dy=0,$$
that is, each coefficient of $dx$ and $dy$ factors into “a function of $x$ only” times “a function of $y$ only”.

Special case: $y'=g(y)$ is an **autonomous** equation (no $x$ on the right).`) },
        { type: 'thm', title: L('Ajraladigan tenglama uchun Koshi masalasi', 'Задача Коши для уравнения с разделяющимися переменными', 'The Cauchy problem for a separable equation'),
          conds: L(R`1. $f(x)$ $(a,b)$ intervalda uzluksiz;
2. $g(y)$ $(c,d)$ intervalda uzluksiz va u yerda $g(y)\ne0$;
3. $x_0\in(a,b)$, $y_0\in(c,d)$.`,
          R`1. $f(x)$ непрерывна на интервале $(a,b)$;
2. $g(y)$ непрерывна на интервале $(c,d)$ и $g(y)\ne0$ там;
3. $x_0\in(a,b)$, $y_0\in(c,d)$.`,
          R`1. $f(x)$ is continuous on the interval $(a,b)$;
2. $g(y)$ is continuous on the interval $(c,d)$ and $g(y)\ne0$ there;
3. $x_0\in(a,b)$, $y_0\in(c,d)$.`),
          body: L(R`U holda $y'=f(x)g(y)$, $y(x_0)=y_0$ masalaning $x_0$ atrofida **yagona** yechimi mavjud va u quyidagi tenglikdan aniqlanadi:
$$\int_{y_0}^{y}\frac{ds}{g(s)}=\int_{x_0}^{x}f(t)\,dt.$$
Agar $g(y^*)=0$ bo‘lsa, $y\equiv y^*$ — o‘zgarmas yechim (muvozanat holati). Bu yechim $g$ ga bo‘lganda **yo‘qoladi**, shuning uchun uni alohida yozish kerak.`,
          R`Тогда задача $y'=f(x)g(y)$, $y(x_0)=y_0$ имеет в окрестности $x_0$ **единственное** решение, которое определяется равенством
$$\int_{y_0}^{y}\frac{ds}{g(s)}=\int_{x_0}^{x}f(t)\,dt.$$
Если $g(y^*)=0$, то $y\equiv y^*$ — постоянное решение (положение равновесия). При делении на $g$ оно **теряется**, поэтому его нужно выписать отдельно.`,
          R`Then the problem $y'=f(x)g(y)$, $y(x_0)=y_0$ has a **unique** solution near $x_0$, determined by
$$\int_{y_0}^{y}\frac{ds}{g(s)}=\int_{x_0}^{x}f(t)\,dt.$$
If $g(y^*)=0$, then $y\equiv y^*$ is a constant solution (an equilibrium). Dividing by $g$ **loses** it, so it must be written down separately.`) },
        { type: 'proof', body: L(R`$G(y)=\int_{y_0}^{y}\frac{ds}{g(s)}$ funksiya $(c,d)$ da qat’iy monoton, chunki $G'=1/g$ ishorasini saqlaydi; demak, uning teskarisi $G^{-1}$ mavjud. Har qanday yechim uchun $\frac{y'(x)}{g(y(x))}=f(x)$; ikkala tomonni $x_0$ dan $x$ gacha integrallab, $G(y(x))=F(x)$ ni olamiz, bunda $F(x)=\int_{x_0}^{x}f$. Bundan $y=G^{-1}(F(x))$ — yechim faqat shu bo‘lishi mumkin (yagonalik) va u haqiqatan yechim (mavjudlik) (Dilmuradov, §2.1).`,
          R`Функция $G(y)=\int_{y_0}^{y}\frac{ds}{g(s)}$ строго монотонна на $(c,d)$, так как $G'=1/g$ сохраняет знак; значит, существует обратная $G^{-1}$. Для любого решения $\frac{y'(x)}{g(y(x))}=f(x)$; интегрируя от $x_0$ до $x$, получаем $G(y(x))=F(x)$, где $F(x)=\int_{x_0}^{x}f$. Отсюда $y=G^{-1}(F(x))$ — решение может быть только таким (единственность), и оно действительно решение (существование) (Дилмурадов, §2.1).`,
          R`The function $G(y)=\int_{y_0}^{y}\frac{ds}{g(s)}$ is strictly monotone on $(c,d)$ because $G'=1/g$ keeps its sign, so the inverse $G^{-1}$ exists. Any solution satisfies $\frac{y'(x)}{g(y(x))}=f(x)$; integrating from $x_0$ to $x$ gives $G(y(x))=F(x)$ with $F(x)=\int_{x_0}^{x}f$. Hence $y=G^{-1}(F(x))$: a solution can only be this (uniqueness), and it is indeed a solution (existence) (Dilmuradov, §2.1).`) },
        { type: 'example', title: L('Yo‘qolgan o‘zgarmas yechim', 'Потерянное постоянное решение', 'A lost constant solution'),
          body: L(R`$y'=x\,y^2$ tenglamaning barcha yechimlarini toping.`, R`Найдите все решения уравнения $y'=x\,y^2$.`, R`Find all solutions of $y'=x\,y^2$.`),
          steps: [
            L(R`Bu yerda $f(x)=x$, $g(y)=y^2$. Avval $g(y)=0$ ni tekshiramiz: $y\equiv0$ — yechim ($0=x\cdot0$).`, R`Здесь $f(x)=x$, $g(y)=y^2$. Сначала проверяем $g(y)=0$: $y\equiv0$ — решение ($0=x\cdot0$).`, R`Here $f(x)=x$ and $g(y)=y^2$. First check $g(y)=0$: $y\equiv0$ is a solution ($0=x\cdot0$).`),
            L(R`$y\ne0$ da ajratamiz: $\dfrac{dy}{y^2}=x\,dx$.`, R`При $y\ne0$ разделяем: $\dfrac{dy}{y^2}=x\,dx$.`, R`For $y\ne0$ separate: $\dfrac{dy}{y^2}=x\,dx$.`),
            L(R`Integrallaymiz: $-\dfrac1y=\dfrac{x^2}{2}+C_1$, ya’ni $y=-\dfrac{2}{x^2+C}$ ($C=2C_1$).`, R`Интегрируем: $-\dfrac1y=\dfrac{x^2}{2}+C_1$, то есть $y=-\dfrac{2}{x^2+C}$ ($C=2C_1$).`, R`Integrate: $-\dfrac1y=\dfrac{x^2}{2}+C_1$, i.e. $y=-\dfrac{2}{x^2+C}$ ($C=2C_1$).`),
            L(R`Javob: $y=-\dfrac{2}{x^2+C}$ va $y\equiv0$. $y\equiv0$ hech qanday chekli $C$ da formuladan chiqmaydi — uni alohida yozmasak, yechim yo‘qoladi.`, R`Ответ: $y=-\dfrac{2}{x^2+C}$ и $y\equiv0$. Решение $y\equiv0$ не получается из формулы ни при каком конечном $C$ — если не выписать его отдельно, оно потеряется.`, R`Answer: $y=-\dfrac{2}{x^2+C}$ and $y\equiv0$. The solution $y\equiv0$ is not given by the formula for any finite $C$; if we do not write it separately, it is lost.`)
          ],
          check: L(R`$y=-2(x^2+C)^{-1}$: $y'=4x(x^2+C)^{-2}$, $x y^2=x\cdot4(x^2+C)^{-2}$ ✓.`, R`$y=-2(x^2+C)^{-1}$: $y'=4x(x^2+C)^{-2}$, $x y^2=x\cdot4(x^2+C)^{-2}$ ✓.`, R`$y=-2(x^2+C)^{-1}$: $y'=4x(x^2+C)^{-2}$, $x y^2=x\cdot4(x^2+C)^{-2}$ ✓.`) },
        { type: 'example', title: L('Koshi masalasi va aniqlanish oralig‘i', 'Задача Коши и интервал определения', 'A Cauchy problem and its interval'),
          body: L(R`$y'=\dfrac{1+y^2}{1+x^2}$, $y(0)=1$ masalasini yeching va yechim oralig‘ini ko‘rsating.`, R`Решите задачу $y'=\dfrac{1+y^2}{1+x^2}$, $y(0)=1$ и укажите интервал решения.`, R`Solve $y'=\dfrac{1+y^2}{1+x^2}$, $y(0)=1$ and state the interval of the solution.`),
          steps: [
            L(R`$g(y)=1+y^2>0$ — nolga aylanmaydi, o‘zgarmas yechim yo‘q. Ajratamiz: $\dfrac{dy}{1+y^2}=\dfrac{dx}{1+x^2}$.`, R`$g(y)=1+y^2>0$ не обращается в нуль, постоянных решений нет. Разделяем: $\dfrac{dy}{1+y^2}=\dfrac{dx}{1+x^2}$.`, R`$g(y)=1+y^2>0$ never vanishes, so there are no constant solutions. Separate: $\dfrac{dy}{1+y^2}=\dfrac{dx}{1+x^2}$.`),
            L(R`Integrallaymiz: $\arctan y=\arctan x+C$. Shartdan: $\arctan1=0+C$, $C=\dfrac\pi4$.`, R`Интегрируем: $\arctan y=\arctan x+C$. Из условия: $\arctan1=0+C$, $C=\dfrac\pi4$.`, R`Integrate: $\arctan y=\arctan x+C$. The condition gives $\arctan1=0+C$, $C=\dfrac\pi4$.`),
            L(R`$y=\tan\!\left(\arctan x+\dfrac\pi4\right)=\dfrac{x+1}{1-x}$ (tangenslar yig‘indisi formulasi).`, R`$y=\tan\!\left(\arctan x+\dfrac\pi4\right)=\dfrac{x+1}{1-x}$ (формула тангенса суммы).`, R`$y=\tan\!\left(\arctan x+\dfrac\pi4\right)=\dfrac{x+1}{1-x}$ (tangent addition formula).`),
            L(R`$\arctan x+\frac\pi4<\frac\pi2$ bo‘lishi kerak, ya’ni $x<1$. Yechim $(-\infty,1)$ da aniqlangan: o‘ng tomon butun tekislikda silliq bo‘lsa ham, yechim $x\to1^-$ da cheksizga ketadi.`, R`Нужно $\arctan x+\frac\pi4<\frac\pi2$, то есть $x<1$. Решение определено на $(-\infty,1)$: хотя правая часть гладкая во всей плоскости, решение уходит в бесконечность при $x\to1^-$.`, R`We need $\arctan x+\frac\pi4<\frac\pi2$, i.e. $x<1$. The solution lives on $(-\infty,1)$: although the right side is smooth on the whole plane, the solution blows up as $x\to1^-$.`)
          ],
          check: L(R`$y'=\dfrac{2}{(1-x)^2}$; $\dfrac{1+y^2}{1+x^2}=\dfrac{(1-x)^2+(1+x)^2}{(1-x)^2(1+x^2)}=\dfrac{2}{(1-x)^2}$ ✓; $y(0)=1$ ✓.`, R`$y'=\dfrac{2}{(1-x)^2}$; $\dfrac{1+y^2}{1+x^2}=\dfrac{(1-x)^2+(1+x)^2}{(1-x)^2(1+x^2)}=\dfrac{2}{(1-x)^2}$ ✓; $y(0)=1$ ✓.`, R`$y'=\dfrac{2}{(1-x)^2}$; $\dfrac{1+y^2}{1+x^2}=\dfrac{(1-x)^2+(1+x)^2}{(1-x)^2(1+x^2)}=\dfrac{2}{(1-x)^2}$ ✓; $y(0)=1$ ✓.`) },
        { type: 'example', title: L('Differensiallarda yozilgan tenglama', 'Уравнение в дифференциалах', 'An equation written with differentials'),
          body: L(R`$x(1+y^2)\,dx+y(1+x^2)\,dy=0$ tenglamaning umumiy integralini toping.`, R`Найдите общий интеграл уравнения $x(1+y^2)\,dx+y(1+x^2)\,dy=0$.`, R`Find the general integral of $x(1+y^2)\,dx+y(1+x^2)\,dy=0$.`),
          steps: [
            L(R`Bu yerda $M_1=x$, $N_1=1+y^2$, $M_2=1+x^2$, $N_2=y$. Ikkala tomonni $N_1(y)M_2(x)=(1+y^2)(1+x^2)>0$ ga bo‘lamiz — bo‘luvchi nolga aylanmaydi, hech narsa yo‘qolmaydi.`, R`Здесь $M_1=x$, $N_1=1+y^2$, $M_2=1+x^2$, $N_2=y$. Делим на $N_1(y)M_2(x)=(1+y^2)(1+x^2)>0$ — делитель не обращается в нуль, ничего не теряется.`, R`Here $M_1=x$, $N_1=1+y^2$, $M_2=1+x^2$, $N_2=y$. Divide by $N_1(y)M_2(x)=(1+y^2)(1+x^2)>0$; the divisor never vanishes, so nothing is lost.`),
            L(R`$\dfrac{x\,dx}{1+x^2}+\dfrac{y\,dy}{1+y^2}=0$.`, R`$\dfrac{x\,dx}{1+x^2}+\dfrac{y\,dy}{1+y^2}=0$.`, R`$\dfrac{x\,dx}{1+x^2}+\dfrac{y\,dy}{1+y^2}=0$.`),
            L(R`Integrallaymiz: $\frac12\ln(1+x^2)+\frac12\ln(1+y^2)=C_1$.`, R`Интегрируем: $\frac12\ln(1+x^2)+\frac12\ln(1+y^2)=C_1$.`, R`Integrate: $\frac12\ln(1+x^2)+\frac12\ln(1+y^2)=C_1$.`),
            L(R`Potensirlaymiz: $(1+x^2)(1+y^2)=C$, $C\ge1$. Bu — oshkormas ko‘rinishdagi umumiy integral.`, R`Потенцируем: $(1+x^2)(1+y^2)=C$, $C\ge1$. Это общий интеграл в неявном виде.`, R`Exponentiate: $(1+x^2)(1+y^2)=C$, $C\ge1$. This is the general integral in implicit form.`)
          ],
          check: L(R`$d\big[(1+x^2)(1+y^2)\big]=2x(1+y^2)\,dx+2y(1+x^2)\,dy=2\cdot(\text{tenglamaning chap tomoni})$ ✓.`, R`$d\big[(1+x^2)(1+y^2)\big]=2x(1+y^2)\,dx+2y(1+x^2)\,dy=2\cdot(\text{левая часть уравнения})$ ✓.`, R`$d\big[(1+x^2)(1+y^2)\big]=2x(1+y^2)\,dx+2y(1+x^2)\,dy=2\cdot(\text{left side of the equation})$ ✓.`) },
        { type: 'warn', body: L(R`Bo‘lishdan oldin **har doim** bo‘luvchini nolga tenglang. $g(y)=0$ ning har bir ildizi $y^*$ — o‘zgarmas yechim. Differensial ko‘rinishda $N_1(y)M_2(x)$ ga bo‘lganda $M_2(x_0)=0$ dan $x\equiv x_0$ (vertikal to‘g‘ri chiziq) ham integral chiziq bo‘lishi mumkin.

Logarifmni modul bilan yozing: $\int\frac{dy}{y}=\ln|y|$. Keyin $|y|=e^{C_1}e^{F(x)}$ dan $y=Ce^{F(x)}$, $C\ne0$; $y\equiv0$ ni qo‘shsak, $C=0$ ham ruxsat.`,
          R`Перед делением **всегда** приравнивайте делитель к нулю. Каждый корень $y^*$ уравнения $g(y)=0$ даёт постоянное решение. В дифференциальной форме при делении на $N_1(y)M_2(x)$ корень $M_2(x_0)=0$ может дать интегральную кривую $x\equiv x_0$ (вертикальную прямую).

Логарифм пишите с модулем: $\int\frac{dy}{y}=\ln|y|$. Тогда из $|y|=e^{C_1}e^{F(x)}$ получаем $y=Ce^{F(x)}$, $C\ne0$; добавив $y\equiv0$, разрешаем и $C=0$.`,
          R`Before dividing, **always** set the divisor equal to zero. Each root $y^*$ of $g(y)=0$ gives a constant solution. In differential form, dividing by $N_1(y)M_2(x)$, a root $M_2(x_0)=0$ may give the integral curve $x\equiv x_0$ (a vertical line).

Write the logarithm with an absolute value: $\int\frac{dy}{y}=\ln|y|$. Then $|y|=e^{C_1}e^{F(x)}$ gives $y=Ce^{F(x)}$, $C\ne0$; adding $y\equiv0$ allows $C=0$ as well.`) },
        { type: 'lab', lab: 'L02', body: L(R`Laboratoriyada $f(x)$ va $g(y)$ ni kiriting: dastur ajratish, integrallash va $g(y)=0$ dan kelib chiqadigan o‘zgarmas yechimlarni bosqichma-bosqich ko‘rsatadi.`, R`В лаборатории введите $f(x)$ и $g(y)$: программа пошагово покажет разделение, интегрирование и постоянные решения из $g(y)=0$.`, R`In the lab, enter $f(x)$ and $g(y)$: it shows the separation, the integration and the constant solutions from $g(y)=0$ step by step.`) }
      ]
    },
    {
      id: 't02.2',
      title: L('Ajraladiganga keltiriladigan tenglamalar', 'Уравнения, приводящиеся к уравнениям с разделяющимися переменными', 'Equations reducible to separable form'),
      blocks: [
        { type: 'def', title: L(R`$y'=f(ax+by+c)$ ko‘rinishidagi tenglama`, R`Уравнение вида $y'=f(ax+by+c)$`, R`Equations of the form $y'=f(ax+by+c)$`),
          body: L(R`Agar o‘ng tomon $x$ va $y$ ga faqat **bitta chiziqli kombinatsiya** $ax+by+c$ orqali bog‘liq bo‘lsa ($b\ne0$), yangi noma’lum funksiya kiritamiz:
$$z=ax+by+c,\qquad z'=a+b\,y'=a+b\,f(z).$$
Natijada $z'=a+bf(z)$ — avtonom, ya’ni o‘zgaruvchilari ajraladigan tenglama:
$$\frac{dz}{a+bf(z)}=dx.$$
$a+bf(z^*)=0$ ning ildizlari $z\equiv z^*$, ya’ni $ax+by+c=z^*$ to‘g‘ri chiziqlarni beradi — ular ham yechim.`,
          R`Если правая часть зависит от $x$ и $y$ только через **одну линейную комбинацию** $ax+by+c$ ($b\ne0$), вводим новую неизвестную функцию:
$$z=ax+by+c,\qquad z'=a+b\,y'=a+b\,f(z).$$
Получаем $z'=a+bf(z)$ — автономное уравнение, то есть уравнение с разделяющимися переменными:
$$\frac{dz}{a+bf(z)}=dx.$$
Корни $a+bf(z^*)=0$ дают $z\equiv z^*$, то есть прямые $ax+by+c=z^*$ — они тоже решения.`,
          R`If the right side depends on $x$ and $y$ only through **one linear combination** $ax+by+c$ ($b\ne0$), introduce a new unknown:
$$z=ax+by+c,\qquad z'=a+b\,y'=a+b\,f(z).$$
This gives $z'=a+bf(z)$, an autonomous, hence separable, equation:
$$\frac{dz}{a+bf(z)}=dx.$$
Roots of $a+bf(z^*)=0$ give $z\equiv z^*$, i.e. the straight lines $ax+by+c=z^*$; they are solutions too.`) },
        { type: 'example', title: L(R`$y'=(x+y)^2$`, R`$y'=(x+y)^2$`, R`$y'=(x+y)^2$`),
          body: L(R`Umumiy yechimni toping.`, R`Найдите общее решение.`, R`Find the general solution.`),
          steps: [
            L(R`$z=x+y$ deymiz. $z'=1+y'=1+z^2$.`, R`Положим $z=x+y$. Тогда $z'=1+y'=1+z^2$.`, R`Put $z=x+y$. Then $z'=1+y'=1+z^2$.`),
            L(R`$1+z^2>0$, o‘zgarmas yechim yo‘q. Ajratamiz: $\dfrac{dz}{1+z^2}=dx$.`, R`$1+z^2>0$, постоянных решений нет. Разделяем: $\dfrac{dz}{1+z^2}=dx$.`, R`$1+z^2>0$, so no constant solutions. Separate: $\dfrac{dz}{1+z^2}=dx$.`),
            L(R`$\arctan z=x+C$, $z=\tan(x+C)$.`, R`$\arctan z=x+C$, $z=\tan(x+C)$.`, R`$\arctan z=x+C$, $z=\tan(x+C)$.`),
            L(R`Eski o‘zgaruvchiga qaytamiz: $y=\tan(x+C)-x$. Har bir yechim uzunligi $\pi$ dan kichik oraliqda yashaydi: $|x+C|<\frac\pi2$.`, R`Возвращаемся к старой переменной: $y=\tan(x+C)-x$. Каждое решение живёт на интервале длины $\pi$: $|x+C|<\frac\pi2$.`, R`Return to the original variable: $y=\tan(x+C)-x$. Each solution lives on an interval of length $\pi$: $|x+C|<\frac\pi2$.`)
          ],
          check: L(R`$y'=\sec^2(x+C)-1=\tan^2(x+C)=(x+y)^2$ ✓.`, R`$y'=\sec^2(x+C)-1=\tan^2(x+C)=(x+y)^2$ ✓.`, R`$y'=\sec^2(x+C)-1=\tan^2(x+C)=(x+y)^2$ ✓.`) },
        { type: 'example', title: L(R`$y'=\cos(x-y)$: to‘g‘ri chiziqli yechimlar`, R`$y'=\cos(x-y)$: решения-прямые`, R`$y'=\cos(x-y)$: straight-line solutions`),
          body: L(R`Barcha yechimlarni toping.`, R`Найдите все решения.`, R`Find all solutions.`),
          steps: [
            L(R`$z=x-y$: $z'=1-y'=1-\cos z=2\sin^2\dfrac z2$.`, R`$z=x-y$: $z'=1-y'=1-\cos z=2\sin^2\dfrac z2$.`, R`$z=x-y$: $z'=1-y'=1-\cos z=2\sin^2\dfrac z2$.`),
            L(R`O‘zgarmas yechimlar: $\sin\frac z2=0\Rightarrow z=2\pi k$, ya’ni $y=x-2\pi k$, $k\in\mathbb Z$.`, R`Постоянные решения: $\sin\frac z2=0\Rightarrow z=2\pi k$, то есть $y=x-2\pi k$, $k\in\mathbb Z$.`, R`Constant solutions: $\sin\frac z2=0\Rightarrow z=2\pi k$, i.e. $y=x-2\pi k$, $k\in\mathbb Z$.`),
            L(R`Qolganlarida: $\dfrac{dz}{2\sin^2(z/2)}=dx\Rightarrow -\cot\dfrac z2=x+C_1$.`, R`Для остальных: $\dfrac{dz}{2\sin^2(z/2)}=dx\Rightarrow -\cot\dfrac z2=x+C_1$.`, R`For the others: $\dfrac{dz}{2\sin^2(z/2)}=dx\Rightarrow -\cot\dfrac z2=x+C_1$.`),
            L(R`Javob: $\cot\dfrac{x-y}{2}+x=C$ va $y=x-2\pi k$. To‘g‘ri chiziqlar umumiy integraldan chiqmaydi.`, R`Ответ: $\cot\dfrac{x-y}{2}+x=C$ и $y=x-2\pi k$. Прямые не получаются из общего интеграла.`, R`Answer: $\cot\dfrac{x-y}{2}+x=C$ and $y=x-2\pi k$. The lines do not come from the general integral.`)
          ],
          check: L(R`$y=x-2\pi k$: $y'=1$, $\cos(2\pi k)=1$ ✓. Oshkormas integral: $F=\cot\frac{x-y}2+x$, $y'=-F_x/F_y=\cos(x-y)$ ✓.`, R`$y=x-2\pi k$: $y'=1$, $\cos(2\pi k)=1$ ✓. Неявный интеграл: $F=\cot\frac{x-y}2+x$, $y'=-F_x/F_y=\cos(x-y)$ ✓.`, R`$y=x-2\pi k$: $y'=1$, $\cos(2\pi k)=1$ ✓. Implicit integral: $F=\cot\frac{x-y}2+x$, $y'=-F_x/F_y=\cos(x-y)$ ✓.`) },
        { type: 'warn', body: L(R`Almashtirishdan keyin **yangi tenglamani to‘liq** yozing: $z'=a+b\,y'$, faqat $z'=f(z)$ emas. $a$ ni unutish — eng ko‘p uchraydigan xato. Javobni oxirida eski o‘zgaruvchi $y$ orqali yozing.`,
          R`После замены выписывайте **новое уравнение полностью**: $z'=a+b\,y'$, а не просто $z'=f(z)$. Забытое слагаемое $a$ — самая частая ошибка. В конце запишите ответ через исходную переменную $y$.`,
          R`After the substitution write the **whole new equation**: $z'=a+b\,y'$, not just $z'=f(z)$. Forgetting the term $a$ is the most common error. At the end express the answer in the original variable $y$.`) }
      ]
    },
    {
      id: 't02.3',
      title: L('Amaliy masalalar: yemirilish, sovish, o‘sish, tarmoq', 'Прикладные задачи: распад, охлаждение, рост, сеть', 'Applications: decay, cooling, growth, networks'),
      blocks: [
        { type: 'def', title: L('Modelni qanday tuzish kerak', 'Как составлять модель', 'How to build a model'),
          body: L(R`1. Noma’lum kattalikni va vaqtni belgilang ($m(t)$, $T(t)$, $P(t)$, …).
2. “O‘zgarish tezligi … ga proporsional” degan gapni $\frac{d(\cdot)}{dt}=\dots$ ko‘rinishida yozing; ishorani ma’no bo‘yicha tanlang.
3. Boshlang‘ich shartni yozing va tenglamani yeching.
4. Qo‘shimcha o‘lchovdan proporsionallik koeffitsiyentini toping, keyin savolga javob bering.

Asosiy modellar:
- yemirilish: $m'=-km$, $m=m_0e^{-kt}$, yarim yemirilish davri $T_{1/2}=\dfrac{\ln2}{k}$;
- Nyuton sovish qonuni: $T'=-k(T-T_m)$, $T=T_m+(T_0-T_m)e^{-kt}$;
- logistik o‘sish: $P'=rP\left(1-\dfrac PK\right)$, $P=\dfrac{K}{1+Ae^{-rt}}$, $A=\dfrac{K-P_0}{P_0}$;
- yuklab olish (to‘yinish): $U'=k(N-U)$, $U(0)=0\Rightarrow U=N(1-e^{-kt})$.`,
          R`1. Обозначьте неизвестную величину и время ($m(t)$, $T(t)$, $P(t)$, …).
2. Фразу «скорость изменения пропорциональна …» запишите как $\frac{d(\cdot)}{dt}=\dots$; знак выбирайте по смыслу.
3. Запишите начальное условие и решите уравнение.
4. Из дополнительного измерения найдите коэффициент пропорциональности, затем ответьте на вопрос.

Основные модели:
- распад: $m'=-km$, $m=m_0e^{-kt}$, период полураспада $T_{1/2}=\dfrac{\ln2}{k}$;
- закон охлаждения Ньютона: $T'=-k(T-T_m)$, $T=T_m+(T_0-T_m)e^{-kt}$;
- логистический рост: $P'=rP\left(1-\dfrac PK\right)$, $P=\dfrac{K}{1+Ae^{-rt}}$, $A=\dfrac{K-P_0}{P_0}$;
- скачивание (насыщение): $U'=k(N-U)$, $U(0)=0\Rightarrow U=N(1-e^{-kt})$.`,
          R`1. Name the unknown quantity and the time ($m(t)$, $T(t)$, $P(t)$, …).
2. Write “the rate of change is proportional to …” as $\frac{d(\cdot)}{dt}=\dots$; choose the sign from the meaning.
3. Write the initial condition and solve the equation.
4. Use an extra measurement to find the proportionality constant, then answer the question.

Core models:
- decay: $m'=-km$, $m=m_0e^{-kt}$, half-life $T_{1/2}=\dfrac{\ln2}{k}$;
- Newton’s law of cooling: $T'=-k(T-T_m)$, $T=T_m+(T_0-T_m)e^{-kt}$;
- logistic growth: $P'=rP\left(1-\dfrac PK\right)$, $P=\dfrac{K}{1+Ae^{-rt}}$, $A=\dfrac{K-P_0}{P_0}$;
- downloads (saturation): $U'=k(N-U)$, $U(0)=0\Rightarrow U=N(1-e^{-kt})$.`) },
        { type: 'example', title: L('Choy qachon ichishga tayyor?', 'Когда чай можно пить?', 'When is the tea ready to drink?'),
          body: L(R`Xona harorati $20^\circ$C. Choy $90^\circ$C da quyildi, 10 daqiqadan keyin $60^\circ$C bo‘ldi. Qachon $30^\circ$C bo‘ladi?`, R`Температура комнаты $20^\circ$C. Чай налит при $90^\circ$C, через 10 минут он $60^\circ$C. Когда он станет $30^\circ$C?`, R`The room is at $20^\circ$C. Tea is poured at $90^\circ$C and is $60^\circ$C after 10 minutes. When will it be $30^\circ$C?`),
          steps: [
            L(R`Model: $T'=-k(T-20)$, $T(0)=90$. Ajratamiz: $\dfrac{dT}{T-20}=-k\,dt$, $\ln|T-20|=-kt+C_1$.`, R`Модель: $T'=-k(T-20)$, $T(0)=90$. Разделяем: $\dfrac{dT}{T-20}=-k\,dt$, $\ln|T-20|=-kt+C_1$.`, R`Model: $T'=-k(T-20)$, $T(0)=90$. Separate: $\dfrac{dT}{T-20}=-k\,dt$, $\ln|T-20|=-kt+C_1$.`),
            L(R`Shartdan: $T=20+70e^{-kt}$.`, R`Из условия: $T=20+70e^{-kt}$.`, R`From the condition: $T=20+70e^{-kt}$.`),
            L(R`$T(10)=60$: $70e^{-10k}=40$, $k=\dfrac{1}{10}\ln\dfrac74\approx0{,}0560$ (1/daq).`, R`$T(10)=60$: $70e^{-10k}=40$, $k=\dfrac{1}{10}\ln\dfrac74\approx0{,}0560$ (1/мин).`, R`$T(10)=60$: $70e^{-10k}=40$, $k=\dfrac{1}{10}\ln\dfrac74\approx0.0560$ (per min).`),
            L(R`$T=30$: $70e^{-kt}=10$, $t=\dfrac{\ln7}{k}=\dfrac{10\ln7}{\ln(7/4)}\approx34{,}8$ daqiqa.`, R`$T=30$: $70e^{-kt}=10$, $t=\dfrac{\ln7}{k}=\dfrac{10\ln7}{\ln(7/4)}\approx34{,}8$ мин.`, R`$T=30$: $70e^{-kt}=10$, $t=\dfrac{\ln7}{k}=\dfrac{10\ln7}{\ln(7/4)}\approx34.8$ minutes.`)
          ],
          check: L(R`$T(10)=20+70\cdot\frac47=60$ ✓; $T(t)=20+70\cdot\frac17=30$ ✓.`, R`$T(10)=20+70\cdot\frac47=60$ ✓; $T(t)=20+70\cdot\frac17=30$ ✓.`, R`$T(10)=20+70\cdot\frac47=60$ ✓; $T(t)=20+70\cdot\frac17=30$ ✓.`) },
        { type: 'example', title: L('Tarmoqda virus: SI modeli', 'Вирус в сети: модель SI', 'A virus in a network: the SI model'),
          body: L(R`Tarmoqda $N=1000$ ta kompyuter. Zararlangan kompyuterlar soni $I(t)$ uchun $I'=\beta I(N-I)$ (zararlanish tezligi zararlangan va hali sog‘ kompyuterlar uchrashuvlari soniga proporsional). $I(0)=10$, $I(1)=50$ ($t$ — soat). Qachon tarmoqning yarmi zararlanadi?`, R`В сети $N=1000$ компьютеров. Для числа заражённых $I(t)$: $I'=\beta I(N-I)$ (скорость заражения пропорциональна числу контактов заражённых и ещё здоровых). $I(0)=10$, $I(1)=50$ ($t$ — часы). Когда заражена половина сети?`, R`A network has $N=1000$ computers. The number of infected ones $I(t)$ satisfies $I'=\beta I(N-I)$ (the infection rate is proportional to the number of contacts between infected and still healthy machines). $I(0)=10$, $I(1)=50$ ($t$ in hours). When is half of the network infected?`),
          steps: [
            L(R`O‘zgarmas yechimlar: $I\equiv0$ va $I\equiv N$. Qolganlari uchun sodda kasrlar: $\dfrac{dI}{I(N-I)}=\dfrac1N\left(\dfrac1I+\dfrac1{N-I}\right)dI=\beta\,dt$.`, R`Постоянные решения: $I\equiv0$ и $I\equiv N$. Для остальных простейшие дроби: $\dfrac{dI}{I(N-I)}=\dfrac1N\left(\dfrac1I+\dfrac1{N-I}\right)dI=\beta\,dt$.`, R`Constant solutions: $I\equiv0$ and $I\equiv N$. For the others use partial fractions: $\dfrac{dI}{I(N-I)}=\dfrac1N\left(\dfrac1I+\dfrac1{N-I}\right)dI=\beta\,dt$.`),
            L(R`$\ln\left|\dfrac{I}{N-I}\right|=rt+C_1$, $r=\beta N$. Bundan $I=\dfrac{N}{1+Ae^{-rt}}$, $A=\dfrac{N-I_0}{I_0}=99$.`, R`$\ln\left|\dfrac{I}{N-I}\right|=rt+C_1$, $r=\beta N$. Отсюда $I=\dfrac{N}{1+Ae^{-rt}}$, $A=\dfrac{N-I_0}{I_0}=99$.`, R`$\ln\left|\dfrac{I}{N-I}\right|=rt+C_1$ with $r=\beta N$. Hence $I=\dfrac{N}{1+Ae^{-rt}}$, $A=\dfrac{N-I_0}{I_0}=99$.`),
            L(R`$I(1)=50$: $1+99e^{-r}=20$, $e^{-r}=\dfrac{19}{99}$, $r=\ln\dfrac{99}{19}\approx1{,}651$.`, R`$I(1)=50$: $1+99e^{-r}=20$, $e^{-r}=\dfrac{19}{99}$, $r=\ln\dfrac{99}{19}\approx1{,}651$.`, R`$I(1)=50$: $1+99e^{-r}=20$, $e^{-r}=\dfrac{19}{99}$, $r=\ln\dfrac{99}{19}\approx1.651$.`),
            L(R`$I=500$ bo‘lganda $99e^{-rt}=1$, $t=\dfrac{\ln99}{r}\approx2{,}78$ soat. Bu paytda tarqalish eng tez ($I''=0$ — burilish nuqtasi).`, R`При $I=500$ имеем $99e^{-rt}=1$, $t=\dfrac{\ln99}{r}\approx2{,}78$ ч. В этот момент распространение самое быстрое ($I''=0$ — точка перегиба).`, R`At $I=500$, $99e^{-rt}=1$, so $t=\dfrac{\ln99}{r}\approx2.78$ hours. This is when the spread is fastest ($I''=0$, the inflection point).`)
          ],
          check: L(R`$I(0)=\frac{1000}{100}=10$ ✓, $I(1)=\frac{1000}{1+19}=50$ ✓; $I=N/(1+Ae^{-rt})$ ni qo‘yganda $I'-\frac rN I(N-I)=0$ ✓.`, R`$I(0)=\frac{1000}{100}=10$ ✓, $I(1)=\frac{1000}{1+19}=50$ ✓; подстановка $I=N/(1+Ae^{-rt})$ даёт $I'-\frac rN I(N-I)=0$ ✓.`, R`$I(0)=\frac{1000}{100}=10$ ✓, $I(1)=\frac{1000}{1+19}=50$ ✓; substituting $I=N/(1+Ae^{-rt})$ gives $I'-\frac rN I(N-I)=0$ ✓.`) },
        { type: 'warn', body: L(R`Eksponensial model $I'=kI$ faqat **boshlang‘ich** bosqichda to‘g‘ri: u cheksiz o‘sishni beradi. Resurs (tarmoq hajmi, oziq) cheklangan bo‘lsa, logistik model kerak. Modelning qo‘llanish chegarasini doim ayting.

Birliklarni kuzating: $k$ ning birligi “1/vaqt”; $t$ daqiqada bo‘lsa, $k$ ham “1/daqiqa”.`,
          R`Экспоненциальная модель $I'=kI$ верна только на **начальном** этапе: она даёт неограниченный рост. Если ресурс (размер сети, пища) ограничен, нужна логистическая модель. Всегда указывайте границы применимости модели.

Следите за единицами: единица $k$ — «1/время»; если $t$ в минутах, то и $k$ в «1/мин».`,
          R`The exponential model $I'=kI$ is valid only at the **early** stage: it predicts unbounded growth. When a resource (network size, food) is limited, use the logistic model. Always state where a model applies.

Watch the units: $k$ is measured in “1/time”; if $t$ is in minutes, $k$ is per minute.`) },
        { type: 'lab', lab: 'L04', body: L(R`Laboratoriyada eksponensial va logistik o‘sishni bitta grafikda solishtiring: $r$, $K$ va $P_0$ ni o‘zgartirib, burilish nuqtasi $P=K/2$ da bo‘lishini kuzating.`, R`В лаборатории сравните экспоненциальный и логистический рост на одном графике: меняя $r$, $K$ и $P_0$, убедитесь, что точка перегиба находится при $P=K/2$.`, R`In the lab, compare exponential and logistic growth on one graph: vary $r$, $K$ and $P_0$ and see that the inflection point is at $P=K/2$.`) }
      ]
    }
  ],
  mistakes: [
    L(R`$g(y)$ ga bo‘lib, o‘zgarmas yechimlarni yo‘qotish. $y'=xy^2$ da $y\equiv0$ ham yechim.`, R`Делить на $g(y)$ и терять постоянные решения. У $y'=xy^2$ решение $y\equiv0$ тоже есть.`, R`Dividing by $g(y)$ and losing constant solutions. For $y'=xy^2$, $y\equiv0$ is also a solution.`),
    L(R`$\int\frac{dy}{y}=\ln y$ deb yozish (modulsiz) va natijada $y<0$ yechimlarni yo‘qotish.`, R`Писать $\int\frac{dy}{y}=\ln y$ (без модуля) и терять решения с $y<0$.`, R`Writing $\int\frac{dy}{y}=\ln y$ without the absolute value and losing the solutions with $y<0$.`),
    L(R`$e^{x+C}=e^x+e^C$ deb hisoblash. To‘g‘risi: $e^{x+C}=e^Ce^x=C_2e^x$.`, R`Считать $e^{x+C}=e^x+e^C$. Правильно: $e^{x+C}=e^Ce^x=C_2e^x$.`, R`Thinking $e^{x+C}=e^x+e^C$. Correct: $e^{x+C}=e^Ce^x=C_2e^x$.`),
    L(R`$z=ax+by+c$ almashtirishda $z'=a+by'$ o‘rniga $z'=y'$ deb yozish.`, R`При замене $z=ax+by+c$ писать $z'=y'$ вместо $z'=a+by'$.`, R`With $z=ax+by+c$, writing $z'=y'$ instead of $z'=a+by'$.`),
    L(R`$C$ ni noto‘g‘ri topish: masalan, $\ln|y|=x+C$ dan $y(0)=2$ da $C=2$ deb olish (to‘g‘risi $C=\ln2$).`, R`Неправильно находить $C$: например, из $\ln|y|=x+C$ при $y(0)=2$ брать $C=2$ (правильно $C=\ln2$).`, R`Finding $C$ incorrectly: e.g. from $\ln|y|=x+C$ with $y(0)=2$ taking $C=2$ (correct: $C=\ln2$).`),
    L(R`Yechimning aniqlanish oralig‘ini ko‘rsatmaslik: $y=\frac{1+x}{1-x}$ faqat $(-\infty,1)$ da Koshi masalasining yechimi.`, R`Не указывать интервал: $y=\frac{1+x}{1-x}$ — решение задачи Коши только на $(-\infty,1)$.`, R`Omitting the interval: $y=\frac{1+x}{1-x}$ solves the Cauchy problem only on $(-\infty,1)$.`)
  ],
  exercises: [
    { id: 't02.x1', level: 'easy', type: 'formula',
      q: L(R`$y'=3x^2y$ tenglamaning umumiy yechimini yozing: $y=\ ?$`, R`Запишите общее решение уравнения $y'=3x^2y$: $y=\ ?$`, R`Write the general solution of $y'=3x^2y$: $y=\ ?$`),
      check: { kind: 'ode', residual: 'yp - 3*x^2*y', order: 1, consts: ['C'], x: [-1.2, 1.2] }, answer: 'C*exp(x^3)',
      hint: L(R`$\dfrac{dy}{y}=3x^2dx$; $y\equiv0$ ni $C=0$ bilan qo‘shing.`, R`$\dfrac{dy}{y}=3x^2dx$; решение $y\equiv0$ войдёт при $C=0$.`, R`$\dfrac{dy}{y}=3x^2dx$; $y\equiv0$ is included with $C=0$.`),
      solution: L(R`$\ln|y|=x^3+C_1$, $y=Ce^{x^3}$ ($C=0$ — yo‘qolgan $y\equiv0$ yechim).`, R`$\ln|y|=x^3+C_1$, $y=Ce^{x^3}$ ($C=0$ — потерянное решение $y\equiv0$).`, R`$\ln|y|=x^3+C_1$, $y=Ce^{x^3}$ ($C=0$ gives the lost solution $y\equiv0$).`) },
    { id: 't02.x2', level: 'easy', type: 'mcq',
      q: L('Qaysi tenglama o‘zgaruvchilari ajraladigan?', 'Какое уравнение с разделяющимися переменными?', 'Which equation is separable?'),
      options: [L(R`$y'=x+y$`, R`$y'=x+y$`, R`$y'=x+y$`), L(R`$y'=e^{x+y}$`, R`$y'=e^{x+y}$`, R`$y'=e^{x+y}$`), L(R`$y'=\sin(xy)$`, R`$y'=\sin(xy)$`, R`$y'=\sin(xy)$`), L(R`$y'=x^2+y^2$`, R`$y'=x^2+y^2$`, R`$y'=x^2+y^2$`)], correct: 1,
      explain: L(R`$e^{x+y}=e^x\cdot e^y$ — ko‘paytma $f(x)g(y)$. Qolganlari bunday ko‘paytmaga ajralmaydi.`, R`$e^{x+y}=e^x\cdot e^y$ — произведение $f(x)g(y)$. Остальные так не раскладываются.`, R`$e^{x+y}=e^x\cdot e^y$ is a product $f(x)g(y)$. The others do not factor this way.`) },
    { id: 't02.x3', level: 'mid', type: 'formula',
      q: L(R`$y'=2x(1+y^2)$ tenglamaning umumiy yechimini yozing: $y=\ ?$`, R`Запишите общее решение $y'=2x(1+y^2)$: $y=\ ?$`, R`Write the general solution of $y'=2x(1+y^2)$: $y=\ ?$`),
      check: { kind: 'ode', residual: 'yp - 2*x*(1+y^2)', order: 1, consts: ['C'], x: [-0.6, 0.6], c: [-0.5, 0.5] }, answer: 'tan(x^2 + C)',
      hint: L(R`$\dfrac{dy}{1+y^2}=2x\,dx$.`, R`$\dfrac{dy}{1+y^2}=2x\,dx$.`, R`$\dfrac{dy}{1+y^2}=2x\,dx$.`),
      solution: L(R`$\arctan y=x^2+C$, $y=\tan(x^2+C)$.`, R`$\arctan y=x^2+C$, $y=\tan(x^2+C)$.`, R`$\arctan y=x^2+C$, $y=\tan(x^2+C)$.`) },
    { id: 't02.x4', level: 'mid', type: 'formula',
      q: L(R`$x\,y'=2y$, $y(1)=3$ Koshi masalasini yeching ($x>0$): $y=\ ?$`, R`Решите задачу Коши $x\,y'=2y$, $y(1)=3$ ($x>0$): $y=\ ?$`, R`Solve the Cauchy problem $x\,y'=2y$, $y(1)=3$ ($x>0$): $y=\ ?$`),
      check: { kind: 'ode', residual: 'x*yp - 2*y', order: 1, consts: [], x: [0.5, 2], ivp: { x0: 1, y0: 3 } }, answer: '3*x^2',
      hint: L(R`$\dfrac{dy}{y}=\dfrac{2\,dx}{x}$.`, R`$\dfrac{dy}{y}=\dfrac{2\,dx}{x}$.`, R`$\dfrac{dy}{y}=\dfrac{2\,dx}{x}$.`),
      solution: L(R`$\ln|y|=2\ln|x|+C_1$, $y=Cx^2$; $y(1)=C=3$, $y=3x^2$.`, R`$\ln|y|=2\ln|x|+C_1$, $y=Cx^2$; $y(1)=C=3$, $y=3x^2$.`, R`$\ln|y|=2\ln|x|+C_1$, $y=Cx^2$; $y(1)=C=3$, $y=3x^2$.`) },
    { id: 't02.x5', level: 'mid', type: 'numeric',
      q: L(R`Radioaktiv modda 5 yilda massasining $20\%$ ini yo‘qotadi. Yarim yemirilish davrini (yilda, 0,1 aniqlikda) toping.`, R`Радиоактивное вещество за 5 лет теряет $20\%$ массы. Найдите период полураспада (в годах, с точностью 0,1).`, R`A radioactive substance loses $20\%$ of its mass in 5 years. Find its half-life (in years, to 0.1).`),
      check: { kind: 'numeric', value: 15.53, tol: 0.1 },
      hint: L(R`$m=m_0e^{-kt}$, $e^{-5k}=0{,}8$; $T_{1/2}=\ln2/k$.`, R`$m=m_0e^{-kt}$, $e^{-5k}=0{,}8$; $T_{1/2}=\ln2/k$.`, R`$m=m_0e^{-kt}$, $e^{-5k}=0.8$; $T_{1/2}=\ln2/k$.`),
      solution: L(R`$k=\frac15\ln\frac54$, $T_{1/2}=\dfrac{5\ln2}{\ln1{,}25}\approx15{,}5$ yil.`, R`$k=\frac15\ln\frac54$, $T_{1/2}=\dfrac{5\ln2}{\ln1{,}25}\approx15{,}5$ лет.`, R`$k=\frac15\ln\frac54$, $T_{1/2}=\dfrac{5\ln2}{\ln1.25}\approx15.5$ years.`) },
    { id: 't02.x6', level: 'mid', type: 'finderror',
      q: L(R`Talaba $y'=y^2\cos x$ ning **barcha** yechimlarini topdi. Qaysi qatorda xato bor?`, R`Студент нашёл **все** решения $y'=y^2\cos x$. В какой строке ошибка?`, R`A student found **all** solutions of $y'=y^2\cos x$. Which line is wrong?`),
      lines: [
        L(R`$\dfrac{dy}{y^2}=\cos x\,dx$`, R`$\dfrac{dy}{y^2}=\cos x\,dx$`, R`$\dfrac{dy}{y^2}=\cos x\,dx$`),
        L(R`$-\dfrac1y=\sin x+C$`, R`$-\dfrac1y=\sin x+C$`, R`$-\dfrac1y=\sin x+C$`),
        L(R`$y=-\dfrac{1}{\sin x+C}$`, R`$y=-\dfrac{1}{\sin x+C}$`, R`$y=-\dfrac{1}{\sin x+C}$`),
        L(R`Boshqa yechim yo‘q.`, R`Других решений нет.`, R`There are no other solutions.`)
      ],
      wrong: 3,
      explain: L(R`$y^2$ ga bo‘lganda $y\equiv0$ yechim yo‘qoldi: $0=0\cdot\cos x$ ✓. U formuladan hech qanday $C$ da chiqmaydi.`, R`При делении на $y^2$ потеряно решение $y\equiv0$: $0=0\cdot\cos x$ ✓. Из формулы оно не получается ни при каком $C$.`, R`Dividing by $y^2$ lost the solution $y\equiv0$: $0=0\cdot\cos x$ ✓. The formula gives it for no $C$.`) },
    { id: 't02.x7', level: 'hard', type: 'formula',
      q: L(R`$y'=(x+y+1)^2$ tenglamaning umumiy yechimini yozing: $y=\ ?$`, R`Запишите общее решение $y'=(x+y+1)^2$: $y=\ ?$`, R`Write the general solution of $y'=(x+y+1)^2$: $y=\ ?$`),
      check: { kind: 'ode', residual: 'yp - (x+y+1)^2', order: 1, consts: ['C'], x: [-0.5, 0.5], c: [-0.5, 0.5] }, answer: 'tan(x + C) - x - 1',
      hint: L(R`$z=x+y+1$, $z'=1+z^2$.`, R`$z=x+y+1$, $z'=1+z^2$.`, R`$z=x+y+1$, $z'=1+z^2$.`),
      solution: L(R`$\arctan z=x+C$, $z=\tan(x+C)$, $y=\tan(x+C)-x-1$.`, R`$\arctan z=x+C$, $z=\tan(x+C)$, $y=\tan(x+C)-x-1$.`, R`$\arctan z=x+C$, $z=\tan(x+C)$, $y=\tan(x+C)-x-1$.`) },
    { id: 't02.x8', level: 'hard', type: 'formula',
      q: L(R`$(1+y^2)\,dx+xy\,dy=0$ tenglamaning umumiy integralini $G(x,y)=C$ ko‘rinishida yozing.`, R`Запишите общий интеграл уравнения $(1+y^2)\,dx+xy\,dy=0$ в виде $G(x,y)=C$.`, R`Write the general integral of $(1+y^2)\,dx+xy\,dy=0$ as $G(x,y)=C$.`),
      check: { kind: 'integral', ref: 'x^2*(1+y^2)', x: [0.3, 2], y: [0.3, 2] }, answer: 'x^2*(1 + y^2) = C',
      hint: L(R`$x(1+y^2)$ ga bo‘ling: $\dfrac{dx}{x}+\dfrac{y\,dy}{1+y^2}=0$. $x\equiv0$ ham integral chiziq ekanini unutmang.`, R`Разделите на $x(1+y^2)$: $\dfrac{dx}{x}+\dfrac{y\,dy}{1+y^2}=0$. Не забудьте, что $x\equiv0$ тоже интегральная кривая.`, R`Divide by $x(1+y^2)$: $\dfrac{dx}{x}+\dfrac{y\,dy}{1+y^2}=0$. Remember that $x\equiv0$ is also an integral curve.`),
      solution: L(R`$\ln|x|+\frac12\ln(1+y^2)=C_1$, ya’ni $x^2(1+y^2)=C$. $C=0$ da $x\equiv0$ chiziq ham hosil bo‘ladi.`, R`$\ln|x|+\frac12\ln(1+y^2)=C_1$, то есть $x^2(1+y^2)=C$. При $C=0$ получается и прямая $x\equiv0$.`, R`$\ln|x|+\frac12\ln(1+y^2)=C_1$, i.e. $x^2(1+y^2)=C$. With $C=0$ we also get the line $x\equiv0$.`) },
    { id: 't02.x9', level: 'hard', type: 'numeric',
      q: L(R`$N=500$ kompyuterli tarmoqda $I'=\beta I(N-I)$, $I(0)=5$, $I(2)=50$ ($t$ — soat). Qachon $I=250$ bo‘ladi? (soatda, 0,01 aniqlikda)`, R`В сети из $N=500$ компьютеров $I'=\beta I(N-I)$, $I(0)=5$, $I(2)=50$ ($t$ в часах). Когда $I=250$? (в часах, с точностью 0,01)`, R`In a network of $N=500$ computers, $I'=\beta I(N-I)$, $I(0)=5$, $I(2)=50$ ($t$ in hours). When is $I=250$? (hours, to 0.01)`),
      check: { kind: 'numeric', value: 3.8326, tol: 0.01 },
      hint: L(R`$I=\dfrac{500}{1+99e^{-rt}}$; $I(2)=50$ dan $e^{-2r}=\frac1{11}$.`, R`$I=\dfrac{500}{1+99e^{-rt}}$; из $I(2)=50$: $e^{-2r}=\frac1{11}$.`, R`$I=\dfrac{500}{1+99e^{-rt}}$; $I(2)=50$ gives $e^{-2r}=\frac1{11}$.`),
      solution: L(R`$r=\frac12\ln11$. $I=250\iff99e^{-rt}=1$, $t=\dfrac{\ln99}{r}=\dfrac{2\ln99}{\ln11}\approx3{,}83$ soat.`, R`$r=\frac12\ln11$. $I=250\iff99e^{-rt}=1$, $t=\dfrac{\ln99}{r}=\dfrac{2\ln99}{\ln11}\approx3{,}83$ ч.`, R`$r=\frac12\ln11$. $I=250\iff99e^{-rt}=1$, $t=\dfrac{\ln99}{r}=\dfrac{2\ln99}{\ln11}\approx3.83$ hours.`) },
    { id: 't02.x10', level: 'easy', type: 'order',
      q: L('Ajraladigan tenglamani yechish qadamlarini to‘g‘ri tartibda joylashtiring.', 'Расположите шаги решения уравнения с разделяющимися переменными в правильном порядке.', 'Put the steps for solving a separable equation in the correct order.'),
      items: [
        L(R`Tenglamani $y'=f(x)g(y)$ ko‘rinishga keltirish`, R`Привести уравнение к виду $y'=f(x)g(y)$`, R`Bring the equation to the form $y'=f(x)g(y)$`),
        L(R`$g(y)=0$ ning ildizlarini — o‘zgarmas yechimlarni yozib qo‘yish`, R`Выписать корни $g(y)=0$ — постоянные решения`, R`Write down the roots of $g(y)=0$, the constant solutions`),
        L(R`Ajratish: $\dfrac{dy}{g(y)}=f(x)\,dx$`, R`Разделить: $\dfrac{dy}{g(y)}=f(x)\,dx$`, R`Separate: $\dfrac{dy}{g(y)}=f(x)\,dx$`),
        L('Ikkala tomonni integrallash, bitta $C$ qo‘shish', 'Проинтегрировать обе части, добавить одну $C$', 'Integrate both sides and add one $C$'),
        L(R`Boshlang‘ich shartdan $C$ ni topish va oraliqni ko‘rsatish`, R`Найти $C$ из начального условия и указать интервал`, R`Find $C$ from the initial condition and state the interval`)
      ],
      explain: L(R`O‘zgarmas yechimlar bo‘lishdan **oldin** yoziladi, aks holda ular yo‘qoladi.`, R`Постоянные решения выписывают **до** деления, иначе они теряются.`, R`Constant solutions are written down **before** dividing, otherwise they get lost.`) },
    { id: 't02.x11', level: 'mid', type: 'match',
      q: L('Jarayonni uning modeli bilan moslang.', 'Сопоставьте процесс и его модель.', 'Match each process with its model.'),
      pairs: [
        { left: L('Radioaktiv yemirilish', 'Радиоактивный распад', 'Radioactive decay'), right: L(R`$m'=-km$`, R`$m'=-km$`, R`$m'=-km$`) },
        { left: L('Choyning sovishi', 'Остывание чая', 'Tea cooling'), right: L(R`$T'=-k(T-T_m)$`, R`$T'=-k(T-T_m)$`, R`$T'=-k(T-T_m)$`) },
        { left: L('Tarmoqda virus (cheklangan tarmoq)', 'Вирус в сети (конечная сеть)', 'Virus in a finite network'), right: L(R`$I'=\beta I(N-I)$`, R`$I'=\beta I(N-I)$`, R`$I'=\beta I(N-I)$`) },
        { left: L('Yangilanishni yuklab olgan qurilmalar', 'Устройства, скачавшие обновление', 'Devices that downloaded an update'), right: L(R`$U'=k(N-U)$`, R`$U'=k(N-U)$`, R`$U'=k(N-U)$`) }
      ],
      explain: L(R`Yuklab olishda tezlik hali yuklab olmaganlar soni $N-U$ ga proporsional; virusda esa zararlanganlar va sog‘lar uchrashuviga, ya’ni $I(N-I)$ ga.`, R`При скачивании скорость пропорциональна числу ещё не скачавших $N-U$; для вируса — числу контактов заражённых и здоровых, то есть $I(N-I)$.`, R`For downloads the rate is proportional to those who have not yet downloaded, $N-U$; for the virus, to contacts between infected and healthy machines, $I(N-I)$.`) }
  ],
  quiz: [
    { id: 't02.q1', q: L(R`$y'=y(y-2)$ tenglamaning o‘zgarmas yechimlari:`, R`Постоянные решения уравнения $y'=y(y-2)$:`, R`The constant solutions of $y'=y(y-2)$ are:`),
      options: [L(R`faqat $y=0$`, R`только $y=0$`, R`only $y=0$`), L(R`$y=0$ va $y=2$`, R`$y=0$ и $y=2$`, R`$y=0$ and $y=2$`), L(R`$y=-2$`, R`$y=-2$`, R`$y=-2$`), L('yo‘q', 'нет', 'none')], correct: 1,
      explain: L(R`$g(y)=y(y-2)=0\Rightarrow y=0,\ y=2$.`, R`$g(y)=y(y-2)=0\Rightarrow y=0,\ y=2$.`, R`$g(y)=y(y-2)=0\Rightarrow y=0,\ y=2$.`),
      why: [L(R`$y=2$ ham ildiz.`, R`$y=2$ тоже корень.`, R`$y=2$ is also a root.`), null, L(R`$g(-2)=8\ne0$.`, R`$g(-2)=8\ne0$.`, R`$g(-2)=8\ne0$.`), L(R`$g(y)=0$ ning ildizlari bor.`, R`У $g(y)=0$ есть корни.`, R`$g(y)=0$ does have roots.`)] },
    { id: 't02.q2', q: L(R`$\int\dfrac{dy}{y}$ ning to‘g‘ri yozuvi:`, R`Правильная запись $\int\dfrac{dy}{y}$:`, R`The correct form of $\int\dfrac{dy}{y}$:`),
      options: [L(R`$\ln y+C$`, R`$\ln y+C$`, R`$\ln y+C$`), L(R`$\ln|y|+C$`, R`$\ln|y|+C$`, R`$\ln|y|+C$`), L(R`$\dfrac{1}{y^2}+C$`, R`$\dfrac{1}{y^2}+C$`, R`$\dfrac{1}{y^2}+C$`), L(R`$-\dfrac1{y^2}+C$`, R`$-\dfrac1{y^2}+C$`, R`$-\dfrac1{y^2}+C$`)], correct: 1,
      explain: L(R`$y<0$ da ham $(\ln|y|)'=\frac1y$.`, R`И при $y<0$ $(\ln|y|)'=\frac1y$.`, R`For $y<0$ too, $(\ln|y|)'=\frac1y$.`),
      why: [L(R`$y<0$ da $\ln y$ aniqlanmagan.`, R`При $y<0$ $\ln y$ не определён.`, R`$\ln y$ is undefined for $y<0$.`), null, L('Bu hosila, integral emas, ishorasi ham noto‘g‘ri.', 'Это похоже на производную, а не на интеграл.', 'That resembles a derivative, not an antiderivative.'), L(R`$\left(-\frac1{y^2}\right)'=\frac2{y^3}\ne\frac1y$.`, R`$\left(-\frac1{y^2}\right)'=\frac2{y^3}\ne\frac1y$.`, R`$\left(-\frac1{y^2}\right)'=\frac2{y^3}\ne\frac1y$.`)] },
    { id: 't02.q3', q: L(R`$y'=f(2x-y+3)$ uchun qulay almashtirish:`, R`Удобная замена для $y'=f(2x-y+3)$:`, R`A convenient substitution for $y'=f(2x-y+3)$:`),
      options: [L(R`$y=ux$`, R`$y=ux$`, R`$y=ux$`), L(R`$z=2x-y+3$`, R`$z=2x-y+3$`, R`$z=2x-y+3$`), L(R`$z=y^2$`, R`$z=y^2$`, R`$z=y^2$`), L(R`$x=e^t$`, R`$x=e^t$`, R`$x=e^t$`)], correct: 1,
      explain: L(R`$z'=2-y'=2-f(z)$ — ajraladigan.`, R`$z'=2-y'=2-f(z)$ — с разделяющимися переменными.`, R`$z'=2-y'=2-f(z)$ is separable.`),
      why: [L(R`$y=ux$ bir jinsli tenglamalar uchun (3-mavzu).`, R`$y=ux$ — для однородных уравнений (тема 3).`, R`$y=ux$ is for homogeneous equations (topic 3).`), null, L('Bu o‘ng tomonni soddalashtirmaydi.', 'Это не упрощает правую часть.', 'It does not simplify the right side.'), L('Bu Eyler tenglamasi uchun almashtirish.', 'Это замена для уравнения Эйлера.', 'That substitution is for Euler equations.')] },
    { id: 't02.q4', q: L(R`$z=x+2y$ bo‘lsa, $z'$ teng:`, R`Если $z=x+2y$, то $z'$ равно:`, R`If $z=x+2y$, then $z'$ equals:`),
      options: [L(R`$2y'$`, R`$2y'$`, R`$2y'$`), L(R`$1+2y'$`, R`$1+2y'$`, R`$1+2y'$`), L(R`$1+y'$`, R`$1+y'$`, R`$1+y'$`), L(R`$x+2y'$`, R`$x+2y'$`, R`$x+2y'$`)], correct: 1,
      explain: L(R`$(x)'=1$, $(2y)'=2y'$.`, R`$(x)'=1$, $(2y)'=2y'$.`, R`$(x)'=1$, $(2y)'=2y'$.`),
      why: [L(R`$x$ ning hosilasi 1 tushib qolgan.`, R`Потеряна производная $x$, равная 1.`, R`The derivative of $x$, which is 1, is missing.`), null, L(R`2 koeffitsiyent tushib qolgan.`, R`Потерян коэффициент 2.`, R`The factor 2 is missing.`), L(R`$x$ ning hosilasi $x$ emas.`, R`Производная $x$ — не $x$.`, R`The derivative of $x$ is not $x$.`)] },
    { id: 't02.q5', q: L(R`$T'=-k(T-20)$, $T(0)=80$ ning yechimi:`, R`Решение $T'=-k(T-20)$, $T(0)=80$:`, R`The solution of $T'=-k(T-20)$, $T(0)=80$:`),
      options: [L(R`$T=80e^{-kt}$`, R`$T=80e^{-kt}$`, R`$T=80e^{-kt}$`), L(R`$T=20+60e^{-kt}$`, R`$T=20+60e^{-kt}$`, R`$T=20+60e^{-kt}$`), L(R`$T=20+80e^{-kt}$`, R`$T=20+80e^{-kt}$`, R`$T=20+80e^{-kt}$`), L(R`$T=60+20e^{-kt}$`, R`$T=60+20e^{-kt}$`, R`$T=60+20e^{-kt}$`)], correct: 1,
      explain: L(R`$T-20=(80-20)e^{-kt}$.`, R`$T-20=(80-20)e^{-kt}$.`, R`$T-20=(80-20)e^{-kt}$.`),
      why: [L(R`Bu $T\to0$ ga intiladi, xona haroratiga emas.`, R`Здесь $T\to0$, а должно стремиться к температуре комнаты.`, R`Here $T\to0$, not to room temperature.`), null, L(R`$T(0)=100\ne80$.`, R`$T(0)=100\ne80$.`, R`$T(0)=100\ne80$.`), L(R`$t\to\infty$ da $60$ ga intiladi — noto‘g‘ri.`, R`При $t\to\infty$ стремится к $60$ — неверно.`, R`It tends to $60$ as $t\to\infty$, which is wrong.`)] },
    { id: 't02.q6', q: L(R`Yarim yemirilish davri $T_{1/2}$ va $k$ orasidagi bog‘lanish ($m'=-km$):`, R`Связь периода полураспада $T_{1/2}$ и $k$ ($m'=-km$):`, R`The relation between the half-life $T_{1/2}$ and $k$ ($m'=-km$):`),
      options: [L(R`$T_{1/2}=\dfrac{\ln2}{k}$`, R`$T_{1/2}=\dfrac{\ln2}{k}$`, R`$T_{1/2}=\dfrac{\ln2}{k}$`), L(R`$T_{1/2}=\dfrac{k}{2}$`, R`$T_{1/2}=\dfrac{k}{2}$`, R`$T_{1/2}=\dfrac{k}{2}$`), L(R`$T_{1/2}=\dfrac{1}{2k}$`, R`$T_{1/2}=\dfrac{1}{2k}$`, R`$T_{1/2}=\dfrac{1}{2k}$`), L(R`$T_{1/2}=k\ln2$`, R`$T_{1/2}=k\ln2$`, R`$T_{1/2}=k\ln2$`)], correct: 0,
      explain: L(R`$e^{-kT}=\frac12\Rightarrow kT=\ln2$.`, R`$e^{-kT}=\frac12\Rightarrow kT=\ln2$.`, R`$e^{-kT}=\frac12\Rightarrow kT=\ln2$.`),
      why: [null, L('Birligi noto‘g‘ri: $k$ ning birligi 1/vaqt.', 'Неверная размерность: $k$ имеет единицу 1/время.', 'Wrong units: $k$ is measured in 1/time.'), L(R`Logarifm yo‘qolgan: $e^{-kT}=\frac12$ dan $\ln2$ chiqadi.`, R`Потерян логарифм: из $e^{-kT}=\frac12$ получается $\ln2$.`, R`The logarithm is missing: $e^{-kT}=\frac12$ gives $\ln2$.`), L('$k$ ga bo‘linishi kerak, ko‘paytirilmaydi.', 'На $k$ надо делить, а не умножать.', 'Divide by $k$, do not multiply.')] },
    { id: 't02.q7', q: L(R`Logistik $P'=rP(1-P/K)$ modelda o‘sish eng tez bo‘lgan holat:`, R`В логистической модели $P'=rP(1-P/K)$ рост быстрее всего при:`, R`In the logistic model $P'=rP(1-P/K)$ growth is fastest when:`),
      options: [L(R`$P=K$`, R`$P=K$`, R`$P=K$`), L(R`$P=K/2$`, R`$P=K/2$`, R`$P=K/2$`), L(R`$P=0$`, R`$P=0$`, R`$P=0$`), L(R`$P=2K$`, R`$P=2K$`, R`$P=2K$`)], correct: 1,
      explain: L(R`$rP(1-P/K)$ parabola, uning eng katta qiymati $P=K/2$ da.`, R`$rP(1-P/K)$ — парабола с максимумом при $P=K/2$.`, R`$rP(1-P/K)$ is a parabola with its maximum at $P=K/2$.`),
      why: [L(R`$P=K$ da $P'=0$ — muvozanat.`, R`При $P=K$ $P'=0$ — равновесие.`, R`At $P=K$, $P'=0$: equilibrium.`), null, L(R`$P=0$ da $P'=0$.`, R`При $P=0$ $P'=0$.`, R`At $P=0$, $P'=0$.`), L(R`$P>K$ da $P'<0$ — kamayadi.`, R`При $P>K$ $P'<0$ — убывает.`, R`For $P>K$, $P'<0$: it decreases.`)] },
    { id: 't02.q8', q: L(R`$y'=\dfrac{1+y^2}{1+x^2}$, $y(0)=1$ yechimi qaysi oraliqda mavjud?`, R`На каком интервале существует решение $y'=\dfrac{1+y^2}{1+x^2}$, $y(0)=1$?`, R`On which interval does the solution of $y'=\dfrac{1+y^2}{1+x^2}$, $y(0)=1$ exist?`),
      options: [L(R`$\mathbb R$`, R`$\mathbb R$`, R`$\mathbb R$`), L(R`$(-\infty,1)$`, R`$(-\infty,1)$`, R`$(-\infty,1)$`), L(R`$(-1,1)$`, R`$(-1,1)$`, R`$(-1,1)$`), L(R`$(1,\infty)$`, R`$(1,\infty)$`, R`$(1,\infty)$`)], correct: 1,
      explain: L(R`$y=\frac{1+x}{1-x}$, $x=1$ da cheksizga ketadi.`, R`$y=\frac{1+x}{1-x}$ уходит в бесконечность при $x=1$.`, R`$y=\frac{1+x}{1-x}$ blows up at $x=1$.`),
      why: [L(R`$x=1$ da yechim uziladi.`, R`При $x=1$ решение разрывается.`, R`The solution breaks down at $x=1$.`), null, L(R`$x=-1$ da hech narsa bo‘lmaydi: $y(-1)=0$.`, R`При $x=-1$ ничего не происходит: $y(-1)=0$.`, R`Nothing happens at $x=-1$: $y(-1)=0$.`), L(R`Oraliq $x_0=0$ ni o‘z ichiga olishi kerak.`, R`Интервал должен содержать $x_0=0$.`, R`The interval must contain $x_0=0$.`)] },
    { id: 't02.q9', q: L(R`$y'=\cos(x-y)$ ning qaysi funksiya yechimi **emas**?`, R`Какая функция **не** является решением $y'=\cos(x-y)$?`, R`Which function is **not** a solution of $y'=\cos(x-y)$?`),
      options: [L(R`$y=x$`, R`$y=x$`, R`$y=x$`), L(R`$y=x-2\pi$`, R`$y=x-2\pi$`, R`$y=x-2\pi$`), L(R`$y=x-\pi$`, R`$y=x-\pi$`, R`$y=x-\pi$`), L(R`$y=x+2\pi$`, R`$y=x+2\pi$`, R`$y=x+2\pi$`)], correct: 2,
      explain: L(R`$y=x-\pi$: $y'=1$, lekin $\cos\pi=-1$.`, R`$y=x-\pi$: $y'=1$, но $\cos\pi=-1$.`, R`$y=x-\pi$: $y'=1$ but $\cos\pi=-1$.`),
      why: [L(R`$y'=1=\cos0$ ✓.`, R`$y'=1=\cos0$ ✓.`, R`$y'=1=\cos0$ ✓.`), L(R`$y'=1=\cos2\pi$ ✓.`, R`$y'=1=\cos2\pi$ ✓.`, R`$y'=1=\cos2\pi$ ✓.`), null, L(R`$y'=1=\cos(-2\pi)$ ✓.`, R`$y'=1=\cos(-2\pi)$ ✓.`, R`$y'=1=\cos(-2\pi)$ ✓.`)] },
    { id: 't02.q10', q: L(R`$\ln|y|=x^2+C_1$ dan keyin to‘g‘ri umumiy yechim (shu jumladan $y\equiv0$):`, R`После $\ln|y|=x^2+C_1$ правильное общее решение (включая $y\equiv0$):`, R`After $\ln|y|=x^2+C_1$, the correct general solution (including $y\equiv0$):`),
      options: [L(R`$y=e^{x^2}+C$`, R`$y=e^{x^2}+C$`, R`$y=e^{x^2}+C$`), L(R`$y=Ce^{x^2}$, $C\in\mathbb R$`, R`$y=Ce^{x^2}$, $C\in\mathbb R$`, R`$y=Ce^{x^2}$, $C\in\mathbb R$`), L(R`$y=e^{x^2+C}$, $C\in\mathbb R$`, R`$y=e^{x^2+C}$, $C\in\mathbb R$`, R`$y=e^{x^2+C}$, $C\in\mathbb R$`), L(R`$y=Cx^2$`, R`$y=Cx^2$`, R`$y=Cx^2$`)], correct: 1,
      explain: L(R`$|y|=e^{C_1}e^{x^2}$, $y=\pm e^{C_1}e^{x^2}$; $C=\pm e^{C_1}$ va $C=0$ ($y\equiv0$) birlashtiriladi.`, R`$|y|=e^{C_1}e^{x^2}$, $y=\pm e^{C_1}e^{x^2}$; объединяем $C=\pm e^{C_1}$ и $C=0$ ($y\equiv0$).`, R`$|y|=e^{C_1}e^{x^2}$, $y=\pm e^{C_1}e^{x^2}$; combine $C=\pm e^{C_1}$ with $C=0$ ($y\equiv0$).`),
      why: [L(R`$e^{x^2+C_1}\ne e^{x^2}+C$.`, R`$e^{x^2+C_1}\ne e^{x^2}+C$.`, R`$e^{x^2+C_1}\ne e^{x^2}+C$.`), null, L(R`Bu faqat $y>0$ yechimlarni beradi, $y\le0$ yo‘qoladi.`, R`Даёт только решения с $y>0$; решения с $y\le0$ теряются.`, R`This gives only $y>0$; solutions with $y\le0$ are lost.`), L(R`Eksponentani unutish: $\ln|y|=x^2$ dan $y=x^2$ chiqmaydi.`, R`Забыта экспонента: из $\ln|y|=x^2$ не следует $y=x^2$.`, R`The exponential was forgotten: $\ln|y|=x^2$ does not give $y=x^2$.`)] }
  ]
});
})();
