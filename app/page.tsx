import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight mb-4">
          scribd-dl-personal
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10">
          Tool pribadi yang tangguh untuk mengunduh dokumen dari Scribd &amp; Slideshare.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs" 
            className="px-8 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition"
          >
            Buka Dokumentasi
          </Link>
          <a 
            href="https://github.com" 
            target="_blank"
            className="px-8 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900 transition"
          >
            Lihat di GitHub
          </a>
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          Untuk penggunaan pribadi dan non-komersial.
        </p>
      </div>
    </div>
  );
}
