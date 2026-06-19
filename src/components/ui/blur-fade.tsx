"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { usePresentation } from "@/components/presentation/PresentationContext";
import { exportTransition } from "@/lib/motion-export";

type BlurFadeProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
  yOffset?: number;
};

export const BlurFade = ({
  children,
  className,
  delay = 0,
  inView = true,
  yOffset = 24,
}: BlurFadeProps) => {
  const { exportInstant } = usePresentation();

  return (
    <motion.div
      initial={exportInstant ? false : { opacity: 0, y: yOffset, filter: "blur(8px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: yOffset, filter: "blur(8px)" }
      }
      transition={exportTransition(exportInstant, {
        duration: 0.6,
        delay,
        ease: [0.25, 1, 0.5, 1],
      })}
      className={className}
    >
      {children}
    </motion.div>
  );
};
