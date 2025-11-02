# Pengembangan Aplikasi Web - News Portal

## 1. Tentang Saya

| Nama Lengkap | NIM |
| :--- | :--- |
| Alliyah Salsabilla | 123140014 |

---

## 2. Deskripsi Proyek

Aplikasi News Portal ini adalah proyek web berbasis ReactJS yang saya kembangkan untuk menyajikan berita utama dengan tampilan yang modern dan responsif. Aplikasi ini memungkinkan pengguna menelusuri artikel berdasarkan kategori (Technology, Business, Sports), melakukan pencarian mendalam menggunakan keyword dan date picker, serta membatasi tampilan menggunakan Pagination. Untuk mengatasi masalah deployment API, saya menggunakan data statis lokal yang sudah saya pre-load dengan skema NewsAPI.

### Fitur-Fitur Utama yang Saya Kerjakan:

* **Navigasi Kategori:** Saya membuat navigation bar di bagian atas agar pengguna bisa langsung memilih kategori berita populer seperti `Technology`, `Business`, dan `Sports`.
* **Pencarian dan Filter Tanggal:** Saya menyediakan search form untuk mencari berita berdasarkan keyword. Saya juga menambahkan date picker untuk filter tanggal.
* **Tampilan Rapi:** Semua artikel ditampilkan dalam bentuk card yang informatif, memuat judul, sumber, tanggal, dan thumbnail.
* **Pagination:** Untuk kenyamanan pengguna, saya membatasi tampilan artikel dan menambahkan fitur Pagination, sehingga pengguna bisa berpindah antar halaman.

### Teknologi yang Saya Gunakan:

* **Framework Inti:** ReactJS (Menggunakan Create React App)
* **Penghubung Data:** Fetch API
* **Manajemen State:** React Hooks (`useState` dan `useEffect`)
* **Styling:** CSS Murni

---

## 3. Cara Instalasi dan Menjalankan Lokal

Jika Anda ingin mencoba aplikasi ini secara lokal (di `localhost`), pastikan Anda sudah menginstal Node.js dan NPM.

### A. Persiapan

1.  Silakan clone repository ini atau unduh kode sumbernya.
2.  Buka terminal (Command Prompt/PowerShell/Git Bash) dan masuk ke direktori proyek.
3.  Jalankan perintah ini untuk menginstal semua library yang saya gunakan:

    ```bash
    npm install
    ```

### B. Mulai Aplikasi

1.  Setelah instalasi selesai, jalankan server development dengan perintah:

    ```bash
    npm start
    ```
2.  Aplikasi akan otomatis terbuka di browser Anda pada `http://localhost:3000`.

---

## 4. Link Deployment

Proyek ini sudah saya deploy agar bisa diakses secara publik:

**Link Deployment:** http://uts-pemweb-123140014.vercel.app

---

## 5. Tampilan Aplikasi

Berikut adalah beberapa screenshot yang menunjukkan tampilan News Portal ini.

**- Tampilan Navigation Bar News Portal**
<img width="1886" height="1017" alt="Screenshot 2025-11-02 014227" src="https://github.com/user-attachments/assets/b4fc8903-8191-47ca-808c-3273556134e3" />

**- Tampilan Pencarian dan Filter Tanggal**
<img width="1893" height="1020" alt="Screenshot 2025-11-02 014514" src="https://github.com/user-attachments/assets/0136a243-8f89-41f8-a61e-89294f2824d5" />

**- Tampilan Pagination**
<img width="943" height="509" alt="image" src="https://github.com/user-attachments/assets/54dfa7bf-aa51-442d-90c7-48e45cea7ba7" />

