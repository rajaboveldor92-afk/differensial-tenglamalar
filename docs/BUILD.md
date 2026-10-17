# Yig‘ish va ishga tushirish qo‘llanmasi

Ilova ikki qismdan iborat:

- **Android qobig‘i** (`android/`): Java WebView, taxminan 600 qator kod.
- **Oflayn veb-ilova** (`web/`): darslar, testlar, laboratoriyalar va videopleyer. U APK ichida `assets/web` sifatida joylashadi.

Ilova uchun Gradle shart emas. `android/build.sh` APK'ni Android buyruq qatori vositalari bilan yig‘adi. Android 16 migratsiyasidan so‘ng skript API 36 platformasi, Build Tools 36.0.0 va zamonaviy D8 dex kompilyatoridan foydalanadi.

## 1. Talablar (Ubuntu/Debian/macOS)

JDK 17+ va Android SDK Command-line Tools o‘rnating, so‘ng:

```bash
sdkmanager "platforms;android-36" "build-tools;36.0.0"
```

`ANDROID_SDK_ROOT` yoki `ANDROID_HOME` SDK papkasiga ko‘rsatilgan bo‘lishi kerak. Zarur bo‘lsa:

```bash
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
```

- Android Studio bilan ishlasangiz ham bo‘ladi. Buning uchun `android/` dagi manifest, `res/` va `src/` fayllarini oddiy Gradle loyihasiga ko‘chiring, keyin `web/` ni `app/src/main/assets/web` ga joylang.
- Kod Android 16 / **API 36** sarlavhalariga qarab kompilyatsiya qilinadi. `minSdk` 24 (Android 7.0), `targetSdk` 36.
- Android 16 uchun enforced edge-to-edge insets va predictive back callback Android qobig‘ida qo‘llab-quvvatlanadi. API 24–32 qurilmalarda eski back yo‘li saqlanadi.

> **Google Play uchun muhim:** 2026-yil 31-avgustdan yangi Android ilovalari va ilova yangilanishlari Google Play'ga yuborilishi uchun Android 16 / API 36 yoki undan yuqorini target qilishi kerak. Ushbu loyiha endi `targetSdk 36` bilan yig‘iladi. Play relizi oldidan haqiqiy Android 15/16 telefon yoki emulyatorda UI, klaviatura, back gesture, video fullscreen va fayl import/eksportini sinash tavsiya etiladi. Rasmiy talab: <https://support.google.com/googleplay/android-developer/answer/11926878>.

## 2. Test APK

```bash
android/build.sh
# natija: dist/differensial-tenglamalar-1.0.1-test.apk
```

- Birinchi ishga tushirishda `~/.dt-test-key/` papkasida **test kaliti** yaratiladi. Bu papka repozitoriydan tashqarida turadi.
- Test kaliti bilan imzolangan APK'ni telefonga o‘rnatish mumkin. Lekin uni Google Play'ga yuklab bo‘lmaydi va keyingi lokal yangilanishlar ham shu kalit bilan imzolanishi kerak.
- Skript Android SDK'dagi `aapt2`, `d8`, `zipalign` va `apksigner` vositalarini ishlatadi va yakunda APK imzosini tekshiradi.

## 3. Reliz APK (o‘z kalitingiz bilan)

```bash
keytool -genkeypair -keystore ~/keys/dt-release.jks -alias dt -keyalg RSA -keysize 3072 -validity 10000
KEYSTORE=~/keys/dt-release.jks KEY_ALIAS=dt KEYSTORE_PASS='...' KEY_PASS='...' android/build.sh release
```

- Kalit faylini va parolni **hech qachon** repozitoriyga qo‘shmang.
- Kalitni yo‘qotsangiz, ilovani yangilash qiyinlashadi. Shuning uchun zaxira nusxasini xavfsiz joyda saqlang.
- Versiyani oshirish uchun `android/AndroidManifest.xml` dagi `versionCode` va `versionName` ni o‘zgartiring.
- Ushbu skript **APK** yig‘adi. Google Play relizi uchun **AAB** (`.aab`) paketini Android Studio/Gradle yoki boshqa mos bundle build jarayoni orqali tayyorlash kerak.
- `targetSdk 36` talabi bajarilgan bo‘lsa ham, Play relizi oldidan Data safety, content rating, signing va haqiqiy qurilma testlari alohida tekshiriladi.

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

Pull request va pushlarda `.github/workflows/ci.yml` quyidagilarni avtomatik tekshiradi:

- backend testlari;
- ODE/ifoda hisoblash yadrosi va kontent validatorlari;
- Android API 36 SDK bilan test APK yig‘ilishi;
- APK ichidagi `targetSdkVersion:'36'` va imzo verifikatsiyasi.

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
- **Zip import.** `python3 tools/video/zip_packs.py` har bir paket uchun alohida zip yaratadi (`dist/video-zips/<paket>.zip`). Zip faylini telefonga ko‘chiring, keyin **Video darslar → Paketni fayldan import qilish** tugmasini bosing. Ilova zip ichidagi fayllar manifestdagi paketga to‘liq mos kelishini (nomi, o‘lchami va SHA-256) tekshiradi. Noma’lum/takroriy fayl yoki manifestdan kattaroq fayl rad etiladi.

## 6. AI yordamchi serveri (`backend/`)

Xavfsizlik va xarajat bo‘yicha qoidalar:

- API kalit faqat serverda turadi. APK'da kalit yo‘q, va `build.sh` assets ichida kalitga o‘xshash satr topsa, yig‘ishni to‘xtatadi.
- **Joylashtirish va pullik API sizning qaroringiz.** Server hali hech qayerga joylashtirilmagan.

```bash
cd backend
npm ci
cp .env.example .env      # ANTHROPIC_API_KEY ni kiriting; .env ni hech qachon commit qilmang
node test.js              # tarmoqsiz testlar
node server.js            # backend/.env avtomatik o‘qiladi; http://localhost:8787/health
```

`backend/.env` faqat lokal ishga tushirish uchun avtomatik o‘qiladi. Hostingdagi haqiqiy environment/secrets qiymatlari `.env` dagi qiymatlardan ustun turadi. Reverse proxy ishlatsangiz `TRUST_PROXY=1` ni faqat proxy `X-Forwarded-For` sarlavhasini o‘zi ishonchli qayta yozadigan holatda yoqing; aks holda `0` qoldiring.

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
