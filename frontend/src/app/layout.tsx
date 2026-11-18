import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SiapTerbang: Platform SaaS Manajemen Operasional LPK & Penempatan Luar Negeri",
  description:
    "Platform SaaS Multi-Tenant dengan 7 Role terintegrasi untuk manajemen LPK Magang Jepang, Tokutei Ginou (SSW), G-to-G Korea, asrama, auto-Rirekisho, dan dana talangan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#ffffff] text-[#222326]">
        {children}
      </body>
    </html>
  );
}
