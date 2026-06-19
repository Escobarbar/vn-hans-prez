"use client";

import Link from "next/link";
import { usePresentation } from "./PresentationContext";
import { cn } from "@/lib/utils";

const versions = [
  { id: "v1" as const, href: "/" },
  { id: "v2" as const, href: "/v2" },
  { id: "v3" as const, href: "/v3" },
  { id: "v4" as const, href: "/v4" },
];

export const ThemeSwitcher = () => {
  const { theme, activeScene, exportMode, hideChrome } = usePresentation();

  if (exportMode || hideChrome) return null;

  const sceneQuery = activeScene > 0 ? `?scene=${activeScene}` : "";

  return (
    <div
      className="fixed top-6 left-6 z-50 flex items-center gap-0.5 rounded-full border border-white/10 bg-card-dark/80 p-0.5 backdrop-blur-md"
      aria-label="Design-Version wechseln"
    >
      {versions.map(({ id, href }) => (
        <Link
          key={id}
          href={`${href}${sceneQuery}`}
          className={cn(
            "rounded-full px-2 py-1.5 text-[11px] font-semibold transition-all hover:scale-95 active:scale-95 md:px-2.5 md:text-xs",
            theme === id
              ? "bg-card-accent text-card-dark shadow-sm"
              : "text-white/60 hover:text-white/90",
          )}
          aria-current={theme === id ? "page" : undefined}
        >
          {id}
        </Link>
      ))}
    </div>
  );
};
