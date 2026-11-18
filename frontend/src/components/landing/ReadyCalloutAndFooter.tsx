"use client";

import type { FooterLinkColumn } from "@/types/landing";

export interface ReadyCalloutAndFooterProps {
  readonly footerColumns: ReadonlyArray<FooterLinkColumn>;
  readonly onOpenWorkspaceModal: (initialRole?: string) => void;
}

export function ReadyCalloutAndFooter({
  footerColumns,
  onOpenWorkspaceModal,
}: ReadyCalloutAndFooterProps) {
  return (
    <>
      {/* SECTION 10: Ready When You Are + Overhead Flat-Lay Composition (.footer_cta-image) */}
      <section
        id="mulai-sekarang"
        aria-labelledby="ready-heading"
        className="bevel-container mt-28 overflow-hidden pt-4 pb-0 text-center"
      >
        <div className="mx-auto max-w-[700px]">
          <h2 id="ready-heading" className="bevel-display">
            Siap Kapan Pun Anda Siap
          </h2>
          <p className="bevel-body mt-5">
            Mulai dari satu langkah. Satu angkatan setiap waktu. SiapTerbang mendampingi LPK Anda bergerak maju dengan kejelasan dan kepastian.
          </p>

          <div className="mt-8 flex justify-center">
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
          </div>
        </div>

        {/* .footer_cta-image: Overhead Studio Flat-Lay with Web Desktop Window, Passport/CoE, QR Card & Rirekisho */}
        <div className="relative mx-auto mt-16 flex max-w-[1320px] flex-wrap items-center justify-center gap-6 px-4 py-8 sm:gap-10">
          {/* Item 1: Passport & CoE Document Folder */}
          <div className="-rotate-6 rounded-[22px] bg-[#1c2b4a] p-5 text-left text-[#ffffff] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.22)] w-[190px] sm:w-[215px]">
            <p className="font-mono text-[9.5px] tracking-widest text-[#ffca00]">
              REPUBLIC OF INDONESIA
            </p>
            <p className="mt-1 text-[16px] font-bold">PASPOR & CoE</p>
            <div className="my-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#ffca00]/50 text-[#ffca00]">
              ✈
            </div>
            <span className="inline-block rounded-md bg-[#31ce01]/25 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#31ce01]">
              H-30 Tracker Aman
            </span>
          </div>

          {/* Item 2: Student QR ID Card Lanyard */}
          <div className="rotate-3 rounded-[22px] bg-[#ebf0f8] p-5 text-left text-[#222326] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.16)] ring-1 ring-[#222326]/8 w-[185px] sm:w-[205px]">
            <div className="mx-auto mb-3 h-2 w-10 rounded-full bg-[#222326]/20" />
            <p className="text-[11px] font-bold text-[#415eee]">KARTU SISWA LPK</p>
            <p className="text-[15px] font-bold text-[#222326]">NIS-2026-042</p>
            <div className="mt-3 flex h-14 w-14 items-center justify-center rounded-lg bg-[#ffffff] p-1.5 shadow-2xs">
              <svg viewBox="0 0 36 36" className="h-full w-full fill-[#1f2025]" aria-hidden="true">
                <path d="M2 2h10v10H2V2zm2 2v6h6V4H4zm18-2h10v10H22V2zm2 2v6h6V4h-6zM2 22h10v10H2V22zm2 2v6h6v-6H4zm12-10h6v6h-6v-6zm8 8h8v8h-8v-8z" />
              </svg>
            </div>
            <p className="mt-2 text-[10.5px] text-[#747679]">Scan Presensi & Asrama</p>
          </div>

          {/* Item 3: Center Web Desktop Dashboard Window (Replacing Smartphone) */}
          <div className="-rotate-1 rounded-[22px] bg-[#1f2025] p-2 text-[#222326] shadow-[0_26px_55px_-12px_rgba(0,0,0,0.32)] w-[290px] sm:w-[340px]">
            <div className="flex items-center justify-between rounded-t-[14px] bg-[#141518] px-3 py-1.5 text-[10px] text-[#ebf0f8]">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
              </div>
              <span className="font-mono">lpknusantara.siapterbang.id</span>
              <span className="text-[#31ce01]">●</span>
            </div>
            <div className="rounded-b-[14px] bg-[#ffffff] p-4 text-left">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#747679]">
                <span>Dashboard Eksekutif Web</span>
                <span className="text-[#1e8300]">7 Role Aktif</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-[#ebf0f8] p-3 text-center">
                <div>
                  <p className="text-[14px] font-bold text-[#222326]">88%</p>
                  <p className="text-[9px] text-[#747679]">Bahasa N4</p>
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#1e8300]">Lunas</p>
                  <p className="text-[9px] text-[#747679]">Keuangan</p>
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#415eee]">7/7</p>
                  <p className="text-[9px] text-[#747679]">Berkas</p>
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] font-semibold text-[#222326]">
                Status Pipeline: Siap Terbang
              </p>
            </div>
          </div>

          {/* Item 4: Rirekisho & Kanji Dictionary Pocket Card */}
          <div className="rotate-6 rounded-[22px] bg-[#fff9ee] p-5 text-left text-[#222326] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.16)] ring-1 ring-[#222326]/10 w-[190px] sm:w-[215px]">
            <span className="rounded-md bg-[#ffca00]/30 px-2 py-0.5 font-mono text-[10px] font-bold text-[#8a6a00]">
              履歴書 • JLPT N4
            </span>
            <p className="mt-2 text-[16px] font-bold text-[#222326]">
              Auto-Rirekisho JIS
            </p>
            <p className="mt-1 text-[11.5px] leading-snug text-[#747679]">
              CV Jepang, Surat Disnaker & Kuitansi QR siap cetak.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-[10.5px] font-semibold text-[#1e8300]">
              <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
              <span>Terverifikasi Sensei</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: footer.footer-2 (Exact Bevel 2-Side Footer Structure at 100% Scale) */}
      <footer className="bevel-container bg-[#ffffff] pt-28 pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-10 lg:col-span-4">
            <div>
              <a
                href="#beranda"
                className="inline-flex items-center gap-2.5 text-[22px] font-semibold text-[#222326]"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#1f2025] text-[#ffffff]"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                  </svg>
                </span>
                <span>SiapTerbang</span>
              </a>
              <p className="mt-2.5 text-[16px] text-[#747679]">
                © SiapTerbang, Inc. 2026
              </p>
            </div>

            <div className="flex items-center gap-7 text-[#222326]">
              {[
                { label: "Instagram", href: "#beranda", path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" },
                { label: "Twitter / X", href: "#beranda", path: "M4 4l16 16M20 4L4 20" },
                { label: "Komunitas LPK", href: "#beranda", path: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-3 9a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 9 11zm6 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 15 11zm-6.5 4a5.5 5.5 0 0 0 7 0" },
                { label: "YouTube", href: "#beranda", path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" },
                { label: "Facebook", href: "#beranda", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  aria-label={soc.label}
                  className="text-[#222326] transition-opacity hover:opacity-65"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={soc.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-12 lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {footerColumns.map((col) => (
                <div key={col.id}>
                  <h2 className="text-[17px] font-semibold text-[#747679]">
                    {col.heading}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {col.links.map((lnk) => (
                      <li key={lnk.label}>
                        <a
                          href={lnk.href}
                          className="text-[17px] font-medium leading-[24px] text-[#222326] transition-opacity hover:opacity-65"
                        >
                          {lnk.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-start gap-4 lg:justify-end">
              <div className="flex items-center gap-2.5 rounded-full border border-[#222326]/12 bg-[#ebf0f8]/50 px-4 py-2 text-[12px] font-semibold text-[#222326]">
                <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
                <span>MULTI-TENANT RLS COMPLIANT</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-full border border-[#222326]/12 bg-[#ebf0f8]/50 px-4 py-2 text-[12px] font-semibold text-[#222326]">
                <span className="h-2 w-2 rounded-full bg-[#415eee]" />
                <span>STANDAR DISNAKER & BP2MI</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
