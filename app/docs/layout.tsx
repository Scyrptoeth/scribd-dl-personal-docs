'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/docs', label: 'Ringkasan' },
  { href: '/docs/mulai-cepat', label: 'Mulai Cepat' },
  { href: '/docs/instalasi', label: 'Instalasi' },
  { href: '/docs/penggunaan', label: 'Penggunaan' },
  { href: '/docs/konfigurasi', label: 'Konfigurasi' },
  { href: '/docs/strategi-loading', label: 'Strategi Loading' },
  { href: '/docs/troubleshooting', label: 'Troubleshooting' },
  { href: '/docs/catatan-legal', label: 'Catatan Legal' },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex-shrink-0 hidden md:block">
        <div className="sticky top-0 p-6">
          <div className="mb-8">
            <Link href="/docs" className="font-semibold text-xl tracking-tight">
              Panduan Unduh Dokumen
            </Link>
            <p className="text-xs text-zinc-500 mt-1">Untuk keperluan pribadi</p>
          </div>

          <nav className="space-y-1 text-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors ${isActive ? 'bg-zinc-100 dark:bg-zinc-900 font-medium text-zinc-900 dark:text-white' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
            Tool pribadi untuk<br />penggunaan non-komersial
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <header className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between md:hidden">
          <Link href="/docs" className="font-semibold">scribd-dl-personal</Link>
        </header>
        
        <div className="max-w-3xl mx-auto px-6 py-10 md:py-14 docs-content">
          {children}
        </div>
      </main>
    </div>
  );
}
