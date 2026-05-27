'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          Unduh Dokumen
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <Link href="/docs" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
            Panduan
          </Link>
          <a 
            href="https://github.com/Scyrptoeth/scribd-dl-personal-docs" 
            target="_blank"
            className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
