const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

/**
 * Fetch letter details by tracking number / ID
 * @param {string} id - Nomor Resi (e.g. SPDT-2026-001)
 */
export async function getLetterByTrackingId(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/letters/${encodeURIComponent(id)}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching letter by ID:", error);
    return {
      success: false,
      message: "Gagal terhubung ke server SPDT. Pastikan backend aktif di port 5000."
    };
  }
}

/**
 * Fetch all letters for the current citizen / dashboard
 */
export async function getAllLetters() {
  try {
    const res = await fetch(`${API_BASE_URL}/letters`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching all letters:", error);
    return {
      success: false,
      message: "Gagal memuat daftar permohonan surat.",
      data: []
    };
  }
}

/**
 * Submit a new letter request
 * @param {Object} letterData
 */
export async function submitLetter(letterData) {
  try {
    const res = await fetch(`${API_BASE_URL}/letters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(letterData)
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error submitting letter:", error);
    return {
      success: false,
      message: "Gagal mengirimkan permohonan surat. Silakan coba kembali."
    };
  }
}
