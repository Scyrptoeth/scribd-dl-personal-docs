export default function Troubleshooting() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Jika Mengalami Masalah</h1>

      <div className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tool Tidak Bisa Berjalan</h2>
          <p className="mb-3">Biasanya terjadi karena Chrome masih terbuka.</p>
          
          <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg text-sm">
            <p className="font-medium mb-2">Cara mengatasinya:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Tutup semua jendela Google Chrome (termasuk yang tersembunyi)</li>
              <li>Coba jalankan tool lagi</li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Dokumen Gagal Diunduh</h2>
          <p>Coba langkah berikut:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>Pastikan koneksi internet stabil</li>
            <li>Coba lagi beberapa saat kemudian</li>
            <li>Gunakan komputer dengan RAM yang cukup</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Masih Mengalami Masalah?</h2>
          <p>
            Silakan hubungi kami dan beritahu kami dokumen apa yang ingin Anda unduh. 
            Kami akan membantu Anda langsung.
          </p>
        </div>
      </div>
    </div>
  );
}
