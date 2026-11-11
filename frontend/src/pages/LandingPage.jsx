import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight,
  ChevronDown,
  User,
  Users,
  Shield,
  ShieldCheck,
  Stamp,
  FileCheck2,
  ArrowUpRight
} from "lucide-react";
import TrackingWidget from "../components/TrackingWidget";
import Footer from "../components/Footer";

export default function LandingPage() {
  const processSteps = [
    {
      num: "01",
      role: "Warga / Pemohon",
      title: "Pengajuan Mandiri Secara Daring",
      desc: "Warga mengisi formulir surat, melampirkan 16 digit NIK terdaftar, serta menentukan tujuan keperluan surat langsung dari rumah tanpa antre.",
      icon: User
    },
    {
      num: "02",
      role: "Ketua RT",
      title: "Pemeriksaan & Pengantar RT",
      desc: "Ketua RT meninjau keabsahan domisili pemohon di lingkungannya dan memberikan paraf digital pengantar pengajuan.",
      icon: Users
    },
    {
      num: "03",
      role: "Ketua RW",
      title: "Validasi Kewilayahan RW",
      desc: "Ketua RW memvalidasi berkas administratif tingkat rukun warga sebelum dokumen diteruskan ke tingkatan pedukuhan.",
      icon: Shield
    },
    {
      num: "04",
      role: "Kepala Dusun",
      title: "Audit Administratif Dusun",
      desc: "Kepala Dusun (Kasun) memeriksa kelengkapan arsip dan menyetujui rekomendasi berkas warga wilayah pedukuhannya.",
      icon: ShieldCheck
    },
    {
      num: "05",
      role: "Kepala Desa",
      title: "Otorisasi & TTE Kades",
      desc: "Kepala Desa membubuhkan Tanda Tangan Elektronik (TTE) resmi bersertifikat BSrE yang berkekuatan hukum setara tanda tangan basah.",
      icon: Stamp
    },
    {
      num: "06",
      role: "Dokumen Resmi Terbit",
      title: "Surat Sah Siap Diunduh & Ber-QR",
      desc: "Surat resmi selesai diproses. Warga dapat mengunduh format PDF sah yang dilengkapi kode QR verifikasi keaslian dokumen.",
      icon: FileCheck2
    }
  ];

  return (
    <div className="w-full bg-black text-white selection:bg-[#800020] selection:text-white">
      {/* SECTION 1: Hero Presentation */}
      <section className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center relative overflow-hidden bg-black text-white px-4 sm:px-8 py-16">
        {/* Subtle Burgundy Dark Gradient Glow Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-[#800020]/25 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Headline Typography */}
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Urus Surat Desa <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-400">
              Tanpa Bolak-Balik.
            </span>
          </h1>

          {/* High-end Value Subtext */}
          <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            Platform persuratan digital terpadu untuk warga desa. Pengajuan instan dari genggaman, verifikasi berjenjang transparan, dan bertanda tangan elektronik sah.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/portal-warga"
              className="group inline-flex items-center justify-center gap-3 bg-[#800020] hover:bg-[#9b1b3b] active:scale-95 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl border border-rose-500/30 shadow-2xl shadow-[#800020]/50 hover:shadow-[#800020]/80 transition-all duration-300"
            >
              <span>Ajukan Surat Sekarang</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <a
              href="#tracking"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 active:scale-95 text-white font-bold text-sm sm:text-base px-7 py-4 rounded-2xl border border-white/15 backdrop-blur-md transition-all duration-300"
            >
              <span>Lacak Nomor Resi</span>
              <ChevronDown className="w-4 h-4 text-white/60" />
            </a>
          </div>

          {/* Value Points */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-14 text-xs sm:text-sm text-white/60 border-t border-white/10 pt-6">
            <span>100% Bebas Biaya</span>
            <span>•</span>
            <span>TTE Berstandar Resmi BSrE</span>
            <span>•</span>
            <span>Akses Daring 24 Jam</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: Standalone Tracking Widget */}
      <section
        id="tracking"
        className="min-h-screen flex flex-col justify-center items-center bg-white text-black relative px-4 sm:px-8 py-16 border-t border-black/10"
      >
        <TrackingWidget />
      </section>

      {/* SECTION 3: ZIG-ZAG ROADMAP ALUR LAYANAN */}
      <section
        id="workflow"
        className="flex flex-col justify-center items-center bg-black text-white relative px-4 sm:px-8 py-20 sm:py-28 border-t border-white/10 overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#800020]/15 blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-5xl w-full mx-auto relative z-10 space-y-16">
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Roadmap Alur Persuratan
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              Tahapan berjenjang terpadu dari pengajuan mandiri warga hingga terbitnya dokumen resmi berkekuatan hukum tetap.
            </p>
          </div>

          {/* ROADMAP TIMELINE (ZIG-ZAG ROAD LAYOUT) */}
          <div className="relative">
            {/* The Central Connecting Road Line (Desktop Center / Mobile Left) */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-[#800020] via-rose-700/60 to-[#800020] shadow-[0_0_15px_rgba(128,0,32,0.6)]" />

            <div className="space-y-10 sm:space-y-12">
              {processSteps.map((step, idx) => {
                const IconComp = step.icon;
                const isEven = idx % 2 === 0; // Even: card on left on desktop, Odd: card on right

                return (
                  <div
                    key={idx}
                    className="relative flex items-center md:justify-between group"
                  >
                    {/* Road Center Node Point */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#0d0d0d] border-2 border-[#800020] group-hover:border-rose-400 group-hover:scale-110 flex items-center justify-center text-white z-20 shadow-xl shadow-[#800020]/40 transition-all duration-300">
                      <span className="font-mono text-xs font-black text-rose-300">
                        {step.num}
                      </span>
                    </div>

                    {/* Zig-Zag Content Columns */}
                    {/* Left Column (Desktop) */}
                    <div
                      className={`w-full pl-16 md:pl-0 md:w-[44%] ${
                        isEven ? "md:mr-auto" : "md:invisible md:h-0"
                      }`}
                    >
                      {isEven && (
                        <div className="bg-[#0e0e0e] hover:bg-[#141414] border border-white/10 hover:border-[#800020] rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#800020]/25 relative">
                          {/* Desktop Arrow Pointer towards center */}
                          <div className="hidden md:block absolute top-1/2 -right-2.5 -translate-y-1/2 w-5 h-5 bg-[#0e0e0e] border-t border-r border-white/10 rotate-45" />

                          <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-300 group-hover:bg-[#800020] group-hover:text-white transition-colors shrink-0">
                              <IconComp className="w-5 h-5" />
                            </div>

                            <div className="space-y-1.5 flex-1">
                              <span className="text-[11px] font-black uppercase tracking-wider text-rose-400 block">
                                {step.role}
                              </span>
                              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-rose-100 transition-colors">
                                {step.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-white/60 leading-relaxed pt-0.5">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column (Desktop & Mobile Default) */}
                    <div
                      className={`w-full pl-16 md:pl-0 md:w-[44%] ${
                        !isEven ? "md:ml-auto" : "hidden md:block md:invisible md:h-0"
                      }`}
                    >
                      {!isEven && (
                        <div className="bg-[#0e0e0e] hover:bg-[#141414] border border-white/10 hover:border-[#800020] rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#800020]/25 relative">
                          {/* Desktop Arrow Pointer towards center */}
                          <div className="hidden md:block absolute top-1/2 -left-2.5 -translate-y-1/2 w-5 h-5 bg-[#0e0e0e] border-b border-l border-white/10 rotate-45" />

                          <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-300 group-hover:bg-[#800020] group-hover:text-white transition-colors shrink-0">
                              <IconComp className="w-5 h-5" />
                            </div>

                            <div className="space-y-1.5 flex-1">
                              <span className="text-[11px] font-black uppercase tracking-wider text-rose-400 block">
                                {step.role}
                              </span>
                              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-rose-100 transition-colors">
                                {step.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-white/60 leading-relaxed pt-0.5">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5 text-center">
            <Link
              to="/portal-warga"
              className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#9b1b3b] text-white font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-[#800020]/40 transition active:scale-95"
            >
              <span>Mulai Buat Pengajuan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/portal-petugas"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-white/15 transition"
            >
              <span>Portal Petugas Desa</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/60" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: Dedicated Footer */}
      <Footer />
    </div>
  );
}
