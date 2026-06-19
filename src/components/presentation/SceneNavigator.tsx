"use client";

import { cn } from "@/lib/utils";

type SceneNavigatorProps = {
  labels: readonly string[];
  activeScene: number;
  onNavigate: (index: number) => void;
};

export const SceneNavigator = ({
  labels,
  activeScene,
  onNavigate,
}: SceneNavigatorProps) => (
  <nav
    className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-card-dark/90 px-4 py-2 backdrop-blur-md"
    aria-label="Szenen-Navigation"
  >
    {labels.map((label, index) => (
      <button
        key={label}
        type="button"
        onClick={() => onNavigate(index)}
        aria-label={label}
        aria-current={activeScene === index ? "step" : undefined}
        className={cn(
          "h-2.5 rounded-full transition-all duration-300",
          activeScene === index
            ? "w-7 bg-card-light"
            : "w-2.5 bg-white/25 hover:bg-white/40",
        )}
      />
    ))}
  </nav>
);
