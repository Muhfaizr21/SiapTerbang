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
        {/* Authentic Bevel Cloud Layer at top */}
        <img
          src="/bevel/clouds.avif"
          alt=""
          width={1440}
          height={420}
          fetchPriority="high"
          className="pointer-events-none absolute inset-x-0 top-2 z-10 mx-auto w-[calc(100%-1rem)] rounded-t-[24px] object-cover opacity-90 mix-blend-screen"
        />

        {/* Hero Copy Block */}
        <div className="relative z-20 mx-auto flex max-w-[920px] flex-col items-center px-4 text-center">
          <h1 id="hero-heading" className="bevel-hero-display max-w-[760px]">
            Pendamping Operasional LPK Terkoneksi
          </h1>

          <p className="bevel-body mt-5 max-w-[620px]">
            Kelola seluruh data operasional LPK Anda, dari asrama dan Rirekisho hingga dana talangan, dan semua proses di antaranya.
          </p>

          {/* Rating Strip + Black Download/Action Pill + Subcaption (exact Bevel Hero order) */}
          <div className="mt-7 flex flex-col items-center gap-3.5">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-[#ffca00]" aria-label="Rating 4.9 dari 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[15px] font-normal text-[#747679]">
                4.9 / 7 Role Terintegrasi LPK
              </span>
            </div>

            <button
              type="button"
              onClick={() => onOpenWorkspaceModal("DEMO_TRIAL")}
              className="inline-flex min-h-[50px] items-center gap-3 rounded-[14px] bg-[#1f2025] px-6 py-2.5 text-[#ffffff] shadow-md transition-transform hover:bg-[#000000] active:scale-[0.98]"
            >
              <svg
                aria-hidden="true"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] leading-none font-medium text-[#ebf0f8]/80">
                  B2B Multi-Tenant SaaS
                </p>
                <p className="text-[16px] leading-tight font-semibold text-[#ffffff]">
                  Buka untuk LPK
                </p>
              </div>
            </button>

            <p className="text-[14px] text-[#747679]">
              Mulai dengan SiapTerbang secara gratis hari ini.
            </p>
          </div>
        </div>

        {/* .hero_bottom: Background Floating Card Columns + Center 3D Tilted Phone & Watch + Bottom-Right QR */}
        <div className="bevel-hero-bottom-mask relative z-20 mx-auto mt-6 flex w-full max-w-[1440px] justify-center px-4 pt-4 pb-8 lg:min-h-[540px]">
          {/* Left & Right Floating Widget Card Columns (.hero_bottom-bg) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-2 bottom-0 hidden justify-between lg:flex"
          >
            {/* Left Column of Floating App Widgets */}
            <div className="flex w-[330px] flex-col gap-3.5 pt-6 opacity-90 xl:w-[370px]">
              {/* Widget 1: Sensei Gatekeeper Message */}
              <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#747679]">
                  <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
                  <span>REKOMENDASI SENSEI • BARU SAJA</span>
                </div>
                <p className="mt-1.5 text-[13px] font-medium leading-snug text-[#222326]">
                  14 siswa Angkatan 18 telah lulus evaluasi N4 dan dicentang <strong>Layak Mensetsu</strong>. Nama mereka kini terbuka di modul Smart Matching.
                </p>
              </div>

              {/* Widget 2: 2-Column Mini Metric Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <p className="text-[11px] font-medium text-[#747679]">Poin Disiplin</p>
                  <p className="mt-1 text-[22px] font-semibold tracking-tight text-[#222326]">
                    12 <span className="text-[13px] font-normal text-[#747679]">/ 100</span>
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-[#31ce01]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#1e8300]">
                    Aman • Kamar B-04
                  </span>
                </div>
                <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <p className="text-[11px] font-medium text-[#747679]">Expiry Tracker</p>
                  <p className="mt-1 text-[22px] font-semibold tracking-tight text-[#a93f22]">
                    H-24
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-[#ffab94]/30 px-2.5 py-0.5 text-[11px] font-semibold text-[#a93f22]">
                    MCU Segera Habis
                  </span>
                </div>
              </div>

              {/* Widget 3: Trend Analysis Card */}
              <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#222326]">
                    Tren Kelulusan Mensetsu SO
                  </span>
                  <span className="font-mono text-[12px] font-semibold text-[#415eee]">
                    +18.4%
                  </span>
                </div>
                <div className="mt-3 flex items-end gap-2 h-14">
                  {[38, 52, 46, 68, 74, 65, 88, 94].map((val, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-t-md bg-[#415eee]/80"
                      style={{ height: `${val}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column of Floating App Widgets */}
            <div className="flex w-[330px] flex-col gap-3.5 pt-6 opacity-90 xl:w-[370px]">
              {/* Widget 4: WhatsApp Parent Notification */}
              <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#747679]">
                  <span>WHATSAPP GATEWAY ORANG TUA</span>
                  <span className="text-[#1e8300]">Terkirim ✓✓</span>
                </div>
                <p className="mt-1.5 text-[13px] font-medium leading-snug text-[#222326]">
                  Kuitansi Digital PDF ber-QR Code untuk pembayaran SPP Bulan ke-3 telah dikirim otomatis ke nomor WhatsApp Wali.
                </p>
              </div>

              {/* Widget 5: 2-Column Rirekisho & Refund Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <p className="text-[11px] font-medium text-[#747679]">Auto-Rirekisho</p>
                  <p className="mt-1 text-[20px] font-semibold tracking-tight text-[#222326]">
                    JIS PDF
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-[#b9a6ff]/25 px-2.5 py-0.5 text-[11px] font-semibold text-[#583ec2]">
                    Katakana + Foto
                  </span>
                </div>
                <div className="rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <p className="text-[11px] font-medium text-[#747679]">Financial Gate</p>
                  <p className="mt-1 text-[20px] font-semibold tracking-tight text-[#1e8300]">
                    Terbuka
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-[#ffca00]/25 px-2.5 py-0.5 text-[11px] font-semibold text-[#8a6a00]">
                    Siap Apply Visa
                  </span>
                </div>
              </div>

              {/* Widget 6: Candidate Profile Container */}
              <div className="flex items-center justify-between rounded-[20px] bg-[#ffffff]/92 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div>
                  <p className="text-[12px] font-semibold text-[#222326]">
                    Siklus Rematching Wawancara
                  </p>
                  <p className="text-[11px] text-[#747679]">
                    Kandidat gagal otomatis kembali ke Pool Siap Mensetsu
                  </p>
                </div>
                <span className="rounded-full bg-[#ebf0f8] px-3 py-1 font-mono text-[11px] font-semibold text-[#222326]">
                  Many-to-Many
                </span>
              </div>
            </div>
          </div>

          {/* Center 3D Tilted iPhone + Overlapping Apple Watch (Exact Bevel Hero Device Composition) */}
          <div className="relative z-20 flex items-end justify-center pt-2">
            {/* 3D Tilted iPhone Mockup */}
            <div className="relative w-[300px] sm:w-[335px] rounded-[48px] bg-[#1f2025] p-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.42)] ring-2 ring-[#ffffff]/30 transition-transform duration-500 lg:-translate-x-8 lg:rotate-[5deg]">
              <div className="mx-auto mb-2.5 flex h-6 w-24 items-center justify-between rounded-full bg-[#09090b] px-3">
                <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
                <span className="font-mono text-[9px] text-[#ebf0f8]">SIAPTERBANG</span>
              </div>

              <div className="overflow-hidden rounded-[38px] bg-[#f7f9fc] p-4 text-[#222326]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-medium text-[#747679]">Hari Ini, 18 Nov</p>
                    <p className="text-[17px] font-semibold tracking-tight text-[#222326]">
                      Kesiapan Kandidat
                    </p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ebf0f8] text-[12px] font-bold text-[#222326]">
                    RP
                  </span>
                </div>

                {/* 3 Signature Bevel Circular Gauge Rings */}
                <div className="mt-3.5 grid grid-cols-3 gap-2 rounded-[20px] bg-[#ffffff] p-3 shadow-2xs">
                  {[
                    { label: "Disiplin", val: "92%", color: "#ffab94", offset: "10" },
                    { label: "Bahasa N4", val: "88%", color: "#31ce01", offset: "15" },
                    { label: "Berkas", val: "100%", color: "#b9a6ff", offset: "0" },
                  ].map((ring) => (
                    <div key={ring.label} className="flex flex-col items-center">
                      <svg width="58" height="58" viewBox="0 0 58 58" aria-hidden="true">
                        <circle cx="29" cy="29" r="22" stroke="#ebf0f8" strokeWidth="5.5" fill="none" />
                        <circle
                          cx="29"
                          cy="29"
                          r="22"
                          stroke={ring.color}
                          strokeWidth="5.5"
                          strokeDasharray="138"
                          strokeDashoffset={ring.offset}
                          strokeLinecap="round"
                          fill="none"
                          transform="rotate(-90 29 29)"
                        />
                        <text
                          x="29"
                          y="33"
                          textAnchor="middle"
                          className="fill-[#222326] text-[13px] font-semibold"
                        >
                          {ring.val}
                        </text>
                      </svg>
                      <span className="mt-1 text-[11px] font-medium text-[#747679]">
                        {ring.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coaching / Gatekeeper Status Box inside Phone */}
                <div className="mt-3 rounded-[18px] bg-[#ffffff] p-3.5 shadow-2xs">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#747679]">
                    VALIDASI GATEKEEPER LINTAS DIVISI
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-[#222326]">
                    Status <strong>Layak Mensetsu</strong> telah aktif. Poin disiplin asrama di bawah ambang batas dan seluruh 7 berkas CPMI valid.
                  </p>
                </div>

                {/* Stepper Tracker */}
                <div className="mt-3 rounded-[18px] bg-[#ffffff] p-3.5 shadow-2xs">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span>Pipeline Keberangkatan</span>
                    <span className="text-[#415eee]">CoE Turun → Visa</span>
                  </div>
                  <div className="mt-2 grid grid-cols-5 gap-1">
                    <div className="h-1.5 rounded-full bg-[#31ce01]" />
                    <div className="h-1.5 rounded-full bg-[#31ce01]" />
                    <div className="h-1.5 rounded-full bg-[#31ce01]" />
                    <div className="h-1.5 rounded-full bg-[#415eee]" />
                    <div className="h-1.5 rounded-full bg-[#ebf0f8]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping 3D Tilted Apple Watch Squircle Device on Right */}
            <div className="relative z-30 -ml-10 mb-6 hidden w-[190px] -rotate-[5deg] rounded-[42px] bg-[#1f2025] p-3 text-[#ffffff] shadow-[0_25px_50px_rgba(0,0,0,0.45)] ring-4 ring-[#2c2e35] sm:block">
              {/* Watch Crown */}
              <div className="absolute top-12 -right-2 h-8 w-2 rounded-r-md bg-[#3a3d46]" />
              <div className="rounded-[32px] bg-[#09090b] p-3.5">
                <div className="flex items-center justify-between text-[10px] text-[#747679]">
                  <span>LPK LIVE</span>
                  <span className="font-mono text-[#31ce01]">100%</span>
                </div>
                <div className="my-2 flex justify-center">
                  <svg width="76" height="76" viewBox="0 0 76 76" aria-hidden="true">
                    <circle cx="38" cy="38" r="30" stroke="#222326" strokeWidth="7" fill="none" />
                    <circle
                      cx="38"
                      cy="38"
                      r="30"
                      stroke="#31ce01"
                      strokeWidth="7"
                      strokeDasharray="188"
                      strokeDashoffset="24"
                      strokeLinecap="round"
                      fill="none"
                      transform="rotate(-90 38 38)"
                    />
                    <text x="38" y="36" textAnchor="middle" className="fill-[#ffffff] text-[15px] font-bold">
                      148
                    </text>
                    <text x="38" y="49" textAnchor="middle" className="fill-[#747679] text-[9px]">
                      Siswa Aktif
                    </text>
                  </svg>
                </div>
                <div className="rounded-xl bg-[#1f2025] px-2.5 py-1.5 text-center">
                  <p className="text-[10px] font-semibold text-[#ffca00]">42 Siap Mensetsu</p>
                  <p className="text-[9px] text-[#ebf0f8]/70">0 Suspended</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exact Bevel Bottom-Right QR Code Card inside Hero (.qr_container) */}
        <div className=" absolute right-4 bottom-4 z-30 hidden w-[224px] items-center gap-3 rounded-[16px] bg-[#1f2025] p-2 text-[#ebf0f8] shadow-[0_2px_16px_rgba(0,0,0,0.18)] lg:flex">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[10px] bg-[#ffffff] p-1.5">
            <svg viewBox="0 0 36 36" className="h-full w-full fill-[#1f2025]" aria-hidden="true">
              <path d="M2 2h10v10H2V2zm2 2v6h6V4H4zm2 2h2v2H6V6zm18-4h10v10H24V2zm2 2v6h6V4h-6zm2 2h2v2h-2V6zM2 24h10v10H2V24zm2 2v6h6v-6H4zm2 2h2v2H6v-2zm10-24h4v4h-4V4zm4 4h4v4h-4V8zm-4 4h4v4h-4v-4zm0 8h4v4h-4v-4zm8-4h4v4h-4v-4zm4 4h6v4h-6v-4zm-8 4h4v6h-4v-6zm6 4h6v6h-6v-6z" />
            </svg>
          </div>
          <div className="pr-1">
            <p className="text-[12px] font-semibold leading-snug text-[#ffffff]">
              Coba Portal Mobile Siswa
            </p>
            <button
              type="button"
              onClick={() => onOpenWorkspaceModal("7. Portal Siswa")}
              className="mt-1 text-[11px] font-medium text-[#ebf0f8]/75 underline underline-offset-2 hover:text-[#ffffff]"
            >
              Klik atau scan QR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
