# Differensial tenglamalar: interaktiv elektron darslik (MAT203)

Bu Android ilova Cyber University'ning “Differensial tenglamalar” fani (MAT203) uchun yozilgan.

- Fan 4-semestrda o‘qitiladi: 5 kredit, 150 soat.
- Yo‘nalishlar: Kompyuter injiniringi, Dasturiy injiniring, Kiberxavfsizlik injiniringi.

## Papkalar

| Papka | Tarkibi |
|---|---|
| `web/` | Oflayn veb-ilova (HTML, CSS, JS) |
| `web/content/` | Kontent bazasi: 15 mavzu va Laplas moduli (`t01.js` … `t15.js`, `tL.js`), video ssenariylari (`video/`) |
| `web/js/data/` | Glossariy, formulalar, diagnostika, usul tanlash, mustaqil ishlar, Python namunalari, geometriya, o‘quv dasturi |
| `web/js/labs/` | 12 ta laboratoriya |
| `android/` | Java WebView qobig‘i va `build.sh` |
| `backend/` | AI yordamchi serveri (Node.js). Kalit `.env` da saqlanadi, repozitoriyga qo‘shilmaydi |
| `tools/` | Validator, QA skriptlari, video generatori, Python namunalari |
| `docs/` | Yig‘ish qo‘llanmasi, QA hisoboti, manbalar va litsenziyalar, holat |

## Hujjatlar

- [docs/BUILD.md](docs/BUILD.md): APK, video va AI serverni yig‘ish va ishga tushirish.
- [docs/STATUS.md](docs/STATUS.md): nima tayyor, nima tashqi xizmatga bog‘liq, nima qilinmagan.
- [docs/QA_REPORT.md](docs/QA_REPORT.md): matematik va texnik tekshiruvlar.
- [docs/SOURCES_LICENSES.md](docs/SOURCES_LICENSES.md): manbalar va litsenziyalar.
- [docs/SOURCE_MAP.md](docs/SOURCE_MAP.md): mavzu — manba — bob/§ — yaratilgan material.

## Repozitoriyda yo‘q fayllar

Katta binar fayllar Git'ga qo‘shilmaydi (`.gitignore`). Ular loyiha papkasida, `dt-ilova/` ichida turadi va kerak bo‘lsa qayta yig‘iladi:

| Fayl | Qayerda | Qanday qayta yig‘iladi |
|---|---|---|
| Test APK (`differensial-tenglamalar-1.0.1-test.apk`) | `dt-ilova/` | `android/build.sh` → `dist/` ([BUILD.md](docs/BUILD.md#2-test-apk)) |
| Video paketlar (`tNN-<til>-<sifat>.zip`, 96 ta) va `manifest.json` | `dt-ilova/video/` | `tools/video/build.py`, `tools/video/zip_packs.py` |
| Kontent eksporti (`content-1.0.0.json`) | `dt-ilova/` | `web/content/` dan olinadi |

`web/video/` dagi 1-mavzuning 480p MP4 fayllari repozitoriyda bor, chunki ular APK ichiga qo‘shiladi.

## Bir nechta AI yoki odam bilan ishlash

- Har bir vazifa alohida branch'da qilinadi va `main` ga pull request orqali qo‘shiladi. `main` ga to‘g‘ridan-to‘g‘ri push qilinmaydi.
- O‘zgarishdan oldin `git pull`, PR ochishdan oldin `node tools/validate.js` (va kerak bo‘lsa [BUILD.md](docs/BUILD.md#4-brauzerda-sinash-apksiz) dagi boshqa tekshiruvlar) ishga tushiriladi.
- API kalitlar faqat `backend/.env` da turadi va hech qachon commit qilinmaydi.
- Qilingan ish va ochiq masalalar [docs/STATUS.md](docs/STATUS.md) da yangilab boriladi.

Muallif va egasi: Rajabov Eldor Odilbekovich.
