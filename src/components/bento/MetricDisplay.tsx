import { cn } from "@/lib/utils";

type MetricDisplayProps = {
  value: string;
  label: string;
  description?: string;
  className?: string;
  valueClassName?: string;
};

export const MetricDisplay = ({
  value,
  label,
  description,
  className,
  valueClassName,
}: MetricDisplayProps) => (
  <div className={cn("flex flex-col gap-1", className)}>
    <span
      className={cn(
        "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
        valueClassName,
      )}
    >
      {value}
    </span>
    <span className="text-sm font-semibold md:text-base">{label}</span>
    {description ? (
      <span className="text-xs text-current/60 md:text-sm">{description}</span>
    ) : null}
  </div>
);
