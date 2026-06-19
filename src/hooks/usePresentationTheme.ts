"use client";

import { usePresentation } from "@/components/presentation/PresentationContext";
import { getThemeColors, type PresentationTheme } from "@/lib/presentation-theme";

export const usePresentationTheme = () => {
  const { theme } = usePresentation();
  return {
    theme,
    colors: getThemeColors(theme),
    isV2: theme === "v2",
    isV3: theme === "v3",
    isV4: theme === "v4",
    isBrandedDark: theme === "v2" || theme === "v3" || theme === "v4",
  };
};

export type { PresentationTheme };
