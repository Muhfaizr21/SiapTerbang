"use client";

import type { SaaSPricingTier } from "@/types/landing";

export interface PrivacyAndPricingSectionProps {
  readonly tiers: ReadonlyArray<SaaSPricingTier>;
  readonly onSelectTier: (tierName: string) => void;
}

const OPERATIONAL_CARDS = [
  {
    title: "Tidak ada lagi berkas tercecer",
    author: "Divisi Admin TU LPK",
    date: "Pemberkasan & H-30",
    body: "“Dulu menjelang pengajuan CoE selalu panik karena masa berlaku MCU atau paspor siswa habis tanpa sadar. Sekarang peringatan merah H-30 langsung muncul di layar utama TU dan Direktur.”",
  },
  {
    title: "Cetak Rirekisho hitungannya detik",
    author: "Divisi Penempatan & SO",
    date: "Smart Matching & CV",
    body: "“Saat ada Job Order mendadak dari Kumiai Jepang, kami tidak perlu lagi mengetik ulang biodata 30 kandidat satu per satu. Sekali klik, CV Rirekisho standar JIS dan surat pengantar langsung jadi PDF.”",
  },
  {
    title: "Orang tua di daerah tenang & percaya",
    author: "Divisi Keuangan & Wali",
    date: "WhatsApp Gateway & QR",
    body: "“Begitu pembayaran cicilan diinput kasir, orang tua siswa di daerah langsung menerima kuitansi PDF resmi ber-QR Code di WhatsApp mereka. Kepercayaan wali murid meningkat drastis.”",
  },
  {
    title: "Kandidat bermasalah otomatis terkunci",
    author: "Sensei & Pengurus Asrama",
    date: "Cross-Role Gatekeeper",
    body: "“Staf penempatan tidak bisa lagi memasukkan siswa yang belum lulus bahasa N4 atau yang poin pelanggaran asramanya lewat 100. Reputasi LPK di mata perusahaan Jepang terjaga penuh.”",
  },
  {
    title: "Siklus gagal mensetsu sangat rapi",
    author: "Koordinator Mensetsu",
    date: "Many-to-Many Rematching",
    body: "“Siswa yang belum lolos wawancara pertama otomatis kembali ke pool kandidat siap wawancara lengkap dengan catatan evaluasi pewawancara untuk perbaikan di Job Order berikutnya.”",
  },
] as const;

