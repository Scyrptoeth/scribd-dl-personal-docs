export default function Konfigurasi() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Konfigurasi</h1>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p>
          Anda dapat mengatur perilaku tool melalui file <code>config.ini</code> yang berada di root folder tool.
        </p>

        <h2>Bagian [LOADING] (Paling Penting)</h2>
        <p>Ini adalah konfigurasi yang kami tambahkan untuk meningkatkan keandalan:</p>

        <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto">
{`[LOADING]
standard_timeout=90
aggressive_timeout=180
recovery_timeout=300
retries_per_strategy=1
use_recovery_strategy=true`}
        </pre>

        <h3>Penjelasan:</h3>
        <ul>
          <li><strong>standard_timeout</strong>: Waktu maksimal untuk strategi pertama (cepat).</li>
          <li><strong>aggressive_timeout</strong>: Untuk dokumen sedang hingga berat.</li>
          <li><strong>recovery_timeout</strong>: Strategi terakhir untuk dokumen sangat berat.</li>
          <li><strong>retries_per_strategy</strong>: Berapa kali mencoba ulang sebelum pindah strategi.</li>
        </ul>
      </div>
    </div>
  );
}
