import React from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#080808] text-white border-t border-white/10 relative overflow-hidden">
      {/* Subtle Burgundy Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#800020]/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#800020]/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#800020] flex items-center justify-center text-white shadow-lg shadow-[#800020]/40 border border-white/10">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">SPDT</span>
                <p className="text-[11px] text-white/50 font-medium">Sistem Persuratan Digital Terintegrasi</p>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed max-w-md pt-1">
              Transformasi layanan administrasi desa modern yang transparan, bebas pungli, dan berkecepatan tinggi. Mendukung tanda tangan elektronik tersertifikasi untuk kepastian hukum warga.
            </p>
          </div>

          {/* Navigasi Cepat */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40">
              Navigasi Layanan
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/70 hover:text-white flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3.5 h-3.5 text-[#800020]" />
                  <span>Beranda Utama</span>
                </Link>
              </li>
              <li>
                <a href="/#tracking" className="text-white/70 hover:text-white flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3.5 h-3.5 text-[#800020]" />
                  <span>Pelacakan Nomor Resi</span>
                </a>
              </li>
              <li>
                <a href="/#workflow" className="text-white/70 hover:text-white flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3.5 h-3.5 text-[#800020]" />
                  <span>Alur Persetujuan Berjenjang</span>
                </a>
              </li>
              <li>
                <Link to="/portal-warga" className="text-white/70 hover:text-white flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3.5 h-3.5 text-[#800020]" />
                  <span>Portal Permohonan Warga</span>
                </Link>
              </li>
              <li>
                <Link to="/portal-petugas" className="text-white/70 hover:text-rose-300 flex items-center gap-1.5 transition font-semibold">
                  <ChevronRight className="w-3.5 h-3.5 text-[#800020]" />
                  <span>Workspace Petugas (TTE)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak & Jam Kerja */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40">
              Pusat Bantuan & Kantor Desa
            </h4>
            <div className="space-y-2.5 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#800020] shrink-0 mt-1" />
                <span className="leading-relaxed">
                  Gedung Graha Praja Kantor Pemerintah Desa Mandiri, Jl. Merdeka No. 45
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#800020] shrink-0" />
                <span>Layanan Helpdesk: (021) 8765-4321</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#800020] shrink-0" />
                <span>persuratan@desamandiri.go.id</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#800020] shrink-0" />
                <span>Pelayanan Daring 24 Jam | Loket Fisik: 08.00 - 15.30 WIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 SPDT. Pemerintah Desa Mandiri. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition cursor-pointer">Kebijakan Privasi</span>
            <span className="hover:text-white transition cursor-pointer">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