export function PrivacyAndPricingSection({
  tiers,
  onSelectTier,
}: PrivacyAndPricingSectionProps) {
  return (
    <>
      {/* SECTION 8: Built for privacy (.privacy_container.u-theme-dark) */}
      <section
        id="isolasi-data"
        aria-labelledby="privacy-heading"
        className="mx-auto mt-24 w-full max-w-[1360px] px-4 sm:px-6"
      >
        <div className="bevel-privacy-dark relative flex h-[540px] w-full items-center justify-center overflow-hidden rounded-[24px] px-6 text-center text-[#ffffff] sm:h-[620px]">
          {/* .privacy_dots background pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-45"
            style={{
              backgroundImage: "url('/bevel/dot.svg')",
              backgroundPosition: "50%",
              backgroundSize: "16px",
            }}
          />

          {/* .privacy_shape giant translucent lock watermark */}
          <img
            src="/bevel/privacy-lock.svg"
            alt=""
            width={547}
            height={781}
            className="pointer-events-none absolute h-[115%] w-auto object-contain opacity-25 mix-blend-screen"
          />

          <div className="relative z-10 mx-auto max-w-[520px]">
            <h2
              id="privacy-heading"
              className="text-[42px] font-semibold leading-[1] tracking-[-0.03em] text-[#ffffff] sm:text-[56px] md:text-[64px]"
            >
              Dirancang untuk privasi
            </h2>
            <p className="mt-5 text-[19px] leading-[1.35] text-[#ebf0f8]/75 sm:text-[22px]">
              Data LPK Anda adalah milik Anda sepenuhnya. Kami tidak pernah menjualnya dan melindunginya dengan isolasi ruang kerja multi-tenant berstandar industri.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: Crafted with Care Loved Everywhere (.craft_container Mosaic + .marquee.cc-cards) */}
      <section
        aria-labelledby="crafted-heading"
        className="mx-auto mt-28 w-full overflow-hidden pb-8"
      >
        {/* .craft_container: 5-Column Asymmetric Rounded Frame Mosaic matching Bevel */}
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
          <div className="grid grid-cols-2 items-center gap-4 md:grid-cols-5">
            {/* Column 1 */}
            <div className="hidden flex-col gap-4 md:flex">
              <div className="flex h-[220px] flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#2b3545] to-[#1a202c] p-5 text-[#ffffff]">
                <span className="font-mono text-[10px] text-[#31ce01]">ASRAMA PUTRA</span>
                <div>
                  <p className="text-[18px] font-bold">Disiplin Pagi</p>
                  <p className="text-[12px] text-[#ebf0f8]/70">0 Pelanggaran • 100% Hadir</p>
                </div>
              </div>
              <div className="flex h-[160px] flex-col justify-between rounded-[28px] bg-[#ebf0f8] p-5 text-[#222326]">
                <span className="font-mono text-[10px] font-bold text-[#415eee]">MODUL BAHASA</span>
                <div>
                  <p className="text-[17px] font-bold">Minna no Nihongo</p>
                  <p className="text-[12px] text-[#747679]">Bab 1 - 50 Terpantau</p>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <div className="flex h-[160px] flex-col justify-between rounded-[28px] bg-[#ebf0f8] p-5 text-[#222326]">
                <span className="font-mono text-[10px] font-bold text-[#a93f22]">EXPIRY H-30</span>
                <div>
                  <p className="text-[17px] font-bold">Paspor & MCU</p>
                  <p className="text-[12px] text-[#747679]">Deteksi Dini Otomatis</p>
                </div>
              </div>
              <div className="flex h-[220px] flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#342d47] to-[#1d1929] p-5 text-[#ffffff]">
                <span className="font-mono text-[10px] text-[#b9a6ff]">AUTO-GENERATOR</span>
                <div>
                  <p className="text-[18px] font-bold">CV Rirekisho JIS</p>
                  <p className="text-[12px] text-[#ebf0f8]/70">Cetak Instan Berkop LPK</p>
                </div>
              </div>
            </div>

            {/* Column 3 (Center Large Emblem Frame .crafted_frame.cc-large) */}
            <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
              <div className="flex h-[356px] flex-col items-center justify-center rounded-[32px] bg-gradient-to-b from-[#d2e5ff] via-[#ebf0f8] to-[#fff9ee] p-6 text-center shadow-sm ring-1 ring-[#222326]/6">
                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-[#1f2025] text-[#ffffff] shadow-[0_20px_40px_rgba(31,32,37,0.3)]">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                  </svg>
                </div>
                <p className="mt-5 text-[20px] font-bold tracking-tight text-[#222326]">
                  SiapTerbang
                </p>
                <p className="mt-1 text-[12px] font-medium text-[#747679]">
                  7 Role • Multi-Tenant SaaS
                </p>
              </div>
            </div>

            {/* Column 4 */}
            <div className="hidden flex-col gap-4 md:flex">
              <div className="flex h-[220px] flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#233d35] to-[#152420] p-5 text-[#ffffff]">
                <span className="font-mono text-[10px] text-[#31ce01]">WHATSAPP WALI</span>
                <div>
                  <p className="text-[18px] font-bold">Kuitansi QR Lunas</p>
                  <p className="text-[12px] text-[#ebf0f8]/70">Transparansi Orang Tua</p>
                </div>
              </div>
              <div className="flex h-[160px] flex-col justify-between rounded-[28px] bg-[#ebf0f8] p-5 text-[#222326]">
                <span className="font-mono text-[10px] font-bold text-[#8a6a00]">DANA TALANGAN</span>
                <div>
                  <p className="text-[17px] font-bold">Pantauan Alumni</p>
                  <p className="text-[12px] text-[#747679]">Kontrak 3 & 5 Tahun</p>
                </div>
              </div>
            </div>

            {/* Column 5 */}
            <div className="hidden flex-col gap-4 md:flex">
              <div className="flex h-[160px] flex-col justify-between rounded-[28px] bg-[#ebf0f8] p-5 text-[#222326]">
                <span className="font-mono text-[10px] font-bold text-[#415eee]">REMATCHING</span>
                <div>
                  <p className="text-[17px] font-bold">Many-to-Many SO</p>
                  <p className="text-[12px] text-[#747679]">Auto-Pool Kandidat</p>
                </div>
              </div>
              <div className="flex h-[220px] flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#3d2b29] to-[#241918] p-5 text-[#ffffff]">
                <span className="font-mono text-[10px] text-[#ffab94]">ANTI-FRAUD</span>
                <div>
                  <p className="text-[18px] font-bold">Approval Direktur</p>
                  <p className="text-[12px] text-[#ebf0f8]/70">Kalkulator Refund Akurat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Heading matching "Crafted with Care Loved Everywhere" */}
        <div className="mx-auto mt-20 max-w-[680px] px-4 text-center">
          <h2 id="crafted-heading" className="bevel-display">
            Dirancang dengan Presisi Diandalkan LPK di Daerah
          </h2>
          <p className="bevel-body mt-4">
            Lihat bagaimana SiapTerbang menutup kebocoran administrasi, mempercepat pemberkasan, dan menjaga reputasi LPK di mata mitra luar negeri.
          </p>
        </div>

        {/* .marquee.cc-cards: Infinite Horizontal Marquee of #ebf0f8 rounded-[32px] w-[384px] p-8 Review Cards */}
        <div className="bevel-marquee-mask relative mx-auto mt-14 w-full max-w-[1600px] overflow-hidden py-4">
          <div className="animate-bevel-marquee-slow flex items-stretch gap-6 pl-6">
            {[...OPERATIONAL_CARDS, ...OPERATIONAL_CARDS].map((card, i) => (
              <article
                key={`${card.title}-${i}`}
                className="flex w-[350px] sm:w-[384px] shrink-0 flex-col justify-between rounded-[32px] bg-[#ebf0f8] p-8 text-[#222326]"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#ffca00]" aria-label="5 bintang">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <h3 className="mt-4 text-[18px] font-semibold text-[#222326]">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-[14px] text-[#747679]">
                    {card.author}, {card.date}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#222326]">
                    {card.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Tiered Pricing SaaS (Bab 5 SiapTerbang.pdf) styled in matching #ebf0f8 & #1f2025 Bevel surfaces */}
        <div
          id="paket-langganan"
          className="mx-auto mt-24 max-w-[1360px] px-4 sm:px-6"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-[36px] font-semibold leading-tight tracking-[-0.03em] text-[#222326] sm:text-[48px]">
              Skema Paket Langganan SaaS
            </h3>
            <p className="mt-3 text-[18px] text-[#747679]">
              Pilih kapasitas kuota siswa, storage dokumen, dan modul otomasi yang sesuai dengan tahap pertumbuhan LPK Anda.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {tiers.map((tier) => {
              const isPro = Boolean(tier.isRecommended);
              return (
                <article
                  key={tier.id}
                  className={`flex flex-col justify-between rounded-[32px] p-8 ${
                    isPro
                      ? "bg-[#1f2025] text-[#ffffff] shadow-xl"
                      : "bg-[#ebf0f8] text-[#222326]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[13px] font-semibold uppercase tracking-wider ${
                          isPro ? "text-[#ffca00]" : "text-[#747679]"
                        }`}
                      >
                        {tier.targetAudience}
                      </span>
                      {isPro && (
                        <span className="rounded-full bg-[#31ce01]/20 px-3 py-1 text-[11px] font-semibold text-[#31ce01]">
                          Best Seller
                        </span>
                      )}
                    </div>

                    <h4 className="mt-2 text-[32px] font-semibold tracking-[-0.03em]">
                      {tier.name}
                    </h4>

                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="text-[26px] font-bold">{tier.priceRange}</span>
                      <span className={`text-[14px] ${isPro ? "text-[#ebf0f8]/70" : "text-[#747679]"}`}>
                        {tier.period}
                      </span>
                    </div>

                    <p
                      className={`mt-4 rounded-[16px] px-3.5 py-2.5 text-[13px] font-medium ${
                        isPro ? "bg-[#ffffff]/10 text-[#ebf0f8]" : "bg-[#ffffff] text-[#222326]"
                      }`}
                    >
                      {tier.quotaSummary}
                    </p>

                    <ul className="mt-6 space-y-2.5 text-[14.5px]">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#31ce01]" />
                          <span className={isPro ? "text-[#ebf0f8]/90" : "text-[#222326]"}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectTier(tier.name)}
                    className={`mt-8 min-h-[46px] w-full rounded-[128px] px-5 py-3 text-[15px] font-semibold transition-transform active:scale-[0.98] ${
                      isPro
                        ? "bg-[#ebf0f8] text-[#1f2025] hover:bg-[#ffffff]"
                        : "bg-[#1f2025] text-[#ebf0f8] hover:bg-[#000000]"
                    }`}
                  >
                    Mulai dengan {tier.name}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
