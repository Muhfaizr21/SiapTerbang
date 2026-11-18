import type { Metadata } from "next";
import Link from "next/link";
import { AuthOrbitalBackdrop } from "@/components/auth/AuthOrbitalBackdrop";
import { RegisterFormCard } from "@/components/auth/RegisterFormCard";

export const metadata: Metadata = {
  title: "Daftar Akun LPK - SiapTerbang",
  description:
    "Daftar dan aktifkan ruang kerja SaaS multi-tenant khusus LPK Anda. Coba gratis 14 hari tanpa kartu kredit.",
};

export default function RegisterPage() {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-x-hidden">
      {/* Background with sky gradient and concentric orbital arcs */}
      <AuthOrbitalBackdrop />

      {/* Top Navigation Bar: Brand Logo & Back to Home */}
      <header className="relative z-10 flex w-full items-center justify-between p-5 sm:p-7">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[18px] font-bold tracking-tight text-[#1f2025] transition-opacity hover:opacity-85"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#1f2025] text-[#ffffff] shadow-sm"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
          </span>
          <span>SiapTerbang</span>
        </Link>

        <Link
          href="/"
          className="rounded-full bg-[#ffffff]/70 px-4 py-2 text-[13.5px] font-semibold text-[#1f2025] ring-1 ring-[#ffffff]/80 backdrop-blur-md transition-all hover:bg-[#ffffff] hover:shadow-xs"
        >
          ← Beranda
        </Link>
      </header>

      {/* Central Register Card */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <RegisterFormCard />
      </main>

      {/* Footer Note */}
      <footer className="relative z-10 p-5 text-center text-[12px] font-medium text-[#747679]">
        <p>© 2026 SiapTerbang, Inc. Hak cipta dilindungi undang-undang.</p>
      </footer>
    </div>
  );
}
