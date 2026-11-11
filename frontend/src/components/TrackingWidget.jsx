import React, { useState } from "react";
import { 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  QrCode, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Check,
  Calendar,
  User,
  Fingerprint
} from "lucide-react";
import { getLetterByTrackingId } from "../services/api";

const STAGES = [
  { key: "diajukan", label: "Diajukan", role: "Pemohon" },
  { key: "rt", label: "Pengantar RT", role: "Ketua RT" },
  { key: "rw", label: "Validasi RW", role: "Ketua RW" },
  { key: "kasun", label: "Audit Dusun", role: "Kasun" },
  { key: "kades", label: "TTE Kades", role: "Kepala Desa" },
  { key: "terbit", label: "Terbit Sah", role: "BSrE Certified" }
];

export default function TrackingWidget({ initialId = "" }) {
  const [trackingNumber, setTrackingNumber] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!trackingNumber.trim()) {
      setErrorMsg("Ketik Nomor Resi pengajuan surat Anda.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setResult(null);

    const response = await getLetterByTrackingId(trackingNumber.trim());
    setLoading(false);

    if (response && response.success) {
      setResult(response.data);
    } else {
      setErrorMsg(
        response?.message || "Nomor Resi tidak ditemukan dalam basis data."
      );
    }
  };

  return (
    <div className="w-full relative py-12 sm:py-20 px-4 sm:px-8 overflow-hidden flex flex-col justify-center items-center">
      {/* BACKGROUND PATTERN / CORAK:
          Subtle geometric dot-grid & radial Burgundy glow matrix overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.05]" 
        style={{
          backgroundImage: `radial-gradient(#800020 1.5px, transparent 1.5px), radial-gradient(#000000 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />
      {/* Decorative Diagonal Stripes Pattern Accent */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#800020]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-rose-950/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Ambient Circuit Lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col justify-center items-center">
        {/* Header Title with High-Contrast Typography */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#800020]">
            <Fingerprint className="w-4 h-4 text-[#800020]" />
            <span>Sistem Pelacakan Berkas Terintegrasi</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-tight">
            Pantau Status Berkas Desa
          </h2>

          <p className="text-sm sm:text-base text-black/60 font-medium leading-relaxed">
            Ketik nomor resi Anda untuk melihat progres penandatanganan dan validasi berjenjang secara live dari perangkat Anda.
          </p>
        </div>

        {/* HIGH-IMPACT PROMINENT SEARCH CONSOLE */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          <form 
            onSubmit={handleSearch} 
            className="group relative bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border-2 border-black/15 hover:border-[#800020] focus-within:border-[#800020] focus-within:ring-4 focus-within:ring-[#800020]/15 shadow-2xl shadow-[#800020]/10 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex items-center pl-4 pr-2 flex-1">
                <Search className="w-6 h-6 text-[#800020] shrink-0 mr-3 group-focus-within:scale-110 transition-transform" />
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Masukkan Nomor Resi (misal: SPDT-2026-001)"
                  className="w-full py-3 text-base sm:text-lg font-bold text-black bg-transparent outline-none placeholder:text-black/35 tracking-wide"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#800020] hover:bg-[#9b1b3b] active:scale-95 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl sm:rounded-2xl shadow-xl shadow-[#800020]/30 hover:shadow-[#800020]/50 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                {loading ? (
                  <span>Mencari...</span>
                ) : (
                  <>
                    <span>Lacak Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Helper Subtext */}
          <div className="flex items-center justify-between text-[11px] text-black/50 px-3 pt-2 font-medium">
            <span>Contoh: SPDT-2026-001</span>
            <span>Update langsung dari database desa</span>
          </div>
        </div>

        {/* Error Feedback Message */}
        {errorMsg && (
          <div className="max-w-2xl mx-auto w-full mb-6 p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-950 text-xs sm:text-sm flex items-center justify-between gap-3 animate-fade-in shadow-md">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
              <p className="font-semibold">{errorMsg}</p>
            </div>
            <button
              type="button"
              onClick={() => setErrorMsg("")}
              className="text-xs font-bold text-rose-700 hover:text-black p-1"
            >
              Tutup
            </button>
          </div>
        )}

        {/* RESULT TRACKING CARD (INTERACTIVE MODERN TIMELINE) */}
        {result && (
          <div className="max-w-3xl w-full mx-auto bg-white border-2 border-black/10 hover:border-[#800020]/40 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6 transition-all duration-300 relative overflow-hidden animate-fade-in">
            {/* Ambient Watermark Pattern */}
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#800020]/5 rounded-full pointer-events-none" />

            {/* Document Header Identity */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-5 border-b-2 border-black/10 gap-4">
              <div className="space-y-1">
                <span className="font-mono text-2xl font-black text-[#800020] tracking-wider block">
                  {result.trackingNumber}
                </span>
                <h3 className="text-xl font-black text-black">
                  {result.letterType}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black/60 pt-1">
                  <span>
                    Pemohon: <strong className="text-black">{result.applicantName}</strong>
                  </span>
                  <span>
                    NIK: <strong className="text-black font-mono">{result.nik}</strong>
                  </span>
                </div>
              </div>

              <div className="sm:text-right space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#800020] text-white shadow-md shadow-[#800020]/30 inline-block">
                  Status: {result.status}
                </span>
                <p className="text-xs text-black/40 font-medium">
                  Tanggal Pengajuan: {result.date}
                </p>
              </div>
            </div>

            {/* Interactive Step-by-Step Progress Ribbon */}
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-black/40 block">
                Progres Validasi Berjenjang:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
                {STAGES.map((stg, i) => {
                  const stageIndex = result.currentStage ?? 0;
                  const isPassed = i <= stageIndex;
                  const isCurrent = i === stageIndex;

                  return (
                    <div
                      key={stg.key}
                      className={`p-3 rounded-2xl border-2 text-center transition-all duration-300 flex flex-col justify-between ${
                        isCurrent
                          ? "bg-[#800020] border-[#800020] text-white shadow-lg shadow-[#800020]/30 scale-[1.03]"
                          : isPassed
                          ? "bg-rose-50/80 border-[#800020]/30 text-[#800020]"
                          : "bg-zinc-50 border-black/10 text-black/40"
                      }`}
                    >
                      <span className={`text-[10px] font-mono font-black block ${isCurrent ? "text-white" : "text-black/40"}`}>
                        0{i + 1}
                      </span>
                      <span className={`text-xs font-black block truncate my-1 ${isCurrent ? "text-white" : isPassed ? "text-[#800020]" : "text-black/60"}`}>
                        {stg.label}
                      </span>
                      <span className={`text-[9px] font-bold block truncate ${isCurrent ? "text-rose-200" : "text-black/40"}`}>
                        {stg.role}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notes / Legal Footprint */}
            {result.notes && (
              <div className="bg-zinc-50 p-4 rounded-2xl border border-black/10 text-xs text-black/80 space-y-1">
                <span className="font-extrabold text-black uppercase tracking-wider text-[10px] block">
                  Catatan Verifikator Desa:
                </span>
                <p className="leading-relaxed">{result.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
