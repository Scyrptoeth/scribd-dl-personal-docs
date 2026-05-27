'use client';

import { useState } from 'react';

export default function CommandGenerator() {
  const [url, setUrl] = useState('');
  const [useProfile, setUseProfile] = useState(true);
  const [strategy, setStrategy] = useState('auto');
  const [retries, setRetries] = useState(1);
  const [filenameMode, setFilenameMode] = useState('title');
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  const isValidUrl = url.trim().length > 10;

  const generateCommand = () => {
    if (!isValidUrl) return 'npm start "URL_DOKUMEN"';

    let cmd = `cd ~/tools/scribd-dl-personal && npm start "${url.trim()}"`;
    return cmd;
  };

  const generateConfigSnippet = () => {
    let snippet = `[LOADING]\n`;

    if (strategy === 'auto') {
      snippet += `standard_timeout=90\n`;
      snippet += `aggressive_timeout=180\n`;
      snippet += `recovery_timeout=300\n`;
    } else if (strategy === 'standard') {
      snippet += `standard_timeout=120\n`;
      snippet += `aggressive_timeout=180\n`;
      snippet += `recovery_timeout=300\n`;
      snippet += `use_recovery_strategy=false\n`;
    } else if (strategy === 'aggressive') {
      snippet += `standard_timeout=90\n`;
      snippet += `aggressive_timeout=240\n`;
      snippet += `recovery_timeout=300\n`;
    } else if (strategy === 'recovery') {
      snippet += `standard_timeout=90\n`;
      snippet += `aggressive_timeout=180\n`;
      snippet += `recovery_timeout=420\n`;
    }

    snippet += `retries_per_strategy=${retries}\n`;
    snippet += `use_recovery_strategy=${strategy === 'recovery' || strategy === 'auto' ? 'true' : 'false'}\n`;

    return snippet;
  };

  const command = generateCommand();
  const configSnippet = generateConfigSnippet();

  const copyCommand = async () => {
    if (!isValidUrl) return;
    await navigator.clipboard.writeText(command);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  const copyConfig = async () => {
    await navigator.clipboard.writeText(configSnippet);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-1">Command Generator</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Isi informasi di bawah ini, lalu copy perintah + konfigurasi yang direkomendasikan.
        </p>
      </div>

      <div className="space-y-6">
        {/* URL */}
        <div>
          <label className="block text-sm font-medium mb-2">URL Dokumen</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.scribd.com/document/577645946/..."
            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Gunakan Profil Login?</label>
            <select
              value={useProfile ? 'yes' : 'no'}
              onChange={(e) => setUseProfile(e.target.value === 'yes')}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-950"
            >
              <option value="yes">Ya (Rekomendasi)</option>
              <option value="no">Tidak (Hanya dokumen publik)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Prioritas Strategi</label>
            <select
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-950"
            >
              <option value="auto">Auto (Paling Direkomendasikan)</option>
              <option value="standard">Standard (Cepat)</option>
              <option value="aggressive">Aggressive (Dokumen Berat)</option>
              <option value="recovery">Recovery (Sangat Berat)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Jumlah Retry per Strategi</label>
            <select
              value={retries}
              onChange={(e) => setRetries(Number(e.target.value))}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-950"
            >
              <option value={0}>0 (Tidak ada retry)</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nama File Output</label>
            <select
              value={filenameMode}
              onChange={(e) => setFilenameMode(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-950"
            >
              <option value="title">Gunakan Judul Dokumen</option>
              <option value="id">Gunakan ID Dokumen</option>
            </select>
          </div>
        </div>

        {/* Generated Command */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Perintah Terminal</label>
            <button
              onClick={copyCommand}
              disabled={!isValidUrl}
              className="text-xs px-3 py-1 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 transition"
            >
              {copiedCommand ? '✓ Tersalin' : 'Copy Perintah'}
            </button>
          </div>
          <pre className="bg-zinc-950 text-emerald-400 p-4 rounded-xl text-sm overflow-x-auto font-mono border border-zinc-800">
            {command}
          </pre>
        </div>

        {/* Recommended Config */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Rekomendasi config.ini (bagian LOADING)</label>
            <button
              onClick={copyConfig}
              className="text-xs px-3 py-1 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 transition"
            >
              {copiedConfig ? '✓ Tersalin' : 'Copy Config'}
            </button>
          </div>
          <pre className="bg-zinc-900 text-amber-400 p-4 rounded-xl text-xs overflow-x-auto font-mono border border-zinc-800">
            {configSnippet}
          </pre>
          <p className="text-xs text-zinc-500 mt-1.5">
            Salin bagian ini lalu tempel ke file <code>config.ini</code> kamu.
          </p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
        Tool tetap berjalan di komputer kamu. Website ini hanya membantu menghasilkan perintah + konfigurasi yang optimal.
      </div>
    </div>
  );
}
