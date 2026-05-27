'use client';

import WebDownload from '@/components/WebDownload';

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <WebDownload />
      </div>
    </main>
  );
}
