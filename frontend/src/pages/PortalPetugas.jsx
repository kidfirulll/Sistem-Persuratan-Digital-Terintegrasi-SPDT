import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  Stamp,
  Lock,
  UserCheck,
  LogOut,
  Calendar,
  ChevronRight,
  ShieldCheck,
  KeyRound
} from "lucide-react";
import { getAllLetters, approveLetterTTE } from "../services/api";

// Available Officer Accounts
const ACCOUNTS = {
  rt: {
    username: "rt",
    password: "123",
    roleName: "Ketua RT",
    fullTitle: "Rukun Tetangga (RT 01)",
    filterStage: "rt",
    nextStageLabel: "Proses RW"
  },
  rw: {
    username: "rw",
    password: "123",
    roleName: "Ketua RW",
    fullTitle: "Rukun Warga (RW 02)",
    filterStage: "rw",
    nextStageLabel: "Proses Kasun"
  },
  kasun: {
    username: "kasun",
    password: "123",
    roleName: "Kepala Dusun (Kasun)",
    fullTitle: "Kepala Dusun Krajan",
    filterStage: "kasun",
    nextStageLabel: "Proses Kades"
  },
  kades: {
    username: "kades",
    password: "123",
    roleName: "Kepala Desa (Kades)",
    fullTitle: "Kepala Desa Mandiri",
    filterStage: "kades",
    nextStageLabel: "Terbit"
  }
};

