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
      className="mx-auto mt-24 w-full max-w-[1360px] px-4 py-10 sm:px-6"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left Column (.col-lg-5 .col-lg-offset-1): Heading + Interactive Vertical Accordion List */}
        <div className="lg:col-span-5 lg:col-start-2">
          <div className="text-center lg:text-left">
            <h2 id="extra-features-heading" className="bevel-display">
              Dan bukan hanya itu
            </h2>
            <p className="bevel-body mt-3">
              SiapTerbang juga memiliki fitur operasional berikut:
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
                      <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.02em] text-[#222326] sm:text-[22px]">
                        {item.title}
                      </h3>
                      {isActive && (
                        <p className="mt-2 text-[16px] leading-relaxed text-[#747679]">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Exact Bevel .tabs-control Play/Pause Circular Button on Active Item */}
                    {isActive && (
                      <button
                        type="button"
                        aria-label={isPaused ? "Putar otomatis" : "Jeda putar otomatis"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPaused((prev) => !prev);
                        }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffffff] text-[#222326] shadow-xs ring-1 ring-[#222326]/10"
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

        {/* Right Column (.col-lg-6): Dynamic iPhone Preview (.extra_features-phone) */}
        <div className="relative flex items-center justify-center lg:col-span-6">
          {/* Soft Atmospheric Glow behind Phone (.tabs_phone-bg) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[520px] w-[340px] rounded-full opacity-55 blur-3xl transition-colors duration-500"
            style={{ backgroundColor: activeTokens.hex }}
          />

          <div className="relative z-10 w-[315px] sm:w-[345px] rounded-[50px] bg-[#1f2025] p-3.5 shadow-[0_30px_70px_-15px_rgba(31,32,37,0.38)] ring-2 ring-[#ffffff]/40">
            {/* Dynamic Island */}
            <div className="mx-auto mb-3 flex h-6 w-28 items-center justify-between rounded-full bg-[#09090b] px-3">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: activeTokens.hex }}
              />
              <span className="font-mono text-[9px] text-[#ebf0f8]">
                0{activeIndex + 1} / 0{items.length}
              </span>
            </div>

            {/* Inner Dynamic Phone Screen */}
            <div className="flex min-h-[560px] flex-col justify-between overflow-hidden rounded-[38px] bg-[#ffffff] p-5 text-[#222326]">
              <div>
                <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-3">
                  <span className="rounded-full bg-[#ebf0f8] px-3 py-1 text-[11px] font-semibold text-[#222326]">
                    {activeItem.badgeText}
                  </span>
                  <span className="font-mono text-[11px] text-[#747679]">
                    Live Preview
                  </span>
                </div>

                <h4 className="mt-4 text-[22px] font-bold leading-tight tracking-tight text-[#222326]">
                  {activeItem.title}
                </h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#747679]">
                  {activeItem.description}
                </p>

                {/* Dynamic Feature Widget Preview Card */}
                <div className="mt-5 rounded-[22px] bg-[#ebf0f8] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#747679]">
                      Indikator Utama
                    </span>
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${activeTokens.bgClass}`}
                    />
                  </div>
                  <p className="mt-2 font-mono text-[16px] font-bold text-[#222326]">
                    {activeItem.metricHighlight}
                  </p>

                  {/* Visual Gauge / Progress inside Phone */}
                  <div className="mt-4 space-y-2.5 rounded-[16px] bg-[#ffffff] p-3.5 shadow-2xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-[#747679]">Status Sinkronisasi</span>
                      <span className="font-semibold text-[#1e8300]">Otomatis Real-Time</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#ebf0f8]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${72 + ((activeIndex * 7) % 26)}%`,
                          backgroundColor: activeTokens.hex,
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                      <div className="rounded-lg bg-[#ebf0f8]/60 p-2">
                        <p className="text-[9.5px] text-[#747679]">Isolasi Tenant</p>
                        <p className="font-semibold text-[#222326]">tenant_id Valid</p>
                      </div>
                      <div className="rounded-lg bg-[#ebf0f8]/60 p-2">
                        <p className="text-[9.5px] text-[#747679]">Audit Trail</p>
                        <p className="font-semibold text-[#222326]">Tercatat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Pill inside Phone */}
              <div className="mt-4 flex items-center justify-between rounded-[16px] bg-[#1f2025] px-4 py-3 text-[#ebf0f8]">
                <span className="text-[12px] font-medium">Terintegrasi 7 Role</span>
                <span className="rounded-full bg-[#31ce01]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[#31ce01]">
                  Siap Pakai
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
