(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't12', num: 12,
  title: L('Differensial tenglamalar sistemalari va faza portreti', 'Системы дифференциальных уравнений и фазовый портрет', 'Systems of differential equations and phase portraits'),
  syllabus: { lecture: 'M12', seminar: 'S12', outcomes: ['TN2', 'TN3'], independent: [10, 11] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L('Normal sistemani vektor–matritsa ko‘rinishida $X\'=AX+F$ yoza olasiz va $n$-tartibli tenglamani sistemaga keltira olasiz.', 'Записывать нормальную систему в векторно-матричном виде $X\'=AX+F$ и сводить уравнение $n$-го порядка к системе.', 'Write a normal system in vector–matrix form $X\'=AX+F$ and reduce an $n$-th order equation to a system.'),
    L('Sistema uchun Koshi masalasini qo‘ya olasiz va yechimning mavjudligi va yagonaligi shartlarini ayta olasiz.', 'Ставить задачу Коши для системы и формулировать условия существования и единственности решения.', 'Pose a Cauchy problem for a system and state the conditions for existence and uniqueness.'),
    L('O‘zgarmas koeffitsientli sistemani o‘zgaruvchilarni yo‘qotish usuli bilan yecha olasiz.', 'Решать систему с постоянными коэффициентами методом исключения.', 'Solve a constant-coefficient system by elimination.'),
    L('$2\\times2$ sistemani xos qiymatlar usuli bilan yecha olasiz (haqiqiy turli, kompleks, karrali ildizlar).', 'Решать систему $2\\times2$ методом собственных значений (вещественные различные, комплексные, кратные корни).', 'Solve a $2\\times2$ system by the eigenvalue method (real distinct, complex and repeated roots).'),
    L('Muvozanat holatini iz va determinant orqali tasniflay olasiz (tugun, egar, fokus, markaz) va amaliy modelni chiziqlashtira olasiz.', 'Классифицировать положение равновесия по следу и определителю (узел, седло, фокус, центр) и линеаризовать прикладную модель.', 'Classify an equilibrium by trace and determinant (node, saddle, focus, centre) and linearise an applied model.')
  ],
  prereqKnowledge: [
    L('Matritsalar, determinant, xos qiymat va xos vektor (chiziqli algebra).', 'Матрицы, определитель, собственные значения и векторы (линейная алгебра).', 'Matrices, determinants, eigenvalues and eigenvectors (linear algebra).'),
    L('O‘zgarmas koeffitsientli ikkinchi tartibli chiziqli tenglamalar va xarakteristik tenglama (8-mavzu).', 'Линейные уравнения второго порядка с постоянными коэффициентами и характеристическое уравнение (тема 8).', 'Second-order linear equations with constant coefficients and the characteristic equation (topic 8).'),
    L('Eyler formulasi $e^{i\\beta t}=\\cos\\beta t+i\\sin\\beta t$.', 'Формула Эйлера $e^{i\\beta t}=\\cos\\beta t+i\\sin\\beta t$.', 'Euler’s formula $e^{i\\beta t}=\\cos\\beta t+i\\sin\\beta t$.')
  ],
  sources: [
    { id: 'dilmurodov', ref: '§8.1, §8.3, §9.1–§9.3, §11.3', verified: true },
    { id: 'ergashev', ref: '4.1', verified: true },
    { id: 'logan', ref: '4.1–4.5, 5.1, 5.3.1, 5.3.3', verified: true },
    { id: 'kohler', ref: '4.3–4.7, 6.7', verified: true },
    { id: 'goode', ref: '9.1–9.5, 9.9', verified: true },
    { id: 'boyce', ref: 'Ch. 7, Ch. 9', verified: false },
    { id: 'stepanov', ref: '—', verified: false }
  ],
  labs: ['L08'],
  lessons: [
    {
      id: 't12.1',
      title: L('Normal sistema va vektor–matritsa ko‘rinishi', 'Нормальная система и векторно-матричная форма', 'Normal systems and vector–matrix form'),
      blocks: [
        { type: 'intro', title: L('Tebranishni tekislikdagi harakat sifatida ko‘rish', 'Колебание как движение по плоскости', 'Seeing an oscillation as motion in a plane'),
          body: L(R`Prujinadagi yuk: $y''+y=0$ (ishqalanishsiz). Holatni **ikki son** — o‘rin $x_1=y$ va tezlik $x_2=y'$ belgilaydi. U holda
$$x_1'=x_2,\qquad x_2'=-x_1.$$
Bitta ikkinchi tartibli tenglama o‘rniga ikkita birinchi tartibli tenglama hosil bo‘ldi. $x_1(0)=1$, $x_2(0)=0$ bo‘lsa, $x_1=\cos t$, $x_2=-\sin t$: nuqta $(x_1,x_2)$ tekislikda $x_1^2+x_2^2=1$ aylana bo‘ylab yuradi. Bu tekislik — **faza tekisligi**, aylana — **traektoriya**. Bu mavzuda shunday sistemalarni yechish va ularning rasmini o‘qishni o‘rganamiz.`,
          R`Груз на пружине: $y''+y=0$ (без трения). Состояние задаётся **двумя числами** — положением $x_1=y$ и скоростью $x_2=y'$. Тогда
$$x_1'=x_2,\qquad x_2'=-x_1.$$
Вместо одного уравнения второго порядка получили два уравнения первого порядка. При $x_1(0)=1$, $x_2(0)=0$ имеем $x_1=\cos t$, $x_2=-\sin t$: точка $(x_1,x_2)$ движется по окружности $x_1^2+x_2^2=1$. Эта плоскость — **фазовая плоскость**, окружность — **траектория**. В этой теме мы научимся решать такие системы и читать их картину.`,
          R`A mass on a spring: $y''+y=0$ (no friction). Its state is given by **two numbers**: position $x_1=y$ and velocity $x_2=y'$. Then
$$x_1'=x_2,\qquad x_2'=-x_1.$$
One second-order equation became two first-order equations. With $x_1(0)=1$, $x_2(0)=0$ we get $x_1=\cos t$, $x_2=-\sin t$: the point $(x_1,x_2)$ moves on the circle $x_1^2+x_2^2=1$. This plane is the **phase plane**, the circle is a **trajectory**. In this topic we learn to solve such systems and to read their pictures.`) },
        { type: 'def', title: L('Normal sistema', 'Нормальная система', 'Normal system'),
          body: L(R`Hosilalarga nisbatan yechilgan birinchi tartibli $n$ ta tenglama
$$x_i'=f_i(t,x_1,\dots,x_n),\qquad i=1,\dots,n,$$
**normal sistema** deyiladi; $n$ — sistemaning tartibi. Sistema **chiziqli**, agar
$$x_i'=a_{i1}(t)x_1+\dots+a_{in}(t)x_n+f_i(t).$$
Barcha $f_i\equiv0$ bo‘lsa — **bir jinsli**, $a_{ij}$ o‘zgarmas bo‘lsa — **o‘zgarmas koeffitsientli** sistema.`,
          R`Система $n$ уравнений первого порядка, разрешённых относительно производных,
$$x_i'=f_i(t,x_1,\dots,x_n),\qquad i=1,\dots,n,$$
называется **нормальной**; $n$ — порядок системы. Система **линейна**, если
$$x_i'=a_{i1}(t)x_1+\dots+a_{in}(t)x_n+f_i(t).$$
При всех $f_i\equiv0$ она **однородна**, при постоянных $a_{ij}$ — система **с постоянными коэффициентами**.`,
          R`A system of $n$ first-order equations solved for the derivatives,
$$x_i'=f_i(t,x_1,\dots,x_n),\qquad i=1,\dots,n,$$
is a **normal system**; $n$ is its order. The system is **linear** if
$$x_i'=a_{i1}(t)x_1+\dots+a_{in}(t)x_n+f_i(t).$$
If all $f_i\equiv0$ it is **homogeneous**; if the $a_{ij}$ are constants it has **constant coefficients**.`) },
        { type: 'def', title: L('Vektor–matritsa ko‘rinishi', 'Векторно-матричная форма', 'Vector–matrix form'),
          body: L(R`$X=(x_1,\dots,x_n)^T$, $A(t)=(a_{ij}(t))$, $F=(f_1,\dots,f_n)^T$ belgilasak, chiziqli sistema
$$X'=A(t)X+F(t)$$
ko‘rinishini oladi. Masalan,
$$\begin{cases}x'=2x+y,\\ y'=3x+4y\end{cases}\iff \begin{pmatrix}x\\y\end{pmatrix}'=\begin{pmatrix}2&1\\3&4\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}.$$
**Koshi masalasi**: $X'=A(t)X+F(t)$, $X(t_0)=X_0$ — bitta $t_0$ nuqtada **barcha** $n$ ta komponent beriladi.`,
          R`Обозначив $X=(x_1,\dots,x_n)^T$, $A(t)=(a_{ij}(t))$, $F=(f_1,\dots,f_n)^T$, запишем линейную систему как
$$X'=A(t)X+F(t).$$
Например,
$$\begin{cases}x'=2x+y,\\ y'=3x+4y\end{cases}\iff \begin{pmatrix}x\\y\end{pmatrix}'=\begin{pmatrix}2&1\\3&4\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}.$$
**Задача Коши**: $X'=A(t)X+F(t)$, $X(t_0)=X_0$ — в одной точке $t_0$ задаются **все** $n$ компонент.`,
          R`With $X=(x_1,\dots,x_n)^T$, $A(t)=(a_{ij}(t))$, $F=(f_1,\dots,f_n)^T$ the linear system becomes
$$X'=A(t)X+F(t).$$
For example,
$$\begin{cases}x'=2x+y,\\ y'=3x+4y\end{cases}\iff \begin{pmatrix}x\\y\end{pmatrix}'=\begin{pmatrix}2&1\\3&4\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}.$$
**Cauchy problem**: $X'=A(t)X+F(t)$, $X(t_0)=X_0$; **all** $n$ components are given at one point $t_0$.`) },
        { type: 'thm', title: L('Chiziqli sistema uchun mavjudlik va yagonalik', 'Существование и единственность для линейной системы', 'Existence and uniqueness for a linear system'),
          conds: L(R`1. $a_{ij}(t)$ va $f_i(t)$ ($i,j=1,\dots,n$) $I$ oraliqda uzluksiz;
2. $t_0\in I$, $X_0\in\mathbb R^n$ — ixtiyoriy.`,
          R`1. $a_{ij}(t)$ и $f_i(t)$ ($i,j=1,\dots,n$) непрерывны на интервале $I$;
2. $t_0\in I$, $X_0\in\mathbb R^n$ — любые.`,
          R`1. $a_{ij}(t)$ and $f_i(t)$ ($i,j=1,\dots,n$) are continuous on an interval $I$;
2. $t_0\in I$ and $X_0\in\mathbb R^n$ are arbitrary.`),
          body: L(R`U holda $X'=A(t)X+F(t)$, $X(t_0)=X_0$ Koshi masalasi **butun $I$ oraliqda** aniqlangan yagona yechimga ega. (Chiziqli bo‘lmagan $X'=F(t,X)$ uchun $F$ va $\partial F/\partial x_j$ uzluksiz bo‘lsa, yechim faqat **lokal** mavjud va yagona — Dilmuradov, §8.3.)`,
          R`Тогда задача Коши $X'=A(t)X+F(t)$, $X(t_0)=X_0$ имеет единственное решение, определённое **на всём интервале $I$**. (Для нелинейной $X'=F(t,X)$ при непрерывных $F$ и $\partial F/\partial x_j$ решение существует и единственно лишь **локально** — Дилмурадов, §8.3.)`,
          R`Then the Cauchy problem $X'=A(t)X+F(t)$, $X(t_0)=X_0$ has a unique solution defined on **the whole interval $I$**. (For a nonlinear $X'=F(t,X)$ with continuous $F$ and $\partial F/\partial x_j$, the solution exists and is unique only **locally**; Dilmuradov, §8.3.)`) },
        { type: 'example', title: L('$n$-tartibli tenglamani sistemaga keltirish', 'Сведение уравнения $n$-го порядка к системе', 'Reducing an $n$-th order equation to a system'),
          body: L(R`$y'''-2y''+y=\sin t$ tenglamani normal sistema va matritsa ko‘rinishida yozing.`, R`Запишите уравнение $y'''-2y''+y=\sin t$ в виде нормальной системы и в матричном виде.`, R`Write $y'''-2y''+y=\sin t$ as a normal system and in matrix form.`),
          steps: [
            L(R`Yangi noma’lumlar: $x_1=y$, $x_2=y'$, $x_3=y''$.`, R`Новые неизвестные: $x_1=y$, $x_2=y'$, $x_3=y''$.`, R`New unknowns: $x_1=y$, $x_2=y'$, $x_3=y''$.`),
            L(R`Ta’rifdan: $x_1'=x_2$, $x_2'=x_3$; tenglamadan: $x_3'=y'''=2x_3-x_1+\sin t$.`, R`По определению $x_1'=x_2$, $x_2'=x_3$; из уравнения $x_3'=y'''=2x_3-x_1+\sin t$.`, R`By definition $x_1'=x_2$, $x_2'=x_3$; from the equation $x_3'=y'''=2x_3-x_1+\sin t$.`),
            L(R`$$X'=\begin{pmatrix}0&1&0\\0&0&1\\-1&0&2\end{pmatrix}X+\begin{pmatrix}0\\0\\ \sin t\end{pmatrix}.$$
Boshlang‘ich shartlar $y(0),y'(0),y''(0)$ aynan $X(0)$ ga aylanadi.`, R`$$X'=\begin{pmatrix}0&1&0\\0&0&1\\-1&0&2\end{pmatrix}X+\begin{pmatrix}0\\0\\ \sin t\end{pmatrix}.$$
Начальные условия $y(0),y'(0),y''(0)$ превращаются ровно в $X(0)$.`, R`$$X'=\begin{pmatrix}0&1&0\\0&0&1\\-1&0&2\end{pmatrix}X+\begin{pmatrix}0\\0\\ \sin t\end{pmatrix}.$$
The initial conditions $y(0),y'(0),y''(0)$ become exactly $X(0)$.`)
          ],
          check: L(R`$\det(A-\lambda E)=-(\lambda^3-2\lambda^2+1)$ — bu tenglamaning xarakteristik ko‘phadi ($\lambda^3-2\lambda^2+1$) bilan ishorasigacha bir xil ✓.`, R`$\det(A-\lambda E)=-(\lambda^3-2\lambda^2+1)$ — с точностью до знака совпадает с характеристическим многочленом уравнения ($\lambda^3-2\lambda^2+1$) ✓.`, R`$\det(A-\lambda E)=-(\lambda^3-2\lambda^2+1)$, which agrees up to sign with the characteristic polynomial of the equation ($\lambda^3-2\lambda^2+1$) ✓.`) },
        { type: 'example', title: L('Yechimni tekshirish va Koshi masalasi', 'Проверка решения и задача Коши', 'Checking a solution and a Cauchy problem'),
          body: L(R`$X=C_1\begin{pmatrix}1\\-1\end{pmatrix}e^{t}+C_2\begin{pmatrix}1\\3\end{pmatrix}e^{5t}$ sistemaning ($x'=2x+y$, $y'=3x+4y$) yechimi ekanini tekshiring va $x(0)=1$, $y(0)=7$ ni qanoatlantiruvchisini toping.`, R`Проверьте, что $X=C_1\begin{pmatrix}1\\-1\end{pmatrix}e^{t}+C_2\begin{pmatrix}1\\3\end{pmatrix}e^{5t}$ — решение системы $x'=2x+y$, $y'=3x+4y$, и найдите решение с $x(0)=1$, $y(0)=7$.`, R`Check that $X=C_1\begin{pmatrix}1\\-1\end{pmatrix}e^{t}+C_2\begin{pmatrix}1\\3\end{pmatrix}e^{5t}$ solves $x'=2x+y$, $y'=3x+4y$ and find the solution with $x(0)=1$, $y(0)=7$.`),
          steps: [
            L(R`Birinchi had: $A\begin{pmatrix}1\\-1\end{pmatrix}=\begin{pmatrix}2-1\\3-4\end{pmatrix}=1\cdot\begin{pmatrix}1\\-1\end{pmatrix}$, demak $(e^t v)'=e^tv=A(e^tv)$ ✓.`, R`Первое слагаемое: $A\begin{pmatrix}1\\-1\end{pmatrix}=\begin{pmatrix}2-1\\3-4\end{pmatrix}=1\cdot\begin{pmatrix}1\\-1\end{pmatrix}$, значит $(e^t v)'=e^tv=A(e^tv)$ ✓.`, R`First term: $A\begin{pmatrix}1\\-1\end{pmatrix}=\begin{pmatrix}2-1\\3-4\end{pmatrix}=1\cdot\begin{pmatrix}1\\-1\end{pmatrix}$, so $(e^t v)'=e^tv=A(e^tv)$ ✓.`),
            L(R`Ikkinchi had: $A\begin{pmatrix}1\\3\end{pmatrix}=\begin{pmatrix}5\\15\end{pmatrix}=5\begin{pmatrix}1\\3\end{pmatrix}$ ✓.`, R`Второе: $A\begin{pmatrix}1\\3\end{pmatrix}=\begin{pmatrix}5\\15\end{pmatrix}=5\begin{pmatrix}1\\3\end{pmatrix}$ ✓.`, R`Second term: $A\begin{pmatrix}1\\3\end{pmatrix}=\begin{pmatrix}5\\15\end{pmatrix}=5\begin{pmatrix}1\\3\end{pmatrix}$ ✓.`),
            L(R`$t=0$: $C_1+C_2=1$, $-C_1+3C_2=7$ $\Rightarrow$ $C_2=2$, $C_1=-1$. Javob: $x=-e^t+2e^{5t}$, $y=e^t+6e^{5t}$.`, R`$t=0$: $C_1+C_2=1$, $-C_1+3C_2=7$ $\Rightarrow$ $C_2=2$, $C_1=-1$. Ответ: $x=-e^t+2e^{5t}$, $y=e^t+6e^{5t}$.`, R`At $t=0$: $C_1+C_2=1$, $-C_1+3C_2=7$ $\Rightarrow$ $C_2=2$, $C_1=-1$. Answer: $x=-e^t+2e^{5t}$, $y=e^t+6e^{5t}$.`)
          ],
          check: L(R`$x'=-e^t+10e^{5t}$, $2x+y=-2e^t+4e^{5t}+e^t+6e^{5t}=-e^t+10e^{5t}$ ✓; $y'=e^t+30e^{5t}=3x+4y$ ✓.`, R`$x'=-e^t+10e^{5t}$, $2x+y=-2e^t+4e^{5t}+e^t+6e^{5t}=-e^t+10e^{5t}$ ✓; $y'=e^t+30e^{5t}=3x+4y$ ✓.`, R`$x'=-e^t+10e^{5t}$ and $2x+y=-2e^t+4e^{5t}+e^t+6e^{5t}=-e^t+10e^{5t}$ ✓; $y'=e^t+30e^{5t}=3x+4y$ ✓.`) }
      ]
    },
    {
      id: 't12.2',
      title: L('O‘zgaruvchilarni yo‘qotish usuli', 'Метод исключения', 'The elimination method'),
      blocks: [
        { type: 'def', title: L('Yo‘qotish usuli (ikki noma’lum uchun)', 'Метод исключения (для двух неизвестных)', 'Elimination (two unknowns)'),
          body: L(R`$x'=a x+b y$, $y'=c x+d y$, $b\ne0$ sistemasi uchun:
1. Birinchi tenglamadan $y=\dfrac{x'-ax}{b}$.
2. Birinchi tenglamani differensiallaymiz: $x''=ax'+by'$, bunga $y'=cx+dy$ va 1-banddagi $y$ ni qo‘yamiz.
3. Hosil bo‘ladi: $x''-(a+d)x'+(ad-bc)x=0$ — bitta ikkinchi tartibli tenglama.
4. Uni xarakteristik tenglama bilan yechamiz, $y$ ni esa 1-banddagi formula bilan **integrallamasdan** topamiz.

E’tibor bering: $a+d=\operatorname{tr}A$, $ad-bc=\det A$.`,
          R`Для системы $x'=a x+b y$, $y'=c x+d y$, $b\ne0$:
1. Из первого уравнения $y=\dfrac{x'-ax}{b}$.
2. Дифференцируем первое уравнение: $x''=ax'+by'$, подставляем $y'=cx+dy$ и $y$ из п. 1.
3. Получаем $x''-(a+d)x'+(ad-bc)x=0$ — одно уравнение второго порядка.
4. Решаем его через характеристическое уравнение, а $y$ находим по формуле п. 1 **без интегрирования**.

Заметим: $a+d=\operatorname{tr}A$, $ad-bc=\det A$.`,
          R`For $x'=a x+b y$, $y'=c x+d y$ with $b\ne0$:
1. From the first equation, $y=\dfrac{x'-ax}{b}$.
2. Differentiate the first equation, $x''=ax'+by'$, and substitute $y'=cx+dy$ and $y$ from step 1.
3. This gives $x''-(a+d)x'+(ad-bc)x=0$, a single second-order equation.
4. Solve it with the characteristic equation and find $y$ from step 1 **without integrating**.

Note: $a+d=\operatorname{tr}A$ and $ad-bc=\det A$.`) },
        { type: 'example', title: L('Haqiqiy turli ildizlar', 'Вещественные различные корни', 'Real distinct roots'),
          body: L(R`$x'=2x+y$, $y'=3x+4y$ sistemasini yo‘qotish usuli bilan yeching.`, R`Решите систему $x'=2x+y$, $y'=3x+4y$ методом исключения.`, R`Solve $x'=2x+y$, $y'=3x+4y$ by elimination.`),
          steps: [
            L(R`$y=x'-2x$.`, R`$y=x'-2x$.`, R`$y=x'-2x$.`),
            L(R`$x''=2x'+y'=2x'+3x+4y=2x'+3x+4(x'-2x)=6x'-5x$.`, R`$x''=2x'+y'=2x'+3x+4y=2x'+3x+4(x'-2x)=6x'-5x$.`, R`$x''=2x'+y'=2x'+3x+4y=2x'+3x+4(x'-2x)=6x'-5x$.`),
            L(R`$x''-6x'+5x=0$, $\ k^2-6k+5=0$, $k=1;\,5$: $\ x=C_1e^t+C_2e^{5t}$.`, R`$x''-6x'+5x=0$, $\ k^2-6k+5=0$, $k=1;\,5$: $\ x=C_1e^t+C_2e^{5t}$.`, R`$x''-6x'+5x=0$, $\ k^2-6k+5=0$, $k=1,5$: $\ x=C_1e^t+C_2e^{5t}$.`),
            L(R`$y=x'-2x=C_1e^t+5C_2e^{5t}-2C_1e^t-2C_2e^{5t}=-C_1e^t+3C_2e^{5t}$.`, R`$y=x'-2x=C_1e^t+5C_2e^{5t}-2C_1e^t-2C_2e^{5t}=-C_1e^t+3C_2e^{5t}$.`, R`$y=x'-2x=C_1e^t+5C_2e^{5t}-2C_1e^t-2C_2e^{5t}=-C_1e^t+3C_2e^{5t}$.`)
          ],
          check: L(R`$y'=-C_1e^t+15C_2e^{5t}$; $3x+4y=3C_1e^t+3C_2e^{5t}-4C_1e^t+12C_2e^{5t}=-C_1e^t+15C_2e^{5t}$ ✓.`, R`$y'=-C_1e^t+15C_2e^{5t}$; $3x+4y=3C_1e^t+3C_2e^{5t}-4C_1e^t+12C_2e^{5t}=-C_1e^t+15C_2e^{5t}$ ✓.`, R`$y'=-C_1e^t+15C_2e^{5t}$; $3x+4y=3C_1e^t+3C_2e^{5t}-4C_1e^t+12C_2e^{5t}=-C_1e^t+15C_2e^{5t}$ ✓.`) },
        { type: 'example', title: L('Kompleks ildizlar', 'Комплексные корни', 'Complex roots'),
          body: L(R`$x'=x-y$, $y'=x+y$, $x(0)=1$, $y(0)=0$.`, R`$x'=x-y$, $y'=x+y$, $x(0)=1$, $y(0)=0$.`, R`$x'=x-y$, $y'=x+y$, $x(0)=1$, $y(0)=0$.`),
          steps: [
            L(R`Birinchidan $y=x-x'$. Differensiallaymiz: $x''=x'-y'=x'-x-y=x'-x-(x-x')=2x'-2x$.`, R`Из первого $y=x-x'$. Дифференцируем: $x''=x'-y'=x'-x-y=x'-x-(x-x')=2x'-2x$.`, R`From the first equation $y=x-x'$. Differentiate: $x''=x'-y'=x'-x-y=x'-x-(x-x')=2x'-2x$.`),
            L(R`$x''-2x'+2x=0$, $k=1\pm i$: $\ x=e^t(C_1\cos t+C_2\sin t)$.`, R`$x''-2x'+2x=0$, $k=1\pm i$: $\ x=e^t(C_1\cos t+C_2\sin t)$.`, R`$x''-2x'+2x=0$, $k=1\pm i$: $\ x=e^t(C_1\cos t+C_2\sin t)$.`),
            L(R`$y=x-x'=e^t(C_1\sin t-C_2\cos t)$.`, R`$y=x-x'=e^t(C_1\sin t-C_2\cos t)$.`, R`$y=x-x'=e^t(C_1\sin t-C_2\cos t)$.`),
            L(R`$x(0)=C_1=1$, $y(0)=-C_2=0$. Javob: $x=e^t\cos t$, $y=e^t\sin t$ — faza tekisligida koordinata boshidan uzoqlashuvchi spiral.`, R`$x(0)=C_1=1$, $y(0)=-C_2=0$. Ответ: $x=e^t\cos t$, $y=e^t\sin t$ — на фазовой плоскости спираль, уходящая от начала координат.`, R`$x(0)=C_1=1$, $y(0)=-C_2=0$. Answer: $x=e^t\cos t$, $y=e^t\sin t$, a spiral moving away from the origin in the phase plane.`)
          ],
          check: L(R`$x'=e^t(\cos t-\sin t)=x-y$ ✓; $y'=e^t(\sin t+\cos t)=x+y$ ✓.`, R`$x'=e^t(\cos t-\sin t)=x-y$ ✓; $y'=e^t(\sin t+\cos t)=x+y$ ✓.`, R`$x'=e^t(\cos t-\sin t)=x-y$ ✓; $y'=e^t(\sin t+\cos t)=x+y$ ✓.`) },
        { type: 'warn', body: L(R`$y$ ni topish uchun ikkinchi tenglamani **integrallamang** — bu ortiqcha uchinchi o‘zgarmas beradi. $n\times n$ sistemaning umumiy yechimida aynan $n$ ta ixtiyoriy o‘zgarmas bo‘ladi. $y$ ni $x$ va $x'$ orqali algebraik ifodalang.`,
          R`Не **интегрируйте** второе уравнение, чтобы найти $y$, — так появится лишняя третья постоянная. В общем решении системы $n\times n$ ровно $n$ произвольных постоянных. Выражайте $y$ алгебраически через $x$ и $x'$.`,
          R`Do not **integrate** the second equation to find $y$; that introduces an extra third constant. The general solution of an $n\times n$ system has exactly $n$ arbitrary constants. Express $y$ algebraically through $x$ and $x'$.`) }
      ]
    },
    {
      id: 't12.3',
      title: L('Xos qiymatlar usuli ($2\\times2$)', 'Метод собственных значений ($2\\times2$)', 'The eigenvalue method ($2\\times2$)'),
      blocks: [
        { type: 'thm', title: L('Xos vektor yechim beradi', 'Собственный вектор даёт решение', 'An eigenvector gives a solution'),
          conds: L(R`1. $A$ — o‘zgarmas haqiqiy $n\times n$ matritsa;
2. $\lambda$ — $A$ ning xos qiymati, $v\ne0$ — unga mos xos vektor: $(A-\lambda E)v=0$.`,
          R`1. $A$ — постоянная вещественная матрица $n\times n$;
2. $\lambda$ — собственное значение $A$, $v\ne0$ — соответствующий собственный вектор: $(A-\lambda E)v=0$.`,
          R`1. $A$ is a constant real $n\times n$ matrix;
2. $\lambda$ is an eigenvalue of $A$ and $v\ne0$ a corresponding eigenvector: $(A-\lambda E)v=0$.`),
          body: L(R`U holda $X(t)=v\,e^{\lambda t}$ — $X'=AX$ ning yechimi, chunki $X'=\lambda ve^{\lambda t}=Ave^{\lambda t}=AX$. Agar $A$ ning $n$ ta chiziqli erkli xos vektori $v_1,\dots,v_n$ bo‘lsa,
$$X=C_1v_1e^{\lambda_1t}+\dots+C_nv_ne^{\lambda_nt}$$
— umumiy yechim (yechimlar fundamental sistemani tashkil etadi). $2\times2$ da xarakteristik tenglama:
$$\lambda^2-(\operatorname{tr}A)\,\lambda+\det A=0.$$`,
          R`Тогда $X(t)=v\,e^{\lambda t}$ — решение $X'=AX$, так как $X'=\lambda ve^{\lambda t}=Ave^{\lambda t}=AX$. Если у $A$ есть $n$ линейно независимых собственных векторов $v_1,\dots,v_n$, то
$$X=C_1v_1e^{\lambda_1t}+\dots+C_nv_ne^{\lambda_nt}$$
— общее решение (решения образуют фундаментальную систему). Для $2\times2$ характеристическое уравнение:
$$\lambda^2-(\operatorname{tr}A)\,\lambda+\det A=0.$$`,
          R`Then $X(t)=v\,e^{\lambda t}$ solves $X'=AX$, since $X'=\lambda ve^{\lambda t}=Ave^{\lambda t}=AX$. If $A$ has $n$ linearly independent eigenvectors $v_1,\dots,v_n$, then
$$X=C_1v_1e^{\lambda_1t}+\dots+C_nv_ne^{\lambda_nt}$$
is the general solution (these solutions form a fundamental set). For $2\times2$ the characteristic equation is
$$\lambda^2-(\operatorname{tr}A)\,\lambda+\det A=0.$$`) },
        { type: 'def', title: L('Uch holat ($2\\times2$)', 'Три случая ($2\\times2$)', 'Three cases ($2\\times2$)'),
          body: L(R`- **Haqiqiy turli** $\lambda_1\ne\lambda_2$: $X=C_1v_1e^{\lambda_1t}+C_2v_2e^{\lambda_2t}$.
- **Kompleks** $\lambda=\alpha\pm i\beta$, $\beta\ne0$: $\lambda=\alpha+i\beta$ uchun xos vektor $v=a+ib$ ni topamiz; $ve^{\lambda t}$ ning **haqiqiy va mavhum qismlari** ikkita haqiqiy chiziqli erkli yechim:
$$X_1=e^{\alpha t}(a\cos\beta t-b\sin\beta t),\qquad X_2=e^{\alpha t}(a\sin\beta t+b\cos\beta t).$$
- **Karrali** $\lambda_1=\lambda_2=\lambda$: agar ikkita erkli xos vektor bo‘lsa ($A=\lambda E$), $X=(C_1v_1+C_2v_2)e^{\lambda t}$. Agar bitta $v$ bo‘lsa, $(A-\lambda E)w=v$ dan **qo‘shma vektor** $w$ topiladi va
$$X=C_1ve^{\lambda t}+C_2\,(tv+w)\,e^{\lambda t}.$$`,
          R`- **Вещественные различные** $\lambda_1\ne\lambda_2$: $X=C_1v_1e^{\lambda_1t}+C_2v_2e^{\lambda_2t}$.
- **Комплексные** $\lambda=\alpha\pm i\beta$, $\beta\ne0$: для $\lambda=\alpha+i\beta$ находим собственный вектор $v=a+ib$; **вещественная и мнимая части** $ve^{\lambda t}$ дают два вещественных линейно независимых решения:
$$X_1=e^{\alpha t}(a\cos\beta t-b\sin\beta t),\qquad X_2=e^{\alpha t}(a\sin\beta t+b\cos\beta t).$$
- **Кратные** $\lambda_1=\lambda_2=\lambda$: если есть два независимых собственных вектора ($A=\lambda E$), то $X=(C_1v_1+C_2v_2)e^{\lambda t}$. Если вектор один, $v$, то из $(A-\lambda E)w=v$ находим **присоединённый вектор** $w$ и
$$X=C_1ve^{\lambda t}+C_2\,(tv+w)\,e^{\lambda t}.$$`,
          R`- **Real distinct** $\lambda_1\ne\lambda_2$: $X=C_1v_1e^{\lambda_1t}+C_2v_2e^{\lambda_2t}$.
- **Complex** $\lambda=\alpha\pm i\beta$, $\beta\ne0$: find an eigenvector $v=a+ib$ for $\lambda=\alpha+i\beta$; the **real and imaginary parts** of $ve^{\lambda t}$ are two real linearly independent solutions:
$$X_1=e^{\alpha t}(a\cos\beta t-b\sin\beta t),\qquad X_2=e^{\alpha t}(a\sin\beta t+b\cos\beta t).$$
- **Repeated** $\lambda_1=\lambda_2=\lambda$: if there are two independent eigenvectors ($A=\lambda E$), then $X=(C_1v_1+C_2v_2)e^{\lambda t}$. If there is only one, $v$, find a **generalised eigenvector** $w$ from $(A-\lambda E)w=v$; then
$$X=C_1ve^{\lambda t}+C_2\,(tv+w)\,e^{\lambda t}.$$`) },
        { type: 'example', title: L('Kompleks xos qiymatlar', 'Комплексные собственные значения', 'Complex eigenvalues'),
          body: L(R`$X'=\begin{pmatrix}-1&-4\\1&-1\end{pmatrix}X$ ni yeching.`, R`Решите $X'=\begin{pmatrix}-1&-4\\1&-1\end{pmatrix}X$.`, R`Solve $X'=\begin{pmatrix}-1&-4\\1&-1\end{pmatrix}X$.`),
          steps: [
            L(R`$\operatorname{tr}A=-2$, $\det A=1+4=5$: $\lambda^2+2\lambda+5=0$, $\lambda=-1\pm2i$.`, R`$\operatorname{tr}A=-2$, $\det A=1+4=5$: $\lambda^2+2\lambda+5=0$, $\lambda=-1\pm2i$.`, R`$\operatorname{tr}A=-2$, $\det A=1+4=5$: $\lambda^2+2\lambda+5=0$, $\lambda=-1\pm2i$.`),
            L(R`$\lambda=-1+2i$: $(A-\lambda E)v=\begin{pmatrix}-2i&-4\\1&-2i\end{pmatrix}v=0$; ikkinchi qatordan $v_1=2iv_2$, $v=\begin{pmatrix}2i\\1\end{pmatrix}=\begin{pmatrix}0\\1\end{pmatrix}+i\begin{pmatrix}2\\0\end{pmatrix}$.`, R`$\lambda=-1+2i$: $(A-\lambda E)v=\begin{pmatrix}-2i&-4\\1&-2i\end{pmatrix}v=0$; из второй строки $v_1=2iv_2$, $v=\begin{pmatrix}2i\\1\end{pmatrix}=\begin{pmatrix}0\\1\end{pmatrix}+i\begin{pmatrix}2\\0\end{pmatrix}$.`, R`$\lambda=-1+2i$: $(A-\lambda E)v=\begin{pmatrix}-2i&-4\\1&-2i\end{pmatrix}v=0$; the second row gives $v_1=2iv_2$, so $v=\begin{pmatrix}2i\\1\end{pmatrix}=\begin{pmatrix}0\\1\end{pmatrix}+i\begin{pmatrix}2\\0\end{pmatrix}$.`),
            L(R`$a=(0,1)^T$, $b=(2,0)^T$, $\alpha=-1$, $\beta=2$:
$$X=C_1e^{-t}\begin{pmatrix}-2\sin2t\\ \cos2t\end{pmatrix}+C_2e^{-t}\begin{pmatrix}2\cos2t\\ \sin2t\end{pmatrix}.$$`, R`$a=(0,1)^T$, $b=(2,0)^T$, $\alpha=-1$, $\beta=2$:
$$X=C_1e^{-t}\begin{pmatrix}-2\sin2t\\ \cos2t\end{pmatrix}+C_2e^{-t}\begin{pmatrix}2\cos2t\\ \sin2t\end{pmatrix}.$$`, R`$a=(0,1)^T$, $b=(2,0)^T$, $\alpha=-1$, $\beta=2$:
$$X=C_1e^{-t}\begin{pmatrix}-2\sin2t\\ \cos2t\end{pmatrix}+C_2e^{-t}\begin{pmatrix}2\cos2t\\ \sin2t\end{pmatrix}.$$`),
            L(R`$\alpha<0$: traektoriyalar koordinata boshiga o‘ralib kiradi — **turg‘un fokus**.`, R`$\alpha<0$: траектории закручиваются в начало координат — **устойчивый фокус**.`, R`$\alpha<0$: trajectories spiral into the origin, a **stable focus**.`)
          ],
          check: L(R`$X_2$ uchun: $x=2e^{-t}\cos2t$, $y=e^{-t}\sin2t$; $x'=-2e^{-t}\cos2t-4e^{-t}\sin2t=-x-4y$ ✓; $y'=-e^{-t}\sin2t+2e^{-t}\cos2t=x-y$ ✓.`, R`Для $X_2$: $x=2e^{-t}\cos2t$, $y=e^{-t}\sin2t$; $x'=-2e^{-t}\cos2t-4e^{-t}\sin2t=-x-4y$ ✓; $y'=-e^{-t}\sin2t+2e^{-t}\cos2t=x-y$ ✓.`, R`For $X_2$: $x=2e^{-t}\cos2t$, $y=e^{-t}\sin2t$; $x'=-2e^{-t}\cos2t-4e^{-t}\sin2t=-x-4y$ ✓; $y'=-e^{-t}\sin2t+2e^{-t}\cos2t=x-y$ ✓.`) },
        { type: 'example', title: L('Karrali xos qiymat', 'Кратное собственное значение', 'A repeated eigenvalue'),
          body: L(R`$X'=\begin{pmatrix}3&-1\\1&1\end{pmatrix}X$ ni yeching.`, R`Решите $X'=\begin{pmatrix}3&-1\\1&1\end{pmatrix}X$.`, R`Solve $X'=\begin{pmatrix}3&-1\\1&1\end{pmatrix}X$.`),
          steps: [
            L(R`$\operatorname{tr}A=4$, $\det A=3+1=4$: $(\lambda-2)^2=0$, $\lambda=2$ (ikki karrali).`, R`$\operatorname{tr}A=4$, $\det A=3+1=4$: $(\lambda-2)^2=0$, $\lambda=2$ (кратности 2).`, R`$\operatorname{tr}A=4$, $\det A=3+1=4$: $(\lambda-2)^2=0$, $\lambda=2$ (double).`),
            L(R`$A-2E=\begin{pmatrix}1&-1\\1&-1\end{pmatrix}$, xos vektor faqat bitta yo‘nalishda: $v=(1,1)^T$.`, R`$A-2E=\begin{pmatrix}1&-1\\1&-1\end{pmatrix}$, собственный вектор лишь одного направления: $v=(1,1)^T$.`, R`$A-2E=\begin{pmatrix}1&-1\\1&-1\end{pmatrix}$; there is only one eigenvector direction: $v=(1,1)^T$.`),
            L(R`$(A-2E)w=v$: $w_1-w_2=1$, masalan $w=(1,0)^T$.`, R`$(A-2E)w=v$: $w_1-w_2=1$, например $w=(1,0)^T$.`, R`$(A-2E)w=v$: $w_1-w_2=1$, for example $w=(1,0)^T$.`),
            L(R`$$X=C_1\begin{pmatrix}1\\1\end{pmatrix}e^{2t}+C_2\begin{pmatrix}t+1\\t\end{pmatrix}e^{2t}.$$
$\lambda=2>0$ — **beqaror buzilgan (degenerat) tugun**.`, R`$$X=C_1\begin{pmatrix}1\\1\end{pmatrix}e^{2t}+C_2\begin{pmatrix}t+1\\t\end{pmatrix}e^{2t}.$$
$\lambda=2>0$ — **неустойчивый вырожденный узел**.`, R`$$X=C_1\begin{pmatrix}1\\1\end{pmatrix}e^{2t}+C_2\begin{pmatrix}t+1\\t\end{pmatrix}e^{2t}.$$
$\lambda=2>0$: an **unstable degenerate (improper) node**.`)
          ],
          check: L(R`$X_2=((t+1)e^{2t},\,te^{2t})$: $x'=(2t+3)e^{2t}$, $3x-y=(3t+3-t)e^{2t}=(2t+3)e^{2t}$ ✓; $y'=(2t+1)e^{2t}=x+y$ ✓.`, R`$X_2=((t+1)e^{2t},\,te^{2t})$: $x'=(2t+3)e^{2t}$, $3x-y=(3t+3-t)e^{2t}=(2t+3)e^{2t}$ ✓; $y'=(2t+1)e^{2t}=x+y$ ✓.`, R`$X_2=((t+1)e^{2t},\,te^{2t})$: $x'=(2t+3)e^{2t}$ and $3x-y=(3t+3-t)e^{2t}=(2t+3)e^{2t}$ ✓; $y'=(2t+1)e^{2t}=x+y$ ✓.`) },
        { type: 'warn', body: L(R`Karrali xos qiymatda $X=C_1ve^{\lambda t}+C_2\,t\,ve^{\lambda t}$ deb yozish — **xato**: $tve^{\lambda t}$ yechim emas (bitta tenglama uchun $te^{\lambda t}$ ishlaydi, sistemada esa qo‘shma vektor $w$ kerak). Tekshiring: $(tve^{\lambda t})'=ve^{\lambda t}+\lambda tve^{\lambda t}$, $A(tve^{\lambda t})=\lambda tve^{\lambda t}$ — farq $ve^{\lambda t}\ne0$.`,
          R`При кратном собственном значении писать $X=C_1ve^{\lambda t}+C_2\,t\,ve^{\lambda t}$ — **ошибка**: $tve^{\lambda t}$ не решение (для одного уравнения $te^{\lambda t}$ работает, а в системе нужен присоединённый вектор $w$). Проверка: $(tve^{\lambda t})'=ve^{\lambda t}+\lambda tve^{\lambda t}$, $A(tve^{\lambda t})=\lambda tve^{\lambda t}$ — разность $ve^{\lambda t}\ne0$.`,
          R`For a repeated eigenvalue, writing $X=C_1ve^{\lambda t}+C_2\,t\,ve^{\lambda t}$ is **wrong**: $tve^{\lambda t}$ is not a solution (for a single equation $te^{\lambda t}$ works, but a system needs the generalised eigenvector $w$). Check: $(tve^{\lambda t})'=ve^{\lambda t}+\lambda tve^{\lambda t}$ while $A(tve^{\lambda t})=\lambda tve^{\lambda t}$; the difference is $ve^{\lambda t}\ne0$.`) }
      ]
    },
    {
      id: 't12.4',
      title: L('Faza tekisligi va muvozanat holatlari', 'Фазовая плоскость и положения равновесия', 'The phase plane and equilibria'),
      blocks: [
        { type: 'def', title: L('Faza tekisligi, traektoriya, muvozanat holati', 'Фазовая плоскость, траектория, положение равновесия', 'Phase plane, trajectory, equilibrium'),
          body: L(R`Avtonom sistema $x'=P(x,y)$, $y'=Q(x,y)$ (o‘ng tomonda $t$ yo‘q) uchun:
- **faza tekisligi** — $(x,y)$ tekislik; yechim $t$ o‘zgarganda unda **traektoriya** (fazaviy egri chiziq) chizadi, strelka $t$ ortish yo‘nalishini ko‘rsatadi;
- **muvozanat holati** — $P(x_0,y_0)=Q(x_0,y_0)=0$ nuqta; u $x\equiv x_0$, $y\equiv y_0$ o‘zgarmas yechimga mos;
- traektoriyalar to‘plami — **faza portreti**.

Yagonalik bajarilsa, ikki traektoriya kesishmaydi.`,
          R`Для автономной системы $x'=P(x,y)$, $y'=Q(x,y)$ (правая часть не содержит $t$):
- **фазовая плоскость** — плоскость $(x,y)$; решение при изменении $t$ описывает в ней **траекторию** (фазовую кривую), стрелка показывает направление роста $t$;
- **положение равновесия** — точка, где $P(x_0,y_0)=Q(x_0,y_0)=0$; ей соответствует постоянное решение $x\equiv x_0$, $y\equiv y_0$;
- совокупность траекторий — **фазовый портрет**.

При единственности две траектории не пересекаются.`,
          R`For an autonomous system $x'=P(x,y)$, $y'=Q(x,y)$ (no $t$ on the right):
- the **phase plane** is the $(x,y)$-plane; as $t$ changes, a solution traces a **trajectory** (phase curve) in it, with an arrow showing increasing $t$;
- an **equilibrium** is a point with $P(x_0,y_0)=Q(x_0,y_0)=0$; it corresponds to the constant solution $x\equiv x_0$, $y\equiv y_0$;
- the collection of trajectories is the **phase portrait**.

When uniqueness holds, two trajectories never cross.`) },
        { type: 'thm', title: L('Iz va determinant bo‘yicha tasnif', 'Классификация по следу и определителю', 'Classification by trace and determinant'),
          conds: L(R`1. $X'=AX$, $A$ — o‘zgarmas haqiqiy $2\times2$ matritsa;
2. $\Delta=\det A\ne0$ (shunda $(0,0)$ — yagona muvozanat holati); $\tau=\operatorname{tr}A$.`,
          R`1. $X'=AX$, $A$ — постоянная вещественная матрица $2\times2$;
2. $\Delta=\det A\ne0$ (тогда $(0,0)$ — единственное положение равновесия); $\tau=\operatorname{tr}A$.`,
          R`1. $X'=AX$ with a constant real $2\times2$ matrix $A$;
2. $\Delta=\det A\ne0$ (so $(0,0)$ is the only equilibrium); $\tau=\operatorname{tr}A$.`),
          body: L(R`Xos qiymatlar $\lambda^2-\tau\lambda+\Delta=0$ dan topiladi va:
- $\Delta<0$: $\lambda_1<0<\lambda_2$ — **egar** (doim beqaror);
- $\Delta>0$, $\tau^2-4\Delta>0$: bir xil ishorali haqiqiy ildizlar — **tugun**; $\tau<0$ turg‘un, $\tau>0$ beqaror;
- $\Delta>0$, $\tau^2-4\Delta=0$: karrali ildiz — **buzilgan (yoki yulduzsimon) tugun**;
- $\Delta>0$, $\tau^2-4\Delta<0$, $\tau\ne0$: $\alpha\pm i\beta$ — **fokus**; $\tau<0$ turg‘un, $\tau>0$ beqaror;
- $\Delta>0$, $\tau=0$: $\pm i\beta$ — **markaz** (yopiq orbitalar, davr $2\pi/\sqrt\Delta$).

$\Delta=0$ bo‘lsa, muvozanat holatlari butun bir to‘g‘ri chiziqni tashkil etadi (izolyatsiyalanmagan).`,
          R`Собственные значения находятся из $\lambda^2-\tau\lambda+\Delta=0$, и:
- $\Delta<0$: $\lambda_1<0<\lambda_2$ — **седло** (всегда неустойчиво);
- $\Delta>0$, $\tau^2-4\Delta>0$: вещественные корни одного знака — **узел**; $\tau<0$ устойчивый, $\tau>0$ неустойчивый;
- $\Delta>0$, $\tau^2-4\Delta=0$: кратный корень — **вырожденный (или дикритический) узел**;
- $\Delta>0$, $\tau^2-4\Delta<0$, $\tau\ne0$: $\alpha\pm i\beta$ — **фокус**; $\tau<0$ устойчивый, $\tau>0$ неустойчивый;
- $\Delta>0$, $\tau=0$: $\pm i\beta$ — **центр** (замкнутые орбиты, период $2\pi/\sqrt\Delta$).

При $\Delta=0$ положения равновесия заполняют целую прямую (неизолированные).`,
          R`The eigenvalues come from $\lambda^2-\tau\lambda+\Delta=0$, and:
- $\Delta<0$: $\lambda_1<0<\lambda_2$, a **saddle** (always unstable);
- $\Delta>0$, $\tau^2-4\Delta>0$: real roots of the same sign, a **node**; stable if $\tau<0$, unstable if $\tau>0$;
- $\Delta>0$, $\tau^2-4\Delta=0$: a double root, a **degenerate (or star) node**;
- $\Delta>0$, $\tau^2-4\Delta<0$, $\tau\ne0$: $\alpha\pm i\beta$, a **focus** (spiral); stable if $\tau<0$, unstable if $\tau>0$;
- $\Delta>0$, $\tau=0$: $\pm i\beta$, a **centre** (closed orbits with period $2\pi/\sqrt\Delta$).

If $\Delta=0$, the equilibria fill a whole line (they are not isolated).`) },
        { type: 'example', title: L('Egar', 'Седло', 'A saddle'),
          body: L(R`$x'=x+2y$, $y'=3x+2y$. Muvozanat holatini tasniflang va ajratuvchi yo‘nalishlarni toping.`, R`$x'=x+2y$, $y'=3x+2y$. Классифицируйте положение равновесия и найдите сепаратрисные направления.`, R`$x'=x+2y$, $y'=3x+2y$. Classify the equilibrium and find the separatrix directions.`),
          steps: [
            L(R`$\tau=3$, $\Delta=2-6=-4<0$ — **egar**.`, R`$\tau=3$, $\Delta=2-6=-4<0$ — **седло**.`, R`$\tau=3$, $\Delta=2-6=-4<0$: a **saddle**.`),
            L(R`$\lambda^2-3\lambda-4=0$: $\lambda_1=4$, $v_1=(2,3)^T$; $\lambda_2=-1$, $v_2=(1,-1)^T$.`, R`$\lambda^2-3\lambda-4=0$: $\lambda_1=4$, $v_1=(2,3)^T$; $\lambda_2=-1$, $v_2=(1,-1)^T$.`, R`$\lambda^2-3\lambda-4=0$: $\lambda_1=4$, $v_1=(2,3)^T$; $\lambda_2=-1$, $v_2=(1,-1)^T$.`),
            L(R`$v_2$ to‘g‘ri chizig‘i bo‘ylab traektoriyalar markazga kiradi, $v_1$ bo‘ylab chiqib ketadi; qolganlari giperbolaga o‘xshab, oxirida $v_1$ yo‘nalishiga buriladi.`, R`По прямой $v_2$ траектории входят в начало, по $v_1$ — уходят; остальные похожи на гиперболы и в итоге поворачивают вдоль $v_1$.`, R`Along the line of $v_2$ trajectories enter the origin, along $v_1$ they leave; the others look like hyperbolas and eventually turn along $v_1$.`)
          ],
          check: L(R`$A v_1=(2+6,\ 6+6)^T=(8,12)^T=4v_1$ ✓; $Av_2=(1-2,\ 3-2)^T=(-1,1)^T=-v_2$ ✓.`, R`$A v_1=(2+6,\ 6+6)^T=(8,12)^T=4v_1$ ✓; $Av_2=(1-2,\ 3-2)^T=(-1,1)^T=-v_2$ ✓.`, R`$A v_1=(2+6,\ 6+6)^T=(8,12)^T=4v_1$ ✓; $Av_2=(1-2,\ 3-2)^T=(-1,1)^T=-v_2$ ✓.`) },
        { type: 'lab', lab: 'L08', body: L(R`Laboratoriyada $A$ matritsaning elementlarini o‘zgartiring: $(\tau,\Delta)$ nuqta tasnif diagrammasida siljiydi, faza portreti esa egar, tugun, fokus yoki markazga aylanadi. Bosilgan nuqtadan traektoriya chiziladi (mustaqil ish 11).`, R`В лаборатории меняйте элементы матрицы $A$: точка $(\tau,\Delta)$ движется по диаграмме классификации, а фазовый портрет превращается в седло, узел, фокус или центр. Нажатие на плоскость рисует траекторию (самостоятельная работа 11).`, R`In the lab, change the entries of $A$: the point $(\tau,\Delta)$ moves on the classification diagram and the phase portrait turns into a saddle, node, focus or centre. Tapping the plane draws a trajectory (independent task 11).`) },
        { type: 'thm', title: L('Chiziqlashtirish (Grobman–Xartman)', 'Линеаризация (Гробман–Хартман)', 'Linearisation (Hartman–Grobman)'),
          conds: L(R`1. $P,Q$ muvozanat nuqtasi $(x_0,y_0)$ atrofida uzluksiz differensiallanuvchi;
2. Yakobi matritsasi $J=\begin{pmatrix}P_x&P_y\\Q_x&Q_y\end{pmatrix}_{(x_0,y_0)}$ ning hech bir xos qiymatining haqiqiy qismi nolga teng emas (giperbolik nuqta).`,
          R`1. $P,Q$ непрерывно дифференцируемы в окрестности точки равновесия $(x_0,y_0)$;
2. ни одно собственное значение матрицы Якоби $J=\begin{pmatrix}P_x&P_y\\Q_x&Q_y\end{pmatrix}_{(x_0,y_0)}$ не имеет нулевой вещественной части (гиперболическая точка).`,
          R`1. $P,Q$ are continuously differentiable near the equilibrium $(x_0,y_0)$;
2. no eigenvalue of the Jacobian $J=\begin{pmatrix}P_x&P_y\\Q_x&Q_y\end{pmatrix}_{(x_0,y_0)}$ has zero real part (a hyperbolic point).`),
          body: L(R`U holda muvozanat atrofida nochiziqli sistemaning faza portreti $X'=JX$ ning portretiga sifat jihatdan o‘xshash: egar egar bo‘lib qoladi, turg‘un tugun/fokus turg‘unligicha qoladi. **Markaz** ($\tau=0$) va $\Delta=0$ hollarida chiziqlashtirish xulosa bermaydi.`,
          R`Тогда вблизи равновесия фазовый портрет нелинейной системы качественно такой же, как у $X'=JX$: седло остаётся седлом, устойчивый узел/фокус — устойчивым. В случаях **центра** ($\tau=0$) и $\Delta=0$ линеаризация вывода не даёт.`,
          R`Then near the equilibrium the phase portrait of the nonlinear system is qualitatively the same as that of $X'=JX$: a saddle stays a saddle, a stable node/focus stays stable. For a **centre** ($\tau=0$) and for $\Delta=0$ linearisation is inconclusive.`) },
        { type: 'example', title: L('Yirtqich–o‘lja modeli (chiziqlashtirish)', 'Модель «хищник–жертва» (линеаризация)', 'Predator–prey model (linearisation)'),
          body: L(R`Lotka–Volterra modeli: $x'=x(1-0{,}5y)$ (o‘lja), $y'=y(-0{,}75+0{,}25x)$ (yirtqich). Birga yashash muvozanatini toping va chiziqlashtiring.`, R`Модель Лотки–Вольтерры: $x'=x(1-0{,}5y)$ (жертвы), $y'=y(-0{,}75+0{,}25x)$ (хищники). Найдите равновесие сосуществования и линеаризуйте.`, R`Lotka–Volterra model: $x'=x(1-0.5y)$ (prey), $y'=y(-0.75+0.25x)$ (predators). Find the coexistence equilibrium and linearise.`),
          steps: [
            L(R`$1-0{,}5y=0$, $-0{,}75+0{,}25x=0$: $(x_0,y_0)=(3,2)$ (yana $(0,0)$ ham bor).`, R`$1-0{,}5y=0$, $-0{,}75+0{,}25x=0$: $(x_0,y_0)=(3,2)$ (есть ещё $(0,0)$).`, R`$1-0.5y=0$, $-0.75+0.25x=0$: $(x_0,y_0)=(3,2)$ (and also $(0,0)$).`),
            L(R`$J=\begin{pmatrix}1-0{,}5y&-0{,}5x\\0{,}25y&-0{,}75+0{,}25x\end{pmatrix}_{(3,2)}=\begin{pmatrix}0&-1{,}5\\0{,}5&0\end{pmatrix}$.`, R`$J=\begin{pmatrix}1-0{,}5y&-0{,}5x\\0{,}25y&-0{,}75+0{,}25x\end{pmatrix}_{(3,2)}=\begin{pmatrix}0&-1{,}5\\0{,}5&0\end{pmatrix}$.`, R`$J=\begin{pmatrix}1-0.5y&-0.5x\\0.25y&-0.75+0.25x\end{pmatrix}_{(3,2)}=\begin{pmatrix}0&-1.5\\0.5&0\end{pmatrix}$.`),
            L(R`$\tau=0$, $\Delta=0{,}75$: chiziqli sistema — **markaz**, $\lambda=\pm i\sqrt{0{,}75}\approx\pm0{,}866i$, kichik tebranishlar davri $2\pi/0{,}866\approx7{,}26$.`, R`$\tau=0$, $\Delta=0{,}75$: линейная система — **центр**, $\lambda=\pm i\sqrt{0{,}75}\approx\pm0{,}866i$, период малых колебаний $2\pi/0{,}866\approx7{,}26$.`, R`$\tau=0$, $\Delta=0.75$: the linear system is a **centre**, $\lambda=\pm i\sqrt{0.75}\approx\pm0.866i$, period of small oscillations $2\pi/0.866\approx7.26$.`),
            L(R`Markaz — chegaraviy hol, shuning uchun Grobman–Xartman teoremasi ishlamaydi. Lotka–Volterra modeli uchun alohida birinchi integral $H=0{,}25x-0{,}75\ln x+0{,}5y-\ln y$ mavjud, u traektoriyalar haqiqatan yopiq ekanini ko‘rsatadi: soni davriy tebranadi.`, R`Центр — пограничный случай, поэтому теорема Гробмана–Хартмана не работает. Для модели Лотки–Вольтерры есть отдельный первый интеграл $H=0{,}25x-0{,}75\ln x+0{,}5y-\ln y$, который показывает, что траектории действительно замкнуты: численности периодически колеблются.`, R`A centre is a borderline case, so Hartman–Grobman does not apply. The Lotka–Volterra model has a separate first integral $H=0.25x-0.75\ln x+0.5y-\ln y$, which shows that the trajectories are indeed closed: the populations oscillate periodically.`)
          ],
          check: L(R`$H'=(0{,}25-\frac{0{,}75}{x})x'+(0{,}5-\frac1y)y'=(0{,}25x-0{,}75)(1-0{,}5y)+(0{,}5y-1)(-0{,}75+0{,}25x)=0$ ✓.`, R`$H'=(0{,}25-\frac{0{,}75}{x})x'+(0{,}5-\frac1y)y'=(0{,}25x-0{,}75)(1-0{,}5y)+(0{,}5y-1)(-0{,}75+0{,}25x)=0$ ✓.`, R`$H'=(0.25-\frac{0.75}{x})x'+(0.5-\frac1y)y'=(0.25x-0.75)(1-0.5y)+(0.5y-1)(-0.75+0.25x)=0$ ✓.`) },
        { type: 'example', title: L('Tarmoqda zararli dastur tarqalishi (SIR tipidagi model)', 'Распространение вредоносной программы в сети (модель типа SIR)', 'Malware spread in a network (an SIR-type model)'),
          body: L(R`$N=1000$ ta qurilma: $S$ — zaif, $I$ — zararlangan. Soddalashtirilgan model:
$$S'=-\beta SI,\qquad I'=\beta SI-\gamma I,\qquad \beta=0{,}0004,\ \gamma=0{,}2\ (\text{1/sutka}).$$
Boshida deyarli hamma zaif: $(S,I)\approx(N,0)$. Epidemiya boshlanadimi?`, R`$N=1000$ устройств: $S$ — уязвимые, $I$ — заражённые. Упрощённая модель:
$$S'=-\beta SI,\qquad I'=\beta SI-\gamma I,\qquad \beta=0{,}0004,\ \gamma=0{,}2\ (\text{1/сут}).$$
Вначале почти все уязвимы: $(S,I)\approx(N,0)$. Начнётся ли эпидемия?`, R`$N=1000$ devices: $S$ susceptible, $I$ infected. A simplified model:
$$S'=-\beta SI,\qquad I'=\beta SI-\gamma I,\qquad \beta=0.0004,\ \gamma=0.2\ (\text{1/day}).$$
At first almost everything is susceptible: $(S,I)\approx(N,0)$. Will an outbreak start?`),
          steps: [
            L(R`$I=0$ bo‘lgan har bir nuqta muvozanat: muvozanatlar butun to‘g‘ri chiziq.`, R`Каждая точка с $I=0$ — равновесие: равновесия заполняют прямую.`, R`Every point with $I=0$ is an equilibrium: the equilibria fill a line.`),
            L(R`$(N,0)$ da Yakobi matritsasi: $J=\begin{pmatrix}-\beta I&-\beta S\\ \beta I&\beta S-\gamma\end{pmatrix}_{(N,0)}=\begin{pmatrix}0&-0{,}4\\0&0{,}2\end{pmatrix}$, $\Delta=0$ — teorema bu yerda qo‘llanmaydi, lekin $I$ tenglamasi o‘zi aniq.`, R`Матрица Якоби в $(N,0)$: $J=\begin{pmatrix}-\beta I&-\beta S\\ \beta I&\beta S-\gamma\end{pmatrix}_{(N,0)}=\begin{pmatrix}0&-0{,}4\\0&0{,}2\end{pmatrix}$, $\Delta=0$ — теорема здесь неприменима, но уравнение для $I$ говорит само за себя.`, R`The Jacobian at $(N,0)$: $J=\begin{pmatrix}-\beta I&-\beta S\\ \beta I&\beta S-\gamma\end{pmatrix}_{(N,0)}=\begin{pmatrix}0&-0.4\\0&0.2\end{pmatrix}$, $\Delta=0$, so the theorem does not apply, but the $I$-equation speaks for itself.`),
            L(R`Chiziqlashtirilgan: $I'\approx(\beta N-\gamma)I=0{,}2\,I$, ya’ni boshida $I\approx I_0e^{0{,}2t}$, ikki baravarlanish vaqti $\ln2/0{,}2\approx3{,}5$ sutka. Chegara: $R_0=\beta N/\gamma=2>1$ — tarqaladi; $R_0<1$ bo‘lsa, so‘nadi.`, R`Линеаризованно: $I'\approx(\beta N-\gamma)I=0{,}2\,I$, т. е. вначале $I\approx I_0e^{0{,}2t}$, время удвоения $\ln2/0{,}2\approx3{,}5$ сут. Порог: $R_0=\beta N/\gamma=2>1$ — распространяется; при $R_0<1$ затухает.`, R`Linearised: $I'\approx(\beta N-\gamma)I=0.2\,I$, so initially $I\approx I_0e^{0.2t}$ with doubling time $\ln2/0.2\approx3.5$ days. Threshold: $R_0=\beta N/\gamma=2>1$, so it spreads; for $R_0<1$ it dies out.`),
            L(R`**Soddalashtirishlar**: barcha qurilmalar bir-biriga teng ehtimol bilan “uchrashadi” (real tarmoq topologiyasi hisobga olinmagan), $N$ o‘zgarmas, tozalangan qurilma qayta zararlanmaydi, $\beta,\gamma$ o‘zgarmas. Model faqat sifatiy xulosa (chegara $R_0$) uchun; aniq prognoz uchun tarmoq ma’lumotlari kerak.`, R`**Упрощения**: все устройства «встречаются» друг с другом равновероятно (реальная топология сети не учтена), $N$ постоянно, очищенное устройство не заражается повторно, $\beta,\gamma$ постоянны. Модель годится для качественного вывода (порог $R_0$); для точного прогноза нужны данные о сети.`, R`**Simplifications**: all devices “meet” each other with equal probability (the real network topology is ignored), $N$ is constant, a cleaned device is not reinfected, $\beta,\gamma$ are constant. The model supports a qualitative conclusion (the threshold $R_0$); an accurate forecast needs network data.`)
          ],
          check: L(R`$\beta N-\gamma=0{,}0004\cdot1000-0{,}2=0{,}2$ ✓; $I=I_0e^{0{,}2t}$: $I'=0{,}2I$ ✓.`, R`$\beta N-\gamma=0{,}0004\cdot1000-0{,}2=0{,}2$ ✓; $I=I_0e^{0{,}2t}$: $I'=0{,}2I$ ✓.`, R`$\beta N-\gamma=0.0004\cdot1000-0.2=0.2$ ✓; $I=I_0e^{0.2t}$: $I'=0.2I$ ✓.`) },
        { type: 'warn', body: L(R`Tasnif $\tau,\Delta$ orqali faqat **chiziqli** sistema uchun to‘liq. Nochiziqli modelda chiziqlashtirish xulosasiga faqat giperbolik nuqtada ishoning. Markaz chiqsa, haqiqiy sistemada fokus (so‘nuvchi yoki o‘suvchi spiral) ham bo‘lishi mumkin.`,
          R`Классификация по $\tau,\Delta$ полна только для **линейной** системы. В нелинейной модели доверяйте выводу линеаризации только в гиперболической точке. Если получился центр, в настоящей системе может оказаться и фокус (затухающая или раскручивающаяся спираль).`,
          R`The $\tau,\Delta$ classification is complete only for a **linear** system. In a nonlinear model trust the linearisation only at a hyperbolic point. If you get a centre, the true system may in fact have a focus (a decaying or growing spiral).`) }
      ]
    }
  ],
  mistakes: [
    L(R`Yuqori tartibli tenglamani sistemaga keltirishda noma’lumlar sonini noto‘g‘ri olish: $y'''$ uchun **uchta** noma’lum kerak ($y,y',y''$).`, R`Неверное число неизвестных при сведении к системе: для $y'''$ нужны **три** неизвестные ($y,y',y''$).`, R`Wrong number of unknowns when reducing to a system: $y'''$ needs **three** unknowns ($y,y',y''$).`),
    L(R`Yo‘qotish usulida $y$ ni integrallab topish va ortiqcha o‘zgarmas hosil qilish.`, R`Находить $y$ интегрированием в методе исключения и получать лишнюю постоянную.`, R`Finding $y$ by integration in the elimination method and getting an extra constant.`),
    L(R`Kompleks holda ikkala xos qiymat uchun yechim olib, 4 ta yechim yozish. Bitta $\lambda=\alpha+i\beta$ ning haqiqiy va mavhum qismlari yetarli.`, R`В комплексном случае брать решения для обоих собственных значений и писать 4 решения. Достаточно вещественной и мнимой частей для одного $\lambda=\alpha+i\beta$.`, R`In the complex case, taking solutions for both eigenvalues and writing four solutions. The real and imaginary parts for one $\lambda=\alpha+i\beta$ are enough.`),
    L(R`Karrali xos qiymatda ikkinchi yechimni $t\,ve^{\lambda t}$ deb olish (to‘g‘risi $(tv+w)e^{\lambda t}$).`, R`При кратном собственном значении брать второе решение в виде $t\,ve^{\lambda t}$ (правильно $(tv+w)e^{\lambda t}$).`, R`Taking $t\,ve^{\lambda t}$ as the second solution for a repeated eigenvalue (correct: $(tv+w)e^{\lambda t}$).`),
    L(R`$\Delta<0$ bo‘lganda $\tau$ ishorasiga qarab “turg‘un egar” deyish. Egar har doim beqaror.`, R`Называть седло «устойчивым» по знаку $\tau$ при $\Delta<0$. Седло всегда неустойчиво.`, R`Calling a saddle “stable” from the sign of $\tau$ when $\Delta<0$. A saddle is always unstable.`),
    L(R`Nochiziqli modelda chiziqlashtirilgan markazdan “orbitalar yopiq” deb xulosa chiqarish.`, R`Делать вывод «орбиты замкнуты» из линеаризованного центра в нелинейной модели.`, R`Concluding “the orbits are closed” from a linearised centre in a nonlinear model.`)
  ],
  exercises: [
    { id: 't12.x1', level: 'easy', type: 'numeric',
      q: L(R`$y^{(4)}+3y''-y=e^t$ tenglama nechta birinchi tartibli tenglamadan iborat normal sistemaga keladi?`, R`Сколько уравнений первого порядка будет в нормальной системе для $y^{(4)}+3y''-y=e^t$?`, R`How many first-order equations are in the normal system for $y^{(4)}+3y''-y=e^t$?`),
      check: { kind: 'numeric', value: 4, tol: 0 },
      hint: L(R`Noma’lumlar: $y,y',y'',y'''$.`, R`Неизвестные: $y,y',y'',y'''$.`, R`Unknowns: $y,y',y'',y'''$.`),
      solution: L(R`$x_1=y,\ x_2=y',\ x_3=y'',\ x_4=y'''$; $x_4'=-3x_3+x_1+e^t$. Jami 4 ta tenglama.`, R`$x_1=y,\ x_2=y',\ x_3=y'',\ x_4=y'''$; $x_4'=-3x_3+x_1+e^t$. Всего 4 уравнения.`, R`$x_1=y,\ x_2=y',\ x_3=y'',\ x_4=y'''$; $x_4'=-3x_3+x_1+e^t$. Four equations in total.`) },
    { id: 't12.x2', level: 'easy', type: 'mcq',
      q: L(R`$x'=3y-x$, $y'=2x$ sistemasining matritsasi:`, R`Матрица системы $x'=3y-x$, $y'=2x$:`, R`The matrix of the system $x'=3y-x$, $y'=2x$ is:`),
      options: [L(R`$\begin{pmatrix}-1&3\\2&0\end{pmatrix}$`, R`$\begin{pmatrix}-1&3\\2&0\end{pmatrix}$`, R`$\begin{pmatrix}-1&3\\2&0\end{pmatrix}$`), L(R`$\begin{pmatrix}3&-1\\2&0\end{pmatrix}$`, R`$\begin{pmatrix}3&-1\\2&0\end{pmatrix}$`, R`$\begin{pmatrix}3&-1\\2&0\end{pmatrix}$`), L(R`$\begin{pmatrix}-1&2\\3&0\end{pmatrix}$`, R`$\begin{pmatrix}-1&2\\3&0\end{pmatrix}$`, R`$\begin{pmatrix}-1&2\\3&0\end{pmatrix}$`), L(R`$\begin{pmatrix}0&2\\3&-1\end{pmatrix}$`, R`$\begin{pmatrix}0&2\\3&-1\end{pmatrix}$`, R`$\begin{pmatrix}0&2\\3&-1\end{pmatrix}$`)], correct: 0,
      solution: L(R`1-qator: $x$ oldidagi $-1$, $y$ oldidagi $3$; 2-qator: $2$ va $0$.`, R`1-я строка: коэффициент при $x$ равен $-1$, при $y$ — $3$; 2-я строка: $2$ и $0$.`, R`Row 1: coefficient of $x$ is $-1$, of $y$ is $3$; row 2: $2$ and $0$.`) },
    { id: 't12.x3', level: 'mid', type: 'formula',
      q: L(R`$x'=2x+y$, $y'=3x+4y$, $x(0)=1$, $y(0)=7$. $x(t)$ ni yozing: $x=\ ?$`, R`$x'=2x+y$, $y'=3x+4y$, $x(0)=1$, $y(0)=7$. Запишите $x(t)$: $x=\ ?$`, R`$x'=2x+y$, $y'=3x+4y$, $x(0)=1$, $y(0)=7$. Write $x(t)$: $x=\ ?$`),
      check: { kind: 'equiv', ref: '2*exp(5*t) - exp(t)', vars: { t: [-1, 1] }, lhs: 'x' }, answer: '2*exp(5*t) - exp(t)',
      hint: L(R`Yo‘qotish: $x''-6x'+5x=0$, $y=x'-2x$.`, R`Исключение: $x''-6x'+5x=0$, $y=x'-2x$.`, R`Elimination: $x''-6x'+5x=0$, $y=x'-2x$.`),
      solution: L(R`$x=C_1e^t+C_2e^{5t}$, $y=-C_1e^t+3C_2e^{5t}$; $C_1+C_2=1$, $-C_1+3C_2=7$ $\Rightarrow$ $C_1=-1$, $C_2=2$: $x=2e^{5t}-e^t$.`, R`$x=C_1e^t+C_2e^{5t}$, $y=-C_1e^t+3C_2e^{5t}$; $C_1+C_2=1$, $-C_1+3C_2=7$ $\Rightarrow$ $C_1=-1$, $C_2=2$: $x=2e^{5t}-e^t$.`, R`$x=C_1e^t+C_2e^{5t}$, $y=-C_1e^t+3C_2e^{5t}$; $C_1+C_2=1$, $-C_1+3C_2=7$ $\Rightarrow$ $C_1=-1$, $C_2=2$: $x=2e^{5t}-e^t$.`) },
    { id: 't12.x4', level: 'mid', type: 'numeric',
      q: L(R`$A=\begin{pmatrix}4&-2\\1&1\end{pmatrix}$ matritsaning eng katta xos qiymatini kiriting.`, R`Введите наибольшее собственное значение матрицы $A=\begin{pmatrix}4&-2\\1&1\end{pmatrix}$.`, R`Enter the largest eigenvalue of $A=\begin{pmatrix}4&-2\\1&1\end{pmatrix}$.`),
      check: { kind: 'numeric', value: 3, tol: 1e-9 },
      hint: L(R`$\lambda^2-\tau\lambda+\Delta=0$, $\tau=5$, $\Delta=6$.`, R`$\lambda^2-\tau\lambda+\Delta=0$, $\tau=5$, $\Delta=6$.`, R`$\lambda^2-\tau\lambda+\Delta=0$, $\tau=5$, $\Delta=6$.`),
      solution: L(R`$\lambda^2-5\lambda+6=0$, $\lambda=2;\,3$. Ikkalasi musbat: beqaror tugun.`, R`$\lambda^2-5\lambda+6=0$, $\lambda=2;\,3$. Оба положительны: неустойчивый узел.`, R`$\lambda^2-5\lambda+6=0$, $\lambda=2,3$. Both positive: an unstable node.`) },
    { id: 't12.x5', level: 'mid', type: 'match',
      q: L(R`$X'=AX$ matritsasini muvozanat turi bilan moslang.`, R`Сопоставьте матрицу системы $X'=AX$ и тип равновесия.`, R`Match the matrix of $X'=AX$ with the type of equilibrium.`),
      pairs: [
        { left: L(R`$\begin{pmatrix}0&1\\-4&0\end{pmatrix}$`, R`$\begin{pmatrix}0&1\\-4&0\end{pmatrix}$`, R`$\begin{pmatrix}0&1\\-4&0\end{pmatrix}$`), right: L('markaz', 'центр', 'centre') },
        { left: L(R`$\begin{pmatrix}-3&1\\1&-3\end{pmatrix}$`, R`$\begin{pmatrix}-3&1\\1&-3\end{pmatrix}$`, R`$\begin{pmatrix}-3&1\\1&-3\end{pmatrix}$`), right: L('turg‘un tugun', 'устойчивый узел', 'stable node') },
        { left: L(R`$\begin{pmatrix}1&2\\3&2\end{pmatrix}$`, R`$\begin{pmatrix}1&2\\3&2\end{pmatrix}$`, R`$\begin{pmatrix}1&2\\3&2\end{pmatrix}$`), right: L('egar', 'седло', 'saddle') },
        { left: L(R`$\begin{pmatrix}1&-1\\5&-3\end{pmatrix}$`, R`$\begin{pmatrix}1&-1\\5&-3\end{pmatrix}$`, R`$\begin{pmatrix}1&-1\\5&-3\end{pmatrix}$`), right: L('turg‘un fokus', 'устойчивый фокус', 'stable focus') }
      ],
      explain: L(R`$(\tau,\Delta)$: $(0,4)$ markaz; $(-6,8)$, $\tau^2-4\Delta=4>0$ — turg‘un tugun; $(3,-4)$ egar; $(-2,2)$, $\tau^2-4\Delta=-4<0$ — turg‘un fokus.`, R`$(\tau,\Delta)$: $(0,4)$ центр; $(-6,8)$, $\tau^2-4\Delta=4>0$ — устойчивый узел; $(3,-4)$ седло; $(-2,2)$, $\tau^2-4\Delta=-4<0$ — устойчивый фокус.`, R`$(\tau,\Delta)$: $(0,4)$ centre; $(-6,8)$ with $\tau^2-4\Delta=4>0$, stable node; $(3,-4)$ saddle; $(-2,2)$ with $\tau^2-4\Delta=-4<0$, stable focus.`) },
    { id: 't12.x6', level: 'mid', type: 'order',
      q: L(R`$x'=ax+by$, $y'=cx+dy$ sistemasini yo‘qotish usuli bilan yechish qadamlarini tartiblang.`, R`Упорядочьте шаги решения системы $x'=ax+by$, $y'=cx+dy$ методом исключения.`, R`Order the steps for solving $x'=ax+by$, $y'=cx+dy$ by elimination.`),
      items: [
        L(R`Birinchi tenglamadan $y=(x'-ax)/b$ ni topish`, R`Выразить $y=(x'-ax)/b$ из первого уравнения`, R`Express $y=(x'-ax)/b$ from the first equation`),
        L(R`Birinchi tenglamani differensiallab, $y'$ va $y$ ni qo‘yish`, R`Продифференцировать первое уравнение и подставить $y'$ и $y$`, R`Differentiate the first equation and substitute $y'$ and $y$`),
        L(R`$x''-\tau x'+\Delta x=0$ ni yechish`, R`Решить $x''-\tau x'+\Delta x=0$`, R`Solve $x''-\tau x'+\Delta x=0$`),
        L(R`$y$ ni $y=(x'-ax)/b$ formulaga qo‘yib topish`, R`Найти $y$ подстановкой в $y=(x'-ax)/b$`, R`Find $y$ by substituting into $y=(x'-ax)/b$`),
        L('Boshlang‘ich shartlardan $C_1,C_2$ ni topish', 'Найти $C_1,C_2$ из начальных условий', 'Find $C_1,C_2$ from the initial conditions')
      ],
      explain: L(R`$y$ ni ifodalash → bitta 2-tartibli tenglama → uning yechimi → $y$ ni hosila orqali → o‘zgarmaslar.`, R`Выразить $y$ → одно уравнение 2-го порядка → его решение → $y$ через производную → постоянные.`, R`Express $y$ → one second-order equation → solve it → $y$ through the derivative → constants.`) },
    { id: 't12.x7', level: 'hard', type: 'formula',
      q: L(R`$x'=-x-4y$, $y'=x-y$, $x(0)=2$, $y(0)=0$. $y(t)$ ni yozing: $y=\ ?$`, R`$x'=-x-4y$, $y'=x-y$, $x(0)=2$, $y(0)=0$. Запишите $y(t)$: $y=\ ?$`, R`$x'=-x-4y$, $y'=x-y$, $x(0)=2$, $y(0)=0$. Write $y(t)$: $y=\ ?$`),
      check: { kind: 'equiv', ref: 'exp(-t)*sin(2*t)', vars: { t: [-1, 2] }, lhs: 'y' }, answer: 'exp(-t)*sin(2*t)',
      hint: L(R`Umumiy yechim 3-darsdagi misolda: $X=C_1e^{-t}(-2\sin2t,\cos2t)^T+C_2e^{-t}(2\cos2t,\sin2t)^T$.`, R`Общее решение — в примере урока 3: $X=C_1e^{-t}(-2\sin2t,\cos2t)^T+C_2e^{-t}(2\cos2t,\sin2t)^T$.`, R`The general solution is in the lesson-3 example: $X=C_1e^{-t}(-2\sin2t,\cos2t)^T+C_2e^{-t}(2\cos2t,\sin2t)^T$.`),
      solution: L(R`$t=0$: $x=2C_2=2$, $y=C_1=0$. Demak $x=2e^{-t}\cos2t$, $y=e^{-t}\sin2t$.`, R`$t=0$: $x=2C_2=2$, $y=C_1=0$. Значит, $x=2e^{-t}\cos2t$, $y=e^{-t}\sin2t$.`, R`At $t=0$: $x=2C_2=2$, $y=C_1=0$. Hence $x=2e^{-t}\cos2t$, $y=e^{-t}\sin2t$.`) },
    { id: 't12.x8', level: 'hard', type: 'finderror',
      q: L(R`Talaba $X'=\begin{pmatrix}3&-1\\1&1\end{pmatrix}X$ ni yechdi. Qaysi qatorda xato bor?`, R`Студент решил $X'=\begin{pmatrix}3&-1\\1&1\end{pmatrix}X$. В какой строке ошибка?`, R`A student solved $X'=\begin{pmatrix}3&-1\\1&1\end{pmatrix}X$. Which line is wrong?`),
      lines: [
        L(R`$\lambda^2-4\lambda+4=0$, $\lambda=2$ (ikki karrali)`, R`$\lambda^2-4\lambda+4=0$, $\lambda=2$ (кратности 2)`, R`$\lambda^2-4\lambda+4=0$, $\lambda=2$ (double)`),
        L(R`Xos vektor $v=(1,1)^T$`, R`Собственный вектор $v=(1,1)^T$`, R`Eigenvector $v=(1,1)^T$`),
        L(R`$X=C_1(1,1)^Te^{2t}+C_2\,t\,(1,1)^Te^{2t}$`, R`$X=C_1(1,1)^Te^{2t}+C_2\,t\,(1,1)^Te^{2t}$`, R`$X=C_1(1,1)^Te^{2t}+C_2\,t\,(1,1)^Te^{2t}$`),
        L(R`Muvozanat — beqaror buzilgan tugun`, R`Равновесие — неустойчивый вырожденный узел`, R`The equilibrium is an unstable degenerate node`)
      ],
      wrong: 2,
      explain: L(R`$t\,ve^{2t}$ yechim emas. $(A-2E)w=v$ dan $w=(1,0)^T$ topiladi va ikkinchi yechim $(tv+w)e^{2t}=(t+1,\,t)^Te^{2t}$.`, R`$t\,ve^{2t}$ не решение. Из $(A-2E)w=v$ находим $w=(1,0)^T$, и второе решение $(tv+w)e^{2t}=(t+1,\,t)^Te^{2t}$.`, R`$t\,ve^{2t}$ is not a solution. From $(A-2E)w=v$ we get $w=(1,0)^T$, and the second solution is $(tv+w)e^{2t}=(t+1,\,t)^Te^{2t}$.`) },
    { id: 't12.x9', level: 'hard', type: 'numeric',
      q: L(R`Lotka–Volterra modeli $x'=x(a-by)$, $y'=y(-c+dx)$ da $a=1$, $c=4$. Birga yashash nuqtasi atrofidagi kichik tebranishlar davrini kiriting (chiziqlashtirish bo‘yicha).`, R`В модели Лотки–Вольтерры $x'=x(a-by)$, $y'=y(-c+dx)$ $a=1$, $c=4$. Введите период малых колебаний около точки сосуществования (по линеаризации).`, R`In the Lotka–Volterra model $x'=x(a-by)$, $y'=y(-c+dx)$ take $a=1$, $c=4$. Enter the period of small oscillations about the coexistence point (from the linearisation).`),
      check: { kind: 'numeric', value: Math.PI, tol: 1e-3 },
      hint: L(R`$(c/d,\ a/b)$ da $J=\begin{pmatrix}0&-bc/d\\ad/b&0\end{pmatrix}$, $\Delta=ac$.`, R`В $(c/d,\ a/b)$: $J=\begin{pmatrix}0&-bc/d\\ad/b&0\end{pmatrix}$, $\Delta=ac$.`, R`At $(c/d,\ a/b)$: $J=\begin{pmatrix}0&-bc/d\\ad/b&0\end{pmatrix}$, $\Delta=ac$.`),
      solution: L(R`$\lambda=\pm i\sqrt{ac}=\pm2i$, davr $T=2\pi/2=\pi\approx3{,}1416$.`, R`$\lambda=\pm i\sqrt{ac}=\pm2i$, период $T=2\pi/2=\pi\approx3{,}1416$.`, R`$\lambda=\pm i\sqrt{ac}=\pm2i$, period $T=2\pi/2=\pi\approx3.1416$.`) },
    { id: 't12.x10', level: 'hard', type: 'steps',
      q: L(R`SIR tipidagi model $S'=-\beta SI$, $I'=\beta SI-\gamma I$, $N=500$, $\gamma=0{,}25$. Qaysi $\beta$ da zararli dastur tarqalmaydi?`, R`Модель типа SIR $S'=-\beta SI$, $I'=\beta SI-\gamma I$, $N=500$, $\gamma=0{,}25$. При каких $\beta$ вредоносная программа не распространяется?`, R`SIR-type model $S'=-\beta SI$, $I'=\beta SI-\gamma I$, $N=500$, $\gamma=0.25$. For which $\beta$ does the malware not spread?`),
      steps: [
        { q: L(R`$(N,0)$ yaqinida $I$ uchun chiziqlashtirilgan tenglama:`, R`Линеаризованное уравнение для $I$ около $(N,0)$:`, R`The linearised equation for $I$ near $(N,0)$:`), options: [L(R`$I'=(\beta N-\gamma)I$`, R`$I'=(\beta N-\gamma)I$`, R`$I'=(\beta N-\gamma)I$`), L(R`$I'=-\gamma I$`, R`$I'=-\gamma I$`, R`$I'=-\gamma I$`), L(R`$I'=\beta N$`, R`$I'=\beta N$`, R`$I'=\beta N$`)], correct: 0 },
        { q: L('Tarqalmaslik sharti:', 'Условие нераспространения:', 'Condition for no spread:'), options: [L(R`$\beta N<\gamma$`, R`$\beta N<\gamma$`, R`$\beta N<\gamma$`), L(R`$\beta>\gamma$`, R`$\beta>\gamma$`, R`$\beta>\gamma$`), L(R`$\beta N>\gamma$`, R`$\beta N>\gamma$`, R`$\beta N>\gamma$`)], correct: 0 },
        { q: L('Javob:', 'Ответ:', 'Answer:'), options: [L(R`$\beta<0{,}0005$`, R`$\beta<0{,}0005$`, R`$\beta<0.0005$`), L(R`$\beta<0{,}25$`, R`$\beta<0{,}25$`, R`$\beta<0.25$`), L(R`$\beta<0{,}002$`, R`$\beta<0{,}002$`, R`$\beta<0.002$`)], correct: 0 }
      ],
      explain: L(R`$R_0=\beta N/\gamma<1\iff\beta<\gamma/N=0{,}25/500=0{,}0005$. Bu soddalashtirilgan model uchun sifatiy chegara.`, R`$R_0=\beta N/\gamma<1\iff\beta<\gamma/N=0{,}25/500=0{,}0005$. Это качественный порог для упрощённой модели.`, R`$R_0=\beta N/\gamma<1\iff\beta<\gamma/N=0.25/500=0.0005$. This is a qualitative threshold for a simplified model.`) }
  ],
  quiz: [
    { id: 't12.q1', q: L(R`$y''+4y'+3y=0$ ni sistemaga keltirsak ($x_1=y$, $x_2=y'$), matritsa:`, R`При сведении $y''+4y'+3y=0$ к системе ($x_1=y$, $x_2=y'$) матрица равна:`, R`Reducing $y''+4y'+3y=0$ to a system ($x_1=y$, $x_2=y'$) gives the matrix:`),
      options: [L(R`$\begin{pmatrix}0&1\\-3&-4\end{pmatrix}$`, R`$\begin{pmatrix}0&1\\-3&-4\end{pmatrix}$`, R`$\begin{pmatrix}0&1\\-3&-4\end{pmatrix}$`), L(R`$\begin{pmatrix}0&1\\3&4\end{pmatrix}$`, R`$\begin{pmatrix}0&1\\3&4\end{pmatrix}$`, R`$\begin{pmatrix}0&1\\3&4\end{pmatrix}$`), L(R`$\begin{pmatrix}1&0\\-4&-3\end{pmatrix}$`, R`$\begin{pmatrix}1&0\\-4&-3\end{pmatrix}$`, R`$\begin{pmatrix}1&0\\-4&-3\end{pmatrix}$`), L(R`$\begin{pmatrix}-4&-3\\1&0\end{pmatrix}$`, R`$\begin{pmatrix}-4&-3\\1&0\end{pmatrix}$`, R`$\begin{pmatrix}-4&-3\\1&0\end{pmatrix}$`)], correct: 0,
      explain: L(R`$x_1'=x_2$, $x_2'=-3x_1-4x_2$.`, R`$x_1'=x_2$, $x_2'=-3x_1-4x_2$.`, R`$x_1'=x_2$, $x_2'=-3x_1-4x_2$.`),
      why: [null, L('Ishoralar: $y\'\'=-3y-4y\'$.', 'Знаки: $y\'\'=-3y-4y\'$.', 'Signs: $y\'\'=-3y-4y\'$.'), L(R`Birinchi qator $x_1'=x_2$ ni bildirishi kerak.`, R`Первая строка должна давать $x_1'=x_2$.`, R`The first row must give $x_1'=x_2$.`), L(R`Bu $x_1=y'$, $x_2=y$ tartibiga mos.`, R`Это соответствует порядку $x_1=y'$, $x_2=y$.`, R`That corresponds to the ordering $x_1=y'$, $x_2=y$.`)] },
    { id: 't12.q2', q: L(R`$X'=A(t)X+F(t)$ ning Koshi masalasi butun $I$ da yagona yechimga ega bo‘lishi uchun yetarli:`, R`Для единственного решения задачи Коши $X'=A(t)X+F(t)$ на всём $I$ достаточно:`, R`For the Cauchy problem $X'=A(t)X+F(t)$ to have a unique solution on all of $I$ it suffices that:`),
      options: [L(R`$A(t)$ va $F(t)$ $I$ da uzluksiz`, R`$A(t)$ и $F(t)$ непрерывны на $I$`, R`$A(t)$ and $F(t)$ are continuous on $I$`), L(R`$\det A\ne0$`, R`$\det A\ne0$`, R`$\det A\ne0$`), L(R`$A$ simmetrik`, R`$A$ симметрична`, R`$A$ is symmetric`), L(R`$F\equiv0$`, R`$F\equiv0$`, R`$F\equiv0$`)], correct: 0,
      explain: L('Chiziqli sistema uchun koeffitsiyentlarning uzluksizligi global mavjudlik va yagonalikni beradi.', 'Для линейной системы непрерывность коэффициентов даёт глобальное существование и единственность.', 'For a linear system, continuity of the coefficients gives global existence and uniqueness.'),
      why: [null, L('Determinant muvozanat holati yagonaligiga tegishli, Koshi masalasiga emas.', 'Определитель связан с единственностью равновесия, а не с задачей Коши.', 'The determinant concerns uniqueness of the equilibrium, not the Cauchy problem.'), L('Simmetriya talab qilinmaydi.', 'Симметрия не требуется.', 'Symmetry is not required.'), L('Bir jinsli bo‘lmagan sistemalar uchun ham to‘g‘ri.', 'Верно и для неоднородных систем.', 'It holds for nonhomogeneous systems too.')] },
    { id: 't12.q3', q: L(R`$\operatorname{tr}A=-3$, $\det A=-2$. Muvozanat turi:`, R`$\operatorname{tr}A=-3$, $\det A=-2$. Тип равновесия:`, R`$\operatorname{tr}A=-3$, $\det A=-2$. The equilibrium is a:`),
      options: [L('egar', 'седло', 'saddle'), L('turg‘un tugun', 'устойчивый узел', 'stable node'), L('turg‘un fokus', 'устойчивый фокус', 'stable focus'), L('markaz', 'центр', 'centre')], correct: 0,
      explain: L(R`$\Delta<0$ — har doim egar, $\tau$ ga qaramasdan.`, R`$\Delta<0$ — всегда седло, независимо от $\tau$.`, R`$\Delta<0$ always gives a saddle, whatever $\tau$ is.`),
      why: [null, L(R`Tugun uchun $\Delta>0$ kerak.`, R`Для узла нужно $\Delta>0$.`, R`A node needs $\Delta>0$.`), L(R`Fokus uchun $\Delta>0$ va $\tau^2<4\Delta$.`, R`Для фокуса $\Delta>0$ и $\tau^2<4\Delta$.`, R`A focus needs $\Delta>0$ and $\tau^2<4\Delta$.`), L(R`Markaz uchun $\tau=0$, $\Delta>0$.`, R`Для центра $\tau=0$, $\Delta>0$.`, R`A centre needs $\tau=0$, $\Delta>0$.`)] },
    { id: 't12.q4', q: L(R`$\tau=0$, $\Delta=9$ bo‘lsa, orbitalar davri:`, R`При $\tau=0$, $\Delta=9$ период орбит равен:`, R`With $\tau=0$, $\Delta=9$, the period of the orbits is:`),
      options: [L(R`$2\pi/3$`, R`$2\pi/3$`, R`$2\pi/3$`), L(R`$2\pi/9$`, R`$2\pi/9$`, R`$2\pi/9$`), L(R`$3$`, R`$3$`, R`$3$`), L(R`$6\pi$`, R`$6\pi$`, R`$6\pi$`)], correct: 0,
      explain: L(R`$\lambda=\pm3i$, $T=2\pi/\sqrt\Delta=2\pi/3$.`, R`$\lambda=\pm3i$, $T=2\pi/\sqrt\Delta=2\pi/3$.`, R`$\lambda=\pm3i$, $T=2\pi/\sqrt\Delta=2\pi/3$.`),
      why: [null, L(R`$\sqrt\Delta$ kerak, $\Delta$ emas.`, R`Нужно $\sqrt\Delta$, а не $\Delta$.`, R`Use $\sqrt\Delta$, not $\Delta$.`), L('Bu burchak chastotasi.', 'Это угловая частота.', 'That is the angular frequency.'), L(R`$2\pi$ ga bo‘linadi, ko‘paytirilmaydi.`, R`$2\pi$ делится, а не умножается.`, R`Divide $2\pi$, do not multiply.`)] },
    { id: 't12.q5', q: L(R`$\lambda=-2\pm i$ xos qiymatlar qanday muvozanatga mos?`, R`Каким равновесиям соответствуют собственные значения $\lambda=-2\pm i$?`, R`The eigenvalues $\lambda=-2\pm i$ correspond to:`),
      options: [L('turg‘un fokus', 'устойчивый фокус', 'a stable focus'), L('beqaror fokus', 'неустойчивый фокус', 'an unstable focus'), L('markaz', 'центр', 'a centre'), L('turg‘un tugun', 'устойчивый узел', 'a stable node')], correct: 0,
      explain: L(R`Kompleks, $\alpha=-2<0$: spiral ichkariga.`, R`Комплексные, $\alpha=-2<0$: спираль внутрь.`, R`Complex with $\alpha=-2<0$: inward spiral.`),
      why: [null, L('$\\alpha<0$ — turg‘un.', '$\\alpha<0$ — устойчив.', '$\\alpha<0$ means stable.'), L('Markazda $\\alpha=0$.', 'У центра $\\alpha=0$.', 'A centre has $\\alpha=0$.'), L('Tugunda ildizlar haqiqiy.', 'У узла корни вещественные.', 'A node has real roots.')] },
    { id: 't12.q6', q: L(R`$\lambda=1+2i$ uchun xos vektor $v=a+ib$ topildi. Haqiqiy yechimlar qanday olinadi?`, R`Для $\lambda=1+2i$ найден собственный вектор $v=a+ib$. Как получить вещественные решения?`, R`An eigenvector $v=a+ib$ was found for $\lambda=1+2i$. How do we get real solutions?`),
      options: [L(R`$ve^{\lambda t}$ ning haqiqiy va mavhum qismlari`, R`Вещественная и мнимая части $ve^{\lambda t}$`, R`Real and imaginary parts of $ve^{\lambda t}$`), L(R`$ae^{t}$ va $be^{2t}$`, R`$ae^{t}$ и $be^{2t}$`, R`$ae^{t}$ and $be^{2t}$`), L(R`$|v|e^{t}$`, R`$|v|e^{t}$`, R`$|v|e^{t}$`), L(R`$a\cos2t$ va $b\sin2t$ ($e^{t}$ siz)`, R`$a\cos2t$ и $b\sin2t$ (без $e^{t}$)`, R`$a\cos2t$ and $b\sin2t$ (without $e^{t}$)`)], correct: 0,
      explain: L(R`$e^{\lambda t}=e^t(\cos2t+i\sin2t)$; $\operatorname{Re}$ va $\operatorname{Im}$ — ikkita erkli haqiqiy yechim.`, R`$e^{\lambda t}=e^t(\cos2t+i\sin2t)$; $\operatorname{Re}$ и $\operatorname{Im}$ — два независимых вещественных решения.`, R`$e^{\lambda t}=e^t(\cos2t+i\sin2t)$; $\operatorname{Re}$ and $\operatorname{Im}$ are two independent real solutions.`),
      why: [null, L('Mavhum qism $\\beta=2$ chastotani beradi, o‘sishni emas.', 'Мнимая часть $\\beta=2$ даёт частоту, а не рост.', 'The imaginary part $\\beta=2$ is a frequency, not a growth rate.'), L('Tebranish yo‘qoladi.', 'Пропадают колебания.', 'The oscillation is lost.'), L('$e^{\\alpha t}$ ko‘paytuvchi unutilgan.', 'Забыт множитель $e^{\\alpha t}$.', 'The factor $e^{\\alpha t}$ is missing.')] },
    { id: 't12.q7', q: L('Yo‘qotish usulida $2\\times2$ sistemaning umumiy yechimida nechta ixtiyoriy o‘zgarmas bo‘ladi?', 'Сколько произвольных постоянных в общем решении системы $2\\times2$?', 'How many arbitrary constants does the general solution of a $2\\times2$ system have?'),
      options: [L('2', '2', '2'), L('1', '1', '1'), L('3', '3', '3'), L('4', '4', '4')], correct: 0,
      explain: L('Sistema tartibi 2 — o‘zgarmaslar soni ham 2.', 'Порядок системы 2 — и постоянных 2.', 'The system has order 2, so there are 2 constants.'),
      why: [null, L('Bitta o‘zgarmas ikkita boshlang‘ich shartni qanoatlantira olmaydi.', 'Одна постоянная не удовлетворит двум начальным условиям.', 'One constant cannot satisfy two initial conditions.'), L('Uchinchisi $y$ ni integrallashdan paydo bo‘ladi — bu xato.', 'Третья появляется при интегрировании для $y$ — это ошибка.', 'A third appears when integrating for $y$, which is a mistake.'), L('Har bir funksiyaga 2 ta emas.', 'Не по 2 на каждую функцию.', 'Not 2 per unknown function.')] },
    { id: 't12.q8', q: L('Nochiziqli sistemada chiziqlashtirish qachon ishonchli xulosa beradi?', 'Когда линеаризация нелинейной системы даёт надёжный вывод?', 'When does linearising a nonlinear system give a reliable conclusion?'),
      options: [L('Hech bir xos qiymatning haqiqiy qismi nol bo‘lmasa', 'Когда ни у одного собственного значения вещественная часть не нулевая', 'When no eigenvalue has zero real part'), L('Har doim', 'Всегда', 'Always'), L('Faqat markaz bo‘lsa', 'Только для центра', 'Only for a centre'), L('Faqat $\\Delta=0$ bo‘lsa', 'Только при $\\Delta=0$', 'Only when $\\Delta=0$')], correct: 0,
      explain: L('Grobman–Xartman teoremasi: giperbolik muvozanat.', 'Теорема Гробмана–Хартмана: гиперболическое равновесие.', 'Hartman–Grobman: a hyperbolic equilibrium.'),
      why: [null, L('Markaz va $\\Delta=0$ hollarda xulosa yo‘q.', 'Для центра и $\\Delta=0$ вывода нет.', 'No conclusion for a centre or $\\Delta=0$.'), L('Markaz aynan noaniq hol.', 'Центр — как раз неопределённый случай.', 'A centre is exactly the inconclusive case.'), L('$\\Delta=0$ ham noaniq.', '$\\Delta=0$ тоже неопределённый случай.', '$\\Delta=0$ is inconclusive too.')] },
    { id: 't12.q9', q: L('SIR tipidagi modelda $R_0=\\beta N/\\gamma=0{,}8$. Boshlang‘ich bosqichda:', 'В модели типа SIR $R_0=\\beta N/\\gamma=0{,}8$. На начальном этапе:', 'In an SIR-type model $R_0=\\beta N/\\gamma=0.8$. Initially:'),
      options: [L('zararlanganlar soni kamayadi', 'число заражённых убывает', 'the number infected decreases'), L('eksponensial o‘sadi', 'растёт экспоненциально', 'it grows exponentially'), L('o‘zgarmaydi', 'не меняется', 'it stays constant'), L('tebranadi', 'колеблется', 'it oscillates')], correct: 0,
      explain: L(R`$I'\approx(\beta N-\gamma)I=\gamma(R_0-1)I<0$.`, R`$I'\approx(\beta N-\gamma)I=\gamma(R_0-1)I<0$.`, R`$I'\approx(\beta N-\gamma)I=\gamma(R_0-1)I<0$.`),
      why: [null, L('O‘sish $R_0>1$ da.', 'Рост при $R_0>1$.', 'Growth needs $R_0>1$.'), L('Faqat $R_0=1$ da chiziqli yaqinlashishda.', 'Только при $R_0=1$ в линейном приближении.', 'Only for $R_0=1$ in the linear approximation.'), L('Chiziqlashtirilgan tenglama birinchi tartibli skalyar — tebranish yo‘q.', 'Линеаризованное уравнение скалярное первого порядка — колебаний нет.', 'The linearised equation is scalar first order: no oscillation.')] },
    { id: 't12.q10', q: L(R`Avtonom sistemaning muvozanat holati — bu:`, R`Положение равновесия автономной системы — это:`, R`An equilibrium of an autonomous system is:`),
      options: [L(R`$P=Q=0$ bo‘lgan nuqta`, R`точка, где $P=Q=0$`, R`a point where $P=Q=0$`), L(R`$P=Q$ bo‘lgan nuqta`, R`точка, где $P=Q$`, R`a point where $P=Q$`), L('traektoriyalar kesishgan nuqta', 'точка пересечения траекторий', 'a point where trajectories cross'), L('koordinata boshi har doim', 'всегда начало координат', 'always the origin')], correct: 0,
      explain: L('Unda $x\'=y\'=0$ — o‘zgarmas yechim.', 'Там $x\'=y\'=0$ — постоянное решение.', 'There $x\'=y\'=0$: a constant solution.'),
      why: [null, L('Ikkala hosila nol bo‘lishi kerak.', 'Обе производные должны быть нулевыми.', 'Both derivatives must vanish.'), L('Yagonalikda traektoriyalar kesishmaydi.', 'При единственности траектории не пересекаются.', 'With uniqueness trajectories never cross.'), L('Masalan, Lotka–Volterrada $(3,2)$.', 'Например, $(3,2)$ у Лотки–Вольтерры.', 'E.g. $(3,2)$ in Lotka–Volterra.')] }
  ]
});
})();
