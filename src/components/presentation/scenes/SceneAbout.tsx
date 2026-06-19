"use client";

import { useState } from "react";
import { BentoCard } from "@/components/bento/BentoCard";
import { PillBadge } from "@/components/bento/PillBadge";
import { BlurFade } from "@/components/ui/blur-fade";
import { VnLogo } from "@/components/brand/VnLogo";
import { content } from "@/lib/content/de";
import { cn } from "@/lib/utils";
import { useSceneActive } from "@/hooks/useSceneActive";

const { about } = content;

const renderBlock = (
  block: (typeof about.blocks)[number],
  activeBlock: string,
  setActiveBlock: (id: string) => void,
  className?: string,
) => (
  <BentoCard
    variant={activeBlock === block.id ? "accent" : "light"}
    radius="md"
    className={cn(
      "cursor-pointer border-2 p-5 transition-colors",
      activeBlock === block.id ? "border-card-dark" : "border-transparent",
      className,
    )}
    onClick={() => setActiveBlock(block.id)}
  >
    <h3 className="font-bold">{block.title}</h3>
    {"lines" in block && block.lines ? (
      <div className="mt-3 space-y-2 text-sm text-card-dark/70">
        {block.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    ) : (
      <p className="mt-2 text-sm text-card-dark/70">{block.text}</p>
    )}
    {"quote" in block && block.quote ? (
      <p className="mt-3 text-sm italic text-card-dark/50">„{block.quote}"</p>
    ) : null}
  </BentoCard>
);

export const SceneAbout = () => {
  const { isActive } = useSceneActive(2);
  const [activeBlock, setActiveBlock] = useState("models");

  const [founding, values, models] = about.blocks;

  return (
    <BentoCard variant="light" className="flex h-full flex-col overflow-y-auto">
      <BlurFade inView={isActive}>
        <PillBadge variant="outlined">{about.badge}</PillBadge>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          {about.title}{" "}
          <span className="text-card-dark/80">{about.titleAccent}</span>
        </h2>
      </BlurFade>

      <div className="mt-6 grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-[1fr_auto] lg:items-stretch lg:gap-6">
        <div className="flex flex-col gap-4 lg:row-start-1">
          <BlurFade delay={0.05} inView={isActive}>
            {renderBlock(founding, activeBlock, setActiveBlock)}
          </BlurFade>
          <BlurFade delay={0.1} inView={isActive}>
            {renderBlock(values, activeBlock, setActiveBlock)}
          </BlurFade>
        </div>

        <div className="flex min-h-[100px] items-center justify-center overflow-hidden py-2 lg:row-start-1">
          <VnLogo width={280} height={100} cropScale={1.2} />
        </div>

        <BlurFade delay={0.15} inView={isActive} className="lg:row-start-2 lg:flex lg:h-full">
          {renderBlock(models, activeBlock, setActiveBlock, "h-full lg:flex lg:flex-col lg:justify-center")}
        </BlurFade>

        <div className="flex flex-col justify-end gap-4 lg:row-start-2">
          <div className="flex items-stretch justify-between gap-2">
            {about.timeline.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveBlock(step.id)}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] p-3 text-center transition-colors",
                  activeBlock === step.id || ("active" in step && step.active)
                    ? "bg-card-dark text-card-light"
                    : "bg-card-accent text-card-dark hover:bg-card-accent/80",
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current text-sm font-bold">
                  {step.step}
                </span>
                <span className="text-xs font-semibold leading-tight">
                  {step.label}
                  <br />
                  {step.sublabel}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {about.stats.map((stat) => (
              <BentoCard key={stat.label} variant="dark" radius="md" className="p-3 text-center">
                <div className="text-lg font-bold text-card-accent md:text-xl">{stat.value}</div>
                <div className="text-[10px] text-white/60">{stat.label}</div>
              </BentoCard>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
