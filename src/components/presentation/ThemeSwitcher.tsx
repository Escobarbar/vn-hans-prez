"use client";

import Link from "next/link";
import { usePresentation } from "./PresentationContext";
import { cn } from "@/lib/utils";

export const ThemeSwitcher = () => {
  const { theme, activeScene, exportMode, hideChrome } = usePresentation();

  if (exportMode || hideChrome) return null;

  const sceneQuery = activeScene > 0 ? `?scene=${activeScene}` : "";

  return (
    <div
      className="fixed top-6 left-6 z-50 flex items-center gap-0.5 rounded-full border border-white/10 bg-card-dark/80 p-0.5 backdrop-blur-md"
      aria-label="Design-Version wechseln"
    >
      <Link
        href={`/${sceneQuery}`}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-semibold transition-all hover:scale-95 active:scale-95",
          theme === "v1"
            ? "bg-card-light text-card-dark shadow-sm"
            : "text-white/60 hover:text-white/90",
        )}
        aria-current={theme === "v1" ? "page" : undefined}
      >
        v1
      </Link>
      <Link
        href={`/v2${sceneQuery}`}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-semibold transition-all hover:scale-95 active:scale-95",
          theme === "v2"
            ? "bg-card-accent text-card-dark shadow-sm"
            : "text-white/60 hover:text-white/90",
        )}
        aria-current={theme === "v2" ? "page" : undefined}
      >
        v2
      </Link>
    </div>
  );
};
