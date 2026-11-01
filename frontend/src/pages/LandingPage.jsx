import React from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Search, 
  ShieldCheck, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  ChevronRight,
  Briefcase,
  Home,
  FileBadge,
  HeartHandshake,
  Baby,
  MapPin,
  Sparkles
} from "lucide-react";
import TrackingWidget from "../components/TrackingWidget";

export default function LandingPage() {
  const features = [
    {
      title: "Praktis & Cepat",
      desc: "Ajukan permohonan surat dari smartphone tanpa antre di balai desa.",
      icon: Clock,
      badge: "Mandiri",
      color: "bg-blue-600 text-white"
    },
    {
      title: "Transparan & Terlacak",
      desc: "Pantau posisi berkas secara real-time dengan nomor resi berjenjang.",
      icon: Search,
      badge: "Real-Time",
      color: "bg-slate-900 text-blue-400"
    },
    {
      title: "TTE Berjenjang Resmi",
      desc: "Validasi aman berjenjang dengan tanda tangan elektronik sah.",
      icon: ShieldCheck,
      badge: "Hukum Sah",
      color: "bg-blue-600 text-white"
    },
    {
      title: "Akun Pendamping",
      desc: "Dukungan ramah lansia didampingi keluarga atau RT setempat.",
      icon: Users,
      badge: "Inklusif",
      color: "bg-slate-900 text-blue-400"
    }
  ];

  const letterCatalogs = [
    {
      name: "Surat Keterangan Usaha (SKU)",
      desc: "Persyaratan pinjaman KUR perbankan, izin usaha mikro, atau bantuan UMKM.",
      icon: Briefcase,
      tag: "Paling Banyak",
      tagColor: "bg-blue-100 text-blue-800"
    },
    {
      name: "Surat Keterangan Domisili",
      desc: "Bukti tempat tinggal resmi bagi warga tetap maupun warga pendatang.",
      icon: Home,
      tag: "Populer",
      tagColor: "bg-slate-100 text-slate-800"
    },
    {
      name: "Surat Pengantar SKCK",
      desc: "Pengantar penerbitan catatan kepolisian di tingkat Polsek / Polres.",
      icon: FileBadge,
      tag: "Administrasi",
      tagColor: "bg-blue-50 text-blue-700"
    },
    {
      name: "Surat Ket. Tidak Mampu (SKTM)",
      desc: "Pengurusan beasiswa anak sekolah, KIP Kuliah, dan bantuan BPJS/Sosial.",
      icon: HeartHandshake,
      tag: "Bantuan Sosial",
      tagColor: "bg-emerald-50 text-emerald-800"
    },
    {
      name: "Surat Kelahiran / Kematian",
      desc: "Pencatatan peristiwa vital kependudukan untuk KK dan Akta.",
      icon: Baby,
      tag: "Kependudukan",
      tagColor: "bg-slate-100 text-slate-800"
    },
    {
      name: "Surat Pindah Domisili",
      desc: "Pengantar resmi kepindahan warga antar RT, RW, desa, atau ke luar daerah.",
      icon: MapPin,
      tag: "Kependudukan",
      tagColor: "bg-blue-100 text-blue-800"
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-14 py-4 sm:py-8">
      {/* Mobile-First Hero Section */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] sm:text-xs font-bold border border-blue-200 mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Transformasi Pelayanan Warga Desa</span>
        </div>

        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Urus Surat Desa <br />
          <span className="text-blue-600">Tanpa Bolak-Balik</span>
        </h1>

        <p className="text-xs sm:text-base text-slate-600 font-normal leading-relaxed mt-2.5 sm:mt-3.5 max-w-lg mx-auto">
          Layanan persuratan warga praktis, transparan, dan terverifikasi berjenjang dari RT hingga Kepala Desa secara digital.
        </p>

        {/* Action Buttons - Stacked on mobile, side-by-side on sm+ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 mt-5">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs transition"
          >
            <span>Ajukan Surat Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#tracking"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xs transition"
          >
            <Search className="w-4 h-4 text-blue-400" />
            <span>Lacak Status Resi</span>
          </a>
        </div>

        {/* Value Micro-Points */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 text-[11px] sm:text-xs text-slate-500 mt-5 pt-3.5 border-t border-slate-200">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Gratis tanpa biaya
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Dokumen sah ber-TTE
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Layanan online 24 jam
          </span>
        </div>
      </section>

      {/* Interactive Tracking Section */}
      <section id="tracking" className="max-w-4xl mx-auto px-3.5 sm:px-4">
        <TrackingWidget />
      </section>

      {/* 4 Feature Cards (2 cols on mobile, 4 cols on lg) */}
      <section className="max-w-5xl mx-auto px-3.5 sm:px-4">
        <div className="text-center mb-4 sm:mb-6">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
            Standar Pelayanan
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Keunggulan Sistem SPDT
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Mudah digunakan lewat HP oleh seluruh warga desa.
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-slate-200 shadow-2xs hover:border-blue-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center shadow-2xs`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Katalog Layanan Surat with Navy Header Banner & Mobile Carousel/Grid */}
      <section className="max-w-5xl mx-auto px-3.5 sm:px-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          {/* Section Header with Navy styling */}
          <div className="bg-slate-900 text-white p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>Katalog Layanan Surat Desa</span>
              </div>
              <h2 className="text-base sm:text-xl font-bold text-white tracking-tight mt-0.5">
                Pilih Kebutuhan Surat Warga
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Dapat diajukan langsung secara mandiri atau dengan bantuan RT.
              </p>
            </div>

            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-2xs shrink-0 self-start sm:self-auto"
            >
              <span>Ajukan Sekarang</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Catalog Grid */}
          <div className="p-3.5 sm:p-6 bg-slate-50/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
              {letterCatalogs.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="bg-white group p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-2xs transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-slate-900 group-hover:text-blue-400 flex items-center justify-center transition">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.tagColor}`}>
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                        {item.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <Link
                      to="/dashboard"
                      className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-blue-600 hover:text-blue-800 mt-2.5 pt-2 border-t border-slate-100"
                    >
                      <span>Ajukan surat ini</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
