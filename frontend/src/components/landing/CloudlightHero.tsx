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
        {/* Professional Commercial Airliner in Morning Cloudlight Sky */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[540px] w-full overflow-hidden">
          <img
            src="/bevel/hero-airplane.jpg"
            alt="Pesawat komersial pemberangkatan kandidat CPMI SiapTerbang"
            width={1600}
            height={900}
            fetchPriority="high"
            className="h-full w-full object-cover object-center opacity-55"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(207,227,255,0.25) 0%, rgba(229,240,255,0.72) 58%, #fff9ee 100%)",
            }}
          />
        </div>

        {/* Authentic Bevel Cloud Layer Overlay */}
        <img
          src="/bevel/clouds.avif"
          alt=""
          width={1440}
          height={420}
          className="pointer-events-none absolute inset-x-0 top-2 z-10 mx-auto w-[calc(100%-1rem)] rounded-t-[24px] object-cover opacity-80 mix-blend-screen"
        />

        {/* Hero Copy Block (100% Bevel Scale: 80px H1, 24px Subtitle) */}
        <div className="relative z-20 mx-auto flex max-w-[960px] flex-col items-center px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ffffff]/85 px-4 py-1.5 text-[13px] font-semibold text-[#222326] shadow-2xs ring-1 ring-[#222326]/8 backdrop-blur-md">
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#415eee"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
            <span>Platform Web SaaS Multi-Tenant LPK & Penempatan Luar Negeri</span>
          </div>

          <h1 id="hero-heading" className="bevel-hero-display max-w-[820px]">
            Pendamping Operasional LPK Terkoneksi
          </h1>

          <p className="bevel-body mt-6 max-w-[680px]">
            Kelola seluruh operasional LPK Anda di satu dashboard web desktop, mulai dari pemberkasan, disiplin asrama, dan Rirekisho otomatis hingga dana talangan.
          </p>

          {/* Rating Strip + Charcoal Action Button */}
          <div className="mt-7 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-[#ffca00]" aria-label="Rating 4.9 dari 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[16px] font-medium text-[#747679]">
                4.9 / 7 Role Terintegrasi LPK
              </span>
            </div>

            <button
              type="button"
              onClick={() => onOpenWorkspaceModal("DEMO_TRIAL")}
              className="inline-flex min-h-[54px] items-center gap-3 rounded-[16px] bg-[#1f2025] px-7 py-3 text-[#ffffff] shadow-lg transition-transform hover:bg-[#000000] active:scale-[0.98]"
            >
              <svg
                aria-hidden="true"
                width="22"
                height="22"
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
                  Web Desktop Multi-Tenant
                </p>
                <p className="text-[17px] leading-tight font-semibold text-[#ffffff]">
                  Buka Dashboard LPK
                </p>
              </div>
            </button>

            <p className="text-[15px] text-[#747679]">
              Mulai ruang kerja namalpk.siapterbang.id secara gratis hari ini.
            </p>
          </div>
        </div>

        {/* .hero_bottom: Web Desktop SaaS Dashboard Showcase + Floating Widget Columns */}
        <div className="bevel-hero-bottom-mask relative z-20 mx-auto mt-10 flex w-full max-w-[1440px] justify-center px-4 pt-2 pb-10">
          {/* Left & Right Floating SaaS Widget Cards */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-6 bottom-0 hidden justify-between xl:flex"
          >
            {/* Left Floating Widgets */}
            <div className="flex w-[280px] flex-col gap-3.5 pt-8">
              <div className="rounded-[20px] bg-[#ffffff]/95 p-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)] backdrop-blur-md">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#747679]">
                  <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
                  <span>GATEKEEPER SENSEI</span>
                </div>
                <p className="mt-1.5 text-[13px] font-medium leading-snug text-[#222326]">
                  14 kandidat lulus evaluasi N4 dan otomatis terbuka di modul <strong>Smart Matching</strong>.
                </p>
              </div>

              <div className="rounded-[20px] bg-[#ffffff]/95 p-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#222326]">Expiry Tracker TU</span>
                  <span className="rounded-full bg-[#ffab94]/35 px-2.5 py-0.5 text-[11px] font-bold text-[#a93f22]">
                    H-24 MCU
                  </span>
                </div>
                <p className="mt-1 text-[12px] text-[#747679]">
                  Notifikasi perpanjangan MCU terkirim otomatis ke siswa & TU.
                </p>
              </div>
            </div>

            {/* Right Floating Widgets */}
            <div className="flex w-[280px] flex-col gap-3.5 pt-8">
              <div className="rounded-[20px] bg-[#ffffff]/95 p-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)] backdrop-blur-md">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#747679]">
                  <span>WHATSAPP ORANG TUA</span>
                  <span className="text-[#1e8300]">Terkirim ✓✓</span>
                </div>
                <p className="mt-1.5 text-[13px] font-medium leading-snug text-[#222326]">
                  Kuitansi Digital PDF ber-QR Code terkirim ke WhatsApp wali saat SPP lunas.
                </p>
              </div>

              <div className="rounded-[20px] bg-[#ffffff]/95 p-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#222326]">Auto-Rirekisho JIS</span>
                  <span className="rounded-full bg-[#b9a6ff]/30 px-2.5 py-0.5 text-[11px] font-bold text-[#583ec2]">
                    1-Klik PDF
                  </span>
                </div>
                <p className="mt-1 text-[12px] text-[#747679]">
                  CV Jepang & Surat Pengantar Disnaker/Imigrasi berkop resmi LPK.
                </p>
              </div>
            </div>
          </div>

          {/* Center Web Desktop SaaS Browser Window (Replacing Mobile Phone Mockup) */}
          <div className="relative z-20 w-full max-w-[820px]">
            <div className="overflow-hidden rounded-[24px] bg-[#1f2025] p-2.5 shadow-[0_32px_80px_-16px_rgba(31,32,37,0.42)] ring-1 ring-[#ffffff]/25">
              {/* macOS Browser Top Chrome Bar */}
              <div className="flex items-center justify-between rounded-t-[16px] bg-[#141518] px-4 py-2.5 text-[#ebf0f8]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-[#1f2025] px-4 py-1 font-mono text-[12px] text-[#ebf0f8]/90 ring-1 ring-[#ffffff]/10">
                  <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
                  <span>https://lpknusantara.siapterbang.id/dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-[#b9a6ff]">
                  <span>7 Role RBAC Aktif</span>
                </div>
              </div>

              {/* Web Desktop Dashboard Content */}
              <div className="grid grid-cols-12 bg-[#f8f9fc] text-[#222326]">
                {/* Desktop Sidebar Navigation */}
                <div className="col-span-3 hidden border-r border-[#ebf0f8] bg-[#ffffff] p-4 sm:block">
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
                      <span>Approval Owner</span>
                      <span className="rounded-full bg-[#a93f22] px-1.5 text-[10px] text-[#ffffff]">2</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Main Workspace */}
                <div className="col-span-12 p-5 sm:col-span-9">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#747679]">
                        MONITORING REAL-TIME LINTAS DIVISI
                      </p>
                      <h2 className="text-[20px] font-bold tracking-tight text-[#222326]">
                        Ringkasan Operasional & Kesiapan Terbang
                      </h2>
                    </div>
                    <span className="rounded-full bg-[#31ce01]/15 px-3 py-1 text-[11px] font-bold text-[#1e8300]">
                      ● 5 Cross-Role Locks Aktif
                    </span>
                  </div>

                  {/* 3 Bevel-Style Circular Gauge Cards inside Desktop Dashboard */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { title: "Kesiapan Bahasa N4", pct: "88%", sub: "42 Siswa Layak Mensetsu", color: "#31ce01", offset: "16" },
                      { title: "Disiplin Asrama", pct: "96%", sub: "0 Siswa Suspended (<100pt)", color: "#ffab94", offset: "6" },
                      { title: "Kelengkapan Berkas", pct: "100%", sub: "KTP, Paspor, MCU & ID CPMI", color: "#b9a6ff", offset: "0" },
                    ].map((g) => (
                      <div key={g.title} className="flex items-center gap-3 rounded-[18px] bg-[#ffffff] p-3.5 shadow-2xs ring-1 ring-[#222326]/5">
                        <svg width="54" height="54" viewBox="0 0 54 54" className="shrink-0" aria-hidden="true">
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
                  <div className="mt-4 rounded-[18px] bg-[#ffffff] p-4 shadow-2xs ring-1 ring-[#222326]/5">
                    <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-2.5 text-[11px] font-semibold text-[#747679]">
                      <span>KANDIDAT SIAP MENSETSU & KEBERANGKATAN</span>
                      <span className="text-[#415eee]">Auto-Generate Rirekisho JIS →</span>
                    </div>
                    <div className="mt-2.5 space-y-2 text-[12px]">
                      {[
                        { name: "Rizky Pratama (NIS-042)", div: "Lulus N4 • Poin 12/100", fin: "Dana Talangan Aktif", stage: "CoE Turun → Visa" },
                        { name: "Ahmad Fauzi (NIS-048)", div: "Lulus N4 • Poin 0/100", fin: "Lunas Pra-Terbang", stage: "Siap Mensetsu Osaka" },
                        { name: "Budi Santoso (NIS-051)", div: "Lulus SSW • Poin 5/100", fin: "Lunas + Kuitansi QR", stage: "Tiket & Terbang" },
                      ].map((row) => (
                        <div key={row.name} className="grid grid-cols-12 items-center rounded-xl bg-[#ebf0f8]/55 px-3 py-2">
                          <span className="col-span-4 font-semibold text-[#222326]">{row.name}</span>
                          <span className="col-span-3 text-[11px] text-[#747679]">{row.div}</span>
                          <span className="col-span-3 text-[11px] font-medium text-[#1e8300]">{row.fin}</span>
                          <span className="col-span-2 text-right font-mono text-[10.5px] font-bold text-[#415eee]">
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
        </div>
      </div>
    </section>
  );
}
