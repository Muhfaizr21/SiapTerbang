"use client";

import { useState } from "react";
import type { NavLinkItem } from "@/types/landing";

export interface FloatingCapsuleNavProps {
  readonly links: ReadonlyArray<NavLinkItem>;
  readonly onOpenWorkspaceModal: (initialRole?: string) => void;
}

export function FloatingCapsuleNav({
  links,
  onOpenWorkspaceModal,
}: FloatingCapsuleNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex flex-col items-center px-3 py-3.5 sm:px-4 sm:py-4">
      <nav
        aria-label="Navigasi Utama SiapTerbang"
        className="pointer-events-auto flex max-w-full items-center gap-3 rounded-[32px] bg-[#ffffff]/85 p-1.5 pl-3.5 backdrop-blur-md shadow-[0_6px_24px_rgba(31,32,37,0.08)] ring-1 ring-[#222326]/8 sm:gap-5 sm:p-2 sm:pl-4 lg:gap-7"
      >
        <a
          href="#beranda"
          className="flex shrink-0 items-center gap-2 text-[16px] font-semibold leading-[24px] tracking-[-0.01em] text-[#222326] sm:text-[18px]"
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
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
          </span>
          <span>SiapTerbang</span>
        </a>

        {/* Desktop Marketing Navigation Links */}
        <div className="hidden items-center gap-5 lg:flex">
          {links.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-[15px] font-medium text-[#747679] transition-colors hover:text-[#222326]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onOpenWorkspaceModal("Direktur LPK")}
            className="shrink-0 rounded-[128px] bg-[#1f2025] px-4 py-2 text-[13.5px] font-semibold leading-tight text-[#ebf0f8] transition-colors hover:bg-[#000000] sm:px-5 sm:text-[15px]"
          >
            Masuk Portal
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ebf0f8] text-[#222326] lg:hidden"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Capsule Drawer */}
      {mobileOpen && (
        <div className="pointer-events-auto mt-2 w-full max-w-sm rounded-[24px] bg-[#ffffff]/95 p-4 backdrop-blur-md shadow-[0_16px_40px_rgba(31,32,37,0.16)] ring-1 ring-[#222326]/10 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center justify-between rounded-xl px-3.5 text-[15px] font-semibold text-[#222326] hover:bg-[#ebf0f8]"
              >
                <span>{item.label}</span>
                <span className="text-[#747679]">→</span>
              </a>
            ))}
          </div>
          <div className="mt-3 border-t border-[#ebf0f8] pt-3 sm:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenWorkspaceModal("Direktur LPK");
              }}
              className="min-h-[44px] w-full rounded-[128px] bg-[#ebf0f8] text-[14.5px] font-semibold text-[#222326]"
            >
              Masuk Portal LPK
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