export default function PortalPetugas() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("spdt_petugas_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Login Form State
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Portal State
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(null);

  // TTE Modal State
  const [signingModal, setSigningModal] = useState({
    isOpen: false,
    letter: null,
    note: ""
  });
  const [isSigning, setIsSigning] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (currentUser) {
      loadLetters();
    }
  }, [currentUser]);

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

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    const usernameInput = loginForm.username.trim().toLowerCase();
    const account = ACCOUNTS[usernameInput];

    if (!account) {
      setLoginError("Username tidak terdaftar. Gunakan: rt, rw, kasun, atau kades.");
      return;
    }

    if (loginForm.password !== account.password) {
      setLoginError("Password salah! (Password default: 123)");
      return;
    }

    // Save and login
    const sessionData = {
      username: account.username,
      roleName: account.roleName,
      fullTitle: account.fullTitle,
      filterStage: account.filterStage,
      nextStageLabel: account.nextStageLabel
    };

    localStorage.setItem("spdt_petugas_user", JSON.stringify(sessionData));
    setCurrentUser(sessionData);
    setLoginForm({ username: "", password: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("spdt_petugas_user");
    setCurrentUser(null);
  };

  const showNotification = (type, text) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage({ type: "", text: "" }), 4000);
  };

  const handleOpenSigningModal = (letter) => {
    setSigningModal({
      isOpen: true,
      letter,
      note: `Dokumen ${letter.trackingNumber} telah diverifikasi dan disetujui oleh ${currentUser?.roleName}.`
    });
  };

  const handleExecuteApproval = async (e) => {
    e.preventDefault();
    if (!signingModal.letter) return;

    setIsSigning(true);
    const letter = signingModal.letter;

    // Call backend API
    const res = await approveLetterTTE(letter.id, {
      officialRole: currentUser.username,
      officialName: currentUser.roleName,
      note: signingModal.note
    });

    setIsSigning(false);

    if (res && res.success) {
      setSigningModal({ isOpen: false, letter: null, note: "" });
      showNotification("success", `Dokumen ${letter.trackingNumber} berhasil disetujui & TTE.`);
      loadLetters();
    } else {
      // Local fallback in case backend is unreachable
      setLetters((prev) =>
        prev.map((item) =>
          item.id === letter.id
            ? {
                ...item,
                status: currentUser.nextStageLabel,
                notes: signingModal.note
              }
            : item
        )
      );
      setSigningModal({ isOpen: false, letter: null, note: "" });
      showNotification("success", `Dokumen ${letter.trackingNumber} berhasil disetujui & TTE.`);
    }
  };

  // Helper status verifikasi berjenjang
  const ROLE_HIERARCHY = {
    rt: { stage: 1, label: "Ketua RT", waitingMsg: "Menunggu Verifikasi RT" },
    rw: { stage: 2, label: "Ketua RW", waitingMsg: "Menunggu Verifikasi RW" },
    kasun: { stage: 3, label: "Kepala Dusun (Kasun)", waitingMsg: "Menunggu Verifikasi Kasun" },
    kades: { stage: 4, label: "Kepala Desa (Kades)", waitingMsg: "Menunggu TTE Kades" }
  };

  const getApprovalStatusForRole = (letter, roleKey) => {
    const isTerbit = letter.status.toLowerCase().includes("terbit") || (letter.currentStage && letter.currentStage >= 5);
    const approvedList = letter.approvedBy || [];
    const hasApproved = approvedList.includes(roleKey);

    const roleInfo = ROLE_HIERARCHY[roleKey] || { stage: 1 };
    const letterStage = letter.currentStage !== undefined ? letter.currentStage : 1;

    // 1. Sudah disetujui oleh role ini
    if (hasApproved) {
      return {
        canApprove: false,
        statusText: "Sudah Anda Setujui & TTE",
        badgeClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
        icon: "approved"
      };
    }

    // 2. Jika dokumen sudah terbit sah
    if (isTerbit) {
      return {
        canApprove: false,
        statusText: "Dokumen Terbit Sah",
        badgeClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
        icon: "approved"
      };
    }

    // 3. Tepat giliran role ini untuk verifikasi
    if (letterStage === roleInfo.stage) {
      return {
        canApprove: true,
        statusText: "Menunggu Tindakan Anda",
        badgeClass: "text-rose-300 bg-[#800020]/20 border-rose-500/30",
        icon: "action"
      };
    }

    // 4. Belum gilirannya (masih menunggu tahap sebelumnya)
    if (letterStage < roleInfo.stage) {
      return {
        canApprove: false,
        statusText: `Menunggu Tahap Sebelumnya`,
        badgeClass: "text-amber-400/90 bg-amber-500/10 border-amber-500/20",
        icon: "waiting"
      };
    }

    // 5. Sudah melewati tahap role ini
    return {
      canApprove: false,
      statusText: "Tahap Selesai Diproses",
      badgeClass: "text-white/60 bg-white/5 border-white/10",
      icon: "passed"
    };
  };
  const filteredLetters = letters.filter((item) => {
    const term = searchFilter.toLowerCase();
    const matchesSearch =
      item.trackingNumber.toLowerCase().includes(term) ||
      item.letterType.toLowerCase().includes(term) ||
      item.applicantName.toLowerCase().includes(term) ||
      (item.nik && item.nik.toLowerCase().includes(term));

    return matchesSearch;
  });

  // ==========================================
  // VIEW 1: LOGIN PAGE FOR OFFICIALS
  // ==========================================
  if (!currentUser) {
    return (
      <div className="w-full min-h-[calc(100vh-5rem)] bg-black text-white px-4 sm:px-8 py-16 flex flex-col justify-center items-center relative overflow-hidden selection:bg-[#800020] selection:text-white">
        {/* Subtle Ambient Burgundy Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#800020]/20 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-md w-full relative z-10 space-y-6">
          {/* Header Identity */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#800020] text-white flex items-center justify-center mx-auto shadow-xl shadow-[#800020]/40 border border-white/10">
              <Stamp className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-2">
              Masuk Portal Petugas
            </h1>
            <p className="text-xs sm:text-sm text-white/50">
              Otorisasi persetujuan surat dan TTE berjenjang desa
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-rose-200 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Username Akun
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
                  placeholder="rt / rw / kasun / kades"
                  className="w-full p-3.5 bg-black border border-white/20 rounded-xl focus:outline-none focus:border-[#800020] text-white font-medium text-sm placeholder:text-white/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Ketik password Anda (123)"
                  className="w-full p-3.5 bg-black border border-white/20 rounded-xl focus:outline-none focus:border-[#800020] text-white font-medium text-sm placeholder:text-white/30"
                  required
                />
              </div>

              {/* Quick Fill Chips for Demo */}
              <div className="pt-1">
                <span className="text-[11px] text-white/40 block mb-1.5">Pilih Akun Cepat (Password: 123):</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {Object.keys(ACCOUNTS).map((usr) => (
                    <button
                      key={usr}
                      type="button"
                      onClick={() => setLoginForm({ username: usr, password: "123" })}
                      className="py-1.5 text-xs font-mono font-bold uppercase rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 transition"
                    >
                      {usr}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 bg-[#800020] hover:bg-[#9b1b3b] active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#800020]/40 transition cursor-pointer"
              >
                Masuk ke Workspace
              </button>
            </form>
          </div>

          <div className="text-center">
            <Link to="/" className="text-xs text-white/50 hover:text-white transition">
              ← Kembali ke Beranda SPDT
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: LOGGED IN WORKSPACE
  // ==========================================
  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-black text-white px-4 sm:px-8 py-10 relative selection:bg-[#800020] selection:text-white">
      {/* Background Burgundy Glow */}
      <div className="absolute top-0 left-1/3 w-[650px] h-[350px] bg-[#800020]/20 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl w-full mx-auto space-y-8 relative z-10">
        {/* Top Bar with Officer Profile & Logout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#800020] flex items-center justify-center text-white font-black">
              <Stamp className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block text-sm">{currentUser.fullTitle}</span>
              <span className="text-[11px] text-white/50">Username: @{currentUser.username}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <Link
              to="/portal-warga"
              className="text-xs text-white/60 hover:text-white transition"
            >
              Portal Warga
            </Link>
            <span className="text-white/20">•</span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 hover:text-white border border-white/10 transition text-xs font-bold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Hero Banner for Officer Workspace */}
        <div className="bg-gradient-to-r from-zinc-950 via-[#12080a] to-zinc-950 rounded-3xl p-8 sm:p-10 border border-white/15 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Workspace Persetujuan & TTE
            </h1>
            <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
              Selamat datang, <strong>{currentUser.roleName}</strong>. Tinjau permohonan surat warga yang masuk dan lakukan otorisasi tanda tangan elektronik.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-black/60 p-4 rounded-2xl border border-white/10">
            <div>
              <span className="text-[10px] text-white/40 uppercase font-bold block">
                Total Dokumen
              </span>
              <span className="text-2xl font-black text-rose-300 font-mono">
                {letters.length}
              </span>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage.text && (
          <div className="p-4 rounded-2xl bg-[#800020]/30 border border-[#800020] text-rose-100 flex items-center justify-between gap-4 animate-fade-in shadow-xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" />
              <p className="text-sm font-semibold">{toastMessage.text}</p>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage({ type: "", text: "" })}
              className="text-white/60 hover:text-white text-xs font-bold p-1 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Main Document Workspace */}
        <div className="bg-[#0c0c0c] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">Daftar Dokumen Masuk</h2>
              <p className="text-xs text-white/50">Tinjau dan proses berkas administrasi</p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Cari Resi, NIK, atau Nama..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-black border border-white/15 rounded-xl focus:outline-none focus:border-[#800020] text-white placeholder:text-white/30 transition"
              />
            </div>
          </div>

          {/* Letter List */}
          {loading ? (
            <div className="py-20 text-center text-sm text-white/40 font-medium">
              Memuat data antrean surat...
            </div>
          ) : filteredLetters.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <FileText className="w-10 h-10 text-white/20 mx-auto" />
              <p className="text-sm text-white/40 font-medium">
                Belum ada data permohonan surat yang masuk dalam sistem.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLetters.map((letter) => {
                const roleState = getApprovalStatusForRole(letter, currentUser?.username);

                return (
                  <div
                    key={letter.id}
                    className="bg-[#121212] hover:bg-[#181818] border border-white/10 hover:border-[#800020] rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="font-mono text-sm font-black text-rose-300">
                          {letter.trackingNumber}
                        </span>
                        <span className="text-xs font-bold text-white/70">
                          {letter.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {letter.letterType}
                        </h3>
                        <p className="text-xs text-white/60 mt-1">
                          Pemohon: <strong className="text-white">{letter.applicantName}</strong> (NIK: {letter.nik})
                        </p>
                        {letter.purpose && (
                          <p className="text-xs text-white/50 mt-1 line-clamp-2">
                            Keperluan: {letter.purpose}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setSelectedLetter(letter)}
                        className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white font-bold cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Rincian</span>
                      </button>

                      {roleState.canApprove ? (
                        <button
                          type="button"
                          onClick={() => handleOpenSigningModal(letter)}
                          className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#9b1b3b] active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-[#800020]/40 transition cursor-pointer"
                        >
                          <Stamp className="w-3.5 h-3.5" />
                          <span>Setujui & TTE</span>
                        </button>
                      ) : (
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${roleState.badgeClass}`}>
                          {roleState.icon === "approved" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                          {roleState.icon === "waiting" && <AlertCircle className="w-3.5 h-3.5 text-amber-400" />}
                          <span>{roleState.statusText}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: TTE SIGNING CONFIRMATION */}
      {signingModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-[#0f0f0f] text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#800020]/50 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#800020] flex items-center justify-center text-white">
                  <Stamp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    Persetujuan & TTE
                  </h3>
                  <p className="text-xs text-white/50">{currentUser?.fullTitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSigningModal({ isOpen: false, letter: null, note: "" })}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteApproval} className="mt-5 space-y-4 text-sm">
              <div className="bg-black/80 p-3.5 rounded-xl border border-white/10 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/40">Resi:</span>
                  <span className="font-mono font-bold text-rose-300">{signingModal.letter?.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Jenis:</span>
                  <span className="font-bold text-white">{signingModal.letter?.letterType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Pemohon:</span>
                  <span className="text-white">{signingModal.letter?.applicantName} ({signingModal.letter?.nik})</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-white/90 mb-1 text-xs uppercase tracking-wider">
                  Catatan Verifikasi Petugas
                </label>
                <textarea
                  rows={3}
                  value={signingModal.note}
                  onChange={(e) => setSigningModal((prev) => ({ ...prev, note: e.target.value }))}
                  className="w-full p-3 bg-black border border-white/20 rounded-xl focus:border-[#800020] focus:outline-none text-white text-xs leading-relaxed"
                  required
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSigningModal({ isOpen: false, letter: null, note: "" })}
                  className="px-4 py-2.5 rounded-xl border border-white/20 font-bold text-white/70 hover:text-white transition cursor-pointer text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSigning}
                  className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#9b1b3b] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg shadow-[#800020]/40 transition cursor-pointer"
                >
                  <Stamp className="w-4 h-4" />
                  <span>{isSigning ? "Memproses..." : "Setujui & TTE"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DETAIL LETTER */}
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

            <div className="py-4 space-y-3 text-sm">
              <div>
                <span className="text-white/40 text-xs uppercase font-bold tracking-wider">Jenis Permohonan:</span>
                <p className="font-bold text-white text-base mt-0.5">{selectedLetter.letterType}</p>
              </div>
              <div className="bg-black/80 p-3.5 rounded-xl border border-white/10 space-y-1 text-xs">
                <span className="text-white/40 uppercase font-bold tracking-wider block">Data Pemohon:</span>
                <p className="text-white font-semibold">{selectedLetter.applicantName}</p>
                <p className="text-rose-300 font-mono">NIK: {selectedLetter.nik}</p>
                {selectedLetter.address && <p className="text-white/70">Alamat: {selectedLetter.address}</p>}
                {selectedLetter.phone && <p className="text-white/70">Kontak: {selectedLetter.phone}</p>}
              </div>
              {selectedLetter.purpose && (
                <div>
                  <span className="text-white/40 text-xs uppercase font-bold tracking-wider">Keperluan:</span>
                  <p className="text-white/80 mt-0.5 text-xs">{selectedLetter.purpose}</p>
                </div>
              )}
              <div>
                <span className="text-white/40 text-xs uppercase font-bold tracking-wider">Catatan Terakhir:</span>
                <p className="text-white/80 bg-black/60 p-3 rounded-xl border border-white/10 mt-1 text-xs leading-relaxed">
                  {selectedLetter.notes || "Belum ada catatan khusus."}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
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
