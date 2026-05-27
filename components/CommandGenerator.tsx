'use client';

import { useState } from 'react';

export default function CommandGenerator() {
  const [url, setUrl] = useState('');
  const [useProfile, setUseProfile] = useState(true);
  const [strategy, setStrategy] = useState('auto');
  const [retries, setRetries] = useState(1);
  const [filenameMode, setFilenameMode] = useState('title');
  const [copied, setCopied] = useState(false);

  const generateCommand = () => {
    if (!url.trim()) return 'npm start "URL_DOKUMEN"';

    let command = `cd ~/tools/scribd-dl-personal && npm start "${url.trim()}"`;

    // For now, we keep the command simple because most configuration is in config.ini
    // We can suggest env overrides for advanced use
    if (strategy !== 'auto') {
      // Placeholder for future advanced usage
    }

    return command;
  };

  const command = generateCommand();

  const copyToClipboard = async () => {
    if (!url.trim()) return;

    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1">Command Generator</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Isi URL dokumen, lalu copy perintah yang sudah disesuaikan.
        </p>
      </div>

      <div className="space-y-5">
        {/* URL Input */}
        <div>
          <label className="block text-sm font-medium mb-2">URL Dokumen</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.scribd.com/document/..."
            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Gunakan Profil Login?</label>
            <select
              value={useProfile ? 'yes' : 'no'}
              onChange={(e) => setUseProfile(e.target.value === 'yes')}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-950"
            >
              <option value="yes">Ya (Rekomendasi)</option>
              <option value="no">Tidak (Publik saja)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Strategi Loading</label>
            <select
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-950"
            >
              <option value="auto">Auto (Recommended)</option>
              <option value="standard">Standard saja</option>
              <option value="aggressive">Aggressive</option>
              <option value="recovery">Recovery (Paling Kuat)</option>
            </select>
          </div>
        </div>

        {/* Generated Command */}
        <div>
          <label className="block text-sm font-medium mb-2">Perintah yang Siap Dipakai</label>
          <div className="relative">
            <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-xl text-sm overflow-x-auto font-mono border border-zinc-800">
              {command}
            </pre>
            <button
              onClick={copyToClipboard}
              disabled={!url.trim()}
              className="absolute top-3 right-3 px-4 py-1.5 text-sm rounded-lg bg-white text-black hover:bg-zinc-200 disabled:opacity-50 transition"
            >
              {copied ? 'Tersalin!' : 'Copy'}
            </button>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            Copy perintah di atas, lalu jalankan di Terminal.
          </p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
        Tool masih berjalan di komputer Anda menggunakan profil Chrome. Website ini hanya membantu membuat perintah yang tepat.
      </div>
    </div>
  );
}
