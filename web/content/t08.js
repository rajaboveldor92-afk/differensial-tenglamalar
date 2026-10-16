(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't08', num: 8,
  title: L('O‘zgarmas koeffitsiyentli bir jinsli chiziqli tenglamalar', 'Линейные однородные уравнения с постоянными коэффициентами', 'Homogeneous linear equations with constant coefficients'),
  syllabus: { lecture: 'M8', seminar: 'S8', outcomes: ['TN3', 'TN5'], independent: [7, 8] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L('Tenglama bo‘yicha xarakteristik ko‘phadni yoza olasiz va uning ildizlarini karraligi bilan topa olasiz.', 'Записывать характеристический многочлен уравнения и находить его корни с учётом кратности.', 'Write the characteristic polynomial of an equation and find its roots with their multiplicities.'),
    L('Har xil haqiqiy, karrali va kompleks ildizlar uchun fundamental yechimlar sistemasini tuza olasiz.', 'Строить фундаментальную систему решений для различных вещественных, кратных и комплексных корней.', 'Build a fundamental set of solutions for distinct real, repeated and complex roots.'),
    L('Yuqori tartibli tenglamaning umumiy yechimini yoza olasiz va Koshi masalasini yecha olasiz.', 'Записывать общее решение уравнения высокого порядка и решать задачу Коши.', 'Write the general solution of a higher-order equation and solve Cauchy problems.'),
    L('Erkin mexanik tebranishlarni (so‘nmaydigan, kuchsiz so‘nuvchi, kritik, kuchli so‘nuvchi) tahlil qila olasiz.', 'Анализировать свободные механические колебания (незатухающие, слабо затухающие, критические, сильно затухающие).', 'Analyse free mechanical vibrations (undamped, underdamped, critically damped, overdamped).'),
    L('Berilgan yechimlar bo‘yicha ularni qanoatlantiruvchi eng past tartibli tenglamani tiklay olasiz.', 'Восстанавливать уравнение наименьшего порядка по заданным решениям.', 'Recover the lowest-order equation that has given functions as solutions.')
  ],
  prereqKnowledge: [
    L('Chiziqli bir jinsli tenglama yechimlarining xossalari, Vronskian va fundamental sistema (7-mavzu).', 'Свойства решений линейного однородного уравнения, вронскиан и фундаментальная система (тема 7).', 'Properties of solutions of linear homogeneous equations, the Wronskian and fundamental sets (topic 7).'),
    L(R`Kvadrat va kub ko‘phadlarni ko‘paytuvchilarga ajratish, kompleks sonlar, $e^{i\varphi}=\cos\varphi+i\sin\varphi$ Eyler formulasi.`, R`Разложение квадратных и кубических многочленов на множители, комплексные числа, формула Эйлера $e^{i\varphi}=\cos\varphi+i\sin\varphi$.`, R`Factoring quadratic and cubic polynomials, complex numbers, Euler’s formula $e^{i\varphi}=\cos\varphi+i\sin\varphi$.`),
    L('Ikkinchi Nyuton qonuni va Guk qonuni.', 'Второй закон Ньютона и закон Гука.', 'Newton’s second law and Hooke’s law.')
  ],
  sources: [
    { id: 'dilmurodov', ref: '§7.1–§7.2', verified: true },
    { id: 'ergashev', ref: '2.2', verified: true },
    { id: 'kohler', ref: '3.3–3.6, 3.12', verified: true },
    { id: 'logan', ref: '2.1–2.2, 2.5', verified: true },
    { id: 'goode', ref: '8.2, 8.5', verified: true },
    { id: 'filippov', ref: '§11', verified: false },
    { id: 'boyce', ref: 'Ch. 3, Ch. 4', verified: false }
  ],
  labs: ['L05', 'L06'],
  lessons: [
    {
      id: 't08.1',
      title: L('Xarakteristik tenglama. Har xil haqiqiy ildizlar', 'Характеристическое уравнение. Различные вещественные корни', 'The characteristic equation. Distinct real roots'),
      blocks: [
        { type: 'intro', title: L('Manbasiz RLC zanjir', 'RLC-цепь без источника', 'An RLC circuit without a source'),
          body: L(R`Kondensator zaryadlangan, so‘ng batareya uzildi. Zanjirda $L=1$ Gn, $R=3$ Om, $C=0{,}5$ F. Kirxgof qonuni zaryad $q(t)$ uchun quyidagini beradi:
$$q''+3q'+2q=0.$$
Yechimni $q=e^{rt}$ ko‘rinishida izlab ko‘ring. Har bir hosila faqat $r$ ko‘paytuvchini beradi: $q'=re^{rt}$, $q''=r^2e^{rt}$. Qo‘yamiz va $e^{rt}\ne0$ ga qisqartiramiz:
$$r^2+3r+2=0\ \Rightarrow\ r=-1,\ r=-2.$$
Demak, $e^{-t}$ va $e^{-2t}$ — yechimlar, zaryad esa $q=C_1e^{-t}+C_2e^{-2t}$ kabi so‘nadi. Differensial tenglama **algebraik** tenglamaga aylandi.`,
          R`Конденсатор заряжен, затем батарею отключили. В цепи $L=1$ Гн, $R=3$ Ом, $C=0{,}5$ Ф. Закон Кирхгофа даёт для заряда $q(t)$:
$$q''+3q'+2q=0.$$
Попробуйте искать решение в виде $q=e^{rt}$. Каждая производная даёт лишь множитель $r$: $q'=re^{rt}$, $q''=r^2e^{rt}$. Подставляем и сокращаем на $e^{rt}\ne0$:
$$r^2+3r+2=0\ \Rightarrow\ r=-1,\ r=-2.$$
Значит, $e^{-t}$ и $e^{-2t}$ — решения, а заряд затухает как $q=C_1e^{-t}+C_2e^{-2t}$. Дифференциальное уравнение превратилось в **алгебраическое**.`,
          R`A capacitor is charged and then the battery is removed. The circuit has $L=1$ H, $R=3$ Ω, $C=0.5$ F. Kirchhoff’s law gives for the charge $q(t)$:
$$q''+3q'+2q=0.$$
Try a solution of the form $q=e^{rt}$. Each derivative only brings a factor $r$: $q'=re^{rt}$, $q''=r^2e^{rt}$. Substitute and cancel $e^{rt}\ne0$:
$$r^2+3r+2=0\ \Rightarrow\ r=-1,\ r=-2.$$
So $e^{-t}$ and $e^{-2t}$ are solutions and the charge decays like $q=C_1e^{-t}+C_2e^{-2t}$. The differential equation has turned into an **algebraic** one.`) },
        { type: 'def', title: L('Xarakteristik ko‘phad', 'Характеристический многочлен', 'The characteristic polynomial'),
          body: L(R`$a_1,\dots,a_n$ — haqiqiy **o‘zgarmaslar** bo‘lsin. Ushbu tenglama **o‘zgarmas koeffitsiyentli chiziqli bir jinsli** tenglama deyiladi:
$$L[y]\equiv y^{(n)}+a_1y^{(n-1)}+\dots+a_{n-1}y'+a_ny=0.$$
$$P(r)=r^n+a_1r^{n-1}+\dots+a_{n-1}r+a_n$$
ko‘phad **xarakteristik ko‘phad**, $P(r)=0$ esa **xarakteristik tenglama** deyiladi. Uni olish qoidasi: $y^{(k)}\to r^k$, xususan $y\to r^0=1$.

Asosiy ayniyat: istalgan (hatto kompleks) $r$ uchun
$$L[e^{rx}]=P(r)\,e^{rx}.$$
Shuning uchun $e^{rx}$ yechim bo‘ladi $\iff$ $P(r)=0$.`,
          R`Пусть $a_1,\dots,a_n$ — вещественные **постоянные**. Уравнение
$$L[y]\equiv y^{(n)}+a_1y^{(n-1)}+\dots+a_{n-1}y'+a_ny=0$$
называется **линейным однородным уравнением с постоянными коэффициентами**. Многочлен
$$P(r)=r^n+a_1r^{n-1}+\dots+a_{n-1}r+a_n$$
называется **характеристическим многочленом**, а $P(r)=0$ — **характеристическим уравнением**. Правило: $y^{(k)}\to r^k$, в частности $y\to r^0=1$.

Основное тождество: при любом (даже комплексном) $r$
$$L[e^{rx}]=P(r)\,e^{rx}.$$
Поэтому $e^{rx}$ — решение $\iff$ $P(r)=0$.`,
          R`Let $a_1,\dots,a_n$ be real **constants**. The equation
$$L[y]\equiv y^{(n)}+a_1y^{(n-1)}+\dots+a_{n-1}y'+a_ny=0$$
is a **homogeneous linear equation with constant coefficients**. The polynomial
$$P(r)=r^n+a_1r^{n-1}+\dots+a_{n-1}r+a_n$$
is its **characteristic polynomial** and $P(r)=0$ its **characteristic equation**. Rule: $y^{(k)}\to r^k$, in particular $y\to r^0=1$.

Key identity: for every (even complex) $r$
$$L[e^{rx}]=P(r)\,e^{rx}.$$
Hence $e^{rx}$ is a solution $\iff$ $P(r)=0$.`) },
        { type: 'thm', title: L('Har xil haqiqiy ildizlar', 'Различные вещественные корни', 'Distinct real roots'),
          conds: L(R`1. $a_1,\dots,a_n$ — haqiqiy o‘zgarmaslar;
2. $P(r)$ ning $n$ ta ildizi $r_1,\dots,r_n$ haqiqiy va **juft-jufti bilan har xil**.`,
          R`1. $a_1,\dots,a_n$ — вещественные постоянные;
2. все $n$ корней $r_1,\dots,r_n$ многочлена $P(r)$ вещественны и **попарно различны**.`,
          R`1. $a_1,\dots,a_n$ are real constants;
2. the $n$ roots $r_1,\dots,r_n$ of $P(r)$ are real and **pairwise distinct**.`),
          body: L(R`U holda $e^{r_1x},\dots,e^{r_nx}$ butun $\mathbb R$ da fundamental yechimlar sistemasini tashkil qiladi va umumiy yechim
$$y=C_1e^{r_1x}+C_2e^{r_2x}+\dots+C_ne^{r_nx},\qquad x\in\mathbb R.$$`,
          R`Тогда $e^{r_1x},\dots,e^{r_nx}$ образуют фундаментальную систему решений на всей $\mathbb R$, и общее решение
$$y=C_1e^{r_1x}+C_2e^{r_2x}+\dots+C_ne^{r_nx},\qquad x\in\mathbb R.$$`,
          R`Then $e^{r_1x},\dots,e^{r_nx}$ form a fundamental set of solutions on all of $\mathbb R$, and the general solution is
$$y=C_1e^{r_1x}+C_2e^{r_2x}+\dots+C_ne^{r_nx},\qquad x\in\mathbb R.$$`) },
        { type: 'proof', body: L(R`Har bir $e^{r_kx}$ yechim, chunki $P(r_k)=0$. Vronskian $x=0$ da Vandermond determinanti: $W(0)=\prod_{j<k}(r_k-r_j)\ne0$, chunki ildizlar har xil. 7-mavzudagi teoremaga ko‘ra, yechimlar Vronskiani bir nuqtada nolga teng bo‘lmasa, ular chiziqli erkli (Dilmuradov, §7.2).`,
          R`Каждая $e^{r_kx}$ — решение, так как $P(r_k)=0$. Вронскиан в точке $x=0$ — определитель Вандермонда: $W(0)=\prod_{j<k}(r_k-r_j)\ne0$, поскольку корни различны. По теореме из темы 7 решения, вронскиан которых не равен нулю в одной точке, линейно независимы (Дилмурадов, §7.2).`,
          R`Each $e^{r_kx}$ is a solution because $P(r_k)=0$. At $x=0$ the Wronskian is a Vandermonde determinant: $W(0)=\prod_{j<k}(r_k-r_j)\ne0$ since the roots are distinct. By the theorem of topic 7, solutions whose Wronskian is non-zero at one point are linearly independent (Dilmuradov, §7.2).`) },
        { type: 'example', title: L('Koshi masalasi: ikki haqiqiy ildiz', 'Задача Коши: два вещественных корня', 'Cauchy problem: two real roots'),
          body: L(R`$y''-y'-6y=0$, $y(0)=1$, $y'(0)=8$ masalani yeching.`, R`Решите задачу $y''-y'-6y=0$, $y(0)=1$, $y'(0)=8$.`, R`Solve $y''-y'-6y=0$, $y(0)=1$, $y'(0)=8$.`),
          steps: [
            L(R`Xarakteristik tenglama: $r^2-r-6=0$, ya’ni $(r-3)(r+2)=0$, $r_1=3$, $r_2=-2$.`, R`Характеристическое уравнение: $r^2-r-6=0$, то есть $(r-3)(r+2)=0$, $r_1=3$, $r_2=-2$.`, R`Characteristic equation: $r^2-r-6=0$, i.e. $(r-3)(r+2)=0$, $r_1=3$, $r_2=-2$.`),
            L(R`Umumiy yechim: $y=C_1e^{3x}+C_2e^{-2x}$, $y'=3C_1e^{3x}-2C_2e^{-2x}$.`, R`Общее решение: $y=C_1e^{3x}+C_2e^{-2x}$, $y'=3C_1e^{3x}-2C_2e^{-2x}$.`, R`General solution: $y=C_1e^{3x}+C_2e^{-2x}$, $y'=3C_1e^{3x}-2C_2e^{-2x}$.`),
            L(R`Shartlar: $C_1+C_2=1$, $3C_1-2C_2=8$. Qo‘shib: $5C_1=10$, $C_1=2$, $C_2=-1$.`, R`Условия: $C_1+C_2=1$, $3C_1-2C_2=8$. Отсюда $5C_1=10$, $C_1=2$, $C_2=-1$.`, R`Conditions: $C_1+C_2=1$, $3C_1-2C_2=8$. Hence $5C_1=10$, $C_1=2$, $C_2=-1$.`),
            L(R`Javob: $y=2e^{3x}-e^{-2x}$, $x\in\mathbb R$.`, R`Ответ: $y=2e^{3x}-e^{-2x}$, $x\in\mathbb R$.`, R`Answer: $y=2e^{3x}-e^{-2x}$, $x\in\mathbb R$.`)
          ],
          check: L(R`$y''-y'-6y=(18-6-12)e^{3x}+(-4-2+6)e^{-2x}=0$ ✓; $y(0)=2-1=1$ ✓; $y'(0)=6+2=8$ ✓.`, R`$y''-y'-6y=(18-6-12)e^{3x}+(-4-2+6)e^{-2x}=0$ ✓; $y(0)=2-1=1$ ✓; $y'(0)=6+2=8$ ✓.`, R`$y''-y'-6y=(18-6-12)e^{3x}+(-4-2+6)e^{-2x}=0$ ✓; $y(0)=2-1=1$ ✓; $y'(0)=6+2=8$ ✓.`) },
        { type: 'warn', body: L(R`Xarakteristik tenglamada $y$ ning o‘rniga **1** yoziladi, $0$ emas, $r$ ham emas. $y''+4y=0$ uchun $r^2+4=0$ (to‘g‘ri), $r^2+4r=0$ (xato). Aksincha, $y''+4y'=0$ da $y$ hadi yo‘q: $r^2+4r=0$, $r=0$ ildiz esa umumiy yechimda o‘zgarmas $C_1e^{0x}=C_1$ ni beradi.`,
          R`В характеристическом уравнении вместо $y$ пишется **1**, а не $0$ и не $r$. Для $y''+4y=0$: $r^2+4=0$ (верно), $r^2+4r=0$ (ошибка). Наоборот, в $y''+4y'=0$ члена с $y$ нет: $r^2+4r=0$, а корень $r=0$ даёт в общем решении постоянную $C_1e^{0x}=C_1$.`,
          R`In the characteristic equation $y$ becomes **1**, not $0$ and not $r$. For $y''+4y=0$: $r^2+4=0$ (correct), $r^2+4r=0$ (wrong). Conversely, $y''+4y'=0$ has no $y$ term: $r^2+4r=0$, and the root $r=0$ contributes the constant $C_1e^{0x}=C_1$ to the general solution.`) }
      ]
    },
    {
      id: 't08.2',
      title: L('Karrali va kompleks ildizlar', 'Кратные и комплексные корни', 'Repeated and complex roots'),
      blocks: [
        { type: 'thm', title: L('Karrali ildiz', 'Кратный корень', 'A repeated root'),
          conds: L(R`1. $a_1,\dots,a_n$ — haqiqiy o‘zgarmaslar;
2. $r_0$ — $P(r)$ ning $k$ **karrali** ildizi: $P(r_0)=P'(r_0)=\dots=P^{(k-1)}(r_0)=0$, $P^{(k)}(r_0)\ne0$.`,
          R`1. $a_1,\dots,a_n$ — вещественные постоянные;
2. $r_0$ — корень $P(r)$ **кратности** $k$: $P(r_0)=P'(r_0)=\dots=P^{(k-1)}(r_0)=0$, $P^{(k)}(r_0)\ne0$.`,
          R`1. $a_1,\dots,a_n$ are real constants;
2. $r_0$ is a root of $P(r)$ of **multiplicity** $k$: $P(r_0)=P'(r_0)=\dots=P^{(k-1)}(r_0)=0$, $P^{(k)}(r_0)\ne0$.`),
          body: L(R`U holda $r_0$ ildizga $k$ ta chiziqli erkli yechim mos keladi:
$$e^{r_0x},\ xe^{r_0x},\ \dots,\ x^{k-1}e^{r_0x}.$$
Barcha ildizlar bo‘yicha shunday yechimlarni yig‘sak, jami $n$ ta funksiya fundamental sistemani tashkil qiladi.`,
          R`Тогда корню $r_0$ соответствуют $k$ линейно независимых решений:
$$e^{r_0x},\ xe^{r_0x},\ \dots,\ x^{k-1}e^{r_0x}.$$
Собрав такие решения по всем корням, получим ровно $n$ функций, образующих фундаментальную систему.`,
          R`Then the root $r_0$ gives $k$ linearly independent solutions:
$$e^{r_0x},\ xe^{r_0x},\ \dots,\ x^{k-1}e^{r_0x}.$$
Collecting such solutions over all roots gives exactly $n$ functions, which form a fundamental set.`) },
        { type: 'proof', body: L(R`$L[e^{rx}]=P(r)e^{rx}$ ayniyatni $r$ bo‘yicha $j$ marta differensiallaymiz. $L$ faqat $x$ bo‘yicha ishlagani uchun $\partial_r$ bilan o‘rin almashadi, $\partial_r^j e^{rx}=x^je^{rx}$:
$$L[x^je^{rx}]=\sum_{i=0}^{j}\binom ji P^{(i)}(r)\,x^{j-i}e^{rx}.$$
$r=r_0$ va $j\le k-1$ da barcha $P^{(i)}(r_0)=0$, demak $L[x^je^{r_0x}]=0$.`,
          R`Продифференцируем тождество $L[e^{rx}]=P(r)e^{rx}$ по $r$ $j$ раз. Оператор $L$ действует по $x$, поэтому перестановочен с $\partial_r$, а $\partial_r^j e^{rx}=x^je^{rx}$:
$$L[x^je^{rx}]=\sum_{i=0}^{j}\binom ji P^{(i)}(r)\,x^{j-i}e^{rx}.$$
При $r=r_0$ и $j\le k-1$ все $P^{(i)}(r_0)=0$, значит $L[x^je^{r_0x}]=0$.`,
          R`Differentiate the identity $L[e^{rx}]=P(r)e^{rx}$ $j$ times with respect to $r$. Since $L$ acts in $x$ it commutes with $\partial_r$, and $\partial_r^j e^{rx}=x^je^{rx}$:
$$L[x^je^{rx}]=\sum_{i=0}^{j}\binom ji P^{(i)}(r)\,x^{j-i}e^{rx}.$$
At $r=r_0$ with $j\le k-1$ every $P^{(i)}(r_0)=0$, so $L[x^je^{r_0x}]=0$.`) },
        { type: 'example', title: L('Ikki karrali ildiz', 'Двукратный корень', 'A double root'),
          body: L(R`$y''+6y'+9y=0$, $y(0)=2$, $y'(0)=-1$.`, R`$y''+6y'+9y=0$, $y(0)=2$, $y'(0)=-1$.`, R`$y''+6y'+9y=0$, $y(0)=2$, $y'(0)=-1$.`),
          steps: [
            L(R`$r^2+6r+9=(r+3)^2=0$: $r=-3$, karraligi $k=2$.`, R`$r^2+6r+9=(r+3)^2=0$: $r=-3$ кратности $k=2$.`, R`$r^2+6r+9=(r+3)^2=0$: $r=-3$ with multiplicity $k=2$.`),
            L(R`Fundamental sistema: $e^{-3x}$, $xe^{-3x}$. Umumiy yechim $y=(C_1+C_2x)e^{-3x}$.`, R`Фундаментальная система: $e^{-3x}$, $xe^{-3x}$. Общее решение $y=(C_1+C_2x)e^{-3x}$.`, R`Fundamental set: $e^{-3x}$, $xe^{-3x}$. General solution $y=(C_1+C_2x)e^{-3x}$.`),
            L(R`$y'=(C_2-3C_1-3C_2x)e^{-3x}$. Shartlar: $C_1=2$, $C_2-3C_1=-1\Rightarrow C_2=5$.`, R`$y'=(C_2-3C_1-3C_2x)e^{-3x}$. Условия: $C_1=2$, $C_2-3C_1=-1\Rightarrow C_2=5$.`, R`$y'=(C_2-3C_1-3C_2x)e^{-3x}$. Conditions: $C_1=2$, $C_2-3C_1=-1\Rightarrow C_2=5$.`),
            L(R`Javob: $y=(2+5x)e^{-3x}$.`, R`Ответ: $y=(2+5x)e^{-3x}$.`, R`Answer: $y=(2+5x)e^{-3x}$.`)
          ],
          check: L(R`$y'=(-1-15x)e^{-3x}$, $y''=(-12+45x)e^{-3x}$; $y''+6y'+9y=(-12+45x-6-90x+18+45x)e^{-3x}=0$ ✓; $y(0)=2$ ✓, $y'(0)=-1$ ✓.`, R`$y'=(-1-15x)e^{-3x}$, $y''=(-12+45x)e^{-3x}$; $y''+6y'+9y=(-12+45x-6-90x+18+45x)e^{-3x}=0$ ✓; $y(0)=2$ ✓, $y'(0)=-1$ ✓.`, R`$y'=(-1-15x)e^{-3x}$, $y''=(-12+45x)e^{-3x}$; $y''+6y'+9y=(-12+45x-6-90x+18+45x)e^{-3x}=0$ ✓; $y(0)=2$ ✓, $y'(0)=-1$ ✓.`) },
        { type: 'thm', title: L('Kompleks ildizlar', 'Комплексные корни', 'Complex roots'),
          conds: L(R`1. $a_1,\dots,a_n$ — **haqiqiy** o‘zgarmaslar;
2. $\alpha\pm i\beta$ ($\beta>0$) — $P(r)$ ning qo‘shma kompleks ildizlari, har biri $k$ karrali.`,
          R`1. $a_1,\dots,a_n$ — **вещественные** постоянные;
2. $\alpha\pm i\beta$ ($\beta>0$) — пара сопряжённых комплексных корней $P(r)$, каждый кратности $k$.`,
          R`1. $a_1,\dots,a_n$ are **real** constants;
2. $\alpha\pm i\beta$ ($\beta>0$) is a pair of conjugate complex roots of $P(r)$, each of multiplicity $k$.`),
          body: L(R`U holda bu juftlikka $2k$ ta haqiqiy chiziqli erkli yechim mos keladi:
$$x^je^{\alpha x}\cos\beta x,\qquad x^je^{\alpha x}\sin\beta x,\qquad j=0,1,\dots,k-1.$$
Xususan, oddiy ($k=1$) juftlik uchun: $y=e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$.`,
          R`Тогда этой паре соответствуют $2k$ вещественных линейно независимых решений:
$$x^je^{\alpha x}\cos\beta x,\qquad x^je^{\alpha x}\sin\beta x,\qquad j=0,1,\dots,k-1.$$
В частности, для простой ($k=1$) пары: $y=e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$.`,
          R`Then this pair gives $2k$ real linearly independent solutions:
$$x^je^{\alpha x}\cos\beta x,\qquad x^je^{\alpha x}\sin\beta x,\qquad j=0,1,\dots,k-1.$$
In particular, for a simple ($k=1$) pair: $y=e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$.`) },
        { type: 'proof', body: L(R`Eyler formulasi: $e^{(\alpha+i\beta)x}=e^{\alpha x}(\cos\beta x+i\sin\beta x)$ — kompleks yechim. Koeffitsiyentlar haqiqiy bo‘lgani uchun $L[u+iv]=L[u]+iL[v]=0$ dan $L[u]=0$ va $L[v]=0$ kelib chiqadi: kompleks yechimning haqiqiy va mavhum qismlari alohida yechimlardir. Qo‘shma ildiz $\alpha-i\beta$ yangi haqiqiy yechim bermaydi (Dilmuradov, §7.1).`,
          R`По формуле Эйлера $e^{(\alpha+i\beta)x}=e^{\alpha x}(\cos\beta x+i\sin\beta x)$ — комплексное решение. Так как коэффициенты вещественны, из $L[u+iv]=L[u]+iL[v]=0$ следует $L[u]=0$ и $L[v]=0$: вещественная и мнимая части комплексного решения сами являются решениями. Сопряжённый корень $\alpha-i\beta$ новых вещественных решений не даёт (Дилмурадов, §7.1).`,
          R`By Euler’s formula $e^{(\alpha+i\beta)x}=e^{\alpha x}(\cos\beta x+i\sin\beta x)$ is a complex solution. Because the coefficients are real, $L[u+iv]=L[u]+iL[v]=0$ implies $L[u]=0$ and $L[v]=0$: the real and imaginary parts of a complex solution are solutions themselves. The conjugate root $\alpha-i\beta$ gives no new real solutions (Dilmuradov, §7.1).`) },
        { type: 'example', title: L('Kompleks ildizlar: Koshi masalasi', 'Комплексные корни: задача Коши', 'Complex roots: a Cauchy problem'),
          body: L(R`$y''-2y'+5y=0$, $y(0)=1$, $y'(0)=5$.`, R`$y''-2y'+5y=0$, $y(0)=1$, $y'(0)=5$.`, R`$y''-2y'+5y=0$, $y(0)=1$, $y'(0)=5$.`),
          steps: [
            L(R`$r^2-2r+5=0$: diskriminant $4-20=-16<0$, $r=1\pm2i$. Demak, $\alpha=1$, $\beta=2$.`, R`$r^2-2r+5=0$: дискриминант $4-20=-16<0$, $r=1\pm2i$. Значит, $\alpha=1$, $\beta=2$.`, R`$r^2-2r+5=0$: discriminant $4-20=-16<0$, $r=1\pm2i$. So $\alpha=1$, $\beta=2$.`),
            L(R`Umumiy yechim: $y=e^{x}(C_1\cos2x+C_2\sin2x)$.`, R`Общее решение: $y=e^{x}(C_1\cos2x+C_2\sin2x)$.`, R`General solution: $y=e^{x}(C_1\cos2x+C_2\sin2x)$.`),
            L(R`$y(0)=C_1=1$. $y'=e^x\big((C_1+2C_2)\cos2x+(C_2-2C_1)\sin2x\big)$, $y'(0)=C_1+2C_2=5\Rightarrow C_2=2$.`, R`$y(0)=C_1=1$. $y'=e^x\big((C_1+2C_2)\cos2x+(C_2-2C_1)\sin2x\big)$, $y'(0)=C_1+2C_2=5\Rightarrow C_2=2$.`, R`$y(0)=C_1=1$. $y'=e^x\big((C_1+2C_2)\cos2x+(C_2-2C_1)\sin2x\big)$, $y'(0)=C_1+2C_2=5\Rightarrow C_2=2$.`),
            L(R`Javob: $y=e^{x}(\cos2x+2\sin2x)$ — amplitudasi $e^x$ kabi o‘sib boruvchi tebranish.`, R`Ответ: $y=e^{x}(\cos2x+2\sin2x)$ — колебание с растущей как $e^x$ амплитудой.`, R`Answer: $y=e^{x}(\cos2x+2\sin2x)$, an oscillation whose amplitude grows like $e^x$.`)
          ],
          check: L(R`$y''-2y'+5y\equiv0$ ✓, $y(0)=1$ ✓, $y'(0)=1+4=5$ ✓.`, R`$y''-2y'+5y\equiv0$ ✓, $y(0)=1$ ✓, $y'(0)=1+4=5$ ✓.`, R`$y''-2y'+5y\equiv0$ ✓, $y(0)=1$ ✓, $y'(0)=1+4=5$ ✓.`) },
        { type: 'note', title: L('Ildiz → fundamental yechimlar (jadval)', 'Корень → фундаментальные решения (таблица)', 'Root → fundamental solutions (table)'),
          body: L(R`- Oddiy haqiqiy ildiz $r$: $e^{rx}$.
- $k$ karrali haqiqiy ildiz $r$: $e^{rx},\ xe^{rx},\dots,x^{k-1}e^{rx}$.
- Oddiy juftlik $\alpha\pm i\beta$: $e^{\alpha x}\cos\beta x,\ e^{\alpha x}\sin\beta x$.
- $k$ karrali juftlik $\alpha\pm i\beta$: $x^je^{\alpha x}\cos\beta x,\ x^je^{\alpha x}\sin\beta x$, $j=0,\dots,k-1$.

Nazorat: funksiyalar soni har doim tenglama tartibi $n$ ga teng.`,
          R`- Простой вещественный корень $r$: $e^{rx}$.
- Вещественный корень $r$ кратности $k$: $e^{rx},\ xe^{rx},\dots,x^{k-1}e^{rx}$.
- Простая пара $\alpha\pm i\beta$: $e^{\alpha x}\cos\beta x,\ e^{\alpha x}\sin\beta x$.
- Пара $\alpha\pm i\beta$ кратности $k$: $x^je^{\alpha x}\cos\beta x,\ x^je^{\alpha x}\sin\beta x$, $j=0,\dots,k-1$.

Контроль: число функций всегда равно порядку уравнения $n$.`,
          R`- Simple real root $r$: $e^{rx}$.
- Real root $r$ of multiplicity $k$: $e^{rx},\ xe^{rx},\dots,x^{k-1}e^{rx}$.
- Simple pair $\alpha\pm i\beta$: $e^{\alpha x}\cos\beta x,\ e^{\alpha x}\sin\beta x$.
- Pair $\alpha\pm i\beta$ of multiplicity $k$: $x^je^{\alpha x}\cos\beta x,\ x^je^{\alpha x}\sin\beta x$, $j=0,\dots,k-1$.

Check: the number of functions always equals the order $n$ of the equation.`) },
        { type: 'warn', body: L(R`Kompleks juftlik $\alpha\pm i\beta$ uchun **ikkita** funksiya yoziladi, to‘rtta emas: $\cos(-\beta x)$ va $\sin(-\beta x)$ yangi yechim emas. Chastota — $\beta$, $\alpha$ esa amplitudaning o‘sish/so‘nish ko‘rsatkichi. $i$ ni kosinus ichida qoldirmang: $\cos(2ix)$ emas, $\cos 2x$.`,
          R`Для комплексной пары $\alpha\pm i\beta$ пишутся **две** функции, а не четыре: $\cos(-\beta x)$ и $\sin(-\beta x)$ — не новые решения. Частота — это $\beta$, а $\alpha$ — показатель роста/затухания амплитуды. Не оставляйте $i$ внутри косинуса: не $\cos(2ix)$, а $\cos 2x$.`,
          R`A complex pair $\alpha\pm i\beta$ gives **two** functions, not four: $\cos(-\beta x)$ and $\sin(-\beta x)$ are not new solutions. The frequency is $\beta$, while $\alpha$ is the growth/decay rate of the amplitude. Do not keep $i$ inside the cosine: write $\cos 2x$, not $\cos(2ix)$.`) },
        { type: 'lab', lab: 'L05', body: L(R`L05 laboratoriyasida $a$ va $b$ ni o‘zgartirib, $y''+ay'+by=0$ ning ildizlari kompleks tekislikda qanday siljishini va yechim grafigi qanday o‘zgarishini kuzating: ildizlar chap yarim tekislikda — so‘nish, o‘ng yarim tekislikda — o‘sish, mavhum o‘qda — so‘nmaydigan tebranish.`, R`В лаборатории L05 меняйте $a$ и $b$ и наблюдайте, как корни $y''+ay'+by=0$ движутся по комплексной плоскости и как меняется график решения: корни в левой полуплоскости — затухание, в правой — рост, на мнимой оси — незатухающие колебания.`, R`In lab L05, vary $a$ and $b$ and watch how the roots of $y''+ay'+by=0$ move in the complex plane and how the solution graph changes: roots in the left half-plane mean decay, in the right half-plane growth, on the imaginary axis undamped oscillation.`) }
      ]
    },
    {
      id: 't08.3',
      title: L('Yuqori tartib va erkin tebranishlar', 'Высокий порядок и свободные колебания', 'Higher order and free vibrations'),
      blocks: [
        { type: 'example', title: L('Uchinchi va to‘rtinchi tartib', 'Третий и четвёртый порядок', 'Third and fourth order'),
          body: L(R`Umumiy yechimni toping: a) $y'''+y''-y'-y=0$; b) $y^{(4)}+8y''+16y=0$.`, R`Найдите общее решение: а) $y'''+y''-y'-y=0$; б) $y^{(4)}+8y''+16y=0$.`, R`Find the general solution: a) $y'''+y''-y'-y=0$; b) $y^{(4)}+8y''+16y=0$.`),
          steps: [
            L(R`a) Guruhlaymiz: $r^3+r^2-r-1=r^2(r+1)-(r+1)=(r+1)^2(r-1)$. Ildizlar: $r=1$ (oddiy), $r=-1$ (2 karrali).`, R`а) Группируем: $r^3+r^2-r-1=r^2(r+1)-(r+1)=(r+1)^2(r-1)$. Корни: $r=1$ (простой), $r=-1$ (кратности 2).`, R`a) Group the terms: $r^3+r^2-r-1=r^2(r+1)-(r+1)=(r+1)^2(r-1)$. Roots: $r=1$ (simple), $r=-1$ (double).`),
            L(R`a) Uchta funksiya: $e^{x}$, $e^{-x}$, $xe^{-x}$. $y=C_1e^{x}+(C_2+C_3x)e^{-x}$.`, R`а) Три функции: $e^{x}$, $e^{-x}$, $xe^{-x}$. $y=C_1e^{x}+(C_2+C_3x)e^{-x}$.`, R`a) Three functions: $e^{x}$, $e^{-x}$, $xe^{-x}$. $y=C_1e^{x}+(C_2+C_3x)e^{-x}$.`),
            L(R`b) $r^4+8r^2+16=(r^2+4)^2$: $r=\pm2i$, har biri 2 karrali ($\alpha=0$, $\beta=2$, $k=2$).`, R`б) $r^4+8r^2+16=(r^2+4)^2$: $r=\pm2i$, каждый кратности 2 ($\alpha=0$, $\beta=2$, $k=2$).`, R`b) $r^4+8r^2+16=(r^2+4)^2$: $r=\pm2i$, each of multiplicity 2 ($\alpha=0$, $\beta=2$, $k=2$).`),
            L(R`b) To‘rtta funksiya: $\cos2x,\ \sin2x,\ x\cos2x,\ x\sin2x$. $y=(C_1+C_2x)\cos2x+(C_3+C_4x)\sin2x$.`, R`б) Четыре функции: $\cos2x,\ \sin2x,\ x\cos2x,\ x\sin2x$. $y=(C_1+C_2x)\cos2x+(C_3+C_4x)\sin2x$.`, R`b) Four functions: $\cos2x,\ \sin2x,\ x\cos2x,\ x\sin2x$. $y=(C_1+C_2x)\cos2x+(C_3+C_4x)\sin2x$.`)
          ],
          check: L(R`sympy bilan ikkala oila tenglamaga qo‘yildi: qoldiq aynan $0$ ✓. Funksiyalar soni tartibga teng: 3 va 4 ✓.`, R`Оба семейства подставлены в уравнения с помощью sympy: невязка тождественно $0$ ✓. Число функций равно порядку: 3 и 4 ✓.`, R`Both families were substituted with sympy: the residual is identically $0$ ✓. The number of functions equals the order: 3 and 4 ✓.`) },
        { type: 'def', title: L('Erkin mexanik tebranishlar', 'Свободные механические колебания', 'Free mechanical vibrations'),
          body: L(R`Massasi $m$ bo‘lgan yuk bikrligi $k$ bo‘lgan prujinaga osilgan, muhitning qarshiligi tezlikka proporsional (koeffitsiyent $c\ge0$). Muvozanatdan siljish $y(t)$ uchun Nyuton qonuni:
$$my''+cy'+ky=0,\qquad r_{1,2}=\frac{-c\pm\sqrt{c^2-4mk}}{2m}.$$
- $c=0$: **so‘nmaydigan** (garmonik) tebranish, $y=A\cos\omega_0t+B\sin\omega_0t$, $\omega_0=\sqrt{k/m}$, davr $2\pi/\omega_0$, amplituda $\sqrt{A^2+B^2}$.
- $0<c^2<4mk$: **kuchsiz so‘nish**, $y=e^{-\delta t}(A\cos\omega t+B\sin\omega t)$, $\delta=\dfrac{c}{2m}$, $\omega=\sqrt{\omega_0^2-\delta^2}$.
- $c^2=4mk$: **kritik so‘nish**, $y=(A+Bt)e^{-\delta t}$ — tebranishsiz eng tez qaytish.
- $c^2>4mk$: **kuchli so‘nish**, ikkita manfiy haqiqiy ildiz, tebranish yo‘q.`,
          R`Груз массы $m$ подвешен на пружине жёсткости $k$, сопротивление среды пропорционально скорости (коэффициент $c\ge0$). Для отклонения $y(t)$ от равновесия закон Ньютона даёт
$$my''+cy'+ky=0,\qquad r_{1,2}=\frac{-c\pm\sqrt{c^2-4mk}}{2m}.$$
- $c=0$: **незатухающие** (гармонические) колебания, $y=A\cos\omega_0t+B\sin\omega_0t$, $\omega_0=\sqrt{k/m}$, период $2\pi/\omega_0$, амплитуда $\sqrt{A^2+B^2}$.
- $0<c^2<4mk$: **слабое затухание**, $y=e^{-\delta t}(A\cos\omega t+B\sin\omega t)$, $\delta=\dfrac{c}{2m}$, $\omega=\sqrt{\omega_0^2-\delta^2}$.
- $c^2=4mk$: **критическое затухание**, $y=(A+Bt)e^{-\delta t}$ — самый быстрый возврат без колебаний.
- $c^2>4mk$: **сильное затухание**, два отрицательных вещественных корня, колебаний нет.`,
          R`A mass $m$ hangs on a spring of stiffness $k$; the resistance of the medium is proportional to velocity (coefficient $c\ge0$). Newton’s law for the displacement $y(t)$ from equilibrium gives
$$my''+cy'+ky=0,\qquad r_{1,2}=\frac{-c\pm\sqrt{c^2-4mk}}{2m}.$$
- $c=0$: **undamped** (harmonic) motion, $y=A\cos\omega_0t+B\sin\omega_0t$, $\omega_0=\sqrt{k/m}$, period $2\pi/\omega_0$, amplitude $\sqrt{A^2+B^2}$.
- $0<c^2<4mk$: **underdamped**, $y=e^{-\delta t}(A\cos\omega t+B\sin\omega t)$, $\delta=\dfrac{c}{2m}$, $\omega=\sqrt{\omega_0^2-\delta^2}$.
- $c^2=4mk$: **critically damped**, $y=(A+Bt)e^{-\delta t}$, the fastest return without oscillation.
- $c^2>4mk$: **overdamped**, two negative real roots, no oscillation.`) },
        { type: 'example', title: L('So‘nuvchi prujina', 'Затухающая пружина', 'A damped spring'),
          body: L(R`$m=1$ kg, $c=2$ N·s/m, $k=5$ N/m. Yuk $1$ m ga tortilib, tezliksiz qo‘yib yuborildi: $y(0)=1$, $y'(0)=0$. Harakatni toping.`, R`$m=1$ кг, $c=2$ Н·с/м, $k=5$ Н/м. Груз оттянули на $1$ м и отпустили без начальной скорости: $y(0)=1$, $y'(0)=0$. Найдите движение.`, R`$m=1$ kg, $c=2$ N·s/m, $k=5$ N/m. The mass is pulled down $1$ m and released from rest: $y(0)=1$, $y'(0)=0$. Find the motion.`),
          steps: [
            L(R`Tenglama $y''+2y'+5y=0$. $c^2-4mk=4-20<0$ — kuchsiz so‘nish.`, R`Уравнение $y''+2y'+5y=0$. $c^2-4mk=4-20<0$ — слабое затухание.`, R`The equation is $y''+2y'+5y=0$. $c^2-4mk=4-20<0$: underdamped.`),
            L(R`$r=-1\pm2i$, $y=e^{-t}(A\cos2t+B\sin2t)$.`, R`$r=-1\pm2i$, $y=e^{-t}(A\cos2t+B\sin2t)$.`, R`$r=-1\pm2i$, $y=e^{-t}(A\cos2t+B\sin2t)$.`),
            L(R`$y(0)=A=1$; $y'(0)=-A+2B=0\Rightarrow B=\frac12$.`, R`$y(0)=A=1$; $y'(0)=-A+2B=0\Rightarrow B=\frac12$.`, R`$y(0)=A=1$; $y'(0)=-A+2B=0\Rightarrow B=\frac12$.`),
            L(R`$y=e^{-t}\left(\cos2t+\frac12\sin2t\right)$. Kvazidavr $2\pi/\omega=\pi$ s; amplituda $\frac{\sqrt5}{2}e^{-t}$ kabi kamayadi.`, R`$y=e^{-t}\left(\cos2t+\frac12\sin2t\right)$. Квазипериод $2\pi/\omega=\pi$ с; амплитуда убывает как $\frac{\sqrt5}{2}e^{-t}$.`, R`$y=e^{-t}\left(\cos2t+\frac12\sin2t\right)$. The quasi-period is $2\pi/\omega=\pi$ s; the amplitude decreases like $\frac{\sqrt5}{2}e^{-t}$.`)
          ],
          check: L(R`$y''+2y'+5y\equiv0$ ✓; $y(0)=1$ ✓; $y'(0)=-1+2\cdot\frac12=0$ ✓.`, R`$y''+2y'+5y\equiv0$ ✓; $y(0)=1$ ✓; $y'(0)=-1+2\cdot\frac12=0$ ✓.`, R`$y''+2y'+5y\equiv0$ ✓; $y(0)=1$ ✓; $y'(0)=-1+2\cdot\frac12=0$ ✓.`) },
        { type: 'warn', body: L(R`So‘nish turi $c$ ning o‘zi bilan emas, balki $c^2-4mk$ ishorasi bilan aniqlanadi. Bir xil $c=4$ da $m=1,k=3$ — kuchli, $m=1,k=4$ — kritik, $m=1,k=8$ — kuchsiz so‘nish. Kritik so‘nishda ham yechim $t$ ko‘paytuvchini oladi: $(A+Bt)e^{-\delta t}$.`,
          R`Тип затухания определяется не самим $c$, а знаком $c^2-4mk$. При одном и том же $c=4$: $m=1,k=3$ — сильное, $m=1,k=4$ — критическое, $m=1,k=8$ — слабое затухание. При критическом затухании в решении появляется множитель $t$: $(A+Bt)e^{-\delta t}$.`,
          R`The type of damping is decided by the sign of $c^2-4mk$, not by $c$ alone. With the same $c=4$: $m=1,k=3$ is overdamped, $m=1,k=4$ critical, $m=1,k=8$ underdamped. In the critical case the solution gets a factor $t$: $(A+Bt)e^{-\delta t}$.`) },
        { type: 'lab', lab: 'L06', body: L(R`L06 laboratoriyasida tashqi kuchni nolga qo‘ying va $c$ ni $0$ dan oshirib boring: garmonik tebranish → kuchsiz so‘nish → kritik → kuchli so‘nish. $c=2\sqrt{mk}$ chegarasini grafikda toping.`, R`В лаборатории L06 установите внешнюю силу равной нулю и увеличивайте $c$ от $0$: гармонические колебания → слабое затухание → критическое → сильное. Найдите на графике границу $c=2\sqrt{mk}$.`, R`In lab L06 set the external force to zero and increase $c$ from $0$: harmonic motion → underdamped → critical → overdamped. Locate the threshold $c=2\sqrt{mk}$ on the graph.`) }
      ]
    }
  ],
  mistakes: [
    L(R`Karrali ildizda $y=C_1e^{rx}+C_2e^{rx}$ yozish. Bu aslida bitta o‘zgarmas $(C_1+C_2)e^{rx}$; ikkinchi yechim $xe^{rx}$.`, R`При кратном корне писать $y=C_1e^{rx}+C_2e^{rx}$. Это фактически одна постоянная $(C_1+C_2)e^{rx}$; второе решение — $xe^{rx}$.`, R`Writing $y=C_1e^{rx}+C_2e^{rx}$ for a double root. That is really one constant $(C_1+C_2)e^{rx}$; the second solution is $xe^{rx}$.`),
    L(R`$r=\alpha\pm i\beta$ da $\alpha$ va $\beta$ ni almashtirish: $y''+2y'+5y=0$ uchun $e^{-2x}\cos x$ emas, $e^{-x}\cos2x$.`, R`Путать $\alpha$ и $\beta$ при $r=\alpha\pm i\beta$: для $y''+2y'+5y=0$ не $e^{-2x}\cos x$, а $e^{-x}\cos2x$.`, R`Swapping $\alpha$ and $\beta$ in $r=\alpha\pm i\beta$: for $y''+2y'+5y=0$ it is $e^{-x}\cos2x$, not $e^{-2x}\cos x$.`),
    L(R`$r=0$ ildizni unutish: $y'''-y'=0$ da $r(r^2-1)=0$, umumiy yechim $C_1+C_2e^{x}+C_3e^{-x}$ (o‘zgarmas $C_1$ kerak).`, R`Забывать корень $r=0$: для $y'''-y'=0$ имеем $r(r^2-1)=0$, общее решение $C_1+C_2e^{x}+C_3e^{-x}$ (нужна постоянная $C_1$).`, R`Forgetting the root $r=0$: for $y'''-y'=0$ we have $r(r^2-1)=0$ and the general solution is $C_1+C_2e^{x}+C_3e^{-x}$ (the constant $C_1$ is needed).`),
    L(R`Kompleks juftlikning karraliligini hisobga olmaslik: $(r^2+1)^2=0$ da $x\cos x$, $x\sin x$ ham kerak.`, R`Не учитывать кратность комплексной пары: при $(r^2+1)^2=0$ нужны ещё $x\cos x$, $x\sin x$.`, R`Ignoring the multiplicity of a complex pair: for $(r^2+1)^2=0$ you also need $x\cos x$, $x\sin x$.`),
    L(R`Boshlang‘ich shartlarni qo‘yishdan oldin $y'$ ni noto‘g‘ri differensiallash (ko‘paytma qoidasini unutish), ayniqsa $(C_1+C_2x)e^{rx}$ va $e^{\alpha x}\cos\beta x$ da.`, R`Ошибаться при дифференцировании $y'$ перед подстановкой начальных условий (забывать правило произведения), особенно для $(C_1+C_2x)e^{rx}$ и $e^{\alpha x}\cos\beta x$.`, R`Computing $y'$ wrongly before applying initial conditions (forgetting the product rule), especially for $(C_1+C_2x)e^{rx}$ and $e^{\alpha x}\cos\beta x$.`)
  ],
  exercises: [
    { id: 't08.x1', level: 'easy', type: 'formula',
      q: L(R`$y''-5y'+6y=0$ ning umumiy yechimini yozing ($C_1$, $C_2$ dan foydalaning).`, R`Запишите общее решение $y''-5y'+6y=0$ (используйте $C_1$, $C_2$).`, R`Write the general solution of $y''-5y'+6y=0$ (use $C_1$, $C_2$).`),
      check: { kind: 'ode', residual: 'ypp - 5*yp + 6*y', order: 2, consts: ['C1', 'C2'], x: [-1, 1] }, answer: 'C1*exp(2*x) + C2*exp(3*x)',
      hint: L(R`$r^2-5r+6=(r-2)(r-3)$.`, R`$r^2-5r+6=(r-2)(r-3)$.`, R`$r^2-5r+6=(r-2)(r-3)$.`),
      solution: L(R`$r_1=2$, $r_2=3$, $y=C_1e^{2x}+C_2e^{3x}$.`, R`$r_1=2$, $r_2=3$, $y=C_1e^{2x}+C_2e^{3x}$.`, R`$r_1=2$, $r_2=3$, $y=C_1e^{2x}+C_2e^{3x}$.`) },
    { id: 't08.x2', level: 'easy', type: 'formula',
      q: L(R`$y''+9y=0$ ning umumiy yechimini yozing.`, R`Запишите общее решение $y''+9y=0$.`, R`Write the general solution of $y''+9y=0$.`),
      check: { kind: 'ode', residual: 'ypp + 9*y', order: 2, consts: ['C1', 'C2'], x: [-1, 1] }, answer: 'C1*cos(3*x) + C2*sin(3*x)',
      hint: L(R`$r^2+9=0$, $r=\pm3i$, ya’ni $\alpha=0$, $\beta=3$.`, R`$r^2+9=0$, $r=\pm3i$, то есть $\alpha=0$, $\beta=3$.`, R`$r^2+9=0$, $r=\pm3i$, so $\alpha=0$, $\beta=3$.`),
      solution: L(R`$y=C_1\cos3x+C_2\sin3x$ — davri $2\pi/3$ bo‘lgan garmonik tebranish.`, R`$y=C_1\cos3x+C_2\sin3x$ — гармоническое колебание с периодом $2\pi/3$.`, R`$y=C_1\cos3x+C_2\sin3x$, a harmonic oscillation with period $2\pi/3$.`) },
    { id: 't08.x3', level: 'easy', type: 'mcq',
      q: L(R`$y''+4y'+4y=0$ ning fundamental yechimlar sistemasi:`, R`Фундаментальная система решений $y''+4y'+4y=0$:`, R`A fundamental set of solutions of $y''+4y'+4y=0$:`),
      options: [L(R`$e^{-2x},\ e^{2x}$`, R`$e^{-2x},\ e^{2x}$`, R`$e^{-2x},\ e^{2x}$`), L(R`$e^{-2x},\ xe^{-2x}$`, R`$e^{-2x},\ xe^{-2x}$`, R`$e^{-2x},\ xe^{-2x}$`), L(R`$e^{-2x},\ 2e^{-2x}$`, R`$e^{-2x},\ 2e^{-2x}$`, R`$e^{-2x},\ 2e^{-2x}$`), L(R`$\cos2x,\ \sin2x$`, R`$\cos2x,\ \sin2x$`, R`$\cos2x,\ \sin2x$`)], correct: 1,
      explain: L(R`$(r+2)^2=0$: $r=-2$ ikki karrali, shuning uchun $e^{-2x}$ va $xe^{-2x}$.`, R`$(r+2)^2=0$: $r=-2$ двукратный, поэтому $e^{-2x}$ и $xe^{-2x}$.`, R`$(r+2)^2=0$: $r=-2$ is double, hence $e^{-2x}$ and $xe^{-2x}$.`) },
    { id: 't08.x4', level: 'mid', type: 'formula',
      q: L(R`$y''+4y'+13y=0$, $y(0)=0$, $y'(0)=6$ Koshi masalasini yeching: $y=\ ?$`, R`Решите задачу Коши $y''+4y'+13y=0$, $y(0)=0$, $y'(0)=6$: $y=\ ?$`, R`Solve the Cauchy problem $y''+4y'+13y=0$, $y(0)=0$, $y'(0)=6$: $y=\ ?$`),
      check: { kind: 'ode', residual: 'ypp + 4*yp + 13*y', order: 2, consts: [], x: [-1, 1], ivp: { x0: 0, y0: 0, yp0: 6 } }, answer: '2*exp(-2*x)*sin(3*x)',
      hint: L(R`$r=-2\pm3i$. $y(0)=0$ dan kosinus oldidagi koeffitsiyent nolga teng.`, R`$r=-2\pm3i$. Из $y(0)=0$ коэффициент при косинусе равен нулю.`, R`$r=-2\pm3i$. From $y(0)=0$ the cosine coefficient is zero.`),
      solution: L(R`$y=e^{-2x}(C_1\cos3x+C_2\sin3x)$; $C_1=0$; $y'(0)=3C_2=6$, $C_2=2$. $y=2e^{-2x}\sin3x$.`, R`$y=e^{-2x}(C_1\cos3x+C_2\sin3x)$; $C_1=0$; $y'(0)=3C_2=6$, $C_2=2$. $y=2e^{-2x}\sin3x$.`, R`$y=e^{-2x}(C_1\cos3x+C_2\sin3x)$; $C_1=0$; $y'(0)=3C_2=6$, $C_2=2$. $y=2e^{-2x}\sin3x$.`) },
    { id: 't08.x5', level: 'mid', type: 'formula',
      q: L(R`$y'''-3y''+3y'-y=0$ ning umumiy yechimini yozing ($C_1,C_2,C_3$).`, R`Запишите общее решение $y'''-3y''+3y'-y=0$ ($C_1,C_2,C_3$).`, R`Write the general solution of $y'''-3y''+3y'-y=0$ ($C_1,C_2,C_3$).`),
      check: { kind: 'ode', residual: 'yppp - 3*ypp + 3*yp - y', order: 3, consts: ['C1', 'C2', 'C3'], x: [-1, 1] }, answer: '(C1 + C2*x + C3*x^2)*exp(x)',
      hint: L(R`$r^3-3r^2+3r-1=(r-1)^3$.`, R`$r^3-3r^2+3r-1=(r-1)^3$.`, R`$r^3-3r^2+3r-1=(r-1)^3$.`),
      solution: L(R`$r=1$ uch karrali: $e^x,\ xe^x,\ x^2e^x$. $y=(C_1+C_2x+C_3x^2)e^x$.`, R`$r=1$ кратности 3: $e^x,\ xe^x,\ x^2e^x$. $y=(C_1+C_2x+C_3x^2)e^x$.`, R`$r=1$ is a triple root: $e^x,\ xe^x,\ x^2e^x$. $y=(C_1+C_2x+C_3x^2)e^x$.`) },
    { id: 't08.x6', level: 'mid', type: 'match',
      q: L(R`Xarakteristik ko‘phadni umumiy yechim bilan moslang.`, R`Сопоставьте характеристический многочлен и общее решение.`, R`Match each characteristic polynomial with the general solution.`),
      pairs: [
        { left: L(R`$r^2-1$`, R`$r^2-1$`, R`$r^2-1$`), right: L(R`$C_1e^x+C_2e^{-x}$`, R`$C_1e^x+C_2e^{-x}$`, R`$C_1e^x+C_2e^{-x}$`) },
        { left: L(R`$r^2+1$`, R`$r^2+1$`, R`$r^2+1$`), right: L(R`$C_1\cos x+C_2\sin x$`, R`$C_1\cos x+C_2\sin x$`, R`$C_1\cos x+C_2\sin x$`) },
        { left: L(R`$(r-1)^2$`, R`$(r-1)^2$`, R`$(r-1)^2$`), right: L(R`$(C_1+C_2x)e^x$`, R`$(C_1+C_2x)e^x$`, R`$(C_1+C_2x)e^x$`) },
        { left: L(R`$r^2-2r+2$`, R`$r^2-2r+2$`, R`$r^2-2r+2$`), right: L(R`$e^x(C_1\cos x+C_2\sin x)$`, R`$e^x(C_1\cos x+C_2\sin x)$`, R`$e^x(C_1\cos x+C_2\sin x)$`) }
      ],
      explain: L(R`Ildizlar: $\pm1$; $\pm i$; $1$ (2 karrali); $1\pm i$.`, R`Корни: $\pm1$; $\pm i$; $1$ (кратности 2); $1\pm i$.`, R`Roots: $\pm1$; $\pm i$; $1$ (double); $1\pm i$.`) },
    { id: 't08.x7', level: 'mid', type: 'finderror',
      q: L(R`Talaba $y''+2y'+y=0$, $y(0)=1$, $y'(0)=0$ ni yechdi. Qaysi qatorda xato?`, R`Студент решал $y''+2y'+y=0$, $y(0)=1$, $y'(0)=0$. В какой строке ошибка?`, R`A student solved $y''+2y'+y=0$, $y(0)=1$, $y'(0)=0$. Which line is wrong?`),
      lines: [
        L(R`$r^2+2r+1=(r+1)^2=0$, $r=-1$ (2 karrali).`, R`$r^2+2r+1=(r+1)^2=0$, $r=-1$ (кратности 2).`, R`$r^2+2r+1=(r+1)^2=0$, $r=-1$ (double).`),
        L(R`$y=C_1e^{-x}+C_2e^{-x}$.`, R`$y=C_1e^{-x}+C_2e^{-x}$.`, R`$y=C_1e^{-x}+C_2e^{-x}$.`),
        L(R`$y(0)=C_1+C_2=1$, $y'(0)=-C_1-C_2=0$.`, R`$y(0)=C_1+C_2=1$, $y'(0)=-C_1-C_2=0$.`, R`$y(0)=C_1+C_2=1$, $y'(0)=-C_1-C_2=0$.`),
        L(R`Sistema ziddiyatli, demak masala yechimga ega emas.`, R`Система несовместна, значит у задачи нет решения.`, R`The system is inconsistent, so the problem has no solution.`)
      ],
      wrong: 1,
      explain: L(R`Ikkinchi yechim $xe^{-x}$ bo‘lishi kerak: $y=(C_1+C_2x)e^{-x}$. Shunda $C_1=1$, $C_2=1$, $y=(1+x)e^{-x}$. Ziddiyat xato fundamental sistemadan kelib chiqdi — Koshi masalasining yechimi doim mavjud.`, R`Второе решение должно быть $xe^{-x}$: $y=(C_1+C_2x)e^{-x}$. Тогда $C_1=1$, $C_2=1$, $y=(1+x)e^{-x}$. Противоречие возникло из-за неверной фундаментальной системы — решение задачи Коши всегда существует.`, R`The second solution must be $xe^{-x}$: $y=(C_1+C_2x)e^{-x}$. Then $C_1=1$, $C_2=1$, $y=(1+x)e^{-x}$. The contradiction came from the wrong fundamental set; the Cauchy problem always has a solution.`) },
    { id: 't08.x8', level: 'hard', type: 'numeric',
      q: L(R`Massasi $m=2$ kg bo‘lgan yuk bikrligi $k=8$ N/m bo‘lgan prujinada. Kritik so‘nishga mos qarshilik koeffitsiyenti $c$ ni (N·s/m) kiriting.`, R`Груз массой $m=2$ кг на пружине жёсткости $k=8$ Н/м. Введите коэффициент сопротивления $c$ (Н·с/м), соответствующий критическому затуханию.`, R`A mass $m=2$ kg hangs on a spring with $k=8$ N/m. Enter the damping coefficient $c$ (N·s/m) that gives critical damping.`),
      check: { kind: 'numeric', value: 8, tol: 1e-6 },
      hint: L(R`Kritik holat: $c^2=4mk$.`, R`Критический случай: $c^2=4mk$.`, R`Critical case: $c^2=4mk$.`),
      solution: L(R`$c=2\sqrt{mk}=2\sqrt{16}=8$. Shunda $2y''+8y'+8y=0$, $(r+2)^2=0$.`, R`$c=2\sqrt{mk}=2\sqrt{16}=8$. Тогда $2y''+8y'+8y=0$, $(r+2)^2=0$.`, R`$c=2\sqrt{mk}=2\sqrt{16}=8$. Then $2y''+8y'+8y=0$, $(r+2)^2=0$.`) },
    { id: 't08.x9', level: 'hard', type: 'numeric',
      q: L(R`$y=x^2e^{-x}+\sin2x$ funksiya yechimi bo‘lgan o‘zgarmas haqiqiy koeffitsiyentli bir jinsli chiziqli tenglamaning eng kichik tartibini kiriting.`, R`Введите наименьший порядок линейного однородного уравнения с постоянными вещественными коэффициентами, решением которого является $y=x^2e^{-x}+\sin2x$.`, R`Enter the lowest order of a homogeneous linear equation with real constant coefficients that has $y=x^2e^{-x}+\sin2x$ as a solution.`),
      check: { kind: 'numeric', value: 5, tol: 0 },
      hint: L(R`$x^2e^{-x}$ uchun $r=-1$ kamida 3 karrali; $\sin2x$ uchun $\pm2i$ juftligi kerak.`, R`Для $x^2e^{-x}$ корень $r=-1$ должен иметь кратность не меньше 3; для $\sin2x$ нужна пара $\pm2i$.`, R`For $x^2e^{-x}$ the root $r=-1$ needs multiplicity at least 3; $\sin2x$ needs the pair $\pm2i$.`),
      solution: L(R`$P(r)=(r+1)^3(r^2+4)$, darajasi $3+2=5$. Kamroq bo‘lishi mumkin emas: $x^2e^{-x}$ uchun $e^{-x},xe^{-x}$ ham fundamental sistemaga kirishi shart.`, R`$P(r)=(r+1)^3(r^2+4)$, степень $3+2=5$. Меньше нельзя: для $x^2e^{-x}$ в фундаментальную систему обязаны войти и $e^{-x},xe^{-x}$.`, R`$P(r)=(r+1)^3(r^2+4)$ has degree $3+2=5$. Lower is impossible: with $x^2e^{-x}$ the functions $e^{-x},xe^{-x}$ must also be in the fundamental set.`) },
    { id: 't08.x10', level: 'hard', type: 'order',
      q: L(R`$y^{(4)}-y=0$, $y(0)=y'(0)=y''(0)=0$, $y'''(0)=2$ masalani yechish qadamlarini tartiblang.`, R`Упорядочите шаги решения задачи $y^{(4)}-y=0$, $y(0)=y'(0)=y''(0)=0$, $y'''(0)=2$.`, R`Order the steps for solving $y^{(4)}-y=0$, $y(0)=y'(0)=y''(0)=0$, $y'''(0)=2$.`),
      items: [
        L(R`$r^4-1=(r-1)(r+1)(r^2+1)=0$`, R`$r^4-1=(r-1)(r+1)(r^2+1)=0$`, R`$r^4-1=(r-1)(r+1)(r^2+1)=0$`),
        L(R`$y=C_1e^x+C_2e^{-x}+C_3\cos x+C_4\sin x$`, R`$y=C_1e^x+C_2e^{-x}+C_3\cos x+C_4\sin x$`, R`$y=C_1e^x+C_2e^{-x}+C_3\cos x+C_4\sin x$`),
        L(R`To‘rt shartdan $C_1=\frac12$, $C_2=-\frac12$, $C_3=0$, $C_4=-1$`, R`Из четырёх условий $C_1=\frac12$, $C_2=-\frac12$, $C_3=0$, $C_4=-1$`, R`From the four conditions $C_1=\frac12$, $C_2=-\frac12$, $C_3=0$, $C_4=-1$`),
        L(R`$y=\sinh x-\sin x$ va tekshiruv`, R`$y=\sinh x-\sin x$ и проверка`, R`$y=\sinh x-\sin x$ and the check`)
      ],
      explain: L(R`Ildizlar → fundamental sistema → o‘zgarmaslar → javob. Tekshiruv: $y^{(4)}=\sinh x-\sin x=y$, $y'''(0)=\cosh0+\cos0=2$ ✓.`, R`Корни → фундаментальная система → постоянные → ответ. Проверка: $y^{(4)}=\sinh x-\sin x=y$, $y'''(0)=\cosh0+\cos0=2$ ✓.`, R`Roots → fundamental set → constants → answer. Check: $y^{(4)}=\sinh x-\sin x=y$, $y'''(0)=\cosh0+\cos0=2$ ✓.`) },
    { id: 't08.x11', level: 'hard', type: 'steps',
      q: L(R`$y''+cy'+4y=0$ (yuk $m=1$, $k=4$) uchun $c$ ga qarab tahlil qiling.`, R`Исследуйте $y''+cy'+4y=0$ (масса $m=1$, $k=4$) в зависимости от $c$.`, R`Analyse $y''+cy'+4y=0$ (mass $m=1$, $k=4$) depending on $c$.`),
      steps: [
        { q: L(R`$c=0$ da harakat:`, R`При $c=0$ движение:`, R`For $c=0$ the motion is:`), options: [L('davri $\\pi$ bo‘lgan garmonik tebranish', 'гармоническое колебание с периодом $\\pi$', 'harmonic with period $\\pi$'), L('so‘nuvchi tebranish', 'затухающее колебание', 'a damped oscillation'), L('eksponensial o‘sish', 'экспоненциальный рост', 'exponential growth')], correct: 0 },
        { q: L(R`Kritik qiymat $c$:`, R`Критическое значение $c$:`, R`The critical value of $c$:`), options: [L('2', '2', '2'), L('4', '4', '4'), L('16', '16', '16')], correct: 1 },
        { q: L(R`$c=5$ da:`, R`При $c=5$:`, R`For $c=5$:`), options: [L(R`kuchli so‘nish, $r=-1,\ -4$`, R`сильное затухание, $r=-1,\ -4$`, R`overdamped, $r=-1,\ -4$`), L('kuchsiz so‘nish', 'слабое затухание', 'underdamped'), L('kritik so‘nish', 'критическое затухание', 'critically damped')], correct: 0 },
        { q: L(R`$c=2$ da kvazichastota $\omega$:`, R`При $c=2$ квазичастота $\omega$:`, R`For $c=2$ the quasi-frequency $\omega$ is:`), options: [L(R`$\sqrt3$`, R`$\sqrt3$`, R`$\sqrt3$`), L('2', '2', '2'), L('1', '1', '1')], correct: 0 }
      ],
      explain: L(R`$r=\frac{-c\pm\sqrt{c^2-16}}{2}$. $c=0$: $\pm2i$, davr $\pi$. $c=4$: $(r+2)^2$. $c=5$: $r^2+5r+4=(r+1)(r+4)$. $c=2$: $r=-1\pm i\sqrt3$.`, R`$r=\frac{-c\pm\sqrt{c^2-16}}{2}$. $c=0$: $\pm2i$, период $\pi$. $c=4$: $(r+2)^2$. $c=5$: $r^2+5r+4=(r+1)(r+4)$. $c=2$: $r=-1\pm i\sqrt3$.`, R`$r=\frac{-c\pm\sqrt{c^2-16}}{2}$. $c=0$: $\pm2i$, period $\pi$. $c=4$: $(r+2)^2$. $c=5$: $r^2+5r+4=(r+1)(r+4)$. $c=2$: $r=-1\pm i\sqrt3$.`) }
  ],
  quiz: [
    { id: 't08.q1', q: L(R`$y''-4y'=0$ ning xarakteristik tenglamasi:`, R`Характеристическое уравнение для $y''-4y'=0$:`, R`The characteristic equation of $y''-4y'=0$ is:`),
      options: [L(R`$r^2-4=0$`, R`$r^2-4=0$`, R`$r^2-4=0$`), L(R`$r^2-4r=0$`, R`$r^2-4r=0$`, R`$r^2-4r=0$`), L(R`$r-4=0$`, R`$r-4=0$`, R`$r-4=0$`), L(R`$r^2-4r+1=0$`, R`$r^2-4r+1=0$`, R`$r^2-4r+1=0$`)], correct: 1,
      explain: L(R`$y''\to r^2$, $y'\to r$; $y$ hadi yo‘q.`, R`$y''\to r^2$, $y'\to r$; члена с $y$ нет.`, R`$y''\to r^2$, $y'\to r$; there is no $y$ term.`),
      why: [L(R`$y'$ ga $r$ mos keladi, $1$ emas.`, R`$y'$ соответствует $r$, а не $1$.`, R`$y'$ corresponds to $r$, not $1$.`), null, L(R`Tartib 2, demak ko‘phad darajasi 2.`, R`Порядок 2, значит, степень многочлена 2.`, R`The order is 2, so the polynomial has degree 2.`), L(R`$y$ hadi yo‘q, ozod had $0$.`, R`Члена с $y$ нет, свободный член $0$.`, R`There is no $y$ term, so the constant term is $0$.`)] },
    { id: 't08.q2', q: L(R`$y''-4y'=0$ ning umumiy yechimi:`, R`Общее решение $y''-4y'=0$:`, R`The general solution of $y''-4y'=0$:`),
      options: [L(R`$C_1+C_2e^{4x}$`, R`$C_1+C_2e^{4x}$`, R`$C_1+C_2e^{4x}$`), L(R`$C_1e^{2x}+C_2e^{-2x}$`, R`$C_1e^{2x}+C_2e^{-2x}$`, R`$C_1e^{2x}+C_2e^{-2x}$`), L(R`$C_1e^{4x}$`, R`$C_1e^{4x}$`, R`$C_1e^{4x}$`), L(R`$(C_1+C_2x)e^{4x}$`, R`$(C_1+C_2x)e^{4x}$`, R`$(C_1+C_2x)e^{4x}$`)], correct: 0,
      explain: L(R`$r(r-4)=0$: $r=0$ — o‘zgarmas, $r=4$ — $e^{4x}$.`, R`$r(r-4)=0$: $r=0$ даёт постоянную, $r=4$ — $e^{4x}$.`, R`$r(r-4)=0$: $r=0$ gives a constant, $r=4$ gives $e^{4x}$.`),
      why: [null, L(R`Bu $y''-4y=0$ ning yechimi.`, R`Это решение $y''-4y=0$.`, R`That solves $y''-4y=0$.`), L('Ikkinchi tartibda ikkita o‘zgarmas kerak.', 'Для второго порядка нужны две постоянные.', 'Second order needs two constants.'), L(R`$r=4$ karrali emas.`, R`$r=4$ не кратный.`, R`$r=4$ is not a repeated root.`)] },
    { id: 't08.q3', q: L(R`$r=2\pm3i$ ildizlarga mos haqiqiy yechimlar:`, R`Вещественные решения, отвечающие корням $r=2\pm3i$:`, R`Real solutions corresponding to the roots $r=2\pm3i$:`),
      options: [L(R`$e^{3x}\cos2x,\ e^{3x}\sin2x$`, R`$e^{3x}\cos2x,\ e^{3x}\sin2x$`, R`$e^{3x}\cos2x,\ e^{3x}\sin2x$`), L(R`$e^{2x}\cos3x,\ e^{2x}\sin3x$`, R`$e^{2x}\cos3x,\ e^{2x}\sin3x$`, R`$e^{2x}\cos3x,\ e^{2x}\sin3x$`), L(R`$e^{2x},\ e^{3x}$`, R`$e^{2x},\ e^{3x}$`, R`$e^{2x},\ e^{3x}$`), L(R`$\cos2x,\ \sin3x$`, R`$\cos2x,\ \sin3x$`, R`$\cos2x,\ \sin3x$`)], correct: 1,
      explain: L(R`$\alpha=2$ — eksponenta ko‘rsatkichi, $\beta=3$ — chastota.`, R`$\alpha=2$ — показатель экспоненты, $\beta=3$ — частота.`, R`$\alpha=2$ is the exponential rate, $\beta=3$ the frequency.`),
      why: [L(R`$\alpha$ va $\beta$ almashtirilgan.`, R`Перепутаны $\alpha$ и $\beta$.`, R`$\alpha$ and $\beta$ are swapped.`), null, L('Mavhum qism tebranishni beradi, haqiqiy ildiz emas.', 'Мнимая часть даёт колебание, это не вещественные корни.', 'The imaginary part gives oscillation; these are not real roots.'), L(R`Ikkala funksiya bir xil $e^{\alpha x}$ va $\beta$ ga ega bo‘lishi kerak.`, R`Обе функции должны иметь одинаковые $e^{\alpha x}$ и $\beta$.`, R`Both functions must share the same $e^{\alpha x}$ and $\beta$.`)] },
    { id: 't08.q4', q: L(R`$P(r)=(r-2)^3(r+1)$ bo‘lsa, fundamental sistemadagi funksiyalar soni:`, R`Если $P(r)=(r-2)^3(r+1)$, число функций в фундаментальной системе:`, R`If $P(r)=(r-2)^3(r+1)$, the number of functions in a fundamental set is:`),
      options: [L('2', '2', '2'), L('3', '3', '3'), L('4', '4', '4'), L('5', '5', '5')], correct: 2,
      explain: L(R`Tartib $=\deg P=4$: $e^{2x},xe^{2x},x^2e^{2x},e^{-x}$.`, R`Порядок $=\deg P=4$: $e^{2x},xe^{2x},x^2e^{2x},e^{-x}$.`, R`Order $=\deg P=4$: $e^{2x},xe^{2x},x^2e^{2x},e^{-x}$.`),
      why: [L('Bu har xil ildizlar soni, karralik hisobga olinmagan.', 'Это число различных корней без учёта кратности.', 'That counts distinct roots and ignores multiplicity.'), L(R`$e^{-x}$ ham kerak.`, R`Нужна ещё $e^{-x}$.`, R`$e^{-x}$ is also needed.`), null, L('Daraja 4, beshinchi funksiya chiziqli bog‘liq bo‘lardi.', 'Степень 4, пятая функция была бы линейно зависимой.', 'The degree is 4; a fifth function would be dependent.')] },
    { id: 't08.q5', q: L(R`Qaysi funksiya $y''+2y'+y=0$ ning yechimi?`, R`Какая функция — решение $y''+2y'+y=0$?`, R`Which function solves $y''+2y'+y=0$?`),
      options: [L(R`$x^2e^{-x}$`, R`$x^2e^{-x}$`, R`$x^2e^{-x}$`), L(R`$xe^{x}$`, R`$xe^{x}$`, R`$xe^{x}$`), L(R`$xe^{-x}$`, R`$xe^{-x}$`, R`$xe^{-x}$`), L(R`$e^{-x}\cos x$`, R`$e^{-x}\cos x$`, R`$e^{-x}\cos x$`)], correct: 2,
      explain: L(R`$(r+1)^2$: $r=-1$ ikki karrali, $xe^{-x}$ yechim.`, R`$(r+1)^2$: $r=-1$ двукратный, $xe^{-x}$ — решение.`, R`$(r+1)^2$: $r=-1$ is double, so $xe^{-x}$ is a solution.`),
      why: [L(R`$x^2$ uchun uch karrali ildiz kerak.`, R`Для $x^2$ нужен трёхкратный корень.`, R`$x^2$ would need a triple root.`), L(R`Ildiz $-1$, $+1$ emas.`, R`Корень $-1$, а не $+1$.`, R`The root is $-1$, not $+1$.`), null, L('Kompleks ildiz yo‘q.', 'Комплексных корней нет.', 'There are no complex roots.')] },
    { id: 't08.q6', q: L(R`$my''+cy'+ky=0$ da $c^2<4mk$, $c>0$ bo‘lsa, harakat:`, R`В $my''+cy'+ky=0$ при $c^2<4mk$, $c>0$ движение:`, R`In $my''+cy'+ky=0$ with $c^2<4mk$, $c>0$ the motion is:`),
      options: [L('so‘nmaydigan tebranish', 'незатухающие колебания', 'undamped oscillation'), L('kuchsiz so‘nuvchi tebranish', 'слабо затухающие колебания', 'underdamped oscillation'), L('kritik so‘nish', 'критическое затухание', 'critical damping'), L('tebranishsiz so‘nish', 'затухание без колебаний', 'decay without oscillation')], correct: 1,
      explain: L(R`Ildizlar $-\delta\pm i\omega$, $\delta>0$: amplituda $e^{-\delta t}$ kabi kamayadi.`, R`Корни $-\delta\pm i\omega$, $\delta>0$: амплитуда убывает как $e^{-\delta t}$.`, R`Roots $-\delta\pm i\omega$ with $\delta>0$: the amplitude decreases like $e^{-\delta t}$.`),
      why: [L(R`Bu faqat $c=0$ da.`, R`Это только при $c=0$.`, R`That happens only for $c=0$.`), null, L(R`Kritik: $c^2=4mk$.`, R`Критическое: $c^2=4mk$.`, R`Critical means $c^2=4mk$.`), L(R`Bu $c^2\ge4mk$ da.`, R`Это при $c^2\ge4mk$.`, R`That is for $c^2\ge4mk$.`)] },
    { id: 't08.q7', q: L(R`$y''+16y=0$ ning tebranish davri:`, R`Период колебаний $y''+16y=0$:`, R`The period of $y''+16y=0$ is:`),
      options: [L(R`$\pi/2$`, R`$\pi/2$`, R`$\pi/2$`), L(R`$2\pi$`, R`$2\pi$`, R`$2\pi$`), L(R`$\pi/8$`, R`$\pi/8$`, R`$\pi/8$`), L(R`$8\pi$`, R`$8\pi$`, R`$8\pi$`)], correct: 0,
      explain: L(R`$\omega_0=4$, davr $2\pi/4=\pi/2$.`, R`$\omega_0=4$, период $2\pi/4=\pi/2$.`, R`$\omega_0=4$, period $2\pi/4=\pi/2$.`),
      why: [null, L(R`Bu $\omega_0=1$ uchun.`, R`Это для $\omega_0=1$.`, R`That is for $\omega_0=1$.`), L(R`$\omega_0=\sqrt{16}=4$, $16$ emas.`, R`$\omega_0=\sqrt{16}=4$, а не $16$.`, R`$\omega_0=\sqrt{16}=4$, not $16$.`), L(R`Davr $2\pi/\omega_0$, $2\pi\omega_0$ emas.`, R`Период $2\pi/\omega_0$, а не $2\pi\omega_0$.`, R`The period is $2\pi/\omega_0$, not $2\pi\omega_0$.`)] },
    { id: 't08.q8', q: L(R`$y'''+y'=0$ ning umumiy yechimi:`, R`Общее решение $y'''+y'=0$:`, R`The general solution of $y'''+y'=0$:`),
      options: [L(R`$C_1\cos x+C_2\sin x$`, R`$C_1\cos x+C_2\sin x$`, R`$C_1\cos x+C_2\sin x$`), L(R`$C_1+C_2\cos x+C_3\sin x$`, R`$C_1+C_2\cos x+C_3\sin x$`, R`$C_1+C_2\cos x+C_3\sin x$`), L(R`$C_1+C_2e^x+C_3e^{-x}$`, R`$C_1+C_2e^x+C_3e^{-x}$`, R`$C_1+C_2e^x+C_3e^{-x}$`), L(R`$C_1+C_2x+C_3\sin x$`, R`$C_1+C_2x+C_3\sin x$`, R`$C_1+C_2x+C_3\sin x$`)], correct: 1,
      explain: L(R`$r(r^2+1)=0$: $r=0,\ \pm i$.`, R`$r(r^2+1)=0$: $r=0,\ \pm i$.`, R`$r(r^2+1)=0$: $r=0,\ \pm i$.`),
      why: [L(R`$r=0$ ildizi unutilgan.`, R`Забыт корень $r=0$.`, R`The root $r=0$ is missing.`), null, L(R`Bu $y'''-y'=0$ uchun.`, R`Это для $y'''-y'=0$.`, R`That is for $y'''-y'=0$.`), L(R`$r=0$ oddiy, $x$ kerak emas; $\cos x$ esa kerak.`, R`$r=0$ простой, $x$ не нужен; а $\cos x$ нужен.`, R`$r=0$ is simple so $x$ is not needed, while $\cos x$ is.`)] },
    { id: 't08.q9', q: L(R`Nima uchun kompleks yechimning haqiqiy va mavhum qismlari alohida yechim bo‘ladi?`, R`Почему вещественная и мнимая части комплексного решения — отдельные решения?`, R`Why are the real and imaginary parts of a complex solution separate solutions?`),
      options: [L('Eyler formulasi tufayli', 'Из-за формулы Эйлера', 'Because of Euler’s formula'), L('Koeffitsiyentlar haqiqiy va tenglama chiziqli bo‘lgani uchun', 'Потому что коэффициенты вещественны, а уравнение линейно', 'Because the coefficients are real and the equation is linear'), L('Vronskian nolga teng bo‘lmagani uchun', 'Потому что вронскиан не равен нулю', 'Because the Wronskian is non-zero'), L('Har doim, istalgan tenglama uchun', 'Всегда, для любого уравнения', 'Always, for any equation')], correct: 1,
      explain: L(R`$L[u+iv]=L[u]+iL[v]$ va $L[u],L[v]$ haqiqiy, shuning uchun ikkalasi ham $0$.`, R`$L[u+iv]=L[u]+iL[v]$, а $L[u],L[v]$ вещественны, поэтому оба равны $0$.`, R`$L[u+iv]=L[u]+iL[v]$ with $L[u],L[v]$ real, so both equal $0$.`),
      why: [L('Eyler formulasi faqat yechimni ko‘rinishini beradi, ajralishni emas.', 'Формула Эйлера лишь даёт вид решения, но не разделение.', 'Euler’s formula only gives the form, not the splitting.'), null, L('Vronskian erklilik haqida, bu yerda gap boshqa.', 'Вронскиан — о независимости, здесь вопрос другой.', 'The Wronskian is about independence, a different question.'), L('Nochiziqli yoki kompleks koeffitsiyentli tenglamada bu noto‘g‘ri.', 'Для нелинейных или комплексных коэффициентов это неверно.', 'It fails for nonlinear equations or complex coefficients.')] },
    { id: 't08.q10', q: L(R`$e^{x}$ va $\cos x$ yechim bo‘lgan eng past tartibli haqiqiy o‘zgarmas koeffitsiyentli tenglamaning tartibi:`, R`Наименьший порядок уравнения с вещественными постоянными коэффициентами, у которого решения $e^{x}$ и $\cos x$:`, R`The lowest order of a real constant-coefficient equation having $e^{x}$ and $\cos x$ as solutions:`),
      options: [L('2', '2', '2'), L('3', '3', '3'), L('4', '4', '4'), L('1', '1', '1')], correct: 1,
      explain: L(R`$P(r)=(r-1)(r^2+1)$: $\cos x$ uchun $\pm i$ juftligi to‘liq kerak.`, R`$P(r)=(r-1)(r^2+1)$: для $\cos x$ нужна вся пара $\pm i$.`, R`$P(r)=(r-1)(r^2+1)$: $\cos x$ needs the whole pair $\pm i$.`),
      why: [L(R`Haqiqiy koeffitsiyentda $i$ ildiz bo‘lsa, $-i$ ham ildiz.`, R`При вещественных коэффициентах вместе с $i$ корнем будет и $-i$.`, R`With real coefficients, if $i$ is a root then so is $-i$.`), null, L('Ortiqcha ildiz shart emas.', 'Лишний корень не нужен.', 'No extra root is needed.'), L('Birinchi tartibli tenglamada ikkita erkli yechim bo‘lmaydi.', 'У уравнения первого порядка не бывает двух независимых решений.', 'First order cannot hold two independent solutions.')] }
  ]
});
})();
