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
      className="bevel-container overflow-hidden pb-24"
    >
      {/* Centered Heading matching Bevel 100% Scale (64px H2 + 24px Subtitle) */}
      <div className="mx-auto max-w-[760px] text-center">
        <h2 id="start-day-heading" className="bevel-display">
          Tutup celah gagal berangkat sejak hari pertama
        </h2>
        <p className="bevel-body mt-5">
          Ubah catatan asrama, progres bahasa N4, dan kelengkapan berkas negara menjadi sistem deteksi dini yang menjaga reputasi LPK Anda di mata mitra Jepang dan Korea.
        </p>
      </div>

      {/* Row 1: 3 Vertical Cards (.feature_card.cc-orange, .cc-blue, .cc-green) with Web Desktop Windows */}
      <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Card 1: Orange Wash (Asrama & Poin Disiplin - Web Desktop Window) */}
        <article className="bevel-card-orange flex flex-col justify-between overflow-hidden">
          <div className="p-10 pb-5 sm:p-12 sm:pb-6">
            <h3 className="bevel-card-heading">{card1.title}</h3>
            <p className="mt-4 text-[20px] leading-[1.32] text-[#747679]">
              {card1.description}
            </p>
          </div>

          <div className="relative flex aspect-[432/460] w-full items-start justify-center overflow-hidden px-6 pt-2">
            {/* Web Desktop Browser Window rising from bottom */}
            <div className="w-full rounded-t-[20px] bg-[#1f2025] p-2 pb-0 shadow-2xl ring-1 ring-[#ffffff]/20">
              <div className="flex items-center justify-between rounded-t-[12px] bg-[#141518] px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[10px] text-[#ebf0f8]/75">
                  lpknusantara.siapterbang.id/tu/asrama
                </span>
                <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
              </div>

              <div className="h-[370px] bg-[#ffffff] p-5">
                <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-2.5 text-[11px] text-[#747679]">
                  <span className="font-semibold text-[#222326]">Monitor Asrama Blok B</span>
                  <span className="font-semibold text-[#a93f22]">Batas Kunci: 100 Poin</span>
                </div>
                <div className="my-5 flex flex-col items-center">
                  <svg width="132" height="132" viewBox="0 0 120 120" aria-hidden="true">
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
            <div className="absolute bottom-6 z-20 w-[86%] rounded-[18px] bg-[#ffffff]/92 p-4 shadow-[0_8px_28px_rgba(0,0,0,0.14)] backdrop-blur-md">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-semibold text-[#222326]">Log Kedisiplinan Harian</span>
                <span className="rounded-full bg-[#31ce01]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[#1e8300]">
                  Aktif
                </span>
              </div>
              <p className="mt-1 text-[12.5px] text-[#747679]">
                Lewat 100 poin, status otomatis berubah menjadi <strong>Suspended</strong> & terkunci dari Job Order.
              </p>
            </div>
          </div>
        </article>

        {/* Card 2: Blue Wash (Siklus Rematching - Web Desktop Window) */}
        <article className="bevel-card-blue flex flex-col justify-between overflow-hidden">
          <div className="p-10 pb-5 sm:p-12 sm:pb-6">
            <h3 className="bevel-card-heading">{card2.title}</h3>
            <p className="mt-4 text-[20px] leading-[1.32] text-[#747679]">
              {card2.description}
            </p>
          </div>

          <div className="relative flex aspect-[432/460] w-full items-start justify-center overflow-hidden px-6 pt-2">
            <div className="w-full rounded-t-[20px] bg-[#1f2025] p-2 pb-0 shadow-2xl ring-1 ring-[#ffffff]/20">
              <div className="flex items-center justify-between rounded-t-[12px] bg-[#141518] px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[10px] text-[#ebf0f8]/75">
                  lpknusantara.siapterbang.id/mensetsu
                </span>
                <span className="h-2 w-2 rounded-full bg-[#415eee]" />
              </div>

              <div className="h-[370px] bg-[#ffffff] p-5">
                <p className="text-[11px] font-medium text-[#747679]">Matriks Lamaran Kandidat</p>
                <p className="text-[17px] font-bold text-[#222326]">Relasi Many-to-Many SO</p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-[14px] bg-[#ebf0f8]/70 p-3">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="font-semibold text-[#222326]">Job #1: Kumiai Ibaraki</span>
                      <span className="font-semibold text-[#a93f22]">Belum Lolos</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#747679]">
                      Evaluasi tersimpan. Otomatis kembali ke Pool Siap Wawancara.
                    </p>
                  </div>

                  <div className="rounded-[14px] bg-[#415eee]/12 p-3">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="font-semibold text-[#222326]">Job #2: Manufaktur Aichi</span>
                      <span className="font-semibold text-[#415eee]">Terdaftar</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-[#ffffff]">
                      <div className="h-full w-[82%] rounded-full bg-[#415eee]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Right Glass Widget (.feature_card-fg.cc-2) */}
            <div className="absolute right-6 bottom-12 z-20 w-[46%] rounded-[20px] bg-[#ffffff]/90 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.14)] backdrop-blur-xl ring-1 ring-[#ffffff]">
              <p className="text-[10.5px] font-semibold uppercase text-[#415eee]">
                Auto-Rematching
              </p>
              <p className="mt-1 text-[22px] font-bold text-[#222326]">100%</p>
              <p className="text-[11.5px] leading-tight text-[#747679]">
                Histori evaluasi tersimpan di profil
              </p>
            </div>
          </div>
        </article>

        {/* Card 3: Green Wash (Gatekeeper Keuangan - Web Desktop Window) */}
        <article className="bevel-card-green flex flex-col justify-between overflow-hidden">
          <div className="p-10 pb-5 sm:p-12 sm:pb-6">
            <h3 className="bevel-card-heading">{card3.title}</h3>
            <p className="mt-4 text-[20px] leading-[1.32] text-[#747679]">
              {card3.description}
            </p>
          </div>

          <div className="relative flex aspect-[432/460] w-full items-start justify-center overflow-hidden px-6 pt-2">
            <div className="w-full rounded-t-[20px] bg-[#1f2025] p-2 pb-0 shadow-2xl ring-1 ring-[#ffffff]/20">
              <div className="flex items-center justify-between rounded-t-[12px] bg-[#141518] px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[10px] text-[#ebf0f8]/75">
                  lpknusantara.siapterbang.id/keuangan
                </span>
                <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
              </div>

              <div className="h-[370px] bg-[#ffffff] p-5">
                <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-2.5 text-[11px] text-[#747679]">
                  <span className="font-semibold text-[#222326]">Financial Gatekeeping</span>
                  <span className="font-semibold text-[#1e8300]">Cleared</span>
                </div>
                <div className="my-5 flex flex-col items-center">
                  <svg width="128" height="128" viewBox="0 0 116 116" aria-hidden="true">
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
            <div className="absolute bottom-6 z-20 w-[86%] rounded-[18px] bg-[#ffffff] p-4 shadow-[0_8px_28px_rgba(0,0,0,0.14)]">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-semibold text-[#222326]">Tahap Apply Visa & Tiket</span>
                <span className="rounded-md bg-[#31ce01]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#1e8300]">
                  Kunci Terbuka
                </span>
              </div>
              <p className="mt-1 text-[12px] text-[#747679]">
                Kuitansi PDF ber-QR Code terkirim ke WhatsApp Orang Tua.
              </p>
            </div>
          </div>
        </article>
      </div>

      {/* Row 2: Full-Width Horizontal Card 1 (.feature_horizontal-layout.cc-lilac at 100% Bevel Scale: 64px heading, 620px height) */}
      <article className="bevel-horiz-lilac mt-6 grid grid-cols-1 items-center overflow-hidden lg:min-h-[620px] lg:grid-cols-12">
        <div className="p-10 sm:p-14 lg:col-span-6 lg:pl-16">
          <h3 className="bevel-h2-h3 text-[#222326]">{card4.title}</h3>
          <p className="bevel-body mt-5 max-w-[540px]">{card4.description}</p>
        </div>

        {/* Right Visual: Web Desktop Rirekisho Studio Window + Floating Dark Breakdown Pills */}
        <div className="relative flex min-h-[440px] items-center justify-center p-6 sm:p-12 lg:col-span-6">
          <div className="w-full max-w-[540px] overflow-hidden rounded-[22px] bg-[#1f2025] p-2 shadow-[0_24px_60px_rgba(31,32,37,0.22)] ring-1 ring-[#ffffff]/25">
            <div className="flex items-center justify-between rounded-t-[14px] bg-[#141518] px-4 py-2 text-[#ebf0f8]">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="font-mono text-[11px] text-[#ebf0f8]/80">
                lpknusantara.siapterbang.id/penempatan/rirekisho-studio
              </span>
              <span className="rounded bg-[#b9a6ff]/25 px-2 py-0.5 font-mono text-[10px] text-[#b9a6ff]">
                JIS PDF
              </span>
            </div>

            <div className="rounded-b-[14px] bg-[#ffffff] p-6 text-[#222326]">
              <div className="flex items-start justify-between border-b-2 border-[#222326] pb-3.5">
                <div>
                  <p className="text-[22px] font-bold tracking-widest text-[#222326]">
                    履 歴 書 (RIREKISHO)
                  </p>
                  <p className="font-mono text-[11.5px] text-[#747679]">
                    Format Baku Standar JIS • Auto-Generated dari Database Siswa
                  </p>
                </div>
                <div className="flex h-16 w-14 flex-col items-center justify-center rounded-md border border-[#222326]/30 bg-[#ebf0f8] text-[9.5px] font-semibold text-[#222326]">
                  <span>FOTO</span>
                  <span>3 x 4</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 text-[12px]">
                <div className="rounded-xl bg-[#ebf0f8]/70 p-2.5">
                  <span className="text-[10px] text-[#747679]">フリガナ (Katakana)</span>
                  <p className="font-semibold text-[#222326]">リズキ・プラタマ</p>
                </div>
                <div className="rounded-xl bg-[#ebf0f8]/70 p-2.5">
                  <span className="text-[10px] text-[#747679]">氏名 (Nama Lengkap)</span>
                  <p className="font-semibold text-[#222326]">RIZKY PRATAMA</p>
                </div>
                <div className="rounded-xl bg-[#ebf0f8]/70 p-2.5">
                  <span className="text-[10px] text-[#747679]">生年月日 (Usia & Era)</span>
                  <p className="font-semibold text-[#222326]">2004年 (22歳)</p>
                </div>
                <div className="rounded-xl bg-[#ebf0f8]/70 p-2.5">
                  <span className="text-[10px] text-[#747679]">日本語能力 (Level)</span>
                  <p className="font-semibold text-[#1e8300]">JLPT N4 • Layak Mensetsu</p>
                </div>
              </div>

              <div className="mt-3.5 rounded-xl border border-[#ebf0f8] p-3 text-[11.5px]">
                <span className="text-[10px] font-semibold text-[#747679]">
                  SURAT DINAS BERKOP LPK YANG OTOMATIS TERCETAK:
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[
                    "Pengantar Paspor Imigrasi",
                    "Rekomendasi Disnaker / ID CPMI",
                    "Surat Izin Orang Tua",
                    "Kontrak Pelatihan",
                  ].map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-[#ebf0f8] px-2.5 py-1 text-[11px] font-medium text-[#222326]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-[14px] bg-[#1f2025] px-4 py-3 text-[#ffffff]">
                <span className="text-[12.5px] font-medium">Cetak Sekaligus untuk 20 Kandidat</span>
                <span className="rounded-full bg-[#31ce01]/25 px-3 py-0.5 font-mono text-[11px] font-bold text-[#31ce01]">
                  1.2 Detik → PDF
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Row 3: Full-Width Horizontal Card 2 (.feature_horizontal-layout.cc-teal at 100% Bevel Scale: 64px heading, 620px height) */}
      <article className="bevel-horiz-teal mt-6 grid grid-cols-1 items-center overflow-hidden lg:min-h-[620px] lg:grid-cols-12">
        <div className="p-10 sm:p-14 lg:col-span-6 lg:pl-16">
          <h3 className="bevel-h2-h3 text-[#222326]">{card5.title}</h3>
          <p className="bevel-body mt-5 max-w-[540px]">{card5.description}</p>
        </div>

        {/* Right Visual: Concentric White-Glowing Rings + Web Desktop Document Vault Window */}
        <div className="relative flex min-h-[480px] items-end justify-center overflow-hidden px-6 pt-12 lg:col-span-6 lg:min-h-[620px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 flex items-center justify-center"
          >
            <div className="h-[600px] w-[600px] rounded-full border border-[#ffffff]/80 shadow-[inset_0_0_24px_#ffffff]" />
            <div className="absolute h-[460px] w-[460px] rounded-full border border-[#ffffff]/90 shadow-[inset_0_0_24px_#ffffff]" />
            <div className="absolute h-[340px] w-[340px] rounded-full border border-[#ffffff] shadow-[inset_0_0_24px_#ffffff]" />
          </div>

          {/* Orbiting Document Badges */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
            <div className="absolute top-12 left-8 rounded-2xl bg-[#ffffff] px-3.5 py-2 text-[12px] font-bold text-[#222326] shadow-md">
              🪪 KTP & KK Valid
            </div>
            <div className="absolute top-10 right-10 rounded-2xl bg-[#ffffff] px-3.5 py-2 text-[12px] font-bold text-[#a93f22] shadow-md ring-1 ring-[#ffab94]">
              ⚠️ MCU H-30 Tracker
            </div>
            <div className="absolute top-40 left-4 rounded-2xl bg-[#ffffff] px-3.5 py-2 text-[12px] font-bold text-[#222326] shadow-md">
              🛂 Paspor Imigrasi
            </div>
            <div className="absolute top-40 right-6 rounded-2xl bg-[#ffffff] px-3.5 py-2 text-[12px] font-bold text-[#1e8300] shadow-md">
              💬 WA Orang Tua Aktif
            </div>
          </div>

          {/* Central Cropped Web Desktop Document Vault Window rising from bottom */}
          <div className="relative z-10 w-full max-w-[460px] rounded-t-[22px] bg-[#1f2025] p-2 pb-0 shadow-2xl ring-1 ring-[#ffffff]/25">
            <div className="flex items-center justify-between rounded-t-[14px] bg-[#141518] px-3.5 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="font-mono text-[10.5px] text-[#ebf0f8]/80">
                lpknusantara.siapterbang.id/tu/documents
              </span>
              <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
            </div>

            <div className="h-[340px] bg-[#ffffff] p-5 text-[#222326]">
              <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-3">
                <div>
                  <p className="text-[11px] font-semibold text-[#747679]">Brankas Dokumen Negara</p>
                  <p className="text-[17px] font-bold text-[#222326]">7 Berkas Legalitas CPMI</p>
                </div>
                <span className="rounded-full bg-[#31ce01]/15 px-3 py-1 text-[11px] font-bold text-[#1e8300]">
                  Terverifikasi TU
                </span>
              </div>

              <div className="mt-3.5 space-y-2.5 text-[12px]">
                {[
                  { d: "KTP, KK & Akta Kelahiran", s: "Valid • Terkunci", c: "text-[#1e8300] bg-[#31ce01]/15" },
                  { d: "Paspor Republik Indonesia", s: "Aktif s/d 2030", c: "text-[#1e8300] bg-[#31ce01]/15" },
                  { d: "Medical Check Up (MCU)", s: "Sisa 24 Hari (H-30)", c: "text-[#a93f22] bg-[#ffab94]/30" },
                  { d: "Rekomendasi ID CPMI Disnaker", s: "Terbit PDF", c: "text-[#2945d6] bg-[#415eee]/15" },
                ].map((row) => (
                  <div
                    key={row.d}
                    className="flex items-center justify-between rounded-xl bg-[#ebf0f8]/60 px-3.5 py-2.5"
                  >
                    <span className="font-semibold text-[#222326]">{row.d}</span>
                    <span className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold ${row.c}`}>
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
