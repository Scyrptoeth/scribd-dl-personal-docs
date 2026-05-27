export default function DocsOverview() {
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight mb-4">
        scribd-dl-personal
      </h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10">
        Tool pribadi yang tangguh untuk mengunduh dokumen dari Scribd dan Slideshare.
      </p>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>Apa itu scribd-dl-personal?</h2>
        <p>
          Ini adalah versi pribadi yang dimodifikasi dari proyek open source <code>rkwyu/scribd-dl</code>. 
          Tool ini dirancang khusus untuk kebutuhan pribadi dan non-komersial, dengan fokus pada keandalan 
          saat mengunduh dokumen yang memerlukan login.
        </p>

        <h2>Fitur Utama</h2>
        <ul>
          <li><strong>Multi-Strategy Loading</strong> — Tiga tingkatan strategi (Standard, Aggressive, Recovery) dengan retry otomatis.</li>
          <li><strong>Dukungan Profil Login</strong> — Otomatis mendeteksi dan menggunakan profil Chrome Anda di macOS.</li>
          <li><strong>Error Handling yang Jelas</strong> — Pesan error dalam Bahasa Indonesia beserta saran tindakan yang konkret.</li>
          <li><strong>Konfigurasi Fleksibel</strong> — Atur timeout dan perilaku loading melalui <code>config.ini</code>.</li>
        </ul>

        <h2>Peringatan Penting</h2>
        <p>
          Tool ini <strong>hanya boleh digunakan</strong> untuk dokumen yang Anda punya hak legal untuk mengunduh, 
          seperti dokumen publik, dokumen yang Anda upload sendiri, atau konten yang tersedia melalui akun berlangganan Anda.
        </p>
        <p>
          Tool ini <strong>tidak</strong> menghilangkan paywall atau membypass proteksi Scribd/Slideshare.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <a 
          href="/docs/mulai-cepat" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition"
        >
          Mulai Cepat →
        </a>
      </div>
    </div>
  );
}
