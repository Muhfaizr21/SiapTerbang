import type { CoreCloudFeatureCard } from "@/types/landing";

export interface CloudFeatureBentoProps {
  readonly features: ReadonlyArray<CoreCloudFeatureCard>;
}

export function CloudFeatureBento({ features }: CloudFeatureBentoProps) {
  const card1 = features[0];
  const card2 = features[1];
  const card3 = features[2];
  const card4 = features[3];
  const card5 = features[4];

  return (
    <section
      id="fitur-utama"
      aria-labelledby="start-day-heading"
      className="mx-auto mt-20 w-full max-w-[1360px] overflow-hidden px-4 sm:px-6"
    >
      {/* Centered Heading matching Bevel's "Start the day with confidence" */}
      <div className="mx-auto max-w-[680px] text-center">
        <h2 id="start-day-heading" className="bevel-display">
          Awali operasional dengan penuh kepastian
        </h2>
        <p className="bevel-body mt-4">
          Ubah aktivitas asrama, pelatihan bahasa, dan pemberkasan menjadi indikator kesiapan kerja yang terukur.
        </p>
      </div>

      {/* Row 1: 3 Vertical Cards (.feature_card.cc-orange, .cc-blue, .cc-green) */}
      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Card 1: Orange Wash (Strain -> Asrama & Poin Disiplin) */}
        <article className="bevel-card-orange flex flex-col justify-between overflow-hidden">
          <div className="p-8 pb-4 sm:p-10 sm:pb-4">
            <h3 className="bevel-card-heading">{card1.title}</h3>
            <p className="mt-3 text-[18px] leading-[1.35] text-[#747679]">
              {card1.description}
            </p>
          </div>

          {/* .feature_card-content with cropped iPhone & floating blur card */}
          <div className="relative flex aspect-[432/440] w-full items-start justify-center overflow-hidden pt-4">
            {/* Phone Frame rising from bottom */}
            <div className="w-[74%] rounded-t-[38px] bg-[#1f2025] p-2.5 pb-0 shadow-xl">
              <div className="mx-auto mb-2 h-4 w-20 rounded-full bg-[#09090b]" />
              <div className="h-[360px] rounded-t-[30px] bg-[#ffffff] p-4">
                <div className="flex items-center justify-between text-[11px] text-[#747679]">
                  <span>Asrama Putra Blok B</span>
                  <span className="font-semibold text-[#a93f22]">Ambang: 100</span>
                </div>
                <div className="my-4 flex flex-col items-center">
                  <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
                    <circle cx="60" cy="60" r="46" stroke="#ebf0f8" strokeWidth="10" fill="none" />
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      stroke="#ffab94"
                      strokeWidth="10"
                      strokeDasharray="289"
                      strokeDashoffset="245"
                      strokeLinecap="round"
                      fill="none"
                      transform="rotate(-90 60 60)"
                    />
                    <text x="60" y="58" textAnchor="middle" className="fill-[#222326] text-[26px] font-bold">
                      15
                    </text>
                    <text x="60" y="76" textAnchor="middle" className="fill-[#747679] text-[11px]">
                      Poin Disiplin
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating Foreground Blur Card (.feature_card-fg.cc-1) */}
            <div className="absolute bottom-5 z-20 w-[84%] rounded-[18px] bg-[#ffffff]/90 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.14)] backdrop-blur-md">
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-semibold text-[#222326]">Log Kedisiplinan Harian</span>
                <span className="rounded-full bg-[#31ce01]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[#1e8300]">
                  Aktif
                </span>
              </div>
              <p className="mt-1 text-[12px] text-[#747679]">
                Lewat 100 poin, status otomatis berubah menjadi <strong>Suspended</strong> & terkunci dari Job Order.
              </p>
            </div>
          </div>
        </article>

        {/* Card 2: Blue Wash (Sleep -> Siklus Rematching) */}
        <article className="bevel-card-blue flex flex-col justify-between overflow-hidden">
          <div className="p-8 pb-4 sm:p-10 sm:pb-4">
            <h3 className="bevel-card-heading">{card2.title}</h3>
            <p className="mt-3 text-[18px] leading-[1.35] text-[#747679]">
              {card2.description}
            </p>
          </div>

          <div className="relative flex aspect-[432/440] w-full items-start justify-center overflow-hidden pt-4">
            <div className="w-[74%] rounded-t-[38px] bg-[#1f2025] p-2.5 pb-0 shadow-xl">
              <div className="mx-auto mb-2 h-4 w-20 rounded-full bg-[#09090b]" />
              <div className="h-[360px] rounded-t-[30px] bg-[#ffffff] p-4">
                <p className="text-[11px] font-medium text-[#747679]">Riwayat Lamaran Kandidat</p>
                <p className="text-[16px] font-bold text-[#222326]">Relasi Many-to-Many</p>

                <div className="mt-4 space-y-2.5">
                  <div className="rounded-[12px] bg-[#ebf0f8]/70 p-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#222326]">Job #1: Kumiai Ibaraki</span>
                      <span className="text-[#a93f22] font-semibold">Belum Lolos</span>
                    </div>
                    <p className="mt-1 text-[10px] text-[#747679]">
                      Catatan: Perlu penguatan Kaiwa. Otomatis kembali ke Pool.
                    </p>
                  </div>

                  <div className="rounded-[12px] bg-[#415eee]/12 p-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#222326]">Job #2: Manufaktur Aichi</span>
                      <span className="text-[#415eee] font-semibold">Terdaftar</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full rounded-full bg-[#ffffff]">
                      <div className="h-full w-[78%] rounded-full bg-[#415eee]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Right Glass Widget (.feature_card-fg.cc-2) */}
            <div className="absolute right-5 bottom-12 z-20 w-[44%] rounded-[20px] bg-[#ffffff]/88 p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.14)] backdrop-blur-xl ring-1 ring-[#ffffff]">
              <p className="text-[10px] font-semibold uppercase text-[#415eee]">
                Auto-Rematching
              </p>
              <p className="mt-1 text-[20px] font-bold text-[#222326]">100%</p>
              <p className="text-[11px] leading-tight text-[#747679]">
                Histori evaluasi tersimpan di profil
              </p>
            </div>
          </div>
        </article>

        {/* Card 3: Green Wash (Recovery -> Gatekeeper Keuangan) */}
        <article className="bevel-card-green flex flex-col justify-between overflow-hidden">
          <div className="p-8 pb-4 sm:p-10 sm:pb-4">
            <h3 className="bevel-card-heading">{card3.title}</h3>
            <p className="mt-3 text-[18px] leading-[1.35] text-[#747679]">
              {card3.description}
            </p>
          </div>

          <div className="relative flex aspect-[432/440] w-full items-start justify-center overflow-hidden pt-4">
            <div className="w-[74%] rounded-t-[38px] bg-[#1f2025] p-2.5 pb-0 shadow-xl">
              <div className="mx-auto mb-2 h-4 w-20 rounded-full bg-[#09090b]" />
              <div className="h-[360px] rounded-t-[30px] bg-[#ffffff] p-4">
                <div className="flex items-center justify-between text-[11px] text-[#747679]">
                  <span>Kontrol Pra-Keberangkatan</span>
                  <span className="font-semibold text-[#1e8300]">Cleared</span>
                </div>
                <div className="my-4 flex flex-col items-center">
                  <svg width="116" height="116" viewBox="0 0 116 116" aria-hidden="true">
                    <circle cx="58" cy="58" r="44" stroke="#ebf0f8" strokeWidth="10" fill="none" />
                    <circle
                      cx="58"
                      cy="58"
                      r="44"
                      stroke="#31ce01"
                      strokeWidth="10"
                      strokeDasharray="276"
                      strokeDashoffset="22"
                      strokeLinecap="round"
                      fill="none"
                      transform="rotate(-90 58 58)"
                    />
                    <text x="58" y="56" textAnchor="middle" className="fill-[#222326] text-[22px] font-bold">
                      Lunas
                    </text>
                    <text x="58" y="73" textAnchor="middle" className="fill-[#747679] text-[10px]">
                      Buka Kunci Visa
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating White Foreground Card (.feature_card-fg.cc-3) */}
            <div className="absolute bottom-6 z-20 w-[86%] rounded-[18px] bg-[#ffffff] p-4 shadow-[0_6px_24px_rgba(0,0,0,0.12)]">
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-semibold text-[#222326]">Tahap Apply Visa & Tiket</span>
                <span className="rounded-md bg-[#31ce01]/20 px-2 py-0.5 text-[11px] font-bold text-[#1e8300]">
                  Kunci Terbuka
                </span>
              </div>
              <p className="mt-1 text-[11.5px] text-[#747679]">
                Kuitansi PDF ber-QR Code terkirim ke WhatsApp Orang Tua.
              </p>
            </div>
          </div>
        </article>
      </div>

      {/* Row 2: Full-Width Horizontal Card 1 (.feature_horizontal-layout.cc-lilac) */}
      <article className="bevel-horiz-lilac mt-6 grid grid-cols-1 items-center overflow-hidden lg:min-h-[520px] lg:grid-cols-12">
        <div className="p-8 sm:p-12 lg:col-span-5 lg:pl-16">
          <h3 className="text-[34px] font-semibold leading-[1.02] tracking-[-0.03em] text-[#222326] sm:text-[44px]">
            {card4.title}
          </h3>
          <p className="mt-4 text-[18px] leading-[1.35] text-[#747679] sm:text-[21px]">
            {card4.description}
          </p>
        </div>

        {/* Right Visual: JIS Rirekisho Document Sheet + Floating Dark Macro-style Breakdown Pills */}
        <div className="relative flex min-h-[380px] items-center justify-center p-6 sm:p-10 lg:col-span-7">
          {/* JIS Rirekisho Sheet */}
          <div className="relative w-full max-w-[460px] rounded-[20px] bg-[#ffffff] p-6 shadow-[0_20px_50px_rgba(31,32,37,0.14)] ring-1 ring-[#222326]/8">
            <div className="flex items-start justify-between border-b-2 border-[#222326] pb-3">
              <div>
                <p className="text-[20px] font-bold tracking-widest text-[#222326]">
                  履 歴 書 (RIREKISHO)
                </p>
                <p className="font-mono text-[11px] text-[#747679]">
                  Format Baku Standar JIS • Auto-Generated PDF
                </p>
              </div>
              <div className="flex h-16 w-13 flex-col items-center justify-center rounded-md border border-[#222326]/30 bg-[#ebf0f8] text-[9px] font-semibold text-[#222326]">
                <span>FOTO</span>
                <span>3 x 4</span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded-lg bg-[#ebf0f8]/70 p-2">
                <span className="text-[9px] text-[#747679]">フリガナ (Katakana)</span>
                <p className="font-semibold text-[#222326]">リズキ・プラタマ</p>
              </div>
              <div className="rounded-lg bg-[#ebf0f8]/70 p-2">
                <span className="text-[9px] text-[#747679]">氏名 (Nama Lengkap)</span>
                <p className="font-semibold text-[#222326]">RIZKY PRATAMA</p>
              </div>
              <div className="rounded-lg bg-[#ebf0f8]/70 p-2">
                <span className="text-[9px] text-[#747679]">生年月日 (Usia & Era)</span>
                <p className="font-semibold text-[#222326]">2004年 (22歳)</p>
              </div>
              <div className="rounded-lg bg-[#ebf0f8]/70 p-2">
                <span className="text-[9px] text-[#747679]">日本語能力 (Level)</span>
                <p className="font-semibold text-[#1e8300]">JLPT N4 • Layak</p>
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-[#ebf0f8] p-2.5 text-[11px]">
              <span className="text-[9px] font-semibold text-[#747679]">
                SURAT RESMI BERKOP LPK YANG IKUT TERCETAK:
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {[
                  "Pengantar Paspor Imigrasi",
                  "Rekomendasi Disnaker / ID CPMI",
                  "Surat Izin Orang Tua",
                  "Kontrak Pelatihan",
                ].map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-[#ebf0f8] px-2 py-0.5 text-[10px] font-medium text-[#222326]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating Dark Pill Overlays matching Bevel's Meal Macro Floating Cards */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-[14px] bg-[#1f2025] px-4 py-2.5 text-[#ffffff] shadow-lg">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#31ce01]" />
                <span className="text-[12px] font-medium">Tanpa Ketik Ulang Manual</span>
              </div>
              <span className="rounded-full bg-[#b9a6ff]/25 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#b9a6ff]">
                1.2 Detik → PDF
              </span>
            </div>
          </div>
        </div>
      </article>

      {/* Row 3: Full-Width Horizontal Card 2 (.feature_horizontal-layout.cc-teal) */}
      <article className="bevel-horiz-teal mt-6 grid grid-cols-1 items-center overflow-hidden lg:min-h-[520px] lg:grid-cols-12">
        <div className="p-8 sm:p-12 lg:col-span-5 lg:pl-16">
          <h3 className="text-[34px] font-semibold leading-[1.02] tracking-[-0.03em] text-[#222326] sm:text-[44px]">
            {card5.title}
          </h3>
          <p className="mt-4 text-[18px] leading-[1.35] text-[#747679] sm:text-[21px]">
            {card5.description}
          </p>
        </div>

        {/* Right Visual (.records_animation): Concentric Circles with Orbiting Document Badges + Center Phone */}
        <div className="relative flex min-h-[440px] items-end justify-center overflow-hidden pt-10 lg:col-span-7">
          {/* Concentric White-Glowing Rings (.records_circle) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 flex items-center justify-center"
          >
            <div className="h-[540px] w-[540px] rounded-full border border-[#ffffff]/80 shadow-[inset_0_0_24px_#ffffff]" />
            <div className="absolute h-[420px] w-[420px] rounded-full border border-[#ffffff]/90 shadow-[inset_0_0_24px_#ffffff]" />
            <div className="absolute h-[310px] w-[310px] rounded-full border border-[#ffffff] shadow-[inset_0_0_24px_#ffffff]" />
          </div>

          {/* Orbiting Document & Institution Pills around the Concentric Rings */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
            <div className="absolute top-10 left-10 rounded-2xl bg-[#ffffff] px-3 py-2 text-[11px] font-bold text-[#222326] shadow-md">
              🪪 KTP & KK Valid
            </div>
            <div className="absolute top-8 right-12 rounded-2xl bg-[#ffffff] px-3 py-2 text-[11px] font-bold text-[#a93f22] shadow-md ring-1 ring-[#ffab94]">
              ⚠️ MCU H-30 Tracker
            </div>
            <div className="absolute top-36 left-6 rounded-2xl bg-[#ffffff] px-3 py-2 text-[11px] font-bold text-[#222326] shadow-md">
              🛂 Paspor Imigrasi
            </div>
            <div className="absolute top-36 right-8 rounded-2xl bg-[#ffffff] px-3 py-2 text-[11px] font-bold text-[#1e8300] shadow-md">
              💬 WA Orang Tua Aktif
            </div>
            <div className="absolute bottom-20 left-12 rounded-2xl bg-[#ffffff] px-3 py-2 text-[11px] font-bold text-[#415eee] shadow-md">
              🏛️ ID CPMI Disnaker
            </div>
            <div className="absolute bottom-20 right-12 rounded-2xl bg-[#ffffff] px-3 py-2 text-[11px] font-bold text-[#583ec2] shadow-md">
              🎓 Ijazah & Sertifikat N4
            </div>
          </div>

          {/* Central Cropped iPhone rising from bottom */}
          <div className="relative z-10 w-[270px] rounded-t-[38px] bg-[#1f2025] p-2.5 pb-0 shadow-2xl">
            <div className="mx-auto mb-2 h-4 w-20 rounded-full bg-[#09090b]" />
            <div className="h-[300px] rounded-t-[30px] bg-[#ffffff] p-4 text-[#222326]">
              <p className="text-[11px] font-semibold text-[#747679]">Checklist Pemberkasan</p>
              <p className="text-[15px] font-bold text-[#222326]">7 Dokumen Legalitas</p>
              <div className="mt-3 space-y-2 text-[11px]">
                {[
                  { d: "KTP & KK", s: "Valid", c: "text-[#1e8300] bg-[#31ce01]/15" },
                  { d: "Paspor RI", s: "Aktif 2030", c: "text-[#1e8300] bg-[#31ce01]/15" },
                  { d: "Medical Check Up", s: "Sisa 24 Hari", c: "text-[#a93f22] bg-[#ffab94]/30" },
                  { d: "ID CPMI Disnaker", s: "Terverifikasi", c: "text-[#2945d6] bg-[#415eee]/15" },
                ].map((row) => (
                  <div
                    key={row.d}
                    className="flex items-center justify-between rounded-xl bg-[#ebf0f8]/60 px-3 py-2"
                  >
                    <span className="font-medium">{row.d}</span>
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${row.c}`}>
                      {row.s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
