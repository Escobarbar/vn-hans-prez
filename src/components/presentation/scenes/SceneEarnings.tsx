"use client";

import { motion } from "motion/react";
import { BentoCard } from "@/components/bento/BentoCard";
import { BlurFade } from "@/components/ui/blur-fade";
import { content } from "@/lib/content/de";
import { useSceneActive } from "@/hooks/useSceneActive";
import { exportTransition } from "@/lib/motion-export";
import { CommissionCalculator } from "@/components/interactive/CommissionCalculator";

const { earnings } = content;

export const SceneEarnings = () => {
  const { isActive, exportInstant } = useSceneActive(6);

  return (
    <BentoCard variant="light" className="flex h-full flex-col gap-3 overflow-y-auto md:gap-4">
      <BlurFade inView={isActive}>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-0.5 w-6 bg-card-dark" />
          <span className="text-xs font-medium tracking-[0.2em] text-card-dark/50">
            {earnings.badge.toUpperCase()}
          </span>
        </div>
        <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          {earnings.title}{" "}
          <span className="font-light text-card-dark/60">{earnings.titleAccent}</span>
        </h2>
      </BlurFade>

      <motion.div
        initial={exportInstant ? false : { opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={exportTransition(exportInstant, { duration: 0.5, delay: 0.1 })}
        className="flex-1"
      >
        <CommissionCalculator />
      </motion.div>
    </BentoCard>
  );
};
