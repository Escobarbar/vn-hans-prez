import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bentoCardVariants = cva("p-8 md:p-[var(--padding-card)]", {
  variants: {
    variant: {
      light: "bg-card-light text-card-dark",
      dark: "bg-card-dark text-card-light",
      accent: "bg-card-accent text-card-dark",
    },
    radius: {
      lg: "rounded-[var(--radius-lg)]",
      md: "rounded-[var(--radius-md)]",
    },
  },
  defaultVariants: {
    variant: "light",
    radius: "lg",
  },
});

type BentoCardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof bentoCardVariants>;

export const BentoCard = ({
  className,
  variant,
  radius,
  ...props
}: BentoCardProps) => (
  <div className={cn(bentoCardVariants({ variant, radius }), className)} {...props} />
);
