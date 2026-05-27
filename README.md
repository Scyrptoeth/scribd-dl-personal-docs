# scribd-dl-personal — Dokumentasi

Website dokumentasi untuk **scribd-dl-personal**, tool pribadi yang tangguh untuk mengunduh dokumen dari Scribd dan Slideshare menggunakan profil Chrome lokal.

## Fitur Dokumentasi

- Panduan lengkap penggunaan tool CLI
- Penjelasan sistem Multi-Strategy Loading (Standard, Aggressive, Recovery)
- Konfigurasi fleksibel
- Troubleshooting yang jelas (termasuk `PROFILE_LOCKED`)
- Catatan legal dan etika penggunaan

## Development

```bash
npm install
npm run dev
```

## Deployment ke Vercel (Recommended)

1. Push repository ini ke GitHub.
2. Buka [Vercel](https://vercel.com).
3. Import repository.
4. Deployment otomatis (Next.js).

## Teknologi

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Recent Improvements (Desktop App Backend)

The extraction engine (used by the desktop companion) has received major upgrades:
- Switched to high-quality screenshot-per-page strategy
- Significantly better page discovery with repeated scrolling
- Much stronger ad removal (text + density + selector based)
- Goal: output quality much closer to clean manual exports

These changes are in the shared core and will be available in future desktop app builds.

## Catatan

Website ini hanya berisi dokumentasi. Tool utama (`scribd-dl-personal`) tetap berjalan secara lokal di mesin Anda.

---

**Untuk penggunaan pribadi dan non-komersial.**
