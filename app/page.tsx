import Link from 'next/link';
import CommandGenerator from '@/components/CommandGenerator';

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-5xl font-semibold tracking-tighter mb-4">
          scribd-dl-personal
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
          Pendamping web untuk tool CLI pribadi yang kuat.<br />
          Hasilkan perintah dan konfigurasi optimal dalam hitungan detik.
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          Semua proses download tetap berjalan di komputer kamu menggunakan profil Chrome.
        </p>
      </div>

      {/* Main Feature: Command Generator */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-medium tracking-wider mb-3">
            PENGALAMAN WEBSITE + KEKUATAN CLI
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Generator Perintah &amp; Konfigurasi</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-md mx-auto">
            Isi informasi di bawah. Website akan menghasilkan perintah Terminal + potongan konfigurasi yang optimal untuk kamu.
          </p>
        </div>
        <CommandGenerator />
      </div>

      {/* Quick Links */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 py-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row gap-4 justify-center text-sm">
          <Link href="/docs/mulai-cepat" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white underline underline-offset-4">
            Panduan Mulai Cepat
          </Link>
          <Link href="/docs" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white underline underline-offset-4">
            Lihat Semua Dokumentasi
          </Link>
          <a href="https://github.com/Scyrptoeth/scribd-dl-personal-docs" target="_blank" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white underline underline-offset-4">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
