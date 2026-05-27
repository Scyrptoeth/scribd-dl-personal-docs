# Scribd DL Core — Architecture Design (Fase 0)

**Status**: DRAFT — Fase 0 Output  
**Tanggal**: 2026  
**Tujuan**: Merancang shared TypeScript core library yang akan menjadi fondasi tunggal untuk `scribd-dl-personal` (CLI) dan `scribd-dl-desktop` (Electron), dengan cakupan penuh Scribd + Slideshare + Everand.

**Prinsip Keputusan Utama (Sudah Disepakati)**:
- Pilihan B untuk pengalaman pengguna: User **tidak pernah** melihat Terminal, config, atau companion app.
- Opsi B untuk ekstraksi: Ekstrak logic bersama sejak awal (bukan duplikasi).
- Full coverage sejak awal: Core harus support Scribd, Slideshare, dan Everand.
- Teknologi: TypeScript + build step (future-proof).
- Struktur: Monorepo ringan di dalam `/tools/` menggunakan pnpm workspace.

---

## 1. Latar Belakang & Masalah Saat Ini

### 1.1 Situasi Saat Ini

Proyek Scribd Downloader saat ini terdiri dari tiga komponen yang berkembang secara independen:

| Komponen                  | Lokasi                          | Bahasa     | Puppeteer | Status Core Logic                  | Masalah Utama |
|---------------------------|----------------------------------|------------|-----------|------------------------------------|-------------|
| `scribd-dl-personal`      | `tools/scribd-dl-personal/`     | ESM (JS)   | ^19.11.1  | Paling matang                      | CLI-only |
| `scribd-dl-desktop`       | `tools/scribd-dl-desktop/`      | CJS       | ^22.0.0   | Duplikasi parsial + implementasi lemah | Naive `page.pdf()` |
| `scribd-dl-personal-docs` | `tools/scribd-dl-personal-docs/`| TS (Next) | -         | Hanya UI                           | Sudah dibersihkan (CommandGenerator dihapus dari alur utama) |

### 1.2 Duplikasi yang Sudah Terjadi

Analisis menunjukkan duplikasi signifikan di `scribd-dl-desktop/src/utils/`:

- `RobustPageLoader` + 4 strategi (Standard, Aggressive, Fast, Recovery)
- `ErrorClassifier` + `DownloadError`
- `PdfGenerator`, `DirectoryIo`, `LoadingConfig`, `PuppeteerSg` (versi terpisah)
- Logger

Versi di desktop dan personal **tidak sinkron** (berbeda Puppeteer version, implementasi detail, dan maturity).

### 1.3 Masalah Fundamental

1. **Maintenance Nightmare**: Setiap perbaikan loading strategy atau error handling harus dilakukan di dua tempat.
2. **Inconsistent Quality**: Desktop saat ini menghasilkan PDF yang jauh lebih buruk daripada CLI karena tidak menggunakan logic extraction yang matang.
3. **Melanggar Visi B**: Selama core tidak bersatu, mustahil memberikan pengalaman "klik URL di website → file bagus muncul di Desktop" tanpa user melihat kerumitan.
4. **Technical Debt yang Semakin Mahal**: Perbedaan Puppeteer version (19 vs 22) dan module system (ESM vs CJS) akan semakin sulit diatasi jika dibiarkan.

---

## 2. Tujuan Arsitektur

### 2.1 Tujuan Utama

Membangun satu **Core Library** yang menjadi satu-satunya sumber kebenaran untuk semua logika ekstraksi dokumen, sehingga:

- Desktop Companion bisa menghasilkan output berkualitas tinggi yang setara (atau lebih baik) dari CLI.
- Kedua aplikasi (CLI + Electron) bisa berevolusi secara independen di lapisan adapter.
- Menambahkan platform baru atau perbaikan besar hanya dilakukan di satu tempat.

### 2.2 Non-Goals (Bukan Tujuan)

- Membuat UI baru di fase ini.
- Mengubah pengalaman pengguna akhir (itu adalah konsekuensi, bukan tujuan fase ini).
- Membuat monorepo yang sangat kompleks (tetap ringan).

---

## 3. Scope Sharing

### 3.1 Yang Harus Masuk ke Core (Shared)

- **Error System**: `DownloadError`, `DownloadErrorCategory`, `ErrorClassifier`
- **Loading Infrastructure**: `LoadingStrategy` base + 4 strategi + `RobustPageLoader`
- **PDF Generation**: `PdfGenerator` (image → PDF + merge)
- **IO Utilities**: `DirectoryIo`, `Image` object
- **Request Layer** (dengan hati-hati): `PuppeteerSg` atau versi yang lebih bersih
- **Domain Services**:
  - Scribd extraction logic (`processPage`, embeds trick, multi-size handling, grouping)
  - Slideshare extraction logic (image scraping + sharp conversion)
  - Everand extraction logic (audio/podcast handling)

### 3.2 Yang **Tidak** Masuk ke Core (Tetap di Adapter)

- Config loading dari `config.ini` (CLI-specific)
- Progress bar CLI (`cli-progress`)
- Console logging & diagnosis string formatting untuk terminal
- WebSocket communication layer (desktop-specific)
- Entry point (`run.js`, `main.js`)
- Semua regex const (bisa di-expose, tapi mungkin lebih baik di level service)

---

