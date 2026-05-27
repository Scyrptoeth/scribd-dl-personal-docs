'use client';

import { useState } from 'react';

export default function WebDownload() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  // Try to connect to the local desktop app
  const connectToDesktopApp = () => {
    try {
      const socket = new WebSocket('ws://localhost:3456');

      socket.onopen = () => {
        setIsConnected(true);
        setWs(socket);
        setStatus('Aplikasi pendamping terdeteksi. Siap digunakan.');
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'status') {
          setStatus(data.message);
        }
        if (data.type === 'success') {
          setStatus('Download selesai! File tersimpan di Desktop kamu.');
        }
        if (data.type === 'error') {
          setStatus('Error: ' + data.message);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        setWs(null);
        setStatus('Aplikasi pendamping tidak berjalan. Silakan jalankan dulu.');
      };

      socket.onerror = () => {
        setIsConnected(false);
        setWs(null);
      };
    } catch (e) {
      setIsConnected(false);
    }
  };

  const handleDownload = () => {
    if (!url.trim() || !ws) return;

    setStatus('Mengirim permintaan ke aplikasi...');
    ws.send(JSON.stringify({
      type: 'download',
      url: url.trim()
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-semibold mb-4 text-center">Unduh Dokumen</h2>

      {!isConnected && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-sm">
          Aplikasi pendamping belum berjalan.<br />
          Jalankan aplikasi desktop terlebih dahulu.
        </div>
      )}

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Tempel link dokumen di sini..."
        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-2xl mb-4"
      />

      <button
        onClick={isConnected ? handleDownload : connectToDesktopApp}
        disabled={!url.trim() && isConnected}
        className="w-full py-4 text-lg font-medium bg-black text-white rounded-2xl disabled:bg-zinc-300 disabled:text-zinc-500 hover:bg-zinc-800 transition"
      >
        {isConnected ? 'Unduh Sekarang' : 'Hubungkan ke Aplikasi'}
      </button>

      {status && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-sm">
          {status}
        </div>
      )}
    </div>
  );
}
