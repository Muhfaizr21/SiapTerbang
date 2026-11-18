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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-6xl px-4 sm:px-6">
      <nav
        aria-label="Navigasi Utama SiapTerbang"
        className="flex items-center justify-between rounded-[32px] bg-[#ffffff]/90 px-4 py-2.5 backdrop-blur-md shadow-[0_4px_24px_-6px_rgba(31,32,37,0.12)] ring-1 ring-[#222326]/6"
      >
        <a
          href="#beranda"
          className="flex min-h-[44px] items-center gap-2.5 px-2 text-[18px] font-medium leading-[25.2px] tracking-[0.162px] text-[#222326]"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1f2025] text-[#ebf0f8]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
          </span>
          <span>SiapTerbang</span>
        </a>

        <div className="hidden lg:flex items-center gap-2">
          {links.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="flex min-h-[44px] items-center rounded-full px-3.5 text-[16px] font-medium leading-[22.4px] text-[#747679] transition-colors hover:bg-[#ebf0f8]/60 hover:text-[#222326]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenWorkspaceModal("TENANT_OWNER")}
            className="min-h-[44px] rounded-full px-4 text-[16px] font-medium leading-[22.4px] text-[#222326] transition-colors hover:bg-[#ebf0f8]"
          >
            Masuk Portal
          </button>
          <button
            type="button"
            onClick={() => onOpenWorkspaceModal("DEMO_TRIAL")}
            className="bevel-charcoal-pill flex min-h-[44px] items-center gap-2"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span>Coba Gratis LPK</span>
          </button>
        </div>

        <button
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex sm:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[#222326] hover:bg-[#ebf0f8]"
        >
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {mobileMenuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mt-2 rounded-[24px] bg-[#ffffff] p-4 shadow-[0_12px_32px_rgba(31,32,37,0.16)] ring-1 ring-[#222326]/8 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-3 text-[16px] font-medium text-[#222326] hover:bg-[#ebf0f8]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t border-[#ebf0f8] pt-3 sm:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWorkspaceModal("TENANT_OWNER");
              }}
              className="min-h-[44px] w-full rounded-[128px] bg-[#ebf0f8] px-4 text-[16px] font-medium text-[#222326]"
            >
              Masuk Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWorkspaceModal("DEMO_TRIAL");
              }}
              className="bevel-charcoal-pill min-h-[44px] w-full text-center"
            >
              Coba Gratis LPK
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
