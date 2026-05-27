'use client';

import { useState } from 'react';

export default function SimpleDownloader() {
  const [url, setUrl] = useState('');
  const [step, setStep] = useState(1);
  const [command, setCommand] = useState('');
  const [copied, setCopied] = useState(false);

  const handleStart = () => {
    if (!url.trim()) return;

    // Generate a very simple command (hiding technical details)
    const simpleCommand = `cd ~/tools/scribd-dl-personal && npm start "${url.trim()}"`;
    setCommand(simpleCommand);
    setStep(2);
  };

  const copyCommand = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setUrl('');
    setCommand('');
    setStep(1);
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Unduh Dokumen
          </h1>
          <p className="text-lg text-zinc-600">
            Tempel link dokumen yang ingin kamu simpan
          </p>
        </div>

        {step === 1 && (
          <>
            {/* Step 1: Input URL */}
            <div className="space-y-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Tempel link di sini..."
                className="w-full px-5 py-4 text-lg border border-zinc-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <button
                onClick={handleStart}
                disabled={!url.trim()}
                className="w-full py-4 text-lg font-medium bg-black text-white rounded-2xl disabled:bg-zinc-300 disabled:text-zinc-500 hover:bg-zinc-800 transition"
              >
                Lanjutkan
              </button>
            </div>

            <p className="mt-8 text-sm text-zinc-500">
              Proses ini berjalan di komputer kamu. Tidak perlu install apapun di browser.
            </p>
          </>
        )}

        {step === 2 && (
          <>
            {/* Step 2: Simple Instructions */}
            <div className="text-left bg-zinc-50 rounded-3xl p-8 space-y-6">
              <div>
                <div className="text-sm text-zinc-500 mb-1">LANGKAH 1</div>
                <p className="text-lg">Buka program <strong>Terminal</strong> di komputer kamu.</p>
                <p className="text-sm text-zinc-500 mt-1">Cara mudah: Tekan tombol Command + Spasi, ketik "Terminal", lalu tekan Enter.</p>
              </div>

              <div>
                <div className="text-sm text-zinc-500 mb-2">LANGKAH 2</div>
                <p className="text-lg mb-3">Klik tombol di bawah untuk menyalin tulisan ini, lalu tempel di Terminal dan tekan Enter:</p>
                
                <div className="bg-white border border-zinc-200 rounded-2xl p-4">
                  <div className="font-mono text-sm break-all bg-zinc-100 p-3 rounded-xl">
                    {command}
                  </div>
                  <button
                    onClick={copyCommand}
                    className="mt-3 w-full py-3 text-sm font-medium bg-black text-white rounded-xl hover:bg-zinc-800 transition"
                  >
                    {copied ? "✓ Sudah Disalin" : "Salin Tulisan Ini"}
                  </button>
                </div>
              </div>

              <div>
                <div className="text-sm text-zinc-500 mb-1">LANGKAH 3</div>
                <p className="text-lg">Tunggu sebentar. Hasilnya akan muncul di Desktop kamu.</p>
              </div>
            </div>

            <button
              onClick={reset}
              className="mt-8 text-sm text-zinc-500 hover:text-black underline"
            >
              Mulai dengan link lain
            </button>
          </>
        )}

      </div>
    </div>
  );
}
