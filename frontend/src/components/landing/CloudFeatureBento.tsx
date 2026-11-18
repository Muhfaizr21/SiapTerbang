import type { CoreCloudFeatureCard } from "@/types/landing";

export interface CloudFeatureBentoProps {
  readonly features: ReadonlyArray<CoreCloudFeatureCard>;
}

function InsetFeatureVisualization({
  variant,
}: {
  readonly variant: CoreCloudFeatureCard["visualVariant"];
}) {
  switch (variant) {
    case "discipline-ring":
      return (
        <div className="mt-6 rounded-[20px] bg-[#ffffff] p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-[#747679]">Ambang Kunci Asrama</p>
              <p className="mt-0.5 text-[20px] font-semibold text-[#222326]">15 / 100 Poin</p>
            </div>
            <span className="rounded-full bg-[#31ce01]/15 px-3 py-1 text-[12px] font-semibold text-[#1e8300]">
              Aktif • Bisa Wawancara
            </span>
          </div>
          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[#ebf0f8]">
            <div className="h-full w-[15%] rounded-full bg-[#31ce01]" />
          </div>
          <div className="mt-4 flex items-center justify-between rounded-[14px] bg-[#ffab94]/20 px-3.5 py-2.5 text-[12px]">
            <span className="font-medium text-[#222326]">Simulasi jika &ge; 100 Poin:</span>
            <span className="font-semibold text-[#a93f22]">Auto-Suspended & Terkunci</span>
          </div>
        </div>
      );

    case "rematching-loop":
      return (
        <div className="mt-6 rounded-[20px] bg-[#ffffff] p-5 shadow-xs">
          <div className="flex items-center justify-between text-[12px] font-medium text-[#747679]">
            <span>Siklus Many-to-Many Job Order</span>
            <span className="font-mono text-[#415eee]">Auto-Recycle Pool</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-[12px] bg-[#ebf0f8]/70 px-3 py-2 text-[13px]">
              <span className="font-medium text-[#222326]">Job #1: Kumiai Pertanian Ibaraki</span>
              <span className="rounded-md bg-[#ffab94]/30 px-2 py-0.5 text-[11px] font-semibold text-[#a93f22]">
                Gagal • Evaluasi Tersimpan
              </span>
            </div>
            <div className="flex items-center justify-between rounded-[12px] bg-[#31ce01]/12 px-3 py-2 text-[13px]">
              <span className="font-medium text-[#222326]">Job #2: Pengolahan Makanan Osaka</span>
              <span className="rounded-md bg-[#31ce01]/25 px-2 py-0.5 text-[11px] font-semibold text-[#1e8300]">
                Lolos → Masuk CoE
              </span>
            </div>
          </div>
        </div>
      );

    case "financial-gate":
      return (
        <div className="mt-6 rounded-[20px] bg-[#ffffff] p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#747679]">Status Financial Gatekeeping</span>
            <span className="rounded-full bg-[#ffca00]/25 px-2.5 py-0.5 text-[11px] font-semibold text-[#8a6a00]">
              Terlindungi
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <div className="rounded-[14px] bg-[#ebf0f8]/60 p-3">
              <p className="text-[11px] text-[#747679]">Tahap Apply Visa</p>
              <p className="mt-1 text-[14px] font-semibold text-[#1e8300]">Terbuka (Dana Talangan)</p>
            </div>
            <div className="rounded-[14px] bg-[#ebf0f8]/60 p-3">
              <p className="text-[11px] text-[#747679]">Kalkulator Refund</p>
              <p className="mt-1 text-[14px] font-semibold text-[#222326]">Potong MCU & Paspor</p>
            </div>
          </div>
        </div>
      );

    case "rirekisho-generator":
      return (
        <div className="mt-6 rounded-[20px] bg-[#ffffff] p-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ebf0f8] pb-3">
            <div>
              <span className="font-mono text-[11px] font-semibold text-[#583ec2]">
                履歴書 • STANDAR BAKU JIS JEPANG & KOREA
              </span>
              <p className="text-[15px] font-semibold text-[#222326]">
                Auto-Generator Dokumen Berkop Resmi LPK
              </p>
            </div>
            <span className="rounded-full bg-[#1f2025] px-3 py-1 text-[11px] font-medium text-[#ebf0f8]">
              1-Klik Cetak PDF
            </span>
          </div>
          <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[
              { title: "CV Rirekisho JIS", tag: "Katakana + Foto 3x4" },
              { title: "Pengantar Imigrasi", tag: "Rekomendasi Paspor" },
              { title: "Surat Disnaker", tag: "Pengantar ID CPMI" },
              { title: "Izin Orang Tua", tag: "& Kontrak Pelatihan" },
            ].map((doc) => (
              <div key={doc.title} className="rounded-[14px] bg-[#ebf0f8]/70 p-3">
                <p className="text-[13px] font-semibold text-[#222326]">{doc.title}</p>
                <p className="mt-0.5 text-[11px] text-[#747679]">{doc.tag}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "document-vault":
      return (
        <div className="mt-6 rounded-[20px] bg-[#ffffff] p-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ebf0f8] pb-3">
            <div>
              <span className="font-mono text-[11px] font-semibold text-[#2945d6]">
                7 BERKAS LEGALITAS + WHATSAPP GATEWAY WALI
              </span>
              <p className="text-[15px] font-semibold text-[#222326]">
                Sinkronisasi Kamera HP Siswa, Admin TU & Orang Tua
              </p>
            </div>
            <span className="rounded-full bg-[#ffab94]/30 px-3 py-1 text-[11px] font-semibold text-[#a93f22]">
              Alert H-30 Aktif
            </span>
          </div>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {[
              { name: "KTP", state: "Valid" },
              { name: "Kartu Keluarga", state: "Valid" },
              { name: "Akta Lahir", state: "Valid" },
              { name: "Ijazah", state: "Valid" },
              { name: "Paspor (2030)", state: "Valid" },
              { name: "MCU (Sisa 22 Hari)", state: "H-30 Alert" },
              { name: "ID CPMI", state: "Valid" },
            ].map((item) => (
              <span
                key={item.name}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium ${
                  item.state === "H-30 Alert"
                    ? "bg-[#ffab94]/30 text-[#a93f22]"
                    : "bg-[#ebf0f8] text-[#222326]"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    item.state === "H-30 Alert" ? "bg-[#ffab94]" : "bg-[#31ce01]"
                  }`}
                />
                {item.name}
              </span>
            ))}
          </div>
        </div>
      );
  }
}

export function CloudFeatureBento({ features }: CloudFeatureBentoProps) {
  const topRow = features.filter((f) => f.layoutSpan === "third");
  const bottomRow = features.filter((f) => f.layoutSpan === "half");

  return (
    <section
      id="fitur-utama"
      aria-labelledby="bento-heading"
      className="mx-auto mt-[80px] w-full max-w-[1400px] px-4 sm:px-6"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="bento-heading" className="bevel-display">
          Awali operasional harian dengan kepastian data
        </h2>
        <p className="bevel-body mt-4">
          Ubah tumpukan map kertas dan file Excel yang terpisah menjadi lima mesin otomatis yang menutup seluruh celah krusial lapangan LPK.
        </p>
      </div>

      {/* Row 1: 3 Cloud Feature Cards (DESIGN.md: #ebf0f8, 24px radius, 32px padding, 40px Ink title, 24px Body Gray copy) */}
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {topRow.map((card) => (
          <article
            key={card.id}
            className="bevel-cloud-card flex flex-col justify-between"
          >
            <div>
              <h3 className="bevel-card-heading">{card.title}</h3>
              <p className="mt-4 text-[18px] leading-[1.4] font-normal text-[#747679] sm:text-[20px]">
                {card.description}
              </p>
            </div>
            <InsetFeatureVisualization variant={card.visualVariant} />
          </article>
        ))}
      </div>

      {/* Row 2: 2 Wide Cloud Feature Cards (matching Bevel's Meal & Health Records wide cards) */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {bottomRow.map((card) => (
          <article
            key={card.id}
            className="bevel-cloud-card flex flex-col justify-between"
          >
            <div>
              <h3 className="bevel-card-heading">{card.title}</h3>
              <p className="mt-4 text-[18px] leading-[1.4] font-normal text-[#747679] sm:text-[20px]">
                {card.description}
              </p>
            </div>
            <InsetFeatureVisualization variant={card.visualVariant} />
          </article>
        ))}
      </div>
    </section>
  );
}
