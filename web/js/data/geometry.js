/* Geometric interpretation section: classical geometry of ODEs and PDEs (math checked with sympy). */
(function () {
  const L = DT.L, R = DT.R;
  DT.GEOMETRY = [
    {
      id: 'g1',
      title: L('Tenglama — yo‘nalish maydoni', 'Уравнение как поле направлений', 'An equation as a direction field'),
      topics: ['t01'],
      blocks: [
        { type: 'def', title: L('Yo‘nalish maydoni, integral chiziq, izoklina', 'Поле направлений, интегральная кривая, изоклина', 'Direction field, integral curve, isocline'),
          body: L(R`$y'=f(x,y)$ tenglama $D$ sohaning har bir $(x,y)$ nuqtasiga burchak koeffitsiyenti $f(x,y)$ bo‘lgan yo‘nalishni mos qo‘yadi. Bu yo‘nalishlar to‘plami — **yo‘nalish maydoni**.

- **Integral chiziq** — har bir nuqtasida maydon yo‘nalishiga urinadigan egri chiziq. Tenglamani yechish — shunday chiziqlarni topish demakdir.
- **Izoklina** — $f(x,y)=k$ chiziq: unda barcha kesmalar bir xil og‘ishga ega. $k=0$ izoklinada integral chiziqlarning gorizontal urinmalari (ko‘pincha ekstremumlari) yotadi.`,
          R`Уравнение $y'=f(x,y)$ сопоставляет каждой точке $(x,y)$ области $D$ направление с угловым коэффициентом $f(x,y)$. Совокупность этих направлений — **поле направлений**.

- **Интегральная кривая** — кривая, в каждой точке касающаяся направления поля. Решить уравнение — значит найти такие кривые.
- **Изоклина** — линия $f(x,y)=k$: на ней все отрезки имеют одинаковый наклон. На изоклине $k=0$ лежат горизонтальные касательные (часто экстремумы) интегральных кривых.`,
          R`The equation $y'=f(x,y)$ assigns to each point $(x,y)$ of a region $D$ a direction with slope $f(x,y)$. The set of these directions is the **direction field**.

- An **integral curve** is a curve that is tangent to the field direction at each of its points. Solving the equation means finding such curves.
- An **isocline** is a curve $f(x,y)=k$: all segments on it have the same slope. The isocline $k=0$ carries the horizontal tangents (often the extrema) of the integral curves.`) },
        { type: 'example', title: L('$y\'=x-y$ maydoni', 'Поле $y\'=x-y$', 'The field of $y\'=x-y$'),
          body: L(R`$y'=x-y$ tenglamaning izoklinalarini toping va integral chiziqlarning shaklini yechmasdan tavsiflang. So‘ng natijani umumiy yechim bilan solishtiring.`,
            R`Найдите изоклины уравнения $y'=x-y$ и опишите форму интегральных кривых, не решая уравнения. Затем сравните с общим решением.`,
            R`Find the isoclines of $y'=x-y$ and describe the shape of the integral curves without solving. Then compare with the general solution.`),
          steps: [
            L(R`Izoklinalar: $x-y=k$, ya’ni $y=x-k$ — og‘ishi $1$ bo‘lgan parallel to‘g‘ri chiziqlar.`, R`Изоклины: $x-y=k$, то есть $y=x-k$ — параллельные прямые с наклоном $1$.`, R`Isoclines: $x-y=k$, i.e. $y=x-k$, parallel lines of slope $1$.`),
            L(R`$k=0$: $y=x$ chiziqda kesmalar gorizontal. $y<x$ da $y'>0$ (o‘sish), $y>x$ da $y'<0$ (kamayish). Demak, integral chiziqlar $y=x$ ni kesib o‘tganda minimumga ega.`, R`$k=0$: на прямой $y=x$ отрезки горизонтальны. При $y<x$ имеем $y'>0$ (рост), при $y>x$ — $y'<0$ (убывание). Значит, интегральные кривые имеют минимум при пересечении $y=x$.`, R`$k=0$: on the line $y=x$ the segments are horizontal. For $y<x$ we have $y'>0$ (increasing), for $y>x$ we have $y'<0$ (decreasing). So integral curves have a minimum where they cross $y=x$.`),
            L(R`$k=1$: $y=x-1$ izoklinada kesmalar og‘ishi $1$ — chiziqning o‘z og‘ishi bilan bir xil. Demak, bu izoklinaning o‘zi integral chiziq.`, R`$k=1$: на изоклине $y=x-1$ наклон отрезков равен $1$ — совпадает с наклоном самой прямой. Значит, эта изоклина сама является интегральной кривой.`, R`$k=1$: on the isocline $y=x-1$ the segment slope is $1$, the same as the slope of the line itself. So this isocline is itself an integral curve.`),
            L(R`Chiziqli tenglama sifatida yechsak: $y=x-1+Ce^{-x}$. $x\to+\infty$ da $Ce^{-x}\to0$, barcha chiziqlar $y=x-1$ ga yaqinlashadi — rasmda ko‘ringanidek.`, R`Решив как линейное уравнение, получаем $y=x-1+Ce^{-x}$. При $x\to+\infty$ имеем $Ce^{-x}\to0$, все кривые приближаются к $y=x-1$ — как и видно на рисунке.`, R`Solving it as a linear equation gives $y=x-1+Ce^{-x}$. As $x\to+\infty$, $Ce^{-x}\to0$ and every curve approaches $y=x-1$, as the picture shows.`)
          ],
          check: L(R`$y=x-1+Ce^{-x}$: $y'=1-Ce^{-x}$, $x-y=1-Ce^{-x}$ ✓. $C=0$ da $y=x-1$ ✓.`, R`$y=x-1+Ce^{-x}$: $y'=1-Ce^{-x}$, $x-y=1-Ce^{-x}$ ✓. При $C=0$ получаем $y=x-1$ ✓.`, R`$y=x-1+Ce^{-x}$: $y'=1-Ce^{-x}$, $x-y=1-Ce^{-x}$ ✓. $C=0$ gives $y=x-1$ ✓.`) },
        { type: 'warn', body: L(R`Izoklina, odatda, integral chiziq **emas**: unda faqat kesmalar og‘ishi o‘zgarmas. Izoklina integral chiziq bo‘ladi faqat uning o‘z og‘ishi $k$ ga teng bo‘lsa (yuqoridagi $y=x-1$ kabi).`,
          R`Изоклина, как правило, **не** является интегральной кривой: на ней постоянен лишь наклон отрезков. Изоклина будет интегральной кривой, только если её собственный наклон равен $k$ (как $y=x-1$ выше).`,
          R`An isocline is usually **not** an integral curve: only the slope of the segments is constant on it. An isocline is an integral curve only if its own slope equals $k$ (like $y=x-1$ above).`) }
      ],
      plot: { kind: 'field', f: 'x - y', curves: [[-3, 3], [-3, 1], [-3, -1], [-3, -3], [0, -1], [0, 1], [-1, 2]], x: [-3, 3], y: [-3, 3] }
    },
    {
      id: 'g2',
      title: L('Mavjudlik va yagonalik — geometrik ko‘rinish', 'Существование и единственность — геометрически', 'Existence and uniqueness, geometrically'),
      topics: ['t01'],
      blocks: [
        { type: 'text', title: L('Integral chiziqlar kesishmaydi', 'Интегральные кривые не пересекаются', 'Integral curves do not cross'),
          body: L(R`Pikar teoremasiga ko‘ra, agar $D$ sohada $f(x,y)$ va $\partial f/\partial y$ uzluksiz bo‘lsa, $D$ ning har bir nuqtasidan **bitta va faqat bitta** integral chiziq o‘tadi.

Geometrik ma’nosi: bunday sohada integral chiziqlar bir-birini kesib o‘tmaydi va bir-biriga urinmaydi — ular sohani "qatlamlarga" ajratadi. Agar ikki chiziq bitta nuqtada uchrashsa, shu nuqtadan o‘tuvchi Koshi masalasi ikki yechimga ega bo‘lardi.

Shartlar buziladigan joyda (masalan, $\partial f/\partial y$ cheksiz bo‘lsa) chiziqlar uchrashishi mumkin.`,
          R`По теореме Пикара, если в области $D$ функции $f(x,y)$ и $\partial f/\partial y$ непрерывны, то через каждую точку $D$ проходит **одна и только одна** интегральная кривая.

Геометрический смысл: в такой области интегральные кривые не пересекаются и не касаются друг друга — они расслаивают область. Если бы две кривые встретились в точке, задача Коши с этой точкой имела бы два решения.

Там, где условия нарушены (например, $\partial f/\partial y$ бесконечна), кривые могут встречаться.`,
          R`By Picard’s theorem, if $f(x,y)$ and $\partial f/\partial y$ are continuous in a region $D$, then **exactly one** integral curve passes through each point of $D$.

Geometrically: in such a region integral curves neither cross nor touch each other; they split the region into layers. If two curves met at a point, the Cauchy problem at that point would have two solutions.

Where the hypotheses fail (for example, $\partial f/\partial y$ is infinite), curves can meet.`) },
        { type: 'example', title: L('$y\'=3y^{2/3}$: chiziqlar urinadi', '$y\'=3y^{2/3}$: кривые касаются', '$y\'=3y^{2/3}$: curves touch'),
          body: L(R`$y'=3y^{2/3}$ ($y^{2/3}=\sqrt[3]{y^2}$) tenglama uchun $(0;0)$ nuqtadan o‘tuvchi integral chiziqlarni toping.`, R`Для уравнения $y'=3y^{2/3}$ ($y^{2/3}=\sqrt[3]{y^2}$) найдите интегральные кривые, проходящие через точку $(0;0)$.`, R`For $y'=3y^{2/3}$ (with $y^{2/3}=\sqrt[3]{y^2}$) find the integral curves through the point $(0,0)$.`),
          steps: [
            L(R`Shartlarni tekshiramiz: $f=3y^{2/3}$ hamma joyda uzluksiz, lekin $f_y=2y^{-1/3}$ $y=0$ da mavjud emas. Demak, $Ox$ o‘qida yagonalik kafolatlanmagan.`, R`Проверяем условия: $f=3y^{2/3}$ непрерывна всюду, но $f_y=2y^{-1/3}$ не существует при $y=0$. Значит, на оси $Ox$ единственность не гарантирована.`, R`Check the hypotheses: $f=3y^{2/3}$ is continuous everywhere, but $f_y=2y^{-1/3}$ does not exist at $y=0$. So uniqueness is not guaranteed on the $x$-axis.`),
            L(R`$y\ne0$ da o‘zgaruvchilarni ajratamiz: $\frac{dy}{3y^{2/3}}=dx$, $y^{1/3}=x-C$, ya’ni $y=(x-C)^3$ — kubik parabolalar oilasi.`, R`При $y\ne0$ разделяем переменные: $\frac{dy}{3y^{2/3}}=dx$, $y^{1/3}=x-C$, то есть $y=(x-C)^3$ — семейство кубических парабол.`, R`For $y\ne0$ separate variables: $\frac{dy}{3y^{2/3}}=dx$, $y^{1/3}=x-C$, i.e. $y=(x-C)^3$, a family of cubic parabolas.`),
            L(R`Bo‘lishda yo‘qolgan $y=0$ ham yechim. $(0;0)$ dan kamida ikki chiziq o‘tadi: $y=0$ va $y=x^3$; ular bu nuqtada **urinadi**.`, R`Решение $y=0$, потерянное при делении, тоже годится. Через $(0;0)$ проходят как минимум две кривые: $y=0$ и $y=x^3$; в этой точке они **касаются**.`, R`The solution $y=0$, lost when dividing, also works. At least two curves pass through $(0,0)$: $y=0$ and $y=x^3$; they **touch** there.`),
            L(R`Aslida cheksiz ko‘p: istalgan $a\ge0$ uchun $y=0$ ($x\le a$), $y=(x-a)^3$ ($x>a$) "yopishtirilgan" funksiya ham yechim. $y=0$ — maxsus yechim: uning har bir nuqtasida yagonalik buziladi.`, R`На самом деле их бесконечно много: при любом $a\ge0$ «склеенная» функция $y=0$ ($x\le a$), $y=(x-a)^3$ ($x>a$) тоже решение. $y=0$ — особое решение: в каждой его точке единственность нарушена.`, R`In fact there are infinitely many: for any $a\ge0$ the glued function $y=0$ ($x\le a$), $y=(x-a)^3$ ($x>a$) is also a solution. $y=0$ is a singular solution: uniqueness fails at each of its points.`)
          ],
          check: L(R`$y=(x-C)^3$: $y'=3(x-C)^2$, $3y^{2/3}=3\big((x-C)^3\big)^{2/3}=3(x-C)^2$ ✓. $y=0$: $0=0$ ✓.`, R`$y=(x-C)^3$: $y'=3(x-C)^2$, $3y^{2/3}=3\big((x-C)^3\big)^{2/3}=3(x-C)^2$ ✓. $y=0$: $0=0$ ✓.`, R`$y=(x-C)^3$: $y'=3(x-C)^2$, $3y^{2/3}=3\big((x-C)^3\big)^{2/3}=3(x-C)^2$ ✓. $y=0$: $0=0$ ✓.`) },
        { type: 'warn', body: L(R`Teorema shartlari **yetarli**, zarur emas: $f_y$ cheksiz bo‘lgan joyda ham yagonalik saqlanishi mumkin. Sonli usul har doim bitta chiziq chizadi — bu masala yagona yechimga ega degani emas.`,
          R`Условия теоремы **достаточные**, но не необходимые: и там, где $f_y$ бесконечна, единственность может сохраняться. Численный метод всегда рисует одну кривую — это не означает, что решение единственно.`,
          R`The hypotheses are **sufficient**, not necessary: uniqueness may still hold where $f_y$ is infinite. A numerical method always draws one curve; that does not mean the solution is unique.`) }
      ],
      plot: { kind: 'family', fns: ['(x - C)^3', '0*x'], C: [-2, -1, 0, 1, 2], x: [-3, 3], y: [-4, 4] }
    },
    {
      id: 'g3',
      title: L('Egri chiziqlar oilasi va ortogonal traektoriyalar', 'Семейства кривых и ортогональные траектории', 'Families of curves and orthogonal trajectories'),
      topics: ['t01', 't02'],
      blocks: [
        { type: 'text', title: L('Oiladan tenglamaga', 'От семейства к уравнению', 'From a family to an equation'),
          body: L(R`Bir parametrli $\Phi(x,y,C)=0$ egri chiziqlar oilasi berilgan bo‘lsin. Uni $x$ bo‘yicha differensiallaymiz va hosil bo‘lgan tenglama bilan birga $C$ ni **yo‘qotamiz**. Natija — oila uchun differensial tenglama $F(x,y,y')=0$; oilaning chiziqlari uning integral chiziqlari.

**Ortogonal traektoriyalar** — oilaning har bir chizig‘ini to‘g‘ri burchak ostida kesuvchi chiziqlar. Urinmalar perpendikulyar bo‘lishi uchun og‘ishlar ko‘paytmasi $-1$ bo‘lishi kerak, shuning uchun tenglamada $y'$ ni $-1/y'$ ga almashtiramiz.`,
          R`Пусть дано однопараметрическое семейство кривых $\Phi(x,y,C)=0$. Дифференцируем по $x$ и вместе с исходным равенством **исключаем** $C$. Получаем дифференциальное уравнение семейства $F(x,y,y')=0$; кривые семейства — его интегральные кривые.

**Ортогональные траектории** — кривые, пересекающие каждую кривую семейства под прямым углом. Касательные перпендикулярны, когда произведение наклонов равно $-1$, поэтому в уравнении заменяем $y'$ на $-1/y'$.`,
          R`Let a one-parameter family of curves $\Phi(x,y,C)=0$ be given. Differentiate with respect to $x$ and, together with the original relation, **eliminate** $C$. The result is the differential equation of the family $F(x,y,y')=0$; the curves of the family are its integral curves.

**Orthogonal trajectories** are curves that cut every curve of the family at a right angle. Tangents are perpendicular when the product of slopes is $-1$, so we replace $y'$ by $-1/y'$ in the equation.`) },
        { type: 'example', title: L('$y=Cx^2$ parabolalariga ortogonal chiziqlar', 'Ортогональные траектории парабол $y=Cx^2$', 'Orthogonal trajectories of the parabolas $y=Cx^2$'),
          body: L(R`$y=Cx^2$ oilaning differensial tenglamasini va ortogonal traektoriyalarini toping.`, R`Найдите дифференциальное уравнение семейства $y=Cx^2$ и его ортогональные траектории.`, R`Find the differential equation of the family $y=Cx^2$ and its orthogonal trajectories.`),
          steps: [
            L(R`Differensiallaymiz: $y'=2Cx$. Oiladan $C=y/x^2$ ($x\ne0$).`, R`Дифференцируем: $y'=2Cx$. Из семейства $C=y/x^2$ ($x\ne0$).`, R`Differentiate: $y'=2Cx$. From the family, $C=y/x^2$ ($x\ne0$).`),
            L(R`$C$ ni yo‘qotamiz: $y'=\dfrac{2y}{x}$ — oilaning tenglamasi.`, R`Исключаем $C$: $y'=\dfrac{2y}{x}$ — уравнение семейства.`, R`Eliminate $C$: $y'=\dfrac{2y}{x}$, the equation of the family.`),
            L(R`Ortogonal oila: $y'\to-1/y'$, ya’ni $-\dfrac1{y'}=\dfrac{2y}x$, $y'=-\dfrac{x}{2y}$.`, R`Ортогональное семейство: $y'\to-1/y'$, то есть $-\dfrac1{y'}=\dfrac{2y}x$, $y'=-\dfrac{x}{2y}$.`, R`Orthogonal family: $y'\to-1/y'$, i.e. $-\dfrac1{y'}=\dfrac{2y}x$, $y'=-\dfrac{x}{2y}$.`),
            L(R`O‘zgaruvchilarni ajratamiz: $2y\,dy=-x\,dx$, $y^2=-\frac{x^2}2+\text{const}$, ya’ni $x^2+2y^2=K$ — markazi koordinata boshida bo‘lgan ellipslar.`, R`Разделяем переменные: $2y\,dy=-x\,dx$, $y^2=-\frac{x^2}2+\text{const}$, то есть $x^2+2y^2=K$ — эллипсы с центром в начале координат.`, R`Separate variables: $2y\,dy=-x\,dx$, $y^2=-\frac{x^2}2+\text{const}$, i.e. $x^2+2y^2=K$, ellipses centred at the origin.`)
          ],
          check: L(R`Ellipsda $y'=-\frac{x}{2y}$, parabolada $y'=\frac{2y}{x}$; ko‘paytma $-\frac{x}{2y}\cdot\frac{2y}{x}=-1$ ✓.`, R`На эллипсе $y'=-\frac{x}{2y}$, на параболе $y'=\frac{2y}{x}$; произведение $-\frac{x}{2y}\cdot\frac{2y}{x}=-1$ ✓.`, R`On an ellipse $y'=-\frac{x}{2y}$, on a parabola $y'=\frac{2y}{x}$; the product is $-\frac{x}{2y}\cdot\frac{2y}{x}=-1$ ✓.`) },
        { type: 'warn', body: L(R`$-1/y'$ almashtirishni $C$ **yo‘qotilgandan keyin** bajaring. Agar tenglamada $C$ qolsa, har bir chiziq uchun boshqa "ortogonal" chiziq hosil bo‘ladi va natija oila bo‘lmaydi. Shuningdek, $x=0$ yoki $y=0$ kabi bo‘lingan nuqtalarni alohida qarang.`,
          R`Замену $y'\to-1/y'$ делайте **после исключения** $C$. Если $C$ осталась в уравнении, для каждой кривой получится своя «ортогональная» кривая, и результат не будет семейством. Отдельно рассмотрите точки, где делили на ноль ($x=0$, $y=0$).`,
          R`Make the replacement $y'\to-1/y'$ **after eliminating** $C$. If $C$ is still in the equation, each curve gets its own "orthogonal" curve and the result is not a family. Also treat separately the points where you divided by zero ($x=0$, $y=0$).`) }
      ],
      plot: { kind: 'family', fns: ['C*x^2', 'sqrt((C^2 - x^2)/2)', '-sqrt((C^2 - x^2)/2)'], C: [-2, -1, -0.5, 0.5, 1, 2], x: [-2.5, 2.5], y: [-2.5, 2.5] }
    },
    {
      id: 'g4',
      title: L('O‘ram chiziq va maxsus yechim', 'Огибающая и особое решение', 'Envelopes and singular solutions'),
      topics: ['t05'],
      blocks: [
        { type: 'def', title: L('Oila o‘rami', 'Огибающая семейства', 'Envelope of a family'),
          body: L(R`$\Phi(x,y,C)=0$ oilaning **o‘rami** — har bir nuqtasida oilaning biror chizig‘iga urinadigan va o‘zi oilaga kirmaydigan chiziq. Uni quyidagi sistemadan $C$ ni yo‘qotib izlaymiz ($C$-diskriminant):
$$\Phi(x,y,C)=0,\qquad \frac{\partial\Phi}{\partial C}(x,y,C)=0.$$
Agar oila — differensial tenglamaning umumiy yechimi bo‘lsa, o‘ram ham yechim bo‘ladi: har bir nuqtada u oila chizig‘i bilan bir xil $(x,y,y')$ ga ega. Bu **maxsus yechim**: uning har bir nuqtasidan ikki integral chiziq o‘tadi.`,
          R`**Огибающая** семейства $\Phi(x,y,C)=0$ — кривая, которая в каждой своей точке касается некоторой кривой семейства и сама в семейство не входит. Её ищут, исключая $C$ из системы ($C$-дискриминант):
$$\Phi(x,y,C)=0,\qquad \frac{\partial\Phi}{\partial C}(x,y,C)=0.$$
Если семейство — общее решение дифференциального уравнения, огибающая тоже решение: в каждой точке у неё те же $(x,y,y')$, что у кривой семейства. Это **особое решение**: через каждую его точку проходят две интегральные кривые.`,
          R`An **envelope** of the family $\Phi(x,y,C)=0$ is a curve that at each of its points touches some curve of the family and is not itself a member. It is found by eliminating $C$ from the system (the $C$-discriminant):
$$\Phi(x,y,C)=0,\qquad \frac{\partial\Phi}{\partial C}(x,y,C)=0.$$
If the family is the general solution of a differential equation, the envelope is also a solution: at each point it has the same $(x,y,y')$ as a curve of the family. It is a **singular solution**: two integral curves pass through each of its points.`) },
        { type: 'example', title: L('Klero tenglamasi $y=xy\'-y\'^2$', 'Уравнение Клеро $y=xy\'-y\'^2$', 'The Clairaut equation $y=xy\'-y\'^2$'),
          body: L(R`$y=xy'-(y')^2$ tenglamaning umumiy va maxsus yechimlarini toping va ularni geometrik izohlang.`, R`Найдите общее и особое решения уравнения $y=xy'-(y')^2$ и объясните их геометрически.`, R`Find the general and singular solutions of $y=xy'-(y')^2$ and explain them geometrically.`),
          steps: [
            L(R`Bu Klero tenglamasi $y=xp+f(p)$, bunda $p=y'$, $f(p)=-p^2$. Differensiallaymiz: $p=p+xp'-2pp'$, ya’ni $p'(x-2p)=0$.`, R`Это уравнение Клеро $y=xp+f(p)$, где $p=y'$, $f(p)=-p^2$. Дифференцируем: $p=p+xp'-2pp'$, то есть $p'(x-2p)=0$.`, R`This is a Clairaut equation $y=xp+f(p)$ with $p=y'$, $f(p)=-p^2$. Differentiate: $p=p+xp'-2pp'$, i.e. $p'(x-2p)=0$.`),
            L(R`$p'=0$: $p=C$, umumiy yechim $y=Cx-C^2$ — to‘g‘ri chiziqlar oilasi.`, R`$p'=0$: $p=C$, общее решение $y=Cx-C^2$ — семейство прямых.`, R`$p'=0$: $p=C$, the general solution $y=Cx-C^2$, a family of straight lines.`),
            L(R`$x-2p=0$: $p=x/2$, $y=x\cdot\frac x2-\frac{x^2}4=\frac{x^2}4$ — parabola.`, R`$x-2p=0$: $p=x/2$, $y=x\cdot\frac x2-\frac{x^2}4=\frac{x^2}4$ — парабола.`, R`$x-2p=0$: $p=x/2$, $y=x\cdot\frac x2-\frac{x^2}4=\frac{x^2}4$, a parabola.`),
            L(R`$C$-diskriminant bilan tekshiramiz: $\Phi=Cx-C^2-y$, $\Phi_C=x-2C=0$, $C=x/2$, $y=x^2/4$. Parabola — to‘g‘ri chiziqlar o‘rami: $y=Cx-C^2$ chiziq parabolaga $x=2C$ nuqtada urinadi.`, R`Проверяем через $C$-дискриминант: $\Phi=Cx-C^2-y$, $\Phi_C=x-2C=0$, $C=x/2$, $y=x^2/4$. Парабола — огибающая прямых: прямая $y=Cx-C^2$ касается параболы в точке $x=2C$.`, R`Check with the $C$-discriminant: $\Phi=Cx-C^2-y$, $\Phi_C=x-2C=0$, $C=x/2$, $y=x^2/4$. The parabola is the envelope of the lines: the line $y=Cx-C^2$ touches it at $x=2C$.`)
          ],
          check: L(R`$y=\frac{x^2}4$: $y'=\frac x2$, $xy'-y'^2=\frac{x^2}2-\frac{x^2}4=\frac{x^2}4=y$ ✓. $y=Cx-C^2$: $xC-C^2=y$ ✓.`, R`$y=\frac{x^2}4$: $y'=\frac x2$, $xy'-y'^2=\frac{x^2}2-\frac{x^2}4=\frac{x^2}4=y$ ✓. $y=Cx-C^2$: $xC-C^2=y$ ✓.`, R`$y=\frac{x^2}4$: $y'=\frac x2$, $xy'-y'^2=\frac{x^2}2-\frac{x^2}4=\frac{x^2}4=y$ ✓. $y=Cx-C^2$: $xC-C^2=y$ ✓.`) },
        { type: 'warn', body: L(R`Diskriminant chizig‘i har doim ham o‘ram emas: unda oila chiziqlarining tugun yoki qaytish nuqtalari yotishi mumkin. Topilgan chiziqni tenglamaga qo‘yib tekshiring. Maxsus yechim umumiy yechimdan hech qanday $C$ da olinmaydi.`,
          R`Дискриминантная кривая не всегда огибающая: на ней могут лежать узловые точки или точки возврата кривых семейства. Подставьте найденную кривую в уравнение. Особое решение не получается из общего ни при каком $C$.`,
          R`A discriminant curve is not always an envelope: it may consist of nodes or cusps of the family’s curves. Substitute the curve into the equation to check. A singular solution is not obtained from the general one for any $C$.`) }
      ],
      plot: { kind: 'family', fns: ['C*x - C^2', 'x^2/4'], C: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2], x: [-4, 4], y: [-3, 4] }
    },
    {
      id: 'g5',
      title: L('Avtonom tenglama: faza chizig‘i', 'Автономное уравнение: фазовая прямая', 'Autonomous equations: the phase line'),
      topics: ['t02'],
      blocks: [
        { type: 'def', title: L('Muvozanat va barqarorlik', 'Равновесие и устойчивость', 'Equilibrium and stability'),
          body: L(R`$y'=f(y)$ tenglama **avtonom** deyiladi: o‘ng tomon $x$ ga bog‘liq emas, shuning uchun yo‘nalish maydoni gorizontal siljishda o‘zgarmaydi. Barcha ma’lumot $y$ o‘qida — **faza chizig‘ida** — saqlanadi.

- $f(y^*)=0$ bo‘lsa, $y=y^*$ o‘zgarmas yechim — **muvozanat holati**.
- $f>0$ bo‘lgan oraliqlarda yechim o‘sadi (strelka yuqoriga), $f<0$ da kamayadi.
- Ikki tomondan strelkalar $y^*$ ga qarasa — **barqaror** muvozanat, undan qochsa — **barqaror emas**. Yetarli shart: $f'(y^*)<0$ barqaror, $f'(y^*)>0$ barqaror emas.`,
          R`Уравнение $y'=f(y)$ называется **автономным**: правая часть не зависит от $x$, поэтому поле направлений не меняется при горизонтальном сдвиге. Вся информация хранится на оси $y$ — **фазовой прямой**.

- Если $f(y^*)=0$, то $y=y^*$ — постоянное решение, **положение равновесия**.
- На интервалах, где $f>0$, решение растёт (стрелка вверх), где $f<0$ — убывает.
- Если стрелки с обеих сторон направлены к $y^*$ — равновесие **устойчиво**, если от него — **неустойчиво**. Достаточное условие: $f'(y^*)<0$ — устойчиво, $f'(y^*)>0$ — неустойчиво.`,
          R`The equation $y'=f(y)$ is called **autonomous**: the right-hand side does not depend on $x$, so the direction field is unchanged by horizontal shifts. All the information lives on the $y$-axis, the **phase line**.

- If $f(y^*)=0$, then $y=y^*$ is a constant solution, an **equilibrium**.
- On intervals where $f>0$ solutions increase (arrow up); where $f<0$ they decrease.
- If the arrows on both sides point towards $y^*$, the equilibrium is **stable**; if away, it is **unstable**. A sufficient test: $f'(y^*)<0$ stable, $f'(y^*)>0$ unstable.`) },
        { type: 'example', title: L('$y\'=y^2-4$ faza chizig‘i', 'Фазовая прямая $y\'=y^2-4$', 'Phase line of $y\'=y^2-4$'),
          body: L(R`$y'=y^2-4$ tenglamaning muvozanat holatlarini toping, barqarorligini aniqlang va $y(0)=0$ hamda $y(0)=3$ yechimlarning xatti-harakatini tavsiflang.`, R`Найдите положения равновесия уравнения $y'=y^2-4$, определите их устойчивость и опишите поведение решений с $y(0)=0$ и $y(0)=3$.`, R`Find the equilibria of $y'=y^2-4$, determine their stability and describe the solutions with $y(0)=0$ and $y(0)=3$.`),
          steps: [
            L(R`$f(y)=y^2-4=0$: $y^*=-2$ va $y^*=2$.`, R`$f(y)=y^2-4=0$: $y^*=-2$ и $y^*=2$.`, R`$f(y)=y^2-4=0$: $y^*=-2$ and $y^*=2$.`),
            L(R`Ishoralar: $y<-2$ da $f>0$ (↑), $-2<y<2$ da $f<0$ (↓), $y>2$ da $f>0$ (↑).`, R`Знаки: при $y<-2$ $f>0$ (↑), при $-2<y<2$ $f<0$ (↓), при $y>2$ $f>0$ (↑).`, R`Signs: for $y<-2$, $f>0$ (↑); for $-2<y<2$, $f<0$ (↓); for $y>2$, $f>0$ (↑).`),
            L(R`$f'(y)=2y$: $f'(-2)=-4<0$ — $y=-2$ barqaror; $f'(2)=4>0$ — $y=2$ barqaror emas.`, R`$f'(y)=2y$: $f'(-2)=-4<0$ — $y=-2$ устойчиво; $f'(2)=4>0$ — $y=2$ неустойчиво.`, R`$f'(y)=2y$: $f'(-2)=-4<0$, so $y=-2$ is stable; $f'(2)=4>0$, so $y=2$ is unstable.`),
            L(R`$y(0)=0$: yechim $y=-2\tanh 2x$, $x\to+\infty$ da $-2$ ga intiladi. $y(0)=3$: yechim $2$ dan uzoqlashib, $x=\frac{\ln5}{4}\approx0.40$ da cheksizga ketadi (portlash).`, R`$y(0)=0$: решение $y=-2\tanh 2x$ стремится к $-2$ при $x\to+\infty$. $y(0)=3$: решение уходит от $2$ и обращается в бесконечность при $x=\frac{\ln5}{4}\approx0.40$ (взрыв).`, R`$y(0)=0$: the solution $y=-2\tanh 2x$ tends to $-2$ as $x\to+\infty$. $y(0)=3$: the solution moves away from $2$ and blows up at $x=\frac{\ln5}{4}\approx0.40$.`)
          ],
          check: L(R`$y=-2\tanh2x$: $y'=-4(1-\tanh^22x)=-4+4\tanh^22x=y^2-4$ ✓, $y(0)=0$ ✓.`, R`$y=-2\tanh2x$: $y'=-4(1-\tanh^22x)=-4+4\tanh^22x=y^2-4$ ✓, $y(0)=0$ ✓.`, R`$y=-2\tanh2x$: $y'=-4(1-\tanh^22x)=-4+4\tanh^22x=y^2-4$ ✓, $y(0)=0$ ✓.`) },
        { type: 'warn', body: L(R`$f'(y^*)=0$ bo‘lsa, test hech narsa demaydi: $y'=y^2$ da $y=0$ bir tomondan tortadi, ikkinchi tomondan itaradi (yarim barqaror). Ishoralar jadvaliga qarang. Yagonalik tufayli yechim muvozanat chizig‘ini kesib o‘tolmaydi — u faqat unga asimptotik yaqinlashadi.`,
          R`При $f'(y^*)=0$ признак ничего не даёт: для $y'=y^2$ точка $y=0$ притягивает с одной стороны и отталкивает с другой (полуустойчива). Смотрите на таблицу знаков. Из-за единственности решение не может пересечь прямую равновесия — оно лишь асимптотически к ней приближается.`,
          R`If $f'(y^*)=0$ the test says nothing: for $y'=y^2$, $y=0$ attracts from one side and repels from the other (semi-stable). Use the sign table. By uniqueness a solution cannot cross an equilibrium line; it can only approach it asymptotically.`) }
      ],
      plot: { kind: 'field', f: 'y^2 - 4', curves: [[0, 0], [0, 1.9], [0, 2.1], [0, -3], [0, -4], [-1, 1]], x: [-2, 2], y: [-4, 4] }
    },
    {
      id: 'g6',
      title: L('Ikki o‘lchamli sistemaning faza tekisligi', 'Фазовая плоскость системы второго порядка', 'The phase plane of a 2D system'),
      topics: ['t12'],
      blocks: [
        { type: 'def', title: L('Vektor maydon va muvozanat turlari', 'Векторное поле и типы равновесий', 'Vector field and types of equilibria'),
          body: L(R`Avtonom sistema $x'=P(x,y),\ y'=Q(x,y)$ tekislikning har bir nuqtasiga $(P,Q)$ tezlik vektorini mos qo‘yadi. Yechim $(x(t),y(t))$ — **traektoriya**, u har nuqtada vektorga urinadi va vaqt o‘tishi bilan strelka bo‘yicha harakatlanadi. Yagonalik sharoitida traektoriyalar kesishmaydi.

Chiziqli sistema $\mathbf x'=A\mathbf x$ da $(0,0)$ muvozanatning turi $A$ ning xos qiymatlari bilan, yoki iz $\tau=\operatorname{tr}A$ va $\Delta=\det A$ bilan aniqlanadi:
- $\Delta<0$ — **egar** (barqaror emas);
- $\Delta>0$, $\tau^2-4\Delta>0$ — **tugun**; $\tau^2-4\Delta<0$ — **fokus**; $\tau<0$ barqaror, $\tau>0$ barqaror emas;
- $\Delta>0$, $\tau=0$ — **markaz** (yopiq orbitalar).`,
          R`Автономная система $x'=P(x,y),\ y'=Q(x,y)$ сопоставляет каждой точке плоскости вектор скорости $(P,Q)$. Решение $(x(t),y(t))$ — **траектория**; в каждой точке она касается вектора и со временем движется по стрелке. При условиях единственности траектории не пересекаются.

Для линейной системы $\mathbf x'=A\mathbf x$ тип равновесия $(0,0)$ определяется собственными значениями $A$ или следом $\tau=\operatorname{tr}A$ и определителем $\Delta=\det A$:
- $\Delta<0$ — **седло** (неустойчиво);
- $\Delta>0$, $\tau^2-4\Delta>0$ — **узел**; $\tau^2-4\Delta<0$ — **фокус**; при $\tau<0$ устойчив, при $\tau>0$ неустойчив;
- $\Delta>0$, $\tau=0$ — **центр** (замкнутые орбиты).`,
          R`An autonomous system $x'=P(x,y),\ y'=Q(x,y)$ attaches a velocity vector $(P,Q)$ to each point of the plane. A solution $(x(t),y(t))$ is a **trajectory**; it is tangent to the vector at every point and moves along the arrows as time grows. Under uniqueness, trajectories do not cross.

For a linear system $\mathbf x'=A\mathbf x$ the type of the equilibrium $(0,0)$ is given by the eigenvalues of $A$, or by the trace $\tau=\operatorname{tr}A$ and determinant $\Delta=\det A$:
- $\Delta<0$: **saddle** (unstable);
- $\Delta>0$, $\tau^2-4\Delta>0$: **node**; $\tau^2-4\Delta<0$: **focus**; stable if $\tau<0$, unstable if $\tau>0$;
- $\Delta>0$, $\tau=0$: **center** (closed orbits).`) },
        { type: 'example', title: L('So‘nuvchi tebranish faza tekisligida', 'Затухающие колебания на фазовой плоскости', 'Damped oscillation in the phase plane'),
          body: L(R`$x''+2x'+5x=0$ tenglamani $y=x'$ bilan sistemaga keltiring, muvozanat turini aniqlang va traektoriyalar qaysi tomonga aylanishini toping.`, R`Сведите уравнение $x''+2x'+5x=0$ к системе с $y=x'$, определите тип равновесия и направление вращения траекторий.`, R`Rewrite $x''+2x'+5x=0$ as a system with $y=x'$, find the type of equilibrium and the direction in which trajectories turn.`),
          steps: [
            L(R`Sistema: $x'=y,\ y'=-5x-2y$, matritsa $A=\begin{pmatrix}0&1\\-5&-2\end{pmatrix}$.`, R`Система: $x'=y,\ y'=-5x-2y$, матрица $A=\begin{pmatrix}0&1\\-5&-2\end{pmatrix}$.`, R`System: $x'=y,\ y'=-5x-2y$, matrix $A=\begin{pmatrix}0&1\\-5&-2\end{pmatrix}$.`),
            L(R`$\tau=-2$, $\Delta=5$, $\tau^2-4\Delta=-16<0$. Xos qiymatlar: $\lambda^2+2\lambda+5=0$, $\lambda=-1\pm2i$.`, R`$\tau=-2$, $\Delta=5$, $\tau^2-4\Delta=-16<0$. Собственные значения: $\lambda^2+2\lambda+5=0$, $\lambda=-1\pm2i$.`, R`$\tau=-2$, $\Delta=5$, $\tau^2-4\Delta=-16<0$. Eigenvalues: $\lambda^2+2\lambda+5=0$, $\lambda=-1\pm2i$.`),
            L(R`Kompleks, haqiqiy qismi manfiy — **barqaror fokus**: traektoriyalar spiral bo‘ylab $(0,0)$ ga buraladi.`, R`Комплексные с отрицательной вещественной частью — **устойчивый фокус**: траектории по спирали закручиваются к $(0,0)$.`, R`Complex with negative real part: a **stable focus**; trajectories spiral into $(0,0)$.`),
            L(R`Aylanish yo‘nalishi: $(1,0)$ nuqtada vektor $(0,-5)$ — pastga. Demak, harakat **soat strelkasi bo‘yicha**.`, R`Направление вращения: в точке $(1,0)$ вектор $(0,-5)$ — вниз. Значит, движение **по часовой стрелке**.`, R`Direction of rotation: at $(1,0)$ the vector is $(0,-5)$, pointing down. So the motion is **clockwise**.`)
          ],
          check: L(R`$x=e^{-t}\cos2t$ yechim: sympy bilan $x''+2x'+5x=0$ ✓; $x\to0$, ya’ni traektoriya koordinata boshiga intiladi ✓.`, R`$x=e^{-t}\cos2t$ — решение: sympy даёт $x''+2x'+5x=0$ ✓; $x\to0$, траектория стремится к началу координат ✓.`, R`$x=e^{-t}\cos2t$ is a solution: sympy gives $x''+2x'+5x=0$ ✓; $x\to0$, so the trajectory tends to the origin ✓.`) },
        { type: 'warn', body: L(R`Faza tekisligidagi traektoriya $t$ ni ko‘rsatmaydi: bir traektoriya cheksiz ko‘p yechimga ($t$ bo‘yicha siljishlarga) mos keladi. Chiziqlashtirish nochiziqli sistemada egar, tugun va fokusni to‘g‘ri beradi, lekin **markaz** haqida xulosa chiqarishga yetmaydi.`,
          R`Траектория на фазовой плоскости не показывает $t$: одной траектории соответствует бесконечно много решений (сдвиги по $t$). Линеаризация нелинейной системы правильно определяет седло, узел и фокус, но для **центра** её недостаточно.`,
          R`A trajectory in the phase plane does not show $t$: one trajectory corresponds to infinitely many solutions (shifts in $t$). For a nonlinear system, linearization correctly detects saddles, nodes and foci, but is not enough to conclude a **center**.`) }
      ],
      plot: { kind: 'vector', fx: 'y', fy: '-5*x - 2*y', x: [-2, 2], y: [-4, 4], traj: [[1.5, 0], [-1.5, 0], [0, 3.5], [0, -3.5]] }
    },
    {
      id: 'g7',
      title: L('Birinchi integral — sath chiziqlari', 'Первый интеграл — линии уровня', 'First integrals as level curves'),
      topics: ['t12', 't06'],
      blocks: [
        { type: 'def', title: L('Birinchi integral', 'Первый интеграл', 'First integral'),
          body: L(R`$x'=P,\ y'=Q$ sistemaning **birinchi integrali** — o‘zgarmas bo‘lmagan, har bir yechim bo‘ylab o‘zgarmas qoladigan $H(x,y)$ funksiya:
$$\frac{d}{dt}H(x,y)=H_xP+H_yQ=0.$$
Geometrik ma’nosi: traektoriyalar $H(x,y)=E$ **sath chiziqlarida** yotadi. Konservativ tebranishda $x''=-V'(x)$ uchun bu energiya: $H=\frac{y^2}2+V(x)$, $y=x'$.

Energiyaning minimumi atrofida sath chiziqlari yopiq — davriy harakat (markaz); egar nuqtadan o‘tuvchi sath chizig‘i — **separatrisa** — turli xil harakatlarni ajratadi.`,
          R`**Первый интеграл** системы $x'=P,\ y'=Q$ — непостоянная функция $H(x,y)$, сохраняющая значение вдоль каждого решения:
$$\frac{d}{dt}H(x,y)=H_xP+H_yQ=0.$$
Геометрический смысл: траектории лежат на **линиях уровня** $H(x,y)=E$. Для консервативного осциллятора $x''=-V'(x)$ это энергия: $H=\frac{y^2}2+V(x)$, $y=x'$.

Около минимума энергии линии уровня замкнуты — периодическое движение (центр); линия уровня через седло — **сепаратриса** — разделяет движения разного типа.`,
          R`A **first integral** of the system $x'=P,\ y'=Q$ is a non-constant function $H(x,y)$ that stays constant along every solution:
$$\frac{d}{dt}H(x,y)=H_xP+H_yQ=0.$$
Geometrically, trajectories lie on the **level curves** $H(x,y)=E$. For a conservative oscillator $x''=-V'(x)$ this is the energy: $H=\frac{y^2}2+V(x)$, $y=x'$.

Near an energy minimum the level curves are closed: periodic motion (a center). The level curve through a saddle, the **separatrix**, separates motions of different kinds.`) },
        { type: 'example', title: L('Mayatnik', 'Маятник', 'The pendulum'),
          body: L(R`Mayatnik $x''=-\sin x$ uchun energiya integralini toping, separatrisani yozing va $x(0)=0,\ x'(0)=1$ harakatning amplitudasini toping.`, R`Для маятника $x''=-\sin x$ найдите интеграл энергии, запишите сепаратрису и найдите амплитуду движения с $x(0)=0,\ x'(0)=1$.`, R`For the pendulum $x''=-\sin x$ find the energy integral, write the separatrix and find the amplitude of the motion with $x(0)=0,\ x'(0)=1$.`),
          steps: [
            L(R`Sistema: $x'=y,\ y'=-\sin x$. $H=\frac{y^2}2+1-\cos x$ ni olamiz.`, R`Система: $x'=y,\ y'=-\sin x$. Возьмём $H=\frac{y^2}2+1-\cos x$.`, R`System: $x'=y,\ y'=-\sin x$. Take $H=\frac{y^2}2+1-\cos x$.`),
            L(R`Tekshiramiz: $\frac{dH}{dt}=\sin x\cdot y+y\cdot(-\sin x)=0$. Demak, $H$ — birinchi integral.`, R`Проверяем: $\frac{dH}{dt}=\sin x\cdot y+y\cdot(-\sin x)=0$. Значит, $H$ — первый интеграл.`, R`Check: $\frac{dH}{dt}=\sin x\cdot y+y\cdot(-\sin x)=0$. So $H$ is a first integral.`),
            L(R`Muvozanatlar $(k\pi,0)$: $(0,0)$ — $H$ minimumi (markaz), $(\pm\pi,0)$ — egar, $H=2$. Separatrisa: $\frac{y^2}2=1+\cos x$, ya’ni $y=\pm2\cos\frac x2$.`, R`Равновесия $(k\pi,0)$: $(0,0)$ — минимум $H$ (центр), $(\pm\pi,0)$ — сёдла, $H=2$. Сепаратриса: $\frac{y^2}2=1+\cos x$, то есть $y=\pm2\cos\frac x2$.`, R`Equilibria $(k\pi,0)$: $(0,0)$ is a minimum of $H$ (center), $(\pm\pi,0)$ are saddles with $H=2$. Separatrix: $\frac{y^2}2=1+\cos x$, i.e. $y=\pm2\cos\frac x2$.`),
            L(R`$x(0)=0,\ y(0)=1$: $H=\frac12<2$ — yopiq orbita. Eng chetki nuqtada $y=0$: $1-\cos x=\frac12$, $x_{\max}=\frac\pi3$.`, R`$x(0)=0,\ y(0)=1$: $H=\frac12<2$ — замкнутая орбита. В крайней точке $y=0$: $1-\cos x=\frac12$, $x_{\max}=\frac\pi3$.`, R`$x(0)=0,\ y(0)=1$: $H=\frac12<2$, a closed orbit. At the turning point $y=0$: $1-\cos x=\frac12$, $x_{\max}=\frac\pi3$.`)
          ],
          check: L(R`$H(0,1)=\frac12+1-1=\frac12$, $H(\frac\pi3,0)=1-\frac12=\frac12$ ✓. Separatrisada $H=2\cos^2\frac x2+1-\cos x=2$ ✓.`, R`$H(0,1)=\frac12+1-1=\frac12$, $H(\frac\pi3,0)=1-\frac12=\frac12$ ✓. На сепаратрисе $H=2\cos^2\frac x2+1-\cos x=2$ ✓.`, R`$H(0,1)=\frac12+1-1=\frac12$, $H(\frac\pi3,0)=1-\frac12=\frac12$ ✓. On the separatrix $H=2\cos^2\frac x2+1-\cos x=2$ ✓.`) },
        { type: 'warn', body: L(R`Birinchi integral traektoriyaning **shaklini** beradi, lekin harakat qonunini $x(t)$ emas — buning uchun yana bitta integrallash kerak. So‘nish bo‘lsa ($x''=-\sin x-\gamma x'$), $\frac{dH}{dt}=-\gamma y^2\le0$: energiya saqlanmaydi va traektoriyalar sath chiziqlarini kesib, pastga tushadi.`,
          R`Первый интеграл даёт **форму** траектории, но не закон движения $x(t)$ — для него нужно ещё одно интегрирование. При трении ($x''=-\sin x-\gamma x'$) $\frac{dH}{dt}=-\gamma y^2\le0$: энергия не сохраняется, траектории пересекают линии уровня, спускаясь вниз.`,
          R`A first integral gives the **shape** of a trajectory, not the law of motion $x(t)$; that needs one more integration. With damping ($x''=-\sin x-\gamma x'$), $\frac{dH}{dt}=-\gamma y^2\le0$: energy is not conserved and trajectories cross the level curves downwards.`) }
      ],
      plot: { kind: 'vector', fx: 'y', fy: '-sin(x)', x: [-7, 7], y: [-3, 3], traj: [[0, 1], [0, 1.7], [0, 2.3], [0, -2.3], [2*Math.PI, 1], [-2*Math.PI, 1]] }
    },
    {
      id: 'g8',
      title: L('XHDT xarakteristikalari', 'Характеристики уравнений в частных производных', 'Characteristics of PDEs'),
      topics: ['t13', 't14', 't15'],
      blocks: [
        { type: 'text', title: L('Ma’lumot qaysi chiziqlar bo‘ylab tarqaladi', 'Вдоль каких линий переносится информация', 'Along which curves information travels'),
          body: L(R`Ko‘chish tenglamasi $u_t+cu_x=0$ ni qaraylik. $(x,t)$ tekislikda $x=x_0+ct$ to‘g‘ri chiziqni olsak, uning bo‘ylab
$$\frac{d}{dt}u(x_0+ct,t)=u_t+cu_x=0,$$
ya’ni $u$ o‘zgarmas. Bunday chiziqlar — **xarakteristikalar**. Yechim $u(x,t)=F(x-ct)$: boshlang‘ich profil shaklini saqlab, $c$ tezlik bilan siljiydi.

Tor tenglamasi $u_{tt}=c^2u_{xx}$ da ikki oila bor: $x-ct=\text{const}$ va $x+ct=\text{const}$. $\xi=x-ct,\ \eta=x+ct$ o‘zgaruvchilarda tenglama $u_{\xi\eta}=0$ ko‘rinishini oladi, shundan Dalamber yechimi $u=F(x-ct)+G(x+ct)$. $(x,t)$ nuqtadagi qiymat faqat $[x-ct,\,x+ct]$ kesmadagi boshlang‘ich ma’lumotlarga bog‘liq (bog‘liqlik sohasi).`,
          R`Рассмотрим уравнение переноса $u_t+cu_x=0$. Вдоль прямой $x=x_0+ct$ на плоскости $(x,t)$
$$\frac{d}{dt}u(x_0+ct,t)=u_t+cu_x=0,$$
то есть $u$ постоянна. Такие линии — **характеристики**. Решение $u(x,t)=F(x-ct)$: начальный профиль сдвигается со скоростью $c$, сохраняя форму.

У уравнения струны $u_{tt}=c^2u_{xx}$ два семейства: $x-ct=\text{const}$ и $x+ct=\text{const}$. В переменных $\xi=x-ct,\ \eta=x+ct$ уравнение принимает вид $u_{\xi\eta}=0$, откуда решение Даламбера $u=F(x-ct)+G(x+ct)$. Значение в точке $(x,t)$ зависит только от начальных данных на отрезке $[x-ct,\,x+ct]$ (область зависимости).`,
          R`Consider the transport equation $u_t+cu_x=0$. Along the line $x=x_0+ct$ in the $(x,t)$ plane,
$$\frac{d}{dt}u(x_0+ct,t)=u_t+cu_x=0,$$
so $u$ is constant. Such lines are the **characteristics**. The solution is $u(x,t)=F(x-ct)$: the initial profile moves with speed $c$ without changing shape.

The string equation $u_{tt}=c^2u_{xx}$ has two families: $x-ct=\text{const}$ and $x+ct=\text{const}$. In the variables $\xi=x-ct,\ \eta=x+ct$ it becomes $u_{\xi\eta}=0$, which gives d’Alembert’s solution $u=F(x-ct)+G(x+ct)$. The value at $(x,t)$ depends only on the initial data on $[x-ct,\,x+ct]$ (the domain of dependence).`) },
        { type: 'example', title: L('$u_t+2u_x=0$ ko‘chish tenglamasi', 'Уравнение переноса $u_t+2u_x=0$', 'The transport equation $u_t+2u_x=0$'),
          body: L(R`$u_t+2u_x=0$, $u(x,0)=e^{-x^2}$ masalani xarakteristikalar usuli bilan yeching. $t=1.5$ da cho‘qqi qayerda bo‘ladi?`, R`Решите задачу $u_t+2u_x=0$, $u(x,0)=e^{-x^2}$ методом характеристик. Где находится вершина при $t=1.5$?`, R`Solve $u_t+2u_x=0$, $u(x,0)=e^{-x^2}$ by the method of characteristics. Where is the peak at $t=1.5$?`),
          steps: [
            L(R`Xarakteristikalar: $\frac{dx}{dt}=2$, ya’ni $x-2t=x_0$ — og‘ishi $\frac{dt}{dx}=\frac12$ bo‘lgan parallel to‘g‘ri chiziqlar.`, R`Характеристики: $\frac{dx}{dt}=2$, то есть $x-2t=x_0$ — параллельные прямые с наклоном $\frac{dt}{dx}=\frac12$.`, R`Characteristics: $\frac{dx}{dt}=2$, i.e. $x-2t=x_0$, parallel lines with slope $\frac{dt}{dx}=\frac12$.`),
            L(R`Har bir xarakteristika bo‘ylab $u$ o‘zgarmas va $t=0$ dagi qiymatga teng: $u(x,t)=u(x_0,0)=e^{-x_0^2}$.`, R`Вдоль каждой характеристики $u$ постоянна и равна значению при $t=0$: $u(x,t)=u(x_0,0)=e^{-x_0^2}$.`, R`Along each characteristic $u$ is constant and equal to its value at $t=0$: $u(x,t)=u(x_0,0)=e^{-x_0^2}$.`),
            L(R`$x_0=x-2t$ ni qo‘yamiz: $u(x,t)=e^{-(x-2t)^2}$.`, R`Подставляем $x_0=x-2t$: $u(x,t)=e^{-(x-2t)^2}$.`, R`Substitute $x_0=x-2t$: $u(x,t)=e^{-(x-2t)^2}$.`),
            L(R`Cho‘qqi $x_0=0$ dan chiquvchi xarakteristikada: $x=2t$; $t=1.5$ da $x=3$.`, R`Вершина лежит на характеристике из $x_0=0$: $x=2t$; при $t=1.5$ имеем $x=3$.`, R`The peak lies on the characteristic from $x_0=0$: $x=2t$; at $t=1.5$, $x=3$.`)
          ],
          check: L(R`$u=e^{-(x-2t)^2}$: $u_t=4(x-2t)u$, $u_x=-2(x-2t)u$, $u_t+2u_x=0$ ✓; $u(x,0)=e^{-x^2}$ ✓.`, R`$u=e^{-(x-2t)^2}$: $u_t=4(x-2t)u$, $u_x=-2(x-2t)u$, $u_t+2u_x=0$ ✓; $u(x,0)=e^{-x^2}$ ✓.`, R`$u=e^{-(x-2t)^2}$: $u_t=4(x-2t)u$, $u_x=-2(x-2t)u$, $u_t+2u_x=0$ ✓; $u(x,0)=e^{-x^2}$ ✓.`) },
        { type: 'warn', body: L(R`Rasmda vertikal o‘q — vaqt $t$, gorizontal — $x$; xarakteristika og‘ishi $\frac{dt}{dx}=\frac1c$, $c$ emas. Agar tezlik $u$ ga bog‘liq bo‘lsa (masalan, $u_t+uu_x=0$), xarakteristikalar kesishishi va silliq yechim buzilishi mumkin — o‘zgarmas $c$ da bunday bo‘lmaydi.`,
          R`На рисунке вертикальная ось — время $t$, горизонтальная — $x$; наклон характеристики $\frac{dt}{dx}=\frac1c$, а не $c$. Если скорость зависит от $u$ (например, $u_t+uu_x=0$), характеристики могут пересечься и гладкое решение разрушится — при постоянном $c$ этого не бывает.`,
          R`In the picture the vertical axis is time $t$ and the horizontal one is $x$; the slope of a characteristic is $\frac{dt}{dx}=\frac1c$, not $c$. If the speed depends on $u$ (e.g. $u_t+uu_x=0$), characteristics may cross and the smooth solution breaks down; with constant $c$ this never happens.`) }
      ],
      plot: { kind: 'family', fns: ['(x - C)/2'], C: [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4], x: [-4, 4], y: [0, 3] }
    }
  ];
})();
