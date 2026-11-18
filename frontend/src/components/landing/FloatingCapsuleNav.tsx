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
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center px-3 py-3.5 sm:px-4 sm:py-4">
      <nav
        aria-label="Navigasi Utama SiapTerbang"
        className="pointer-events-auto flex max-w-full items-center gap-3.5 rounded-[32px] bg-[#ffffff]/80 p-1.5 pl-3.5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.07)] ring-1 ring-[#222326]/6 sm:gap-8 sm:p-2 sm:pl-4"
      >
        <a
          href="#beranda"
          className="flex shrink-0 items-center gap-2 text-[16px] font-semibold leading-[24px] tracking-[0.1px] text-[#222326] sm:text-[18px] sm:font-medium"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#1f2025] text-[#ffffff]"
          >
            <svg
              width="15"
              height="15"
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

        <div className="flex items-center gap-3.5 sm:gap-7">
          <a
            href="#fitur-utama"
            className="text-[14px] font-medium text-[#747679] transition-colors hover:text-[#222326] sm:text-[16px]"
          >
            Tentang
          </a>
          <button
            type="button"
            onClick={() => onOpenWorkspaceModal("TENANT_OWNER")}
            className="text-[14px] font-medium text-[#747679] transition-colors hover:text-[#222326] sm:text-[16px]"
          >
            Masuk
          </button>
        </div>

        <button
          type="button"
          onClick={() => onOpenWorkspaceModal("DEMO_TRIAL")}
          className="shrink-0 rounded-[128px] bg-[#1f2025] px-3.5 py-2 text-[13.5px] font-medium leading-tight text-[#ebf0f8] transition-colors hover:bg-[#000000] sm:px-4 sm:text-[16px]"
        >
          Mulai Aplikasi
        </button>
      </nav>
    </header>
  );
}
