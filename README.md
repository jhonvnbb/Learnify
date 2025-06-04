<p align="center"><a href="https://laravel.com" target="_blank">
<img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="100" alt="React Logo">

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Tentang Learnify
# Learnify - Platform E-Learning Berbasis Web

**Learnify** adalah platform e-learning berbasis web yang dirancang khusus untuk mendukung proses pembelajaran di bidang **Ilmu Komputer/Teknik Informatika**. Aplikasi ini dibangun menggunakan **Laravel** sebagai backend dan **React.js** sebagai frontend yang terintegrasi melalui **Inertia.js**.

## 🚀 Fitur Utama

- ✨ **Kursus TIK**
- 👥 Sistem pengguna dengan paket:
  - **Basic**: Gratis
  - **Premium**: Berbayar (sekali bayar seumur hidup)
- 📚 Materi Pembelajaran:
  - Modul dalam bentuk **PDF**
  - Video pembelajaran
  - Kuis interaktif
- 📊 Pelacakan progres kursus (% penyelesaian)
- 💳 Sistem pembayaran untuk akses premium
- 🔐 Autentikasi dan otorisasi pengguna

## 🧱 Teknologi yang Digunakan

- **Laravel** - Framework backend PHP
- **React.js** - Library frontend modern
- **Inertia.js** - Jembatan SPA tanpa perlu REST API penuh
- **Tailwind CSS** - Styling modern dan responsif
- **MySQL** - Database manajemen kursus dan pengguna


## 🧑‍🏫 Target Pengguna

- Umum (Mahasiswa, atau siapa saja yang ingin belajar tentang teknologi informasi komunikasi (TIK))
- Pengguna dapat memilih paket:
  - **Basic**: Akses materi terbatas
  - **Premium**: Akses penuh ke semua kursus dan fitur

## 💡 Cara Kerja Learnify

1. **Registrasi & Login** sebagai pengguna
2. **Pilih kursus** dari daftar yang tersedia
3. Bagi pengguna premium, bisa **mengakses semua materi** PDF/video/kuis
4. Setelah menyelesaikan setiap modul/kuis, sistem akan **menghitung progres belajar**
5. Progres ditampilkan dalam bentuk persentase di dashboard pengguna

## ⚙️ Cara Menjalankan (Local Development)

### Persiapan

- PHP >= 8.x
- Composer
- Node.js & NPM/Yarn
- MySQL

### Langkah Instalasi

```bash
git clone git@github.com:jhonvnbb/Learnify.git
cd learnify

# Install backend dependencies
composer install

# Install frontend dependencies
npm install && npm run dev

# Copy file .env dan atur konfigurasi
cp .env.example .env
php artisan key:generate

# Migrasi database
php artisan migrate --seed

# Jalankan server lokal
php artisan serve

