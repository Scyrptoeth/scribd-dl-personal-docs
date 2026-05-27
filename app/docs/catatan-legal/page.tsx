export default function CatatanLegal() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Catatan Legal &amp; Etika</h1>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="text-lg">
          <strong>scribd-dl-personal</strong> adalah tool yang dibuat untuk keperluan pribadi dan non-komersial.
        </p>

        <h2>Penggunaan yang Diperbolehkan</h2>
        <ul>
          <li>Dokumen yang Anda upload sendiri</li>
          <li>Dokumen publik</li>
          <li>Konten yang Anda miliki hak legal untuk simpan offline (sesuai akun berlangganan Anda)</li>
        </ul>

        <h2>Penggunaan yang Dilarang</h2>
        <ul>
          <li>Mengunduh konten berbayar tanpa memiliki langganan</li>
          <li>Membagikan hasil unduhan secara massal</li>
          <li>Menggunakan tool untuk tujuan komersial</li>
          <li>Melanggar Terms of Service Scribd atau Slideshare</li>
        </ul>

        <p className="text-red-600 dark:text-red-400 font-medium">
          Tool ini tidak menghilangkan paywall dan tidak dirancang untuk membypass proteksi.
        </p>
      </div>
    </div>
  );
}
