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
      className="mt-24 w-full bg-[#141518] py-24 text-[#ffffff]"
    >
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6">
        {/* Top .intelligence_bg: Sculpted 3D-style Role Orbs + Frosted Glass Pills (.rive + .rive_text) */}
        <div className="bevel-avatars-mask mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-5 py-4 sm:gap-7">
          {roles.map((role, idx) => {
            const isSelected = role.id === activeRole.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRoleId(role.id)}
                className="group flex flex-col items-center focus:outline-none"
              >
                {/* Sculpted Glowing Orb (.rive equivalent) */}
                <div
                  className={`relative flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-300 sm:h-24 sm:w-24 ${
                    isSelected ? "scale-110 ring-2 ring-[#ffffff]" : "opacity-75 group-hover:scale-105 group-hover:opacity-100"
                  }`}
                  style={{
                    background: ORB_GRADIENTS[idx % ORB_GRADIENTS.length],
                    boxShadow: isSelected
                      ? "0 0 35px rgba(185, 166, 255, 0.45)"
                      : "0 8px 24px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {/* Eyes / visor mark inside orb like Bevel's Rive characters */}
                  <div className="flex items-center gap-2 rounded-full bg-[#141518]/35 px-3 py-1.5 backdrop-blur-xs">
                    <span className="h-2 w-1.5 rounded-full bg-[#ffffff]" />
                    <span className="h-2 w-1.5 rounded-full bg-[#ffffff]" />
                  </div>
                </div>

                {/* Frosted Glass Pill (.rive_text exact CSS from bevel.health) */}
                <span
                  className={`-mt-3 relative z-10 inline-flex items-center justify-center rounded-[128px] px-5 py-1.5 text-[14px] font-medium backdrop-blur-md transition-colors ${
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

        {/* Centered 2-Tone Heading matching "Go deeper with / Bevel Intelligence" */}
        <div className="mx-auto mt-12 max-w-[680px] text-center">
          <h2
            id="intelligence-heading"
            className="text-[40px] font-semibold leading-[1] tracking-[-0.03em] sm:text-[56px] md:text-[64px]"
          >
            <span className="block text-[#747679]">Lebih terkendali dengan</span>
            <span className="mt-1 block text-[#ffffff]">SiapTerbang Intelligence</span>
          </h2>
          <p className="mt-5 text-[19px] leading-[1.35] text-[#747679] sm:text-[22px]">
            Otomasi lintas divisi, matriks Multi-Role RBAC, dan penjaga gerbang 24/7 untuk ketujuh role di LPK Anda.
          </p>
        </div>

        {/* Selected Role Live Details Strip */}
        <div className="mx-auto mt-10 max-w-4xl rounded-[24px] bg-[#1f2025] p-6 ring-1 ring-[#ffffff]/10 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ffffff]/10 pb-4">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#b9a6ff]">
                {activeRole.workspaceScope}
              </span>
              <h3 className="text-[22px] font-semibold text-[#ffffff]">
                {activeRole.fullTitle}: <span className="text-[#ebf0f8]/70 font-normal">{activeRole.fieldUser}</span>
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onOpenWorkspaceModal(activeRole.shortLabel)}
              className="rounded-[128px] bg-[#ebf0f8] px-4 py-2 text-[13px] font-semibold text-[#1f2025] hover:bg-[#ffffff]"
            >
              Buka Demo {activeRole.shortLabel}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {activeRole.keyModules.map((mod) => (
              <div
                key={mod}
                className="flex items-center gap-2.5 rounded-[14px] bg-[#ffffff]/5 px-3.5 py-2.5 text-[13.5px] text-[#ebf0f8]"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#31ce01]" />
                <span>{mod}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-[14px] bg-[#141518] px-4 py-2.5 text-[13px] text-[#ffca00]">
            <strong>Logika Kunci Sistem:</strong> {activeRole.lockRule}
          </p>
        </div>

        {/* 4 Full-Width Stacked Horizontal Cards (.intelligence_card.cc-lilac, .cc-red, .cc-pink, .cc-teal) */}
        <div className="mt-14 space-y-6">
          {deepDives.map((block, index) => {
            const cardGradient = CARD_GRADIENT_CLASSES[index % CARD_GRADIENT_CLASSES.length];
            return (
              <article
                key={block.id}
                className={`${cardGradient} grid grid-cols-1 items-center overflow-hidden text-[#222326] lg:min-h-[470px] lg:grid-cols-12`}
              >
                {/* Left Column: 2-Tone Heading + Supporting Copy */}
                <div className="p-8 sm:p-12 lg:col-span-6 lg:pl-16">
                  <h3 className="text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[46px]">
                    <span className="block text-[#222326]">{block.titleLine1}</span>
                    <span className="block text-[#747679]">{block.titleLine2}</span>
                  </h3>
                  <p className="mt-4 max-w-lg text-[18px] leading-[1.35] text-[#747679] sm:text-[21px]">
                    {block.description}
                  </p>
                </div>

                {/* Right Column: Cropped iPhone Mockup + Floating Intelligence Bubble (.intelligence_floating) */}
                <div className="relative flex min-h-[380px] items-end justify-center px-6 pt-8 lg:col-span-6 lg:min-h-[470px]">
                  {/* Phone Frame rising from bottom */}
                  <div className="relative z-10 w-[285px] sm:w-[310px] rounded-t-[40px] bg-[#1f2025] p-2.5 pb-0 shadow-2xl">
                    <div className="mx-auto mb-2 h-4 w-20 rounded-full bg-[#09090b]" />
                    <div className="h-[340px] rounded-t-[32px] bg-[#ffffff] p-4 text-[#222326]">
                      <div className="flex items-center justify-between border-b border-[#ebf0f8] pb-2.5">
                        <span className="text-[11px] font-bold text-[#222326]">
                          {block.primaryScreenTitle}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
                      </div>

                      <div className="mt-3 space-y-2">
                        {block.primaryScreenMetrics.map((m) => (
                          <div
                            key={m.label}
                            className="flex items-center justify-between rounded-[12px] bg-[#ebf0f8]/70 px-3 py-2 text-[11px]"
                          >
                            <div>
                              <p className="text-[10px] text-[#747679]">{m.label}</p>
                              <p className="font-semibold text-[#222326]">{m.value}</p>
                            </div>
                            <span className="rounded-md bg-[#ffffff] px-2 py-0.5 font-mono text-[9.5px] font-bold text-[#1e8300]">
                              {m.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Overlapping Floating Chat/Prompt Card (.intelligence_floating) */}
                  <div className="absolute bottom-6 z-20 w-[88%] max-w-[360px] rounded-[20px] bg-[#ffffff]/95 p-4 text-[#222326] shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-md ring-1 ring-[#222326]/8 sm:right-8">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1f2025] text-[10px] font-bold text-[#ffffff]">
                        AI
                      </span>
                      <p className="text-[11px] font-semibold text-[#415eee]">
                        {block.eyebrow}
                      </p>
                    </div>
                    <p className="mt-1.5 text-[12.5px] font-semibold text-[#222326]">
                      “{block.floatingPromptBubble}”
                    </p>
                    <p className="mt-1 text-[11.5px] leading-snug text-[#747679]">
                      {block.floatingActionReply}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Compact 5 Cross-Role Locks Strip at bottom of Dark Section */}
        <div id="alur-kunci" className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {lockSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="rounded-[20px] bg-[#1f2025] p-4 ring-1 ring-[#ffffff]/10"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-[#ffca00]">
                  TAHAP 0{step.stepNumber}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#31ce01]" />
              </div>
              <p className="mt-1.5 text-[15px] font-semibold text-[#ffffff]">
                {step.stageName}
              </p>
              <p className="mt-1 text-[12px] text-[#ebf0f8]/70">
                {step.triggerAction}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
