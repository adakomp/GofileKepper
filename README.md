# GoFile Keeper

Script untuk menjaga file di GoFile tetap aktif dengan cara mengunjungi file secara berkala dengan pola acak.

## Persyaratan

- Node.js (versi 14 atau lebih baru)
- Akun GoFile
- Token akun GoFile

## Cara Menggunakan

1. Install dependensi:
   ```bash
   npm install
   ```

2. Salin file `.env.example` ke `.env` dan isi dengan informasi akun Anda:
   ```
   cp .env.example .env
   ```

3. Edit file `.env` dan isi dengan informasi akun GoFile Anda:
   ```
   ACCOUNT_TOKEN=your_gofile_token_here
   ACCOUNT_EMAIL=your_email@example.com
   # Opsional: Daftar file ID yang akan dijaga (contoh: ["fileId1", "fileId2"])
   FILE_IDS=[]
   ```

4. Jalankan script:
   ```bash
   npm start
   ```

## Fitur

- Mengunjungi file secara acak dengan interval waktu yang bervariasi
- Menggunakan User-Agent yang berbeda-beda
- Bisa mengunjungi halaman web atau file langsung
- Mendeteksi file secara otomatis dari akun
- Log aktivitas yang rinci

## Catatan

- Script ini akan berjalan terus sampai dihentikan secara manual (Ctrl+C)
- Pastikan koneksi internet stabil
- Disarankan untuk menjalankan di server/VPS untuk menjaga kestabilan
