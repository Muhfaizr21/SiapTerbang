"use client";

import { useState } from "react";
import type {
  CrossRoleLockStep,
  IntelligenceDeepDiveBlock,
  RolePersonaItem,
} from "@/types/landing";

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

const ORB_GRADIENTS = [
  "radial-gradient(circle at 35% 30%, #e0d4ff 0%, #9b7bf7 45%, #3d2682 100%)",
  "radial-gradient(circle at 35% 30%, #fff0b3 0%, #f5b800 45%, #6e4f00 100%)",
  "radial-gradient(circle at 35% 30%, #c7dcff 0%, #415eee 45%, #192875 100%)",
  "radial-gradient(circle at 35% 30%, #c8facc 0%, #31ce01 45%, #125400 100%)",
  "radial-gradient(circle at 35% 30%, #ffd8cc 0%, #ff7e5f 45%, #7a2612 100%)",
  "radial-gradient(circle at 35% 30%, #ccf5f2 0%, #38b2ac 45%, #134e4a 100%)",
  "radial-gradient(circle at 35% 30%, #ffd6e8 0%, #ed64a6 45%, #63173b 100%)",
] as const;

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

  return (
    <section
      id="arsitektur-role"
      aria-labelledby="intelligence-heading"
      className="bevel-section-pad w-full bg-[#141518] text-[#ffffff]"
    >
      <div className="bevel-container">
        {/* Top .intelligence_bg: Sculpted 3D-style Role Orbs + Frosted Glass Pills (.rive + .rive_text) */}
        <div className="bevel-avatars-mask mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 py-4 sm:gap-8">
          {roles.map((role, idx) => {
            const isSelected = role.id === activeRole.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRoleId(role.id)}
                className="group flex flex-col items-center focus:outline-none"
              >
                <div
                  className={`relative flex h-24 w-24 items-center justify-center rounded-full transition-transform duration-300 sm:h-28 sm:w-28 ${
                    isSelected ? "scale-110 ring-2 ring-[#ffffff]" : "opacity-75 group-hover:scale-105 group-hover:opacity-100"
                  }`}
                  style={{
                    background: ORB_GRADIENTS[idx % ORB_GRADIENTS.length],
                    boxShadow: isSelected
                      ? "0 0 38px rgba(185, 166, 255, 0.45)"
                      : "0 10px 28px rgba(0, 0, 0, 0.45)",
                  }}
                >
                  <div className="flex items-center gap-2.5 rounded-full bg-[#141518]/35 px-3.5 py-2 backdrop-blur-xs">
                    <span className="h-2.5 w-1.5 rounded-full bg-[#ffffff]" />
                    <span className="h-2.5 w-1.5 rounded-full bg-[#ffffff]" />
                  </div>
                </div>

                <span
                  className={`-mt-3 relative z-10 inline-flex items-center justify-center rounded-[128px] px-6 py-2 text-[16px] font-medium backdrop-blur-md transition-colors ${
                    isSelected
                      ? "bg-[#ffffff] text-[#141518] font-semibold shadow-md"
                      : "bg-[#ffffff]/12 text-[#ffffff] shadow-[inset_0_1px_#ffffff,inset_0_0_4px_rgba(255,255,255,0.25)]"
                  }`}
                >
                  {role.shortLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Centered 2-Tone 64px Heading matching "Go deeper with / Bevel Intelligence" */}
        <div className="mx-auto mt-14 max-w-[740px] text-center">
          <h2 id="intelligence-heading" className="bevel-display">
            <span className="block text-[#747679]">Lebih terkendali dengan</span>
            <span className="mt-1 block text-[#ffffff]">SiapTerbang Intelligence</span>
          </h2>
          <p className="bevel-body mt-5 text-[#747679]">
            Otomasi lintas divisi, matriks Multi-Role RBAC, dan penjaga gerbang 24/7 untuk ketujuh role di dashboard web LPK Anda.
          </p>
        </div>

        {/* Selected Role Live Details Strip */}
        <div className="mx-auto mt-12 max-w-5xl rounded-[24px] bg-[#1f2025] p-7 ring-1 ring-[#ffffff]/10 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ffffff]/10 pb-5">
            <div>
              <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-[#b9a6ff]">
                {activeRole.workspaceScope}
              </span>
              <h3 className="mt-1 text-[26px] font-semibold text-[#ffffff]">
                {activeRole.fullTitle}: <span className="text-[#ebf0f8]/70 font-normal">{activeRole.fieldUser}</span>
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onOpenWorkspaceModal(activeRole.shortLabel)}
              className="rounded-[128px] bg-[#ebf0f8] px-5 py-2.5 text-[15px] font-semibold text-[#1f2025] hover:bg-[#ffffff]"
            >
              Simulasikan {activeRole.shortLabel}
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {activeRole.keyModules.map((mod) => (
              <div
                key={mod}
                className="flex items-center gap-3 rounded-[14px] bg-[#ffffff]/6 px-4 py-3 text-[15px] text-[#ebf0f8]"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#31ce01]" />
                <span>{mod}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-[14px] bg-[#141518] px-4 py-3 text-[14px] text-[#ffca00]">
            <strong>Logika Kunci Sistem:</strong> {activeRole.lockRule}
          </p>
        </div>

        {/* 4 Full-Width Stacked Horizontal Cards at 100% Bevel Scale (620px height, 64px 2-tone title, Web Desktop Window on right) */}
        <div className="mt-16 space-y-8">
          {deepDives.map((block, index) => {
            const cardGradient = CARD_GRADIENT_CLASSES[index % CARD_GRADIENT_CLASSES.length];
            return (
              <article
                key={block.id}
                className={`${cardGradient} grid grid-cols-1 items-center overflow-hidden text-[#222326] lg:h-[620px] lg:grid-cols-12`}
              >
                {/* Left Column (.col-lg-6): 64px 2-Tone Heading + 24px Supporting Copy */}
                <div className="p-10 sm:p-14 lg:col-span-6 lg:pl-20">
                  <h3 className="bevel-h2-h3">
                    <span className="block text-[#222326]">{block.titleLine1}</span>
                    <span className="block text-[#747679]">{block.titleLine2}</span>
                  </h3>
                  <p className="bevel-body mt-5 max-w-[500px]">
                    {block.description}
                  </p>
                </div>

                {/* Right Column (.col-lg-6): Web Desktop SaaS Browser Window + Overlapping Sheet/Modal (Replacing Mobile Phone) */}
                <div className="relative flex h-full min-h-[460px] items-end justify-center px-6 pt-12 lg:col-span-6">
                  {/* Web Desktop Window rising from bottom */}
                  <div className="relative z-10 w-full max-w-[540px] rounded-t-[24px] bg-[#1f2025] p-2.5 pb-0 shadow-[0_24px_60px_rgba(0,0,0,0.28)] ring-1 ring-[#ffffff]/30">
                    {/* Browser Chrome Header */}
                    <div className="flex items-center justify-between rounded-t-[16px] bg-[#141518] px-4 py-2.5 text-[#ebf0f8]">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                      </div>
                      <span className="rounded-md bg-[#1f2025] px-3 py-0.5 font-mono text-[11px] text-[#ebf0f8]/85">
                        https://lpknusantara.siapterbang.id
                      </span>
                      <span className="font-mono text-[10px] text-[#31ce01]">ONLINE</span>
                    </div>

                    {/* Desktop Screen Workspace */}
                    <div className="h-[460px] bg-[#f8f9fc] p-6 text-[#222326]">
                      <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#747679]">
                            {block.eyebrow}
                          </p>
                          <p className="text-[18px] font-bold text-[#222326]">
                            {block.primaryScreenTitle}
                          </p>
                        </div>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ebf0f8] text-[12px] font-bold text-[#222326]">
                          ✕
                        </span>
                      </div>

                      <div className="mt-4 space-y-2.5">
                        {block.primaryScreenMetrics.map((m) => (
                          <div
                            key={m.label}
                            className="flex items-center justify-between rounded-[16px] bg-[#ffffff] px-4 py-3 shadow-2xs ring-1 ring-[#222326]/5"
                          >
                            <div>
                              <p className="text-[11px] text-[#747679]">{m.label}</p>
                              <p className="text-[14px] font-bold text-[#222326]">{m.value}</p>
                            </div>
                            <span className="rounded-lg bg-[#ebf0f8] px-3 py-1 font-mono text-[11px] font-bold text-[#1e8300]">
                              {m.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Overlapping White Floating Drawer / Modal Sheet (matching Screenshot 2 "Sources" / "Start" card) */}
                  <div className="absolute bottom-6 z-20 w-[90%] max-w-[490px] rounded-[24px] bg-[#ffffff] p-5 text-[#222326] shadow-[0_18px_48px_rgba(0,0,0,0.22)] ring-1 ring-[#222326]/8">
                    <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-2.5">
                      <span className="text-[13px] font-bold text-[#222326]">
                        {block.eyebrow}
                      </span>
                      <span className="rounded-full bg-[#ebf0f8] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#415eee]">
                        Web Desktop Lock
                      </span>
                    </div>
                    <p className="mt-2.5 text-[14px] font-semibold text-[#222326]">
                      “{block.floatingPromptBubble}”
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-[#747679]">
                      {block.floatingActionReply}
                    </p>
                    <button
                      type="button"
                      onClick={() => onOpenWorkspaceModal(block.eyebrow)}
                      className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-[128px] bg-[#1f2025] py-2.5 text-[14px] font-semibold text-[#ffffff] hover:bg-[#000000]"
                    >
                      <span>▶</span>
                      <span>Jalankan Simulasi Modul</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* 5 Cross-Role Locks Strip */}
        <div id="alur-kunci" className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
