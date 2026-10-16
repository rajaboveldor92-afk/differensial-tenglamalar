# Holat: nima tayyor, nima tashqi xizmatga bog‘liq, nima qilinmagan

## APK

| | |
|---|---|
| Fayl | `differensial-tenglamalar-1.0.1-test.apk` |
| Versiya | 1.0.1 (versionCode 2) |
| Paket nomi | `uz.cyber.dt` |
| Minimal Android | 7.0 (API 24) |
| targetSdk | 34 (Android 14) |
| Imzo | **TEST kaliti**, APK Signature Scheme v2 + v3. Telefonga o‘rnatish uchun yaraydi, Google Play uchun emas |
| Ruxsatlar | Faqat `INTERNET` (AI server va video yuklash uchun, ikkalasi ixtiyoriy). Shifrlanmagan HTTP o‘chirilgan |
| Sinov | Chromium (Playwright) da 186 ekran × 3 til × 2 mavzu × 4 o‘lcham. **Haqiqiy telefon yoki emulyatorda sinalmagan** (ish muhitida emulyator yo‘q) |

## Tayyor (APK ichida, internetsiz ishlaydi)

**Interfeys va sozlamalar**
- Uch tilli interfeys va kontent (o‘zbek lotin / rus / ingliz). Til almashtirilganda joriy sahifa va pozitsiya saqlanadi.
- Yorug‘/qorong‘i mavzu va 4 xil shrift o‘lchami. Animatsiyani kamaytirish sozlamasi bor.
- Ekran telefon va planshetga moslashadi: telefonda pastki menyu, planshetda yon menyu. Ekranni burish qo‘llab-quvvatlanadi.
- Asosiy menyu: Bosh sahifa, Darslar, Laboratoriya, Mashqlar, Natijalar.
- Qo‘shimcha bo‘limlar: qidiruv, glossariy, manbalar, daftar, sozlamalar, yordam, ilova haqida.
- Bosh sahifada:
  - “Davom ettirish” va oxirgi mavzu;
  - o‘qilgan darslar va bajarilgan tekshiruvlar alohida hisoblanadi;
  - takrorlash tavsiyalari va saqlanganlar;
  - kurs xaritasi.

**O‘quv kontenti**
- 15 mavzu va Laplas almashtirishi qo‘shimcha modul sifatida. Laplas moduli tasdiqlangan auditoriya soatlariga kirmaydi.
- Har bir mavzuda:
  - natijalar, oldingi bilimlar, kirish masalasi;
  - ta’riflar va formulalar, aniq shartlari bilan teoremalar;
  - **5–9 ta ishlangan misol** va qadamma-qadam ochiladigan yechim;
  - **8–13 ta mashq** (oson / o‘rta / qiyin);
  - **10–11 ta izohli test**;
  - tipik xatolar, manbalar va laboratoriyalarga havolalar.
- Mashq turlari: tanlov, moslashtirish, tartiblash, son, formula, xatoni topish, bosqichli.
- O‘rganish rejimi va imtihon rejimi. Imtihon rejimida yechim ko‘rsatilmaydi va AI faqat ishora beradi.
- Javob tekshiruvi:
  - teng kuchli javoblar qabul qilinadi (masalan, $Ce^{2x}$ va $5Ce^{2x}$);
  - tekshirib bo‘lmaydigan javob “noto‘g‘ri” deb belgilanmaydi, balki “tekshirib bo‘lmadi” deb ko‘rsatiladi.

**Laboratoriyalar va interaktiv bo‘limlar**
- 12 ta laboratoriya:
  - har birida slayder va son kiritish maydoni, “qayta tiklash” tugmasi, birliklari bilan o‘qlar;
  - “Nimani kuzatdingiz?” savoli, model, usul va cheklovlar tavsifi;
  - grafikning matnli tavsifi.

  Grafiklar modeldan hisoblanadi (RK4 yoki aniq formula).
