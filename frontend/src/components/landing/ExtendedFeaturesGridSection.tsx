"use client";

import { useEffect, useState } from "react";
import type { ExtendedFeatureTile } from "@/types/landing";
import { getAccentTokens } from "@/utils/accent-tokens";

export interface ExtendedFeaturesGridSectionProps {
  readonly items: ReadonlyArray<ExtendedFeatureTile>;
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
    }, 4500);
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
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left Column (.col-lg-5): 64px Heading + Interactive Vertical Accordion List */}
        <div className="lg:col-span-5">
          <div className="text-center lg:text-left">
            <h2 id="extra-features-heading" className="bevel-display">
              Dan bukan hanya itu
            </h2>
            <p className="bevel-body mt-4">
              SiapTerbang juga memiliki fitur operasional web desktop berikut:
            </p>
          </div>

          <div className="mt-10 space-y-3" role="tablist" aria-label="Fitur Tambahan SiapTerbang">
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
                  className={`w-full rounded-[24px] transition-all duration-200 active:scale-[0.99] ${
                    isActive
                      ? "bg-[#ebf0f8] p-6 shadow-2xs"
                      : "bg-[#ebf0f8]/55 px-6 py-4 hover:bg-[#ebf0f8]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[#222326]">
                        {item.title}
                      </h3>
                      {isActive && (
                        <p className="mt-2 text-[17px] leading-relaxed text-[#747679]">
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
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffffff] text-[#222326] shadow-xs ring-1 ring-[#222326]/10"
                      >
                        {isPaused ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <polygon points="6 4 20 12 6 20 6 4" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (.col-lg-7): Wide Dynamic Web Desktop SaaS Window (Replacing Phone Mockup) */}
        <div className="relative flex items-center justify-center lg:col-span-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[480px] w-[540px] rounded-full opacity-45 blur-3xl transition-colors duration-500"
            style={{ backgroundColor: activeTokens.hex }}
          />

          <div className="relative z-10 w-full overflow-hidden rounded-[24px] bg-[#1f2025] p-2.5 shadow-[0_32px_70px_-15px_rgba(31,32,37,0.38)] ring-1 ring-[#ffffff]/30">
            {/* Web Browser Top Chrome */}
            <div className="flex items-center justify-between rounded-t-[16px] bg-[#141518] px-4 py-2.5 text-[#ebf0f8]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-[#1f2025] px-4 py-1 font-mono text-[12px] text-[#ebf0f8]">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: activeTokens.hex }}
                />
                <span>https://lpknusantara.siapterbang.id/modul-0{activeIndex + 1}</span>
              </div>
              <span className="font-mono text-[11px] text-[#ebf0f8]/70">
                0{activeIndex + 1} / 0{items.length}
              </span>
            </div>

            {/* Inner Dynamic Web Desktop Screen */}
            <div className="grid min-h-[480px] grid-cols-12 rounded-b-[16px] bg-[#ffffff] text-[#222326]">
              {/* Desktop Left Sidebar */}
              <div className="col-span-4 hidden border-r border-[#ebf0f8] bg-[#f8f9fc] p-5 sm:flex sm:flex-col sm:justify-between">
                <div>
                  <span className="rounded-full bg-[#ebf0f8] px-3 py-1 text-[11px] font-bold text-[#222326]">
                    {activeItem.badgeText}
                  </span>
                  <p className="mt-4 text-[15px] font-bold text-[#222326]">
                    Navigasi Modul LPK
                  </p>
                  <div className="mt-3 space-y-1.5 text-[12px]">
                    {items.slice(0, 6).map((navItem, nIdx) => (
                      <div
                        key={navItem.id}
                        className={`rounded-xl px-3 py-2 font-medium ${
                          nIdx === activeIndex % 6
                            ? "bg-[#1f2025] text-[#ffffff]"
                            : "text-[#747679]"
                        }`}
                      >
                        {navItem.title}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-[#ebf0f8] p-3 text-[11px]">
                  <p className="font-semibold text-[#222326]">Multi-Tenant RLS</p>
                  <p className="text-[#747679]">Isolasi penuh per LPK</p>
                </div>
              </div>

              {/* Desktop Main Content Area */}
              <div className="col-span-12 flex flex-col justify-between p-6 sm:col-span-8 sm:p-8">
                <div>
                  <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-3">
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#747679]">
                      TAMPILAN MODUL WEB DESKTOP
                    </span>
                    <span className="rounded-md bg-[#31ce01]/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#1e8300]">
                      AKTIF
                    </span>
                  </div>

                  <h4 className="mt-5 text-[28px] font-bold leading-tight tracking-tight text-[#222326]">
                    {activeItem.title}
                  </h4>
                  <p className="mt-2.5 text-[16px] leading-relaxed text-[#747679]">
                    {activeItem.description}
                  </p>

                  <div className="mt-6 rounded-[20px] bg-[#ebf0f8] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#747679]">
                        Output & Standar Sistem
                      </span>
                      <span
                        className={`h-3 w-3 rounded-full ${activeTokens.bgClass}`}
                      />
                    </div>
                    <p className="mt-2 font-mono text-[18px] font-bold text-[#222326]">
                      {activeItem.metricHighlight}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 rounded-[14px] bg-[#ffffff] p-4 shadow-2xs">
                      <div>
                        <p className="text-[11px] text-[#747679]">Hak Akses RBAC</p>
                        <p className="text-[13px] font-bold text-[#222326]">Multi-Role Ready</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#747679]">Sinkronisasi Data</p>
                        <p className="text-[13px] font-bold text-[#1e8300]">Real-Time Lintas Divisi</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-[16px] bg-[#1f2025] px-5 py-3.5 text-[#ebf0f8]">
                  <span className="text-[13px] font-medium">Terhubung ke 7 Role Sistem</span>
                  <span className="rounded-full bg-[#31ce01]/20 px-3 py-0.5 text-[11px] font-semibold text-[#31ce01]">
                    100% Teruji
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
