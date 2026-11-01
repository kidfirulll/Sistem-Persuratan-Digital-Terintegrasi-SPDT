// In-memory letter store for demo & tracking purposes
let letters = [
  {
    id: "SPDT-2026-001",
    trackingNumber: "SPDT-2026-001",
    letterType: "Surat Keterangan Usaha (SKU)",
    applicantName: "Haji Ahmad Dahlan",
    nik: "3201012304650001",
    date: "2026-10-28",
    status: "Terbit",
    currentStage: 5, // 0: Diajukan, 1: RT, 2: RW, 3: Kasun, 4: Kades, 5: Terbit
    stages: [
      { name: "Diajukan", role: "Pemohon", status: "completed", timestamp: "28 Okt 2026, 09:15" },
      { name: "RT", role: "Ketua RT 02", status: "completed", timestamp: "28 Okt 2026, 11:30" },
      { name: "RW", role: "Ketua RW 05", status: "completed", timestamp: "29 Okt 2026, 14:00" },
      { name: "Kasun", role: "Kepala Dusun Krajan", status: "completed", timestamp: "30 Okt 2026, 08:45" },
      { name: "Kades", role: "Kepala Desa (TTE)", status: "completed", timestamp: "31 Okt 2026, 10:20" },
      { name: "Terbit", role: "Dokumen Siap Unduh", status: "completed", timestamp: "31 Okt 2026, 10:25" }
    ],
    notes: "Surat telah ditandatangani secara elektronik (TTE) dan siap diunduh."
  },
  {
    id: "SPDT-2026-002",
    trackingNumber: "SPDT-2026-002",
    letterType: "Surat Keterangan Domisili",
    applicantName: "Siti Aminah",
    nik: "3201015609800003",
    date: "2026-10-31",
    status: "Proses Kasun",
    currentStage: 3,
    stages: [
      { name: "Diajukan", role: "Pemohon", status: "completed", timestamp: "31 Okt 2026, 08:00" },
      { name: "RT", role: "Ketua RT 01", status: "completed", timestamp: "31 Okt 2026, 10:15" },
      { name: "RW", role: "Ketua RW 05", status: "completed", timestamp: "31 Okt 2026, 15:30" },
      { name: "Kasun", role: "Kepala Dusun Krajan", status: "current", timestamp: "Sedang ditelaah" },
      { name: "Kades", role: "Kepala Desa (TTE)", status: "pending", timestamp: "-" },
      { name: "Terbit", role: "Dokumen Siap Unduh", status: "pending", timestamp: "-" }
    ],
    notes: "Sedang menunggu verifikasi berkas oleh Kepala Dusun."
  },
  {
    id: "SPDT-2026-003",
    trackingNumber: "SPDT-2026-003",
    letterType: "Surat Keterangan Tidak Mampu (SKTM)",
    applicantName: "Bambang Sudarsono",
    nik: "3201011202720005",
    date: "2026-11-01",
    status: "Proses RT",
    currentStage: 1,
    stages: [
      { name: "Diajukan", role: "Pemohon", status: "completed", timestamp: "01 Nov 2026, 07:30" },
      { name: "RT", role: "Ketua RT 03", status: "current", timestamp: "Menunggu tanda tangan RT" },
      { name: "RW", role: "Ketua RW 02", status: "pending", timestamp: "-" },
      { name: "Kasun", role: "Kepala Dusun Barat", status: "pending", timestamp: "-" },
      { name: "Kades", role: "Kepala Desa (TTE)", status: "pending", timestamp: "-" },
      { name: "Terbit", role: "Dokumen Siap Unduh", status: "pending", timestamp: "-" }
    ],
    notes: "Pengajuan baru diterima, menunggu persetujuan RT setempat."
  }
];

// GET /api/letters/:id
export const getLetterById = (req, res) => {
  const { id } = req.params;
  const cleanId = id.trim().toUpperCase();

  const letter = letters.find(
    (item) => item.id.toUpperCase() === cleanId || item.trackingNumber.toUpperCase() === cleanId
  );

  if (!letter) {
    return res.status(404).json({
      success: false,
      message: `Surat dengan Nomor Resi "${id}" tidak ditemukan. Pastikan nomor resi benar (contoh: SPDT-2026-001).`
    });
  }

  return res.status(200).json({
    success: true,
    data: letter
  });
};

// GET /api/letters (get all letters for citizen dashboard)
export const getAllLetters = (req, res) => {
  return res.status(200).json({
    success: true,
    data: letters
  });
};

// POST /api/letters
export const createLetter = (req, res) => {
  const { letterType, applicantName, nik, purpose, address, phone } = req.body;

  if (!letterType || !applicantName || !nik) {
    return res.status(400).json({
      success: false,
      message: "Mohon lengkapi jenis surat, nama lengkap, dan NIK pemohon."
    });
  }

  const newId = `SPDT-2026-${String(letters.length + 1).padStart(3, "0")}`;
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const timeFormatted = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const newLetter = {
    id: newId,
    trackingNumber: newId,
    letterType,
    applicantName,
    nik,
    purpose: purpose || "Keperluan Administrasi",
    address: address || "Dusun Krajan RT 01 / RW 01",
    phone: phone || "-",
    date: dateFormatted,
    status: "Diajukan",
    currentStage: 0,
    stages: [
      { name: "Diajukan", role: "Pemohon", status: "completed", timestamp: `${dateFormatted}, ${timeFormatted}` },
      { name: "RT", role: "Ketua RT", status: "current", timestamp: "Menunggu verifikasi" },
      { name: "RW", role: "Ketua RW", status: "pending", timestamp: "-" },
      { name: "Kasun", role: "Kepala Dusun", status: "pending", timestamp: "-" },
      { name: "Kades", role: "Kepala Desa (TTE)", status: "pending", timestamp: "-" },
      { name: "Terbit", role: "Dokumen Siap Unduh", status: "pending", timestamp: "-" }
    ],
    notes: "Pengajuan berhasil dibuat. Menunggu verifikasi pengurus RT."
  };

  letters.unshift(newLetter);

  return res.status(201).json({
    success: true,
    message: "Pengajuan surat berhasil dikirim!",
    data: newLetter
  });
};
