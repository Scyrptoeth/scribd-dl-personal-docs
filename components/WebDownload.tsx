'use client';

import { useState, useEffect } from 'react';

export default function WebDownload() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('Menghubungkan ke aplikasi pendamping...');
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  // Auto-connect when component mounts
  useEffect(() => {
    connectToDesktopApp();

    // Try reconnecting every 5 seconds if not connected
    const interval = setInterval(() => {
      if (!isConnected) {
        connectToDesktopApp();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const connectToDesktopApp = () => {
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
          }
          if (data.type === 'success') {
            setStatus('✓ ' + data.message + ' File tersimpan di Desktop.');
            setUrl(''); // clear input after success
          }
          if (data.type === 'error') {
            setStatus('Gagal: ' + data.message);
          }
        } catch (e) {
          setStatus('Menerima respons dari aplikasi...');
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        setWs(null);
        setStatus('Aplikasi pendamping tidak ditemukan. Pastikan sudah dijalankan.');
      };

      socket.onerror = () => {
        setIsConnected(false);
        setWs(null);
      };
    } catch (e) {
      setIsConnected(false);
      setStatus('Tidak dapat menghubungi aplikasi pendamping.');
    }
  };

  const handleDownload = () => {
    if (!url.trim() || !ws || !isConnected) return;

    setStatus('Mengirim permintaan...');
    ws.send(JSON.stringify({
      type: 'download',
      url: url.trim()
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <h2 className="text-2xl font-semibold mb-2 text-center">Unduh Dokumen</h2>
      <p className="text-center text-sm text-zinc-500 mb-6">
        Tempel link dokumen yang ingin kamu simpan
      </p>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://www.scribd.com/..."
        className="w-full px-4 py-4 text-lg border border-zinc-300 dark:border-zinc-700 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleDownload}
        disabled={!url.trim() || !isConnected}
        className="w-full py-4 text-lg font-medium bg-black text-white rounded-2xl disabled:bg-zinc-300 disabled:text-zinc-500 hover:bg-zinc-800 active:scale-[0.985] transition"
      >
        {isConnected ? 'Unduh Sekarang' : 'Menghubungkan...'}
      </button>

      {status && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-sm text-center">
          {status}
        </div>
      )}

      {!isConnected && (
        <p className="mt-4 text-xs text-center text-zinc-500">
          Pastikan aplikasi pendamping sudah dibuka di komputer kamu.
        </p>
      )}
    </div>
  );
}