## 4. Tantangan Teknis Utama

### 4.1 Module System (ESM vs CJS)

- Personal: `"type": "module"`
- Desktop: CommonJS + Electron
- Solusi yang diusulkan: Gunakan **tsup** untuk menghasilkan dual output (CJS + ESM) + proper `exports` map di package.json.

### 4.2 PuppeteerSg sebagai Singleton yang Berat

`PuppeteerSg` saat ini adalah singleton yang menggabungkan:
- Browser lifecycle
- Profile detection
- RobustPageLoader
- Helper injection (`window.__helpers__`)
- `getPage()` + `generatePDF()`

Ini adalah bagian tersulit untuk di-share karena stateful dan memiliki asumsi single-process.

**Pertanyaan Desain Penting**:
- Apakah kita pertahankan pola singleton di core, atau kita ubah menjadi lebih functional/injectable?
- Bagaimana helper injection (`window.__helpers__`) harus ditangani agar bisa dipakai oleh ketiga downloader?

### 4.3 Perbedaan Ekstraksi yang Cukup Besar

- **Scribd**: DOM-heavy, multi-page dengan ukuran berbeda, perlu pembersihan elemen agresif.
- **Slideshare**: Image scraping + konversi format (sharp + axios).
- **Everand**: Audio-focused, sangat berbeda.

Core harus bisa mengekspos interface yang cukup abstrak (`DocumentExtractor` atau `PlatformAdapter`) tanpa memaksa semua platform mengikuti pola yang sama.

### 4.4 Dependency Eksternal

Core akan membawa dependency berat:
- `puppeteer`
- `pdf-lib`
- `sharp` (untuk Slideshare)
- `axios` (untuk Slideshare)

Perlu diputuskan apakah ini peerDependencies atau regular dependencies di core package.

---

## 5. Usulan Struktur Monorepo (pnpm Workspace)

```
tools/
├── pnpm-workspace.yaml
├── package.json                 # root (hanya untuk workspace management)
├── scribd-dl-personal/          # existing (nanti akan consume core)
├── scribd-dl-desktop/           # existing (nanti akan consume core)
├── scribd-dl-personal-docs/     # existing
└── packages/
    └── core/                    # NEW — TypeScript core library
        ├── src/
        │   ├── error/
        │   ├── loading/
        │   ├── request/
        │   ├── io/
        │   ├── platforms/
        │   │   ├── scribd/
        │   │   ├── slideshare/
        │   │   └── everand/
        │   └── index.ts
        ├── tsup.config.ts
        ├── package.json
        └── tsconfig.json
```

**Nama Package yang Diusulkan**: `@scribd-dl/core`

---

## 6. Strategi Porting ke TypeScript

### Rekomendasi Pendekatan

1. **Jangan port semua sekaligus**. Mulai dari lapisan paling bawah dan paling stabil.
2. **Tetap pertahankan implementasi JavaScript lama** di kedua aplikasi selama proses migrasi (strangler fig pattern).
3. Setiap modul yang sudah di-port ke core langsung digunakan oleh aplikasi yang sudah siap.

**Urutan Porting yang Disarankan (dari bawah ke atas)**:

1. `DownloadError` + `ErrorClassifier`
2. `Image` + `DirectoryIo` + `PdfGenerator`
3. Loading Strategy base + 4 strategi + `RobustPageLoader`
4. `PuppeteerSg` (atau refactored version)
5. Platform-specific extractors (Scribd → Slideshare → Everand)

---

## 7. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| PuppeteerSg terlalu stateful & sulit dipecah | Fase 3 menjadi sangat panjang | Lakukan analisis mendalam di Fase 0 lanjutan sebelum mulai port |
| Helper injection (`window.__helpers__`) bocor ke public API | Coupling tinggi | Buat abstraction yang lebih bersih untuk DOM helpers |
| sharp + axios hanya dipakai Slideshare | Bloat core package | Pertimbangkan optional dependencies atau separate subpath export |
| Selama migrasi, dua versi logic hidup berdampingan | Kebingungan developer | Dokumentasi yang sangat ketat + branch protection |
| Durasi proyek terlalu lama | Kehilangan momentum | Milestone kecil yang deliverable setiap 1-2 sesi |

---

## 8. Success Criteria Fase 0 (Dokumen Ini)

Fase 0 dianggap selesai jika:

- [ ] Semua modul yang akan di-share sudah teridentifikasi dengan jelas.
- [ ] Batas antara Core vs Adapter sudah terdefinisi.
- [ ] Struktur monorepo + package naming disetujui.
- [ ] Tantangan teknis utama (khususnya PuppeteerSg) sudah dianalisis dan ada proposed approach.
- [ ] Ada urutan porting yang disepakati.
- [ ] Risiko utama sudah didokumentasikan.

---

## 9. Langkah Selanjutnya (Setelah Fase 0)

1. Review dan persetujuan dokumen ini.
2. Buat struktur folder `packages/core` kosong + setup pnpm workspace dasar (masih tanpa kode logic).
3. Mulai Fase 1: Infrastructure + pertama modul (Error system).

---

**Versi Dokumen**: 0.1 (Fase 0 — Initial Draft)  
**Penulis**: Codex (berdasarkan analisis langsung terhadap kode)  
**Status**: Menunggu review & keputusan user sebelum melanjutkan ke implementasi struktur.