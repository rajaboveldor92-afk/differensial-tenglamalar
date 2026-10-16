(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't06', num: 6,
  title: L('Yuqori tartibli tenglamalar va tartibni pasaytirish', 'Уравнения высших порядков и понижение порядка', 'Higher-order equations and reduction of order'),
  syllabus: { lecture: 'M6', seminar: 'S6', outcomes: ['TN2', 'TN3'], independent: [6] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L(R`$n$-tartibli tenglama uchun Koshi masalasini qo‘ya olasiz va mavjudlik–yagonalik teoremasining shartlarini tekshira olasiz.`, R`Ставить задачу Коши для уравнения $n$-го порядка и проверять условия теоремы существования и единственности.`, R`Pose the Cauchy problem for an $n$-th order equation and check the hypotheses of the existence and uniqueness theorem.`),
    L(R`$y^{(n)}=f(x)$ tenglamani ketma-ket integrallash bilan yecha olasiz.`, R`Решать уравнение $y^{(n)}=f(x)$ последовательным интегрированием.`, R`Solve $y^{(n)}=f(x)$ by repeated integration.`),
    L(R`$y$ qatnashmagan va $x$ qatnashmagan tenglamalarda tartibni pasaytira olasiz.`, R`Понижать порядок в уравнениях, не содержащих $y$, и в уравнениях, не содержащих $x$.`, R`Reduce the order of equations without $y$ and of equations without $x$.`),
    L(R`$y,y',\dots,y^{(n)}$ ga nisbatan bir jinsli va umumlashgan bir jinsli tenglamalarni taniy olasiz va yecha olasiz.`, R`Распознавать и решать уравнения, однородные относительно $y,y',\dots,y^{(n)}$, и обобщённо однородные уравнения.`, R`Recognise and solve equations homogeneous in $y,y',\dots,y^{(n)}$ and generalised homogeneous equations.`),
    L('Tartib pasaytirilganda yo‘qolishi mumkin bo‘lgan yechimlarni topa olasiz.', 'Находить решения, которые могут потеряться при понижении порядка.', 'Find solutions that can be lost when the order is reduced.')
  ],
  prereqKnowledge: [
    L('Birinchi tartibli tenglamalar: ajraladigan, chiziqli, Bernulli (2–4-mavzular).', 'Уравнения первого порядка: с разделяющимися переменными, линейные, Бернулли (темы 2–4).', 'First-order equations: separable, linear, Bernoulli (topics 2–4).'),
    L('Murakkab funksiyaning hosilasi (zanjir qoidasi).', 'Производная сложной функции (цепное правило).', 'The chain rule.'),
    L('Koshi masalasi va Pikar teoremasi (1-mavzu).', 'Задача Коши и теорема Пикара (тема 1).', 'The Cauchy problem and Picard’s theorem (topic 1).')
  ],
  sources: [
    { id: 'dilmurodov', ref: '§5.1–§5.3', verified: true },
    { id: 'ergashev', ref: '2.1', verified: true },
    { id: 'logan', ref: '2.4.3, 2.5', verified: true },
    { id: 'goode', ref: '8.9', verified: true },
    { id: 'filippov', ref: '§10', verified: false },
    { id: 'boyce', ref: 'Ch. 4', verified: false }
  ],
  labs: ['L01'],
  lessons: [
    {
      id: 't06.1',
      title: L(R`$n$-tartibli tenglama va Koshi masalasi`, R`Уравнение $n$-го порядка и задача Коши`, R`The $n$-th order equation and the Cauchy problem`),
      blocks: [
        { type: 'intro', title: L('Telefon tushib ketdi', 'Телефон упал', 'A dropped phone'),
          body: L(R`Telefon $20$ m balandlikdan boshlang‘ich tezliksiz tushib ketdi. Havo qarshiligini hisobga olmasak, balandlik $h(t)$ uchun Nyuton qonuni:
$$h''(t)=-g,\qquad g\approx9{,}8\ \text{m/s}^2.$$
Bu **ikkinchi** tartibli tenglama. Ikki marta integrallaymiz: $h'=-gt+C_1$, $h=-\dfrac{gt^2}{2}+C_1t+C_2$. Ikkita o‘zgarmasni aniqlash uchun **ikkita** shart kerak: $h(0)=20$, $h'(0)=0$. Natija $h=20-4{,}9t^2$; telefon $t=\sqrt{40/9{,}8}\approx2{,}02$ s da yerga tushadi.`,
          R`Телефон упал с высоты $20$ м без начальной скорости. Без учёта сопротивления воздуха закон Ньютона для высоты $h(t)$:
$$h''(t)=-g,\qquad g\approx9{,}8\ \text{м/с}^2.$$
Это уравнение **второго** порядка. Интегрируем дважды: $h'=-gt+C_1$, $h=-\dfrac{gt^2}{2}+C_1t+C_2$. Чтобы найти две постоянные, нужны **два** условия: $h(0)=20$, $h'(0)=0$. Итог: $h=20-4{,}9t^2$; телефон упадёт на землю при $t=\sqrt{40/9{,}8}\approx2{,}02$ с.`,
          R`A phone falls from a height of $20$ m with zero initial speed. Ignoring air resistance, Newton’s law for the height $h(t)$ is
$$h''(t)=-g,\qquad g\approx9.8\ \text{m/s}^2.$$
This is a **second**-order equation. Integrate twice: $h'=-gt+C_1$, $h=-\dfrac{gt^2}{2}+C_1t+C_2$. Two constants need **two** conditions: $h(0)=20$, $h'(0)=0$. The result is $h=20-4.9t^2$; the phone hits the ground at $t=\sqrt{40/9.8}\approx2.02$ s.`) },
        { type: 'def', title: L(R`$n$-tartibli tenglama va uning umumiy yechimi`, R`Уравнение $n$-го порядка и его общее решение`, R`The $n$-th order equation and its general solution`),
          body: L(R`Yuqori hosilaga nisbatan yechilgan $n$-tartibli tenglama:
$$y^{(n)}=f\big(x,y,y',\dots,y^{(n-1)}\big).$$
Uning **umumiy yechimi** $n$ ta mustaqil ixtiyoriy o‘zgarmasga bog‘liq: $y=\varphi(x,C_1,\dots,C_n)$. **Koshi masalasi**da bitta $x_0$ nuqtada $n$ ta shart beriladi:
$$y(x_0)=y_0,\quad y'(x_0)=y_0',\quad\dots,\quad y^{(n-1)}(x_0)=y_0^{(n-1)}.$$`,
          R`Уравнение $n$-го порядка, разрешённое относительно старшей производной:
$$y^{(n)}=f\big(x,y,y',\dots,y^{(n-1)}\big).$$
Его **общее решение** зависит от $n$ независимых произвольных постоянных: $y=\varphi(x,C_1,\dots,C_n)$. В **задаче Коши** в одной точке $x_0$ задаются $n$ условий:
$$y(x_0)=y_0,\quad y'(x_0)=y_0',\quad\dots,\quad y^{(n-1)}(x_0)=y_0^{(n-1)}.$$`,
          R`An $n$-th order equation solved for the highest derivative is
$$y^{(n)}=f\big(x,y,y',\dots,y^{(n-1)}\big).$$
Its **general solution** depends on $n$ independent arbitrary constants: $y=\varphi(x,C_1,\dots,C_n)$. In the **Cauchy problem**, $n$ conditions are given at one point $x_0$:
$$y(x_0)=y_0,\quad y'(x_0)=y_0',\quad\dots,\quad y^{(n-1)}(x_0)=y_0^{(n-1)}.$$`) },
        { type: 'thm', title: L(R`$n$-tartibli tenglama uchun mavjudlik va yagonalik`, R`Существование и единственность для уравнения $n$-го порядка`, R`Existence and uniqueness for an $n$-th order equation`),
          conds: L(R`1. $f(x,y,y_1,\dots,y_{n-1})$ funksiya $(x_0,y_0,y_0',\dots,y_0^{(n-1)})$ nuqtani o‘z ichiga olgan yopiq sohada (masalan, $|x-x_0|\le a$, $|y_k-y_0^{(k)}|\le b$) uzluksiz;
2. bu sohada $\partial f/\partial y,\ \partial f/\partial y_1,\ \dots,\ \partial f/\partial y_{n-1}$ xususiy hosilalar uzluksiz (yoki $f$ shu o‘zgaruvchilar bo‘yicha Lipshits shartini qanoatlantiradi).`,
          R`1. Функция $f(x,y,y_1,\dots,y_{n-1})$ непрерывна в замкнутой области, содержащей точку $(x_0,y_0,y_0',\dots,y_0^{(n-1)})$ (например, $|x-x_0|\le a$, $|y_k-y_0^{(k)}|\le b$);
2. в этой области непрерывны частные производные $\partial f/\partial y,\ \partial f/\partial y_1,\ \dots,\ \partial f/\partial y_{n-1}$ (или $f$ удовлетворяет условию Липшица по этим переменным).`,
          R`1. $f(x,y,y_1,\dots,y_{n-1})$ is continuous on a closed region containing $(x_0,y_0,y_0',\dots,y_0^{(n-1)})$ (for instance $|x-x_0|\le a$, $|y_k-y_0^{(k)}|\le b$);
2. the partial derivatives $\partial f/\partial y,\ \partial f/\partial y_1,\ \dots,\ \partial f/\partial y_{n-1}$ are continuous on this region (or $f$ is Lipschitz in these variables).`),
          body: L(R`U holda biror $|x-x_0|\le h$ oraliqda Koshi masalasining **yagona** yechimi mavjud. Teorema lokal: $h$ kichik bo‘lishi mumkin.`, R`Тогда на некотором отрезке $|x-x_0|\le h$ задача Коши имеет **единственное** решение. Теорема локальная: $h$ может быть малым.`, R`Then on some interval $|x-x_0|\le h$ the Cauchy problem has a **unique** solution. The theorem is local: $h$ may be small.`) },
        { type: 'proof', body: L(R`$y_1=y,\ y_2=y',\ \dots,\ y_n=y^{(n-1)}$ belgilash bilan tenglama birinchi tartibli $n$ ta tenglamadan iborat normal sistemaga aylanadi: $y_1'=y_2,\ \dots,\ y_n'=f(x,y_1,\dots,y_n)$. Sistema uchun Pikar teoremasi xuddi 1-mavzudagidek ketma-ket yaqinlashishlar bilan isbotlanadi (Dilmuradov, §5.2).`, R`Обозначив $y_1=y,\ y_2=y',\ \dots,\ y_n=y^{(n-1)}$, получаем нормальную систему из $n$ уравнений первого порядка: $y_1'=y_2,\ \dots,\ y_n'=f(x,y_1,\dots,y_n)$. Для системы теорема Пикара доказывается последовательными приближениями так же, как в теме 1 (Дилмурадов, §5.2).`, R`With $y_1=y,\ y_2=y',\ \dots,\ y_n=y^{(n-1)}$ the equation becomes a normal system of $n$ first-order equations: $y_1'=y_2,\ \dots,\ y_n'=f(x,y_1,\dots,y_n)$. Picard’s theorem for systems is proved by successive approximations exactly as in topic 1 (Dilmuradov, §5.2).`) },
        { type: 'example', title: L(R`$y^{(n)}=f(x)$: ketma-ket integrallash`, R`$y^{(n)}=f(x)$: последовательное интегрирование`, R`$y^{(n)}=f(x)$: repeated integration`),
          body: L(R`$y'''=24x$, $y(0)=1$, $y'(0)=0$, $y''(0)=2$ Koshi masalasini yeching.`, R`Решите задачу Коши $y'''=24x$, $y(0)=1$, $y'(0)=0$, $y''(0)=2$.`, R`Solve the Cauchy problem $y'''=24x$, $y(0)=1$, $y'(0)=0$, $y''(0)=2$.`),
          steps: [
            L(R`Birinchi integrallash: $y''=12x^2+C_1$. $y''(0)=2\Rightarrow C_1=2$.`, R`Первое интегрирование: $y''=12x^2+C_1$. $y''(0)=2\Rightarrow C_1=2$.`, R`First integration: $y''=12x^2+C_1$. $y''(0)=2\Rightarrow C_1=2$.`),
            L(R`Ikkinchi: $y'=4x^3+2x+C_2$. $y'(0)=0\Rightarrow C_2=0$.`, R`Второе: $y'=4x^3+2x+C_2$. $y'(0)=0\Rightarrow C_2=0$.`, R`Second: $y'=4x^3+2x+C_2$. $y'(0)=0\Rightarrow C_2=0$.`),
            L(R`Uchinchi: $y=x^4+x^2+C_3$. $y(0)=1\Rightarrow C_3=1$. Javob: $y=x^4+x^2+1$, $x\in\mathbb R$.`, R`Третье: $y=x^4+x^2+C_3$. $y(0)=1\Rightarrow C_3=1$. Ответ: $y=x^4+x^2+1$, $x\in\mathbb R$.`, R`Third: $y=x^4+x^2+C_3$. $y(0)=1\Rightarrow C_3=1$. Answer: $y=x^4+x^2+1$, $x\in\mathbb R$.`),
            L(R`O‘zgarmaslarni har bir integrallashdan keyin darhol topish qulay. Umumiy holda Koshi formulasi: $y=\dfrac{1}{(n-1)!}\displaystyle\int_{x_0}^{x}(x-t)^{n-1}f(t)\,dt+P_{n-1}(x)$, bunda $P_{n-1}$ — darajasi $n-1$ dan oshmaydigan ko‘phad. Bu yerda $\frac12\int_0^x(x-t)^2\,24t\,dt=x^4$.`, R`Постоянные удобно находить сразу после каждого интегрирования. В общем случае формула Коши: $y=\dfrac{1}{(n-1)!}\displaystyle\int_{x_0}^{x}(x-t)^{n-1}f(t)\,dt+P_{n-1}(x)$, где $P_{n-1}$ — многочлен степени не выше $n-1$. Здесь $\frac12\int_0^x(x-t)^2\,24t\,dt=x^4$.`, R`It is convenient to find each constant right after each integration. In general, Cauchy’s formula gives $y=\dfrac{1}{(n-1)!}\displaystyle\int_{x_0}^{x}(x-t)^{n-1}f(t)\,dt+P_{n-1}(x)$, where $P_{n-1}$ is a polynomial of degree at most $n-1$. Here $\frac12\int_0^x(x-t)^2\,24t\,dt=x^4$.`)
          ],
          check: L(R`$y=x^4+x^2+1$: $y'''=24x$ ✓, $y(0)=1$, $y'(0)=0$, $y''(0)=2$ ✓.`, R`$y=x^4+x^2+1$: $y'''=24x$ ✓, $y(0)=1$, $y'(0)=0$, $y''(0)=2$ ✓.`, R`$y=x^4+x^2+1$: $y'''=24x$ ✓, $y(0)=1$, $y'(0)=0$, $y''(0)=2$ ✓.`) },
        { type: 'warn', body: L(R`Koshi masalasida barcha $n$ shart **bitta nuqtada** beriladi. Shartlar turli nuqtalarda berilsa, bu **chegaraviy masala** — unda yechim yagona bo‘lmasligi yoki umuman bo‘lmasligi mumkin. Masalan, $y''+y=0$: $y(0)=0,\ y(\pi)=0$ shartlarni har qanday $y=C\sin x$ qanoatlantiradi, $y(0)=0,\ y(\pi)=1$ shartlarni esa hech qanday yechim qanoatlantirmaydi.`,
          R`В задаче Коши все $n$ условий задаются **в одной точке**. Если условия заданы в разных точках, это **краевая задача** — у неё решение может быть не единственным или вовсе отсутствовать. Например, для $y''+y=0$ условиям $y(0)=0,\ y(\pi)=0$ удовлетворяет любое $y=C\sin x$, а условиям $y(0)=0,\ y(\pi)=1$ — ни одно решение.`,
          R`In a Cauchy problem all $n$ conditions are given **at one point**. Conditions at different points form a **boundary value problem**, which may have many solutions or none. For example, for $y''+y=0$ every $y=C\sin x$ satisfies $y(0)=0,\ y(\pi)=0$, while no solution satisfies $y(0)=0,\ y(\pi)=1$.`) }
      ]
    },
    {
      id: 't06.2',
      title: L(R`$y$ yoki $x$ qatnashmagan tenglamalar`, R`Уравнения без $y$ или без $x$`, R`Equations without $y$ or without $x$`),
      blocks: [
        { type: 'def', title: L(R`$y$ qatnashmagan tenglama: $F(x,y^{(k)},\dots,y^{(n)})=0$`, R`Уравнение без $y$: $F(x,y^{(k)},\dots,y^{(n)})=0$`, R`Equation without $y$: $F(x,y^{(k)},\dots,y^{(n)})=0$`),
          body: L(R`Agar tenglamada $y,y',\dots,y^{(k-1)}$ qatnashmasa, yangi noma’lum $z=y^{(k)}$ kiritamiz. U holda $F(x,z,z',\dots,z^{(n-k)})=0$ — tartibi $n-k$ bo‘lgan tenglama. Uni yechib $z=z(x,C_1,\dots,C_{n-k})$ ni topamiz, keyin $y^{(k)}=z$ ni $k$ marta integrallaymiz (yana $k$ ta o‘zgarmas qo‘shiladi).`,
          R`Если в уравнение не входят $y,y',\dots,y^{(k-1)}$, вводим новую неизвестную $z=y^{(k)}$. Тогда $F(x,z,z',\dots,z^{(n-k)})=0$ — уравнение порядка $n-k$. Решив его, находим $z=z(x,C_1,\dots,C_{n-k})$, затем $k$ раз интегрируем $y^{(k)}=z$ (добавляются ещё $k$ постоянных).`,
          R`If $y,y',\dots,y^{(k-1)}$ do not appear, introduce the new unknown $z=y^{(k)}$. Then $F(x,z,z',\dots,z^{(n-k)})=0$ is an equation of order $n-k$. Solve it for $z=z(x,C_1,\dots,C_{n-k})$, then integrate $y^{(k)}=z$ $k$ times (adding $k$ more constants).`) },
        { type: 'example', title: L(R`$y$ qatnashmagan tenglama`, R`Уравнение без $y$`, R`An equation without $y$`),
          body: L(R`$x\,y''-y'=3x^2$ tenglamani yeching ($x>0$).`, R`Решите уравнение $x\,y''-y'=3x^2$ ($x>0$).`, R`Solve $x\,y''-y'=3x^2$ ($x>0$).`),
          steps: [
            L(R`$y$ yo‘q, shuning uchun $z=y'$: $x\,z'-z=3x^2$ — $z$ ga nisbatan chiziqli birinchi tartibli tenglama.`, R`$y$ отсутствует, поэтому $z=y'$: $x\,z'-z=3x^2$ — линейное уравнение первого порядка относительно $z$.`, R`No $y$, so put $z=y'$: $x\,z'-z=3x^2$, a first-order linear equation in $z$.`),
            L(R`$x^2$ ga bo‘lamiz: $\dfrac{xz'-z}{x^2}=\left(\dfrac zx\right)'=3$. Demak $\dfrac zx=3x+C_1$, $z=3x^2+C_1x$.`, R`Делим на $x^2$: $\dfrac{xz'-z}{x^2}=\left(\dfrac zx\right)'=3$. Значит $\dfrac zx=3x+C_1$, $z=3x^2+C_1x$.`, R`Divide by $x^2$: $\dfrac{xz'-z}{x^2}=\left(\dfrac zx\right)'=3$. So $\dfrac zx=3x+C_1$ and $z=3x^2+C_1x$.`),
            L(R`$y'=3x^2+C_1x\Rightarrow y=x^3+\dfrac{C_1}{2}x^2+C_2$. Ikkinchi tartib — ikki o‘zgarmas.`, R`$y'=3x^2+C_1x\Rightarrow y=x^3+\dfrac{C_1}{2}x^2+C_2$. Второй порядок — две постоянные.`, R`$y'=3x^2+C_1x\Rightarrow y=x^3+\dfrac{C_1}{2}x^2+C_2$. Second order, two constants.`)
          ],
          check: L(R`$y'=3x^2+C_1x$, $y''=6x+C_1$: $x(6x+C_1)-(3x^2+C_1x)=3x^2$ ✓.`, R`$y'=3x^2+C_1x$, $y''=6x+C_1$: $x(6x+C_1)-(3x^2+C_1x)=3x^2$ ✓.`, R`$y'=3x^2+C_1x$, $y''=6x+C_1$: $x(6x+C_1)-(3x^2+C_1x)=3x^2$ ✓.`) },
        { type: 'def', title: L(R`$x$ qatnashmagan tenglama: $F(y,y',y'')=0$`, R`Уравнение без $x$: $F(y,y',y'')=0$`, R`Equation without $x$: $F(y,y',y'')=0$`),
          body: L(R`Agar $x$ oshkor qatnashmasa (avtonom tenglama), $y$ ni yangi erkli o‘zgaruvchi, $p=y'$ ni esa $y$ ning funksiyasi deb olamiz: $y'=p(y)$. Zanjir qoidasi bo‘yicha
$$y''=\frac{dp}{dx}=\frac{dp}{dy}\cdot\frac{dy}{dx}=p\,\frac{dp}{dy}.$$
Tenglama $F\!\left(y,p,p\,\dfrac{dp}{dy}\right)=0$ — birinchi tartibli. Undan $p=p(y,C_1)$, so‘ng $\dfrac{dy}{p(y,C_1)}=dx$ ajraladigan tenglama.`,
          R`Если $x$ явно не входит (автономное уравнение), примем $y$ за новую независимую переменную, а $p=y'$ — за функцию от $y$: $y'=p(y)$. По цепному правилу
$$y''=\frac{dp}{dx}=\frac{dp}{dy}\cdot\frac{dy}{dx}=p\,\frac{dp}{dy}.$$
Уравнение $F\!\left(y,p,p\,\dfrac{dp}{dy}\right)=0$ — первого порядка. Из него $p=p(y,C_1)$, затем $\dfrac{dy}{p(y,C_1)}=dx$ — уравнение с разделяющимися переменными.`,
          R`If $x$ does not appear explicitly (an autonomous equation), take $y$ as the new independent variable and $p=y'$ as a function of $y$: $y'=p(y)$. By the chain rule
$$y''=\frac{dp}{dx}=\frac{dp}{dy}\cdot\frac{dy}{dx}=p\,\frac{dp}{dy}.$$
The equation $F\!\left(y,p,p\,\dfrac{dp}{dy}\right)=0$ is of first order. From it $p=p(y,C_1)$, and then $\dfrac{dy}{p(y,C_1)}=dx$ is separable.`) },
        { type: 'example', title: L(R`$x$ qatnashmagan Koshi masalasi`, R`Задача Коши без $x$`, R`A Cauchy problem without $x$`),
          body: L(R`$y''=2y^3$, $y(0)=1$, $y'(0)=1$ masalasini yeching.`, R`Решите задачу $y''=2y^3$, $y(0)=1$, $y'(0)=1$.`, R`Solve $y''=2y^3$, $y(0)=1$, $y'(0)=1$.`),
          steps: [
            L(R`$x$ yo‘q: $y'=p(y)$, $y''=p\,\dfrac{dp}{dy}$. Tenglama: $p\,\dfrac{dp}{dy}=2y^3$.`, R`$x$ отсутствует: $y'=p(y)$, $y''=p\,\dfrac{dp}{dy}$. Уравнение: $p\,\dfrac{dp}{dy}=2y^3$.`, R`No $x$: $y'=p(y)$, $y''=p\,\dfrac{dp}{dy}$. The equation becomes $p\,\dfrac{dp}{dy}=2y^3$.`),
            L(R`Ajratamiz va integrallaymiz: $\dfrac{p^2}{2}=\dfrac{y^4}{2}+\dfrac{C_1}{2}$, ya’ni $p^2=y^4+C_1$.`, R`Разделяем и интегрируем: $\dfrac{p^2}{2}=\dfrac{y^4}{2}+\dfrac{C_1}{2}$, то есть $p^2=y^4+C_1$.`, R`Separate and integrate: $\dfrac{p^2}{2}=\dfrac{y^4}{2}+\dfrac{C_1}{2}$, i.e. $p^2=y^4+C_1$.`),
            L(R`$C_1$ ni darhol topamiz: $y=1$ da $p=1$, $1=1+C_1\Rightarrow C_1=0$. $p(0)=1>0$ bo‘lgani uchun $p=y^2$.`, R`Сразу находим $C_1$: при $y=1$ $p=1$, $1=1+C_1\Rightarrow C_1=0$. Так как $p(0)=1>0$, берём $p=y^2$.`, R`Find $C_1$ right away: at $y=1$, $p=1$, so $1=1+C_1\Rightarrow C_1=0$. Since $p(0)=1>0$ we take $p=y^2$.`),
            L(R`$\dfrac{dy}{y^2}=dx\Rightarrow-\dfrac1y=x+C_2$, $y(0)=1\Rightarrow C_2=-1$. Javob: $y=\dfrac{1}{1-x}$, $x<1$ (yechim $x\to1^-$ da cheksizlikka ketadi).`, R`$\dfrac{dy}{y^2}=dx\Rightarrow-\dfrac1y=x+C_2$, $y(0)=1\Rightarrow C_2=-1$. Ответ: $y=\dfrac{1}{1-x}$, $x<1$ (решение уходит в бесконечность при $x\to1^-$).`, R`$\dfrac{dy}{y^2}=dx\Rightarrow-\dfrac1y=x+C_2$, $y(0)=1\Rightarrow C_2=-1$. Answer: $y=\dfrac{1}{1-x}$, $x<1$ (the solution blows up as $x\to1^-$).`)
          ],
          check: L(R`$y=(1-x)^{-1}$: $y'=(1-x)^{-2}$, $y''=2(1-x)^{-3}=2y^3$ ✓; $y(0)=1$, $y'(0)=1$ ✓.`, R`$y=(1-x)^{-1}$: $y'=(1-x)^{-2}$, $y''=2(1-x)^{-3}=2y^3$ ✓; $y(0)=1$, $y'(0)=1$ ✓.`, R`$y=(1-x)^{-1}$: $y'=(1-x)^{-2}$, $y''=2(1-x)^{-3}=2y^3$ ✓; $y(0)=1$, $y'(0)=1$ ✓.`) },
        { type: 'warn', body: L(R`$p\,\dfrac{dp}{dy}=\dots$ tenglamani $p$ ga bo‘lganda $p\equiv0$, ya’ni $y=\text{const}$ yechimlar yo‘qolishi mumkin. Ularni alohida tenglamaga qo‘yib tekshiring. Masalan, $y\,y''=(y')^2$ uchun $y=C$ — yechim. Shuningdek, $y''=p\,\dfrac{dp}{dy}$ (lekin $\dfrac{dp}{dy}$ emas!) ekanini unutmang.`,
          R`При делении уравнения $p\,\dfrac{dp}{dy}=\dots$ на $p$ могут потеряться решения $p\equiv0$, то есть $y=\text{const}$. Проверьте их отдельно подстановкой. Например, для $y\,y''=(y')^2$ $y=C$ — решение. Помните также, что $y''=p\,\dfrac{dp}{dy}$ (а не $\dfrac{dp}{dy}$!).`,
          R`Dividing $p\,\dfrac{dp}{dy}=\dots$ by $p$ may lose the solutions $p\equiv0$, i.e. $y=\text{const}$. Check them separately by substitution. For example, $y=C$ solves $y\,y''=(y')^2$. Also remember that $y''=p\,\dfrac{dp}{dy}$ (not $\dfrac{dp}{dy}$!).`) },
        { type: 'lab', lab: 'L01', body: L(R`$p\,\dfrac{dp}{dy}=2y^3$ — $(y,p)$ tekislikda birinchi tartibli tenglama. L01 laboratoriyasida o‘z tenglamangizni kiriting: 2*x^3/y (bu yerda laboratoriyadagi $x$ bizning $y$ ni, laboratoriyadagi $y$ esa $p=y'$ ni bildiradi). Integral chiziqlar — $p^2=y^4+C_1$ egri chiziqlari, ya’ni harakatning **faza traektoriyalari**. $(1,1)$ nuqtadan o‘tuvchi chiziq $p=y^2$ parabola ekanini ko‘ring.`,
          R`$p\,\dfrac{dp}{dy}=2y^3$ — уравнение первого порядка на плоскости $(y,p)$. В лаборатории L01 введите своё уравнение: 2*x^3/y (здесь $x$ лаборатории означает наше $y$, а $y$ лаборатории — $p=y'$). Интегральные кривые — линии $p^2=y^4+C_1$, то есть **фазовые траектории** движения. Убедитесь, что кривая через точку $(1,1)$ — парабола $p=y^2$.`,
          R`$p\,\dfrac{dp}{dy}=2y^3$ is a first-order equation in the $(y,p)$ plane. In lab L01 type your own equation: 2*x^3/y (the lab’s $x$ stands for our $y$, and the lab’s $y$ for $p=y'$). The integral curves are $p^2=y^4+C_1$, the **phase trajectories** of the motion. Check that the curve through $(1,1)$ is the parabola $p=y^2$.`) }
      ]
    },
    {
      id: 't06.3',
      title: L('Bir jinsli va umumlashgan bir jinsli tenglamalar', 'Однородные и обобщённо однородные уравнения', 'Homogeneous and generalised homogeneous equations'),
      blocks: [
        { type: 'def', title: L(R`$y,y',\dots,y^{(n)}$ ga nisbatan bir jinsli tenglama`, R`Уравнение, однородное относительно $y,y',\dots,y^{(n)}$`, R`Equation homogeneous in $y,y',\dots,y^{(n)}$`),
          body: L(R`$F(x,y,y',\dots,y^{(n)})=0$ tenglama $y$ va uning hosilalariga nisbatan **bir jinsli** deyiladi, agar biror $m$ uchun
$$F(x,ty,ty',\dots,ty^{(n)})=t^m F(x,y,y',\dots,y^{(n)}),\qquad t\ne0.$$
Almashtirish: $y'=y\,z(x)$. U holda $y''=y\,(z'+z^2)$, $y'''=y\,(z''+3zz'+z^3)$, … va $y^m$ ga qisqartirgandan keyin $z$ uchun tartibi bittaga past tenglama chiqadi. Oxirida $y=C_2\,e^{\int z\,dx}$. $y\equiv0$ ham yechim bo‘lishi mumkin — tekshiring.`,
          R`Уравнение $F(x,y,y',\dots,y^{(n)})=0$ называется **однородным** относительно $y$ и её производных, если для некоторого $m$
$$F(x,ty,ty',\dots,ty^{(n)})=t^m F(x,y,y',\dots,y^{(n)}),\qquad t\ne0.$$
Замена: $y'=y\,z(x)$. Тогда $y''=y\,(z'+z^2)$, $y'''=y\,(z''+3zz'+z^3)$, … и после сокращения на $y^m$ получается уравнение для $z$ на единицу меньшего порядка. В конце $y=C_2\,e^{\int z\,dx}$. $y\equiv0$ тоже может быть решением — проверьте.`,
          R`$F(x,y,y',\dots,y^{(n)})=0$ is **homogeneous** in $y$ and its derivatives if, for some $m$,
$$F(x,ty,ty',\dots,ty^{(n)})=t^m F(x,y,y',\dots,y^{(n)}),\qquad t\ne0.$$
Substitute $y'=y\,z(x)$. Then $y''=y\,(z'+z^2)$, $y'''=y\,(z''+3zz'+z^3)$, …, and after cancelling $y^m$ we get an equation for $z$ of order one less. Finally $y=C_2\,e^{\int z\,dx}$. $y\equiv0$ may also be a solution; check it.`) },
        { type: 'warn', body: L(R`Bu yerda “bir jinsli” so‘zi **uchinchi** ma’noda ishlatilmoqda: $y,y',y''$ ni bir vaqtda $t$ ga ko‘paytirishga nisbatan. Bu 3-mavzudagi $y'=f(y/x)$ ham, 7-mavzudagi “o‘ng tomoni nol bo‘lgan chiziqli tenglama” ham emas (garchi har bir chiziqli bir jinsli tenglama bu ma’noda ham bir jinsli bo‘lsa-da).`,
          R`Здесь слово «однородное» употреблено в **третьем** смысле: относительно одновременного умножения $y,y',y''$ на $t$. Это не $y'=f(y/x)$ из темы 3 и не «линейное уравнение с нулевой правой частью» из темы 7 (хотя каждое линейное однородное уравнение однородно и в этом смысле).`,
          R`Here “homogeneous” is used in a **third** sense: with respect to multiplying $y,y',y''$ simultaneously by $t$. This is neither $y'=f(y/x)$ from topic 3 nor the “linear equation with zero right side” of topic 7 (although every linear homogeneous equation is homogeneous in this sense too).`) },
        { type: 'example', title: L(R`$y$ ga nisbatan bir jinsli tenglama`, R`Уравнение, однородное относительно $y$`, R`An equation homogeneous in $y$`),
          body: L(R`$x\,y\,y''-x\,(y')^2=y\,y'$ tenglamani yeching ($y\ne0$).`, R`Решите уравнение $x\,y\,y''-x\,(y')^2=y\,y'$ ($y\ne0$).`, R`Solve $x\,y\,y''-x\,(y')^2=y\,y'$ ($y\ne0$).`),
          steps: [
            L(R`Har bir had $y$ ga nisbatan 2-darajali: $y,y',y''$ ni $t$ ga ko‘paytirsak, tenglama $t^2$ ga ko‘payadi ($m=2$).`, R`Каждое слагаемое второй степени по $y$: при умножении $y,y',y''$ на $t$ уравнение умножается на $t^2$ ($m=2$).`, R`Each term has degree two in $y$: multiplying $y,y',y''$ by $t$ multiplies the equation by $t^2$ ($m=2$).`),
            L(R`$y'=yz$, $y''=y(z'+z^2)$: $x\,y^2(z'+z^2)-x\,y^2z^2=y^2z$.`, R`$y'=yz$, $y''=y(z'+z^2)$: $x\,y^2(z'+z^2)-x\,y^2z^2=y^2z$.`, R`$y'=yz$, $y''=y(z'+z^2)$: $x\,y^2(z'+z^2)-x\,y^2z^2=y^2z$.`),
            L(R`$y^2$ ga qisqartiramiz: $x\,z'=z\Rightarrow z=C_1x$.`, R`Сокращаем на $y^2$: $x\,z'=z\Rightarrow z=C_1x$.`, R`Cancel $y^2$: $x\,z'=z\Rightarrow z=C_1x$.`),
            L(R`$\dfrac{y'}{y}=C_1x\Rightarrow y=C_2\,e^{C_1x^2/2}$. ($C_2=0$ da $y\equiv0$ ham yechim.)`, R`$\dfrac{y'}{y}=C_1x\Rightarrow y=C_2\,e^{C_1x^2/2}$. (При $C_2=0$ решение $y\equiv0$ тоже подходит.)`, R`$\dfrac{y'}{y}=C_1x\Rightarrow y=C_2\,e^{C_1x^2/2}$. (With $C_2=0$, $y\equiv0$ is also a solution.)`)
          ],
          check: L(R`$y'=C_1xy$, $y''=C_1y+C_1^2x^2y$: $xy(C_1y+C_1^2x^2y)-x\,C_1^2x^2y^2=C_1xy^2=y\cdot C_1xy$ ✓.`, R`$y'=C_1xy$, $y''=C_1y+C_1^2x^2y$: $xy(C_1y+C_1^2x^2y)-x\,C_1^2x^2y^2=C_1xy^2=y\cdot C_1xy$ ✓.`, R`$y'=C_1xy$, $y''=C_1y+C_1^2x^2y$: $xy(C_1y+C_1^2x^2y)-x\,C_1^2x^2y^2=C_1xy^2=y\cdot C_1xy$ ✓.`) },
        { type: 'def', title: L('Umumlashgan bir jinsli tenglama', 'Обобщённо однородное уравнение', 'Generalised homogeneous equation'),
          body: L(R`$x$ ga $1$ “vazn”, $y$ ga $m$ vazn beramiz; u holda $y'$ ning vazni $m-1$, $y''$ niki $m-2$, …, $y^{(k)}$ niki $m-k$. Agar biror $m$ da tenglamaning **barcha hadlari bir xil vaznga** ega bo‘lsa, tenglama **umumlashgan bir jinsli** deyiladi. Formal: $F(tx,t^my,t^{m-1}y',\dots,t^{m-n}y^{(n)})=t^sF(x,y,y',\dots,y^{(n)})$.

Almashtirish: $x=e^{t}$, $y=u(t)\,e^{mt}$ ($x>0$). Natijada $t$ oshkor qatnashmaydigan tenglama chiqadi, keyin $u'=p(u)$ bilan tartib yana pasaytiriladi.`,
          R`Припишем $x$ «вес» $1$, а $y$ — вес $m$; тогда $y'$ имеет вес $m-1$, $y''$ — $m-2$, …, $y^{(k)}$ — $m-k$. Если при некотором $m$ **все члены уравнения имеют одинаковый вес**, уравнение называется **обобщённо однородным**. Формально: $F(tx,t^my,t^{m-1}y',\dots,t^{m-n}y^{(n)})=t^sF(x,y,y',\dots,y^{(n)})$.

Замена: $x=e^{t}$, $y=u(t)\,e^{mt}$ ($x>0$). Получается уравнение, не содержащее $t$ явно; затем порядок понижается ещё раз заменой $u'=p(u)$.`,
          R`Give $x$ “weight” $1$ and $y$ weight $m$; then $y'$ has weight $m-1$, $y''$ weight $m-2$, …, $y^{(k)}$ weight $m-k$. If for some $m$ **all terms of the equation have the same weight**, the equation is **generalised homogeneous**. Formally: $F(tx,t^my,t^{m-1}y',\dots,t^{m-n}y^{(n)})=t^sF(x,y,y',\dots,y^{(n)})$.

Substitute $x=e^{t}$, $y=u(t)\,e^{mt}$ ($x>0$). The result does not contain $t$ explicitly, and the order is then reduced once more by $u'=p(u)$.`) },
        { type: 'example', title: L('Umumlashgan bir jinsli tenglama', 'Обобщённо однородное уравнение', 'A generalised homogeneous equation'),
          body: L(R`$x^3y''=(xy'-y)^2$ tenglamani yeching ($x>0$).`, R`Решите уравнение $x^3y''=(xy'-y)^2$ ($x>0$).`, R`Solve $x^3y''=(xy'-y)^2$ ($x>0$).`),
          steps: [
            L(R`Vaznlar: $x^3y''$ — $3+(m-2)=m+1$; $(xy'-y)^2$ — $2m$ (ichidagi ikki had ham vazni $m$). $m+1=2m\Rightarrow m=1$.`, R`Веса: $x^3y''$ — $3+(m-2)=m+1$; $(xy'-y)^2$ — $2m$ (оба члена в скобке имеют вес $m$). $m+1=2m\Rightarrow m=1$.`, R`Weights: $x^3y''$ has $3+(m-2)=m+1$; $(xy'-y)^2$ has $2m$ (both terms in the bracket have weight $m$). $m+1=2m\Rightarrow m=1$.`),
            L(R`$x=e^t$, $y=e^tu(t)$. Unda $xy'-y=e^t\dot u$, $y''=e^{-t}(\ddot u+\dot u)$ (nuqta — $t$ bo‘yicha hosila). Tenglama $e^{2t}$ ga qisqarib: $\ddot u+\dot u=\dot u^2$.`, R`$x=e^t$, $y=e^tu(t)$. Тогда $xy'-y=e^t\dot u$, $y''=e^{-t}(\ddot u+\dot u)$ (точка — производная по $t$). После сокращения на $e^{2t}$: $\ddot u+\dot u=\dot u^2$.`, R`$x=e^t$, $y=e^tu(t)$. Then $xy'-y=e^t\dot u$ and $y''=e^{-t}(\ddot u+\dot u)$ (dot = derivative in $t$). Cancelling $e^{2t}$: $\ddot u+\dot u=\dot u^2$.`),
            L(R`$t$ ham, $u$ ham yo‘q: $q=\dot u$, $\dot q=q^2-q$. $q\ne0,1$ da $\dfrac{dq}{q(q-1)}=dt\Rightarrow\dfrac{q-1}{q}=C_1e^t\Rightarrow q=\dfrac{1}{1-C_1e^t}$.`, R`Нет ни $t$, ни $u$: $q=\dot u$, $\dot q=q^2-q$. При $q\ne0,1$: $\dfrac{dq}{q(q-1)}=dt\Rightarrow\dfrac{q-1}{q}=C_1e^t\Rightarrow q=\dfrac{1}{1-C_1e^t}$.`, R`Neither $t$ nor $u$ appears: $q=\dot u$, $\dot q=q^2-q$. For $q\ne0,1$: $\dfrac{dq}{q(q-1)}=dt\Rightarrow\dfrac{q-1}{q}=C_1e^t\Rightarrow q=\dfrac{1}{1-C_1e^t}$.`),
            L(R`$u=\displaystyle\int\frac{dt}{1-C_1e^t}=t-\ln|1-C_1e^t|+C_2$. Qaytamiz ($t=\ln x$, $u=y/x$): $y=x\ln x-x\ln|1-C_1x|+C_2x$.`, R`$u=\displaystyle\int\frac{dt}{1-C_1e^t}=t-\ln|1-C_1e^t|+C_2$. Возвращаемся ($t=\ln x$, $u=y/x$): $y=x\ln x-x\ln|1-C_1x|+C_2x$.`, R`$u=\displaystyle\int\frac{dt}{1-C_1e^t}=t-\ln|1-C_1e^t|+C_2$. Going back ($t=\ln x$, $u=y/x$): $y=x\ln x-x\ln|1-C_1x|+C_2x$.`),
            L(R`Yo‘qolgan holatlar: $q=1$ — bu $C_1=0$ ($y=x\ln x+C_2x$, oilaga kiradi); $q=0$ — $u=\text{const}$, ya’ni $y=Cx$. Tekshirish: $y''=0$, $xy'-y=0$ ✓ — bu yechimlar oilaga kirmaydi, ularni alohida yozamiz.`, R`Потерянные случаи: $q=1$ — это $C_1=0$ ($y=x\ln x+C_2x$, входит в семейство); $q=0$ — $u=\text{const}$, то есть $y=Cx$. Проверка: $y''=0$, $xy'-y=0$ ✓ — эти решения в семейство не входят, выписываем их отдельно.`, R`Lost cases: $q=1$ is $C_1=0$ ($y=x\ln x+C_2x$, inside the family); $q=0$ gives $u=\text{const}$, i.e. $y=Cx$. Check: $y''=0$, $xy'-y=0$ ✓; these solutions are not in the family and must be listed separately.`)
          ],
          check: L(R`$y=x\ln x-x\ln(1-C_1x)+C_2x$ uchun $x^3y''-(xy'-y)^2\equiv0$ ✓ ($1-C_1x>0$ sohada).`, R`для $y=x\ln x-x\ln(1-C_1x)+C_2x$ получаем $x^3y''-(xy'-y)^2\equiv0$ ✓ (в области $1-C_1x>0$).`, R`for $y=x\ln x-x\ln(1-C_1x)+C_2x$ we get $x^3y''-(xy'-y)^2\equiv0$ ✓ (where $1-C_1x>0$).`) },
        { type: 'note', title: L('Qaysi almashtirish?', 'Какую замену выбрать?', 'Which substitution?'),
          body: L(R`- $y^{(n)}=f(x)$ — $n$ marta integrallash.
- $y,\dots,y^{(k-1)}$ yo‘q — $z=y^{(k)}$.
- $x$ yo‘q — $y'=p(y)$, $y''=p\,p_y$.
- $y,y',\dots$ ga nisbatan bir jinsli — $y'=yz$.
- Umumlashgan bir jinsli — $x=e^t$, $y=ue^{mt}$.
- Ba’zan tenglamaning ikkala tomoni to‘liq hosila bo‘ladi: masalan, $yy''+(y')^2=(yy')'$ — darhol bir marta integrallash mumkin.`,
          R`- $y^{(n)}=f(x)$ — интегрировать $n$ раз.
- Нет $y,\dots,y^{(k-1)}$ — $z=y^{(k)}$.
- Нет $x$ — $y'=p(y)$, $y''=p\,p_y$.
- Однородное относительно $y,y',\dots$ — $y'=yz$.
- Обобщённо однородное — $x=e^t$, $y=ue^{mt}$.
- Иногда обе части уравнения — полные производные: например, $yy''+(y')^2=(yy')'$ — можно сразу один раз проинтегрировать.`,
          R`- $y^{(n)}=f(x)$: integrate $n$ times.
- No $y,\dots,y^{(k-1)}$: $z=y^{(k)}$.
- No $x$: $y'=p(y)$, $y''=p\,p_y$.
- Homogeneous in $y,y',\dots$: $y'=yz$.
- Generalised homogeneous: $x=e^t$, $y=ue^{mt}$.
- Sometimes both sides are exact derivatives: e.g. $yy''+(y')^2=(yy')'$, so one integration is immediate.`) }
      ]
    }
  ],
  mistakes: [
    L(R`Umumiy yechimda o‘zgarmaslar sonini tartibdan kam yozish (masalan, $y''=f(x)$ uchun faqat bitta $C$).`, R`Писать в общем решении меньше постоянных, чем порядок (например, одну $C$ для $y''=f(x)$).`, R`Writing fewer constants than the order in the general solution (e.g. only one $C$ for $y''=f(x)$).`),
    L(R`$x$ qatnashmagan tenglamada $y''=\dfrac{dp}{dy}$ deb yozish. To‘g‘risi: $y''=p\,\dfrac{dp}{dy}$.`, R`В уравнении без $x$ писать $y''=\dfrac{dp}{dy}$. Правильно: $y''=p\,\dfrac{dp}{dy}$.`, R`Writing $y''=\dfrac{dp}{dy}$ for an equation without $x$. Correct: $y''=p\,\dfrac{dp}{dy}$.`),
    L(R`$p$ ga (yoki $y$ ga) bo‘lishda $y=\text{const}$ (yoki $y\equiv0$) yechimlarni yo‘qotish.`, R`Терять решения $y=\text{const}$ (или $y\equiv0$) при делении на $p$ (или на $y$).`, R`Losing the solutions $y=\text{const}$ (or $y\equiv0$) when dividing by $p$ (or by $y$).`),
    L(R`Koshi masalasi va chegaraviy masalani aralashtirish: $y(0)$ va $y(1)$ berilsa, bu Koshi masalasi emas.`, R`Путать задачу Коши и краевую задачу: если заданы $y(0)$ и $y(1)$, это не задача Коши.`, R`Confusing the Cauchy problem with a boundary value problem: given $y(0)$ and $y(1)$, it is not a Cauchy problem.`),
    L(R`Koshi masalasida o‘zgarmaslarni faqat oxirida topish va murakkab tenglamalar sistemasiga duch kelish; ularni har bir integrallashdan keyin darhol topish osonroq.`, R`Находить постоянные в задаче Коши только в конце и получать сложную систему; проще находить их сразу после каждого интегрирования.`, R`Finding the constants of a Cauchy problem only at the end and facing a messy system; it is easier to find each one right after each integration.`)
  ],
  exercises: [
    { id: 't06.x1', level: 'easy', type: 'formula',
      q: L(R`$y''=6x$ tenglamaning umumiy yechimini yozing ($C_1$, $C_2$ dan foydalaning).`, R`Запишите общее решение уравнения $y''=6x$ (используйте $C_1$, $C_2$).`, R`Write the general solution of $y''=6x$ (use $C_1$, $C_2$).`),
      check: { kind: 'ode', residual: 'ypp - 6*x', order: 2, consts: ['C1', 'C2'], x: [-2, 2] }, answer: 'x^3 + C1*x + C2',
      hint: L('Ikki marta integrallang.', 'Проинтегрируйте дважды.', 'Integrate twice.'),
      solution: L(R`$y'=3x^2+C_1$, $y=x^3+C_1x+C_2$.`, R`$y'=3x^2+C_1$, $y=x^3+C_1x+C_2$.`, R`$y'=3x^2+C_1$, $y=x^3+C_1x+C_2$.`) },
    { id: 't06.x2', level: 'easy', type: 'numeric',
      q: L(R`$y^{(4)}=\cos x$ tenglamaning umumiy yechimida nechta ixtiyoriy o‘zgarmas bor?`, R`Сколько произвольных постоянных в общем решении уравнения $y^{(4)}=\cos x$?`, R`How many arbitrary constants are in the general solution of $y^{(4)}=\cos x$?`),
      check: { kind: 'numeric', value: 4, tol: 0 },
      hint: L('O‘zgarmaslar soni tartibga teng.', 'Число постоянных равно порядку.', 'The number of constants equals the order.'),
      solution: L(R`Tartib $4$: $y=\cos x+C_1x^3+C_2x^2+C_3x+C_4$ — to‘rtta o‘zgarmas.`, R`Порядок $4$: $y=\cos x+C_1x^3+C_2x^2+C_3x+C_4$ — четыре постоянные.`, R`Order $4$: $y=\cos x+C_1x^3+C_2x^2+C_3x+C_4$, four constants.`) },
    { id: 't06.x3', level: 'mid', type: 'formula',
      q: L(R`$x\,y''+y'=0$ ($x>0$) tenglamaning umumiy yechimini yozing.`, R`Запишите общее решение уравнения $x\,y''+y'=0$ ($x>0$).`, R`Write the general solution of $x\,y''+y'=0$ ($x>0$).`),
      check: { kind: 'ode', residual: 'x*ypp + yp', order: 2, consts: ['C1', 'C2'], x: [0.5, 3] }, answer: 'C1*ln(x) + C2',
      hint: L(R`$z=y'$: $xz'+z=(xz)'=0$.`, R`$z=y'$: $xz'+z=(xz)'=0$.`, R`$z=y'$: $xz'+z=(xz)'=0$.`),
      solution: L(R`$xz=C_1\Rightarrow y'=\dfrac{C_1}{x}\Rightarrow y=C_1\ln x+C_2$. Tekshirish: $x\cdot\left(-\frac{C_1}{x^2}\right)+\frac{C_1}{x}=0$ ✓.`, R`$xz=C_1\Rightarrow y'=\dfrac{C_1}{x}\Rightarrow y=C_1\ln x+C_2$. Проверка: $x\cdot\left(-\frac{C_1}{x^2}\right)+\frac{C_1}{x}=0$ ✓.`, R`$xz=C_1\Rightarrow y'=\dfrac{C_1}{x}\Rightarrow y=C_1\ln x+C_2$. Check: $x\cdot\left(-\frac{C_1}{x^2}\right)+\frac{C_1}{x}=0$ ✓.`) },
    { id: 't06.x4', level: 'mid', type: 'formula',
      q: L(R`$y\,y''+(y')^2=0$, $y(0)=1$, $y'(0)=\frac12$ Koshi masalasini yeching: $y=\ ?$`, R`Решите задачу Коши $y\,y''+(y')^2=0$, $y(0)=1$, $y'(0)=\frac12$: $y=\ ?$`, R`Solve the Cauchy problem $y\,y''+(y')^2=0$, $y(0)=1$, $y'(0)=\frac12$: $y=\ ?$`),
      check: { kind: 'ode', residual: 'y*ypp + yp^2', order: 2, consts: [], x: [0, 2], ivp: { x0: 0, y0: 1, yp0: 0.5 } }, answer: 'sqrt(x + 1)',
      hint: L(R`Chap tomon $(y\,y')'$ ga teng.`, R`Левая часть равна $(y\,y')'$.`, R`The left side equals $(y\,y')'$.`),
      solution: L(R`$(yy')'=0\Rightarrow yy'=C_1=\frac12$ ($x=0$ da). $(y^2)'=1\Rightarrow y^2=x+C_2$, $C_2=1$. $y>0$: $y=\sqrt{x+1}$, $x>-1$.`, R`$(yy')'=0\Rightarrow yy'=C_1=\frac12$ (при $x=0$). $(y^2)'=1\Rightarrow y^2=x+C_2$, $C_2=1$. $y>0$: $y=\sqrt{x+1}$, $x>-1$.`, R`$(yy')'=0\Rightarrow yy'=C_1=\frac12$ (at $x=0$). $(y^2)'=1\Rightarrow y^2=x+C_2$, $C_2=1$. With $y>0$: $y=\sqrt{x+1}$, $x>-1$.`) },
    { id: 't06.x5', level: 'mid', type: 'match',
      q: L('Tenglamani mos almashtirish bilan moslang.', 'Сопоставьте уравнение с подходящей заменой.', 'Match each equation with a suitable substitution.'),
      pairs: [
        { left: L(R`$y'''=x\,e^x$`, R`$y'''=x\,e^x$`, R`$y'''=x\,e^x$`), right: L('3 marta integrallash', 'Проинтегрировать 3 раза', 'Integrate three times') },
        { left: L(R`$x\,y'''=y''$`, R`$x\,y'''=y''$`, R`$x\,y'''=y''$`), right: L(R`$z=y''$`, R`$z=y''$`, R`$z=y''$`) },
        { left: L(R`$y''=1+(y')^2\,y$`, R`$y''=1+(y')^2\,y$`, R`$y''=1+(y')^2\,y$`), right: L(R`$y'=p(y)$`, R`$y'=p(y)$`, R`$y'=p(y)$`) },
        { left: L(R`$x^2y\,y''=(y-xy')^2$`, R`$x^2y\,y''=(y-xy')^2$`, R`$x^2y\,y''=(y-xy')^2$`), right: L(R`$y'=y\,z(x)$`, R`$y'=y\,z(x)$`, R`$y'=y\,z(x)$`) }
      ],
      explain: L(R`Faqat $f(x)$ — integrallash; $y,y'$ yo‘q — $z=y''$; $x$ yo‘q — $p(y)$; har bir had $y$ ga nisbatan 2-darajali — $y'=yz$.`, R`Только $f(x)$ — интегрирование; нет $y,y'$ — $z=y''$; нет $x$ — $p(y)$; каждый член второй степени по $y$ — $y'=yz$.`, R`Only $f(x)$: integrate; no $y,y'$: $z=y''$; no $x$: $p(y)$; every term of degree two in $y$: $y'=yz$.`) },
    { id: 't06.x6', level: 'mid', type: 'finderror',
      q: L(R`Talaba $y''=2y^3$ ni yechmoqda. Qaysi qatorda xato bor?`, R`Студент решает $y''=2y^3$. В какой строке ошибка?`, R`A student is solving $y''=2y^3$. Which line is wrong?`),
      lines: [
        L(R`Tenglamada $x$ yo‘q, shuning uchun $y'=p(y)$.`, R`В уравнении нет $x$, поэтому $y'=p(y)$.`, R`There is no $x$, so put $y'=p(y)$.`),
        L(R`U holda $y''=\dfrac{dp}{dy}$, tenglama: $\dfrac{dp}{dy}=2y^3$.`, R`Тогда $y''=\dfrac{dp}{dy}$, уравнение: $\dfrac{dp}{dy}=2y^3$.`, R`Then $y''=\dfrac{dp}{dy}$, and the equation is $\dfrac{dp}{dy}=2y^3$.`),
        L(R`$p=\dfrac{y^4}{2}+C_1$.`, R`$p=\dfrac{y^4}{2}+C_1$.`, R`$p=\dfrac{y^4}{2}+C_1$.`),
        L(R`$\dfrac{dy}{y^4/2+C_1}=dx$ ni integrallaymiz.`, R`Интегрируем $\dfrac{dy}{y^4/2+C_1}=dx$.`, R`Integrate $\dfrac{dy}{y^4/2+C_1}=dx$.`)
      ],
      wrong: 1,
      explain: L(R`Zanjir qoidasi: $y''=\dfrac{dp}{dx}=\dfrac{dp}{dy}\cdot\dfrac{dy}{dx}=p\,\dfrac{dp}{dy}$. To‘g‘ri tenglama $p\,\dfrac{dp}{dy}=2y^3$, undan $p^2=y^4+C_1$.`, R`Цепное правило: $y''=\dfrac{dp}{dx}=\dfrac{dp}{dy}\cdot\dfrac{dy}{dx}=p\,\dfrac{dp}{dy}$. Правильное уравнение $p\,\dfrac{dp}{dy}=2y^3$, откуда $p^2=y^4+C_1$.`, R`Chain rule: $y''=\dfrac{dp}{dx}=\dfrac{dp}{dy}\cdot\dfrac{dy}{dx}=p\,\dfrac{dp}{dy}$. The correct equation is $p\,\dfrac{dp}{dy}=2y^3$, giving $p^2=y^4+C_1$.`) },
    { id: 't06.x7', level: 'hard', type: 'formula',
      q: L(R`$y\,y''-(y')^2=y^2$ tenglamaning umumiy yechimini yozing ($y\ne0$; $C_1$, $C_2$).`, R`Запишите общее решение уравнения $y\,y''-(y')^2=y^2$ ($y\ne0$; $C_1$, $C_2$).`, R`Write the general solution of $y\,y''-(y')^2=y^2$ ($y\ne0$; $C_1$, $C_2$).`),
      check: { kind: 'ode', residual: 'y*ypp - yp^2 - y^2', order: 2, consts: ['C1', 'C2'], x: [-1.5, 1.5], c: [0.3, 2] }, answer: 'C2*exp(x^2/2 + C1*x)',
      hint: L(R`Tenglama $y$ ga nisbatan bir jinsli: $y'=yz$.`, R`Уравнение однородно относительно $y$: $y'=yz$.`, R`The equation is homogeneous in $y$: $y'=yz$.`),
      solution: L(R`$y^2(z'+z^2)-y^2z^2=y^2\Rightarrow z'=1\Rightarrow z=x+C_1$. $\dfrac{y'}{y}=x+C_1\Rightarrow y=C_2\,e^{x^2/2+C_1x}$.`, R`$y^2(z'+z^2)-y^2z^2=y^2\Rightarrow z'=1\Rightarrow z=x+C_1$. $\dfrac{y'}{y}=x+C_1\Rightarrow y=C_2\,e^{x^2/2+C_1x}$.`, R`$y^2(z'+z^2)-y^2z^2=y^2\Rightarrow z'=1\Rightarrow z=x+C_1$. $\dfrac{y'}{y}=x+C_1\Rightarrow y=C_2\,e^{x^2/2+C_1x}$.`) },
    { id: 't06.x8', level: 'hard', type: 'steps',
      q: L(R`$y''=1+(y')^2$, $y(0)=0$, $y'(0)=0$ masalasini bosqichma-bosqich yeching.`, R`Решите по шагам задачу $y''=1+(y')^2$, $y(0)=0$, $y'(0)=0$.`, R`Solve $y''=1+(y')^2$, $y(0)=0$, $y'(0)=0$ step by step.`),
      steps: [
        { q: L('Qaysi almashtirish eng qulay?', 'Какая замена удобнее всего?', 'Which substitution is simplest?'),
          options: [L(R`$z=y'$ (tenglamada $y$ yo‘q)`, R`$z=y'$ (в уравнении нет $y$)`, R`$z=y'$ (no $y$ in the equation)`), L(R`$y'=yz$`, R`$y'=yz$`, R`$y'=yz$`), L(R`$x=e^t$`, R`$x=e^t$`, R`$x=e^t$`)], correct: 0 },
        { q: L(R`$z'=1+z^2$, $z(0)=0$ dan:`, R`Из $z'=1+z^2$, $z(0)=0$:`, R`From $z'=1+z^2$, $z(0)=0$:`),
          options: [L(R`$z=\tan x$`, R`$z=\tan x$`, R`$z=\tan x$`), L(R`$z=e^x-1$`, R`$z=e^x-1$`, R`$z=e^x-1$`), L(R`$z=\sinh x$`, R`$z=\sinh x$`, R`$z=\sinh x$`)], correct: 0 },
        { q: L(R`$y'=\tan x$, $y(0)=0$ dan:`, R`Из $y'=\tan x$, $y(0)=0$:`, R`From $y'=\tan x$, $y(0)=0$:`),
          options: [L(R`$y=-\ln\cos x$`, R`$y=-\ln\cos x$`, R`$y=-\ln\cos x$`), L(R`$y=\ln\cos x$`, R`$y=\ln\cos x$`, R`$y=\ln\cos x$`), L(R`$y=\sec^2x-1$`, R`$y=\sec^2x-1$`, R`$y=\sec^2x-1$`)], correct: 0 },
        { q: L('Yechim qaysi oraliqda mavjud?', 'На каком интервале существует решение?', 'On which interval does the solution exist?'),
          options: [L(R`$\left(-\frac\pi2,\frac\pi2\right)$`, R`$\left(-\frac\pi2,\frac\pi2\right)$`, R`$\left(-\frac\pi2,\frac\pi2\right)$`), L(R`$\mathbb R$`, R`$\mathbb R$`, R`$\mathbb R$`), L(R`$(0,\pi)$`, R`$(0,\pi)$`, R`$(0,\pi)$`)], correct: 0 }
      ],
      explain: L(R`$\int\frac{dz}{1+z^2}=x\Rightarrow z=\tan x$; $\int\tan x\,dx=-\ln\cos x$. $x\to\pm\frac\pi2$ da $\cos x\to0$ va $y\to+\infty$. Tekshirish: $y'=\tan x$, $y''=1+\tan^2x$ ✓.`, R`$\int\frac{dz}{1+z^2}=x\Rightarrow z=\tan x$; $\int\tan x\,dx=-\ln\cos x$. При $x\to\pm\frac\pi2$ $\cos x\to0$ и $y\to+\infty$. Проверка: $y'=\tan x$, $y''=1+\tan^2x$ ✓.`, R`$\int\frac{dz}{1+z^2}=x\Rightarrow z=\tan x$; $\int\tan x\,dx=-\ln\cos x$. As $x\to\pm\frac\pi2$, $\cos x\to0$ and $y\to+\infty$. Check: $y'=\tan x$, $y''=1+\tan^2x$ ✓.`) },
    { id: 't06.x9', level: 'hard', type: 'numeric',
      q: L(R`$y''=2y^3$, $y(0)=\frac12$, $y'(0)=\frac14$ masalaning yechimi qaysi $x>0$ nuqtada cheksizlikka ketadi?`, R`В какой точке $x>0$ решение задачи $y''=2y^3$, $y(0)=\frac12$, $y'(0)=\frac14$ уходит в бесконечность?`, R`At which point $x>0$ does the solution of $y''=2y^3$, $y(0)=\frac12$, $y'(0)=\frac14$ blow up?`),
      check: { kind: 'numeric', value: 2, tol: 1e-6 },
      hint: L(R`$p^2=y^4+C_1$; $C_1$ ni boshlang‘ich shartlardan toping.`, R`$p^2=y^4+C_1$; найдите $C_1$ из начальных условий.`, R`$p^2=y^4+C_1$; find $C_1$ from the initial data.`),
      solution: L(R`$\frac1{16}=\frac1{16}+C_1\Rightarrow C_1=0$, $p=y^2$. $-\frac1y=x+C_2$, $C_2=-2$: $y=\dfrac{1}{2-x}$. $x\to2^-$ da cheksizlik. Javob: $2$.`, R`$\frac1{16}=\frac1{16}+C_1\Rightarrow C_1=0$, $p=y^2$. $-\frac1y=x+C_2$, $C_2=-2$: $y=\dfrac{1}{2-x}$. При $x\to2^-$ — бесконечность. Ответ: $2$.`, R`$\frac1{16}=\frac1{16}+C_1\Rightarrow C_1=0$, $p=y^2$. $-\frac1y=x+C_2$, $C_2=-2$: $y=\dfrac{1}{2-x}$, which blows up as $x\to2^-$. Answer: $2$.`) },
    { id: 't06.x10', level: 'easy', type: 'order',
      q: L(R`$F(y,y',y'')=0$ tenglamani yechish qadamlarini tartiblang.`, R`Упорядочьте шаги решения уравнения $F(y,y',y'')=0$.`, R`Order the steps for solving $F(y,y',y'')=0$.`),
      items: [
        L(R`$x$ qatnashmasligini ko‘rish`, R`Заметить, что $x$ не входит`, R`Notice that $x$ is absent`),
        L(R`$y'=p(y)$, $y''=p\,\dfrac{dp}{dy}$ almashtirish`, R`Замена $y'=p(y)$, $y''=p\,\dfrac{dp}{dy}$`, R`Substitute $y'=p(y)$, $y''=p\,\dfrac{dp}{dy}$`),
        L(R`Birinchi tartibli tenglamadan $p=p(y,C_1)$ ni topish`, R`Найти $p=p(y,C_1)$ из уравнения первого порядка`, R`Find $p=p(y,C_1)$ from the first-order equation`),
        L(R`$\dfrac{dy}{p(y,C_1)}=dx$ ni integrallash`, R`Проинтегрировать $\dfrac{dy}{p(y,C_1)}=dx$`, R`Integrate $\dfrac{dy}{p(y,C_1)}=dx$`),
        L(R`$p\equiv0$ ($y=\text{const}$) holini alohida tekshirish`, R`Отдельно проверить случай $p\equiv0$ ($y=\text{const}$)`, R`Check the case $p\equiv0$ ($y=\text{const}$) separately`)
      ],
      explain: L('Avval tur aniqlanadi, so‘ng almashtirish, ikki marta integrallash va yo‘qolgan yechimlarni tekshirish.', 'Сначала определяем тип, затем замена, два интегрирования и проверка потерянных решений.', 'First identify the type, then substitute, integrate twice, and check for lost solutions.') }
  ],
  quiz: [
    { id: 't06.q1', q: L(R`3-tartibli tenglama uchun Koshi masalasida nechta shart beriladi?`, R`Сколько условий задаётся в задаче Коши для уравнения 3-го порядка?`, R`How many conditions does a Cauchy problem for a third-order equation have?`),
      options: [L('1', '1', '1'), L('2', '2', '2'), L(R`3: $y(x_0),y'(x_0),y''(x_0)$`, R`3: $y(x_0),y'(x_0),y''(x_0)$`, R`3: $y(x_0),y'(x_0),y''(x_0)$`), L(R`3: $y(x_0),y(x_1),y(x_2)$`, R`3: $y(x_0),y(x_1),y(x_2)$`, R`3: $y(x_0),y(x_1),y(x_2)$`)], correct: 2,
      explain: L(R`$n$ ta shart bitta nuqtada: $y,y',\dots,y^{(n-1)}$.`, R`$n$ условий в одной точке: $y,y',\dots,y^{(n-1)}$.`, R`$n$ conditions at one point: $y,y',\dots,y^{(n-1)}$.`),
      why: [L('Uchta o‘zgarmasni bitta shart aniqlamaydi.', 'Одно условие не определяет три постоянные.', 'One condition cannot fix three constants.'), L('Ikki shart yetmaydi.', 'Двух условий мало.', 'Two are not enough.'), null, L('Turli nuqtalardagi shartlar — chegaraviy masala.', 'Условия в разных точках — краевая задача.', 'Conditions at different points form a boundary value problem.')] },
    { id: 't06.q2', q: L(R`$F(y,y',y'')=0$ uchun almashtirish $y'=p(y)$. Unda $y''$ =`, R`Для $F(y,y',y'')=0$ замена $y'=p(y)$. Тогда $y''$ =`, R`For $F(y,y',y'')=0$ with $y'=p(y)$, $y''$ equals`),
      options: [L(R`$p\,\dfrac{dp}{dy}$`, R`$p\,\dfrac{dp}{dy}$`, R`$p\,\dfrac{dp}{dy}$`), L(R`$\dfrac{dp}{dy}$`, R`$\dfrac{dp}{dy}$`, R`$\dfrac{dp}{dy}$`), L(R`$p^2$`, R`$p^2$`, R`$p^2$`), L(R`$\dfrac{dp}{dx}\cdot y$`, R`$\dfrac{dp}{dx}\cdot y$`, R`$\dfrac{dp}{dx}\cdot y$`)], correct: 0,
      explain: L(R`$\dfrac{dp}{dx}=\dfrac{dp}{dy}\dfrac{dy}{dx}=p\,\dfrac{dp}{dy}$.`, R`$\dfrac{dp}{dx}=\dfrac{dp}{dy}\dfrac{dy}{dx}=p\,\dfrac{dp}{dy}$.`, R`$\dfrac{dp}{dx}=\dfrac{dp}{dy}\dfrac{dy}{dx}=p\,\dfrac{dp}{dy}$.`),
      why: [null, L(R`$\dfrac{dy}{dx}=p$ ko‘paytuvchisi unutilgan.`, R`Забыт множитель $\dfrac{dy}{dx}=p$.`, R`The factor $\dfrac{dy}{dx}=p$ is missing.`), L('Bu $(y\')^2$, $y\'\'$ emas.', 'Это $(y\')^2$, а не $y\'\'$.', 'That is $(y\')^2$, not $y\'\'$.'), L(R`$y$ ko‘paytuvchisi asossiz.`, R`Множитель $y$ ниоткуда не следует.`, R`The factor $y$ has no basis.`)] },
    { id: 't06.q3', q: L(R`$x\,y'''-y''=0$ tenglamada tartibni qanday pasaytirish mumkin?`, R`Как понизить порядок уравнения $x\,y'''-y''=0$?`, R`How can the order of $x\,y'''-y''=0$ be reduced?`),
      options: [L(R`$z=y''$`, R`$z=y''$`, R`$z=y''$`), L(R`$y'=p(y)$`, R`$y'=p(y)$`, R`$y'=p(y)$`), L(R`$y=xu$`, R`$y=xu$`, R`$y=xu$`), L('Pasaytirib bo‘lmaydi', 'Нельзя понизить', 'It cannot be reduced')], correct: 0,
      explain: L(R`$y$ va $y'$ yo‘q, eng kichik hosila $y''$: $z=y''$ bilan tartib 1 ga tushadi.`, R`Нет $y$ и $y'$, младшая производная $y''$: замена $z=y''$ даёт первый порядок.`, R`No $y$ or $y'$; the lowest derivative is $y''$, so $z=y''$ gives first order.`),
      why: [null, L(R`Tenglamada $x$ bor.`, R`В уравнении есть $x$.`, R`$x$ appears in the equation.`), L('Bu almashtirish bu yerda maqsadga olib kelmaydi.', 'Эта замена здесь ничего не даёт.', 'That substitution does not help here.'), L(R`$y,y'$ yo‘qligi pasaytirishga imkon beradi.`, R`Отсутствие $y,y'$ позволяет понизить порядок.`, R`The absence of $y,y'$ allows reduction.`)] },
    { id: 't06.q4', q: L(R`$y\,y''=(y')^2$ ning umumiy yechimi:`, R`Общее решение $y\,y''=(y')^2$:`, R`The general solution of $y\,y''=(y')^2$ is:`),
      options: [L(R`$y=C_2e^{C_1x}$`, R`$y=C_2e^{C_1x}$`, R`$y=C_2e^{C_1x}$`), L(R`$y=C_1x+C_2$`, R`$y=C_1x+C_2$`, R`$y=C_1x+C_2$`), L(R`$y=C_1e^x+C_2e^{-x}$`, R`$y=C_1e^x+C_2e^{-x}$`, R`$y=C_1e^x+C_2e^{-x}$`), L(R`$y=C_1\ln x+C_2$`, R`$y=C_1\ln x+C_2$`, R`$y=C_1\ln x+C_2$`)], correct: 0,
      explain: L(R`$y'=yz$: $y^2(z'+z^2)=y^2z^2\Rightarrow z'=0$, $z=C_1$, $y=C_2e^{C_1x}$.`, R`$y'=yz$: $y^2(z'+z^2)=y^2z^2\Rightarrow z'=0$, $z=C_1$, $y=C_2e^{C_1x}$.`, R`$y'=yz$: $y^2(z'+z^2)=y^2z^2\Rightarrow z'=0$, $z=C_1$, $y=C_2e^{C_1x}$.`),
      why: [null, L(R`$y''=0$, lekin $(y')^2=C_1^2\ne0$.`, R`$y''=0$, но $(y')^2=C_1^2\ne0$.`, R`$y''=0$ but $(y')^2=C_1^2\ne0$.`), L(R`Masalan, $C_1=C_2=1$: $y=2\cosh x$, $yy''=4\cosh^2x\ne4\sinh^2x$.`, R`Например, $C_1=C_2=1$: $y=2\cosh x$, $yy''=4\cosh^2x\ne4\sinh^2x$.`, R`E.g. $C_1=C_2=1$: $y=2\cosh x$, $yy''=4\cosh^2x\ne4\sinh^2x$.`), L(R`Bu $xy''+y'=0$ ning yechimi.`, R`Это решение $xy''+y'=0$.`, R`That solves $xy''+y'=0$.`)] },
    { id: 't06.q5', q: L(R`$x^3y''=(xy'-y)^2$ tenglamaning umumlashgan bir jinslilik ko‘rsatkichi $m$:`, R`Показатель обобщённой однородности $m$ уравнения $x^3y''=(xy'-y)^2$:`, R`The generalised-homogeneity exponent $m$ of $x^3y''=(xy'-y)^2$ is:`),
      options: [L('1', '1', '1'), L('2', '2', '2'), L('0', '0', '0'), L('−1', '−1', '−1')], correct: 0,
      explain: L(R`$3+m-2=2m\Rightarrow m=1$.`, R`$3+m-2=2m\Rightarrow m=1$.`, R`$3+m-2=2m\Rightarrow m=1$.`),
      why: [null, L(R`$m=2$: chap $3$, o‘ng $4$ — teng emas.`, R`$m=2$: слева $3$, справа $4$ — не равны.`, R`$m=2$: left $3$, right $4$; not equal.`), L(R`$m=0$: chap $1$, o‘ng $0$.`, R`$m=0$: слева $1$, справа $0$.`, R`$m=0$: left $1$, right $0$.`), L(R`$m=-1$ — $y''=2y^3$ uchun javob.`, R`$m=-1$ — ответ для $y''=2y^3$.`, R`$m=-1$ is the answer for $y''=2y^3$.`)] },
    { id: 't06.q6', q: L(R`$y''=2y^3$ tenglama:`, R`Уравнение $y''=2y^3$:`, R`The equation $y''=2y^3$:`),
      options: [L(R`$x$ ni o‘z ichiga olmaydi va $m=-1$ bilan umumlashgan bir jinsli`, R`не содержит $x$ и обобщённо однородно с $m=-1$`, R`has no $x$ and is generalised homogeneous with $m=-1$`), L('chiziqli', 'линейное', 'linear'), L(R`$y$ ga nisbatan bir jinsli`, R`однородно относительно $y$`, R`homogeneous in $y$`), L('tartibini pasaytirib bo‘lmaydi', 'не допускает понижения порядка', 'admits no reduction of order')], correct: 0,
      explain: L(R`$x$ yo‘q — $p(y)$ ishlaydi; vaznlar $m-2=3m$ dan $m=-1$.`, R`Нет $x$ — работает $p(y)$; веса: $m-2=3m$, $m=-1$.`, R`No $x$, so $p(y)$ works; weights $m-2=3m$ give $m=-1$.`),
      why: [null, L(R`$y^3$ hadi bor.`, R`Есть член $y^3$.`, R`There is a $y^3$ term.`), L(R`$y''$ — 1-daraja, $y^3$ — 3-daraja.`, R`$y''$ — степень 1, $y^3$ — степень 3.`, R`$y''$ has degree 1, $y^3$ degree 3.`), L(R`$y'=p(y)$ tartibni pasaytiradi.`, R`$y'=p(y)$ понижает порядок.`, R`$y'=p(y)$ reduces the order.`)] },
    { id: 't06.q7', q: L(R`$y^{(n)}=f\big(x,y,\dots,y^{(n-1)}\big)$ uchun yagonalikni ta’minlaydigan qo‘shimcha shart:`, R`Дополнительное условие, обеспечивающее единственность для $y^{(n)}=f\big(x,y,\dots,y^{(n-1)}\big)$:`, R`The extra hypothesis that ensures uniqueness for $y^{(n)}=f\big(x,y,\dots,y^{(n-1)}\big)$:`),
      options: [L(R`$f$ ning $y,y',\dots,y^{(n-1)}$ bo‘yicha xususiy hosilalari uzluksiz`, R`непрерывность частных производных $f$ по $y,y',\dots,y^{(n-1)}$`, R`continuity of the partial derivatives of $f$ in $y,y',\dots,y^{(n-1)}$`), L(R`$f$ ning $x$ bo‘yicha hosilasi uzluksiz`, R`непрерывность производной $f$ по $x$`, R`continuity of the derivative of $f$ in $x$`), L(R`$f>0$`, R`$f>0$`, R`$f>0$`), L(R`$f$ ko‘phad`, R`$f$ — многочлен`, R`$f$ is a polynomial`)], correct: 0,
      explain: L(R`Uzluksizlik + noma’lumlar bo‘yicha Lipshits (yoki uzluksiz xususiy hosilalar).`, R`Непрерывность + Липшиц по неизвестным (или непрерывные частные производные).`, R`Continuity plus a Lipschitz condition in the unknowns (or continuous partial derivatives).`),
      why: [null, L(R`$x$ bo‘yicha hosila talab qilinmaydi.`, R`Производная по $x$ не требуется.`, R`No derivative in $x$ is needed.`), L('Ishora ahamiyatsiz.', 'Знак не важен.', 'The sign is irrelevant.'), L('Yetarli, lekin juda tor talab va teoremaning sharti emas.', 'Достаточно, но слишком узко и не является условием теоремы.', 'Sufficient but far too narrow; not the hypothesis of the theorem.')] },
    { id: 't06.q8', q: L(R`$y''=6x$, $y(0)=0$, $y(1)=0$ masala:`, R`Задача $y''=6x$, $y(0)=0$, $y(1)=0$:`, R`The problem $y''=6x$, $y(0)=0$, $y(1)=0$ is:`),
      options: [L('chegaraviy masala', 'краевая задача', 'a boundary value problem'), L('Koshi masalasi', 'задача Коши', 'a Cauchy problem'), L('yechimga ega emas', 'не имеет решения', 'unsolvable'), L('cheksiz ko‘p yechimga ega', 'имеет бесконечно много решений', 'one with infinitely many solutions')], correct: 0,
      explain: L(R`Shartlar ikki nuqtada. Bu yerda yechim yagona: $y=x^3-x$.`, R`Условия в двух точках. Здесь решение единственно: $y=x^3-x$.`, R`Conditions at two points. Here the solution is unique: $y=x^3-x$.`),
      why: [null, L('Koshi masalasida shartlar bitta nuqtada.', 'В задаче Коши условия в одной точке.', 'A Cauchy problem has conditions at one point.'), L(R`$y=x^3-x$ ikkala shartni qanoatlantiradi.`, R`$y=x^3-x$ удовлетворяет обоим условиям.`, R`$y=x^3-x$ satisfies both.`), L(R`$C_2=0$, $1+C_1=0$ — yagona yechim.`, R`$C_2=0$, $1+C_1=0$ — единственное решение.`, R`$C_2=0$, $1+C_1=0$: a unique solution.`)] },
    { id: 't06.q9', q: L(R`$p\,\dfrac{dp}{dy}=f(y)p$ ni $p$ ga bo‘lganda qaysi yechimlar yo‘qolishi mumkin?`, R`Какие решения могут потеряться при делении $p\,\dfrac{dp}{dy}=f(y)p$ на $p$?`, R`Which solutions may be lost when $p\,\dfrac{dp}{dy}=f(y)p$ is divided by $p$?`),
      options: [L(R`$y=\text{const}$`, R`$y=\text{const}$`, R`$y=\text{const}$`), L(R`$y=x$`, R`$y=x$`, R`$y=x$`), L(R`$y=e^x$`, R`$y=e^x$`, R`$y=e^x$`), L('Hech qanday', 'Никакие', 'None')], correct: 0,
      explain: L(R`$p=y'\equiv0\iff y=\text{const}$.`, R`$p=y'\equiv0\iff y=\text{const}$.`, R`$p=y'\equiv0\iff y=\text{const}$.`),
      why: [null, L(R`Uning uchun $p=1\ne0$.`, R`Для неё $p=1\ne0$.`, R`For it $p=1\ne0$.`), L(R`Uning uchun $p=e^x\ne0$.`, R`Для неё $p=e^x\ne0$.`, R`For it $p=e^x\ne0$.`), L(R`$p\equiv0$ holi yo‘qolishi mumkin.`, R`Случай $p\equiv0$ может потеряться.`, R`The case $p\equiv0$ can be lost.`)] },
    { id: 't06.q10', q: L(R`$y'''=f(x)$ uchun Koshi formulasidagi ko‘paytuvchi:`, R`Множитель в формуле Коши для $y'''=f(x)$:`, R`The kernel in Cauchy’s formula for $y'''=f(x)$ is:`),
      options: [L(R`$\dfrac{(x-t)^2}{2}$`, R`$\dfrac{(x-t)^2}{2}$`, R`$\dfrac{(x-t)^2}{2}$`), L(R`$(x-t)^3$`, R`$(x-t)^3$`, R`$(x-t)^3$`), L(R`$\dfrac{(x-t)^3}{6}$`, R`$\dfrac{(x-t)^3}{6}$`, R`$\dfrac{(x-t)^3}{6}$`), L(R`$x-t$`, R`$x-t$`, R`$x-t$`)], correct: 0,
      explain: L(R`$\dfrac{(x-t)^{n-1}}{(n-1)!}$, $n=3$.`, R`$\dfrac{(x-t)^{n-1}}{(n-1)!}$, $n=3$.`, R`$\dfrac{(x-t)^{n-1}}{(n-1)!}$ with $n=3$.`),
      why: [null, L('Daraja va faktorial noto‘g‘ri.', 'Неверны степень и факториал.', 'Wrong power and factorial.'), L(R`Bu $n=4$ uchun.`, R`Это для $n=4$.`, R`That is for $n=4$.`), L(R`Bu $n=2$ uchun.`, R`Это для $n=2$.`, R`That is for $n=2$.`)] }
  ]
});
})();
