import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Search, 
  FileText, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  X,
  Send,
  Printer,
  MessageCircle,
  Download,
  Copy,
  Check,
  Calendar,
  User
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

export default function PortalWarga() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // Post-submission receipt modal state
  const [submittedReceipt, setSubmittedReceipt] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [copied, setCopied] = useState(false);

  // Form State with mandatory NIK
  const [formData, setFormData] = useState({
    letterType: LETTER_OPTIONS[0],
    applicantName: "",
    nik: "",
    purpose: "",
    address: "",
    phone: ""
  });

  useEffect(() => {
    loadLetters();
  }, []);

  const loadLetters = async () => {
    setLoading(true);
    const res = await getAllLetters();
    if (res && res.success) {
      setLetters(res.data);
    } else {
      setLetters([]);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "nik") {
      const numericOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericOnly }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.nik || formData.nik.length < 16) {
      setFeedback({
        type: "error",
        message: "NIK (Nomor Induk Kependudukan) wajib diisi lengkap 16 digit angka."
      });
      return;
    }

    setSubmitting(true);
    setFeedback({ type: "", message: "" });

    const res = await submitLetter(formData);
    setSubmitting(false);

    if (res && res.success) {
      const receiptData = res.data;
      setSubmittedReceipt(receiptData);
      setShowModal(false);
      setFormData({
        letterType: LETTER_OPTIONS[0],
        applicantName: "",
        nik: "",
        purpose: "",
        address: "",
        phone: ""
      });
      loadLetters();
    } else {
      setFeedback({
        type: "error",
        message: res?.message || "Gagal mengirim pengajuan surat."
      });
    }
  };

  const handleShareWhatsApp = (receipt) => {
    const phoneTarget = receipt.phone ? receipt.phone.replace(/\D/g, "") : "";
    const message = `Halo, saya telah mengajukan permohonan surat melalui SPDT Desa Mandiri.%0A%0A*BUKTI PENGAJUAN SURAT RESMI SPDT*%0A• *Nomor Resi / Tracking:* ${receipt.trackingNumber}%0A• *Jenis Surat:* ${receipt.letterType}%0A• *Nama Pemohon:* ${receipt.applicantName}%0A• *NIK:* ${receipt.nik}%0A• *Tanggal:* ${receipt.date}%0A• *Status Sekarang:* ${receipt.status}%0A%0ASilakan pantau perkembangan dokumen di portal resmi SPDT: ${window.location.origin}/#tracking`;

    const waUrl = phoneTarget.length >= 9 
      ? `https://wa.me/${phoneTarget.startsWith("0") ? "62" + phoneTarget.slice(1) : phoneTarget}?text=${message}`
      : `https://wa.me/?text=${message}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const copyReceiptCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredLetters = letters.filter((item) => {
    const term = searchFilter.toLowerCase();
    return (
      item.trackingNumber.toLowerCase().includes(term) ||
      item.letterType.toLowerCase().includes(term) ||
      item.applicantName.toLowerCase().includes(term) ||
      (item.nik && item.nik.toLowerCase().includes(term)) ||
      item.status.toLowerCase().includes(term)
    );
  });

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-black text-white px-4 sm:px-8 py-10 relative">
      {/* Background Burgundy Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#800020]/20 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl w-full mx-auto space-y-8 relative z-10">
        {/* Navigation & Header Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-bold text-white/70 hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Beranda Utama</span>
          </Link>

          <Link
            to="/portal-petugas"
            className="text-xs font-bold text-rose-300 hover:text-white transition underline underline-offset-4"
          >
            Portal Petugas (TTE) →
          </Link>
        </div>

        {/* Hero Banner for Warga Portal */}
        <div className="bg-gradient-to-r from-zinc-950 via-[#10080a] to-zinc-950 rounded-3xl p-8 sm:p-10 border border-white/15 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
          <div className="max-w-xl space-y-2 relative z-10">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Portal Pengajuan Warga
            </h1>
            <p className="text-sm sm:text-base text-white/65 font-medium leading-relaxed">
              Ajukan surat keterangan resmi, lampirkan NIK terdaftar, dan dapatkan tanda bukti digital (Nomor Resi) yang terhubung langsung ke WhatsApp Anda.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="group inline-flex items-center justify-center gap-3 bg-[#800020] hover:bg-[#9b1b3b] active:scale-95 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl border border-rose-500/40 shadow-2xl shadow-[#800020]/50 hover:shadow-[#800020]/80 transition-all duration-300 cursor-pointer shrink-0 relative z-10"
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
                : "bg-red-950/40 border-red-500/40 text-rose-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <p className="font-semibold">{feedback.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setFeedback({ type: "", message: "" })}
              className="text-white/60 hover:text-white text-xs font-bold p-1 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Main Document List Area */}
        <div className="bg-[#0c0c0c] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Daftar Pengajuan Surat Warga</h2>
              <p className="text-xs sm:text-sm text-white/50 mt-0.5">
                Total {filteredLetters.length} dokumen permohonan tercatat
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-5 h-5 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Cari NIK, Resi, atau Nama..."
                className="w-full pl-11 pr-4 py-3 text-sm bg-black border border-white/15 rounded-xl focus:outline-none focus:border-[#800020] text-white placeholder:text-white/30 transition"
              />
            </div>
          </div>

          {/* Cards for Documents */}
          <div className="space-y-4">
            {loading ? (
              <div className="py-20 text-center text-sm text-white/40 font-medium">
                Memuat data permohonan persuratan...
              </div>
            ) : filteredLetters.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <FileText className="w-10 h-10 text-white/20 mx-auto" />
                <p className="text-sm text-white/40 font-medium">
                  Belum ada data pengajuan surat. Silakan klik "Ajukan Surat Baru" untuk membuat permohonan pertama.
                </p>
              </div>
            ) : (
              filteredLetters.map((letter) => {
                const isTerbit = letter.status.toLowerCase().includes("terbit");
                return (
                  <div
                    key={letter.id}
                    className="bg-[#121212] hover:bg-[#181818] border border-white/10 hover:border-[#800020] rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 group shadow-lg"
                  >
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-sm sm:text-base font-black text-rose-300 tracking-wider">
                          {letter.trackingNumber}
                        </span>
                        <span className="text-xs font-bold text-white/80">
                          {letter.status}
                        </span>
                        <span className="text-xs text-white/40 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {letter.date}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-rose-100 transition-colors">
                        {letter.letterType}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-white/60">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-rose-400" />
                          <strong className="text-white/90">{letter.applicantName}</strong>
                        </span>
                        <span>
                          NIK: <strong className="text-white/90 font-mono">{letter.nik}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedLetter(letter)}
                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/15 active:scale-95 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl border border-white/15 transition cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Rincian</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSubmittedReceipt(letter)}
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 text-rose-200 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl border border-rose-500/30 transition cursor-pointer"
                        title="Lihat & Cetak Struk Resi"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Struk</span>
                      </button>

                      {isTerbit && (
                        <button
                          type="button"
                          onClick={() => alert(`Mengunduh dokumen PDF sah nomor ${letter.trackingNumber}`)}
                          className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#9b1b3b] active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-[#800020]/40 transition cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Unduh</span>
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

      {/* MODAL 1: FORMULIR PENGAJUAN (Mandatory NIK Input) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-[#0f0f0f] text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-white/20 my-8">
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#800020] text-white flex items-center justify-center shadow-lg shadow-[#800020]/40">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">
                    Permohonan Dokumen Baru
                  </h3>
                  <p className="text-xs text-white/50">Layanan administrasi persuratan mandiri warga desa</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-6 space-y-4 text-sm">
              {/* Jenis Surat */}
              <div>
                <label className="block font-bold text-white/90 mb-1.5 text-xs uppercase tracking-wider">
                  Jenis Surat yang Diajukan <span className="text-[#800020]">*</span>
                </label>
                <select
                  name="letterType"
                  value={formData.letterType}
                  onChange={handleInputChange}
                  className="w-full p-3.5 bg-black border border-white/20 rounded-xl focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 focus:outline-none text-white font-medium"
                  required
                >
                  {LETTER_OPTIONS.map((opt, i) => (
                    <option key={i} value={opt} className="bg-zinc-950 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nama Pemohon */}
              <div>
                <label className="block font-bold text-white/90 mb-1.5 text-xs uppercase tracking-wider">
                  Nama Lengkap Pemohon <span className="text-[#800020]">*</span>
                </label>
                <input
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleInputChange}
                  placeholder="Contoh: Budi Santoso (sesuai KTP)"
                  className="w-full p-3.5 bg-black border border-white/20 rounded-xl focus:border-[#800020] focus:outline-none text-white font-medium placeholder:text-white/30"
                  required
                />
              </div>

              {/* MANDATORY NIK INPUT */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-bold text-white/90 text-xs uppercase tracking-wider">
                    Nomor Induk Kependudukan (NIK) <span className="text-[#800020]">* Wajib</span>
                  </label>
                  <span className={`text-[11px] font-mono ${formData.nik.length === 16 ? "text-emerald-400 font-bold" : "text-white/40"}`}>
                    {formData.nik.length}/16 Digit
                  </span>
                </div>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={handleInputChange}
                  placeholder="Masukkan 16 digit NIK Anda (wajib)"
                  maxLength={16}
                  className="w-full p-3.5 bg-black border border-white/20 rounded-xl focus:border-[#800020] focus:outline-none text-white font-mono text-base font-bold placeholder:text-white/30 tracking-wider"
                  required
                />
              </div>

              {/* Alamat & Nomor WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-white/90 mb-1.5 text-xs uppercase tracking-wider">
                    Alamat Domisili (RT/RW/Dusun) <span className="text-[#800020]">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="RT 01 / RW 02 Dusun Krajan"
                    className="w-full p-3.5 bg-black border border-white/20 rounded-xl focus:border-[#800020] focus:outline-none text-white font-medium placeholder:text-white/30"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-white/90 mb-1.5 text-xs uppercase tracking-wider">
                    Nomor WhatsApp Pemohon
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Contoh: 081234567890"
                    className="w-full p-3.5 bg-black border border-white/20 rounded-xl focus:border-[#800020] focus:outline-none text-white font-medium placeholder:text-white/30"
                  />
                </div>
              </div>

              {/* Keperluan */}
              <div>
                <label className="block font-bold text-white/90 mb-1.5 text-xs uppercase tracking-wider">
                  Keperluan Permohonan <span className="text-[#800020]">*</span>
                </label>
                <textarea
                  name="purpose"
                  rows={2}
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Jelaskan secara singkat tujuan permohonan surat ini..."
                  className="w-full p-3.5 bg-black border border-white/20 rounded-xl focus:border-[#800020] focus:outline-none text-white font-medium placeholder:text-white/30"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="pt-5 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 rounded-xl border border-white/20 font-bold text-white/70 hover:text-white hover:bg-white/5 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#9b1b3b] disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-[#800020]/40 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Memproses..." : "Kirim Pengajuan"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DIGITAL RECEIPT (STRUK / NOMOR RESI RESMI) */}
      {submittedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-[#0b0b0b] text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#800020]/40 my-8 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-bold text-white/70">
                Bukti Pendaftaran Pengajuan
              </span>
              <button
                type="button"
                onClick={() => setSubmittedReceipt(null)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Digital Receipt Card Content */}
            <div id="digital-receipt-content" className="mt-5 bg-white text-black rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5 print:m-0 print:p-0">
              <div className="border-b-2 border-black/10 pb-4">
                <h4 className="text-lg font-black tracking-tight text-black">
                  TANDA BUKTI PENGAJUAN
                </h4>
                <p className="text-[11px] text-black/60 font-medium">
                  Sistem Persuratan Digital Terintegrasi (SPDT)
                </p>
              </div>

              {/* Tracking Number Highlight Box */}
              <div className="bg-zinc-100 rounded-xl p-4 text-center border border-black/10">
                <span className="text-[11px] font-bold text-black/50 uppercase tracking-widest block mb-1">
                  Nomor Resi / ID Pelacakan
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-2xl font-black text-[#800020] tracking-wider">
                    {submittedReceipt.trackingNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyReceiptCode(submittedReceipt.trackingNumber)}
                    className="p-1.5 text-black/50 hover:text-black rounded transition cursor-pointer"
                    title="Salin Nomor Resi"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="space-y-2.5 text-xs sm:text-sm border-b-2 border-dashed border-black/15 pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-black/60 font-medium">Jenis Surat:</span>
                  <span className="font-extrabold text-black text-right">{submittedReceipt.letterType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/60 font-medium">Nama Pemohon:</span>
                  <span className="font-bold text-black text-right">{submittedReceipt.applicantName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/60 font-medium">Nomor Induk Kependudukan:</span>
                  <span className="font-mono font-bold text-[#800020] text-right">{submittedReceipt.nik}</span>
                </div>
                {submittedReceipt.address && (
                  <div className="flex justify-between items-start">
                    <span className="text-black/60 font-medium">Alamat:</span>
                    <span className="font-medium text-black text-right max-w-[200px]">{submittedReceipt.address}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-black/60 font-medium">Waktu Registrasi:</span>
                  <span className="font-medium text-black text-right">{submittedReceipt.date || "Hari ini"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/60 font-medium">Status Awal:</span>
                  <span className="font-bold text-black text-right">
                    {submittedReceipt.status || "Diajukan"}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-center text-black/50 leading-relaxed italic">
                Struk ini merupakan bukti registrasi permohonan surat resmi.
              </p>
            </div>

            {/* ACTION BUTTONS (CETAK BUKTI & KIRIM KE WHATSAPP) */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrintReceipt}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl border border-white/20 shadow-md transition cursor-pointer"
              >
                <Printer className="w-4 h-4 text-white" />
                <span>Cetak Bukti</span>
              </button>

              <button
                type="button"
                onClick={() => handleShareWhatsApp(submittedReceipt)}
                className="inline-flex items-center justify-center gap-2 bg-[#800020] hover:bg-[#9b1b3b] active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl border border-rose-500/40 shadow-xl shadow-[#800020]/40 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Kirim ke WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: VIEW DETAIL LETTER */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0f0f0f] text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">
                  Rincian Dokumen
                </span>
                <h3 className="text-xl font-black text-white">{selectedLetter.trackingNumber}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLetter(null)}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-sm">
              <div>
                <span className="text-white/40 text-xs uppercase font-bold tracking-wider">Jenis Surat:</span>
                <p className="font-bold text-white text-base mt-0.5">{selectedLetter.letterType}</p>
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase font-bold tracking-wider">Data Pemohon:</span>
                <p className="font-bold text-white text-base mt-0.5">{selectedLetter.applicantName}</p>
                <p className="text-xs text-rose-300 font-mono mt-0.5">NIK: {selectedLetter.nik}</p>
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase font-bold tracking-wider">Status:</span>
                <p className="font-bold text-white mt-0.5">{selectedLetter.status}</p>
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase font-bold tracking-wider">Catatan Petugas:</span>
                <p className="text-white/80 bg-black/80 p-3.5 rounded-xl border border-white/10 mt-1 leading-relaxed text-xs">
                  {selectedLetter.notes || "Surat sedang dalam proses verifikasi."}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const item = selectedLetter;
                  setSelectedLetter(null);
                  setSubmittedReceipt(item);
                }}
                className="text-xs font-bold text-rose-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Lihat Struk</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLetter(null)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl transition cursor-pointer"
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
