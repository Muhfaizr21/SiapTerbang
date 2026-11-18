"use client";

import type { HeroFloatingMetricCard } from "@/types/landing";

export interface CloudlightHeroProps {
  readonly floatingCards: ReadonlyArray<HeroFloatingMetricCard>;
  readonly onOpenWorkspaceModal: (initialRole?: string) => void;
}

export function CloudlightHero({
  onOpenWorkspaceModal,
}: CloudlightHeroProps) {
  return (
    <section
      id="beranda"
      aria-labelledby="hero-heading"
      className="flex min-h-[100svh] w-full justify-center overflow-clip px-2 pt-2 pb-0"
    >
      <div className="bevel-hero-sky relative w-full overflow-hidden rounded-[24px] pt-24 sm:pt-28">
        {/* Full-Container Unified Airplane & Sky Backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[24px]"
        >
          <img
            src="/bevel/hero-airplane.jpg"
            alt=""
            width={1600}
            height={900}
            fetchPriority="high"
            className="h-full w-full object-cover object-[50%_68%] opacity-45 mix-blend-multiply scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 52% 38% at 50% 24%, rgba(220,235,255,0.92) 0%, rgba(225,238,255,0.65) 55%, rgba(255,249,238,0) 100%), linear-gradient(180deg, rgba(207,227,255,0.35) 0%, rgba(232,242,255,0.25) 55%, rgba(255,249,238,0.92) 88%, #fff9ee 100%)",
            }}
          />
        </div>

        {/* Authentic Bevel Cloud Layer Overlay */}
        <img
          src="/bevel/clouds.avif"
          alt=""
          width={1440}
          height={420}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto w-full rounded-t-[24px] object-cover opacity-85 mix-blend-screen"
        />

        {/* Hero Copy Block (High-Converting B2B LPK Copywriting) */}
        <div className="relative z-20 mx-auto flex max-w-[940px] flex-col items-center px-4 text-center">
          <h1 id="hero-heading" className="bevel-hero-display max-w-[820px]">
            Kendalikan LPK Anda dari Pendaftaran hingga Terbang
          </h1>

          <p className="bevel-body mt-5 max-w-[680px]">
            Tinggalkan map kertas yang tercecer dan rekap Excel yang rawan bocor. Satukan seleksi fisik, kedisiplinan asrama, cetak CV Rirekisho otomatis, hingga pengawalan dana talangan dalam satu sistem kerja terpadu.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3.5">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="flex items-center gap-0.5 text-[#ffca00]" aria-label="Rating 4.9 dari 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="17" height="17" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[15px] font-medium text-[#747679]">
                4.9 • Standar LPK Magang Jepang, Tokutei Ginou (SSW) & Korea
              </span>
            </div>

            <button
              type="button"
              onClick={() => onOpenWorkspaceModal("Demo Gratis 14 Hari")}
              className="inline-flex min-h-[54px] items-center gap-3 rounded-[14px] bg-[#1f2025] px-7 py-2.5 text-[#ffffff] shadow-md transition-transform hover:bg-[#000000] active:scale-[0.98]"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] leading-none font-medium text-[#ebf0f8]/80">
                  Aktifkan Subdomain Resmi LPK
                </p>
                <p className="text-[16px] leading-tight font-semibold text-[#ffffff]">
                  Coba Gratis 14 Hari
                </p>
              </div>
            </button>

            <p className="text-[14px] text-[#747679]">
              Dapatkan ruang kerja eksklusif namalpk.siapterbang.id tanpa instalasi server.
            </p>
          </div>
        </div>

        {/* .hero_bottom: Web Desktop SaaS Dashboard Showcase + Balanced Floating Widget Columns */}
        <div className="bevel-hero-bottom-mask relative z-20 mx-auto mt-10 flex w-full max-w-[1400px] flex-col items-center justify-center gap-5 px-3 pt-2 pb-10 sm:px-4 xl:flex-row xl:items-start">
          {/* Left Floating Widgets Column */}
          <div
            aria-hidden="true"
            className="hidden w-[255px] shrink-0 flex-col gap-3.5 pt-8 xl:flex"
          >
            <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_8px_24px_rgba(31,32,37,0.07)] backdrop-blur-md ring-1 ring-[#222326]/5">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#747679]">
                <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
                <span>GATEKEEPER SENSEI</span>
              </div>
              <p className="mt-1.5 text-[12.5px] font-medium leading-snug text-[#222326]">
                14 kandidat lulus evaluasi N4 dan otomatis terbuka di modul <strong>Smart Matching</strong>.
              </p>
            </div>

            <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_8px_24px_rgba(31,32,37,0.07)] backdrop-blur-md ring-1 ring-[#222326]/5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#222326]">Expiry Tracker TU</span>
                <span className="rounded-full bg-[#ffab94]/35 px-2.5 py-0.5 text-[10.5px] font-bold text-[#a93f22]">
                  H-24 MCU
                </span>
              </div>
              <p className="mt-1.5 text-[12px] leading-snug text-[#747679]">
                Peringatan dini sebelum masa berlaku paspor atau MCU kandidat habis.
              </p>
            </div>

            <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_8px_24px_rgba(31,32,37,0.07)] backdrop-blur-md ring-1 ring-[#222326]/5">
              <div className="flex items-center justify-between text-[11.5px] font-semibold text-[#222326]">
                <span>Rasio Lolos Mensetsu</span>
                <span className="font-mono text-[#415eee]">+24.8%</span>
              </div>
              <div className="mt-2.5 flex h-11 items-end gap-1.5">
                {[40, 55, 48, 70, 66, 85, 94].map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-[#415eee]/80"
                    style={{ height: `${v}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center Web Desktop SaaS Browser Window */}
          <div className="relative z-20 w-full max-w-[820px] shrink-0">
            <div className="overflow-hidden rounded-[22px] bg-[#1f2025] p-2 shadow-[0_28px_70px_-15px_rgba(31,32,37,0.38)] ring-1 ring-[#ffffff]/30 sm:rounded-[24px] sm:p-2.5">
              {/* macOS Browser Top Chrome Bar */}
              <div className="flex items-center justify-between gap-2 rounded-t-[14px] bg-[#141518] px-3 py-2 text-[#ebf0f8] sm:rounded-t-[16px] sm:px-4 sm:py-2.5">
                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] sm:h-3 sm:w-3" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] sm:h-3 sm:w-3" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] sm:h-3 sm:w-3" />
                </div>
                <div className="flex min-w-0 items-center gap-1.5 rounded-lg bg-[#1f2025] px-2.5 py-1 font-mono text-[10.5px] text-[#ebf0f8]/90 ring-1 ring-[#ffffff]/10 sm:px-4 sm:text-[12px]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#31ce01]" />
                  <span className="truncate">https://lpknusantara.siapterbang.id/dashboard</span>
                </div>
                <div className="hidden shrink-0 items-center gap-2 text-[11px] font-medium text-[#b9a6ff] sm:flex">
                  <span>6 Role Internal LPK</span>
                </div>
              </div>

              {/* Web Desktop Dashboard Content */}
              <div className="grid grid-cols-12 bg-[#f8f9fc] text-[#222326]">
                {/* Desktop Sidebar Navigation */}
                <div className="col-span-3 hidden border-r border-[#ebf0f8] bg-[#ffffff] p-4 md:block">
                  <div className="flex items-center gap-2 border-b border-[#ebf0f8] pb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1f2025] text-[11px] font-bold text-[#ffffff]">
                      ST
                    </span>
                    <div>
                      <p className="text-[12px] font-bold text-[#222326]">LPK Nusantara</p>
                      <p className="text-[10px] text-[#747679]">Direktur / Owner</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 text-[12px] font-medium">
                    <div className="rounded-xl bg-[#1f2025] px-3 py-2 text-[#ffffff]">
                      Dashboard Eksekutif
                    </div>
                    <div className="rounded-xl px-3 py-1.5 text-[#747679]">
                      PPDB & Asrama TU
                    </div>
                    <div className="rounded-xl px-3 py-1.5 text-[#747679]">
                      Akademik & Sensei
                    </div>
                    <div className="rounded-xl px-3 py-1.5 text-[#747679]">
                      Smart Matching & CV
                    </div>
                    <div className="rounded-xl px-3 py-1.5 text-[#747679]">
                      Pipeline CoE & Visa
                    </div>
                    <div className="rounded-xl px-3 py-1.5 text-[#747679]">
                      Keuangan & Talangan
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-[#ffab94]/20 px-3 py-1.5 text-[#a93f22]">
                      <span>Approval Direktur</span>
                      <span className="rounded-full bg-[#a93f22] px-1.5 text-[10px] text-[#ffffff]">2</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Main Workspace */}
                <div className="col-span-12 p-4 sm:p-5 md:col-span-9">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[#747679]">
                        KENDALI PENUH OPERASIONAL & FINANSIAL LPK
                      </p>
                      <h2 className="text-[18px] font-bold tracking-tight text-[#222326] sm:text-[20px]">
                        Ringkasan Kesiapan Kandidat & Kas LPK
                      </h2>
                    </div>
                    <span className="rounded-full bg-[#31ce01]/15 px-3 py-1 text-[11px] font-bold text-[#1e8300]">
                      ● 5 Kunci Lintas Divisi Aktif
                    </span>
                  </div>

                  {/* 3 Bevel-Style Circular Gauge Cards */}
                  <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
                    {[
                      { title: "Kesiapan Bahasa N4", pct: "88%", sub: "42 Siswa Layak Mensetsu", color: "#31ce01", offset: "16" },
                      { title: "Disiplin Asrama", pct: "96%", sub: "0 Siswa Suspended (<100pt)", color: "#ffab94", offset: "6" },
                      { title: "Kelengkapan Berkas", pct: "100%", sub: "KTP, Paspor, MCU & ID CPMI", color: "#b9a6ff", offset: "0" },
                    ].map((g) => (
                      <div key={g.title} className="flex items-center gap-3 rounded-[16px] bg-[#ffffff] p-3 shadow-2xs ring-1 ring-[#222326]/5">
                        <svg width="48" height="48" viewBox="0 0 54 54" className="shrink-0" aria-hidden="true">
                          <circle cx="27" cy="27" r="21" stroke="#ebf0f8" strokeWidth="5" fill="none" />
                          <circle
                            cx="27"
                            cy="27"
                            r="21"
                            stroke={g.color}
                            strokeWidth="5"
                            strokeDasharray="132"
                            strokeDashoffset={g.offset}
                            strokeLinecap="round"
                            fill="none"
                            transform="rotate(-90 27 27)"
                          />
                          <text x="27" y="31" textAnchor="middle" className="fill-[#222326] text-[12px] font-bold">
                            {g.pct}
                          </text>
                        </svg>
                        <div>
                          <p className="text-[12px] font-bold text-[#222326]">{g.title}</p>
                          <p className="text-[10.5px] leading-tight text-[#747679]">{g.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Candidate Pipeline Table */}
                  <div className="mt-4 rounded-[16px] bg-[#ffffff] p-3.5 shadow-2xs ring-1 ring-[#222326]/5 sm:p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ebf0f8] pb-2.5 text-[11px] font-semibold text-[#747679]">
                      <span>KANDIDAT SIAP MENSETSU & KEBERANGKATAN</span>
                      <span className="text-[#415eee]">1-Klik Cetak Rirekisho JIS →</span>
                    </div>
                    <div className="mt-2.5 space-y-2 text-[12px]">
                      {[
                        { name: "Rizky Pratama (NIS-042)", div: "Lulus N4 • Poin 12/100", fin: "Dana Talangan Aktif", stage: "CoE Turun → Visa" },
                        { name: "Ahmad Fauzi (NIS-048)", div: "Lulus N4 • Poin 0/100", fin: "Lunas Pra-Terbang", stage: "Siap Mensetsu Osaka" },
                        { name: "Budi Santoso (NIS-051)", div: "Lulus SSW • Poin 5/100", fin: "Lunas + Kuitansi QR", stage: "Tiket & Terbang" },
                      ].map((row) => (
                        <div
                          key={row.name}
                          className="flex flex-col gap-1 rounded-xl bg-[#ebf0f8]/55 px-3 py-2.5 sm:grid sm:grid-cols-12 sm:items-center sm:gap-2"
                        >
                          <span className="font-semibold text-[#222326] sm:col-span-4">{row.name}</span>
                          <span className="text-[11px] text-[#747679] sm:col-span-3">{row.div}</span>
                          <span className="text-[11px] font-medium text-[#1e8300] sm:col-span-3">{row.fin}</span>
                          <span className="font-mono text-[10.5px] font-bold text-[#415eee] sm:col-span-2 sm:text-right">
                            {row.stage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Widgets Column */}
          <div
            aria-hidden="true"
            className="hidden w-[255px] shrink-0 flex-col gap-3.5 pt-8 xl:flex"
          >
            <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_8px_24px_rgba(31,32,37,0.07)] backdrop-blur-md ring-1 ring-[#222326]/5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#747679]">
                <span>WHATSAPP ORANG TUA</span>
                <span className="text-[#1e8300]">Terkirim ✓✓</span>
              </div>
              <p className="mt-1.5 text-[12.5px] font-medium leading-snug text-[#222326]">
                Kuitansi Digital PDF ber-QR Code terkirim ke WhatsApp wali saat SPP lunas.
              </p>
            </div>

            <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_8px_24px_rgba(31,32,37,0.07)] backdrop-blur-md ring-1 ring-[#222326]/5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#222326]">Auto-Rirekisho JIS</span>
                <span className="rounded-full bg-[#b9a6ff]/30 px-2.5 py-0.5 text-[10.5px] font-bold text-[#583ec2]">
                  1-Klik PDF
                </span>
              </div>
              <p className="mt-1.5 text-[12px] leading-snug text-[#747679]">
                CV Jepang & Surat Pengantar Disnaker/Imigrasi berkop resmi LPK.
              </p>
            </div>

            <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_8px_24px_rgba(31,32,37,0.07)] backdrop-blur-md ring-1 ring-[#222326]/5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#222326]">Siklus Rematching</span>
                <span className="rounded-full bg-[#31ce01]/20 px-2.5 py-0.5 text-[10.5px] font-bold text-[#1e8300]">
                  Many-to-Many
                </span>
              </div>
              <p className="mt-1.5 text-[12px] leading-snug text-[#747679]">
                Kandidat gagal wawancara otomatis kembali ke Pool Siap Mensetsu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
