"use client";

import { cn } from "@/lib/utils";

type ProgressBarProps = {
  progress: number;
  className?: string;
};

export const ProgressBar = ({ progress, className }: ProgressBarProps) => (
  <div
    className={cn(
      "fixed top-0 right-0 left-0 z-50 h-1 bg-card-dark/10",
      className,
    )}
  >
    <div
      className="h-full bg-card-dark transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);
