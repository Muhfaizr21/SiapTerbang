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

export default async function AdminTuTabPage({ params }: PageProps) {
  const { tab } = await params;
  const initialTab = resolveTab(tab);
  return <AdminTuDashboardShell initialTab={initialTab} />;
}
