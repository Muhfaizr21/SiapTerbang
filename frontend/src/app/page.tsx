import {
  COMPATIBILITY_STANDARDS,
  COMMUNITY_STORY_TILES,
  CORE_CLOUD_FEATURES,
  CROSS_ROLE_LOCK_STEPS,
  EXTENDED_FEATURES_GRID,
  FOOTER_COLUMNS,
  HERO_FLOATING_CARDS,
  INTELLIGENCE_DEEP_DIVES,
  NAVIGATION_LINKS,
  RECOGNITION_LAURELS,
  SAAS_PRICING_TIERS,
  SEVEN_ROLE_PERSONAS,
} from "@/domain/landing-data";
import { LandingPageShell } from "@/components/landing/LandingPageShell";

export default function HomePage() {
  return (
    <LandingPageShell
      navigationLinks={NAVIGATION_LINKS}
      heroFloatingCards={HERO_FLOATING_CARDS}
      compatibilityStandards={COMPATIBILITY_STANDARDS}
      recognitionLaurels={RECOGNITION_LAURELS}
      communityStories={COMMUNITY_STORY_TILES}
      coreCloudFeatures={CORE_CLOUD_FEATURES}
      sevenRolePersonas={SEVEN_ROLE_PERSONAS}
      intelligenceDeepDives={INTELLIGENCE_DEEP_DIVES}
      extendedFeatures={EXTENDED_FEATURES_GRID}
      crossRoleLockSteps={CROSS_ROLE_LOCK_STEPS}
      pricingTiers={SAAS_PRICING_TIERS}
      footerColumns={FOOTER_COLUMNS}
    />
  );
}
