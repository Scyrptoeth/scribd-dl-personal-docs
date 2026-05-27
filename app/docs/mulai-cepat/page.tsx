export default function MulaiCepat() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Mulai Cepat</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-3">1. Pastikan Chrome Ditutup</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Sebelum menjalankan tool, tutup Google Chrome sepenuhnya untuk menghindari error <code>PROFILE_LOCKED</code>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">2. Jalankan Perintah</h2>
          <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm">
            <code>cd ~/tools/scribd-dl-personal</code><br />
            <code>npm start "https://www.scribd.com/document/XXXXXX/Nama-Dokumen"</code>
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">3. Jika Profil Terkunci</h2>
          <p className="mb-3 text-zinc-600 dark:text-zinc-400">Jalankan perintah berikut:</p>
          <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm">
            <code>pkill -9 Chrome || true</code><br />
            <code>rm -f ~/Library/Application\ Support/Google/Chrome/Profile\ 4/SingletonLock</code>
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">4. Hasil</h2>
          <p>
            Jika berhasil, file PDF akan tersimpan di folder <code>output/</code> di dalam direktori tool.
          </p>
        </div>
      </div>
    </div>
  );
}
