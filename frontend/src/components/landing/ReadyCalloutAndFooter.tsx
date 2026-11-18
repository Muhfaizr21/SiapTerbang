"use client";

import { useState } from "react";
import type { FooterLinkColumn } from "@/types/landing";

export interface ReadyCalloutAndFooterProps {
  readonly footerColumns: ReadonlyArray<FooterLinkColumn>;
  readonly onOpenWorkspaceModal: (initialRole?: string) => void;
}

export function ReadyCalloutAndFooter({
  footerColumns,
  onOpenWorkspaceModal,
}: ReadyCalloutAndFooterProps) {
  const [qrCollapsed, setQrCollapsed] = useState(false);

  return (
    <>
      {/* SECTION 10: Ready When You Are -> Siap Kapan Pun LPK Anda Siap */}
      <section
        id="mulai-sekarang"
        aria-labelledby="ready-heading"
        className="mx-auto mt-[80px] w-full max-w-[1400px] px-4 sm:px-6"
      >
        <div className="bevel-hero-sky overflow-hidden rounded-[32px] px-6 py-16 text-center sm:px-12 md:py-24">
          <h2 id="ready-heading" className="bevel-display mx-auto max-w-2xl">
            Siap kapan pun LPK Anda siap
          </h2>
          <p className="bevel-body mx-auto mt-4 max-w-2xl">
            Mulai dari satu angkatan, satu kelas bahasa, dan satu berkas terverifikasi. SiapTerbang mendampingi LPK Anda melangkah lebih rapi, transparan, dan terpercaya.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenWorkspaceModal("DEMO_TRIAL")}
              className="bevel-charcoal-pill inline-flex min-h-[48px] items-center gap-2.5 px-7 text-[16px]"
            >
              <span>Buka Ruang Kerja LPK Sekarang</span>
            </button>
          </div>

          {/* Flat-Lay Visual Composition of LPK Essentials (matching Bevel's footer_cta-image flat-lay) */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-[20px] bg-[#ffffff]/90 p-4 text-left shadow-xs ring-1 ring-[#222326]/6">
              <span className="font-mono text-[11px] font-semibold text-[#415eee]">
                01 • KARTU QR SISWA
              </span>
              <p className="mt-1.5 text-[15px] font-semibold text-[#222326]">
                Presensi & Poin Asrama
              </p>
              <p className="mt-1 text-[12px] text-[#747679]">
                Terhubung langsung ke orang tua via WA
              </p>
            </div>

            <div className="rounded-[20px] bg-[#ffffff]/90 p-4 text-left shadow-xs ring-1 ring-[#222326]/6">
              <span className="font-mono text-[11px] font-semibold text-[#1e8300]">
                02 • RIREKISHO JIS
              </span>
              <p className="mt-1.5 text-[15px] font-semibold text-[#222326]">
                CV Jepang & Surat Dinas
              </p>
              <p className="mt-1 text-[12px] text-[#747679]">
                Cetak otomatis berkop resmi LPK
              </p>
            </div>

            <div className="rounded-[20px] bg-[#ffffff]/90 p-4 text-left shadow-xs ring-1 ring-[#222326]/6">
              <span className="font-mono text-[11px] font-semibold text-[#a93f22]">
                03 • PASPOR & COE
              </span>
              <p className="mt-1.5 text-[15px] font-semibold text-[#222326]">
                Pelacak H-30 & Visa
              </p>
              <p className="mt-1 text-[12px] text-[#747679]">
                Terkunci aman dengan Financial Gate
              </p>
            </div>

            <div className="rounded-[20px] bg-[#ffffff]/90 p-4 text-left shadow-xs ring-1 ring-[#222326]/6">
              <span className="font-mono text-[11px] font-semibold text-[#583ec2]">
                04 • PORTAL MANDIRI
              </span>
              <p className="mt-1.5 text-[15px] font-semibold text-[#222326]">
                Mobile Web Kandidat
              </p>
              <p className="mt-1 text-[12px] text-[#747679]">
                Unggah berkas & pantau tagihan mandiri
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: Footer Link Group (DESIGN.md: Paper White #ffffff, 18px/25.2px weight-500 links, generous padding) */}
      <footer className="mx-auto w-full max-w-[1400px] bg-[#ffffff] px-4 pt-[96px] pb-[120px] sm:px-6 lg:pt-[140px]">
        <div className="grid grid-cols-1 gap-10 border-t border-[#ebf0f8] pt-14 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 text-[20px] font-semibold text-[#222326]">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1f2025] text-[#ebf0f8]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
              </span>
              <span>SiapTerbang</span>
            </div>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#747679]">
              Platform SaaS Multi-Tenant Manajemen Operasional LPK & Penyalur Tenaga Kerja Luar Negeri (siapterbang.id).
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-md bg-[#ebf0f8] px-2.5 py-1 font-mono text-[11px] font-medium text-[#222326]">
                Multi-Tenant RLS
              </span>
              <span className="rounded-md bg-[#ebf0f8] px-2.5 py-1 font-mono text-[11px] font-medium text-[#222326]">
                7 Role Terintegrasi
              </span>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.id}>
              <h2 className="text-[14px] font-semibold uppercase tracking-wider text-[#747679]">
                {col.heading}
              </h2>
              <ul className="mt-4 space-y-4">
                {col.links.map((lnk) => (
                  <li key={lnk.label}>
                    <a
                      href={lnk.href}
                      className="text-[18px] font-medium leading-[25.2px] text-[#222326] transition-colors hover:text-[#415eee]"
                    >
                      {lnk.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#ebf0f8] pt-8 text-[14px] text-[#747679] sm:flex-row sm:items-center">
          <p>© 2026 SiapTerbang (siapterbang.id). Seluruh hak cipta dilindungi.</p>
          <p>Sistem Manajemen LPK Magang Jepang, Tokutei Ginou (SSW), G-to-G Korea & Perhotelan.</p>
        </div>
      </footer>

      {/* DESIGN.md Component: Elevated QR Download / Portal Card (Charcoal #1f2025, Cloud Card #ebf0f8 text, 16px radius) */}
      <aside
        aria-label="Akses Cepat Portal Mobile Web Siswa"
        className="bevel-qr-shadow fixed right-5 bottom-5 z-30 hidden rounded-[16px] bg-[#1f2025] p-3.5 text-[#ebf0f8] ring-1 ring-[#ffffff]/12 lg:block"
      >
        {qrCollapsed ? (
          <button
            type="button"
            onClick={() => setQrCollapsed(false)}
            className="flex items-center gap-2 px-1 text-[12px] font-medium text-[#ebf0f8]"
          >
            <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
            <span>QR Portal Siswa</span>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[10px] bg-[#ffffff] p-1.5">
              {/* High-contrast SVG QR Code */}
              <svg
                aria-hidden="true"
                viewBox="0 0 36 36"
                className="h-full w-full fill-[#1f2025]"
              >
                <path d="M2 2h10v10H2V2zm2 2v6h6V4H4zm2 2h2v2H6V6zm18-4h10v10H24V2zm2 2v6h6V4h-6zm2 2h2v2h-2V6zM2 24h10v10H2V24zm2 2v6h6v-6H4zm2 2h2v2H6v-2zm10-24h4v4h-4V4zm4 4h4v4h-4V8zm-4 4h4v4h-4v-4zm0 8h4v4h-4v-4zm8-4h4v4h-4v-4zm4 4h6v4h-6v-4zm-8 4h4v6h-4v-6zm6 4h6v6h-6v-6z" />
              </svg>
            </div>
            <div className="max-w-[145px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#ffca00]">
                  Portal Mobile Siswa
                </span>
                <button
                  type="button"
                  aria-label="Sembunyikan kartu QR"
                  onClick={() => setQrCollapsed(true)}
                  className="text-[11px] text-[#ebf0f8]/60 hover:text-[#ffffff]"
                >
                  ✕
                </button>
              </div>
              <p className="mt-0.5 text-[12px] font-medium leading-tight text-[#ebf0f8]">
                Scan untuk simulasi Tracker & Kuitansi QR
              </p>
              <button
                type="button"
                onClick={() => onOpenWorkspaceModal("7. Portal Siswa")}
                className="mt-1.5 text-[11px] font-semibold text-[#31ce01] underline underline-offset-2"
              >
                Buka Pratinjau →
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
