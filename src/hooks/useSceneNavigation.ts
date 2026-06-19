"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SCENE_LABELS } from "@/lib/content/de";

type SceneNavigationOptions = {
  exportMode?: boolean;
  initialScene?: number;
};

export const useSceneNavigation = (
  sceneCount: number,
  options: SceneNavigationOptions = {},
) => {
  const { exportMode = false, initialScene = 0 } = options;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const clampedInitial = Math.max(0, Math.min(sceneCount - 1, initialScene));
  const [activeScene, setActiveScene] = useState(clampedInitial);
  const [selectedTier, setSelectedTier] = useState(3);

  const scrollToScene = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const clamped = Math.max(0, Math.min(sceneCount - 1, index));
    scroller.scrollTo({
      left: clamped * window.innerWidth,
      behavior: exportMode ? "instant" : "smooth",
    });
    setActiveScene(clamped);
  }, [exportMode, sceneCount]);

  const goNext = useCallback(() => scrollToScene(activeScene + 1), [activeScene, scrollToScene]);
  const goPrev = useCallback(() => scrollToScene(activeScene - 1), [activeScene, scrollToScene]);

  useEffect(() => {
    if (!exportMode) return;
    scrollToScene(clampedInitial);
  }, [clampedInitial, exportMode, scrollToScene]);

  useEffect(() => {
    if (exportMode) return;

    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.scene);
            if (!Number.isNaN(index)) setActiveScene(index);
          }
        });
      },
      { root: scroller, threshold: 0.55 },
    );

    const scenes = scroller.querySelectorAll("[data-scene]");
    scenes.forEach((scene) => observer.observe(scene));

    return () => observer.disconnect();
  }, [exportMode]);

  useEffect(() => {
    if (exportMode) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [exportMode, goNext, goPrev]);

  return {
    scrollerRef,
    activeScene,
    selectedTier,
    setSelectedTier,
    scrollToScene,
    goNext,
    goPrev,
    sceneLabels: SCENE_LABELS,
    progress: ((activeScene + 1) / sceneCount) * 100,
  };
};
