/* The 18 independent-study tasks from section 6 of the MAT203 syllabus (5 hours each, 90 h in total).
   The syllabus gives no points per task; only the overall split 25/25/50 (current/midterm/final). */
(function () {
const L = DT.L, R = DT.R;
DT.INDEPENDENT = [
  { n: 1, hours: 5, topics: ['t01'],
    title: L('Differensial tenglama tushunchasi: referat va yo‘nalish maydonlari', 'Понятие дифференциального уравнения: реферат и поля направлений', 'The notion of a differential equation: essay and direction fields'),
    syllabusText: L('Differensial tenglama tushunchasi haqida qisqacha referat tayyorlash. Kundalik hayot va texnikada differensial tenglamalarning 5 ta qo‘llanilishiga misol topish. Oddiy differensial tenglamalar uchun yo‘nalish maydonlarini o‘rganish.',
      'Подготовить краткий реферат о понятии дифференциального уравнения. Найти 5 примеров применения дифференциальных уравнений в повседневной жизни и технике. Изучить поля направлений для обыкновенных дифференциальных уравнений.',
      'Prepare a short essay on the notion of a differential equation. Find 5 examples of applications of differential equations in everyday life and engineering. Study direction fields of ordinary differential equations.'),
    goal: L('Differensial tenglama, uning tartibi, yechimi va Koshi masalasi nima ekanini o‘z so‘zlaringiz bilan tushuntira olish; tenglama xulqini yo‘nalish maydonidan o‘qiy olish.', 'Уметь своими словами объяснить, что такое дифференциальное уравнение, его порядок, решение и задача Коши; читать поведение уравнения по полю направлений.', 'Be able to explain in your own words what a differential equation, its order, a solution and a Cauchy problem are, and to read an equation’s behaviour from its direction field.'),
    steps: [
      L('1-mavzu darslarini o‘qing va asosiy ta’riflarni (tartib, yechim, umumiy/xususiy yechim, integral chiziq, Koshi masalasi) konspekt qiling.', 'Прочитайте уроки темы 1 и законспектируйте основные определения (порядок, решение, общее/частное решение, интегральная кривая, задача Коши).', 'Read the lessons of topic 1 and write down the key definitions (order, solution, general/particular solution, integral curve, Cauchy problem).'),
      L('5 ta qo‘llanish toping (masalan: choy sovishi, kondensator zaryadsizlanishi, aholi o‘sishi, kompyuter tarmog‘ida virus tarqalishi, prujina tebranishi). Har biri uchun tenglamani yozing va undagi har bir harfning ma’nosini tushuntiring.', 'Найдите 5 применений (например: остывание чая, разряд конденсатора, рост населения, распространение вируса в компьютерной сети, колебания пружины). Для каждого запишите уравнение и объясните смысл каждой буквы.', 'Find 5 applications (for example: tea cooling, a capacitor discharging, population growth, a virus spreading in a computer network, a spring oscillating). For each, write the equation and explain what every letter means.'),
      L('L01 laboratoriyasida kamida 3 ta tenglama ($y\'=-y$, $y\'=x+y$, $y\'=y(1-y)$) uchun yo‘nalish maydonini chizing va bir nechta integral chiziqni kuzating.', 'В лаборатории L01 постройте поле направлений хотя бы для 3 уравнений ($y\'=-y$, $y\'=x+y$, $y\'=y(1-y)$) и рассмотрите несколько интегральных кривых.', 'In lab L01 draw the direction field of at least 3 equations ($y\'=-y$, $y\'=x+y$, $y\'=y(1-y)$) and observe several integral curves.'),
      L('Har bir maydon uchun 2–3 jumlali xulosa yozing: muvozanat holatlari qayerda, yechimlar o‘sadimi yoki kamayadimi.', 'Для каждого поля напишите вывод в 2–3 предложения: где положения равновесия, растут или убывают решения.', 'For each field write a 2–3 sentence conclusion: where the equilibria are and whether solutions increase or decrease.'),
      L('Referatni yozing: kirish, tushunchalar, 5 ta misol, yo‘nalish maydonlari, xulosa va manbalar ro‘yxati («Manbalar» bo‘limidan).', 'Напишите реферат: введение, понятия, 5 примеров, поля направлений, вывод и список источников (из раздела «Источники»).', 'Write the essay: introduction, concepts, 5 examples, direction fields, conclusion and a reference list (from the “Sources” section).')
    ],
    output: L('Referat: 3–5 bet (qo‘lda yoki matn muharririda), yo‘nalish maydonlarining 3 ta rasmi (L01 skrinshoti yoki qo‘lda chizilgan).', 'Реферат 3–5 страниц (от руки или в текстовом редакторе), 3 рисунка полей направлений (снимок экрана L01 или от руки).', 'An essay of 3–5 pages (handwritten or typed) with 3 direction-field figures (L01 screenshots or hand-drawn).'),
    criteria: [
      L('Ta’riflar to‘g‘ri va o‘z so‘zlari bilan berilgan.', 'Определения верны и изложены своими словами.', 'Definitions are correct and in your own words.'),
      L('5 ta misolning har birida tenglama, o‘zgaruvchilar ma’nosi va tartibi ko‘rsatilgan.', 'В каждом из 5 примеров указаны уравнение, смысл переменных и порядок.', 'Each of the 5 examples gives the equation, the meaning of the variables and the order.'),
      L('Yo‘nalish maydonlari bo‘yicha xulosalar rasmga mos.', 'Выводы по полям направлений соответствуют рисункам.', 'The conclusions about the direction fields match the figures.'),
      L('Manbalar ko‘rsatilgan, matn ko‘chirilmagan.', 'Указаны источники, текст не списан.', 'Sources are cited and the text is not copied.')
    ],
    selfcheck: [
      L('$y\'\'+y=0$ tenglamaning tartibi nechchi va $y=\\sin x$ uning yechimimi?', 'Каков порядок уравнения $y\'\'+y=0$ и является ли $y=\\sin x$ его решением?', 'What is the order of $y\'\'+y=0$, and is $y=\\sin x$ a solution?'),
      L('Umumiy yechim bilan xususiy yechimning farqi nima?', 'Чем общее решение отличается от частного?', 'How does a general solution differ from a particular one?'),
      L('Yo‘nalish maydonida gorizontal chiziqchalar nimani bildiradi?', 'Что означают горизонтальные штрихи на поле направлений?', 'What do horizontal segments in a direction field mean?')
    ] },
  { n: 2, hours: 5, topics: ['t04'],
    title: L('Integrallovchi ko‘paytuvchi: algoritm va 5 ta chiziqli tenglama', 'Интегрирующий множитель: алгоритм и 5 линейных уравнений', 'Integrating factor: algorithm and 5 linear equations'),
    syllabusText: L('Integrallovchi ko‘paytuvchi usulining algoritmini yozish. 5 ta birinchi tartibli chiziqli differensial tenglamani yechish. Ushbu usulning afzalliklari haqida qisqa izoh tayyorlash.',
      'Записать алгоритм метода интегрирующего множителя. Решить 5 линейных дифференциальных уравнений первого порядка. Подготовить краткий комментарий о преимуществах этого метода.',
      'Write down the algorithm of the integrating-factor method. Solve 5 first-order linear differential equations. Prepare a short note on the advantages of this method.'),
    goal: L(R`$y'+p(x)y=q(x)$ ni $\mu=e^{\int p\,dx}$ yordamida ishonchli yecha olish va usulni boshqa yondashuvlar bilan solishtira olish.`, R`Уверенно решать $y'+p(x)y=q(x)$ с помощью $\mu=e^{\int p\,dx}$ и сравнивать метод с другими подходами.`, R`Solve $y'+p(x)y=q(x)$ reliably with $\mu=e^{\int p\,dx}$ and compare the method with other approaches.`),
    steps: [
      L('4-mavzudagi chiziqli tenglamalar darsini o‘qing.', 'Прочитайте урок темы 4 о линейных уравнениях.', 'Read the lesson on linear equations in topic 4.'),
      L(R`Algoritmni qadamlar bilan yozing: standart ko‘rinishga keltirish, $\mu$ ni topish, $(\mu y)'=\mu q$, integrallash, $y$ ni ifodalash, tekshirish.`, R`Запишите алгоритм по шагам: привести к стандартному виду, найти $\mu$, $(\mu y)'=\mu q$, проинтегрировать, выразить $y$, проверить.`, R`Write the algorithm step by step: bring to standard form, find $\mu$, $(\mu y)'=\mu q$, integrate, solve for $y$, check.`),
      L('Har xil turdagi 5 ta tenglama tanlang (o‘zgarmas $p$; $p=1/x$; trigonometrik $q$; Koshi masalasi; $y\'$ oldida koeffitsiyent bor) va yeching.', 'Выберите 5 уравнений разных видов (постоянное $p$; $p=1/x$; тригонометрическое $q$; задача Коши; коэффициент при $y\'$) и решите их.', 'Choose 5 equations of different kinds (constant $p$; $p=1/x$; trigonometric $q$; a Cauchy problem; a coefficient in front of $y\'$) and solve them.'),
      L('Har bir javobni tenglamaga qo‘yib tekshiring; ilovadagi mashqlar tekshiruvchisidan foydalaning.', 'Каждый ответ проверьте подстановкой; используйте проверку упражнений в приложении.', 'Check every answer by substitution; use the exercise checker in the app.'),
      L('L03 laboratoriyasida tenglamalaringiz turini aniqlab ko‘ring.', 'В лаборатории L03 определите тип своих уравнений.', 'Use lab L03 to identify the type of your equations.'),
      L('Afzalliklar haqida izoh yozing: universal formula, aniqlanish oralig‘i, $y=uv$ va o‘zgarmasni variatsiyalash bilan taqqoslash.', 'Напишите комментарий о преимуществах: универсальная формула, интервал существования, сравнение с $y=uv$ и вариацией постоянной.', 'Write the note on advantages: a universal formula, the interval of existence, comparison with $y=uv$ and variation of the constant.')
    ],
    output: L('Algoritm (1 bet), 5 ta to‘liq yechim tekshiruvi bilan, izoh (0,5–1 bet).', 'Алгоритм (1 страница), 5 полных решений с проверкой, комментарий (0,5–1 страница).', 'Algorithm (1 page), 5 full solutions with checks, a note (0.5–1 page).'),
    criteria: [
      L('Algoritm to‘liq va qadamlar tartibi to‘g‘ri.', 'Алгоритм полный, порядок шагов верный.', 'The algorithm is complete and the order of steps is correct.'),
      L('5 ta tenglama turlicha va hammasi to‘g‘ri yechilgan.', '5 уравнений разные и все решены верно.', 'The 5 equations are varied and all solved correctly.'),
      L('Har bir javob qo‘yib tekshirilgan, aniqlanish oralig‘i ko‘rsatilgan.', 'Каждый ответ проверен подстановкой, указан интервал.', 'Each answer is checked by substitution and its interval stated.'),
      L('Izohda usul boshqa usullar bilan asosli taqqoslangan.', 'В комментарии метод обоснованно сравнён с другими.', 'The note compares the method with others with reasons.')
    ],
    selfcheck: [
      L(R`$xy'+2y=x^3$ da $p(x)$ nimaga teng?`, R`Чему равно $p(x)$ в $xy'+2y=x^3$?`, R`What is $p(x)$ in $xy'+2y=x^3$?`),
      L(R`Nega $\mu$ dagi integralga $+C$ qo‘shish shart emas?`, R`Почему в интеграле для $\mu$ не нужно $+C$?`, R`Why is no $+C$ needed in the integral for $\mu$?`),
      L('Yechim qaysi oraliqda mavjud va yagona?', 'На каком интервале решение существует и единственно?', 'On which interval does the solution exist and is it unique?')
    ] },
  { n: 3, hours: 5, topics: ['t02'],
    title: L('Ajraladigan tenglamalar, aholi o‘sishi va radioaktiv yemirilish', 'Уравнения с разделяющимися переменными, рост населения и радиоактивный распад', 'Separable equations, population growth and radioactive decay'),
    syllabusText: L('5 ta ajraluvchi o‘zgaruvchili tenglamani yechish. Aholi sonining o‘sish modeli haqida ma’lumot yig‘ish. Radioaktiv yemirilish modelining matematik tavsifini yozish.',
      'Решить 5 уравнений с разделяющимися переменными. Собрать сведения о модели роста населения. Написать математическое описание модели радиоактивного распада.',
      'Solve 5 separable equations. Collect information on the population growth model. Write the mathematical description of the radioactive decay model.'),
    goal: L('O‘zgaruvchilarni ajratish usulini xatosiz qo‘llash va oddiy o‘sish/yemirilish modellarini tuzish.', 'Безошибочно применять разделение переменных и строить простые модели роста/распада.', 'Apply separation of variables without errors and build simple growth/decay models.'),
    steps: [
      L('2-mavzu darslarini va L02 qadam quruvchisini ko‘rib chiqing.', 'Изучите уроки темы 2 и конструктор шагов L02.', 'Go through the lessons of topic 2 and the L02 step builder.'),
      L(R`5 ta tenglama yeching; kamida bittasida o‘zgarmas yechim ($h(y_0)=0$) va bittasida Koshi masalasi bo‘lsin.`, R`Решите 5 уравнений; хотя бы в одном должно быть постоянное решение ($h(y_0)=0$), хотя бы одно — задача Коши.`, R`Solve 5 equations; at least one should have a constant solution ($h(y_0)=0$) and one should be a Cauchy problem.`),
      L(R`Aholi o‘sishi: Maltus modeli $P'=kP$ va logistik model haqida qisqa ma’lumot to‘plang (manbasi bilan); $k$ ning ma’nosini tushuntiring.`, R`Рост населения: соберите краткие сведения о модели Мальтуса $P'=kP$ и логистической модели (с источником); объясните смысл $k$.`, R`Population growth: collect short information on the Malthus model $P'=kP$ and the logistic model (with a source); explain the meaning of $k$.`),
      L(R`Radioaktiv yemirilish: $N'=-\lambda N$ ni chiqaring, yeching va yarim yemirilish davri $T=\ln 2/\lambda$ ni keltirib chiqaring.`, R`Радиоактивный распад: выведите $N'=-\lambda N$, решите и получите период полураспада $T=\ln 2/\lambda$.`, R`Radioactive decay: derive $N'=-\lambda N$, solve it and derive the half-life $T=\ln 2/\lambda$.`),
      L('L04 laboratoriyasida eksponensial egri chiziqlarni parametrlar bilan o‘zgartirib ko‘ring.', 'В лаборатории L04 поменяйте параметры экспоненциальных кривых.', 'In lab L04 vary the parameters of the exponential curves.')
    ],
    output: L('5 ta yechim tekshiruvi bilan; aholi modeli bo‘yicha 1 betlik ma’lumot; radioaktiv yemirilishning 1 betlik matematik tavsifi.', '5 решений с проверкой; 1 страница о модели населения; 1 страница математического описания распада.', '5 solutions with checks; 1 page on the population model; a 1-page mathematical description of decay.'),
    criteria: [
      L('Yechimlarda o‘zgarmas yechimlar yo‘qotilmagan, $\\ln|y|$ to‘g‘ri yozilgan.', 'В решениях не потеряны постоянные решения, $\\ln|y|$ записан верно.', 'No constant solutions are lost and $\\ln|y|$ is written correctly.'),
      L('Modellarning farazlari va parametrlarning birliklari ko‘rsatilgan.', 'Указаны допущения моделей и единицы параметров.', 'The model assumptions and parameter units are stated.'),
      L('Yarim yemirilish davri formulasi to‘g‘ri chiqarilgan.', 'Формула периода полураспада выведена верно.', 'The half-life formula is derived correctly.'),
      L('Ma’lumot manbalari ko‘rsatilgan.', 'Указаны источники сведений.', 'Information sources are cited.')
    ],
    selfcheck: [
      L(R`$y'=y^2$ ni ajratganda qaysi yechim yo‘qoladi?`, R`Какое решение теряется при разделении в $y'=y^2$?`, R`Which solution is lost when separating $y'=y^2$?`),
      L(R`$N(0)=N_0$ bo‘lsa, $N(T)$ nimaga teng?`, R`Чему равно $N(T)$ при $N(0)=N_0$?`, R`If $N(0)=N_0$, what is $N(T)$?`),
      L('Maltus modeli nega uzoq muddatda real bo‘lmaydi?', 'Почему модель Мальтуса нереалистична на больших сроках?', 'Why is the Malthus model unrealistic in the long run?')
    ] },
  { n: 4, hours: 5, topics: ['t04', 't02'],
    title: L('To‘la differensialli tenglamalar; logistik va eksponensial o‘sish', 'Уравнения в полных дифференциалах; логистический и экспоненциальный рост', 'Exact equations; logistic vs exponential growth'),
    syllabusText: L('Aniq differensial tenglamalar bo‘yicha misollar yechish. Logistik o‘sish modeli haqida prezentatsiya tayyorlash. Logistik va eksponensial o‘sish modellarini taqqoslash.',
      'Решить примеры на точные (в полных дифференциалах) уравнения. Подготовить презентацию о логистической модели роста. Сравнить логистическую и экспоненциальную модели роста.',
      'Solve examples on exact equations. Prepare a presentation on the logistic growth model. Compare the logistic and exponential growth models.'),
    goal: L(R`To‘la differensial shartini tekshirib, potensial $U(x,y)$ ni topa olish; logistik modelni yechib, uning eksponensial modeldan farqini tushuntira olish.`, R`Проверять условие полного дифференциала и находить потенциал $U(x,y)$; решать логистическую модель и объяснять её отличие от экспоненциальной.`, R`Check the exactness condition and find the potential $U(x,y)$; solve the logistic model and explain how it differs from the exponential one.`),
    steps: [
      L(R`4-mavzudan to‘la differensialli tenglamalar darsini o‘qing; kamida 3 ta misol yeching (bittasi integrallovchi ko‘paytuvchi bilan) va $dU=M\,dx+N\,dy$ ni tekshiring.`, R`Прочитайте урок темы 4 об уравнениях в полных дифференциалах; решите не менее 3 примеров (один — с интегрирующим множителем) и проверьте $dU=M\,dx+N\,dy$.`, R`Read the topic 4 lesson on exact equations; solve at least 3 examples (one with an integrating factor) and check $dU=M\,dx+N\,dy$.`),
      L(R`Logistik tenglama $P'=rP(1-P/K)$ ni o‘zgaruvchilarni ajratib (sodda kasrlar bilan) yeching.`, R`Решите логистическое уравнение $P'=rP(1-P/K)$ разделением переменных (с простейшими дробями).`, R`Solve the logistic equation $P'=rP(1-P/K)$ by separation (with partial fractions).`),
      L('L04 laboratoriyasida bir xil $r$ va $P_0$ bilan ikkala modelni solishtiring; $K$ ni o‘zgartiring.', 'В лаборатории L04 сравните обе модели при одинаковых $r$ и $P_0$; меняйте $K$.', 'In lab L04 compare both models with the same $r$ and $P_0$; vary $K$.'),
      L('Taqqoslash jadvalini tuzing: tenglama, yechim, muvozanat holatlari, uzoq muddatli xulq, qo‘llanish (masalan, foydalanuvchilar soni, tarmoqda fayl tarqalishi).', 'Составьте сравнительную таблицу: уравнение, решение, положения равновесия, поведение на больших временах, применения (например, число пользователей, распространение файла в сети).', 'Build a comparison table: equation, solution, equilibria, long-term behaviour, applications (e.g. number of users, a file spreading in a network).'),
      L('Prezentatsiya tayyorlang: model, yechim, grafik, taqqoslash, xulosa.', 'Подготовьте презентацию: модель, решение, график, сравнение, вывод.', 'Prepare the presentation: model, solution, graph, comparison, conclusion.')
    ],
    output: L('3+ ta yechilgan misol; prezentatsiya (taxminan 6–8 slayd — sillabusda soni ko‘rsatilmagan); taqqoslash jadvali.', '3+ решённых примера; презентация (около 6–8 слайдов — в силлабусе число не указано); сравнительная таблица.', '3+ solved examples; a presentation (about 6–8 slides; the syllabus gives no number); a comparison table.'),
    criteria: [
      L(R`$M_y=N_x$ sharti har bir misolda tekshirilgan.`, R`Условие $M_y=N_x$ проверено в каждом примере.`, R`The condition $M_y=N_x$ is checked in every example.`),
      L('Logistik yechim to‘g‘ri va tekshirilgan.', 'Логистическое решение верно и проверено.', 'The logistic solution is correct and checked.'),
      L('Grafiklar o‘qlari va parametrlari bilan berilgan.', 'Графики даны с подписанными осями и параметрами.', 'Graphs have labelled axes and parameters.'),
      L('Taqqoslashda ikkala modelning cheklovlari aytilgan.', 'В сравнении названы ограничения обеих моделей.', 'The comparison states the limitations of both models.')
    ],
    selfcheck: [
      L(R`$(2xy)\,dx+(x^2+1)\,dy=0$ to‘la differensialmi?`, R`Является ли $(2xy)\,dx+(x^2+1)\,dy=0$ уравнением в полных дифференциалах?`, R`Is $(2xy)\,dx+(x^2+1)\,dy=0$ exact?`),
      L('Logistik modelning muvozanat holatlari qaysilar va qaysi biri barqaror?', 'Каковы положения равновесия логистической модели и какое из них устойчиво?', 'What are the equilibria of the logistic model and which is stable?'),
      L(R`$P$ qaysi qiymatda eng tez o‘sadi?`, R`При каком $P$ рост самый быстрый?`, R`At which $P$ is growth fastest?`)
    ],
    note: L('Sillabusdagi «aniq differensial tenglamalar» ilovada «to‘la differensialli tenglamalar» deb ataladi (inglizcha exact). Logistik model 4-mavzuga emas, 2-mavzu (ajraladigan tenglamalar) va L04 ga tegishli.', '«Точные дифференциальные уравнения» силлабуса в приложении называются «уравнениями в полных дифференциалах» (англ. exact). Логистическая модель относится к теме 2 (разделяющиеся переменные) и L04, а не к теме 4.', 'The syllabus term “aniq differensial tenglamalar” is what the app calls exact equations. The logistic model belongs to topic 2 (separable equations) and lab L04 rather than topic 4.') },
  { n: 5, hours: 5, topics: ['t11'],
    title: L('Eyler usuli: tamoyil, qo‘lda hisob va Python', 'Метод Эйлера: принцип, расчёт вручную и Python', 'Euler’s method: principle, hand computation and Python'),
    syllabusText: L('Euler usulining ishlash tamoyilini o‘rganish. Berilgan differensial tenglamani Euler usuli yordamida taqribiy yechish. Python dasturida Euler usulini amalga oshirish.',
      'Изучить принцип работы метода Эйлера. Приближённо решить данное дифференциальное уравнение методом Эйлера. Реализовать метод Эйлера на Python.',
      'Study how Euler’s method works. Solve a given differential equation approximately by Euler’s method. Implement Euler’s method in Python.'),
    goal: L(R`$y_{k+1}=y_k+hf(x_k,y_k)$ formulasining geometrik ma’nosini tushunish, qo‘lda va dasturda hisoblash, xato qadam bilan qanday kamayishini ko‘rish.`, R`Понять геометрический смысл $y_{k+1}=y_k+hf(x_k,y_k)$, считать вручную и программно, увидеть, как погрешность зависит от шага.`, R`Understand the geometric meaning of $y_{k+1}=y_k+hf(x_k,y_k)$, compute by hand and in code, and see how the error depends on the step.`),
    steps: [
      L('11-mavzuning Eyler usuli darsini o‘qing.', 'Прочитайте урок темы 11 о методе Эйлера.', 'Read the topic 11 lesson on Euler’s method.'),
      L(R`Aniq yechimi ma’lum masalani oling (masalan $y'=x+y$, $y(0)=1$, aniq yechim $y=2e^x-x-1$) va $h=0{,}1$ bilan $[0;0{,}5]$ da qo‘lda jadval tuzing.`, R`Возьмите задачу с известным точным решением (например, $y'=x+y$, $y(0)=1$, точное решение $y=2e^x-x-1$) и вручную составьте таблицу на $[0;0{,}5]$ с $h=0{,}1$.`, R`Take a problem with a known exact solution (e.g. $y'=x+y$, $y(0)=1$, exact $y=2e^x-x-1$) and build a table by hand on $[0,0.5]$ with $h=0.1$.`),
      L('Ilovaning «Python» bo‘limidagi Eyler namunasini o‘rganing va o‘zingiz qayta yozing (funksiya: f, x0, y0, h, n).', 'Изучите пример метода Эйлера в разделе «Python» приложения и напишите его сами (функция: f, x0, y0, h, n).', 'Study the Euler sample in the app’s “Python” section and rewrite it yourself (a function of f, x0, y0, h, n).'),
      L('Dastur natijasini qo‘lda hisob bilan solishtiring; $h=0{,}1;\\ 0{,}05;\\ 0{,}025$ uchun $x=0{,}5$ dagi xatoni jadvalga yozing.', 'Сравните результат программы с ручным расчётом; запишите в таблицу погрешность при $x=0{,}5$ для $h=0{,}1;\\ 0{,}05;\\ 0{,}025$.', 'Compare the program with your hand table; tabulate the error at $x=0.5$ for $h=0.1,\\ 0.05,\\ 0.025$.'),
      L('L07 laboratoriyasida natijani tekshiring va grafikni saqlang.', 'Проверьте результат в лаборатории L07 и сохраните график.', 'Check the result in lab L07 and save the graph.')
    ],
    output: L('Qo‘lda tuzilgan jadval, Python kodi (.py yoki daftar), xato jadvali va grafik, 1 paragraf xulosa.', 'Таблица ручного расчёта, код на Python (.py или блокнот), таблица погрешностей и график, вывод в 1 абзац.', 'A hand-computed table, Python code (.py or notebook), an error table and a graph, a one-paragraph conclusion.'),
    criteria: [
      L('Qo‘lda hisob va dastur natijalari mos.', 'Ручной расчёт и программа совпадают.', 'Hand and program results agree.'),
      L('Kod ishlaydi va izohlangan.', 'Код работает и прокомментирован.', 'The code runs and is commented.'),
      L('Xato $h$ ga taxminan proporsional kamayishi ko‘rsatilgan.', 'Показано, что погрешность убывает примерно пропорционально $h$.', 'It is shown that the error decreases roughly in proportion to $h$.'),
      L('Xulosada usulning cheklovlari aytilgan.', 'В выводе названы ограничения метода.', 'The conclusion states the method’s limitations.')
    ],
    selfcheck: [
      L('Eyler usulining bir qadami geometrik jihatdan nimani anglatadi?', 'Что геометрически означает один шаг метода Эйлера?', 'What does one Euler step mean geometrically?'),
      L('Qadam ikki marta kichraysa, global xato taxminan necha marta kamayadi?', 'Во сколько раз примерно уменьшится глобальная погрешность при уменьшении шага вдвое?', 'By roughly what factor does the global error drop when the step is halved?'),
      L(R`$y'=x+y$ uchun Eyler usuli aniq yechimdan yuqorida yoki pastda qoladimi? Nega?`, R`Для $y'=x+y$ метод Эйлера даёт значения выше или ниже точного решения? Почему?`, R`For $y'=x+y$, does Euler’s method stay above or below the exact solution? Why?`)
    ] },
  { n: 6, hours: 5, topics: ['t03', 't01', 't06'],
    title: L('Bir jinsli tenglamalar, boshlang‘ich shartli masalalar, 2-tartib qo‘llanishlari', 'Однородные уравнения, задачи с начальными условиями, применения 2-го порядка', 'Homogeneous equations, initial value problems, second-order applications'),
    syllabusText: L('Gomogen differensial tenglamalarga oid 5 ta misol ishlash. Boshlang‘ich shartli masalalarning amaliy ahamiyatini o‘rganish. Ikkinchi tartibli tenglamalarning qo‘llanilishiga misollar topish.',
      'Решить 5 примеров на однородные (гомогенные) дифференциальные уравнения. Изучить практическое значение задач с начальными условиями. Найти примеры применения уравнений второго порядка.',
      'Work 5 examples on homogeneous differential equations. Study the practical importance of initial value problems. Find examples of applications of second-order equations.'),
    goal: L(R`$y=ux$ almashtirishni qo‘llay olish; nega amaliy masala boshlang‘ich shartlarsiz to‘liq aniqlanmasligini tushuntirish; ikkinchi tartibli modellarni tanish.`, R`Применять замену $y=ux$; объяснять, почему практическая задача без начальных условий не определена полностью; узнавать модели второго порядка.`, R`Use the substitution $y=ux$; explain why a practical problem is not fully determined without initial conditions; recognise second-order models.`),
    steps: [
      L('3-mavzu darslarini o‘qing; 5 ta bir jinsli tenglama yeching ($y=u_0x$ yechimlarini tekshirib).', 'Прочитайте уроки темы 3; решите 5 однородных уравнений (проверяя решения $y=u_0x$).', 'Read the lessons of topic 3; solve 5 homogeneous equations (checking for solutions $y=u_0x$).'),
      L('1-mavzudagi Koshi masalasi va mavjudlik–yagonalik teoremasini qayta o‘qing; 2 ta amaliy misolda (sovish, zaryad) boshlang‘ich shart nimani belgilashini yozing.', 'Перечитайте задачу Коши и теорему существования и единственности из темы 1; на 2 практических примерах (остывание, заряд) опишите, что задаёт начальное условие.', 'Re-read the Cauchy problem and the existence–uniqueness theorem in topic 1; for 2 practical examples (cooling, charge) describe what the initial condition fixes.'),
      L(R`Ikkinchi tartibli tenglamalarga 3 ta misol toping: prujina–massa $mx''+cx'+kx=0$, $RLC$ zanjir, mayatnik; har birida nechta boshlang‘ich shart kerakligini ayting.`, R`Найдите 3 примера уравнений второго порядка: пружина–масса $mx''+cx'+kx=0$, цепь $RLC$, маятник; для каждого укажите, сколько начальных условий нужно.`, R`Find 3 examples of second-order equations: spring–mass $mx''+cx'+kx=0$, an $RLC$ circuit, a pendulum; say how many initial conditions each needs.`),
      L('L06 laboratoriyasida bir xil tenglama turli boshlang‘ich shartlarda qanday turli harakat berishini kuzating.', 'В лаборатории L06 посмотрите, как одно уравнение даёт разные движения при разных начальных условиях.', 'In lab L06 see how one equation gives different motions for different initial conditions.')
    ],
    output: L('5 ta yechim; 1 betlik izoh (boshlang‘ich shartlarning ahamiyati); 3 ta ikkinchi tartibli model tavsifi.', '5 решений; пояснение на 1 страницу (значение начальных условий); описание 3 моделей второго порядка.', '5 solutions; a 1-page note on the role of initial conditions; descriptions of 3 second-order models.'),
    criteria: [
      L(R`Bir jinslilik $f(tx,ty)=f(x,y)$ bilan tekshirilgan.`, R`Однородность проверена через $f(tx,ty)=f(x,y)$.`, R`Homogeneity is checked via $f(tx,ty)=f(x,y)$.`),
      L('Yechimlar tekshirilgan, yo‘qolgan yechimlar qo‘shilgan.', 'Решения проверены, потерянные решения добавлены.', 'Solutions are checked and lost solutions added back.'),
      L('Izohda mavjudlik va yagonalik g‘oyasi to‘g‘ri ishlatilgan.', 'В пояснении верно использована идея существования и единственности.', 'The note uses existence and uniqueness correctly.'),
      L('Har bir 2-tartibli modelda o‘zgaruvchilar va birliklar aniq.', 'В каждой модели 2-го порядка ясны переменные и единицы.', 'Each second-order model has clear variables and units.')
    ],
    selfcheck: [
      L(R`$y'=\dfrac{x+y}{x}$ bir jinslimi? Qaysi almashtirish kerak?`, R`Однородно ли $y'=\dfrac{x+y}{x}$? Какая замена нужна?`, R`Is $y'=\dfrac{x+y}{x}$ homogeneous? Which substitution is needed?`),
      L('Ikkinchi tartibli tenglama uchun nechta boshlang‘ich shart kerak?', 'Сколько начальных условий нужно для уравнения второго порядка?', 'How many initial conditions does a second-order equation need?'),
      L('«Bir jinsli» so‘zining ikki xil ma’nosini ayting.', 'Назовите два разных смысла слова «однородное».', 'Name the two different meanings of “homogeneous”.')
    ],
    note: L('Sillabusdagi «gomogen» so‘zi ikki ma’noli: $y/x$ ga bog‘liq birinchi tartibli tenglama (3-mavzu) yoki o‘ng tomoni nol chiziqli tenglama (8-mavzu). Topshiriq 3-mavzudan keyin berilgani uchun ilova birinchi ma’noni oladi; o‘qituvchingizdan aniqlashtiring.', 'Слово «гомогенные» в силлабусе двусмысленно: уравнение первого порядка, зависящее от $y/x$ (тема 3), или линейное уравнение с нулевой правой частью (тема 8). Приложение берёт первый смысл; уточните у преподавателя.', 'The word “gomogen” in the syllabus is ambiguous: a first-order equation depending on $y/x$ (topic 3) or a linear equation with zero right side (topic 8). The app takes the first meaning; confirm with your teacher.') },
  { n: 7, hours: 5, topics: ['t08'],
    title: L('Xarakteristik tenglama: haqiqiy, karrali va kompleks ildizlar', 'Характеристическое уравнение: действительные, кратные и комплексные корни', 'Characteristic equation: real, repeated and complex roots'),
    syllabusText: L('Haqiqiy, karrali va kompleks ildizli masalalardan misollar yechish. Xarakteristik tenglama usulini konspekt qilish. Har bir holat uchun alohida misol tayyorlash.',
      'Решить примеры с действительными, кратными и комплексными корнями. Законспектировать метод характеристического уравнения. Подготовить отдельный пример для каждого случая.',
      'Solve examples with real, repeated and complex roots. Write a summary of the characteristic-equation method. Prepare a separate example for each case.'),
    goal: L('Ildizlar turiga qarab fundamental yechimlar sistemasini to‘g‘ri yoza olish.', 'Правильно записывать фундаментальную систему решений в зависимости от вида корней.', 'Write the correct fundamental set of solutions for each kind of root.'),
    steps: [
      L('8-mavzu darslarini o‘qing va uchala holatni jadval ko‘rinishida konspekt qiling.', 'Прочитайте уроки темы 8 и законспектируйте три случая в виде таблицы.', 'Read the lessons of topic 8 and summarise the three cases in a table.'),
      L(R`Har bir holat uchun o‘zingiz misol tuzing (ildizlardan boshlab: masalan $k=2,-3$; $k=1$ ikki karrali; $k=-1\pm2i$) va tenglamani tiklang.`, R`Для каждого случая составьте свой пример (начиная с корней: например, $k=2,-3$; $k=1$ двукратный; $k=-1\pm2i$) и восстановите уравнение.`, R`Build your own example for each case (start from the roots, e.g. $k=2,-3$; $k=1$ double; $k=-1\pm2i$) and recover the equation.`),
      L('Har bir misolni yeching, Koshi masalasi qo‘shib o‘zgarmaslarni toping.', 'Решите каждый пример, добавьте задачу Коши и найдите постоянные.', 'Solve each example, add a Cauchy problem and find the constants.'),
      L('L05 laboratoriyasida ildizlarni o‘zgartirib, yechim grafigining shakli qanday o‘zgarishini kuzating.', 'В лаборатории L05 меняйте корни и смотрите, как меняется форма графика решения.', 'In lab L05 move the roots and watch how the shape of the solution changes.'),
      L('Javoblarni qo‘yib tekshiring (ilovadagi mashqlar tekshiruvchisi yoki Python/SymPy).', 'Проверьте ответы подстановкой (проверка упражнений в приложении или Python/SymPy).', 'Check your answers by substitution (the app’s exercise checker or Python/SymPy).')
    ],
    output: L('Konspekt (1–2 bet, jadval bilan) va 3 ta to‘liq yechilgan misol.', 'Конспект (1–2 страницы, с таблицей) и 3 полностью решённых примера.', 'A summary (1–2 pages with a table) and 3 fully solved examples.'),
    criteria: [
      L('Uchala holat to‘g‘ri va to‘liq yozilgan.', 'Все три случая записаны верно и полно.', 'All three cases are correct and complete.'),
      L('Karrali ildizda $x$ ko‘paytuvchi, kompleks ildizda haqiqiy yechimlar ishlatilgan.', 'Для кратного корня использован множитель $x$, для комплексных — действительные решения.', 'The factor $x$ is used for repeated roots and real solutions for complex roots.'),
      L('Koshi masalalarida o‘zgarmaslar to‘g‘ri topilgan.', 'Постоянные в задачах Коши найдены верно.', 'Constants in the Cauchy problems are correct.')
    ],
    selfcheck: [
      L(R`$y''-4y'+4y=0$ ning umumiy yechimi qanday?`, R`Каково общее решение $y''-4y'+4y=0$?`, R`What is the general solution of $y''-4y'+4y=0$?`),
      L(R`Ildizlar $\pm3i$ bo‘lsa, yechimlar qanday tebranadi?`, R`Как колеблются решения при корнях $\pm3i$?`, R`How do solutions oscillate when the roots are $\pm3i$?`),
      L(R`3-tartibli tenglamada $k=0$ uch karrali bo‘lsa, fundamental sistema qanday?`, R`Какова фундаментальная система уравнения 3-го порядка, если $k=0$ трёхкратный?`, R`For a third-order equation with $k=0$ a triple root, what is the fundamental set?`)
    ] },
  { n: 8, hours: 5, topics: ['t08', 't09'],
    title: L('Erkin va majburiy tebranishlar', 'Свободные и вынужденные колебания', 'Free and forced oscillations'),
    syllabusText: L('Erkin va majburiy tebranishlar haqida ma’lumot tayyorlash. Muhandislik tizimlarida tebranishlarga oid misollar topish. Tebranish tenglamalarining grafiklarini chizish.',
      'Подготовить сведения о свободных и вынужденных колебаниях. Найти примеры колебаний в инженерных системах. Построить графики уравнений колебаний.',
      'Prepare information on free and forced oscillations. Find examples of oscillations in engineering systems. Plot graphs of oscillation equations.'),
    goal: L(R`$mx''+cx'+kx=F(t)$ modelini tahlil qila olish: so‘nish turlari, majburiy tebranish va rezonans.`, R`Анализировать модель $mx''+cx'+kx=F(t)$: виды затухания, вынужденные колебания и резонанс.`, R`Analyse the model $mx''+cx'+kx=F(t)$: damping regimes, forced oscillation and resonance.`),
    steps: [
      L('8- va 9-mavzu darslarini (tebranishlar va rezonans) o‘qing.', 'Прочитайте уроки тем 8 и 9 (колебания и резонанс).', 'Read the lessons of topics 8 and 9 (oscillations and resonance).'),
      L(R`Erkin tebranish uchun uchta holatni yozing: kuchli so‘nish, kritik so‘nish, kuchsiz so‘nish ($c^2-4mk$ ishorasi).`, R`Для свободных колебаний опишите три случая: сильное, критическое, слабое затухание (знак $c^2-4mk$).`, R`For free oscillation describe the three regimes: overdamped, critically damped, underdamped (sign of $c^2-4mk$).`),
      L('Muhandislikdan 3 ta misol toping (masalan: avtomobil amortizatori, $RLC$ zanjir, binoning tebranishi, qattiq disk boshchasi) va ularning parametrlarini $m,c,k$ ga moslang.', 'Найдите 3 инженерных примера (например: амортизатор автомобиля, цепь $RLC$, колебания здания, головка жёсткого диска) и сопоставьте их параметры с $m,c,k$.', 'Find 3 engineering examples (e.g. a car shock absorber, an $RLC$ circuit, a swaying building, a hard-disk head) and map their parameters to $m,c,k$.'),
      L('L06 laboratoriyasida yoki Python (Matplotlib) da grafiklar chizing: 3 ta erkin holat, majburiy tebranish va rezonans.', 'Постройте графики в лаборатории L06 или на Python (Matplotlib): 3 свободных случая, вынужденные колебания и резонанс.', 'Plot in lab L06 or in Python (Matplotlib): the 3 free regimes, forced oscillation and resonance.'),
      L(R`Rezonans holatini ($c=0$, $\omega=\sqrt{k/m}$) noma’lum koeffitsiyentlar usuli bilan yeching va $t\sin\omega t$ hadi qayerdan kelishini tushuntiring.`, R`Решите резонансный случай ($c=0$, $\omega=\sqrt{k/m}$) методом неопределённых коэффициентов и объясните, откуда берётся член $t\sin\omega t$.`, R`Solve the resonance case ($c=0$, $\omega=\sqrt{k/m}$) by undetermined coefficients and explain where the term $t\sin\omega t$ comes from.`)
    ],
    output: L('2–3 betlik ma’lumot, 3 ta muhandislik misoli, kamida 5 ta grafik.', 'Справка на 2–3 страницы, 3 инженерных примера, не менее 5 графиков.', 'A 2–3 page write-up, 3 engineering examples, at least 5 graphs.'),
    criteria: [
      L('So‘nish holatlari diskriminant bo‘yicha to‘g‘ri ajratilgan.', 'Случаи затухания верно различены по дискриминанту.', 'Damping regimes are correctly distinguished by the discriminant.'),
      L('Rezonans yechimi to‘g‘ri va tekshirilgan.', 'Резонансное решение верно и проверено.', 'The resonance solution is correct and checked.'),
      L('Grafiklar o‘qlari, birliklari va parametrlari bilan.', 'Графики с осями, единицами и параметрами.', 'Graphs have axes, units and parameters.'),
      L('Muhandislik misollari model bilan to‘g‘ri bog‘langan.', 'Инженерные примеры верно связаны с моделью.', 'Engineering examples are correctly linked to the model.')
    ],
    selfcheck: [
      L(R`$x''+2x'+5x=0$ qaysi so‘nish turiga kiradi?`, R`Какой вид затухания у $x''+2x'+5x=0$?`, R`Which damping regime is $x''+2x'+5x=0$?`),
      L('Nega so‘nish bo‘lsa rezonansda amplituda cheksiz o‘smaydi?', 'Почему при наличии затухания амплитуда при резонансе не растёт бесконечно?', 'Why does the amplitude not grow without bound at resonance when there is damping?'),
      L('$RLC$ zanjirda $m,c,k$ ga nima mos keladi?', 'Что в цепи $RLC$ соответствует $m,c,k$?', 'What corresponds to $m,c,k$ in an $RLC$ circuit?')
    ] },
  { n: 9, hours: 5, topics: ['t09', 't10'],
    title: L('Noma’lum koeffitsiyentlar va parametrlarni variatsiyalash', 'Неопределённые коэффициенты и вариация параметров', 'Undetermined coefficients and variation of parameters'),
    syllabusText: L('Aniqlanmagan koeffitsiyentlar usuli bo‘yicha 3 ta misol yechish. Parametrlarni variatsiyalash usulini o‘rganish. Ikki usulning taqqoslovchi jadvalini tayyorlash.',
      'Решить 3 примера методом неопределённых коэффициентов. Изучить метод вариации параметров. Подготовить сравнительную таблицу двух методов.',
      'Solve 3 examples by the method of undetermined coefficients. Study variation of parameters. Prepare a table comparing the two methods.'),
    goal: L('Bir jinsli bo‘lmagan tenglama uchun mos usulni tanlay olish va ikkalasining chegaralarini bilish.', 'Выбирать подходящий метод для неоднородного уравнения и знать границы обоих.', 'Choose the right method for a nonhomogeneous equation and know the limits of both.'),
    steps: [
      L('9-mavzudan noma’lum koeffitsiyentlar darsini o‘qing; 3 ta misol yeching: oddiy holat, rezonans holati, yig‘indi o‘ng tomon.', 'Прочитайте урок темы 9 о неопределённых коэффициентах; решите 3 примера: обычный случай, резонанс, правая часть-сумма.', 'Read the topic 9 lesson on undetermined coefficients; solve 3 examples: a plain case, a resonance case, a sum on the right.'),
      L('10-mavzudan o‘zgarmaslarni variatsiyalash darsini o‘qing; bitta misolni ikkala usul bilan yeching va natijalar mosligini ko‘rsating.', 'Прочитайте урок темы 10 о вариации постоянных; решите один пример обоими методами и покажите совпадение.', 'Read the topic 10 lesson on variation of parameters; solve one example by both methods and show the results agree.'),
      L(R`Faqat variatsiya ishlaydigan misol yeching (masalan $y''+y=\tan x$).`, R`Решите пример, где работает только вариация (например, $y''+y=\tan x$).`, R`Solve an example where only variation works (e.g. $y''+y=\tan x$).`),
      L('Ilovaning «Qaysi usulni tanlayman?» bo‘limida o‘z misollaringizni sinab ko‘ring.', 'Проверьте свои примеры в разделе «Какой метод выбрать?».', 'Try your examples in the “Which method?” section of the app.'),
      L('Taqqoslash jadvali: qo‘llanish sharti, o‘ng tomon turi, koeffitsiyentlar, hisob hajmi, xato manbalari.', 'Сравнительная таблица: условия применимости, вид правой части, коэффициенты, объём вычислений, источники ошибок.', 'Comparison table: when it applies, kind of right side, coefficients, amount of work, sources of mistakes.')
    ],
    output: L('3 ta misol (noma’lum koeffitsiyentlar), 1–2 ta misol (variatsiya), 1 betlik taqqoslash jadvali.', '3 примера (неопределённые коэффициенты), 1–2 примера (вариация), сравнительная таблица на 1 страницу.', '3 examples (undetermined coefficients), 1–2 examples (variation), a 1-page comparison table.'),
    criteria: [
      L('Rezonans holatida $x^s$ ko‘paytuvchi to‘g‘ri qo‘yilgan.', 'В резонансном случае верно поставлен множитель $x^s$.', 'The factor $x^s$ is placed correctly in the resonance case.'),
      L('Variatsiyada Vronskian va sistema to‘g‘ri.', 'В вариации верны вронскиан и система.', 'The Wronskian and the system are correct in variation.'),
      L('Jadvalda har bir usul qachon ishlamasligi aytilgan.', 'В таблице указано, когда каждый метод не работает.', 'The table says when each method fails.'),
      L('Barcha javoblar tekshirilgan.', 'Все ответы проверены.', 'All answers are checked.')
    ],
    selfcheck: [
      L(R`$y''-y=e^x$ uchun $y_p$ qaysi ko‘rinishda izlanadi?`, R`В каком виде ищется $y_p$ для $y''-y=e^x$?`, R`In what form is $y_p$ sought for $y''-y=e^x$?`),
      L('Nega $\\tan x$ o‘ng tomonda noma’lum koeffitsiyentlar ishlamaydi?', 'Почему метод неопределённых коэффициентов не работает при $\\tan x$ справа?', 'Why does undetermined coefficients fail for $\\tan x$ on the right?'),
      L('Variatsiya formulalaridan oldin nima qilish kerak, agar $y\'\'$ oldida $x^2$ tursa?', 'Что нужно сделать перед формулами вариации, если при $y\'\'$ стоит $x^2$?', 'What must you do before applying the variation formulas if $y\'\'$ has coefficient $x^2$?')
    ] },
  { n: 10, hours: 5, topics: ['t12'],
    title: L('Differensial tenglamalar sistemalari va matritsaviy ko‘rinish', 'Системы дифференциальных уравнений и матричная запись', 'Systems of differential equations and matrix form'),
    syllabusText: L('3 ta differensial tenglamalar sistemasini yechish. Matritsaviy ko‘rinish haqida konspekt tayyorlash. Mavjudlik va yagonalik teoremasining mazmunini yozish.',
      'Решить 3 системы дифференциальных уравнений. Подготовить конспект о матричной записи. Записать содержание теоремы существования и единственности.',
      'Solve 3 systems of differential equations. Prepare notes on the matrix form. Write out the content of the existence and uniqueness theorem.'),
    goal: L(R`Normal sistemani $X'=AX$ ko‘rinishida yozish, uni yo‘qotish va xos qiymatlar usullari bilan yechish, Koshi masalasi qachon yagona yechimga ega ekanini bilish.`, R`Записывать нормальную систему в виде $X'=AX$, решать её исключением и через собственные значения, знать, когда задача Коши имеет единственное решение.`, R`Write a normal system as $X'=AX$, solve it by elimination and by eigenvalues, and know when the Cauchy problem has a unique solution.`),
    steps: [
      L('12-mavzu darslarini o‘qing.', 'Прочитайте уроки темы 12.', 'Read the lessons of topic 12.'),
      L('3 ta sistema yeching: haqiqiy turli xos qiymatlar, kompleks xos qiymatlar va Koshi masalasi bilan. Birini o‘zgarmaslarni yo‘qotish usulida ham yeching.', 'Решите 3 системы: с различными действительными, с комплексными собственными значениями и с задачей Коши. Одну решите также методом исключения.', 'Solve 3 systems: distinct real eigenvalues, complex eigenvalues, and one with a Cauchy problem. Solve one of them by elimination as well.'),
      L(R`Konspekt: $n$-tartibli tenglamani sistemaga keltirish, $X'=A(t)X+F(t)$ yozuvi, fundamental matritsa.`, R`Конспект: сведение уравнения $n$-го порядка к системе, запись $X'=A(t)X+F(t)$, фундаментальная матрица.`, R`Notes: reducing an $n$th-order equation to a system, the notation $X'=A(t)X+F(t)$, the fundamental matrix.`),
      L(R`Mavjudlik va yagonalik teoremasini aniq shartlari bilan yozing (chiziqli sistema uchun: $A(t)$, $F(t)$ oraliqda uzluksiz $\Rightarrow$ yechim butun oraliqda mavjud va yagona).`, R`Запишите теорему существования и единственности с точными условиями (для линейной системы: $A(t)$, $F(t)$ непрерывны на интервале $\Rightarrow$ решение существует и единственно на всём интервале).`, R`Write the existence and uniqueness theorem with exact hypotheses (for a linear system: $A(t)$, $F(t)$ continuous on an interval $\Rightarrow$ the solution exists and is unique on the whole interval).`),
      L('L08 laboratoriyasida yechgan sistemalaringizning faza portretini ko‘ring.', 'Посмотрите фазовые портреты своих систем в лаборатории L08.', 'View the phase portraits of your systems in lab L08.')
    ],
    output: L('3 ta yechilgan sistema, 1–2 betlik konspekt, teorema matni (0,5 bet).', '3 решённые системы, конспект 1–2 страницы, формулировка теоремы (0,5 страницы).', '3 solved systems, 1–2 pages of notes, the theorem statement (half a page).'),
    criteria: [
      L('Xos qiymat va xos vektorlar to‘g‘ri, yechim tekshirilgan.', 'Собственные значения и векторы верны, решение проверено.', 'Eigenvalues and eigenvectors are correct and the solution is checked.'),
      L('Matritsaviy yozuv to‘g‘ri.', 'Матричная запись верна.', 'The matrix notation is correct.'),
      L('Teorema shartlari va xulosasi aniq ajratilgan.', 'Условия и заключение теоремы чётко разделены.', 'The theorem’s hypotheses and conclusion are clearly separated.')
    ],
    selfcheck: [
      L(R`$x''+x=0$ ni sistemaga qanday keltirasiz?`, R`Как свести $x''+x=0$ к системе?`, R`How do you rewrite $x''+x=0$ as a system?`),
      L('$n$ ta tenglamali sistemaning umumiy yechimida nechta o‘zgarmas bor?', 'Сколько постоянных в общем решении системы из $n$ уравнений?', 'How many constants does the general solution of a system of $n$ equations have?'),
      L('Kompleks xos qiymatdan haqiqiy yechimni qanday olasiz?', 'Как получить действительное решение из комплексного собственного значения?', 'How do you get real solutions from a complex eigenvalue?')
    ] },
  { n: 11, hours: 5, topics: ['t12'],
    title: L('Xos qiymatlar, faza tekisligi va kompyuter tarmoqlari modellari', 'Собственные значения, фазовая плоскость и модели компьютерных сетей', 'Eigenvalues, the phase plane and computer-network models'),
    syllabusText: L('Berilgan matritsalar uchun xos qiymat va xos vektorlarni topish. Faza tekisligi tushunchasini o‘rganish. Kompyuter tarmoqlarini modellashtirish bo‘yicha ma’lumot yig‘ish.',
      'Найти собственные значения и собственные векторы данных матриц. Изучить понятие фазовой плоскости. Собрать сведения о моделировании компьютерных сетей.',
      'Find eigenvalues and eigenvectors of given matrices. Study the notion of the phase plane. Collect information on modelling computer networks.'),
    goal: L('Xos qiymatlar bo‘yicha muvozanat holati turini aniqlash va tarmoq jarayonlarini (virus tarqalishi, navbatlar) ODT sistemalari bilan tasvirlash g‘oyasini tushunish.', 'Определять тип положения равновесия по собственным значениям и понимать, как сетевые процессы (распространение вируса, очереди) описываются системами ОДУ.', 'Classify an equilibrium by its eigenvalues and understand how network processes (virus spread, queues) are described by ODE systems.'),
    steps: [
      L('Kamida 4 ta $2\\times2$ matritsa uchun xos qiymat va xos vektorlarni toping (tugun, egar, fokus, markaz holatlari) va SymPy/NumPy bilan tekshiring.', 'Найдите собственные значения и векторы хотя бы 4 матриц $2\\times2$ (случаи узла, седла, фокуса, центра) и проверьте в SymPy/NumPy.', 'Find eigenvalues and eigenvectors of at least 4 $2\\times2$ matrices (node, saddle, focus, centre cases) and check with SymPy/NumPy.'),
      L('12-mavzudagi faza portreti darsini o‘qing; L08 laboratoriyasida har bir matritsa uchun portret chizing.', 'Прочитайте урок темы 12 о фазовом портрете; постройте портрет для каждой матрицы в лаборатории L08.', 'Read the topic 12 lesson on phase portraits; draw the portrait of each matrix in lab L08.'),
      L('Iz va determinant bo‘yicha tasniflash jadvalini tuzing.', 'Составьте таблицу классификации по следу и определителю.', 'Build a classification table by trace and determinant.'),
      L('Tarmoq modellari haqida ma’lumot yig‘ing: SI/SIR virus tarqalishi, trafik oqimi, navbat; har biri uchun tenglamalarni va o‘zgaruvchilar ma’nosini yozing, manbani ko‘rsating.', 'Соберите сведения о сетевых моделях: распространение вируса SI/SIR, поток трафика, очередь; для каждой запишите уравнения и смысл переменных, укажите источник.', 'Collect information on network models: SI/SIR virus spread, traffic flow, queues; for each write the equations and the meaning of the variables, with a source.')
    ],
    output: L('Hisoblar (4+ matritsa), faza portretlari, tasniflash jadvali, 1–2 betlik tarmoq modellari sharhi.', 'Вычисления (4+ матрицы), фазовые портреты, таблица классификации, обзор сетевых моделей на 1–2 страницы.', 'Computations (4+ matrices), phase portraits, a classification table, a 1–2 page review of network models.'),
    criteria: [
      L('Xos qiymat/vektorlar to‘g‘ri va tekshirilgan.', 'Собственные значения/векторы верны и проверены.', 'Eigenvalues/vectors are correct and checked.'),
      L('Portret turi xos qiymatlarga mos.', 'Тип портрета соответствует собственным значениям.', 'The portrait type matches the eigenvalues.'),
      L('Tarmoq modellari to‘g‘ri tasvirlangan va manbali.', 'Сетевые модели описаны верно и с источниками.', 'Network models are described correctly with sources.')
    ],
    selfcheck: [
      L(R`$\lambda_1=-1$, $\lambda_2=2$ bo‘lsa, muvozanat holati qanday?`, R`Какое положение равновесия при $\lambda_1=-1$, $\lambda_2=2$?`, R`What equilibrium do $\lambda_1=-1$, $\lambda_2=2$ give?`),
      L('Faza tekisligidagi traektoriya va vaqt grafigining farqi nima?', 'Чем траектория на фазовой плоскости отличается от графика по времени?', 'How does a phase-plane trajectory differ from a time plot?'),
      L('SIR modelida qaysi kattalik saqlanadi?', 'Какая величина сохраняется в модели SIR?', 'Which quantity is conserved in the SIR model?')
    ],
    note: L('Kompyuter tarmoqlarini modellashtirish 11, 15 va 17-topshiriqlarda takrorlanadi; materialni bir marta yig‘ib, keyingi topshiriqlarda chuqurlashtirish mumkin.', 'Моделирование компьютерных сетей повторяется в заданиях 11, 15 и 17; материал можно собрать один раз и углублять в следующих заданиях.', 'Modelling of computer networks recurs in tasks 11, 15 and 17; you can collect the material once and deepen it in the later tasks.') },
  { n: 12, hours: 5, topics: ['tL'],
    title: L('Laplas almashtirishi: jadval, hisoblash va tenglamalarni yechish', 'Преобразование Лапласа: таблица, вычисления, решение уравнений', 'Laplace transform: table, computation and solving equations'),
    syllabusText: L('Laplas almashtirishining asosiy formulalarini jadval ko‘rinishida tayyorlash. 5 ta funksiyaning Laplas almashtirishini hisoblash. Differensial tenglamalarni Laplas usuli bilan yechish bo‘yicha misollar ishlash.',
      'Подготовить основные формулы преобразования Лапласа в виде таблицы. Вычислить преобразование Лапласа 5 функций. Решить примеры дифференциальных уравнений методом Лапласа.',
      'Prepare the basic Laplace transform formulas as a table. Compute the Laplace transform of 5 functions. Work examples of solving differential equations by the Laplace method.'),
    goal: L('Laplas almashtirishi orqali boshlang‘ich shartli chiziqli masalani algebraik masalaga aylantira olish.', 'С помощью преобразования Лапласа сводить линейную задачу с начальными условиями к алгебраической.', 'Use the Laplace transform to turn a linear initial value problem into an algebraic one.'),
    steps: [
      L('Ilovadagi qo‘shimcha modul (tL) darslarini o‘qing.', 'Прочитайте уроки дополнительного модуля (tL).', 'Read the lessons of the extra module (tL).'),
      L(R`Jadval tuzing: $1$, $t^n$, $e^{at}$, $\sin bt$, $\cos bt$, siljish teoremalari, hosilalar, $u(t-a)$, $\delta(t)$.`, R`Составьте таблицу: $1$, $t^n$, $e^{at}$, $\sin bt$, $\cos bt$, теоремы сдвига, производные, $u(t-a)$, $\delta(t)$.`, R`Build a table: $1$, $t^n$, $e^{at}$, $\sin bt$, $\cos bt$, shift theorems, derivatives, $u(t-a)$, $\delta(t)$.`),
      L(R`5 ta funksiyaning almashtirishini ta’rif bo‘yicha (kamida 2 tasini integral orqali) hisoblang; SymPy laplace_transform bilan tekshiring.`, R`Вычислите преобразования 5 функций (хотя бы 2 — по определению через интеграл); проверьте в SymPy laplace_transform.`, R`Compute the transforms of 5 functions (at least 2 directly from the defining integral); check with SymPy laplace_transform.`),
      L('L12 laboratoriyasida 2–3 ta Koshi masalasini yeching va har bir qadamni qo‘lda takrorlang.', 'Решите 2–3 задачи Коши в лаборатории L12 и повторите каждый шаг вручную.', 'Solve 2–3 Cauchy problems in lab L12 and repeat every step by hand.'),
      L('Javoblarni boshlang‘ich shartlar va tenglamaga qo‘yib tekshiring.', 'Проверьте ответы подстановкой в уравнение и начальные условия.', 'Check the answers in the equation and initial conditions.')
    ],
    output: L('Formulalar jadvali (1 bet), 5 ta hisob, 2–3 ta yechilgan masala.', 'Таблица формул (1 страница), 5 вычислений, 2–3 решённые задачи.', 'A formula table (1 page), 5 computations, 2–3 solved problems.'),
    criteria: [
      L('Jadvaldagi formulalar to‘g‘ri, yaqinlashish sharti ($s>a$) ko‘rsatilgan.', 'Формулы таблицы верны, указано условие сходимости ($s>a$).', 'Table formulas are correct and the convergence condition ($s>a$) is stated.'),
      L('Ta’rif bo‘yicha hisoblar to‘liq.', 'Вычисления по определению полные.', 'The computations from the definition are complete.'),
      L('Sodda kasrlarga ajratish va teskari almashtirish to‘g‘ri.', 'Разложение на простейшие дроби и обратное преобразование верны.', 'Partial fractions and inversion are correct.')
    ],
    selfcheck: [
      L(R`$\mathcal L\{y''\}$ ni $Y(s)$ orqali yozing.`, R`Запишите $\mathcal L\{y''\}$ через $Y(s)$.`, R`Write $\mathcal L\{y''\}$ in terms of $Y(s)$.`),
      L(R`$\mathcal L\{e^{2t}\sin 3t\}$ nimaga teng?`, R`Чему равно $\mathcal L\{e^{2t}\sin 3t\}$?`, R`What is $\mathcal L\{e^{2t}\sin 3t\}$?`),
      L('Nega Laplas usulida o‘zgarmaslarni alohida topish shart emas?', 'Почему в методе Лапласа не нужно отдельно находить постоянные?', 'Why don’t you need to find constants separately in the Laplace method?')
    ],
    note: L('Laplas almashtirishi sillabusdagi TN3 natijasida va 12–13-topshiriqlarda bor, lekin M1–M15 ma’ruzalar rejasida yo‘q. Ilova uni qo‘shimcha modul (tL) sifatida beradi; qaysi darsda o‘tilishini o‘qituvchidan aniqlang.', 'Преобразование Лапласа есть в результате TN3 и в заданиях 12–13, но отсутствует в плане лекций M1–M15. Приложение даёт его как дополнительный модуль (tL); уточните у преподавателя, когда его проходят.', 'The Laplace transform appears in outcome TN3 and tasks 12–13 but not in the lecture plan M1–M15. The app provides it as an extra module (tL); ask your teacher when it is covered.') },
  { n: 13, hours: 5, topics: ['tL', 't12', 't09'],
    title: L('Elektr zanjirlari, impuls va signallar; sistemalar uchun Laplas usuli', 'Электрические цепи, импульс и сигналы; метод Лапласа для систем', 'Electric circuits, impulses and signals; Laplace for systems'),
    syllabusText: L('Elektr zanjirlariga oid modelni o‘rganish. Impuls va signal tushunchalariga oid ma’lumot tayyorlash. Laplas usuli bilan sistemalarni yechish bo‘yicha misollar ishlash.',
      'Изучить модель электрических цепей. Подготовить сведения о понятиях импульса и сигнала. Решить примеры систем методом Лапласа.',
      'Study a model of electric circuits. Prepare information on the notions of impulse and signal. Work examples of solving systems by the Laplace method.'),
    goal: L(R`$RC$ va $RLC$ zanjirlarini tenglama bilan yozish, pog‘ona va impuls kirishni $u(t-a)$, $\delta(t-a)$ bilan ifodalash, chiziqli sistemalarni Laplas usuli bilan yechish.`, R`Записывать цепи $RC$ и $RLC$ уравнениями, задавать ступенчатый и импульсный вход через $u(t-a)$, $\delta(t-a)$, решать линейные системы методом Лапласа.`, R`Write $RC$ and $RLC$ circuits as equations, express step and impulse inputs via $u(t-a)$, $\delta(t-a)$, and solve linear systems by Laplace.`),
    steps: [
      L(R`Kirxgof qonunlaridan $RC$ ($RQ'+Q/C=E(t)$) va $RLC$ ($LQ''+RQ'+Q/C=E(t)$) tenglamalarini chiqaring.`, R`Выведите из законов Кирхгофа уравнения $RC$ ($RQ'+Q/C=E(t)$) и $RLC$ ($LQ''+RQ'+Q/C=E(t)$).`, R`Derive from Kirchhoff’s laws the $RC$ ($RQ'+Q/C=E(t)$) and $RLC$ ($LQ''+RQ'+Q/C=E(t)$) equations.`),
      L('Impuls (Dirak delta), pog‘ona (Xevisayd) va signal tushunchalari haqida 1 betlik ma’lumot yozing; tL modulidagi tegishli darsdan foydalaning.', 'Напишите 1 страницу о понятиях импульса (дельта Дирака), ступеньки (Хевисайд) и сигнала; используйте соответствующий урок модуля tL.', 'Write one page on impulse (Dirac delta), step (Heaviside) and signal; use the relevant lesson of module tL.'),
      L('Pog‘ona kuchlanishda $RC$ zanjirini L12 da yoki qo‘lda Laplas usuli bilan yeching.', 'Решите цепь $RC$ со ступенчатым напряжением в L12 или вручную методом Лапласа.', 'Solve an $RC$ circuit with a step voltage in L12 or by hand with Laplace.'),
      L('2 ta chiziqli sistemani Laplas usuli bilan yeching; javobni 12-mavzudagi xos qiymatlar usuli bilan solishtiring.', 'Решите 2 линейные системы методом Лапласа; сравните ответ с методом собственных значений из темы 12.', 'Solve 2 linear systems by Laplace; compare with the eigenvalue method of topic 12.'),
      L('Natijalarni grafikda ko‘rsating (Python/Matplotlib yoki ilova grafiklari).', 'Покажите результаты на графиках (Python/Matplotlib или графики приложения).', 'Show the results as graphs (Python/Matplotlib or the app’s plots).')
    ],
    output: L('Zanjir modeli (1 bet), impuls va signal haqida ma’lumot (1 bet), 3 ta yechilgan masala grafiklar bilan.', 'Модель цепи (1 страница), сведения об импульсе и сигнале (1 страница), 3 решённые задачи с графиками.', 'A circuit model (1 page), information on impulse and signal (1 page), 3 solved problems with graphs.'),
    criteria: [
      L('Zanjir tenglamalari to‘g‘ri chiqarilgan, birliklar mos.', 'Уравнения цепей выведены верно, единицы согласованы.', 'Circuit equations are derived correctly with consistent units.'),
      L('Pog‘ona va impuls to‘g‘ri ifodalangan.', 'Ступенька и импульс записаны верно.', 'Step and impulse are written correctly.'),
      L('Sistemalar yechimi ikki usulda mos chiqadi.', 'Решения систем совпадают двумя методами.', 'The system solutions agree by both methods.')
    ],
    selfcheck: [
      L(R`$\mathcal L\{\delta(t-a)\}$ nimaga teng?`, R`Чему равно $\mathcal L\{\delta(t-a)\}$?`, R`What is $\mathcal L\{\delta(t-a)\}$?`),
      L(R`$t=2$ da yoqilgan 5 V kuchlanishni qanday yozasiz?`, R`Как записать напряжение 5 В, включённое при $t=2$?`, R`How do you write a 5 V voltage switched on at $t=2$?`),
      L(R`$RC$ zanjirining vaqt doimiysi nimaga teng?`, R`Чему равна постоянная времени цепи $RC$?`, R`What is the time constant of an $RC$ circuit?`)
    ],
    note: L('12-topshiriqdagi kabi: Laplas usuli ma’ruzalar rejasida yo‘q; ilovada qo‘shimcha modul tL.', 'Как и в задании 12: метода Лапласа нет в плане лекций; в приложении — дополнительный модуль tL.', 'As with task 12: the Laplace method is not in the lecture plan; the app has it as extra module tL.') },
  { n: 14, hours: 5, topics: ['t11'],
    title: L('Eyler, takomillashtirilgan Eyler va Runge–Kutta usullarini taqqoslash', 'Сравнение методов Эйлера, улучшенного Эйлера и Рунге–Кутты', 'Comparing Euler, improved Euler and Runge–Kutta'),
    syllabusText: L('Euler, takomillashtirilgan Euler va Runge-Kutta usullarini taqqoslash. Berilgan masalani uchala usul bilan yechish. Natijalarni jadval ko‘rinishida solishtirish.',
      'Сравнить методы Эйлера, улучшенного Эйлера и Рунге–Кутты. Решить данную задачу всеми тремя методами. Сравнить результаты в виде таблицы.',
      'Compare Euler, improved Euler and Runge–Kutta methods. Solve a given problem with all three methods. Compare the results in a table.'),
    goal: L('Usullarning aniqlik tartibini ($O(h)$, $O(h^2)$, $O(h^4)$) amalda ko‘rish va hisob narxini baholash.', 'Увидеть на практике порядок точности методов ($O(h)$, $O(h^2)$, $O(h^4)$) и оценить стоимость вычислений.', 'See the orders of accuracy ($O(h)$, $O(h^2)$, $O(h^4)$) in practice and weigh the computational cost.'),
    steps: [
      L('11-mavzu darslarini o‘qing va uchala usul formulalarini yozing.', 'Прочитайте уроки темы 11 и выпишите формулы трёх методов.', 'Read the topic 11 lessons and write out the formulas of the three methods.'),
      L(R`Aniq yechimi ma’lum masala tanlang (masalan $y'=y-x^2+1$, $y(0)=0{,}5$; aniq $y=(x+1)^2-0{,}5e^x$).`, R`Выберите задачу с известным точным решением (например, $y'=y-x^2+1$, $y(0)=0{,}5$; точное $y=(x+1)^2-0{,}5e^x$).`, R`Choose a problem with a known exact solution (e.g. $y'=y-x^2+1$, $y(0)=0.5$; exact $y=(x+1)^2-0.5e^x$).`),
      L('L07 laboratoriyasida va «Python» bo‘limidagi namunalar asosida uchala usulni bir xil $h$ bilan ishga tushiring.', 'Запустите три метода с одинаковым $h$ в лаборатории L07 и по образцам раздела «Python».', 'Run all three methods with the same $h$ in lab L07 and using the samples in the “Python” section.'),
      L('Jadval: $x_k$, uchala taqribiy qiymat, aniq qiymat, xatolar. Keyin $h$ ni ikki marta kichraytirib xatolar nisbatini hisoblang.', 'Таблица: $x_k$, три приближения, точное значение, погрешности. Затем уменьшите $h$ вдвое и посчитайте отношение погрешностей.', 'Table: $x_k$, three approximations, exact value, errors. Then halve $h$ and compute the error ratios.'),
      L('Xulosa: aniqlik, har qadamdagi $f$ hisoblari soni (1, 2, 4), qaysi holatda qaysi usul maqbul.', 'Вывод: точность, число вычислений $f$ на шаг (1, 2, 4), когда какой метод предпочтителен.', 'Conclusion: accuracy, function evaluations per step (1, 2, 4), which method suits which situation.')
    ],
    output: L('Taqqoslash jadvali, xato–qadam grafigi, kod, 0,5–1 betlik xulosa.', 'Сравнительная таблица, график погрешность–шаг, код, вывод на 0,5–1 страницы.', 'A comparison table, an error-vs-step graph, code, a 0.5–1 page conclusion.'),
    criteria: [
      L('Uchala usul to‘g‘ri amalga oshirilgan.', 'Все три метода реализованы верно.', 'All three methods are implemented correctly.'),
      L('Xatolar nisbati nazariy tartibga mos (≈2, ≈4, ≈16).', 'Отношения погрешностей соответствуют порядку (≈2, ≈4, ≈16).', 'Error ratios match the theoretical orders (≈2, ≈4, ≈16).'),
      L('Jadval va grafik aniq va izohlangan.', 'Таблица и график понятны и подписаны.', 'Table and graph are clear and labelled.'),
      L('Xulosa asoslangan.', 'Вывод обоснован.', 'The conclusion is justified.')
    ],
    selfcheck: [
      L('RK4 bir qadamda $f$ ni necha marta hisoblaydi?', 'Сколько раз РК4 вычисляет $f$ за шаг?', 'How many evaluations of $f$ does RK4 make per step?'),
      L('Qadam ikki marta kichraysa, RK4 xatosi taxminan necha marta kamayadi?', 'Во сколько раз примерно уменьшится погрешность РК4 при уменьшении шага вдвое?', 'By roughly what factor does the RK4 error drop when the step is halved?'),
      L('Nega juda kichik qadam ham har doim yaxshi emas?', 'Почему очень малый шаг не всегда хорош?', 'Why is a very small step not always good?')
    ] },
  { n: 15, hours: 5, topics: ['t12', 't11', 't02'],
    title: L('Kiberxavfsizlikda epidemik modellar: mini-loyiha va yakuniy taqdimot', 'Эпидемические модели в кибербезопасности: мини-проект и итоговая презентация', 'Epidemic models in cybersecurity: mini-project and final presentation'),
    syllabusText: L('Kiberxavfsizlikda epidemik modellar haqida mini-loyiha tayyorlash. Kompyuter tarmoqlaridagi trafik modellari haqida ma’lumot yig‘ish. Fan bo‘yicha yakuniy taqdimot (5–7 slayd) tayyorlash.',
      'Подготовить мини-проект об эпидемических моделях в кибербезопасности. Собрать сведения о моделях трафика в компьютерных сетях. Подготовить итоговую презентацию по дисциплине (5–7 слайдов).',
      'Prepare a mini-project on epidemic models in cybersecurity. Collect information on traffic models in computer networks. Prepare a final presentation for the course (5–7 slides).'),
    goal: L('Zararli dastur tarqalishini SI/SIR/SIS modellari bilan tasvirlash, sonli yechish va natijani himoya choralari nuqtayi nazaridan talqin qilish.', 'Описывать распространение вредоносного ПО моделями SI/SIR/SIS, решать численно и интерпретировать результат с точки зрения мер защиты.', 'Describe malware spread with SI/SIR/SIS models, solve numerically and interpret the result in terms of defences.'),
    steps: [
      L(R`Modelni tanlang, masalan SIR: $S'=-\beta SI/N$, $I'=\beta SI/N-\gamma I$, $R'=\gamma I$ (S — himoyasiz, I — zararlangan, R — yamalgan kompyuterlar).`, R`Выберите модель, например SIR: $S'=-\beta SI/N$, $I'=\beta SI/N-\gamma I$, $R'=\gamma I$ (S — незащищённые, I — заражённые, R — исправленные компьютеры).`, R`Pick a model, e.g. SIR: $S'=-\beta SI/N$, $I'=\beta SI/N-\gamma I$, $R'=\gamma I$ (S unprotected, I infected, R patched computers).`),
      L('Muvozanat holatlari va $R_0=\\beta/\\gamma$ ning ma’nosini 12-mavzu (sistemalar) asosida tahlil qiling.', 'Проанализируйте положения равновесия и смысл $R_0=\\beta/\\gamma$ на основе темы 12 (системы).', 'Analyse the equilibria and the meaning of $R_0=\\beta/\\gamma$ using topic 12 (systems).'),
      L('RK4 bilan (L07 yoki Python, SciPy solve_ivp) yeching; $\\beta$, $\\gamma$ ni o‘zgartirib, yamoqni tezlashtirish ta’sirini ko‘rsating.', 'Решите РК4 (L07 или Python, SciPy solve_ivp); меняя $\\beta$, $\\gamma$, покажите эффект ускоренного патчинга.', 'Solve with RK4 (L07 or Python, SciPy solve_ivp); vary $\\beta$, $\\gamma$ to show the effect of faster patching.'),
      L('Trafik modellari haqida qisqa ma’lumot yig‘ing (masalan, navbat modeli, oqim tenglamasi), manbali.', 'Соберите краткие сведения о моделях трафика (например, модель очереди, уравнение потока), с источниками.', 'Collect short information on traffic models (e.g. a queue model, a flow equation), with sources.'),
      L('5–7 slaydli taqdimot: muammo, model, yechish usuli, grafiklar, xulosa, manbalar.', 'Презентация 5–7 слайдов: проблема, модель, метод решения, графики, вывод, источники.', 'A 5–7 slide presentation: problem, model, solution method, graphs, conclusion, sources.')
    ],
    output: L('Mini-loyiha hisoboti (2–3 bet) kod va grafiklar bilan; 5–7 slaydli taqdimot.', 'Отчёт мини-проекта (2–3 страницы) с кодом и графиками; презентация 5–7 слайдов.', 'A mini-project report (2–3 pages) with code and graphs; a 5–7 slide presentation.'),
    criteria: [
      L('Model farazlari va parametrlar ma’nosi aniq.', 'Ясны допущения модели и смысл параметров.', 'Model assumptions and parameter meanings are clear.'),
      L('Sonli yechim to‘g‘ri, qadam tanlovi asoslangan.', 'Численное решение верно, выбор шага обоснован.', 'The numerical solution is correct and the step choice justified.'),
      L('Natija kiberxavfsizlik nuqtayi nazaridan talqin qilingan.', 'Результат интерпретирован с точки зрения кибербезопасности.', 'Results are interpreted from a cybersecurity viewpoint.'),
      L('Slaydlar soni 5–7, manbalar ko‘rsatilgan.', 'Слайдов 5–7, источники указаны.', '5–7 slides, sources cited.')
    ],
    selfcheck: [
      L(R`$R_0<1$ bo‘lsa, epidemiya nima bo‘ladi?`, R`Что происходит с эпидемией при $R_0<1$?`, R`What happens to the epidemic when $R_0<1$?`),
      L(R`Nega $S+I+R$ o‘zgarmas?`, R`Почему $S+I+R$ постоянна?`, R`Why is $S+I+R$ constant?`),
      L('Modelning qaysi farazi real tarmoqda buziladi?', 'Какое допущение модели нарушается в реальной сети?', 'Which model assumption fails in a real network?')
    ],
    note: L('Sillabusda «yakuniy taqdimot» 15, 17 va 18-topshiriqlarda alohida-alohida so‘ralgan; ularni bitta loyihaga birlashtirish mumkinligini o‘qituvchidan so‘rang.', 'Итоговая презентация в силлабусе требуется отдельно в заданиях 15, 17 и 18; спросите преподавателя, можно ли объединить их в один проект.', 'The syllabus asks for a “final presentation” separately in tasks 15, 17 and 18; ask your teacher whether they can be merged into one project.') },
  { n: 16, hours: 5, topics: ['t11', 't04'],
    title: L('Python kutubxonalari: birinchi tartibli tenglamani yechish va grafik', 'Библиотеки Python: решение уравнения первого порядка и график', 'Python libraries: solving a first-order equation and plotting'),
    syllabusText: L('Python kutubxonalari (NumPy, SciPy, Matplotlib) haqida qisqacha ma’lumot tayyorlash. Birinchi tartibli differensial tenglamani Python dasturida yechish va natijani grafik ko‘rinishda tasvirlash. Analitik va sonli yechimlarni taqqoslab xulosa yozish.',
      'Подготовить краткие сведения о библиотеках Python (NumPy, SciPy, Matplotlib). Решить дифференциальное уравнение первого порядка на Python и представить результат графически. Сравнить аналитическое и численное решения и написать вывод.',
      'Prepare a short overview of the Python libraries NumPy, SciPy and Matplotlib. Solve a first-order differential equation in Python and show the result as a graph. Compare the analytical and numerical solutions and write a conclusion.'),
    goal: L('Standart vositalar bilan ODT ni sonli yechish, analitik yechim bilan solishtirish va xatoni o‘lchash.', 'Численно решать ОДУ стандартными средствами, сравнивать с аналитическим решением и измерять погрешность.', 'Solve an ODE numerically with standard tools, compare with the analytical solution and measure the error.'),
    steps: [
      L('Har bir kutubxona uchun 3–5 jumla yozing: NumPy (massivlar), SciPy (solve_ivp, odeint), Matplotlib (grafiklar); SymPy (dsolve) ni ham qo‘shish mumkin.', 'Напишите 3–5 предложений о каждой библиотеке: NumPy (массивы), SciPy (solve_ivp, odeint), Matplotlib (графики); можно добавить SymPy (dsolve).', 'Write 3–5 sentences on each library: NumPy (arrays), SciPy (solve_ivp, odeint), Matplotlib (plots); you may add SymPy (dsolve).'),
      L(R`Analitik yechiladigan chiziqli tenglama tanlang (masalan $y'+2y=e^{-x}$, $y(0)=1$) va 4-mavzu usulida qo‘lda yeching.`, R`Выберите линейное уравнение с аналитическим решением (например, $y'+2y=e^{-x}$, $y(0)=1$) и решите вручную методом темы 4.`, R`Choose a linear equation with an analytical solution (e.g. $y'+2y=e^{-x}$, $y(0)=1$) and solve it by hand with the topic 4 method.`),
      L('«Python» bo‘limidagi namunadan foydalanib solve_ivp bilan yeching va ikkala yechimni bitta grafikda chizing.', 'По образцу из раздела «Python» решите с solve_ivp и постройте оба решения на одном графике.', 'Using the sample in the “Python” section, solve with solve_ivp and plot both solutions on one graph.'),
      L('Xato grafigini chizing va rtol/atol parametrlarini o‘zgartirib ta’sirini ko‘ring.', 'Постройте график погрешности и посмотрите влияние параметров rtol/atol.', 'Plot the error and see the effect of the rtol/atol parameters.'),
      L('Xulosa yozing: qachon analitik, qachon sonli yechim afzal.', 'Напишите вывод: когда предпочтительно аналитическое, когда численное решение.', 'Write a conclusion: when an analytical and when a numerical solution is preferable.')
    ],
    output: L('1 betlik kutubxonalar sharhi, ishlaydigan kod, 2 ta grafik (yechimlar va xato), 0,5 betlik xulosa.', 'Обзор библиотек на 1 страницу, работающий код, 2 графика (решения и погрешность), вывод на 0,5 страницы.', 'A 1-page library overview, working code, 2 graphs (solutions and error), a half-page conclusion.'),
    criteria: [
      L('Analitik yechim to‘g‘ri va tekshirilgan.', 'Аналитическое решение верно и проверено.', 'The analytical solution is correct and checked.'),
      L('Kod ishlaydi, grafiklar o‘qlari va legendasi bilan.', 'Код работает, графики с осями и легендой.', 'The code runs and graphs have axes and legends.'),
      L('Xato miqdoriy baholangan.', 'Погрешность оценена количественно.', 'The error is quantified.')
    ],
    selfcheck: [
      L('solve_ivp ga qaysi argumentlar majburiy?', 'Какие аргументы solve_ivp обязательны?', 'Which arguments of solve_ivp are required?'),
      L('Nega sonli yechim aniq yechimdan biroz farq qiladi?', 'Почему численное решение немного отличается от точного?', 'Why does the numerical solution differ slightly from the exact one?'),
      L('Funksiya f(t, y) da argumentlar tartibi qanday?', 'Каков порядок аргументов в функции f(t, y)?', 'What is the argument order in the function f(t, y)?')
    ] },
  { n: 17, hours: 5, topics: ['t11', 't12'],
    title: L('Sun’iy intellektda differensial tenglamalar; tarmoq trafigi mini-tadqiqoti', 'Дифференциальные уравнения в ИИ; мини-исследование сетевого трафика', 'Differential equations in AI; a network-traffic mini-study'),
    syllabusText: L('Sun’iy intellekt va mashinaviy o‘rganishda differensial tenglamalarning qo‘llanilishi haqida ma’lumot yig‘ish. Kompyuter tarmoqlarida trafik oqimini modellashtirish bo‘yicha mini-tadqiqot tayyorlash. Tanlangan amaliy masala bo‘yicha 5–7 slayddan iborat taqdimot tayyorlash.',
      'Собрать сведения о применении дифференциальных уравнений в искусственном интеллекте и машинном обучении. Подготовить мини-исследование по моделированию потока трафика в компьютерных сетях. Подготовить презентацию из 5–7 слайдов по выбранной прикладной задаче.',
      'Collect information on applications of differential equations in artificial intelligence and machine learning. Prepare a mini-study on modelling traffic flow in computer networks. Prepare a 5–7 slide presentation on a chosen applied problem.'),
    goal: L('ODT va ML o‘rtasidagi bog‘liqlikni (gradient tushish, neyron ODT) tushunish va oddiy trafik modelini tuzib tahlil qilish.', 'Понять связь ОДУ и машинного обучения (градиентный спуск, нейронные ОДУ) и построить и проанализировать простую модель трафика.', 'Understand the link between ODEs and machine learning (gradient descent, neural ODEs) and build and analyse a simple traffic model.'),
    steps: [
      L(R`ML dagi qo‘llanishlarni yig‘ing: gradient oqimi $\theta'=-\nabla L(\theta)$ va uning Eyler usuli sifatida gradient tushish; ResNet va neyron ODT; manbalarni ko‘rsating.`, R`Соберите применения в ML: градиентный поток $\theta'=-\nabla L(\theta)$ и градиентный спуск как метод Эйлера; ResNet и нейронные ОДУ; укажите источники.`, R`Collect ML applications: the gradient flow $\theta'=-\nabla L(\theta)$ and gradient descent as Euler’s method; ResNets and neural ODEs; cite sources.`),
      L(R`Oddiy trafik modelini tuzing, masalan bufer navbati $q'=\lambda(t)-\mu$ ($q>0$ da) yoki logistik yuklama modeli; farazlarni yozing.`, R`Постройте простую модель трафика, например очередь буфера $q'=\lambda(t)-\mu$ (при $q>0$) или логистическую модель нагрузки; запишите допущения.`, R`Build a simple traffic model, e.g. a buffer queue $q'=\lambda(t)-\mu$ (for $q>0$) or a logistic load model; state the assumptions.`),
      L('Modelni sonli yeching (L07 yoki Python) va parametrlar ta’sirini grafiklarda ko‘rsating.', 'Решите модель численно (L07 или Python) и покажите влияние параметров на графиках.', 'Solve the model numerically (L07 or Python) and show the effect of the parameters on graphs.'),
      L('5–7 slaydli taqdimot tayyorlang.', 'Подготовьте презентацию из 5–7 слайдов.', 'Prepare a 5–7 slide presentation.')
    ],
    output: L('1–2 betlik sharh (AI/ML), mini-tadqiqot (2–3 bet, grafiklar bilan), 5–7 slaydli taqdimot.', 'Обзор (AI/ML) 1–2 страницы, мини-исследование (2–3 страницы, с графиками), презентация 5–7 слайдов.', 'A 1–2 page AI/ML review, a mini-study (2–3 pages with graphs), a 5–7 slide presentation.'),
    criteria: [
      L('Gradient tushish va Eyler usuli bog‘liqligi to‘g‘ri tushuntirilgan.', 'Связь градиентного спуска и метода Эйлера объяснена верно.', 'The link between gradient descent and Euler’s method is explained correctly.'),
      L('Trafik modeli farazlari va cheklovlari aytilgan.', 'Названы допущения и ограничения модели трафика.', 'The traffic model’s assumptions and limitations are stated.'),
      L('Sonli natijalar to‘g‘ri va izohlangan.', 'Численные результаты верны и пояснены.', 'Numerical results are correct and explained.'),
      L('Manbalar ko‘rsatilgan.', 'Указаны источники.', 'Sources are cited.')
    ],
    selfcheck: [
      L('Gradient tushishdagi o‘rganish tezligi Eyler usulida nimaga mos keladi?', 'Чему в методе Эйлера соответствует скорость обучения в градиентном спуске?', 'What does the learning rate in gradient descent correspond to in Euler’s method?'),
      L(R`Navbat modelida $\lambda>\mu$ bo‘lsa nima bo‘ladi?`, R`Что будет в модели очереди при $\lambda>\mu$?`, R`What happens in the queue model when $\lambda>\mu$?`),
      L('Modelingizning eng zaif farazi qaysi?', 'Какое допущение вашей модели самое слабое?', 'Which assumption of your model is the weakest?')
    ] },
  { n: 18, hours: 5, topics: ['t01', 't02', 't11', 't12'],
    title: L('Real jarayonni modellashtirish: yakuniy hisobot va himoya', 'Моделирование реального процесса: итоговый отчёт и защита', 'Modelling a real process: final report and defence'),
    syllabusText: L('Differensial tenglamalar yordamida real jarayonni modellashtirish (aholi o‘sishi, epidemiya tarqalishi, tarmoq trafigi va boshqalar). Tanlangan modelning matematik tavsifi va yechim usulini yozish. Yakuniy hisobot (3–5 bet) yoki taqdimot (8–10 slayd) tayyorlash va himoyaga tayyorlanish.',
      'Смоделировать реальный процесс с помощью дифференциальных уравнений (рост населения, распространение эпидемии, сетевой трафик и др.). Написать математическое описание выбранной модели и метод решения. Подготовить итоговый отчёт (3–5 страниц) или презентацию (8–10 слайдов) и подготовиться к защите.',
      'Model a real process with differential equations (population growth, epidemic spread, network traffic, etc.). Write the mathematical description of the chosen model and the solution method. Prepare a final report (3–5 pages) or a presentation (8–10 slides) and prepare for the defence.'),
    goal: L('Modellashtirishning to‘liq siklini mustaqil bajarish: jarayon → farazlar → tenglama → yechim (analitik va/yoki sonli) → tekshirish → talqin.', 'Самостоятельно пройти полный цикл моделирования: процесс → допущения → уравнение → решение (аналитическое и/или численное) → проверка → интерпретация.', 'Carry out the full modelling cycle on your own: process → assumptions → equation → solution (analytical and/or numerical) → check → interpretation.'),
    steps: [
      L('Jarayonni tanlang va ma’lumot manbasini toping (statistika, maqola, o‘z o‘lchovlaringiz).', 'Выберите процесс и найдите источник данных (статистика, статья, собственные измерения).', 'Choose a process and find a data source (statistics, an article, your own measurements).'),
      L('Farazlarni yozing va tenglamani chiqaring; har bir parametrning ma’nosi va birligini ko‘rsating.', 'Запишите допущения и выведите уравнение; укажите смысл и единицы каждого параметра.', 'State the assumptions and derive the equation; give the meaning and units of each parameter.'),
      L('Usulni ilovaning «Qaysi usulni tanlayman?» bo‘limi yordamida tanlang; mumkin bo‘lsa analitik, aks holda sonli yeching (L07, «Python»).', 'Выберите метод с помощью раздела «Какой метод выбрать?»; решите аналитически, если возможно, иначе численно (L07, «Python»).', 'Pick the method with the app’s “Which method?” section; solve analytically if possible, otherwise numerically (L07, “Python”).'),
      L('Natijani ma’lumotlar bilan solishtiring, parametrlarni baholang, modelning cheklovlarini yozing.', 'Сравните результат с данными, оцените параметры, опишите ограничения модели.', 'Compare with the data, estimate parameters, describe the model’s limitations.'),
      L('Hisobot (3–5 bet) yoki taqdimot (8–10 slayd) tayyorlang.', 'Подготовьте отчёт (3–5 страниц) или презентацию (8–10 слайдов).', 'Prepare the report (3–5 pages) or the presentation (8–10 slides).'),
      L('Himoyaga tayyorlaning: 3–5 daqiqalik nutq va ehtimoliy savollarga javoblar.', 'Подготовьтесь к защите: выступление на 3–5 минут и ответы на возможные вопросы.', 'Prepare for the defence: a 3–5 minute talk and answers to likely questions.')
    ],
    output: L('Yakuniy hisobot (3–5 bet) yoki taqdimot (8–10 slayd), hisob-kitoblar/kod ilova sifatida.', 'Итоговый отчёт (3–5 страниц) или презентация (8–10 слайдов), расчёты/код в приложении.', 'A final report (3–5 pages) or presentation (8–10 slides), with computations/code attached.'),
    criteria: [
      L('Farazlar aniq, tenglama ulardan mantiqan kelib chiqadi.', 'Допущения ясны, уравнение логично из них следует.', 'Assumptions are clear and the equation follows from them.'),
      L('Yechim usuli to‘g‘ri tanlangan va to‘g‘ri bajarilgan.', 'Метод решения выбран и выполнен верно.', 'The solution method is chosen and carried out correctly.'),
      L('Natija ma’lumotlar bilan solishtirilgan, cheklovlar aytilgan.', 'Результат сравнён с данными, названы ограничения.', 'Results are compared with data and limitations stated.'),
      L('Hajm talabi (3–5 bet yoki 8–10 slayd) bajarilgan, manbalar ko‘rsatilgan.', 'Выполнен объём (3–5 страниц или 8–10 слайдов), указаны источники.', 'The size requirement (3–5 pages or 8–10 slides) is met and sources are cited.')
    ],
    selfcheck: [
      L('Modelingizning har bir hadi qaysi faraz natijasida paydo bo‘ldi?', 'Из какого допущения возник каждый член вашей модели?', 'Which assumption produced each term of your model?'),
      L('Yechim mavjud va yagona ekanini qanday asoslaysiz?', 'Как вы обосновываете существование и единственность решения?', 'How do you justify that the solution exists and is unique?'),
      L('Parametr 10% ga o‘zgarsa, natija qanchalik o‘zgaradi?', 'Насколько изменится результат, если параметр изменится на 10%?', 'How much does the result change if a parameter changes by 10%?'),
      L('Model qaysi holatda noto‘g‘ri bashorat beradi?', 'В каком случае модель даёт неверный прогноз?', 'In which situation does the model give a wrong prediction?')
    ] }
];
})();
