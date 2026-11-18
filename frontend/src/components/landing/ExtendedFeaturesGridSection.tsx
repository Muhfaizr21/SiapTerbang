import type { ExtendedFeatureTile } from "@/types/landing";
import { getAccentTokens } from "@/utils/accent-tokens";

export interface ExtendedFeaturesGridSectionProps {
  readonly items: ReadonlyArray<ExtendedFeatureTile>;
}

function FeatureSvgGlyph({
  iconType,
}: {
  readonly iconType: ExtendedFeatureTile["iconType"];
}) {
  switch (iconType) {
    case "bmi":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    case "qr-scan":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h7v7h-7z" />
        </svg>
      );
    case "refund":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case "multi-role":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "video-cv":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      );
    case "qr-receipt":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
          <path d="M8 10h8M8 14h4" />
        </svg>
      );
    case "cash-split":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      );
    case "disnaker":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case "impersonate":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="3" />
        </svg>
      );
  }
}

export function ExtendedFeaturesGridSection({
  items,
}: ExtendedFeaturesGridSectionProps) {
  return (
    <section
      id="modul-lengkap"
      aria-labelledby="extended-heading"
      className="mx-auto mt-[80px] w-full max-w-[1400px] px-4 sm:px-6"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="extended-heading" className="bevel-display">
          Dan bukan hanya itu
        </h2>
        <p className="bevel-body mt-4">
          SiapTerbang juga melengkapi operasional LPK Anda dengan sembilan kapabilitas lapangan berikut:
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const tokens = getAccentTokens(item.accent);
          return (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-[24px] bg-[#ebf0f8] p-7"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#ffffff] text-[#1f2025] shadow-2xs"
                  >
                    <FeatureSvgGlyph iconType={item.iconType} />
                  </span>
                  <span className="rounded-full bg-[#ffffff] px-3 py-1 text-[11px] font-semibold text-[#222326]">
                    {item.badgeText}
                  </span>
                </div>

                <h3 className="mt-5 text-[26px] font-semibold leading-tight tracking-[-0.02em] text-[#222326]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[16px] leading-relaxed text-[#747679]">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-[14px] bg-[#ffffff] px-3.5 py-2.5">
                <span className="text-[12px] font-medium text-[#747679]">Standar Sistem</span>
                <span
                  className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold ${tokens.softBgClass} ${tokens.textClass}`}
                >
                  {item.metricHighlight}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
