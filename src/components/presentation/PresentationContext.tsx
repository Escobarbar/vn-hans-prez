"use client";

import { createContext, useContext } from "react";
import type { PresentationTheme } from "@/lib/presentation-theme";

type PresentationContextValue = {
  activeScene: number;
  selectedTier: number;
  setSelectedTier: (tier: number) => void;
  goNext: () => void;
  goPrev: () => void;
  scrollToScene: (index: number) => void;
  exportMode: boolean;
  exportInstant: boolean;
  hideChrome: boolean;
  theme: PresentationTheme;
};

const PresentationContext = createContext<PresentationContextValue | null>(null);

export const PresentationProvider = PresentationContext.Provider;

export const usePresentation = () => {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation must be used within PresentationProvider");
  return ctx;
};
