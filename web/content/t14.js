(function () {
const L = DT.L, R = DT.R;
DT.addTopic({
  id: 't14', num: 14,
  title: L('Ikkinchi tartibli PDE larni tasniflash va kanonik ko‘rinish', 'Классификация и канонический вид уравнений второго порядка', 'Classification and canonical form of second-order PDEs'),
  syllabus: { lecture: 'M14', seminar: 'S14', outcomes: ['TN5', 'TN6'], independent: [18] },
  textStatus: { uz: 'draft', ru: 'draft', en: 'draft', math: 'checked' },
  outcomes: [
    L(R`Tenglamani $a u_{xx}+2b u_{xy}+c u_{yy}+\dots=0$ ko‘rinishida yozib, $a$, $b$, $c$ koeffitsiyentlarni to‘g‘ri aniqlay olasiz.`, R`Записывать уравнение в виде $a u_{xx}+2b u_{xy}+c u_{yy}+\dots=0$ и правильно находить коэффициенты $a$, $b$, $c$.`, R`Write an equation as $a u_{xx}+2b u_{xy}+c u_{yy}+\dots=0$ and read off $a$, $b$, $c$ correctly.`),
    L(R`$\Delta=b^2-ac$ diskriminant yordamida tenglama turini (giperbolik, parabolik, elliptik) aniqlay olasiz, shu jumladan turi sohaga qarab o‘zgaradigan hollarda.`, R`Определять тип уравнения (гиперболический, параболический, эллиптический) по дискриминанту $\Delta=b^2-ac$, в том числе когда тип меняется по областям.`, R`Determine the type (hyperbolic, parabolic, elliptic) from the discriminant $\Delta=b^2-ac$, including when the type changes from region to region.`),
    L('Xarakteristik tenglamani tuzib, xarakteristikalarni topa olasiz.', 'Составлять характеристическое уравнение и находить характеристики.', 'Form the characteristic equation and find the characteristics.'),
    L('O‘zgarmas koeffitsiyentli tenglamani har uch turda kanonik ko‘rinishga keltira olasiz.', 'Приводить уравнение с постоянными коэффициентами каждого из трёх типов к каноническому виду.', 'Reduce a constant-coefficient equation of each of the three types to canonical form.'),
    L('Kanonik ko‘rinishdan foydalanib, sodda tenglamalarning umumiy yechimini topa olasiz.', 'Находить общее решение простых уравнений с помощью канонического вида.', 'Use the canonical form to find the general solution of simple equations.')
  ],
  prereqKnowledge: [
    L('Murakkab funksiyaning xususiy hosilalari (zanjir qoidasi), ikkinchi tartibli hosilalar.', 'Частные производные сложной функции (цепное правило), производные второго порядка.', 'Partial derivatives of composite functions (chain rule), second derivatives.'),
    L('Ikkinchi tartibli egri chiziqlar: ellips, parabola, giperbola va ularning diskriminanti.', 'Кривые второго порядка: эллипс, парабола, гипербола и их дискриминант.', 'Second-order curves: ellipse, parabola, hyperbola and their discriminant.'),
    L('Kvadrat tenglama ildizlari, kompleks sonlar.', 'Корни квадратного уравнения, комплексные числа.', 'Roots of quadratic equations, complex numbers.'),
    L('Matematik fizikaning asosiy tenglamalari (13-mavzu).', 'Основные уравнения математической физики (тема 13).', 'The main equations of mathematical physics (topic 13).')
  ],
  sources: [
    { id: 'kohler', ref: '9.1', verified: true },
    { id: 'dilmurodov', ref: '§16.1, §16.3', verified: true },
    { id: 'zikirov', ref: 'Matematik fizika tenglamalari', verified: false },
    { id: 'sabitov', ref: 'Гл. 1', verified: false },
    { id: 'boyce', ref: 'Ch. 10', verified: false }
  ],
  labs: ['L11'],
  lessons: [
    {
      id: 't14.1',
      title: L('Diskriminant va tenglama turlari', 'Дискриминант и типы уравнений', 'The discriminant and the types of equations'),
      blocks: [
        { type: 'intro', title: L('Nega uch xil tenglama?', 'Почему три разных уравнения?', 'Why three different equations?'),
          body: L(R`13-mavzuda uchta tenglamani ko‘rdik: to‘lqin $u_{tt}=u_{xx}$ (signal uzoqqa buzilmasdan boradi), issiqlik $u_t=u_{xx}$ (profil silliqlanib so‘nadi) va Laplas $u_{xx}+u_{yy}=0$ (muvozanat holati). Ular juda boshqacha “o‘zini tutadi”. Sababi — ikkinchi tartibli hosilalar oldidagi koeffitsiyentlarda.

Maktabdagi o‘xshashlik: $Ax^2+2Bxy+Cy^2=1$ egri chizig‘ining turi $B^2-AC$ ishorasiga bog‘liq: musbat — giperbola, nol — parabola, manfiy — ellips. PDE larda ham aynan shunday!

Mashq: to‘lqin tenglamasini $u_{xx}-u_{tt}=0$ deb yozing. $u_{xx}$ oldida $1$, $u_{tt}$ oldida $-1$, aralash had yo‘q. $0^2-1\cdot(-1)=1>0$ — “giperbola”.`,
          R`В теме 13 мы видели три уравнения: волновое $u_{tt}=u_{xx}$ (сигнал уходит далеко, не искажаясь), теплопроводности $u_t=u_{xx}$ (профиль сглаживается и затухает) и Лапласа $u_{xx}+u_{yy}=0$ (равновесие). Они «ведут себя» совершенно по-разному. Причина — в коэффициентах при вторых производных.

Школьная аналогия: тип кривой $Ax^2+2Bxy+Cy^2=1$ зависит от знака $B^2-AC$: положительный — гипербола, нуль — парабола, отрицательный — эллипс. С УЧП точно так же!

Упражнение: запишите волновое уравнение как $u_{xx}-u_{tt}=0$. При $u_{xx}$ стоит $1$, при $u_{tt}$ стоит $-1$, смешанного члена нет. $0^2-1\cdot(-1)=1>0$ — «гипербола».`,
          R`In topic 13 we met three equations: the wave equation $u_{tt}=u_{xx}$ (a signal travels far without distortion), the heat equation $u_t=u_{xx}$ (the profile smooths out and decays) and Laplace’s equation $u_{xx}+u_{yy}=0$ (equilibrium). They “behave” very differently. The reason lies in the coefficients of the second derivatives.

A school analogy: the type of the curve $Ax^2+2Bxy+Cy^2=1$ depends on the sign of $B^2-AC$: positive gives a hyperbola, zero a parabola, negative an ellipse. PDEs work exactly the same way!

Exercise: write the wave equation as $u_{xx}-u_{tt}=0$. The coefficient of $u_{xx}$ is $1$, that of $u_{tt}$ is $-1$, and there is no mixed term. $0^2-1\cdot(-1)=1>0$: a “hyperbola”.`) },
        { type: 'def', title: L('Kelishuv: tenglama yozilishi va diskriminant', 'Соглашение: запись уравнения и дискриминант', 'Convention: how the equation is written and the discriminant'),
          body: L(R`Bu kursda ikki o‘zgaruvchili ikkinchi tartibli chiziqli tenglamani **doim** quyidagicha yozamiz (aralash had oldida **$2b$**):
$$a\,u_{xx}+2b\,u_{xy}+c\,u_{yy}+d\,u_x+e\,u_y+g\,u=f,$$
bu yerda $a,b,c,\dots$ — $x,y$ ning funksiyalari, $a,b,c$ bir vaqtda nolga teng emas. **Diskriminant**:
$$\Delta=b^2-ac.$$
Faqat ikkinchi tartibli hosilalar (bosh qism) turini aniqlaydi; $d,e,g,f$ turga ta’sir qilmaydi.`,
          R`В этом курсе линейное уравнение второго порядка с двумя переменными **всегда** записываем так (при смешанной производной стоит **$2b$**):
$$a\,u_{xx}+2b\,u_{xy}+c\,u_{yy}+d\,u_x+e\,u_y+g\,u=f,$$
где $a,b,c,\dots$ — функции от $x,y$, причём $a,b,c$ не обращаются в нуль одновременно. **Дискриминант**:
$$\Delta=b^2-ac.$$
Тип определяют только вторые производные (главная часть); $d,e,g,f$ на тип не влияют.`,
          R`In this course we **always** write a linear second-order equation in two variables as (note **$2b$** in front of the mixed derivative)
$$a\,u_{xx}+2b\,u_{xy}+c\,u_{yy}+d\,u_x+e\,u_y+g\,u=f,$$
where $a,b,c,\dots$ are functions of $x,y$ and $a,b,c$ do not vanish simultaneously. The **discriminant** is
$$\Delta=b^2-ac.$$
Only the second derivatives (the principal part) decide the type; $d,e,g,f$ do not affect it.`) },
        { type: 'warn', title: L('Boshqa kitoblardagi yozuv', 'Запись в других книгах', 'Notation in other books'),
          body: L(R`Ba’zi darsliklar (ko‘pincha ingliz tilidagilar) tenglamani $A u_{xx}+B u_{xy}+C u_{yy}+\dots=0$ deb yozadi — aralash had oldida $2$ yo‘q — va $B^2-4AC$ dan foydalanadi. Ikkala yozuv bog‘liq: $B=2b$ bo‘lgani uchun $B^2-4AC=4(b^2-ac)$, **ishora bir xil**. Xato faqat yozuvlarni aralashtirganda chiqadi: $u_{xx}+2u_{xy}+2u_{yy}=0$ da bizning $b=1$ (ya’ni $2b=2$), $\Delta=1-2=-1<0$ — elliptik. Agar $b=2$ deb olsangiz, $4-2>0$ — noto‘g‘ri “giperbolik” javob chiqadi.`,
          R`Некоторые учебники (часто англоязычные) пишут уравнение как $A u_{xx}+B u_{xy}+C u_{yy}+\dots=0$ — без множителя $2$ при смешанной производной — и используют $B^2-4AC$. Записи связаны: $B=2b$, поэтому $B^2-4AC=4(b^2-ac)$, **знак тот же**. Ошибка возникает только при смешении записей: в $u_{xx}+2u_{xy}+2u_{yy}=0$ у нас $b=1$ (т.е. $2b=2$), $\Delta=1-2=-1<0$ — эллиптическое. Если взять $b=2$, получится $4-2>0$ — неверный ответ «гиперболическое».`,
          R`Some textbooks (often in English) write the equation as $A u_{xx}+B u_{xy}+C u_{yy}+\dots=0$, without the factor $2$ on the mixed term, and use $B^2-4AC$. The two are related: $B=2b$, so $B^2-4AC=4(b^2-ac)$ and **the sign is the same**. Errors come only from mixing the notations: in $u_{xx}+2u_{xy}+2u_{yy}=0$ our $b=1$ (since $2b=2$), and $\Delta=1-2=-1<0$: elliptic. Taking $b=2$ gives $4-2>0$, the wrong answer “hyperbolic”.`) },
        { type: 'def', title: L('Tenglama turlari', 'Типы уравнений', 'Types of equations'),
          body: L(R`$(x_0,y_0)$ nuqtada tenglama:
- **giperbolik**, agar $\Delta(x_0,y_0)>0$ (namuna: to‘lqin tenglamasi);
- **parabolik**, agar $\Delta(x_0,y_0)=0$ (namuna: issiqlik tenglamasi);
- **elliptik**, agar $\Delta(x_0,y_0)<0$ (namuna: Laplas tenglamasi).

Tenglama sohada biror turga tegishli, agar sohaning har bir nuqtasida shu turga tegishli bo‘lsa. Koeffitsiyentlar o‘zgaruvchan bo‘lsa, **tur sohadan sohaga o‘zgarishi mumkin** — bunday tenglama **aralash turdagi** deyiladi.`,
          R`В точке $(x_0,y_0)$ уравнение:
- **гиперболическое**, если $\Delta(x_0,y_0)>0$ (образец — волновое уравнение);
- **параболическое**, если $\Delta(x_0,y_0)=0$ (образец — уравнение теплопроводности);
- **эллиптическое**, если $\Delta(x_0,y_0)<0$ (образец — уравнение Лапласа).

Уравнение имеет данный тип в области, если оно имеет этот тип в каждой её точке. При переменных коэффициентах **тип может меняться от области к области** — такое уравнение называется **уравнением смешанного типа**.`,
          R`At a point $(x_0,y_0)$ the equation is:
- **hyperbolic** if $\Delta(x_0,y_0)>0$ (model: the wave equation);
- **parabolic** if $\Delta(x_0,y_0)=0$ (model: the heat equation);
- **elliptic** if $\Delta(x_0,y_0)<0$ (model: Laplace’s equation).

An equation has a type in a domain if it has that type at every point. With variable coefficients **the type may change from region to region**; such an equation is of **mixed type**.`) },
        { type: 'example', title: L('O‘zgarmas koeffitsiyentli tenglamalar turi', 'Тип уравнений с постоянными коэффициентами', 'Types of constant-coefficient equations'),
          body: L(R`Turini aniqlang: a) $u_{xx}+4u_{xy}+3u_{yy}=0$; b) $9u_{xx}-6u_{xy}+u_{yy}+u_x=0$; c) $u_{xx}+2u_{xy}+2u_{yy}=0$; d) $u_t=a^2u_{xx}$.`, R`Определите тип: а) $u_{xx}+4u_{xy}+3u_{yy}=0$; б) $9u_{xx}-6u_{xy}+u_{yy}+u_x=0$; в) $u_{xx}+2u_{xy}+2u_{yy}=0$; г) $u_t=a^2u_{xx}$.`, R`Find the type: a) $u_{xx}+4u_{xy}+3u_{yy}=0$; b) $9u_{xx}-6u_{xy}+u_{yy}+u_x=0$; c) $u_{xx}+2u_{xy}+2u_{yy}=0$; d) $u_t=a^2u_{xx}$.`),
          steps: [
            L(R`a) $a=1$, $2b=4\Rightarrow b=2$, $c=3$: $\Delta=4-3=1>0$ — **giperbolik**.`, R`а) $a=1$, $2b=4\Rightarrow b=2$, $c=3$: $\Delta=4-3=1>0$ — **гиперболическое**.`, R`a) $a=1$, $2b=4\Rightarrow b=2$, $c=3$: $\Delta=4-3=1>0$, **hyperbolic**.`),
            L(R`b) $a=9$, $b=-3$, $c=1$: $\Delta=9-9=0$ — **parabolik** ($u_x$ hadi turga ta’sir qilmaydi).`, R`б) $a=9$, $b=-3$, $c=1$: $\Delta=9-9=0$ — **параболическое** (член $u_x$ на тип не влияет).`, R`b) $a=9$, $b=-3$, $c=1$: $\Delta=9-9=0$, **parabolic** (the term $u_x$ does not affect the type).`),
            L(R`c) $a=1$, $b=1$, $c=2$: $\Delta=1-2=-1<0$ — **elliptik**.`, R`в) $a=1$, $b=1$, $c=2$: $\Delta=1-2=-1<0$ — **эллиптическое**.`, R`c) $a=1$, $b=1$, $c=2$: $\Delta=1-2=-1<0$, **elliptic**.`),
            L(R`d) $a^2u_{xx}-u_t=0$, o‘zgaruvchilar $(x,t)$: $u_{xx}$ oldida $a^2$, $u_{xt}$ va $u_{tt}$ yo‘q: $\Delta=0-a^2\cdot0=0$ — **parabolik**.`, R`г) $a^2u_{xx}-u_t=0$, переменные $(x,t)$: при $u_{xx}$ стоит $a^2$, $u_{xt}$ и $u_{tt}$ нет: $\Delta=0-a^2\cdot0=0$ — **параболическое**.`, R`d) $a^2u_{xx}-u_t=0$ in variables $(x,t)$: $u_{xx}$ has coefficient $a^2$, there is no $u_{xt}$ or $u_{tt}$: $\Delta=0-a^2\cdot0=0$, **parabolic**.`)
          ] },
        { type: 'example', title: L('Turi o‘zgaradigan tenglama: Trikomi tenglamasi', 'Уравнение, меняющее тип: уравнение Трикоми', 'An equation that changes type: the Tricomi equation'),
          body: L(R`$y\,u_{xx}+u_{yy}=0$ tenglamaning turini tekislikning turli qismlarida aniqlang. (Bu tenglama tovushdan tez va sekin oqimlar chegarasidagi gaz oqimini tavsiflaydi.)`, R`Определите тип уравнения $y\,u_{xx}+u_{yy}=0$ в разных частях плоскости. (Оно описывает течение газа около перехода от дозвуковой к сверхзвуковой скорости.)`, R`Find the type of $y\,u_{xx}+u_{yy}=0$ in different parts of the plane. (It describes gas flow near the transition between subsonic and supersonic speeds.)`),
          steps: [
            L(R`$a=y$, $b=0$, $c=1$: $\Delta=0-y\cdot1=-y$.`, R`$a=y$, $b=0$, $c=1$: $\Delta=0-y\cdot1=-y$.`, R`$a=y$, $b=0$, $c=1$: $\Delta=0-y\cdot1=-y$.`),
            L(R`$y>0$ (yuqori yarim tekislik): $\Delta<0$ — **elliptik** (tovushdan sekin oqim).`, R`$y>0$ (верхняя полуплоскость): $\Delta<0$ — **эллиптическое** (дозвуковое течение).`, R`$y>0$ (upper half-plane): $\Delta<0$, **elliptic** (subsonic flow).`),
            L(R`$y<0$: $\Delta>0$ — **giperbolik** (tovushdan tez oqim). Xarakteristikalar: $x\pm\frac23(-y)^{3/2}=C$.`, R`$y<0$: $\Delta>0$ — **гиперболическое** (сверхзвуковое течение). Характеристики: $x\pm\frac23(-y)^{3/2}=C$.`, R`$y<0$: $\Delta>0$, **hyperbolic** (supersonic flow). Characteristics: $x\pm\frac23(-y)^{3/2}=C$.`),
            L(R`$y=0$ chiziqda $\Delta=0$ — **parabolik** (turning o‘zgarish chizig‘i). Demak, “tenglama qaysi turga tegishli?” savoliga sohani ko‘rsatmasdan javob berib bo‘lmaydi.`, R`На прямой $y=0$: $\Delta=0$ — **параболическое** (линия перехода типа). Значит, на вопрос «какого типа уравнение?» нельзя ответить, не указав область.`, R`On the line $y=0$: $\Delta=0$, **parabolic** (the line where the type changes). So the question “what type is this equation?” has no answer until a region is specified.`)
          ],
          check: L(R`Masalan, $(1,-4)$ nuqtada $\Delta=4>0$ — giperbolik; $(0,2)$ da $\Delta=-2<0$ — elliptik.`, R`Например, в точке $(1,-4)$: $\Delta=4>0$ — гиперболическое; в $(0,2)$: $\Delta=-2<0$ — эллиптическое.`, R`For example at $(1,-4)$: $\Delta=4>0$, hyperbolic; at $(0,2)$: $\Delta=-2<0$, elliptic.`) },
        { type: 'lab', lab: 'L11', body: L(R`Laboratoriyada $a$, $b$, $c$ koeffitsiyentlarini (yoki ularning $x,y$ ga bog‘liqligini) kiriting: dastur $\Delta=b^2-ac$ ni hisoblaydi va tekislikni giperbolik, parabolik va elliptik sohalarga bo‘lib bo‘yaydi.`, R`В лаборатории введите коэффициенты $a$, $b$, $c$ (или их зависимость от $x,y$): программа вычислит $\Delta=b^2-ac$ и раскрасит плоскость на гиперболическую, параболическую и эллиптическую области.`, R`In the lab, enter the coefficients $a$, $b$, $c$ (or how they depend on $x,y$): the program computes $\Delta=b^2-ac$ and colours the plane into hyperbolic, parabolic and elliptic regions.`) }
      ]
    },
    {
      id: 't14.2',
      title: L('Xarakteristikalar va o‘zgaruvchilarni almashtirish', 'Характеристики и замена переменных', 'Characteristics and change of variables'),
      blocks: [
        { type: 'def', title: L('O‘zgaruvchilarni almashtirish', 'Замена переменных', 'Change of variables'),
          body: L(R`Yangi o‘zgaruvchilar $\xi=\xi(x,y)$, $\eta=\eta(x,y)$ kiritamiz ($C^2$ sinfdan, yakobian $J=\xi_x\eta_y-\xi_y\eta_x\ne0$). Zanjir qoidasi bilan bosh qism quyidagicha o‘zgaradi:
$$a u_{xx}+2b u_{xy}+c u_{yy}=A u_{\xi\xi}+2B u_{\xi\eta}+C u_{\eta\eta}+(\text{quyi tartibli hadlar}),$$
$$A=a\xi_x^2+2b\xi_x\xi_y+c\xi_y^2,\qquad C=a\eta_x^2+2b\eta_x\eta_y+c\eta_y^2,$$
$$B=a\xi_x\eta_x+b(\xi_x\eta_y+\xi_y\eta_x)+c\xi_y\eta_y.$$
Maqsad: $\xi,\eta$ ni shunday tanlashki, $A,B,C$ dan iloji boricha ko‘pi nol bo‘lsin.`,
          R`Введём новые переменные $\xi=\xi(x,y)$, $\eta=\eta(x,y)$ (класса $C^2$, якобиан $J=\xi_x\eta_y-\xi_y\eta_x\ne0$). По цепному правилу главная часть преобразуется так:
$$a u_{xx}+2b u_{xy}+c u_{yy}=A u_{\xi\xi}+2B u_{\xi\eta}+C u_{\eta\eta}+(\text{младшие члены}),$$
$$A=a\xi_x^2+2b\xi_x\xi_y+c\xi_y^2,\qquad C=a\eta_x^2+2b\eta_x\eta_y+c\eta_y^2,$$
$$B=a\xi_x\eta_x+b(\xi_x\eta_y+\xi_y\eta_x)+c\xi_y\eta_y.$$
Цель: выбрать $\xi,\eta$ так, чтобы как можно больше из $A,B,C$ обратились в нуль.`,
          R`Introduce new variables $\xi=\xi(x,y)$, $\eta=\eta(x,y)$ (of class $C^2$, with Jacobian $J=\xi_x\eta_y-\xi_y\eta_x\ne0$). By the chain rule the principal part becomes
$$a u_{xx}+2b u_{xy}+c u_{yy}=A u_{\xi\xi}+2B u_{\xi\eta}+C u_{\eta\eta}+(\text{lower-order terms}),$$
$$A=a\xi_x^2+2b\xi_x\xi_y+c\xi_y^2,\qquad C=a\eta_x^2+2b\eta_x\eta_y+c\eta_y^2,$$
$$B=a\xi_x\eta_x+b(\xi_x\eta_y+\xi_y\eta_x)+c\xi_y\eta_y.$$
Goal: choose $\xi,\eta$ so that as many of $A,B,C$ as possible vanish.`) },
        { type: 'thm', title: L('Tur almashtirishda saqlanadi', 'Тип сохраняется при замене', 'The type is invariant'),
          conds: L(R`$\xi,\eta\in C^2$ va qaralayotgan nuqtada $J=\xi_x\eta_y-\xi_y\eta_x\ne0$.`, R`$\xi,\eta\in C^2$ и в рассматриваемой точке $J=\xi_x\eta_y-\xi_y\eta_x\ne0$.`, R`$\xi,\eta\in C^2$ and $J=\xi_x\eta_y-\xi_y\eta_x\ne0$ at the point considered.`),
          body: L(R`$$B^2-AC=(b^2-ac)\,J^2.$$
$J^2>0$ bo‘lgani uchun yangi diskriminantning ishorasi eskisiniki bilan bir xil: o‘zgaruvchilarni almashtirish tenglama turini o‘zgartirmaydi.`,
          R`$$B^2-AC=(b^2-ac)\,J^2.$$
Так как $J^2>0$, знак нового дискриминанта совпадает со знаком старого: замена переменных не меняет тип уравнения.`,
          R`$$B^2-AC=(b^2-ac)\,J^2.$$
Since $J^2>0$, the new discriminant has the same sign as the old one: a change of variables does not change the type.`) },
        { type: 'def', title: L('Xarakteristik tenglama va xarakteristikalar', 'Характеристическое уравнение и характеристики', 'Characteristic equation and characteristics'),
          body: L(R`$A=0$ shartini qarang: $a\xi_x^2+2b\xi_x\xi_y+c\xi_y^2=0$. Agar $\xi(x,y)=C$ chiziq bo‘ylab $dy/dx=-\xi_x/\xi_y$ bo‘lsa, bu shart **xarakteristik tenglamaga** aylanadi:
$$a\,dy^2-2b\,dx\,dy+c\,dx^2=0.$$
$a\ne0$ da: $\dfrac{dy}{dx}=\dfrac{b\pm\sqrt{b^2-ac}}{a}$. Bu ODT larning integral chiziqlari $\varphi(x,y)=C$ — **xarakteristikalar**; $\xi=\varphi(x,y)$ deb olsak, $A=0$ bo‘ladi.
- $\Delta>0$: ikki xil haqiqiy xarakteristikalar oilasi;
- $\Delta=0$: bitta oila;
- $\Delta<0$: haqiqiy xarakteristika yo‘q, kompleks qo‘shma oilalar.

Diqqat: tenglamadagi ishora — $-2b$ (minus). $a=0$, $c\ne0$ bo‘lsa, $dx/dy$ ga nisbatan yeching.`,
          R`Рассмотрим условие $A=0$: $a\xi_x^2+2b\xi_x\xi_y+c\xi_y^2=0$. Вдоль линии $\xi(x,y)=C$ имеем $dy/dx=-\xi_x/\xi_y$, и условие превращается в **характеристическое уравнение**:
$$a\,dy^2-2b\,dx\,dy+c\,dx^2=0.$$
При $a\ne0$: $\dfrac{dy}{dx}=\dfrac{b\pm\sqrt{b^2-ac}}{a}$. Интегральные кривые этих ОДУ $\varphi(x,y)=C$ — **характеристики**; при $\xi=\varphi(x,y)$ получаем $A=0$.
- $\Delta>0$: два различных вещественных семейства характеристик;
- $\Delta=0$: одно семейство;
- $\Delta<0$: вещественных характеристик нет, комплексно сопряжённые семейства.

Внимание: в уравнении знак $-2b$ (минус). Если $a=0$, $c\ne0$, решайте относительно $dx/dy$.`,
          R`Consider the condition $A=0$: $a\xi_x^2+2b\xi_x\xi_y+c\xi_y^2=0$. Along a curve $\xi(x,y)=C$ we have $dy/dx=-\xi_x/\xi_y$, and the condition becomes the **characteristic equation**
$$a\,dy^2-2b\,dx\,dy+c\,dx^2=0.$$
For $a\ne0$: $\dfrac{dy}{dx}=\dfrac{b\pm\sqrt{b^2-ac}}{a}$. The integral curves $\varphi(x,y)=C$ of these ODEs are the **characteristics**; taking $\xi=\varphi(x,y)$ gives $A=0$.
- $\Delta>0$: two distinct real families of characteristics;
- $\Delta=0$: one family;
- $\Delta<0$: no real characteristics, complex conjugate families.

Note the sign $-2b$ (minus) in the equation. If $a=0$ and $c\ne0$, solve for $dx/dy$ instead.`) },
        { type: 'thm', title: L('Kanonik ko‘rinishlar', 'Канонические виды', 'Canonical forms'),
          conds: L(R`$a,b,c$ — o‘zgarmaslar (yoki sohada yetarlicha silliq funksiyalar, elliptik holda — analitik), bir vaqtda nolga teng emas va tenglama sohada bir xil turga tegishli.`, R`$a,b,c$ — постоянные (или достаточно гладкие функции в области, в эллиптическом случае — аналитические), не равные нулю одновременно, и уравнение имеет в области один и тот же тип.`, R`$a,b,c$ are constants (or sufficiently smooth functions on the domain, analytic in the elliptic case), not all zero, and the equation has the same type throughout the domain.`),
          body: L(R`Mos almashtirish bilan tenglama (hech bo‘lmaganda lokal) quyidagi ko‘rinishga keladi ($F$ — quyi tartibli hadlar):
- giperbolik: $u_{\xi\eta}=F$ (yoki $\alpha=\xi+\eta$, $\beta=\xi-\eta$ bilan $u_{\alpha\alpha}-u_{\beta\beta}=F$); $\xi,\eta$ — ikki xarakteristikalar oilasi;
- parabolik: $u_{\eta\eta}=F$; $\xi$ — yagona xarakteristikalar oilasi, $\eta$ — $J\ne0$ bo‘ladigan ixtiyoriy funksiya;
- elliptik: $u_{\alpha\alpha}+u_{\beta\beta}=F$; $\varphi=\alpha+i\beta$ — kompleks xarakteristikaning integrali.`,
          R`Подходящей заменой уравнение (по крайней мере локально) приводится к виду ($F$ — младшие члены):
- гиперболическое: $u_{\xi\eta}=F$ (или при $\alpha=\xi+\eta$, $\beta=\xi-\eta$: $u_{\alpha\alpha}-u_{\beta\beta}=F$); $\xi,\eta$ — два семейства характеристик;
- параболическое: $u_{\eta\eta}=F$; $\xi$ — единственное семейство характеристик, $\eta$ — любая функция с $J\ne0$;
- эллиптическое: $u_{\alpha\alpha}+u_{\beta\beta}=F$; $\varphi=\alpha+i\beta$ — интеграл комплексной характеристики.`,
          R`A suitable change of variables brings the equation (at least locally) to the form ($F$ collects lower-order terms):
- hyperbolic: $u_{\xi\eta}=F$ (or, with $\alpha=\xi+\eta$, $\beta=\xi-\eta$, $u_{\alpha\alpha}-u_{\beta\beta}=F$); $\xi,\eta$ are the two families of characteristics;
- parabolic: $u_{\eta\eta}=F$; $\xi$ is the single family of characteristics and $\eta$ is any function with $J\ne0$;
- elliptic: $u_{\alpha\alpha}+u_{\beta\beta}=F$; $\varphi=\alpha+i\beta$ is an integral of the complex characteristic equation.`) },
        { type: 'proof', body: L(R`Invariantlik formulasi $A,B,C$ ifodalarini to‘g‘ridan-to‘g‘ri ko‘paytirib tekshiriladi: $B^2-AC$ dagi $\xi$ va $\eta$ ning hosilalari $(\xi_x\eta_y-\xi_y\eta_x)^2$ ga yig‘iladi. Giperbolik holda $\xi,\eta$ — ikki xarakteristika, shuning uchun $A=C=0$, va $J\ne0$ dan $B\ne0$. Parabolik holda $A=0$, u holda $B^2=AC+0=0$, ya’ni $B=0$ avtomatik. Elliptik holda $\varphi=\alpha+i\beta$ uchun $A(\varphi)=0$ ning haqiqiy va mavhum qismlari $A(\alpha)=A(\beta)$ va $B(\alpha,\beta)=0$ ni beradi.`,
          R`Формула инвариантности проверяется прямым перемножением выражений $A,B,C$: производные $\xi$ и $\eta$ в $B^2-AC$ собираются в $(\xi_x\eta_y-\xi_y\eta_x)^2$. В гиперболическом случае $\xi,\eta$ — две характеристики, поэтому $A=C=0$, а из $J\ne0$ следует $B\ne0$. В параболическом случае $A=0$, тогда $B^2=AC+0=0$, т.е. $B=0$ автоматически. В эллиптическом случае для $\varphi=\alpha+i\beta$ вещественная и мнимая части $A(\varphi)=0$ дают $A(\alpha)=A(\beta)$ и $B(\alpha,\beta)=0$.`,
          R`The invariance formula is checked by multiplying out $A,B,C$: the derivatives of $\xi$ and $\eta$ in $B^2-AC$ collect into $(\xi_x\eta_y-\xi_y\eta_x)^2$. In the hyperbolic case $\xi,\eta$ are the two characteristics, so $A=C=0$, and $J\ne0$ forces $B\ne0$. In the parabolic case $A=0$, so $B^2=AC+0=0$ and $B=0$ automatically. In the elliptic case the real and imaginary parts of $A(\varphi)=0$ for $\varphi=\alpha+i\beta$ give $A(\alpha)=A(\beta)$ and $B(\alpha,\beta)=0$.`) },
        { type: 'warn', body: L(R`Kanonik ko‘rinishga keltirishda faqat bosh qismni emas, **quyi tartibli hadlarni ham** yangi o‘zgaruvchilarda qayta yozing: $u_x=u_\xi\xi_x+u_\eta\eta_x$, $u_y=u_\xi\xi_y+u_\eta\eta_y$. Shuningdek $J\ne0$ ni tekshiring: parabolik holda $\eta=\xi$ deb olish mumkin emas.`,
          R`При приведении к каноническому виду переписывайте в новых переменных не только главную часть, но и **младшие члены**: $u_x=u_\xi\xi_x+u_\eta\eta_x$, $u_y=u_\xi\xi_y+u_\eta\eta_y$. И проверяйте $J\ne0$: в параболическом случае нельзя брать $\eta=\xi$.`,
          R`When reducing to canonical form, rewrite not only the principal part but also the **lower-order terms** in the new variables: $u_x=u_\xi\xi_x+u_\eta\eta_x$, $u_y=u_\xi\xi_y+u_\eta\eta_y$. And check $J\ne0$: in the parabolic case you cannot take $\eta=\xi$.`) }
      ]
    },
    {
      id: 't14.3',
      title: L('Kanonik ko‘rinishga keltirish: uch tur bo‘yicha misollar', 'Приведение к каноническому виду: примеры для трёх типов', 'Reduction to canonical form: examples for the three types'),
      blocks: [
        { type: 'example', title: L('Giperbolik holat', 'Гиперболический случай', 'The hyperbolic case'),
          body: L(R`$u_{xx}-2u_{xy}-3u_{yy}=0$ tenglamani kanonik ko‘rinishga keltiring va umumiy yechimini toping.`, R`Приведите уравнение $u_{xx}-2u_{xy}-3u_{yy}=0$ к каноническому виду и найдите общее решение.`, R`Reduce $u_{xx}-2u_{xy}-3u_{yy}=0$ to canonical form and find its general solution.`),
          steps: [
            L(R`$a=1$, $2b=-2\Rightarrow b=-1$, $c=-3$. $\Delta=1+3=4>0$ — giperbolik.`, R`$a=1$, $2b=-2\Rightarrow b=-1$, $c=-3$. $\Delta=1+3=4>0$ — гиперболическое.`, R`$a=1$, $2b=-2\Rightarrow b=-1$, $c=-3$. $\Delta=1+3=4>0$: hyperbolic.`),
            L(R`Xarakteristik tenglama: $dy^2+2\,dx\,dy-3\,dx^2=0$, ya’ni $(y')^2+2y'-3=0$, $y'=1$ yoki $y'=-3$ (tekshiruv: $\frac{b\pm\sqrt\Delta}{a}=-1\pm2$).`, R`Характеристическое уравнение: $dy^2+2\,dx\,dy-3\,dx^2=0$, т.е. $(y')^2+2y'-3=0$, $y'=1$ или $y'=-3$ (проверка: $\frac{b\pm\sqrt\Delta}{a}=-1\pm2$).`, R`Characteristic equation: $dy^2+2\,dx\,dy-3\,dx^2=0$, i.e. $(y')^2+2y'-3=0$, so $y'=1$ or $y'=-3$ (check: $\frac{b\pm\sqrt\Delta}{a}=-1\pm2$).`),
            L(R`Xarakteristikalar: $y-x=C_1$, $y+3x=C_2$. $\xi=y-x$, $\eta=y+3x$; $J=(-1)(1)-(1)(3)=-4\ne0$.`, R`Характеристики: $y-x=C_1$, $y+3x=C_2$. $\xi=y-x$, $\eta=y+3x$; $J=(-1)(1)-(1)(3)=-4\ne0$.`, R`Characteristics: $y-x=C_1$, $y+3x=C_2$. $\xi=y-x$, $\eta=y+3x$; $J=(-1)(1)-(1)(3)=-4\ne0$.`),
            L(R`Koeffitsiyentlar: $A=C=0$, $B=1\cdot(-1)\cdot3+(-1)\big((-1)\cdot1+1\cdot3\big)+(-3)\cdot1\cdot1=-8$. Tenglama: $2B\,u_{\xi\eta}=-16\,u_{\xi\eta}=0$, ya’ni $u_{\xi\eta}=0$.`, R`Коэффициенты: $A=C=0$, $B=1\cdot(-1)\cdot3+(-1)\big((-1)\cdot1+1\cdot3\big)+(-3)\cdot1\cdot1=-8$. Уравнение: $2B\,u_{\xi\eta}=-16\,u_{\xi\eta}=0$, т.е. $u_{\xi\eta}=0$.`, R`Coefficients: $A=C=0$, $B=1\cdot(-1)\cdot3+(-1)\big((-1)\cdot1+1\cdot3\big)+(-3)\cdot1\cdot1=-8$. The equation becomes $2B\,u_{\xi\eta}=-16\,u_{\xi\eta}=0$, i.e. $u_{\xi\eta}=0$.`),
            L(R`13-mavzudagidek, $u=f(\xi)+g(\eta)$: umumiy yechim $u=f(y-x)+g(y+3x)$, $f,g$ — ixtiyoriy $C^2$ funksiyalar.`, R`Как в теме 13, $u=f(\xi)+g(\eta)$: общее решение $u=f(y-x)+g(y+3x)$, $f,g$ — произвольные функции класса $C^2$.`, R`As in topic 13, $u=f(\xi)+g(\eta)$: the general solution is $u=f(y-x)+g(y+3x)$ with arbitrary $C^2$ functions $f,g$.`)
          ],
          check: L(R`$u_{xx}=f''+9g''$, $u_{xy}=-f''+3g''$, $u_{yy}=f''+g''$; $u_{xx}-2u_{xy}-3u_{yy}=(1+2-3)f''+(9-6-3)g''=0$ ✓.`, R`$u_{xx}=f''+9g''$, $u_{xy}=-f''+3g''$, $u_{yy}=f''+g''$; $u_{xx}-2u_{xy}-3u_{yy}=(1+2-3)f''+(9-6-3)g''=0$ ✓.`, R`$u_{xx}=f''+9g''$, $u_{xy}=-f''+3g''$, $u_{yy}=f''+g''$; $u_{xx}-2u_{xy}-3u_{yy}=(1+2-3)f''+(9-6-3)g''=0$ ✓.`) },
        { type: 'example', title: L('Parabolik holat: issiqlik tenglamasi paydo bo‘ladi', 'Параболический случай: появляется уравнение теплопроводности', 'The parabolic case: a heat equation appears'),
          body: L(R`$u_{xx}-4u_{xy}+4u_{yy}=u_y$ tenglamani kanonik ko‘rinishga keltiring.`, R`Приведите к каноническому виду уравнение $u_{xx}-4u_{xy}+4u_{yy}=u_y$.`, R`Reduce $u_{xx}-4u_{xy}+4u_{yy}=u_y$ to canonical form.`),
          steps: [
            L(R`$a=1$, $b=-2$, $c=4$: $\Delta=4-4=0$ — parabolik.`, R`$a=1$, $b=-2$, $c=4$: $\Delta=4-4=0$ — параболическое.`, R`$a=1$, $b=-2$, $c=4$: $\Delta=4-4=0$: parabolic.`),
            L(R`Xarakteristik tenglama: $dy^2+4\,dx\,dy+4\,dx^2=(dy+2\,dx)^2=0$, $y'=-2$, xarakteristikalar $y+2x=C$.`, R`Характеристическое уравнение: $dy^2+4\,dx\,dy+4\,dx^2=(dy+2\,dx)^2=0$, $y'=-2$, характеристики $y+2x=C$.`, R`Characteristic equation: $dy^2+4\,dx\,dy+4\,dx^2=(dy+2\,dx)^2=0$, $y'=-2$, characteristics $y+2x=C$.`),
            L(R`$\xi=y+2x$, $\eta=x$ (oddiy tanlov; $J=2\cdot0-1\cdot1=-1\ne0$). Unda $A=0$, $B=0$, $C=a\eta_x^2=1$.`, R`$\xi=y+2x$, $\eta=x$ (простейший выбор; $J=2\cdot0-1\cdot1=-1\ne0$). Тогда $A=0$, $B=0$, $C=a\eta_x^2=1$.`, R`$\xi=y+2x$, $\eta=x$ (the simplest choice; $J=2\cdot0-1\cdot1=-1\ne0$). Then $A=0$, $B=0$, $C=a\eta_x^2=1$.`),
            L(R`Quyi had: $u_y=u_\xi\xi_y+u_\eta\eta_y=u_\xi$. Kanonik ko‘rinish: $u_{\eta\eta}=u_\xi$ — bu $\xi$ “vaqt” rolini o‘ynaydigan **issiqlik tenglamasi**!`, R`Младший член: $u_y=u_\xi\xi_y+u_\eta\eta_y=u_\xi$. Канонический вид: $u_{\eta\eta}=u_\xi$ — это **уравнение теплопроводности**, где роль «времени» играет $\xi$!`, R`Lower-order term: $u_y=u_\xi\xi_y+u_\eta\eta_y=u_\xi$. Canonical form: $u_{\eta\eta}=u_\xi$, a **heat equation** with $\xi$ playing the role of “time”!`)
          ],
          check: L(R`$w=e^{\xi+\eta}$ kanonik tenglamani qanoatlantiradi ($w_{\eta\eta}=w=w_\xi$). Eski o‘zgaruvchilarda $u=e^{3x+y}$: $u_{xx}-4u_{xy}+4u_{yy}=(9-12+4)u=u=u_y$ ✓.`, R`$w=e^{\xi+\eta}$ удовлетворяет каноническому уравнению ($w_{\eta\eta}=w=w_\xi$). В старых переменных $u=e^{3x+y}$: $u_{xx}-4u_{xy}+4u_{yy}=(9-12+4)u=u=u_y$ ✓.`, R`$w=e^{\xi+\eta}$ satisfies the canonical equation ($w_{\eta\eta}=w=w_\xi$). In the old variables $u=e^{3x+y}$: $u_{xx}-4u_{xy}+4u_{yy}=(9-12+4)u=u=u_y$ ✓.`) },
        { type: 'example', title: L('Elliptik holat', 'Эллиптический случай', 'The elliptic case'),
          body: L(R`$u_{xx}+2u_{xy}+5u_{yy}=0$ tenglamani kanonik ko‘rinishga keltiring.`, R`Приведите к каноническому виду уравнение $u_{xx}+2u_{xy}+5u_{yy}=0$.`, R`Reduce $u_{xx}+2u_{xy}+5u_{yy}=0$ to canonical form.`),
          steps: [
            L(R`$a=1$, $b=1$, $c=5$: $\Delta=1-5=-4<0$ — elliptik.`, R`$a=1$, $b=1$, $c=5$: $\Delta=1-5=-4<0$ — эллиптическое.`, R`$a=1$, $b=1$, $c=5$: $\Delta=1-5=-4<0$: elliptic.`),
            L(R`Xarakteristik tenglama: $(y')^2-2y'+5=0$, $y'=1\pm2i$. Kompleks integral: $y-x-2ix=C$.`, R`Характеристическое уравнение: $(y')^2-2y'+5=0$, $y'=1\pm2i$. Комплексный интеграл: $y-x-2ix=C$.`, R`Characteristic equation: $(y')^2-2y'+5=0$, $y'=1\pm2i$. Complex integral: $y-x-2ix=C$.`),
            L(R`Haqiqiy va mavhum qismlar: $\alpha=y-x$, $\beta=2x$ (ishora muhim emas); $J=(-1)\cdot0-1\cdot2=-2\ne0$.`, R`Вещественная и мнимая части: $\alpha=y-x$, $\beta=2x$ (знак не важен); $J=(-1)\cdot0-1\cdot2=-2\ne0$.`, R`Real and imaginary parts: $\alpha=y-x$, $\beta=2x$ (the sign does not matter); $J=(-1)\cdot0-1\cdot2=-2\ne0$.`),
            L(R`$A=1-2+5=4$, $C=1\cdot4=4$, $B=1\cdot(-1)\cdot2+1\cdot(0+1\cdot2)+0=0$. Tenglama: $4u_{\alpha\alpha}+4u_{\beta\beta}=0$, ya’ni $u_{\alpha\alpha}+u_{\beta\beta}=0$ — Laplas tenglamasi.`, R`$A=1-2+5=4$, $C=1\cdot4=4$, $B=1\cdot(-1)\cdot2+1\cdot(0+1\cdot2)+0=0$. Уравнение: $4u_{\alpha\alpha}+4u_{\beta\beta}=0$, т.е. $u_{\alpha\alpha}+u_{\beta\beta}=0$ — уравнение Лапласа.`, R`$A=1-2+5=4$, $C=1\cdot4=4$, $B=1\cdot(-1)\cdot2+1\cdot(0+1\cdot2)+0=0$. The equation becomes $4u_{\alpha\alpha}+4u_{\beta\beta}=0$, i.e. $u_{\alpha\alpha}+u_{\beta\beta}=0$: Laplace’s equation.`)
          ],
          check: L(R`Garmonik $w=\alpha\beta$ ni olamiz: $u=2x(y-x)=2xy-2x^2$. $u_{xx}=-4$, $u_{xy}=2$, $u_{yy}=0$: $-4+2\cdot2+5\cdot0=0$ ✓.`, R`Возьмём гармоническую $w=\alpha\beta$: $u=2x(y-x)=2xy-2x^2$. $u_{xx}=-4$, $u_{xy}=2$, $u_{yy}=0$: $-4+2\cdot2+5\cdot0=0$ ✓.`, R`Take the harmonic $w=\alpha\beta$: $u=2x(y-x)=2xy-2x^2$. $u_{xx}=-4$, $u_{xy}=2$, $u_{yy}=0$: $-4+2\cdot2+5\cdot0=0$ ✓.`) },
        { type: 'example', title: L('To‘lqin tenglamasi va uning umumiy yechimi', 'Волновое уравнение и его общее решение', 'The wave equation and its general solution'),
          body: L(R`$u_{tt}=a^2u_{xx}$ ($a>0$) ni $(x,t)$ o‘zgaruvchilarda kanonik ko‘rinishga keltiring.`, R`Приведите $u_{tt}=a^2u_{xx}$ ($a>0$) к каноническому виду в переменных $(x,t)$.`, R`Reduce $u_{tt}=a^2u_{xx}$ ($a>0$) to canonical form in the variables $(x,t)$.`),
          steps: [
            L(R`$a^2u_{xx}-u_{tt}=0$: $u_{xx}$ oldida $a^2$, $b=0$, $u_{tt}$ oldida $-1$. $\Delta=0+a^2>0$ — giperbolik.`, R`$a^2u_{xx}-u_{tt}=0$: при $u_{xx}$ стоит $a^2$, $b=0$, при $u_{tt}$ стоит $-1$. $\Delta=0+a^2>0$ — гиперболическое.`, R`$a^2u_{xx}-u_{tt}=0$: coefficient $a^2$ on $u_{xx}$, $b=0$, coefficient $-1$ on $u_{tt}$. $\Delta=0+a^2>0$: hyperbolic.`),
            L(R`Xarakteristik tenglama ($y$ o‘rnida $t$): $a^2dt^2-dx^2=0$, $\dfrac{dx}{dt}=\pm a$; xarakteristikalar $x-at=C_1$, $x+at=C_2$ — tezligi $a$ bo‘lgan ikki yo‘nalishdagi to‘g‘ri chiziqlar.`, R`Характеристическое уравнение ($t$ вместо $y$): $a^2dt^2-dx^2=0$, $\dfrac{dx}{dt}=\pm a$; характеристики $x-at=C_1$, $x+at=C_2$ — прямые, движущиеся в двух направлениях со скоростью $a$.`, R`Characteristic equation ($t$ in place of $y$): $a^2dt^2-dx^2=0$, $\dfrac{dx}{dt}=\pm a$; characteristics $x-at=C_1$, $x+at=C_2$, lines moving in two directions with speed $a$.`),
            L(R`$\xi=x-at$, $\eta=x+at$: $A=C=0$, $B=2a^2$, tenglama $4a^2u_{\xi\eta}=0$, ya’ni $u_{\xi\eta}=0$.`, R`$\xi=x-at$, $\eta=x+at$: $A=C=0$, $B=2a^2$, уравнение $4a^2u_{\xi\eta}=0$, т.е. $u_{\xi\eta}=0$.`, R`$\xi=x-at$, $\eta=x+at$: $A=C=0$, $B=2a^2$, so $4a^2u_{\xi\eta}=0$, i.e. $u_{\xi\eta}=0$.`),
            L(R`Umumiy yechim: $u=f(x-at)+g(x+at)$ — o‘ngga va chapga $a$ tezlik bilan yuguruvchi ikki to‘lqin. Bu 15-mavzudagi Dalamber formulasining asosi.`, R`Общее решение: $u=f(x-at)+g(x+at)$ — две волны, бегущие вправо и влево со скоростью $a$. Это основа формулы Даламбера в теме 15.`, R`General solution: $u=f(x-at)+g(x+at)$, two waves running right and left with speed $a$. This is the basis of d’Alembert’s formula in topic 15.`)
          ],
          check: L(R`$u_{tt}=a^2f''+a^2g''$, $u_{xx}=f''+g''$, demak $u_{tt}=a^2u_{xx}$ ✓.`, R`$u_{tt}=a^2f''+a^2g''$, $u_{xx}=f''+g''$, значит $u_{tt}=a^2u_{xx}$ ✓.`, R`$u_{tt}=a^2f''+a^2g''$ and $u_{xx}=f''+g''$, so $u_{tt}=a^2u_{xx}$ ✓.`) },
        { type: 'note', title: L('Algoritm', 'Алгоритм', 'Algorithm'),
          body: L(R`1. Tenglamani $a u_{xx}+2b u_{xy}+c u_{yy}+\dots$ ko‘rinishida yozing va $b$ ni **aralash had koeffitsiyentining yarmi** deb oling.
2. $\Delta=b^2-ac$ ni hisoblang, turini aniqlang (o‘zgaruvchan koeffitsiyentda — sohalar bo‘yicha).
3. $a\,dy^2-2b\,dx\,dy+c\,dx^2=0$ ni yechib, xarakteristikalarni toping.
4. $\xi,\eta$ (yoki $\alpha,\beta$) ni tanlang, $J\ne0$ ni tekshiring.
5. $A,B,C$ ni va quyi tartibli hadlarni hisoblang, kanonik ko‘rinishni yozing.
6. Imkoni bo‘lsa, umumiy yechimni toping va dastlabki tenglamaga qo‘yib tekshiring.`,
          R`1. Запишите уравнение в виде $a u_{xx}+2b u_{xy}+c u_{yy}+\dots$ и возьмите $b$ равным **половине коэффициента при смешанной производной**.
2. Вычислите $\Delta=b^2-ac$, определите тип (при переменных коэффициентах — по областям).
3. Решите $a\,dy^2-2b\,dx\,dy+c\,dx^2=0$ и найдите характеристики.
4. Выберите $\xi,\eta$ (или $\alpha,\beta$), проверьте $J\ne0$.
5. Вычислите $A,B,C$ и младшие члены, запишите канонический вид.
6. Если возможно, найдите общее решение и проверьте его подстановкой в исходное уравнение.`,
          R`1. Write the equation as $a u_{xx}+2b u_{xy}+c u_{yy}+\dots$ and take $b$ as **half the coefficient of the mixed derivative**.
2. Compute $\Delta=b^2-ac$ and find the type (region by region for variable coefficients).
3. Solve $a\,dy^2-2b\,dx\,dy+c\,dx^2=0$ to get the characteristics.
4. Choose $\xi,\eta$ (or $\alpha,\beta$) and check $J\ne0$.
5. Compute $A,B,C$ and the lower-order terms; write the canonical form.
6. If possible, find the general solution and check it in the original equation.`) }
      ]
    }
  ],
  mistakes: [
    L(R`Aralash had koeffitsiyentini to‘liq $b$ deb olish: $u_{xx}+2u_{xy}+2u_{yy}$ da $b=1$, $b=2$ emas. Aks holda tur xato chiqishi mumkin.`, R`Брать весь коэффициент при смешанной производной за $b$: в $u_{xx}+2u_{xy}+2u_{yy}$ $b=1$, а не $2$. Иначе тип может получиться неверным.`, R`Taking the whole mixed coefficient as $b$: in $u_{xx}+2u_{xy}+2u_{yy}$, $b=1$, not $2$. Otherwise the type may come out wrong.`),
    L(R`$b^2-4ac$ formulasini bizning yozuv ($2b$) bilan aralashtirish. Yoki $B^2-4AC$ ($B$ — to‘liq koeffitsiyent), yoki $b^2-ac$ ($b$ — yarmi).`, R`Смешивать формулу $b^2-4ac$ с нашей записью ($2b$). Либо $B^2-4AC$ ($B$ — весь коэффициент), либо $b^2-ac$ ($b$ — половина).`, R`Mixing the formula $b^2-4ac$ with our notation ($2b$). Use either $B^2-4AC$ ($B$ the whole coefficient) or $b^2-ac$ ($b$ half of it).`),
    L(R`Xarakteristik tenglamada ishorani xato yozish: to‘g‘risi $a\,dy^2-2b\,dx\,dy+c\,dx^2=0$, ya’ni $y'=\frac{b\pm\sqrt\Delta}{a}$.`, R`Ошибаться в знаке в характеристическом уравнении: правильно $a\,dy^2-2b\,dx\,dy+c\,dx^2=0$, т.е. $y'=\frac{b\pm\sqrt\Delta}{a}$.`, R`Getting the sign wrong in the characteristic equation: it is $a\,dy^2-2b\,dx\,dy+c\,dx^2=0$, i.e. $y'=\frac{b\pm\sqrt\Delta}{a}$.`),
    L(R`O‘zgaruvchan koeffitsiyentli tenglama uchun bitta tur aytish (masalan, Trikomi tenglamasini “elliptik” deyish) — tur sohaga bog‘liq.`, R`Называть один тип для уравнения с переменными коэффициентами (например, «уравнение Трикоми эллиптическое») — тип зависит от области.`, R`Naming one type for a variable-coefficient equation (e.g. “the Tricomi equation is elliptic”): the type depends on the region.`),
    L(R`Kanonik ko‘rinishda quyi tartibli hadlarni ($u_x$, $u_y$) almashtirishni unutish.`, R`Забывать преобразовать младшие члены ($u_x$, $u_y$) при приведении к каноническому виду.`, R`Forgetting to transform the lower-order terms ($u_x$, $u_y$) in the canonical form.`),
    L(R`Parabolik holda $\eta$ ni $\xi$ ga bog‘liq qilib tanlash ($J=0$) — almashtirish teskarilanmaydi.`, R`Выбирать в параболическом случае $\eta$, зависящую от $\xi$ ($J=0$) — замена необратима.`, R`Choosing $\eta$ dependent on $\xi$ in the parabolic case ($J=0$): the change of variables is not invertible.`)
  ],
  exercises: [
    { id: 't14.x1', level: 'easy', type: 'numeric',
      q: L(R`$u_{xx}+4u_{xy}+3u_{yy}=0$ uchun $\Delta=b^2-ac$ ni kiriting.`, R`Введите $\Delta=b^2-ac$ для $u_{xx}+4u_{xy}+3u_{yy}=0$.`, R`Enter $\Delta=b^2-ac$ for $u_{xx}+4u_{xy}+3u_{yy}=0$.`),
      check: { kind: 'numeric', value: 1, tol: 0 },
      hint: L(R`$2b=4$, demak $b=2$.`, R`$2b=4$, значит $b=2$.`, R`$2b=4$, so $b=2$.`),
      solution: L(R`$a=1$, $b=2$, $c=3$: $\Delta=4-3=1>0$ — giperbolik.`, R`$a=1$, $b=2$, $c=3$: $\Delta=4-3=1>0$ — гиперболическое.`, R`$a=1$, $b=2$, $c=3$: $\Delta=4-3=1>0$, hyperbolic.`) },
    { id: 't14.x2', level: 'easy', type: 'match',
      q: L(R`Tenglamani turi bilan moslang.`, R`Сопоставьте уравнение с его типом.`, R`Match each equation with its type.`),
      pairs: [
        { left: L(R`$u_{tt}=9u_{xx}$`, R`$u_{tt}=9u_{xx}$`, R`$u_{tt}=9u_{xx}$`), right: L('giperbolik', 'гиперболическое', 'hyperbolic') },
        { left: L(R`$u_t=u_{xx}+u$`, R`$u_t=u_{xx}+u$`, R`$u_t=u_{xx}+u$`), right: L('parabolik', 'параболическое', 'parabolic') },
        { left: L(R`$u_{xx}+3u_{yy}=0$`, R`$u_{xx}+3u_{yy}=0$`, R`$u_{xx}+3u_{yy}=0$`), right: L('elliptik', 'эллиптическое', 'elliptic') },
        { left: L(R`$y\,u_{xx}+u_{yy}=0$`, R`$y\,u_{xx}+u_{yy}=0$`, R`$y\,u_{xx}+u_{yy}=0$`), right: L('aralash tur', 'смешанного типа', 'mixed type') }
      ],
      explain: L(R`$\Delta$: $9>0$; $0$; $-3<0$; $-y$ (ishorasi $y$ ga bog‘liq).`, R`$\Delta$: $9>0$; $0$; $-3<0$; $-y$ (знак зависит от $y$).`, R`$\Delta$: $9>0$; $0$; $-3<0$; $-y$ (sign depends on $y$).`) },
    { id: 't14.x3', level: 'mid', type: 'finderror',
      q: L(R`Talaba $u_{xx}+2u_{xy}+2u_{yy}=0$ turini aniqladi. Qaysi qatorda xato bor?`, R`Студент определил тип $u_{xx}+2u_{xy}+2u_{yy}=0$. В какой строке ошибка?`, R`A student found the type of $u_{xx}+2u_{xy}+2u_{yy}=0$. Which line contains the error?`),
      lines: [
        L(R`Kelishuv: $a u_{xx}+2b u_{xy}+c u_{yy}$, $\Delta=b^2-ac$.`, R`Соглашение: $a u_{xx}+2b u_{xy}+c u_{yy}$, $\Delta=b^2-ac$.`, R`Convention: $a u_{xx}+2b u_{xy}+c u_{yy}$, $\Delta=b^2-ac$.`),
        L(R`$a=1$, $b=2$, $c=2$.`, R`$a=1$, $b=2$, $c=2$.`, R`$a=1$, $b=2$, $c=2$.`),
        L(R`$\Delta=4-2=2$.`, R`$\Delta=4-2=2$.`, R`$\Delta=4-2=2$.`),
        L(R`Demak, tenglama giperbolik.`, R`Значит, уравнение гиперболическое.`, R`So the equation is hyperbolic.`)
      ],
      wrong: 1,
      explain: L(R`$2b=2$, demak $b=1$. To‘g‘risi: $\Delta=1-2=-1<0$ — elliptik.`, R`$2b=2$, значит $b=1$. Правильно: $\Delta=1-2=-1<0$ — эллиптическое.`, R`$2b=2$, so $b=1$. Correctly: $\Delta=1-2=-1<0$, elliptic.`) },
    { id: 't14.x4', level: 'mid', type: 'formula',
      q: L(R`$y\,u_{xx}+2x\,u_{xy}+u_{yy}=0$ tenglama uchun $\Delta(x,y)=b^2-ac$ ni yozing.`, R`Запишите $\Delta(x,y)=b^2-ac$ для уравнения $y\,u_{xx}+2x\,u_{xy}+u_{yy}=0$.`, R`Write $\Delta(x,y)=b^2-ac$ for $y\,u_{xx}+2x\,u_{xy}+u_{yy}=0$.`),
      check: { kind: 'equiv', ref: 'x^2 - y', vars: { x: [-2, 2], y: [-2, 2] } }, answer: 'x^2 - y',
      hint: L(R`$a=y$, $b=x$, $c=1$.`, R`$a=y$, $b=x$, $c=1$.`, R`$a=y$, $b=x$, $c=1$.`),
      solution: L(R`$\Delta=x^2-y$: $y<x^2$ da giperbolik, $y=x^2$ parabolada parabolik, $y>x^2$ da elliptik.`, R`$\Delta=x^2-y$: при $y<x^2$ гиперболическое, на параболе $y=x^2$ параболическое, при $y>x^2$ эллиптическое.`, R`$\Delta=x^2-y$: hyperbolic for $y<x^2$, parabolic on the parabola $y=x^2$, elliptic for $y>x^2$.`) },
    { id: 't14.x5', level: 'mid', type: 'numeric',
      q: L(R`$u_{xx}+6u_{xy}+9u_{yy}=0$ parabolik. Uning xarakteristikalari $y=kx+C$ to‘g‘ri chiziqlar. $k$ ni kiriting.`, R`$u_{xx}+6u_{xy}+9u_{yy}=0$ — параболическое. Его характеристики — прямые $y=kx+C$. Введите $k$.`, R`$u_{xx}+6u_{xy}+9u_{yy}=0$ is parabolic. Its characteristics are lines $y=kx+C$. Enter $k$.`),
      check: { kind: 'numeric', value: 3, tol: 1e-9 },
      hint: L(R`$y'=b/a$ ($\Delta=0$ bo‘lgani uchun).`, R`$y'=b/a$ (так как $\Delta=0$).`, R`$y'=b/a$ (since $\Delta=0$).`),
      solution: L(R`$a=1$, $b=3$, $c=9$, $\Delta=0$. $(y')^2-6y'+9=(y'-3)^2=0$, $k=3$.`, R`$a=1$, $b=3$, $c=9$, $\Delta=0$. $(y')^2-6y'+9=(y'-3)^2=0$, $k=3$.`, R`$a=1$, $b=3$, $c=9$, $\Delta=0$. $(y')^2-6y'+9=(y'-3)^2=0$, so $k=3$.`) },
    { id: 't14.x6', level: 'mid', type: 'order',
      q: L(R`Kanonik ko‘rinishga keltirish bosqichlarini to‘g‘ri tartibga qo‘ying.`, R`Расположите шаги приведения к каноническому виду в правильном порядке.`, R`Put the steps of reduction to canonical form in the right order.`),
      items: [
        L(R`$a$, $b$, $c$ ni aniqlash ($b$ — aralash koeffitsiyent yarmi)`, R`Найти $a$, $b$, $c$ ($b$ — половина смешанного коэффициента)`, R`Read off $a$, $b$, $c$ ($b$ is half the mixed coefficient)`),
        L(R`$\Delta=b^2-ac$ va turini topish`, R`Найти $\Delta=b^2-ac$ и тип`, R`Find $\Delta=b^2-ac$ and the type`),
        L(R`Xarakteristik tenglamani yechish`, R`Решить характеристическое уравнение`, R`Solve the characteristic equation`),
        L(R`$\xi,\eta$ ni tanlash va $J\ne0$ ni tekshirish`, R`Выбрать $\xi,\eta$ и проверить $J\ne0$`, R`Choose $\xi,\eta$ and check $J\ne0$`),
        L(R`$A,B,C$ va quyi hadlarni hisoblab, kanonik ko‘rinishni yozish`, R`Вычислить $A,B,C$ и младшие члены, записать канонический вид`, R`Compute $A,B,C$ and lower terms, write the canonical form`)
      ],
      explain: L(R`Avval tur, keyin xarakteristikalar, so‘ng almashtirish.`, R`Сначала тип, затем характеристики, потом замена.`, R`First the type, then the characteristics, then the substitution.`) },
    { id: 't14.x7', level: 'hard', type: 'formula',
      q: L(R`$4u_{xx}+4u_{xy}+u_{yy}=0$ parabolik tenglamaning xarakteristikalar oilasini $G(x,y)=C$ ko‘rinishida yozing.`, R`Запишите семейство характеристик параболического уравнения $4u_{xx}+4u_{xy}+u_{yy}=0$ в виде $G(x,y)=C$.`, R`Write the family of characteristics of the parabolic equation $4u_{xx}+4u_{xy}+u_{yy}=0$ as $G(x,y)=C$.`),
      check: { kind: 'integral', ref: '2*y - x', x: [-2, 2], y: [-2, 2] }, answer: '2y - x = C',
      hint: L(R`$a=4$, $b=2$, $c=1$; $y'=b/a$.`, R`$a=4$, $b=2$, $c=1$; $y'=b/a$.`, R`$a=4$, $b=2$, $c=1$; $y'=b/a$.`),
      solution: L(R`$\Delta=4-4=0$, $y'=\frac24=\frac12$, $y-\frac x2=C$, ya’ni $2y-x=C$. $\xi=2y-x$, $\eta=x$ bilan $A=B=0$, $C=4$: kanonik ko‘rinish $u_{\eta\eta}=0$, umumiy yechim $u=f(2y-x)+x\,g(2y-x)$.`, R`$\Delta=4-4=0$, $y'=\frac24=\frac12$, $y-\frac x2=C$, т.е. $2y-x=C$. При $\xi=2y-x$, $\eta=x$: $A=B=0$, $C=4$; канонический вид $u_{\eta\eta}=0$, общее решение $u=f(2y-x)+x\,g(2y-x)$.`, R`$\Delta=4-4=0$, $y'=\frac24=\frac12$, $y-\frac x2=C$, i.e. $2y-x=C$. With $\xi=2y-x$, $\eta=x$: $A=B=0$, $C=4$; canonical form $u_{\eta\eta}=0$, general solution $u=f(2y-x)+x\,g(2y-x)$.`) },
    { id: 't14.x8', level: 'hard', type: 'numeric',
      q: L(R`$u_{xx}+5u_{xy}+6u_{yy}=0$ da $\xi=y-2x$, $\eta=y-3x$ almashtirish bajarildi. Tenglama $k\,u_{\xi\eta}=0$ ko‘rinishga keldi. $k=2B$ ni kiriting.`, R`В уравнении $u_{xx}+5u_{xy}+6u_{yy}=0$ сделана замена $\xi=y-2x$, $\eta=y-3x$. Уравнение приняло вид $k\,u_{\xi\eta}=0$. Введите $k=2B$.`, R`In $u_{xx}+5u_{xy}+6u_{yy}=0$ we substitute $\xi=y-2x$, $\eta=y-3x$. The equation becomes $k\,u_{\xi\eta}=0$. Enter $k=2B$.`),
      check: { kind: 'numeric', value: -1, tol: 1e-9 },
      hint: L(R`$a=1$, $b=\frac52$, $c=6$; $\xi_x=-2$, $\xi_y=1$, $\eta_x=-3$, $\eta_y=1$.`, R`$a=1$, $b=\frac52$, $c=6$; $\xi_x=-2$, $\xi_y=1$, $\eta_x=-3$, $\eta_y=1$.`, R`$a=1$, $b=\frac52$, $c=6$; $\xi_x=-2$, $\xi_y=1$, $\eta_x=-3$, $\eta_y=1$.`),
      solution: L(R`$B=1\cdot(-2)(-3)+\frac52\big((-2)\cdot1+1\cdot(-3)\big)+6\cdot1\cdot1=6-\frac{25}2+6=-\frac12$, $k=2B=-1$. Ya’ni $-u_{\xi\eta}=0$, $u=f(y-2x)+g(y-3x)$.`, R`$B=1\cdot(-2)(-3)+\frac52\big((-2)\cdot1+1\cdot(-3)\big)+6\cdot1\cdot1=6-\frac{25}2+6=-\frac12$, $k=2B=-1$. Т.е. $-u_{\xi\eta}=0$, $u=f(y-2x)+g(y-3x)$.`, R`$B=1\cdot(-2)(-3)+\frac52\big((-2)\cdot1+1\cdot(-3)\big)+6\cdot1\cdot1=6-\frac{25}2+6=-\frac12$, $k=2B=-1$. So $-u_{\xi\eta}=0$ and $u=f(y-2x)+g(y-3x)$.`) },
    { id: 't14.x9', level: 'hard', type: 'steps',
      q: L(R`$3u_{xx}+2u_{xy}+u_{yy}=0$ ni bosqichma-bosqich kanonik ko‘rinishga keltiring.`, R`Пошагово приведите $3u_{xx}+2u_{xy}+u_{yy}=0$ к каноническому виду.`, R`Reduce $3u_{xx}+2u_{xy}+u_{yy}=0$ to canonical form step by step.`),
      steps: [
        { q: L(R`$\Delta$ va tur?`, R`$\Delta$ и тип?`, R`$\Delta$ and type?`), options: [L(R`$\Delta=-2$, elliptik`, R`$\Delta=-2$, эллиптическое`, R`$\Delta=-2$, elliptic`), L(R`$\Delta=1$, giperbolik`, R`$\Delta=1$, гиперболическое`, R`$\Delta=1$, hyperbolic`), L(R`$\Delta=-8$, elliptik`, R`$\Delta=-8$, эллиптическое`, R`$\Delta=-8$, elliptic`)], correct: 0 },
        { q: L(R`Xarakteristik tenglama ildizlari $y'$:`, R`Корни характеристического уравнения $y'$:`, R`Roots $y'$ of the characteristic equation:`), options: [L(R`$\frac{1\pm i\sqrt2}{3}$`, R`$\frac{1\pm i\sqrt2}{3}$`, R`$\frac{1\pm i\sqrt2}{3}$`), L(R`$1\pm i\sqrt2$`, R`$1\pm i\sqrt2$`, R`$1\pm i\sqrt2$`)], correct: 0 },
        { q: L(R`Mos $\alpha,\beta$:`, R`Подходящие $\alpha,\beta$:`, R`Suitable $\alpha,\beta$:`), options: [L(R`$\alpha=3y-x$, $\beta=\sqrt2\,x$`, R`$\alpha=3y-x$, $\beta=\sqrt2\,x$`, R`$\alpha=3y-x$, $\beta=\sqrt2\,x$`), L(R`$\alpha=3y-x$, $\beta=3y-x$`, R`$\alpha=3y-x$, $\beta=3y-x$`, R`$\alpha=3y-x$, $\beta=3y-x$`)], correct: 0 },
        { q: L('Kanonik ko‘rinish:', 'Канонический вид:', 'Canonical form:'), options: [L(R`$u_{\alpha\alpha}+u_{\beta\beta}=0$`, R`$u_{\alpha\alpha}+u_{\beta\beta}=0$`, R`$u_{\alpha\alpha}+u_{\beta\beta}=0$`), L(R`$u_{\alpha\beta}=0$`, R`$u_{\alpha\beta}=0$`, R`$u_{\alpha\beta}=0$`), L(R`$u_{\beta\beta}=0$`, R`$u_{\beta\beta}=0$`, R`$u_{\beta\beta}=0$`)], correct: 0 }
      ],
      explain: L(R`$a=3$, $b=1$, $c=1$: $\Delta=1-3=-2$. $3(y')^2-2y'+1=0$, $y'=\frac{1\pm i\sqrt2}3$; $3y-x\mp i\sqrt2\,x=C$. $\alpha=3y-x$, $\beta=\sqrt2x$ da $A=C=6$, $B=0$: $6(u_{\alpha\alpha}+u_{\beta\beta})=0$.`, R`$a=3$, $b=1$, $c=1$: $\Delta=1-3=-2$. $3(y')^2-2y'+1=0$, $y'=\frac{1\pm i\sqrt2}3$; $3y-x\mp i\sqrt2\,x=C$. При $\alpha=3y-x$, $\beta=\sqrt2x$: $A=C=6$, $B=0$: $6(u_{\alpha\alpha}+u_{\beta\beta})=0$.`, R`$a=3$, $b=1$, $c=1$: $\Delta=1-3=-2$. $3(y')^2-2y'+1=0$, $y'=\frac{1\pm i\sqrt2}3$; $3y-x\mp i\sqrt2\,x=C$. With $\alpha=3y-x$, $\beta=\sqrt2x$: $A=C=6$, $B=0$, so $6(u_{\alpha\alpha}+u_{\beta\beta})=0$.`) }
  ],
  quiz: [
    { id: 't14.q1', q: L(R`$2u_{xx}+3u_{xy}+u_{yy}=0$ tenglamada (bizning kelishuv bo‘yicha) $b$ ga teng:`, R`В уравнении $2u_{xx}+3u_{xy}+u_{yy}=0$ (по нашему соглашению) $b$ равно:`, R`In $2u_{xx}+3u_{xy}+u_{yy}=0$ (our convention), $b$ equals:`),
      options: [L('3', '3', '3'), L('3/2', '3/2', '3/2'), L('6', '6', '6'), L('1', '1', '1')], correct: 1,
      explain: L(R`Aralash had oldida $2b=3$, demak $b=\frac32$; $\Delta=\frac94-2=\frac14>0$.`, R`При смешанной производной стоит $2b=3$, значит $b=\frac32$; $\Delta=\frac94-2=\frac14>0$.`, R`The mixed term has $2b=3$, so $b=\frac32$; $\Delta=\frac94-2=\frac14>0$.`),
      why: [L(R`Bu $2b$, $b$ emas.`, R`Это $2b$, а не $b$.`, R`That is $2b$, not $b$.`), null, L('Ikki marta ko‘paytirilgan.', 'Умножено на 2, а надо делить.', 'Multiplied by 2 instead of halved.'), L(R`Bu $c$.`, R`Это $c$.`, R`That is $c$.`)] },
    { id: 't14.q2', q: L(R`Issiqlik tenglamasi $u_t=u_{xx}$ ning turi:`, R`Тип уравнения теплопроводности $u_t=u_{xx}$:`, R`The type of the heat equation $u_t=u_{xx}$ is:`),
      options: [L('giperbolik', 'гиперболическое', 'hyperbolic'), L('parabolik', 'параболическое', 'parabolic'), L('elliptik', 'эллиптическое', 'elliptic'), L('aralash', 'смешанный', 'mixed')], correct: 1,
      explain: L(R`$(x,t)$ da: $a=1$, $b=0$, $c=0$, $\Delta=0$.`, R`В $(x,t)$: $a=1$, $b=0$, $c=0$, $\Delta=0$.`, R`In $(x,t)$: $a=1$, $b=0$, $c=0$, $\Delta=0$.`),
      why: [L(R`$\Delta=0$, musbat emas.`, R`$\Delta=0$, а не больше нуля.`, R`$\Delta=0$, not positive.`), null, L(R`$\Delta=0$, manfiy emas.`, R`$\Delta=0$, а не меньше нуля.`, R`$\Delta=0$, not negative.`), L('Koeffitsiyentlar o‘zgarmas, tur hamma joyda bir xil.', 'Коэффициенты постоянны, тип всюду один.', 'Constant coefficients: the same type everywhere.')] },
    { id: 't14.q3', q: L(R`Trikomi tenglamasi $y\,u_{xx}+u_{yy}=0$ $(2,-1)$ nuqtada:`, R`Уравнение Трикоми $y\,u_{xx}+u_{yy}=0$ в точке $(2,-1)$:`, R`The Tricomi equation $y\,u_{xx}+u_{yy}=0$ at the point $(2,-1)$ is:`),
      options: [L('elliptik', 'эллиптическое', 'elliptic'), L('parabolik', 'параболическое', 'parabolic'), L('giperbolik', 'гиперболическое', 'hyperbolic'), L('aniqlab bo‘lmaydi', 'не определяется', 'undefined')], correct: 2,
      explain: L(R`$\Delta=-y=1>0$.`, R`$\Delta=-y=1>0$.`, R`$\Delta=-y=1>0$.`),
      why: [L(R`Elliptik $y>0$ da.`, R`Эллиптическое при $y>0$.`, R`Elliptic only for $y>0$.`), L(R`Parabolik faqat $y=0$ da.`, R`Параболическое только при $y=0$.`, R`Parabolic only on $y=0$.`), null, L('Har bir nuqtada tur aniq.', 'В каждой точке тип определён.', 'The type is defined at every point.')] },
    { id: 't14.q4', q: L(R`Xarakteristik tenglama ($a u_{xx}+2b u_{xy}+c u_{yy}$ uchun):`, R`Характеристическое уравнение (для $a u_{xx}+2b u_{xy}+c u_{yy}$):`, R`The characteristic equation (for $a u_{xx}+2b u_{xy}+c u_{yy}$) is:`),
      options: [L(R`$a\,dy^2-2b\,dx\,dy+c\,dx^2=0$`, R`$a\,dy^2-2b\,dx\,dy+c\,dx^2=0$`, R`$a\,dy^2-2b\,dx\,dy+c\,dx^2=0$`), L(R`$a\,dx^2+2b\,dx\,dy+c\,dy^2=0$`, R`$a\,dx^2+2b\,dx\,dy+c\,dy^2=0$`, R`$a\,dx^2+2b\,dx\,dy+c\,dy^2=0$`), L(R`$a\,dy^2+2b\,dx\,dy+c\,dx^2=0$`, R`$a\,dy^2+2b\,dx\,dy+c\,dx^2=0$`, R`$a\,dy^2+2b\,dx\,dy+c\,dx^2=0$`), L(R`$b^2-ac=0$`, R`$b^2-ac=0$`, R`$b^2-ac=0$`)], correct: 0,
      explain: L(R`$\xi_x=-y'\xi_y$ ni $A=0$ ga qo‘yib olinadi.`, R`Получается подстановкой $\xi_x=-y'\xi_y$ в $A=0$.`, R`It comes from substituting $\xi_x=-y'\xi_y$ into $A=0$.`),
      why: [null, L(R`$dx$ va $dy$ o‘rni almashgan.`, R`Перепутаны $dx$ и $dy$.`, R`$dx$ and $dy$ are swapped.`), L(R`O‘rta hadda ishora minus bo‘lishi kerak.`, R`В среднем члене должен быть минус.`, R`The middle term must have a minus sign.`), L('Bu parabolik bo‘lish sharti, xarakteristik tenglama emas.', 'Это условие параболичности, а не характеристическое уравнение.', 'That is the condition for being parabolic, not the characteristic equation.')] },
    { id: 't14.q5', q: L(R`Giperbolik tenglamaning kanonik ko‘rinishi:`, R`Канонический вид гиперболического уравнения:`, R`The canonical form of a hyperbolic equation is:`),
      options: [L(R`$u_{\xi\eta}=F$`, R`$u_{\xi\eta}=F$`, R`$u_{\xi\eta}=F$`), L(R`$u_{\eta\eta}=F$`, R`$u_{\eta\eta}=F$`, R`$u_{\eta\eta}=F$`), L(R`$u_{\xi\xi}+u_{\eta\eta}=F$`, R`$u_{\xi\xi}+u_{\eta\eta}=F$`, R`$u_{\xi\xi}+u_{\eta\eta}=F$`), L(R`$u_\xi=u_\eta$`, R`$u_\xi=u_\eta$`, R`$u_\xi=u_\eta$`)], correct: 0,
      explain: L(R`Ikki xarakteristika oilasi $\xi,\eta$ sifatida olinadi: $A=C=0$.`, R`Оба семейства характеристик берутся за $\xi,\eta$: $A=C=0$.`, R`Both families of characteristics are used as $\xi,\eta$: $A=C=0$.`),
      why: [null, L('Bu parabolik.', 'Это параболический вид.', 'That is parabolic.'), L('Bu elliptik.', 'Это эллиптический вид.', 'That is elliptic.'), L('Bu ikkinchi tartibli emas.', 'Это не уравнение второго порядка.', 'That is not second order.')] },
    { id: 't14.q6', q: L(R`O‘zgaruvchilarni almashtirishda ($J\ne0$) yangi diskriminant:`, R`При замене переменных ($J\ne0$) новый дискриминант:`, R`Under a change of variables ($J\ne0$) the new discriminant is:`),
      options: [L(R`$(b^2-ac)J^2$`, R`$(b^2-ac)J^2$`, R`$(b^2-ac)J^2$`), L(R`$(b^2-ac)J$`, R`$(b^2-ac)J$`, R`$(b^2-ac)J$`), L(R`har doim $b^2-ac$`, R`всегда $b^2-ac$`, R`always $b^2-ac$`), L(R`har doim $0$`, R`всегда $0$`, R`always $0$`)], correct: 0,
      explain: L(R`$J^2>0$, shuning uchun ishora — demak tur — saqlanadi.`, R`$J^2>0$, поэтому знак — а значит, и тип — сохраняется.`, R`$J^2>0$, so the sign, and hence the type, is preserved.`),
      why: [null, L(R`$J<0$ bo‘lsa ishora o‘zgarardi — bu noto‘g‘ri.`, R`При $J<0$ знак бы менялся — это неверно.`, R`With $J<0$ the sign would flip; this is wrong.`), L(R`Qiymat o‘zgaradi, faqat ishora saqlanadi.`, R`Значение меняется, сохраняется только знак.`, R`The value changes; only the sign is preserved.`), L('Tur saqlanadi, nol bo‘lib qolmaydi.', 'Тип сохраняется, нулём он не становится.', 'The type is preserved; it does not become zero.')] },
    { id: 't14.q7', q: L(R`$u_{tt}=4u_{xx}$ ning xarakteristikalari:`, R`Характеристики уравнения $u_{tt}=4u_{xx}$:`, R`The characteristics of $u_{tt}=4u_{xx}$ are:`),
      options: [L(R`$x\pm2t=C$`, R`$x\pm2t=C$`, R`$x\pm2t=C$`), L(R`$x\pm4t=C$`, R`$x\pm4t=C$`, R`$x\pm4t=C$`), L(R`$2x\pm t=C$`, R`$2x\pm t=C$`, R`$2x\pm t=C$`), L(R`haqiqiy xarakteristika yo‘q`, R`вещественных характеристик нет`, R`there are no real characteristics`)], correct: 0,
      explain: L(R`$a^2=4$, $a=2$; $dx/dt=\pm2$.`, R`$a^2=4$, $a=2$; $dx/dt=\pm2$.`, R`$a^2=4$, $a=2$; $dx/dt=\pm2$.`),
      why: [null, L(R`Tezlik $a=\sqrt4=2$, $4$ emas.`, R`Скорость $a=\sqrt4=2$, а не $4$.`, R`The speed is $a=\sqrt4=2$, not $4$.`), L(R`Bu $dx/dt=\pm\frac12$ ga mos.`, R`Это соответствует $dx/dt=\pm\frac12$.`, R`That corresponds to $dx/dt=\pm\frac12$.`), L('Tenglama giperbolik, ikki oila bor.', 'Уравнение гиперболическое, семейств два.', 'The equation is hyperbolic; there are two families.')] },
    { id: 't14.q8', q: L(R`$u_{xx}+x\,u_{yy}=0$ qaysi sohada elliptik?`, R`В какой области уравнение $u_{xx}+x\,u_{yy}=0$ эллиптическое?`, R`Where is $u_{xx}+x\,u_{yy}=0$ elliptic?`),
      options: [L(R`$x>0$`, R`$x>0$`, R`$x>0$`), L(R`$x<0$`, R`$x<0$`, R`$x<0$`), L(R`$x=0$`, R`$x=0$`, R`$x=0$`), L('hamma joyda', 'всюду', 'everywhere')], correct: 0,
      explain: L(R`$\Delta=0-1\cdot x=-x<0\iff x>0$.`, R`$\Delta=0-1\cdot x=-x<0\iff x>0$.`, R`$\Delta=0-1\cdot x=-x<0\iff x>0$.`),
      why: [null, L(R`$x<0$ da $\Delta>0$ — giperbolik.`, R`При $x<0$ $\Delta>0$ — гиперболическое.`, R`For $x<0$, $\Delta>0$: hyperbolic.`), L(R`$x=0$ da parabolik.`, R`При $x=0$ параболическое.`, R`At $x=0$ it is parabolic.`), L('Tur $x$ ishorasiga bog‘liq.', 'Тип зависит от знака $x$.', 'The type depends on the sign of $x$.')] },
    { id: 't14.q9', q: L(R`$u_{xx}-2u_{xy}-3u_{yy}=0$ ning umumiy yechimi:`, R`Общее решение $u_{xx}-2u_{xy}-3u_{yy}=0$:`, R`The general solution of $u_{xx}-2u_{xy}-3u_{yy}=0$ is:`),
      options: [L(R`$f(y-x)+g(y+3x)$`, R`$f(y-x)+g(y+3x)$`, R`$f(y-x)+g(y+3x)$`), L(R`$f(y+x)+g(y-3x)$`, R`$f(y+x)+g(y-3x)$`, R`$f(y+x)+g(y-3x)$`), L(R`$f(x-y)\,g(x+3y)$`, R`$f(x-y)\,g(x+3y)$`, R`$f(x-y)\,g(x+3y)$`), L(R`$C_1(y-x)+C_2(y+3x)$`, R`$C_1(y-x)+C_2(y+3x)$`, R`$C_1(y-x)+C_2(y+3x)$`)], correct: 0,
      explain: L(R`$y'=1$ va $y'=-3$: $y-x=C_1$, $y+3x=C_2$; $u_{\xi\eta}=0$.`, R`$y'=1$ и $y'=-3$: $y-x=C_1$, $y+3x=C_2$; $u_{\xi\eta}=0$.`, R`$y'=1$ and $y'=-3$: $y-x=C_1$, $y+3x=C_2$; $u_{\xi\eta}=0$.`),
      why: [null, L(R`Xarakteristik tenglama ishorasi xato olingan ($+2b$).`, R`Взят неверный знак в характеристическом уравнении ($+2b$).`, R`The wrong sign ($+2b$) was used in the characteristic equation.`), L('Ko‘paytma emas, yig‘indi bo‘lishi kerak.', 'Должна быть сумма, а не произведение.', 'It must be a sum, not a product.'), L('Bu faqat xususiy hol; ixtiyoriy funksiyalar kerak.', 'Это лишь частный случай; нужны произвольные функции.', 'Only a special case; arbitrary functions are needed.')] },
    { id: 't14.q10', q: L(R`Kitobda tenglama $A u_{xx}+B u_{xy}+C u_{yy}=0$ ko‘rinishida va $B^2-4AC$ ishlatilgan. Bizning $\Delta=b^2-ac$ bilan bog‘lanish:`, R`В книге уравнение записано как $A u_{xx}+B u_{xy}+C u_{yy}=0$ и используется $B^2-4AC$. Связь с нашим $\Delta=b^2-ac$:`, R`A book writes $A u_{xx}+B u_{xy}+C u_{yy}=0$ and uses $B^2-4AC$. How is it related to our $\Delta=b^2-ac$?`),
      options: [L(R`$B^2-4AC=4\Delta$`, R`$B^2-4AC=4\Delta$`, R`$B^2-4AC=4\Delta$`), L(R`$B^2-4AC=\Delta$`, R`$B^2-4AC=\Delta$`, R`$B^2-4AC=\Delta$`), L(R`$B^2-4AC=-\Delta$`, R`$B^2-4AC=-\Delta$`, R`$B^2-4AC=-\Delta$`), L(R`$B^2-4AC=2\Delta$`, R`$B^2-4AC=2\Delta$`, R`$B^2-4AC=2\Delta$`)], correct: 0,
      explain: L(R`$A=a$, $B=2b$, $C=c$: $4b^2-4ac=4\Delta$. Ishora bir xil, tur bir xil.`, R`$A=a$, $B=2b$, $C=c$: $4b^2-4ac=4\Delta$. Знак тот же, тип тот же.`, R`$A=a$, $B=2b$, $C=c$: $4b^2-4ac=4\Delta$. Same sign, same type.`),
      why: [null, L(R`$4$ ko‘paytuvchi yo‘qolgan.`, R`Потерян множитель $4$.`, R`The factor $4$ was lost.`), L('Ishora o‘zgarmaydi.', 'Знак не меняется.', 'The sign does not change.'), L(R`$B^2=4b^2$, $2b^2$ emas.`, R`$B^2=4b^2$, а не $2b^2$.`, R`$B^2=4b^2$, not $2b^2$.`)] }
  ]
});
})();