- Geometrik talqin bo‘limi: 8 ta interaktiv grafik (yo‘nalish maydoni, vektor maydon, egri chiziqlar oilasi).
- Boshlang‘ich diagnostik test (12 savol).
- “Qaysi usulni tanlayman?” yo‘riqnomasi. Bu yechuvchi emas, savollar daraxti: 20 tugun, 33 natija.
- Formulalar xaritasi (56 formula).
- 18 ta mustaqil ish bo‘yicha yo‘riqnoma.
- 10 ta Python namunasi. Kod va oldindan olingan natija ko‘rsatiladi; “ishga tushirish” tugmasi yo‘q.
- O‘quv dasturi sahifasi: soatlar, natijalar va baholash (25/25/50 faqat ma’lumot sifatida), shuningdek dasturda topilgan 14 ta kamchilik.

**Shaxsiy vositalar va progress**
- Uch tilli glossariy (90 atama), xatcho‘plar, eslatmalar va kuzatuvlar daftari.
- Progress faqat qurilmada saqlanadi, ro‘yxatdan o‘tish talab qilinmaydi.
- Progress bilan ishlash:
  - qo‘shimcha zaxira nusxasi qurilmaning ichki xotirasida;
  - eksport va import (JSON fayl);
  - sxema versiyasi va migratsiya;
  - tozalash.
- O‘zlashtirish qoidasi ilovada ochiq yozilgan. Mavzu testida eng yaxshi natija kamida 75% bo‘lishi va kamida 3 xil mashq to‘g‘ri bajarilishi kerak. Sahifani ochish hisoblanmaydi. Har bir mavzu bir marta hisoblanadi, til qaysi bo‘lishidan qat’i nazar.

**Video darslar**
- Video darslar 15 mavzu va Laplas moduli uchun tayyor: har bir mavzuda 2 qism, ssenariy uch tilda.
- Ovoz sintetik (espeak-ng) va ilovada shunday belgilangan.
- Subtitrlar sinxronlangan: ovozning har bir tili uchun subtitr uchala tilda mavjud.
- Pleyer imkoniyatlari:
  - tezlik 0.5–2× tabiiy ohang bilan, tanlangan tezlik saqlanadi, “1×” tezkor tugmasi bor;
  - ±10 soniya, vaqt chizig‘i, to‘liq ekran;
  - ovoz va subtitr tilini alohida tanlash, boblar;
  - bosilganda shu joyga o‘tadigan transkript;
  - to‘xtagan joydan davom ettirish va faqat audio rejimi.
- APK ichida faqat **1-mavzu (480p)** videosi bor. Boshqa mavzular videosiz ham ochiladi: “slayd + matn” rejimida xuddi shu slaydlar va matn ko‘rsatiladi.
- Oflayn paketlar:
  - har bir mavzu, til va sifat (480p/720p) uchun alohida paket, o‘lchami ko‘rsatiladi;
  - uzilgan yuklash davom ettiriladi va SHA-256 bilan tekshiriladi;
  - paketni o‘chirish progressga ta’sir qilmaydi;
  - zip fayldan import qilish mumkin.

**AI yordamchi**
- Ilova tomoni tayyor: “Tushuntir”, “Ishora ber”, “Yechimimni tekshir”, “Savol ber” rejimlari va videoda “Shu joyni tushuntir”, bu tugma transkript parchasini yuboradi.
- Serverga nima yuborilishi ko‘rsatiladi, AI tarixini o‘chirish mumkin.
- Server sozlanmagan bo‘lsa, ilova buni ochiq aytadi va faqat darsdagi tayyor ishoralarni ko‘rsatadi. Soxta javob berilmaydi.

## Video paketlari

Har bir mavzuda 2 qism bor. O‘lchamlar MB'da berilgan. Har bir paketga videolar, uch tildagi subtitrlar va transkript kiradi. “APK” — paket ilova ichida.

