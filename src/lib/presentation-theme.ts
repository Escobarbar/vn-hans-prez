export type PresentationTheme = "v1" | "v2";

export const themeColors = {
  v1: {
    canvas: "#ebf3f7",
    cardDark: "#111111",
    cardLight: "#ffffff",
    cardAccent: "#d4e7f5",
    chartBar: "#111111",
    chartLine: "#b8d4e8",
    chartGrid: "#e2e8f0",
    chartTick: "#6b6b6b",
    chartTickMuted: "#94a3b8",
    productGlow: "rgba(212,231,245,0.45)",
    productGlowOuter: "rgba(212,231,245,0.2)",
    productGlowInset: "rgba(212,231,245,0.28)",
    productGlowInsetOuter: "rgba(212,231,245,0.12)",
    calculatorMuted: "#ebf3f7",
  },
  v2: {
    canvas: "#2E2D20",
    cardDark: "#252419",
    cardLight: "#363532",
    cardAccent: "#E3BF8D",
    goldSoft: "#E3BF8D",
    goldDeep: "#D5A368",
    sand: "#D4A97E",
    cream: "#FFF3E7",
    ink: "#2E2D20",
    chartBar: "#D5A368",
    chartLine: "#E3BF8D",
    chartGrid: "rgba(255,243,231,0.12)",
    chartTick: "rgba(255,243,231,0.55)",
    chartTickMuted: "rgba(255,243,231,0.35)",
    productGlow: "rgba(227,191,141,0.4)",
    productGlowOuter: "rgba(213,163,104,0.18)",
    productGlowInset: "rgba(227,191,141,0.24)",
    productGlowInsetOuter: "rgba(213,163,104,0.1)",
    calculatorMuted: "#3C3B32",
  },
} as const;

export const getThemeColors = (theme: PresentationTheme) => themeColors[theme];

export const v2GoldGradient = "linear-gradient(135deg, #E3BF8D 0%, #D5A368 100%)";
