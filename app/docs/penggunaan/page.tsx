export default function Penggunaan() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Penggunaan</h1>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>Perintah Dasar</h2>
        <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg text-sm">
npm start "URL_DOKUMEN"
        </pre>

        <h2>Contoh Penggunaan</h2>
        <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg text-sm">
# Scribd
npm start "https://www.scribd.com/document/577645946/Kode-KPP-Se-Indonesia"

# Slideshare
npm start "https://www.slideshare.net/username/presentasi-anda"
        </pre>

        <h2>Hasil</h2>
        <p>
          Jika berhasil, file PDF akan tersimpan di folder:
        </p>
        <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg text-sm">
~/Desktop/scribd-dl-output/
        </pre>
        <p>
          Lokasi ini bisa diubah melalui file <code>config.ini</code> di bagian <code>[DIRECTORY]</code>.
        </p>

        <p className="text-sm text-zinc-500">
          Catatan: Tool ini menggunakan profil Chrome Anda. Pastikan Anda sudah login di Chrome dengan akun yang memiliki akses ke dokumen yang ingin diunduh.
        </p>
      </div>
    </div>
  );
}
