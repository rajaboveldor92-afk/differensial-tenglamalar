(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't09', num: 9,
  title: L('Bir jinsli bo‘lmagan tenglamalar: noma’lum koeffitsiyentlar va qatorlar', 'Неоднородные уравнения: неопределённые коэффициенты и степенные ряды', 'Nonhomogeneous equations: undetermined coefficients and power series'),
  syllabus: { lecture: 'M9', seminar: 'S9', outcomes: ['TN3', 'TN5'], independent: [9] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L(R`Bir jinsli bo‘lmagan chiziqli tenglama umumiy yechimining tuzilishini ($y=y_h+y_p$) tushuntira olasiz.`, R`Объяснять структуру общего решения линейного неоднородного уравнения ($y=y_h+y_p$).`, R`Explain the structure of the general solution of a nonhomogeneous linear equation ($y=y_h+y_p$).`),
    L('O‘ng tomoni kvaziko‘phad bo‘lganda xususiy yechim ko‘rinishini to‘g‘ri tanlay olasiz, rezonans holini ham.', 'Правильно выбирать вид частного решения для правой части-квазимногочлена, включая резонансный случай.', 'Choose the correct form of a particular solution for a quasi-polynomial right side, including the resonance case.'),
    L('Superpozitsiya prinsipi yordamida murakkab o‘ng tomonni bo‘laklarga ajrata olasiz.', 'Разбивать сложную правую часть на слагаемые по принципу суперпозиции.', 'Split a complicated right side into pieces using the superposition principle.'),
    L('Oddiy nuqta atrofida ikkinchi tartibli tenglamaning darajali qator ko‘rinishidagi yechimini rekurrent formula orqali qura olasiz.', 'Строить решение уравнения второго порядка в виде степенного ряда около обыкновенной точки с помощью рекуррентной формулы.', 'Build power-series solutions of second-order equations near an ordinary point via a recurrence relation.')
  ],
  prereqKnowledge: [
    L(R`O‘zgarmas koeffitsiyentli bir jinsli tenglamalar, xarakteristik ildizlar va ularning karraligi (8-mavzu).`, R`Однородные уравнения с постоянными коэффициентами, характеристические корни и их кратность (тема 8).`, R`Homogeneous constant-coefficient equations, characteristic roots and their multiplicity (topic 8).`),
    L('Chiziqli algebraik tenglamalar sistemasini yechish; ko‘phadlarni tenglashtirish.', 'Решение систем линейных алгебраических уравнений; приравнивание многочленов.', 'Solving linear algebraic systems; comparing coefficients of polynomials.'),
    L('Darajali qatorlar, Teylor qatori va yaqinlashish radiusi.', 'Степенные ряды, ряд Тейлора и радиус сходимости.', 'Power series, Taylor series and radius of convergence.')
  ],
  sources: [
    { id: 'dilmurodov', ref: '§6.3, §7.3, §14.1', verified: true },
    { id: 'ergashev', ref: '2.3, 3.2', verified: true },
    { id: 'kohler', ref: '3.7, 3.8, 3.10, 3.13, 8.2', verified: true },
    { id: 'logan', ref: '2.3', verified: true },
    { id: 'goode', ref: '8.3, 11.2', verified: true },
    { id: 'filippov', ref: '§11', verified: false },
    { id: 'boyce', ref: '§3.5, Ch. 5', verified: false }
  ],
  labs: ['L06'],
  lessons: [
    {
      id: 't09.1',
      title: L('Umumiy yechimning tuzilishi. Superpozitsiya', 'Структура общего решения. Суперпозиция', 'Structure of the general solution. Superposition'),
      blocks: [
        { type: 'intro', title: L('Batareyali zanjir', 'Цепь с батареей', 'A circuit with a battery'),
          body: L(R`8-mavzudagi RLC zanjirga endi doimiy kuchlanish beruvchi batareya ulandi:
$$q''+3q'+2q=4.$$
O‘ng tomon nol emas — tenglama **bir jinsli emas**. Bitta yechimni “ko‘z bilan” topish mumkin: $q$ o‘zgarmas bo‘lsa, $q'=q''=0$ va $2q=4$, ya’ni $q_p=2$. Bu kondensatorning barqaror zaryadi.

Qolgan barcha yechimlar qanday? Ikkita yechimning ayirmasi bir jinsli $q''+3q'+2q=0$ ni qanoatlantiradi, uning yechimlarini esa bilamiz. Demak,
$$q=C_1e^{-t}+C_2e^{-2t}+2,$$
ya’ni so‘nuvchi “o‘tish jarayoni” va barqaror holat yig‘indisi.`,
          R`К RLC-цепи из темы 8 подключили батарею с постоянным напряжением:
$$q''+3q'+2q=4.$$
Правая часть не нуль — уравнение **неоднородное**. Одно решение видно «на глаз»: если $q$ постоянно, то $q'=q''=0$ и $2q=4$, то есть $q_p=2$. Это установившийся заряд конденсатора.

А все остальные решения? Разность двух решений удовлетворяет однородному уравнению $q''+3q'+2q=0$, решения которого мы знаем. Значит,
$$q=C_1e^{-t}+C_2e^{-2t}+2,$$
то есть сумма затухающего «переходного процесса» и установившегося режима.`,
          R`The RLC circuit of topic 8 is now connected to a battery with constant voltage:
$$q''+3q'+2q=4.$$
The right side is not zero, so the equation is **nonhomogeneous**. One solution can be seen by eye: if $q$ is constant then $q'=q''=0$ and $2q=4$, so $q_p=2$. This is the steady charge of the capacitor.

What about all other solutions? The difference of two solutions satisfies the homogeneous equation $q''+3q'+2q=0$, whose solutions we know. Hence
$$q=C_1e^{-t}+C_2e^{-2t}+2,$$
the sum of a decaying “transient” and the steady state.`) },
        { type: 'thm', title: L('Umumiy yechimning tuzilishi', 'Структура общего решения', 'Structure of the general solution'),
          conds: L(R`1. $a_1(x),\dots,a_n(x)$ va $f(x)$ $I$ oraliqda uzluksiz;
2. $y_1,\dots,y_n$ — $L[y]=0$ ning $I$ dagi fundamental yechimlar sistemasi;
3. $y_p$ — $L[y]=f$ ning $I$ dagi biror xususiy yechimi.`,
          R`1. $a_1(x),\dots,a_n(x)$ и $f(x)$ непрерывны на интервале $I$;
2. $y_1,\dots,y_n$ — фундаментальная система решений $L[y]=0$ на $I$;
3. $y_p$ — какое-либо частное решение $L[y]=f$ на $I$.`,
          R`1. $a_1(x),\dots,a_n(x)$ and $f(x)$ are continuous on an interval $I$;
2. $y_1,\dots,y_n$ is a fundamental set of solutions of $L[y]=0$ on $I$;
3. $y_p$ is some particular solution of $L[y]=f$ on $I$.`),
          body: L(R`U holda $L[y]\equiv y^{(n)}+a_1(x)y^{(n-1)}+\dots+a_n(x)y=f(x)$ ning $I$ dagi **har bir** yechimi
$$y=\underbrace{C_1y_1+\dots+C_ny_n}_{y_h}+\,y_p$$
ko‘rinishida yoziladi.`,
          R`Тогда **каждое** решение уравнения $L[y]\equiv y^{(n)}+a_1(x)y^{(n-1)}+\dots+a_n(x)y=f(x)$ на $I$ записывается в виде
$$y=\underbrace{C_1y_1+\dots+C_ny_n}_{y_h}+\,y_p.$$`,
          R`Then **every** solution of $L[y]\equiv y^{(n)}+a_1(x)y^{(n-1)}+\dots+a_n(x)y=f(x)$ on $I$ can be written as
$$y=\underbrace{C_1y_1+\dots+C_ny_n}_{y_h}+\,y_p.$$`) },
        { type: 'proof', body: L(R`$y$ — istalgan yechim bo‘lsin. $L$ chiziqli: $L[y-y_p]=f-f=0$. Demak, $y-y_p$ bir jinsli tenglamaning yechimi va fundamental sistema orqali $C_1y_1+\dots+C_ny_n$ ko‘rinishida ifodalanadi (Dilmuradov, §6.5).`,
          R`Пусть $y$ — любое решение. Оператор $L$ линеен: $L[y-y_p]=f-f=0$. Значит, $y-y_p$ — решение однородного уравнения и выражается через фундаментальную систему: $C_1y_1+\dots+C_ny_n$ (Дилмурадов, §6.5).`,
          R`Let $y$ be any solution. $L$ is linear: $L[y-y_p]=f-f=0$. So $y-y_p$ solves the homogeneous equation and is a combination $C_1y_1+\dots+C_ny_n$ of the fundamental set (Dilmuradov, §6.5).`) },
        { type: 'thm', title: L('Superpozitsiya prinsipi', 'Принцип суперпозиции', 'The superposition principle'),
          conds: L(R`1. $L$ — chiziqli differensial operator;
2. $L[u_1]=f_1$ va $L[u_2]=f_2$ $I$ oraliqda.`,
          R`1. $L$ — линейный дифференциальный оператор;
2. $L[u_1]=f_1$ и $L[u_2]=f_2$ на интервале $I$.`,
          R`1. $L$ is a linear differential operator;
2. $L[u_1]=f_1$ and $L[u_2]=f_2$ on an interval $I$.`),
          body: L(R`U holda istalgan o‘zgarmas $\lambda_1,\lambda_2$ uchun $L[\lambda_1u_1+\lambda_2u_2]=\lambda_1f_1+\lambda_2f_2$. Amalda: o‘ng tomon yig‘indi bo‘lsa, har bir qo‘shiluvchi uchun xususiy yechimni alohida topib, ularni qo‘shamiz.`,
          R`Тогда при любых постоянных $\lambda_1,\lambda_2$: $L[\lambda_1u_1+\lambda_2u_2]=\lambda_1f_1+\lambda_2f_2$. На практике: если правая часть — сумма, частное решение ищут для каждого слагаемого отдельно и складывают.`,
          R`Then for any constants $\lambda_1,\lambda_2$: $L[\lambda_1u_1+\lambda_2u_2]=\lambda_1f_1+\lambda_2f_2$. In practice: if the right side is a sum, find a particular solution for each term separately and add them.`) },
        { type: 'warn', body: L(R`Boshlang‘ich shartlar **to‘liq** yechim $y=y_h+y_p$ ga qo‘yiladi. Avval $y_h$ ga shart qo‘yib, keyin $y_p$ ni qo‘shish xato: shunda $y(x_0)$ ga $y_p(x_0)$ ortiqcha qo‘shilib qoladi.`,
          R`Начальные условия накладываются на **полное** решение $y=y_h+y_p$. Ошибка — сначала подставить условия в $y_h$, а потом прибавить $y_p$: тогда к $y(x_0)$ лишний раз добавится $y_p(x_0)$.`,
          R`Initial conditions are applied to the **full** solution $y=y_h+y_p$. It is wrong to fit them to $y_h$ first and add $y_p$ afterwards: then $y(x_0)$ picks up an extra $y_p(x_0)$.`) }
      ]
    },
    {
      id: 't09.2',
      title: L('Noma’lum koeffitsiyentlar usuli', 'Метод неопределённых коэффициентов', 'The method of undetermined coefficients'),
      blocks: [
        { type: 'def', title: L('Kvaziko‘phad', 'Квазимногочлен', 'Quasi-polynomial'),
          body: L(R`Quyidagi ko‘rinishdagi funksiya **kvaziko‘phad** deyiladi:
$$f(x)=e^{\alpha x}\big(P_m(x)\cos\beta x+Q_l(x)\sin\beta x\big),$$
bu yerda $P_m$, $Q_l$ — $m$ va $l$ darajali ko‘phadlar. Unga **nazorat soni** $\sigma=\alpha+i\beta$ mos keladi. Xususiy hollar: ko‘phad ($\sigma=0$), $e^{\alpha x}P_m(x)$ ($\sigma=\alpha$), $\cos\beta x$ yoki $\sin\beta x$ ($\sigma=i\beta$).`,
          R`Функция вида
$$f(x)=e^{\alpha x}\big(P_m(x)\cos\beta x+Q_l(x)\sin\beta x\big),$$
где $P_m$, $Q_l$ — многочлены степеней $m$ и $l$, называется **квазимногочленом**. Ей соответствует **контрольное число** $\sigma=\alpha+i\beta$. Частные случаи: многочлен ($\sigma=0$), $e^{\alpha x}P_m(x)$ ($\sigma=\alpha$), $\cos\beta x$ или $\sin\beta x$ ($\sigma=i\beta$).`,
          R`A function of the form
$$f(x)=e^{\alpha x}\big(P_m(x)\cos\beta x+Q_l(x)\sin\beta x\big),$$
where $P_m$, $Q_l$ are polynomials of degrees $m$ and $l$, is a **quasi-polynomial**. Its **control number** is $\sigma=\alpha+i\beta$. Special cases: a polynomial ($\sigma=0$), $e^{\alpha x}P_m(x)$ ($\sigma=\alpha$), $\cos\beta x$ or $\sin\beta x$ ($\sigma=i\beta$).`) },
        { type: 'thm', title: L('Xususiy yechimning ko‘rinishi', 'Вид частного решения', 'Form of the particular solution'),
          conds: L(R`1. $L[y]=y^{(n)}+a_1y^{(n-1)}+\dots+a_ny$, $a_k$ — haqiqiy **o‘zgarmaslar**;
2. $f(x)=e^{\alpha x}\big(P_m(x)\cos\beta x+Q_l(x)\sin\beta x\big)$ — kvaziko‘phad;
3. $s$ — $\sigma=\alpha+i\beta$ sonining xarakteristik ko‘phad ildizi sifatidagi karraligi ($\sigma$ ildiz bo‘lmasa, $s=0$).`,
          R`1. $L[y]=y^{(n)}+a_1y^{(n-1)}+\dots+a_ny$, $a_k$ — вещественные **постоянные**;
2. $f(x)=e^{\alpha x}\big(P_m(x)\cos\beta x+Q_l(x)\sin\beta x\big)$ — квазимногочлен;
3. $s$ — кратность числа $\sigma=\alpha+i\beta$ как корня характеристического многочлена ($s=0$, если $\sigma$ не корень).`,
          R`1. $L[y]=y^{(n)}+a_1y^{(n-1)}+\dots+a_ny$ with real **constant** $a_k$;
2. $f(x)=e^{\alpha x}\big(P_m(x)\cos\beta x+Q_l(x)\sin\beta x\big)$ is a quasi-polynomial;
3. $s$ is the multiplicity of $\sigma=\alpha+i\beta$ as a root of the characteristic polynomial ($s=0$ if $\sigma$ is not a root).`),
          body: L(R`U holda $L[y]=f$ tenglama
$$y_p=x^s e^{\alpha x}\big(R_N(x)\cos\beta x+S_N(x)\sin\beta x\big),\qquad N=\max(m,l)$$
ko‘rinishidagi xususiy yechimga ega, bu yerda $R_N$, $S_N$ — noma’lum koeffitsiyentli $N$-darajali ko‘phadlar. Ular $y_p$ ni tenglamaga qo‘yib, mos hadlar oldidagi koeffitsiyentlarni tenglashtirish orqali topiladi. $s\ge1$ holat **rezonans** deyiladi.`,
          R`Тогда уравнение $L[y]=f$ имеет частное решение вида
$$y_p=x^s e^{\alpha x}\big(R_N(x)\cos\beta x+S_N(x)\sin\beta x\big),\qquad N=\max(m,l),$$
где $R_N$, $S_N$ — многочлены степени $N$ с неопределёнными коэффициентами. Их находят, подставляя $y_p$ в уравнение и приравнивая коэффициенты при подобных членах. Случай $s\ge1$ называется **резонансным**.`,
          R`Then $L[y]=f$ has a particular solution of the form
$$y_p=x^s e^{\alpha x}\big(R_N(x)\cos\beta x+S_N(x)\sin\beta x\big),\qquad N=\max(m,l),$$
where $R_N$, $S_N$ are polynomials of degree $N$ with undetermined coefficients. They are found by substituting $y_p$ into the equation and matching coefficients of like terms. The case $s\ge1$ is called **resonance**.`) },
        { type: 'example', title: L('Ko‘phad o‘ng tomon', 'Правая часть — многочлен', 'A polynomial right side'),
          body: L(R`$y''-3y'+2y=4x^2$ ning umumiy yechimini toping.`, R`Найдите общее решение $y''-3y'+2y=4x^2$.`, R`Find the general solution of $y''-3y'+2y=4x^2$.`),
          steps: [
            L(R`$r^2-3r+2=0$: $r=1,\ 2$. $y_h=C_1e^x+C_2e^{2x}$.`, R`$r^2-3r+2=0$: $r=1,\ 2$. $y_h=C_1e^x+C_2e^{2x}$.`, R`$r^2-3r+2=0$: $r=1,\ 2$. $y_h=C_1e^x+C_2e^{2x}$.`),
            L(R`$f=4x^2$: $\sigma=0$, u ildiz emas, $s=0$; $m=2$. $y_p=Ax^2+Bx+C$ (**to‘liq** ikkinchi darajali ko‘phad).`, R`$f=4x^2$: $\sigma=0$ не корень, $s=0$; $m=2$. $y_p=Ax^2+Bx+C$ (**полный** многочлен второй степени).`, R`$f=4x^2$: $\sigma=0$ is not a root, $s=0$; $m=2$. $y_p=Ax^2+Bx+C$ (a **full** quadratic).`),
            L(R`Qo‘yamiz: $2A-3(2Ax+B)+2(Ax^2+Bx+C)=2Ax^2+(2B-6A)x+(2A-3B+2C)$.`, R`Подставляем: $2A-3(2Ax+B)+2(Ax^2+Bx+C)=2Ax^2+(2B-6A)x+(2A-3B+2C)$.`, R`Substitute: $2A-3(2Ax+B)+2(Ax^2+Bx+C)=2Ax^2+(2B-6A)x+(2A-3B+2C)$.`),
            L(R`Tenglashtiramiz: $2A=4$, $2B-6A=0$, $2A-3B+2C=0$, ya’ni $A=2$, $B=6$, $C=7$.`, R`Приравниваем: $2A=4$, $2B-6A=0$, $2A-3B+2C=0$, то есть $A=2$, $B=6$, $C=7$.`, R`Match: $2A=4$, $2B-6A=0$, $2A-3B+2C=0$, so $A=2$, $B=6$, $C=7$.`),
            L(R`Javob: $y=C_1e^x+C_2e^{2x}+2x^2+6x+7$.`, R`Ответ: $y=C_1e^x+C_2e^{2x}+2x^2+6x+7$.`, R`Answer: $y=C_1e^x+C_2e^{2x}+2x^2+6x+7$.`)
          ],
          check: L(R`$y_p''-3y_p'+2y_p=4-3(4x+6)+2(2x^2+6x+7)=4x^2$ ✓.`, R`$y_p''-3y_p'+2y_p=4-3(4x+6)+2(2x^2+6x+7)=4x^2$ ✓.`, R`$y_p''-3y_p'+2y_p=4-3(4x+6)+2(2x^2+6x+7)=4x^2$ ✓.`) },
        { type: 'example', title: L('Rezonans: eksponenta', 'Резонанс: экспонента', 'Resonance: an exponential'),
          body: L(R`$y''-y'-2y=3e^{2x}$ uchun xususiy yechimni toping.`, R`Найдите частное решение $y''-y'-2y=3e^{2x}$.`, R`Find a particular solution of $y''-y'-2y=3e^{2x}$.`),
          steps: [
            L(R`$r^2-r-2=(r-2)(r+1)$: $r=2,\ -1$.`, R`$r^2-r-2=(r-2)(r+1)$: $r=2,\ -1$.`, R`$r^2-r-2=(r-2)(r+1)$: $r=2,\ -1$.`),
            L(R`$\sigma=2$ — oddiy ildiz, $s=1$. $Ae^{2x}$ yaramaydi (u bir jinsli tenglamaning yechimi, chap tomon $0$ bo‘ladi). Shuning uchun $y_p=Axe^{2x}$.`, R`$\sigma=2$ — простой корень, $s=1$. $Ae^{2x}$ не годится (это решение однородного уравнения, левая часть даст $0$). Поэтому $y_p=Axe^{2x}$.`, R`$\sigma=2$ is a simple root, $s=1$. $Ae^{2x}$ fails (it solves the homogeneous equation, the left side gives $0$). So $y_p=Axe^{2x}$.`),
            L(R`$y_p'=A(1+2x)e^{2x}$, $y_p''=A(4+4x)e^{2x}$. Qo‘yamiz: $A(4+4x-1-2x-2x)e^{2x}=3Ae^{2x}$.`, R`$y_p'=A(1+2x)e^{2x}$, $y_p''=A(4+4x)e^{2x}$. Подставляем: $A(4+4x-1-2x-2x)e^{2x}=3Ae^{2x}$.`, R`$y_p'=A(1+2x)e^{2x}$, $y_p''=A(4+4x)e^{2x}$. Substitute: $A(4+4x-1-2x-2x)e^{2x}=3Ae^{2x}$.`),
            L(R`$3A=3$, $A=1$: $y_p=xe^{2x}$. Umumiy yechim: $y=C_1e^{2x}+C_2e^{-x}+xe^{2x}$.`, R`$3A=3$, $A=1$: $y_p=xe^{2x}$. Общее решение: $y=C_1e^{2x}+C_2e^{-x}+xe^{2x}$.`, R`$3A=3$, $A=1$: $y_p=xe^{2x}$. General solution: $y=C_1e^{2x}+C_2e^{-x}+xe^{2x}$.`)
          ],
          check: L(R`$(xe^{2x})''-(xe^{2x})'-2xe^{2x}=3e^{2x}$ ✓. (Umumiy fakt: $P(\sigma)=0$ bo‘lsa, $L[xe^{\sigma x}]=P'(\sigma)e^{\sigma x}$, bu yerda $P'(2)=3$.)`, R`$(xe^{2x})''-(xe^{2x})'-2xe^{2x}=3e^{2x}$ ✓. (Общий факт: если $P(\sigma)=0$, то $L[xe^{\sigma x}]=P'(\sigma)e^{\sigma x}$, здесь $P'(2)=3$.)`, R`$(xe^{2x})''-(xe^{2x})'-2xe^{2x}=3e^{2x}$ ✓. (General fact: if $P(\sigma)=0$ then $L[xe^{\sigma x}]=P'(\sigma)e^{\sigma x}$; here $P'(2)=3$.)`) },
        { type: 'example', title: L('Rezonans: so‘nmaydigan prujina', 'Резонанс: пружина без трения', 'Resonance: an undamped spring'),
          body: L(R`$y''+y=4\sin x$ (xususiy chastota $\omega_0=1$, tashqi kuch chastotasi ham $1$).`, R`$y''+y=4\sin x$ (собственная частота $\omega_0=1$, частота внешней силы тоже $1$).`, R`$y''+y=4\sin x$ (natural frequency $\omega_0=1$, forcing frequency also $1$).`),
          steps: [
            L(R`$r=\pm i$; $f=4\sin x$ uchun $\sigma=i$ — oddiy ildiz, $s=1$, $N=0$.`, R`$r=\pm i$; для $f=4\sin x$ число $\sigma=i$ — простой корень, $s=1$, $N=0$.`, R`$r=\pm i$; for $f=4\sin x$ the number $\sigma=i$ is a simple root, $s=1$, $N=0$.`),
            L(R`$y_p=x(A\cos x+B\sin x)$ — o‘ng tomonda faqat sinus bo‘lsa ham, **ikkala** funksiya olinadi.`, R`$y_p=x(A\cos x+B\sin x)$ — берутся **обе** функции, хотя справа только синус.`, R`$y_p=x(A\cos x+B\sin x)$: take **both** functions even though only a sine is on the right.`),
            L(R`Qo‘yamiz: $y_p''+y_p=-2A\sin x+2B\cos x$. Demak, $-2A=4$, $2B=0$: $A=-2$, $B=0$.`, R`Подставляем: $y_p''+y_p=-2A\sin x+2B\cos x$. Значит, $-2A=4$, $2B=0$: $A=-2$, $B=0$.`, R`Substitute: $y_p''+y_p=-2A\sin x+2B\cos x$. So $-2A=4$, $2B=0$: $A=-2$, $B=0$.`),
            L(R`$y=C_1\cos x+C_2\sin x-2x\cos x$. $-2x\cos x$ hadning amplitudasi $x$ bilan chiziqli o‘sadi — bu **rezonans**: tebranish chegarasiz kattalashadi.`, R`$y=C_1\cos x+C_2\sin x-2x\cos x$. Амплитуда члена $-2x\cos x$ растёт линейно по $x$ — это **резонанс**: колебания неограниченно нарастают.`, R`$y=C_1\cos x+C_2\sin x-2x\cos x$. The term $-2x\cos x$ has an amplitude growing linearly in $x$: this is **resonance**, the oscillation grows without bound.`)
          ],
          check: L(R`$(-2x\cos x)''=4\sin x+2x\cos x$, demak $y_p''+y_p=4\sin x$ ✓.`, R`$(-2x\cos x)''=4\sin x+2x\cos x$, значит $y_p''+y_p=4\sin x$ ✓.`, R`$(-2x\cos x)''=4\sin x+2x\cos x$, so $y_p''+y_p=4\sin x$ ✓.`) },
        { type: 'example', title: L('Superpozitsiya', 'Суперпозиция', 'Superposition'),
          body: L(R`$y''+4y=8x+5e^{x}$ ning umumiy yechimini toping.`, R`Найдите общее решение $y''+4y=8x+5e^{x}$.`, R`Find the general solution of $y''+4y=8x+5e^{x}$.`),
          steps: [
            L(R`$r=\pm2i$, $y_h=C_1\cos2x+C_2\sin2x$.`, R`$r=\pm2i$, $y_h=C_1\cos2x+C_2\sin2x$.`, R`$r=\pm2i$, $y_h=C_1\cos2x+C_2\sin2x$.`),
            L(R`$f_1=8x$ ($\sigma=0$, $s=0$): $u_1=Ax+B$, $4Ax+4B=8x$, $u_1=2x$.`, R`$f_1=8x$ ($\sigma=0$, $s=0$): $u_1=Ax+B$, $4Ax+4B=8x$, $u_1=2x$.`, R`$f_1=8x$ ($\sigma=0$, $s=0$): $u_1=Ax+B$, $4Ax+4B=8x$, $u_1=2x$.`),
            L(R`$f_2=5e^x$ ($\sigma=1$, $s=0$): $u_2=De^x$, $D+4D=5$, $u_2=e^x$.`, R`$f_2=5e^x$ ($\sigma=1$, $s=0$): $u_2=De^x$, $D+4D=5$, $u_2=e^x$.`, R`$f_2=5e^x$ ($\sigma=1$, $s=0$): $u_2=De^x$, $D+4D=5$, $u_2=e^x$.`),
            L(R`Superpozitsiya: $y=C_1\cos2x+C_2\sin2x+2x+e^x$.`, R`Суперпозиция: $y=C_1\cos2x+C_2\sin2x+2x+e^x$.`, R`Superposition: $y=C_1\cos2x+C_2\sin2x+2x+e^x$.`)
          ],
          check: L(R`$(2x+e^x)''+4(2x+e^x)=e^x+8x+4e^x=8x+5e^x$ ✓.`, R`$(2x+e^x)''+4(2x+e^x)=e^x+8x+4e^x=8x+5e^x$ ✓.`, R`$(2x+e^x)''+4(2x+e^x)=e^x+8x+4e^x=8x+5e^x$ ✓.`) },
        { type: 'note', title: L('Ko‘rinishlar jadvali', 'Таблица видов', 'Table of forms'),
          body: L(R`- $f=P_m(x)$: $y_p=x^sQ_m(x)$, $s$ — $r=0$ ildizning karraligi.
- $f=e^{\alpha x}P_m(x)$: $y_p=x^se^{\alpha x}Q_m(x)$, $s$ — $r=\alpha$ ning karraligi.
- $f=a\cos\beta x+b\sin\beta x$: $y_p=x^s(A\cos\beta x+B\sin\beta x)$, $s$ — $r=i\beta$ ning karraligi.
- $f=e^{\alpha x}(P_m\cos\beta x+Q_l\sin\beta x)$: umumiy formula, $N=\max(m,l)$.`,
          R`- $f=P_m(x)$: $y_p=x^sQ_m(x)$, $s$ — кратность корня $r=0$.
- $f=e^{\alpha x}P_m(x)$: $y_p=x^se^{\alpha x}Q_m(x)$, $s$ — кратность $r=\alpha$.
- $f=a\cos\beta x+b\sin\beta x$: $y_p=x^s(A\cos\beta x+B\sin\beta x)$, $s$ — кратность $r=i\beta$.
- $f=e^{\alpha x}(P_m\cos\beta x+Q_l\sin\beta x)$: общая формула, $N=\max(m,l)$.`,
          R`- $f=P_m(x)$: $y_p=x^sQ_m(x)$, $s$ = multiplicity of the root $r=0$.
- $f=e^{\alpha x}P_m(x)$: $y_p=x^se^{\alpha x}Q_m(x)$, $s$ = multiplicity of $r=\alpha$.
- $f=a\cos\beta x+b\sin\beta x$: $y_p=x^s(A\cos\beta x+B\sin\beta x)$, $s$ = multiplicity of $r=i\beta$.
- $f=e^{\alpha x}(P_m\cos\beta x+Q_l\sin\beta x)$: the general formula, $N=\max(m,l)$.`) },
        { type: 'warn', body: L(R`Usul faqat **o‘zgarmas koeffitsiyentli** tenglama va **kvaziko‘phad** o‘ng tomon uchun ishlaydi. $y''+y=\tan x$, $y''-y=\frac1x$ yoki $xy''+y=x^2$ kabi masalalarda ko‘rinishni “taxmin qilish” natija bermaydi — 10-mavzudagi o‘zgarmaslarni variatsiyalash usulidan foydalaning.`,
          R`Метод работает только для уравнений **с постоянными коэффициентами** и правой части-**квазимногочлена**. Для $y''+y=\tan x$, $y''-y=\frac1x$ или $xy''+y=x^2$ «угадать» вид не получится — используйте вариацию постоянных из темы 10.`,
          R`The method works only for **constant-coefficient** equations with a **quasi-polynomial** right side. For $y''+y=\tan x$, $y''-y=\frac1x$ or $xy''+y=x^2$ guessing a form does not work; use variation of parameters from topic 10.`) },
        { type: 'lab', lab: 'L06', body: L(R`L06 laboratoriyasida $y''+cy'+\omega_0^2y=F\cos\gamma t$ ni oling. $c=0$ va $\gamma=\omega_0$ da amplituda chiziqli o‘sishini ($x^s$, $s=1$) kuzating; kichik $c>0$ da esa amplituda chegaralangan, lekin $\gamma\approx\omega_0$ da katta bo‘lishini ko‘ring.`, R`В лаборатории L06 возьмите $y''+cy'+\omega_0^2y=F\cos\gamma t$. При $c=0$ и $\gamma=\omega_0$ наблюдайте линейный рост амплитуды ($x^s$, $s=1$); при малом $c>0$ амплитуда ограничена, но велика при $\gamma\approx\omega_0$.`, R`In lab L06 take $y''+cy'+\omega_0^2y=F\cos\gamma t$. With $c=0$ and $\gamma=\omega_0$ watch the amplitude grow linearly ($x^s$, $s=1$); with small $c>0$ the amplitude stays bounded but is large when $\gamma\approx\omega_0$.`) }
      ]
    },
    {
      id: 't09.3',
      title: L('Darajali qatorlar yordamida yechish', 'Решение с помощью степенных рядов', 'Power-series solutions'),
      blocks: [
        { type: 'def', title: L('Oddiy nuqta', 'Обыкновенная точка', 'Ordinary point'),
          body: L(R`$y''+p(x)y'+q(x)y=0$ tenglama berilgan. Agar $p$ va $q$ $x_0$ nuqtada **analitik** bo‘lsa (ya’ni $x_0$ atrofida o‘z Teylor qatoriga yoyilsa), $x_0$ — **oddiy nuqta**, aks holda — **maxsus nuqta**. Masalan, $y''=xy$ uchun har bir nuqta oddiy; $x^2y''+y=0$ ($p=0$, $q=1/x^2$) uchun $x_0=0$ maxsus nuqta.`,
          R`Дано уравнение $y''+p(x)y'+q(x)y=0$. Если $p$ и $q$ **аналитичны** в точке $x_0$ (то есть разлагаются в ряд Тейлора около $x_0$), то $x_0$ — **обыкновенная точка**, иначе — **особая**. Например, для $y''=xy$ все точки обыкновенные; для $x^2y''+y=0$ ($p=0$, $q=1/x^2$) точка $x_0=0$ особая.`,
          R`Consider $y''+p(x)y'+q(x)y=0$. If $p$ and $q$ are **analytic** at $x_0$ (they equal their Taylor series near $x_0$), then $x_0$ is an **ordinary point**; otherwise it is a **singular point**. For example, every point is ordinary for $y''=xy$, while for $x^2y''+y=0$ ($p=0$, $q=1/x^2$) the point $x_0=0$ is singular.`) },
        { type: 'thm', title: L('Oddiy nuqta atrofidagi yechim', 'Решение около обыкновенной точки', 'Solutions near an ordinary point'),
          conds: L(R`1. $x_0$ — $y''+p(x)y'+q(x)y=0$ ning oddiy nuqtasi;
2. $p$ va $q$ ning $x_0$ atrofidagi Teylor qatorlari $|x-x_0|<\rho$ da yaqinlashadi.`,
          R`1. $x_0$ — обыкновенная точка уравнения $y''+p(x)y'+q(x)y=0$;
2. ряды Тейлора $p$ и $q$ около $x_0$ сходятся при $|x-x_0|<\rho$.`,
          R`1. $x_0$ is an ordinary point of $y''+p(x)y'+q(x)y=0$;
2. the Taylor series of $p$ and $q$ about $x_0$ converge for $|x-x_0|<\rho$.`),
          body: L(R`U holda har bir yechim $y=\sum_{n\ge0}a_n(x-x_0)^n$ qatorga yoyiladi va bu qator kamida $|x-x_0|<\rho$ da yaqinlashadi. $a_0=y(x_0)$ va $a_1=y'(x_0)$ ixtiyoriy, qolgan koeffitsiyentlar ular orqali **rekurrent formula** bilan aniqlanadi; $a_0$ va $a_1$ bo‘yicha ikkita qator fundamental sistemani beradi.`,
          R`Тогда каждое решение разлагается в ряд $y=\sum_{n\ge0}a_n(x-x_0)^n$, сходящийся по крайней мере при $|x-x_0|<\rho$. Коэффициенты $a_0=y(x_0)$ и $a_1=y'(x_0)$ произвольны, остальные выражаются через них **рекуррентной формулой**; два ряда (при $a_0$ и при $a_1$) образуют фундаментальную систему.`,
          R`Then every solution expands as $y=\sum_{n\ge0}a_n(x-x_0)^n$, convergent at least for $|x-x_0|<\rho$. The coefficients $a_0=y(x_0)$ and $a_1=y'(x_0)$ are arbitrary, and the rest follow from a **recurrence relation**; the two series multiplying $a_0$ and $a_1$ form a fundamental set.`) },
        { type: 'example', title: L('Qatordan yopiq formula', 'От ряда к замкнутой формуле', 'From a series to a closed form'),
          body: L(R`$y''-xy'-y=0$, $y(0)=1$, $y'(0)=0$ masalani $x_0=0$ atrofida qator bilan yeching.`, R`Решите задачу $y''-xy'-y=0$, $y(0)=1$, $y'(0)=0$ с помощью ряда около $x_0=0$.`, R`Solve $y''-xy'-y=0$, $y(0)=1$, $y'(0)=0$ by a series about $x_0=0$.`),
          steps: [
            L(R`$y=\sum a_nx^n$, $y'=\sum na_nx^{n-1}$, $y''=\sum n(n-1)a_nx^{n-2}$. $y''$ da indeksni siljitamiz: $y''=\sum_{n\ge0}(n+2)(n+1)a_{n+2}x^n$.`, R`$y=\sum a_nx^n$, $y'=\sum na_nx^{n-1}$, $y''=\sum n(n-1)a_nx^{n-2}$. Сдвигаем индекс в $y''$: $y''=\sum_{n\ge0}(n+2)(n+1)a_{n+2}x^n$.`, R`$y=\sum a_nx^n$, $y'=\sum na_nx^{n-1}$, $y''=\sum n(n-1)a_nx^{n-2}$. Shift the index in $y''$: $y''=\sum_{n\ge0}(n+2)(n+1)a_{n+2}x^n$.`),
            L(R`$xy'=\sum na_nx^n$. $x^n$ oldidagi koeffitsiyent: $(n+2)(n+1)a_{n+2}-na_n-a_n=0$.`, R`$xy'=\sum na_nx^n$. Коэффициент при $x^n$: $(n+2)(n+1)a_{n+2}-na_n-a_n=0$.`, R`$xy'=\sum na_nx^n$. Coefficient of $x^n$: $(n+2)(n+1)a_{n+2}-na_n-a_n=0$.`),
            L(R`Rekurrent formula: $a_{n+2}=\dfrac{a_n}{n+2}$.`, R`Рекуррентная формула: $a_{n+2}=\dfrac{a_n}{n+2}$.`, R`Recurrence: $a_{n+2}=\dfrac{a_n}{n+2}$.`),
            L(R`$a_0=1$, $a_1=0$: toq koeffitsiyentlar $0$; $a_2=\frac12$, $a_4=\frac18$, $a_6=\frac1{48}$, umuman $a_{2k}=\dfrac{1}{2^kk!}$.`, R`$a_0=1$, $a_1=0$: нечётные коэффициенты равны $0$; $a_2=\frac12$, $a_4=\frac18$, $a_6=\frac1{48}$, в общем виде $a_{2k}=\dfrac{1}{2^kk!}$.`, R`$a_0=1$, $a_1=0$: the odd coefficients are $0$; $a_2=\frac12$, $a_4=\frac18$, $a_6=\frac1{48}$, in general $a_{2k}=\dfrac{1}{2^kk!}$.`),
            L(R`$y=\sum_k\dfrac{(x^2/2)^k}{k!}=e^{x^2/2}$, $x\in\mathbb R$.`, R`$y=\sum_k\dfrac{(x^2/2)^k}{k!}=e^{x^2/2}$, $x\in\mathbb R$.`, R`$y=\sum_k\dfrac{(x^2/2)^k}{k!}=e^{x^2/2}$, $x\in\mathbb R$.`)
          ],
          check: L(R`$y'=xe^{x^2/2}$, $y''=(1+x^2)e^{x^2/2}$; $y''-xy'-y=(1+x^2-x^2-1)e^{x^2/2}=0$ ✓; $y(0)=1$, $y'(0)=0$ ✓.`, R`$y'=xe^{x^2/2}$, $y''=(1+x^2)e^{x^2/2}$; $y''-xy'-y=(1+x^2-x^2-1)e^{x^2/2}=0$ ✓; $y(0)=1$, $y'(0)=0$ ✓.`, R`$y'=xe^{x^2/2}$, $y''=(1+x^2)e^{x^2/2}$; $y''-xy'-y=(1+x^2-x^2-1)e^{x^2/2}=0$ ✓; $y(0)=1$, $y'(0)=0$ ✓.`) },
        { type: 'example', title: L('Eyri tenglamasi', 'Уравнение Эйри', 'Airy’s equation'),
          body: L(R`$y''=xy$ ning $x_0=0$ atrofidagi umumiy yechimini qator ko‘rinishida quring. (Bu tenglama yorug‘lik difraksiyasi va kvant mexanikasida uchraydi; yechimi elementar funksiyalar orqali ifodalanmaydi.)`, R`Постройте общее решение $y''=xy$ в виде ряда около $x_0=0$. (Уравнение встречается в теории дифракции света и квантовой механике; его решения не выражаются через элементарные функции.)`, R`Build the general solution of $y''=xy$ as a series about $x_0=0$. (The equation appears in diffraction of light and quantum mechanics; its solutions are not elementary functions.)`),
          steps: [
            L(R`$y''=\sum_{n\ge0}(n+2)(n+1)a_{n+2}x^n$, $xy=\sum_{n\ge0}a_nx^{n+1}=\sum_{n\ge1}a_{n-1}x^n$.`, R`$y''=\sum_{n\ge0}(n+2)(n+1)a_{n+2}x^n$, $xy=\sum_{n\ge0}a_nx^{n+1}=\sum_{n\ge1}a_{n-1}x^n$.`, R`$y''=\sum_{n\ge0}(n+2)(n+1)a_{n+2}x^n$, $xy=\sum_{n\ge0}a_nx^{n+1}=\sum_{n\ge1}a_{n-1}x^n$.`),
            L(R`$x^0$: $2a_2=0$, ya’ni $a_2=0$. $n\ge1$: $a_{n+2}=\dfrac{a_{n-1}}{(n+2)(n+1)}$ — qadam **uchga** teng.`, R`$x^0$: $2a_2=0$, то есть $a_2=0$. При $n\ge1$: $a_{n+2}=\dfrac{a_{n-1}}{(n+2)(n+1)}$ — шаг равен **трём**.`, R`$x^0$: $2a_2=0$, so $a_2=0$. For $n\ge1$: $a_{n+2}=\dfrac{a_{n-1}}{(n+2)(n+1)}$; the step is **three**.`),
            L(R`$a_3=\frac{a_0}{6}$, $a_6=\frac{a_3}{30}=\frac{a_0}{180}$; $a_4=\frac{a_1}{12}$, $a_7=\frac{a_4}{42}=\frac{a_1}{504}$; $a_2=a_5=a_8=\dots=0$.`, R`$a_3=\frac{a_0}{6}$, $a_6=\frac{a_3}{30}=\frac{a_0}{180}$; $a_4=\frac{a_1}{12}$, $a_7=\frac{a_4}{42}=\frac{a_1}{504}$; $a_2=a_5=a_8=\dots=0$.`, R`$a_3=\frac{a_0}{6}$, $a_6=\frac{a_3}{30}=\frac{a_0}{180}$; $a_4=\frac{a_1}{12}$, $a_7=\frac{a_4}{42}=\frac{a_1}{504}$; $a_2=a_5=a_8=\dots=0$.`),
            L(R`$y=a_0\Big(1+\dfrac{x^3}{6}+\dfrac{x^6}{180}+\dots\Big)+a_1\Big(x+\dfrac{x^4}{12}+\dfrac{x^7}{504}+\dots\Big)$. $p=0$, $q=-x$ butun funksiyalar, shuning uchun qatorlar butun $\mathbb R$ da yaqinlashadi.`, R`$y=a_0\Big(1+\dfrac{x^3}{6}+\dfrac{x^6}{180}+\dots\Big)+a_1\Big(x+\dfrac{x^4}{12}+\dfrac{x^7}{504}+\dots\Big)$. $p=0$, $q=-x$ — целые функции, поэтому ряды сходятся на всей $\mathbb R$.`, R`$y=a_0\Big(1+\dfrac{x^3}{6}+\dfrac{x^6}{180}+\dots\Big)+a_1\Big(x+\dfrac{x^4}{12}+\dfrac{x^7}{504}+\dots\Big)$. Since $p=0$ and $q=-x$ are entire, the series converge on all of $\mathbb R$.`)
          ],
          check: L(R`$y''-xy$ qatorga qo‘yilganda $x^0,\dots,x^7$ koeffitsiyentlari nolga teng ✓; $a_9=a_0/12960$ ham rekurrent formulaga mos.`, R`при подстановке ряда в $y''-xy$ коэффициенты при $x^0,\dots,x^7$ равны нулю ✓; $a_9=a_0/12960$ также согласуется с рекуррентной формулой.`, R`substituting the series into $y''-xy$ makes the coefficients of $x^0,\dots,x^7$ vanish ✓; $a_9=a_0/12960$ also agrees with the recurrence.`) },
        { type: 'warn', body: L(R`Indekslarni siljitishda yig‘indilarning **boshlang‘ich indeksi**ni tekshiring: Eyri tenglamasida $xy$ yig‘indisi $n=1$ dan boshlanadi, shuning uchun $x^0$ uchun alohida tenglama ($a_2=0$) chiqadi. Maxsus nuqtada (masalan, $x^2y''+xy'+(x^2-1)y=0$ da $x_0=0$) oddiy darajali qator umuman mavjud bo‘lmasligi mumkin; u yerda Frobenius usuli kerak (Dilmuradov, §14.1).`,
          R`При сдвиге индексов проверяйте **начальный индекс** сумм: в уравнении Эйри сумма для $xy$ начинается с $n=1$, поэтому для $x^0$ получается отдельное уравнение ($a_2=0$). В особой точке (например, $x_0=0$ для $x^2y''+xy'+(x^2-1)y=0$) обычного степенного ряда может не существовать; там нужен метод Фробениуса (Дилмурадов, §14.1).`,
          R`When shifting indices, check the **starting index** of each sum: in Airy’s equation the sum for $xy$ starts at $n=1$, so $x^0$ gives a separate equation ($a_2=0$). At a singular point (e.g. $x_0=0$ for $x^2y''+xy'+(x^2-1)y=0$) an ordinary power series may not exist; the Frobenius method is needed there (Dilmuradov, §14.1).`) }
      ]
    }
  ],
  mistakes: [
    L(R`O‘ng tomonda faqat $\cos\beta x$ bo‘lsa, $y_p=A\cos\beta x$ deb olish. Birinchi hosila sinusni beradi, shuning uchun $A\cos\beta x+B\sin\beta x$ kerak.`, R`Брать $y_p=A\cos\beta x$, если справа только $\cos\beta x$. Первая производная даёт синус, поэтому нужно $A\cos\beta x+B\sin\beta x$.`, R`Taking $y_p=A\cos\beta x$ when the right side is only $\cos\beta x$. The first derivative produces a sine, so $A\cos\beta x+B\sin\beta x$ is needed.`),
    L(R`Rezonansda $x^s$ ko‘paytuvchini unutish: $y''-y=e^x$ uchun $Ae^x$ qo‘yilsa, $0=e^x$ ziddiyat chiqadi. To‘g‘ri: $Axe^x$.`, R`Забывать множитель $x^s$ при резонансе: для $y''-y=e^x$ подстановка $Ae^x$ даёт противоречие $0=e^x$. Верно: $Axe^x$.`, R`Forgetting the factor $x^s$ at resonance: for $y''-y=e^x$ trying $Ae^x$ gives the contradiction $0=e^x$. Correct: $Axe^x$.`),
    L(R`Ko‘phad o‘ng tomon uchun to‘liq bo‘lmagan ko‘phad olish: $f=4x^2$ uchun $y_p=Ax^2$ emas, $Ax^2+Bx+C$.`, R`Брать неполный многочлен: для $f=4x^2$ не $y_p=Ax^2$, а $Ax^2+Bx+C$.`, R`Using an incomplete polynomial: for $f=4x^2$ take $Ax^2+Bx+C$, not $Ax^2$.`),
    L(R`Boshlang‘ich shartlarni $y_h$ ga qo‘yib, keyin $y_p$ ni qo‘shish.`, R`Подставлять начальные условия в $y_h$, а затем прибавлять $y_p$.`, R`Fitting the initial conditions to $y_h$ and then adding $y_p$.`),
    L(R`Qatorlarda indeksni siljitganda yig‘indining boshlanishini o‘zgartirmaslik va natijada birinchi koeffitsiyentlar uchun tenglamalarni yo‘qotish.`, R`При сдвиге индекса в рядах не менять начало суммирования и в результате терять уравнения для первых коэффициентов.`, R`Shifting the index in a series without changing where the sum starts, and so losing the equations for the first coefficients.`)
  ],
  exercises: [
    { id: 't09.x1', level: 'easy', type: 'formula',
      q: L(R`$y''-4y=8$ ning umumiy yechimini yozing ($C_1$, $C_2$).`, R`Запишите общее решение $y''-4y=8$ ($C_1$, $C_2$).`, R`Write the general solution of $y''-4y=8$ ($C_1$, $C_2$).`),
      check: { kind: 'ode', residual: 'ypp - 4*y - 8', order: 2, consts: ['C1', 'C2'], x: [-1, 1] }, answer: 'C1*exp(2*x) + C2*exp(-2*x) - 2',
      hint: L(R`O‘zgarmas xususiy yechim izlang: $y_p=A$.`, R`Ищите постоянное частное решение: $y_p=A$.`, R`Look for a constant particular solution: $y_p=A$.`),
      solution: L(R`$y_h=C_1e^{2x}+C_2e^{-2x}$; $-4A=8$, $A=-2$. $y=C_1e^{2x}+C_2e^{-2x}-2$.`, R`$y_h=C_1e^{2x}+C_2e^{-2x}$; $-4A=8$, $A=-2$. $y=C_1e^{2x}+C_2e^{-2x}-2$.`, R`$y_h=C_1e^{2x}+C_2e^{-2x}$; $-4A=8$, $A=-2$. $y=C_1e^{2x}+C_2e^{-2x}-2$.`) },
    { id: 't09.x2', level: 'easy', type: 'mcq',
      q: L(R`$y''+y=x^2$ uchun xususiy yechim ko‘rinishi:`, R`Вид частного решения для $y''+y=x^2$:`, R`The form of a particular solution for $y''+y=x^2$:`),
      options: [L(R`$Ax^2$`, R`$Ax^2$`, R`$Ax^2$`), L(R`$Ax^2+Bx+C$`, R`$Ax^2+Bx+C$`, R`$Ax^2+Bx+C$`), L(R`$x(Ax^2+Bx+C)$`, R`$x(Ax^2+Bx+C)$`, R`$x(Ax^2+Bx+C)$`), L(R`$A\cos x+B\sin x$`, R`$A\cos x+B\sin x$`, R`$A\cos x+B\sin x$`)], correct: 1,
      explain: L(R`$\sigma=0$ ildiz emas ($r=\pm i$), $s=0$, to‘liq ikkinchi darajali ko‘phad. Hisoblasak, $y_p=x^2-2$.`, R`$\sigma=0$ не корень ($r=\pm i$), $s=0$, полный многочлен второй степени. Вычисление даёт $y_p=x^2-2$.`, R`$\sigma=0$ is not a root ($r=\pm i$), $s=0$, a full quadratic. Computing gives $y_p=x^2-2$.`) },
    { id: 't09.x3', level: 'mid', type: 'formula',
      q: L(R`$y''-2y'+y=e^x$ ning umumiy yechimini yozing.`, R`Запишите общее решение $y''-2y'+y=e^x$.`, R`Write the general solution of $y''-2y'+y=e^x$.`),
      check: { kind: 'ode', residual: 'ypp - 2*yp + y - exp(x)', order: 2, consts: ['C1', 'C2'], x: [-1, 1] }, answer: '(C1 + C2*x)*exp(x) + x^2*exp(x)/2',
      hint: L(R`$r=1$ ikki karrali, $\sigma=1$, demak $s=2$: $y_p=Ax^2e^x$.`, R`$r=1$ двукратный, $\sigma=1$, значит $s=2$: $y_p=Ax^2e^x$.`, R`$r=1$ is double and $\sigma=1$, so $s=2$: $y_p=Ax^2e^x$.`),
      solution: L(R`$L[Ax^2e^x]=2Ae^x=e^x$, $A=\frac12$. $y=(C_1+C_2x)e^x+\frac12x^2e^x$.`, R`$L[Ax^2e^x]=2Ae^x=e^x$, $A=\frac12$. $y=(C_1+C_2x)e^x+\frac12x^2e^x$.`, R`$L[Ax^2e^x]=2Ae^x=e^x$, $A=\frac12$. $y=(C_1+C_2x)e^x+\frac12x^2e^x$.`) },
    { id: 't09.x4', level: 'mid', type: 'formula',
      q: L(R`$y''+4y=8x$, $y(0)=1$, $y'(0)=0$ Koshi masalasini yeching: $y=\ ?$`, R`Решите задачу Коши $y''+4y=8x$, $y(0)=1$, $y'(0)=0$: $y=\ ?$`, R`Solve the Cauchy problem $y''+4y=8x$, $y(0)=1$, $y'(0)=0$: $y=\ ?$`),
      check: { kind: 'ode', residual: 'ypp + 4*y - 8*x', order: 2, consts: [], x: [-1, 1], ivp: { x0: 0, y0: 1, yp0: 0 } }, answer: 'cos(2*x) - sin(2*x) + 2*x',
      hint: L(R`$y_p=2x$. Shartlarni to‘liq yechimga qo‘ying.`, R`$y_p=2x$. Подставляйте условия в полное решение.`, R`$y_p=2x$. Apply the conditions to the full solution.`),
      solution: L(R`$y=C_1\cos2x+C_2\sin2x+2x$; $y(0)=C_1=1$; $y'(0)=2C_2+2=0$, $C_2=-1$. $y=\cos2x-\sin2x+2x$.`, R`$y=C_1\cos2x+C_2\sin2x+2x$; $y(0)=C_1=1$; $y'(0)=2C_2+2=0$, $C_2=-1$. $y=\cos2x-\sin2x+2x$.`, R`$y=C_1\cos2x+C_2\sin2x+2x$; $y(0)=C_1=1$; $y'(0)=2C_2+2=0$, $C_2=-1$. $y=\cos2x-\sin2x+2x$.`) },
    { id: 't09.x5', level: 'mid', type: 'match',
      q: L(R`$y''-y=f(x)$ tenglama uchun $f$ ni $y_p$ ko‘rinishi bilan moslang.`, R`Для уравнения $y''-y=f(x)$ сопоставьте $f$ и вид $y_p$.`, R`For $y''-y=f(x)$ match $f$ with the form of $y_p$.`),
      pairs: [
        { left: L(R`$e^{x}$`, R`$e^{x}$`, R`$e^{x}$`), right: L(R`$Axe^{x}$`, R`$Axe^{x}$`, R`$Axe^{x}$`) },
        { left: L(R`$x$`, R`$x$`, R`$x$`), right: L(R`$Ax+B$`, R`$Ax+B$`, R`$Ax+B$`) },
        { left: L(R`$\sin x$`, R`$\sin x$`, R`$\sin x$`), right: L(R`$A\cos x+B\sin x$`, R`$A\cos x+B\sin x$`, R`$A\cos x+B\sin x$`) },
        { left: L(R`$e^{2x}$`, R`$e^{2x}$`, R`$e^{2x}$`), right: L(R`$Ae^{2x}$`, R`$Ae^{2x}$`, R`$Ae^{2x}$`) }
      ],
      explain: L(R`Ildizlar $r=\pm1$. Faqat $\sigma=1$ ildiz bilan ustma-ust tushadi ($s=1$); $\sigma=0$, $i$, $2$ uchun $s=0$.`, R`Корни $r=\pm1$. Только $\sigma=1$ совпадает с корнем ($s=1$); для $\sigma=0$, $i$, $2$ имеем $s=0$.`, R`The roots are $r=\pm1$. Only $\sigma=1$ coincides with a root ($s=1$); for $\sigma=0$, $i$, $2$ we have $s=0$.`) },
    { id: 't09.x6', level: 'mid', type: 'finderror',
      q: L(R`Talaba $y''+y=\cos x$ ni yechdi. Qaysi qatorda xato?`, R`Студент решал $y''+y=\cos x$. В какой строке ошибка?`, R`A student solved $y''+y=\cos x$. Which line is wrong?`),
      lines: [
        L(R`$r=\pm i$, $y_h=C_1\cos x+C_2\sin x$.`, R`$r=\pm i$, $y_h=C_1\cos x+C_2\sin x$.`, R`$r=\pm i$, $y_h=C_1\cos x+C_2\sin x$.`),
        L(R`$\sigma=i$ ildiz emas, shuning uchun $y_p=A\cos x+B\sin x$.`, R`$\sigma=i$ не корень, поэтому $y_p=A\cos x+B\sin x$.`, R`$\sigma=i$ is not a root, so $y_p=A\cos x+B\sin x$.`),
        L(R`Qo‘yganda $0=\cos x$ — demak, xususiy yechim yo‘q.`, R`После подстановки $0=\cos x$ — значит, частного решения нет.`, R`Substituting gives $0=\cos x$, so there is no particular solution.`)
      ],
      wrong: 1,
      explain: L(R`$\sigma=i$ — oddiy ildiz, $s=1$: $y_p=x(A\cos x+B\sin x)$. Natija: $A=0$, $B=\frac12$, $y_p=\frac12x\sin x$. Uchinchi qatordagi ziddiyat ikkinchi qatordagi xatoning oqibati.`, R`$\sigma=i$ — простой корень, $s=1$: $y_p=x(A\cos x+B\sin x)$. Получаем $A=0$, $B=\frac12$, $y_p=\frac12x\sin x$. Противоречие в третьей строке — следствие ошибки во второй.`, R`$\sigma=i$ is a simple root, $s=1$: $y_p=x(A\cos x+B\sin x)$. This gives $A=0$, $B=\frac12$, $y_p=\frac12x\sin x$. The contradiction in line three comes from the error in line two.`) },
    { id: 't09.x7', level: 'mid', type: 'numeric',
      q: L(R`Eyri tenglamasi $y''=xy$, $y(0)=1$, $y'(0)=0$. Qatordagi $x^6$ oldidagi koeffitsiyent $a_6$ ni kiriting (o‘nli kasr).`, R`Уравнение Эйри $y''=xy$, $y(0)=1$, $y'(0)=0$. Введите коэффициент ряда $a_6$ при $x^6$ (десятичной дробью).`, R`Airy’s equation $y''=xy$, $y(0)=1$, $y'(0)=0$. Enter the series coefficient $a_6$ of $x^6$ (as a decimal).`),
      check: { kind: 'numeric', value: 1 / 180, tol: 1e-5 },
      hint: L(R`$a_{n+2}=\dfrac{a_{n-1}}{(n+2)(n+1)}$, $a_0=1$.`, R`$a_{n+2}=\dfrac{a_{n-1}}{(n+2)(n+1)}$, $a_0=1$.`, R`$a_{n+2}=\dfrac{a_{n-1}}{(n+2)(n+1)}$, $a_0=1$.`),
      solution: L(R`$a_3=\frac{1}{6}$, $a_6=\frac{a_3}{6\cdot5}=\frac1{180}\approx0{,}005556$.`, R`$a_3=\frac{1}{6}$, $a_6=\frac{a_3}{6\cdot5}=\frac1{180}\approx0{,}005556$.`, R`$a_3=\frac{1}{6}$, $a_6=\frac{a_3}{6\cdot5}=\frac1{180}\approx0.005556$.`) },
    { id: 't09.x8', level: 'hard', type: 'formula',
      q: L(R`$y''+2y'+5y=e^{-x}\sin2x$ ning umumiy yechimini yozing.`, R`Запишите общее решение $y''+2y'+5y=e^{-x}\sin2x$.`, R`Write the general solution of $y''+2y'+5y=e^{-x}\sin2x$.`),
      check: { kind: 'ode', residual: 'ypp + 2*yp + 5*y - exp(-x)*sin(2*x)', order: 2, consts: ['C1', 'C2'], x: [-1, 1] }, answer: 'exp(-x)*(C1*cos(2*x) + C2*sin(2*x)) - x*exp(-x)*cos(2*x)/4',
      hint: L(R`$r=-1\pm2i$ va $\sigma=-1+2i$ — rezonans, $s=1$: $y_p=xe^{-x}(A\cos2x+B\sin2x)$.`, R`$r=-1\pm2i$ и $\sigma=-1+2i$ — резонанс, $s=1$: $y_p=xe^{-x}(A\cos2x+B\sin2x)$.`, R`$r=-1\pm2i$ and $\sigma=-1+2i$: resonance, $s=1$: $y_p=xe^{-x}(A\cos2x+B\sin2x)$.`),
      solution: L(R`Qo‘yib tenglashtirsak, $-4A=1$, $4B=0$: $A=-\frac14$, $B=0$. $y=e^{-x}(C_1\cos2x+C_2\sin2x)-\frac14xe^{-x}\cos2x$.`, R`Подставив и приравняв, получим $-4A=1$, $4B=0$: $A=-\frac14$, $B=0$. $y=e^{-x}(C_1\cos2x+C_2\sin2x)-\frac14xe^{-x}\cos2x$.`, R`Substituting and matching gives $-4A=1$, $4B=0$: $A=-\frac14$, $B=0$. $y=e^{-x}(C_1\cos2x+C_2\sin2x)-\frac14xe^{-x}\cos2x$.`) },
    { id: 't09.x9', level: 'hard', type: 'formula',
      q: L(R`$y''+xy'+y=0$, $y(0)=1$, $y'(0)=0$ ni qator bilan yeching va yig‘indini yopiq ko‘rinishda yozing: $y=\ ?$`, R`Решите $y''+xy'+y=0$, $y(0)=1$, $y'(0)=0$ рядом и запишите сумму в замкнутом виде: $y=\ ?$`, R`Solve $y''+xy'+y=0$, $y(0)=1$, $y'(0)=0$ by a series and write the sum in closed form: $y=\ ?$`),
      check: { kind: 'ode', residual: 'ypp + x*yp + y', order: 2, consts: [], x: [-1.5, 1.5], ivp: { x0: 0, y0: 1, yp0: 0 } }, answer: 'exp(-x^2/2)',
      hint: L(R`$x^n$ koeffitsiyenti: $(n+2)(n+1)a_{n+2}+(n+1)a_n=0$.`, R`Коэффициент при $x^n$: $(n+2)(n+1)a_{n+2}+(n+1)a_n=0$.`, R`Coefficient of $x^n$: $(n+2)(n+1)a_{n+2}+(n+1)a_n=0$.`),
      solution: L(R`$a_{n+2}=-\dfrac{a_n}{n+2}$, $a_{2k}=\dfrac{(-1)^k}{2^kk!}$, toq koeffitsiyentlar $0$. $y=\sum\dfrac{(-x^2/2)^k}{k!}=e^{-x^2/2}$.`, R`$a_{n+2}=-\dfrac{a_n}{n+2}$, $a_{2k}=\dfrac{(-1)^k}{2^kk!}$, нечётные коэффициенты $0$. $y=\sum\dfrac{(-x^2/2)^k}{k!}=e^{-x^2/2}$.`, R`$a_{n+2}=-\dfrac{a_n}{n+2}$, $a_{2k}=\dfrac{(-1)^k}{2^kk!}$, odd coefficients $0$. $y=\sum\dfrac{(-x^2/2)^k}{k!}=e^{-x^2/2}$.`) },
    { id: 't09.x10', level: 'hard', type: 'steps',
      q: L(R`$y''-4y'+4y=e^{2x}$ uchun xususiy yechimni bosqichma-bosqich toping.`, R`Найдите пошагово частное решение $y''-4y'+4y=e^{2x}$.`, R`Find a particular solution of $y''-4y'+4y=e^{2x}$ step by step.`),
      steps: [
        { q: L('Xarakteristik ildizlar:', 'Характеристические корни:', 'Characteristic roots:'), options: [L(R`$r=2$ (2 karrali)`, R`$r=2$ (кратности 2)`, R`$r=2$ (double)`), L(R`$r=\pm2$`, R`$r=\pm2$`, R`$r=\pm2$`), L(R`$r=2\pm i$`, R`$r=2\pm i$`, R`$r=2\pm i$`)], correct: 0 },
        { q: L(R`$s$ ning qiymati:`, R`Значение $s$:`, R`The value of $s$:`), options: [L('0', '0', '0'), L('1', '1', '1'), L('2', '2', '2')], correct: 2 },
        { q: L(R`$y_p$ ko‘rinishi:`, R`Вид $y_p$:`, R`Form of $y_p$:`), options: [L(R`$Ae^{2x}$`, R`$Ae^{2x}$`, R`$Ae^{2x}$`), L(R`$Axe^{2x}$`, R`$Axe^{2x}$`, R`$Axe^{2x}$`), L(R`$Ax^2e^{2x}$`, R`$Ax^2e^{2x}$`, R`$Ax^2e^{2x}$`)], correct: 2 },
        { q: L(R`$A$ ning qiymati:`, R`Значение $A$:`, R`The value of $A$:`), options: [L(R`$\frac12$`, R`$\frac12$`, R`$\frac12$`), L('1', '1', '1'), L('2', '2', '2')], correct: 0 }
      ],
      explain: L(R`$L[x^2e^{2x}]=2e^{2x}$ (chunki $P(r)=(r-2)^2$, $P''(2)=2$), demak $A=\frac12$, $y_p=\frac12x^2e^{2x}$.`, R`$L[x^2e^{2x}]=2e^{2x}$ (так как $P(r)=(r-2)^2$, $P''(2)=2$), значит $A=\frac12$, $y_p=\frac12x^2e^{2x}$.`, R`$L[x^2e^{2x}]=2e^{2x}$ (since $P(r)=(r-2)^2$, $P''(2)=2$), so $A=\frac12$, $y_p=\frac12x^2e^{2x}$.`) },
    { id: 't09.x11', level: 'easy', type: 'order',
      q: L(R`Darajali qator usulining qadamlarini tartiblang.`, R`Упорядочите шаги метода степенных рядов.`, R`Order the steps of the power-series method.`),
      items: [
        L(R`$x_0$ oddiy nuqta ekanini tekshirish`, R`Проверить, что $x_0$ — обыкновенная точка`, R`Check that $x_0$ is an ordinary point`),
        L(R`$y=\sum a_n(x-x_0)^n$ va hosilalarini tenglamaga qo‘yish`, R`Подставить $y=\sum a_n(x-x_0)^n$ и производные в уравнение`, R`Substitute $y=\sum a_n(x-x_0)^n$ and its derivatives`),
        L(R`Indekslarni siljitib, bir xil daraja oldidagi koeffitsiyentlarni tenglashtirish`, R`Сдвинуть индексы и приравнять коэффициенты при одинаковых степенях`, R`Shift indices and match coefficients of equal powers`),
        L(R`Rekurrent formulani yozish va $a_0$, $a_1$ orqali koeffitsiyentlarni hisoblash`, R`Записать рекуррентную формулу и вычислить коэффициенты через $a_0$, $a_1$`, R`Write the recurrence and compute coefficients from $a_0$, $a_1$`)
      ],
      explain: L(R`Avval qo‘llanish sharti, keyin qo‘yish, tenglashtirish va rekurrent formula.`, R`Сначала условие применимости, затем подстановка, приравнивание и рекуррентная формула.`, R`First the applicability condition, then substitution, matching and the recurrence.`) }
  ],
  quiz: [
    { id: 't09.q1', q: L(R`$L[y]=f$ ning umumiy yechimi:`, R`Общее решение $L[y]=f$:`, R`The general solution of $L[y]=f$ is:`),
      options: [L(R`$y_h$`, R`$y_h$`, R`$y_h$`), L(R`$y_p$`, R`$y_p$`, R`$y_p$`), L(R`$y_h+y_p$`, R`$y_h+y_p$`, R`$y_h+y_p$`), L(R`$y_h\cdot y_p$`, R`$y_h\cdot y_p$`, R`$y_h\cdot y_p$`)], correct: 2,
      explain: L(R`Har qanday yechim bitta xususiy yechim va bir jinsli tenglama umumiy yechimining yig‘indisi.`, R`Любое решение — сумма одного частного решения и общего решения однородного уравнения.`, R`Every solution is one particular solution plus the general solution of the homogeneous equation.`),
      why: [L(R`$y_h$ bir jinsli tenglamani yechadi, $f$ ni bermaydi.`, R`$y_h$ решает однородное уравнение и не даёт $f$.`, R`$y_h$ solves the homogeneous equation and does not produce $f$.`), L('Bitta xususiy yechimda ixtiyoriy o‘zgarmas yo‘q.', 'В одном частном решении нет произвольных постоянных.', 'A single particular solution has no arbitrary constants.'), null, L('Chiziqli tenglamada yechimlar qo‘shiladi, ko‘paytirilmaydi.', 'Решения линейного уравнения складываются, а не умножаются.', 'Solutions of linear equations add; they do not multiply.')] },
    { id: 't09.q2', q: L(R`$y''+4y=\cos2x$ uchun $y_p$ ko‘rinishi:`, R`Вид $y_p$ для $y''+4y=\cos2x$:`, R`The form of $y_p$ for $y''+4y=\cos2x$:`),
      options: [L(R`$A\cos2x$`, R`$A\cos2x$`, R`$A\cos2x$`), L(R`$A\cos2x+B\sin2x$`, R`$A\cos2x+B\sin2x$`, R`$A\cos2x+B\sin2x$`), L(R`$x(A\cos2x+B\sin2x)$`, R`$x(A\cos2x+B\sin2x)$`, R`$x(A\cos2x+B\sin2x)$`), L(R`$x^2(A\cos2x+B\sin2x)$`, R`$x^2(A\cos2x+B\sin2x)$`, R`$x^2(A\cos2x+B\sin2x)$`)], correct: 2,
      explain: L(R`$\sigma=2i$ — oddiy ildiz ($r=\pm2i$), $s=1$.`, R`$\sigma=2i$ — простой корень ($r=\pm2i$), $s=1$.`, R`$\sigma=2i$ is a simple root ($r=\pm2i$), $s=1$.`),
      why: [L('Sinus yo‘q va rezonans hisobga olinmagan.', 'Нет синуса и не учтён резонанс.', 'The sine is missing and resonance is ignored.'), L('Bu funksiyalar bir jinsli tenglamani yechadi: rezonans.', 'Эти функции решают однородное уравнение: резонанс.', 'These solve the homogeneous equation: resonance.'), null, L(R`$2i$ ildizi ikki karrali emas.`, R`Корень $2i$ не двукратный.`, R`The root $2i$ is not double.`)] },
    { id: 't09.q3', q: L(R`$y''-3y'+2y=e^x$ uchun $s$:`, R`$s$ для $y''-3y'+2y=e^x$:`, R`$s$ for $y''-3y'+2y=e^x$:`),
      options: [L('0', '0', '0'), L('1', '1', '1'), L('2', '2', '2'), L('3', '3', '3')], correct: 1,
      explain: L(R`$r=1,2$; $\sigma=1$ oddiy ildiz, shuning uchun $y_p=Axe^x$.`, R`$r=1,2$; $\sigma=1$ — простой корень, поэтому $y_p=Axe^x$.`, R`$r=1,2$; $\sigma=1$ is a simple root, so $y_p=Axe^x$.`),
      why: [L(R`$\sigma=1$ ildiz bilan ustma-ust tushadi.`, R`$\sigma=1$ совпадает с корнем.`, R`$\sigma=1$ coincides with a root.`), null, L(R`$r=1$ karrali emas.`, R`$r=1$ не кратный.`, R`$r=1$ is not repeated.`), L(R`$s\le$ tenglama tartibi, bu yerda $s\le1$.`, R`$s$ не больше кратности корня, здесь $s\le1$.`, R`$s$ cannot exceed the root’s multiplicity, here $1$.`)] },
    { id: 't09.q4', q: L(R`$y'''-y''=x$ uchun $y_p$ ko‘rinishi:`, R`Вид $y_p$ для $y'''-y''=x$:`, R`The form of $y_p$ for $y'''-y''=x$:`),
      options: [L(R`$Ax+B$`, R`$Ax+B$`, R`$Ax+B$`), L(R`$x(Ax+B)$`, R`$x(Ax+B)$`, R`$x(Ax+B)$`), L(R`$x^2(Ax+B)$`, R`$x^2(Ax+B)$`, R`$x^2(Ax+B)$`), L(R`$x^3(Ax+B)$`, R`$x^3(Ax+B)$`, R`$x^3(Ax+B)$`)], correct: 2,
      explain: L(R`$r^2(r-1)=0$: $r=0$ ikki karrali, $s=2$. (Hisob: $y_p=-\frac16x^3-\frac12x^2$.)`, R`$r^2(r-1)=0$: $r=0$ двукратный, $s=2$. (Вычисление: $y_p=-\frac16x^3-\frac12x^2$.)`, R`$r^2(r-1)=0$: $r=0$ is double, $s=2$. (Computing: $y_p=-\frac16x^3-\frac12x^2$.)`),
      why: [L(R`$r=0$ ildiz — rezonans.`, R`$r=0$ — корень, резонанс.`, R`$r=0$ is a root: resonance.`), L(R`$r=0$ ikki karrali.`, R`$r=0$ двукратный.`, R`$r=0$ is double.`), null, L(R`$r=0$ uch karrali emas.`, R`$r=0$ не трёхкратный.`, R`$r=0$ is not triple.`)] },
    { id: 't09.q5', q: L(R`$L[u_1]=e^x$, $L[u_2]=x$. Qaysi funksiya $L[y]=2e^x-3x$ ni yechadi?`, R`$L[u_1]=e^x$, $L[u_2]=x$. Какая функция решает $L[y]=2e^x-3x$?`, R`$L[u_1]=e^x$, $L[u_2]=x$. Which function solves $L[y]=2e^x-3x$?`),
      options: [L(R`$u_1-u_2$`, R`$u_1-u_2$`, R`$u_1-u_2$`), L(R`$2u_1-3u_2$`, R`$2u_1-3u_2$`, R`$2u_1-3u_2$`), L(R`$2u_1+3u_2$`, R`$2u_1+3u_2$`, R`$2u_1+3u_2$`), L(R`$6u_1u_2$`, R`$6u_1u_2$`, R`$6u_1u_2$`)], correct: 1,
      explain: L('Superpozitsiya: koeffitsiyentlar o‘ng tomondagidek.', 'Суперпозиция: коэффициенты те же, что в правой части.', 'Superposition: the same coefficients as on the right side.'),
      why: [L(R`Bu $e^x-x$ ni beradi.`, R`Это даёт $e^x-x$.`, R`That gives $e^x-x$.`), null, L(R`Ishora xato: $2e^x+3x$.`, R`Неверный знак: $2e^x+3x$.`, R`Wrong sign: $2e^x+3x$.`), L('Ko‘paytma superpozitsiyaga kirmaydi.', 'Произведение не входит в суперпозицию.', 'Products are not part of superposition.')] },
    { id: 't09.q6', q: L(R`$y''+y=\tan x$ ni noma’lum koeffitsiyentlar usuli bilan yechish mumkinmi?`, R`Можно ли решить $y''+y=\tan x$ методом неопределённых коэффициентов?`, R`Can $y''+y=\tan x$ be solved by undetermined coefficients?`),
      options: [L(R`Ha, $y_p=A\tan x$`, R`Да, $y_p=A\tan x$`, R`Yes, $y_p=A\tan x$`), L(R`Ha, $y_p=x(A\cos x+B\sin x)$`, R`Да, $y_p=x(A\cos x+B\sin x)$`, R`Yes, $y_p=x(A\cos x+B\sin x)$`), L(R`Yo‘q: $\tan x$ kvaziko‘phad emas`, R`Нет: $\tan x$ не квазимногочлен`, R`No: $\tan x$ is not a quasi-polynomial`), L(R`Yo‘q: koeffitsiyentlar o‘zgaruvchan`, R`Нет: коэффициенты переменные`, R`No: the coefficients are variable`)], correct: 2,
      explain: L(R`$\tan x$ ning hosilalari yangi va yangi funksiyalarni beradi; chekli ko‘rinish yo‘q. Variatsiya usuli kerak.`, R`Производные $\tan x$ дают всё новые функции; конечного вида нет. Нужна вариация постоянных.`, R`The derivatives of $\tan x$ keep producing new functions; no finite form works. Use variation of parameters.`),
      why: [L(R`$(A\tan x)''+A\tan x\ne\tan x$ umuman olganda.`, R`$(A\tan x)''+A\tan x\ne\tan x$ в общем случае.`, R`$(A\tan x)''+A\tan x\ne\tan x$ in general.`), L(R`Bu $\cos x$ yoki $\sin x$ o‘ng tomon uchun.`, R`Это для правой части $\cos x$ или $\sin x$.`, R`That is for a $\cos x$ or $\sin x$ right side.`), null, L('Koeffitsiyentlar o‘zgarmas: 1 va 1.', 'Коэффициенты постоянные: 1 и 1.', 'The coefficients are constant: 1 and 1.')] },
    { id: 't09.q7', q: L(R`$y''-2y'+2y=e^x\sin x$ uchun $s$:`, R`$s$ для $y''-2y'+2y=e^x\sin x$:`, R`$s$ for $y''-2y'+2y=e^x\sin x$:`),
      options: [L('0', '0', '0'), L('1', '1', '1'), L('2', '2', '2'), L(R`aniqlab bo‘lmaydi`, R`определить нельзя`, R`cannot be determined`)], correct: 1,
      explain: L(R`$r=1\pm i$, $\sigma=1+i$ oddiy ildiz.`, R`$r=1\pm i$, $\sigma=1+i$ — простой корень.`, R`$r=1\pm i$, $\sigma=1+i$ is a simple root.`),
      why: [L(R`$\sigma=1+i$ ildiz.`, R`$\sigma=1+i$ — корень.`, R`$\sigma=1+i$ is a root.`), null, L('Juftlikdagi har bir ildiz oddiy; $s$ bitta $\sigma$ ning karraligi.', 'Каждый корень пары простой; $s$ — кратность одного числа $\sigma$.', 'Each root of the pair is simple; $s$ is the multiplicity of the single number $\sigma$.'), L(R`$\sigma=\alpha+i\beta=1+i$ aniq.`, R`$\sigma=\alpha+i\beta=1+i$ определено.`, R`$\sigma=\alpha+i\beta=1+i$ is well defined.`)] },
    { id: 't09.q8', q: L(R`$y''=xy$ (Eyri) uchun rekurrent formula:`, R`Рекуррентная формула для $y''=xy$ (Эйри):`, R`The recurrence for $y''=xy$ (Airy):`),
      options: [L(R`$a_{n+2}=\dfrac{a_n}{(n+2)(n+1)}$`, R`$a_{n+2}=\dfrac{a_n}{(n+2)(n+1)}$`, R`$a_{n+2}=\dfrac{a_n}{(n+2)(n+1)}$`), L(R`$a_{n+2}=\dfrac{a_{n-1}}{(n+2)(n+1)}$`, R`$a_{n+2}=\dfrac{a_{n-1}}{(n+2)(n+1)}$`, R`$a_{n+2}=\dfrac{a_{n-1}}{(n+2)(n+1)}$`), L(R`$a_{n+1}=\dfrac{a_n}{n+1}$`, R`$a_{n+1}=\dfrac{a_n}{n+1}$`, R`$a_{n+1}=\dfrac{a_n}{n+1}$`), L(R`$a_{n+2}=-\dfrac{a_n}{(n+2)(n+1)}$`, R`$a_{n+2}=-\dfrac{a_n}{(n+2)(n+1)}$`, R`$a_{n+2}=-\dfrac{a_n}{(n+2)(n+1)}$`)], correct: 1,
      explain: L(R`$x\cdot x^{n-1}=x^n$: $x$ ko‘paytuvchi indeksni bittaga siljitadi.`, R`$x\cdot x^{n-1}=x^n$: множитель $x$ сдвигает индекс на единицу.`, R`$x\cdot x^{n-1}=x^n$: the factor $x$ shifts the index by one.`),
      why: [L(R`Bu $y''=y$ uchun.`, R`Это для $y''=y$.`, R`That is for $y''=y$.`), null, L(R`Bu $y'=y$ uchun.`, R`Это для $y'=y$.`, R`That is for $y'=y$.`), L(R`Bu $y''=-y$ uchun.`, R`Это для $y''=-y$.`, R`That is for $y''=-y$.`)] },
    { id: 't09.q9', q: L(R`$y''+\dfrac{1}{1+x^2}y=0$ ning $x_0=0$ atrofidagi qator yechimining kafolatlangan yaqinlashish radiusi:`, R`Гарантированный радиус сходимости ряда-решения $y''+\dfrac{1}{1+x^2}y=0$ около $x_0=0$:`, R`The guaranteed radius of convergence of series solutions of $y''+\dfrac{1}{1+x^2}y=0$ about $x_0=0$:`),
      options: [L('0', '0', '0'), L(R`$\frac12$`, R`$\frac12$`, R`$\frac12$`), L('1', '1', '1'), L(R`$\infty$`, R`$\infty$`, R`$\infty$`)], correct: 2,
      explain: L(R`$q=\frac1{1+x^2}$ ning qatori $|x|<1$ da yaqinlashadi (kompleks maxsus nuqtalar $\pm i$ gacha masofa 1).`, R`Ряд $q=\frac1{1+x^2}$ сходится при $|x|<1$ (расстояние до комплексных особых точек $\pm i$ равно 1).`, R`The series of $q=\frac1{1+x^2}$ converges for $|x|<1$ (the distance to the complex singular points $\pm i$ is 1).`),
      why: [L(R`$x_0=0$ oddiy nuqta, qator mavjud.`, R`$x_0=0$ — обыкновенная точка, ряд существует.`, R`$x_0=0$ is ordinary, so a series exists.`), L('Bunday chegaraga asos yo‘q.', 'Для такой границы нет оснований.', 'There is no reason for that bound.'), null, L(R`$q$ butun funksiya emas: $\pm i$ da maxsuslik bor.`, R`$q$ не целая функция: особенности в $\pm i$.`, R`$q$ is not entire: it is singular at $\pm i$.`)] },
    { id: 't09.q10', q: L(R`$y''+y=1$, $y(0)=0$, $y'(0)=0$ uchun qaysi to‘g‘ri?`, R`Что верно для $y''+y=1$, $y(0)=0$, $y'(0)=0$?`, R`Which is correct for $y''+y=1$, $y(0)=0$, $y'(0)=0$?`),
      options: [L(R`$y=1$`, R`$y=1$`, R`$y=1$`), L(R`$y=1-\cos x$`, R`$y=1-\cos x$`, R`$y=1-\cos x$`), L(R`$y=\cos x$`, R`$y=\cos x$`, R`$y=\cos x$`), L(R`$y=1+\sin x$`, R`$y=1+\sin x$`, R`$y=1+\sin x$`)], correct: 1,
      explain: L(R`$y=C_1\cos x+C_2\sin x+1$; $y(0)=C_1+1=0$, $C_1=-1$; $y'(0)=C_2=0$.`, R`$y=C_1\cos x+C_2\sin x+1$; $y(0)=C_1+1=0$, $C_1=-1$; $y'(0)=C_2=0$.`, R`$y=C_1\cos x+C_2\sin x+1$; $y(0)=C_1+1=0$, $C_1=-1$; $y'(0)=C_2=0$.`),
      why: [L(R`$y(0)=1\ne0$.`, R`$y(0)=1\ne0$.`, R`$y(0)=1\ne0$.`), null, L(R`$y''+y=0\ne1$.`, R`$y''+y=0\ne1$.`, R`$y''+y=0\ne1$.`), L(R`$y(0)=1\ne0$.`, R`$y(0)=1\ne0$.`, R`$y(0)=1\ne0$.`)] }
  ]
});
})();
