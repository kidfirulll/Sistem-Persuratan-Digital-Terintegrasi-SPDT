import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FileText, ArrowRight, ShieldCheck, Menu, X, PlusCircle, Home } from "lucide-react";

export default function PublicLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDashboard = location.pathname.startsWith("/dashboard");

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans pb-16 md:pb-0">
      {/* Sticky Mobile-First Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-15 sm:h-16 flex items-center justify-between">
          {/* Logo & Portal Identity */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-2xs group-hover:bg-blue-600 transition-colors">
              <FileText className="w-4.5 h-4.5 text-blue-400 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none">
                  SPDT
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 leading-none">
                  Desa Resmi
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium leading-none mt-0.5">
                Sistem Persuratan Digital
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                !isDashboard
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
              }`}
            >
              Beranda
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                isDashboard
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
              }`}
            >
              Surat Saya
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-xs transition"
            >
              <span>{isDashboard ? "Ajukan Surat" : "Masuk"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* Mobile Quick Action & Hamburger */}
          <div className="flex items-center gap-1.5 md:hidden">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1 bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-2xs active:bg-blue-700 transition"
            >
              <span>Ajukan</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 animate-fade-in shadow-lg">
            <Link
              to="/"
              onClick={closeMenu}
              className={`flex items-center justify-between p-2.5 rounded-xl text-sm font-bold ${
                !isDashboard ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>Beranda</span>
              <span className="text-xs text-slate-400">Halaman Utama</span>
            </Link>
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className={`flex items-center justify-between p-2.5 rounded-xl text-sm font-bold ${
                isDashboard ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>Surat Permohonan Saya</span>
              <span className="text-xs text-blue-600 font-semibold">Riwayat & Ajukan</span>
            </Link>
            <a
              href="#tracking"
              onClick={closeMenu}
              className="flex items-center justify-between p-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <span>Lacak Nomor Resi</span>
              <span className="text-xs text-slate-400">Cek Status</span>
            </a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Structured Navy Footer with Mobile Clean Layout */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-12 sm:mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-slate-800">
            {/* Identity */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-white">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-2xs">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="font-black text-sm sm:text-base tracking-tight text-white">SPDT Desa Mandiri</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Sistem Persuratan Digital Terintegrasi untuk pelayanan warga yang cepat, transparan, dan terverifikasi tanda tangan elektronik (TTE).
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-400">Navigasi Portal</h4>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-1.5 text-xs">
                <Link to="/" className="text-slate-300 hover:text-white transition">Beranda Layanan</Link>
                <Link to="/dashboard" className="text-slate-300 hover:text-white transition">Surat Saya</Link>
                <a href="#tracking" className="text-slate-300 hover:text-white transition">Lacak Progres Resi</a>
                <Link to="/dashboard" className="text-slate-300 hover:text-white transition">Ajukan Baru</Link>
              </div>
            </div>

            {/* Standards */}
            <div className="space-y-2">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-400">Keabsahan & Standar</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dokumen dilengkapi QR-Code resmi dan tanda tangan digital sah berstandar pemerintahan desa.
              </p>
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Terverifikasi Standar Desa Digital</span>
              </div>
            </div>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-slate-400 text-center sm:text-left">
            <p>© 2026 SPDT. Pemerintah Desa. Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-medium">Layanan Digital Aktif 24 Jam</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Bottom App Bar for Mobile Native Experience */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-4 flex items-center justify-around md:hidden shadow-lg">
        <Link
          to="/"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            !isDashboard ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Home className="w-4.5 h-4.5" />
          <span>Beranda</span>
        </Link>
        <a
          href="#tracking"
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-slate-500 hover:text-slate-800"
        >
          <FileText className="w-4.5 h-4.5" />
          <span>Cek Resi</span>
        </a>
        <Link
          to="/dashboard"
          className="flex items-center gap-1.5 bg-blue-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-xs active:scale-95 transition"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Ajukan Surat</span>
        </Link>
      </nav>
    </div>
  );
}
