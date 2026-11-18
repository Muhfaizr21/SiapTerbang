import type { Metadata } from "next";
import { AdminTuDashboardShell } from "@/components/tu/shell/AdminTuDashboardShell";

export const metadata: Metadata = {
  title: "Dashboard Admin Tata Usaha (TU) | SiapTerbang",
  description:
    "Ruang kerja Admin Tata Usaha LPK: PPDB, verifikasi 7 berkas legalitas, manajemen kamar dan disiplin asrama, generator surat dinas, serta kalkulator refund.",
};

export default function AdminTuDashboardPage() {
  return <AdminTuDashboardShell />;
}
