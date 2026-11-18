"use client";

import type { NavLinkItem } from "@/types/landing";

export interface FloatingCapsuleNavProps {
  readonly links: ReadonlyArray<NavLinkItem>;
  readonly onOpenWorkspaceModal: (initialRole?: string) => void;
}

export function FloatingCapsuleNav({
  onOpenWorkspaceModal,
}: FloatingCapsuleNavProps) {
  return (
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center px-4 py-4">
      <nav
        aria-label="Navigasi Utama SiapTerbang"
        className="pointer-events-auto flex items-center gap-6 rounded-[32px] bg-[#ffffff]/75 p-2 pl-4 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-[#222326]/6 sm:gap-10"
      >
        <a
          href="#beranda"
          className="flex items-center gap-2.5 text-[18px] font-medium leading-[25.2px] tracking-[0.162px] text-[#222326]"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#1f2025] text-[#ffffff]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 17h14M5 12h10M13 7l6 5-6 5" />
            </svg>
          </span>
          <span>SiapTerbang</span>
        </a>

        <div className="flex items-center gap-5 sm:gap-8">
          <a
            href="#fitur-utama"
            className="text-[16px] font-medium leading-[22.4px] text-[#747679] transition-colors hover:text-[#222326]"
          >
            Tentang
          </a>
          <button
            type="button"
            onClick={() => onOpenWorkspaceModal("TENANT_OWNER")}
            className="text-[16px] font-medium leading-[22.4px] text-[#747679] transition-colors hover:text-[#222326]"
          >
            Masuk
          </button>
        </div>

        <button
          type="button"
          onClick={() => onOpenWorkspaceModal("DEMO_TRIAL")}
          className="rounded-[128px] bg-[#1f2025] px-4 py-2 text-[16px] font-medium leading-[22.4px] text-[#ebf0f8] transition-colors hover:bg-[#000000]"
        >
          Mulai Aplikasi
        </button>
      </nav>
    </header>
  );
}
