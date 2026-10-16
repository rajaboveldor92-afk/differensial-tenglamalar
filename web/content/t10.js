(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't10', num: 10,
  title: L('O‘zgarmaslarni variatsiyalash. Ostrogradskiy–Liuvill formulasi', 'Вариация постоянных. Формула Остроградского–Лиувилля', 'Variation of parameters. The Abel–Liouville formula'),
  syllabus: { lecture: 'M10', seminar: 'S10', outcomes: ['TN3'], independent: [9] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L('O‘zgarmaslarni variatsiyalash usuli bilan ikkinchi tartibli bir jinsli bo‘lmagan tenglamaning xususiy yechimini topa olasiz.', 'Находить частное решение неоднородного уравнения второго порядка методом вариации постоянных.', 'Find a particular solution of a second-order nonhomogeneous equation by variation of parameters.'),
    L(R`$n$-tartibli tenglama uchun $C_k'(x)$ larga nisbatan Vronskian sistemasini tuza va yecha olasiz.`, R`Составлять и решать систему с вронскианом относительно $C_k'(x)$ для уравнения $n$-го порядка.`, R`Set up and solve the Wronskian system for $C_k'(x)$ for an $n$-th order equation.`),
    L('Noma’lum koeffitsiyentlar va variatsiya usullarini taqqoslab, mos usulni tanlay olasiz.', 'Сравнивать метод неопределённых коэффициентов и вариацию постоянных и выбирать подходящий.', 'Compare undetermined coefficients with variation of parameters and choose the right one.'),
    L('Ostrogradskiy–Liuvill (Abel) formulasi bilan Vronskianni tenglamani yechmasdan topa olasiz.', 'Находить вронскиан по формуле Остроградского–Лиувилля (Абеля), не решая уравнения.', 'Find the Wronskian from the Abel–Liouville formula without solving the equation.'),
    L('Bitta ma’lum yechim bo‘yicha ikkinchi chiziqli erkli yechimni topa olasiz.', 'Находить второе линейно независимое решение по одному известному.', 'Find a second linearly independent solution from a known one.')
  ],
  prereqKnowledge: [
    L('Vronskian, fundamental sistema va umumiy yechimning tuzilishi (7- va 9-mavzular).', 'Вронскиан, фундаментальная система и структура общего решения (темы 7 и 9).', 'The Wronskian, fundamental sets and the structure of the general solution (topics 7 and 9).'),
    L('Kramer qoidasi va $2\\times2$, $3\\times3$ determinantlar.', 'Правило Крамера и определители $2\\times2$, $3\\times3$.', 'Cramer’s rule and $2\\times2$, $3\\times3$ determinants.'),
    L('Integrallash usullari: bo‘laklab integrallash, oddiy kasrlarga ajratish.', 'Методы интегрирования: по частям, разложение на простейшие дроби.', 'Integration techniques: by parts and partial fractions.')
  ],
  sources: [
    { id: 'dilmurodov', ref: '§6.4–§6.5', verified: true },
    { id: 'ergashev', ref: '2.4, 3.1', verified: true },
    { id: 'kohler', ref: '3.4, 3.9, 3.11, 3.13', verified: true },
    { id: 'logan', ref: '2.4.2–2.4.3', verified: true },
    { id: 'goode', ref: '8.7, 8.9', verified: true },
    { id: 'filippov', ref: '§11', verified: false },
    { id: 'boyce', ref: '§3.6, §4.4', verified: false }
  ],
  labs: ['L06'],
  lessons: [
    {
      id: 't10.1',
      title: L('Ikkinchi tartib uchun variatsiya usuli', 'Метод вариации для второго порядка', 'Variation of parameters for second order'),
      blocks: [
        { type: 'intro', title: L('Jadvalda yo‘q o‘ng tomon', 'Правой части нет в таблице', 'A right side that is not in the table'),
          body: L(R`Prujinaga ta’sir qiluvchi kuch $F(t)=\dfrac{1}{\cos t}$ bo‘lsin ($|t|<\pi/2$, $t\to\pm\pi/2$ da kuch keskin oshadi):
$$y''+y=\frac{1}{\cos t}.$$
9-mavzudagi jadvaldan ko‘rinish tanlab ko‘ring: $\frac{1}{\cos t}$ kvaziko‘phad emas, uning hosilalari $\frac{\sin t}{\cos^2t}$, $\frac{1+\sin^2t}{\cos^3t},\dots$ — har safar yangi funksiya. Chekli “taxmin” yo‘q.

G‘oya: bir jinsli yechim $C_1\cos t+C_2\sin t$ dagi **o‘zgarmaslarni funksiyaga aylantiramiz**: $y=C_1(t)\cos t+C_2(t)\sin t$. Ikki noma’lum funksiya uchun ikkita shart qo‘yish erkinligimiz bor.`,
          R`Пусть на пружину действует сила $F(t)=\dfrac{1}{\cos t}$ ($|t|<\pi/2$, при $t\to\pm\pi/2$ сила резко растёт):
$$y''+y=\frac{1}{\cos t}.$$
Попробуйте выбрать вид по таблице из темы 9: $\frac{1}{\cos t}$ не квазимногочлен, её производные $\frac{\sin t}{\cos^2t}$, $\frac{1+\sin^2t}{\cos^3t},\dots$ — каждый раз новая функция. Конечной «догадки» нет.

Идея: **превратим постоянные** в однородном решении $C_1\cos t+C_2\sin t$ **в функции**: $y=C_1(t)\cos t+C_2(t)\sin t$. Для двух неизвестных функций мы вправе наложить два условия.`,
          R`Let a spring be driven by the force $F(t)=\dfrac{1}{\cos t}$ ($|t|<\pi/2$; the force grows sharply as $t\to\pm\pi/2$):
$$y''+y=\frac{1}{\cos t}.$$
Try to pick a form from the table of topic 9: $\frac{1}{\cos t}$ is not a quasi-polynomial, and its derivatives $\frac{\sin t}{\cos^2t}$, $\frac{1+\sin^2t}{\cos^3t},\dots$ keep producing new functions. No finite guess exists.

Idea: **turn the constants** of the homogeneous solution $C_1\cos t+C_2\sin t$ **into functions**: $y=C_1(t)\cos t+C_2(t)\sin t$. Two unknown functions leave us free to impose two conditions.`) },
        { type: 'thm', title: L('O‘zgarmaslarni variatsiyalash (n = 2)', 'Вариация постоянных (n = 2)', 'Variation of parameters (n = 2)'),
          conds: L(R`1. Tenglama **normallashgan** ko‘rinishda: $y''+p(x)y'+q(x)y=f(x)$ (bosh koeffitsiyent $1$);
2. $p$, $q$, $f$ $I$ oraliqda uzluksiz;
3. $y_1$, $y_2$ — bir jinsli tenglamaning $I$ dagi fundamental sistemasi, $W=y_1y_2'-y_1'y_2\ne0$.`,
          R`1. Уравнение записано в **приведённом** виде: $y''+p(x)y'+q(x)y=f(x)$ (старший коэффициент $1$);
2. $p$, $q$, $f$ непрерывны на интервале $I$;
3. $y_1$, $y_2$ — фундаментальная система однородного уравнения на $I$, $W=y_1y_2'-y_1'y_2\ne0$.`,
          R`1. The equation is in **normalised** form: $y''+p(x)y'+q(x)y=f(x)$ (leading coefficient $1$);
2. $p$, $q$, $f$ are continuous on an interval $I$;
3. $y_1$, $y_2$ is a fundamental set of the homogeneous equation on $I$, $W=y_1y_2'-y_1'y_2\ne0$.`),
          body: L(R`$y=C_1(x)y_1+C_2(x)y_2$ yechim bo‘ladi, agar
$$\begin{cases}C_1'y_1+C_2'y_2=0,\\ C_1'y_1'+C_2'y_2'=f.\end{cases}\qquad C_1'=-\frac{y_2f}{W},\quad C_2'=\frac{y_1f}{W}.$$
Demak, xususiy yechim
$$y_p=-y_1\int\frac{y_2f}{W}\,dx+y_2\int\frac{y_1f}{W}\,dx,$$
integrallardagi o‘zgarmaslar esa $y_h$ ni beradi.`,
          R`$y=C_1(x)y_1+C_2(x)y_2$ является решением, если
$$\begin{cases}C_1'y_1+C_2'y_2=0,\\ C_1'y_1'+C_2'y_2'=f.\end{cases}\qquad C_1'=-\frac{y_2f}{W},\quad C_2'=\frac{y_1f}{W}.$$
Значит, частное решение
$$y_p=-y_1\int\frac{y_2f}{W}\,dx+y_2\int\frac{y_1f}{W}\,dx,$$
а постоянные интегрирования дают $y_h$.`,
          R`$y=C_1(x)y_1+C_2(x)y_2$ is a solution provided
$$\begin{cases}C_1'y_1+C_2'y_2=0,\\ C_1'y_1'+C_2'y_2'=f.\end{cases}\qquad C_1'=-\frac{y_2f}{W},\quad C_2'=\frac{y_1f}{W}.$$
Hence a particular solution is
$$y_p=-y_1\int\frac{y_2f}{W}\,dx+y_2\int\frac{y_1f}{W}\,dx,$$
and the constants of integration give $y_h$.`) },
        { type: 'proof', body: L(R`Birinchi shart tufayli $y'=C_1y_1'+C_2y_2'$ — unda $C_k'$ yo‘q, shuning uchun $y''=C_1y_1''+C_2y_2''+C_1'y_1'+C_2'y_2'$. Tenglamaga qo‘yamiz: $C_1(y_1''+py_1'+qy_1)+C_2(y_2''+py_2'+qy_2)+C_1'y_1'+C_2'y_2'=f$. Qavslar nolga teng, qolgani ikkinchi shart. Sistema determinanti $W\ne0$, Kramer qoidasi formulani beradi (Dilmuradov, §6.5).`,
          R`Благодаря первому условию $y'=C_1y_1'+C_2y_2'$ — без $C_k'$, поэтому $y''=C_1y_1''+C_2y_2''+C_1'y_1'+C_2'y_2'$. Подставляем: $C_1(y_1''+py_1'+qy_1)+C_2(y_2''+py_2'+qy_2)+C_1'y_1'+C_2'y_2'=f$. Скобки равны нулю, остаётся второе условие. Определитель системы $W\ne0$, правило Крамера даёт формулу (Дилмурадов, §6.5).`,
          R`The first condition makes $y'=C_1y_1'+C_2y_2'$ free of $C_k'$, so $y''=C_1y_1''+C_2y_2''+C_1'y_1'+C_2'y_2'$. Substitute: $C_1(y_1''+py_1'+qy_1)+C_2(y_2''+py_2'+qy_2)+C_1'y_1'+C_2'y_2'=f$. The brackets vanish and the second condition remains. The system determinant is $W\ne0$, and Cramer’s rule gives the formula (Dilmuradov, §6.5).`) },
        { type: 'example', title: L('Prujina va 1/cos x kuch', 'Пружина и сила 1/cos x', 'A spring driven by 1/cos x'),
          body: L(R`$y''+y=\dfrac{1}{\cos x}$, $x\in(-\pi/2,\pi/2)$.`, R`$y''+y=\dfrac{1}{\cos x}$, $x\in(-\pi/2,\pi/2)$.`, R`$y''+y=\dfrac{1}{\cos x}$, $x\in(-\pi/2,\pi/2)$.`),
          steps: [
            L(R`$y_1=\cos x$, $y_2=\sin x$, $W=\cos^2x+\sin^2x=1$.`, R`$y_1=\cos x$, $y_2=\sin x$, $W=\cos^2x+\sin^2x=1$.`, R`$y_1=\cos x$, $y_2=\sin x$, $W=\cos^2x+\sin^2x=1$.`),
            L(R`$C_1'=-\dfrac{\sin x}{\cos x}$, $C_1=\ln\cos x+c_1$ (bu oraliqda $\cos x>0$).`, R`$C_1'=-\dfrac{\sin x}{\cos x}$, $C_1=\ln\cos x+c_1$ (на этом интервале $\cos x>0$).`, R`$C_1'=-\dfrac{\sin x}{\cos x}$, $C_1=\ln\cos x+c_1$ (on this interval $\cos x>0$).`),
            L(R`$C_2'=\dfrac{\cos x}{\cos x}=1$, $C_2=x+c_2$.`, R`$C_2'=\dfrac{\cos x}{\cos x}=1$, $C_2=x+c_2$.`, R`$C_2'=\dfrac{\cos x}{\cos x}=1$, $C_2=x+c_2$.`),
            L(R`$y=c_1\cos x+c_2\sin x+\cos x\,\ln\cos x+x\sin x$.`, R`$y=c_1\cos x+c_2\sin x+\cos x\,\ln\cos x+x\sin x$.`, R`$y=c_1\cos x+c_2\sin x+\cos x\,\ln\cos x+x\sin x$.`)
          ],
          check: L(R`$y_p=\cos x\ln\cos x+x\sin x$ uchun $y_p''+y_p-\dfrac1{\cos x}\equiv0$ ✓.`, R`для $y_p=\cos x\ln\cos x+x\sin x$ имеем $y_p''+y_p-\dfrac1{\cos x}\equiv0$ ✓.`, R`for $y_p=\cos x\ln\cos x+x\sin x$ we get $y_p''+y_p-\dfrac1{\cos x}\equiv0$ ✓.`) },
        { type: 'example', title: L('Karrali ildiz va e^x/x', 'Кратный корень и e^x/x', 'A double root and e^x/x'),
          body: L(R`$y''-2y'+y=\dfrac{e^x}{x}$, $x>0$.`, R`$y''-2y'+y=\dfrac{e^x}{x}$, $x>0$.`, R`$y''-2y'+y=\dfrac{e^x}{x}$, $x>0$.`),
          steps: [
            L(R`$(r-1)^2=0$: $y_1=e^x$, $y_2=xe^x$, $W=e^x(e^x+xe^x)-e^x\cdot xe^x=e^{2x}$.`, R`$(r-1)^2=0$: $y_1=e^x$, $y_2=xe^x$, $W=e^x(e^x+xe^x)-e^x\cdot xe^x=e^{2x}$.`, R`$(r-1)^2=0$: $y_1=e^x$, $y_2=xe^x$, $W=e^x(e^x+xe^x)-e^x\cdot xe^x=e^{2x}$.`),
            L(R`$C_1'=-\dfrac{xe^x\cdot e^x/x}{e^{2x}}=-1$, $C_1=-x$; $C_2'=\dfrac{e^x\cdot e^x/x}{e^{2x}}=\dfrac1x$, $C_2=\ln x$.`, R`$C_1'=-\dfrac{xe^x\cdot e^x/x}{e^{2x}}=-1$, $C_1=-x$; $C_2'=\dfrac{e^x\cdot e^x/x}{e^{2x}}=\dfrac1x$, $C_2=\ln x$.`, R`$C_1'=-\dfrac{xe^x\cdot e^x/x}{e^{2x}}=-1$, $C_1=-x$; $C_2'=\dfrac{e^x\cdot e^x/x}{e^{2x}}=\dfrac1x$, $C_2=\ln x$.`),
            L(R`$y_p=-xe^x+xe^x\ln x$. $-xe^x$ hadi $y_h$ ga kiradi, uni tashlab yuborish mumkin.`, R`$y_p=-xe^x+xe^x\ln x$. Член $-xe^x$ входит в $y_h$, его можно отбросить.`, R`$y_p=-xe^x+xe^x\ln x$. The term $-xe^x$ belongs to $y_h$ and can be dropped.`),
            L(R`$y=(C_1+C_2x)e^x+xe^x\ln x$, $x>0$.`, R`$y=(C_1+C_2x)e^x+xe^x\ln x$, $x>0$.`, R`$y=(C_1+C_2x)e^x+xe^x\ln x$, $x>0$.`)
          ],
          check: L(R`$(xe^x\ln x)''-2(xe^x\ln x)'+xe^x\ln x=\dfrac{e^x}{x}$ ✓.`, R`$(xe^x\ln x)''-2(xe^x\ln x)'+xe^x\ln x=\dfrac{e^x}{x}$ ✓.`, R`$(xe^x\ln x)''-2(xe^x\ln x)'+xe^x\ln x=\dfrac{e^x}{x}$ ✓.`) },
        { type: 'example', title: L('O‘zgaruvchan koeffitsiyentlar: avval normallashtiring', 'Переменные коэффициенты: сначала приведите уравнение', 'Variable coefficients: normalise first'),
          body: L(R`$x^2y''-2xy'+2y=x^3$, $x>0$. Bir jinsli tenglamaning yechimlari $y_1=x$, $y_2=x^2$ ma’lum.`, R`$x^2y''-2xy'+2y=x^3$, $x>0$. Известны решения однородного уравнения $y_1=x$, $y_2=x^2$.`, R`$x^2y''-2xy'+2y=x^3$, $x>0$. The homogeneous solutions $y_1=x$, $y_2=x^2$ are known.`),
          steps: [
            L(R`$x^2$ ga bo‘lamiz: $y''-\dfrac2xy'+\dfrac2{x^2}y=x$. Demak, $f=x$ (**$x^3$ emas!**).`, R`Делим на $x^2$: $y''-\dfrac2xy'+\dfrac2{x^2}y=x$. Значит, $f=x$ (**а не $x^3$!**).`, R`Divide by $x^2$: $y''-\dfrac2xy'+\dfrac2{x^2}y=x$. So $f=x$ (**not $x^3$!**).`),
            L(R`$W=x\cdot2x-1\cdot x^2=x^2$.`, R`$W=x\cdot2x-1\cdot x^2=x^2$.`, R`$W=x\cdot2x-1\cdot x^2=x^2$.`),
            L(R`$C_1'=-\dfrac{x^2\cdot x}{x^2}=-x$, $C_1=-\dfrac{x^2}2$; $C_2'=\dfrac{x\cdot x}{x^2}=1$, $C_2=x$.`, R`$C_1'=-\dfrac{x^2\cdot x}{x^2}=-x$, $C_1=-\dfrac{x^2}2$; $C_2'=\dfrac{x\cdot x}{x^2}=1$, $C_2=x$.`, R`$C_1'=-\dfrac{x^2\cdot x}{x^2}=-x$, $C_1=-\dfrac{x^2}2$; $C_2'=\dfrac{x\cdot x}{x^2}=1$, $C_2=x$.`),
            L(R`$y_p=-\dfrac{x^3}2+x^3=\dfrac{x^3}2$; $y=C_1x+C_2x^2+\dfrac{x^3}{2}$.`, R`$y_p=-\dfrac{x^3}2+x^3=\dfrac{x^3}2$; $y=C_1x+C_2x^2+\dfrac{x^3}{2}$.`, R`$y_p=-\dfrac{x^3}2+x^3=\dfrac{x^3}2$; $y=C_1x+C_2x^2+\dfrac{x^3}{2}$.`)
          ],
          check: L(R`$x^2\cdot3x-2x\cdot\frac32x^2+2\cdot\frac{x^3}2=3x^3-3x^3+x^3=x^3$ ✓. (Agar $f=x^3$ olinsa, $y_p=\frac{x^5}{12}$ chiqadi va u tenglamani qanoatlantirmaydi.)`, R`$x^2\cdot3x-2x\cdot\frac32x^2+2\cdot\frac{x^3}2=3x^3-3x^3+x^3=x^3$ ✓. (Если взять $f=x^3$, получится $y_p=\frac{x^5}{12}$, которое уравнению не удовлетворяет.)`, R`$x^2\cdot3x-2x\cdot\frac32x^2+2\cdot\frac{x^3}2=3x^3-3x^3+x^3=x^3$ ✓. (Taking $f=x^3$ would give $y_p=\frac{x^5}{12}$, which does not satisfy the equation.)`) },
        { type: 'warn', body: L(R`Variatsiya formulalari $y''+py'+qy=f$ uchun chiqarilgan. Tenglama $a_0(x)y''+a_1(x)y'+a_2(x)y=g(x)$ ko‘rinishida bo‘lsa, **avval $a_0$ ga bo‘ling**: $f=g/a_0$. Bu eng ko‘p uchraydigan xato.`,
          R`Формулы вариации выведены для $y''+py'+qy=f$. Если уравнение имеет вид $a_0(x)y''+a_1(x)y'+a_2(x)y=g(x)$, **сначала разделите на $a_0$**: $f=g/a_0$. Это самая частая ошибка.`,
          R`The variation formulas were derived for $y''+py'+qy=f$. If the equation is $a_0(x)y''+a_1(x)y'+a_2(x)y=g(x)$, **divide by $a_0$ first**: $f=g/a_0$. This is the most common mistake.`) }
      ]
    },
    {
      id: 't10.2',
      title: L('Umumiy n-hol va usullarni taqqoslash', 'Общий случай n и сравнение методов', 'The general n case and comparing methods'),
      blocks: [
        { type: 'thm', title: L('Variatsiya usuli: n-tartib', 'Вариация постоянных: порядок n', 'Variation of parameters: order n'),
          conds: L(R`1. $y^{(n)}+a_1(x)y^{(n-1)}+\dots+a_n(x)y=f(x)$, $a_k$ va $f$ $I$ da uzluksiz;
2. $y_1,\dots,y_n$ — bir jinsli tenglamaning $I$ dagi fundamental sistemasi.`,
          R`1. $y^{(n)}+a_1(x)y^{(n-1)}+\dots+a_n(x)y=f(x)$, $a_k$ и $f$ непрерывны на $I$;
2. $y_1,\dots,y_n$ — фундаментальная система однородного уравнения на $I$.`,
          R`1. $y^{(n)}+a_1(x)y^{(n-1)}+\dots+a_n(x)y=f(x)$ with $a_k$ and $f$ continuous on $I$;
2. $y_1,\dots,y_n$ is a fundamental set of the homogeneous equation on $I$.`),
          body: L(R`$y=\sum C_k(x)y_k$ yechim bo‘ladi, agar $C_k'$ lar quyidagi sistemani qanoatlantirsa:
$$\sum_{k=1}^nC_k'y_k^{(j)}=0\quad(j=0,\dots,n-2),\qquad\sum_{k=1}^nC_k'y_k^{(n-1)}=f.$$
Sistema matritsasining determinanti Vronskian $W\ne0$; Kramer qoidasi bo‘yicha $C_k'=\dfrac{W_k}{W}$, bu yerda $W_k$ — $W$ ning $k$-ustuni $(0,\dots,0,f)^T$ bilan almashtirilgan determinant.`,
          R`$y=\sum C_k(x)y_k$ — решение, если $C_k'$ удовлетворяют системе
$$\sum_{k=1}^nC_k'y_k^{(j)}=0\quad(j=0,\dots,n-2),\qquad\sum_{k=1}^nC_k'y_k^{(n-1)}=f.$$
Определитель её матрицы — вронскиан $W\ne0$; по правилу Крамера $C_k'=\dfrac{W_k}{W}$, где $W_k$ — определитель $W$ с $k$-м столбцом, заменённым на $(0,\dots,0,f)^T$.`,
          R`$y=\sum C_k(x)y_k$ is a solution if the $C_k'$ satisfy
$$\sum_{k=1}^nC_k'y_k^{(j)}=0\quad(j=0,\dots,n-2),\qquad\sum_{k=1}^nC_k'y_k^{(n-1)}=f.$$
The determinant of its matrix is the Wronskian $W\ne0$; by Cramer’s rule $C_k'=\dfrac{W_k}{W}$, where $W_k$ is $W$ with its $k$-th column replaced by $(0,\dots,0,f)^T$.`) },
        { type: 'example', title: L('Uchinchi tartibli misol', 'Пример третьего порядка', 'A third-order example'),
          body: L(R`$y'''+y'=\dfrac1{\cos x}$, $x\in(-\pi/2,\pi/2)$.`, R`$y'''+y'=\dfrac1{\cos x}$, $x\in(-\pi/2,\pi/2)$.`, R`$y'''+y'=\dfrac1{\cos x}$, $x\in(-\pi/2,\pi/2)$.`),
          steps: [
            L(R`$r(r^2+1)=0$: $y_1=1$, $y_2=\cos x$, $y_3=\sin x$. $W=\begin{vmatrix}1&\cos x&\sin x\\0&-\sin x&\cos x\\0&-\cos x&-\sin x\end{vmatrix}=1$.`, R`$r(r^2+1)=0$: $y_1=1$, $y_2=\cos x$, $y_3=\sin x$. $W=\begin{vmatrix}1&\cos x&\sin x\\0&-\sin x&\cos x\\0&-\cos x&-\sin x\end{vmatrix}=1$.`, R`$r(r^2+1)=0$: $y_1=1$, $y_2=\cos x$, $y_3=\sin x$. $W=\begin{vmatrix}1&\cos x&\sin x\\0&-\sin x&\cos x\\0&-\cos x&-\sin x\end{vmatrix}=1$.`),
            L(R`Sistemaning yechimi: $C_1'=\dfrac1{\cos x}$, $C_2'=-1$, $C_3'=-\tan x$.`, R`Решение системы: $C_1'=\dfrac1{\cos x}$, $C_2'=-1$, $C_3'=-\tan x$.`, R`Solving the system: $C_1'=\dfrac1{\cos x}$, $C_2'=-1$, $C_3'=-\tan x$.`),
            L(R`Integrallaymiz: $C_1=\ln\Big(\dfrac1{\cos x}+\tan x\Big)$, $C_2=-x$, $C_3=\ln\cos x$.`, R`Интегрируем: $C_1=\ln\Big(\dfrac1{\cos x}+\tan x\Big)$, $C_2=-x$, $C_3=\ln\cos x$.`, R`Integrate: $C_1=\ln\Big(\dfrac1{\cos x}+\tan x\Big)$, $C_2=-x$, $C_3=\ln\cos x$.`),
            L(R`$y=C_1+C_2\cos x+C_3\sin x+\ln\Big(\dfrac1{\cos x}+\tan x\Big)-x\cos x+\sin x\ln\cos x$.`, R`$y=C_1+C_2\cos x+C_3\sin x+\ln\Big(\dfrac1{\cos x}+\tan x\Big)-x\cos x+\sin x\ln\cos x$.`, R`$y=C_1+C_2\cos x+C_3\sin x+\ln\Big(\dfrac1{\cos x}+\tan x\Big)-x\cos x+\sin x\ln\cos x$.`)
          ],
          check: L(R`$y_p'''+y_p'-\dfrac1{\cos x}\equiv0$ ✓ (soddalashtirilgan va $x=0{,}3$, $x=-1{,}1$ nuqtalarda sonli tekshirilgan).`, R`$y_p'''+y_p'-\dfrac1{\cos x}\equiv0$ ✓ (упрощением и численно в точках $x=0{,}3$, $x=-1{,}1$).`, R`$y_p'''+y_p'-\dfrac1{\cos x}\equiv0$ ✓ (by simplification and numerically at $x=0.3$, $x=-1.1$).`) },
        { type: 'note', title: L('Ikki usulni taqqoslash', 'Сравнение двух методов', 'Comparing the two methods'),
          body: L(R`**Noma’lum koeffitsiyentlar usuli (NK)**
- Tenglama: faqat o‘zgarmas koeffitsiyentli.
- O‘ng tomon: faqat kvaziko‘phad (va ularning yig‘indisi).
- Ish: algebraik — chiziqli sistema, integral yo‘q.
- Xavf: rezonansda $x^s$ ni unutish.

**O‘zgarmaslarni variatsiyalash (OV)**
- Tenglama: istalgan chiziqli, koeffitsiyentlar o‘zgaruvchan bo‘lishi mumkin.
- O‘ng tomon: istalgan uzluksiz $f$.
- Ish: $y_1,\dots,y_n$ oldindan ma’lum bo‘lishi va integrallar hisoblanishi kerak.
- Xavf: normallashtirmaslik; integral elementar bo‘lmasligi mumkin.

Qoida: o‘ng tomon kvaziko‘phad bo‘lsa — NK tezroq; aks holda — OV.`,
          R`**Метод неопределённых коэффициентов (НК)**
- Уравнение: только с постоянными коэффициентами.
- Правая часть: только квазимногочлен (и их суммы).
- Работа: алгебраическая — линейная система, без интегралов.
- Риск: забыть $x^s$ при резонансе.

**Вариация постоянных (ВП)**
- Уравнение: любое линейное, коэффициенты могут быть переменными.
- Правая часть: любая непрерывная $f$.
- Работа: нужно заранее знать $y_1,\dots,y_n$ и вычислить интегралы.
- Риск: не привести уравнение; интеграл может оказаться неэлементарным.

Правило: правая часть — квазимногочлен — быстрее НК; иначе — ВП.`,
          R`**Undetermined coefficients (UC)**
- Equation: constant coefficients only.
- Right side: quasi-polynomials only (and their sums).
- Work: algebraic, a linear system, no integrals.
- Risk: forgetting $x^s$ at resonance.

**Variation of parameters (VP)**
- Equation: any linear one, coefficients may vary.
- Right side: any continuous $f$.
- Work: $y_1,\dots,y_n$ must be known and integrals computed.
- Risk: not normalising; an integral may be non-elementary.

Rule of thumb: quasi-polynomial right side — UC is faster; otherwise — VP.`) },
        { type: 'example', title: L('Bitta masala — ikki usul', 'Одна задача — два метода', 'One problem, two methods'),
          body: L(R`$y''-y=3e^{2x}$ uchun xususiy yechimni ikkala usulda toping.`, R`Найдите частное решение $y''-y=3e^{2x}$ обоими методами.`, R`Find a particular solution of $y''-y=3e^{2x}$ by both methods.`),
          steps: [
            L(R`NK: $\sigma=2$ ildiz emas, $y_p=Ae^{2x}$; $4A-A=3$, $A=1$, $y_p=e^{2x}$.`, R`НК: $\sigma=2$ не корень, $y_p=Ae^{2x}$; $4A-A=3$, $A=1$, $y_p=e^{2x}$.`, R`UC: $\sigma=2$ is not a root, $y_p=Ae^{2x}$; $4A-A=3$, $A=1$, $y_p=e^{2x}$.`),
            L(R`OV: $y_1=e^x$, $y_2=e^{-x}$, $W=e^x(-e^{-x})-e^xe^{-x}=-2$.`, R`ВП: $y_1=e^x$, $y_2=e^{-x}$, $W=e^x(-e^{-x})-e^xe^{-x}=-2$.`, R`VP: $y_1=e^x$, $y_2=e^{-x}$, $W=e^x(-e^{-x})-e^xe^{-x}=-2$.`),
            L(R`$C_1'=\dfrac32e^{x}$, $C_1=\dfrac32e^x$; $C_2'=-\dfrac32e^{3x}$, $C_2=-\dfrac12e^{3x}$.`, R`$C_1'=\dfrac32e^{x}$, $C_1=\dfrac32e^x$; $C_2'=-\dfrac32e^{3x}$, $C_2=-\dfrac12e^{3x}$.`, R`$C_1'=\dfrac32e^{x}$, $C_1=\dfrac32e^x$; $C_2'=-\dfrac32e^{3x}$, $C_2=-\dfrac12e^{3x}$.`),
            L(R`$y_p=\dfrac32e^{2x}-\dfrac12e^{2x}=e^{2x}$ — natija bir xil, lekin NK ancha qisqa.`, R`$y_p=\dfrac32e^{2x}-\dfrac12e^{2x}=e^{2x}$ — результат тот же, но НК заметно короче.`, R`$y_p=\dfrac32e^{2x}-\dfrac12e^{2x}=e^{2x}$: the same result, but UC is much shorter.`)
          ],
          check: L(R`$(e^{2x})''-e^{2x}=3e^{2x}$ ✓.`, R`$(e^{2x})''-e^{2x}=3e^{2x}$ ✓.`, R`$(e^{2x})''-e^{2x}=3e^{2x}$ ✓.`) },
        { type: 'lab', lab: 'L06', body: L(R`L06 laboratoriyasida $y''+cy'+ky=F\cos\gamma t$ ning grafigini oling va NK bilan topilgan barqaror javobni kuzating. So‘ng shu tenglama uchun variatsiya formulasini qo‘lda qo‘llab, $t$ katta bo‘lganda bir xil tebranish chiqishini tekshiring: ikki usul faqat $y_h$ qismi bilan farq qiladi.`, R`В лаборатории L06 постройте график $y''+cy'+ky=F\cos\gamma t$ и наблюдайте установившийся ответ, найденный методом НК. Затем примените вручную формулу вариации к тому же уравнению и проверьте, что при больших $t$ получается то же колебание: методы различаются лишь частью $y_h$.`, R`In lab L06 plot $y''+cy'+ky=F\cos\gamma t$ and look at the steady response found by UC. Then apply the variation formula to the same equation by hand and check that for large $t$ you get the same oscillation: the two methods differ only by a $y_h$ part.`) }
      ]
    },
    {
      id: 't10.3',
      title: L('Ostrogradskiy–Liuvill formulasi va ikkinchi yechim', 'Формула Остроградского–Лиувилля и второе решение', 'The Abel–Liouville formula and a second solution'),
      blocks: [
        { type: 'thm', title: L('Ostrogradskiy–Liuvill (Abel) formulasi', 'Формула Остроградского–Лиувилля (Абеля)', 'The Abel–Liouville (Ostrogradsky) formula'),
          conds: L(R`1. $p(x)$, $q(x)$ $I$ oraliqda uzluksiz;
2. $y_1$, $y_2$ — $y''+p(x)y'+q(x)y=0$ ning $I$ dagi (istalgan) yechimlari;
3. $x_0\in I$.`,
          R`1. $p(x)$, $q(x)$ непрерывны на интервале $I$;
2. $y_1$, $y_2$ — (любые) решения $y''+p(x)y'+q(x)y=0$ на $I$;
3. $x_0\in I$.`,
          R`1. $p(x)$, $q(x)$ are continuous on an interval $I$;
2. $y_1$, $y_2$ are (any) solutions of $y''+p(x)y'+q(x)y=0$ on $I$;
3. $x_0\in I$.`),
          body: L(R`U holda barcha $x\in I$ uchun
$$W(x)=W(x_0)\exp\Big(-\int_{x_0}^{x}p(t)\,dt\Big).$$
Natija: yechimlarning Vronskiani $I$ da yo **aynan nol**, yoki **hech qayerda nol emas**. $n$-tartibli $y^{(n)}+a_1(x)y^{(n-1)}+\dots=0$ uchun ham xuddi shunday: $W=W(x_0)\exp\big(-\int_{x_0}^xa_1\,dt\big)$.`,
          R`Тогда для всех $x\in I$
$$W(x)=W(x_0)\exp\Big(-\int_{x_0}^{x}p(t)\,dt\Big).$$
Следствие: вронскиан решений на $I$ либо **тождественно равен нулю**, либо **нигде не обращается в нуль**. Для уравнения $n$-го порядка $y^{(n)}+a_1(x)y^{(n-1)}+\dots=0$ аналогично: $W=W(x_0)\exp\big(-\int_{x_0}^xa_1\,dt\big)$.`,
          R`Then for all $x\in I$
$$W(x)=W(x_0)\exp\Big(-\int_{x_0}^{x}p(t)\,dt\Big).$$
Consequence: the Wronskian of solutions is either **identically zero** on $I$ or **never zero** there. For the $n$-th order equation $y^{(n)}+a_1(x)y^{(n-1)}+\dots=0$ likewise $W=W(x_0)\exp\big(-\int_{x_0}^xa_1\,dt\big)$.`) },
        { type: 'proof', body: L(R`$W'=(y_1y_2'-y_1'y_2)'=y_1y_2''-y_1''y_2$. Tenglamadan $y_k''=-py_k'-qy_k$ ni qo‘yamiz: $W'=-p(y_1y_2'-y_1'y_2)=-pW$. Bu birinchi tartibli chiziqli tenglama, yechimi yuqoridagi formula (Dilmuradov, §6.4).`,
          R`$W'=(y_1y_2'-y_1'y_2)'=y_1y_2''-y_1''y_2$. Подставляем $y_k''=-py_k'-qy_k$ из уравнения: $W'=-p(y_1y_2'-y_1'y_2)=-pW$. Это линейное уравнение первого порядка, его решение — формула выше (Дилмурадов, §6.4).`,
          R`$W'=(y_1y_2'-y_1'y_2)'=y_1y_2''-y_1''y_2$. Substitute $y_k''=-py_k'-qy_k$ from the equation: $W'=-p(y_1y_2'-y_1'y_2)=-pW$. This first-order linear equation is solved by the formula above (Dilmuradov, §6.4).`) },
        { type: 'warn', body: L(R`Abel formulasi faqat **bitta chiziqli tenglamaning yechimlari** uchun. Ixtiyoriy funksiyalar uchun $W\equiv0$ chiziqli bog‘liqlikni anglatmaydi: $y_1=x^2$, $y_2=x|x|$ uchun $\mathbb R$ da $W\equiv0$, lekin ular $(-1,1)$ da chiziqli erkli. Bu juftlik uzluksiz koeffitsiyentli $y''+py'+qy=0$ ning yechimlari bo‘la olmaydi.`,
          R`Формула Абеля относится только к **решениям одного линейного уравнения**. Для произвольных функций $W\equiv0$ не означает линейной зависимости: для $y_1=x^2$, $y_2=x|x|$ на $\mathbb R$ имеем $W\equiv0$, но на $(-1,1)$ они линейно независимы. Эта пара не может быть решениями $y''+py'+qy=0$ с непрерывными коэффициентами.`,
          R`Abel’s formula is about **solutions of one linear equation**. For arbitrary functions $W\equiv0$ does not imply linear dependence: $y_1=x^2$, $y_2=x|x|$ have $W\equiv0$ on $\mathbb R$, yet they are linearly independent on $(-1,1)$. This pair cannot be solutions of $y''+py'+qy=0$ with continuous coefficients.`) },
        { type: 'example', title: L('Vronskianni yechmasdan topish', 'Вронскиан без решения уравнения', 'The Wronskian without solving'),
          body: L(R`$xy''+2y'+xy=0$ ($x>0$) ning ikki yechimi Vronskianini toping va $y_1=\dfrac{\sin x}x$, $y_2=\dfrac{\cos x}x$ uchun tekshiring.`, R`Найдите вронскиан двух решений $xy''+2y'+xy=0$ ($x>0$) и проверьте на $y_1=\dfrac{\sin x}x$, $y_2=\dfrac{\cos x}x$.`, R`Find the Wronskian of two solutions of $xy''+2y'+xy=0$ ($x>0$) and check it for $y_1=\dfrac{\sin x}x$, $y_2=\dfrac{\cos x}x$.`),
          steps: [
            L(R`Normallashtiramiz: $y''+\dfrac2xy'+y=0$, $p=\dfrac2x$.`, R`Приводим: $y''+\dfrac2xy'+y=0$, $p=\dfrac2x$.`, R`Normalise: $y''+\dfrac2xy'+y=0$, $p=\dfrac2x$.`),
            L(R`$W=C\exp\Big(-\int\dfrac2x\,dx\Big)=C\,e^{-2\ln x}=\dfrac{C}{x^2}$.`, R`$W=C\exp\Big(-\int\dfrac2x\,dx\Big)=C\,e^{-2\ln x}=\dfrac{C}{x^2}$.`, R`$W=C\exp\Big(-\int\dfrac2x\,dx\Big)=C\,e^{-2\ln x}=\dfrac{C}{x^2}$.`),
            L(R`To‘g‘ridan-to‘g‘ri hisob: $y_1y_2'-y_1'y_2=-\dfrac1{x^2}$, ya’ni $C=-1$ — formula bilan mos.`, R`Прямой подсчёт: $y_1y_2'-y_1'y_2=-\dfrac1{x^2}$, то есть $C=-1$ — согласуется с формулой.`, R`Direct computation: $y_1y_2'-y_1'y_2=-\dfrac1{x^2}$, so $C=-1$, in agreement with the formula.`)
          ],
          check: L(R`$x\,y_1''+2y_1'+x\,y_1\equiv0$ ✓ va $W(y_1,y_2)=-1/x^2$ ✓.`, R`$x\,y_1''+2y_1'+x\,y_1\equiv0$ ✓ и $W(y_1,y_2)=-1/x^2$ ✓.`, R`$x\,y_1''+2y_1'+x\,y_1\equiv0$ ✓ and $W(y_1,y_2)=-1/x^2$ ✓.`) },
        { type: 'def', title: L('Ma’lum yechim bo‘yicha ikkinchi yechim', 'Второе решение по известному', 'A second solution from a known one'),
          body: L(R`$y_1$ — $y''+py'+qy=0$ ning $y_1\ne0$ bo‘lgan oraliqdagi yechimi bo‘lsin. $\left(\dfrac{y_2}{y_1}\right)'=\dfrac{W}{y_1^2}$ va Abel formulasidan
$$y_2=y_1\int\frac{e^{-\int p\,dx}}{y_1^2}\,dx.$$
Bu $y_2$ $y_1$ bilan chiziqli erkli (ularning Vronskiani $e^{-\int p\,dx}\ne0$). Tartibni pasaytirish usulining ($y=y_1u$) tayyor natijasi.`,
          R`Пусть $y_1$ — решение $y''+py'+qy=0$ на интервале, где $y_1\ne0$. Из $\left(\dfrac{y_2}{y_1}\right)'=\dfrac{W}{y_1^2}$ и формулы Абеля
$$y_2=y_1\int\frac{e^{-\int p\,dx}}{y_1^2}\,dx.$$
Это $y_2$ линейно независимо с $y_1$ (их вронскиан $e^{-\int p\,dx}\ne0$). Готовый результат метода понижения порядка ($y=y_1u$).`,
          R`Let $y_1$ solve $y''+py'+qy=0$ on an interval where $y_1\ne0$. From $\left(\dfrac{y_2}{y_1}\right)'=\dfrac{W}{y_1^2}$ and Abel’s formula
$$y_2=y_1\int\frac{e^{-\int p\,dx}}{y_1^2}\,dx.$$
This $y_2$ is linearly independent of $y_1$ (their Wronskian is $e^{-\int p\,dx}\ne0$). It is the ready-made result of reduction of order ($y=y_1u$).`) },
        { type: 'example', title: L('Eyler tipidagi tenglama', 'Уравнение эйлерова типа', 'An Euler-type equation'),
          body: L(R`$x^2y''-3xy'+4y=0$ ($x>0$), $y_1=x^2$ ma’lum. Ikkinchi yechimni toping.`, R`$x^2y''-3xy'+4y=0$ ($x>0$), известно $y_1=x^2$. Найдите второе решение.`, R`$x^2y''-3xy'+4y=0$ ($x>0$) with known $y_1=x^2$. Find a second solution.`),
          steps: [
            L(R`Normallashtiramiz: $p=-\dfrac3x$, $e^{-\int p\,dx}=e^{3\ln x}=x^3$.`, R`Приводим: $p=-\dfrac3x$, $e^{-\int p\,dx}=e^{3\ln x}=x^3$.`, R`Normalise: $p=-\dfrac3x$, $e^{-\int p\,dx}=e^{3\ln x}=x^3$.`),
            L(R`$y_2=x^2\displaystyle\int\frac{x^3}{x^4}\,dx=x^2\ln x$.`, R`$y_2=x^2\displaystyle\int\frac{x^3}{x^4}\,dx=x^2\ln x$.`, R`$y_2=x^2\displaystyle\int\frac{x^3}{x^4}\,dx=x^2\ln x$.`),
            L(R`Umumiy yechim: $y=C_1x^2+C_2x^2\ln x$, $x>0$.`, R`Общее решение: $y=C_1x^2+C_2x^2\ln x$, $x>0$.`, R`General solution: $y=C_1x^2+C_2x^2\ln x$, $x>0$.`)
          ],
          check: L(R`$y_2'=2x\ln x+x$, $y_2''=2\ln x+3$; $x^2(2\ln x+3)-3x(2x\ln x+x)+4x^2\ln x=0$ ✓.`, R`$y_2'=2x\ln x+x$, $y_2''=2\ln x+3$; $x^2(2\ln x+3)-3x(2x\ln x+x)+4x^2\ln x=0$ ✓.`, R`$y_2'=2x\ln x+x$, $y_2''=2\ln x+3$; $x^2(2\ln x+3)-3x(2x\ln x+x)+4x^2\ln x=0$ ✓.`) },
        { type: 'example', title: L('Lejandr tenglamasi (n = 1)', 'Уравнение Лежандра (n = 1)', 'Legendre’s equation (n = 1)'),
          body: L(R`$(1-x^2)y''-2xy'+2y=0$, $|x|<1$; $y_1=x$ yechim. Ikkinchi yechimni toping.`, R`$(1-x^2)y''-2xy'+2y=0$, $|x|<1$; $y_1=x$ — решение. Найдите второе решение.`, R`$(1-x^2)y''-2xy'+2y=0$, $|x|<1$; $y_1=x$ is a solution. Find a second one.`),
          steps: [
            L(R`$p=-\dfrac{2x}{1-x^2}$, $-\int p\,dx=-\ln(1-x^2)$, $e^{-\int p\,dx}=\dfrac1{1-x^2}$.`, R`$p=-\dfrac{2x}{1-x^2}$, $-\int p\,dx=-\ln(1-x^2)$, $e^{-\int p\,dx}=\dfrac1{1-x^2}$.`, R`$p=-\dfrac{2x}{1-x^2}$, $-\int p\,dx=-\ln(1-x^2)$, $e^{-\int p\,dx}=\dfrac1{1-x^2}$.`),
            L(R`$y_2=x\displaystyle\int\frac{dx}{x^2(1-x^2)}=x\int\Big(\frac1{x^2}+\frac1{1-x^2}\Big)dx$ (oddiy kasrlar; $0<x<1$ da hisoblaymiz, chunki $y_1(0)=0$).`, R`$y_2=x\displaystyle\int\frac{dx}{x^2(1-x^2)}=x\int\Big(\frac1{x^2}+\frac1{1-x^2}\Big)dx$ (простейшие дроби; считаем при $0<x<1$, так как $y_1(0)=0$).`, R`$y_2=x\displaystyle\int\frac{dx}{x^2(1-x^2)}=x\int\Big(\frac1{x^2}+\frac1{1-x^2}\Big)dx$ (partial fractions; work on $0<x<1$ because $y_1(0)=0$).`),
            L(R`$y_2=x\Big(-\dfrac1x+\dfrac12\ln\dfrac{1+x}{1-x}\Big)=\dfrac x2\ln\dfrac{1+x}{1-x}-1$. Bu formula butun $(-1,1)$ da yechim bo‘ladi.`, R`$y_2=x\Big(-\dfrac1x+\dfrac12\ln\dfrac{1+x}{1-x}\Big)=\dfrac x2\ln\dfrac{1+x}{1-x}-1$. Эта формула даёт решение на всём $(-1,1)$.`, R`$y_2=x\Big(-\dfrac1x+\dfrac12\ln\dfrac{1+x}{1-x}\Big)=\dfrac x2\ln\dfrac{1+x}{1-x}-1$. This formula is a solution on the whole of $(-1,1)$.`)
          ],
          check: L(R`$(1-x^2)y_2''-2xy_2'+2y_2\equiv0$ ✓. $x\to\pm1$ da $y_2\to\infty$ — oraliq chegarasida koeffitsiyent $1-x^2$ nolga aylanadi.`, R`$(1-x^2)y_2''-2xy_2'+2y_2\equiv0$ ✓. При $x\to\pm1$ $y_2\to\infty$ — на концах интервала коэффициент $1-x^2$ обращается в нуль.`, R`$(1-x^2)y_2''-2xy_2'+2y_2\equiv0$ ✓. As $x\to\pm1$, $y_2\to\infty$: at the ends of the interval the coefficient $1-x^2$ vanishes.`) }
      ]
    }
  ],
  mistakes: [
    L(R`Tenglamani normallashtirmasdan variatsiya formulasini qo‘llash: $x^2y''-2xy'+2y=x^3$ da $f=x$, $x^3$ emas.`, R`Применять формулы вариации без приведения уравнения: в $x^2y''-2xy'+2y=x^3$ имеем $f=x$, а не $x^3$.`, R`Applying the variation formulas without normalising: in $x^2y''-2xy'+2y=x^3$ we have $f=x$, not $x^3$.`),
    L(R`$C_1'$ formulasidagi minus ishorasini yo‘qotish: $C_1'=-\dfrac{y_2f}{W}$, $C_2'=+\dfrac{y_1f}{W}$.`, R`Терять минус в формуле для $C_1'$: $C_1'=-\dfrac{y_2f}{W}$, $C_2'=+\dfrac{y_1f}{W}$.`, R`Losing the minus sign in $C_1'$: $C_1'=-\dfrac{y_2f}{W}$, $C_2'=+\dfrac{y_1f}{W}$.`),
    L(R`$\int\tan x\,dx=-\ln|\cos x|$ kabi integrallarda modul va aniqlanish oralig‘ini unutish; javob qaysi oraliqda yechim ekanini yozing.`, R`Забывать модуль и интервал в интегралах вида $\int\tan x\,dx=-\ln|\cos x|$; указывайте, на каком интервале ответ — решение.`, R`Forgetting the absolute value and the interval in integrals like $\int\tan x\,dx=-\ln|\cos x|$; state on which interval the answer is a solution.`),
    L(R`Ixtiyoriy funksiyalar uchun ham “$W\equiv0\Rightarrow$ chiziqli bog‘liq” deb hisoblash. Bu faqat bitta chiziqli tenglamaning yechimlari uchun to‘g‘ri.`, R`Считать, что «$W\equiv0\Rightarrow$ линейно зависимы» для любых функций. Это верно лишь для решений одного линейного уравнения.`, R`Believing “$W\equiv0\Rightarrow$ linearly dependent” for arbitrary functions. It holds only for solutions of one linear equation.`),
    L(R`Abel formulasida $\exp\big(+\int p\big)$ yozish yoki $p$ ni normallashmagan tenglamadan olish.`, R`Писать в формуле Абеля $\exp\big(+\int p\big)$ или брать $p$ из неприведённого уравнения.`, R`Writing $\exp\big(+\int p\big)$ in Abel’s formula, or taking $p$ from an equation that is not normalised.`)
  ],
  exercises: [
    { id: 't10.x1', level: 'easy', type: 'numeric',
      q: L(R`$y_1=e^{x}$, $y_2=e^{-x}$ ($y''-y=0$ ning yechimlari) uchun Vronskian $W$ ni kiriting.`, R`Введите вронскиан $W$ для $y_1=e^{x}$, $y_2=e^{-x}$ (решения $y''-y=0$).`, R`Enter the Wronskian $W$ of $y_1=e^{x}$, $y_2=e^{-x}$ (solutions of $y''-y=0$).`),
      check: { kind: 'numeric', value: -2, tol: 1e-9 },
      hint: L(R`$W=y_1y_2'-y_1'y_2$. Abel bo‘yicha $p=0$, demak $W$ o‘zgarmas.`, R`$W=y_1y_2'-y_1'y_2$. По Абелю $p=0$, значит $W$ постоянен.`, R`$W=y_1y_2'-y_1'y_2$. By Abel, $p=0$, so $W$ is constant.`),
      solution: L(R`$W=e^x(-e^{-x})-e^xe^{-x}=-2$.`, R`$W=e^x(-e^{-x})-e^xe^{-x}=-2$.`, R`$W=e^x(-e^{-x})-e^xe^{-x}=-2$.`) },
    { id: 't10.x2', level: 'easy', type: 'mcq',
      q: L(R`$x^2y''+xy'-y=x^2$ ($x>0$) uchun variatsiya formulasidagi $f$:`, R`Чему равна $f$ в формуле вариации для $x^2y''+xy'-y=x^2$ ($x>0$)?`, R`What is $f$ in the variation formula for $x^2y''+xy'-y=x^2$ ($x>0$)?`),
      options: [L(R`$x^2$`, R`$x^2$`, R`$x^2$`), L(R`$1$`, R`$1$`, R`$1$`), L(R`$x^4$`, R`$x^4$`, R`$x^4$`), L(R`$x$`, R`$x$`, R`$x$`)], correct: 1,
      explain: L(R`$x^2$ ga bo‘lamiz: $y''+\frac1xy'-\frac1{x^2}y=1$.`, R`Делим на $x^2$: $y''+\frac1xy'-\frac1{x^2}y=1$.`, R`Divide by $x^2$: $y''+\frac1xy'-\frac1{x^2}y=1$.`) },
    { id: 't10.x3', level: 'mid', type: 'formula',
      q: L(R`$y''+y=\dfrac1{\sin x}$, $x\in(0,\pi)$ ning umumiy yechimini yozing.`, R`Запишите общее решение $y''+y=\dfrac1{\sin x}$, $x\in(0,\pi)$.`, R`Write the general solution of $y''+y=\dfrac1{\sin x}$, $x\in(0,\pi)$.`),
      check: { kind: 'ode', residual: 'ypp + y - 1/sin(x)', order: 2, consts: ['C1', 'C2'], x: [0.3, 2.8] }, answer: 'C1*cos(x) + C2*sin(x) - x*cos(x) + sin(x)*ln(sin(x))',
      hint: L(R`$y_1=\cos x$, $y_2=\sin x$, $W=1$; $C_1'=-1$, $C_2'=\dfrac{\cos x}{\sin x}$.`, R`$y_1=\cos x$, $y_2=\sin x$, $W=1$; $C_1'=-1$, $C_2'=\dfrac{\cos x}{\sin x}$.`, R`$y_1=\cos x$, $y_2=\sin x$, $W=1$; $C_1'=-1$, $C_2'=\dfrac{\cos x}{\sin x}$.`),
      solution: L(R`$C_1=-x$, $C_2=\ln\sin x$. $y=C_1\cos x+C_2\sin x-x\cos x+\sin x\ln\sin x$.`, R`$C_1=-x$, $C_2=\ln\sin x$. $y=C_1\cos x+C_2\sin x-x\cos x+\sin x\ln\sin x$.`, R`$C_1=-x$, $C_2=\ln\sin x$. $y=C_1\cos x+C_2\sin x-x\cos x+\sin x\ln\sin x$.`) },
    { id: 't10.x4', level: 'mid', type: 'formula',
      q: L(R`$y''-2y'+y=\dfrac{e^x}{x^2}$, $x>0$ ning umumiy yechimini yozing.`, R`Запишите общее решение $y''-2y'+y=\dfrac{e^x}{x^2}$, $x>0$.`, R`Write the general solution of $y''-2y'+y=\dfrac{e^x}{x^2}$, $x>0$.`),
      check: { kind: 'ode', residual: 'ypp - 2*yp + y - exp(x)/x^2', order: 2, consts: ['C1', 'C2'], x: [0.4, 2] }, answer: '(C1 + C2*x)*exp(x) - exp(x)*ln(x)',
      hint: L(R`$y_1=e^x$, $y_2=xe^x$, $W=e^{2x}$.`, R`$y_1=e^x$, $y_2=xe^x$, $W=e^{2x}$.`, R`$y_1=e^x$, $y_2=xe^x$, $W=e^{2x}$.`),
      solution: L(R`$C_1'=-\dfrac1x$, $C_1=-\ln x$; $C_2'=\dfrac1{x^2}$, $C_2=-\dfrac1x$. $y_p=-e^x\ln x-e^x$; $-e^x$ $y_h$ ga kiradi. $y=(C_1+C_2x)e^x-e^x\ln x$.`, R`$C_1'=-\dfrac1x$, $C_1=-\ln x$; $C_2'=\dfrac1{x^2}$, $C_2=-\dfrac1x$. $y_p=-e^x\ln x-e^x$; $-e^x$ входит в $y_h$. $y=(C_1+C_2x)e^x-e^x\ln x$.`, R`$C_1'=-\dfrac1x$, $C_1=-\ln x$; $C_2'=\dfrac1{x^2}$, $C_2=-\dfrac1x$. $y_p=-e^x\ln x-e^x$; $-e^x$ is absorbed into $y_h$. $y=(C_1+C_2x)e^x-e^x\ln x$.`) },
    { id: 't10.x5', level: 'mid', type: 'formula',
      q: L(R`$x^2y''-xy'+y=0$ ($x>0$), $y_1=x$ ma’lum. Umumiy yechimni yozing.`, R`$x^2y''-xy'+y=0$ ($x>0$), известно $y_1=x$. Запишите общее решение.`, R`$x^2y''-xy'+y=0$ ($x>0$) with known $y_1=x$. Write the general solution.`),
      check: { kind: 'ode', residual: 'x^2*ypp - x*yp + y', order: 2, consts: ['C1', 'C2'], x: [0.4, 3] }, answer: 'C1*x + C2*x*ln(x)',
      hint: L(R`$p=-\dfrac1x$, $e^{-\int p\,dx}=x$, $y_2=x\int\dfrac{x}{x^2}dx$.`, R`$p=-\dfrac1x$, $e^{-\int p\,dx}=x$, $y_2=x\int\dfrac{x}{x^2}dx$.`, R`$p=-\dfrac1x$, $e^{-\int p\,dx}=x$, $y_2=x\int\dfrac{x}{x^2}dx$.`),
      solution: L(R`$y_2=x\ln x$, $y=C_1x+C_2x\ln x$.`, R`$y_2=x\ln x$, $y=C_1x+C_2x\ln x$.`, R`$y_2=x\ln x$, $y=C_1x+C_2x\ln x$.`) },
    { id: 't10.x6', level: 'mid', type: 'numeric',
      q: L(R`$y_1$, $y_2$ — $xy''+y'+xy=0$ ($x>0$) ning yechimlari va $W(1)=3$. $W(2)$ ni kiriting.`, R`$y_1$, $y_2$ — решения $xy''+y'+xy=0$ ($x>0$), $W(1)=3$. Введите $W(2)$.`, R`$y_1$, $y_2$ solve $xy''+y'+xy=0$ ($x>0$) and $W(1)=3$. Enter $W(2)$.`),
      check: { kind: 'numeric', value: 1.5, tol: 1e-6 },
      hint: L(R`Normallashtiring: $p=\dfrac1x$.`, R`Приведите уравнение: $p=\dfrac1x$.`, R`Normalise: $p=\dfrac1x$.`),
      solution: L(R`$W(2)=3\exp\Big(-\int_1^2\dfrac{dt}t\Big)=3e^{-\ln2}=1{,}5$.`, R`$W(2)=3\exp\Big(-\int_1^2\dfrac{dt}t\Big)=3e^{-\ln2}=1{,}5$.`, R`$W(2)=3\exp\Big(-\int_1^2\dfrac{dt}t\Big)=3e^{-\ln2}=1.5$.`) },
    { id: 't10.x7', level: 'mid', type: 'finderror',
      q: L(R`Talaba $x^2y''-2xy'+2y=x^3$ ($y_1=x$, $y_2=x^2$) ni yechdi. Qaysi qatorda xato?`, R`Студент решал $x^2y''-2xy'+2y=x^3$ ($y_1=x$, $y_2=x^2$). В какой строке ошибка?`, R`A student solved $x^2y''-2xy'+2y=x^3$ ($y_1=x$, $y_2=x^2$). Which line is wrong?`),
      lines: [
        L(R`$W=x\cdot2x-x^2=x^2$.`, R`$W=x\cdot2x-x^2=x^2$.`, R`$W=x\cdot2x-x^2=x^2$.`),
        L(R`$f=x^3$, $C_1'=-\dfrac{x^2\cdot x^3}{x^2}=-x^3$, $C_2'=\dfrac{x\cdot x^3}{x^2}=x^2$.`, R`$f=x^3$, $C_1'=-\dfrac{x^2\cdot x^3}{x^2}=-x^3$, $C_2'=\dfrac{x\cdot x^3}{x^2}=x^2$.`, R`$f=x^3$, $C_1'=-\dfrac{x^2\cdot x^3}{x^2}=-x^3$, $C_2'=\dfrac{x\cdot x^3}{x^2}=x^2$.`),
        L(R`$C_1=-\dfrac{x^4}4$, $C_2=\dfrac{x^3}3$.`, R`$C_1=-\dfrac{x^4}4$, $C_2=\dfrac{x^3}3$.`, R`$C_1=-\dfrac{x^4}4$, $C_2=\dfrac{x^3}3$.`),
        L(R`$y_p=-\dfrac{x^5}4+\dfrac{x^5}3=\dfrac{x^5}{12}$.`, R`$y_p=-\dfrac{x^5}4+\dfrac{x^5}3=\dfrac{x^5}{12}$.`, R`$y_p=-\dfrac{x^5}4+\dfrac{x^5}3=\dfrac{x^5}{12}$.`)
      ],
      wrong: 1,
      explain: L(R`Normallashtirilmagan: $f=\dfrac{x^3}{x^2}=x$. To‘g‘ri javob $y_p=\dfrac{x^3}2$. Tekshiruv: $\frac{x^5}{12}$ qo‘yilsa, chap tomon $x^5$ bo‘ladi.`, R`Уравнение не приведено: $f=\dfrac{x^3}{x^2}=x$. Верный ответ $y_p=\dfrac{x^3}2$. Проверка: при подстановке $\frac{x^5}{12}$ левая часть равна $x^5$.`, R`The equation was not normalised: $f=\dfrac{x^3}{x^2}=x$. The correct answer is $y_p=\dfrac{x^3}2$. Check: substituting $\frac{x^5}{12}$ gives $x^5$ on the left.`) },
    { id: 't10.x8', level: 'hard', type: 'formula',
      q: L(R`$y''+4y=\dfrac1{\cos2x}$, $|x|<\dfrac\pi4$ ning umumiy yechimini yozing.`, R`Запишите общее решение $y''+4y=\dfrac1{\cos2x}$, $|x|<\dfrac\pi4$.`, R`Write the general solution of $y''+4y=\dfrac1{\cos2x}$, $|x|<\dfrac\pi4$.`),
      check: { kind: 'ode', residual: 'ypp + 4*y - 1/cos(2*x)', order: 2, consts: ['C1', 'C2'], x: [-0.7, 0.7] }, answer: 'C1*cos(2*x) + C2*sin(2*x) + cos(2*x)*ln(cos(2*x))/4 + x*sin(2*x)/2',
      hint: L(R`$y_1=\cos2x$, $y_2=\sin2x$, $W=2$.`, R`$y_1=\cos2x$, $y_2=\sin2x$, $W=2$.`, R`$y_1=\cos2x$, $y_2=\sin2x$, $W=2$.`),
      solution: L(R`$C_1'=-\dfrac{\sin2x}{2\cos2x}$, $C_1=\dfrac14\ln\cos2x$; $C_2'=\dfrac12$, $C_2=\dfrac x2$. $y=C_1\cos2x+C_2\sin2x+\dfrac14\cos2x\ln\cos2x+\dfrac x2\sin2x$.`, R`$C_1'=-\dfrac{\sin2x}{2\cos2x}$, $C_1=\dfrac14\ln\cos2x$; $C_2'=\dfrac12$, $C_2=\dfrac x2$. $y=C_1\cos2x+C_2\sin2x+\dfrac14\cos2x\ln\cos2x+\dfrac x2\sin2x$.`, R`$C_1'=-\dfrac{\sin2x}{2\cos2x}$, $C_1=\dfrac14\ln\cos2x$; $C_2'=\dfrac12$, $C_2=\dfrac x2$. $y=C_1\cos2x+C_2\sin2x+\dfrac14\cos2x\ln\cos2x+\dfrac x2\sin2x$.`) },
    { id: 't10.x9', level: 'hard', type: 'match',
      q: L(R`Tenglamani unga eng mos usul bilan moslang.`, R`Сопоставьте уравнение и наиболее подходящий метод.`, R`Match each equation with the most suitable method.`),
      pairs: [
        { left: L(R`$y''+y=x^2e^x$`, R`$y''+y=x^2e^x$`, R`$y''+y=x^2e^x$`), right: L('noma’lum koeffitsiyentlar', 'неопределённые коэффициенты', 'undetermined coefficients') },
        { left: L(R`$y''+y=\tan x$`, R`$y''+y=\tan x$`, R`$y''+y=\tan x$`), right: L('o‘zgarmaslarni variatsiyalash', 'вариация постоянных', 'variation of parameters') },
        { left: L(R`$x^2y''-3xy'+4y=0$, $y_1=x^2$`, R`$x^2y''-3xy'+4y=0$, $y_1=x^2$`, R`$x^2y''-3xy'+4y=0$, $y_1=x^2$`), right: L('ikkinchi yechim formulasi (Abel)', 'формула второго решения (Абель)', 'second-solution formula (Abel)') },
        { left: L(R`$y''=xy$`, R`$y''=xy$`, R`$y''=xy$`), right: L('darajali qatorlar', 'степенные ряды', 'power series') }
      ],
      explain: L(R`Kvaziko‘phad — NK; jadvalda yo‘q o‘ng tomon — OV; bitta yechim ma’lum — Abel; elementar yechimsiz, analitik koeffitsiyentli — qator.`, R`Квазимногочлен — НК; правой части нет в таблице — ВП; известно одно решение — Абель; нет элементарного решения, коэффициенты аналитические — ряд.`, R`Quasi-polynomial: UC; a right side not in the table: VP; one solution known: Abel; no elementary solution with analytic coefficients: series.`) },
    { id: 't10.x10', level: 'hard', type: 'steps',
      q: L(R`$y''+\dfrac1xy'-\dfrac1{x^2}y=0$ ($x>0$), $y_1=x$. Ikkinchi yechimni toping.`, R`$y''+\dfrac1xy'-\dfrac1{x^2}y=0$ ($x>0$), $y_1=x$. Найдите второе решение.`, R`$y''+\dfrac1xy'-\dfrac1{x^2}y=0$ ($x>0$), $y_1=x$. Find a second solution.`),
      steps: [
        { q: L(R`$e^{-\int p\,dx}$:`, R`$e^{-\int p\,dx}$:`, R`$e^{-\int p\,dx}$:`), options: [L(R`$x$`, R`$x$`, R`$x$`), L(R`$\dfrac1x$`, R`$\dfrac1x$`, R`$\dfrac1x$`), L(R`$x^2$`, R`$x^2$`, R`$x^2$`)], correct: 1 },
        { q: L(R`Integral ostidagi funksiya $\dfrac{e^{-\int p}}{y_1^2}$:`, R`Подынтегральная функция $\dfrac{e^{-\int p}}{y_1^2}$:`, R`The integrand $\dfrac{e^{-\int p}}{y_1^2}$:`), options: [L(R`$\dfrac1{x^3}$`, R`$\dfrac1{x^3}$`, R`$\dfrac1{x^3}$`), L(R`$\dfrac1x$`, R`$\dfrac1x$`, R`$\dfrac1x$`), L(R`$x$`, R`$x$`, R`$x$`)], correct: 0 },
        { q: L(R`$y_2$ (o‘zgarmas ko‘paytuvchigacha):`, R`$y_2$ (с точностью до множителя):`, R`$y_2$ (up to a constant factor):`), options: [L(R`$\dfrac1x$`, R`$\dfrac1x$`, R`$\dfrac1x$`), L(R`$x\ln x$`, R`$x\ln x$`, R`$x\ln x$`), L(R`$x^2$`, R`$x^2$`, R`$x^2$`)], correct: 0 }
      ],
      explain: L(R`$p=\frac1x$, $e^{-\ln x}=\frac1x$; $y_2=x\int x^{-3}dx=-\frac1{2x}$, ya’ni $y_2=\frac1x$. Tekshiruv: $\frac2{x^3}-\frac1{x^3}-\frac1{x^3}=0$ ✓.`, R`$p=\frac1x$, $e^{-\ln x}=\frac1x$; $y_2=x\int x^{-3}dx=-\frac1{2x}$, то есть $y_2=\frac1x$. Проверка: $\frac2{x^3}-\frac1{x^3}-\frac1{x^3}=0$ ✓.`, R`$p=\frac1x$, $e^{-\ln x}=\frac1x$; $y_2=x\int x^{-3}dx=-\frac1{2x}$, so $y_2=\frac1x$. Check: $\frac2{x^3}-\frac1{x^3}-\frac1{x^3}=0$ ✓.`) },
    { id: 't10.x11', level: 'easy', type: 'order',
      q: L(R`O‘zgarmaslarni variatsiyalash qadamlarini tartiblang.`, R`Упорядочите шаги метода вариации постоянных.`, R`Order the steps of variation of parameters.`),
      items: [
        L(R`Tenglamani $y''+py'+qy=f$ ko‘rinishga keltirish`, R`Привести уравнение к виду $y''+py'+qy=f$`, R`Bring the equation to the form $y''+py'+qy=f$`),
        L(R`Fundamental sistema $y_1,y_2$ va $W$ ni topish`, R`Найти фундаментальную систему $y_1,y_2$ и $W$`, R`Find a fundamental set $y_1,y_2$ and $W$`),
        L(R`$C_1'=-y_2f/W$, $C_2'=y_1f/W$ ni hisoblash va integrallash`, R`Вычислить $C_1'=-y_2f/W$, $C_2'=y_1f/W$ и проинтегрировать`, R`Compute $C_1'=-y_2f/W$, $C_2'=y_1f/W$ and integrate`),
        L(R`$y=C_1(x)y_1+C_2(x)y_2$ ni yozish va tekshirish`, R`Записать $y=C_1(x)y_1+C_2(x)y_2$ и проверить`, R`Write $y=C_1(x)y_1+C_2(x)y_2$ and check`)
      ],
      explain: L(R`Normallashtirish birinchi qadam, aks holda $f$ noto‘g‘ri bo‘ladi.`, R`Приведение — первый шаг, иначе $f$ будет неверной.`, R`Normalising comes first; otherwise $f$ is wrong.`) }
  ],
  quiz: [
    { id: 't10.q1', q: L(R`Variatsiya usulida $C_1'y_1+C_2'y_2=0$ sharti nima uchun qo‘yiladi?`, R`Зачем в методе вариации ставится условие $C_1'y_1+C_2'y_2=0$?`, R`Why is the condition $C_1'y_1+C_2'y_2=0$ imposed in variation of parameters?`),
      options: [L(R`$y''$ da $C_k''$ qatnashmasligi uchun`, R`Чтобы в $y''$ не появились $C_k''$`, R`So that no $C_k''$ appears in $y''$`), L('Yechim yagona bo‘lishi uchun', 'Чтобы решение было единственным', 'To make the solution unique'), L(R`$W=0$ bo‘lishi uchun`, R`Чтобы $W=0$`, R`To make $W=0$`), L('Boshlang‘ich shartlarni qanoatlantirish uchun', 'Чтобы удовлетворить начальным условиям', 'To satisfy the initial conditions')], correct: 0,
      explain: L(R`Shunda $y'=C_1y_1'+C_2y_2'$ va masala birinchi tartibli $C_k'$ ga nisbatan algebraik sistemaga keladi.`, R`Тогда $y'=C_1y_1'+C_2y_2'$, и задача сводится к алгебраической системе для $C_k'$.`, R`Then $y'=C_1y_1'+C_2y_2'$ and the problem reduces to an algebraic system for $C_k'$.`),
      why: [null, L('Bu shart qulaylik uchun tanlangan, yagonalik bilan bog‘liq emas.', 'Условие выбрано для удобства и не связано с единственностью.', 'It is a convenience choice, unrelated to uniqueness.'), L(R`Aksincha, $W\ne0$ kerak.`, R`Наоборот, нужно $W\ne0$.`, R`On the contrary, $W\ne0$ is needed.`), L('Boshlang‘ich shartlar keyin $c_1,c_2$ orqali qo‘yiladi.', 'Начальные условия накладываются потом через $c_1,c_2$.', 'Initial conditions are applied later through $c_1,c_2$.')] },
    { id: 't10.q2', q: L(R`$y''+py'+qy=f$ uchun $C_2'$ ga to‘g‘ri formula:`, R`Верная формула для $C_2'$ в $y''+py'+qy=f$:`, R`The correct formula for $C_2'$ in $y''+py'+qy=f$:`),
      options: [L(R`$-\dfrac{y_2f}{W}$`, R`$-\dfrac{y_2f}{W}$`, R`$-\dfrac{y_2f}{W}$`), L(R`$\dfrac{y_1f}{W}$`, R`$\dfrac{y_1f}{W}$`, R`$\dfrac{y_1f}{W}$`), L(R`$\dfrac{y_2f}{W}$`, R`$\dfrac{y_2f}{W}$`, R`$\dfrac{y_2f}{W}$`), L(R`$y_1fW$`, R`$y_1fW$`, R`$y_1fW$`)], correct: 1,
      explain: L(R`Kramer: $C_2'=\dfrac{\begin{vmatrix}y_1&0\\y_1'&f\end{vmatrix}}{W}=\dfrac{y_1f}{W}$.`, R`Крамер: $C_2'=\dfrac{\begin{vmatrix}y_1&0\\y_1'&f\end{vmatrix}}{W}=\dfrac{y_1f}{W}$.`, R`Cramer: $C_2'=\dfrac{\begin{vmatrix}y_1&0\\y_1'&f\end{vmatrix}}{W}=\dfrac{y_1f}{W}$.`),
      why: [L(R`Bu $C_1'$.`, R`Это $C_1'$.`, R`That is $C_1'$.`), null, L(R`$y_1$ va $y_2$ almashgan va ishora noto‘g‘ri.`, R`Перепутаны $y_1$ и $y_2$, и неверен знак.`, R`$y_1$ and $y_2$ are swapped and the sign is wrong.`), L(R`$W$ ga bo‘linadi, ko‘paytirilmaydi.`, R`На $W$ делят, а не умножают.`, R`You divide by $W$, not multiply.`)] },
    { id: 't10.q3', q: L(R`$y_1,y_2$ — $y''+p(x)y'+q(x)y=0$ ($p,q$ uzluksiz) ning yechimlari va $W(x_0)=0$. U holda:`, R`$y_1,y_2$ — решения $y''+p(x)y'+q(x)y=0$ ($p,q$ непрерывны) и $W(x_0)=0$. Тогда:`, R`$y_1,y_2$ solve $y''+p(x)y'+q(x)y=0$ ($p,q$ continuous) and $W(x_0)=0$. Then:`),
      options: [L(R`$W$ faqat $x_0$ da nol`, R`$W$ равен нулю только в $x_0$`, R`$W$ vanishes only at $x_0$`), L(R`$W\equiv0$ va yechimlar chiziqli bog‘liq`, R`$W\equiv0$, решения линейно зависимы`, R`$W\equiv0$ and the solutions are dependent`), L('Hech narsa deyish mumkin emas', 'Ничего сказать нельзя', 'Nothing can be said'), L('Yechimlar chiziqli erkli', 'Решения линейно независимы', 'The solutions are independent')], correct: 1,
      explain: L(R`Abel: $W(x)=W(x_0)e^{-\int p}=0$ barcha $x$ da.`, R`Абель: $W(x)=W(x_0)e^{-\int p}=0$ при всех $x$.`, R`Abel: $W(x)=W(x_0)e^{-\int p}=0$ for all $x$.`),
      why: [L('Abel formulasi bunga yo‘l qo‘ymaydi.', 'Формула Абеля этого не допускает.', 'Abel’s formula rules this out.'), null, L('Yechimlar uchun Abel formulasi aniq javob beradi.', 'Для решений формула Абеля даёт точный ответ.', 'For solutions Abel’s formula gives a definite answer.'), L(R`Erklilik uchun $W\ne0$ kerak.`, R`Для независимости нужно $W\ne0$.`, R`Independence needs $W\ne0$.`)] },
    { id: 't10.q4', q: L(R`$y''-\dfrac2xy'+y=0$ ($x>0$) ning yechimlari Vronskiani:`, R`Вронскиан решений $y''-\dfrac2xy'+y=0$ ($x>0$):`, R`The Wronskian of solutions of $y''-\dfrac2xy'+y=0$ ($x>0$):`),
      options: [L(R`$\dfrac{C}{x^2}$`, R`$\dfrac{C}{x^2}$`, R`$\dfrac{C}{x^2}$`), L(R`$Cx^2$`, R`$Cx^2$`, R`$Cx^2$`), L(R`$Ce^{-2x}$`, R`$Ce^{-2x}$`, R`$Ce^{-2x}$`), L(R`$C$`, R`$C$`, R`$C$`)], correct: 1,
      explain: L(R`$p=-\frac2x$, $e^{-\int p}=e^{2\ln x}=x^2$.`, R`$p=-\frac2x$, $e^{-\int p}=e^{2\ln x}=x^2$.`, R`$p=-\frac2x$, $e^{-\int p}=e^{2\ln x}=x^2$.`),
      why: [L('Minus ishorasi yo‘qolgan.', 'Потерян знак минус.', 'A minus sign was lost.'), null, L(R`$p$ ni o‘zgarmas deb olish xato.`, R`Ошибочно считать $p$ постоянным.`, R`$p$ is not constant.`), L(R`$W$ o‘zgarmas faqat $p=0$ da.`, R`$W$ постоянен лишь при $p=0$.`, R`$W$ is constant only when $p=0$.`)] },
    { id: 't10.q5', q: L(R`$y_1=x^2$ va $y_2=x|x|$ uchun $\mathbb R$ da $W\equiv0$. Qaysi xulosa to‘g‘ri?`, R`Для $y_1=x^2$ и $y_2=x|x|$ на $\mathbb R$ имеем $W\equiv0$. Какой вывод верен?`, R`For $y_1=x^2$ and $y_2=x|x|$ we have $W\equiv0$ on $\mathbb R$. Which conclusion is correct?`),
      options: [L('Ular chiziqli bog‘liq', 'Они линейно зависимы', 'They are dependent'), L(R`Ular $(-1,1)$ da chiziqli erkli; ular uzluksiz koeffitsiyentli bitta $y''+py'+qy=0$ ning yechimlari emas`, R`Они линейно независимы на $(-1,1)$ и не являются решениями одного $y''+py'+qy=0$ с непрерывными коэффициентами`, R`They are independent on $(-1,1)$ and are not solutions of one $y''+py'+qy=0$ with continuous coefficients`), L('Abel formulasi buzilgan', 'Формула Абеля нарушена', 'Abel’s formula is violated'), L(R`$W$ noto‘g‘ri hisoblangan`, R`$W$ вычислен неверно`, R`$W$ was computed wrongly`)], correct: 1,
      explain: L(R`$x>0$ da $y_2=y_1$, $x<0$ da $y_2=-y_1$ — bitta o‘zgarmas yo‘q, shuning uchun erkli. Abel bu funksiyalarga taalluqli emas.`, R`При $x>0$ $y_2=y_1$, при $x<0$ $y_2=-y_1$ — общей постоянной нет, поэтому независимы. Абель к ним не применим.`, R`For $x>0$, $y_2=y_1$; for $x<0$, $y_2=-y_1$; no single constant works, so they are independent. Abel does not apply to them.`),
      why: [L(R`Bitta $C$ bilan $y_2=Cy_1$ bo‘lmaydi.`, R`Нет одного $C$ с $y_2=Cy_1$.`, R`No single $C$ gives $y_2=Cy_1$.`), null, L('Formula faqat yechimlar uchun; bu yerda shart bajarilmagan.', 'Формула — только для решений; здесь условие не выполнено.', 'The formula is for solutions only; that hypothesis fails here.'), L(R`$W\equiv0$ haqiqatan.`, R`$W\equiv0$ действительно.`, R`$W\equiv0$ is indeed true.`)] },
    { id: 't10.q6', q: L(R`$y_1$ ma’lum bo‘lsa, ikkinchi yechim formulasi:`, R`Формула второго решения при известном $y_1$:`, R`The second-solution formula when $y_1$ is known:`),
      options: [L(R`$y_1\displaystyle\int\frac{e^{-\int p}}{y_1^2}dx$`, R`$y_1\displaystyle\int\frac{e^{-\int p}}{y_1^2}dx$`, R`$y_1\displaystyle\int\frac{e^{-\int p}}{y_1^2}dx$`), L(R`$y_1\displaystyle\int\frac{e^{\int p}}{y_1^2}dx$`, R`$y_1\displaystyle\int\frac{e^{\int p}}{y_1^2}dx$`, R`$y_1\displaystyle\int\frac{e^{\int p}}{y_1^2}dx$`), L(R`$y_1\displaystyle\int y_1^2\,dx$`, R`$y_1\displaystyle\int y_1^2\,dx$`, R`$y_1\displaystyle\int y_1^2\,dx$`), L(R`$xy_1$`, R`$xy_1$`, R`$xy_1$`)], correct: 0,
      explain: L(R`$(y_2/y_1)'=W/y_1^2$ va $W=e^{-\int p}$.`, R`$(y_2/y_1)'=W/y_1^2$ и $W=e^{-\int p}$.`, R`$(y_2/y_1)'=W/y_1^2$ and $W=e^{-\int p}$.`),
      why: [null, L(R`Eksponentadagi ishora xato.`, R`Неверный знак в экспоненте.`, R`Wrong sign in the exponent.`), L(R`$y_1^2$ maxrajda bo‘lishi kerak.`, R`$y_1^2$ должно быть в знаменателе.`, R`$y_1^2$ belongs in the denominator.`), L('Bu faqat o‘zgarmas koeffitsiyent va karrali ildizda.', 'Это только для постоянных коэффициентов и кратного корня.', 'That works only for a repeated root with constant coefficients.')] },
    { id: 't10.q7', q: L(R`Qaysi tenglama uchun noma’lum koeffitsiyentlar usulini qo‘llab **bo‘lmaydi**?`, R`Для какого уравнения метод неопределённых коэффициентов **неприменим**?`, R`For which equation can undetermined coefficients **not** be used?`),
      options: [L(R`$y''+y=e^x\cos x$`, R`$y''+y=e^x\cos x$`, R`$y''+y=e^x\cos x$`), L(R`$y''-y=x^3$`, R`$y''-y=x^3$`, R`$y''-y=x^3$`), L(R`$x^2y''+y=x$`, R`$x^2y''+y=x$`, R`$x^2y''+y=x$`), L(R`$y'''=\sin x$`, R`$y'''=\sin x$`, R`$y'''=\sin x$`)], correct: 2,
      explain: L('Koeffitsiyent $x^2$ o‘zgaruvchan — NK usuli faqat o‘zgarmas koeffitsiyentlar uchun.', 'Коэффициент $x^2$ переменный — метод НК только для постоянных коэффициентов.', 'The coefficient $x^2$ is variable; UC is for constant coefficients only.'),
      why: [L('Kvaziko‘phad, o‘zgarmas koeffitsiyent — NK ishlaydi.', 'Квазимногочлен и постоянные коэффициенты — НК работает.', 'Quasi-polynomial with constant coefficients: UC works.'), L('Ko‘phad o‘ng tomon — NK ishlaydi.', 'Правая часть — многочлен, НК работает.', 'A polynomial right side: UC works.'), null, L(R`$\sin x$ kvaziko‘phad, NK ishlaydi.`, R`$\sin x$ — квазимногочлен, НК работает.`, R`$\sin x$ is a quasi-polynomial: UC works.`)] },
    { id: 't10.q8', q: L(R`$n$-tartibli variatsiya usulida $C_k'$ uchun sistemaning determinanti:`, R`Определитель системы для $C_k'$ в методе вариации для порядка $n$:`, R`The determinant of the system for $C_k'$ in variation of parameters of order $n$:`),
      options: [L('Vronskian', 'Вронскиан', 'The Wronskian'), L(R`$f(x)$`, R`$f(x)$`, R`$f(x)$`), L('Xarakteristik ko‘phad', 'Характеристический многочлен', 'The characteristic polynomial'), L('Har doim 1', 'Всегда 1', 'Always 1')], correct: 0,
      explain: L(R`Satrlar $y_k,y_k',\dots,y_k^{(n-1)}$ — bu $W$.`, R`Строки $y_k,y_k',\dots,y_k^{(n-1)}$ — это $W$.`, R`The rows $y_k,y_k',\dots,y_k^{(n-1)}$ form $W$.`),
      why: [null, L(R`$f$ faqat o‘ng tomon ustunida.`, R`$f$ стоит лишь в столбце правой части.`, R`$f$ only appears in the right-hand column.`), L(R`Koeffitsiyentlar o‘zgaruvchan bo‘lishi ham mumkin.`, R`Коэффициенты могут быть и переменными.`, R`The coefficients may even be variable.`), L(R`Masalan, $e^x,e^{-x}$ uchun $W=-2$.`, R`Например, для $e^x,e^{-x}$ $W=-2$.`, R`For example $W=-2$ for $e^x,e^{-x}$.`)] },
    { id: 't10.q9', q: L(R`$y'''+2y''+y'+y=0$ ning yechimlari Vronskiani:`, R`Вронскиан решений $y'''+2y''+y'+y=0$:`, R`The Wronskian of solutions of $y'''+2y''+y'+y=0$:`),
      options: [L(R`$Ce^{2x}$`, R`$Ce^{2x}$`, R`$Ce^{2x}$`), L(R`$Ce^{-2x}$`, R`$Ce^{-2x}$`, R`$Ce^{-2x}$`), L(R`$Ce^{-x}$`, R`$Ce^{-x}$`, R`$Ce^{-x}$`), L(R`$C$`, R`$C$`, R`$C$`)], correct: 1,
      explain: L(R`$n$-tartib: $W=W(x_0)e^{-\int a_1}$, $a_1=2$ — $y''$ oldidagi koeffitsiyent.`, R`Порядок $n$: $W=W(x_0)e^{-\int a_1}$, $a_1=2$ — коэффициент при $y''$.`, R`Order $n$: $W=W(x_0)e^{-\int a_1}$, with $a_1=2$ the coefficient of $y''$.`),
      why: [L('Ishora xato.', 'Неверный знак.', 'Wrong sign.'), null, L(R`$y'$ yoki $y$ oldidagi koeffitsiyent emas, $y^{(n-1)}$ oldidagisi olinadi.`, R`Берётся коэффициент при $y^{(n-1)}$, а не при $y'$ или $y$.`, R`Use the coefficient of $y^{(n-1)}$, not of $y'$ or $y$.`), L(R`$a_1\ne0$.`, R`$a_1\ne0$.`, R`$a_1\ne0$.`)] },
    { id: 't10.q10', q: L(R`$y''+y=\tan x$ ($|x|<\pi/2$) uchun $C_2'(x)$:`, R`$C_2'(x)$ для $y''+y=\tan x$ ($|x|<\pi/2$):`, R`$C_2'(x)$ for $y''+y=\tan x$ ($|x|<\pi/2$):`),
      options: [L(R`$\sin x$`, R`$\sin x$`, R`$\sin x$`), L(R`$-\dfrac{\sin^2x}{\cos x}$`, R`$-\dfrac{\sin^2x}{\cos x}$`, R`$-\dfrac{\sin^2x}{\cos x}$`), L(R`$\tan x$`, R`$\tan x$`, R`$\tan x$`), L(R`$\cos x$`, R`$\cos x$`, R`$\cos x$`)], correct: 0,
      explain: L(R`$y_1=\cos x$, $W=1$: $C_2'=y_1f=\cos x\tan x=\sin x$.`, R`$y_1=\cos x$, $W=1$: $C_2'=y_1f=\cos x\tan x=\sin x$.`, R`$y_1=\cos x$, $W=1$: $C_2'=y_1f=\cos x\tan x=\sin x$.`),
      why: [null, L(R`Bu $C_1'=-y_2f$.`, R`Это $C_1'=-y_2f$.`, R`That is $C_1'=-y_2f$.`), L(R`$y_1$ ga ko‘paytirish unutilgan.`, R`Забыто умножение на $y_1$.`, R`The factor $y_1$ is missing.`), L(R`$f$ ga ko‘paytirish unutilgan.`, R`Забыто умножение на $f$.`, R`The factor $f$ is missing.`)] }
  ]
});
})();
