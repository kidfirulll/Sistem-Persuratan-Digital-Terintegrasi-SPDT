// Base API URL configuration
// Robust fallback ensures requests don't hit frontend domain when VITE_API_URL is missing
const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
let BASE_URL = envUrl || "http://localhost:5000/api";

// Trim trailing slashes
BASE_URL = BASE_URL.replace(/\/+$/, "");

// Ensure BASE_URL includes /api endpoint prefix if user only provided origin domain
if (!BASE_URL.endsWith("/api")) {
  BASE_URL = `${BASE_URL}/api`;
}

/**
 * Fetch letter details by tracking number / ID
 * @param {string} id - Nomor Resi (e.g. SPDT-2026-001)
 */
export async function getLetterByTrackingId(id) {
  try {
    const res = await fetch(`${BASE_URL}/letters/${encodeURIComponent(id)}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching letter by ID:", error);
    return {
      success: false,
      message: "Gagal terhubung ke server SPDT. Pastikan backend aktif."
    };
  }
}

/**
 * Fetch all letters for the current citizen / dashboard
 */
export async function getAllLetters() {
  try {
    const res = await fetch(`${BASE_URL}/letters`);
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
    const res = await fetch(`${BASE_URL}/letters`, {
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

/**
 * Approve and sign (TTE) a letter at a specific official role
 * @param {string} id - Letter tracking number
 * @param {Object} payload - { officialRole, officialName, note }
 */
export async function approveLetterTTE(id, payload = {}) {
  try {
    const res = await fetch(`${BASE_URL}/letters/${encodeURIComponent(id)}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error approving letter:", error);
    return {
      success: false,
      message: "Gagal memproses persetujuan TTE. Silakan coba kembali."
    };
  }
}
