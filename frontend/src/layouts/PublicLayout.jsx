import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  FileText, 
  ArrowRight, 
  Menu, 
  X, 
  Home, 
  Search,
  Users,
  Stamp
} from "lucide-react";

export default function PublicLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isWarga = location.pathname.startsWith("/portal-warga") || location.pathname.startsWith("/dashboard");
  const isPetugas = location.pathname.startsWith("/portal-petugas");
  const isHome = location.pathname === "/";

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-black text-white antialiased font-sans selection:bg-[#800020] selection:text-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur-2xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Brand Identity */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#800020] flex items-center justify-center text-white shadow-lg shadow-[#800020]/40 group-hover:scale-105 transition-transform duration-300 border border-white/10">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white leading-none">
                SPDT
              </span>
              <span className="text-[11px] text-white/50 tracking-wide font-medium mt-1">
                Sistem Persuratan Digital Terintegrasi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            <Link
              to="/"
              className={`text-xs uppercase tracking-wider font-bold transition-all duration-200 py-2.5 px-3.5 rounded-xl ${
                isHome
                  ? "text-white bg-white/10 border border-white/15 shadow-inner"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Beranda
            </Link>

            <a
              href="/#tracking"
              className="text-xs uppercase tracking-wider font-bold text-white/60 hover:text-white hover:bg-white/5 py-2.5 px-3.5 rounded-xl transition-all duration-200"
            >
              Lacak Resi
            </a>

            <a
              href="/#workflow"
              className="text-xs uppercase tracking-wider font-bold text-white/60 hover:text-white hover:bg-white/5 py-2.5 px-3.5 rounded-xl transition-all duration-200"
            >
              Alur Layanan
            </a>

            <Link
              to="/portal-warga"
              className={`text-xs uppercase tracking-wider font-bold transition-all duration-200 py-2.5 px-3.5 rounded-xl flex items-center gap-1.5 ${
                isWarga
                  ? "text-white bg-[#800020] border border-rose-400/40 shadow-lg shadow-[#800020]/40"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Portal Warga</span>
            </Link>

            <Link
              to="/portal-petugas"
              className={`text-xs uppercase tracking-wider font-bold transition-all duration-200 py-2.5 px-3.5 rounded-xl flex items-center gap-1.5 ${
                isPetugas
                  ? "text-white bg-[#800020] border border-rose-400/40 shadow-lg shadow-[#800020]/40"
                  : "text-rose-300 hover:text-white hover:bg-white/5 border border-rose-500/30"
              }`}
            >
              <Stamp className="w-3.5 h-3.5 text-rose-400" />
              <span>Portal Petugas (TTE)</span>
            </Link>

            <div className="h-6 w-px bg-white/10 mx-1" />

            <Link
              to="/portal-warga"
              className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#9b1b3b] active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl border border-rose-500/30 shadow-lg shadow-[#800020]/40 transition-all duration-300 ml-1"
            >
              <span>Ajukan Surat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* Mobile Action & Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/portal-warga"
              className="inline-flex items-center gap-1 bg-[#800020] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg border border-rose-400/30 shadow-sm active:scale-95 transition"
            >
              <span>Ajukan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl px-5 py-4 space-y-2 animate-fade-in">
            <Link
              to="/"
              onClick={closeMenu}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold ${
                isHome ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
              }`}
            >
              <span>Beranda Utama</span>
              <Home className="w-4 h-4 text-white/50" />
            </Link>
            <a
              href="/#tracking"
              onClick={closeMenu}
              className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-white/70 hover:bg-white/5"
            >
              <span>Pelacakan Nomor Resi</span>
              <Search className="w-4 h-4 text-white/50" />
            </a>
            <a
              href="/#workflow"
              onClick={closeMenu}
              className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-white/70 hover:bg-white/5"
            >
              <span>Alur Layanan & TTE</span>
              <FileText className="w-4 h-4 text-white/50" />
            </a>
            <Link
              to="/portal-warga"
              onClick={closeMenu}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold ${
                isWarga ? "bg-[#800020] text-white" : "text-white/70 hover:bg-white/5"
              }`}
            >
              <span>Portal Permohonan Warga</span>
              <Users className="w-4 h-4 text-white/50" />
            </Link>
            <Link
              to="/portal-petugas"
              onClick={closeMenu}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold ${
                isPetugas ? "bg-[#800020] text-white" : "text-rose-300 hover:bg-white/5"
              }`}
            >
              <span>Portal Petugas (TTE)</span>
              <Stamp className="w-4 h-4 text-rose-300" />
            </Link>
          </div>
        )}
      </header>

      {/* Main Outlet */}
      <main className="flex-1 w-full pt-20">
        <Outlet />
      </main>
    </div>
  );
}
