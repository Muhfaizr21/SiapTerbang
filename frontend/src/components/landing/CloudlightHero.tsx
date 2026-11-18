"use client";

import type { HeroFloatingMetricCard } from "@/types/landing";
import { getAccentTokens } from "@/utils/accent-tokens";

export interface CloudlightHeroProps {
  readonly floatingCards: ReadonlyArray<HeroFloatingMetricCard>;
  readonly onOpenWorkspaceModal: (initialRole?: string) => void;
}

export function CloudlightHero({
  floatingCards,
  onOpenWorkspaceModal,
}: CloudlightHeroProps) {
  return (
    <section
      id="beranda"
      aria-labelledby="hero-heading"
      className="mx-auto mt-4 w-full max-w-[1400px] px-3 sm:px-6"
    >
      <div className="bevel-hero-sky relative overflow-hidden rounded-[32px] px-4 pt-12 pb-14 sm:px-8 md:pt-16 md:pb-20">
        {/* Atmospheric soft cloudlight vectors matching Bevel's hero_clouds */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-80 w-full opacity-70"
          viewBox="0 0 1440 360"
          fill="none"
          preserveAspectRatio="none"
        >
          <ellipse cx="220" cy="90" rx="340" ry="110" fill="#ffffff" fillOpacity="0.55" />
          <ellipse cx="1180" cy="70" rx="380" ry="125" fill="#ffffff" fillOpacity="0.5" />
          <ellipse cx="720" cy="210" rx="480" ry="130" fill="#ffffff" fillOpacity="0.4" />
        </svg>

        {/* Centered Headline, Subtitle, Rating Proof, and Charcoal Pill */}
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ffffff]/80 px-4 py-1.5 text-[12px] font-medium leading-[13.2px] text-[#222326] shadow-xs ring-1 ring-[#222326]/8">
            <span className="h-2 w-2 rounded-full bg-[#31ce01]" aria-hidden="true" />
            <span>B2B SaaS Multi-Tenant • 7 Role Terintegrasi (siapterbang.id)</span>
          </div>

          <h1 id="hero-heading" className="bevel-hero-display max-w-2xl">
            Sistem Terpadu Operasional LPK
          </h1>

          <p className="bevel-body mt-5 max-w-2xl">
            Satukan pemberkasan legalitas CPMI, disiplin asrama, pembuatan CV Rirekisho otomatis, hingga pencatatan dana talangan dalam satu ruang kerja tertutup.
          </p>

          {/* Hero Rating & Proof Strip (Signal Gold #ffca00 stars + Body Gray metadata) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <div className="flex items-center gap-0.5 text-[#ffca00]" aria-label="Standar bintang lima">
              {Array.from({ length: 5 }).map((_, idx) => (
                <svg
                  key={idx}
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[12px] font-medium leading-[13.2px] text-[#747679]">
              5 Cross-Role Locks Otomatis • Standar Magang Jepang, Tokutei Ginou (SSW) & G-to-G Korea
            </span>
          </div>

          {/* Charcoal Download / Action Pill */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenWorkspaceModal("DEMO_TRIAL")}
              className="bevel-charcoal-pill inline-flex min-h-[46px] items-center gap-2.5 px-6 text-[16px]"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span>Aktifkan Subdomain LPK</span>
            </button>
            <a
              href="#arsitektur-role"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-[128px] bg-[#ffffff]/90 px-5 text-[16px] font-medium text-[#222326] shadow-xs ring-1 ring-[#222326]/10 transition-colors hover:bg-[#ffffff]"
            >
              <span>Eksplorasi 7 Role</span>
            </a>
          </div>
          <p className="mt-2.5 text-[12px] leading-[13.2px] text-[#747679]">
            Mulai dengan Paket Starter atau Pro • Isolasi data penuh di namalpk.siapterbang.id
          </p>
        </div>

        {/* Layered Device Composition + Floating Metric Cards (Bevel Hero Showcase) */}
        <div className="relative z-10 mx-auto mt-12 max-w-6xl">
          {/* Desktop Floating Contextual Cards around the Central Device */}
          <div className="hidden xl:block">
            {floatingCards.map((card) => {
              const tokens = getAccentTokens(card.accent);
              return (
                <div
                  key={card.id}
                  className={`bevel-media-shadow absolute z-20 w-64 rounded-[20px] bg-[#ffffff]/95 p-3.5 backdrop-blur-md ring-1 ring-[#222326]/6 ${card.positionClass}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#747679]">
                      {card.category}
                    </span>
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${tokens.bgClass}`}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-1 text-[14px] font-semibold text-[#222326]">{card.title}</p>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[13px] font-semibold ${tokens.softBgClass} ${tokens.textClass}`}
                    >
                      {card.value}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-snug text-[#747679]">{card.subtitle}</p>
                </div>
              );
            })}
          </div>

          {/* Central Overlapping Device Renders: Primary iPhone Portal + Secondary Watch/Companion Card */}
          <div className="mx-auto flex flex-col items-center justify-center lg:flex-row lg:items-end lg:gap-6">
            {/* Primary Device: iPhone Frame displaying SiapTerbang Daily Readiness & Cross-Role Rings */}
            <div className="relative z-10 w-full max-w-[380px] rounded-[44px] bg-[#1f2025] p-3 shadow-[0_24px_60px_-15px_rgba(31,32,37,0.35)] ring-1 ring-[#ffffff]/20">
              {/* Dynamic Island */}
              <div className="mx-auto mb-2.5 flex h-6 w-28 items-center justify-between rounded-full bg-[#09090b] px-3">
                <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
                <span className="font-mono text-[10px] text-[#ebf0f8]">NIS-2026-042</span>
              </div>

              {/* Inner Screen */}
              <div className="overflow-hidden rounded-[34px] bg-[#ffffff] p-4 text-[#222326]">
                <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-3">
                  <div>
                    <p className="text-[11px] font-medium text-[#747679]">
                      lpknusantara.siapterbang.id
                    </p>
                    <p className="text-[16px] font-semibold tracking-tight text-[#222326]">
                      Rizky Pratama • Angkatan 14
                    </p>
                  </div>
                  <span className="rounded-full bg-[#31ce01]/15 px-2.5 py-1 text-[11px] font-semibold text-[#1e8300]">
                    Siap Wawancara
                  </span>
                </div>

                {/* 3 Bevel-style Circular Health/Readiness Rings */}
                <div className="mt-4 grid grid-cols-3 gap-2.5 rounded-[20px] bg-[#ebf0f8] p-3 text-center">
                  {/* Ring 1: Akademik Bahasa */}
                  <div className="flex flex-col items-center rounded-[14px] bg-[#ffffff] p-2.5">
                    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true">
                      <circle cx="27" cy="27" r="21" stroke="#ebf0f8" strokeWidth="5" fill="none" />
                      <circle
                        cx="27"
                        cy="27"
                        r="21"
                        stroke="#31ce01"
                        strokeWidth="5"
                        strokeDasharray="131.9"
                        strokeDashoffset="15.8"
                        strokeLinecap="round"
                        fill="none"
                        transform="rotate(-90 27 27)"
                      />
                      <text
                        x="27"
                        y="31"
                        textAnchor="middle"
                        className="fill-[#222326] text-[12px] font-semibold"
                      >
                        88%
                      </text>
                    </svg>
                    <span className="mt-1 text-[11px] font-semibold text-[#222326]">Bahasa N4</span>
                    <span className="text-[10px] text-[#747679]">Layak Mensetsu</span>
                  </div>

                  {/* Ring 2: Disiplin Asrama */}
                  <div className="flex flex-col items-center rounded-[14px] bg-[#ffffff] p-2.5">
                    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true">
                      <circle cx="27" cy="27" r="21" stroke="#ebf0f8" strokeWidth="5" fill="none" />
                      <circle
                        cx="27"
                        cy="27"
                        r="21"
                        stroke="#415eee"
                        strokeWidth="5"
                        strokeDasharray="131.9"
                        strokeDashoffset="112"
                        strokeLinecap="round"
                        fill="none"
                        transform="rotate(-90 27 27)"
                      />
                      <text
                        x="27"
                        y="31"
                        textAnchor="middle"
                        className="fill-[#222326] text-[12px] font-semibold"
                      >
                        15pt
                      </text>
                    </svg>
                    <span className="mt-1 text-[11px] font-semibold text-[#222326]">Disiplin</span>
                    <span className="text-[10px] text-[#747679]">Batas: 100pt</span>
                  </div>

                  {/* Ring 3: Berkas Legal */}
                  <div className="flex flex-col items-center rounded-[14px] bg-[#ffffff] p-2.5">
                    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true">
                      <circle cx="27" cy="27" r="21" stroke="#ebf0f8" strokeWidth="5" fill="none" />
                      <circle
                        cx="27"
                        cy="27"
                        r="21"
                        stroke="#ffca00"
                        strokeWidth="5"
                        strokeDasharray="131.9"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        fill="none"
                        transform="rotate(-90 27 27)"
                      />
                      <text
                        x="27"
                        y="31"
                        textAnchor="middle"
                        className="fill-[#222326] text-[12px] font-semibold"
                      >
                        7/7
                      </text>
                    </svg>
                    <span className="mt-1 text-[11px] font-semibold text-[#222326]">Pemberkasan</span>
                    <span className="text-[10px] text-[#747679]">MCU & Paspor</span>
                  </div>
                </div>

                {/* Timeline Stepper inside Phone Screen */}
                <div className="mt-3.5 rounded-[18px] bg-[#ebf0f8]/70 p-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#222326]">
                    <span>Progress Pipeline Keberangkatan</span>
                    <span className="text-[#415eee]">Tahap 3 / 5</span>
                  </div>
                  <div className="mt-2.5 grid grid-cols-5 gap-1">
                    {["PPDB", "Belajar", "Mensetsu", "CoE/Visa", "Terbang"].map((step, i) => (
                      <div key={step} className="flex flex-col items-center">
                        <div
                          className={`h-1.5 w-full rounded-full ${
                            i < 3
                              ? "bg-[#31ce01]"
                              : i === 3
                              ? "bg-[#415eee]"
                              : "bg-[#222326]/15"
                          }`}
                        />
                        <span className="mt-1 text-[9px] font-medium text-[#747679]">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Action Cards inside Phone */}
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between rounded-[14px] bg-[#ebf0f8]/50 px-3 py-2">
                    <div>
                      <p className="text-[12px] font-semibold text-[#222326]">
                        CV Rirekisho Standar JIS
                      </p>
                      <p className="text-[11px] text-[#747679]">
                        Otomatis terisi dari Biodata & Nilai Sensei
                      </p>
                    </div>
                    <span className="rounded-full bg-[#1f2025] px-2.5 py-1 text-[10px] font-medium text-[#ebf0f8]">
                      PDF Siap
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-[14px] bg-[#ebf0f8]/50 px-3 py-2">
                    <div>
                      <p className="text-[12px] font-semibold text-[#222326]">
                        Tagihan Pra-Keberangkatan
                      </p>
                      <p className="text-[11px] text-[#747679]">
                        Kuitansi QR terkirim ke WA Orang Tua
                      </p>
                    </div>
                    <span className="rounded-full bg-[#31ce01]/20 px-2.5 py-1 text-[10px] font-semibold text-[#1e8300]">
                      Lunas
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Companion Render (Apple Watch / Executive Control Widget style) */}
            <div className="mt-6 w-full max-w-[300px] rounded-[36px] bg-[#1f2025] p-4 text-[#ebf0f8] shadow-[0_20px_50px_-12px_rgba(31,32,37,0.4)] ring-1 ring-[#ffffff]/15 lg:-ml-8 lg:mb-6">
              <div className="flex items-center justify-between border-b border-[#ffffff]/10 pb-2.5">
                <span className="text-[11px] font-medium text-[#b9a6ff]">
                  Kontrol Eksekutif Direktur LPK
                </span>
                <span className="rounded-full bg-[#ffca00]/20 px-2 py-0.5 text-[10px] font-semibold text-[#ffca00]">
                  Real-Time
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <div className="rounded-[16px] bg-[#ffffff]/8 p-2.5">
                  <span className="text-[11px] text-[#ebf0f8]/70">Siswa Aktif</span>
                  <p className="mt-0.5 font-mono text-[20px] font-semibold text-[#ffffff]">148</p>
                  <span className="text-[10px] text-[#31ce01]">42 Layak Mensetsu</span>
                </div>
                <div className="rounded-[16px] bg-[#ffffff]/8 p-2.5">
                  <span className="text-[11px] text-[#ebf0f8]/70">Approval Kas</span>
                  <p className="mt-0.5 font-mono text-[20px] font-semibold text-[#ffab94]">2</p>
                  <span className="text-[10px] text-[#ebf0f8]/80">Refund & Diskon</span>
                </div>
              </div>
              <div className="mt-3 rounded-[16px] bg-[#ffffff]/8 p-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#ebf0f8]/80">Peringatan H-30 Dokumen</span>
                  <span className="font-semibold text-[#ffab94]">3 Berkas</span>
                </div>
                <p className="mt-1 text-[11px] text-[#ebf0f8]/65">
                  2 MCU & 1 Paspor mendekati masa kedaluwarsa sebelum jadwal CoE.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Grid for the 6 Floating Metric Cards */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:hidden">
            {floatingCards.map((card) => {
              const tokens = getAccentTokens(card.accent);
              return (
                <div
                  key={card.id}
                  className="rounded-[20px] bg-[#ffffff]/90 p-4 shadow-xs ring-1 ring-[#222326]/6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#747679]">
                      {card.category}
                    </span>
                    <span className={`h-2.5 w-2.5 rounded-full ${tokens.bgClass}`} />
                  </div>
                  <p className="mt-1 text-[15px] font-semibold text-[#222326]">{card.title}</p>
                  <span
                    className={`mt-1.5 inline-block rounded-md px-2 py-0.5 text-[12px] font-semibold ${tokens.softBgClass} ${tokens.textClass}`}
                  >
                    {card.value}
                  </span>
                  <p className="mt-1 text-[12px] text-[#747679]">{card.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
