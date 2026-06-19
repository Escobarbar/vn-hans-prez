import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inlinePillVariants = cva(
  "inline-block rounded-full px-3 py-0.5 align-middle text-[0.9em] font-bold",
  {
    variants: {
      variant: {
        light: "bg-card-light text-card-dark",
        dark: "bg-card-dark text-card-light",
        accent: "bg-card-accent text-card-dark",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  },
);

type InlinePillProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof inlinePillVariants>;

export const InlinePill = ({
  className,
  variant,
  children,
  ...props
}: InlinePillProps) => (
  <span className={cn(inlinePillVariants({ variant }), className)} {...props}>
    {children}
  </span>
);
