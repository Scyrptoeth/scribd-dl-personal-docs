export default function StrategiLoading() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Strategi Loading</h1>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p>
          Tool ini menggunakan sistem <strong>Multi-Strategy Loading</strong> untuk meningkatkan keberhasilan saat mengunduh dokumen berat.
        </p>

        <h2>Urutan Strategi</h2>
        <ol>
          <li><strong>Standard</strong> — Strategi cepat dengan timeout 90 detik.</li>
          <li><strong>Aggressive</strong> — Untuk dokumen sedang hingga berat (3 menit).</li>
          <li><strong>Recovery</strong> — Strategi terakhir dengan timeout sangat panjang + scroll agresif (5 menit).</li>
        </ol>

        <p>
          Tool akan mencoba strategi secara berurutan. Jika satu strategi gagal, ia akan otomatis mencoba strategi berikutnya (dengan retry).
        </p>
      </div>
    </div>
  );
}
