'use client';

import { useState, useEffect, useCallback } from 'react';

export default function WebDownload() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const connectToLocalApp = useCallback(() => {
    try {
      if (ws) ws.close();

      const socket = new WebSocket('ws://localhost:3456');

      socket.onopen = () => {
        setIsConnected(true);
        setWs(socket);
        setStatus('');
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'status') {
            setStatus(data.message);
            setIsSuccess(false);
          }

          if (data.type === 'success') {
            setIsSuccess(true);
            setFileName(data.fileName || 'dokumen');
            setStatus('');
            setUrl('');
          }

          if (data.type === 'error') {
            setStatus(data.message || 'Terjadi kendala saat memproses.');
            setIsSuccess(false);
          }
        } catch {
          setStatus('Menerima pembaruan...');
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        setWs(null);
        setIsSuccess(false);
        setStatus('');
      };

      socket.onerror = () => {
        setIsConnected(false);
        setWs(null);
      };
    } catch {
      setIsConnected(false);
      setWs(null);
    }
  }, [ws]);

  // Auto-connect when component mounts
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    connectToLocalApp();

    const interval = setInterval(() => {
      if (!isConnected) {
        connectToLocalApp();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [connectToLocalApp, isConnected]);

  const handleDownload = () => {
    if (!url.trim()) return;

    if (isConnected && ws) {
      // Ideal path: desktop app is running locally
      setStatus('Memproses...');
      setIsSuccess(false);
      ws.send(JSON.stringify({
        type: 'download',
        url: url.trim()
      }));
    } else {
      // On public site (no local desktop) → show beautiful, non-technical guidance
      setShowSetupGuide(true);
    }
  };

  const handleCloseGuide = () => {
    setShowSetupGuide(false);
  };

  const handleStartOver = () => {
    setUrl('');
    setStatus('');
    setIsSuccess(false);
    setFileName('');
  };

  // Success state - calm and satisfying
  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight mb-2">Selesai</h2>
        <p className="text-lg text-zinc-600 mb-1">
          {fileName} sudah tersimpan di Desktop kamu.
        </p>
        <p className="text-sm text-zinc-500 mb-8">
          Proses selesai tanpa perlu membuka program lain.
        </p>

        <button
          onClick={handleStartOver}
          className="w-full py-4 text-lg font-medium bg-black text-white rounded-2xl hover:bg-zinc-800 active:scale-[0.985] transition"
        >
          Unduh dokumen lain
        </button>
      </div>
    );
  }

  // Setup guide view - honest guidance for beginners
  if (showSetupGuide) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-3">
            Link Sudah Siap
          </h1>
          <p className="text-lg text-zinc-600">
            Saat ini cara paling mudah dan andal untuk Anda adalah menggunakan versi yang sudah matang.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6">
            <div className="mb-2 text-sm font-medium text-amber-600 dark:text-amber-400">UNTUK PENGGUNA AWAM (SAAT INI)</div>
            <h2 className="text-2xl font-semibold tracking-tight">Gunakan cara yang paling sederhana dulu</h2>
          </div>

          <div className="space-y-5 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            <p>
              Aplikasi desktop yang super mudah (tanpa Terminal) masih dalam tahap penyelesaian.
            </p>
            <p>
              Untuk saat ini, cara paling andal dan sudah terbukti bagus adalah menggunakan versi CLI yang ada di komputer Anda.
            </p>

            <div className="rounded-2xl bg-zinc-100 p-5 text-sm dark:bg-zinc-800">
              <div className="mb-2 font-medium text-zinc-900 dark:text-white">Langkah yang bisa Anda lakukan sekarang:</div>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Buka Terminal (tekan Command + Spasi, ketik &quot;Terminal&quot;)</li>
                <li>Ketik perintah berikut lalu tekan Enter:</li>
              </ol>
              <div className="mt-3 rounded-xl bg-white p-3 font-mono text-xs dark:bg-zinc-900">
                cd ~/tools/scribd-dl-personal<br />
                npm start &quot;https://www.scribd.com/document/403044248/PT-Edelweiss-docx&quot;
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={handleCloseGuide}
              className="block w-full rounded-2xl border border-zinc-300 py-4 text-lg font-medium text-zinc-700 hover:bg-zinc-50 active:scale-[0.985] transition dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Kembali ke halaman utama
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-400">
            Setelah selesai, file akan tersimpan di Desktop Anda.
          </p>
        </div>
      </div>
    );
  }

  // Main flow (input always usable)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-3">
          Unduh Dokumen
        </h1>
        <p className="text-lg text-zinc-600">
          Tempel link dokumen yang ingin kamu simpan
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.scribd.com/..."
          className="w-full px-5 py-4 text-lg border border-zinc-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-zinc-400 transition"
        />

        <button
          onClick={handleDownload}
          disabled={!url.trim()}
          className="w-full py-4 text-lg font-medium bg-black text-white rounded-2xl disabled:bg-zinc-200 disabled:text-zinc-400 hover:bg-zinc-800 active:scale-[0.985] transition disabled:cursor-not-allowed"
        >
          Unduh Sekarang
        </button>
      </div>

      {/* Calm status area */}
      <div className="mt-6 min-h-[52px]">
        {status ? (
          <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-2xl py-3 px-4">
            {status}
          </div>
        ) : (
          <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            <p>Untuk pengalaman satu klik tanpa Terminal, aplikasi desktop sedang disiapkan.</p>
          </div>
        )}
      </div>

      <p className="mt-8 text-center text-[13px] text-zinc-400 dark:text-zinc-500">
        Semua proses berjalan di komputer kamu. Tidak ada data yang dikirim ke server lain.
      </p>
    </div>
  );
}
