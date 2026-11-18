import type { DemoAccountOption } from "@/types/auth";

export const SIX_LPK_DEMO_ACCOUNTS: ReadonlyArray<DemoAccountOption> = [
  {
    id: "direktur",
    roleName: "1. Direktur LPK",
    email: "direktur@lpknusantara.id",
    defaultPass: "Direktur2026!",
    description: "Approval refund & monitoring eksekutif",
    badgeColor: "bg-[#e8b931]/20 text-[#8a6a00]",
  },
  {
    id: "admin-tu",
    roleName: "2. Admin TU",
    email: "tu@lpknusantara.id",
    defaultPass: "AdminTU2026!",
    description: "Pemberkasan H-30 & disiplin asrama",
    badgeColor: "bg-[#415eee]/15 text-[#2945d6]",
  },
  {
    id: "sensei",
    roleName: "3. Sensei",
    email: "sensei@lpknusantara.id",
    defaultPass: "Sensei2026!",
    description: "Evaluasi bahasa N4 & rekomendasi mensetsu",
    badgeColor: "bg-[#31ce01]/15 text-[#1e8300]",
  },
  {
    id: "penempatan",
    roleName: "4. Staf Penempatan",
    email: "penempatan@lpknusantara.id",
    defaultPass: "Matching2026!",
    description: "Job order SO & Auto-Rirekisho JIS",
    badgeColor: "bg-[#ffab94]/25 text-[#a93f22]",
  },
  {
    id: "keuangan",
    roleName: "5. Admin Keuangan",
    email: "keuangan@lpknusantara.id",
    defaultPass: "Keuangan2026!",
    description: "Kuitansi QR, SPP & dana talangan",
    badgeColor: "bg-[#b9a6ff]/20 text-[#583ec2]",
  },
  {
    id: "siswa",
    roleName: "6. Portal Siswa",
    email: "siswa@lpknusantara.id",
    defaultPass: "Siswa2026!",
    description: "Portal mandiri calon tenaga kerja luar negeri",
    badgeColor: "bg-[#ebf0f8] text-[#222326]",
  },
] as const;
