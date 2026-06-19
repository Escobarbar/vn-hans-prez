"use client";

import { cn } from "@/lib/utils";
import { SCENE_LABELS } from "@/lib/content/de";

type SceneLabelProps = {
  activeScene: number;
  className?: string;
};

export const SceneLabel = ({ activeScene, className }: SceneLabelProps) => (
  <div
    className={cn(
      "fixed top-6 right-6 z-50 rounded-full bg-card-dark/80 px-4 py-1.5 text-xs font-semibold text-white/70 backdrop-blur-md",
      className,
    )}
  >
    {String(activeScene + 1).padStart(2, "0")} / {String(SCENE_LABELS.length).padStart(2, "0")}
    <span className="mx-2 opacity-30">·</span>
    {SCENE_LABELS[activeScene]}
  </div>
);
