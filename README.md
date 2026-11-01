# Sistem Persuratan Digital Terintegrasi (SPDT)

[![MIA 2026](https://img.shields.io/badge/Competition-Multimedia%20In%20Action%20(MIA)%202026-0f172a?style=for-the-badge&logo=target)](https://github.com)
[![Subtheme](https://img.shields.io/badge/Subtema-Public%20Service%20Tracking-2563eb?style=for-the-badge)](https://github.com)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite%20%2B%20Tailwind-38bdf8?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-22c55e?style=for-the-badge&logo=node.js)](https://nodejs.org)

> **Karya Kompetisi Multimedia In Action (MIA) 2026**  
> **Subtema**: *Public Service Tracking*

---

## 📌 Deskripsi Singkat

**Sistem Persuratan Digital Terintegrasi (SPDT)** adalah portal web layanan persuratan desa satu pintu yang dirancang untuk memangkas birokrasi fisik melalui pelacakan status *real-time* dan Tanda Tangan Elektronik (TTE) berjenjang. 

Platform ini mentransformasi pelayanan administrasi kependudukan desa yang sebelumnya konvensional, lambat, dan rentan kehilangan arsip menjadi ekosistem digital yang transparan, akuntabel, dan inklusif bagi seluruh lapisan warga—mulai dari generasi muda hingga lansia melalui mekanisme akun pendamping.

---

## 🎯 Latar Belakang & Nilai Inovasi

1. **Eliminasi Birokrasi Bolak-Balik**: Warga tidak perlu lagi datang berulang kali ke rumah Ketua RT, Ketua RW, Kepala Dusun, dan Kantor Balai Desa hanya untuk meminta stempel dan tanda tangan fisik.
2. **Pelacakan Berjenjang Real-Time (*Public Service Tracking*)**: Setiap pengajuan dilengkapi dengan Nomor Resi digital unik. Warga dapat memantau posisi berkas dalam alur 5 tahap:  
   $$\text{Diajukan} \longrightarrow \text{RT} \longrightarrow \text{RW} \longrightarrow \text{Kepala Dusun} \longrightarrow \text{Kepala Desa (TTE)} \longrightarrow \text{Dokumen Terbit}$$
3. **Keabsahan Hukum dengan TTE & QR Code**: Dokumen diterbitkan dengan verifikasi Tanda Tangan Elektronik resmi berstandar instansi, dilengkapi QR Code keaslian arsip.
4. **Desain Mobile-First & Inklusif**: Antarmuka responsif ramah smartphone dengan floating app bar, navigasi intuitif, tipografi berkontras tinggi, dan fitur pendampingan permohonan.

---

## 💻 Tech Stack

### Frontend
- **Framework & Runtime**: React 18
- **Tooling & Bundler**: Vite
- **Styling**: Tailwind CSS & PostCSS
- **Routing**: React Router DOM v6
- **Iconography**: Lucide React

### Backend
- **Runtime Environment**: Node.js (ES Modules)
- **Web Framework**: Express.js
- **Cross-Origin Handling**: CORS Middleware
- **Architecture**: Modular Controller & Route Pattern

---

## 📁 Struktur Direktori Proyek

```
spdt/
├── backend/
│   ├── controllers/
│   │   └── letterController.js   # Logika bisnis pelacakan, katalog, dan pembuatan surat
│   ├── routes/
│   │   └── letters.js            # Router API (GET /:id, GET /, POST /)
│   ├── package.json              # Dependensi server & script
│   └── server.js                 # Entry point Express API (Port 5001 / 5000)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── TrackingWidget.jsx # Komponen pelacak resi & timeline berjenjang responsif
│   │   ├── layouts/
│   │   │   └── PublicLayout.jsx   # Header portal, floating bottom bar, dan footer navy
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx    # Hero section, feature cards, & katalog layanan
│   │   │   └── UserDashboard.jsx  # Form pengajuan surat & riwayat berkas warga
│   │   ├── services/
│   │   │   └── api.js             # Client service fetch API backend
│   │   ├── App.jsx                # Konfigurasi routing utama
│   │   ├── index.css              # Directive Tailwind CSS
│   │   └── main.jsx               # React DOM root entry
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

---

## 🚀 Panduan Menjalankan Project

Ikuti instruksi berikut untuk menjalankan aplikasi di lingkungan lokal:

### 1. Prasyarat Sistem
- **Node.js**: Versi `>= 18.0.0`
- **npm**: Versi `>= 9.0.0`
- **Git**

### 2. Clone Repository
```bash
git clone https://github.com/username/spdt.git
cd spdt
```

### 3. Menjalankan Backend (Express.js)
Buka terminal pertama dan jalankan perintah:
```bash
# Masuk ke direktori backend
cd backend

# Instal dependensi backend
npm install

# Jalankan server dalam mode development
npm run dev
```
> Server backend akan aktif di: `http://localhost:5001` (atau `http://localhost:5000`).  
> Endpoint cek status API: `http://localhost:5001/api/health`

### 4. Menjalankan Frontend (React + Vite)
Buka terminal kedua dan jalankan perintah:
```bash
# Masuk ke direktori frontend
cd frontend

# Instal dependensi frontend
npm install

# Jalankan server frontend Vite
npm run dev
```
> Buka browser dan akses aplikasi di: `http://localhost:3000`

---

## 🔍 Data Resi Contoh untuk Pengujian Pelacakan

Pada halaman Beranda (`/`) maupun widget pelacakan, Anda dapat menguji nomor resi demo berikut:

| Nomor Resi | Jenis Surat | Pemohon | Status Tahapan |
| :--- | :--- | :--- | :--- |
| **`SPDT-2026-001`** | Surat Keterangan Usaha (SKU) | Haji Ahmad Dahlan | **Terbit** (Selesai TTE Kades) |
| **`SPDT-2026-002`** | Surat Keterangan Domisili | Siti Aminah | **Proses Kasun** (Pemeriksaan Dusun) |
| **`SPDT-2026-003`** | Surat Keterangan Tidak Mampu (SKTM) | Bambang Sudarsono | **Proses RT** (Persetujuan Awal) |

---

## 📊 Progress Pengembangan Saat Ini

- [x] **Arsitektur Full-Stack**: Struktur direktori modular terpisah antara Frontend dan Backend dengan integrasi REST API yang siap diskalakan.
- [x] **Landing Page Interaktif**: Visual modern ramah ponsel, informasi transparansi alur pengajuan, dan katalog layanan persuratan desa.
- [x] **Fitur Pelacakan Resi (*Public Service Tracking*)**: Widget pencarian resi interaktif dengan timeline verifikasi berjenjang dinamis (*adaptive vertical-to-horizontal stepper*).
- [x] **Sistem Manajemen Persuratan Desa**: Portal warga (`/dashboard`) untuk membuat pengajuan baru secara mandiri serta memantau riwayat status dokumen secara transparan.
- [x] **Optimasi Mobile-First & Aksesibilitas**: Floating bottom navigation bar, tap targets ergonomis, dan palet warna Navy-Blue kontras tinggi sesuai standar kompetisi.

---

## 👥 Tim Pengembang

Karya ini dikembangkan untuk ajang **Multimedia In Action (MIA) 2026** sebagai wujud kontribusi inovasi digital bagi pelayanan publik dan tata kelola desa di Indonesia.
