import { Suspense } from "react";
import type { Metadata } from "next";
import { AdminTuDashboardShell } from "@/components/tu/shell/AdminTuDashboardShell";
import type { TuMenuTab } from "@/types/tu";

function resolveTab(tabParam?: string): TuMenuTab {
  if (!tabParam) return "overview";
  const clean = tabParam.toLowerCase();
  if (clean === "asrama" || clean === "data-induk" || clean === "datainduk") {
    return "asrama";
  }
  if (clean === "ppdb") {
    return "ppdb";
  }
  if (clean === "pemberkasan" || clean === "berkas" || clean === "dokumen") {
    return "pemberkasan";
  }
  if (clean === "surat") {
    return "surat";
  }
  if (clean === "offboarding" || clean === "disnaker") {
    return "offboarding";
  }
  return "overview";
}

interface PageProps {
  readonly params: Promise<{ tab: string }>;
}

export function generateStaticParams() {
  return [
    { tab: "overview" },
    { tab: "ppdb" },
    { tab: "asrama" },
    { tab: "data-induk" },
    { tab: "pemberkasan" },
    { tab: "surat" },
    { tab: "offboarding" },
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tab } = await params;
  const resolved = resolveTab(tab);
  const titles: Record<TuMenuTab, string> = {
    overview: "Dashboard Overview Admin TU | SiapTerbang",
    ppdb: "PPDB & Seleksi Fisik Siswa Baru | SiapTerbang",
    asrama: "Data Induk Siswa & Asrama | SiapTerbang",
    pemberkasan: "7 Berkas Legalitas & Expiry H-30 | SiapTerbang",
    surat: "Generator Surat Resmi Berkop LPK | SiapTerbang",
    offboarding: "Offboarding, Refund & Laporan Disnaker | SiapTerbang",
  };

  return {
    title: titles[resolved],
    description: "Ruang kerja Admin Tata Usaha (TU) LPK SiapTerbang.",
  };
}

async function TuTabContent({ params }: PageProps) {
  const { tab } = await params;
  const initialTab = resolveTab(tab);
  return <AdminTuDashboardShell initialTab={initialTab} />;
}

export default function AdminTuTabPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen w-full items-center justify-center bg-[#141518] text-[#ffe11d]">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ffe11d] border-t-transparent" />
            <span className="text-xs font-semibold tracking-wider text-[#e6e8ec] uppercase">
              Memuat Modul Admin TU...
            </span>
          </div>
        </div>
      }
    >
      <TuTabContent {...props} />
    </Suspense>
  );
}
