"use client";

import type { SaaSPricingTier } from "@/types/landing";

export interface PrivacyAndPricingSectionProps {
  readonly tiers: ReadonlyArray<SaaSPricingTier>;
  readonly onSelectTier: (tierName: string) => void;
}

export function PrivacyAndPricingSection({
  tiers,
  onSelectTier,
}: PrivacyAndPricingSectionProps) {
  return (
    <>
      {/* SECTION 8: Built for Privacy -> Dirancang untuk Isolasi Multi-Tenant */}
      <section
        id="isolasi-data"
        aria-labelledby="privacy-heading"
        className="mx-auto mt-[80px] w-full max-w-5xl px-4 text-center sm:px-6"
      >
        <div className="rounded-[32px] bg-[#ebf0f8]/60 px-6 py-16 sm:px-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#1f2025] text-[#ebf0f8] shadow-md">
            <svg
              aria-hidden="true"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h2 id="privacy-heading" className="bevel-display mt-6">
            Dirancang untuk isolasi & privasi penuh
          </h2>
          <p className="bevel-body mx-auto mt-4 max-w-2xl">
            Data kandidat CPMI, dokumen negara (KTP, Paspor, MCU), dan keuangan LPK Anda adalah milik Anda sepenuhnya. Setiap LPK memiliki ruang tertutup dengan `tenant_id` unik dan subdomain terpisah sehingga data antar-LPK terisolasi 100%.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              "Single-Database Multi-Tenancy",
              "Subdomain Khusus (namalpk.siapterbang.id)",
              "Row-Level Security (RLS)",
              "Audit Trail Immutable",
            ].map((pill) => (
              <span
                key={pill}
                className="rounded-full bg-[#ffffff] px-4 py-2 text-[13px] font-medium text-[#222326] shadow-2xs"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Tiered Pricing SaaS & Roadmap (Bab 5 SiapTerbang.pdf) */}
      <section
        id="paket-langganan"
        aria-labelledby="pricing-heading"
        className="mx-auto mt-[80px] w-full max-w-[1400px] px-4 sm:px-6"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="pricing-heading" className="bevel-display">
            Skema paket langganan sesuai skala LPK
          </h2>
          <p className="bevel-body mt-4">
            Mulai dari LPK rintisan daerah hingga Sending Organization (SO) berskala nasional dengan multi-cabang dan portal mitra Jepang/Korea.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((tier) => {
            const isPro = Boolean(tier.isRecommended);
            return (
              <article
                key={tier.id}
                className={`flex flex-col justify-between rounded-[28px] p-8 ${
                  isPro
                    ? "bg-[#1f2025] text-[#ffffff] shadow-[0_20px_50px_-15px_rgba(31,32,37,0.3)]"
                    : "bg-[#ebf0f8] text-[#222326]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[13px] font-semibold uppercase tracking-wider ${
                        isPro ? "text-[#ffca00]" : "text-[#747679]"
                      }`}
                    >
                      {tier.targetAudience}
                    </span>
                    {isPro && (
                      <span className="rounded-full bg-[#31ce01]/20 px-3 py-1 text-[11px] font-semibold text-[#31ce01]">
                        Paling Banyak Dipilih
                      </span>
                    )}
                  </div>

                  <h3
                    className={`mt-2 text-[34px] font-semibold leading-tight tracking-[-0.03em] ${
                      isPro ? "text-[#ffffff]" : "text-[#222326]"
                    }`}
                  >
                    {tier.name}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span
                      className={`text-[28px] font-semibold tracking-tight ${
                        isPro ? "text-[#ffffff]" : "text-[#222326]"
                      }`}
                    >
                      {tier.priceRange}
                    </span>
                    <span
                      className={`text-[14px] ${
                        isPro ? "text-[#ebf0f8]/70" : "text-[#747679]"
                      }`}
                    >
                      {tier.period}
                    </span>
                  </div>

                  <div
                    className={`mt-4 rounded-[14px] px-3.5 py-2.5 text-[13px] font-medium ${
                      isPro
                        ? "bg-[#ffffff]/10 text-[#ebf0f8]"
                        : "bg-[#ffffff] text-[#222326]"
                    }`}
                  >
                    {tier.quotaSummary}
                  </div>

                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-[15px]">
                        <span
                          aria-hidden="true"
                          className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                            isPro
                              ? "bg-[#31ce01] text-[#1f2025]"
                              : "bg-[#1f2025] text-[#ebf0f8]"
                          }`}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className={isPro ? "text-[#ebf0f8]/90" : "text-[#222326]"}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectTier(tier.name)}
                    className={`min-h-[46px] w-full rounded-[128px] px-5 py-3 text-[16px] font-semibold transition-transform active:scale-[0.98] ${
                      isPro
                        ? "bg-[#ebf0f8] text-[#1f2025] hover:bg-[#ffffff]"
                        : "bg-[#1f2025] text-[#ebf0f8] hover:bg-[#2c2e35]"
                    }`}
                  >
                    Pilih {tier.name}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
