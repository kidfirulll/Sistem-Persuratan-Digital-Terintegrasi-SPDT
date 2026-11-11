import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Search, 
  FileText, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowLeft,
  X,
  Send,
  Sparkles,
  Download
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
    <div className="w-full min-h-[calc(100vh-5rem)] bg-black text-white px-4 sm:px-8 py-8 sm:py-12 flex flex-col justify-start relative">
      {/* Background subtle glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#800020]/20 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl w-full mx-auto space-y-8 relative z-10">
        {/* Top Breadcrumb & Status */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-semibold text-white/70 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda Utama</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Portal Warga Terotentikasi</span>
          </div>
        </div>

        {/* Spacious Hero Banner inside Dashboard */}
        <div className="bg-gradient-to-r from-zinc-950 via-black to-zinc-950 rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300 mb-2">
              <Sparkles className="w-4 h-4 text-[#800020]" />
              <span>Layanan Mandiri Warga</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Surat Permohonan Saya
            </h1>
            <p className="text-sm sm:text-base text-white/60 font-medium mt-2 leading-relaxed">
              Pantau progres tanda tangan elektronik berkas Anda secara real-time dan ajukan surat resmi baru langsung dari perangkat Anda.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="group inline-flex items-center justify-center gap-2.5 bg-[#800020] hover:bg-[#9b1b3b] active:scale-95 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl border border-rose-500/30 shadow-2xl shadow-[#800020]/40 hover:shadow-[#800020]/70 transition-all duration-300 cursor-pointer shrink-0"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>Ajukan Surat Baru</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback.message && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-sm animate-fade-in ${
              feedback.type === "success"
                ? "bg-[#800020]/20 border-[#800020] text-rose-200"
                : "bg-black/80 border-white/20 text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              )}
              <p className="font-semibold">{feedback.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setFeedback({ type: "", message: "" })}
              className="text-white/60 hover:text-white text-xs font-bold p-1"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Main Content Area (Spacious, NO sidebars) */}
        <div className="bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Berkas Aktif Warga</h2>
              <p className="text-xs sm:text-sm text-white/50">Ditemukan {filteredLetters.length} dokumen persuratan Anda</p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-5 h-5 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Cari no. resi atau jenis surat..."
                className="w-full pl-11 pr-4 py-2.5 text-sm bg-black/60 border border-white/15 rounded-xl focus:outline-none focus:border-[#800020] text-white placeholder:text-white/30 transition"
              />
            </div>
          </div>

          {/* Large Modern Cards for Active Documents */}
          <div className="space-y-4">
            {loading ? (
              <div className="py-16 text-center text-sm text-white/40 font-medium">
                Mengambil data permohonan...
              </div>
            ) : filteredLetters.length === 0 ? (
              <div className="py-16 text-center text-sm text-white/40 font-medium">
                Tidak ada dokumen yang sesuai dengan pencarian Anda.
              </div>
            ) : (
              filteredLetters.map((letter) => {
                const isTerbit = letter.status.toLowerCase().includes("terbit");
                return (
                  <div
                    key={letter.id}
                    className="bg-black/40 hover:bg-black/70 border border-white/10 hover:border-[#800020] rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-white tracking-wide">
                          {letter.trackingNumber}
                        </span>
                        <span
                          className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                            isTerbit
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-[#800020] text-white shadow-md shadow-[#800020]/40"
                          }`}
                        >
                          {letter.status}
                        </span>
                        <span className="text-xs text-white/40 hidden sm:inline">• {letter.date}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-rose-200 transition-colors">
                        {letter.letterType}
                      </h3>

                      <p className="text-xs sm:text-sm text-white/60">
                        Atas Nama: <span className="font-semibold text-white/90">{letter.applicantName}</span> (NIK: {letter.nik})
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      <button
                        type="button"
                        onClick={() => setSelectedLetter(letter)}
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl border border-white/15 transition cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Rincian</span>
                      </button>

                      {isTerbit && (
                        <button
                          type="button"
                          onClick={() => alert(`Mengunduh berkas sah ${letter.trackingNumber}`)}
                          className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#9b1b3b] active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-[#800020]/40 transition cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Unduh PDF</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* MODAL: Formulir Pengajuan Baru */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-950 text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#800020] text-white flex items-center justify-center shadow-lg shadow-[#800020]/40">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    Formulir Permohonan Surat
                  </h3>
                  <p className="text-xs text-white/50">Layanan administrasi persuratan mandiri warga</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-6 space-y-4 text-sm">
              <div>
                <label className="block font-bold text-white/90 mb-1.5 text-xs uppercase tracking-wider">
                  Jenis Surat yang Dibutuhkan
                </label>
                <select
                  name="letterType"
                  value={formData.letterType}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-black/70 border border-white/20 rounded-xl focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 focus:outline-none text-white font-medium"
                  required
                >
                  {LETTER_OPTIONS.map((opt, i) => (
                    <option key={i} value={opt} className="bg-zinc-900 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-white/90 mb-1.5 text-xs uppercase tracking-wider">
                    Nama Lengkap Pemohon
                  </label>
                  <input
                    type="text"
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleInputChange}
                    placeholder="Sesuai KTP"
                    className="w-full p-3 bg-black/70 border border-white/20 rounded-xl focus:border-[#800020] focus:outline-none text-white font-medium placeholder:text-white/30"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-white/90 mb-1.5 text-xs uppercase tracking-wider">
                    Nomor Induk Kependudukan (NIK)
                  </label>
                  <input
                    type="text"
                    name="nik"
                    value={formData.nik}
                    onChange={handleInputChange}
                    placeholder="16 digit NIK"
                    maxLength={16}
                    className="w-full p-3 bg-black/70 border border-white/20 rounded-xl focus:border-[#800020] focus:outline-none text-white font-medium placeholder:text-white/30"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-white/90 mb-1.5 text-xs uppercase tracking-wider">
                  Alamat Lengkap (RT/RW/Dusun)
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Contoh: RT 02 / RW 05 Dusun Krajan"
                  className="w-full p-3 bg-black/70 border border-white/20 rounded-xl focus:border-[#800020] focus:outline-none text-white font-medium placeholder:text-white/30"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-white/90 mb-1.5 text-xs uppercase tracking-wider">
                  Keperluan Permohonan
                </label>
                <textarea
                  name="purpose"
                  rows={2}
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Jelaskan secara singkat keperluan surat..."
                  className="w-full p-3 bg-black/70 border border-white/20 rounded-xl focus:border-[#800020] focus:outline-none text-white font-medium placeholder:text-white/30"
                  required
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/20 font-bold text-white/70 hover:text-white hover:bg-white/5 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#9b1b3b] disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-[#800020]/40 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Memproses..." : "Kirim Permohonan"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Detail Surat */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-950 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] font-black text-[#800020] uppercase tracking-wider">Rincian Dokumen</span>
                <h3 className="text-xl font-black text-white">{selectedLetter.trackingNumber}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLetter(null)}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-sm">
              <div>
                <span className="text-white/40 text-xs uppercase font-bold tracking-wider">Jenis Surat:</span>
                <p className="font-bold text-white text-base mt-0.5">{selectedLetter.letterType}</p>
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase font-bold tracking-wider">Pemohon:</span>
                <p className="font-semibold text-white/90 mt-0.5">{selectedLetter.applicantName} ({selectedLetter.nik})</p>
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase font-bold tracking-wider">Status:</span>
                <p className="font-extrabold text-rose-300 mt-0.5">{selectedLetter.status}</p>
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase font-bold tracking-wider">Catatan Petugas:</span>
                <p className="text-white/80 bg-black/60 p-3 rounded-xl border border-white/10 mt-1 leading-relaxed">
                  {selectedLetter.notes || "Surat sedang dalam proses tahapan tanda tangan berjenjang."}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedLetter(null)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl transition"
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