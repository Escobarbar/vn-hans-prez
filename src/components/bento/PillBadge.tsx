import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillBadgeVariants = cva(
  "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium tracking-wide",
  {
    variants: {
      variant: {
        outlined:
          "border border-current bg-transparent",
        filledDark: "bg-card-dark text-card-light",
        filledLight: "bg-card-light text-card-dark",
        filledAccent: "bg-card-accent text-card-dark",
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  },
);

type PillBadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof pillBadgeVariants>;

export const PillBadge = ({
  className,
  variant,
  ...props
}: PillBadgeProps) => (
  <span className={cn(pillBadgeVariants({ variant }), className)} {...props} />
);
