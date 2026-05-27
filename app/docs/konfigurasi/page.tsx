export default function Konfigurasi() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Pengaturan Lanjutan</h1>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p>
          Sebagian besar pengguna tidak perlu mengubah apapun. Tool sudah diatur dengan pengaturan terbaik untuk hasil yang andal.
        </p>

        <h2>Lokasi Hasil Unduhan</h2>
        <p>
          Secara default, semua dokumen yang berhasil diunduh akan disimpan di folder:
        </p>
        <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg text-sm">
~/Desktop/scribd-dl-output/
        </pre>

        <p>
          Anda hanya perlu membuka Desktop untuk menemukan hasilnya.
        </p>

        <h2>Butuh Bantuan Lebih Lanjut?</h2>
        <p>
          Jika Anda sering mengalami masalah dengan dokumen tertentu, silakan hubungi kami. Kami akan membantu menyesuaikan pengaturan yang tepat untuk Anda.
        </p>
      </div>
    </div>
  );
}
