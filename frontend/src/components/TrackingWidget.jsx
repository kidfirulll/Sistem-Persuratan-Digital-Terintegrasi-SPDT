import React, { useState } from "react";
import { Search, CheckCircle2, Clock, AlertCircle, FileCheck2, ArrowRight } from "lucide-react";
import { getLetterByTrackingId } from "../services/api";

const STAGES = [
  { key: "diajukan", label: "Diajukan", role: "Pemohon" },
  { key: "rt", label: "RT", role: "Pengantar RT" },
  { key: "rw", label: "RW", role: "Verifikasi RW" },
  { key: "kasun", label: "Kasun", role: "Kepala Dusun" },
  { key: "kades", label: "Kades", role: "TTE Kades" },
  { key: "terbit", label: "Terbit", role: "Dokumen Sah" }
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
        response?.message || "Nomor Resi tidak ditemukan. Pastikan format nomor resi benar."
      );
    }
  };

  const handleQuickFill = (code) => {
    setTrackingNumber(code);
    fetchQuick(code);
  };

  const fetchQuick = async (code) => {
    setLoading(true);
    setErrorMsg("");
    setResult(null);
    const response = await getLetterByTrackingId(code);
    setLoading(false);
    if (response && response.success) {
      setResult(response.data);
    } else {
      setErrorMsg(response?.message || "Nomor resi tidak ditemukan.");
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs p-4 sm:p-7 transition-all">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[11px] sm:text-xs font-bold rounded-full border border-blue-200/60 mb-2">
            Lacak Real-Time
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            Pantau Status Surat Desa
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Masukkan Nomor Resi yang Anda peroleh saat pengajuan berkas.
          </p>
        </div>

        {/* Search Bar - Seamless on Small Screen */}
        <form onSubmit={handleSearch} className="mb-2.5">
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Contoh: SPDT-2026-001"
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-2xs transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              {loading ? (
                <span>Mencari...</span>
              ) : (
                <>
                  <span>Lacak Surat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Sample Numbers - Mobile horizontal scrolling pills */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 overflow-x-auto pb-1 mb-4 no-scrollbar">
          <span className="text-slate-400 shrink-0">Coba nomor:</span>
          <button
            type="button"
            onClick={() => handleQuickFill("SPDT-2026-001")}
            className="font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200/80 shrink-0 transition"
          >
            SPDT-2026-001 (Terbit)
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("SPDT-2026-002")}
            className="font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200/80 shrink-0 transition"
          >
            SPDT-2026-002 (Kasun)
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("SPDT-2026-003")}
            className="font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200/80 shrink-0 transition"
          >
            SPDT-2026-003 (RT)
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2 mb-4 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Resi Tidak Ditemukan</p>
              <p className="text-amber-800 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Tracking Result Card */}
        {result && (
          <div className="border border-blue-100 bg-slate-50/70 rounded-2xl p-3.5 sm:p-5 mt-3">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Nomor Resi Pelayanan
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  {result.trackingNumber}
                </h3>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">
                  {result.letterType}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-blue-600 text-white shadow-2xs">
                  {result.status}
                </span>
                <span className="text-[11px] text-slate-500">
                  Diajukan: {result.date}
                </span>
              </div>
            </div>

            {/* Applicant details */}
            <div className="py-2.5 text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1 border-b border-slate-200">
              <p>Pemohon: <span className="font-bold text-slate-900">{result.applicantName}</span></p>
              <p>NIK: <span className="font-bold text-slate-900">{result.nik}</span></p>
            </div>

            {/* Mobile-Optimized Timeline Display */}
            <div className="py-4">
              <p className="text-xs font-bold text-slate-800 mb-3">
                Tahapan Verifikasi Berjenjang:
              </p>

              {/* Mobile Timeline: Vertical Stepper on small screens, Horizontal on tablet/desktop */}
              <div className="space-y-2 sm:hidden">
                {STAGES.map((stg, index) => {
                  const isPassed = index < result.currentStage;
                  const isCurrent = index === result.currentStage;
                  const stageDetail = result.stages ? result.stages[index] : null;

                  return (
                    <div
                      key={stg.key}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border transition ${
                        isCurrent
                          ? "bg-blue-50 border-blue-400 shadow-2xs"
                          : isPassed
                          ? "bg-white border-slate-200"
                          : "bg-slate-50/40 border-slate-200/60 opacity-60"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isPassed
                            ? "bg-emerald-600 text-white"
                            : isCurrent
                            ? "bg-blue-600 text-white ring-2 ring-blue-200"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : isCurrent ? (
                          <Clock className="w-4 h-4 animate-spin-slow" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-bold ${
                              isCurrent ? "text-blue-700" : isPassed ? "text-slate-900" : "text-slate-500"
                            }`}
                          >
                            {stg.label} ({stg.role})
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                              Proses
                            </span>
                          )}
                        </div>
                        {stageDetail?.timestamp && stageDetail.timestamp !== "-" && (
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {stageDetail.timestamp}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tablet/Desktop Horizontal Grid */}
              <div className="hidden sm:grid sm:grid-cols-6 gap-1.5">
                {STAGES.map((stg, index) => {
                  const isPassed = index < result.currentStage;
                  const isCurrent = index === result.currentStage;
                  const stageDetail = result.stages ? result.stages[index] : null;

                  return (
                    <div
                      key={stg.key}
                      className={`flex flex-col items-center text-center p-2 rounded-xl border transition ${
                        isCurrent
                          ? "bg-blue-50 border-blue-400 shadow-2xs"
                          : isPassed
                          ? "bg-white border-slate-200"
                          : "bg-slate-50/50 border-slate-200/60 opacity-60"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 ${
                          isPassed
                            ? "bg-emerald-600 text-white"
                            : isCurrent
                            ? "bg-blue-600 text-white ring-2 ring-blue-200"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : isCurrent ? (
                          <Clock className="w-4 h-4 animate-spin-slow" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>

                      <span
                        className={`text-xs font-bold leading-tight ${
                          isCurrent
                            ? "text-blue-700"
                            : isPassed
                            ? "text-slate-900"
                            : "text-slate-400"
                        }`}
                      >
                        {stg.label}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5">
                        {stg.role}
                      </span>

                      {stageDetail?.timestamp && stageDetail.timestamp !== "-" && (
                        <span className="text-[9px] text-blue-600 font-medium mt-1 leading-tight line-clamp-1">
                          {stageDetail.timestamp}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Note & Download action */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
              <div className="text-slate-600">
                <span className="font-bold text-slate-800">Catatan: </span>
                {result.notes || "Pengajuan Anda dalam proses verifikasi pihak desa."}
              </div>

              {result.currentStage >= 5 && (
                <button
                  type="button"
                  onClick={() => alert(`Mengunduh dokumen surat resmi bertanda tangan elektronik (${result.trackingNumber})`)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-2xs transition shrink-0 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Unduh Surat (PDF)</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
