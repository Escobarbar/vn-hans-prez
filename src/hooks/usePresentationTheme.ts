"use client";

import { usePresentation } from "@/components/presentation/PresentationContext";
import { getThemeColors, type PresentationTheme } from "@/lib/presentation-theme";

export const usePresentationTheme = () => {
  const { theme } = usePresentation();
  return {
    theme,
    colors: getThemeColors(theme),
    isV2: theme === "v2",
  };
};

export type { PresentationTheme };
