# Yig‘ish va ishga tushirish qo‘llanmasi

Ilova ikki qismdan iborat:

- **Android qobig‘i** (`android/`): Java WebView, taxminan 600 qator kod.
- **Oflayn veb-ilova** (`web/`): darslar, testlar, laboratoriyalar va videopleyer. U APK ichida `assets/web` sifatida joylashadi.

Ilova uchun Gradle shart emas. `android/build.sh` APK'ni Android buyruq qatori vositalari bilan yig‘adi. Bu usul shu ish muhitida haqiqatan sinab ko‘rilgan.

## 1. Talablar (Ubuntu/Debian)

```bash
sudo apt install android-sdk-platform-23 aapt2 dalvik-exchange zipalign apksigner openjdk-17-jdk zip
```

- Android Studio bilan ishlasangiz ham bo‘ladi. Buning uchun `android/` dagi manifest, `res/` va `src/` fayllarini oddiy Gradle loyihasiga ko‘chiring, keyin `web/` ni `app/src/main/assets/web` ga joylang. Bu yo‘l sinab ko‘rilmagan.
- Kod API 23 sarlavhalariga qarab kompilyatsiya qilinadi. `minSdk` 24 (Android 7.0), `targetSdk` 34.

## 2. Test APK

```bash
android/build.sh
# natija: dist/differensial-tenglamalar-1.0.1-test.apk
```

- Birinchi ishga tushirishda `~/.dt-test-key/` papkasida **test kaliti** yaratiladi. Bu papka repozitoriydan tashqarida turadi.
- Test kaliti bilan imzolangan APK'ni telefonga o‘rnatish mumkin. Lekin uni Google Play'ga yuklab bo‘lmaydi va keyingi yangilanishlar ham shu kalit bilan imzolanishi kerak.

## 3. Reliz APK (o‘z kalitingiz bilan)

```bash
keytool -genkeypair -keystore ~/keys/dt-release.jks -alias dt -keyalg RSA -keysize 3072 -validity 10000
KEYSTORE=~/keys/dt-release.jks KEY_ALIAS=dt KEYSTORE_PASS='...' KEY_PASS='...' android/build.sh release
```

- Kalit faylini va parolni **hech qachon** repozitoriyga qo‘shmang.
- Kalitni yo‘qotsangiz, ilovani yangilab bo‘lmaydi. Shuning uchun zaxira nusxasini xavfsiz joyda saqlang.
- Versiyani oshirish uchun `android/AndroidManifest.xml` dagi `versionCode` va `versionName` ni o‘zgartiring.
- Google Play AAB formatini talab qiladi. Buning uchun Android Studio/Gradle kerak bo‘ladi, chunki bu skript faqat APK yig‘adi.

## 4. Brauzerda sinash (APK'siz)

```bash
cd web && python3 -m http.server 8765
# http://localhost:8765/index.html
```

Avtomatik tekshiruvlar (Playwright + Chromium):

```bash
node tools/validate.js web/content/t*.js        # kontent: sxema, 3 til, KaTeX, javoblarni o‘z-o‘zidan tekshirish
node tools/qa.js 390x844 uz light md            # 186 ekran: JS xatolari, gorizontal toshib chiqish, KaTeX xatolari, bo‘sh ekranlar
node tools/source-map.js                        # docs/SOURCE_MAP.md ni qayta yaratadi
```

## 5. Video darslar

Video darslar quyidagi buyruq bilan yaratiladi:

```bash
apt install espeak-ng ffmpeg       # + Playwright Chromium
python3 tools/video/build.py --topics t01,t02 --bundle t01 --out dist/video --quals 480,720
```

Jarayon bosqichlari:

1. **Ssenariy.** `web/content/video/tNN.js` dagi ssenariy uch tilda yozilgan.
2. **Ovoz.** Ovozni espeak-ng yaratadi. Bu **sintetik ovoz** bo‘lib, hech kimning ovoziga taqlid qilmaydi.
3. **Slaydlar.** `web/slide.html` slaydlarni Chromium'da 1280×720 o‘lchamda chizadi.
4. **Video.** ffmpeg slaydlar va ovozdan 720p va 480p MP4 fayllarni yig‘adi.
5. **Matnlar.** Har bir ovoz×subtitr tili jufti uchun VTT subtitrlar va transkriptlar yoziladi.
6. **Manifest.** Paketlar ro‘yxati, o‘lchami va SHA-256 qiymatlari `web/video/index.js` va `dist/video/manifest.json` ga yoziladi.

`--bundle t01` buyrug‘i 1-mavzuning 480p fayllarini APK ichiga qo‘shadi. Qolgan mavzularning paketlari APK'dan tashqarida turadi va ikki yo‘l bilan olinadi:

- **Server orqali.** `dist/video/` dagi barcha fayllarni (tekis, papkasiz) istalgan HTTPS statik hostingga yuklang, keyin ilovada **Sozlamalar → Video server** maydoniga manzilni kiriting. Ilova `<manzil>/<fayl>` ni yuklaydi. Uzilib qolgan yuklash davom ettiriladi (HTTP Range) va har bir fayl SHA-256 bilan tekshiriladi. Shu manzil orqali videoni yuklamasdan ham tomosha qilish mumkin (480p).
- **Zip import.** `python3 tools/video/zip_packs.py` har bir paket uchun alohida zip yaratadi (`dist/video-zips/<paket>.zip`). Zip faylini telefonga ko‘chiring, keyin **Video darslar → Paketni fayldan import qilish** tugmasini bosing. Ilova zip ichidagi fayllar manifestdagi paketga to‘liq mos kelishini (o‘lcham va SHA-256) tekshiradi.

## 6. AI yordamchi serveri (`backend/`)

Xavfsizlik va xarajat bo‘yicha qoidalar:

- API kalit faqat serverda turadi. APK'da kalit yo‘q, va `build.sh` assets ichida kalitga o‘xshash satr topsa, yig‘ishni to‘xtatadi.
- **Joylashtirish va pullik API sizning qaroringiz.** Server hali hech qayerga joylashtirilmagan.

```bash
cd backend
npm install
cp .env.example .env      # ANTHROPIC_API_KEY ni kiriting; .env ni hech qachon commit qilmang
node test.js              # tarmoqsiz testlar
node server.js            # http://localhost:8787/health
```

Ilovani serverga ulash:

1. Serverni HTTPS bilan joylashtiring (masalan, Render, Fly.io, Railway yoki universitet serveri).
2. Ilovada **Sozlamalar → AI server manzili** maydoniga `https://...` manzilini kiriting.

Model va narx:

- Model nomi `AI_MODEL` muhit o‘zgaruvchisi bilan beriladi. Standart qiymat `claude-opus-5-5`.
- Yig‘ish paytidagi ma’lumotnomaga ko‘ra 1 mln token narxi:

  | Model | Kirish | Chiqish |
  |---|---|---|
  | Opus 5.5 | $4 | $20 |
  | Sonnet 5.5 | $2 | $10 |
  | Haiku 5.5 | $0.10 | $0.50 |

- Joylashtirishdan **oldin** model nomini va narxni https://platform.claude.com/docs saytidan qayta tekshiring.
- Xarajatni cheklash uchun `RATE_PER_MIN`, `RATE_PER_DAY` va `DAILY_REQUEST_CAP` dan foydalaning.

Server nimani yuboradi:

- Foydalanuvchining savoli, mashq matni va dars yoki transkript parchasi.
- Ism, email va qurilma ma’lumotlari yuborilmaydi.
- Server suhbat mazmunini logga yozmaydi.
