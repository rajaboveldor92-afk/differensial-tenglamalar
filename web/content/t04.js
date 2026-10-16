(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't04', num: 4,
  title: L('Chiziqli, Bernulli, Rikkati va to‘la differensialli tenglamalar', 'Линейные уравнения, уравнения Бернулли, Риккати и в полных дифференциалах', 'Linear, Bernoulli, Riccati and exact equations'),
  syllabus: { lecture: 'M4', seminar: 'S4', outcomes: ['TN2', 'TN3'], independent: [2, 4] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L(R`Birinchi tartibli chiziqli tenglamani $e^{\int p\,dx}$ integrallovchi ko‘paytuvchi bilan yecha olasiz va yechim oralig‘ini $p,q$ ning uzluksizlik oralig‘idan aniqlay olasiz.`, R`Решать линейное уравнение первого порядка с интегрирующим множителем $e^{\int p\,dx}$ и определять интервал решения по интервалу непрерывности $p,q$.`, R`Solve a first-order linear equation with the integrating factor $e^{\int p\,dx}$ and read off the interval of the solution from where $p,q$ are continuous.`),
    L(R`Bernulli tenglamasini $z=y^{1-n}$ almashtirish bilan chiziqliga keltira olasiz va $y\equiv0$ yechimni hisobga ola olasiz.`, R`Сводить уравнение Бернулли к линейному заменой $z=y^{1-n}$ и учитывать решение $y\equiv0$.`, R`Reduce a Bernoulli equation to a linear one with $z=y^{1-n}$ and account for the solution $y\equiv0$.`),
    L(R`Bitta xususiy yechim ma’lum bo‘lganda Rikkati tenglamasini yecha olasiz.`, R`Решать уравнение Риккати, если известно одно частное решение.`, R`Solve a Riccati equation when one particular solution is known.`),
    L(R`To‘la differensialli tenglamani $M_y=N_x$ sharti bilan taniy olasiz va $U(x,y)=C$ umumiy integralni tiklay olasiz.`, R`Распознавать уравнение в полных дифференциалах по условию $M_y=N_x$ и восстанавливать общий интеграл $U(x,y)=C$.`, R`Recognise an exact equation by $M_y=N_x$ and recover the general integral $U(x,y)=C$.`),
    L(R`$\mu(x)$ yoki $\mu(y)$ integrallovchi ko‘paytuvchining mavjudligini tekshirib, uni topa olasiz.`, R`Проверять существование интегрирующего множителя $\mu(x)$ или $\mu(y)$ и находить его.`, R`Test whether an integrating factor $\mu(x)$ or $\mu(y)$ exists and find it.`)
  ],
  prereqKnowledge: [
    L('O‘zgaruvchilari ajraladigan tenglamalar (2-mavzu).', 'Уравнения с разделяющимися переменными (тема 2).', 'Separable equations (topic 2).'),
    L(R`Ko‘paytmaning hosilasi va bo‘laklab integrallash: $\int u\,dv=uv-\int v\,du$.`, R`Производная произведения и интегрирование по частям: $\int u\,dv=uv-\int v\,du$.`, R`The product rule and integration by parts: $\int u\,dv=uv-\int v\,du$.`),
    L(R`Xususiy hosilalar va to‘la differensial $dU=U_x\,dx+U_y\,dy$.`, R`Частные производные и полный дифференциал $dU=U_x\,dx+U_y\,dy$.`, R`Partial derivatives and the total differential $dU=U_x\,dx+U_y\,dy$.`)
  ],
  sources: [
    { id: 'dilmurodov', ref: '§2.3, §2.4, §2.5', verified: true },
    { id: 'ergashev', ref: '1.4–1.8', verified: true },
    { id: 'logan', ref: '1.4, 1.4.1', verified: true },
    { id: 'kohler', ref: '2.2, 2.5, 2.6, 2.7', verified: true },
    { id: 'goode', ref: '1.6, 1.8, 1.9', verified: true },
    { id: 'filippov', ref: '§5–§8', verified: false },
    { id: 'boyce', ref: '§2.1, §2.4, §2.6', verified: false }
  ],
  labs: ['L03', 'L02'],
  lessons: [
    {
      id: 't04.1',
      title: L('Birinchi tartibli chiziqli tenglama', 'Линейное уравнение первого порядка', 'The first-order linear equation'),
      blocks: [
        { type: 'intro', title: L('Kondensator qanday zaryadlanadi?', 'Как заряжается конденсатор?', 'How does a capacitor charge?'),
          body: L(R`Qarshiligi $R$ va sig‘imi $C$ bo‘lgan zanjirga $t=0$ da kuchlanishi $E$ bo‘lgan manba ulandi. Kondensatordagi kuchlanish $v(t)$ uchun Kirxgof qonunidan
$$RC\,v'+v=E,\qquad v(0)=0.$$
Bu tenglamada $v$ va $v'$ faqat birinchi darajada qatnashadi — u **chiziqli**. Javob:
$$v(t)=E\left(1-e^{-t/(RC)}\right).$$
$RC$ — zanjirning vaqt doimiysi: $t=RC$ da kondensator taxminan $63\%$ gacha zaryadlanadi. Ichki manba $E$ vaqtga bog‘liq bo‘lsa ham (masalan, signal), tenglama chiziqli qoladi va shu darsdagi formula bilan yechiladi.`,
          R`К цепи с сопротивлением $R$ и ёмкостью $C$ в момент $t=0$ подключили источник напряжения $E$. Для напряжения на конденсаторе $v(t)$ закон Кирхгофа даёт
$$RC\,v'+v=E,\qquad v(0)=0.$$
Здесь $v$ и $v'$ входят только в первой степени — уравнение **линейное**. Ответ:
$$v(t)=E\left(1-e^{-t/(RC)}\right).$$
$RC$ — постоянная времени цепи: при $t=RC$ конденсатор заряжен примерно на $63\%$. Даже если $E$ зависит от времени (например, сигнал), уравнение остаётся линейным и решается формулой этого урока.`,
          R`A circuit with resistance $R$ and capacitance $C$ is connected to a source of voltage $E$ at $t=0$. For the capacitor voltage $v(t)$, Kirchhoff’s law gives
$$RC\,v'+v=E,\qquad v(0)=0.$$
Here $v$ and $v'$ appear only to the first power: the equation is **linear**. The answer is
$$v(t)=E\left(1-e^{-t/(RC)}\right).$$
$RC$ is the time constant: at $t=RC$ the capacitor is about $63\%$ charged. Even if $E$ depends on time (a signal, say), the equation stays linear and is solved by the formula of this lesson.`) },
        { type: 'def', title: L('Chiziqli tenglama', 'Линейное уравнение', 'Linear equation'),
          body: L(R`Ushbu ko‘rinishdagi tenglama **birinchi tartibli chiziqli** tenglama deyiladi:
$$y'+p(x)\,y=q(x).$$
- $q\equiv0$ bo‘lsa — **bir jinsli** chiziqli tenglama $y'+p(x)y=0$ (bu “bir jinsli”ning ikkinchi ma’nosi);
- $q\not\equiv0$ bo‘lsa — **bir jinsli bo‘lmagan** chiziqli tenglama.

$\mu(x)=e^{P(x)}$, $P(x)=\int p(x)\,dx$ funksiya **integrallovchi ko‘paytuvchi** deyiladi.`,
          R`Уравнение вида
$$y'+p(x)\,y=q(x)$$
называется **линейным уравнением первого порядка**.
- При $q\equiv0$ — **однородное** линейное уравнение $y'+p(x)y=0$ (второй смысл слова «однородное»);
- при $q\not\equiv0$ — **неоднородное** линейное уравнение.

Функция $\mu(x)=e^{P(x)}$, $P(x)=\int p(x)\,dx$, называется **интегрирующим множителем**.`,
          R`An equation of the form
$$y'+p(x)\,y=q(x)$$
is a **first-order linear** equation.
- If $q\equiv0$ it is the **homogeneous** linear equation $y'+p(x)y=0$ (the second meaning of “homogeneous”);
- if $q\not\equiv0$ it is **nonhomogeneous**.

The function $\mu(x)=e^{P(x)}$, $P(x)=\int p(x)\,dx$, is the **integrating factor**.`) },
        { type: 'thm', title: L('Chiziqli tenglama yechimining formulasi', 'Формула решения линейного уравнения', 'The solution formula for a linear equation'),
          conds: L(R`1. $p(x)$ va $q(x)$ $I$ intervalda uzluksiz;
2. $x_0\in I$, $y_0$ — ixtiyoriy son.`,
          R`1. $p(x)$ и $q(x)$ непрерывны на интервале $I$;
2. $x_0\in I$, $y_0$ — любое число.`,
          R`1. $p(x)$ and $q(x)$ are continuous on an interval $I$;
2. $x_0\in I$ and $y_0$ is any number.`),
          body: L(R`U holda $y'+py=q$ ning umumiy yechimi
$$y=e^{-P(x)}\left(\int q(x)\,e^{P(x)}\,dx+C\right),\qquad P'=p,$$
va $y(x_0)=y_0$ Koshi masalasi **butun $I$ intervalda** aniqlangan yagona yechimga ega. Chiziqli bo‘lmagan tenglamalardan farqli, yechim $I$ ichida “portlay” olmaydi.`,
          R`Тогда общее решение $y'+py=q$ имеет вид
$$y=e^{-P(x)}\left(\int q(x)\,e^{P(x)}\,dx+C\right),\qquad P'=p,$$
и задача Коши $y(x_0)=y_0$ имеет единственное решение, определённое **на всём интервале $I$**. В отличие от нелинейных уравнений, решение не может «взорваться» внутри $I$.`,
          R`Then the general solution of $y'+py=q$ is
$$y=e^{-P(x)}\left(\int q(x)\,e^{P(x)}\,dx+C\right),\qquad P'=p,$$
and the Cauchy problem $y(x_0)=y_0$ has a unique solution defined **on the whole interval $I$**. Unlike nonlinear equations, the solution cannot blow up inside $I$.`) },
        { type: 'proof', body: L(R`Tenglamani $\mu=e^{P}$ ga ko‘paytiramiz. $\mu'=p\mu$ bo‘lgani uchun chap tomon ko‘paytmaning hosilasi: $\mu y'+p\mu y=(\mu y)'$. Demak $(\mu y)'=\mu q$, integrallab $\mu y=\int\mu q\,dx+C$. $\mu>0$, shuning uchun unga bo‘lish mumkin va hech narsa yo‘qolmaydi.

Boshqa yo‘l — **o‘zgarmasni variatsiyalash** (Lagranj usuli): bir jinsli tenglamaning yechimi $y=Ce^{-P}$ da $C=C(x)$ deb olamiz va $C'(x)=q\,e^{P}$ ni topamiz. Natija o‘sha formula (Dilmuradov, §2.3).`,
          R`Умножим уравнение на $\mu=e^{P}$. Так как $\mu'=p\mu$, левая часть — производная произведения: $\mu y'+p\mu y=(\mu y)'$. Значит, $(\mu y)'=\mu q$, и после интегрирования $\mu y=\int\mu q\,dx+C$. Поскольку $\mu>0$, на него можно делить, ничего не теряя.

Другой путь — **вариация постоянной** (метод Лагранжа): в решении однородного уравнения $y=Ce^{-P}$ считаем $C=C(x)$ и находим $C'(x)=q\,e^{P}$. Получается та же формула (Дилмурадов, §2.3).`,
          R`Multiply the equation by $\mu=e^{P}$. Since $\mu'=p\mu$, the left side is a product derivative: $\mu y'+p\mu y=(\mu y)'$. So $(\mu y)'=\mu q$, and integrating gives $\mu y=\int\mu q\,dx+C$. As $\mu>0$ we may divide by it without losing anything.

Another route is **variation of the constant** (Lagrange’s method): in the homogeneous solution $y=Ce^{-P}$ let $C=C(x)$ and find $C'(x)=q\,e^{P}$. The result is the same formula (Dilmuradov, §2.3).`) },
        { type: 'example', title: L(R`$y'+2y=e^{x}$`, R`$y'+2y=e^{x}$`, R`$y'+2y=e^{x}$`),
          body: L(R`Umumiy yechimni toping.`, R`Найдите общее решение.`, R`Find the general solution.`),
          steps: [
            L(R`$p=2$, $P=2x$, $\mu=e^{2x}$.`, R`$p=2$, $P=2x$, $\mu=e^{2x}$.`, R`$p=2$, $P=2x$, $\mu=e^{2x}$.`),
            L(R`Ko‘paytiramiz: $(e^{2x}y)'=e^{2x}\cdot e^{x}=e^{3x}$.`, R`Умножаем: $(e^{2x}y)'=e^{2x}\cdot e^{x}=e^{3x}$.`, R`Multiply: $(e^{2x}y)'=e^{2x}\cdot e^{x}=e^{3x}$.`),
            L(R`Integrallaymiz: $e^{2x}y=\dfrac{e^{3x}}{3}+C$.`, R`Интегрируем: $e^{2x}y=\dfrac{e^{3x}}{3}+C$.`, R`Integrate: $e^{2x}y=\dfrac{e^{3x}}{3}+C$.`),
            L(R`$y=\dfrac{e^{x}}{3}+Ce^{-2x}$, $x\in\mathbb R$: xususiy yechim plyus bir jinsli tenglamaning umumiy yechimi.`, R`$y=\dfrac{e^{x}}{3}+Ce^{-2x}$, $x\in\mathbb R$: частное решение плюс общее решение однородного уравнения.`, R`$y=\dfrac{e^{x}}{3}+Ce^{-2x}$, $x\in\mathbb R$: a particular solution plus the general solution of the homogeneous equation.`)
          ],
          check: L(R`$y'=\frac{e^x}{3}-2Ce^{-2x}$; $y'+2y=\frac{e^x}{3}+\frac{2e^x}{3}=e^x$ ✓.`, R`$y'=\frac{e^x}{3}-2Ce^{-2x}$; $y'+2y=\frac{e^x}{3}+\frac{2e^x}{3}=e^x$ ✓.`, R`$y'=\frac{e^x}{3}-2Ce^{-2x}$; $y'+2y=\frac{e^x}{3}+\frac{2e^x}{3}=e^x$ ✓.`) },
        { type: 'example', title: L('Koshi masalasi va oraliq', 'Задача Коши и интервал', 'A Cauchy problem and its interval'),
          body: L(R`$x\,y'+y=x^2$, $y(1)=1$.`, R`$x\,y'+y=x^2$, $y(1)=1$.`, R`$x\,y'+y=x^2$, $y(1)=1$.`),
          steps: [
            L(R`Normal ko‘rinish: $y'+\dfrac1x y=x$. $p=\frac1x$, $q=x$ — $(0,\infty)$ da uzluksiz ($x_0=1$ shu oraliqda).`, R`Нормальный вид: $y'+\dfrac1x y=x$. $p=\frac1x$, $q=x$ непрерывны на $(0,\infty)$ ($x_0=1$ лежит там).`, R`Normal form: $y'+\dfrac1x y=x$. $p=\frac1x$ and $q=x$ are continuous on $(0,\infty)$, which contains $x_0=1$.`),
            L(R`$\mu=e^{\ln x}=x$; aslida chap tomon tayyor: $(xy)'=x^2$.`, R`$\mu=e^{\ln x}=x$; на самом деле левая часть уже готова: $(xy)'=x^2$.`, R`$\mu=e^{\ln x}=x$; in fact the left side is ready-made: $(xy)'=x^2$.`),
            L(R`$xy=\dfrac{x^3}{3}+C$, $y=\dfrac{x^2}{3}+\dfrac Cx$.`, R`$xy=\dfrac{x^3}{3}+C$, $y=\dfrac{x^2}{3}+\dfrac Cx$.`, R`$xy=\dfrac{x^3}{3}+C$, $y=\dfrac{x^2}{3}+\dfrac Cx$.`),
            L(R`$y(1)=\frac13+C=1$, $C=\frac23$. Javob: $y=\dfrac{x^2}{3}+\dfrac{2}{3x}$, $x\in(0,\infty)$ — teorema aytgan oraliq.`, R`$y(1)=\frac13+C=1$, $C=\frac23$. Ответ: $y=\dfrac{x^2}{3}+\dfrac{2}{3x}$, $x\in(0,\infty)$ — интервал из теоремы.`, R`$y(1)=\frac13+C=1$, $C=\frac23$. Answer: $y=\dfrac{x^2}{3}+\dfrac{2}{3x}$, $x\in(0,\infty)$, exactly the interval from the theorem.`)
          ],
          check: L(R`$xy'+y=x\left(\frac{2x}{3}-\frac{2}{3x^2}\right)+\frac{x^2}{3}+\frac{2}{3x}=x^2$ ✓; $y(1)=1$ ✓.`, R`$xy'+y=x\left(\frac{2x}{3}-\frac{2}{3x^2}\right)+\frac{x^2}{3}+\frac{2}{3x}=x^2$ ✓; $y(1)=1$ ✓.`, R`$xy'+y=x\left(\frac{2x}{3}-\frac{2}{3x^2}\right)+\frac{x^2}{3}+\frac{2}{3x}=x^2$ ✓; $y(1)=1$ ✓.`) },
        { type: 'example', title: L(R`$y'+y\cos x=\sin x\cos x$`, R`$y'+y\cos x=\sin x\cos x$`, R`$y'+y\cos x=\sin x\cos x$`),
          body: L(R`Umumiy yechimni toping (bo‘laklab integrallash kerak bo‘ladi).`, R`Найдите общее решение (понадобится интегрирование по частям).`, R`Find the general solution (integration by parts is needed).`),
          steps: [
            L(R`$P=\sin x$, $\mu=e^{\sin x}$: $(e^{\sin x}y)'=\sin x\cos x\,e^{\sin x}$.`, R`$P=\sin x$, $\mu=e^{\sin x}$: $(e^{\sin x}y)'=\sin x\cos x\,e^{\sin x}$.`, R`$P=\sin x$, $\mu=e^{\sin x}$: $(e^{\sin x}y)'=\sin x\cos x\,e^{\sin x}$.`),
            L(R`$s=\sin x$: $\int s\,e^{s}\,ds=(s-1)e^{s}$ (bo‘laklab).`, R`$s=\sin x$: $\int s\,e^{s}\,ds=(s-1)e^{s}$ (по частям).`, R`With $s=\sin x$: $\int s\,e^{s}\,ds=(s-1)e^{s}$ (by parts).`),
            L(R`$e^{\sin x}y=(\sin x-1)e^{\sin x}+C$.`, R`$e^{\sin x}y=(\sin x-1)e^{\sin x}+C$.`, R`$e^{\sin x}y=(\sin x-1)e^{\sin x}+C$.`),
            L(R`$y=\sin x-1+Ce^{-\sin x}$, $x\in\mathbb R$.`, R`$y=\sin x-1+Ce^{-\sin x}$, $x\in\mathbb R$.`, R`$y=\sin x-1+Ce^{-\sin x}$, $x\in\mathbb R$.`)
          ],
          check: L(R`$y'=\cos x-C\cos x\,e^{-\sin x}$; $y'+y\cos x=\cos x+(\sin x-1)\cos x=\sin x\cos x$ ✓.`, R`$y'=\cos x-C\cos x\,e^{-\sin x}$; $y'+y\cos x=\cos x+(\sin x-1)\cos x=\sin x\cos x$ ✓.`, R`$y'=\cos x-C\cos x\,e^{-\sin x}$; $y'+y\cos x=\cos x+(\sin x-1)\cos x=\sin x\cos x$ ✓.`) },
        { type: 'warn', body: L(R`Formulani qo‘llashdan oldin tenglamani **normal ko‘rinishga** keltiring: $y'$ oldidagi koeffitsiyent $1$ bo‘lsin. $xy'+2y=x$ da $p=\frac2x$, $p=2$ emas.

$P=\int p\,dx$ da o‘zgarmas qo‘shish shart emas — har qanday boshlang‘ich funksiya yaraydi. Lekin $\int q\mu\,dx$ dan keyin $+C$ ni **albatta** yozing, aks holda faqat bitta xususiy yechim qoladi.`,
          R`Перед применением формулы приведите уравнение к **нормальному виду**: коэффициент при $y'$ должен быть $1$. В $xy'+2y=x$ имеем $p=\frac2x$, а не $p=2$.

В $P=\int p\,dx$ постоянную добавлять не нужно — годится любая первообразная. Но после $\int q\mu\,dx$ **обязательно** пишите $+C$, иначе останется только одно частное решение.`,
          R`Before using the formula, put the equation in **normal form**: the coefficient of $y'$ must be $1$. In $xy'+2y=x$ we have $p=\frac2x$, not $p=2$.

In $P=\int p\,dx$ no constant is needed; any antiderivative works. But after $\int q\mu\,dx$ you **must** write $+C$, otherwise only one particular solution remains.`) }
      ]
    },
    {
      id: 't04.2',
      title: L('Bernulli va Rikkati tenglamalari', 'Уравнения Бернулли и Риккати', 'Bernoulli and Riccati equations'),
      blocks: [
        { type: 'def', title: L('Bernulli tenglamasi', 'Уравнение Бернулли', 'Bernoulli equation'),
          body: L(R`$$y'+p(x)\,y=q(x)\,y^{n},\qquad n\ne0,\ n\ne1.$$
($n=0$ da chiziqli, $n=1$ da ajraladigan tenglama.) Ikkala tomonni $y^n$ ga bo‘lib, $z=y^{1-n}$ almashtirishni olamiz: $z'=(1-n)y^{-n}y'$, natijada
$$z'+(1-n)p(x)\,z=(1-n)q(x)$$
— **chiziqli** tenglama. $n>0$ da $y\equiv0$ ham yechim; u $y^n$ ga bo‘lganda yo‘qoladi.`,
          R`$$y'+p(x)\,y=q(x)\,y^{n},\qquad n\ne0,\ n\ne1.$$
(При $n=0$ — линейное, при $n=1$ — с разделяющимися переменными.) Делим на $y^n$ и делаем замену $z=y^{1-n}$: $z'=(1-n)y^{-n}y'$, и получаем
$$z'+(1-n)p(x)\,z=(1-n)q(x)$$
— **линейное** уравнение. При $n>0$ решение $y\equiv0$ тоже есть; при делении на $y^n$ оно теряется.`,
          R`$$y'+p(x)\,y=q(x)\,y^{n},\qquad n\ne0,\ n\ne1.$$
(For $n=0$ it is linear, for $n=1$ separable.) Divide by $y^n$ and set $z=y^{1-n}$: $z'=(1-n)y^{-n}y'$, which gives
$$z'+(1-n)p(x)\,z=(1-n)q(x),$$
a **linear** equation. For $n>0$, $y\equiv0$ is also a solution; dividing by $y^n$ loses it.`) },
        { type: 'example', title: L(R`$y'+\dfrac yx=x\,y^2$`, R`$y'+\dfrac yx=x\,y^2$`, R`$y'+\dfrac yx=x\,y^2$`),
          body: L(R`Barcha yechimlarni toping ($x>0$).`, R`Найдите все решения ($x>0$).`, R`Find all solutions ($x>0$).`),
          steps: [
            L(R`$n=2$: $y\equiv0$ — yechim. $y\ne0$ da $z=y^{-1}$, $z'=-y^{-2}y'$.`, R`$n=2$: $y\equiv0$ — решение. При $y\ne0$: $z=y^{-1}$, $z'=-y^{-2}y'$.`, R`$n=2$: $y\equiv0$ is a solution. For $y\ne0$: $z=y^{-1}$, $z'=-y^{-2}y'$.`),
            L(R`$-y^2$ ga bo‘lsak: $-y^{-2}y'-\dfrac{y^{-1}}{x}=-x$, ya’ni $z'-\dfrac zx=-x$.`, R`Делим на $-y^2$: $-y^{-2}y'-\dfrac{y^{-1}}{x}=-x$, то есть $z'-\dfrac zx=-x$.`, R`Divide by $-y^2$: $-y^{-2}y'-\dfrac{y^{-1}}{x}=-x$, i.e. $z'-\dfrac zx=-x$.`),
            L(R`$\mu=e^{-\ln x}=\dfrac1x$: $\left(\dfrac zx\right)'=-1$, $z=-x^2+Cx$.`, R`$\mu=e^{-\ln x}=\dfrac1x$: $\left(\dfrac zx\right)'=-1$, $z=-x^2+Cx$.`, R`$\mu=e^{-\ln x}=\dfrac1x$: $\left(\dfrac zx\right)'=-1$, $z=-x^2+Cx$.`),
            L(R`Javob: $y=\dfrac{1}{Cx-x^2}$ va $y\equiv0$.`, R`Ответ: $y=\dfrac{1}{Cx-x^2}$ и $y\equiv0$.`, R`Answer: $y=\dfrac{1}{Cx-x^2}$ and $y\equiv0$.`)
          ],
          check: L(R`$y=(Cx-x^2)^{-1}$: $y'=-(C-2x)y^2$; $y'+\frac yx=y^2\left(-C+2x+C-x\right)=xy^2$ ✓.`, R`$y=(Cx-x^2)^{-1}$: $y'=-(C-2x)y^2$; $y'+\frac yx=y^2\left(-C+2x+C-x\right)=xy^2$ ✓.`, R`$y=(Cx-x^2)^{-1}$: $y'=-(C-2x)y^2$; $y'+\frac yx=y^2\left(-C+2x+C-x\right)=xy^2$ ✓.`) },
        { type: 'warn', body: L(R`**Maxsus yechimlar.** $y\equiv0$ ning tabiati $n$ ga bog‘liq. $n>1$ da $f=qy^n-py$ ning $f_y$ hosilasi $y=0$ atrofida chegaralangan — yagonalik bor, $y\equiv0$ oddiy xususiy yechim. $0<n<1$ da esa $f_y\sim y^{n-1}\to\infty$ va yagonalik buzilishi mumkin: masalan, $y'=2\sqrt y$ uchun $y=(x-c)^2$ ($x\ge c$) va $y\equiv0$ bir nuqtada urinadi — bu **maxsus** yechim.`,
          R`**Особые решения.** Характер решения $y\equiv0$ зависит от $n$. При $n>1$ производная $f_y$ функции $f=qy^n-py$ ограничена около $y=0$ — единственность есть, $y\equiv0$ — обычное частное решение. При $0<n<1$ $f_y\sim y^{n-1}\to\infty$, и единственность может нарушаться: например, для $y'=2\sqrt y$ кривые $y=(x-c)^2$ ($x\ge c$) касаются $y\equiv0$ — это **особое** решение.`,
          R`**Singular solutions.** The nature of $y\equiv0$ depends on $n$. For $n>1$ the derivative $f_y$ of $f=qy^n-py$ is bounded near $y=0$, uniqueness holds and $y\equiv0$ is an ordinary particular solution. For $0<n<1$, $f_y\sim y^{n-1}\to\infty$ and uniqueness can fail: for $y'=2\sqrt y$, the curves $y=(x-c)^2$ ($x\ge c$) touch $y\equiv0$, which is a **singular** solution.`) },
        { type: 'def', title: L('Rikkati tenglamasi', 'Уравнение Риккати', 'Riccati equation'),
          body: L(R`$$y'=P(x)\,y^2+Q(x)\,y+R(x).$$
Umumiy holda u kvadraturalarda yechilmaydi. Lekin bitta **xususiy yechim** $y_1(x)$ ma’lum bo‘lsa,
$$y=y_1+\frac1z$$
almashtirish $z$ uchun **chiziqli** tenglama beradi:
$$z'=-\big(2P\,y_1+Q\big)\,z-P.$$
Xususiy yechimni ko‘pincha o‘ng tomon ko‘rinishiga qarab tanlaymiz: $y_1=ax+b$, $y_1=\dfrac ax$, $y_1=ae^{x}$ va h.k.`,
          R`$$y'=P(x)\,y^2+Q(x)\,y+R(x).$$
В общем случае оно не интегрируется в квадратурах. Но если известно одно **частное решение** $y_1(x)$, замена
$$y=y_1+\frac1z$$
даёт для $z$ **линейное** уравнение:
$$z'=-\big(2P\,y_1+Q\big)\,z-P.$$
Частное решение часто подбирают по виду правой части: $y_1=ax+b$, $y_1=\dfrac ax$, $y_1=ae^{x}$ и т.д.`,
          R`$$y'=P(x)\,y^2+Q(x)\,y+R(x).$$
In general it cannot be solved by quadratures. But if one **particular solution** $y_1(x)$ is known, the substitution
$$y=y_1+\frac1z$$
gives a **linear** equation for $z$:
$$z'=-\big(2P\,y_1+Q\big)\,z-P.$$
A particular solution is often guessed from the shape of the right side: $y_1=ax+b$, $y_1=\dfrac ax$, $y_1=ae^{x}$, etc.`) },
        { type: 'example', title: L(R`$y'=y^2-\dfrac{2}{x^2}$`, R`$y'=y^2-\dfrac{2}{x^2}$`, R`$y'=y^2-\dfrac{2}{x^2}$`),
          body: L(R`Xususiy yechimni $y_1=\dfrac ax$ ko‘rinishida qidirib, umumiy yechimni toping ($x>0$).`, R`Найдите частное решение вида $y_1=\dfrac ax$, затем общее решение ($x>0$).`, R`Look for a particular solution $y_1=\dfrac ax$, then find the general solution ($x>0$).`),
          steps: [
            L(R`$-\dfrac a{x^2}=\dfrac{a^2}{x^2}-\dfrac2{x^2}$ $\Rightarrow$ $a^2+a-2=0$, $a=1$ yoki $a=-2$. $y_1=\dfrac1x$ ni olamiz.`, R`$-\dfrac a{x^2}=\dfrac{a^2}{x^2}-\dfrac2{x^2}$ $\Rightarrow$ $a^2+a-2=0$, $a=1$ или $a=-2$. Берём $y_1=\dfrac1x$.`, R`$-\dfrac a{x^2}=\dfrac{a^2}{x^2}-\dfrac2{x^2}$ $\Rightarrow$ $a^2+a-2=0$, so $a=1$ or $a=-2$. Take $y_1=\dfrac1x$.`),
            L(R`$P=1$, $Q=0$: $z'=-\dfrac{2}{x}z-1$, ya’ni $z'+\dfrac2xz=-1$.`, R`$P=1$, $Q=0$: $z'=-\dfrac{2}{x}z-1$, то есть $z'+\dfrac2xz=-1$.`, R`$P=1$, $Q=0$: $z'=-\dfrac{2}{x}z-1$, i.e. $z'+\dfrac2xz=-1$.`),
            L(R`$\mu=x^2$: $(x^2z)'=-x^2$, $z=-\dfrac x3+\dfrac{C_1}{x^2}=\dfrac{C-x^3}{3x^2}$ ($C=3C_1$).`, R`$\mu=x^2$: $(x^2z)'=-x^2$, $z=-\dfrac x3+\dfrac{C_1}{x^2}=\dfrac{C-x^3}{3x^2}$ ($C=3C_1$).`, R`$\mu=x^2$: $(x^2z)'=-x^2$, $z=-\dfrac x3+\dfrac{C_1}{x^2}=\dfrac{C-x^3}{3x^2}$ ($C=3C_1$).`),
            L(R`$y=\dfrac1x+\dfrac{3x^2}{C-x^3}$. $C=0$ da ikkinchi xususiy yechim $y=-\dfrac2x$ chiqadi; $y_1=\frac1x$ esa “$C=\infty$” ga mos keladi va alohida yoziladi.`, R`$y=\dfrac1x+\dfrac{3x^2}{C-x^3}$. При $C=0$ получается второе частное решение $y=-\dfrac2x$; а $y_1=\frac1x$ соответствует «$C=\infty$» и выписывается отдельно.`, R`$y=\dfrac1x+\dfrac{3x^2}{C-x^3}$. With $C=0$ we recover the second particular solution $y=-\dfrac2x$; $y_1=\frac1x$ corresponds to “$C=\infty$” and is listed separately.`)
          ],
          check: L(R`$y'-y^2+\dfrac2{x^2}=0$ har qanday $C$ da ✓.`, R`$y'-y^2+\dfrac2{x^2}=0$ при любом $C$ ✓.`, R`$y'-y^2+\dfrac2{x^2}=0$ for every $C$ ✓.`) },
        { type: 'warn', body: L(R`Rikkati tenglamasida $y=y_1+\frac1z$ almashtirishdan keyin $y_1$ ning o‘zi yo‘qoladi ($z=\infty$ ga mos). Javobga uni alohida qo‘shing. Xususiy yechimsiz Rikkati tenglamasini ($y'=x^2+y^2$ kabi) elementar funksiyalarda yechib bo‘lmaydi — bunda sonli usullar (11-mavzu) kerak.`,
          R`В уравнении Риккати после замены $y=y_1+\frac1z$ само $y_1$ теряется (ему соответствует $z=\infty$). Добавьте его к ответу отдельно. Без частного решения уравнение Риккати (например, $y'=x^2+y^2$) в элементарных функциях не решается — нужны численные методы (тема 11).`,
          R`In a Riccati equation, after $y=y_1+\frac1z$ the solution $y_1$ itself is lost (it corresponds to $z=\infty$). Add it to the answer separately. Without a particular solution a Riccati equation (such as $y'=x^2+y^2$) cannot be solved in elementary functions; numerical methods are needed (topic 11).`) }
      ]
    },
    {
      id: 't04.3',
      title: L('To‘la differensialli tenglamalar', 'Уравнения в полных дифференциалах', 'Exact equations'),
      blocks: [
        { type: 'def', title: L('To‘la differensialli tenglama', 'Уравнение в полных дифференциалах', 'Exact equation'),
          body: L(R`$M(x,y)\,dx+N(x,y)\,dy=0$ tenglama **to‘la differensialli** deyiladi, agar shunday $U(x,y)$ mavjud bo‘lsaki,
$$dU=M\,dx+N\,dy,\quad\text{ya’ni}\quad U_x=M,\ U_y=N.$$
U holda tenglama $dU=0$ ko‘rinishda va uning umumiy integrali $U(x,y)=C$.`,
          R`Уравнение $M(x,y)\,dx+N(x,y)\,dy=0$ называется **уравнением в полных дифференциалах**, если существует $U(x,y)$ такая, что
$$dU=M\,dx+N\,dy,\quad\text{то есть}\quad U_x=M,\ U_y=N.$$
Тогда уравнение имеет вид $dU=0$, и его общий интеграл $U(x,y)=C$.`,
          R`The equation $M(x,y)\,dx+N(x,y)\,dy=0$ is **exact** if there is a function $U(x,y)$ with
$$dU=M\,dx+N\,dy,\quad\text{i.e.}\quad U_x=M,\ U_y=N.$$
Then the equation reads $dU=0$ and its general integral is $U(x,y)=C$.`) },
        { type: 'thm', title: L('To‘la differensiallik alomati', 'Признак полного дифференциала', 'Test for exactness'),
          conds: L(R`1. $D$ — bir bog‘lamli soha (masalan, to‘g‘ri to‘rtburchak yoki butun tekislik);
2. $M$, $N$, $M_y$, $N_x$ $D$ da uzluksiz.`,
          R`1. $D$ — односвязная область (например, прямоугольник или вся плоскость);
2. $M$, $N$, $M_y$, $N_x$ непрерывны в $D$.`,
          R`1. $D$ is a simply connected region (for example a rectangle or the whole plane);
2. $M$, $N$, $M_y$, $N_x$ are continuous in $D$.`),
          body: L(R`U holda $M\,dx+N\,dy=0$ tenglama $D$ da to‘la differensialli bo‘lishi uchun
$$\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}\quad (D\ \text{da})$$
shart **zarur va yetarli**. Bunda $U(x,y)=\int_{x_0}^{x}M(t,y_0)\,dt+\int_{y_0}^{y}N(x,s)\,ds$.`,
          R`Тогда для того чтобы уравнение $M\,dx+N\,dy=0$ было в $D$ уравнением в полных дифференциалах, **необходимо и достаточно**
$$\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}\quad (\text{в } D).$$
При этом $U(x,y)=\int_{x_0}^{x}M(t,y_0)\,dt+\int_{y_0}^{y}N(x,s)\,ds$.`,
          R`Then $M\,dx+N\,dy=0$ is exact in $D$ **if and only if**
$$\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}\quad (\text{in } D).$$
In that case $U(x,y)=\int_{x_0}^{x}M(t,y_0)\,dt+\int_{y_0}^{y}N(x,s)\,ds$.`) },
        { type: 'proof', body: L(R`Zaruriyligi: $U_x=M$, $U_y=N$ bo‘lsa, $M_y=U_{xy}=U_{yx}=N_x$ (aralash hosilalar uzluksiz bo‘lgani uchun teng). Yetarliligi: $U=\int M\,dx+h(y)$ deb olamiz; $U_y=N$ shartdan $h'(y)=N-\frac{\partial}{\partial y}\int M\,dx$. $M_y=N_x$ tufayli bu ifodaning $x$ bo‘yicha hosilasi nolga teng, ya’ni u haqiqatan faqat $y$ ga bog‘liq (Dilmuradov, §2.5).`,
          R`Необходимость: если $U_x=M$, $U_y=N$, то $M_y=U_{xy}=U_{yx}=N_x$ (смешанные производные непрерывны и потому равны). Достаточность: положим $U=\int M\,dx+h(y)$; из $U_y=N$ получаем $h'(y)=N-\frac{\partial}{\partial y}\int M\,dx$. Благодаря $M_y=N_x$ производная этого выражения по $x$ равна нулю, то есть оно действительно зависит только от $y$ (Дилмурадов, §2.5).`,
          R`Necessity: if $U_x=M$ and $U_y=N$, then $M_y=U_{xy}=U_{yx}=N_x$ (the mixed partials are continuous, hence equal). Sufficiency: let $U=\int M\,dx+h(y)$; the condition $U_y=N$ gives $h'(y)=N-\frac{\partial}{\partial y}\int M\,dx$. Because $M_y=N_x$, the $x$-derivative of this expression is zero, so it really depends on $y$ only (Dilmuradov, §2.5).`) },
        { type: 'example', title: L(R`$U$ ni tiklash`, R`Восстановление $U$`, R`Recovering $U$`),
          body: L(R`$(2xy+3x^2)\,dx+(x^2+2y)\,dy=0$ ni yeching.`, R`Решите $(2xy+3x^2)\,dx+(x^2+2y)\,dy=0$.`, R`Solve $(2xy+3x^2)\,dx+(x^2+2y)\,dy=0$.`),
          steps: [
            L(R`Tekshiramiz: $M_y=2x$, $N_x=2x$ — teng, tenglama butun tekislikda to‘la differensialli.`, R`Проверяем: $M_y=2x$, $N_x=2x$ — равны, уравнение в полных дифференциалах на всей плоскости.`, R`Check: $M_y=2x$ and $N_x=2x$ agree, so the equation is exact on the whole plane.`),
            L(R`$U=\int(2xy+3x^2)\,dx=x^2y+x^3+h(y)$.`, R`$U=\int(2xy+3x^2)\,dx=x^2y+x^3+h(y)$.`, R`$U=\int(2xy+3x^2)\,dx=x^2y+x^3+h(y)$.`),
            L(R`$U_y=x^2+h'(y)=x^2+2y$ $\Rightarrow$ $h'=2y$, $h=y^2$.`, R`$U_y=x^2+h'(y)=x^2+2y$ $\Rightarrow$ $h'=2y$, $h=y^2$.`, R`$U_y=x^2+h'(y)=x^2+2y$ $\Rightarrow$ $h'=2y$, $h=y^2$.`),
            L(R`Umumiy integral: $x^2y+x^3+y^2=C$.`, R`Общий интеграл: $x^2y+x^3+y^2=C$.`, R`General integral: $x^2y+x^3+y^2=C$.`)
          ],
          check: L(R`$U_x=2xy+3x^2=M$ ✓, $U_y=x^2+2y=N$ ✓.`, R`$U_x=2xy+3x^2=M$ ✓, $U_y=x^2+2y=N$ ✓.`, R`$U_x=2xy+3x^2=M$ ✓, $U_y=x^2+2y=N$ ✓.`) },
        { type: 'example', title: L('Transsendent koeffitsiyentlar va Koshi masalasi', 'Трансцендентные коэффициенты и задача Коши', 'Transcendental coefficients and a Cauchy problem'),
          body: L(R`$(y\cos x+2xe^{y})\,dx+(\sin x+x^2e^{y}-1)\,dy=0$, $y(0)=0$.`, R`$(y\cos x+2xe^{y})\,dx+(\sin x+x^2e^{y}-1)\,dy=0$, $y(0)=0$.`, R`$(y\cos x+2xe^{y})\,dx+(\sin x+x^2e^{y}-1)\,dy=0$, $y(0)=0$.`),
          steps: [
            L(R`$M_y=\cos x+2xe^{y}$, $N_x=\cos x+2xe^{y}$ — teng.`, R`$M_y=\cos x+2xe^{y}$, $N_x=\cos x+2xe^{y}$ — равны.`, R`$M_y=\cos x+2xe^{y}$ and $N_x=\cos x+2xe^{y}$ agree.`),
            L(R`$U=\int M\,dx=y\sin x+x^2e^{y}+h(y)$; $U_y=\sin x+x^2e^y+h'=N$ $\Rightarrow$ $h'=-1$, $h=-y$.`, R`$U=\int M\,dx=y\sin x+x^2e^{y}+h(y)$; $U_y=\sin x+x^2e^y+h'=N$ $\Rightarrow$ $h'=-1$, $h=-y$.`, R`$U=\int M\,dx=y\sin x+x^2e^{y}+h(y)$; $U_y=\sin x+x^2e^y+h'=N$ $\Rightarrow$ $h'=-1$, $h=-y$.`),
            L(R`Umumiy integral: $y\sin x+x^2e^{y}-y=C$.`, R`Общий интеграл: $y\sin x+x^2e^{y}-y=C$.`, R`General integral: $y\sin x+x^2e^{y}-y=C$.`),
            L(R`$x=0$, $y=0$ ni qo‘yamiz: $C=0$. Javob: $y\sin x+x^2e^{y}-y=0$ (oshkormas ko‘rinishda).`, R`Подставляем $x=0$, $y=0$: $C=0$. Ответ: $y\sin x+x^2e^{y}-y=0$ (в неявном виде).`, R`Put $x=0$, $y=0$: $C=0$. Answer: $y\sin x+x^2e^{y}-y=0$ (implicitly).`)
          ],
          check: L(R`$U_x=y\cos x+2xe^y=M$ ✓, $U_y=\sin x+x^2e^y-1=N$ ✓, $U(0,0)=0$ ✓.`, R`$U_x=y\cos x+2xe^y=M$ ✓, $U_y=\sin x+x^2e^y-1=N$ ✓, $U(0,0)=0$ ✓.`, R`$U_x=y\cos x+2xe^y=M$ ✓, $U_y=\sin x+x^2e^y-1=N$ ✓, $U(0,0)=0$ ✓.`) },
        { type: 'warn', body: L(R`$h(y)$ ni unutmang: $\int M\,dx$ da “o‘zgarmas” — $y$ ning ixtiyoriy funksiyasi. $h'(y)$ da $x$ qolsa — hisobda xato bor (yoki tenglama to‘la differensialli emas).

**Bir bog‘lamlilik muhim.** $\dfrac{-y\,dx+x\,dy}{x^2+y^2}=0$ uchun $M_y=N_x$ ($(0,0)$ dan tashqari), lekin teshikli tekislikda yagona $U$ yo‘q: $U=\arctan\frac yx$ — burchak — faqat yarim tekislikda bir qiymatli.`,
          R`Не забывайте $h(y)$: «постоянная» в $\int M\,dx$ — произвольная функция от $y$. Если в $h'(y)$ остался $x$, в выкладках ошибка (или уравнение не в полных дифференциалах).

**Односвязность важна.** Для $\dfrac{-y\,dx+x\,dy}{x^2+y^2}=0$ имеем $M_y=N_x$ (вне $(0,0)$), но в плоскости с выколотой точкой единой $U$ нет: $U=\arctan\frac yx$ — угол — однозначна лишь в полуплоскости.`,
          R`Do not forget $h(y)$: the “constant” in $\int M\,dx$ is an arbitrary function of $y$. If $x$ remains in $h'(y)$, there is a slip (or the equation is not exact).

**Simple connectivity matters.** For $\dfrac{-y\,dx+x\,dy}{x^2+y^2}=0$ we have $M_y=N_x$ (away from $(0,0)$), but on the punctured plane there is no single $U$: $U=\arctan\frac yx$, the polar angle, is single-valued only on a half-plane.`) }
      ]
    },
    {
      id: 't04.4',
      title: L('Integrallovchi ko‘paytuvchi va uni tanlash', 'Интегрирующий множитель и его выбор', 'Integrating factors and how to choose them'),
      blocks: [
        { type: 'def', title: L('Integrallovchi ko‘paytuvchi', 'Интегрирующий множитель', 'Integrating factor'),
          body: L(R`Agar $M\,dx+N\,dy=0$ to‘la differensialli bo‘lmasa, shunday $\mu(x,y)\ne0$ qidiramizki, $\mu M\,dx+\mu N\,dy=0$ to‘la differensialli bo‘lsin:
$$(\mu M)_y=(\mu N)_x.$$
Bu $\mu$ ga nisbatan xususiy hosilali tenglama; umumiy holda uni yechish qiyin, lekin $\mu$ faqat bitta o‘zgaruvchiga bog‘liq bo‘lgan hollar oson tekshiriladi.`,
          R`Если $M\,dx+N\,dy=0$ не является уравнением в полных дифференциалах, ищем $\mu(x,y)\ne0$ такую, что $\mu M\,dx+\mu N\,dy=0$ — уравнение в полных дифференциалах:
$$(\mu M)_y=(\mu N)_x.$$
Это уравнение в частных производных для $\mu$; в общем случае оно трудное, но случаи, когда $\mu$ зависит от одной переменной, проверяются легко.`,
          R`If $M\,dx+N\,dy=0$ is not exact, look for $\mu(x,y)\ne0$ such that $\mu M\,dx+\mu N\,dy=0$ is exact:
$$(\mu M)_y=(\mu N)_x.$$
This is a partial differential equation for $\mu$; in general it is hard, but the cases where $\mu$ depends on one variable only are easy to test.`) },
        { type: 'thm', title: L(R`$\mu(x)$ va $\mu(y)$ ni tanlash qoidasi`, R`Правило выбора $\mu(x)$ и $\mu(y)$`, R`Rule for choosing $\mu(x)$ or $\mu(y)$`),
          conds: L(R`$M$, $N$, $M_y$, $N_x$ sohada uzluksiz va mos maxraj ($N$ yoki $M$) nolga teng emas.`, R`$M$, $N$, $M_y$, $N_x$ непрерывны в области, и соответствующий знаменатель ($N$ или $M$) не равен нулю.`, R`$M$, $N$, $M_y$, $N_x$ are continuous in the region and the relevant denominator ($N$ or $M$) is non-zero.`),
          body: L(R`- Agar $\dfrac{M_y-N_x}{N}=\varphi(x)$ faqat $x$ ga bog‘liq bo‘lsa, $\mu=\mu(x)=e^{\int\varphi(x)\,dx}$.
- Agar $\dfrac{N_x-M_y}{M}=\psi(y)$ faqat $y$ ga bog‘liq bo‘lsa, $\mu=\mu(y)=e^{\int\psi(y)\,dy}$.

Chiziqli tenglama $(py-q)\,dx+dy=0$ uchun $\dfrac{M_y-N_x}{N}=p(x)$, ya’ni $\mu=e^{\int p\,dx}$ — 1-darsdagi ko‘paytuvchining o‘zi.`,
          R`- Если $\dfrac{M_y-N_x}{N}=\varphi(x)$ зависит только от $x$, то $\mu=\mu(x)=e^{\int\varphi(x)\,dx}$.
- Если $\dfrac{N_x-M_y}{M}=\psi(y)$ зависит только от $y$, то $\mu=\mu(y)=e^{\int\psi(y)\,dy}$.

Для линейного уравнения $(py-q)\,dx+dy=0$ получаем $\dfrac{M_y-N_x}{N}=p(x)$, то есть $\mu=e^{\int p\,dx}$ — тот самый множитель из урока 1.`,
          R`- If $\dfrac{M_y-N_x}{N}=\varphi(x)$ depends on $x$ only, then $\mu=\mu(x)=e^{\int\varphi(x)\,dx}$.
- If $\dfrac{N_x-M_y}{M}=\psi(y)$ depends on $y$ only, then $\mu=\mu(y)=e^{\int\psi(y)\,dy}$.

For the linear equation $(py-q)\,dx+dy=0$ we get $\dfrac{M_y-N_x}{N}=p(x)$, i.e. $\mu=e^{\int p\,dx}$, exactly the factor of lesson 1.`) },
        { type: 'proof', body: L(R`$\mu=\mu(x)$ bo‘lsa, $(\mu M)_y=\mu M_y$, $(\mu N)_x=\mu'N+\mu N_x$. Tenglik $\mu M_y=\mu' N+\mu N_x$ dan $\dfrac{\mu'}{\mu}=\dfrac{M_y-N_x}{N}$. Chap tomon faqat $x$ ga bog‘liq, demak o‘ng tomon ham shunday bo‘lishi kerak; aksincha, shunday bo‘lsa, $\mu$ integrallash bilan topiladi. $\mu(y)$ uchun ham xuddi shunday.`,
          R`Если $\mu=\mu(x)$, то $(\mu M)_y=\mu M_y$, $(\mu N)_x=\mu'N+\mu N_x$. Из $\mu M_y=\mu' N+\mu N_x$ следует $\dfrac{\mu'}{\mu}=\dfrac{M_y-N_x}{N}$. Левая часть зависит только от $x$, значит, и правая должна; обратно, если это так, $\mu$ находится интегрированием. Для $\mu(y)$ аналогично.`,
          R`If $\mu=\mu(x)$, then $(\mu M)_y=\mu M_y$ and $(\mu N)_x=\mu'N+\mu N_x$. The equality $\mu M_y=\mu' N+\mu N_x$ gives $\dfrac{\mu'}{\mu}=\dfrac{M_y-N_x}{N}$. The left side depends on $x$ only, so the right side must too; conversely, if it does, $\mu$ follows by integration. The case $\mu(y)$ is the same.`) },
        { type: 'example', title: L(R`$\mu(x)$ topiladigan hol`, R`Случай $\mu(x)$`, R`A case with $\mu(x)$`),
          body: L(R`$(x^2+y^2+x)\,dx+xy\,dy=0$ ni yeching.`, R`Решите $(x^2+y^2+x)\,dx+xy\,dy=0$.`, R`Solve $(x^2+y^2+x)\,dx+xy\,dy=0$.`),
          steps: [
            L(R`$M_y=2y$, $N_x=y$ — teng emas.`, R`$M_y=2y$, $N_x=y$ — не равны.`, R`$M_y=2y$ and $N_x=y$ differ.`),
            L(R`$\dfrac{M_y-N_x}{N}=\dfrac{y}{xy}=\dfrac1x$ — faqat $x$ ga bog‘liq. $\mu=e^{\ln|x|}$, $\mu=x$ ni olamiz.`, R`$\dfrac{M_y-N_x}{N}=\dfrac{y}{xy}=\dfrac1x$ — только от $x$. $\mu=e^{\ln|x|}$, берём $\mu=x$.`, R`$\dfrac{M_y-N_x}{N}=\dfrac{y}{xy}=\dfrac1x$ depends on $x$ only. $\mu=e^{\ln|x|}$; take $\mu=x$.`),
            L(R`$(x^3+xy^2+x^2)\,dx+x^2y\,dy=0$: endi $M_y=2xy=N_x$ ✓.`, R`$(x^3+xy^2+x^2)\,dx+x^2y\,dy=0$: теперь $M_y=2xy=N_x$ ✓.`, R`$(x^3+xy^2+x^2)\,dx+x^2y\,dy=0$: now $M_y=2xy=N_x$ ✓.`),
            L(R`$U=\int x^2y\,dy=\dfrac{x^2y^2}{2}+g(x)$; $U_x=xy^2+g'=x^3+xy^2+x^2$ $\Rightarrow$ $g=\dfrac{x^4}{4}+\dfrac{x^3}{3}$. Javob: $\dfrac{x^4}{4}+\dfrac{x^3}{3}+\dfrac{x^2y^2}{2}=C$.`, R`$U=\int x^2y\,dy=\dfrac{x^2y^2}{2}+g(x)$; $U_x=xy^2+g'=x^3+xy^2+x^2$ $\Rightarrow$ $g=\dfrac{x^4}{4}+\dfrac{x^3}{3}$. Ответ: $\dfrac{x^4}{4}+\dfrac{x^3}{3}+\dfrac{x^2y^2}{2}=C$.`, R`$U=\int x^2y\,dy=\dfrac{x^2y^2}{2}+g(x)$; $U_x=xy^2+g'=x^3+xy^2+x^2$ $\Rightarrow$ $g=\dfrac{x^4}{4}+\dfrac{x^3}{3}$. Answer: $\dfrac{x^4}{4}+\dfrac{x^3}{3}+\dfrac{x^2y^2}{2}=C$.`)
          ],
          check: L(R`$U_x=x^3+x^2+xy^2=xM$ ✓, $U_y=x^2y=xN$ ✓.`, R`$U_x=x^3+x^2+xy^2=xM$ ✓, $U_y=x^2y=xN$ ✓.`, R`$U_x=x^3+x^2+xy^2=xM$ ✓, $U_y=x^2y=xN$ ✓.`) },
        { type: 'example', title: L(R`$\mu(y)$ topiladigan hol`, R`Случай $\mu(y)$`, R`A case with $\mu(y)$`),
          body: L(R`$y\,dx+(2x+y^2)\,dy=0$ ni yeching.`, R`Решите $y\,dx+(2x+y^2)\,dy=0$.`, R`Solve $y\,dx+(2x+y^2)\,dy=0$.`),
          steps: [
            L(R`$M_y=1$, $N_x=2$. $\dfrac{M_y-N_x}{N}=\dfrac{-1}{2x+y^2}$ — $y$ ham qatnashadi, $\mu(x)$ yo‘q.`, R`$M_y=1$, $N_x=2$. $\dfrac{M_y-N_x}{N}=\dfrac{-1}{2x+y^2}$ — есть $y$, $\mu(x)$ нет.`, R`$M_y=1$, $N_x=2$. $\dfrac{M_y-N_x}{N}=\dfrac{-1}{2x+y^2}$ contains $y$, so there is no $\mu(x)$.`),
            L(R`$\dfrac{N_x-M_y}{M}=\dfrac{1}{y}$ — faqat $y$ ga bog‘liq: $\mu=e^{\ln|y|}$, $\mu=y$.`, R`$\dfrac{N_x-M_y}{M}=\dfrac{1}{y}$ — только от $y$: $\mu=e^{\ln|y|}$, $\mu=y$.`, R`$\dfrac{N_x-M_y}{M}=\dfrac{1}{y}$ depends on $y$ only: $\mu=e^{\ln|y|}$, $\mu=y$.`),
            L(R`$y^2\,dx+(2xy+y^3)\,dy=0$: $M_y=2y=N_x$ ✓. $U=xy^2+h(y)$, $U_y=2xy+h'=2xy+y^3$, $h=\dfrac{y^4}{4}$.`, R`$y^2\,dx+(2xy+y^3)\,dy=0$: $M_y=2y=N_x$ ✓. $U=xy^2+h(y)$, $U_y=2xy+h'=2xy+y^3$, $h=\dfrac{y^4}{4}$.`, R`$y^2\,dx+(2xy+y^3)\,dy=0$: $M_y=2y=N_x$ ✓. $U=xy^2+h(y)$, $U_y=2xy+h'=2xy+y^3$, $h=\dfrac{y^4}{4}$.`),
            L(R`Javob: $xy^2+\dfrac{y^4}{4}=C$. $\mu=y$ ga ko‘paytirganda yangi yechim qo‘shilmadi: $y\equiv0$ dastlabki tenglamaning ham yechimi ($dy=0$, $y=0$) va u $C=0$ da kiradi.`, R`Ответ: $xy^2+\dfrac{y^4}{4}=C$. Умножение на $\mu=y$ не добавило лишних решений: $y\equiv0$ — решение и исходного уравнения ($dy=0$, $y=0$), оно входит при $C=0$.`, R`Answer: $xy^2+\dfrac{y^4}{4}=C$. Multiplying by $\mu=y$ added no spurious solution: $y\equiv0$ also solves the original equation ($dy=0$, $y=0$) and appears for $C=0$.`)
          ],
          check: L(R`$U_x=y^2=yM$ ✓, $U_y=2xy+y^3=yN$ ✓.`, R`$U_x=y^2=yM$ ✓, $U_y=2xy+y^3=yN$ ✓.`, R`$U_x=y^2=yM$ ✓, $U_y=2xy+y^3=yN$ ✓.`) },
        { type: 'warn', body: L(R`$\mu$ ga ko‘paytirish **yangi** yechimlar qo‘shishi ($\mu=0$ chiziqlar) yoki ba’zilarini **yo‘qotishi** ($\mu=\infty$ chiziqlar, masalan $\mu=1/y$ da $y\equiv0$) mumkin. Har doim $\mu=0$ va $\mu$ aniqlanmagan chiziqlarni dastlabki tenglamaga qo‘yib tekshiring — maxsus yechimlar ko‘pincha shu yerda yashiringan.`,
          R`Умножение на $\mu$ может **добавить** решения (линии $\mu=0$) или **потерять** некоторые (линии, где $\mu=\infty$, например $y\equiv0$ при $\mu=1/y$). Всегда подставляйте линии $\mu=0$ и линии, где $\mu$ не определён, в исходное уравнение — особые решения часто прячутся именно там.`,
          R`Multiplying by $\mu$ can **add** solutions (the curves $\mu=0$) or **lose** some (curves where $\mu=\infty$, e.g. $y\equiv0$ for $\mu=1/y$). Always test the curves $\mu=0$ and those where $\mu$ is undefined in the original equation; singular solutions often hide there.`) },
        { type: 'lab', lab: 'L03', body: L(R`“Usulni tanlash” laboratoriyasida $M$ va $N$ ni kiriting: dastur $M_y-N_x$ ni, $\dfrac{M_y-N_x}{N}$ va $\dfrac{N_x-M_y}{M}$ nisbatlarni hisoblaydi va chiziqli, Bernulli, to‘la differensialli yoki $\mu(x)$/$\mu(y)$ holini ko‘rsatadi.`, R`В лаборатории «Выбор метода» введите $M$ и $N$: программа вычислит $M_y-N_x$, отношения $\dfrac{M_y-N_x}{N}$ и $\dfrac{N_x-M_y}{M}$ и укажет случай: линейное, Бернулли, в полных дифференциалах или $\mu(x)$/$\mu(y)$.`, R`In the “method chooser” lab, enter $M$ and $N$: it computes $M_y-N_x$, the ratios $\dfrac{M_y-N_x}{N}$ and $\dfrac{N_x-M_y}{M}$, and shows whether the case is linear, Bernoulli, exact or $\mu(x)$/$\mu(y)$.`) }
      ]
    }
  ],
  mistakes: [
    L(R`Normal ko‘rinishga keltirmasdan $p$ ni olish: $xy'+2y=x$ da $p=\frac2x$.`, R`Брать $p$, не приведя уравнение к нормальному виду: в $xy'+2y=x$ $p=\frac2x$.`, R`Reading off $p$ before putting the equation in normal form: in $xy'+2y=x$, $p=\frac2x$.`),
    L(R`$\int q\mu\,dx$ dan keyin $+C$ ni unutish yoki uni $e^{-P}$ ga ko‘paytirmaslik: $y=e^{-P}\int q\mu\,dx+C$ — xato.`, R`Забывать $+C$ после $\int q\mu\,dx$ или не умножать его на $e^{-P}$: $y=e^{-P}\int q\mu\,dx+C$ — ошибка.`, R`Forgetting $+C$ after $\int q\mu\,dx$, or not multiplying it by $e^{-P}$: $y=e^{-P}\int q\mu\,dx+C$ is wrong.`),
    L(R`Bernulli tenglamasida $y\equiv0$ yechimni yo‘qotish ($n>0$ da).`, R`Терять решение $y\equiv0$ уравнения Бернулли (при $n>0$).`, R`Losing the solution $y\equiv0$ of a Bernoulli equation (for $n>0$).`),
    L(R`$z=y^{1-n}$ o‘rniga $z=y^n$ yoki $z=y^{n-1}$ almashtirish.`, R`Делать замену $z=y^n$ или $z=y^{n-1}$ вместо $z=y^{1-n}$.`, R`Using $z=y^n$ or $z=y^{n-1}$ instead of $z=y^{1-n}$.`),
    L(R`To‘la differensialli tenglamada $h(y)$ ni tushirib qoldirish yoki $U=\int M\,dx+\int N\,dy$ deb umumiy hadlarni ikki marta qo‘shish.`, R`В уравнении в полных дифференциалах терять $h(y)$ или писать $U=\int M\,dx+\int N\,dy$, учитывая общие члены дважды.`, R`In an exact equation, dropping $h(y)$ or writing $U=\int M\,dx+\int N\,dy$ and counting common terms twice.`),
    L(R`$M_y=N_x$ ni tekshirmasdan $U$ ni qidirish, yoki $\mu$ ga ko‘paytirgandan keyin yangi tenglamani qayta tekshirmaslik.`, R`Искать $U$, не проверив $M_y=N_x$, или не проверять заново уравнение после умножения на $\mu$.`, R`Looking for $U$ without checking $M_y=N_x$, or not re-checking after multiplying by $\mu$.`)
  ],
  exercises: [
    { id: 't04.x1', level: 'easy', type: 'formula',
      q: L(R`$y'+3y=6$ ning umumiy yechimini yozing: $y=\ ?$`, R`Запишите общее решение $y'+3y=6$: $y=\ ?$`, R`Write the general solution of $y'+3y=6$: $y=\ ?$`),
      check: { kind: 'ode', residual: 'yp + 3*y - 6', order: 1, consts: ['C'], x: [-1, 1] }, answer: '2 + C*exp(-3*x)',
      hint: L(R`$\mu=e^{3x}$, $(e^{3x}y)'=6e^{3x}$.`, R`$\mu=e^{3x}$, $(e^{3x}y)'=6e^{3x}$.`, R`$\mu=e^{3x}$, $(e^{3x}y)'=6e^{3x}$.`),
      solution: L(R`$e^{3x}y=2e^{3x}+C$, $y=2+Ce^{-3x}$.`, R`$e^{3x}y=2e^{3x}+C$, $y=2+Ce^{-3x}$.`, R`$e^{3x}y=2e^{3x}+C$, $y=2+Ce^{-3x}$.`) },
    { id: 't04.x2', level: 'easy', type: 'mcq',
      q: L(R`$y'+\dfrac2xy=\cos x$ ($x>0$) uchun integrallovchi ko‘paytuvchi:`, R`Интегрирующий множитель для $y'+\dfrac2xy=\cos x$ ($x>0$):`, R`The integrating factor for $y'+\dfrac2xy=\cos x$ ($x>0$):`),
      options: [L(R`$x^2$`, R`$x^2$`, R`$x^2$`), L(R`$e^{2x}$`, R`$e^{2x}$`, R`$e^{2x}$`), L(R`$\dfrac1{x^2}$`, R`$\dfrac1{x^2}$`, R`$\dfrac1{x^2}$`), L(R`$2\ln x$`, R`$2\ln x$`, R`$2\ln x$`)], correct: 0,
      explain: L(R`$\mu=e^{\int\frac2x dx}=e^{2\ln x}=x^2$.`, R`$\mu=e^{\int\frac2x dx}=e^{2\ln x}=x^2$.`, R`$\mu=e^{\int\frac2x dx}=e^{2\ln x}=x^2$.`) },
    { id: 't04.x3', level: 'mid', type: 'formula',
      q: L(R`$y'-\dfrac yx=x^2$ ($x>0$) ning umumiy yechimini yozing: $y=\ ?$`, R`Запишите общее решение $y'-\dfrac yx=x^2$ ($x>0$): $y=\ ?$`, R`Write the general solution of $y'-\dfrac yx=x^2$ ($x>0$): $y=\ ?$`),
      check: { kind: 'ode', residual: 'yp - y/x - x^2', order: 1, consts: ['C'], x: [0.5, 3] }, answer: 'x^3/2 + C*x',
      hint: L(R`$\mu=\dfrac1x$: $\left(\dfrac yx\right)'=x$.`, R`$\mu=\dfrac1x$: $\left(\dfrac yx\right)'=x$.`, R`$\mu=\dfrac1x$: $\left(\dfrac yx\right)'=x$.`),
      solution: L(R`$\dfrac yx=\dfrac{x^2}{2}+C$, $y=\dfrac{x^3}{2}+Cx$.`, R`$\dfrac yx=\dfrac{x^2}{2}+C$, $y=\dfrac{x^3}{2}+Cx$.`, R`$\dfrac yx=\dfrac{x^2}{2}+C$, $y=\dfrac{x^3}{2}+Cx$.`) },
    { id: 't04.x4', level: 'mid', type: 'formula',
      q: L(R`$y'+2xy=2x$, $y(0)=3$ Koshi masalasini yeching: $y=\ ?$`, R`Решите задачу Коши $y'+2xy=2x$, $y(0)=3$: $y=\ ?$`, R`Solve the Cauchy problem $y'+2xy=2x$, $y(0)=3$: $y=\ ?$`),
      check: { kind: 'ode', residual: 'yp + 2*x*y - 2*x', order: 1, consts: [], x: [-1.5, 1.5], ivp: { x0: 0, y0: 3 } }, answer: '1 + 2*exp(-x^2)',
      hint: L(R`$\mu=e^{x^2}$; $\int2xe^{x^2}dx=e^{x^2}$.`, R`$\mu=e^{x^2}$; $\int2xe^{x^2}dx=e^{x^2}$.`, R`$\mu=e^{x^2}$; $\int2xe^{x^2}dx=e^{x^2}$.`),
      solution: L(R`$y=1+Ce^{-x^2}$; $y(0)=1+C=3$, $C=2$: $y=1+2e^{-x^2}$, $x\in\mathbb R$.`, R`$y=1+Ce^{-x^2}$; $y(0)=1+C=3$, $C=2$: $y=1+2e^{-x^2}$, $x\in\mathbb R$.`, R`$y=1+Ce^{-x^2}$; $y(0)=1+C=3$, $C=2$: $y=1+2e^{-x^2}$, $x\in\mathbb R$.`) },
    { id: 't04.x5', level: 'mid', type: 'formula',
      q: L(R`$y'-y=e^{x}y^2$ Bernulli tenglamasining umumiy yechimini yozing ($y\equiv0$ dan tashqari): $y=\ ?$`, R`Запишите общее решение уравнения Бернулли $y'-y=e^{x}y^2$ (кроме $y\equiv0$): $y=\ ?$`, R`Write the general solution of the Bernoulli equation $y'-y=e^{x}y^2$ (besides $y\equiv0$): $y=\ ?$`),
      check: { kind: 'ode', residual: 'yp - y - exp(x)*y^2', order: 1, consts: ['C'], x: [-1, 0.3], c: [2, 3] }, answer: '1/(C*exp(-x) - exp(x)/2)',
      hint: L(R`$z=y^{-1}$: $z'+z=-e^{x}$.`, R`$z=y^{-1}$: $z'+z=-e^{x}$.`, R`$z=y^{-1}$: $z'+z=-e^{x}$.`),
      solution: L(R`$(e^{x}z)'=-e^{2x}$, $z=-\dfrac{e^{x}}2+Ce^{-x}$, $y=\dfrac{1}{Ce^{-x}-e^{x}/2}$; yana $y\equiv0$.`, R`$(e^{x}z)'=-e^{2x}$, $z=-\dfrac{e^{x}}2+Ce^{-x}$, $y=\dfrac{1}{Ce^{-x}-e^{x}/2}$; и ещё $y\equiv0$.`, R`$(e^{x}z)'=-e^{2x}$, $z=-\dfrac{e^{x}}2+Ce^{-x}$, $y=\dfrac{1}{Ce^{-x}-e^{x}/2}$; plus $y\equiv0$.`) },
    { id: 't04.x6', level: 'mid', type: 'formula',
      q: L(R`$(3x^2+y)\,dx+(x+2y)\,dy=0$ ning umumiy integralini yozing: $U(x,y)=C$.`, R`Запишите общий интеграл $(3x^2+y)\,dx+(x+2y)\,dy=0$: $U(x,y)=C$.`, R`Write the general integral of $(3x^2+y)\,dx+(x+2y)\,dy=0$: $U(x,y)=C$.`),
      check: { kind: 'integral', ref: 'x^3 + x*y + y^2', x: [0.3, 2], y: [0.3, 2] }, answer: 'x^3 + x*y + y^2 = C',
      hint: L(R`$M_y=N_x=1$. $U=x^3+xy+h(y)$.`, R`$M_y=N_x=1$. $U=x^3+xy+h(y)$.`, R`$M_y=N_x=1$. $U=x^3+xy+h(y)$.`),
      solution: L(R`$U_y=x+h'=x+2y$, $h=y^2$: $x^3+xy+y^2=C$.`, R`$U_y=x+h'=x+2y$, $h=y^2$: $x^3+xy+y^2=C$.`, R`$U_y=x+h'=x+2y$, $h=y^2$: $x^3+xy+y^2=C$.`) },
    { id: 't04.x7', level: 'mid', type: 'numeric',
      q: L(R`$a$ ning qanday qiymatida $(2xy+ay^2)\,dx+(x^2+6xy)\,dy=0$ to‘la differensialli bo‘ladi?`, R`При каком $a$ уравнение $(2xy+ay^2)\,dx+(x^2+6xy)\,dy=0$ — в полных дифференциалах?`, R`For which $a$ is $(2xy+ay^2)\,dx+(x^2+6xy)\,dy=0$ exact?`),
      check: { kind: 'numeric', value: 3, tol: 0 },
      hint: L(R`$M_y=2x+2ay$, $N_x=2x+6y$.`, R`$M_y=2x+2ay$, $N_x=2x+6y$.`, R`$M_y=2x+2ay$, $N_x=2x+6y$.`),
      solution: L(R`$2a=6$, $a=3$.`, R`$2a=6$, $a=3$.`, R`$2a=6$, $a=3$.`) },
    { id: 't04.x8', level: 'hard', type: 'formula',
      q: L(R`$y'+y^2=\dfrac2{x^2}$ Rikkati tenglamasining $y_1=\dfrac2x$ xususiy yechimi ma’lum. Umumiy yechimni yozing ($x>0$): $y=\ ?$`, R`У уравнения Риккати $y'+y^2=\dfrac2{x^2}$ известно частное решение $y_1=\dfrac2x$. Запишите общее решение ($x>0$): $y=\ ?$`, R`The Riccati equation $y'+y^2=\dfrac2{x^2}$ has the particular solution $y_1=\dfrac2x$. Write the general solution ($x>0$): $y=\ ?$`),
      check: { kind: 'ode', residual: 'yp + y^2 - 2/x^2', order: 1, consts: ['C'], x: [1.2, 2], c: [1, 3] }, answer: '2/x + 3/(C*x^4 - x)',
      hint: L(R`$y=\dfrac2x+\dfrac1z$: $z'=\dfrac4xz+1$, $\mu=x^{-4}$.`, R`$y=\dfrac2x+\dfrac1z$: $z'=\dfrac4xz+1$, $\mu=x^{-4}$.`, R`$y=\dfrac2x+\dfrac1z$: $z'=\dfrac4xz+1$, $\mu=x^{-4}$.`),
      solution: L(R`$\left(\dfrac{z}{x^4}\right)'=\dfrac1{x^4}$, $z=-\dfrac x3+C_1x^4=\dfrac{Cx^4-x}{3}$. $y=\dfrac2x+\dfrac{3}{Cx^4-x}$; $C=0$ da $y=-\dfrac1x$, yana $y_1=\dfrac2x$.`, R`$\left(\dfrac{z}{x^4}\right)'=\dfrac1{x^4}$, $z=-\dfrac x3+C_1x^4=\dfrac{Cx^4-x}{3}$. $y=\dfrac2x+\dfrac{3}{Cx^4-x}$; при $C=0$ $y=-\dfrac1x$, и ещё $y_1=\dfrac2x$.`, R`$\left(\dfrac{z}{x^4}\right)'=\dfrac1{x^4}$, $z=-\dfrac x3+C_1x^4=\dfrac{Cx^4-x}{3}$. $y=\dfrac2x+\dfrac{3}{Cx^4-x}$; $C=0$ gives $y=-\dfrac1x$, and $y_1=\dfrac2x$ separately.`) },
    { id: 't04.x9', level: 'hard', type: 'formula',
      q: L(R`$(3xy+y^2)\,dx+(x^2+xy)\,dy=0$ uchun $\mu(x)$ ni toping va umumiy integralni yozing: $U(x,y)=C$.`, R`Найдите $\mu(x)$ для $(3xy+y^2)\,dx+(x^2+xy)\,dy=0$ и запишите общий интеграл: $U(x,y)=C$.`, R`Find $\mu(x)$ for $(3xy+y^2)\,dx+(x^2+xy)\,dy=0$ and write the general integral: $U(x,y)=C$.`),
      check: { kind: 'integral', ref: 'x^3*y + x^2*y^2/2', x: [0.3, 2], y: [0.3, 2] }, answer: 'x^3*y + x^2*y^2/2 = C',
      hint: L(R`$\dfrac{M_y-N_x}{N}=\dfrac{x+y}{x(x+y)}=\dfrac1x$, $\mu=x$.`, R`$\dfrac{M_y-N_x}{N}=\dfrac{x+y}{x(x+y)}=\dfrac1x$, $\mu=x$.`, R`$\dfrac{M_y-N_x}{N}=\dfrac{x+y}{x(x+y)}=\dfrac1x$, $\mu=x$.`),
      solution: L(R`$(3x^2y+xy^2)\,dx+(x^3+x^2y)\,dy=0$; $U=x^3y+\dfrac{x^2y^2}{2}=C$.`, R`$(3x^2y+xy^2)\,dx+(x^3+x^2y)\,dy=0$; $U=x^3y+\dfrac{x^2y^2}{2}=C$.`, R`$(3x^2y+xy^2)\,dx+(x^3+x^2y)\,dy=0$; $U=x^3y+\dfrac{x^2y^2}{2}=C$.`) },
    { id: 't04.x10', level: 'easy', type: 'order',
      q: L('Integrallovchi ko‘paytuvchi usulining algoritmini tartiblang (mustaqil ish 2).', 'Упорядочьте алгоритм метода интегрирующего множителя (самостоятельная работа 2).', 'Order the steps of the integrating-factor algorithm (independent task 2).'),
      items: [
        L(R`Tenglamani $y'+p(x)y=q(x)$ ko‘rinishga keltirish`, R`Привести уравнение к виду $y'+p(x)y=q(x)$`, R`Bring the equation to the form $y'+p(x)y=q(x)$`),
        L(R`$\mu=e^{\int p\,dx}$ ni hisoblash`, R`Вычислить $\mu=e^{\int p\,dx}$`, R`Compute $\mu=e^{\int p\,dx}$`),
        L(R`Chap tomonni $(\mu y)'$ ko‘rinishida yozish`, R`Записать левую часть как $(\mu y)'$`, R`Write the left side as $(\mu y)'$`),
        L(R`$\mu y=\int\mu q\,dx+C$`, R`$\mu y=\int\mu q\,dx+C$`, R`$\mu y=\int\mu q\,dx+C$`),
        L(R`$\mu$ ga bo‘lish va $C$ ni boshlang‘ich shartdan topish`, R`Разделить на $\mu$ и найти $C$ из начального условия`, R`Divide by $\mu$ and find $C$ from the initial condition`)
      ],
      explain: L(R`$+C$ integrallash bosqichida qo‘shiladi, $\mu$ ga bo‘lishdan **oldin**.`, R`$+C$ добавляется при интегрировании, **до** деления на $\mu$.`, R`$+C$ is added when integrating, **before** dividing by $\mu$.`) },
    { id: 't04.x11', level: 'mid', type: 'finderror',
      q: L(R`Talaba $(2xy+3x^2)\,dx+(x^2+2y)\,dy=0$ ni yechdi. Qaysi qatorda xato?`, R`Студент решал $(2xy+3x^2)\,dx+(x^2+2y)\,dy=0$. Где ошибка?`, R`A student solved $(2xy+3x^2)\,dx+(x^2+2y)\,dy=0$. Which line is wrong?`),
      lines: [
        L(R`$M_y=2x=N_x$ — to‘la differensialli.`, R`$M_y=2x=N_x$ — в полных дифференциалах.`, R`$M_y=2x=N_x$: exact.`),
        L(R`$U=\int M\,dx=x^2y+x^3$`, R`$U=\int M\,dx=x^2y+x^3$`, R`$U=\int M\,dx=x^2y+x^3$`),
        L(R`Javob: $x^2y+x^3=C$`, R`Ответ: $x^2y+x^3=C$`, R`Answer: $x^2y+x^3=C$`)
      ],
      wrong: 1,
      explain: L(R`$h(y)$ tushib qolgan. $U_y=x^2+h'=x^2+2y$ dan $h=y^2$; to‘g‘ri javob $x^2y+x^3+y^2=C$.`, R`Потеряна $h(y)$. Из $U_y=x^2+h'=x^2+2y$: $h=y^2$; верный ответ $x^2y+x^3+y^2=C$.`, R`$h(y)$ is missing. From $U_y=x^2+h'=x^2+2y$, $h=y^2$; the correct answer is $x^2y+x^3+y^2=C$.`) },
    { id: 't04.x12', level: 'mid', type: 'match',
      q: L('Tenglamani uning turi bilan moslang.', 'Сопоставьте уравнение и его тип.', 'Match each equation with its type.'),
      pairs: [
        { left: L(R`$y'+x^2y=\sin x$`, R`$y'+x^2y=\sin x$`, R`$y'+x^2y=\sin x$`), right: L('chiziqli', 'линейное', 'linear') },
        { left: L(R`$y'+y=x\sqrt y$`, R`$y'+y=x\sqrt y$`, R`$y'+y=x\sqrt y$`), right: L(R`Bernulli ($n=\frac12$)`, R`Бернулли ($n=\frac12$)`, R`Bernoulli ($n=\frac12$)`) },
        { left: L(R`$y'=y^2+xy+1$`, R`$y'=y^2+xy+1$`, R`$y'=y^2+xy+1$`), right: L('Rikkati', 'Риккати', 'Riccati') },
        { left: L(R`$(y+e^x)\,dx+x\,dy=0$`, R`$(y+e^x)\,dx+x\,dy=0$`, R`$(y+e^x)\,dx+x\,dy=0$`), right: L('to‘la differensialli', 'в полных дифференциалах', 'exact') }
      ],
      explain: L(R`Oxirgisida $M_y=1=N_x$. U bir vaqtda chiziqli ham ($xy'+y=-e^x$) — bitta tenglama bir nechta turga kirishi mumkin.`, R`В последнем $M_y=1=N_x$. Оно одновременно и линейное ($xy'+y=-e^x$) — одно уравнение может относиться к нескольким типам.`, R`In the last one $M_y=1=N_x$. It is also linear ($xy'+y=-e^x$): one equation may belong to several types.`) },
    { id: 't04.x13', level: 'hard', type: 'steps',
      q: L(R`$y\,dx+(2x+y^2)\,dy=0$ uchun integrallovchi ko‘paytuvchini tanlang.`, R`Выберите интегрирующий множитель для $y\,dx+(2x+y^2)\,dy=0$.`, R`Choose an integrating factor for $y\,dx+(2x+y^2)\,dy=0$.`),
      steps: [
        { q: L(R`Tenglama to‘la differensiallimi?`, R`Это уравнение в полных дифференциалах?`, R`Is the equation exact?`), options: [L(R`Ha`, R`Да`, R`Yes`), L(R`Yo‘q: $M_y=1\ne N_x=2$`, R`Нет: $M_y=1\ne N_x=2$`, R`No: $M_y=1\ne N_x=2$`)], correct: 1 },
        { q: L(R`$\dfrac{M_y-N_x}{N}$ faqat $x$ ga bog‘liqmi?`, R`Зависит ли $\dfrac{M_y-N_x}{N}$ только от $x$?`, R`Does $\dfrac{M_y-N_x}{N}$ depend on $x$ only?`), options: [L(R`Yo‘q, $y$ ham bor`, R`Нет, есть и $y$`, R`No, it contains $y$`), L('Ha', 'Да', 'Yes')], correct: 0 },
        { q: L(R`$\dfrac{N_x-M_y}{M}$ = ?`, R`$\dfrac{N_x-M_y}{M}$ = ?`, R`$\dfrac{N_x-M_y}{M}$ = ?`), options: [L(R`$\dfrac1y$`, R`$\dfrac1y$`, R`$\dfrac1y$`), L(R`$y$`, R`$y$`, R`$y$`), L(R`$\dfrac1x$`, R`$\dfrac1x$`, R`$\dfrac1x$`)], correct: 0 },
        { q: L(R`$\mu$ = ?`, R`$\mu$ = ?`, R`$\mu$ = ?`), options: [L(R`$\mu=y$`, R`$\mu=y$`, R`$\mu=y$`), L(R`$\mu=e^y$`, R`$\mu=e^y$`, R`$\mu=e^y$`), L(R`$\mu=\ln y$`, R`$\mu=\ln y$`, R`$\mu=\ln y$`)], correct: 0 }
      ],
      explain: L(R`$\mu=e^{\int dy/y}=y$; natija $xy^2+\dfrac{y^4}{4}=C$.`, R`$\mu=e^{\int dy/y}=y$; результат $xy^2+\dfrac{y^4}{4}=C$.`, R`$\mu=e^{\int dy/y}=y$; the result is $xy^2+\dfrac{y^4}{4}=C$.`) }
  ],
  quiz: [
    { id: 't04.q1', q: L(R`$xy'+2y=x^3$ ($x>0$) da $p(x)$:`, R`$p(x)$ в $xy'+2y=x^3$ ($x>0$):`, R`$p(x)$ in $xy'+2y=x^3$ ($x>0$):`),
      options: [L(R`$2$`, R`$2$`, R`$2$`), L(R`$\dfrac2x$`, R`$\dfrac2x$`, R`$\dfrac2x$`), L(R`$2x$`, R`$2x$`, R`$2x$`), L(R`$x^2$`, R`$x^2$`, R`$x^2$`)], correct: 1,
      explain: L(R`$x$ ga bo‘lamiz: $y'+\frac2xy=x^2$.`, R`Делим на $x$: $y'+\frac2xy=x^2$.`, R`Divide by $x$: $y'+\frac2xy=x^2$.`),
      why: [L('Avval normal ko‘rinishga keltirish kerak.', 'Сначала нужно привести к нормальному виду.', 'Put it in normal form first.'), null, L(R`$x$ ga bo‘lish kerak, ko‘paytirish emas.`, R`На $x$ надо делить, а не умножать.`, R`Divide by $x$, do not multiply.`), L(R`$x^2$ — bu $q(x)$.`, R`$x^2$ — это $q(x)$.`, R`$x^2$ is $q(x)$.`)] },
    { id: 't04.q2', q: L(R`$y'+p(x)y=q(x)$ da $p,q$ $(0,5)$ da uzluksiz, $x_0=1$. Yechim qayerda mavjud?`, R`В $y'+p(x)y=q(x)$ функции $p,q$ непрерывны на $(0,5)$, $x_0=1$. Где существует решение?`, R`In $y'+p(x)y=q(x)$, $p,q$ are continuous on $(0,5)$ and $x_0=1$. Where does the solution exist?`),
      options: [L(R`faqat $x_0$ ning kichik atrofida`, R`только в малой окрестности $x_0$`, R`only near $x_0$`), L(R`butun $(0,5)$ da`, R`на всём $(0,5)$`, R`on all of $(0,5)$`), L(R`$\mathbb R$ da`, R`на $\mathbb R$`, R`on $\mathbb R$`), L(R`$(1,5)$ da`, R`на $(1,5)$`, R`on $(1,5)$`)], correct: 1,
      explain: L('Chiziqli tenglama yechimi koeffitsiyentlar uzluksiz bo‘lgan butun oraliqda mavjud.', 'Решение линейного уравнения существует на всём интервале непрерывности коэффициентов.', 'A linear equation’s solution exists on the whole interval where the coefficients are continuous.'),
      why: [L('Bu chiziqli bo‘lmagan tenglamalar uchun umumiy kafolat.', 'Это общая гарантия для нелинейных уравнений.', 'That is the general guarantee for nonlinear equations.'), null, L(R`$(0,5)$ dan tashqarida $p,q$ haqida hech narsa ma’lum emas.`, R`Вне $(0,5)$ о $p,q$ ничего не известно.`, R`Nothing is known about $p,q$ outside $(0,5)$.`), L('Yechim chap tomonga ham davom etadi.', 'Решение продолжается и влево.', 'The solution extends to the left too.')] },
    { id: 't04.q3', q: L(R`$y'-2y=y^3$ uchun almashtirish:`, R`Замена для $y'-2y=y^3$:`, R`The substitution for $y'-2y=y^3$:`),
      options: [L(R`$z=y^3$`, R`$z=y^3$`, R`$z=y^3$`), L(R`$z=y^{-2}$`, R`$z=y^{-2}$`, R`$z=y^{-2}$`), L(R`$z=y^2$`, R`$z=y^2$`, R`$z=y^2$`), L(R`$y=ux$`, R`$y=ux$`, R`$y=ux$`)], correct: 1,
      explain: L(R`$n=3$, $z=y^{1-n}=y^{-2}$.`, R`$n=3$, $z=y^{1-n}=y^{-2}$.`, R`$n=3$, $z=y^{1-n}=y^{-2}$.`),
      why: [L(R`$z=y^n$ emas, $y^{1-n}$.`, R`Не $z=y^n$, а $y^{1-n}$.`, R`Not $y^n$ but $y^{1-n}$.`), null, L(R`Ishora xato: $1-n=-2$.`, R`Ошибка в знаке: $1-n=-2$.`, R`Sign error: $1-n=-2$.`), L('Tenglama bir jinsli emas.', 'Уравнение не однородное.', 'The equation is not homogeneous.')] },
    { id: 't04.q4', q: L(R`Bernulli tenglamasida $n=2$ bo‘lsa, $y\equiv0$:`, R`В уравнении Бернулли с $n=2$ решение $y\equiv0$:`, R`In a Bernoulli equation with $n=2$, $y\equiv0$ is:`),
      options: [L('yechim emas', 'не решение', 'not a solution'), L('yechim, $y^2$ ga bo‘lganda yo‘qoladi', 'решение, теряется при делении на $y^2$', 'a solution, lost when dividing by $y^2$'), L('umumiy yechimdan $C=0$ da chiqadi', 'получается из общего при $C=0$', 'given by the general solution with $C=0$'), L('faqat $x=0$ da', 'только при $x=0$', 'only at $x=0$')], correct: 1,
      explain: L(R`$0+p\cdot0=q\cdot0$ ✓. $z=1/y$ formulasi uni bermaydi.`, R`$0+p\cdot0=q\cdot0$ ✓. Формула через $z=1/y$ его не даёт.`, R`$0+p\cdot0=q\cdot0$ ✓. The formula through $z=1/y$ does not produce it.`),
      why: [L(R`Qo‘yib ko‘ring: $0=0$.`, R`Подставьте: $0=0$.`, R`Substitute: $0=0$.`), null, L(R`$y=1/z$ hech qachon nolga teng emas.`, R`$y=1/z$ никогда не равно нулю.`, R`$y=1/z$ is never zero.`), L(R`$y\equiv0$ — funksiya, butun oraliqda.`, R`$y\equiv0$ — функция на всём интервале.`, R`$y\equiv0$ is a function on the whole interval.`)] },
    { id: 't04.q5', q: L(R`Rikkati tenglamasida $y_1$ ma’lum. Qaysi almashtirish chiziqli tenglama beradi?`, R`В уравнении Риккати известно $y_1$. Какая замена даёт линейное уравнение?`, R`In a Riccati equation $y_1$ is known. Which substitution gives a linear equation?`),
      options: [L(R`$y=y_1+\dfrac1z$`, R`$y=y_1+\dfrac1z$`, R`$y=y_1+\dfrac1z$`), L(R`$y=y_1z$`, R`$y=y_1z$`, R`$y=y_1z$`), L(R`$y=z^2$`, R`$y=z^2$`, R`$y=z^2$`), L(R`$z=y-x$`, R`$z=y-x$`, R`$z=y-x$`)], correct: 0,
      explain: L(R`$y=y_1+u$ Bernulli ($n=2$) tenglamasini beradi, $u=1/z$ esa uni chiziqliga keltiradi.`, R`$y=y_1+u$ даёт уравнение Бернулли ($n=2$), а $u=1/z$ сводит его к линейному.`, R`$y=y_1+u$ gives a Bernoulli equation ($n=2$), and $u=1/z$ makes it linear.`),
      why: [null, L(R`$y^2$ hadi saqlanadi.`, R`Член $y^2$ сохраняется.`, R`The $y^2$ term remains.`), L('Daraja oshadi.', 'Степень растёт.', 'The degree grows.'), L('Bu umuman olganda yordam bermaydi.', 'В общем случае это не помогает.', 'In general this does not help.')] },
    { id: 't04.q6', q: L(R`$M\,dx+N\,dy=0$ to‘la differensialli bo‘lish sharti (bir bog‘lamli sohada):`, R`Условие полного дифференциала для $M\,dx+N\,dy=0$ (в односвязной области):`, R`The exactness condition for $M\,dx+N\,dy=0$ (simply connected region):`),
      options: [L(R`$M_x=N_y$`, R`$M_x=N_y$`, R`$M_x=N_y$`), L(R`$M_y=N_x$`, R`$M_y=N_x$`, R`$M_y=N_x$`), L(R`$M=N$`, R`$M=N$`, R`$M=N$`), L(R`$M_y=-N_x$`, R`$M_y=-N_x$`, R`$M_y=-N_x$`)], correct: 1,
      explain: L(R`$U_{xy}=U_{yx}$: $M_y=N_x$.`, R`$U_{xy}=U_{yx}$: $M_y=N_x$.`, R`$U_{xy}=U_{yx}$: $M_y=N_x$.`),
      why: [L('Hosilalar o‘zgaruvchilari almashtirilgan.', 'Перепутаны переменные дифференцирования.', 'The differentiation variables are swapped.'), null, L('Bu shart emas.', 'Это не условие.', 'That is not the condition.'), L('Ishora xato.', 'Ошибка в знаке.', 'Wrong sign.')] },
    { id: 't04.q7', q: L(R`$\dfrac{M_y-N_x}{N}=\dfrac3x$ bo‘lsa, $\mu$:`, R`Если $\dfrac{M_y-N_x}{N}=\dfrac3x$, то $\mu$:`, R`If $\dfrac{M_y-N_x}{N}=\dfrac3x$, then $\mu$ is:`),
      options: [L(R`$x^3$`, R`$x^3$`, R`$x^3$`), L(R`$3x$`, R`$3x$`, R`$3x$`), L(R`$e^{3x}$`, R`$e^{3x}$`, R`$e^{3x}$`), L(R`$x^{-3}$`, R`$x^{-3}$`, R`$x^{-3}$`)], correct: 0,
      explain: L(R`$\mu=e^{\int3/x\,dx}=e^{3\ln x}=x^3$.`, R`$\mu=e^{\int3/x\,dx}=e^{3\ln x}=x^3$.`, R`$\mu=e^{\int3/x\,dx}=e^{3\ln x}=x^3$.`),
      why: [null, L('Eksponenta olinmagan.', 'Не взята экспонента.', 'The exponential was not taken.'), L(R`$\int\frac3x dx=3\ln x$, $3x$ emas.`, R`$\int\frac3x dx=3\ln x$, а не $3x$.`, R`$\int\frac3x dx=3\ln x$, not $3x$.`), L(R`Ishora xato: formulada $M_y-N_x$.`, R`Ошибка в знаке: формула с $M_y-N_x$.`, R`Sign error: the formula uses $M_y-N_x$.`)] },
    { id: 't04.q8', q: L(R`$\dfrac{-y\,dx+x\,dy}{x^2+y^2}=0$ haqida to‘g‘ri gap:`, R`Верное утверждение о $\dfrac{-y\,dx+x\,dy}{x^2+y^2}=0$:`, R`A true statement about $\dfrac{-y\,dx+x\,dy}{x^2+y^2}=0$:`),
      options: [L(R`$M_y\ne N_x$`, R`$M_y\ne N_x$`, R`$M_y\ne N_x$`), L(R`$M_y=N_x$, lekin $(0,0)$ siz tekislikda yagona $U$ yo‘q`, R`$M_y=N_x$, но в плоскости без $(0,0)$ единой $U$ нет`, R`$M_y=N_x$, but there is no single $U$ on the plane without $(0,0)$`), L(R`$U=x^2+y^2$`, R`$U=x^2+y^2$`, R`$U=x^2+y^2$`), L('Yechimi yo‘q', 'Решений нет', 'It has no solutions')], correct: 1,
      explain: L(R`Soha bir bog‘lamli emas: $U=\arctan\frac yx$ faqat lokal; integral chiziqlar — $y=Cx$ nurlar.`, R`Область не односвязна: $U=\arctan\frac yx$ лишь локально; интегральные кривые — лучи $y=Cx$.`, R`The region is not simply connected: $U=\arctan\frac yx$ only locally; the integral curves are the rays $y=Cx$.`),
      why: [L(R`Hisoblang: ikkalasi ham $\dfrac{y^2-x^2}{(x^2+y^2)^2}$.`, R`Посчитайте: оба равны $\dfrac{y^2-x^2}{(x^2+y^2)^2}$.`, R`Compute: both equal $\dfrac{y^2-x^2}{(x^2+y^2)^2}$.`), null, L(R`$d(x^2+y^2)=2x\,dx+2y\,dy$ — boshqa.`, R`$d(x^2+y^2)=2x\,dx+2y\,dy$ — другое.`, R`$d(x^2+y^2)=2x\,dx+2y\,dy$ is different.`), L(R`$y=Cx$ — yechimlar.`, R`$y=Cx$ — решения.`, R`$y=Cx$ are solutions.`)] },
    { id: 't04.q9', q: L(R`$y'+y=e^{-x}$ ning umumiy yechimi:`, R`Общее решение $y'+y=e^{-x}$:`, R`The general solution of $y'+y=e^{-x}$:`),
      options: [L(R`$y=Ce^{-x}$`, R`$y=Ce^{-x}$`, R`$y=Ce^{-x}$`), L(R`$y=(x+C)e^{-x}$`, R`$y=(x+C)e^{-x}$`, R`$y=(x+C)e^{-x}$`), L(R`$y=xe^{-x}+C$`, R`$y=xe^{-x}+C$`, R`$y=xe^{-x}+C$`), L(R`$y=\frac12e^{-x}+Ce^{-x}$`, R`$y=\frac12e^{-x}+Ce^{-x}$`, R`$y=\frac12e^{-x}+Ce^{-x}$`)], correct: 1,
      explain: L(R`$(e^xy)'=1$, $e^xy=x+C$.`, R`$(e^xy)'=1$, $e^xy=x+C$.`, R`$(e^xy)'=1$, $e^xy=x+C$.`),
      why: [L('Bu faqat bir jinsli tenglama yechimi.', 'Это только решение однородного уравнения.', 'That only solves the homogeneous equation.'), null, L(R`$C$ ni $e^{-x}$ ga ko‘paytirish kerak edi.`, R`$C$ нужно было умножить на $e^{-x}$.`, R`$C$ should have been multiplied by $e^{-x}$.`), L(R`$\int e^{x}e^{-x}dx=x$, $\frac12e^{-x}$ chiqmaydi.`, R`$\int e^{x}e^{-x}dx=x$, а не $\frac12e^{-x}$.`, R`$\int e^{x}e^{-x}dx=x$, not $\frac12e^{-x}$.`)] },
    { id: 't04.q10', q: L(R`$y'=2\sqrt y$ uchun $y\equiv0$:`, R`Для $y'=2\sqrt y$ решение $y\equiv0$:`, R`For $y'=2\sqrt y$, the solution $y\equiv0$ is:`),
      options: [L('maxsus yechim: har bir nuqtasida yagonalik buziladi', 'особое: в каждой точке нарушается единственность', 'singular: uniqueness fails at each of its points'), L('yechim emas', 'не решение', 'not a solution'), L(R`umumiy yechimdan $C=0$ da olinadi`, R`получается из общего при $C=0$`, R`obtained from the general solution with $C=0$`), L('yagona yechim', 'единственное решение', 'the only solution')], correct: 0,
      explain: L(R`$y=(x-c)^2$ ($x\ge c$) $y\equiv0$ ga $(c,0)$ da urinadi; $0<n<1$ hol.`, R`$y=(x-c)^2$ ($x\ge c$) касается $y\equiv0$ в $(c,0)$; случай $0<n<1$.`, R`$y=(x-c)^2$ ($x\ge c$) touches $y\equiv0$ at $(c,0)$; the case $0<n<1$.`),
      why: [null, L(R`$0=2\sqrt0$ ✓.`, R`$0=2\sqrt0$ ✓.`, R`$0=2\sqrt0$ ✓.`), L(R`$(x-c)^2$ hech qanday $c$ da aynan nol emas.`, R`$(x-c)^2$ ни при каком $c$ не равно тождественно нулю.`, R`$(x-c)^2$ is not identically zero for any $c$.`), L(R`$(0,0)$ dan $y=x^2$ ham o‘tadi.`, R`Через $(0,0)$ проходит и $y=x^2$.`, R`$y=x^2$ also passes through $(0,0)$.`)] }
  ]
});
})();
