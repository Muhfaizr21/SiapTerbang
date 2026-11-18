"use client";

import { useState } from "react";
import type {
  CrossRoleLockStep,
  IntelligenceDeepDiveBlock,
  RolePersonaItem,
} from "@/types/landing";
import { getAccentTokens } from "@/utils/accent-tokens";

export interface BevelIntelligenceDarkSectionProps {
  readonly roles: ReadonlyArray<RolePersonaItem>;
  readonly deepDives: ReadonlyArray<IntelligenceDeepDiveBlock>;
  readonly lockSteps: ReadonlyArray<CrossRoleLockStep>;
  readonly onOpenWorkspaceModal: (initialRole?: string) => void;
}

const CARD_GRADIENT_CLASSES = [
  "bevel-intel-lilac",
  "bevel-intel-red",
  "bevel-intel-pink",
  "bevel-intel-teal",
] as const;

function RoleEmblemIcon({ roleNumber }: { readonly roleNumber: number }) {
  switch (roleNumber) {
    case 1:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    case 2:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 3:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case 4:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case 5:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      );
    case 6:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
  }
}

export function BevelIntelligenceDarkSection({
  roles,
  deepDives,
  lockSteps,
  onOpenWorkspaceModal,
}: BevelIntelligenceDarkSectionProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(
    roles[1]?.id ?? "role-tenant-owner"
  );
  const activeRole = roles.find((r) => r.id === selectedRoleId) ?? roles[0];
  const activeRoleTokens = getAccentTokens(activeRole.accent);

  return (
    <section
      id="arsitektur-role"
      aria-labelledby="intelligence-heading"
      className="bevel-section-pad w-full bg-[#141518] text-[#ffffff]"
    >
      <div className="bevel-container">
        {/* Centered 2-Tone 64px Heading matching "Go deeper with / Bevel Intelligence" */}
        <div className="mx-auto max-w-[760px] text-center">
          <h2 id="intelligence-heading" className="bevel-display">
            <span className="block text-[#747679]">Lebih terkendali dengan</span>
            <span className="mt-1 block text-[#ffffff]">SiapTerbang Intelligence</span>
          </h2>
          <p className="bevel-body mt-5 text-[#747679]">
            Otomasi lintas divisi, matriks Multi-Role RBAC, dan penjaga gerbang 24/7 untuk ketujuh role di dashboard web LPK Anda.
          </p>
        </div>

        {/* Clean, Un-clipped 7-Role Interactive Selector Dock (Responsive on Mobile & Desktop) */}
        <div
          role="tablist"
          aria-label="Pilih Role Pengguna SiapTerbang"
          className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"
        >
          {roles.map((role) => {
            const isSelected = role.id === activeRole.id;
            const roleTokens = getAccentTokens(role.accent);
            return (
              <button
                key={role.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedRoleId(role.id)}
                className={`group flex flex-col items-center justify-between rounded-[22px] p-4 text-center transition-all duration-200 focus:outline-none ${
                  isSelected
                    ? "bg-[#ffffff] text-[#141518] shadow-[0_12px_32px_rgba(255,255,255,0.14)] ring-2 ring-[#ffffff]"
                    : "bg-[#1f2025] text-[#ebf0f8] ring-1 ring-[#ffffff]/10 hover:bg-[#272930]"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-105 ${
                    isSelected
                      ? "bg-[#141518] text-[#ffffff]"
                      : "bg-[#141518]/80 text-[#ebf0f8]"
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 0 20px ${roleTokens.hex}55` : undefined,
                  }}
                >
                  <RoleEmblemIcon roleNumber={role.roleNumber} />
                </div>

                <div className="mt-3">
                  <span
                    className={`block font-mono text-[10px] font-bold uppercase tracking-wider ${
                      isSelected ? "text-[#415eee]" : "text-[#747679]"
                    }`}
                  >
                    Role 0{role.roleNumber}
                  </span>
                  <span className="mt-0.5 block text-[14px] font-semibold leading-snug">
                    {role.shortLabel.replace(/^[0-9]+\.\s*/, "")}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* High-Craft Web Desktop Role Workspace Preview (Replacing the plain grey box) */}
        <div
          role="tabpanel"
          className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-[28px] bg-[#1f2025] p-2.5 shadow-[0_28px_70px_rgba(0,0,0,0.45)] ring-1 ring-[#ffffff]/15"
        >
          {/* Browser Chrome Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-[20px] bg-[#141518] px-4 py-3 text-[#ebf0f8]">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-2 hidden font-mono text-[11px] text-[#747679] sm:inline">
                Workspace Role 0{activeRole.roleNumber}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-[#1f2025] px-3.5 py-1 font-mono text-[11.5px] text-[#ebf0f8] ring-1 ring-[#ffffff]/10">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: activeRoleTokens.hex }}
              />
              <span className="truncate">
                https://lpknusantara.siapterbang.id/role-0{activeRole.roleNumber}
              </span>
            </div>
            <span className="rounded-full bg-[#31ce01]/20 px-3 py-0.5 font-mono text-[10.5px] font-bold text-[#31ce01]">
              {activeRole.liveMetricValue}
            </span>
          </div>

          {/* Inner Role Command Center Grid */}
          <div className="grid grid-cols-1 gap-6 rounded-b-[20px] bg-[#191a1f] p-6 sm:p-8 lg:grid-cols-12">
            {/* Left Column: Role Identity, User Profile & System Lock Rule */}
            <div className="flex flex-col justify-between rounded-[22px] bg-[#141518] p-6 ring-1 ring-[#ffffff]/8 lg:col-span-5">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-[#ffffff]/10 px-3 py-1 font-mono text-[11px] font-semibold text-[#b9a6ff]">
                    {activeRole.roleNumber === 1 ? "Level 1 • Global SaaS" : "Level 2 • Tenant LPK"}
                  </span>
                  <span className="text-[12px] font-medium text-[#747679]">
                    {activeRole.liveMetricLabel}
                  </span>
                </div>

                <h3 className="mt-4 text-[26px] font-bold leading-tight tracking-tight text-[#ffffff] sm:text-[30px]">
                  {activeRole.fullTitle}
                </h3>
                <p className="mt-2 text-[14.5px] text-[#ebf0f8]/75">
                  Pengguna di Lapangan:{" "}
                  <strong className="text-[#ffffff]">{activeRole.fieldUser}</strong>
                </p>
                <p className="mt-1 text-[13px] text-[#747679]">
                  Cakupan Akses: {activeRole.workspaceScope}
                </p>

                {/* System Lock Box */}
                <div className="mt-6 rounded-[18px] bg-[#1f2025] p-4 ring-1 ring-[#ffca00]/30">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#ffca00]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Aturan Penguncian Sistem (Cross-Role Lock)</span>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#ebf0f8]/90">
                    {activeRole.lockRule}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenWorkspaceModal(activeRole.shortLabel)}
                className="mt-6 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[128px] bg-[#ebf0f8] px-5 py-2.5 text-[14.5px] font-bold text-[#141518] transition-colors hover:bg-[#ffffff]"
              >
                <span>Buka Simulasi Dashboard {activeRole.shortLabel}</span>
                <span>→</span>
              </button>
            </div>

            {/* Right Column: Structured Module & Sub-Feature Table */}
            <div className="flex flex-col justify-between rounded-[22px] bg-[#ffffff] p-6 text-[#222326] lg:col-span-7">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ebf0f8] pb-3.5">
                  <div>
                    <p className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#415eee]">
                      MODUL SIDEBAR & KEWENANGAN UTAMA
                    </p>
                    <h4 className="text-[19px] font-bold text-[#222326]">
                      Daftar Fungsionalitas {activeRole.shortLabel}
                    </h4>
                  </div>
                  <span className="rounded-lg bg-[#ebf0f8] px-3 py-1 font-mono text-[11px] font-bold text-[#222326]">
                    {activeRole.keyModules.length} Modul Inti
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  {activeRole.keyModules.map((mod, idx) => (
                    <div
                      key={mod}
                      className="flex items-center justify-between gap-3 rounded-[14px] bg-[#f8f9fc] px-4 py-3 ring-1 ring-[#222326]/6"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#1f2025] font-mono text-[11px] font-bold text-[#ffffff]">
                          0{idx + 1}
                        </span>
                        <span className="text-[14px] font-semibold text-[#222326]">
                          {mod}
                        </span>
                      </div>
                      <span className="hidden shrink-0 rounded-md bg-[#31ce01]/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#1e8300] sm:inline-block">
                        AKTIF
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#ebf0f8] pt-3.5 text-[12px] text-[#747679]">
                <span>Mendukung penggabungan Multi-Role per Akun Staf</span>
                <span className="font-semibold text-[#222326]">Permission-Based RBAC ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Full-Width Stacked Horizontal Cards at 100% Bevel Scale (Web Desktop Window on right) */}
        <div className="mt-16 space-y-8">
          {deepDives.map((block, index) => {
            const cardGradient = CARD_GRADIENT_CLASSES[index % CARD_GRADIENT_CLASSES.length];
            return (
              <article
                key={block.id}
                className={`${cardGradient} grid grid-cols-1 items-center overflow-hidden text-[#222326] lg:min-h-[600px] lg:grid-cols-12`}
              >
                {/* Left Column (.col-lg-6): 64px 2-Tone Heading + 24px Supporting Copy */}
                <div className="p-8 sm:p-12 lg:col-span-6 lg:pl-16">
                  <h3 className="bevel-h2-h3">
                    <span className="block text-[#222326]">{block.titleLine1}</span>
                    <span className="block text-[#747679]">{block.titleLine2}</span>
                  </h3>
                  <p className="bevel-body mt-5 max-w-[500px]">
                    {block.description}
                  </p>
                </div>

                {/* Right Column (.col-lg-6): Clean Web Desktop Window + Action Drawer */}
                <div className="flex flex-col items-center justify-end px-5 pt-2 pb-8 sm:px-10 lg:col-span-6 lg:h-full lg:pt-10 lg:pb-0">
                  <div className="w-full max-w-[540px] overflow-hidden rounded-[22px] bg-[#1f2025] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.25)] ring-1 ring-[#ffffff]/30 lg:rounded-b-none lg:pb-0">
                    {/* Browser Chrome Header */}
                    <div className="flex items-center justify-between rounded-t-[14px] bg-[#141518] px-4 py-2.5 text-[#ebf0f8]">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <span className="truncate rounded-md bg-[#1f2025] px-3 py-0.5 font-mono text-[10.5px] text-[#ebf0f8]/85">
                        https://lpknusantara.siapterbang.id
                      </span>
                      <span className="font-mono text-[10px] text-[#31ce01]">ONLINE</span>
                    </div>

                    {/* Desktop Screen Workspace */}
                    <div className="bg-[#f8f9fc] p-5 text-[#222326] sm:p-6">
                      <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-3">
                        <div>
                          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[#415eee]">
                            {block.eyebrow}
                          </p>
                          <p className="text-[17px] font-bold text-[#222326]">
                            {block.primaryScreenTitle}
                          </p>
                        </div>
                        <span className="rounded-full bg-[#31ce01]/15 px-2.5 py-1 font-mono text-[10px] font-bold text-[#1e8300]">
                          TERVERIFIKASI
                        </span>
                      </div>

                      <div className="mt-3.5 space-y-2">
                        {block.primaryScreenMetrics.map((m) => (
                          <div
                            key={m.label}
                            className="flex items-center justify-between rounded-[14px] bg-[#ffffff] px-3.5 py-2.5 shadow-2xs ring-1 ring-[#222326]/5"
                          >
                            <div>
                              <p className="text-[10.5px] text-[#747679]">{m.label}</p>
                              <p className="text-[13.5px] font-bold text-[#222326]">{m.value}</p>
                            </div>
                            <span className="rounded-md bg-[#ebf0f8] px-2.5 py-1 font-mono text-[10px] font-bold text-[#1e8300]">
                              {m.status}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Integrated Action Sheet inside Desktop Window */}
                      <div className="mt-4 rounded-[18px] bg-[#ffffff] p-4 shadow-md ring-1 ring-[#222326]/8">
                        <p className="text-[13px] font-bold text-[#222326]">
                          “{block.floatingPromptBubble}”
                        </p>
                        <p className="mt-1 text-[12px] leading-snug text-[#747679]">
                          {block.floatingActionReply}
                        </p>
                        <button
                          type="button"
                          onClick={() => onOpenWorkspaceModal(block.eyebrow)}
                          className="mt-3 flex min-h-[42px] w-full items-center justify-center gap-2 rounded-[128px] bg-[#1f2025] py-2 text-[13.5px] font-semibold text-[#ffffff] hover:bg-[#000000]"
                        >
                          <span>▶</span>
                          <span>Simulasikan Modul Ini</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* 5 Cross-Role Locks Strip */}
        <div id="alur-kunci" className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {lockSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="rounded-[20px] bg-[#1f2025] p-5 ring-1 ring-[#ffffff]/10"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] font-bold text-[#ffca00]">
                  TAHAP 0{step.stepNumber}
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#31ce01]" />
              </div>
              <p className="mt-2 text-[17px] font-semibold text-[#ffffff]">
                {step.stageName}
              </p>
              <p className="mt-1.5 text-[13px] text-[#ebf0f8]/70">
                {step.triggerAction}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
