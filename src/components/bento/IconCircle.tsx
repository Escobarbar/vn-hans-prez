import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconCircleProps = {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const iconSizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export const IconCircle = ({
  icon: Icon,
  className,
  iconClassName,
  size = "md",
}: IconCircleProps) => (
  <div
    className={cn(
      "flex shrink-0 items-center justify-center rounded-full border border-current/20",
      sizeMap[size],
      className,
    )}
  >
    <Icon className={cn(iconSizeMap[size], iconClassName)} />
  </div>
);
