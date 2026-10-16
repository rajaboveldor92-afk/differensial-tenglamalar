# Manbalar va litsenziyalar

## Adabiyotlar va ularning tekshirilgan holati

Belgilar:

- **Loyihada** — nusxa loyiha papkasida bor. Mundarija va tegishli boblar o‘qilgan, misollar va bob/§ raqamlari shu nusxa bilan solishtirilgan.
- **Yo‘q** — nusxa ish muhitida bo‘lmagan. Bibliografik ma’lumot o‘quv dasturidan ko‘chirilgan va tekshirilmagan. Bunday kitoblarga ilovada faqat bob/§ ko‘rsatkichi “⚠ tekshirilmagan” belgisi bilan beriladi. **Sahifa raqami berilmaydi.**

### Asosiy adabiyotlar (o‘quv dasturi bo‘yicha)

| Manba | Holat |
|---|---|
| Boyce, DiPrima, Meade. Elementary Differential Equations and Boundary Value Problems, 12th ed., Wiley, 2022 | **Yo‘q** |
| N. Euler. A First Course in Ordinary Differential Equations, bookboon.com | **Yo‘q** (bepul sahifaga ish muhitidan kirib bo‘lmadi) |
| A. A’zam. Differensial tenglamalar. Turon-Iqbol, 2024 | **Yo‘q** |
| V. V. Stepanov. Kurs differensialnyx uravneniy, 11-izd., 2024 | **Yo‘q** |

Izohlar:

- Euler kitobi o‘quv dasturining 2-bandida “Programming Android with Kotlin” (Meike, Dunn) bilan qo‘shilib ketgan. Bu kitob differensial tenglamalarga oid emas, shuning uchun ishlatilmagan.
- Loyihadagi “дифф уравнения.pdf” fayli Stepanov kitobi emas, balki Samoylenko va boshqalarning masalalar to‘plami.

### Qo‘shimcha adabiyotlar (dasturdan)

| Manba | Holat |
|---|---|
| Xasanov A. B. Oddiy differensial tenglamalar nazariyasiga kirish | Yo‘q |
| Zikirov O. S. Matematik fizika tenglamalari | Yo‘q |
| Sabitov K. B. Uravneniya matematicheskoy fiziki | Yo‘q |
| A. F. Filippov. Sbornik zadach po differensialnym uravneniyam | Loyihada |

### Loyihaga yuklangan, kontent tekshirilgan manbalar

- N. Dilmuradov. Oddiy differensial tenglamalar (darslik, 2019).
- N. Dilmuradov. ODTdan misollar, masalalar va topshiriqlar (2020).
- T. G. Ergashev. Differensial tenglamalar (2023).
- Y. P. Oppoqov va boshq. Misol va masalalar to‘plami (2009).
- B. I. Islomov, O. X. Abdullayev. Masalalar to‘plami.
- Q. Boyqo‘ziyev. Differensial tenglamalar.
- A. M. Samoylenko va boshq. Differensialnye uravneniya: primery i zadachi.
- J. D. Logan. A First Course in Differential Equations, 3rd ed. (matn nusxasi).
- S. W. Goode, S. A. Annin. Differential Equations and Linear Algebra, 4th ed. (matn nusxasi).
- W. Kohler, L. Johnson. Elementary Differential Equations with BVP, 2nd ed. (matn nusxasi).
- “Differensial tenglamalar” o‘quv dasturi (MAT203), Cyber University, 2026.

**Mavzu — manba — bob/§ — yaratilgan material** jadvali [SOURCE_MAP.md](SOURCE_MAP.md) faylida. Xuddi shu jadval ilovada ham bor: **Menyu → Manbalar**.

Ilovadagi barcha matnlar, misollar, mashqlar va testlar shu ilova uchun qayta yozilgan. Kitoblardan matn ko‘chirilmagan. Misollar standart turdagi masalalar bo‘lib, yechimlari mustaqil hisoblangan va tekshirilgan (QA_REPORT.md ga qarang).

## Dasturiy komponentlar

| Komponent | Qayerda | Litsenziya |
|---|---|---|
| KaTeX 0.16.11 (JS, CSS, shriftlar) | APK ichida, `web/vendor/katex` | MIT; shriftlar SIL OFL 1.1 |
| Matn shriftlari | APK'da yo‘q, qurilmaning tizim shriftlari (Roboto/Noto) ishlatiladi | — |
| espeak-ng | Faqat video ovozini yaratishda (build vaqtida). APK'da yo‘q | GPL-3.0 |
| ffmpeg (libx264, aac) | Faqat build vaqtida. APK'da yo‘q | LGPL/GPL |
| Playwright + Chromium | Faqat build va test vaqtida | Apache-2.0 / BSD |
| @anthropic-ai/sdk | `backend/` (server), APK'da yo‘q | MIT |
| Android qobig‘i, veb-ilova, kontent | Shu loyiha uchun yozilgan | Litsenziyani muallif belgilaydi |

Video darslardagi ovoz espeak-ng'ning standart sintetik ovozi. U hech qanday real odamning ovoziga taqlid qilmaydi va ilovada “sintetik ovoz” deb belgilangan.

Python namunalarining natijalari va grafiklari (`web/img/py/`) `tools/py/*.py` skriptlarini ishga tushirib olingan (numpy, scipy, matplotlib, sympy). Ilovada kodni “ishga tushirish” tugmasi yo‘q: namunalarning tayyor natijasi ko‘rsatiladi.
