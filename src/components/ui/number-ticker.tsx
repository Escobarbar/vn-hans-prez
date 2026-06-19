"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { usePresentation } from "@/components/presentation/PresentationContext";

type NumberTickerProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  inView?: boolean;
};

export const NumberTicker = ({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  inView: inViewProp,
}: NumberTickerProps) => {
  const { exportInstant } = usePresentation();
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInViewInternal = useInView(ref, { once: true, margin: "-10%" });
  const isInView = inViewProp ?? isInViewInternal;

  const formatValue = (latest: number) =>
    decimals > 0
      ? latest.toFixed(decimals).replace(".", ",")
      : Math.round(latest).toLocaleString("de-DE");

  const [display, setDisplay] = useState(() =>
    exportInstant ? formatValue(value) : "0",
  );

  useEffect(() => {
    if (exportInstant) {
      setDisplay(formatValue(value));
      return;
    }
    if (isInView) motionValue.set(value);
  }, [exportInstant, isInView, motionValue, value]);

  useEffect(() => {
    if (exportInstant) return;

    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(formatValue(latest));
    });
    return unsubscribe;
  }, [exportInstant, spring, decimals, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};
