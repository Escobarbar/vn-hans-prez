"use client";

import { usePresentation } from "@/components/presentation/PresentationContext";

export const useSceneActive = (sceneIndex: number) => {
  const { activeScene, exportInstant } = usePresentation();

  return {
    isActive: activeScene === sceneIndex,
    exportInstant,
  };
};
