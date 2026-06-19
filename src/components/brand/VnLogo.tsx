import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePresentationTheme } from "@/hooks/usePresentationTheme";

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
  const { theme } = usePresentationTheme();
  const displayWidth = Math.round(width * cropScale);
  const displayHeight = Math.round(height * cropScale);
  const src =
    theme === "v2" ? "/assets/vn-logo-v2.png" : "/assets/vn-logo-transparent.png";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        className,
      )}
      style={{ width: displayWidth, height: displayHeight }}
    >
      <Image
        src={src}
        alt="VN Modulhaus"
        width={displayWidth}
        height={displayHeight}
        quality={90}
        priority={priority}
        className={cn(
          "h-auto max-w-full object-contain object-center",
          theme === "v1" && variantClass[variant],
          theme === "v3" && "vn-logo--v3",
          theme === "v4" && "vn-logo--v4",
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
