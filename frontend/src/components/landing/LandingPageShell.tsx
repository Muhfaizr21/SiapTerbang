"use client";

import { useState } from "react";
import type {
  CompatibilityStandardItem,
  CommunityStoryTile,
  CoreCloudFeatureCard,
  CrossRoleLockStep,
  ExtendedFeatureTile,
  FooterLinkColumn,
  HeroFloatingMetricCard,
  IntelligenceDeepDiveBlock,
  NavLinkItem,
  RecognitionLaurelItem,
  RolePersonaItem,
  SaaSPricingTier,
} from "@/types/landing";
import { FloatingCapsuleNav } from "./FloatingCapsuleNav";
import { CloudlightHero } from "./CloudlightHero";
import { CompatibilityAndStoriesSection } from "./CompatibilityAndStoriesSection";
import { CloudFeatureBento } from "./CloudFeatureBento";
import { BevelIntelligenceDarkSection } from "./BevelIntelligenceDarkSection";
import { ExtendedFeaturesGridSection } from "./ExtendedFeaturesGridSection";
import { PrivacyAndPricingSection } from "./PrivacyAndPricingSection";
import { ReadyCalloutAndFooter } from "./ReadyCalloutAndFooter";
import { WorkspaceInteractiveModal } from "./WorkspaceInteractiveModal";

export interface LandingPageShellProps {
  readonly navigationLinks: ReadonlyArray<NavLinkItem>;
  readonly heroFloatingCards: ReadonlyArray<HeroFloatingMetricCard>;
  readonly compatibilityStandards: ReadonlyArray<CompatibilityStandardItem>;
  readonly recognitionLaurels: ReadonlyArray<RecognitionLaurelItem>;
  readonly communityStories: ReadonlyArray<CommunityStoryTile>;
  readonly coreCloudFeatures: ReadonlyArray<CoreCloudFeatureCard>;
  readonly sevenRolePersonas: ReadonlyArray<RolePersonaItem>;
  readonly intelligenceDeepDives: ReadonlyArray<IntelligenceDeepDiveBlock>;
  readonly extendedFeatures: ReadonlyArray<ExtendedFeatureTile>;
  readonly crossRoleLockSteps: ReadonlyArray<CrossRoleLockStep>;
  readonly pricingTiers: ReadonlyArray<SaaSPricingTier>;
  readonly footerColumns: ReadonlyArray<FooterLinkColumn>;
}

export function LandingPageShell({
  navigationLinks,
  heroFloatingCards,
  compatibilityStandards,
  recognitionLaurels,
  communityStories,
  coreCloudFeatures,
  sevenRolePersonas,
  intelligenceDeepDives,
  extendedFeatures,
  crossRoleLockSteps,
  pricingTiers,
  footerColumns,
}: LandingPageShellProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("Aktivasi Workspace LPK");

  const handleOpenModal = (context = "Aktivasi Workspace LPK") => {
    setModalContext(context);
    setModalOpen(true);
  };

  return (
    <div className="min-h-[100dvh] bg-[#ffffff] text-[#222326]">
      <FloatingCapsuleNav
        links={navigationLinks}
        onOpenWorkspaceModal={handleOpenModal}
      />

      <main>
        <CloudlightHero
          floatingCards={heroFloatingCards}
          onOpenWorkspaceModal={handleOpenModal}
        />

        <CompatibilityAndStoriesSection
          standards={compatibilityStandards}
          laurels={recognitionLaurels}
          stories={communityStories}
        />

        <CloudFeatureBento features={coreCloudFeatures} />

        <BevelIntelligenceDarkSection
          roles={sevenRolePersonas}
          deepDives={intelligenceDeepDives}
          lockSteps={crossRoleLockSteps}
          onOpenWorkspaceModal={handleOpenModal}
        />

        <ExtendedFeaturesGridSection items={extendedFeatures} />

        <PrivacyAndPricingSection
          tiers={pricingTiers}
          onSelectTier={handleOpenModal}
        />

        <ReadyCalloutAndFooter
          footerColumns={footerColumns}
          onOpenWorkspaceModal={handleOpenModal}
        />
      </main>

      <WorkspaceInteractiveModal
        isOpen={modalOpen}
        initialContext={modalContext}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
