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

export function BevelIntelligenceDarkSection({
  roles,
  deepDives,
  lockSteps,
  onOpenWorkspaceModal,
}: BevelIntelligenceDarkSectionProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(roles[1]?.id ?? "role-tenant-owner");
  const activeRole = roles.find((r) => r.id === selectedRoleId) ?? roles[0];

  return (
    <section
      id="arsitektur-role"
      aria-labelledby="intelligence-heading"
      className="mx-auto mt-[80px] w-full max-w-[1400px] px-3 sm:px-6"
    >
      <div className="overflow-hidden rounded-[32px] bg-[#1f2025] px-4 py-16 text-[#ffffff] sm:px-8 md:px-14 md:py-24">
        {/* Top Role Persona Switcher (Bevel's Commander / Friend / Guardian / Data Nerd -> 7 Role Terintegrasi) */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-widest text-[#b9a6ff]">
            Arsitektur Multi-Tenant & Permission-Based RBAC
          </p>
          <h2
            id="intelligence-heading"
            className="mt-3 text-[36px] leading-[1.02] font-semibold tracking-[-0.03em] text-[#ffffff] sm:text-[52px] md:text-[64px]"
          >
            Lebih terkendali dengan Hierarki 7 Role & Kunci Lintas Divisi
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[18px] leading-[1.35] text-[#ebf0f8]/75 sm:text-[22px]">
            Satu akun staf di daerah dapat merangkap beberapa role sekaligus, sementara keputusan sensitif tetap terkunci di bawah kendali Direktur LPK.
          </p>
        </div>

        {/* Interactive 7-Role Persona Pill Selector */}
        <div
          role="tablist"
          aria-label="Pilih Role Pengguna SiapTerbang"
          className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-2.5"
        >
          {roles.map((role) => {
            const isSelected = role.id === activeRole.id;
            const tokens = getAccentTokens(role.accent);
            return (
              <button
                key={role.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedRoleId(role.id)}
                className={`min-h-[44px] rounded-[128px] px-4 py-2 text-[14px] font-medium transition-all sm:text-[15px] ${
                  isSelected
                    ? "bg-[#ebf0f8] text-[#1f2025] shadow-sm"
                    : "bg-[#ffffff]/8 text-[#ebf0f8]/80 hover:bg-[#ffffff]/14 hover:text-[#ffffff]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${tokens.bgClass}`}
                    aria-hidden="true"
                  />
                  <span>{role.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Role Interactive Showcase Panel */}
        <div
          role="tabpanel"
          className="mx-auto mt-8 max-w-5xl rounded-[24px] bg-[#ffffff]/6 p-6 ring-1 ring-[#ffffff]/12 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#ffffff]/10 px-3 py-1 text-[12px] font-medium text-[#ebf0f8]">
                  <span>Level {activeRole.roleNumber === 1 ? "1 (Global SaaS)" : "2 (Tenant LPK)"}</span>
                  <span>•</span>
                  <span>{activeRole.workspaceScope}</span>
                </div>
                <h3 className="mt-4 text-[28px] font-semibold leading-tight tracking-tight text-[#ffffff] sm:text-[32px]">
                  {activeRole.fullTitle}
                </h3>
                <p className="mt-2 text-[15px] text-[#ebf0f8]/75">
                  Pengguna di Lapangan: <strong className="text-[#ffffff]">{activeRole.fieldUser}</strong>
                </p>

                <div className="mt-5 rounded-[18px] bg-[#1f2025]/80 p-4 ring-1 ring-[#ffffff]/10">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#ffca00]">
                    Aturan Kunci Sistem (System Lock)
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#ebf0f8]/90">
                    {activeRole.lockRule}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#ffffff]/10 pt-4">
                <div>
                  <p className="text-[12px] text-[#ebf0f8]/65">{activeRole.liveMetricLabel}</p>
                  <p className="text-[16px] font-semibold text-[#31ce01]">
                    {activeRole.liveMetricValue}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenWorkspaceModal(activeRole.shortLabel)}
                  className="rounded-[128px] bg-[#ebf0f8] px-4 py-2 text-[13px] font-semibold text-[#1f2025] transition-colors hover:bg-[#ffffff]"
                >
                  Simulasikan Role Ini
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[20px] bg-[#18191d] p-5 ring-1 ring-[#ffffff]/10">
                <div className="flex items-center justify-between border-b border-[#ffffff]/10 pb-3">
                  <span className="text-[13px] font-semibold text-[#ebf0f8]">
                    Modul & Sub-Fitur Spesifik ({activeRole.shortLabel})
                  </span>
                  <span className="rounded-md bg-[#31ce01]/20 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#31ce01]">
                    100% Terimplementasi
                  </span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {activeRole.keyModules.map((mod, idx) => (
                    <li
                      key={mod}
                      className="flex items-start gap-3 rounded-[14px] bg-[#ffffff]/5 px-3.5 py-2.5 text-[14px] text-[#ebf0f8]"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#415eee]/30 font-mono text-[11px] font-semibold text-[#b9a6ff]">
                        {idx + 1}
                      </span>
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Deep-Dive Blocks matching Bevel Intelligence 2x2 / 4-card layout with Phone Frame + Floating Cards */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
          {deepDives.map((block) => {
            const tokens = getAccentTokens(block.accent);
            return (
              <article
                key={block.id}
                className="flex flex-col justify-between rounded-[28px] bg-[#282a30] p-6 ring-1 ring-[#ffffff]/10 sm:p-8"
              >
                <div>
                  <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-[#b9a6ff]">
                    {block.eyebrow}
                  </span>
                  <h3 className="mt-2 text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#ffffff] sm:text-[38px]">
                    {block.titleLine1}{" "}
                    <span className="text-[#ebf0f8]/70">{block.titleLine2}</span>
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-[#ebf0f8]/75 sm:text-[18px]">
                    {block.description}
                  </p>
                </div>

                {/* Framed Device Mockup + Floating Intelligence Bubble */}
                <div className="mt-7 space-y-3 rounded-[22px] bg-[#1b1c20] p-4 ring-1 ring-[#ffffff]/8">
                  <div className="flex items-center justify-between border-b border-[#ffffff]/10 pb-2.5">
                    <span className="text-[12px] font-semibold text-[#ebf0f8]">
                      {block.primaryScreenTitle}
                    </span>
                    <span className={`h-2.5 w-2.5 rounded-full ${tokens.bgClass}`} />
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {block.primaryScreenMetrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-[12px] bg-[#ffffff]/6 p-2.5"
                      >
                        <p className="text-[11px] text-[#ebf0f8]/65">{m.label}</p>
                        <p className="mt-0.5 text-[13px] font-semibold text-[#ffffff]">
                          {m.value}
                        </p>
                        <span className="mt-1 inline-block font-mono text-[10px] font-semibold text-[#31ce01]">
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Floating Intelligence Callout Card (matching Bevel's intelligence_floating) */}
                  <div className="rounded-[16px] bg-[#ebf0f8] p-3.5 text-[#1f2025] shadow-md">
                    <p className="text-[12px] font-semibold text-[#222326]">
                      “{block.floatingPromptBubble}”
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-[#747679]">
                      {block.floatingActionReply}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bab 4: 5 Tahap Alur Kerja Lintas Divisi (Cross-Role Locks Matrix) */}
        <div id="alur-kunci" className="mx-auto mt-16 max-w-6xl border-t border-[#ffffff]/12 pt-14">
          <div className="text-center">
            <span className="font-mono text-[12px] font-semibold uppercase tracking-widest text-[#ffca00]">
              Integritas Operasional Lintas Divisi
            </span>
            <h3 className="mt-2 text-[28px] font-semibold tracking-tight text-[#ffffff] sm:text-[36px]">
              5 Titik Penguncian Otomatis (Cross-Role Locks)
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-[16px] text-[#ebf0f8]/70">
              Memastikan tidak ada tahapan administrasi, akademik, maupun pelunasan biaya yang terlewat atau dilompati secara tidak sah.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-5">
            {lockSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="flex flex-col justify-between rounded-[20px] bg-[#ffffff]/6 p-4 ring-1 ring-[#ffffff]/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ebf0f8] font-mono text-[12px] font-bold text-[#1f2025]">
                      0{step.stepNumber}
                    </span>
                    <span className="rounded-md bg-[#415eee]/30 px-2 py-0.5 font-mono text-[9px] font-semibold text-[#b9a6ff]">
                      {step.lockBadge}
                    </span>
                  </div>
                  <h4 className="mt-3 text-[16px] font-semibold text-[#ffffff]">
                    {step.stageName}
                  </h4>
                  <p className="mt-1 text-[12px] font-medium text-[#ffca00]">
                    Pemicu: {step.triggerActor}
                  </p>
                  <p className="mt-1 text-[12px] text-[#ebf0f8]/75">
                    {step.triggerAction}
                  </p>
                </div>

                <ul className="mt-4 space-y-1.5 border-t border-[#ffffff]/10 pt-3 text-[11px] text-[#ebf0f8]/85">
                  {step.systemImpact.map((impact) => (
                    <li key={impact} className="flex items-start gap-1.5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#31ce01]" />
                      <span>{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
