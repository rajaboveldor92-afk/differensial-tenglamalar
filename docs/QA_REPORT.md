# QA hisoboti: matematik va texnik tekshiruvlar

Sana: 2026-10-16. Hamma tekshiruvlar qayta ishga tushiriladi, buyruqlar quyida berilgan.

## 1. Kontent (matematika)

`node tools/validate.js web/content/t*.js` — **0 xato, 6 ogohlantirish.**

Validator har bir mavzu uchun quyidagilarni tekshiradi:

- sxema to‘liqligi: shartli teoremalar, misollarda qadamlar, mashqlarda javob, testlarda izoh;
- har bir matn uch tilda borligi;
- har bir formula KaTeX'da xatosiz chizilishi;
- **javobni o‘z-o‘zidan tekshirish**:
  - har bir mashqning namunaviy javobi ilovaning o‘z tekshiruvchisidan o‘tishi shart;
  - namunaviy javobning buzilgan varianti o‘tmasligi kerak.

Ogohlantirishlar:

- t01: 4 ta joyda tillar orasida formulalar soni farq qiladi. Bu xato emas, chunki bir tilda formula matnga so‘z bilan kiritilgan.
- t07.x8 va t10.x5: buzilgan javob ham qabul qilindi. Tekshirib ko‘rildi: bu buzilgan ifoda ham haqiqatan to‘g‘ri yechim, chunki u ixtiyoriy doimiyga yutiladi. Shuning uchun tekshiruvchi to‘g‘ri ishlagan.

Mavzular bo‘yicha hajm:

| Mavzu | Darslar | Misollar | Mashqlar | Testlar |
|---|---|---|---|---|
| 1 | 3 | 6 | 8 | 10 |
| 2 | 3 | 7 | 11 | 10 |
| 3 | 3 | 6 | 11 | 10 |
| 4 | 4 | 9 | 13 | 10 |
| 5 | 4 | 8 | 9 | 10 |
| 6 | 3 | 5 | 10 | 10 |
| 7 | 3 | 7 | 9 | 10 |
| 8 | 3 | 5 | 11 | 10 |
| 9 | 3 | 6 | 11 | 10 |
| 10 | 3 | 8 | 11 | 10 |
| 11 | 4 | 8 | 11 | 11 |
| 12 | 4 | 9 | 10 | 10 |
| 13 | 4 | 7 | 9 | 10 |
| 14 | 3 | 6 | 9 | 10 |
| 15 | 3 | 7 | 10 | 10 |
| Laplas | 4 | 9 | 11 | 10 |

Talab qilingan minimum: ≥3 misol, ≥5 mashq, ≥8 test. Barcha mavzular bu talabdan o‘tadi.

Qo‘lda va kompyuter algebrasi bilan tekshirilganlar:

- Kontent yozilayotganda misollar va mashqlar javoblari sympy bilan tekshirilgan: yechim tenglamaga qo‘yilib qoldiq 0 chiqishi, boshlang‘ich shartlar va Laplas jadvali tekshirildi. Natija misollardagi “Tekshirish” qatorlarida yozilgan.
- Python namunalari (`tools/py/*.py`) haqiqatan ishga tushirildi. Ilovadagi natija va grafiklar shu ishga tushirishdan olingan.

Matematik aniqlik qoidalari (asl topshiriq ro‘yxati bo‘yicha):

- Teoremalar shartlari bilan berilgan, masalan:
  - mavjudlik va yagonalik teoremasi uchun $f$ va $\partial f/\partial y$ ning uzluksizligi;
  - Vronskiy uchun “yechimlar bo‘lsa” sharti.
- Ajratishda yo‘qolishi mumkin bo‘lgan maxsus yechimlar alohida ko‘rsatilgan.
- Chiziqli tenglamalar Bernullidan oldin keladi.
- Laplas alohida modul sifatida berilgan va auditoriya soatlariga kiritilmagan.
- “Qaysi usulni tanlayman?” bo‘limi hech qayerda yechuvchi deb atalmagan.

## 2. Hisoblash yadrosi (laboratoriyalar)

`node tools/test-ode.js` — **barchasi o‘tdi.**

- Kuzatilgan yaqinlashish tartibi:

  | Usul | Kuzatilgan | Nazariy |
  |---|---|---|
  | Eyler | 0.968 | 1 |
  | Heun | 1.973 | 2 |
  | RK4 | 3.970 | 4 |

