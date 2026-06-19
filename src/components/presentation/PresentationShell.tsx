"use client";

import { useEffect } from "react";
import { PresentationProvider } from "./PresentationContext";
import { SceneLabel } from "./SceneLabel";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ProgressBar } from "./ProgressBar";
import { SceneNavigator } from "./SceneNavigator";
import { SceneCover } from "./scenes/SceneCover";
import { SceneMarket } from "./scenes/SceneMarket";
import { SceneAbout } from "./scenes/SceneAbout";
import { SceneProducts } from "./scenes/SceneProducts";
import { SceneCareer } from "./scenes/SceneCareer";
import { SceneStructure } from "./scenes/SceneStructure";
import { SceneEarnings } from "./scenes/SceneEarnings";
import { useSceneNavigation } from "@/hooks/useSceneNavigation";
import type { PresentationTheme } from "@/lib/presentation-theme";
import { cn } from "@/lib/utils";

const SCENES = [
  { id: "cover", Component: SceneCover },
  { id: "market", Component: SceneMarket },
  { id: "about", Component: SceneAbout },
  { id: "products", Component: SceneProducts },
  { id: "career", Component: SceneCareer },
  { id: "structure", Component: SceneStructure },
  { id: "earnings", Component: SceneEarnings },
] as const;

type PresentationShellProps = {
  theme?: PresentationTheme;
  exportMode?: boolean;
  initialScene?: number;
  hideChrome?: boolean;
};

export const PresentationShell = ({
  theme = "v1",
  exportMode = false,
  initialScene = 0,
  hideChrome = false,
}: PresentationShellProps) => {
  const nav = useSceneNavigation(SCENES.length, {
    exportMode,
    initialScene,
  });

  useEffect(() => {
    if (!exportMode) return;

    document.documentElement.setAttribute("data-export-mode", "true");

    const markReady = () => {
      document.documentElement.setAttribute("data-export-ready", "true");
    };

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(markReady);
    });

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.removeAttribute("data-export-mode");
      document.documentElement.removeAttribute("data-export-ready");
    };
  }, [exportMode, nav.activeScene]);

  return (
    <PresentationProvider
      value={{
        activeScene: nav.activeScene,
        selectedTier: nav.selectedTier,
        setSelectedTier: nav.setSelectedTier,
        goNext: nav.goNext,
        goPrev: nav.goPrev,
        scrollToScene: nav.scrollToScene,
        exportMode,
        exportInstant: exportMode,
        hideChrome,
        theme,
      }}
    >
      <div
        className={cn(
          theme === "v2" && "theme-v2 min-h-full",
          theme === "v3" && "theme-v3 min-h-full",
          theme === "v4" && "theme-v4 min-h-full",
        )}
      >
        {!hideChrome && <ProgressBar progress={nav.progress} />}
        {!hideChrome && <ThemeSwitcher />}
        {!hideChrome && <SceneLabel activeScene={nav.activeScene} theme={theme} />}
        <div ref={nav.scrollerRef} className="scroller">
          {SCENES.map(({ id, Component }, index) => (
            <section
              key={id}
              data-scene={index}
              className={index === 4 ? "scene-wrapper scene-wrapper--full" : "scene-wrapper"}
              aria-label={nav.sceneLabels[index]}
            >
              <Component />
            </section>
          ))}
        </div>
        {!hideChrome && (
          <SceneNavigator
            labels={nav.sceneLabels}
            activeScene={nav.activeScene}
            onNavigate={nav.scrollToScene}
          />
        )}
      </div>
    </PresentationProvider>
  );
};
