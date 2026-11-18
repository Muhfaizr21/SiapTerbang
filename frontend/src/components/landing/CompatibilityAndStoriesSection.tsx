import type {
  CompatibilityStandardItem,
  CommunityStoryTile,
  RecognitionLaurelItem,
} from "@/types/landing";

export interface CompatibilityAndStoriesSectionProps {
  readonly standards: ReadonlyArray<CompatibilityStandardItem>;
  readonly laurels: ReadonlyArray<RecognitionLaurelItem>;
  readonly stories: ReadonlyArray<CommunityStoryTile>;
}

function StoryCardItem({ index }: { readonly index: number }) {
  const variant = index % 6;

  if (variant === 0) {
    /* Card 1: Portrait LPK Training Photo + Top 3 Translucent Rings (74% / 60% / 77% style) */
    return (
      <div className="relative h-[485px] w-[252px] shrink-0 overflow-hidden rounded-[16px] bg-[#2a3038] text-[#ffffff] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.22)] select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 25%, #5c6b7c 0%, #2b333d 55%, #181c22 100%)",
          }}
        />
        <div className="absolute inset-x-4 top-14 h-52 rounded-t-xl border border-[#ffffff]/10 bg-gradient-to-b from-[#ffffff]/12 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-[#111317] via-[#1c2026]/80 to-transparent" />

        <div className="relative z-10 flex items-center gap-2 p-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffffff]/25 text-[10px] font-bold">
            AK
          </div>
          <span className="text-[12px] font-semibold tracking-tight text-[#ffffff]/95">
            angkatan18_sensei
          </span>
        </div>

        <div className="relative z-10 mt-3 flex justify-center gap-3 px-3">
          {[
            { val: "88%", label: "Bunpou" },
            { val: "92%", label: "Kanji" },
            { val: "95%", label: "Fisik" },
          ].map((r) => (
            <div key={r.label} className="flex flex-col items-center">
              <div className="flex h-13 w-13 items-center justify-center rounded-full border-[2.5px] border-[#ffffff]/80 bg-[#ffffff]/10 text-[12px] font-bold backdrop-blur-xs">
                {r.val}
              </div>
              <span className="mt-1 text-[10px] font-medium text-[#ffffff]/80">
                {r.label}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-4 bottom-12 z-10 rounded-[14px] bg-[#1f2025]/85 p-3.5 backdrop-blur-md ring-1 ring-[#ffffff]/15">
          <p className="text-[11.5px] font-semibold text-[#31ce01]">
            ✓ Lulus Evaluasi Fisik & Bahasa
          </p>
          <p className="mt-1 text-[11.5px] text-[#ebf0f8]/85">
            Tinggi 171 cm • BMI 21.2 • Siap Mensetsu Kumiai Aichi
          </p>
        </div>

        <p className="absolute inset-x-0 bottom-3.5 z-10 text-center text-[11px] font-semibold underline decoration-[#ffffff]/50 underline-offset-2">
          @siapterbang.id
        </p>
      </div>
    );
  }

  if (variant === 1) {
    /* Card 2: Pure White Dashboard Capture Card with Bold Italic Headline, 3 Gauge Rings, Gold Medals & Tilted Sticker */
    return (
      <div className="relative flex h-[485px] w-[252px] shrink-0 flex-col justify-between overflow-hidden rounded-[16px] bg-[#f8f9fc] p-4 text-[#222326] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)] ring-1 ring-[#222326]/8 select-none">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#747679]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1f2025] text-[8px] font-bold text-[#ffffff]">
              ST
            </span>
            <span className="font-semibold text-[#222326]">rizky_cpmi_jepang</span>
            <span>• 4j</span>
          </div>

          <p className="mt-3 text-[16px] font-extrabold italic leading-tight tracking-tight text-[#1f2025]">
            Minggu pertama masuk daftar hijau Layak Mensetsu!
          </p>
          <p className="mt-2 text-[14px] font-extrabold italic leading-tight text-[#1f2025]">
            Evaluasi Bab 1-35 tuntas.
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#222326]">
              Hari ini, 18 Agustus ▾
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d2e5ff] text-[9px] font-bold text-[#415eee]">
              N4
            </span>
          </div>

          <div className="mt-2.5 grid grid-cols-3 gap-1.5 rounded-[14px] bg-[#ffffff] p-3 shadow-2xs ring-1 ring-[#222326]/5">
            {[
              { val: "2%", label: "Disiplin", color: "#ffab94", offset: "95" },
              { val: "88%", label: "Bahasa", color: "#31ce01", offset: "14" },
              { val: "100%", label: "Berkas", color: "#b9a6ff", offset: "0" },
            ].map((g) => (
              <div key={g.label} className="flex flex-col items-center">
                <svg width="50" height="50" viewBox="0 0 48 48" aria-hidden="true">
                  <circle cx="24" cy="24" r="18" stroke="#ebf0f8" strokeWidth="4.5" fill="none" />
                  <circle
                    cx="24"
                    cy="24"
                    r="18"
                    stroke={g.color}
                    strokeWidth="4.5"
                    strokeDasharray="113"
                    strokeDashoffset={g.offset}
                    strokeLinecap="round"
                    fill="none"
                    transform="rotate(-90 24 24)"
                  />
                  <text x="24" y="27" textAnchor="middle" className="fill-[#222326] text-[10px] font-bold">
                    {g.val}
                  </text>
                </svg>
                <span className="mt-1 text-[9.5px] text-[#747679]">{g.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-2.5 rounded-[12px] bg-[#ffffff] p-3 shadow-2xs ring-1 ring-[#222326]/5">
            <p className="text-[8.5px] font-bold uppercase tracking-wider text-[#747679]">
              REKOMENDASI SENSEI
            </p>
            <p className="mt-1 text-[10px] leading-snug text-[#222326]">
              Skor Choukai dan Kaiwa sangat stabil. Status Layak Mensetsu telah dibuka di web desktop Staf Penempatan!
            </p>
          </div>
        </div>

        <div className="pb-1">
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <span
                key={idx}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffca00] text-[10px] font-bold text-[#1f2025] shadow-2xs"
              >
                1
              </span>
            ))}
          </div>
          <div className="mt-2.5 flex justify-center">
            <span className="-rotate-6 rounded-lg bg-[#1f2025] px-3.5 py-1 text-[11px] font-bold text-[#ffffff] shadow-sm">
              @lpk_nusantara_jabar
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 2) {
    /* Card 3: Outdoor Training + Dark Glass Stats Box at Top & Bottom */
    return (
      <div className="relative flex h-[485px] w-[252px] shrink-0 flex-col justify-between overflow-hidden rounded-[16px] bg-[#1e2923] p-4 text-[#ffffff] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.22)] select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(170deg, #3b5249 0%, #24332c 48%, #151d19 100%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#31ce01]/30 text-[10px] font-bold text-[#31ce01]">
              DF
            </div>
            <span className="text-[12px] font-semibold">dimas_fisik_pagi</span>
          </div>

          <div className="mt-3.5 rounded-[14px] bg-[#141518]/80 p-3.5 backdrop-blur-md ring-1 ring-[#ffffff]/15">
            <p className="text-[9.5px] text-[#ebf0f8]/70">Tes Ketahanan Fisik LPK</p>
            <p className="text-[20px] font-bold tracking-tight text-[#ffffff]">
              3,20 <span className="text-[12px] font-normal">km</span>
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#ffffff]/10 pt-2 text-[10.5px]">
              <div>
                <p className="text-[#ebf0f8]/60">Durasi Lari</p>
                <p className="font-semibold">14:12 mnt</p>
              </div>
              <div>
                <p className="text-[#ebf0f8]/60">Push-up / Sit-up</p>
                <p className="font-semibold">45x / 50x</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 rounded-[14px] bg-[#141518]/88 p-3.5 backdrop-blur-md ring-1 ring-[#ffffff]/15">
          <div className="flex items-center justify-between text-[9.5px] text-[#ebf0f8]/70">
            <span>Jumat, 16 Agustus</span>
            <span className="text-[#31ce01]">Lulus Fisik</span>
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
            {[
              { v: "96%", l: "Fisik", c: "border-[#ffca00]" },
              { v: "88%", l: "Bahasa", c: "border-[#31ce01]" },
              { v: "94%", l: "Disiplin", c: "border-[#b9a6ff]" },
            ].map((item) => (
              <div key={item.l} className="flex flex-col items-center">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-[2.5px] ${item.c} text-[10.5px] font-bold`}
                >
                  {item.v}
                </div>
                <span className="mt-1 text-[8.5px] text-[#ebf0f8]/75">{item.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 3) {
    /* Card 4: Split 2-Row Collage with Dark Floating Metric Callouts */
    return (
      <div className="relative flex h-[485px] w-[252px] shrink-0 flex-col justify-between overflow-hidden rounded-[16px] bg-[#252220] p-3 text-[#ffffff] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.22)] select-none">
        <div className="relative h-[48%] w-full overflow-hidden rounded-[12px] bg-gradient-to-br from-[#4a3e35] to-[#26201b] p-3.5">
          <div className="flex items-center gap-1.5">
            <span className="h-5 w-5 rounded-full bg-[#ffca00]/30 text-center text-[10px] leading-5 font-bold text-[#ffca00]">
              TU
            </span>
            <span className="text-[11px] font-semibold">asrama_putra_b04</span>
          </div>

          <div className="mt-3.5 rounded-[12px] bg-[#141518]/85 p-3 backdrop-blur-md ring-1 ring-[#ffffff]/15">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10.5px] font-semibold text-[#ffffff]">Kamar Asrama B-04</p>
                <p className="text-[9.5px] text-[#ebf0f8]/70">6 / 6 Tempat Tidur Terisi</p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#31ce01] text-[9.5px] font-bold text-[#31ce01]">
                100%
              </span>
            </div>
          </div>

          <span className="mt-2.5 inline-block rounded-full bg-[#ffffff] px-2.5 py-0.5 text-[9.5px] font-bold text-[#1f2025]">
            Inspeksi Pagi Valid ✓
          </span>
        </div>

        <div className="relative h-[49%] w-full overflow-hidden rounded-[12px] bg-gradient-to-br from-[#2d3748] to-[#1a202c] p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ffffff]/80 bg-[#ffffff]/10 text-[11px] font-bold">
              0pt
            </div>
            <div className="rounded-[10px] bg-[#141518]/90 px-3 py-2 text-[9.5px] ring-1 ring-[#ffffff]/15">
              <p className="font-semibold text-[#31ce01]">Poin Pelanggaran: 0</p>
              <p className="text-[#ebf0f8]/75">Ambang Blokir: 100 Poin</p>
            </div>
          </div>

          <div className="mt-3.5 rounded-[10px] bg-[#141518]/90 p-3 text-[10px] ring-1 ring-[#ffffff]/15">
            <p className="font-semibold text-[#ffca00]">Presensi QR Code Kelas</p>
            <p className="mt-0.5 text-[#ebf0f8]/80">
              Hadir 24 Hari • Izin 0 • Alpa 0 (WA Ortu Aktif)
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 4) {
    /* Card 5: Photo + White Floating Detailed Breakdown Card on Left */
    return (
      <div className="relative h-[485px] w-[252px] shrink-0 overflow-hidden rounded-[16px] bg-[#36414d] p-4 text-[#ffffff] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.22)] select-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(155deg, #4b5a6b 0%, #2c3540 55%, #1c2229 100%)",
          }}
        />

        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffffff]/20 text-[10px] font-bold">
            SN
          </div>
          <span className="text-[12px] font-semibold">sensei_evaluasi_n4</span>
        </div>

        <p className="relative z-10 mt-3 max-w-[180px] text-[10.5px] leading-snug text-[#ebf0f8]/90">
          Rekap nilai Bunpou, Kanji, Choukai, dan Kaiwa otomatis terpetakan ke grafik progres kandidat.
        </p>

        <div className="relative z-10 mt-4 w-[205px] rounded-[14px] bg-[#ffffff] p-3.5 text-[#222326] shadow-lg">
          <div className="grid grid-cols-3 gap-1 text-center">
            {[
              { v: "86%", l: "Bunpou", c: "border-[#ffab94]" },
              { v: "92%", l: "Kanji", c: "border-[#31ce01]" },
              { v: "89%", l: "Kaiwa", c: "border-[#b9a6ff]" },
            ].map((r) => (
              <div key={r.l} className="flex flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] ${r.c} text-[9.5px] font-bold`}
                >
                  {r.v}
                </div>
                <span className="mt-0.5 text-[8.5px] text-[#747679]">{r.l}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 border-t border-[#ebf0f8] pt-2.5">
            <p className="text-center text-[10.5px] font-bold text-[#222326]">
              Ujian Bahasa & Fisik
            </p>
            <div className="mt-2.5 space-y-2 text-[9px]">
              {[
                { name: "Bunpou & Goi", w: "w-[86%]", c: "bg-[#31ce01]" },
                { name: "Kanji N4", w: "w-[92%]", c: "bg-[#415eee]" },
                { name: "Choukai", w: "w-[84%]", c: "bg-[#31ce01]" },
                { name: "Sikap / Aisatsu", w: "w-[96%]", c: "bg-[#ffca00]" },
              ].map((bar) => (
                <div key={bar.name} className="flex items-center justify-between gap-2">
                  <span className="w-16 truncate text-[#747679]">{bar.name}</span>
                  <div className="h-1.5 flex-1 rounded-full bg-[#ebf0f8]">
                    <div className={`h-full rounded-full ${bar.w} ${bar.c}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Card 6: White Route & Pipeline Keberangkatan Card */
  return (
    <div className="relative flex h-[485px] w-[252px] shrink-0 flex-col justify-between overflow-hidden rounded-[16px] bg-[#ffffff] p-4 text-[#222326] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)] ring-1 ring-[#222326]/8 select-none">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#ebf0f8] px-2.5 py-0.5 text-[10px] font-semibold text-[#415eee]">
            Pipeline Keberangkatan
          </span>
          <span className="font-mono text-[10px] text-[#747679]">CGK → KIX</span>
        </div>
        <p className="mt-2.5 text-[16px] font-bold text-[#222326]">
          Penempatan Kumiai Osaka
        </p>
        <p className="text-[11.5px] text-[#747679]">
          Kontrak 3 Tahun • Tokutei Ginou
        </p>

        <div className="my-4 rounded-[14px] bg-[#ebf0f8]/70 p-3.5">
          <svg viewBox="0 0 180 90" className="h-28 w-full" fill="none" aria-hidden="true">
            <path
              d="M15 70 C 50 65, 65 25, 105 35 C 135 42, 150 18, 165 15"
              stroke="#415eee"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="15" cy="70" r="5" fill="#1f2025" />
            <circle cx="75" cy="36" r="4" fill="#31ce01" />
            <circle cx="125" cy="35" r="4" fill="#31ce01" />
            <circle cx="165" cy="15" r="6" fill="#31ce01" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 border-t border-[#ebf0f8] pt-3 text-[11px]">
        <div>
          <p className="text-[9.5px] text-[#747679]">Status CoE & Visa</p>
          <p className="font-bold text-[#1e8300]">Terbit & Lunas</p>
        </div>
        <div>
          <p className="text-[9.5px] text-[#747679]">CV Rirekisho</p>
          <p className="font-bold text-[#222326]">Standar JIS</p>
        </div>
        <div>
          <p className="text-[9.5px] text-[#747679]">Dana Talangan</p>
          <p className="font-bold text-[#415eee]">Terverifikasi</p>
        </div>
        <div>
          <p className="text-[9.5px] text-[#747679]">Status Akhir</p>
          <p className="font-bold text-[#222326]">Terbang → Alumni</p>
        </div>
      </div>
    </div>
  );
}

export function CompatibilityAndStoriesSection({
  standards,
}: CompatibilityAndStoriesSectionProps) {
  return (
    <>
      {/* SECTION 2: Works with (.works-with.section-3) */}
      <section
        aria-labelledby="works-with-heading"
        className="bevel-container pt-24 pb-0 text-center"
      >
        <h2 id="works-with-heading" className="bevel-section-label">
          Terhubung dengan standar
        </h2>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
          {standards.map((std) => (
            <div
              key={std.id}
              className="flex items-center gap-2.5 text-[#1f2025] opacity-90"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-[#1f2025]"
              >
                <circle cx="12" cy="12" r="9" fillOpacity="0.14" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span className="text-[20px] font-semibold tracking-tight text-[#1f2025]">
                {std.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Accolades Laurel + "Join over 2.5 million members..." + Infinite Portrait Marquee */}
      <section
        aria-labelledby="stories-heading"
        className="bevel-section-pad w-full overflow-hidden"
      >
        <div className="bevel-container flex flex-col items-center text-center">
          <h2 id="stories-heading" className="bevel-display max-w-[880px]">
            Dipercaya ribuan kandidat CPMI dalam perjalanan menuju terbang
          </h2>
        </div>

        <div className="bevel-marquee-mask relative mx-auto mt-16 w-full max-w-[1680px] overflow-hidden py-4">
          <div className="animate-bevel-marquee flex items-stretch gap-6 pl-6">
            {Array.from({ length: 12 }).map((_, idx) => (
              <StoryCardItem key={idx} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
