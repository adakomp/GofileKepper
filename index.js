import dotenv from 'dotenv';
import axios from 'axios';
import UserAgent from 'user-agents';

// Load environment variables
dotenv.config();

const config = {
  // Ganti dengan ID file GoFile Anda
  fileIds: ['GANTI_DENGAN_ID_FILE_ANDA'], // Contoh: ['abc123', 'def456']
  minDelay: 30 * 60 * 1000, // 30 menit
  maxDelay: 120 * 60 * 1000, // 2 jam
};

// Fungsi untuk mendapatkan delay acak
function getRandomDelay() {
  return Math.floor(Math.random() * (config.maxDelay - config.minDelay + 1)) + config.minDelay;
}

// Fungsi untuk mendapatkan user agent acak
function getRandomUserAgent() {
  const userAgent = new UserAgent();
  return userAgent.toString();
}

// Fungsi untuk mengunjungi halaman/file
async function visitPage(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 30000,
    });
    console.log(`[${new Date().toISOString()}] Successfully visited: ${url}`);
    return true;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error visiting ${url}:`, error.message);
    return false;
  }
}

// Fungsi untuk mendapatkan daftar file dari akun
async function getAccountFiles() {
  // Kembalikan ID file yang sudah ditentukan
  return config.fileIds;
}

// Fungsi untuk mengumpulkan semua ID file
async function collectFileIds() {
  return config.fileIds;
}

// Fungsi utama
async function main() {
  console.log(`[${new Date().toISOString()}] Starting GoFile Keeper...`);
  
  // Jika tidak ada file ID yang ditentukan, ambil otomatis dari akun
  if (config.fileIds.length === 0) {
    console.log('No file IDs provided, fetching from account...');
    config.fileIds = await collectFileIds();
    
    if (config.fileIds.length === 0) {
      console.error('No files found in account. Please upload some files first.');
      return;
    }
    
    console.log(`Found ${config.fileIds.length} files in account.`);
  }
  
  // Loop utama
  while (true) {
    try {
      // Pilih file acak
      const randomFileId = config.fileIds[Math.floor(Math.random() * config.fileIds.length)];
      
      // Tentukan apakah akan mengunjungi halaman web atau file langsung (50/50)
      const visitDirectLink = Math.random() > 0.5;
      
      let url;
      if (visitDirectLink) {
        // Kunjungi file langsung
        url = `https://gofile.io/d/${randomFileId}`;
      } else {
        // Kunjungi halaman web
        url = `https://gofile.io/?c=${randomFileId}`;
      }
      
      console.log(`[${new Date().toISOString()}] Visiting: ${url}`);
      await visitPage(url);
      
      // Tunggu dengan delay acak sebelum kunjungan berikutnya
      const delay = getRandomDelay();
      console.log(`[${new Date().toISOString()}] Waiting ${Math.round(delay / 60000)} minutes before next visit...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      
    } catch (error) {
      console.error('Error in main loop:', error);
      // Tunggu 5 menit jika terjadi error
      await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
    }
  }
}

// Jalankan program
main().catch(console.error);
