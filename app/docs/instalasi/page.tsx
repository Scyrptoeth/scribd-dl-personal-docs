export default function Instalasi() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Instalasi</h1>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>1. Clone Repository Tool</h2>
        <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg text-sm">
git clone https://github.com/rkwyu/scribd-dl.git ~/tools/scribd-dl-personal
cd ~/tools/scribd-dl-personal
        </pre>

        <h2>2. Install Dependencies</h2>
        <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg text-sm">
npm install
        </pre>

        <h2>3. (Opsional) Konfigurasi Profil</h2>
        <p>
          Tool akan otomatis mencoba mendeteksi profil Chrome Anda. Jika ingin memaksa profil tertentu, gunakan environment variable:
        </p>
        <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg text-sm">
SCRIBD_DL_CHROME_PROFILE="$HOME/Library/Application Support/Google/Chrome/Profile 2" npm start "URL"
        </pre>

        <p className="text-sm text-amber-600 dark:text-amber-400">
          Pastikan Anda sudah menutup Chrome sebelum menjalankan tool untuk menghindari error profil terkunci.
        </p>
      </div>
    </div>
  );
}
