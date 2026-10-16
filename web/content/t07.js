(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't07', num: 7,
  title: L('Chiziqli tenglamalar nazariyasi. Vronskian', 'Теория линейных уравнений. Вронскиан', 'Theory of linear equations. The Wronskian'),
  syllabus: { lecture: 'M7', seminar: 'S7', outcomes: ['TN1', 'TN3'], independent: [6] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L(R`Chiziqli differensial operator $L[y]$ ni yoza olasiz va superpozitsiya prinsipini qo‘llay olasiz.`, R`Записывать линейный дифференциальный оператор $L[y]$ и применять принцип суперпозиции.`, R`Write the linear differential operator $L[y]$ and apply the superposition principle.`),
    L('Chiziqli tenglama yechimi mavjud bo‘lgan oraliqni koeffitsiyentlarga qarab aniqlay olasiz.', 'Определять по коэффициентам интервал, на котором существует решение линейного уравнения.', 'Determine from the coefficients the interval on which a solution of a linear equation exists.'),
    L('Funksiyalarning chiziqli bog‘liqligini ta’rif va Vronskian yordamida tekshira olasiz.', 'Проверять линейную зависимость функций по определению и с помощью вронскиана.', 'Test functions for linear dependence by the definition and with the Wronskian.'),
    L('Vronskian haqidagi xulosalar qachon to‘g‘ri ekanini (ixtiyoriy funksiyalar va yechimlar uchun) farqlay olasiz.', 'Различать, когда выводы по вронскиану верны (для произвольных функций и для решений).', 'Tell when conclusions from the Wronskian are valid (for arbitrary functions versus for solutions).'),
    L('Fundamental yechimlar sistemasini tuza olasiz va umumiy yechim tuzilishini yoza olasiz.', 'Составлять фундаментальную систему решений и записывать структуру общего решения.', 'Build a fundamental set of solutions and write the structure of the general solution.')
  ],
  prereqKnowledge: [
    L('Determinantlar va chiziqli tenglamalar sistemasi (Kramer qoidasi).', 'Определители и системы линейных уравнений (правило Крамера).', 'Determinants and systems of linear equations (Cramer’s rule).'),
    L('Vektorlarning chiziqli bog‘liqligi (chiziqli algebra).', 'Линейная зависимость векторов (линейная алгебра).', 'Linear dependence of vectors (linear algebra).'),
    L('Yuqori tartibli tenglama uchun Koshi masalasi (6-mavzu).', 'Задача Коши для уравнения высшего порядка (тема 6).', 'The Cauchy problem for a higher-order equation (topic 6).')
  ],
  sources: [
    { id: 'dilmurodov', ref: '§6.1–§6.4', verified: true },
    { id: 'ergashev', ref: '3.1', verified: true },
    { id: 'kohler', ref: '3.2, 3.11', verified: true },
    { id: 'goode', ref: '4.5, 8.1', verified: true },
    { id: 'filippov', ref: '§12', verified: false },
    { id: 'boyce', ref: '§3.2, §4.1', verified: false }
  ],
  labs: ['L05'],
  lessons: [
    {
      id: 't07.1',
      title: L('Chiziqli operator va superpozitsiya', 'Линейный оператор и суперпозиция', 'The linear operator and superposition'),
      blocks: [
        { type: 'intro', title: L('Ikki signalning yig‘indisi', 'Сумма двух сигналов', 'The sum of two signals'),
          body: L(R`Tashqi manbasiz zanjirda (yoki prujinada) zaryadning og‘ishi $y''-y=0$ kabi tenglamani qanoatlantirsin. $y_1=e^{x}$ va $y_2=e^{-x}$ — yechimlar: $y_1''-y_1=e^x-e^x=0$, $y_2''-y_2=e^{-x}-e^{-x}=0$.

Endi $y=3e^{x}-2e^{-x}$ ni tekshiring: $y''=3e^x-2e^{-x}=y$, demak u ham yechim. Bu tasodif emas: **chiziqli bir jinsli** tenglamada yechimlarning har qanday chiziqli kombinatsiyasi yana yechim bo‘ladi. Bu mavzuda shu xossaning nazariyasini quramiz.`,
          R`Пусть отклонение заряда в цепи без внешнего источника (или пружины) удовлетворяет уравнению вида $y''-y=0$. $y_1=e^{x}$ и $y_2=e^{-x}$ — решения: $y_1''-y_1=e^x-e^x=0$, $y_2''-y_2=e^{-x}-e^{-x}=0$.

Проверьте теперь $y=3e^{x}-2e^{-x}$: $y''=3e^x-2e^{-x}=y$, значит, это тоже решение. Это не случайность: у **линейного однородного** уравнения любая линейная комбинация решений снова решение. В этой теме мы строим теорию этого свойства.`,
          R`Suppose the deviation of a charge in a circuit without an external source (or of a spring) satisfies an equation like $y''-y=0$. $y_1=e^{x}$ and $y_2=e^{-x}$ are solutions: $y_1''-y_1=e^x-e^x=0$, $y_2''-y_2=e^{-x}-e^{-x}=0$.

Now check $y=3e^{x}-2e^{-x}$: $y''=3e^x-2e^{-x}=y$, so it is a solution too. This is no accident: for a **linear homogeneous** equation every linear combination of solutions is again a solution. In this topic we build the theory behind this property.`) },
        { type: 'def', title: L('Chiziqli tenglama va chiziqli operator', 'Линейное уравнение и линейный оператор', 'Linear equation and linear operator'),
          body: L(R`$n$-tartibli **chiziqli** tenglama (normal ko‘rinishda):
$$L[y]\equiv y^{(n)}+p_1(x)\,y^{(n-1)}+\dots+p_{n-1}(x)\,y'+p_n(x)\,y=f(x).$$
$f\equiv0$ bo‘lsa — **bir jinsli**, aks holda **bir jinsli bo‘lmagan** chiziqli tenglama. $L$ operator **chiziqli**:
$$L[C_1y_1+C_2y_2]=C_1L[y_1]+C_2L[y_2].$$
Agar tenglama $a_0(x)y^{(n)}+\dots=g(x)$ ko‘rinishida berilsa, avval $a_0(x)$ ga bo‘lib, normal ko‘rinishga keltiramiz; $a_0(x)=0$ bo‘lgan nuqtalar **maxsus nuqtalar**.`,
          R`**Линейное** уравнение $n$-го порядка (в нормальном виде):
$$L[y]\equiv y^{(n)}+p_1(x)\,y^{(n-1)}+\dots+p_{n-1}(x)\,y'+p_n(x)\,y=f(x).$$
При $f\equiv0$ оно **однородное**, иначе — **неоднородное** линейное уравнение. Оператор $L$ **линеен**:
$$L[C_1y_1+C_2y_2]=C_1L[y_1]+C_2L[y_2].$$
Если уравнение дано в виде $a_0(x)y^{(n)}+\dots=g(x)$, сначала делим на $a_0(x)$ и приводим к нормальному виду; точки, где $a_0(x)=0$, — **особые точки**.`,
          R`A **linear** equation of order $n$ (in normal form) is
$$L[y]\equiv y^{(n)}+p_1(x)\,y^{(n-1)}+\dots+p_{n-1}(x)\,y'+p_n(x)\,y=f(x).$$
If $f\equiv0$ it is **homogeneous**, otherwise **nonhomogeneous**. The operator $L$ is **linear**:
$$L[C_1y_1+C_2y_2]=C_1L[y_1]+C_2L[y_2].$$
If the equation is given as $a_0(x)y^{(n)}+\dots=g(x)$, first divide by $a_0(x)$ to reach normal form; points where $a_0(x)=0$ are **singular points**.`) },
        { type: 'warn', body: L(R`Yana “bir jinsli” so‘zi: bu yerda u **o‘ng tomoni nol** degani ($L[y]=0$). Bu 3-mavzudagi $y'=f(y/x)$ ma’nosidan butunlay boshqa.`, R`Снова слово «однородное»: здесь оно означает **нулевую правую часть** ($L[y]=0$). Это совсем другой смысл, чем $y'=f(y/x)$ из темы 3.`, R`The word “homogeneous” again: here it means **zero right-hand side** ($L[y]=0$). This is a completely different meaning from $y'=f(y/x)$ in topic 3.`) },
        { type: 'thm', title: L('Chiziqli tenglama uchun mavjudlik va yagonalik', 'Существование и единственность для линейного уравнения', 'Existence and uniqueness for a linear equation'),
          conds: L(R`1. $p_1(x),\dots,p_n(x)$ va $f(x)$ $I$ oraliqda uzluksiz;
2. $x_0\in I$, $y_0,y_0',\dots,y_0^{(n-1)}$ — ixtiyoriy sonlar.`, R`1. $p_1(x),\dots,p_n(x)$ и $f(x)$ непрерывны на интервале $I$;
2. $x_0\in I$, $y_0,y_0',\dots,y_0^{(n-1)}$ — любые числа.`, R`1. $p_1(x),\dots,p_n(x)$ and $f(x)$ are continuous on an interval $I$;
2. $x_0\in I$ and $y_0,y_0',\dots,y_0^{(n-1)}$ are arbitrary numbers.`),
          body: L(R`U holda $L[y]=f$, $y^{(k)}(x_0)=y_0^{(k)}$ ($k=0,\dots,n-1$) Koshi masalasining yechimi **butun $I$ oraliqda** mavjud va yagona.

Chiziqli bo‘lmagan tenglamadan farqi: yechim koeffitsiyentlar uzluksiz bo‘lgan **butun** oraliqda yashaydi, “portlash” faqat koeffitsiyentlarning uzilish nuqtalarida bo‘lishi mumkin.`, R`Тогда решение задачи Коши $L[y]=f$, $y^{(k)}(x_0)=y_0^{(k)}$ ($k=0,\dots,n-1$) существует и единственно **на всём интервале $I$**.

Отличие от нелинейного случая: решение живёт на **всём** интервале непрерывности коэффициентов; «взрыв» возможен лишь в точках разрыва коэффициентов.`, R`Then the Cauchy problem $L[y]=f$, $y^{(k)}(x_0)=y_0^{(k)}$ ($k=0,\dots,n-1$) has a unique solution **on the whole interval $I$**.

Unlike the nonlinear case, the solution lives on the **whole** interval where the coefficients are continuous; blow-up can happen only at discontinuities of the coefficients.`) },
        { type: 'example', title: L('Mavjudlik oralig‘i', 'Интервал существования', 'Interval of existence'),
          body: L(R`$(x^2-4)\,y''+x\,y'+(\ln x)\,y=0$, $y(1)=0$, $y'(1)=1$ masalaning yechimi kafolatlangan eng katta oraliqni toping.`, R`Найдите наибольший интервал, на котором гарантировано решение задачи $(x^2-4)\,y''+x\,y'+(\ln x)\,y=0$, $y(1)=0$, $y'(1)=1$.`, R`Find the largest interval on which the solution of $(x^2-4)\,y''+x\,y'+(\ln x)\,y=0$, $y(1)=0$, $y'(1)=1$ is guaranteed.`),
          steps: [
            L(R`Normal ko‘rinish: $y''+\dfrac{x}{x^2-4}\,y'+\dfrac{\ln x}{x^2-4}\,y=0$.`, R`Нормальный вид: $y''+\dfrac{x}{x^2-4}\,y'+\dfrac{\ln x}{x^2-4}\,y=0$.`, R`Normal form: $y''+\dfrac{x}{x^2-4}\,y'+\dfrac{\ln x}{x^2-4}\,y=0$.`),
            L(R`Koeffitsiyentlar uzilishi: $x=\pm2$ (maxraj nol) va $x\le0$ ($\ln x$ aniqlanmagan). Uzluksizlik oraliqlari: $(0,2)$ va $(2,\infty)$.`, R`Разрывы коэффициентов: $x=\pm2$ (знаменатель равен нулю) и $x\le0$ ($\ln x$ не определён). Интервалы непрерывности: $(0,2)$ и $(2,\infty)$.`, R`The coefficients break down at $x=\pm2$ (zero denominator) and for $x\le0$ ($\ln x$ undefined). Intervals of continuity: $(0,2)$ and $(2,\infty)$.`),
            L(R`$x_0=1$ ni o‘z ichiga olgani: $(0,2)$. Teorema bo‘yicha yechim butun $(0,2)$ da mavjud va yagona.`, R`Содержащий $x_0=1$: $(0,2)$. По теореме решение существует и единственно на всём $(0,2)$.`, R`The one containing $x_0=1$ is $(0,2)$. By the theorem the solution exists and is unique on all of $(0,2)$.`)
          ],
          check: L(R`$p(x)=\frac{x}{x^2-4}$, $q(x)=\frac{\ln x}{x^2-4}$: $x=1$ da $p=-\frac13$, $q=0$ — chekli; $x\to2$ da $p\to\infty$ ✓.`, R`$p(x)=\frac{x}{x^2-4}$, $q(x)=\frac{\ln x}{x^2-4}$: при $x=1$ $p=-\frac13$, $q=0$ — конечны; при $x\to2$ $p\to\infty$ ✓.`, R`$p(x)=\frac{x}{x^2-4}$, $q(x)=\frac{\ln x}{x^2-4}$: at $x=1$, $p=-\frac13$ and $q=0$ are finite; as $x\to2$, $p\to\infty$ ✓.`) },
        { type: 'thm', title: L('Superpozitsiya prinsipi', 'Принцип суперпозиции', 'The superposition principle'),
          conds: L(R`$L$ — chiziqli operator; $L[y_1]=f_1$, $L[y_2]=f_2$ $I$ da; $C_1,C_2$ — o‘zgarmaslar.`, R`$L$ — линейный оператор; $L[y_1]=f_1$, $L[y_2]=f_2$ на $I$; $C_1,C_2$ — постоянные.`, R`$L$ is a linear operator; $L[y_1]=f_1$, $L[y_2]=f_2$ on $I$; $C_1,C_2$ are constants.`),
          body: L(R`$L[C_1y_1+C_2y_2]=C_1f_1+C_2f_2$. Xususan:
- bir jinsli tenglama yechimlarining chiziqli kombinatsiyasi yana yechim;
- bir jinsli bo‘lmagan tenglamaning ikki yechimi ayirmasi bir jinsli tenglamaning yechimi;
- o‘ng tomon $f_1+f_2$ bo‘lsa, xususiy yechimni har bir qo‘shiluvchi uchun alohida topib qo‘shish mumkin.`,
          R`$L[C_1y_1+C_2y_2]=C_1f_1+C_2f_2$. В частности:
- линейная комбинация решений однородного уравнения — снова решение;
- разность двух решений неоднородного уравнения — решение однородного;
- если правая часть $f_1+f_2$, частное решение можно искать для каждого слагаемого отдельно и сложить.`,
          R`$L[C_1y_1+C_2y_2]=C_1f_1+C_2f_2$. In particular:
- a linear combination of solutions of the homogeneous equation is again a solution;
- the difference of two solutions of the nonhomogeneous equation solves the homogeneous one;
- if the right side is $f_1+f_2$, particular solutions can be found for each term separately and added.`) },
        { type: 'example', title: L('O‘zgaruvchan koeffitsiyentli tenglamada superpozitsiya', 'Суперпозиция в уравнении с переменными коэффициентами', 'Superposition with variable coefficients'),
          body: L(R`$x^2y''-2y=0$ ($x>0$) uchun $y_1=x^2$, $y_2=\dfrac1x$ yechim ekanini ko‘rsating va $y(1)=1$, $y'(1)=5$ yechimni toping.`, R`Покажите, что $y_1=x^2$, $y_2=\dfrac1x$ — решения $x^2y''-2y=0$ ($x>0$), и найдите решение с $y(1)=1$, $y'(1)=5$.`, R`Show that $y_1=x^2$ and $y_2=\dfrac1x$ solve $x^2y''-2y=0$ ($x>0$) and find the solution with $y(1)=1$, $y'(1)=5$.`),
          steps: [
            L(R`$y_1''=2$: $x^2\cdot2-2x^2=0$ ✓. $y_2''=\dfrac{2}{x^3}$: $x^2\cdot\dfrac2{x^3}-\dfrac2x=0$ ✓.`, R`$y_1''=2$: $x^2\cdot2-2x^2=0$ ✓. $y_2''=\dfrac{2}{x^3}$: $x^2\cdot\dfrac2{x^3}-\dfrac2x=0$ ✓.`, R`$y_1''=2$: $x^2\cdot2-2x^2=0$ ✓. $y_2''=\dfrac{2}{x^3}$: $x^2\cdot\dfrac2{x^3}-\dfrac2x=0$ ✓.`),
            L(R`Superpozitsiya: $y=C_1x^2+\dfrac{C_2}{x}$ ham yechim. $y'=2C_1x-\dfrac{C_2}{x^2}$.`, R`Суперпозиция: $y=C_1x^2+\dfrac{C_2}{x}$ тоже решение. $y'=2C_1x-\dfrac{C_2}{x^2}$.`, R`Superposition: $y=C_1x^2+\dfrac{C_2}{x}$ is a solution as well. $y'=2C_1x-\dfrac{C_2}{x^2}$.`),
            L(R`Shartlar: $C_1+C_2=1$, $2C_1-C_2=5$. Qo‘shsak: $3C_1=6$, $C_1=2$, $C_2=-1$.`, R`Условия: $C_1+C_2=1$, $2C_1-C_2=5$. Складывая: $3C_1=6$, $C_1=2$, $C_2=-1$.`, R`Conditions: $C_1+C_2=1$, $2C_1-C_2=5$. Adding: $3C_1=6$, so $C_1=2$, $C_2=-1$.`),
            L(R`Javob: $y=2x^2-\dfrac1x$, $x>0$. Sistemaning determinanti $\begin{vmatrix}1&1\\2&-1\end{vmatrix}=-3\ne0$ — bu keyingi darsdagi Vronskianning $x=1$ dagi qiymati.`, R`Ответ: $y=2x^2-\dfrac1x$, $x>0$. Определитель системы $\begin{vmatrix}1&1\\2&-1\end{vmatrix}=-3\ne0$ — это значение вронскиана (следующий урок) при $x=1$.`, R`Answer: $y=2x^2-\dfrac1x$, $x>0$. The determinant of the system, $\begin{vmatrix}1&1\\2&-1\end{vmatrix}=-3\ne0$, is the value at $x=1$ of the Wronskian (next lesson).`)
          ],
          check: L(R`$y=2x^2-\frac1x$: $y''=4-\frac2{x^3}$, $x^2y''-2y=4x^2-\frac2x-4x^2+\frac2x=0$ ✓; $y(1)=1$, $y'(1)=4+1=5$ ✓.`, R`$y=2x^2-\frac1x$: $y''=4-\frac2{x^3}$, $x^2y''-2y=4x^2-\frac2x-4x^2+\frac2x=0$ ✓; $y(1)=1$, $y'(1)=4+1=5$ ✓.`, R`$y=2x^2-\frac1x$: $y''=4-\frac2{x^3}$, $x^2y''-2y=4x^2-\frac2x-4x^2+\frac2x=0$ ✓; $y(1)=1$, $y'(1)=4+1=5$ ✓.`) },
        { type: 'warn', body: L(R`Superpozitsiya faqat **chiziqli bir jinsli** tenglamalar uchun. $y'=y^2$ uchun $y=\dfrac1{1-x}$ yechim, lekin $y=\dfrac2{1-x}$ yechim emas: $y'=\dfrac2{(1-x)^2}\ne\dfrac4{(1-x)^2}=y^2$. Bir jinsli bo‘lmagan $L[y]=f$ uchun ham ikki yechim yig‘indisi yechim emas (o‘ng tomon $2f$ bo‘lib qoladi).`, R`Суперпозиция верна только для **линейных однородных** уравнений. Для $y'=y^2$ функция $y=\dfrac1{1-x}$ — решение, а $y=\dfrac2{1-x}$ — нет: $y'=\dfrac2{(1-x)^2}\ne\dfrac4{(1-x)^2}=y^2$. Для неоднородного $L[y]=f$ сумма двух решений тоже не решение (правая часть становится $2f$).`, R`Superposition holds only for **linear homogeneous** equations. For $y'=y^2$, $y=\dfrac1{1-x}$ is a solution but $y=\dfrac2{1-x}$ is not: $y'=\dfrac2{(1-x)^2}\ne\dfrac4{(1-x)^2}=y^2$. For a nonhomogeneous $L[y]=f$ the sum of two solutions is not a solution either (the right side becomes $2f$).`) }
      ]
    },
    {
      id: 't07.2',
      title: L('Chiziqli bog‘liqlik va Vronskian', 'Линейная зависимость и вронскиан', 'Linear dependence and the Wronskian'),
      blocks: [
        { type: 'def', title: L('Chiziqli bog‘liq va chiziqli erkli funksiyalar', 'Линейно зависимые и линейно независимые функции', 'Linearly dependent and independent functions'),
          body: L(R`$y_1,\dots,y_n$ funksiyalar $I$ oraliqda **chiziqli bog‘liq** deyiladi, agar hammasi nol bo‘lmagan $\alpha_1,\dots,\alpha_n$ sonlar topilib,
$$\alpha_1y_1(x)+\dots+\alpha_ny_n(x)=0\quad\text{barcha }x\in I\text{ uchun}.$$
Aks holda (ayniyat faqat $\alpha_1=\dots=\alpha_n=0$ da bajarilsa) ular **chiziqli erkli**. Ikki funksiya chiziqli bog‘liq $\iff$ biri ikkinchisining o‘zgarmas karralisi. Muhim: ta’rif **oraliqqa** bog‘liq va tenglik **barcha** $x\in I$ da bajarilishi kerak.`,
          R`Функции $y_1,\dots,y_n$ называются **линейно зависимыми** на интервале $I$, если существуют числа $\alpha_1,\dots,\alpha_n$, не все равные нулю, такие что
$$\alpha_1y_1(x)+\dots+\alpha_ny_n(x)=0\quad\text{для всех }x\in I.$$
Иначе (тождество выполнено только при $\alpha_1=\dots=\alpha_n=0$) они **линейно независимы**. Две функции линейно зависимы $\iff$ одна равна другой, умноженной на постоянную. Важно: определение зависит от **интервала**, и равенство должно выполняться при **всех** $x\in I$.`,
          R`Functions $y_1,\dots,y_n$ are **linearly dependent** on an interval $I$ if there are numbers $\alpha_1,\dots,\alpha_n$, not all zero, such that
$$\alpha_1y_1(x)+\dots+\alpha_ny_n(x)=0\quad\text{for all }x\in I.$$
Otherwise (the identity holds only for $\alpha_1=\dots=\alpha_n=0$) they are **linearly independent**. Two functions are dependent $\iff$ one is a constant multiple of the other. Note: the definition depends on the **interval**, and the identity must hold for **every** $x\in I$.`) },
        { type: 'def', title: L('Vronskian', 'Вронскиан', 'The Wronskian'),
          body: L(R`$n-1$ marta differensiallanuvchi $y_1,\dots,y_n$ funksiyalarning **Vronskiani**:
$$W[y_1,\dots,y_n](x)=\begin{vmatrix}y_1&y_2&\cdots&y_n\\ y_1'&y_2'&\cdots&y_n'\\ \vdots&\vdots&&\vdots\\ y_1^{(n-1)}&y_2^{(n-1)}&\cdots&y_n^{(n-1)}\end{vmatrix}.$$
Ikki funksiya uchun $W=y_1y_2'-y_1'y_2$. Vronskian — $x$ ning **funksiyasi**, son emas.`,
          R`**Вронскиан** функций $y_1,\dots,y_n$, дифференцируемых $n-1$ раз:
$$W[y_1,\dots,y_n](x)=\begin{vmatrix}y_1&y_2&\cdots&y_n\\ y_1'&y_2'&\cdots&y_n'\\ \vdots&\vdots&&\vdots\\ y_1^{(n-1)}&y_2^{(n-1)}&\cdots&y_n^{(n-1)}\end{vmatrix}.$$
Для двух функций $W=y_1y_2'-y_1'y_2$. Вронскиан — **функция** от $x$, а не число.`,
          R`The **Wronskian** of $n-1$ times differentiable functions $y_1,\dots,y_n$ is
$$W[y_1,\dots,y_n](x)=\begin{vmatrix}y_1&y_2&\cdots&y_n\\ y_1'&y_2'&\cdots&y_n'\\ \vdots&\vdots&&\vdots\\ y_1^{(n-1)}&y_2^{(n-1)}&\cdots&y_n^{(n-1)}\end{vmatrix}.$$
For two functions $W=y_1y_2'-y_1'y_2$. The Wronskian is a **function** of $x$, not a number.`) },
        { type: 'thm', title: L('Bog‘liqlikdan Vronskianning nolga tengligi kelib chiqadi', 'Из зависимости следует обращение вронскиана в нуль', 'Dependence implies a vanishing Wronskian'),
          conds: L(R`$y_1,\dots,y_n$ $I$ da $n-1$ marta differensiallanuvchi va $I$ da **chiziqli bog‘liq** (ixtiyoriy funksiyalar, tenglama shart emas).`, R`$y_1,\dots,y_n$ дифференцируемы $n-1$ раз на $I$ и **линейно зависимы** на $I$ (произвольные функции, уравнение не требуется).`, R`$y_1,\dots,y_n$ are $n-1$ times differentiable on $I$ and **linearly dependent** on $I$ (arbitrary functions; no equation needed).`),
          body: L(R`U holda $W(x)\equiv0$ $I$ da. Teskari (kontrapozitiv) shakli: agar **biror** $x_0\in I$ da $W(x_0)\ne0$ bo‘lsa, funksiyalar $I$ da chiziqli erkli.`, R`Тогда $W(x)\equiv0$ на $I$. Контрапозиция: если $W(x_0)\ne0$ **хотя бы в одной** точке $x_0\in I$, функции линейно независимы на $I$.`, R`Then $W(x)\equiv0$ on $I$. Contrapositive: if $W(x_0)\ne0$ at **some** $x_0\in I$, the functions are linearly independent on $I$.`) },
        { type: 'proof', body: L(R`$\sum\alpha_ky_k\equiv0$ ayniyatni $n-1$ marta differensiallaymiz: har bir $x$ da $\alpha=(\alpha_1,\dots,\alpha_n)\ne0$ vektor determinanti $W(x)$ bo‘lgan bir jinsli chiziqli sistemani qanoatlantiradi. Nolmas yechim bo‘lgani uchun $W(x)=0$ (Dilmuradov, §6.2).`, R`Дифференцируем тождество $\sum\alpha_ky_k\equiv0$ $n-1$ раз: при каждом $x$ ненулевой вектор $\alpha=(\alpha_1,\dots,\alpha_n)$ удовлетворяет однородной линейной системе с определителем $W(x)$. Раз есть ненулевое решение, $W(x)=0$ (Дилмурадов, §6.2).`, R`Differentiate $\sum\alpha_ky_k\equiv0$ $n-1$ times: at each $x$ the nonzero vector $\alpha=(\alpha_1,\dots,\alpha_n)$ solves a homogeneous linear system with determinant $W(x)$. A nonzero solution forces $W(x)=0$ (Dilmuradov, §6.2).`) },
        { type: 'example', title: L('Eksponentalarning Vronskiani', 'Вронскиан экспонент', 'Wronskian of exponentials'),
          body: L(R`$e^{x},\ e^{2x},\ e^{3x}$ funksiyalar $\mathbb R$ da chiziqli erkli ekanini ko‘rsating.`, R`Покажите, что $e^{x},\ e^{2x},\ e^{3x}$ линейно независимы на $\mathbb R$.`, R`Show that $e^{x},\ e^{2x},\ e^{3x}$ are linearly independent on $\mathbb R$.`),
          steps: [
            L(R`$W=\begin{vmatrix}e^x&e^{2x}&e^{3x}\\ e^x&2e^{2x}&3e^{3x}\\ e^x&4e^{2x}&9e^{3x}\end{vmatrix}$.`, R`$W=\begin{vmatrix}e^x&e^{2x}&e^{3x}\\ e^x&2e^{2x}&3e^{3x}\\ e^x&4e^{2x}&9e^{3x}\end{vmatrix}$.`, R`$W=\begin{vmatrix}e^x&e^{2x}&e^{3x}\\ e^x&2e^{2x}&3e^{3x}\\ e^x&4e^{2x}&9e^{3x}\end{vmatrix}$.`),
            L(R`Ustunlardan $e^x$, $e^{2x}$, $e^{3x}$ ni chiqaramiz: $W=e^{6x}\begin{vmatrix}1&1&1\\1&2&3\\1&4&9\end{vmatrix}$ — Vandermond determinanti.`, R`Выносим $e^x$, $e^{2x}$, $e^{3x}$ из столбцов: $W=e^{6x}\begin{vmatrix}1&1&1\\1&2&3\\1&4&9\end{vmatrix}$ — определитель Вандермонда.`, R`Factor $e^x$, $e^{2x}$, $e^{3x}$ out of the columns: $W=e^{6x}\begin{vmatrix}1&1&1\\1&2&3\\1&4&9\end{vmatrix}$, a Vandermonde determinant.`),
            L(R`$(2-1)(3-1)(3-2)=2$, demak $W=2e^{6x}\ne0$ — funksiyalar chiziqli erkli.`, R`$(2-1)(3-1)(3-2)=2$, значит $W=2e^{6x}\ne0$ — функции линейно независимы.`, R`$(2-1)(3-1)(3-2)=2$, so $W=2e^{6x}\ne0$ and the functions are linearly independent.`)
          ],
          check: L(R`$\det=2e^{6x}$ ✓. Umuman, har xil $\lambda_k$ uchun $e^{\lambda_1x},\dots,e^{\lambda_nx}$ chiziqli erkli.`, R`$\det=2e^{6x}$ ✓. Вообще, при различных $\lambda_k$ функции $e^{\lambda_1x},\dots,e^{\lambda_nx}$ линейно независимы.`, R`$\det=2e^{6x}$ ✓. In general, $e^{\lambda_1x},\dots,e^{\lambda_nx}$ are independent for distinct $\lambda_k$.`) },
        { type: 'example', title: L('Bog‘liq funksiyalar', 'Зависимые функции', 'Dependent functions'),
          body: L(R`$1,\ \sin^2x,\ \cos^2x$ funksiyalarni tekshiring.`, R`Исследуйте функции $1,\ \sin^2x,\ \cos^2x$.`, R`Examine the functions $1,\ \sin^2x,\ \cos^2x$.`),
          steps: [
            L(R`Ta’rif bo‘yicha: $1\cdot1-1\cdot\sin^2x-1\cdot\cos^2x\equiv0$, koeffitsiyentlar $(1,-1,-1)\ne0$. Demak, ular $\mathbb R$ da chiziqli **bog‘liq**.`, R`По определению: $1\cdot1-1\cdot\sin^2x-1\cdot\cos^2x\equiv0$, коэффициенты $(1,-1,-1)\ne0$. Значит, они линейно **зависимы** на $\mathbb R$.`, R`By definition: $1\cdot1-1\cdot\sin^2x-1\cdot\cos^2x\equiv0$ with coefficients $(1,-1,-1)\ne0$, so they are linearly **dependent** on $\mathbb R$.`),
            L(R`Teoremaga ko‘ra $W\equiv0$ bo‘lishi shart. Haqiqatan, birinchi ustun $(1,0,0)^T$, qolgan ikki ustunning ikkinchi va uchinchi qatorlari $(\sin2x,\ 2\cos2x)$ va $(-\sin2x,\ -2\cos2x)$ — proporsional, shuning uchun $W\equiv0$ ✓.`, R`По теореме обязательно $W\equiv0$. Действительно, первый столбец $(1,0,0)^T$, а вторые и третьи строки двух других столбцов — $(\sin2x,\ 2\cos2x)$ и $(-\sin2x,\ -2\cos2x)$ — пропорциональны, поэтому $W\equiv0$ ✓.`, R`The theorem says $W\equiv0$ must hold. Indeed the first column is $(1,0,0)^T$, and rows two and three of the other columns, $(\sin2x,\ 2\cos2x)$ and $(-\sin2x,\ -2\cos2x)$, are proportional, so $W\equiv0$ ✓.`)
          ],
          check: L(R`$W[1,\sin^2x,\cos^2x]=0$ ✓.`, R`$W[1,\sin^2x,\cos^2x]=0$ ✓.`, R`$W[1,\sin^2x,\cos^2x]=0$ ✓.`) },
        { type: 'example', title: L(R`$W\equiv0$, lekin funksiyalar erkli: $x^2$ va $x|x|$`, R`$W\equiv0$, но функции независимы: $x^2$ и $x|x|$`, R`$W\equiv0$ yet independent: $x^2$ and $x|x|$`),
          body: L(R`$y_1=x^2$, $y_2=x|x|$ ni $(-1,1)$ oraliqda tekshiring.`, R`Исследуйте $y_1=x^2$, $y_2=x|x|$ на интервале $(-1,1)$.`, R`Examine $y_1=x^2$, $y_2=x|x|$ on $(-1,1)$.`),
          steps: [
            L(R`$y_2=x|x|$ differensiallanuvchi: $y_2'=2|x|$ (shu jumladan $y_2'(0)=0$).`, R`$y_2=x|x|$ дифференцируема: $y_2'=2|x|$ (в том числе $y_2'(0)=0$).`, R`$y_2=x|x|$ is differentiable: $y_2'=2|x|$ (including $y_2'(0)=0$).`),
            L(R`$x\ge0$: $y_2=x^2$, $W=x^2\cdot2x-2x\cdot x^2=0$. $x<0$: $y_2=-x^2$, $W=x^2(-2x)-2x(-x^2)=0$. Demak $W\equiv0$ $(-1,1)$ da.`, R`$x\ge0$: $y_2=x^2$, $W=x^2\cdot2x-2x\cdot x^2=0$. $x<0$: $y_2=-x^2$, $W=x^2(-2x)-2x(-x^2)=0$. Значит $W\equiv0$ на $(-1,1)$.`, R`$x\ge0$: $y_2=x^2$, $W=x^2\cdot2x-2x\cdot x^2=0$. $x<0$: $y_2=-x^2$, $W=x^2(-2x)-2x(-x^2)=0$. So $W\equiv0$ on $(-1,1)$.`),
            L(R`Lekin $\alpha_1x^2+\alpha_2x|x|\equiv0$ dan $x=\frac12$: $\alpha_1+\alpha_2=0$, $x=-\frac12$: $\alpha_1-\alpha_2=0$ $\Rightarrow\alpha_1=\alpha_2=0$. Funksiyalar **chiziqli erkli**!`, R`Но из $\alpha_1x^2+\alpha_2x|x|\equiv0$ при $x=\frac12$: $\alpha_1+\alpha_2=0$, при $x=-\frac12$: $\alpha_1-\alpha_2=0$ $\Rightarrow\alpha_1=\alpha_2=0$. Функции **линейно независимы**!`, R`But $\alpha_1x^2+\alpha_2x|x|\equiv0$ at $x=\frac12$ gives $\alpha_1+\alpha_2=0$ and at $x=-\frac12$ gives $\alpha_1-\alpha_2=0$, so $\alpha_1=\alpha_2=0$. The functions are **linearly independent**!`),
            L(R`Xulosa: ixtiyoriy funksiyalar uchun $W\equiv0$ **bog‘liqlikni anglatmaydi**. Har bir yarim oraliqda ular bog‘liq, lekin butun $(-1,1)$ da bir xil koeffitsiyentlar yo‘q.`, R`Вывод: для произвольных функций из $W\equiv0$ **зависимость не следует**. На каждой половине интервала они зависимы, но общих коэффициентов на всём $(-1,1)$ нет.`, R`Conclusion: for arbitrary functions, $W\equiv0$ **does not imply dependence**. On each half of the interval they are dependent, but no single pair of coefficients works on all of $(-1,1)$.`)
          ],
          check: L(R`$x>0$ va $x<0$ da $W=0$ ✓; $\alpha_1+\alpha_2=0$, $\alpha_1-\alpha_2=0$ faqat nol yechimga ega ✓.`, R`при $x>0$ и $x<0$ $W=0$ ✓; система $\alpha_1+\alpha_2=0$, $\alpha_1-\alpha_2=0$ имеет только нулевое решение ✓.`, R`$W=0$ for $x>0$ and for $x<0$ ✓; $\alpha_1+\alpha_2=0$, $\alpha_1-\alpha_2=0$ has only the zero solution ✓.`) },
        { type: 'warn', title: L('Vronskian xulosalari qachon to‘g‘ri?', 'Когда выводы по вронскиану верны?', 'When are Wronskian conclusions valid?'),
          body: L(R`- **Har qanday** funksiyalar uchun: $W(x_0)\ne0$ biror nuqtada $\Rightarrow$ chiziqli erkli. Teskarisi noto‘g‘ri: $W\equiv0$ dan bog‘liqlik kelib chiqmaydi ($x^2$, $x|x|$).
- **Bitta chiziqli bir jinsli tenglamaning yechimlari** uchun (koeffitsiyentlar $I$ da uzluksiz): $W\equiv0\iff$ bog‘liq, $W\ne0\iff$ erkli (3-dars).`,
          R`- Для **любых** функций: $W(x_0)\ne0$ в какой-то точке $\Rightarrow$ линейная независимость. Обратное неверно: из $W\equiv0$ зависимость не следует ($x^2$, $x|x|$).
- Для **решений одного линейного однородного уравнения** (коэффициенты непрерывны на $I$): $W\equiv0\iff$ зависимы, $W\ne0\iff$ независимы (урок 3).`,
          R`- For **any** functions: $W(x_0)\ne0$ at some point $\Rightarrow$ linear independence. The converse is false: $W\equiv0$ does not imply dependence ($x^2$, $x|x|$).
- For **solutions of one linear homogeneous equation** (coefficients continuous on $I$): $W\equiv0\iff$ dependent, $W\ne0\iff$ independent (lesson 3).`) }
      ]
    },
    {
      id: 't07.3',
      title: L('Fundamental sistema va umumiy yechim', 'Фундаментальная система и общее решение', 'Fundamental set and the general solution'),
      blocks: [
        { type: 'thm', title: L('Yechimlar Vronskiani haqida alternativa', 'Альтернатива для вронскиана решений', 'The Wronskian alternative for solutions'),
          conds: L(R`$p_1,\dots,p_n$ $I$ da uzluksiz; $y_1,\dots,y_n$ — **bitta** $L[y]=0$ tenglamaning $I$ dagi yechimlari.`, R`$p_1,\dots,p_n$ непрерывны на $I$; $y_1,\dots,y_n$ — решения **одного** уравнения $L[y]=0$ на $I$.`, R`$p_1,\dots,p_n$ are continuous on $I$; $y_1,\dots,y_n$ are solutions on $I$ of **one** equation $L[y]=0$.`),
          body: L(R`U holda faqat ikki holat bo‘lishi mumkin:
- $W(x)\equiv0$ $I$ da — yechimlar chiziqli **bog‘liq**;
- $W(x)\ne0$ **barcha** $x\in I$ da — yechimlar chiziqli **erkli**.
Ya’ni yechimlar Vronskiani yo hamma joyda nol, yo hech qayerda nol emas.`,
          R`Тогда возможны лишь два случая:
- $W(x)\equiv0$ на $I$ — решения линейно **зависимы**;
- $W(x)\ne0$ при **всех** $x\in I$ — решения линейно **независимы**.
То есть вронскиан решений либо тождественно равен нулю, либо нигде не обращается в нуль.`,
          R`Then only two cases are possible:
- $W(x)\equiv0$ on $I$: the solutions are linearly **dependent**;
- $W(x)\ne0$ for **every** $x\in I$: the solutions are linearly **independent**.
So the Wronskian of solutions either vanishes identically or never vanishes.`) },
        { type: 'proof', body: L(R`Biror $x_0$ da $W(x_0)=0$ bo‘lsin. U holda $\sum\alpha_ky_k^{(j)}(x_0)=0$ ($j=0,\dots,n-1$) sistemaning nolmas yechimi $\alpha$ bor. $y=\sum\alpha_ky_k$ — superpozitsiya bo‘yicha yechim va $x_0$ da barcha boshlang‘ich qiymatlari nol. $y\equiv0$ ham shu Koshi masalasining yechimi, yagonalik teoremasiga ko‘ra $y\equiv0$ $I$ da. Demak, yechimlar bog‘liq va (oldingi teorema) $W\equiv0$ (Dilmuradov, §6.3).`, R`Пусть $W(x_0)=0$ в некоторой точке $x_0$. Тогда система $\sum\alpha_ky_k^{(j)}(x_0)=0$ ($j=0,\dots,n-1$) имеет ненулевое решение $\alpha$. $y=\sum\alpha_ky_k$ — решение (суперпозиция) с нулевыми начальными данными в $x_0$. $y\equiv0$ тоже решение этой задачи Коши, и по теореме единственности $y\equiv0$ на $I$. Значит, решения зависимы и (предыдущая теорема) $W\equiv0$ (Дилмурадов, §6.3).`, R`Suppose $W(x_0)=0$ at some $x_0$. Then $\sum\alpha_ky_k^{(j)}(x_0)=0$ ($j=0,\dots,n-1$) has a nonzero solution $\alpha$. $y=\sum\alpha_ky_k$ is a solution (superposition) with all initial data zero at $x_0$. Since $y\equiv0$ solves the same Cauchy problem, uniqueness gives $y\equiv0$ on $I$. Hence the solutions are dependent and (previous theorem) $W\equiv0$ (Dilmuradov, §6.3).`) },
        { type: 'note', title: L(R`Nega $x^2$ va $x|x|$ ziddiyat emas?`, R`Почему $x^2$ и $x|x|$ — не противоречие?`, R`Why are $x^2$ and $x|x|$ not a contradiction?`),
          body: L(R`Ikkala funksiya ham $x^2y''-2xy'+2y=0$ ni $x\ne0$ da qanoatlantiradi. Lekin normal ko‘rinishda $y''-\dfrac2xy'+\dfrac2{x^2}y=0$ koeffitsiyentlari $x=0$ da uziladi, ya’ni teorema $(-1,1)$ da qo‘llanilmaydi. Bundan tashqari $x|x|$ ning $x=0$ da ikkinchi hosilasi yo‘q. Xuddi shunday, $W[x^2,x^3]=x^4$ faqat $x=0$ da nol — demak $x^2$ va $x^3$ $0$ ni o‘z ichiga olgan oraliqda koeffitsiyentlari uzluksiz bo‘lgan bitta 2-tartibli chiziqli tenglamaning yechimlari bo‘la olmaydi.`, R`Обе функции удовлетворяют $x^2y''-2xy'+2y=0$ при $x\ne0$. Но в нормальном виде $y''-\dfrac2xy'+\dfrac2{x^2}y=0$ коэффициенты разрывны при $x=0$, то есть теорема на $(-1,1)$ неприменима. Кроме того, у $x|x|$ нет второй производной при $x=0$. Аналогично $W[x^2,x^3]=x^4$ обращается в нуль только при $x=0$ — значит, $x^2$ и $x^3$ не могут быть решениями одного линейного уравнения 2-го порядка с непрерывными коэффициентами на интервале, содержащем $0$.`, R`Both functions satisfy $x^2y''-2xy'+2y=0$ for $x\ne0$. But in normal form, $y''-\dfrac2xy'+\dfrac2{x^2}y=0$, the coefficients are discontinuous at $x=0$, so the theorem does not apply on $(-1,1)$. Moreover $x|x|$ has no second derivative at $x=0$. Likewise $W[x^2,x^3]=x^4$ vanishes only at $x=0$, so $x^2$ and $x^3$ cannot both solve one second-order linear equation with continuous coefficients on an interval containing $0$.`) },
        { type: 'def', title: L('Fundamental yechimlar sistemasi', 'Фундаментальная система решений', 'Fundamental set of solutions'),
          body: L(R`$n$-tartibli $L[y]=0$ tenglamaning $I$ dagi $n$ ta **chiziqli erkli** yechimi $y_1,\dots,y_n$ **fundamental yechimlar sistemasi** (FYS) deyiladi. Tekshirish uchun bitta nuqtada $W(x_0)\ne0$ ekanini ko‘rsatish yetarli. FYS har doim mavjud: masalan, $x_0$ da $y_k^{(j)}(x_0)=\delta_{jk}$ boshlang‘ich shartli yechimlar (ularning Vronskiani $x_0$ da $1$).`,
          R`$n$ **линейно независимых** решений $y_1,\dots,y_n$ уравнения $n$-го порядка $L[y]=0$ на $I$ называются **фундаментальной системой решений** (ФСР). Для проверки достаточно показать $W(x_0)\ne0$ в одной точке. ФСР всегда существует: например, решения с начальными условиями $y_k^{(j)}(x_0)=\delta_{jk}$ в точке $x_0$ (их вронскиан в $x_0$ равен $1$).`,
          R`$n$ **linearly independent** solutions $y_1,\dots,y_n$ of the $n$-th order equation $L[y]=0$ on $I$ form a **fundamental set of solutions**. To check it, it suffices to show $W(x_0)\ne0$ at one point. A fundamental set always exists: e.g. the solutions with initial data $y_k^{(j)}(x_0)=\delta_{jk}$ at $x_0$ (their Wronskian at $x_0$ equals $1$).`) },
        { type: 'thm', title: L('Umumiy yechimning tuzilishi', 'Структура общего решения', 'Structure of the general solution'),
          conds: L(R`$p_1,\dots,p_n,f$ $I$ da uzluksiz; $y_1,\dots,y_n$ — $L[y]=0$ ning FYSi; $y_p$ — $L[y]=f$ ning biror xususiy yechimi.`, R`$p_1,\dots,p_n,f$ непрерывны на $I$; $y_1,\dots,y_n$ — ФСР уравнения $L[y]=0$; $y_p$ — какое-либо частное решение $L[y]=f$.`, R`$p_1,\dots,p_n,f$ are continuous on $I$; $y_1,\dots,y_n$ is a fundamental set of $L[y]=0$; $y_p$ is some particular solution of $L[y]=f$.`),
          body: L(R`1. Bir jinsli tenglamaning **har qanday** yechimi $y=C_1y_1+\dots+C_ny_n$ ko‘rinishida yoziladi.
2. Bir jinsli bo‘lmagan tenglamaning har qanday yechimi
$$y=C_1y_1+\dots+C_ny_n+y_p.$$
Bir jinsli tenglama yechimlari $n$ o‘lchamli chiziqli fazo tashkil qiladi.`,
          R`1. **Любое** решение однородного уравнения записывается как $y=C_1y_1+\dots+C_ny_n$.
2. Любое решение неоднородного уравнения имеет вид
$$y=C_1y_1+\dots+C_ny_n+y_p.$$
Решения однородного уравнения образуют $n$-мерное линейное пространство.`,
          R`1. **Every** solution of the homogeneous equation can be written $y=C_1y_1+\dots+C_ny_n$.
2. Every solution of the nonhomogeneous equation has the form
$$y=C_1y_1+\dots+C_ny_n+y_p.$$
The solutions of the homogeneous equation form an $n$-dimensional linear space.`) },
        { type: 'proof', body: L(R`$y$ — ixtiyoriy yechim. $\sum C_ky_k^{(j)}(x_0)=y^{(j)}(x_0)$ sistema determinanti $W(x_0)\ne0$, shuning uchun $C_k$ topiladi. $\sum C_ky_k$ va $y$ bir xil Koshi masalasini yechadi, yagonalik bo‘yicha ustma-ust tushadi. Bir jinsli bo‘lmagan holda $y-y_p$ bir jinsli tenglamaning yechimi (superpozitsiya).`, R`Пусть $y$ — любое решение. Система $\sum C_ky_k^{(j)}(x_0)=y^{(j)}(x_0)$ имеет определитель $W(x_0)\ne0$, поэтому $C_k$ находятся. $\sum C_ky_k$ и $y$ решают одну и ту же задачу Коши и по единственности совпадают. В неоднородном случае $y-y_p$ решает однородное уравнение (суперпозиция).`, R`Let $y$ be any solution. The system $\sum C_ky_k^{(j)}(x_0)=y^{(j)}(x_0)$ has determinant $W(x_0)\ne0$, so the $C_k$ exist. $\sum C_ky_k$ and $y$ solve the same Cauchy problem and coincide by uniqueness. In the nonhomogeneous case $y-y_p$ solves the homogeneous equation (superposition).`) },
        { type: 'example', title: L('Bir jinsli bo‘lmagan tenglamaning umumiy yechimi', 'Общее решение неоднородного уравнения', 'General solution of a nonhomogeneous equation'),
          body: L(R`$y''+y=x$ ning umumiy yechimini yozing, $\cos x$, $\sin x$ bir jinsli tenglamaning yechimlari ekanidan foydalanib.`, R`Запишите общее решение $y''+y=x$, используя то, что $\cos x$, $\sin x$ — решения однородного уравнения.`, R`Write the general solution of $y''+y=x$, using that $\cos x$, $\sin x$ solve the homogeneous equation.`),
          steps: [
            L(R`$W[\cos x,\sin x]=\cos x\cdot\cos x-(-\sin x)\sin x=1\ne0$ — FYS.`, R`$W[\cos x,\sin x]=\cos x\cdot\cos x-(-\sin x)\sin x=1\ne0$ — ФСР.`, R`$W[\cos x,\sin x]=\cos x\cdot\cos x-(-\sin x)\sin x=1\ne0$: a fundamental set.`),
            L(R`Xususiy yechimni tanlab topamiz: $y_p=x$, chunki $y_p''+y_p=0+x=x$ ✓.`, R`Частное решение подбираем: $y_p=x$, так как $y_p''+y_p=0+x=x$ ✓.`, R`Guess a particular solution: $y_p=x$, since $y_p''+y_p=0+x=x$ ✓.`),
            L(R`Tuzilish teoremasi: $y=C_1\cos x+C_2\sin x+x$. (Xususiy yechimni sistematik topish — 9–10-mavzular.)`, R`По теореме о структуре: $y=C_1\cos x+C_2\sin x+x$. (Систематический поиск частного решения — темы 9–10.)`, R`By the structure theorem: $y=C_1\cos x+C_2\sin x+x$. (Systematic ways to find a particular solution: topics 9–10.)`)
          ],
          check: L(R`$y''=-C_1\cos x-C_2\sin x$, $y''+y=x$ ✓.`, R`$y''=-C_1\cos x-C_2\sin x$, $y''+y=x$ ✓.`, R`$y''=-C_1\cos x-C_2\sin x$, $y''+y=x$ ✓.`) },
        { type: 'formula', title: L('Ostrogradskiy–Liuvill formulasi (oldindan ko‘rish)', 'Формула Остроградского–Лиувилля (предварительно)', 'The Abel–Liouville formula (preview)'),
          body: L(R`$y''+p(x)y'+q(x)y=0$ yechimlari uchun $W'=-p(x)\,W$, shuning uchun
$$W(x)=W(x_0)\,\exp\!\left(-\int_{x_0}^{x}p(t)\,dt\right).$$
$n$-tartibda $p$ o‘rniga $y^{(n-1)}$ oldidagi koeffitsiyent $p_1$ olinadi. Bu formuladan alternativa darhol ko‘rinadi: eksponenta hech qachon nol emas. To‘liq isbot va qo‘llanishlar — 10-mavzuda.`,
          R`Для решений $y''+p(x)y'+q(x)y=0$ выполнено $W'=-p(x)\,W$, поэтому
$$W(x)=W(x_0)\,\exp\!\left(-\int_{x_0}^{x}p(t)\,dt\right).$$
Для порядка $n$ вместо $p$ берётся коэффициент $p_1$ при $y^{(n-1)}$. Из формулы сразу видна альтернатива: экспонента нигде не равна нулю. Полное доказательство и применения — в теме 10.`,
          R`For solutions of $y''+p(x)y'+q(x)y=0$ we have $W'=-p(x)\,W$, hence
$$W(x)=W(x_0)\,\exp\!\left(-\int_{x_0}^{x}p(t)\,dt\right).$$
For order $n$, $p$ is replaced by the coefficient $p_1$ of $y^{(n-1)}$. The alternative is visible at once: the exponential never vanishes. Full proof and applications are in topic 10.`) },
        { type: 'example', title: L('Vronskianni yechimlarsiz topish', 'Вронскиан без знания решений', 'The Wronskian without the solutions'),
          body: L(R`$x\,y''+2y'+x\,y=0$ ($x>0$) ning ikki yechimi uchun $W(1)=-1$. $W(x)$ ni toping va $y_1=\dfrac{\sin x}{x}$, $y_2=\dfrac{\cos x}{x}$ bilan solishtiring.`, R`Для двух решений $x\,y''+2y'+x\,y=0$ ($x>0$) известно $W(1)=-1$. Найдите $W(x)$ и сравните с $y_1=\dfrac{\sin x}{x}$, $y_2=\dfrac{\cos x}{x}$.`, R`Two solutions of $x\,y''+2y'+x\,y=0$ ($x>0$) have $W(1)=-1$. Find $W(x)$ and compare with $y_1=\dfrac{\sin x}{x}$, $y_2=\dfrac{\cos x}{x}$.`),
          steps: [
            L(R`Normal ko‘rinish: $y''+\dfrac2x\,y'+y=0$, $p(x)=\dfrac2x$.`, R`Нормальный вид: $y''+\dfrac2x\,y'+y=0$, $p(x)=\dfrac2x$.`, R`Normal form: $y''+\dfrac2x\,y'+y=0$, $p(x)=\dfrac2x$.`),
            L(R`$W(x)=W(1)\exp\!\left(-\int_1^x\frac2t\,dt\right)=-e^{-2\ln x}=-\dfrac1{x^2}$.`, R`$W(x)=W(1)\exp\!\left(-\int_1^x\frac2t\,dt\right)=-e^{-2\ln x}=-\dfrac1{x^2}$.`, R`$W(x)=W(1)\exp\!\left(-\int_1^x\frac2t\,dt\right)=-e^{-2\ln x}=-\dfrac1{x^2}$.`),
            L(R`Bevosita hisob: $W\!\left[\frac{\sin x}{x},\frac{\cos x}{x}\right]=-\dfrac1{x^2}$ — mos keldi. $W$ $x>0$ da hech qayerda nol emas, demak bu FYS.`, R`Прямой подсчёт: $W\!\left[\frac{\sin x}{x},\frac{\cos x}{x}\right]=-\dfrac1{x^2}$ — совпадает. $W$ нигде не равен нулю при $x>0$, значит, это ФСР.`, R`Direct computation: $W\!\left[\frac{\sin x}{x},\frac{\cos x}{x}\right]=-\dfrac1{x^2}$, a match. $W$ never vanishes for $x>0$, so this is a fundamental set.`)
          ],
          check: L(R`$\frac{\sin x}{x}$, $\frac{\cos x}{x}$ tenglamani qanoatlantiradi ✓, $W=-\frac1{x^2}$ ✓, $W(1)=-1$ ✓.`, R`$\frac{\sin x}{x}$, $\frac{\cos x}{x}$ удовлетворяют уравнению ✓, $W=-\frac1{x^2}$ ✓, $W(1)=-1$ ✓.`, R`$\frac{\sin x}{x}$ and $\frac{\cos x}{x}$ satisfy the equation ✓, $W=-\frac1{x^2}$ ✓, $W(1)=-1$ ✓.`) },
        { type: 'lab', lab: 'L05', body: L(R`L05 laboratoriyasida $y''+by'+cy=0$ uchun $y(0)$ va $y'(0)$ ni o‘zgartiring: har qanday boshlang‘ich qiymatlar uchun $C_1$, $C_2$ yagona topiladi. Sababi — fundamental sistemaning Vronskiani $0$ nuqtada nol emas.`, R`В лаборатории L05 меняйте $y(0)$ и $y'(0)$ для $y''+by'+cy=0$: при любых начальных значениях $C_1$, $C_2$ находятся однозначно. Причина — вронскиан фундаментальной системы в точке $0$ не равен нулю.`, R`In lab L05 change $y(0)$ and $y'(0)$ for $y''+by'+cy=0$: for any initial values the constants $C_1$, $C_2$ are found uniquely, because the Wronskian of the fundamental set is nonzero at $0$.`) }
      ]
    }
  ],
  mistakes: [
    L(R`Ixtiyoriy funksiyalar uchun $W\equiv0$ dan chiziqli bog‘liqlik xulosasini chiqarish ($x^2$ va $x|x|$ qarshi misol).`, R`Делать вывод о линейной зависимости произвольных функций из $W\equiv0$ (контрпример $x^2$ и $x|x|$).`, R`Concluding linear dependence of arbitrary functions from $W\equiv0$ (counterexample: $x^2$ and $x|x|$).`),
    L(R`Chiziqli bog‘liqlikni bitta nuqtada tekshirish: tenglik **barcha** $x\in I$ da bajarilishi kerak.`, R`Проверять линейную зависимость в одной точке: равенство должно выполняться при **всех** $x\in I$.`, R`Testing dependence at a single point: the identity must hold for **all** $x\in I$.`),
    L(R`Mavjudlik oralig‘ini tenglamani normal ko‘rinishga keltirmasdan aniqlash (bosh koeffitsiyent nollarini unutish).`, R`Определять интервал существования, не приведя уравнение к нормальному виду (забывая нули старшего коэффициента).`, R`Determining the interval of existence without dividing by the leading coefficient (forgetting its zeros).`),
    L(R`Superpozitsiyani bir jinsli bo‘lmagan yoki chiziqli bo‘lmagan tenglamalarga qo‘llash.`, R`Применять суперпозицию к неоднородным или нелинейным уравнениям.`, R`Applying superposition to nonhomogeneous or nonlinear equations.`),
    L(R`Bir jinsli bo‘lmagan tenglamaning umumiy yechimida $y_p$ ni unutish yoki $y_p$ ga ham ixtiyoriy ko‘paytuvchi qo‘yish.`, R`Забывать $y_p$ в общем решении неоднородного уравнения или умножать $y_p$ на произвольную постоянную.`, R`Forgetting $y_p$ in the general solution of a nonhomogeneous equation, or multiplying $y_p$ by an arbitrary constant.`)
  ],
  exercises: [
    { id: 't07.x1', level: 'easy', type: 'numeric',
      q: L(R`$W[e^{x},e^{-x}]$ ning qiymatini kiriting.`, R`Введите значение $W[e^{x},e^{-x}]$.`, R`Enter the value of $W[e^{x},e^{-x}]$.`),
      check: { kind: 'numeric', value: -2, tol: 1e-9 },
      hint: L(R`$W=y_1y_2'-y_1'y_2$.`, R`$W=y_1y_2'-y_1'y_2$.`, R`$W=y_1y_2'-y_1'y_2$.`),
      solution: L(R`$e^x\cdot(-e^{-x})-e^x\cdot e^{-x}=-1-1=-2$.`, R`$e^x\cdot(-e^{-x})-e^x\cdot e^{-x}=-1-1=-2$.`, R`$e^x\cdot(-e^{-x})-e^x\cdot e^{-x}=-1-1=-2$.`) },
    { id: 't07.x2', level: 'easy', type: 'match',
      q: L('Funksiyalar juftligini xulosa bilan moslang ($\\mathbb R$ yoki ko‘rsatilgan oraliqda).', 'Сопоставьте пару функций с выводом (на $\\mathbb R$ или указанном интервале).', 'Match each pair of functions with the conclusion (on $\\mathbb R$ or the stated interval).'),
      pairs: [
        { left: L(R`$x,\ 2x$`, R`$x,\ 2x$`, R`$x,\ 2x$`), right: L(R`bog‘liq, $W\equiv0$`, R`зависимы, $W\equiv0$`, R`dependent, $W\equiv0$`) },
        { left: L(R`$\sin x,\ \cos x$`, R`$\sin x,\ \cos x$`, R`$\sin x,\ \cos x$`), right: L(R`erkli, $W=-1$`, R`независимы, $W=-1$`, R`independent, $W=-1$`) },
        { left: L(R`$x^2,\ x|x|$ $(-1,1)$ da`, R`$x^2,\ x|x|$ на $(-1,1)$`, R`$x^2,\ x|x|$ on $(-1,1)$`), right: L(R`erkli, lekin $W\equiv0$`, R`независимы, но $W\equiv0$`, R`independent, yet $W\equiv0$`) },
        { left: L(R`$e^{x},\ xe^{x}$`, R`$e^{x},\ xe^{x}$`, R`$e^{x},\ xe^{x}$`), right: L(R`erkli, $W=e^{2x}$`, R`независимы, $W=e^{2x}$`, R`independent, $W=e^{2x}$`) }
      ],
      explain: L(R`Hisoblar sympy bilan tekshirilgan. Uchinchi juftlik — $W\equiv0$ bog‘liqlikni anglatmasligiga misol.`, R`Вычисления проверены в sympy. Третья пара — пример того, что $W\equiv0$ не означает зависимости.`, R`The computations were checked with sympy. The third pair shows that $W\equiv0$ does not mean dependence.`) },
    { id: 't07.x3', level: 'mid', type: 'formula',
      q: L(R`$y_1=x^2$ va $y_2=\dfrac1x$ — $x^2y''-2y=0$ ($x>0$) ning yechimlari. Umumiy yechimni yozing ($C_1$, $C_2$).`, R`$y_1=x^2$ и $y_2=\dfrac1x$ — решения $x^2y''-2y=0$ ($x>0$). Запишите общее решение ($C_1$, $C_2$).`, R`$y_1=x^2$ and $y_2=\dfrac1x$ solve $x^2y''-2y=0$ ($x>0$). Write the general solution ($C_1$, $C_2$).`),
      check: { kind: 'ode', residual: 'x^2*ypp - 2*y', order: 2, consts: ['C1', 'C2'], x: [0.5, 3] }, answer: 'C1*x^2 + C2/x',
      hint: L(R`$W[x^2,1/x]=-3\ne0$ — FYS.`, R`$W[x^2,1/x]=-3\ne0$ — ФСР.`, R`$W[x^2,1/x]=-3\ne0$: a fundamental set.`),
      solution: L(R`$y=C_1x^2+\dfrac{C_2}{x}$.`, R`$y=C_1x^2+\dfrac{C_2}{x}$.`, R`$y=C_1x^2+\dfrac{C_2}{x}$.`) },
    { id: 't07.x4', level: 'mid', type: 'formula',
      q: L(R`$y''+y=0$, $y(0)=2$, $y'(0)=3$ Koshi masalasining yechimi: $y=\ ?$`, R`Решение задачи Коши $y''+y=0$, $y(0)=2$, $y'(0)=3$: $y=\ ?$`, R`The solution of $y''+y=0$, $y(0)=2$, $y'(0)=3$: $y=\ ?$`),
      check: { kind: 'ode', residual: 'ypp + y', order: 2, consts: [], x: [-3, 3], ivp: { x0: 0, y0: 2, yp0: 3 } }, answer: '2*cos(x) + 3*sin(x)',
      hint: L(R`FYS: $\cos x$, $\sin x$.`, R`ФСР: $\cos x$, $\sin x$.`, R`Fundamental set: $\cos x$, $\sin x$.`),
      solution: L(R`$y=C_1\cos x+C_2\sin x$, $C_1=y(0)=2$, $C_2=y'(0)=3$: $y=2\cos x+3\sin x$.`, R`$y=C_1\cos x+C_2\sin x$, $C_1=y(0)=2$, $C_2=y'(0)=3$: $y=2\cos x+3\sin x$.`, R`$y=C_1\cos x+C_2\sin x$, $C_1=y(0)=2$, $C_2=y'(0)=3$: $y=2\cos x+3\sin x$.`) },
    { id: 't07.x5', level: 'mid', type: 'numeric',
      q: L(R`$y''+3y'+5y=0$ ning ikki yechimi uchun $W(0)=2$. $W(1)$ ni toping (4 xona aniqlikda).`, R`Для двух решений $y''+3y'+5y=0$ $W(0)=2$. Найдите $W(1)$ (4 знака).`, R`Two solutions of $y''+3y'+5y=0$ have $W(0)=2$. Find $W(1)$ (4 decimals).`),
      check: { kind: 'numeric', value: 0.0995741, tol: 1e-4 },
      hint: L(R`Ostrogradskiy–Liuvill: $W(x)=W(0)e^{-\int_0^x3\,dt}$.`, R`Остроградский–Лиувилль: $W(x)=W(0)e^{-\int_0^x3\,dt}$.`, R`Abel–Liouville: $W(x)=W(0)e^{-\int_0^x3\,dt}$.`),
      solution: L(R`$W(1)=2e^{-3}\approx0{,}0996$.`, R`$W(1)=2e^{-3}\approx0{,}0996$.`, R`$W(1)=2e^{-3}\approx0.0996$.`) },
    { id: 't07.x6', level: 'mid', type: 'finderror',
      q: L(R`Talabaning mulohazasidagi xatoni toping.`, R`Найдите ошибку в рассуждении студента.`, R`Find the error in the student’s reasoning.`),
      lines: [
        L(R`$y_1=x^2$, $y_2=x|x|$ $(-1,1)$ da differensiallanuvchi.`, R`$y_1=x^2$, $y_2=x|x|$ дифференцируемы на $(-1,1)$.`, R`$y_1=x^2$, $y_2=x|x|$ are differentiable on $(-1,1)$.`),
        L(R`$x\ge0$ va $x<0$ da alohida hisoblab, $W\equiv0$ ni olamiz.`, R`Считая отдельно при $x\ge0$ и $x<0$, получаем $W\equiv0$.`, R`Computing separately for $x\ge0$ and $x<0$ gives $W\equiv0$.`),
        L(R`Vronskian aynan nolga teng, demak $y_1$, $y_2$ chiziqli bog‘liq.`, R`Вронскиан тождественно равен нулю, значит $y_1$, $y_2$ линейно зависимы.`, R`The Wronskian is identically zero, so $y_1$, $y_2$ are linearly dependent.`)
      ],
      wrong: 2,
      explain: L(R`Ixtiyoriy funksiyalar uchun $W\equiv0$ dan bog‘liqlik kelib chiqmaydi. $x=\pm\frac12$ da tekshirsak, $\alpha_1=\alpha_2=0$ — ular erkli. Teskari xulosa faqat bitta chiziqli tenglama (uzluksiz koeffitsiyentli) yechimlari uchun to‘g‘ri.`, R`Для произвольных функций из $W\equiv0$ зависимость не следует. Проверка при $x=\pm\frac12$ даёт $\alpha_1=\alpha_2=0$ — они независимы. Обратный вывод верен только для решений одного линейного уравнения (с непрерывными коэффициентами).`, R`For arbitrary functions $W\equiv0$ does not imply dependence. Testing at $x=\pm\frac12$ gives $\alpha_1=\alpha_2=0$, so they are independent. The converse holds only for solutions of one linear equation with continuous coefficients.`) },
    { id: 't07.x7', level: 'hard', type: 'numeric',
      q: L(R`$(x-5)\,y''+x\,y'+(\ln x)\,y=0$, $y(2)=1$, $y'(2)=0$. Yechim kafolatlangan eng katta oraliqning o‘ng uchini kiriting.`, R`$(x-5)\,y''+x\,y'+(\ln x)\,y=0$, $y(2)=1$, $y'(2)=0$. Введите правый конец наибольшего интервала, где решение гарантировано.`, R`$(x-5)\,y''+x\,y'+(\ln x)\,y=0$, $y(2)=1$, $y'(2)=0$. Enter the right endpoint of the largest interval on which the solution is guaranteed.`),
      check: { kind: 'numeric', value: 5, tol: 1e-9 },
      hint: L(R`$x-5$ ga bo‘ling; $\ln x$ ning aniqlanish sohasini ham hisobga oling.`, R`Разделите на $x-5$; учтите и область определения $\ln x$.`, R`Divide by $x-5$; remember the domain of $\ln x$.`),
      solution: L(R`Koeffitsiyentlar $\frac{x}{x-5}$, $\frac{\ln x}{x-5}$ $(0,5)$ va $(5,\infty)$ da uzluksiz. $x_0=2\in(0,5)$, o‘ng uchi $5$.`, R`Коэффициенты $\frac{x}{x-5}$, $\frac{\ln x}{x-5}$ непрерывны на $(0,5)$ и $(5,\infty)$. $x_0=2\in(0,5)$, правый конец $5$.`, R`The coefficients $\frac{x}{x-5}$, $\frac{\ln x}{x-5}$ are continuous on $(0,5)$ and $(5,\infty)$. $x_0=2\in(0,5)$, so the right endpoint is $5$.`) },
    { id: 't07.x8', level: 'hard', type: 'formula',
      q: L(R`$x^2y''-xy'+y=0$ ($x>0$) uchun $y_1=x$ ma’lum. Ostrogradskiy–Liuvill formulasi va $\left(\dfrac{y_2}{y_1}\right)'=\dfrac{W}{y_1^2}$ yordamida umumiy yechimni toping.`, R`Для $x^2y''-xy'+y=0$ ($x>0$) известно $y_1=x$. С помощью формулы Остроградского–Лиувилля и $\left(\dfrac{y_2}{y_1}\right)'=\dfrac{W}{y_1^2}$ найдите общее решение.`, R`For $x^2y''-xy'+y=0$ ($x>0$), $y_1=x$ is known. Using the Abel–Liouville formula and $\left(\dfrac{y_2}{y_1}\right)'=\dfrac{W}{y_1^2}$, find the general solution.`),
      check: { kind: 'ode', residual: 'x^2*ypp - x*yp + y', order: 2, consts: ['C1', 'C2'], x: [0.5, 3] }, answer: 'C1*x + C2*x*ln(x)',
      hint: L(R`Normal ko‘rinishda $p=-\frac1x$, shuning uchun $W=Cx$.`, R`В нормальном виде $p=-\frac1x$, поэтому $W=Cx$.`, R`In normal form $p=-\frac1x$, so $W=Cx$.`),
      solution: L(R`$W=e^{\int dx/x}=x$ ($C=1$). $\left(\frac{y_2}{x}\right)'=\frac{x}{x^2}=\frac1x\Rightarrow y_2=x\ln x$. $y=C_1x+C_2x\ln x$. Tekshirish: $W[x,x\ln x]=x$ ✓.`, R`$W=e^{\int dx/x}=x$ ($C=1$). $\left(\frac{y_2}{x}\right)'=\frac{x}{x^2}=\frac1x\Rightarrow y_2=x\ln x$. $y=C_1x+C_2x\ln x$. Проверка: $W[x,x\ln x]=x$ ✓.`, R`$W=e^{\int dx/x}=x$ ($C=1$). $\left(\frac{y_2}{x}\right)'=\frac{x}{x^2}=\frac1x\Rightarrow y_2=x\ln x$. $y=C_1x+C_2x\ln x$. Check: $W[x,x\ln x]=x$ ✓.`) },
    { id: 't07.x9', level: 'hard', type: 'steps',
      q: L(R`$y_1=x^2$, $y_2=x^3$ $(-1,1)$ da uzluksiz koeffitsiyentli bitta $y''+p(x)y'+q(x)y=0$ tenglamaning yechimlari bo‘la oladimi?`, R`Могут ли $y_1=x^2$, $y_2=x^3$ быть решениями одного уравнения $y''+p(x)y'+q(x)y=0$ с непрерывными на $(-1,1)$ коэффициентами?`, R`Can $y_1=x^2$, $y_2=x^3$ both solve one equation $y''+p(x)y'+q(x)y=0$ with coefficients continuous on $(-1,1)$?`),
      steps: [
        { q: L(R`$W[x^2,x^3]=\ ?$`, R`$W[x^2,x^3]=\ ?$`, R`$W[x^2,x^3]=\ ?$`), options: [L(R`$x^4$`, R`$x^4$`, R`$x^4$`), L(R`$0$`, R`$0$`, R`$0$`), L(R`$x^5$`, R`$x^5$`, R`$x^5$`)], correct: 0 },
        { q: L(R`$W$ $(-1,1)$ da qanday?`, R`Каков $W$ на $(-1,1)$?`, R`What does $W$ do on $(-1,1)$?`), options: [L(R`$x=0$ da nol, boshqa joyda nol emas`, R`нуль при $x=0$, в остальных точках не нуль`, R`zero at $x=0$, nonzero elsewhere`), L('Aynan nol', 'Тождественно нуль', 'Identically zero'), L('Hech qayerda nol emas', 'Нигде не нуль', 'Never zero')], correct: 0 },
        { q: L('Xulosa?', 'Вывод?', 'Conclusion?'), options: [L('Yo‘q: yechimlar Vronskiani yo aynan nol, yo hech qayerda nol emas', 'Нет: вронскиан решений либо тождественно нуль, либо нигде не нуль', 'No: the Wronskian of solutions is either identically zero or never zero'), L('Ha, har doim mumkin', 'Да, всегда можно', 'Yes, always')], correct: 0 }
      ],
      explain: L(R`$W=x^2\cdot3x^2-2x\cdot x^3=x^4$. Alternativa buziladi, demak bunday tenglama yo‘q. ($x\ne0$ da ular $x^2y''-4xy'+6y=0$ ni qanoatlantiradi, lekin uning normal ko‘rinishi $x=0$ da uziladi.)`, R`$W=x^2\cdot3x^2-2x\cdot x^3=x^4$. Альтернатива нарушена, значит такого уравнения нет. (При $x\ne0$ они удовлетворяют $x^2y''-4xy'+6y=0$, но его нормальный вид разрывен при $x=0$.)`, R`$W=x^2\cdot3x^2-2x\cdot x^3=x^4$. The alternative is violated, so no such equation exists. (For $x\ne0$ they satisfy $x^2y''-4xy'+6y=0$, whose normal form breaks down at $x=0$.)`) }
  ],
  quiz: [
    { id: 't07.q1', q: L('Qaysi tenglama chiziqli bir jinsli?', 'Какое уравнение линейное однородное?', 'Which equation is linear homogeneous?'),
      options: [L(R`$y''+x^2y=0$`, R`$y''+x^2y=0$`, R`$y''+x^2y=0$`), L(R`$y''+y=\sin x$`, R`$y''+y=\sin x$`, R`$y''+y=\sin x$`), L(R`$y''+y^2=0$`, R`$y''+y^2=0$`, R`$y''+y^2=0$`), L(R`$y'=f(y/x)$`, R`$y'=f(y/x)$`, R`$y'=f(y/x)$`)], correct: 0,
      explain: L(R`Chiziqli va o‘ng tomoni nol.`, R`Линейное и с нулевой правой частью.`, R`Linear with zero right side.`),
      why: [null, L('O‘ng tomon nol emas.', 'Правая часть не нуль.', 'The right side is not zero.'), L(R`$y^2$ — chiziqli emas.`, R`$y^2$ — нелинейно.`, R`$y^2$ is nonlinear.`), L('Bu “bir jinsli”ning boshqa ma’nosi (3-mavzu).', 'Это другой смысл «однородного» (тема 3).', 'That is the other meaning of “homogeneous” (topic 3).')] },
    { id: 't07.q2', q: L(R`$W[\sin x,\cos x]=$`, R`$W[\sin x,\cos x]=$`, R`$W[\sin x,\cos x]=$`),
      options: [L('$-1$', '$-1$', '$-1$'), L('$1$', '$1$', '$1$'), L('$0$', '$0$', '$0$'), L(R`$\sin2x$`, R`$\sin2x$`, R`$\sin2x$`)], correct: 0,
      explain: L(R`$\sin x\cdot(-\sin x)-\cos x\cdot\cos x=-1$.`, R`$\sin x\cdot(-\sin x)-\cos x\cdot\cos x=-1$.`, R`$\sin x\cdot(-\sin x)-\cos x\cdot\cos x=-1$.`),
      why: [null, L(R`Bu $W[\cos x,\sin x]$; tartib ishorani o‘zgartiradi.`, R`Это $W[\cos x,\sin x]$; порядок меняет знак.`, R`That is $W[\cos x,\sin x]$; order flips the sign.`), L('Ular erkli, $W\\ne0$.', 'Они независимы, $W\\ne0$.', 'They are independent, $W\\ne0$.'), L('Hosilalar noto‘g‘ri ko‘paytirilgan.', 'Неверно перемножены производные.', 'Derivatives multiplied wrongly.')] },
    { id: 't07.q3', q: L(R`Ixtiyoriy differensiallanuvchi $y_1,y_2$ uchun $W\equiv0$ bo‘lsa:`, R`Если для произвольных дифференцируемых $y_1,y_2$ $W\equiv0$, то:`, R`If $W\equiv0$ for arbitrary differentiable $y_1,y_2$, then:`),
      options: [L('bog‘liqlik haqida xulosa chiqarib bo‘lmaydi', 'о зависимости ничего сказать нельзя', 'nothing can be concluded about dependence'), L('ular albatta bog‘liq', 'они обязательно зависимы', 'they are necessarily dependent'), L('ular albatta erkli', 'они обязательно независимы', 'they are necessarily independent'), L('ulardan biri nol', 'одна из них нуль', 'one of them is zero')], correct: 0,
      explain: L(R`$x^2$, $x|x|$: $W\equiv0$, lekin erkli; $x$, $2x$: $W\equiv0$ va bog‘liq.`, R`$x^2$, $x|x|$: $W\equiv0$, но независимы; $x$, $2x$: $W\equiv0$ и зависимы.`, R`$x^2$, $x|x|$: $W\equiv0$ but independent; $x$, $2x$: $W\equiv0$ and dependent.`),
      why: [null, L(R`Qarshi misol: $x^2$, $x|x|$.`, R`Контрпример: $x^2$, $x|x|$.`, R`Counterexample: $x^2$, $x|x|$.`), L(R`$x$, $2x$ bog‘liq.`, R`$x$, $2x$ зависимы.`, R`$x$ and $2x$ are dependent.`), L('Shart emas.', 'Не обязательно.', 'Not necessarily.')] },
    { id: 't07.q4', q: L(R`Uzluksiz koeffitsiyentli $y''+py'+qy=0$ ning ikki yechimi uchun $W(3)=0$. Unda:`, R`Для двух решений $y''+py'+qy=0$ с непрерывными коэффициентами $W(3)=0$. Тогда:`, R`Two solutions of $y''+py'+qy=0$ with continuous coefficients have $W(3)=0$. Then:`),
      options: [L(R`$W\equiv0$ va yechimlar bog‘liq`, R`$W\equiv0$ и решения зависимы`, R`$W\equiv0$ and the solutions are dependent`), L('faqat $x=3$ da bog‘liq', 'зависимы только при $x=3$', 'they are dependent only at $x=3$'), L('ular erkli', 'они независимы', 'they are independent'), L('hech narsa deyish mumkin emas', 'ничего сказать нельзя', 'nothing can be said')], correct: 0,
      explain: L('Yechimlar uchun alternativa: bir nuqtada nol bo‘lsa, hamma joyda nol.', 'Альтернатива для решений: нуль в одной точке — нуль везде.', 'The alternative for solutions: zero at one point means zero everywhere.'),
      why: [null, L('Bog‘liqlik nuqtada emas, oraliqda aniqlanadi.', 'Зависимость определяется на интервале, а не в точке.', 'Dependence is defined on an interval, not at a point.'), L(R`Erkli yechimlarda $W$ hech qayerda nol emas.`, R`У независимых решений $W$ нигде не нуль.`, R`For independent solutions $W$ never vanishes.`), L('Yechimlar uchun aniq xulosa bor.', 'Для решений вывод однозначен.', 'For solutions the conclusion is definite.')] },
    { id: 't07.q5', q: L(R`$y''-\dfrac{1}{x-2}y=0$, $y(0)=1$, $y'(0)=0$: yechim kafolatlangan eng katta oraliq:`, R`$y''-\dfrac{1}{x-2}y=0$, $y(0)=1$, $y'(0)=0$: наибольший интервал гарантированного существования:`, R`$y''-\dfrac{1}{x-2}y=0$, $y(0)=1$, $y'(0)=0$: the largest guaranteed interval is`),
      options: [L(R`$(-\infty,2)$`, R`$(-\infty,2)$`, R`$(-\infty,2)$`), L(R`$\mathbb R$`, R`$\mathbb R$`, R`$\mathbb R$`), L(R`$(2,\infty)$`, R`$(2,\infty)$`, R`$(2,\infty)$`), L(R`$(-2,2)$`, R`$(-2,2)$`, R`$(-2,2)$`)], correct: 0,
      explain: L(R`Koeffitsiyent faqat $x=2$ da uziladi; $0$ ni o‘z ichiga olgan oraliq $(-\infty,2)$.`, R`Коэффициент разрывен только при $x=2$; интервал, содержащий $0$, — $(-\infty,2)$.`, R`The coefficient breaks only at $x=2$; the interval containing $0$ is $(-\infty,2)$.`),
      why: [null, L(R`$x=2$ da koeffitsiyent uziladi.`, R`При $x=2$ коэффициент разрывен.`, R`The coefficient is discontinuous at $x=2$.`), L(R`$x_0=0$ bu oraliqda emas.`, R`$x_0=0$ не лежит в этом интервале.`, R`$x_0=0$ is not in it.`), L(R`$x=-2$ da uzilish yo‘q.`, R`При $x=-2$ разрыва нет.`, R`There is no break at $x=-2$.`)] },
    { id: 't07.q6', q: L(R`3-tartibli chiziqli bir jinsli tenglamaning FYSida nechta yechim bor?`, R`Сколько решений в ФСР линейного однородного уравнения 3-го порядка?`, R`How many solutions are in a fundamental set for a third-order linear homogeneous equation?`),
      options: [L('3', '3', '3'), L('2', '2', '2'), L('cheksiz ko‘p', 'бесконечно много', 'infinitely many'), L('1', '1', '1')], correct: 0,
      explain: L(R`FYS — $n$ ta chiziqli erkli yechim; yechimlar fazosi $n$ o‘lchamli.`, R`ФСР — $n$ линейно независимых решений; пространство решений $n$-мерно.`, R`A fundamental set has $n$ independent solutions; the solution space is $n$-dimensional.`),
      why: [null, L('Ikkita yetmaydi.', 'Двух мало.', 'Two are not enough.'), L('Erkli yechimlar soni tartibga teng.', 'Число независимых решений равно порядку.', 'The number of independent solutions equals the order.'), L('Bitta yetmaydi.', 'Одного мало.', 'One is not enough.')] },
    { id: 't07.q7', q: L(R`$y_1$, $y_2$ — $L[y]=f$ ning yechimlari. Unda $y_1-y_2$:`, R`$y_1$, $y_2$ — решения $L[y]=f$. Тогда $y_1-y_2$:`, R`$y_1$, $y_2$ solve $L[y]=f$. Then $y_1-y_2$:`),
      options: [L(R`$L[y]=0$ ning yechimi`, R`решение $L[y]=0$`, R`solves $L[y]=0$`), L(R`$L[y]=f$ ning yechimi`, R`решение $L[y]=f$`, R`solves $L[y]=f$`), L(R`$L[y]=2f$ ning yechimi`, R`решение $L[y]=2f$`, R`solves $L[y]=2f$`), L('yechim emas', 'не решение', 'solves nothing')], correct: 0,
      explain: L(R`$L[y_1-y_2]=f-f=0$.`, R`$L[y_1-y_2]=f-f=0$.`, R`$L[y_1-y_2]=f-f=0$.`),
      why: [null, L(R`$f-f=0$, $f$ emas.`, R`$f-f=0$, а не $f$.`, R`$f-f=0$, not $f$.`), L(R`Bu $y_1+y_2$ uchun.`, R`Это для $y_1+y_2$.`, R`That holds for $y_1+y_2$.`), L('Chiziqlilik bo‘yicha yechim.', 'По линейности — решение.', 'By linearity it is a solution.')] },
    { id: 't07.q8', q: L(R`$y''+p(x)y'+q(x)y=0$ uchun Ostrogradskiy–Liuvill formulasi:`, R`Формула Остроградского–Лиувилля для $y''+p(x)y'+q(x)y=0$:`, R`The Abel–Liouville formula for $y''+p(x)y'+q(x)y=0$:`),
      options: [L(R`$W=W(x_0)e^{-\int_{x_0}^xp\,dt}$`, R`$W=W(x_0)e^{-\int_{x_0}^xp\,dt}$`, R`$W=W(x_0)e^{-\int_{x_0}^xp\,dt}$`), L(R`$W=W(x_0)e^{\int_{x_0}^xp\,dt}$`, R`$W=W(x_0)e^{\int_{x_0}^xp\,dt}$`, R`$W=W(x_0)e^{\int_{x_0}^xp\,dt}$`), L(R`$W=W(x_0)e^{-\int_{x_0}^xq\,dt}$`, R`$W=W(x_0)e^{-\int_{x_0}^xq\,dt}$`, R`$W=W(x_0)e^{-\int_{x_0}^xq\,dt}$`), L(R`$W=\text{const}$ har doim`, R`$W=\text{const}$ всегда`, R`$W=\text{const}$ always`)], correct: 0,
      explain: L(R`$W'=-pW$.`, R`$W'=-pW$.`, R`$W'=-pW$.`),
      why: [null, L('Ishora noto‘g‘ri.', 'Неверный знак.', 'Wrong sign.'), L(R`$q$ emas, $y'$ oldidagi $p$.`, R`Не $q$, а $p$ при $y'$.`, R`Not $q$ but $p$, the coefficient of $y'$.`), L(R`Faqat $p\equiv0$ da.`, R`Только при $p\equiv0$.`, R`Only when $p\equiv0$.`)] },
    { id: 't07.q9', q: L(R`$y''+y=x$ ning umumiy yechimi:`, R`Общее решение $y''+y=x$:`, R`The general solution of $y''+y=x$:`),
      options: [L(R`$C_1\cos x+C_2\sin x+x$`, R`$C_1\cos x+C_2\sin x+x$`, R`$C_1\cos x+C_2\sin x+x$`), L(R`$C_1\cos x+C_2\sin x$`, R`$C_1\cos x+C_2\sin x$`, R`$C_1\cos x+C_2\sin x$`), L(R`$C_1\cos x+C_2\sin x+C_3x$`, R`$C_1\cos x+C_2\sin x+C_3x$`, R`$C_1\cos x+C_2\sin x+C_3x$`), L(R`$x$`, R`$x$`, R`$x$`)], correct: 0,
      explain: L(R`$y=y_h+y_p$, $y_p=x$.`, R`$y=y_h+y_p$, $y_p=x$.`, R`$y=y_h+y_p$, $y_p=x$.`),
      why: [null, L(R`$y_p$ yo‘q.`, R`Нет $y_p$.`, R`$y_p$ is missing.`), L(R`$y_p$ ga ixtiyoriy ko‘paytuvchi qo‘yib bo‘lmaydi.`, R`$y_p$ нельзя умножать на произвольную постоянную.`, R`$y_p$ cannot carry an arbitrary constant.`), L('Bu faqat xususiy yechim.', 'Это лишь частное решение.', 'That is only a particular solution.')] },
    { id: 't07.q10', q: L(R`$W[y_1,y_2](x_0)\ne0$ biror nuqtada. Ixtiyoriy funksiyalar uchun nima deyish mumkin?`, R`$W[y_1,y_2](x_0)\ne0$ в некоторой точке. Что можно сказать для произвольных функций?`, R`$W[y_1,y_2](x_0)\ne0$ at some point. What follows for arbitrary functions?`),
      options: [L('Ular chiziqli erkli', 'Они линейно независимы', 'They are linearly independent'), L('Ular bog‘liq', 'Они зависимы', 'They are dependent'), L(R`$W$ hech qayerda nol emas`, R`$W$ нигде не нуль`, R`$W$ never vanishes`), L('Ular biror tenglamaning FYSi', 'Они — ФСР некоторого уравнения', 'They form a fundamental set of some equation')], correct: 0,
      explain: L('Bog‘liq funksiyalarda $W\\equiv0$ bo‘lardi.', 'У зависимых функций было бы $W\\equiv0$.', 'Dependent functions would have $W\\equiv0$.'),
      why: [null, L(R`Unda $W\equiv0$ bo‘lardi.`, R`Тогда было бы $W\equiv0$.`, R`Then $W\equiv0$.`), L(R`Ixtiyoriy funksiyalarda $W$ boshqa nuqtalarda nol bo‘lishi mumkin ($W[x^2,x^3]=x^4$).`, R`У произвольных функций $W$ может обращаться в нуль в других точках ($W[x^2,x^3]=x^4$).`, R`For arbitrary functions $W$ may vanish elsewhere ($W[x^2,x^3]=x^4$).`), L('Buning uchun ular tenglamani qanoatlantirishi kerak.', 'Для этого они должны удовлетворять уравнению.', 'For that they must satisfy an equation.')] }
  ]
});
})();
