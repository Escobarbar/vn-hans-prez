"use client";

import { Award, Gem, Shield, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { BentoCard } from "@/components/bento/BentoCard";
import { PillBadge } from "@/components/bento/PillBadge";
import { BlurFade } from "@/components/ui/blur-fade";
import { CAREER_TIERS, getNextTier } from "@/lib/career-tiers";
import { content } from "@/lib/content/de";
import { cn } from "@/lib/utils";
import { useSceneActive } from "@/hooks/useSceneActive";
import { exportTransition } from "@/lib/motion-export";
import { usePresentation } from "../PresentationContext";

const { career } = content;
const metalIcons = [Shield, ShieldCheck, Award, Award, Gem];

export const SceneCareer = () => {
  const { selectedTier, setSelectedTier } = usePresentation();
  const { isActive, exportInstant } = useSceneActive(4);
  const selected = CAREER_TIERS.find((t) => t.level === selectedTier);
  const next = getNextTier(selectedTier);

  return (
    <BentoCard variant="dark" className="flex h-full w-full flex-col overflow-y-auto text-white">
      <BlurFade inView={isActive}>
        <PillBadge variant="outlined" className="border-white/30 text-white/80">
          {career.badge}
        </PillBadge>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          {career.title}
          <br />
          <span className="text-card-accent">{career.titleAccent}</span>
        </h2>
        {selected && next && (
          <p className="mt-2 text-sm text-white/50">
            {career.nextTierHint
              .replace("{sqm}", next.minSqm.toLocaleString("de-DE"))
              .replace("{metal}", next.metal)}
          </p>
        )}
      </BlurFade>

      <div className="mt-6 flex flex-1 flex-col gap-3">
        {CAREER_TIERS.map((tier, i) => {
          const isSelected = selectedTier === tier.level;
          const MetalIcon = metalIcons[i];
          return (
            <BlurFade key={tier.level} delay={0.08 * i} inView={isActive}>
              <button
                type="button"
                onClick={() => setSelectedTier(tier.level)}
                className={cn(
                  "grid w-full grid-cols-[auto_1fr_1fr_auto] items-center gap-4 rounded-[var(--radius-md)] p-4 text-left transition-colors",
                  isSelected ? "bg-card-accent text-card-dark" : "bg-white/5 hover:bg-white/10",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    tier.iconBg,
                    tier.iconColor,
                  )}
                >
                  <MetalIcon className="h-4 w-4" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <PillBadge
                      variant={isSelected ? "filledDark" : "outlined"}
                      className={cn(
                        "text-[10px]",
                        !isSelected && "border-white/30 text-white/80",
                      )}
                    >
                      {tier.metal}
                    </PillBadge>
                    <span className="text-sm font-semibold">{tier.role}</span>
                  </div>
                  <div className="mt-1 text-xs opacity-60">{tier.subtitle}</div>
                </div>
                <div className="hidden h-2 overflow-hidden rounded-full bg-black/20 sm:block">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      isSelected ? "bg-card-dark" : "bg-card-accent",
                    )}
                    initial={exportInstant ? false : { width: 0 }}
                    animate={isActive ? { width: tier.barWidth } : { width: 0 }}
                    transition={exportTransition(exportInstant, {
                      duration: 0.8,
                      delay: 0.2 + i * 0.1,
                    })}
                  />
                </div>
                <div className="text-right text-xl font-bold tabular-nums">
                  {tier.rate}
                  <span className="text-xs font-normal opacity-60"> €/m²</span>
                </div>
              </button>
            </BlurFade>
          );
        })}
      </div>

      <BentoCard variant="accent" radius="md" className="mt-6 space-y-2 p-5 text-sm text-card-dark">
        {career.footer.map((item) => (
          <p key={item.label}>
            <span className="font-semibold">{item.label}</span> {item.text}
          </p>
        ))}
      </BentoCard>
    </BentoCard>
  );
};
