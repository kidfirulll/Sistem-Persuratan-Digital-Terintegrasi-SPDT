import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  PlusCircle, 
  Search, 
  FileText, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowLeft,
  X,
  Send
} from "lucide-react";
import { getAllLetters, submitLetter } from "../services/api";

const LETTER_OPTIONS = [
  "Surat Keterangan Usaha (SKU)",
  "Surat Keterangan Domisili",
  "Surat Keterangan Tidak Mampu (SKTM)",
  "Surat Pengantar SKCK",
  "Surat Pengantar Nikah (N1-N4)",
  "Surat Keterangan Kematian / Kelahiran"
];

export default function UserDashboard() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // Form State
  const [formData, setFormData] = useState({
    letterType: LETTER_OPTIONS[0],
    applicantName: "Haji Ahmad Dahlan",
    nik: "3201012304650001",
    purpose: "Persyaratan Pengajuan KUR Bank BRI",
    address: "RT 02 / RW 05 Dusun Krajan",
    phone: "0812-9876-5432"
  });

  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    loadLetters();
  }, []);

  const loadLetters = async () => {
    setLoading(true);
    const res = await getAllLetters();
    if (res && res.success) {
      setLetters(res.data);
    } else {
      setFeedback({
        type: "error",
        message: "Gagal menghubungkan ke backend. Menampilkan data lokal percontohan."
      });
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ type: "", message: "" });

    const res = await submitLetter(formData);
    setSubmitting(false);

    if (res && res.success) {
      setFeedback({
        type: "success",
        message: `Pengajuan berhasil dibuat! Nomor Resi: ${res.data.trackingNumber}`
      });
      setShowModal(false);
      loadLetters();
    } else {
      setFeedback({
        type: "error",
        message: res?.message || "Terjadi kesalahan saat menyimpan pengajuan."
      });
    }
  };

  const filteredLetters = letters.filter((item) => {
    const term = searchFilter.toLowerCase();
    return (
      item.trackingNumber.toLowerCase().includes(term) ||
      item.letterType.toLowerCase().includes(term) ||
      item.applicantName.toLowerCase().includes(term) ||
      item.status.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-medium text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
        <span className="font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
          Portal Pelayanan Warga
        </span>
      </div>

      {/* Header Banner - Compact & Modern */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Surat Permohonan Saya
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Kelola pengajuan surat dan pantau proses verifikasi dokumen Anda.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ajukan Surat Baru</span>
        </button>
      </div>

      {/* Feedback Alert */}
      {feedback.message && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-amber-50 border-amber-200 text-amber-900"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <p className="font-medium">{feedback.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setFeedback({ type: "", message: "" })}
            className="text-slate-400 hover:text-slate-700 text-xs font-semibold"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Letters Table / Cards (Mobile-first responsive design) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Riwayat Pengajuan</h2>
            <p className="text-xs text-slate-500">Total {letters.length} berkas permohonan</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Cari no. resi / jenis surat..."
              className="w-full pl-9 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-slate-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Mobile View: Clean Card List */}
        <div className="block md:hidden divide-y divide-slate-100">
          {loading ? (
            <p className="py-6 text-center text-xs text-slate-400">Memuat data...</p>
          ) : filteredLetters.length === 0 ? (
            <p className="py-6 text-center text-xs text-slate-400">Tidak ada data ditemukan</p>
          ) : (
            filteredLetters.map((letter) => (
              <div key={letter.id} className="py-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-700">{letter.trackingNumber}</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {letter.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{letter.letterType}</h4>
                  <p className="text-xs text-slate-500">Pemohon: {letter.applicantName} • {letter.date}</p>
                </div>
                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedLetter(letter)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Detail</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Clean Structured Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/70">
                <th className="py-3 px-3 rounded-l-lg">No. Resi</th>
                <th className="py-3 px-3">Jenis Surat</th>
                <th className="py-3 px-3">Nama Pemohon</th>
                <th className="py-3 px-3">Tanggal</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-center rounded-r-lg">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">
                    Memuat data surat...
                  </td>
                </tr>
              ) : filteredLetters.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">
                    Belum ada pengajuan surat.
                  </td>
                </tr>
              ) : (
                filteredLetters.map((letter) => (
                  <tr key={letter.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-3 font-mono font-bold text-blue-700">
                      {letter.trackingNumber}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-900">
                      {letter.letterType}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {letter.applicantName}
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {letter.date}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                        {letter.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedLetter(letter)}
                        className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 font-semibold text-xs py-1 px-2.5 rounded-md hover:bg-blue-50 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detail</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Formulir Pengajuan Baru */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Formulir Pengajuan Surat
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-4 space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Pilih Jenis Surat
                </label>
                <select
                  name="letterType"
                  value={formData.letterType}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-blue-600 focus:outline-none"
                  required
                >
                  {LETTER_OPTIONS.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nama Pemohon
                  </label>
                  <input
                    type="text"
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleInputChange}
                    placeholder="Sesuai KTP"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-blue-600 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    NIK (16 Digit)
                  </label>
                  <input
                    type="text"
                    name="nik"
                    value={formData.nik}
                    onChange={handleInputChange}
                    placeholder="16 digit NIK"
                    maxLength={16}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-blue-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Alamat (RT/RW/Dusun)
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Contoh: RT 02 / RW 05 Dusun Krajan"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Keperluan Surat
                </label>
                <textarea
                  name="purpose"
                  rows={2}
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Jelaskan singkat keperluan surat..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 font-medium text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-4 py-2 rounded-lg shadow-xs transition"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Mengirim..." : "Kirim Surat"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Detail Surat */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Detail Surat</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedLetter.trackingNumber}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLetter(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3 space-y-2.5 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400">Jenis:</span>
                <p className="font-semibold text-slate-900">{selectedLetter.letterType}</p>
              </div>
              <div>
                <span className="text-slate-400">Pemohon:</span>
                <p className="font-medium text-slate-800">{selectedLetter.applicantName} ({selectedLetter.nik})</p>
              </div>
              <div>
                <span className="text-slate-400">Status:</span>
                <p className="font-semibold text-blue-600">{selectedLetter.status}</p>
              </div>
              <div>
                <span className="text-slate-400">Catatan:</span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mt-0.5">
                  {selectedLetter.notes || "Sedang diverifikasi oleh aparatur desa."}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedLetter(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
