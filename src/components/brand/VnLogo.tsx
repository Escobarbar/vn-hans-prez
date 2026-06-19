import Image from "next/image";
import { cn } from "@/lib/utils";

type VnLogoProps = {
  variant?: "light" | "dark" | "auto";
  width?: number;
  height?: number;
  /** Zoom into logo mark within the square PNG asset */
  cropScale?: number;
  transformOrigin?: string;
  className?: string;
  priority?: boolean;
};

const variantClass: Record<NonNullable<VnLogoProps["variant"]>, string> = {
  light: "brightness-0 invert",
  dark: "",
  auto: "",
};

export const VnLogo = ({
  variant = "dark",
  width = 120,
  height = 40,
  cropScale = 1,
  transformOrigin = "center center",
  className,
  priority = false,
}: VnLogoProps) => {
  const displayWidth = Math.round(width * cropScale);
  const displayHeight = Math.round(height * cropScale);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        className,
      )}
      style={{ width: displayWidth, minHeight: height * cropScale }}
    >
      <Image
        src="/assets/vn-logo-transparent.png"
        alt="VN Modulhaus"
        width={displayWidth}
        height={displayHeight}
        quality={90}
        priority={priority}
        className={cn(
          "h-auto max-w-full object-contain object-center",
          variantClass[variant],
        )}
        style={{
          width: displayWidth,
          height: "auto",
          transformOrigin,
        }}
      />
    </span>
  );
};
