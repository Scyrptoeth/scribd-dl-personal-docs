'use client';

import { useState, useEffect, useCallback } from 'react';

export default function WebDownload() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);

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
    if (!url.trim() || !ws || !isConnected) return;

    setStatus('Memproses...');
    setIsSuccess(false);

    ws.send(JSON.stringify({
      type: 'download',
      url: url.trim()
    }));
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

  // Main flow
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
          className="w-full px-5 py-4 text-lg border border-zinc-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-zinc-400 disabled:opacity-60 disabled:bg-zinc-50 disabled:border-zinc-200 transition"
          disabled={!isConnected}
        />

        <button
          onClick={handleDownload}
          disabled={!url.trim() || !isConnected}
          className="w-full py-4 text-lg font-medium bg-black text-white rounded-2xl disabled:bg-zinc-200 disabled:text-zinc-400 hover:bg-zinc-800 active:scale-[0.985] transition disabled:cursor-not-allowed"
        >
          Unduh Sekarang
        </button>
      </div>

      {/* Status / guidance area - always calm */}
      <div className="mt-6 min-h-[52px]">
        {status ? (
          <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-2xl py-3 px-4">
            {status}
          </div>
        ) : !isConnected ? (
          <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 space-y-1">
            <p>Menunggu aplikasi di komputer ini...</p>
            <p className="text-xs">Buka aplikasi Scribd Downloader di komputer kamu, lalu tombol akan aktif otomatis.</p>
          </div>
        ) : null}
      </div>

      <p className="mt-8 text-center text-[13px] text-zinc-400 dark:text-zinc-500">
        Semua proses berjalan di komputer kamu. Tidak ada data yang dikirim ke server lain.
      </p>
    </div>
  );
}
