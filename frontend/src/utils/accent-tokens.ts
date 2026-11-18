import type { MetricAccentColor } from "@/types/landing";

export interface AccentTokenStyles {
  readonly hex: string;
  readonly bgClass: string;
  readonly softBgClass: string;
  readonly textClass: string;
  readonly borderClass: string;
}

const ACCENT_TOKEN_MAP: Record<MetricAccentColor, AccentTokenStyles> = {
  "recovery-green": {
    hex: "#31ce01",
    bgClass: "bg-[#31ce01]",
    softBgClass: "bg-[#31ce01]/14",
    textClass: "text-[#1e8300]",
    borderClass: "border-[#31ce01]/35",
  },
  "metric-blue": {
    hex: "#415eee",
    bgClass: "bg-[#415eee]",
    softBgClass: "bg-[#415eee]/12",
    textClass: "text-[#2945d6]",
    borderClass: "border-[#415eee]/35",
  },
  "signal-gold": {
    hex: "#ffca00",
    bgClass: "bg-[#ffca00]",
    softBgClass: "bg-[#ffca00]/20",
    textClass: "text-[#8a6a00]",
    borderClass: "border-[#ffca00]/45",
  },
  "coral-signal": {
    hex: "#ffab94",
    bgClass: "bg-[#ffab94]",
    softBgClass: "bg-[#ffab94]/25",
    textClass: "text-[#a93f22]",
    borderClass: "border-[#ffab94]/50",
  },
  "sleep-lilac": {
    hex: "#b9a6ff",
    bgClass: "bg-[#b9a6ff]",
    softBgClass: "bg-[#b9a6ff]/22",
    textClass: "text-[#583ec2]",
    borderClass: "border-[#b9a6ff]/45",
  },
};

export function getAccentTokens(accent: MetricAccentColor): AccentTokenStyles {
  return ACCENT_TOKEN_MAP[accent];
}
