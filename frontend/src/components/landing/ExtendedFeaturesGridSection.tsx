"use client";

import { useEffect, useState } from "react";
import type { ExtendedFeatureTile } from "@/types/landing";
import { getAccentTokens } from "@/utils/accent-tokens";

export interface ExtendedFeaturesGridSectionProps {
  readonly items: ReadonlyArray<ExtendedFeatureTile>;
}

function DedicatedModuleDesktopCanvas({
  iconType,
}: {
  readonly iconType: ExtendedFeatureTile["iconType"];
}) {
  switch (iconType) {
    case "bmi":
      return (
        <div className="space-y-3.5">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-xl bg-[#f8f9fc] p-3 ring-1 ring-[#222326]/6">
              <p className="text-[10px] font-medium text-[#747679]">Tinggi & Berat</p>
              <p className="mt-1 font-mono text-[15px] font-bold text-[#222326]">171 cm / 62 kg</p>
            </div>
            <div className="rounded-xl bg-[#31ce01]/12 p-3 ring-1 ring-[#31ce01]/30">
              <p className="text-[10px] font-semibold text-[#1e8300]">Indeks BMI Otomatis</p>
              <p className="mt-1 font-mono text-[15px] font-bold text-[#1e8300]">21.2 (Ideal)</p>
            </div>
            <div className="rounded-xl bg-[#f8f9fc] p-3 ring-1 ring-[#222326]/6">
              <p className="text-[10px] font-medium text-[#747679]">Skor Matematika</p>
              <p className="mt-1 font-mono text-[15px] font-bold text-[#415eee]">88 / 100</p>
            </div>
          </div>

          <div className="rounded-xl bg-[#f8f9fc] p-3.5 ring-1 ring-[#222326]/6">
            <p className="text-[11px] font-bold text-[#222326]">Checklist Pemeriksaan Fisik Seleksi Awal</p>
            <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11.5px]">
              {[
                { label: "Tes Buta Warna (Ishihara)", val: "Normal (14/14)" },
                { label: "Pemeriksaan Tato & Tindik", val: "Bersih / Tidak Ada" },
                { label: "Visus Mata Kanan / Kiri", val: "0.0 / -0.25 (Aman)" },
                { label: "Riwayat Patah Tulang", val: "Tidak Ada" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-lg bg-[#ffffff] px-3 py-2 shadow-2xs">
                  <span className="text-[#747679]">{row.label}</span>
                  <span className="font-semibold text-[#1e8300]">{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#1f2025] px-4 py-3 text-[#ffffff]">
            <div>
              <p className="text-[12px] font-semibold">Status: Lulus Seleksi PPDB</p>
              <p className="text-[10.5px] text-[#ebf0f8]/70">Otomatis terbitkan NIS, akun siswa & tagihan Keuangan</p>
            </div>
            <span className="rounded-full bg-[#31ce01] px-3 py-1 text-[11px] font-bold text-[#1f2025]">
              Aktifkan Siswa ✓
            </span>
          </div>
        </div>
      );

    case "qr-scan":
      return (
        <div className="space-y-3.5">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-5 flex flex-col items-center justify-center rounded-xl bg-[#1f2025] p-3.5 text-center text-[#ffffff]">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-[#31ce01] bg-[#ffffff] p-2">
                <svg viewBox="0 0 36 36" className="h-full w-full fill-[#1f2025]" aria-hidden="true">
                  <path d="M2 2h10v10H2V2zm2 2v6h6V4H4zm18-2h10v10H22V2zm2 2v6h6V4h-6zM2 22h10v10H2V22zm2 2v6h6v-6H4zm12-10h6v6h-6v-6zm8 8h8v8h-8v-8z" />
                </svg>
              </div>
              <p className="mt-2 font-mono text-[11px] font-semibold text-[#31ce01]">Scanner QR Aktif</p>
              <p className="text-[10px] text-[#ebf0f8]/70">Kelas Bahasa N4 Pagi</p>
            </div>

            <div className="col-span-7 space-y-2">
              <div className="rounded-xl bg-[#f8f9fc] p-3 ring-1 ring-[#222326]/6">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#222326]">Rizky Pratama (NIS-042)</span>
                  <span className="rounded bg-[#31ce01]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#1e8300]">07:24 • HADIR</span>
                </div>
              </div>
              <div className="rounded-xl bg-[#f8f9fc] p-3 ring-1 ring-[#222326]/6">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#222326]">Ahmad Fauzi (NIS-048)</span>
                  <span className="rounded bg-[#31ce01]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#1e8300]">07:26 • HADIR</span>
                </div>
              </div>
              <div className="rounded-xl bg-[#ffab94]/25 p-3 ring-1 ring-[#ffab94]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#a93f22]">Bagas Saputra (NIS-059)</span>
                  <span className="rounded bg-[#a93f22] px-2 py-0.5 font-mono text-[10px] font-bold text-[#ffffff]">ALPA 3x</span>
                </div>
                <p className="mt-1 text-[10px] font-medium text-[#a93f22]">
                  Otomatis kirim peringatan ke Admin TU & WA Orang Tua
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case "refund":
      return (
        <div className="space-y-3">
          <div className="rounded-xl bg-[#f8f9fc] p-3.5 ring-1 ring-[#222326]/6">
            <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-2 text-[12px]">
              <span className="font-semibold text-[#747679]">Total Dana Disetor Siswa</span>
              <span className="font-mono font-bold text-[#222326]">Rp 14.500.000</span>
            </div>
            <div className="mt-2.5 space-y-1.5 text-[11.5px]">
              <div className="flex justify-between text-[#a93f22]">
                <span>(-) Biaya Medical Check Up (Terpakai)</span>
                <span className="font-mono">- Rp 950.000</span>
              </div>
              <div className="flex justify-between text-[#a93f22]">
                <span>(-) Pengurusan Paspor & Biometrik</span>
                <span className="font-mono">- Rp 650.000</span>
              </div>
              <div className="flex justify-between text-[#a93f22]">
                <span>(-) Seragam, Modul & Asrama 2 Bulan</span>
                <span className="font-mono">- Rp 3.400.000</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[#222326]/10 pt-2.5">
              <span className="text-[13px] font-bold text-[#222326]">Estimasi Sisa Pengembalian (Net Refund)</span>
              <span className="font-mono text-[16px] font-bold text-[#1e8300]">Rp 9.500.000</span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-[#ffca00]/20 px-4 py-2.5 text-[11.5px] font-semibold text-[#8a6a00]">
            <span>Status: Menunggu Klik Approve Direktur LPK</span>
            <span className="font-mono">ANTI-FRAUD LOCK</span>
          </div>
        </div>
      );

    case "multi-role":
      return (
        <div className="space-y-3">
          <div className="rounded-xl bg-[#f8f9fc] p-3.5 ring-1 ring-[#222326]/6">
            <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-2.5">
              <div>
                <p className="text-[13px] font-bold text-[#222326]">Siti Aminah, S.Pd</p>
                <p className="text-[11px] text-[#747679]">Staf Operasional LPK • Multi-Role Aktif</p>
              </div>
              <span className="rounded-full bg-[#b9a6ff]/25 px-3 py-1 font-mono text-[10.5px] font-bold text-[#583ec2]">
                2 Role Digabung
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11.5px]">
              {[
                { role: "Admin Tata Usaha (TU)", checked: true },
                { role: "Admin Keuangan / Kasir", checked: true },
                { role: "Sensei / Instruktur", checked: false },
                { role: "Staf Penempatan SO", checked: false },
              ].map((r) => (
                <div
                  key={r.role}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium ${
                    r.checked
                      ? "bg-[#415eee]/12 text-[#2945d6] ring-1 ring-[#415eee]/30"
                      : "bg-[#ffffff] text-[#747679]"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded text-[10px] font-bold ${
                      r.checked ? "bg-[#415eee] text-[#ffffff]" : "border border-[#747679]/40"
                    }`}
                  >
                    {r.checked ? "✓" : ""}
                  </span>
                  <span>{r.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "video-cv":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-3 rounded-xl bg-[#f8f9fc] p-3.5 ring-1 ring-[#222326]/6">
            <div className="col-span-5 flex flex-col items-center justify-center rounded-xl bg-[#1f2025] p-4 text-center text-[#ffffff]">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffffff]/15 text-[#ffca00]">
                ▶
              </div>
              <p className="mt-2 text-[11px] font-semibold">Jikoshoukai.mp4</p>
              <p className="font-mono text-[10px] text-[#ebf0f8]/65">01:42 • HD 1080p</p>
            </div>
            <div className="col-span-7 flex flex-col justify-between">
              <div>
                <span className="rounded bg-[#31ce01]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#1e8300]">
                  SIAP KIRIM KE USER JEPANG
                </span>
                <p className="mt-1.5 text-[13px] font-bold text-[#222326]">
                  Paket Profil Kandidat Mensetsu
                </p>
                <p className="mt-1 text-[11px] text-[#747679]">
                  Tautan video perkenalan bahasa Jepang terlampir otomatis pada lembar PDF Rirekisho JIS.
                </p>
              </div>
              <div className="mt-2 flex gap-2">
                <span className="rounded-lg bg-[#1f2025] px-3 py-1.5 text-[10.5px] font-semibold text-[#ffffff]">
                  Salin Link SO
                </span>
                <span className="rounded-lg bg-[#ebf0f8] px-3 py-1.5 text-[10.5px] font-semibold text-[#222326]">
                  Unduh Rirekisho PDF
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case "qr-receipt":
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-[#f8f9fc] p-4 ring-1 ring-[#222326]/6">
            <div className="space-y-1">
              <span className="rounded bg-[#31ce01]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#1e8300]">
                KUITANSI RESMI BER-QR • LUNAS
              </span>
              <p className="text-[14px] font-bold text-[#222326]">No: #INV-LPK-2026-089</p>
              <p className="text-[12px] text-[#747679]">Pembayaran Cicilan Ke-2 Biaya Pemberangkatan</p>
              <p className="font-mono text-[16px] font-bold text-[#1e8300]">Rp 4.500.000</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-[#ffffff] p-2.5 shadow-2xs ring-1 ring-[#222326]/8">
              <svg viewBox="0 0 36 36" className="h-14 w-14 fill-[#1f2025]" aria-hidden="true">
                <path d="M2 2h10v10H2V2zm2 2v6h6V4H4zm18-2h10v10H22V2zm2 2v6h6V4h-6zM2 22h10v10H2V22zm2 2v6h6v-6H4zm12-10h6v6h-6v-6zm8 8h8v8h-8v-8z" />
              </svg>
              <span className="mt-1 font-mono text-[8.5px] text-[#747679]">SHA-256 VALID</span>
            </div>
          </div>
        </div>
      );

    case "cash-split":
      return (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#415eee]/10 p-3.5 ring-1 ring-[#415eee]/25">
            <span className="font-mono text-[10px] font-bold text-[#2945d6]">REKENING ESCROW SISWA</span>
            <p className="mt-1 text-[13px] font-bold text-[#222326]">Dana Titipan Pemberangkatan</p>
            <p className="mt-2 font-mono text-[17px] font-bold text-[#2945d6]">Rp 412.500.000</p>
            <p className="mt-1 text-[10.5px] text-[#747679]">Khusus Paspor, MCU, Tiket & CoE Siswa</p>
          </div>
          <div className="rounded-xl bg-[#f8f9fc] p-3.5 ring-1 ring-[#222326]/8">
            <span className="font-mono text-[10px] font-bold text-[#747679]">KAS OPERASIONAL LPK</span>
            <p className="mt-1 text-[13px] font-bold text-[#222326]">Pengeluaran Kantor & Asrama</p>
            <p className="mt-2 font-mono text-[17px] font-bold text-[#222326]">Rp 64.200.000</p>
            <p className="mt-1 text-[10.5px] text-[#747679]">Listrik, Katering, Gaji Sensei & ATK</p>
          </div>
        </div>
      );

    case "disnaker":
      return (
        <div className="space-y-3">
          <div className="rounded-xl bg-[#f8f9fc] p-3.5 ring-1 ring-[#222326]/6">
            <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-2 text-[11.5px] font-bold text-[#222326]">
              <span>Format Pelaporan Disnaker & BP2MI</span>
              <span className="font-mono text-[10.5px] text-[#415eee]">148 Baris Siswa</span>
            </div>
            <div className="mt-2.5 space-y-1.5 font-mono text-[10.5px]">
              <div className="grid grid-cols-4 rounded bg-[#ffffff] px-2.5 py-1.5 text-[#222326]">
                <span>320104290104</span>
                <span>Rizky Pratama</span>
                <span>ID-CPMI-8821</span>
                <span className="text-right text-[#1e8300]">Jepang (SSW)</span>
              </div>
              <div className="grid grid-cols-4 rounded bg-[#ffffff] px-2.5 py-1.5 text-[#222326]">
                <span>320411080503</span>
                <span>Ahmad Fauzi</span>
                <span>ID-CPMI-8825</span>
                <span className="text-right text-[#1e8300]">Jepang (Magang)</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "impersonate":
      return (
        <div className="space-y-3">
          <div className="rounded-xl bg-[#f8f9fc] p-3.5 ring-1 ring-[#222326]/6">
            <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-2 text-[11.5px] font-bold text-[#222326]">
              <span>Pelacakan Alumni Luar Negeri & Kontrak Kerja</span>
              <span className="rounded bg-[#b9a6ff]/25 px-2 py-0.5 font-mono text-[10px] text-[#583ec2]">
                PELUANG VISA SSW
              </span>
            </div>
            <div className="mt-2.5 space-y-2 text-[11.5px]">
              <div className="flex items-center justify-between rounded-lg bg-[#ffffff] px-3 py-2 shadow-2xs">
                <div>
                  <p className="font-bold text-[#222326]">Hendra Wijaya • Aichi, Jepang</p>
                  <p className="text-[10.5px] text-[#747679]">Kontrak 3 Tahun Berakhir: 82 Hari Lagi</p>
                </div>
                <span className="rounded-md bg-[#31ce01]/15 px-2.5 py-1 font-mono text-[10px] font-bold text-[#1e8300]">
                  Tawarkan SSW →
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#ffffff] px-3 py-2 shadow-2xs">
                <div>
                  <p className="font-bold text-[#222326]">Wahyu Saputra • Osaka, Jepang</p>
                  <p className="text-[10.5px] text-[#747679]">Cicilan Dana Talangan: Bulan 10 / 12</p>
                </div>
                <span className="rounded-md bg-[#415eee]/15 px-2.5 py-1 font-mono text-[10px] font-bold text-[#2945d6]">
                  Lancar ✓
                </span>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export function ExtendedFeaturesGridSection({
  items,
}: ExtendedFeaturesGridSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused, items.length]);

  const activeItem = items[activeIndex] ?? items[0];
  const activeTokens = getAccentTokens(activeItem.accent);

  return (
    <section
      id="modul-lengkap"
      aria-labelledby="extra-features-heading"
      className="bevel-section-pad bevel-container"
    >
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Left Column (.col-lg-5): 64px Heading + Clean Bevel Interactive Accordion List */}
        <div className="lg:col-span-5">
          <div className="text-center lg:text-left">
            <h2 id="extra-features-heading" className="bevel-display">
              Dan bukan hanya itu
            </h2>
            <p className="bevel-body mt-4">
              SiapTerbang juga memiliki fitur operasional web desktop berikut:
            </p>
          </div>

          <div
            className="mt-8 space-y-2.5 sm:mt-10"
            role="tablist"
            aria-label="Fitur Tambahan SiapTerbang"
          >
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={item.id}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }
                  }}
                  className={`w-full rounded-[22px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222326]/30 ${
                    isActive
                      ? "bg-[#ebf0f8] p-5 sm:p-6 shadow-[0_4px_20px_rgba(31,32,37,0.06)] ring-1 ring-[#222326]/10"
                      : "bg-[#ebf0f8]/55 px-5 py-3.5 hover:bg-[#ebf0f8]/85"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[19px] font-semibold leading-tight tracking-[-0.02em] text-[#222326] sm:text-[21px]">
                        {item.title}
                      </h3>
                      {isActive && (
                        <p className="mt-2 text-[15.5px] leading-relaxed text-[#747679] sm:text-[16.5px]">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {isActive && (
                      <button
                        type="button"
                        aria-label={isPaused ? "Putar otomatis" : "Jeda putar otomatis"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPaused((prev) => !prev);
                        }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffffff] text-[#222326] shadow-xs ring-1 ring-[#222326]/10 hover:bg-[#1f2025] hover:text-[#ffffff]"
                      >
                        {isPaused ? (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <polygon points="6 4 20 12 6 20 6 4" />
                          </svg>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Mobile Inline Web Preview (Visible right inside the active tab on phones < lg for effortless UX!) */}
                  {isActive && (
                    <div className="mt-4 overflow-hidden rounded-[16px] bg-[#1f2025] p-1.5 text-[#222326] shadow-md lg:hidden">
                      <div className="flex items-center justify-between rounded-t-[10px] bg-[#141518] px-3 py-1.5 text-[10px] text-[#ebf0f8]">
                        <div className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                          <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                          <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
                        </div>
                        <span className="truncate font-mono text-[10px]">
                          lpknusantara.siapterbang.id
                        </span>
                        <span className="text-[#31ce01]">●</span>
                      </div>
                      <div className="rounded-b-[10px] bg-[#ffffff] p-3.5">
                        <DedicatedModuleDesktopCanvas iconType={item.iconType} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (.col-lg-7): High-Craft Web Desktop SaaS Application Window (Desktop >= lg) */}
        <div className="relative hidden items-center justify-center lg:col-span-7 lg:flex">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[460px] w-[520px] rounded-full opacity-35 blur-3xl transition-colors duration-500"
            style={{ backgroundColor: activeTokens.hex }}
          />

          <div className="relative z-10 w-full overflow-hidden rounded-[24px] bg-[#1f2025] p-2.5 shadow-[0_32px_70px_-15px_rgba(31,32,37,0.34)] ring-1 ring-[#ffffff]/25">
            {/* macOS Web Browser Header Bar */}
            <div className="flex items-center justify-between rounded-t-[16px] bg-[#141518] px-4 py-3 text-[#ebf0f8]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-[#1f2025] px-4 py-1 font-mono text-[12px] text-[#ebf0f8] ring-1 ring-[#ffffff]/10">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: activeTokens.hex }}
                />
                <span>https://lpknusantara.siapterbang.id/workspace/{activeItem.iconType}</span>
              </div>
              <span className="rounded-md bg-[#ffffff]/10 px-2.5 py-0.5 font-mono text-[11px] text-[#ebf0f8]">
                {activeItem.badgeText}
              </span>
            </div>

            {/* Inner Web Desktop Workspace */}
            <div className="grid min-h-[470px] grid-cols-12 rounded-b-[16px] bg-[#ffffff] text-[#222326]">
              {/* Left Sidebar inside Browser Window */}
              <div className="col-span-4 flex flex-col justify-between border-r border-[#ebf0f8] bg-[#f8f9fc] p-5">
                <div>
                  <div className="flex items-center gap-2 border-b border-[#ebf0f8] pb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1f2025] text-[11px] font-bold text-[#ffffff]">
                      ST
                    </span>
                    <div>
                      <p className="text-[12px] font-bold text-[#222326]">SiapTerbang Web</p>
                      <p className="text-[10px] text-[#747679]">{activeItem.badgeText}</p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1">
                    {items.map((navItem, nIdx) => (
                      <button
                        key={navItem.id}
                        type="button"
                        onClick={() => setActiveIndex(nIdx)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-left text-[11.5px] font-medium transition-colors ${
                          nIdx === activeIndex
                            ? "bg-[#1f2025] text-[#ffffff] font-semibold"
                            : "text-[#747679] hover:bg-[#ebf0f8]/60 hover:text-[#222326]"
                        }`}
                      >
                        <span className="truncate">{navItem.title}</span>
                        {nIdx === activeIndex && (
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: activeTokens.hex }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-[#ebf0f8] p-3 text-[11px]">
                  <p className="font-semibold text-[#222326]">Isolasi Multi-Tenant</p>
                  <p className="text-[10px] text-[#747679]">Row-Level Security Aktif</p>
                </div>
              </div>

              {/* Right Main Workspace Canvas */}
              <div className="col-span-8 flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-3.5">
                    <div>
                      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#415eee]">
                        {activeItem.badgeText} • MODUL 0{activeIndex + 1}
                      </span>
                      <h4 className="mt-0.5 text-[22px] font-bold tracking-tight text-[#222326]">
                        {activeItem.title}
                      </h4>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold ${activeTokens.softBgClass} ${activeTokens.textClass}`}
                    >
                      {activeItem.metricHighlight}
                    </span>
                  </div>

                  {/* Dedicated Interactive Module Canvas */}
                  <div className="mt-4">
                    <DedicatedModuleDesktopCanvas iconType={activeItem.iconType} />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#ebf0f8] pt-3.5 text-[11.5px] text-[#747679]">
                  <span>Sinkronisasi otomatis lintas 7 Role</span>
                  <span className="font-mono font-semibold text-[#1e8300]">● Tersimpan di Cloud LPK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
