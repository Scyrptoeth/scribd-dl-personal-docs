export default function Troubleshooting() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Troubleshooting</h1>

      <div className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">PROFILE_LOCKED</h2>
          <p className="mb-3">Error ini muncul ketika Chrome masih menggunakan profil yang sama.</p>
          
          <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg text-sm mb-4">
            <p className="font-medium mb-2">Solusi:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Tutup semua jendela Chrome</li>
              <li>Jalankan perintah berikut:</li>
            </ol>
            <pre className="mt-3 bg-zinc-200 dark:bg-zinc-800 p-3 rounded text-xs overflow-x-auto">
pkill -9 Chrome || true<br />
rm -f ~/Library/Application\ Support/Google/Chrome/Profile\ 4/SingletonLock
            </pre>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Dokumen Berat Gagal Terunduh</h2>
          <p className="mb-3">Coba langkah berikut:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>Naikkan nilai <code>recovery_timeout</code> di <code>config.ini</code></li>
            <li>Pastikan komputer memiliki RAM yang cukup</li>
            <li>Coba jalankan di jaringan yang lebih stabil</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Tidak Ada Output PDF</h2>
          <p>Pastikan folder <code>output/</code> ada dan tool memiliki izin menulis.</p>
        </div>
      </div>
    </div>
  );
}
