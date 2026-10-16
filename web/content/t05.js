(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't05', num: 5,
  title: L('Hosilaga nisbatan yechilmagan tenglamalar. Lagranj va Klero', 'Уравнения, не разрешённые относительно производной. Лагранж и Клеро', 'Equations not solved for the derivative. Lagrange and Clairaut'),
  syllabus: { lecture: 'M5', seminar: 'S5', outcomes: ['TN1', 'TN3'], independent: [] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L(R`$F(x,y,y')=0$ tenglamani $y'$ ga nisbatan yechib, bir nechta oddiy tenglamaga ajrata olasiz.`, R`Разрешать уравнение $F(x,y,y')=0$ относительно $y'$ и сводить его к нескольким более простым уравнениям.`, R`Solve $F(x,y,y')=0$ for $y'$ and split it into several simpler equations.`),
    L(R`Parametr kiritish usuli bilan $y=f(x,y')$ va $x=g(y,y')$ ko‘rinishidagi tenglamalarni yecha olasiz.`, R`Решать методом введения параметра уравнения вида $y=f(x,y')$ и $x=g(y,y')$.`, R`Solve equations of the form $y=f(x,y')$ and $x=g(y,y')$ by introducing a parameter.`),
    L('Lagranj va Klero tenglamalarini taniy olasiz va ularning umumiy yechimini topa olasiz.', 'Распознавать уравнения Лагранжа и Клеро и находить их общее решение.', 'Recognise Lagrange and Clairaut equations and find their general solution.'),
    L(R`$p$-diskriminant va $C$-diskriminant yordamida maxsus yechimga “nomzod”larni topib, ularni tekshira olasiz.`, R`Находить «кандидатов» в особые решения с помощью $p$-дискриминанта и $C$-дискриминанта и проверять их.`, R`Find candidates for singular solutions with the $p$-discriminant and the $C$-discriminant, and check them.`),
    L('Maxsus yechimni yechimlar oilasining o‘ramasi sifatida geometrik talqin qila olasiz.', 'Геометрически истолковывать особое решение как огибающую семейства решений.', 'Interpret a singular solution geometrically as the envelope of a family of solutions.')
  ],
  prereqKnowledge: [
    L('Kvadrat tenglama va ko‘phadni ko‘paytuvchilarga ajratish.', 'Квадратные уравнения и разложение многочлена на множители.', 'Quadratic equations and factoring polynomials.'),
    L('Birinchi tartibli chiziqli tenglamani yechish (4-mavzu).', 'Решение линейного уравнения первого порядка (тема 4).', 'Solving a first-order linear equation (topic 4).'),
    L('Parametrik berilgan funksiyaning hosilasi: $y_x\'=y_p\'/x_p\'$.', 'Производная параметрически заданной функции: $y_x\'=y_p\'/x_p\'$.', 'Derivative of a parametrically given function: $y_x\'=y_p\'/x_p\'$.'),
    L('Oshkormas funksiya haqidagi teorema (ikki o‘zgaruvchili funksiyalar).', 'Теорема о неявной функции (функции двух переменных).', 'The implicit function theorem (functions of two variables).')
  ],
  sources: [
    { id: 'dilmurodov', ref: '§4.1–§4.5', verified: true },
    { id: 'ergashev', ref: '1.9, 1.10', verified: true },
    { id: 'filippov', ref: '§8', verified: false },
    { id: 'stepanov', ref: 'гл. о уравнениях, не разрешённых относительно производной', verified: false }
  ],
  labs: ['L03', 'L01'],
  lessons: [
    {
      id: 't05.1',
      title: L(R`$F(x,y,y')=0$ tenglama. $y'$ ga nisbatan yechish`, R`Уравнение $F(x,y,y')=0$. Разрешение относительно $y'$`, R`The equation $F(x,y,y')=0$. Solving for $y'$`),
      blocks: [
        { type: 'intro', title: L('Robot-changyutgich', 'Робот-пылесос', 'A robot vacuum cleaner'),
          body: L(R`Robot-changyutgich xonada shunday harakat qiladi: yo‘lining qiyaligi har doim modul bo‘yicha $2$ ga teng. Yo‘lni $y(x)$ grafik deb olsak, shart quyidagicha yoziladi:
$$(y')^2=4.$$
Bu tenglama $y'$ ga nisbatan **yechilmagan**. Uni yechsak, ikki tenglama chiqadi: $y'=2$ va $y'=-2$. Demak, yo‘llar $y=2x+C$ va $y=-2x+C$ to‘g‘ri chiziqlar, va har bir nuqtadan **ikkita** integral chiziq o‘tadi. Bu mavzuda shunday tenglamalarni o‘rganamiz.`,
          R`Робот-пылесос движется по комнате так, что наклон его пути всегда равен $2$ по модулю. Если путь — график $y(x)$, условие записывается так:
$$(y')^2=4.$$
Это уравнение **не разрешено** относительно $y'$. Разрешив его, получаем два уравнения: $y'=2$ и $y'=-2$. Значит, пути — прямые $y=2x+C$ и $y=-2x+C$, и через каждую точку проходят **две** интегральные кривые. В этой теме мы изучаем такие уравнения.`,
          R`A robot vacuum moves around a room so that the slope of its path always has absolute value $2$. If the path is the graph $y(x)$, the condition reads
$$(y')^2=4.$$
This equation is **not solved** for $y'$. Solving it gives two equations, $y'=2$ and $y'=-2$. So the paths are the lines $y=2x+C$ and $y=-2x+C$, and **two** integral curves pass through every point. In this topic we study such equations.`) },
        { type: 'def', title: L('Hosilaga nisbatan yechilmagan tenglama', 'Уравнение, не разрешённое относительно производной', 'Equation not solved for the derivative'),
          body: L(R`Birinchi tartibli tenglamaning umumiy ko‘rinishi
$$F(x,y,y')=0.$$
Qisqalik uchun $p=y'$ deb belgilaymiz: $F(x,y,p)=0$. Agar $F$ $p$ ga nisbatan $n$-darajali ko‘phad bo‘lsa, tenglama **$n$-darajali** deyiladi. Har bir $(x,y)$ nuqtada $F(x,y,p)=0$ dan $p$ ning bir nechta haqiqiy qiymati chiqishi mumkin — shuning uchun bitta nuqtadan bir nechta integral chiziq o‘tishi mumkin.`,
          R`Общий вид уравнения первого порядка:
$$F(x,y,y')=0.$$
Для краткости обозначим $p=y'$: $F(x,y,p)=0$. Если $F$ — многочлен степени $n$ относительно $p$, уравнение называется уравнением **$n$-й степени**. В каждой точке $(x,y)$ уравнение $F(x,y,p)=0$ может давать несколько действительных значений $p$, поэтому через одну точку может проходить несколько интегральных кривых.`,
          R`The general form of a first-order equation is
$$F(x,y,y')=0.$$
For brevity write $p=y'$: $F(x,y,p)=0$. If $F$ is a polynomial of degree $n$ in $p$, the equation has **degree $n$**. At each point $(x,y)$ the relation $F(x,y,p)=0$ may give several real values of $p$, so several integral curves may pass through one point.`) },
        { type: 'thm', title: L(R`$F(x,y,y')=0$ uchun mavjudlik va yagonalik`, R`Существование и единственность для $F(x,y,y')=0$`, R`Existence and uniqueness for $F(x,y,y')=0$`),
          conds: L(R`1. $F(x_0,y_0,p_0)=0$;
2. $F$, $\partial F/\partial y$, $\partial F/\partial p$ $(x_0,y_0,p_0)$ nuqtaning biror atrofida uzluksiz;
3. $\partial F/\partial p\,(x_0,y_0,p_0)\ne0$.`,
          R`1. $F(x_0,y_0,p_0)=0$;
2. $F$, $\partial F/\partial y$, $\partial F/\partial p$ непрерывны в некоторой окрестности точки $(x_0,y_0,p_0)$;
3. $\partial F/\partial p\,(x_0,y_0,p_0)\ne0$.`,
          R`1. $F(x_0,y_0,p_0)=0$;
2. $F$, $\partial F/\partial y$, $\partial F/\partial p$ are continuous in a neighbourhood of $(x_0,y_0,p_0)$;
3. $\partial F/\partial p\,(x_0,y_0,p_0)\ne0$.`),
          body: L(R`U holda $x_0$ ning biror atrofida $y(x_0)=y_0$, $y'(x_0)=p_0$ shartlarni qanoatlantiruvchi **yagona** yechim mavjud.

Bu yerda boshlang‘ich shartga $p_0$ ham kiradi: bitta $(x_0,y_0)$ nuqtadan har bir oddiy ildiz $p_0$ uchun bitta integral chiziq o‘tadi.`,
          R`Тогда в некоторой окрестности $x_0$ существует **единственное** решение с $y(x_0)=y_0$, $y'(x_0)=p_0$.

Здесь начальное условие включает и $p_0$: через одну точку $(x_0,y_0)$ проходит по одной интегральной кривой для каждого простого корня $p_0$.`,
          R`Then in some neighbourhood of $x_0$ there is a **unique** solution with $y(x_0)=y_0$, $y'(x_0)=p_0$.

The initial data now include $p_0$: through one point $(x_0,y_0)$ passes one integral curve for each simple root $p_0$.`) },
        { type: 'proof', body: L(R`3-shart va oshkormas funksiya haqidagi teoremaga ko‘ra, $F(x,y,p)=0$ ni $p_0$ atrofida $p=f(x,y)$ ko‘rinishda yechish mumkin, bunda $f$ va $f_y=-F_y/F_p$ uzluksiz. So‘ng $y'=f(x,y)$ uchun Pikar teoremasini (1-mavzu) qo‘llaymiz (Dilmuradov, §4.1).`,
          R`По условию 3 и теореме о неявной функции уравнение $F(x,y,p)=0$ около $p_0$ разрешается в виде $p=f(x,y)$, где $f$ и $f_y=-F_y/F_p$ непрерывны. Затем применяем к $y'=f(x,y)$ теорему Пикара (тема 1) (Дилмурадов, §4.1).`,
          R`By hypothesis 3 and the implicit function theorem, $F(x,y,p)=0$ can be solved near $p_0$ as $p=f(x,y)$ with $f$ and $f_y=-F_y/F_p$ continuous. Then Picard’s theorem (topic 1) applies to $y'=f(x,y)$ (Dilmuradov, §4.1).`) },
        { type: 'example', title: L(R`Ko‘paytuvchilarga ajratish`, R`Разложение на множители`, R`Factoring`),
          body: L(R`$(y')^2-(x+y)\,y'+xy=0$ tenglamani yeching.`, R`Решите уравнение $(y')^2-(x+y)\,y'+xy=0$.`, R`Solve $(y')^2-(x+y)\,y'+xy=0$.`),
          steps: [
            L(R`$p=y'$ deb, $p$ ga nisbatan kvadrat uchhadni ajratamiz: $p^2-(x+y)p+xy=(p-x)(p-y)$.`, R`Положим $p=y'$ и разложим квадратный трёхчлен по $p$: $p^2-(x+y)p+xy=(p-x)(p-y)$.`, R`Put $p=y'$ and factor the quadratic in $p$: $p^2-(x+y)p+xy=(p-x)(p-y)$.`),
            L(R`Tenglama ikkita tenglamaga ajraladi: $y'=x$ yoki $y'=y$.`, R`Уравнение распадается на два: $y'=x$ или $y'=y$.`, R`The equation splits into two: $y'=x$ or $y'=y$.`),
            L(R`$y'=x\Rightarrow y=\dfrac{x^2}{2}+C$; $\quad y'=y\Rightarrow y=Ce^{x}$.`, R`$y'=x\Rightarrow y=\dfrac{x^2}{2}+C$; $\quad y'=y\Rightarrow y=Ce^{x}$.`, R`$y'=x\Rightarrow y=\dfrac{x^2}{2}+C$; $\quad y'=y\Rightarrow y=Ce^{x}$.`),
            L(R`Umumiy integral ikkala oilaning birlashmasi: $\left(y-\dfrac{x^2}{2}-C\right)\left(y-Ce^{x}\right)=0$. $p_1=x$, $p_2=y$ ustma-ust tushadigan $y=x$ chiziqda ikki oila chiziqlari bir-biriga urinadi.`, R`Общий интеграл — объединение двух семейств: $\left(y-\dfrac{x^2}{2}-C\right)\left(y-Ce^{x}\right)=0$. На прямой $y=x$, где $p_1=x$ и $p_2=y$ совпадают, кривые двух семейств касаются друг друга.`, R`The general integral is the union of both families: $\left(y-\dfrac{x^2}{2}-C\right)\left(y-Ce^{x}\right)=0$. On the line $y=x$, where $p_1=x$ and $p_2=y$ coincide, curves of the two families touch each other.`)
          ],
          check: L(R`$y=\frac{x^2}{2}+C$: $p=x$, $(p-x)(p-y)=0$ ✓. $y=Ce^x$: $p=y$, $(p-x)(p-y)=0$ ✓.`, R`$y=\frac{x^2}{2}+C$: $p=x$, $(p-x)(p-y)=0$ ✓. $y=Ce^x$: $p=y$, $(p-x)(p-y)=0$ ✓.`, R`$y=\frac{x^2}{2}+C$: $p=x$, $(p-x)(p-y)=0$ ✓. $y=Ce^x$: $p=y$, $(p-x)(p-y)=0$ ✓.`) },
        { type: 'warn', body: L(R`$y'$ ga nisbatan yechganda **barcha** ildizlarni yozing: $(y')^2=4$ dan faqat $y'=2$ ni olsangiz, yechimlarning yarmini yo‘qotasiz. Ildiz $\sqrt{\ }$ orqali chiqsa, uning aniqlanish sohasini (ildiz ostidagi ifoda $\ge0$) ko‘rsating.`,
          R`При разрешении относительно $y'$ выписывайте **все** корни: взяв из $(y')^2=4$ только $y'=2$, вы потеряете половину решений. Если корень выражается через $\sqrt{\ }$, укажите область определения (подкоренное выражение $\ge0$).`,
          R`When solving for $y'$, keep **all** roots: taking only $y'=2$ from $(y')^2=4$ loses half of the solutions. If a root involves $\sqrt{\ }$, state where it is defined (the radicand must be $\ge0$).`) }
      ]
    },
    {
      id: 't05.2',
      title: L('Parametr kiritish usuli', 'Метод введения параметра', 'The parameter method'),
      blocks: [
        { type: 'def', title: L(R`$y=f(x,y')$ va $x=g(y,y')$ tenglamalar`, R`Уравнения $y=f(x,y')$ и $x=g(y,y')$`, R`Equations $y=f(x,y')$ and $x=g(y,y')$`),
          body: L(R`Agar tenglamani $y'$ ga nisbatan yechish qiyin, lekin $y$ ga (yoki $x$ ga) nisbatan yechish oson bo‘lsa, $p=y'$ ni **parametr** deb olamiz.

- $y=f(x,p)$: ikkala tomonni $x$ bo‘yicha differensiallab, $dy=p\,dx$ ni ishlatamiz: $p=f_x+f_p\,\dfrac{dp}{dx}$. Bu $x$ va $p$ uchun **hosilaga nisbatan yechilgan** tenglama. Uning yechimi $p=\omega(x,C)$ bo‘lsa, javob $y=f(x,\omega(x,C))$.
- $x=g(y,p)$: $y$ bo‘yicha differensiallab, $dx=dy/p$ ni ishlatamiz: $\dfrac1p=g_y+g_p\,\dfrac{dp}{dy}$.
- Xususiy holat $x=\varphi(p)$: $dy=p\,dx=p\,\varphi'(p)\,dp$, ya’ni $y=\int p\,\varphi'(p)\,dp+C$. Javob **parametrik** ko‘rinishda: $x=\varphi(p)$, $y=\psi(p)+C$.`,
          R`Если уравнение трудно разрешить относительно $y'$, но легко относительно $y$ (или $x$), берём $p=y'$ в качестве **параметра**.

- $y=f(x,p)$: дифференцируем по $x$ и используем $dy=p\,dx$: $p=f_x+f_p\,\dfrac{dp}{dx}$. Это уравнение для $x$ и $p$, **разрешённое относительно производной**. Если его решение $p=\omega(x,C)$, то ответ $y=f(x,\omega(x,C))$.
- $x=g(y,p)$: дифференцируем по $y$ и используем $dx=dy/p$: $\dfrac1p=g_y+g_p\,\dfrac{dp}{dy}$.
- Частный случай $x=\varphi(p)$: $dy=p\,dx=p\,\varphi'(p)\,dp$, то есть $y=\int p\,\varphi'(p)\,dp+C$. Ответ в **параметрическом** виде: $x=\varphi(p)$, $y=\psi(p)+C$.`,
          R`If the equation is hard to solve for $y'$ but easy to solve for $y$ (or for $x$), take $p=y'$ as a **parameter**.

- $y=f(x,p)$: differentiate in $x$ and use $dy=p\,dx$: $p=f_x+f_p\,\dfrac{dp}{dx}$. This is an equation in $x$ and $p$ that **is solved for the derivative**. If its solution is $p=\omega(x,C)$, the answer is $y=f(x,\omega(x,C))$.
- $x=g(y,p)$: differentiate in $y$ and use $dx=dy/p$: $\dfrac1p=g_y+g_p\,\dfrac{dp}{dy}$.
- Special case $x=\varphi(p)$: $dy=p\,dx=p\,\varphi'(p)\,dp$, so $y=\int p\,\varphi'(p)\,dp+C$. The answer is **parametric**: $x=\varphi(p)$, $y=\psi(p)+C$.`) },
        { type: 'example', title: L(R`$x=\varphi(y')$ ko‘rinishi`, R`Вид $x=\varphi(y')$`, R`The form $x=\varphi(y')$`),
          body: L(R`$x=(y')^3+y'$ tenglamani yeching.`, R`Решите уравнение $x=(y')^3+y'$.`, R`Solve $x=(y')^3+y'$.`),
          steps: [
            L(R`$p=y'$: $x=p^3+p$. $y'$ ni $x$ orqali oshkor ifodalash (kubik tenglama) noqulay, shuning uchun parametr usulini ishlatamiz.`, R`$p=y'$: $x=p^3+p$. Выражать $y'$ через $x$ (кубическое уравнение) неудобно, поэтому применяем метод параметра.`, R`$p=y'$: $x=p^3+p$. Expressing $y'$ through $x$ (a cubic) is awkward, so we use the parameter method.`),
            L(R`$dx=(3p^2+1)\,dp$, demak $dy=p\,dx=(3p^3+p)\,dp$.`, R`$dx=(3p^2+1)\,dp$, значит $dy=p\,dx=(3p^3+p)\,dp$.`, R`$dx=(3p^2+1)\,dp$, so $dy=p\,dx=(3p^3+p)\,dp$.`),
            L(R`Integrallaymiz: $y=\dfrac{3p^4}{4}+\dfrac{p^2}{2}+C$.`, R`Интегрируем: $y=\dfrac{3p^4}{4}+\dfrac{p^2}{2}+C$.`, R`Integrate: $y=\dfrac{3p^4}{4}+\dfrac{p^2}{2}+C$.`),
            L(R`Javob parametrik: $x=p^3+p,\quad y=\dfrac{3p^4}{4}+\dfrac{p^2}{2}+C$, $p\in\mathbb R$.`, R`Ответ в параметрическом виде: $x=p^3+p,\quad y=\dfrac{3p^4}{4}+\dfrac{p^2}{2}+C$, $p\in\mathbb R$.`, R`Parametric answer: $x=p^3+p,\quad y=\dfrac{3p^4}{4}+\dfrac{p^2}{2}+C$, $p\in\mathbb R$.`)
          ],
          check: L(R`$\dfrac{dy}{dx}=\dfrac{dy/dp}{dx/dp}=\dfrac{3p^3+p}{3p^2+1}=p$ ✓, ya’ni $y'=p$ va $x=p^3+p=(y')^3+y'$ ✓.`, R`$\dfrac{dy}{dx}=\dfrac{dy/dp}{dx/dp}=\dfrac{3p^3+p}{3p^2+1}=p$ ✓, то есть $y'=p$ и $x=p^3+p=(y')^3+y'$ ✓.`, R`$\dfrac{dy}{dx}=\dfrac{dy/dp}{dx/dp}=\dfrac{3p^3+p}{3p^2+1}=p$ ✓, so $y'=p$ and $x=p^3+p=(y')^3+y'$ ✓.`) },
        { type: 'example', title: L(R`$y=f(x,y')$ ko‘rinishi va “yo‘qolgan” ko‘paytuvchi`, R`Вид $y=f(x,y')$ и «потерянный» множитель`, R`The form $y=f(x,y')$ and a “lost” factor`),
          body: L(R`$y=(y')^2-x\,y'+\dfrac{x^2}{2}$ tenglamani yeching.`, R`Решите уравнение $y=(y')^2-x\,y'+\dfrac{x^2}{2}$.`, R`Solve $y=(y')^2-x\,y'+\dfrac{x^2}{2}$.`),
          steps: [
            L(R`$p=y'$: $y=p^2-xp+\dfrac{x^2}{2}$. $x$ bo‘yicha differensiallaymiz ($y'=p$): $p=2pp'-p-xp'+x$.`, R`$p=y'$: $y=p^2-xp+\dfrac{x^2}{2}$. Дифференцируем по $x$ ($y'=p$): $p=2pp'-p-xp'+x$.`, R`$p=y'$: $y=p^2-xp+\dfrac{x^2}{2}$. Differentiate in $x$ ($y'=p$): $p=2pp'-p-xp'+x$.`),
            L(R`Guruhlaymiz: $(2p-x)\,p'-(2p-x)=0$, ya’ni $(2p-x)(p'-1)=0$.`, R`Группируем: $(2p-x)\,p'-(2p-x)=0$, то есть $(2p-x)(p'-1)=0$.`, R`Group terms: $(2p-x)\,p'-(2p-x)=0$, that is $(2p-x)(p'-1)=0$.`),
            L(R`$p'=1\Rightarrow p=x+C$. Tenglamaga qo‘yamiz: $y=(x+C)^2-x(x+C)+\dfrac{x^2}{2}=\dfrac{x^2}{2}+Cx+C^2$ — umumiy yechim.`, R`$p'=1\Rightarrow p=x+C$. Подставляем: $y=(x+C)^2-x(x+C)+\dfrac{x^2}{2}=\dfrac{x^2}{2}+Cx+C^2$ — общее решение.`, R`$p'=1\Rightarrow p=x+C$. Substitute: $y=(x+C)^2-x(x+C)+\dfrac{x^2}{2}=\dfrac{x^2}{2}+Cx+C^2$, the general solution.`),
            L(R`$2p-x=0\Rightarrow p=\dfrac x2$: $y=\dfrac{x^2}{4}-\dfrac{x^2}{2}+\dfrac{x^2}{2}=\dfrac{x^2}{4}$. Bu ko‘paytuvchini tashlab yuborish mumkin emas: u umumiy yechimga kirmaydigan yechim beradi (4-darsda ko‘ramiz: bu maxsus yechim).`, R`$2p-x=0\Rightarrow p=\dfrac x2$: $y=\dfrac{x^2}{4}-\dfrac{x^2}{2}+\dfrac{x^2}{2}=\dfrac{x^2}{4}$. Этот множитель нельзя отбрасывать: он даёт решение, не входящее в общее (в уроке 4 увидим, что оно особое).`, R`$2p-x=0\Rightarrow p=\dfrac x2$: $y=\dfrac{x^2}{4}-\dfrac{x^2}{2}+\dfrac{x^2}{2}=\dfrac{x^2}{4}$. This factor must not be dropped: it gives a solution outside the general family (lesson 4 shows it is singular).`)
          ],
          check: L(R`$y=\frac{x^2}{2}+Cx+C^2$: $p=x+C$, $p^2-xp+\frac{x^2}{2}=\frac{x^2}{2}+Cx+C^2$ ✓. $y=\frac{x^2}{4}$: $p=\frac x2$, $\frac{x^2}{4}-\frac{x^2}{2}+\frac{x^2}{2}=\frac{x^2}{4}$ ✓.`, R`$y=\frac{x^2}{2}+Cx+C^2$: $p=x+C$, $p^2-xp+\frac{x^2}{2}=\frac{x^2}{2}+Cx+C^2$ ✓. $y=\frac{x^2}{4}$: $p=\frac x2$, $\frac{x^2}{4}-\frac{x^2}{2}+\frac{x^2}{2}=\frac{x^2}{4}$ ✓.`, R`$y=\frac{x^2}{2}+Cx+C^2$: $p=x+C$, $p^2-xp+\frac{x^2}{2}=\frac{x^2}{2}+Cx+C^2$ ✓. $y=\frac{x^2}{4}$: $p=\frac x2$, $\frac{x^2}{4}-\frac{x^2}{2}+\frac{x^2}{2}=\frac{x^2}{4}$ ✓.`) },
        { type: 'warn', body: L(R`Differensiallagandan keyin hosil bo‘lgan tenglamadan biror ko‘paytuvchiga (masalan, $2p-x$ ga) **bo‘lmang** — avval uni nolga tenglab, alohida tekshiring. Aynan shunday ko‘paytuvchilar ko‘pincha maxsus yechim beradi.`,
          R`**Не делите** полученное после дифференцирования уравнение на множитель (например, $2p-x$) — сначала приравняйте его нулю и проверьте отдельно. Именно такие множители часто дают особые решения.`,
          R`**Do not divide** the differentiated equation by a factor (such as $2p-x$); first set it equal to zero and check that case separately. Such factors often produce singular solutions.`) },
        { type: 'lab', lab: 'L03', body: L(R`Usul tanlagich laboratoriyasida tenglamani kiriting va qaysi ko‘rinishda ekanini aniqlang: $y'$ ga nisbatan yechiladimi, $y=f(x,y')$ mi yoki $x=g(y,y')$ mi.`, R`В лаборатории выбора метода введите уравнение и определите его вид: разрешается ли оно относительно $y'$, имеет ли вид $y=f(x,y')$ или $x=g(y,y')$.`, R`In the method-chooser lab, enter an equation and decide its form: can it be solved for $y'$, is it $y=f(x,y')$, or is it $x=g(y,y')$?`) }
      ]
    },
    {
      id: 't05.3',
      title: L('Lagranj va Klero tenglamalari', 'Уравнения Лагранжа и Клеро', 'Lagrange and Clairaut equations'),
      blocks: [
        { type: 'def', title: L('Lagranj tenglamasi', 'Уравнение Лагранжа', 'Lagrange’s equation'),
          body: L(R`$$y=x\,\varphi(y')+\psi(y'),\qquad \varphi(p)\not\equiv p$$
ko‘rinishidagi tenglama **Lagranj tenglamasi** deyiladi ($y$ ga nisbatan ham, $x$ ga nisbatan ham chiziqli).

Yechish: $p=y'$, differensiallaymiz: $p=\varphi(p)+\big(x\varphi'(p)+\psi'(p)\big)\dfrac{dp}{dx}$. $x$ ni $p$ ning funksiyasi deb qarasak,
$$\big(p-\varphi(p)\big)\frac{dx}{dp}-\varphi'(p)\,x=\psi'(p)$$
— $x(p)$ ga nisbatan **chiziqli** tenglama (4-mavzu). Undan $x=X(p,C)$, so‘ng $y=X(p,C)\varphi(p)+\psi(p)$.

Bundan tashqari, $\varphi(p_i)=p_i$ tenglamaning har bir ildizi $p_i$ uchun $y=p_i\,x+\psi(p_i)$ to‘g‘ri chiziq ham yechim bo‘ladi (bu holda $dp/dx=0$). Ular maxsus yoki xususiy yechim bo‘lishi mumkin — tekshirish kerak.`,
          R`Уравнение вида
$$y=x\,\varphi(y')+\psi(y'),\qquad \varphi(p)\not\equiv p$$
называется **уравнением Лагранжа** (оно линейно и по $y$, и по $x$).

Решение: $p=y'$, дифференцируем: $p=\varphi(p)+\big(x\varphi'(p)+\psi'(p)\big)\dfrac{dp}{dx}$. Считая $x$ функцией от $p$, получаем
$$\big(p-\varphi(p)\big)\frac{dx}{dp}-\varphi'(p)\,x=\psi'(p)$$
— **линейное** уравнение относительно $x(p)$ (тема 4). Из него $x=X(p,C)$, затем $y=X(p,C)\varphi(p)+\psi(p)$.

Кроме того, для каждого корня $p_i$ уравнения $\varphi(p_i)=p_i$ прямая $y=p_i\,x+\psi(p_i)$ тоже является решением (здесь $dp/dx=0$). Она может быть особым или частным решением — это нужно проверить.`,
          R`An equation of the form
$$y=x\,\varphi(y')+\psi(y'),\qquad \varphi(p)\not\equiv p$$
is called **Lagrange’s equation** (it is linear in $y$ and in $x$).

Solution: put $p=y'$ and differentiate: $p=\varphi(p)+\big(x\varphi'(p)+\psi'(p)\big)\dfrac{dp}{dx}$. Treating $x$ as a function of $p$ gives
$$\big(p-\varphi(p)\big)\frac{dx}{dp}-\varphi'(p)\,x=\psi'(p),$$
a **linear** equation for $x(p)$ (topic 4). From it $x=X(p,C)$, then $y=X(p,C)\varphi(p)+\psi(p)$.

In addition, for every root $p_i$ of $\varphi(p_i)=p_i$ the line $y=p_i\,x+\psi(p_i)$ is a solution too (here $dp/dx=0$). It may be singular or particular; this must be checked.`) },
        { type: 'example', title: L('Lagranj tenglamasi', 'Уравнение Лагранжа', 'A Lagrange equation'),
          body: L(R`$y=2x\,y'-(y')^2$ tenglamani yeching.`, R`Решите уравнение $y=2x\,y'-(y')^2$.`, R`Solve $y=2x\,y'-(y')^2$.`),
          steps: [
            L(R`Bu Lagranj tenglamasi: $\varphi(p)=2p$, $\psi(p)=-p^2$. Differensiallaymiz: $p=2p+(2x-2p)\dfrac{dp}{dx}$, ya’ni $-p=2(x-p)\dfrac{dp}{dx}$.`, R`Это уравнение Лагранжа: $\varphi(p)=2p$, $\psi(p)=-p^2$. Дифференцируем: $p=2p+(2x-2p)\dfrac{dp}{dx}$, то есть $-p=2(x-p)\dfrac{dp}{dx}$.`, R`This is Lagrange’s equation with $\varphi(p)=2p$, $\psi(p)=-p^2$. Differentiate: $p=2p+(2x-2p)\dfrac{dp}{dx}$, i.e. $-p=2(x-p)\dfrac{dp}{dx}$.`),
            L(R`$p\ne0$ da $x(p)$ uchun: $\dfrac{dx}{dp}+\dfrac{2}{p}\,x=2$ — chiziqli tenglama.`, R`При $p\ne0$ для $x(p)$: $\dfrac{dx}{dp}+\dfrac{2}{p}\,x=2$ — линейное уравнение.`, R`For $p\ne0$, in terms of $x(p)$: $\dfrac{dx}{dp}+\dfrac{2}{p}\,x=2$, a linear equation.`),
            L(R`Integrallovchi ko‘paytuvchi $p^2$: $(p^2x)'=2p^2\Rightarrow x=\dfrac{2p}{3}+\dfrac{C}{p^2}$.`, R`Интегрирующий множитель $p^2$: $(p^2x)'=2p^2\Rightarrow x=\dfrac{2p}{3}+\dfrac{C}{p^2}$.`, R`Integrating factor $p^2$: $(p^2x)'=2p^2\Rightarrow x=\dfrac{2p}{3}+\dfrac{C}{p^2}$.`),
            L(R`$y=2xp-p^2=\dfrac{p^2}{3}+\dfrac{2C}{p}$. Umumiy yechim: $x=\dfrac{2p}{3}+\dfrac{C}{p^2}$, $y=\dfrac{p^2}{3}+\dfrac{2C}{p}$.`, R`$y=2xp-p^2=\dfrac{p^2}{3}+\dfrac{2C}{p}$. Общее решение: $x=\dfrac{2p}{3}+\dfrac{C}{p^2}$, $y=\dfrac{p^2}{3}+\dfrac{2C}{p}$.`, R`$y=2xp-p^2=\dfrac{p^2}{3}+\dfrac{2C}{p}$. General solution: $x=\dfrac{2p}{3}+\dfrac{C}{p^2}$, $y=\dfrac{p^2}{3}+\dfrac{2C}{p}$.`),
            L(R`$\varphi(p)=p$, ya’ni $2p=p$ dan $p=0$: $y=0$ ham yechim ($0=0-0$ ✓). U oilaga kirmaydi. Maxsusmi? $p$-diskriminant chiziq (4-dars) $y=x^2$; $y=0$ unda yotmaydi (faqat $(0,0)$ nuqtasi), shuning uchun $y=0$ maxsus yechim **emas**.`, R`$\varphi(p)=p$, то есть $2p=p$, даёт $p=0$: $y=0$ тоже решение ($0=0-0$ ✓). Оно не входит в семейство. Особое ли оно? $p$-дискриминантная кривая (урок 4) — $y=x^2$; $y=0$ на ней не лежит (кроме точки $(0,0)$), поэтому $y=0$ **не** особое решение.`, R`$\varphi(p)=p$, i.e. $2p=p$, gives $p=0$: $y=0$ is also a solution ($0=0-0$ ✓). It is not in the family. Is it singular? The $p$-discriminant curve (lesson 4) is $y=x^2$; $y=0$ does not lie on it (except at $(0,0)$), so $y=0$ is **not** singular.`)
          ],
          check: L(R`$\dfrac{dy/dp}{dx/dp}=\dfrac{\frac{2p}{3}-\frac{2C}{p^2}}{\frac23-\frac{2C}{p^3}}=p$ ✓; $2xp-p^2=\frac{4p^2}{3}+\frac{2C}{p}-p^2=y$ ✓.`, R`$\dfrac{dy/dp}{dx/dp}=\dfrac{\frac{2p}{3}-\frac{2C}{p^2}}{\frac23-\frac{2C}{p^3}}=p$ ✓; $2xp-p^2=\frac{4p^2}{3}+\frac{2C}{p}-p^2=y$ ✓.`, R`$\dfrac{dy/dp}{dx/dp}=\dfrac{\frac{2p}{3}-\frac{2C}{p^2}}{\frac23-\frac{2C}{p^3}}=p$ ✓; $2xp-p^2=\frac{4p^2}{3}+\frac{2C}{p}-p^2=y$ ✓.`) },
        { type: 'def', title: L('Klero tenglamasi', 'Уравнение Клеро', 'Clairaut’s equation'),
          body: L(R`$\varphi(p)=p$ bo‘lgan xususiy holat — **Klero tenglamasi**:
$$y=x\,y'+\psi(y').$$
Differensiallasak: $p=p+\big(x+\psi'(p)\big)\dfrac{dp}{dx}$, ya’ni $\big(x+\psi'(p)\big)\dfrac{dp}{dx}=0$.

- $\dfrac{dp}{dx}=0\Rightarrow p=C$: **umumiy yechim** — to‘g‘ri chiziqlar oilasi $y=Cx+\psi(C)$. Uni olish uchun tenglamada $y'$ ni $C$ ga almashtirish kifoya.
- $x+\psi'(p)=0$: parametrik egri chiziq $x=-\psi'(p)$, $y=-p\,\psi'(p)+\psi(p)$. $\psi''\ne0$ bo‘lsa, bu chiziqlar oilasining **o‘ramasi** — maxsus yechim.`,
          R`Частный случай $\varphi(p)=p$ — **уравнение Клеро**:
$$y=x\,y'+\psi(y').$$
Дифференцируя, получаем $p=p+\big(x+\psi'(p)\big)\dfrac{dp}{dx}$, то есть $\big(x+\psi'(p)\big)\dfrac{dp}{dx}=0$.

- $\dfrac{dp}{dx}=0\Rightarrow p=C$: **общее решение** — семейство прямых $y=Cx+\psi(C)$. Чтобы его получить, достаточно заменить в уравнении $y'$ на $C$.
- $x+\psi'(p)=0$: параметрическая кривая $x=-\psi'(p)$, $y=-p\,\psi'(p)+\psi(p)$. При $\psi''\ne0$ это **огибающая** семейства прямых — особое решение.`,
          R`The special case $\varphi(p)=p$ is **Clairaut’s equation**:
$$y=x\,y'+\psi(y').$$
Differentiating gives $p=p+\big(x+\psi'(p)\big)\dfrac{dp}{dx}$, i.e. $\big(x+\psi'(p)\big)\dfrac{dp}{dx}=0$.

- $\dfrac{dp}{dx}=0\Rightarrow p=C$: the **general solution** is the family of lines $y=Cx+\psi(C)$. To get it, simply replace $y'$ by $C$ in the equation.
- $x+\psi'(p)=0$: the parametric curve $x=-\psi'(p)$, $y=-p\,\psi'(p)+\psi(p)$. When $\psi''\ne0$ it is the **envelope** of the family of lines, a singular solution.`) },
        { type: 'example', title: L('Klero tenglamasi va parabola', 'Уравнение Клеро и парабола', 'Clairaut’s equation and a parabola'),
          body: L(R`$y=x\,y'-(y')^2$ tenglamaning umumiy va maxsus yechimlarini toping.`, R`Найдите общее и особое решения уравнения $y=x\,y'-(y')^2$.`, R`Find the general and the singular solutions of $y=x\,y'-(y')^2$.`),
          steps: [
            L(R`Klero tenglamasi, $\psi(p)=-p^2$. Umumiy yechim: $y=Cx-C^2$.`, R`Уравнение Клеро, $\psi(p)=-p^2$. Общее решение: $y=Cx-C^2$.`, R`Clairaut’s equation with $\psi(p)=-p^2$. General solution: $y=Cx-C^2$.`),
            L(R`Ikkinchi ko‘paytuvchi: $x+\psi'(p)=x-2p=0\Rightarrow p=\dfrac x2$.`, R`Второй множитель: $x+\psi'(p)=x-2p=0\Rightarrow p=\dfrac x2$.`, R`Second factor: $x+\psi'(p)=x-2p=0\Rightarrow p=\dfrac x2$.`),
            L(R`$y=xp-p^2=\dfrac{x^2}{2}-\dfrac{x^2}{4}=\dfrac{x^2}{4}$ — maxsus yechim.`, R`$y=xp-p^2=\dfrac{x^2}{2}-\dfrac{x^2}{4}=\dfrac{x^2}{4}$ — особое решение.`, R`$y=xp-p^2=\dfrac{x^2}{2}-\dfrac{x^2}{4}=\dfrac{x^2}{4}$, the singular solution.`),
            L(R`Geometriya: $y=Cx-C^2$ chiziq $y=\dfrac{x^2}{4}$ parabolaga $x=2C$ nuqtada urinadi. Demak, parabolaning har bir nuqtasidan ikki yechim (parabola va urinma) bir xil og‘ish bilan o‘tadi — yagonalik buziladi.`, R`Геометрия: прямая $y=Cx-C^2$ касается параболы $y=\dfrac{x^2}{4}$ в точке $x=2C$. Значит, через каждую точку параболы проходят два решения (парабола и касательная) с одинаковым наклоном — единственность нарушена.`, R`Geometry: the line $y=Cx-C^2$ touches the parabola $y=\dfrac{x^2}{4}$ at $x=2C$. So through each point of the parabola pass two solutions (the parabola and the tangent line) with the same slope: uniqueness fails.`)
          ],
          check: L(R`$y=Cx-C^2$: $xC-C^2=y$ ✓. $y=\frac{x^2}{4}$: $y'=\frac x2$, $x\cdot\frac x2-\frac{x^2}{4}=\frac{x^2}{4}$ ✓.`, R`$y=Cx-C^2$: $xC-C^2=y$ ✓. $y=\frac{x^2}{4}$: $y'=\frac x2$, $x\cdot\frac x2-\frac{x^2}{4}=\frac{x^2}{4}$ ✓.`, R`$y=Cx-C^2$: $xC-C^2=y$ ✓. $y=\frac{x^2}{4}$: $y'=\frac x2$, $x\cdot\frac x2-\frac{x^2}{4}=\frac{x^2}{4}$ ✓.`) },
        { type: 'lab', lab: 'L01', body: L(R`L01 laboratoriyasida o‘z tenglamangizni kiriting: (x - sqrt(x^2-4*y))/2. Bu $y=xy'-(y')^2$ ning $y'$ ga nisbatan yechilgan bir shoxi: $y'=\dfrac{x-\sqrt{x^2-4y}}{2}$ ($y\le\frac{x^2}{4}$). Parabola ostidagi nuqtalarga bosing: integral chiziqlar $y=\frac{x^2}{4}$ parabolaga urinadigan to‘g‘ri chiziq bo‘laklari bo‘lib chiqadi va urinish nuqtasida to‘xtaydi (undan yuqorida ildiz mavjud emas).`, R`В лаборатории L01 введите своё уравнение: (x - sqrt(x^2-4*y))/2. Это одна ветвь уравнения $y=xy'-(y')^2$, разрешённая относительно $y'$: $y'=\dfrac{x-\sqrt{x^2-4y}}{2}$ ($y\le\frac{x^2}{4}$). Нажимайте на точки под параболой: интегральные кривые оказываются отрезками прямых, касающихся параболы $y=\frac{x^2}{4}$, и обрываются в точке касания (выше корень не определён).`, R`In lab L01 type your own equation: (x - sqrt(x^2-4*y))/2. It is one branch of $y=xy'-(y')^2$ solved for $y'$: $y'=\dfrac{x-\sqrt{x^2-4y}}{2}$ ($y\le\frac{x^2}{4}$). Tap points below the parabola: the integral curves turn out to be pieces of straight lines tangent to $y=\frac{x^2}{4}$, and they stop at the point of contact (above it the square root is undefined).`) }
      ]
    },
    {
      id: 't05.4',
      title: L('Maxsus yechimlar: diskriminant va o‘rama', 'Особые решения: дискриминант и огибающая', 'Singular solutions: discriminants and envelopes'),
      blocks: [
        { type: 'def', title: L('Maxsus yechim. $p$-diskriminant chiziq', 'Особое решение. $p$-дискриминантная кривая', 'Singular solution. The $p$-discriminant curve'),
          body: L(R`$y=\varphi(x)$ yechim **maxsus** deyiladi, agar uning grafigining har bir nuqtasidan unga urinib, boshqa yechim ham o‘tsa (bu yechim nuqtaning har qanday atrofida $\varphi$ bilan ustma-ust tushmaydi). Ya’ni maxsus yechimning har bir nuqtasida yagonalik buziladi.

Ushbu sistemadan $p$ ni yo‘qotib hosil qilingan chiziq **$p$-diskriminant chiziq** deyiladi:
$$F(x,y,p)=0,\qquad \frac{\partial F}{\partial p}(x,y,p)=0.$$`,
          R`Решение $y=\varphi(x)$ называется **особым**, если через каждую точку его графика проходит другое решение, касающееся его в этой точке (и не совпадающее с $\varphi$ ни в какой окрестности точки). То есть в каждой точке особого решения нарушается единственность.

Кривая, полученная исключением $p$ из системы
$$F(x,y,p)=0,\qquad \frac{\partial F}{\partial p}(x,y,p)=0,$$
называется **$p$-дискриминантной кривой**.`,
          R`A solution $y=\varphi(x)$ is **singular** if through every point of its graph passes another solution tangent to it there (and not coinciding with $\varphi$ in any neighbourhood of the point). In other words, uniqueness fails at every point of a singular solution.

The curve obtained by eliminating $p$ from
$$F(x,y,p)=0,\qquad \frac{\partial F}{\partial p}(x,y,p)=0$$
is called the **$p$-discriminant curve**.`) },
        { type: 'thm', title: L('Maxsus yechim uchun zaruriy shart', 'Необходимое условие особого решения', 'A necessary condition for a singular solution'),
          conds: L(R`$F$, $\partial F/\partial y$, $\partial F/\partial p$ qaralayotgan sohada uzluksiz va $y=\varphi(x)$ — $F(x,y,y')=0$ tenglamaning maxsus yechimi.`, R`$F$, $\partial F/\partial y$, $\partial F/\partial p$ непрерывны в рассматриваемой области, и $y=\varphi(x)$ — особое решение уравнения $F(x,y,y')=0$.`, R`$F$, $\partial F/\partial y$, $\partial F/\partial p$ are continuous in the region considered, and $y=\varphi(x)$ is a singular solution of $F(x,y,y')=0$.`),
          body: L(R`U holda grafikning har bir nuqtasida $F(x,\varphi,\varphi')=0$ va $F_p(x,\varphi,\varphi')=0$, ya’ni maxsus yechim **$p$-diskriminant chiziq tarkibida** yotadi.

Teskarisi **noto‘g‘ri**: $p$-diskriminant chiziq (yoki uning shoxi) yechim bo‘lmasligi mumkin, yechim bo‘lsa ham maxsus bo‘lmasligi mumkin. U shuningdek integral chiziqlarning qaytish nuqtalari (kusplar) to‘plamini ham o‘z ichiga olishi mumkin.`,
          R`Тогда в каждой точке графика $F(x,\varphi,\varphi')=0$ и $F_p(x,\varphi,\varphi')=0$, то есть особое решение **содержится в $p$-дискриминантной кривой**.

Обратное **неверно**: $p$-дискриминантная кривая (или её ветвь) может не быть решением, а будучи решением — может не быть особым. Она может также содержать геометрическое место точек возврата (каспов) интегральных кривых.`,
          R`Then at every point of the graph $F(x,\varphi,\varphi')=0$ and $F_p(x,\varphi,\varphi')=0$, so a singular solution **lies in the $p$-discriminant curve**.

The converse is **false**: the $p$-discriminant curve (or a branch of it) may fail to be a solution, and even if it is a solution it may fail to be singular. It may also contain the locus of cusps of integral curves.`) },
        { type: 'proof', body: L(R`Agar biror nuqtada $F_p\ne0$ bo‘lsa, 1-darsdagi teoremaning barcha shartlari bajariladi va o‘sha nuqtada (shu $p$ bilan) yechim yagona bo‘ladi. Bu maxsus yechim ta’rifiga zid. Demak, maxsus yechimda $F_p=0$ (Dilmuradov, §4.3).`, R`Если в некоторой точке $F_p\ne0$, выполнены все условия теоремы из урока 1, и в этой точке (с этим $p$) решение единственно. Это противоречит определению особого решения. Значит, на особом решении $F_p=0$ (Дилмурадов, §4.3).`, R`If $F_p\ne0$ at some point, all hypotheses of the theorem from lesson 1 hold, and the solution through that point (with that $p$) is unique. This contradicts the definition of a singular solution. Hence $F_p=0$ along a singular solution (Dilmuradov, §4.3).`) },
        { type: 'warn', title: L('Diskriminant chiziqni albatta tekshiring', 'Дискриминантную кривую обязательно проверяйте', 'Always check the discriminant curve'),
          body: L(R`$p$-diskriminant chiziq faqat **nomzodlar** ro‘yxatini beradi. Har bir shox uchun ikki savolga javob bering:
1. Bu shox tenglamaning **yechimimi**? (Tenglamaga qo‘yib tekshiring.)
2. Agar yechim bo‘lsa, uning **har bir nuqtasida** unga urinadigan boshqa yechim bormi?
Ikkala javob “ha” bo‘lsagina, shox maxsus yechimdir.`,
          R`$p$-дискриминантная кривая даёт лишь список **кандидатов**. Для каждой ветви ответьте на два вопроса:
1. Является ли ветвь **решением** уравнения? (Подставьте и проверьте.)
2. Если да, проходит ли через **каждую** её точку другое решение, касающееся её?
Только при двух ответах «да» ветвь — особое решение.`,
          R`The $p$-discriminant curve only gives a list of **candidates**. For each branch answer two questions:
1. Is the branch a **solution** of the equation? (Substitute and check.)
2. If so, does another solution touch it at **every** one of its points?
Only if both answers are “yes” is the branch a singular solution.`) },
        { type: 'example', title: L('Maxsus yechim bor', 'Особое решение есть', 'A singular solution exists'),
          body: L(R`$(y')^2=4y$ tenglamaning maxsus yechimini toping.`, R`Найдите особое решение уравнения $(y')^2=4y$.`, R`Find the singular solution of $(y')^2=4y$.`),
          steps: [
            L(R`$F=p^2-4y$, $F_p=2p$. $F_p=0\Rightarrow p=0$, so‘ng $F=0\Rightarrow y=0$. $p$-diskriminant chiziq: $y=0$.`, R`$F=p^2-4y$, $F_p=2p$. $F_p=0\Rightarrow p=0$, затем $F=0\Rightarrow y=0$. $p$-дискриминантная кривая: $y=0$.`, R`$F=p^2-4y$, $F_p=2p$. $F_p=0\Rightarrow p=0$, then $F=0\Rightarrow y=0$. The $p$-discriminant curve is $y=0$.`),
            L(R`1-savol: $y=0$ yechimmi? $0^2=4\cdot0$ ✓.`, R`Вопрос 1: является ли $y=0$ решением? $0^2=4\cdot0$ ✓.`, R`Question 1: is $y=0$ a solution? $0^2=4\cdot0$ ✓.`),
            L(R`Umumiy yechim: $y'=\pm2\sqrt y$ dan $y=(x-C)^2$.`, R`Общее решение: из $y'=\pm2\sqrt y$ получаем $y=(x-C)^2$.`, R`General solution: from $y'=\pm2\sqrt y$ we get $y=(x-C)^2$.`),
            L(R`2-savol: $(x_0,0)$ nuqtadan $y=(x-x_0)^2$ parabola o‘tadi, u yerda uning og‘ishi $0$ — $y=0$ ga urinadi. Bu har bir $x_0$ uchun bajariladi, demak $y=0$ — **maxsus yechim**.`, R`Вопрос 2: через точку $(x_0,0)$ проходит парабола $y=(x-x_0)^2$ с наклоном $0$ в этой точке — она касается $y=0$. Это верно для каждого $x_0$, значит $y=0$ — **особое решение**.`, R`Question 2: the parabola $y=(x-x_0)^2$ passes through $(x_0,0)$ with slope $0$ there, so it touches $y=0$. This holds for every $x_0$, hence $y=0$ is a **singular solution**.`)
          ],
          check: L(R`$y=(x-C)^2$: $(y')^2=4(x-C)^2=4y$ ✓. $y=0$: $0=0$ ✓.`, R`$y=(x-C)^2$: $(y')^2=4(x-C)^2=4y$ ✓. $y=0$: $0=0$ ✓.`, R`$y=(x-C)^2$: $(y')^2=4(x-C)^2=4y$ ✓. $y=0$: $0=0$ ✓.`) },
        { type: 'example', title: L('Diskriminant chiziq yechim, lekin maxsus emas', 'Дискриминантная кривая — решение, но не особое', 'The discriminant curve is a solution but not singular'),
          body: L(R`$(y')^2=y^3$ tenglamani tekshiring.`, R`Исследуйте уравнение $(y')^2=y^3$.`, R`Investigate $(y')^2=y^3$.`),
          steps: [
            L(R`$F=p^2-y^3$, $F_p=2p=0\Rightarrow p=0\Rightarrow y=0$. Nomzod: $y=0$, va u yechim: $0=0$ ✓.`, R`$F=p^2-y^3$, $F_p=2p=0\Rightarrow p=0\Rightarrow y=0$. Кандидат: $y=0$, и это решение: $0=0$ ✓.`, R`$F=p^2-y^3$, $F_p=2p=0\Rightarrow p=0\Rightarrow y=0$. Candidate: $y=0$, and it is a solution: $0=0$ ✓.`),
            L(R`Boshqa yechimlar: $y'=\pm y^{3/2}$ ($y>0$) dan $y=\dfrac{4}{(x-C)^2}$.`, R`Остальные решения: из $y'=\pm y^{3/2}$ ($y>0$) получаем $y=\dfrac{4}{(x-C)^2}$.`, R`Other solutions: from $y'=\pm y^{3/2}$ ($y>0$) we get $y=\dfrac{4}{(x-C)^2}$.`),
            L(R`Bu egri chiziqlar $y=0$ ga hech qayerda tegmaydi (faqat $x\to\pm\infty$ da yaqinlashadi). Bundan tashqari $y'=\pm y^{3/2}$ ning o‘ng tomoni $y=0$ atrofida Lipshits shartini qanoatlantiradi, shuning uchun $y=0$ nuqtalarida yagonalik bor.`, R`Эти кривые нигде не касаются $y=0$ (лишь приближаются при $x\to\pm\infty$). Кроме того, правая часть $y'=\pm y^{3/2}$ удовлетворяет условию Липшица около $y=0$, так что в точках $y=0$ единственность есть.`, R`These curves never touch $y=0$ (they only approach it as $x\to\pm\infty$). Moreover, the right side of $y'=\pm y^{3/2}$ is Lipschitz near $y=0$, so uniqueness holds at the points of $y=0$.`),
            L(R`Xulosa: $y=0$ — yechim, $p$-diskriminant chiziqda yotadi, lekin **maxsus emas**. U oddiy (xususiy) yechim.`, R`Вывод: $y=0$ — решение и лежит на $p$-дискриминантной кривой, но **не особое**. Это обычное (частное) решение.`, R`Conclusion: $y=0$ is a solution and lies on the $p$-discriminant curve, but it is **not singular**; it is an ordinary (particular) solution.`)
          ],
          check: L(R`$y=\frac{4}{(x-C)^2}$: $y'=-\frac{8}{(x-C)^3}$, $(y')^2=\frac{64}{(x-C)^6}=y^3$ ✓.`, R`$y=\frac{4}{(x-C)^2}$: $y'=-\frac{8}{(x-C)^3}$, $(y')^2=\frac{64}{(x-C)^6}=y^3$ ✓.`, R`$y=\frac{4}{(x-C)^2}$: $y'=-\frac{8}{(x-C)^3}$, $(y')^2=\frac{64}{(x-C)^6}=y^3$ ✓.`) },
        { type: 'def', title: L(R`$C$-diskriminant va o‘rama`, R`$C$-дискриминант и огибающая`, R`The $C$-discriminant and the envelope`),
          body: L(R`Umumiy integral $\Phi(x,y,C)=0$ ma’lum bo‘lsa, quyidagi sistemadan $C$ ni yo‘qotamiz:
$$\Phi(x,y,C)=0,\qquad \frac{\partial\Phi}{\partial C}(x,y,C)=0.$$
Hosil bo‘lgan chiziq — **$C$-diskriminant chiziq**. Egri chiziqlar oilasining **o‘ramasi** — har bir nuqtasida oilaning biror egri chizig‘iga urinadigan (va o‘zi oilaga kirmaydigan) chiziq. O‘rama mavjud bo‘lsa, u maxsus yechimdir. $C$-diskriminant chiziq o‘ramadan tashqari egri chiziqlarning karrali nuqtalari yoki qaytish nuqtalari to‘plamini ham o‘z ichiga olishi mumkin — shuning uchun bu yerda ham tekshirish shart.`,
          R`Если известен общий интеграл $\Phi(x,y,C)=0$, исключаем $C$ из системы
$$\Phi(x,y,C)=0,\qquad \frac{\partial\Phi}{\partial C}(x,y,C)=0.$$
Получаем **$C$-дискриминантную кривую**. **Огибающая** семейства кривых — кривая, которая в каждой своей точке касается некоторой кривой семейства (и сама в семейство не входит). Если огибающая существует, она является особым решением. $C$-дискриминантная кривая кроме огибающей может содержать геометрические места кратных точек или точек возврата кривых — поэтому и здесь проверка обязательна.`,
          R`If a general integral $\Phi(x,y,C)=0$ is known, eliminate $C$ from
$$\Phi(x,y,C)=0,\qquad \frac{\partial\Phi}{\partial C}(x,y,C)=0.$$
The result is the **$C$-discriminant curve**. An **envelope** of a family of curves is a curve that at each of its points touches some member of the family (and is not itself a member). If an envelope exists, it is a singular solution. Besides the envelope, the $C$-discriminant curve may contain the loci of multiple points or cusps of the curves, so a check is required here too.`) },
        { type: 'example', title: L(R`$C$-diskriminant orqali o‘rama`, R`Огибающая через $C$-дискриминант`, R`Envelope via the $C$-discriminant`),
          body: L(R`2-darsdagi $y=\dfrac{x^2}{2}+Cx+C^2$ oilaning o‘ramasini toping.`, R`Найдите огибающую семейства $y=\dfrac{x^2}{2}+Cx+C^2$ из урока 2.`, R`Find the envelope of the family $y=\dfrac{x^2}{2}+Cx+C^2$ from lesson 2.`),
          steps: [
            L(R`$\Phi=y-\dfrac{x^2}{2}-Cx-C^2$, $\Phi_C=-x-2C=0\Rightarrow C=-\dfrac x2$.`, R`$\Phi=y-\dfrac{x^2}{2}-Cx-C^2$, $\Phi_C=-x-2C=0\Rightarrow C=-\dfrac x2$.`, R`$\Phi=y-\dfrac{x^2}{2}-Cx-C^2$, $\Phi_C=-x-2C=0\Rightarrow C=-\dfrac x2$.`),
            L(R`$\Phi=0$ ga qo‘yamiz: $y=\dfrac{x^2}{2}-\dfrac{x^2}{2}+\dfrac{x^2}{4}=\dfrac{x^2}{4}$.`, R`Подставляем в $\Phi=0$: $y=\dfrac{x^2}{2}-\dfrac{x^2}{2}+\dfrac{x^2}{4}=\dfrac{x^2}{4}$.`, R`Substitute into $\Phi=0$: $y=\dfrac{x^2}{2}-\dfrac{x^2}{2}+\dfrac{x^2}{4}=\dfrac{x^2}{4}$.`),
            L(R`Tekshiramiz: $x_0$ nuqtada $C=-\frac{x_0}{2}$ egri chiziq qiymati $\frac{x_0^2}{4}$, og‘ishi $x_0+C=\frac{x_0}{2}$ — o‘ramaning og‘ishi bilan bir xil. Demak, haqiqatan urinadi: $y=\frac{x^2}{4}$ — o‘rama va maxsus yechim (2-darsda $2p-x=0$ dan olingan yechim).`, R`Проверяем: в точке $x_0$ кривая с $C=-\frac{x_0}{2}$ имеет значение $\frac{x_0^2}{4}$ и наклон $x_0+C=\frac{x_0}{2}$ — такой же, как у огибающей. Значит, касание есть: $y=\frac{x^2}{4}$ — огибающая и особое решение (то самое, что получилось из $2p-x=0$ в уроке 2).`, R`Check: at $x_0$ the member with $C=-\frac{x_0}{2}$ has value $\frac{x_0^2}{4}$ and slope $x_0+C=\frac{x_0}{2}$, the same as the envelope. So they really touch: $y=\frac{x^2}{4}$ is the envelope and the singular solution (the one obtained from $2p-x=0$ in lesson 2).`)
          ],
          check: L(R`$y=\frac{x^2}{4}$: $(y')^2-xy'+\frac{x^2}{2}=\frac{x^2}{4}-\frac{x^2}{2}+\frac{x^2}{2}=\frac{x^2}{4}=y$ ✓.`, R`$y=\frac{x^2}{4}$: $(y')^2-xy'+\frac{x^2}{2}=\frac{x^2}{4}-\frac{x^2}{2}+\frac{x^2}{2}=\frac{x^2}{4}=y$ ✓.`, R`$y=\frac{x^2}{4}$: $(y')^2-xy'+\frac{x^2}{2}=\frac{x^2}{4}-\frac{x^2}{2}+\frac{x^2}{2}=\frac{x^2}{4}=y$ ✓.`) },
        { type: 'warn', body: L(R`Yana ikki ogohlantiruvchi holat:
- $y=2xy'-(y')^2$ (3-dars) uchun $p$-diskriminant chiziq $y=x^2$ chiqadi, lekin u **yechim emas**: $2x\cdot2x-4x^2=0\ne x^2$.
- $(y')^2=x$ uchun $F_p=2p=0$ dan $x=0$ chiqadi. Bu vertikal chiziq — $y=\pm\frac23x^{3/2}+C$ egri chiziqlarning **qaytish nuqtalari** to‘plami, yechim emas.`,
          R`Ещё два предостерегающих случая:
- Для $y=2xy'-(y')^2$ (урок 3) $p$-дискриминантная кривая $y=x^2$, но это **не решение**: $2x\cdot2x-4x^2=0\ne x^2$.
- Для $(y')^2=x$ из $F_p=2p=0$ получаем $x=0$. Это вертикальная прямая — геометрическое место **точек возврата** кривых $y=\pm\frac23x^{3/2}+C$, а не решение.`,
          R`Two more cautionary cases:
- For $y=2xy'-(y')^2$ (lesson 3) the $p$-discriminant curve is $y=x^2$, but it is **not a solution**: $2x\cdot2x-4x^2=0\ne x^2$.
- For $(y')^2=x$, $F_p=2p=0$ gives $x=0$. This vertical line is the locus of **cusps** of the curves $y=\pm\frac23x^{3/2}+C$, not a solution.`) }
      ]
    }
  ],
  mistakes: [
    L(R`$y'$ ga nisbatan yechganda bitta ildizni olib, qolganlarini tashlab yuborish (masalan, $(y')^2=4$ dan faqat $y'=2$).`, R`При разрешении относительно $y'$ брать один корень и терять остальные (например, из $(y')^2=4$ только $y'=2$).`, R`Keeping only one root when solving for $y'$ (e.g. only $y'=2$ from $(y')^2=4$).`),
    L(R`$p$-diskriminant chiziqni tekshirmasdan maxsus yechim deb e’lon qilish. U yechim bo‘lmasligi yoki yechim bo‘lib, maxsus bo‘lmasligi mumkin.`, R`Объявлять $p$-дискриминантную кривую особым решением без проверки. Она может не быть решением или быть решением, но не особым.`, R`Declaring the $p$-discriminant curve a singular solution without checking. It may not be a solution, or may be a solution that is not singular.`),
    L(R`Parametr usulida differensiallagandan keyin ko‘paytuvchiga bo‘lib yuborish va shu bilan maxsus yechimni yo‘qotish.`, R`В методе параметра делить на множитель после дифференцирования и тем самым терять особое решение.`, R`In the parameter method, dividing by a factor after differentiation and so losing the singular solution.`),
    L(R`$dy=p\,dx$ o‘rniga $dx=p\,dy$ yozish (yoki $x=g(y,p)$ holida $dx=dy/p$ ni unutish).`, R`Писать $dx=p\,dy$ вместо $dy=p\,dx$ (или забывать $dx=dy/p$ в случае $x=g(y,p)$).`, R`Writing $dx=p\,dy$ instead of $dy=p\,dx$ (or forgetting $dx=dy/p$ in the case $x=g(y,p)$).`),
    L(R`Klero tenglamasining maxsus yechimini $y=Cx+\psi(C)$ umumiy yechimda “$C$ ni tanlab” topishga urinish: o‘rama to‘g‘ri chiziqlar oilasiga kirmaydi.`, R`Искать особое решение уравнения Клеро «подбором $C$» в общем решении $y=Cx+\psi(C)$: огибающая не входит в семейство прямых.`, R`Trying to get the singular solution of Clairaut’s equation by “choosing $C$” in $y=Cx+\psi(C)$: the envelope is not a member of the family of lines.`)
  ],
  exercises: [
    { id: 't05.x1', level: 'easy', type: 'numeric',
      q: L(R`$(y')^2-(x+y)\,y'+xy=0$ tenglama uchun $(1,2)$ nuqtadan nechta integral chiziq o‘tadi?`, R`Сколько интегральных кривых уравнения $(y')^2-(x+y)\,y'+xy=0$ проходит через точку $(1,2)$?`, R`How many integral curves of $(y')^2-(x+y)\,y'+xy=0$ pass through $(1,2)$?`),
      check: { kind: 'numeric', value: 2, tol: 0 },
      hint: L(R`$(p-x)(p-y)=0$ dan $(1,2)$ nuqtada $p$ ning qiymatlarini toping.`, R`Из $(p-x)(p-y)=0$ найдите значения $p$ в точке $(1,2)$.`, R`From $(p-x)(p-y)=0$ find the values of $p$ at $(1,2)$.`),
      solution: L(R`$p=x=1$ yoki $p=y=2$ — ikki xil og‘ish, demak ikki integral chiziq: $y=\frac{x^2}{2}+\frac32$ va $y=\frac{2}{e}e^{x}$.`, R`$p=x=1$ или $p=y=2$ — два разных наклона, значит две интегральные кривые: $y=\frac{x^2}{2}+\frac32$ и $y=\frac{2}{e}e^{x}$.`, R`$p=x=1$ or $p=y=2$: two different slopes, hence two integral curves, $y=\frac{x^2}{2}+\frac32$ and $y=\frac{2}{e}e^{x}$.`) },
    { id: 't05.x2', level: 'easy', type: 'formula',
      q: L(R`Klero tenglamasi $y=x\,y'+(y')^2$ ning umumiy yechimini yozing: $y=\ ?$`, R`Запишите общее решение уравнения Клеро $y=x\,y'+(y')^2$: $y=\ ?$`, R`Write the general solution of Clairaut’s equation $y=x\,y'+(y')^2$: $y=\ ?$`),
      check: { kind: 'ode', residual: 'y - x*yp - yp^2', order: 1, consts: ['C'], x: [-2, 2] }, answer: 'C*x + C^2',
      hint: L(R`Klero tenglamasida $y'$ ni $C$ ga almashtiring.`, R`В уравнении Клеро замените $y'$ на $C$.`, R`In Clairaut’s equation replace $y'$ by $C$.`),
      solution: L(R`$y=Cx+C^2$. Tekshirish: $y'=C$, $xC+C^2=y$ ✓.`, R`$y=Cx+C^2$. Проверка: $y'=C$, $xC+C^2=y$ ✓.`, R`$y=Cx+C^2$. Check: $y'=C$, $xC+C^2=y$ ✓.`) },
    { id: 't05.x3', level: 'mid', type: 'formula',
      q: L(R`$y=x\,y'+(y')^2$ tenglamaning maxsus yechimini yozing: $y=\ ?$`, R`Запишите особое решение уравнения $y=x\,y'+(y')^2$: $y=\ ?$`, R`Write the singular solution of $y=x\,y'+(y')^2$: $y=\ ?$`),
      check: { kind: 'equiv', ref: '-x^2/4', vars: { x: [-3, 3] } }, answer: '-x^2/4',
      hint: L(R`$x+\psi'(p)=0$, bu yerda $\psi(p)=p^2$.`, R`$x+\psi'(p)=0$, где $\psi(p)=p^2$.`, R`$x+\psi'(p)=0$ with $\psi(p)=p^2$.`),
      solution: L(R`$x+2p=0\Rightarrow p=-\frac x2$, $y=xp+p^2=-\frac{x^2}{2}+\frac{x^2}{4}=-\frac{x^2}{4}$. Tekshirish: $y'=-\frac x2$, $x\left(-\frac x2\right)+\frac{x^2}{4}=-\frac{x^2}{4}$ ✓.`, R`$x+2p=0\Rightarrow p=-\frac x2$, $y=xp+p^2=-\frac{x^2}{2}+\frac{x^2}{4}=-\frac{x^2}{4}$. Проверка: $y'=-\frac x2$, $x\left(-\frac x2\right)+\frac{x^2}{4}=-\frac{x^2}{4}$ ✓.`, R`$x+2p=0\Rightarrow p=-\frac x2$, $y=xp+p^2=-\frac{x^2}{2}+\frac{x^2}{4}=-\frac{x^2}{4}$. Check: $y'=-\frac x2$, $x\left(-\frac x2\right)+\frac{x^2}{4}=-\frac{x^2}{4}$ ✓.`) },
    { id: 't05.x4', level: 'mid', type: 'match',
      q: L('Tenglamani uning turi (yoki yechish usuli) bilan moslang.', 'Сопоставьте уравнение с его типом (или методом решения).', 'Match each equation with its type (or solution method).'),
      pairs: [
        { left: L(R`$y=x\,y'+\sqrt{1+(y')^2}$`, R`$y=x\,y'+\sqrt{1+(y')^2}$`, R`$y=x\,y'+\sqrt{1+(y')^2}$`), right: L('Klero tenglamasi', 'Уравнение Клеро', 'Clairaut equation') },
        { left: L(R`$y=x\,(y')^2+y'$`, R`$y=x\,(y')^2+y'$`, R`$y=x\,(y')^2+y'$`), right: L('Lagranj tenglamasi', 'Уравнение Лагранжа', 'Lagrange equation') },
        { left: L(R`$x=e^{y'}+y'$`, R`$x=e^{y'}+y'$`, R`$x=e^{y'}+y'$`), right: L(R`$x=\varphi(p)$: $dy=p\,\varphi'(p)\,dp$`, R`$x=\varphi(p)$: $dy=p\,\varphi'(p)\,dp$`, R`$x=\varphi(p)$: $dy=p\,\varphi'(p)\,dp$`) },
        { left: L(R`$(y')^2-1=0$`, R`$(y')^2-1=0$`, R`$(y')^2-1=0$`), right: L(R`$y'$ ga nisbatan yechiladi`, R`Разрешается относительно $y'$`, R`Solve for $y'$ directly`) }
      ],
      explain: L(R`Klero: $y=xp+\psi(p)$. Lagranj: $y=x\varphi(p)+\psi(p)$, $\varphi(p)\ne p$ (bu yerda $\varphi=p^2$). $x=\varphi(p)$ — parametr usuli. $(y')^2=1$ dan $y'=\pm1$.`, R`Клеро: $y=xp+\psi(p)$. Лагранж: $y=x\varphi(p)+\psi(p)$, $\varphi(p)\ne p$ (здесь $\varphi=p^2$). $x=\varphi(p)$ — метод параметра. Из $(y')^2=1$ $y'=\pm1$.`, R`Clairaut: $y=xp+\psi(p)$. Lagrange: $y=x\varphi(p)+\psi(p)$ with $\varphi(p)\ne p$ (here $\varphi=p^2$). $x=\varphi(p)$: parameter method. $(y')^2=1$ gives $y'=\pm1$.`) },
    { id: 't05.x5', level: 'mid', type: 'finderror',
      q: L(R`Talaba $y=2x\,y'-(y')^2$ tenglamaning maxsus yechimini qidirdi. Qaysi qatorda xato bor?`, R`Студент искал особое решение уравнения $y=2x\,y'-(y')^2$. В какой строке ошибка?`, R`A student looked for the singular solution of $y=2x\,y'-(y')^2$. Which line is wrong?`),
      lines: [
        L(R`$F=y-2xp+p^2$, $F_p=-2x+2p$.`, R`$F=y-2xp+p^2$, $F_p=-2x+2p$.`, R`$F=y-2xp+p^2$, $F_p=-2x+2p$.`),
        L(R`$F_p=0\Rightarrow p=x$.`, R`$F_p=0\Rightarrow p=x$.`, R`$F_p=0\Rightarrow p=x$.`),
        L(R`$F=0$ ga qo‘yamiz: $y=2x^2-x^2=x^2$.`, R`Подставляем в $F=0$: $y=2x^2-x^2=x^2$.`, R`Substitute into $F=0$: $y=2x^2-x^2=x^2$.`),
        L(R`Demak, $y=x^2$ — maxsus yechim.`, R`Следовательно, $y=x^2$ — особое решение.`, R`Therefore $y=x^2$ is the singular solution.`)
      ],
      wrong: 3,
      explain: L(R`$y=x^2$ faqat nomzod. Tekshirish: $y'=2x$, $2x\cdot2x-(2x)^2=0\ne x^2$ — bu yechim emas, shuning uchun maxsus yechim ham emas. Diskriminant chiziq har doim tekshirilishi kerak.`, R`$y=x^2$ — лишь кандидат. Проверка: $y'=2x$, $2x\cdot2x-(2x)^2=0\ne x^2$ — это не решение, а значит и не особое решение. Дискриминантную кривую нужно всегда проверять.`, R`$y=x^2$ is only a candidate. Check: $y'=2x$, $2x\cdot2x-(2x)^2=0\ne x^2$, so it is not a solution and hence not a singular solution. The discriminant curve must always be checked.`) },
    { id: 't05.x6', level: 'easy', type: 'order',
      q: L(R`Klero tenglamasi $y=xy'+\psi(y')$ ni yechish qadamlarini to‘g‘ri tartibda joylashtiring.`, R`Расположите шаги решения уравнения Клеро $y=xy'+\psi(y')$ в правильном порядке.`, R`Put the steps for solving Clairaut’s equation $y=xy'+\psi(y')$ in the correct order.`),
      items: [
        L(R`$p=y'$ deb belgilash`, R`Обозначить $p=y'$`, R`Put $p=y'$`),
        L(R`$x$ bo‘yicha differensiallash: $(x+\psi'(p))\,p'=0$`, R`Продифференцировать по $x$: $(x+\psi'(p))\,p'=0$`, R`Differentiate in $x$: $(x+\psi'(p))\,p'=0$`),
        L(R`$p'=0$: umumiy yechim $y=Cx+\psi(C)$`, R`$p'=0$: общее решение $y=Cx+\psi(C)$`, R`$p'=0$: general solution $y=Cx+\psi(C)$`),
        L(R`$x+\psi'(p)=0$: $p$ ni yo‘qotib, maxsus yechimni topish`, R`$x+\psi'(p)=0$: исключить $p$ и найти особое решение`, R`$x+\psi'(p)=0$: eliminate $p$ and find the singular solution`),
        L(R`Maxsus yechimni tenglamaga qo‘yib tekshirish`, R`Проверить особое решение подстановкой`, R`Check the singular solution by substitution`)
      ],
      explain: L(R`Avval belgilash, so‘ng differensiallash, keyin ikki ko‘paytuvchini alohida tekshirish va oxirida natijani tekshirish.`, R`Сначала обозначение, затем дифференцирование, потом два множителя по отдельности и в конце проверка.`, R`First the substitution, then differentiation, then each factor separately, and finally a check.`) },
    { id: 't05.x7', level: 'hard', type: 'steps',
      q: L(R`$y=(y')^2-x\,y'+\dfrac{x^2}{2}$ tenglamani bosqichma-bosqich yeching.`, R`Решите по шагам уравнение $y=(y')^2-x\,y'+\dfrac{x^2}{2}$.`, R`Solve $y=(y')^2-x\,y'+\dfrac{x^2}{2}$ step by step.`),
      steps: [
        { q: L(R`$p=y'$ deb, $x$ bo‘yicha differensiallagandan keyin qaysi tenglama chiqadi?`, R`Какое уравнение получается после подстановки $p=y'$ и дифференцирования по $x$?`, R`After putting $p=y'$ and differentiating in $x$, which equation results?`),
          options: [L(R`$(2p-x)(p'-1)=0$`, R`$(2p-x)(p'-1)=0$`, R`$(2p-x)(p'-1)=0$`), L(R`$2pp'-x=0$`, R`$2pp'-x=0$`, R`$2pp'-x=0$`), L(R`$p'=1$`, R`$p'=1$`, R`$p'=1$`)], correct: 0 },
        { q: L(R`$p'=1$ holida umumiy yechim:`, R`Общее решение в случае $p'=1$:`, R`General solution in the case $p'=1$:`),
          options: [L(R`$y=\frac{x^2}{2}+Cx+C^2$`, R`$y=\frac{x^2}{2}+Cx+C^2$`, R`$y=\frac{x^2}{2}+Cx+C^2$`), L(R`$y=x+C$`, R`$y=x+C$`, R`$y=x+C$`), L(R`$y=Cx-C^2$`, R`$y=Cx-C^2$`, R`$y=Cx-C^2$`)], correct: 0 },
        { q: L(R`$2p-x=0$ holida nima chiqadi?`, R`Что даёт случай $2p-x=0$?`, R`What does the case $2p-x=0$ give?`),
          options: [L(R`$y=\frac{x^2}{4}$ — umumiy yechimga kirmaydi`, R`$y=\frac{x^2}{4}$ — не входит в общее решение`, R`$y=\frac{x^2}{4}$, not in the general family`), L('Hech narsa, uni tashlab yuborish mumkin', 'Ничего, его можно отбросить', 'Nothing; it can be discarded')], correct: 0 },
        { q: L(R`$y=\frac{x^2}{4}$ maxsus yechimmi?`, R`Является ли $y=\frac{x^2}{4}$ особым решением?`, R`Is $y=\frac{x^2}{4}$ a singular solution?`),
          options: [L(R`Ha: u $y=\frac{x^2}{2}+Cx+C^2$ oilaning o‘ramasi`, R`Да: это огибающая семейства $y=\frac{x^2}{2}+Cx+C^2$`, R`Yes: it is the envelope of $y=\frac{x^2}{2}+Cx+C^2$`), L(R`Yo‘q: u $C=0$ da olinadi`, R`Нет: оно получается при $C=0$`, R`No: it is obtained at $C=0$`)], correct: 0 }
      ],
      explain: L(R`$\Phi_C=x+2C=0$ dan $C=-\frac x2$ va $y=\frac{x^2}{4}$; urinish nuqtalarida og‘ishlar teng ($\frac x2$). $C=0$ da esa $y=\frac{x^2}{2}$ chiqadi, $\frac{x^2}{4}$ emas.`, R`Из $\Phi_C=x+2C=0$ получаем $C=-\frac x2$ и $y=\frac{x^2}{4}$; в точках касания наклоны равны ($\frac x2$). При $C=0$ получается $y=\frac{x^2}{2}$, а не $\frac{x^2}{4}$.`, R`$\Phi_C=x+2C=0$ gives $C=-\frac x2$ and $y=\frac{x^2}{4}$; at the points of contact the slopes agree ($\frac x2$). $C=0$ gives $y=\frac{x^2}{2}$, not $\frac{x^2}{4}$.`) },
    { id: 't05.x8', level: 'hard', type: 'numeric',
      q: L(R`$y=xy'-(y')^2$ tenglamaning umumiy yechimi $y=Cx-C^2$. Qaysi $C$ da bu chiziq maxsus yechim $y=\frac{x^2}{4}$ ga $x=4$ nuqtada urinadi?`, R`Общее решение уравнения $y=xy'-(y')^2$ — $y=Cx-C^2$. При каком $C$ эта прямая касается особого решения $y=\frac{x^2}{4}$ в точке $x=4$?`, R`The general solution of $y=xy'-(y')^2$ is $y=Cx-C^2$. For which $C$ does this line touch the singular solution $y=\frac{x^2}{4}$ at $x=4$?`),
      check: { kind: 'numeric', value: 2, tol: 1e-6 },
      hint: L(R`Urinma og‘ishi parabolaning $x=4$ dagi hosilasiga teng.`, R`Наклон касательной равен производной параболы при $x=4$.`, R`The slope of the tangent equals the derivative of the parabola at $x=4$.`),
      solution: L(R`$\left(\frac{x^2}{4}\right)'=\frac x2=2$ da $x=4$, demak $C=2$. Tekshirish: $y=2x-4$, $x=4$ da $y=4=\frac{16}{4}$ ✓.`, R`$\left(\frac{x^2}{4}\right)'=\frac x2=2$ при $x=4$, значит $C=2$. Проверка: $y=2x-4$, при $x=4$ $y=4=\frac{16}{4}$ ✓.`, R`$\left(\frac{x^2}{4}\right)'=\frac x2=2$ at $x=4$, so $C=2$. Check: $y=2x-4$ gives $y=4=\frac{16}{4}$ at $x=4$ ✓.`) },
    { id: 't05.x9', level: 'hard', type: 'formula',
      q: L(R`$y=x\,y'+\dfrac{1}{y'}$ tenglamaning maxsus yechimining $y>0$ shoxini yozing: $y=\ ?$`, R`Запишите ветвь $y>0$ особого решения уравнения $y=x\,y'+\dfrac{1}{y'}$: $y=\ ?$`, R`Write the branch $y>0$ of the singular solution of $y=x\,y'+\dfrac{1}{y'}$: $y=\ ?$`),
      check: { kind: 'equiv', ref: '2*sqrt(x)', vars: { x: [0.2, 4] } }, answer: '2*sqrt(x)',
      hint: L(R`$\psi(p)=\frac1p$, $x+\psi'(p)=x-\frac{1}{p^2}=0$.`, R`$\psi(p)=\frac1p$, $x+\psi'(p)=x-\frac{1}{p^2}=0$.`, R`$\psi(p)=\frac1p$, $x+\psi'(p)=x-\frac{1}{p^2}=0$.`),
      solution: L(R`$x=\frac1{p^2}$, $y=xp+\frac1p=\frac2p$. $p$ ni yo‘qotsak: $y^2=4x$. $y>0$ shoxi: $y=2\sqrt x$. Tekshirish: $y'=\frac1{\sqrt x}$, $x\cdot\frac1{\sqrt x}+\sqrt x=2\sqrt x$ ✓. Bu $y=Cx+\frac1C$ chiziqlarning o‘ramasi.`, R`$x=\frac1{p^2}$, $y=xp+\frac1p=\frac2p$. Исключая $p$: $y^2=4x$. Ветвь $y>0$: $y=2\sqrt x$. Проверка: $y'=\frac1{\sqrt x}$, $x\cdot\frac1{\sqrt x}+\sqrt x=2\sqrt x$ ✓. Это огибающая прямых $y=Cx+\frac1C$.`, R`$x=\frac1{p^2}$, $y=xp+\frac1p=\frac2p$. Eliminating $p$: $y^2=4x$. The branch $y>0$ is $y=2\sqrt x$. Check: $y'=\frac1{\sqrt x}$, $x\cdot\frac1{\sqrt x}+\sqrt x=2\sqrt x$ ✓. It is the envelope of the lines $y=Cx+\frac1C$.`) }
  ],
  quiz: [
    { id: 't05.q1', q: L(R`$(y')^2=4$ tenglamaning darajasi va tartibi:`, R`Порядок и степень уравнения $(y')^2=4$:`, R`The order and degree of $(y')^2=4$:`),
      options: [L('1-tartib, 2-daraja', '1-й порядок, 2-я степень', 'order 1, degree 2'), L('2-tartib, 1-daraja', '2-й порядок, 1-я степень', 'order 2, degree 1'), L('2-tartib, 2-daraja', '2-й порядок, 2-я степень', 'order 2, degree 2'), L('1-tartib, 1-daraja', '1-й порядок, 1-я степень', 'order 1, degree 1')], correct: 0,
      explain: L(R`Eng yuqori hosila $y'$ (tartib 1), u kvadratda (daraja 2).`, R`Старшая производная $y'$ (порядок 1), она в квадрате (степень 2).`, R`The highest derivative is $y'$ (order 1), and it is squared (degree 2).`),
      why: [null, L('Tartib va daraja almashtirilgan.', 'Порядок и степень перепутаны.', 'Order and degree are swapped.'), L(R`Tenglamada $y''$ yo‘q.`, R`В уравнении нет $y''$.`, R`There is no $y''$.`), L(R`$y'$ kvadratda.`, R`$y'$ в квадрате.`, R`$y'$ is squared.`)] },
    { id: 't05.q2', q: L(R`Klero tenglamasining umumiy ko‘rinishi:`, R`Общий вид уравнения Клеро:`, R`The general form of Clairaut’s equation is:`),
      options: [L(R`$y=xy'+\psi(y')$`, R`$y=xy'+\psi(y')$`, R`$y=xy'+\psi(y')$`), L(R`$y=x\varphi(y')+\psi(y')$, $\varphi(p)\ne p$`, R`$y=x\varphi(y')+\psi(y')$, $\varphi(p)\ne p$`, R`$y=x\varphi(y')+\psi(y')$, $\varphi(p)\ne p$`), L(R`$y'+P(x)y=Q(x)y^n$`, R`$y'+P(x)y=Q(x)y^n$`, R`$y'+P(x)y=Q(x)y^n$`), L(R`$x=\varphi(y')$`, R`$x=\varphi(y')$`, R`$x=\varphi(y')$`)], correct: 0,
      explain: L(R`Klero — Lagranj tenglamasining $\varphi(p)=p$ bo‘lgan xususiy holi.`, R`Клеро — частный случай уравнения Лагранжа при $\varphi(p)=p$.`, R`Clairaut is the special case $\varphi(p)=p$ of Lagrange’s equation.`),
      why: [null, L('Bu Lagranj tenglamasi.', 'Это уравнение Лагранжа.', 'That is Lagrange’s equation.'), L('Bu Bernulli tenglamasi.', 'Это уравнение Бернулли.', 'That is Bernoulli’s equation.'), L('Bu parametr usuli bilan yechiladigan to‘liqmas tenglama.', 'Это неполное уравнение, решаемое методом параметра.', 'That is an incomplete equation solved by the parameter method.')] },
    { id: 't05.q3', q: L(R`$y=xy'+(y')^3$ ning umumiy yechimi:`, R`Общее решение $y=xy'+(y')^3$:`, R`The general solution of $y=xy'+(y')^3$ is:`),
      options: [L(R`$y=Cx+C^3$`, R`$y=Cx+C^3$`, R`$y=Cx+C^3$`), L(R`$y=Cx^3$`, R`$y=Cx^3$`, R`$y=Cx^3$`), L(R`$y=x^3+C$`, R`$y=x^3+C$`, R`$y=x^3+C$`), L(R`$y=Ce^{x}$`, R`$y=Ce^{x}$`, R`$y=Ce^{x}$`)], correct: 0,
      explain: L(R`Klero tenglamasida $y'\to C$: $y=Cx+C^3$. Tekshirish: $y'=C$ ✓.`, R`В уравнении Клеро $y'\to C$: $y=Cx+C^3$. Проверка: $y'=C$ ✓.`, R`In Clairaut’s equation $y'\to C$: $y=Cx+C^3$. Check: $y'=C$ ✓.`),
      why: [null, L(R`$y'=3Cx^2$, $xy'+(y')^3\ne Cx^3$.`, R`$y'=3Cx^2$, $xy'+(y')^3\ne Cx^3$.`, R`$y'=3Cx^2$, and $xy'+(y')^3\ne Cx^3$.`), L(R`$y'=3x^2$, qo‘ysak tenglik bajarilmaydi.`, R`$y'=3x^2$, подстановка не даёт тождества.`, R`$y'=3x^2$; substitution gives no identity.`), L(R`$y'=y$, lekin $xy+y^3\ne y$.`, R`$y'=y$, но $xy+y^3\ne y$.`, R`$y'=y$, but $xy+y^3\ne y$.`)] },
    { id: 't05.q4', q: L(R`$p$-diskriminant chiziq qaysi sistemadan topiladi?`, R`Из какой системы находится $p$-дискриминантная кривая?`, R`The $p$-discriminant curve comes from which system?`),
      options: [L(R`$F=0,\ \partial F/\partial p=0$`, R`$F=0,\ \partial F/\partial p=0$`, R`$F=0,\ \partial F/\partial p=0$`), L(R`$F=0,\ \partial F/\partial x=0$`, R`$F=0,\ \partial F/\partial x=0$`, R`$F=0,\ \partial F/\partial x=0$`), L(R`$\Phi=0,\ \partial\Phi/\partial C=0$`, R`$\Phi=0,\ \partial\Phi/\partial C=0$`, R`$\Phi=0,\ \partial\Phi/\partial C=0$`), L(R`$F=0,\ \partial F/\partial y=0$`, R`$F=0,\ \partial F/\partial y=0$`, R`$F=0,\ \partial F/\partial y=0$`)], correct: 0,
      explain: L(R`$p$ bo‘yicha hosila — chunki yagonalik $F_p=0$ bo‘lgan joyda buzilishi mumkin.`, R`Производная по $p$ — потому что единственность может нарушаться там, где $F_p=0$.`, R`The derivative in $p$, because uniqueness can fail only where $F_p=0$.`),
      why: [null, L(R`$x$ bo‘yicha hosila yagonalikka aloqador emas.`, R`Производная по $x$ не связана с единственностью.`, R`The derivative in $x$ has nothing to do with uniqueness.`), L(R`Bu $C$-diskriminant (umumiy integral orqali).`, R`Это $C$-дискриминант (через общий интеграл).`, R`That is the $C$-discriminant (from the general integral).`), L(R`$y$ bo‘yicha emas, $p$ bo‘yicha.`, R`Не по $y$, а по $p$.`, R`Not in $y$ but in $p$.`)] },
    { id: 't05.q5', q: L(R`$p$-diskriminant chiziq haqida qaysi gap to‘g‘ri?`, R`Какое утверждение о $p$-дискриминантной кривой верно?`, R`Which statement about the $p$-discriminant curve is true?`),
      options: [L('U har doim maxsus yechim', 'Она всегда особое решение', 'It is always a singular solution'), L('Maxsus yechim (bo‘lsa) uning tarkibida yotadi, lekin uni tekshirish kerak', 'Особое решение (если есть) лежит на ней, но её нужно проверять', 'A singular solution (if any) lies on it, but it must be checked'), L('U hech qachon yechim emas', 'Она никогда не является решением', 'It is never a solution'), L('U umumiy yechimdan $C=0$ da olinadi', 'Она получается из общего решения при $C=0$', 'It is obtained from the general solution at $C=0$')], correct: 1,
      explain: L(R`Bu zaruriy shart, yetarli emas: shox yechim bo‘lmasligi yoki maxsus bo‘lmasligi mumkin.`, R`Это необходимое, но не достаточное условие: ветвь может не быть решением или не быть особой.`, R`This is a necessary but not sufficient condition: a branch may fail to be a solution or fail to be singular.`),
      why: [L(R`$y=2xy'-(y')^2$ uchun $y=x^2$ hatto yechim emas.`, R`Для $y=2xy'-(y')^2$ кривая $y=x^2$ даже не решение.`, R`For $y=2xy'-(y')^2$, $y=x^2$ is not even a solution.`), null, L(R`$(y')^2=4y$ uchun $y=0$ yechim (va maxsus).`, R`Для $(y')^2=4y$ $y=0$ — решение (и особое).`, R`For $(y')^2=4y$, $y=0$ is a solution (and singular).`), L('Maxsus yechim odatda hech qanday $C$ da olinmaydi.', 'Особое решение обычно не получается ни при каком $C$.', 'A singular solution is usually not obtained for any $C$.')] },
    { id: 't05.q6', q: L(R`$y=xy'-(y')^2$ ning maxsus yechimi:`, R`Особое решение уравнения $y=xy'-(y')^2$:`, R`The singular solution of $y=xy'-(y')^2$ is:`),
      options: [L(R`$y=\frac{x^2}{4}$`, R`$y=\frac{x^2}{4}$`, R`$y=\frac{x^2}{4}$`), L(R`$y=-\frac{x^2}{4}$`, R`$y=-\frac{x^2}{4}$`, R`$y=-\frac{x^2}{4}$`), L(R`$y=0$`, R`$y=0$`, R`$y=0$`), L(R`$y=x^2$`, R`$y=x^2$`, R`$y=x^2$`)], correct: 0,
      explain: L(R`$x-2p=0$, $p=\frac x2$, $y=\frac{x^2}{2}-\frac{x^2}{4}=\frac{x^2}{4}$.`, R`$x-2p=0$, $p=\frac x2$, $y=\frac{x^2}{2}-\frac{x^2}{4}=\frac{x^2}{4}$.`, R`$x-2p=0$, $p=\frac x2$, $y=\frac{x^2}{2}-\frac{x^2}{4}=\frac{x^2}{4}$.`),
      why: [null, L(R`Bu $y=xy'+(y')^2$ uchun javob.`, R`Это ответ для $y=xy'+(y')^2$.`, R`That is the answer for $y=xy'+(y')^2$.`), L(R`$y=0$ — $C=0$ dagi xususiy yechim.`, R`$y=0$ — частное решение при $C=0$.`, R`$y=0$ is the particular solution with $C=0$.`), L(R`$x\cdot2x-4x^2=-2x^2\ne x^2$.`, R`$x\cdot2x-4x^2=-2x^2\ne x^2$.`, R`$x\cdot2x-4x^2=-2x^2\ne x^2$.`)] },
    { id: 't05.q7', q: L(R`Lagranj tenglamasi $y=x\varphi(p)+\psi(p)$ differensiallangandan keyin $x(p)$ uchun qanday tenglama chiqadi?`, R`Какое уравнение для $x(p)$ получается после дифференцирования уравнения Лагранжа $y=x\varphi(p)+\psi(p)$?`, R`After differentiating Lagrange’s equation $y=x\varphi(p)+\psi(p)$, what kind of equation do we get for $x(p)$?`),
      options: [L('Chiziqli', 'Линейное', 'Linear'), L('Bernulli', 'Бернулли', 'Bernoulli'), L('Rikkati', 'Риккати', 'Riccati'), L('Ikkinchi tartibli', 'Второго порядка', 'Second order')], correct: 0,
      explain: L(R`$(p-\varphi(p))\,x'(p)-\varphi'(p)\,x=\psi'(p)$ — $x$ ga nisbatan chiziqli.`, R`$(p-\varphi(p))\,x'(p)-\varphi'(p)\,x=\psi'(p)$ — линейное относительно $x$.`, R`$(p-\varphi(p))\,x'(p)-\varphi'(p)\,x=\psi'(p)$ is linear in $x$.`),
      why: [null, L(R`$x$ ning darajasi yo‘q.`, R`Нет степени $x$.`, R`There is no power of $x$.`), L(R`$x^2$ hadi yo‘q.`, R`Нет члена $x^2$.`, R`There is no $x^2$ term.`), L('Faqat birinchi hosila qatnashadi.', 'Входит только первая производная.', 'Only a first derivative appears.')] },
    { id: 't05.q8', q: L(R`$(y')^2=y^3$ uchun $y=0$:`, R`Для $(y')^2=y^3$ решение $y=0$:`, R`For $(y')^2=y^3$, the function $y=0$ is:`),
      options: [L('maxsus yechim', 'особое решение', 'a singular solution'), L('yechim, lekin maxsus emas', 'решение, но не особое', 'a solution but not singular'), L('yechim emas', 'не решение', 'not a solution'), L('umumiy yechim', 'общее решение', 'the general solution')], correct: 1,
      explain: L(R`$y=0$ yechim, lekin $y=\frac4{(x-C)^2}$ egri chiziqlar unga urinmaydi; $y^{3/2}$ Lipshits sharti bajariladi.`, R`$y=0$ — решение, но кривые $y=\frac4{(x-C)^2}$ его не касаются; для $y^{3/2}$ условие Липшица выполнено.`, R`$y=0$ is a solution, but the curves $y=\frac4{(x-C)^2}$ never touch it; $y^{3/2}$ is Lipschitz.`),
      why: [L('Uning nuqtalarida yagonalik buzilmaydi.', 'В его точках единственность не нарушается.', 'Uniqueness does not fail at its points.'), null, L(R`$0=0^3$ ✓ — yechim.`, R`$0=0^3$ ✓ — решение.`, R`$0=0^3$ ✓, it is a solution.`), L('Unda ixtiyoriy o‘zgarmas yo‘q.', 'В нём нет произвольной постоянной.', 'It contains no arbitrary constant.')] },
    { id: 't05.q9', q: L(R`$x=\varphi(y')$ tenglamada $y$ qanday topiladi?`, R`Как находится $y$ в уравнении $x=\varphi(y')$?`, R`How is $y$ found in $x=\varphi(y')$?`),
      options: [L(R`$y=\int p\,\varphi'(p)\,dp+C$`, R`$y=\int p\,\varphi'(p)\,dp+C$`, R`$y=\int p\,\varphi'(p)\,dp+C$`), L(R`$y=\int \varphi(p)\,dp+C$`, R`$y=\int \varphi(p)\,dp+C$`, R`$y=\int \varphi(p)\,dp+C$`), L(R`$y=\int \frac{\varphi'(p)}{p}\,dp+C$`, R`$y=\int \frac{\varphi'(p)}{p}\,dp+C$`, R`$y=\int \frac{\varphi'(p)}{p}\,dp+C$`), L(R`$y=p\,\varphi(p)$`, R`$y=p\,\varphi(p)$`, R`$y=p\,\varphi(p)$`)], correct: 0,
      explain: L(R`$dy=p\,dx$ va $dx=\varphi'(p)\,dp$.`, R`$dy=p\,dx$ и $dx=\varphi'(p)\,dp$.`, R`$dy=p\,dx$ and $dx=\varphi'(p)\,dp$.`),
      why: [null, L(R`$dy=p\,dx$ ishlatilmagan.`, R`Не использовано $dy=p\,dx$.`, R`$dy=p\,dx$ was not used.`), L(R`Bu $dx=p\,dy$ deb noto‘g‘ri olingan.`, R`Здесь ошибочно взято $dx=p\,dy$.`, R`This wrongly uses $dx=p\,dy$.`), L('Integrallash tushib qolgan.', 'Пропущено интегрирование.', 'The integration is missing.')] },
    { id: 't05.q10', q: L(R`Klero tenglamasi $y=xy'+\psi(y')$ ning maxsus yechimi geometrik jihatdan nima?`, R`Что геометрически представляет собой особое решение уравнения Клеро $y=xy'+\psi(y')$?`, R`Geometrically, what is the singular solution of Clairaut’s equation $y=xy'+\psi(y')$?`),
      options: [L(R`$y=Cx+\psi(C)$ chiziqlar oilasining o‘ramasi`, R`Огибающая семейства прямых $y=Cx+\psi(C)$`, R`The envelope of the lines $y=Cx+\psi(C)$`), L(R`$C=0$ dagi chiziq`, R`Прямая при $C=0$`, R`The line with $C=0$`), L('Koordinata o‘qi', 'Ось координат', 'A coordinate axis'), L('Izoklina', 'Изоклина', 'An isocline')], correct: 0,
      explain: L(R`U har bir nuqtasida oilaning bitta chizig‘iga urinadi.`, R`В каждой своей точке она касается одной из прямых семейства.`, R`At each of its points it touches one line of the family.`),
      why: [null, L('Bu oddiy xususiy yechim.', 'Это обычное частное решение.', 'That is an ordinary particular solution.'), L('Umuman olganda yo‘q.', 'В общем случае нет.', 'Not in general.'), L('Izoklina — og‘ish o‘zgarmas bo‘lgan chiziq, yechim emas.', 'Изоклина — линия постоянного наклона, а не решение.', 'An isocline is a curve of constant slope, not a solution.')] }
  ]
});
})();
