export type MetricAccentColor =
  | "recovery-green"
  | "metric-blue"
  | "signal-gold"
  | "coral-signal"
  | "sleep-lilac";

export interface NavLinkItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export interface HeroFloatingMetricCard {
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly value: string;
  readonly subtitle: string;
  readonly accent: MetricAccentColor;
  readonly positionClass: string;
}

export interface CompatibilityStandardItem {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly region: string;
}

export interface RecognitionLaurelItem {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
}

export interface CommunityStoryTile {
  readonly id: string;
  readonly divisionTag: string;
  readonly studentOrBatch: string;
  readonly location: string;
  readonly headline: string;
  readonly metrics: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
    readonly accent: MetricAccentColor;
  }>;
  readonly visualType:
    | "language-class"
    | "dormitory-check"
    | "mensetsu-interview"
    | "document-mcu"
    | "departure-alumni";
}

export interface CoreCloudFeatureCard {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly accent: MetricAccentColor;
  readonly layoutSpan: "third" | "half";
  readonly visualVariant:
    | "discipline-ring"
    | "rematching-loop"
    | "financial-gate"
    | "rirekisho-generator"
    | "document-vault";
}

export interface RolePersonaItem {
  readonly id: string;
  readonly roleNumber: number;
  readonly shortLabel: string;
  readonly fullTitle: string;
  readonly fieldUser: string;
  readonly workspaceScope: string;
  readonly keyModules: ReadonlyArray<string>;
  readonly lockRule: string;
  readonly liveMetricLabel: string;
  readonly liveMetricValue: string;
  readonly accent: MetricAccentColor;
}

export interface IntelligenceDeepDiveBlock {
  readonly id: string;
  readonly eyebrow: string;
  readonly titleLine1: string;
  readonly titleLine2: string;
  readonly description: string;
  readonly primaryScreenTitle: string;
  readonly primaryScreenMetrics: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
    readonly status: string;
  }>;
  readonly floatingPromptBubble: string;
  readonly floatingActionReply: string;
  readonly accent: MetricAccentColor;
}

export interface ExtendedFeatureTile {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly badgeText: string;
  readonly metricHighlight: string;
  readonly accent: MetricAccentColor;
  readonly iconType:
    | "bmi"
    | "qr-scan"
    | "refund"
    | "multi-role"
    | "video-cv"
    | "qr-receipt"
    | "cash-split"
    | "disnaker"
    | "impersonate";
}

export interface CrossRoleLockStep {
  readonly stepNumber: number;
  readonly stageName: string;
  readonly triggerActor: string;
  readonly triggerAction: string;
  readonly systemImpact: ReadonlyArray<string>;
  readonly lockBadge: string;
}

export interface SaaSPricingTier {
  readonly id: string;
  readonly name: string;
  readonly targetAudience: string;
  readonly priceRange: string;
  readonly period: string;
  readonly isRecommended?: boolean;
  readonly quotaSummary: string;
  readonly features: ReadonlyArray<string>;
}

export interface FooterLinkColumn {
  readonly id: string;
  readonly heading: string;
  readonly links: ReadonlyArray<{
    readonly label: string;
    readonly href: string;
  }>;
}