| Mavzu | uz 480p | uz 720p | ru 480p | ru 720p | en 480p | en 720p |
|---|---|---|---|---|---|---|
| 1 | 2.1 (APK) | 2.5 | 1.7 (APK) | 2.1 | 1.7 (APK) | 2.0 |
| 2 | 3.1 | 3.5 | 2.6 | 3.0 | 2.5 | 2.9 |
| 3 | 2.7 | 3.1 | 2.1 | 2.4 | 2.0 | 2.4 |
| 4 | 3.1 | 3.7 | 2.4 | 2.8 | 2.3 | 2.7 |
| 5 | 2.7 | 3.1 | 2.2 | 2.5 | 2.1 | 2.4 |
| 6 | 3.1 | 3.5 | 2.5 | 2.8 | 2.4 | 2.7 |
| 7 | 3.1 | 3.5 | 2.6 | 2.9 | 2.5 | 2.9 |
| 8 | 3.4 | 3.8 | 2.8 | 3.2 | 2.8 | 3.2 |
| 9 | 2.9 | 3.3 | 2.4 | 2.7 | 2.3 | 2.6 |
| 10 | 3.1 | 3.5 | 2.6 | 2.9 | 2.5 | 2.9 |
| 11 | 2.6 | 3.0 | 2.1 | 2.5 | 2.1 | 2.4 |
| 12 | 2.4 | 2.8 | 2.0 | 2.3 | 2.0 | 2.2 |
| 13 | 3.2 | 3.7 | 2.6 | 3.0 | 2.7 | 3.0 |
| 14 | 2.8 | 3.2 | 2.3 | 2.6 | 2.3 | 2.6 |
| 15 | 3.1 | 3.5 | 2.4 | 2.7 | 2.6 | 2.9 |
| Laplas | 2.2 | 2.5 | 2.0 | 2.3 | 1.9 | 2.2 |

Jami: 257 MB (480p: 120 MB, 720p: 137 MB).

## Tashqi xizmatga bog‘liq (kod tayyor, ulash sizning qaroringiz)

| Imkoniyat | Nima kerak | Holat |
|---|---|---|
| AI yordamchi javoblari | `backend/` ni HTTPS serverga joylashtirish va Anthropic API kaliti (pullik) | Server kodi va testlari tayyor. Hech qayerga joylashtirilmagan, kalit yo‘q |
| 2–15-mavzular va Laplas videolarini yuklash yoki tomosha qilish | `dist/video` fayllarini HTTPS hostingga joylash yoki zip orqali import | Fayllar yaratilgan. Hosting yo‘q |
| Google Play | Reliz kaliti, dasturchi akkaunti, AAB | Qilinmagan |

## Qilinmagan yoki cheklangan

- **Asosiy 4 ta kitob ish muhitida bo‘lmagan** (Boyce–DiPrima–Meade, Euler, A’zam, Stepanov).
  - Ularga havolalar “⚠ tekshirilmagan” deb belgilangan, sahifa raqami berilmagan.
  - Kontent loyihaga yuklangan 11 ta boshqa manba asosida yozilgan va tekshirilgan.
- **Tarjimalar mutaxassis tomonidan tekshirilmagan.**
  - Matnlar uch tilda alohida yozilgan, mashina tarjimasi ishlatilmagan.
  - Atamalar glossariy bo‘yicha birxillashtirilgan.
  - Shunday bo‘lsa ham, rus va ingliz matnlarini fan o‘qituvchisi o‘qib chiqishi kerak.
- **Ovoz robotga o‘xshaydi** (espeak-ng). Tabiiy sintetik ovoz uchun pullik TTS xizmati kerak. U ishlatilmagan, chunki ruxsatingiz so‘ralmagan.
- **Haqiqiy qurilmada sinov o‘tkazilmagan.** Sinov Chromium'da o‘tkazilgan, Android WebView'da kichik farqlar bo‘lishi mumkin. Telefonda “Android System WebView” yangilangan bo‘lishi kerak (Play Market orqali, 88-versiya yoki undan yangi). Android 7–9 da u odatda o‘zi yangilanadi.
- Ilovada matematik tenglama yechuvchi yo‘q, va ilova bunday va’da bermaydi.
- Python kodi ilovada ishga tushmaydi, faqat tayyor natija ko‘rsatiladi.
- Planshet uchun alohida maket qilinmagan: o‘sha ilova keng ekranda yon menyu va kengroq ustunlar bilan ochiladi.
