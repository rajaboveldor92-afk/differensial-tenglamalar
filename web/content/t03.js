(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't03', num: 3,
  title: L('Bir jinsli va bir jinsliga keltiriladigan tenglamalar', 'Однородные и приводящиеся к однородным уравнения', 'Homogeneous equations and reducible forms'),
  syllabus: { lecture: 'M3', seminar: 'S3', outcomes: ['TN2', 'TN3'], independent: [6] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L(R`Funksiyaning bir jinslilik darajasini aniqlay olasiz va $y'=f(y/x)$ ko‘rinishidagi tenglamani taniy olasiz.`, R`Определять степень однородности функции и распознавать уравнение вида $y'=f(y/x)$.`, R`Find the degree of homogeneity of a function and recognise an equation of the form $y'=f(y/x)$.`),
    L(R`$y=ux$ almashtirish bilan bir jinsli tenglamani ajraladiganga keltirib yecha olasiz va yo‘qolgan $y=u_0x$ yechimlarni topa olasiz.`, R`Решать однородное уравнение заменой $y=ux$, сводя его к уравнению с разделяющимися переменными, и находить потерянные решения $y=u_0x$.`, R`Solve a homogeneous equation with $y=ux$, reducing it to a separable one, and find the lost solutions $y=u_0x$.`),
    L(R`$y'=f\!\left(\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$ tenglamani koordinata boshini ko‘chirish yoki $z=a_1x+b_1y$ almashtirish bilan yecha olasiz.`, R`Решать уравнение $y'=f\!\left(\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$ переносом начала координат или заменой $z=a_1x+b_1y$.`, R`Solve $y'=f\!\left(\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$ by shifting the origin or by $z=a_1x+b_1y$.`),
    L(R`Umumlashgan bir jinsli tenglamani “vaznlar” yordamida taniy olasiz va $y=ux^k$ almashtirishni qo‘llay olasiz.`, R`Распознавать обобщённо однородное уравнение с помощью «весов» и применять замену $y=ux^k$.`, R`Recognise a generalised homogeneous equation using “weights” and apply the substitution $y=ux^k$.`),
    L(R`Ko‘zgu masalasini differensial tenglama sifatida tuzib, parabolik ko‘zgu shaklini keltirib chiqara olasiz.`, R`Составлять дифференциальное уравнение задачи о зеркале и выводить параболическую форму зеркала.`, R`Set up the mirror problem as a differential equation and derive the parabolic shape of the mirror.`)
  ],
  prereqKnowledge: [
    L('O‘zgaruvchilari ajraladigan tenglamalar va yo‘qolgan o‘zgarmas yechimlar (2-mavzu).', 'Уравнения с разделяющимися переменными и потерянные постоянные решения (тема 2).', 'Separable equations and lost constant solutions (topic 2).'),
    L(R`Ko‘paytmaning hosilasi: $(ux)'=u'x+u$.`, R`Производная произведения: $(ux)'=u'x+u$.`, R`The product rule: $(ux)'=u'x+u$.`),
    L(R`Ikki to‘g‘ri chiziqning kesishish nuqtasi (2×2 chiziqli sistema), urinma tenglamasi.`, R`Точка пересечения двух прямых (линейная система 2×2), уравнение касательной.`, R`Intersection of two lines (a 2×2 linear system) and the equation of a tangent line.`)
  ],
  sources: [
    { id: 'dilmurodov', ref: '§2.2', verified: true },
    { id: 'ergashev', ref: '1.3, 1.11', verified: true },
    { id: 'goode', ref: '1.8', verified: true },
    { id: 'filippov', ref: '§4', verified: false },
    { id: 'stepanov', ref: 'Гл. 1', verified: false },
    { id: 'boyce', ref: '§2.2 (problems)', verified: false }
  ],
  labs: ['L03', 'L01'],
  lessons: [
    {
      id: 't03.1',
      title: L('Bir jinsli tenglama va $y=ux$ almashtirish', 'Однородное уравнение и замена $y=ux$', 'Homogeneous equations and the substitution $y=ux$'),
      blocks: [
        { type: 'intro', title: L('Fara va sun’iy yo‘ldosh antennasi', 'Фара и спутниковая антенна', 'A headlight and a satellite dish'),
          body: L(R`Avtomobil farasida lampa bitta nuqtada turadi, lekin yorug‘lik **parallel** dasta bo‘lib chiqadi. Sun’iy yo‘ldosh antennasi esa aksincha: parallel kelgan signalni bitta nuqtaga — qabul qilgichga yig‘adi. Ko‘zgu qanday shaklda bo‘lishi kerak?

Bu masalani yechganda (3-darsda) quyidagi tenglama hosil bo‘ladi:
$$y'=\frac{y}{x+\sqrt{x^2+y^2}}.$$
O‘ng tomonga e’tibor bering: $x$ va $y$ ni bir vaqtda $t$ marta kattalashtirsak, kasr o‘zgarmaydi. Ya’ni javob faqat **$y/x$ nisbatga** bog‘liq — rasmni kattalashtirsak, yo‘nalish maydoni o‘zgarmaydi. Bunday tenglamalar bir jinsli deyiladi va ular bitta almashtirish bilan yechiladi.`,
          R`В фаре автомобиля лампа находится в одной точке, но свет выходит **параллельным** пучком. Спутниковая антенна, наоборот, собирает параллельный сигнал в одну точку — в приёмник. Какой формы должно быть зеркало?

При решении этой задачи (в уроке 3) получается уравнение
$$y'=\frac{y}{x+\sqrt{x^2+y^2}}.$$
Обратите внимание на правую часть: если одновременно увеличить $x$ и $y$ в $t$ раз, дробь не изменится. То есть она зависит только от **отношения $y/x$**: при растяжении картинки поле направлений не меняется. Такие уравнения называются однородными, и они решаются одной заменой.`,
          R`In a car headlight the lamp sits at one point, yet the light leaves as a **parallel** beam. A satellite dish does the opposite: it collects a parallel signal into one point, the receiver. What shape must the mirror have?

Solving this problem (in lesson 3) leads to
$$y'=\frac{y}{x+\sqrt{x^2+y^2}}.$$
Look at the right side: if we scale $x$ and $y$ by the same factor $t$, the fraction does not change. So it depends only on the **ratio $y/x$**: zooming the picture leaves the direction field unchanged. Such equations are called homogeneous, and one substitution solves them.`) },
        { type: 'def', title: L('Bir jinsli funksiya va bir jinsli tenglama', 'Однородная функция и однородное уравнение', 'Homogeneous functions and homogeneous equations'),
          body: L(R`$f(x,y)$ funksiya **$m$-darajali bir jinsli** deyiladi, agar barcha $t>0$ uchun
$$f(tx,ty)=t^m f(x,y).$$
Masalan, $x^2+xy$ — 2-darajali, $\sqrt{x^2+y^2}$ — 1-darajali, $\dfrac{x-y}{x+y}$ — 0-darajali.

$y'=f(x,y)$ tenglama **bir jinsli** deyiladi, agar $f$ 0-darajali bir jinsli bo‘lsa. Bu holda $f(x,y)=f\!\left(1,\frac yx\right)$ ($x>0$), ya’ni tenglama $y'=\varphi\!\left(\frac yx\right)$ ko‘rinishga keladi.

$M(x,y)\,dx+N(x,y)\,dy=0$ tenglama bir jinsli, agar $M$ va $N$ **bir xil** darajali bir jinsli funksiyalar bo‘lsa.`,
          R`Функция $f(x,y)$ называется **однородной степени $m$**, если для всех $t>0$
$$f(tx,ty)=t^m f(x,y).$$
Например, $x^2+xy$ — степени 2, $\sqrt{x^2+y^2}$ — степени 1, $\dfrac{x-y}{x+y}$ — степени 0.

Уравнение $y'=f(x,y)$ называется **однородным**, если $f$ однородна степени 0. Тогда $f(x,y)=f\!\left(1,\frac yx\right)$ ($x>0$), то есть уравнение принимает вид $y'=\varphi\!\left(\frac yx\right)$.

Уравнение $M(x,y)\,dx+N(x,y)\,dy=0$ однородно, если $M$ и $N$ — однородные функции **одной и той же** степени.`,
          R`A function $f(x,y)$ is **homogeneous of degree $m$** if for all $t>0$
$$f(tx,ty)=t^m f(x,y).$$
For example, $x^2+xy$ has degree 2, $\sqrt{x^2+y^2}$ degree 1, and $\dfrac{x-y}{x+y}$ degree 0.

The equation $y'=f(x,y)$ is **homogeneous** if $f$ is homogeneous of degree 0. Then $f(x,y)=f\!\left(1,\frac yx\right)$ ($x>0$), so the equation takes the form $y'=\varphi\!\left(\frac yx\right)$.

The equation $M(x,y)\,dx+N(x,y)\,dy=0$ is homogeneous if $M$ and $N$ are homogeneous of the **same** degree.`) },
        { type: 'thm', title: L(R`$y=ux$ almashtirish`, R`Замена $y=ux$`, R`The substitution $y=ux$`),
          conds: L(R`1. $\varphi(u)$ biror $J$ intervalda uzluksiz;
2. $x$ ning qiymatlari $x=0$ ni o‘z ichiga olmagan intervalda ($x>0$ yoki $x<0$).`,
          R`1. $\varphi(u)$ непрерывна на некотором интервале $J$;
2. $x$ меняется на интервале, не содержащем $x=0$ ($x>0$ или $x<0$).`,
          R`1. $\varphi(u)$ is continuous on some interval $J$;
2. $x$ ranges over an interval not containing $x=0$ ($x>0$ or $x<0$).`),
          body: L(R`U holda $y=u(x)\,x$ almashtirish $y'=\varphi(y/x)$ tenglamani o‘zgaruvchilari ajraladigan tenglamaga keltiradi:
$$x\,u'=\varphi(u)-u,\qquad \int\frac{du}{\varphi(u)-u}=\ln|x|+C.$$
$\varphi(u_0)=u_0$ tenglamaning har bir ildizi $u_0$ **to‘g‘ri chiziqli yechim** $y=u_0x$ ni beradi; u $\varphi(u)-u$ ga bo‘lganda yo‘qoladi.`,
          R`Тогда замена $y=u(x)\,x$ сводит уравнение $y'=\varphi(y/x)$ к уравнению с разделяющимися переменными:
$$x\,u'=\varphi(u)-u,\qquad \int\frac{du}{\varphi(u)-u}=\ln|x|+C.$$
Каждый корень $u_0$ уравнения $\varphi(u_0)=u_0$ даёт **решение-прямую** $y=u_0x$; при делении на $\varphi(u)-u$ оно теряется.`,
          R`Then the substitution $y=u(x)\,x$ turns $y'=\varphi(y/x)$ into a separable equation:
$$x\,u'=\varphi(u)-u,\qquad \int\frac{du}{\varphi(u)-u}=\ln|x|+C.$$
Each root $u_0$ of $\varphi(u_0)=u_0$ gives a **straight-line solution** $y=u_0x$; dividing by $\varphi(u)-u$ loses it.`) },
        { type: 'proof', body: L(R`$y=ux$ dan ko‘paytmaning hosilasi bo‘yicha $y'=u'x+u$. Tenglamaga qo‘ysak, $u'x+u=\varphi(u)$, ya’ni $u'=\dfrac{\varphi(u)-u}{x}$ — bu $f(x)g(u)$ ko‘rinishdagi o‘ng tomon ($f=1/x$, $g=\varphi(u)-u$). 2-mavzudagi teorema shu tenglamaga qo‘llaniladi (Dilmuradov, §2.2).`,
          R`Из $y=ux$ по правилу произведения $y'=u'x+u$. Подставляя, получаем $u'x+u=\varphi(u)$, то есть $u'=\dfrac{\varphi(u)-u}{x}$ — правая часть вида $f(x)g(u)$ ($f=1/x$, $g=\varphi(u)-u$). К нему применима теорема из темы 2 (Дилмурадов, §2.2).`,
          R`From $y=ux$ the product rule gives $y'=u'x+u$. Substituting, $u'x+u=\varphi(u)$, i.e. $u'=\dfrac{\varphi(u)-u}{x}$, a right side of the form $f(x)g(u)$ with $f=1/x$, $g=\varphi(u)-u$. The theorem of topic 2 applies (Dilmuradov, §2.2).`) },
        { type: 'example', title: L(R`$y'=\dfrac{x^2+y^2}{xy}$`, R`$y'=\dfrac{x^2+y^2}{xy}$`, R`$y'=\dfrac{x^2+y^2}{xy}$`),
          body: L(R`Umumiy yechimni toping ($x>0$, $y>0$).`, R`Найдите общее решение ($x>0$, $y>0$).`, R`Find the general solution ($x>0$, $y>0$).`),
          steps: [
            L(R`Surat va maxraj 2-darajali, demak tenglama bir jinsli: $\varphi(u)=\dfrac{1+u^2}{u}=\dfrac1u+u$.`, R`Числитель и знаменатель степени 2, уравнение однородно: $\varphi(u)=\dfrac{1+u^2}{u}=\dfrac1u+u$.`, R`Numerator and denominator have degree 2, so the equation is homogeneous: $\varphi(u)=\dfrac{1+u^2}{u}=\dfrac1u+u$.`),
            L(R`$y=ux$: $u'x+u=\dfrac1u+u$, ya’ni $x\,u'=\dfrac1u$. $\varphi(u)-u=\frac1u\ne0$ — to‘g‘ri chiziqli yechim yo‘q.`, R`$y=ux$: $u'x+u=\dfrac1u+u$, то есть $x\,u'=\dfrac1u$. $\varphi(u)-u=\frac1u\ne0$ — решений-прямых нет.`, R`$y=ux$: $u'x+u=\dfrac1u+u$, i.e. $x\,u'=\dfrac1u$. $\varphi(u)-u=\frac1u\ne0$, so there is no straight-line solution.`),
            L(R`Ajratamiz: $u\,du=\dfrac{dx}{x}$, $\dfrac{u^2}{2}=\ln x+C_1$.`, R`Разделяем: $u\,du=\dfrac{dx}{x}$, $\dfrac{u^2}{2}=\ln x+C_1$.`, R`Separate: $u\,du=\dfrac{dx}{x}$, $\dfrac{u^2}{2}=\ln x+C_1$.`),
            L(R`$u=y/x$ ni qaytaramiz: $y^2=x^2(2\ln x+C)$, ya’ni $y=x\sqrt{2\ln x+C}$.`, R`Возвращаем $u=y/x$: $y^2=x^2(2\ln x+C)$, то есть $y=x\sqrt{2\ln x+C}$.`, R`Put back $u=y/x$: $y^2=x^2(2\ln x+C)$, i.e. $y=x\sqrt{2\ln x+C}$.`)
          ],
          check: L(R`$y=x\sqrt{s}$, $s=2\ln x+C$: $y'=\sqrt s+\dfrac{1}{\sqrt s}$; $\dfrac{x^2+y^2}{xy}=\dfrac{1+s}{\sqrt s}=\dfrac1{\sqrt s}+\sqrt s$ ✓.`, R`$y=x\sqrt{s}$, $s=2\ln x+C$: $y'=\sqrt s+\dfrac{1}{\sqrt s}$; $\dfrac{x^2+y^2}{xy}=\dfrac{1+s}{\sqrt s}=\dfrac1{\sqrt s}+\sqrt s$ ✓.`, R`$y=x\sqrt{s}$, $s=2\ln x+C$: $y'=\sqrt s+\dfrac{1}{\sqrt s}$; $\dfrac{x^2+y^2}{xy}=\dfrac{1+s}{\sqrt s}=\dfrac1{\sqrt s}+\sqrt s$ ✓.`) },
        { type: 'example', title: L('Koshi masalasi va yo‘qolgan to‘g‘ri chiziqlar', 'Задача Коши и потерянные прямые', 'A Cauchy problem and lost straight lines'),
          body: L(R`$x\,y'=y+x\cos^2\dfrac yx$, $y(1)=\dfrac\pi4$.`, R`$x\,y'=y+x\cos^2\dfrac yx$, $y(1)=\dfrac\pi4$.`, R`$x\,y'=y+x\cos^2\dfrac yx$, $y(1)=\dfrac\pi4$.`),
          steps: [
            L(R`$x$ ga bo‘lamiz: $y'=\dfrac yx+\cos^2\dfrac yx$, $\varphi(u)=u+\cos^2u$. $y=ux$: $x\,u'=\cos^2u$.`, R`Делим на $x$: $y'=\dfrac yx+\cos^2\dfrac yx$, $\varphi(u)=u+\cos^2u$. $y=ux$: $x\,u'=\cos^2u$.`, R`Divide by $x$: $y'=\dfrac yx+\cos^2\dfrac yx$, $\varphi(u)=u+\cos^2u$. With $y=ux$: $x\,u'=\cos^2u$.`),
            L(R`$\cos u_0=0$: $u_0=\frac\pi2+k\pi$, ya’ni $y=\left(\frac\pi2+k\pi\right)x$ — to‘g‘ri chiziqli yechimlar.`, R`$\cos u_0=0$: $u_0=\frac\pi2+k\pi$, то есть $y=\left(\frac\pi2+k\pi\right)x$ — решения-прямые.`, R`$\cos u_0=0$: $u_0=\frac\pi2+k\pi$, i.e. $y=\left(\frac\pi2+k\pi\right)x$ are straight-line solutions.`),
            L(R`Qolganlari: $\dfrac{du}{\cos^2u}=\dfrac{dx}{x}$, $\tan u=\ln|x|+C$, $y=x\arctan(\ln|x|+C)$.`, R`Остальные: $\dfrac{du}{\cos^2u}=\dfrac{dx}{x}$, $\tan u=\ln|x|+C$, $y=x\arctan(\ln|x|+C)$.`, R`The rest: $\dfrac{du}{\cos^2u}=\dfrac{dx}{x}$, $\tan u=\ln|x|+C$, $y=x\arctan(\ln|x|+C)$.`),
            L(R`$y(1)=\frac\pi4$: $u(1)=\frac\pi4$, $\tan\frac\pi4=1=C$. Javob: $y=x\arctan(1+\ln x)$, $x>0$.`, R`$y(1)=\frac\pi4$: $u(1)=\frac\pi4$, $\tan\frac\pi4=1=C$. Ответ: $y=x\arctan(1+\ln x)$, $x>0$.`, R`$y(1)=\frac\pi4$: $u(1)=\frac\pi4$, $\tan\frac\pi4=1=C$. Answer: $y=x\arctan(1+\ln x)$, $x>0$.`)
          ],
          check: L(R`$u=\arctan(1+\ln x)$: $xu'=\dfrac{1}{1+(1+\ln x)^2}=\cos^2u$ ✓; $y(1)=\arctan1=\frac\pi4$ ✓.`, R`$u=\arctan(1+\ln x)$: $xu'=\dfrac{1}{1+(1+\ln x)^2}=\cos^2u$ ✓; $y(1)=\arctan1=\frac\pi4$ ✓.`, R`$u=\arctan(1+\ln x)$: $xu'=\dfrac{1}{1+(1+\ln x)^2}=\cos^2u$ ✓; $y(1)=\arctan1=\frac\pi4$ ✓.`) },
        { type: 'warn', body: L(R`“Bir jinsli” so‘zining **ikki ma’nosi**: bu mavzuda — $y'=\varphi(y/x)$ (o‘zgaruvchilariga nisbatan bir jinsli); 4- va 7–8-mavzularda — o‘ng tomoni nol bo‘lgan **chiziqli** tenglama ($y'+p(x)y=0$, $y''+y=0$). Masalan, $y'+y=0$ ikkinchi ma’noda bir jinsli, lekin birinchi ma’noda emas.

Almashtirishda **$y'=u'x+u$**, $y'=u'$ emas. $x=0$ — tenglama aniqlanmagan chiziq; yechimni $x>0$ yoki $x<0$ da alohida yozing.`,
          R`У слова «однородное» **два смысла**: в этой теме — $y'=\varphi(y/x)$ (однородное относительно переменных); в темах 4 и 7–8 — **линейное** уравнение с нулевой правой частью ($y'+p(x)y=0$, $y''+y=0$). Например, $y'+y=0$ однородно во втором смысле, но не в первом.

При замене **$y'=u'x+u$**, а не $y'=u'$. Прямая $x=0$ — там уравнение не определено; решения записывайте отдельно при $x>0$ или $x<0$.`,
          R`The word “homogeneous” has **two meanings**: here it means $y'=\varphi(y/x)$ (homogeneous in the variables); in topics 4 and 7–8 it means a **linear** equation with zero right side ($y'+p(x)y=0$, $y''+y=0$). For example, $y'+y=0$ is homogeneous in the second sense but not in the first.

With the substitution, **$y'=u'x+u$**, not $y'=u'$. The line $x=0$ is where the equation is undefined; write solutions separately for $x>0$ or $x<0$.`) }
      ]
    },
    {
      id: 't03.2',
      title: L('Bir jinsliga keltiriladigan va umumlashgan bir jinsli tenglamalar', 'Приводящиеся к однородным и обобщённо однородные уравнения', 'Reducible and generalised homogeneous equations'),
      blocks: [
        { type: 'def', title: L(R`$y'=f\!\left(\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$ tenglama`, R`Уравнение $y'=f\!\left(\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$`, R`The equation $y'=f\!\left(\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$`),
          body: L(R`$\Delta=a_1b_2-a_2b_1$ ni hisoblaymiz.

- **$\Delta\ne0$.** $a_1x+b_1y+c_1=0$ va $a_2x+b_2y+c_2=0$ to‘g‘ri chiziqlar bitta $(x_0,y_0)$ nuqtada kesishadi. $x=X+x_0$, $y=Y+y_0$ (koordinata boshini shu nuqtaga ko‘chirish) ozod hadlarni yo‘qotadi:
$$\frac{dY}{dX}=f\!\left(\frac{a_1X+b_1Y}{a_2X+b_2Y}\right)$$ — bu bir jinsli tenglama.
- **$\Delta=0$.** To‘g‘ri chiziqlar parallel: $a_2x+b_2y=\lambda(a_1x+b_1y)$. $z=a_1x+b_1y$ almashtirish ($b_1\ne0$) tenglamani ajraladiganga keltiradi (2-mavzu).`,
          R`Вычисляем $\Delta=a_1b_2-a_2b_1$.

- **$\Delta\ne0$.** Прямые $a_1x+b_1y+c_1=0$ и $a_2x+b_2y+c_2=0$ пересекаются в точке $(x_0,y_0)$. Замена $x=X+x_0$, $y=Y+y_0$ (перенос начала координат) убирает свободные члены:
$$\frac{dY}{dX}=f\!\left(\frac{a_1X+b_1Y}{a_2X+b_2Y}\right)$$ — однородное уравнение.
- **$\Delta=0$.** Прямые параллельны: $a_2x+b_2y=\lambda(a_1x+b_1y)$. Замена $z=a_1x+b_1y$ ($b_1\ne0$) даёт уравнение с разделяющимися переменными (тема 2).`,
          R`Compute $\Delta=a_1b_2-a_2b_1$.

- **$\Delta\ne0$.** The lines $a_1x+b_1y+c_1=0$ and $a_2x+b_2y+c_2=0$ meet at one point $(x_0,y_0)$. The shift $x=X+x_0$, $y=Y+y_0$ (moving the origin there) removes the constant terms:
$$\frac{dY}{dX}=f\!\left(\frac{a_1X+b_1Y}{a_2X+b_2Y}\right),$$ a homogeneous equation.
- **$\Delta=0$.** The lines are parallel: $a_2x+b_2y=\lambda(a_1x+b_1y)$. The substitution $z=a_1x+b_1y$ ($b_1\ne0$) gives a separable equation (topic 2).`) },
        { type: 'example', title: L(R`$\Delta\ne0$: logarifmik spirallar`, R`$\Delta\ne0$: логарифмические спирали`, R`$\Delta\ne0$: logarithmic spirals`),
          body: L(R`$y'=\dfrac{x+y-2}{x-y}$ tenglamaning umumiy integralini toping.`, R`Найдите общий интеграл уравнения $y'=\dfrac{x+y-2}{x-y}$.`, R`Find the general integral of $y'=\dfrac{x+y-2}{x-y}$.`),
          steps: [
            L(R`$\Delta=1\cdot(-1)-1\cdot1=-2\ne0$. $x+y=2$, $x-y=0$ dan $(x_0,y_0)=(1,1)$.`, R`$\Delta=1\cdot(-1)-1\cdot1=-2\ne0$. Из $x+y=2$, $x-y=0$: $(x_0,y_0)=(1,1)$.`, R`$\Delta=1\cdot(-1)-1\cdot1=-2\ne0$. From $x+y=2$, $x-y=0$: $(x_0,y_0)=(1,1)$.`),
            L(R`$x=X+1$, $y=Y+1$: $\dfrac{dY}{dX}=\dfrac{X+Y}{X-Y}$. $Y=uX$: $X\,u'=\dfrac{1+u}{1-u}-u=\dfrac{1+u^2}{1-u}$.`, R`$x=X+1$, $y=Y+1$: $\dfrac{dY}{dX}=\dfrac{X+Y}{X-Y}$. $Y=uX$: $X\,u'=\dfrac{1+u}{1-u}-u=\dfrac{1+u^2}{1-u}$.`, R`$x=X+1$, $y=Y+1$: $\dfrac{dY}{dX}=\dfrac{X+Y}{X-Y}$. $Y=uX$: $X\,u'=\dfrac{1+u}{1-u}-u=\dfrac{1+u^2}{1-u}$.`),
            L(R`Ajratamiz: $\dfrac{(1-u)\,du}{1+u^2}=\dfrac{dX}{X}$, $\arctan u-\frac12\ln(1+u^2)=\ln|X|+C$.`, R`Разделяем: $\dfrac{(1-u)\,du}{1+u^2}=\dfrac{dX}{X}$, $\arctan u-\frac12\ln(1+u^2)=\ln|X|+C$.`, R`Separate: $\dfrac{(1-u)\,du}{1+u^2}=\dfrac{dX}{X}$, $\arctan u-\frac12\ln(1+u^2)=\ln|X|+C$.`),
            L(R`$\ln|X|+\frac12\ln(1+u^2)=\frac12\ln(X^2+Y^2)$. Javob: $\arctan\dfrac{y-1}{x-1}-\frac12\ln\big((x-1)^2+(y-1)^2\big)=C$. Qutb koordinatalarida $\rho=Ce^{\theta}$ — $(1,1)$ atrofidagi spirallar.`, R`$\ln|X|+\frac12\ln(1+u^2)=\frac12\ln(X^2+Y^2)$. Ответ: $\arctan\dfrac{y-1}{x-1}-\frac12\ln\big((x-1)^2+(y-1)^2\big)=C$. В полярных координатах $\rho=Ce^{\theta}$ — спирали вокруг $(1,1)$.`, R`$\ln|X|+\frac12\ln(1+u^2)=\frac12\ln(X^2+Y^2)$. Answer: $\arctan\dfrac{y-1}{x-1}-\frac12\ln\big((x-1)^2+(y-1)^2\big)=C$. In polar coordinates $\rho=Ce^{\theta}$: spirals around $(1,1)$.`)
          ],
          check: L(R`$F=\arctan\frac{y-1}{x-1}-\frac12\ln\big((x-1)^2+(y-1)^2\big)$: $-F_x/F_y=\dfrac{x+y-2}{x-y}$ ✓.`, R`$F=\arctan\frac{y-1}{x-1}-\frac12\ln\big((x-1)^2+(y-1)^2\big)$: $-F_x/F_y=\dfrac{x+y-2}{x-y}$ ✓.`, R`$F=\arctan\frac{y-1}{x-1}-\frac12\ln\big((x-1)^2+(y-1)^2\big)$: $-F_x/F_y=\dfrac{x+y-2}{x-y}$ ✓.`) },
        { type: 'example', title: L(R`$\Delta=0$: parallel to‘g‘ri chiziqlar`, R`$\Delta=0$: параллельные прямые`, R`$\Delta=0$: parallel lines`),
          body: L(R`$y'=\dfrac{x+y+1}{2x+2y-1}$ tenglamani yeching.`, R`Решите уравнение $y'=\dfrac{x+y+1}{2x+2y-1}$.`, R`Solve $y'=\dfrac{x+y+1}{2x+2y-1}$.`),
          steps: [
            L(R`$\Delta=1\cdot2-2\cdot1=0$: maxraj $2(x+y)-1$. $z=x+y$, $z'=1+y'=1+\dfrac{z+1}{2z-1}=\dfrac{3z}{2z-1}$.`, R`$\Delta=1\cdot2-2\cdot1=0$: знаменатель $2(x+y)-1$. $z=x+y$, $z'=1+y'=1+\dfrac{z+1}{2z-1}=\dfrac{3z}{2z-1}$.`, R`$\Delta=1\cdot2-2\cdot1=0$: the denominator is $2(x+y)-1$. $z=x+y$, $z'=1+y'=1+\dfrac{z+1}{2z-1}=\dfrac{3z}{2z-1}$.`),
            L(R`$z\equiv0$, ya’ni $y=-x$ — yechim: $y'=-1$, $\dfrac{0+1}{0-1}=-1$ ✓.`, R`$z\equiv0$, то есть $y=-x$ — решение: $y'=-1$, $\dfrac{0+1}{0-1}=-1$ ✓.`, R`$z\equiv0$, i.e. $y=-x$, is a solution: $y'=-1$ and $\dfrac{0+1}{0-1}=-1$ ✓.`),
            L(R`Qolganlari: $\dfrac{2z-1}{3z}dz=dx$, $\dfrac23z-\dfrac13\ln|z|=x+C_1$.`, R`Остальные: $\dfrac{2z-1}{3z}dz=dx$, $\dfrac23z-\dfrac13\ln|z|=x+C_1$.`, R`The rest: $\dfrac{2z-1}{3z}dz=dx$, $\dfrac23z-\dfrac13\ln|z|=x+C_1$.`),
            L(R`3 ga ko‘paytirib, $z=x+y$ ni qo‘yamiz: $2y-x-\ln|x+y|=C$; yana $y=-x$.`, R`Умножаем на 3 и подставляем $z=x+y$: $2y-x-\ln|x+y|=C$; и ещё $y=-x$.`, R`Multiply by 3 and put $z=x+y$: $2y-x-\ln|x+y|=C$; plus $y=-x$.`)
          ],
          check: L(R`$F=2y-x-\ln|x+y|$: $F_x=-1-\frac1{x+y}$, $F_y=2-\frac1{x+y}$, $-F_x/F_y=\dfrac{x+y+1}{2x+2y-1}$ ✓.`, R`$F=2y-x-\ln|x+y|$: $F_x=-1-\frac1{x+y}$, $F_y=2-\frac1{x+y}$, $-F_x/F_y=\dfrac{x+y+1}{2x+2y-1}$ ✓.`, R`$F=2y-x-\ln|x+y|$: $F_x=-1-\frac1{x+y}$, $F_y=2-\frac1{x+y}$, $-F_x/F_y=\dfrac{x+y+1}{2x+2y-1}$ ✓.`) },
        { type: 'def', title: L('Umumlashgan bir jinsli tenglama', 'Обобщённо однородное уравнение', 'Generalised homogeneous equation'),
          body: L(R`Har bir hadga “vazn” beramiz: $x$ — vazni $1$, $y$ — vazni $k$, $y'$ — vazni $k-1$ (chunki $y'\sim y/x$). Ko‘paytmaning vazni — vaznlar yig‘indisi, masalan $x^2y^3$ ning vazni $2+3k$.

Agar biror $k$ da tenglamaning **barcha hadlari bir xil vaznga** ega bo‘lsa, tenglama **umumlashgan bir jinsli** deyiladi. $y=z^k$ almashtirish uni $(x,z)$ ga nisbatan bir jinsli tenglamaga keltiradi. Amalda qulayroq: $y=u\,x^k$ — u darhol $x\,u'=\psi(u)$ ko‘rinishdagi ajraladigan tenglamani beradi.

$k=1$ da oddiy bir jinsli tenglama hosil bo‘ladi.`,
          R`Припишем каждому множителю «вес»: $x$ — вес $1$, $y$ — вес $k$, $y'$ — вес $k-1$ (так как $y'\sim y/x$). Вес произведения — сумма весов, например вес $x^2y^3$ равен $2+3k$.

Если при некотором $k$ **все члены уравнения имеют одинаковый вес**, уравнение называется **обобщённо однородным**. Замена $y=z^k$ приводит его к однородному относительно $(x,z)$. На практике удобнее $y=u\,x^k$ — она сразу даёт уравнение с разделяющимися переменными вида $x\,u'=\psi(u)$.

При $k=1$ получаем обычное однородное уравнение.`,
          R`Give every factor a “weight”: $x$ has weight $1$, $y$ has weight $k$, $y'$ has weight $k-1$ (since $y'\sim y/x$). A product has the sum of the weights, e.g. $x^2y^3$ has weight $2+3k$.

If for some $k$ **all terms of the equation have the same weight**, the equation is **generalised homogeneous**. The substitution $y=z^k$ makes it homogeneous in $(x,z)$. In practice $y=u\,x^k$ is handier: it gives at once a separable equation of the form $x\,u'=\psi(u)$.

For $k=1$ we get an ordinary homogeneous equation.`) },
        { type: 'example', title: L('Vaznlarni tenglashtirish', 'Уравниваем веса', 'Balancing the weights'),
          body: L(R`$y'=\dfrac{y^2}{x^3}+\dfrac{2y}{x}+x$ tenglamani yeching ($x>0$).`, R`Решите уравнение $y'=\dfrac{y^2}{x^3}+\dfrac{2y}{x}+x$ ($x>0$).`, R`Solve $y'=\dfrac{y^2}{x^3}+\dfrac{2y}{x}+x$ ($x>0$).`),
          steps: [
            L(R`Vaznlar: $y'\to k-1$; $y^2/x^3\to2k-3$; $y/x\to k-1$; $x\to1$. $k-1=2k-3=1$ dan $k=2$ — barcha hadlar tenglashdi.`, R`Веса: $y'\to k-1$; $y^2/x^3\to2k-3$; $y/x\to k-1$; $x\to1$. Из $k-1=2k-3=1$ получаем $k=2$ — все веса равны.`, R`Weights: $y'\to k-1$; $y^2/x^3\to2k-3$; $y/x\to k-1$; $x\to1$. From $k-1=2k-3=1$ we get $k=2$: all weights agree.`),
            L(R`$y=ux^2$: $y'=u'x^2+2ux$. O‘ng tomon: $u^2x+2ux+x$.`, R`$y=ux^2$: $y'=u'x^2+2ux$. Правая часть: $u^2x+2ux+x$.`, R`$y=ux^2$: $y'=u'x^2+2ux$. Right side: $u^2x+2ux+x$.`),
            L(R`Tenglashtiramiz: $u'x^2=(u^2+1)x$, ya’ni $x\,u'=1+u^2$; $\arctan u=\ln x+C$.`, R`Приравниваем: $u'x^2=(u^2+1)x$, то есть $x\,u'=1+u^2$; $\arctan u=\ln x+C$.`, R`Equate: $u'x^2=(u^2+1)x$, i.e. $x\,u'=1+u^2$; $\arctan u=\ln x+C$.`),
            L(R`Javob: $y=x^2\tan(\ln x+C)$.`, R`Ответ: $y=x^2\tan(\ln x+C)$.`, R`Answer: $y=x^2\tan(\ln x+C)$.`)
          ],
          check: L(R`$y=x^2\tan s$, $s=\ln x+C$: $y'=2x\tan s+x\sec^2s$; o‘ng tomon $x\tan^2s+2x\tan s+x=2x\tan s+x\sec^2s$ ✓.`, R`$y=x^2\tan s$, $s=\ln x+C$: $y'=2x\tan s+x\sec^2s$; правая часть $x\tan^2s+2x\tan s+x=2x\tan s+x\sec^2s$ ✓.`, R`$y=x^2\tan s$, $s=\ln x+C$: $y'=2x\tan s+x\sec^2s$; right side $x\tan^2s+2x\tan s+x=2x\tan s+x\sec^2s$ ✓.`) },
        { type: 'lab', lab: 'L03', body: L(R`“Usulni tanlash” laboratoriyasida tenglamani kiriting: dastur $f(tx,ty)$ ni tekshiradi, $\Delta$ ni hisoblaydi va qaysi almashtirish ($y=ux$, ko‘chirish yoki $z=a_1x+b_1y$) kerakligini aytadi.`, R`В лаборатории «Выбор метода» введите уравнение: программа проверит $f(tx,ty)$, вычислит $\Delta$ и подскажет нужную замену ($y=ux$, перенос или $z=a_1x+b_1y$).`, R`In the “method chooser” lab, enter an equation: it tests $f(tx,ty)$, computes $\Delta$ and tells you which substitution to use ($y=ux$, a shift, or $z=a_1x+b_1y$).`) }
      ]
    },
    {
      id: 't03.3',
      title: L('Amaliy masala: ko‘zgu shakli', 'Прикладная задача: форма зеркала', 'Application: the shape of a mirror'),
      blocks: [
        { type: 'example', title: L('Ko‘zgu masalasi', 'Задача о зеркале', 'The mirror problem'),
          body: L(R`Yorug‘lik manbai $O$ koordinata boshida. $Ox$ o‘qi atrofida aylanish sirti bo‘lgan shunday ko‘zgu topingki, $O$ dan chiqqan har bir nur ko‘zgudan qaytgach $Ox$ ga **parallel** ketsin. Ko‘zguning $xOy$ tekislikdagi kesimi $y=y(x)$, $y>0$ ni qidiramiz.`, R`Источник света $O$ — в начале координат. Найдите зеркало (поверхность вращения вокруг оси $Ox$), отразившись от которого каждый луч из $O$ идёт **параллельно** $Ox$. Ищем сечение зеркала плоскостью $xOy$: $y=y(x)$, $y>0$.`, R`A light source $O$ is at the origin. Find a mirror (a surface of revolution about $Ox$) such that every ray from $O$ leaves the mirror **parallel** to $Ox$. We look for its section by the $xOy$ plane, $y=y(x)$, $y>0$.`),
          steps: [
            L(R`$M(x,y)$ — egri chiziq nuqtasi, $T$ — $M$ dagi urinmaning $Ox$ bilan kesishish nuqtasi. Urinma tenglamasidan $x_T=x-\dfrac{y}{y'}$.`, R`$M(x,y)$ — точка кривой, $T$ — точка пересечения касательной в $M$ с осью $Ox$. Из уравнения касательной $x_T=x-\dfrac{y}{y'}$.`, R`Let $M(x,y)$ be a point of the curve and $T$ the point where the tangent at $M$ meets $Ox$. The tangent line gives $x_T=x-\dfrac{y}{y'}$.`),
            L(R`Qaytish qonuni: tushish burchagi = qaytish burchagi, ya’ni $\angle OMT$ urinma bilan qaytgan nur orasidagi burchakka teng. Qaytgan nur $Ox$ ga parallel, shuning uchun bu burchak $\angle MTO$ ga teng. Demak, $OMT$ uchburchak teng yonli: $OT=OM=\sqrt{x^2+y^2}$.`, R`Закон отражения: угол падения равен углу отражения, то есть $\angle OMT$ равен углу между касательной и отражённым лучом. Отражённый луч параллелен $Ox$, поэтому этот угол равен $\angle MTO$. Значит, треугольник $OMT$ равнобедренный: $OT=OM=\sqrt{x^2+y^2}$.`, R`Law of reflection: the angle of incidence equals the angle of reflection, so $\angle OMT$ equals the angle between the tangent and the reflected ray. The reflected ray is parallel to $Ox$, so that angle equals $\angle MTO$. Hence triangle $OMT$ is isosceles: $OT=OM=\sqrt{x^2+y^2}$.`),
            L(R`$T$ nuqta $O$ dan chapda: $OT=-x_T=\dfrac{y}{y'}-x$. Tenglama: $\dfrac{y}{y'}-x=\sqrt{x^2+y^2}$, ya’ni $$y'=\dfrac{y}{x+\sqrt{x^2+y^2}}$$ — 0-darajali bir jinsli.`, R`Точка $T$ левее $O$: $OT=-x_T=\dfrac{y}{y'}-x$. Уравнение: $\dfrac{y}{y'}-x=\sqrt{x^2+y^2}$, то есть $$y'=\dfrac{y}{x+\sqrt{x^2+y^2}}$$ — однородное степени 0.`, R`$T$ lies to the left of $O$: $OT=-x_T=\dfrac{y}{y'}-x$. The equation: $\dfrac{y}{y'}-x=\sqrt{x^2+y^2}$, i.e. $$y'=\dfrac{y}{x+\sqrt{x^2+y^2}},$$ homogeneous of degree 0.`),
            L(R`$x$ ni $y$ ning funksiyasi deb olish qulay: $\dfrac{dx}{dy}=\dfrac{x+\sqrt{x^2+y^2}}{y}$. $x=vy$: $y\,v'=\sqrt{1+v^2}$, $\dfrac{dv}{\sqrt{1+v^2}}=\dfrac{dy}{y}$.`, R`Удобно считать $x$ функцией от $y$: $\dfrac{dx}{dy}=\dfrac{x+\sqrt{x^2+y^2}}{y}$. $x=vy$: $y\,v'=\sqrt{1+v^2}$, $\dfrac{dv}{\sqrt{1+v^2}}=\dfrac{dy}{y}$.`, R`It is easier to treat $x$ as a function of $y$: $\dfrac{dx}{dy}=\dfrac{x+\sqrt{x^2+y^2}}{y}$. With $x=vy$: $y\,v'=\sqrt{1+v^2}$, $\dfrac{dv}{\sqrt{1+v^2}}=\dfrac{dy}{y}$.`),
            L(R`$\ln\big(v+\sqrt{1+v^2}\big)=\ln\dfrac yC$, ya’ni $x+\sqrt{x^2+y^2}=\dfrac{y^2}{C}$, $C>0$.`, R`$\ln\big(v+\sqrt{1+v^2}\big)=\ln\dfrac yC$, то есть $x+\sqrt{x^2+y^2}=\dfrac{y^2}{C}$, $C>0$.`, R`$\ln\big(v+\sqrt{1+v^2}\big)=\ln\dfrac yC$, i.e. $x+\sqrt{x^2+y^2}=\dfrac{y^2}{C}$, $C>0$.`),
            L(R`$\sqrt{x^2+y^2}=\dfrac{y^2}{C}-x$ ni kvadratga ko‘tarib, $y^2$ ga qisqartiramiz: $$y^2=2Cx+C^2.$$ Bu fokusi $O$ da bo‘lgan **parabola**; ko‘zgu — aylanish paraboloidi $y^2+z^2=2Cx+C^2$.`, R`Возводим $\sqrt{x^2+y^2}=\dfrac{y^2}{C}-x$ в квадрат и сокращаем на $y^2$: $$y^2=2Cx+C^2.$$ Это **парабола** с фокусом в $O$; зеркало — параболоид вращения $y^2+z^2=2Cx+C^2$.`, R`Square $\sqrt{x^2+y^2}=\dfrac{y^2}{C}-x$ and cancel $y^2$: $$y^2=2Cx+C^2.$$ This is a **parabola** with focus $O$; the mirror is the paraboloid of revolution $y^2+z^2=2Cx+C^2$.`)
          ],
          check: L(R`$y^2=2Cx+C^2$: $y'=C/y$; $\sqrt{x^2+y^2}=x+C$, $\dfrac{y}{2x+C}=\dfrac{yC}{y^2}=\dfrac Cy$ ✓ (bir nechta $C>0$ da).`, R`$y^2=2Cx+C^2$: $y'=C/y$; $\sqrt{x^2+y^2}=x+C$, $\dfrac{y}{2x+C}=\dfrac{yC}{y^2}=\dfrac Cy$ ✓ (при нескольких $C>0$).`, R`$y^2=2Cx+C^2$: $y'=C/y$; $\sqrt{x^2+y^2}=x+C$, $\dfrac{y}{2x+C}=\dfrac{yC}{y^2}=\dfrac Cy$ ✓ (for several $C>0$).`) },
        { type: 'note', title: L('Muhandislikda', 'В технике', 'In engineering'),
          body: L(R`Shu xossa tufayli sun’iy yo‘ldosh antennalari, radioteleskoplar, Wi-Fi uchun yo‘naltirilgan antennalar va avtomobil faralari paraboloid shaklida yasaladi: fokusdagi manba parallel dasta beradi, parallel kelgan signal esa fokusda yig‘iladi. Javobda bitta parametr $C$ bor — u paraboloidning “kengligini” belgilaydi, fokus esa doim $O$ da.`,
          R`Благодаря этому свойству спутниковые антенны, радиотелескопы, направленные антенны Wi-Fi и автомобильные фары делают в форме параболоида: источник в фокусе даёт параллельный пучок, а параллельный сигнал собирается в фокусе. В ответе один параметр $C$ — он задаёт «ширину» параболоида, а фокус всегда в $O$.`,
          R`Because of this property, satellite dishes, radio telescopes, directional Wi-Fi antennas and car headlights are paraboloids: a source at the focus gives a parallel beam, and a parallel signal is collected at the focus. The answer has one parameter $C$, which sets the “width” of the paraboloid; the focus is always at $O$.`) },
        { type: 'warn', body: L(R`Geometrik masalada tenglamani tuzishda **ishoralarga** e’tibor bering: $OT$ — uzunlik, $x_T$ esa koordinata; $T$ qaysi tomonda yotishini chizmadan aniqlang. Kvadratga ko‘targanda begona yechim paydo bo‘lishi mumkin — natijani dastlabki tenglamaga qo‘yib tekshiring.`,
          R`При составлении уравнения в геометрической задаче следите за **знаками**: $OT$ — длина, а $x_T$ — координата; с какой стороны лежит $T$, определите по чертежу. Возведение в квадрат может дать посторонние решения — проверяйте ответ подстановкой в исходное уравнение.`,
          R`When setting up a geometric problem, watch the **signs**: $OT$ is a length while $x_T$ is a coordinate; read off from the picture on which side $T$ lies. Squaring can introduce extraneous solutions, so check the result in the original equation.`) },
        { type: 'lab', lab: 'L01', body: L(R`Yo‘nalish maydoni laboratoriyasida $f(x,y)=\dfrac{y}{x+\sqrt{x^2+y^2}}$ ni kiriting va bir nechta nuqtadan integral chiziq o‘tkazing: barcha chiziqlar fokusi $O$ da bo‘lgan parabolalar.`, R`В лаборатории поля направлений введите $f(x,y)=\dfrac{y}{x+\sqrt{x^2+y^2}}$ и проведите интегральные кривые через несколько точек: все они — параболы с фокусом в $O$.`, R`In the direction-field lab, enter $f(x,y)=\dfrac{y}{x+\sqrt{x^2+y^2}}$ and draw integral curves through several points: all of them are parabolas with focus $O$.`) }
      ]
    }
  ],
  mistakes: [
    L(R`$y=ux$ dan $y'=u'$ deb yozish. To‘g‘risi: $y'=u'x+u$.`, R`Из $y=ux$ писать $y'=u'$. Правильно: $y'=u'x+u$.`, R`Writing $y'=u'$ from $y=ux$. Correct: $y'=u'x+u$.`),
    L(R`$\varphi(u)-u$ ga bo‘lib, $y=u_0x$ to‘g‘ri chiziqli yechimlarni yo‘qotish.`, R`Делить на $\varphi(u)-u$ и терять решения-прямые $y=u_0x$.`, R`Dividing by $\varphi(u)-u$ and losing the straight-line solutions $y=u_0x$.`),
    L(R`Javobni $u$ orqali qoldirish — oxirida $u=y/x$ ni qaytarish kerak.`, R`Оставлять ответ через $u$ — в конце нужно вернуть $u=y/x$.`, R`Leaving the answer in terms of $u$; at the end put back $u=y/x$.`),
    L(R`$\Delta\ne0$ bo‘lsa ham $z=a_1x+b_1y$ almashtirishni qo‘llash yoki $\Delta=0$ da kesishish nuqtasini qidirish (u yo‘q).`, R`Применять $z=a_1x+b_1y$ при $\Delta\ne0$ или искать точку пересечения при $\Delta=0$ (её нет).`, R`Using $z=a_1x+b_1y$ when $\Delta\ne0$, or looking for an intersection point when $\Delta=0$ (there is none).`),
    L(R`Ko‘chirishdan keyin javobni $X,Y$ da qoldirish: $X=x-x_0$, $Y=y-y_0$ ni qaytaring.`, R`Оставлять ответ в $X,Y$ после переноса: верните $X=x-x_0$, $Y=y-y_0$.`, R`Leaving the answer in $X,Y$ after the shift: put back $X=x-x_0$, $Y=y-y_0$.`),
    L(R`“Bir jinsli” so‘zining ikki ma’nosini aralashtirish: $y'+xy=0$ chiziqli bir jinsli, lekin $y'=f(y/x)$ ko‘rinishida emas.`, R`Путать два смысла слова «однородное»: $y'+xy=0$ — линейное однородное, но не вида $y'=f(y/x)$.`, R`Confusing the two meanings of “homogeneous”: $y'+xy=0$ is linear homogeneous but not of the form $y'=f(y/x)$.`)
  ],
  exercises: [
    { id: 't03.x1', level: 'easy', type: 'mcq',
      q: L('Qaysi tenglama $y\'=f(y/x)$ ma’nosida bir jinsli?', 'Какое уравнение однородно в смысле $y\'=f(y/x)$?', 'Which equation is homogeneous in the sense $y\'=f(y/x)$?'),
      options: [L(R`$y'=\dfrac{x^2-y^2}{xy}$`, R`$y'=\dfrac{x^2-y^2}{xy}$`, R`$y'=\dfrac{x^2-y^2}{xy}$`), L(R`$y'=\dfrac{x+y^2}{x}$`, R`$y'=\dfrac{x+y^2}{x}$`, R`$y'=\dfrac{x+y^2}{x}$`), L(R`$y'+xy=0$`, R`$y'+xy=0$`, R`$y'+xy=0$`), L(R`$y'=x^2+y$`, R`$y'=x^2+y$`, R`$y'=x^2+y$`)], correct: 0,
      explain: L(R`Surat va maxraj ikkalasi 2-darajali: $f(tx,ty)=f(x,y)$.`, R`Числитель и знаменатель степени 2: $f(tx,ty)=f(x,y)$.`, R`Numerator and denominator both have degree 2: $f(tx,ty)=f(x,y)$.`) },
    { id: 't03.x2', level: 'easy', type: 'formula',
      q: L(R`$y'=1+\dfrac yx$ ($x>0$) tenglamaning umumiy yechimini yozing: $y=\ ?$`, R`Запишите общее решение уравнения $y'=1+\dfrac yx$ ($x>0$): $y=\ ?$`, R`Write the general solution of $y'=1+\dfrac yx$ ($x>0$): $y=\ ?$`),
      check: { kind: 'ode', residual: 'yp - 1 - y/x', order: 1, consts: ['C'], x: [0.5, 3] }, answer: 'x*ln(x) + C*x',
      hint: L(R`$y=ux$: $u'x+u=1+u$, ya’ni $x\,u'=1$.`, R`$y=ux$: $u'x+u=1+u$, то есть $x\,u'=1$.`, R`$y=ux$: $u'x+u=1+u$, so $x\,u'=1$.`),
      solution: L(R`$u=\ln x+C$, $y=x\ln x+Cx$.`, R`$u=\ln x+C$, $y=x\ln x+Cx$.`, R`$u=\ln x+C$, $y=x\ln x+Cx$.`) },
    { id: 't03.x3', level: 'mid', type: 'formula',
      q: L(R`$y'=\dfrac yx+\dfrac xy$ ($x>1$, $y>0$) ning umumiy yechimini yozing: $y=\ ?$`, R`Запишите общее решение $y'=\dfrac yx+\dfrac xy$ ($x>1$, $y>0$): $y=\ ?$`, R`Write the general solution of $y'=\dfrac yx+\dfrac xy$ ($x>1$, $y>0$): $y=\ ?$`),
      check: { kind: 'ode', residual: 'yp - y/x - x/y', order: 1, consts: ['C'], x: [1.1, 3], c: [0.5, 2] }, answer: 'x*sqrt(2*ln(x) + C)',
      hint: L(R`$x\,u'=\dfrac1u$.`, R`$x\,u'=\dfrac1u$.`, R`$x\,u'=\dfrac1u$.`),
      solution: L(R`$u\,du=\dfrac{dx}x$, $u^2=2\ln x+C$, $y=x\sqrt{2\ln x+C}$.`, R`$u\,du=\dfrac{dx}x$, $u^2=2\ln x+C$, $y=x\sqrt{2\ln x+C}$.`, R`$u\,du=\dfrac{dx}x$, $u^2=2\ln x+C$, $y=x\sqrt{2\ln x+C}$.`) },
    { id: 't03.x4', level: 'mid', type: 'formula',
      q: L(R`$x\,y'=y+x\,e^{-y/x}$, $y(1)=0$ Koshi masalasini yeching: $y=\ ?$`, R`Решите задачу Коши $x\,y'=y+x\,e^{-y/x}$, $y(1)=0$: $y=\ ?$`, R`Solve the Cauchy problem $x\,y'=y+x\,e^{-y/x}$, $y(1)=0$: $y=\ ?$`),
      check: { kind: 'ode', residual: 'x*yp - y - x*exp(-y/x)', order: 1, consts: [], x: [0.6, 3], ivp: { x0: 1, y0: 0 } }, answer: 'x*ln(1 + ln(x))',
      hint: L(R`$x\,u'=e^{-u}$, $e^u\,du=\dfrac{dx}{x}$.`, R`$x\,u'=e^{-u}$, $e^u\,du=\dfrac{dx}{x}$.`, R`$x\,u'=e^{-u}$, $e^u\,du=\dfrac{dx}{x}$.`),
      solution: L(R`$e^u=\ln x+C$; $u(1)=0\Rightarrow C=1$; $y=x\ln(1+\ln x)$, $x>e^{-1}$.`, R`$e^u=\ln x+C$; $u(1)=0\Rightarrow C=1$; $y=x\ln(1+\ln x)$, $x>e^{-1}$.`, R`$e^u=\ln x+C$; $u(1)=0\Rightarrow C=1$; $y=x\ln(1+\ln x)$, $x>e^{-1}$.`) },
    { id: 't03.x5', level: 'mid', type: 'mcq',
      q: L(R`$y'=\dfrac{x-y+1}{x+y-3}$ tenglamada koordinata boshini qaysi nuqtaga ko‘chirish kerak?`, R`В какую точку нужно перенести начало координат для $y'=\dfrac{x-y+1}{x+y-3}$?`, R`To which point should the origin be moved for $y'=\dfrac{x-y+1}{x+y-3}$?`),
      options: [L(R`$(1,2)$`, R`$(1,2)$`, R`$(1,2)$`), L(R`$(2,1)$`, R`$(2,1)$`, R`$(2,1)$`), L(R`$(-1,3)$`, R`$(-1,3)$`, R`$(-1,3)$`), L(R`$(0,0)$`, R`$(0,0)$`, R`$(0,0)$`)], correct: 0,
      explain: L(R`$x-y=-1$, $x+y=3$ $\Rightarrow$ $x=1$, $y=2$.`, R`$x-y=-1$, $x+y=3$ $\Rightarrow$ $x=1$, $y=2$.`, R`$x-y=-1$, $x+y=3$ $\Rightarrow$ $x=1$, $y=2$.`) },
    { id: 't03.x6', level: 'mid', type: 'finderror',
      q: L(R`Talaba $y'=\dfrac{y}{x}+\dfrac{x}{y}$ ni yechdi. Qaysi qatorda xato?`, R`Студент решал $y'=\dfrac{y}{x}+\dfrac{x}{y}$. В какой строке ошибка?`, R`A student solved $y'=\dfrac{y}{x}+\dfrac{x}{y}$. Which line is wrong?`),
      lines: [
        L(R`$y=ux$`, R`$y=ux$`, R`$y=ux$`),
        L(R`$y'=u'$, demak $u'=u+\dfrac1u$`, R`$y'=u'$, значит $u'=u+\dfrac1u$`, R`$y'=u'$, so $u'=u+\dfrac1u$`),
        L(R`$\dfrac{u\,du}{u^2+1}=dx$`, R`$\dfrac{u\,du}{u^2+1}=dx$`, R`$\dfrac{u\,du}{u^2+1}=dx$`),
        L(R`$\frac12\ln(u^2+1)=x+C$`, R`$\frac12\ln(u^2+1)=x+C$`, R`$\frac12\ln(u^2+1)=x+C$`)
      ],
      wrong: 1,
      explain: L(R`$y=ux$ ko‘paytma: $y'=u'x+u$. To‘g‘risi $x\,u'=\dfrac1u$, javob $y^2=x^2(2\ln|x|+C)$.`, R`$y=ux$ — произведение: $y'=u'x+u$. Правильно $x\,u'=\dfrac1u$, ответ $y^2=x^2(2\ln|x|+C)$.`, R`$y=ux$ is a product: $y'=u'x+u$. Correctly $x\,u'=\dfrac1u$, and the answer is $y^2=x^2(2\ln|x|+C)$.`) },
    { id: 't03.x7', level: 'hard', type: 'formula',
      q: L(R`$y'=\dfrac{x+y-3}{x-y-1}$ tenglamaning umumiy integralini $G(x,y)=C$ ko‘rinishida yozing.`, R`Запишите общий интеграл уравнения $y'=\dfrac{x+y-3}{x-y-1}$ в виде $G(x,y)=C$.`, R`Write the general integral of $y'=\dfrac{x+y-3}{x-y-1}$ as $G(x,y)=C$.`),
      check: { kind: 'integral', ref: 'arctan((y-1)/(x-2)) - ln((x-2)^2+(y-1)^2)/2', x: [2.3, 3.5], y: [1.2, 2.5] }, answer: 'arctan((y-1)/(x-2)) - ln((x-2)^2 + (y-1)^2)/2 = C',
      hint: L(R`Kesishish nuqtasi $(2,1)$. $X=x-2$, $Y=y-1$ dan keyin ishlangan misoldagi tenglama hosil bo‘ladi.`, R`Точка пересечения $(2,1)$. После $X=x-2$, $Y=y-1$ получается уравнение из разобранного примера.`, R`The intersection point is $(2,1)$. After $X=x-2$, $Y=y-1$ you get the equation of the worked example.`),
      solution: L(R`$\dfrac{dY}{dX}=\dfrac{X+Y}{X-Y}$, $\arctan\dfrac YX-\frac12\ln(X^2+Y^2)=C$, ya’ni $\arctan\dfrac{y-1}{x-2}-\frac12\ln\big((x-2)^2+(y-1)^2\big)=C$.`, R`$\dfrac{dY}{dX}=\dfrac{X+Y}{X-Y}$, $\arctan\dfrac YX-\frac12\ln(X^2+Y^2)=C$, то есть $\arctan\dfrac{y-1}{x-2}-\frac12\ln\big((x-2)^2+(y-1)^2\big)=C$.`, R`$\dfrac{dY}{dX}=\dfrac{X+Y}{X-Y}$, $\arctan\dfrac YX-\frac12\ln(X^2+Y^2)=C$, i.e. $\arctan\dfrac{y-1}{x-2}-\frac12\ln\big((x-2)^2+(y-1)^2\big)=C$.`) },
    { id: 't03.x8', level: 'hard', type: 'formula',
      q: L(R`$x^2y'=x^2y^2+xy+1$ ($x>0$) umumlashgan bir jinsli tenglamaning umumiy yechimini yozing: $y=\ ?$`, R`Запишите общее решение обобщённо однородного уравнения $x^2y'=x^2y^2+xy+1$ ($x>0$): $y=\ ?$`, R`Write the general solution of the generalised homogeneous equation $x^2y'=x^2y^2+xy+1$ ($x>0$): $y=\ ?$`),
      check: { kind: 'ode', residual: 'x^2*yp - x^2*y^2 - x*y - 1', order: 1, consts: ['C'], x: [0.6, 3], c: [1.5, 3] }, answer: '-1/x - 1/(x*(ln(x) + C))',
      hint: L(R`Vaznlar: $x^2y'\to k+1$, $x^2y^2\to2k+2$, $xy\to k+1$, $1\to0$. Demak $k=-1$: $y=\dfrac ux$.`, R`Веса: $x^2y'\to k+1$, $x^2y^2\to2k+2$, $xy\to k+1$, $1\to0$. Значит $k=-1$: $y=\dfrac ux$.`, R`Weights: $x^2y'\to k+1$, $x^2y^2\to2k+2$, $xy\to k+1$, $1\to0$. So $k=-1$: $y=\dfrac ux$.`),
      solution: L(R`$y'=\dfrac{u'}{x}-\dfrac{u}{x^2}$: $x\,u'-u=u^2+u+1$, $x\,u'=(u+1)^2$. $-\dfrac1{u+1}=\ln x+C$, $y=-\dfrac1x-\dfrac{1}{x(\ln x+C)}$. Yo‘qolgan yechim: $u=-1$, $y=-\dfrac1x$.`, R`$y'=\dfrac{u'}{x}-\dfrac{u}{x^2}$: $x\,u'-u=u^2+u+1$, $x\,u'=(u+1)^2$. $-\dfrac1{u+1}=\ln x+C$, $y=-\dfrac1x-\dfrac{1}{x(\ln x+C)}$. Потерянное решение: $u=-1$, $y=-\dfrac1x$.`, R`$y'=\dfrac{u'}{x}-\dfrac{u}{x^2}$: $x\,u'-u=u^2+u+1$, $x\,u'=(u+1)^2$. $-\dfrac1{u+1}=\ln x+C$, $y=-\dfrac1x-\dfrac{1}{x(\ln x+C)}$. Lost solution: $u=-1$, $y=-\dfrac1x$.`) },
    { id: 't03.x9', level: 'mid', type: 'order',
      q: L(R`$y'=f\!\left(\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$, $\Delta\ne0$ hol uchun qadamlarni tartiblang.`, R`Упорядочьте шаги для $y'=f\!\left(\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$ при $\Delta\ne0$.`, R`Order the steps for $y'=f\!\left(\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}\right)$ with $\Delta\ne0$.`),
      items: [
        L(R`$\Delta=a_1b_2-a_2b_1\ne0$ ekanini tekshirish`, R`Проверить, что $\Delta=a_1b_2-a_2b_1\ne0$`, R`Check that $\Delta=a_1b_2-a_2b_1\ne0$`),
        L(R`To‘g‘ri chiziqlar kesishish nuqtasi $(x_0,y_0)$ ni topish`, R`Найти точку пересечения прямых $(x_0,y_0)$`, R`Find the intersection point $(x_0,y_0)$ of the lines`),
        L(R`$x=X+x_0$, $y=Y+y_0$ — bir jinsli tenglama hosil bo‘ladi`, R`$x=X+x_0$, $y=Y+y_0$ — получается однородное уравнение`, R`$x=X+x_0$, $y=Y+y_0$ gives a homogeneous equation`),
        L(R`$Y=uX$ va o‘zgaruvchilarni ajratish`, R`$Y=uX$ и разделение переменных`, R`$Y=uX$ and separation of variables`),
        L(R`$u=Y/X$, $X=x-x_0$, $Y=y-y_0$ ni qaytarish`, R`Вернуть $u=Y/X$, $X=x-x_0$, $Y=y-y_0$`, R`Put back $u=Y/X$, $X=x-x_0$, $Y=y-y_0$`)
      ],
      explain: L('Avval tur aniqlanadi, keyin ko‘chirish, keyin bir jinsli tenglama usuli, oxirida eski o‘zgaruvchilar.', 'Сначала тип, потом перенос, потом метод для однородного уравнения, в конце — исходные переменные.', 'First the type, then the shift, then the homogeneous method, finally the original variables.') },
    { id: 't03.x10', level: 'hard', type: 'steps',
      q: L('Ko‘zgu masalasini bosqichma-bosqich tahlil qiling.', 'Пошагово разберите задачу о зеркале.', 'Work through the mirror problem step by step.'),
      steps: [
        { q: L(R`Qaytish qonuni $OMT$ uchburchak haqida nima beradi?`, R`Что даёт закон отражения для треугольника $OMT$?`, R`What does the law of reflection give for triangle $OMT$?`), options: [L(R`Teng yonli: $OT=OM$`, R`Равнобедренный: $OT=OM$`, R`Isosceles: $OT=OM$`), L('To‘g‘ri burchakli', 'Прямоугольный', 'Right-angled'), L('Teng tomonli', 'Равносторонний', 'Equilateral')], correct: 0 },
        { q: L(R`Hosil bo‘lgan tenglama qaysi turga kiradi: $y'=\dfrac{y}{x+\sqrt{x^2+y^2}}$?`, R`К какому типу относится $y'=\dfrac{y}{x+\sqrt{x^2+y^2}}$?`, R`What type is $y'=\dfrac{y}{x+\sqrt{x^2+y^2}}$?`), options: [L('Chiziqli', 'Линейное', 'Linear'), L('0-darajali bir jinsli', 'Однородное степени 0', 'Homogeneous of degree 0'), L('To‘la differensialli', 'В полных дифференциалах', 'Exact')], correct: 1 },
        { q: L(R`Qaysi almashtirish hisobni eng soddalashtiradi?`, R`Какая замена проще всего?`, R`Which substitution makes the computation simplest?`), options: [L(R`$x=vy$ ($x$ — $y$ ning funksiyasi)`, R`$x=vy$ ($x$ — функция от $y$)`, R`$x=vy$ ($x$ as a function of $y$)`), L(R`$z=x+y$`, R`$z=x+y$`, R`$z=x+y$`), L(R`$y=z^2$`, R`$y=z^2$`, R`$y=z^2$`)], correct: 0 },
        { q: L('Natija:', 'Результат:', 'Result:'), options: [L(R`Aylana $x^2+y^2=C^2$`, R`Окружность $x^2+y^2=C^2$`, R`Circle $x^2+y^2=C^2$`), L(R`Parabola $y^2=2Cx+C^2$`, R`Парабола $y^2=2Cx+C^2$`, R`Parabola $y^2=2Cx+C^2$`), L(R`Giperbola $x^2-y^2=C$`, R`Гипербола $x^2-y^2=C$`, R`Hyperbola $x^2-y^2=C$`)], correct: 1 }
      ],
      explain: L(R`Fokusi manbada bo‘lgan parabola nurlarni parallel dastaga aylantiradi; $Ox$ atrofida aylantirsak, paraboloid hosil bo‘ladi.`, R`Парабола с фокусом в источнике превращает лучи в параллельный пучок; вращение вокруг $Ox$ даёт параболоид.`, R`A parabola with focus at the source turns the rays into a parallel beam; rotating about $Ox$ gives a paraboloid.`) },
    { id: 't03.x11', level: 'easy', type: 'match',
      q: L('Tenglamani mos almashtirish bilan moslang.', 'Сопоставьте уравнение и подходящую замену.', 'Match each equation with a suitable substitution.'),
      pairs: [
        { left: L(R`$y'=\dfrac{2xy}{x^2-y^2}$`, R`$y'=\dfrac{2xy}{x^2-y^2}$`, R`$y'=\dfrac{2xy}{x^2-y^2}$`), right: L(R`$y=ux$`, R`$y=ux$`, R`$y=ux$`) },
        { left: L(R`$y'=\dfrac{x+y+1}{x-y+3}$`, R`$y'=\dfrac{x+y+1}{x-y+3}$`, R`$y'=\dfrac{x+y+1}{x-y+3}$`), right: L(R`$x=X-2$, $y=Y+1$`, R`$x=X-2$, $y=Y+1$`, R`$x=X-2$, $y=Y+1$`) },
        { left: L(R`$y'=\dfrac{x-y}{x-y+2}$`, R`$y'=\dfrac{x-y}{x-y+2}$`, R`$y'=\dfrac{x-y}{x-y+2}$`), right: L(R`$z=x-y$`, R`$z=x-y$`, R`$z=x-y$`) },
        { left: L(R`$y'=\dfrac{y^2}{x^3}+\dfrac{2y}{x}+x$`, R`$y'=\dfrac{y^2}{x^3}+\dfrac{2y}{x}+x$`, R`$y'=\dfrac{y^2}{x^3}+\dfrac{2y}{x}+x$`), right: L(R`$y=ux^2$`, R`$y=ux^2$`, R`$y=ux^2$`) }
      ],
      explain: L(R`Ikkinchi tenglamada $x+y+1=0$, $x-y+3=0$ dan $(x_0,y_0)=(-2,1)$; uchinchisida $\Delta=0$.`, R`Во втором уравнении из $x+y+1=0$, $x-y+3=0$ получаем $(x_0,y_0)=(-2,1)$; в третьем $\Delta=0$.`, R`In the second equation $x+y+1=0$, $x-y+3=0$ give $(x_0,y_0)=(-2,1)$; in the third $\Delta=0$.`) }
  ],
  quiz: [
    { id: 't03.q1', q: L(R`Qaysi funksiya 0-darajali bir jinsli?`, R`Какая функция однородна степени 0?`, R`Which function is homogeneous of degree 0?`),
      options: [L(R`$x+y$`, R`$x+y$`, R`$x+y$`), L(R`$\dfrac{x^2+y^2}{xy}$`, R`$\dfrac{x^2+y^2}{xy}$`, R`$\dfrac{x^2+y^2}{xy}$`), L(R`$x^2+y$`, R`$x^2+y$`, R`$x^2+y$`), L(R`$\dfrac{x+1}{y}$`, R`$\dfrac{x+1}{y}$`, R`$\dfrac{x+1}{y}$`)], correct: 1,
      explain: L(R`$\dfrac{t^2(x^2+y^2)}{t^2xy}=\dfrac{x^2+y^2}{xy}$.`, R`$\dfrac{t^2(x^2+y^2)}{t^2xy}=\dfrac{x^2+y^2}{xy}$.`, R`$\dfrac{t^2(x^2+y^2)}{t^2xy}=\dfrac{x^2+y^2}{xy}$.`),
      why: [L('Bu 1-darajali.', 'Это степень 1.', 'That has degree 1.'), null, L(R`$x^2$ va $y$ ning darajalari har xil — bir jinsli emas.`, R`У $x^2$ и $y$ разные степени — не однородна.`, R`$x^2$ and $y$ have different degrees: not homogeneous.`), L(R`$+1$ bir jinslilikni buzadi.`, R`$+1$ нарушает однородность.`, R`The $+1$ breaks homogeneity.`)] },
    { id: 't03.q2', q: L(R`$y=ux$ bo‘lsa, $y'$ teng:`, R`Если $y=ux$, то $y'$ равно:`, R`If $y=ux$, then $y'$ equals:`),
      options: [L(R`$u'$`, R`$u'$`, R`$u'$`), L(R`$u'x+u$`, R`$u'x+u$`, R`$u'x+u$`), L(R`$u'x$`, R`$u'x$`, R`$u'x$`), L(R`$u+x$`, R`$u+x$`, R`$u+x$`)], correct: 1,
      explain: L('Ko‘paytmaning hosilasi.', 'Производная произведения.', 'The product rule.'),
      why: [L(R`$x$ ham o‘zgaradi.`, R`$x$ тоже меняется.`, R`$x$ changes too.`), null, L(R`$u\cdot(x)'=u$ hadi tushib qolgan.`, R`Потерян член $u\cdot(x)'=u$.`, R`The term $u\cdot(x)'=u$ is missing.`), L('Bu hosila emas.', 'Это не производная.', 'That is not a derivative.')] },
    { id: 't03.q3', q: L(R`$x\,y'=y+x\cos^2\dfrac yx$ uchun qaysi funksiya yechim?`, R`Какая функция — решение $x\,y'=y+x\cos^2\dfrac yx$?`, R`Which function solves $x\,y'=y+x\cos^2\dfrac yx$?`),
      options: [L(R`$y=x$`, R`$y=x$`, R`$y=x$`), L(R`$y=\dfrac{\pi}{2}x$`, R`$y=\dfrac{\pi}{2}x$`, R`$y=\dfrac{\pi}{2}x$`), L(R`$y=\pi x$`, R`$y=\pi x$`, R`$y=\pi x$`), L(R`$y=0$`, R`$y=0$`, R`$y=0$`)], correct: 1,
      explain: L(R`$\cos\frac\pi2=0$: $x\cdot\frac\pi2=\frac\pi2x+0$ ✓ — bo‘lishda yo‘qolgan to‘g‘ri chiziq.`, R`$\cos\frac\pi2=0$: $x\cdot\frac\pi2=\frac\pi2x+0$ ✓ — прямая, потерянная при делении.`, R`$\cos\frac\pi2=0$: $x\cdot\frac\pi2=\frac\pi2x+0$ ✓, a line lost by division.`),
      why: [L(R`$x=x+x\cos^21$ — noto‘g‘ri.`, R`$x=x+x\cos^21$ — неверно.`, R`$x=x+x\cos^21$ is false.`), null, L(R`$\cos^2\pi=1\ne0$.`, R`$\cos^2\pi=1\ne0$.`, R`$\cos^2\pi=1\ne0$.`), L(R`$0=0+x\cdot1$ — noto‘g‘ri.`, R`$0=0+x\cdot1$ — неверно.`, R`$0=0+x\cdot1$ is false.`)] },
    { id: 't03.q4', q: L(R`$y'=\dfrac{x+y-2}{x-y}$ uchun ko‘chirish nuqtasi:`, R`Точка переноса для $y'=\dfrac{x+y-2}{x-y}$:`, R`The shift point for $y'=\dfrac{x+y-2}{x-y}$:`),
      options: [L(R`$(2,0)$`, R`$(2,0)$`, R`$(2,0)$`), L(R`$(1,1)$`, R`$(1,1)$`, R`$(1,1)$`), L(R`$(0,2)$`, R`$(0,2)$`, R`$(0,2)$`), L(R`$(-1,-1)$`, R`$(-1,-1)$`, R`$(-1,-1)$`)], correct: 1,
      explain: L(R`$x+y=2$, $x=y$ $\Rightarrow$ $(1,1)$.`, R`$x+y=2$, $x=y$ $\Rightarrow$ $(1,1)$.`, R`$x+y=2$, $x=y$ $\Rightarrow$ $(1,1)$.`),
      why: [L(R`$x-y=2\ne0$.`, R`$x-y=2\ne0$.`, R`$x-y=2\ne0$.`), null, L(R`$x-y=-2\ne0$.`, R`$x-y=-2\ne0$.`, R`$x-y=-2\ne0$.`), L(R`$x+y-2=-4\ne0$.`, R`$x+y-2=-4\ne0$.`, R`$x+y-2=-4\ne0$.`)] },
    { id: 't03.q5', q: L(R`$y'=\dfrac{x+y+1}{2x+2y-1}$ uchun to‘g‘ri yo‘l:`, R`Правильный путь для $y'=\dfrac{x+y+1}{2x+2y-1}$:`, R`The right approach for $y'=\dfrac{x+y+1}{2x+2y-1}$:`),
      options: [L('Kesishish nuqtasiga ko‘chirish', 'Перенос в точку пересечения', 'Shift to the intersection point'), L(R`$z=x+y$ almashtirish`, R`Замена $z=x+y$`, R`The substitution $z=x+y$`), L(R`$y=ux$ darhol`, R`Сразу $y=ux$`, R`$y=ux$ directly`), L(R`$y=ux^2$`, R`$y=ux^2$`, R`$y=ux^2$`)], correct: 1,
      explain: L(R`$\Delta=0$: chiziqlar parallel, $z=x+y$ ajraladigan tenglama beradi.`, R`$\Delta=0$: прямые параллельны, $z=x+y$ даёт уравнение с разделяющимися переменными.`, R`$\Delta=0$: the lines are parallel and $z=x+y$ gives a separable equation.`),
      why: [L('Parallel to‘g‘ri chiziqlar kesishmaydi.', 'Параллельные прямые не пересекаются.', 'Parallel lines do not meet.'), null, L('Ozod hadlar tufayli tenglama bir jinsli emas.', 'Из-за свободных членов уравнение не однородно.', 'Because of the constant terms the equation is not homogeneous.'), L('Vaznlar tenglashmaydi.', 'Веса не уравниваются.', 'The weights do not balance.')] },
    { id: 't03.q6', q: L(R`$M=x^2+3xy$, $N=y^2$ uchun $M\,dx+N\,dy=0$:`, R`Для $M=x^2+3xy$, $N=y^2$ уравнение $M\,dx+N\,dy=0$:`, R`For $M=x^2+3xy$, $N=y^2$, the equation $M\,dx+N\,dy=0$ is:`),
      options: [L('bir jinsli, chunki $M$, $N$ — 2-darajali', 'однородное: $M$, $N$ степени 2', 'homogeneous: $M$, $N$ both of degree 2'), L('bir jinsli emas', 'не однородное', 'not homogeneous'), L('chiziqli', 'линейное', 'linear'), L('ajraladigan', 'с разделяющимися переменными', 'separable')], correct: 0,
      explain: L(R`$M$ va $N$ bir xil (2-) darajali bir jinsli.`, R`$M$ и $N$ однородны одной и той же степени 2.`, R`$M$ and $N$ are homogeneous of the same degree 2.`),
      why: [null, L('Darajalar teng — bir jinsli.', 'Степени равны — однородное.', 'The degrees agree, so it is homogeneous.'), L(R`$y'=-\dfrac{x^2+3xy}{y^2}$ — $y$ ga nisbatan chiziqli emas.`, R`$y'=-\dfrac{x^2+3xy}{y^2}$ — нелинейно по $y$.`, R`$y'=-\dfrac{x^2+3xy}{y^2}$ is nonlinear in $y$.`), L(R`$x^2+3xy$ ko‘paytmaga ajralmaydi.`, R`$x^2+3xy$ не раскладывается в произведение нужного вида.`, R`$x^2+3xy$ does not factor as needed.`)] },
    { id: 't03.q7', q: L('Manbadan chiqqan nurlarni parallel dastaga aylantiruvchi ko‘zgu kesimi:', 'Сечение зеркала, превращающего лучи от источника в параллельный пучок:', 'The section of a mirror turning rays from a source into a parallel beam:'),
      options: [L('aylana', 'окружность', 'a circle'), L('fokusi manbada bo‘lgan parabola', 'парабола с фокусом в источнике', 'a parabola with focus at the source'), L('ellips', 'эллипс', 'an ellipse'), L('to‘g‘ri chiziq', 'прямая', 'a straight line')], correct: 1,
      explain: L(R`Tenglama $y'=\dfrac{y}{x+\sqrt{x^2+y^2}}$ yechimi $y^2=2Cx+C^2$.`, R`Решение уравнения $y'=\dfrac{y}{x+\sqrt{x^2+y^2}}$: $y^2=2Cx+C^2$.`, R`The solution of $y'=\dfrac{y}{x+\sqrt{x^2+y^2}}$ is $y^2=2Cx+C^2$.`),
      why: [L('Aylana markazdagi nurlarni orqaga qaytaradi.', 'Окружность возвращает лучи из центра обратно.', 'A circle sends rays from its centre straight back.'), null, L('Ellips nurlarni ikkinchi fokusga yig‘adi.', 'Эллипс собирает лучи во втором фокусе.', 'An ellipse focuses rays at its second focus.'), L('Tekis ko‘zgu dastani parallel qilmaydi.', 'Плоское зеркало не делает пучок параллельным.', 'A flat mirror does not make the beam parallel.')] },
    { id: 't03.q8', q: L(R`$y'=\dfrac{y^2}{x^3}+\dfrac{2y}{x}+x$ uchun $k$ (vazn):`, R`Вес $k$ для $y'=\dfrac{y^2}{x^3}+\dfrac{2y}{x}+x$:`, R`The weight $k$ for $y'=\dfrac{y^2}{x^3}+\dfrac{2y}{x}+x$:`),
      options: [L('1', '1', '1'), L('2', '2', '2'), L('3', '3', '3'), L(R`$\frac12$`, R`$\frac12$`, R`$\frac12$`)], correct: 1,
      explain: L(R`$k-1=2k-3=1\Rightarrow k=2$.`, R`$k-1=2k-3=1\Rightarrow k=2$.`, R`$k-1=2k-3=1\Rightarrow k=2$.`),
      why: [L(R`$k=1$ da $2k-3=-1\ne0$.`, R`При $k=1$: $2k-3=-1\ne0$.`, R`At $k=1$: $2k-3=-1\ne0$.`), null, L(R`$k=3$ da $k-1=2\ne1$.`, R`При $k=3$: $k-1=2\ne1$.`, R`At $k=3$: $k-1=2\ne1$.`), L(R`$k-1=-\frac12\ne1$.`, R`$k-1=-\frac12\ne1$.`, R`$k-1=-\frac12\ne1$.`)] },
    { id: 't03.q9', q: L(R`$y'=\dfrac{x^2+y^2}{xy}$ da $y=ux$ dan keyin:`, R`После $y=ux$ в $y'=\dfrac{x^2+y^2}{xy}$:`, R`After $y=ux$ in $y'=\dfrac{x^2+y^2}{xy}$:`),
      options: [L(R`$x\,u'=\dfrac1u$`, R`$x\,u'=\dfrac1u$`, R`$x\,u'=\dfrac1u$`), L(R`$u'=\dfrac1u+u$`, R`$u'=\dfrac1u+u$`, R`$u'=\dfrac1u+u$`), L(R`$x\,u'=u$`, R`$x\,u'=u$`, R`$x\,u'=u$`), L(R`$x\,u'=1+u^2$`, R`$x\,u'=1+u^2$`, R`$x\,u'=1+u^2$`)], correct: 0,
      explain: L(R`$u'x+u=\dfrac1u+u$.`, R`$u'x+u=\dfrac1u+u$.`, R`$u'x+u=\dfrac1u+u$.`),
      why: [null, L(R`$y'=u'$ deb olingan — xato.`, R`Взято $y'=u'$ — ошибка.`, R`It used $y'=u'$, which is wrong.`), L('O‘ng tomon noto‘g‘ri soddalashtirilgan.', 'Правая часть упрощена неверно.', 'The right side was simplified incorrectly.'), L(R`$u$ ni ayirish unutilgan va $u$ ga bo‘linmagan.`, R`Забыто вычесть $u$ и разделить на $u$.`, R`Subtracting $u$ and dividing by $u$ were forgotten.`)] },
    { id: 't03.q10', q: L(R`$y''+4y=0$ tenglama “bir jinsli” deyilsa, bu qaysi ma’noda?`, R`Если $y''+4y=0$ называют «однородным», то в каком смысле?`, R`If $y''+4y=0$ is called “homogeneous”, in which sense?`),
      options: [L(R`$f(y/x)$ ma’nosida`, R`В смысле $f(y/x)$`, R`In the $f(y/x)$ sense`), L('O‘ng tomoni nol bo‘lgan chiziqli tenglama', 'Линейное уравнение с нулевой правой частью', 'A linear equation with zero right side'), L('Umumlashgan bir jinsli', 'Обобщённо однородное', 'Generalised homogeneous'), L('Hech qanday ma’noda', 'Ни в каком', 'In no sense')], correct: 1,
      explain: L('Chiziqli tenglamalar uchun “bir jinsli” — ozod hadsiz degani.', 'Для линейных уравнений «однородное» означает «без свободного члена».', 'For linear equations, “homogeneous” means “no forcing term”.'),
      why: [L('Bu ikkinchi tartibli tenglama, $y/x$ ga bog‘liq ko‘rinish emas.', 'Это уравнение второго порядка, не вида $f(y/x)$.', 'It is second order and not of the form $f(y/x)$.'), null, L('Atama bu yerda boshqa ma’noda ishlatilgan.', 'Термин здесь употреблён в другом смысле.', 'The term is used here in a different sense.'), L('U chiziqli bir jinsli.', 'Оно линейное однородное.', 'It is linear homogeneous.')] }
  ]
});
})();