- RK4 usuli $y'=-2xy$ uchun $e^{-x^2}$ ni $10^{-8}$ aniqlikda beradi. Ossillyator $2\pi$ dan keyin $10^{-7}$ aniqlikda boshlang‘ich nuqtaga qaytadi.
- Muvozanat nuqtasi turi to‘g‘ri aniqlanadi: markaz, egar, turg‘un tugun, noturg‘un fokus, aynigan tugun va aynigan holat.
- Xarakteristik tenglama ildizlari (haqiqiy, karrali, kompleks) to‘g‘ri hisoblanadi.

## 3. Javob tekshiruvchisi

`node tools/test-expr.js` — **barchasi o‘tdi.**

- Teng kuchli javoblar qabul qilinadi:
  - $C(e^x)^2 = Ce^{2x}$;
  - $y'=2y$ uchun $5Ce^{2x}$;
  - o‘nli vergul;
  - $e$ simvoli.
- Noto‘g‘ri javoblar rad etiladi.
- Tahlil qilib bo‘lmaydigan yoki bo‘sh javob “tekshirib bo‘lmadi” deb ko‘rsatiladi va **noto‘g‘ri deb belgilanmaydi**.

## 4. Interfeys (Chromium, Playwright)

`node tools/qa.js <o‘lcham> <til> <mavzu> <shrift>` buyrug‘i 186 ta ekranni ochadi:

- barcha mavzular va darslar, har bir mashq va test;
- 12 laboratoriya, video sahifalari;
- barcha qo‘shimcha bo‘limlar.

Har bir ekranda JS xatosi, gorizontal toshib chiqish, KaTeX xatosi va bo‘sh ekran tekshiriladi.

| O‘lcham | Til | Mavzu | Shrift | Natija |
|---|---|---|---|---|
| 390×844 (telefon) | uz | yorug‘ | o‘rta | 0 muammo (o‘quv dasturidagi uzun havola tuzatilgandan keyin) |
| 390×844 | ru | qorong‘i | eng katta | 0 muammo |
| 390×844 | en | yorug‘ | o‘rta | 0 muammo |
| 360×640 (kichik telefon) | uz | yorug‘ | eng katta | 0 muammo |
| 768×1024 (planshet, tik) | en | yorug‘ | katta | 0 muammo |
| 1024×768 (planshet, yotiq) | uz | qorong‘i | o‘rta | 0 muammo |

Bundan tashqari, ekran rasmlari ko‘z bilan tekshirildi va topilgan muammolar tuzatildi:

- ro‘yxatda formulalar xom ko‘rinishda chiqishi;
- slayd ustidagi subtitr;
- daraja ko‘rsatkichi (`^{2/3}`);
- katta ikonkalar;
- qidiruv parchalaridagi TeX.

## 5. Android

`android/build.sh` APK'ni yig‘adi va `apksigner verify` uni tekshiradi: v2 va v3 imzolar **to‘g‘ri**.

`build.sh` assets ichida API kalitga o‘xshash satr topsa, yig‘ishni to‘xtatadi. Bu tekshiruv o‘tdi.

**Sinalmagan:**

- haqiqiy qurilma yoki emulyatorda ishga tushirish;
- quyidagi native funksiyalar:
  - fayl tanlash (eksport/import);
  - paketlarni yuklash;
  - to‘liq ekran;
  - “orqaga” tugmasi;
  - holat zaxirasi.

Bu kod Android API hujjatlariga muvofiq yozilgan, lekin uni telefonda sinab ko‘rish kerak.

Telefonda tekshirish ro‘yxati:

1. O‘rnatish va internetsiz ochilishi.
2. Til almashtirish.
3. Mashq yechish: ilovani yopib ochganda progress saqlanishi.
4. 1-mavzu videosi: tezlik, subtitr, to‘liq ekran, ekranni burish.
5. Progressni eksport va import qilish.
6. “Orqaga” tugmasi.

## 6. AI server

`cd backend && node test.js` tarmoqsiz o‘tadi. Testlar quyidagilarni tekshiradi:

- `/health` kalit yo‘qligini ko‘rsatadi;
- kalit bo‘lmaganda `/api/ai` 503 qaytaradi;
- xabarlar tuzilishi to‘g‘ri va javob tili so‘ralgan tilda;
- noma’lum manzil 404 qaytaradi.

