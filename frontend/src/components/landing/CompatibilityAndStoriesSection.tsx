import type {
  CompatibilityStandardItem,
  CommunityStoryTile,
  RecognitionLaurelItem,
} from "@/types/landing";
import { getAccentTokens } from "@/utils/accent-tokens";

export interface CompatibilityAndStoriesSectionProps {
  readonly standards: ReadonlyArray<CompatibilityStandardItem>;
  readonly laurels: ReadonlyArray<RecognitionLaurelItem>;
  readonly stories: ReadonlyArray<CommunityStoryTile>;
}

export function CompatibilityAndStoriesSection({
  standards,
  laurels,
  stories,
}: CompatibilityAndStoriesSectionProps) {
  return (
    <>
      {/* SECTION 3: Wearable Partner Row -> Program & Regulatory Compatibility Row */}
      <section
        aria-labelledby="compatibility-heading"
        className="mx-auto mt-[80px] w-full max-w-6xl px-4 text-center sm:px-6"
      >
        <h2 id="compatibility-heading" className="bevel-section-label">
          Mendukung standar program & dokumen penempatan resmi
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12">
          {standards.map((std) => (
            <div
              key={std.id}
              className="group flex items-center gap-3 text-[#1f2025] transition-opacity hover:opacity-80"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ebf0f8] text-[#1f2025]"
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
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <div className="text-left">
                <p className="text-[17px] font-semibold leading-tight tracking-tight text-[#1f2025]">
                  {std.name}
                </p>
                <p className="font-mono text-[11px] font-medium tracking-wider text-[#747679]">
                  {std.code} • {std.region}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Recognition Laurel Pair + Community Story Carousel Strip */}
      <section
        aria-labelledby="stories-heading"
        className="mx-auto mt-[80px] w-full max-w-[1400px] overflow-hidden px-4 sm:px-6"
      >
        {/* Recognition Laurel Pair (DESIGN.md spec: two neutral-gray laurel marks, 16px gap) */}
        <div className="mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {laurels.map((laurel) => (
            <div
              key={laurel.id}
              className="flex items-center gap-2.5 rounded-2xl px-3 py-1.5 text-center"
            >
              {/* Left Laurel Wreath SVG */}
              <svg
                aria-hidden="true"
                width="22"
                height="36"
                viewBox="0 0 24 40"
                fill="none"
                className="text-[#747679]/70"
              >
                <path
                  d="M19 36C11 31 7 22 7 12C7 7 9 3 12 1"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="10" r="2" fill="currentColor" />
                <circle cx="7" cy="18" r="2" fill="currentColor" />
                <circle cx="9" cy="26" r="2" fill="currentColor" />
                <circle cx="14" cy="33" r="2" fill="currentColor" />
              </svg>
              <div>
                <p className="text-[13px] font-semibold text-[#222326]">{laurel.title}</p>
                <p className="text-[12px] text-[#747679]">{laurel.subtitle}</p>
              </div>
              {/* Right Laurel Wreath SVG */}
              <svg
                aria-hidden="true"
                width="22"
                height="36"
                viewBox="0 0 24 40"
                fill="none"
                className="scale-x-[-1] text-[#747679]/70"
              >
                <path
                  d="M19 36C11 31 7 22 7 12C7 7 9 3 12 1"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="10" r="2" fill="currentColor" />
                <circle cx="7" cy="18" r="2" fill="currentColor" />
                <circle cx="9" cy="26" r="2" fill="currentColor" />
                <circle cx="14" cy="33" r="2" fill="currentColor" />
              </svg>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-3xl text-center">
          <h2 id="stories-heading" className="bevel-display">
            Kawal perjalanan kandidat dari pendaftaran hingga alumni di luar negeri
          </h2>
          <p className="bevel-body mt-4">
            Setiap aktivitas belajar, disiplin asrama, verifikasi berkas, wawancara SO, hingga pembayaran dana talangan tercatat secara real-time.
          </p>
        </div>

        {/* Portrait Media & App-Capture Strip (DESIGN.md: 16px rounded corners, bevel-media-shadow, edge fade) */}
        <div className="relative mt-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {stories.map((story, idx) => (
              <article
                key={story.id}
                className="bevel-media-shadow group relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[16px] bg-[#1f2025] p-4 text-[#ffffff]"
              >
                {/* Rich contextual background illustration per operational division */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-90"
                  style={{
                    background:
                      idx % 5 === 0
                        ? "linear-gradient(165deg, #1f2025 0%, #273452 55%, #1c2430 100%)"
                        : idx % 5 === 1
                        ? "linear-gradient(165deg, #222326 0%, #2d3830 55%, #1b221e 100%)"
                        : idx % 5 === 2
                        ? "linear-gradient(165deg, #1f2025 0%, #372d47 55%, #1f1d29 100%)"
                        : idx % 5 === 3
                        ? "linear-gradient(165deg, #222326 0%, #3d2e29 55%, #241d1b 100%)"
                        : "linear-gradient(165deg, #1f2025 0%, #223b47 55%, #19242b 100%)",
                  }}
                />

                {/* Top Overlay Pill & Division Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#ffffff]/12 px-2.5 py-1 text-[11px] font-medium text-[#ebf0f8] backdrop-blur-xs">
                      {story.divisionTag}
                    </span>
                    <span className="font-mono text-[11px] text-[#ebf0f8]/70">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="mt-3 text-[15px] font-semibold leading-snug text-[#ffffff]">
                    {story.studentOrBatch}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#ebf0f8]/70">{story.location}</p>
                </div>

                {/* Middle Visual App-Capture Metric Overlay (Bevel Member Overlay Style) */}
                <div className="relative z-10 my-4 rounded-[14px] bg-[#ffffff]/10 p-3 backdrop-blur-sm ring-1 ring-[#ffffff]/12">
                  <div className="space-y-2">
                    {story.metrics.map((m) => {
                      const accent = getAccentTokens(m.accent);
                      return (
                        <div
                          key={m.label}
                          className="flex items-center justify-between text-[12px]"
                        >
                          <span className="text-[#ebf0f8]/80">{m.label}</span>
                          <span className="flex items-center gap-1.5 font-mono font-semibold text-[#ffffff]">
                            <span
                              className={`h-2 w-2 rounded-full ${accent.bgClass}`}
                              aria-hidden="true"
                            />
                            {m.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className="relative z-10 border-t border-[#ffffff]/10 pt-3">
                  <p className="text-[13px] leading-relaxed text-[#ebf0f8]/90">
                    {story.headline}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
