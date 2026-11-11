// In-memory letter store for SPDT
let letters = [];

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
      message: `Surat dengan Nomor Resi "${id}" tidak ditemukan. Pastikan nomor resi benar.`
    });
  }

  return res.status(200).json({
    success: true,
    data: letter
  });
};

// GET /api/letters (get all letters)
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
    address: address || "",
    phone: phone || "-",
    date: dateFormatted,
    status: "Menunggu Verifikasi RT",
    currentStage: 1, // 1: Giliran RT
    approvedBy: [],  // Daftar role yang sudah approve: ['rt', 'rw', ...]
    stages: [
      { name: "Diajukan", role: "Pemohon", status: "completed", timestamp: `${dateFormatted}, ${timeFormatted}` },
      { name: "RT", role: "Ketua RT", status: "current", timestamp: "Menunggu verifikasi RT" },
      { name: "RW", role: "Ketua RW", status: "pending", timestamp: "-" },
      { name: "Kasun", role: "Kepala Dusun", status: "pending", timestamp: "-" },
      { name: "Kades", role: "Kepala Desa (TTE)", status: "pending", timestamp: "-" },
      { name: "Terbit", role: "Dokumen Siap Unduh", status: "pending", timestamp: "-" }
    ],
    notes: "Pengajuan baru berhasil dibuat. Menunggu verifikasi pengurus RT."
  };

  letters.unshift(newLetter);

  return res.status(201).json({
    success: true,
    message: "Pengajuan surat berhasil dikirim!",
    data: newLetter
  });
};

// POST /api/letters/:id/approve
export const approveLetter = (req, res) => {
  const { id } = req.params;
  const { officialRole, officialName, note } = req.body;
  const cleanId = id.trim().toUpperCase();

  const letterIndex = letters.findIndex(
    (item) => item.id.toUpperCase() === cleanId || item.trackingNumber.toUpperCase() === cleanId
  );

  if (letterIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Surat tidak ditemukan."
    });
  }

  const letter = letters[letterIndex];
  const role = (officialRole || "").toLowerCase();

  if (!letter.approvedBy) {
    letter.approvedBy = [];
  }

  // Cek apakah role ini sudah pernah approve
  if (letter.approvedBy.includes(role)) {
    return res.status(400).json({
      success: false,
      message: `Surat ini sudah disetujui oleh ${officialName || role.toUpperCase()}.`
    });
  }

  const now = new Date();
  const dateFormatted = now.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const timeFormatted = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const approvalTimestamp = `${dateFormatted}, ${timeFormatted}`;

  // Alur berjenjang: RT (1) -> RW (2) -> Kasun (3) -> Kades (4) -> Terbit (5)
  if (role === "rt") {
    letter.approvedBy.push("rt");
    letter.currentStage = 2;
    letter.status = "Menunggu Verifikasi RW";
    if (letter.stages) {
      if (letter.stages[1]) { letter.stages[1].status = "completed"; letter.stages[1].timestamp = approvalTimestamp; }
      if (letter.stages[2]) { letter.stages[2].status = "current"; letter.stages[2].timestamp = "Sedang diproses RW"; }
    }
  } else if (role === "rw") {
    letter.approvedBy.push("rw");
    letter.currentStage = 3;
    letter.status = "Menunggu Verifikasi Kasun";
    if (letter.stages) {
      if (letter.stages[2]) { letter.stages[2].status = "completed"; letter.stages[2].timestamp = approvalTimestamp; }
      if (letter.stages[3]) { letter.stages[3].status = "current"; letter.stages[3].timestamp = "Sedang ditelaah Kasun"; }
    }
  } else if (role === "kasun") {
    letter.approvedBy.push("kasun");
    letter.currentStage = 4;
    letter.status = "Menunggu TTE Kades";
    if (letter.stages) {
      if (letter.stages[3]) { letter.stages[3].status = "completed"; letter.stages[3].timestamp = approvalTimestamp; }
      if (letter.stages[4]) { letter.stages[4].status = "current"; letter.stages[4].timestamp = "Menunggu penandatanganan Kades"; }
    }
  } else if (role === "kades") {
    letter.approvedBy.push("kades");
    letter.currentStage = 5;
    letter.status = "Terbit Sah";
    if (letter.stages) {
      if (letter.stages[4]) { letter.stages[4].status = "completed"; letter.stages[4].timestamp = approvalTimestamp; }
      if (letter.stages[5]) { letter.stages[5].status = "completed"; letter.stages[5].timestamp = approvalTimestamp; }
    }
  } else {
    // Fallback umum
    letter.approvedBy.push(role);
    letter.status = "Terbit";
    letter.currentStage = 5;
  }

  if (note) letter.notes = note;

  return res.status(200).json({
    success: true,
    message: `Dokumen ${letter.trackingNumber} berhasil disetujui & TTE oleh ${officialName || role.toUpperCase()}.`,
    data: letter
  });
};