Tezlik chegarasi va imtihon rejimidagi cheklov kodda bor, lekin alohida test bilan qoplanmagan.

Haqiqiy model bilan **sinalmagan**, chunki API kalit yo‘q va pullik chaqiruvga ruxsat so‘ralmagan.

## 7. Video

Video darslar quyidagi tartibda yaratiladi:

1. Har bir subtitr gapi alohida sintez qilinadi. Keyin gaplar birlashtiriladi va har bir gapdan keyin kamida 0,3 s pauza qoldiriladi.
2. Subtitr vaqtlari shu gaplarning haqiqiy uzunligidan olinadi, ya’ni taxmin emas. Ilova va build skripti bitta algoritmdan foydalanadi.
3. Paket fayllarining SHA-256 qiymatlari manifestga yoziladi.

### Ovoz va subtitr mosligi (1.0.1 versiyada qayta tekshirildi)

1.0.0 versiyada ikki xato topildi va tuzatildi:

- **Ruscha ovoz o‘zgarib qolgan.** Ruscha matndagi lotin harflari (x, y, C, dx, Ox, mualliflar ismlari) uchrashi bilan sintezator ingliz ovoziga o‘tib ketgan, masalan “y” ni “uay” deb o‘qigan. Bu 270 segmentdan 131 tasida bo‘lgan. O‘zbekcha matnda esa x va y “xa” va “ye” deb o‘qilgan.

  Endi ovozga harflarning matematik nomlari beriladi: ruscha “икс, игрек, цэ…”, o‘zbekcha “iks, igrek, se…”. Ekrandagi subtitr va slaydlar o‘zgarmagan.
- **Subtitr ovozdan siljigan.** Segment ichidagi subtitr qatorlari matn uzunligiga qarab taqsimlangan edi, shuning uchun ovozdan 1,5 s gacha farq qilgan.

Tekshiruv natijalari:

| Tekshiruv | Natija |
|---|---|
| `tools/video/build.py` ovozga beradigan matnni espeak-ng fonemalari bilan tekshirish (810 segment × til) | Boshqa tilga o‘tish: **0** |
| Ovoz tilidagi subtitrlar: har bir qator boshi ovozdagi pauzaga to‘g‘ri kelishi (`silencedetect`, 2 944 qator) | Hammasi pauzada, eng katta chetlanish **0,00 s** |
| Ilova hisoblaydigan subtitrlar va VTT fayllar (`node tools/test-cues.js`, 288 fayl) | Farq: **0** |
| 192 ta MP4: video va audio uzunligi vaqt chizig‘iga mos kelishi | Eng katta farq **0,20 s** |
| Slayd almashinuvi | Segment boshlanish vaqtlariga to‘liq mos, ular ham shu vaqtlardan quriladi |

Boshqa tildagi subtitr (masalan, ruscha ovoz va o‘zbekcha subtitr) har bir segmentda ovoz bilan bir vaqtda boshlanadi va tugaydi. Segment ichida esa qatorlar matn uzunligiga qarab taqsimlanadi, chunki tarjima gaplari ovozdagi gaplarga birma-bir mos kelmaydi.

Ovozni nutqni aniqlash dasturi bilan tekshirib bo‘lmadi: ish muhitida bunday modellar yo‘q va ularni yuklab olishga tarmoq ruxsat bermadi. Talaffuz sifatini quloq bilan tekshirib ko‘rish kerak.

Pleyer brauzerda 1-mavzu videosi bilan sinaldi:

- Transkript qatoriga bosilganda video shu segmentga o‘tadi (3-segment, 62.7 s).
- Tezlik 0.5–2× ishlaydi, `preservesPitch` yoqilgan. Tanlangan tezlik qayta ochilganda saqlanadi, “1×” tugmasi ishlaydi.
- Ilova tili o‘zgartirilganda ovoz ruscha faylga o‘tadi va o‘sha segmentning o‘sha qismidan davom etadi.
- Qayta ochilganda to‘xtagan joydan boshlanadi.
- Video ochilmasa, pleyer “slayd + matn” rejimiga o‘tadi va buni ochiq aytadi.

Bu sinovda bitta cheklov bor. Playwright'ning Chromium'i H.264 formatini ochmaydi, shuning uchun sinov uchun video vaqtincha WebM formatiga o‘tkazildi. Android WebView H.264 formatini qo‘llab-quvvatlaydi, lekin buni telefonda tekshirish kerak.
