"use client";

import { createContext, useContext } from "react";

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
};

const PresentationContext = createContext<PresentationContextValue | null>(null);

export const PresentationProvider = PresentationContext.Provider;

export const usePresentation = () => {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation must be used within PresentationProvider");
  return ctx;
};
