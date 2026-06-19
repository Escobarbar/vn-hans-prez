"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";
import { PillBadge } from "@/components/bento/PillBadge";
import { InlinePill } from "@/components/bento/InlinePill";
import { BlurFade } from "@/components/ui/blur-fade";
import { VnLogo } from "@/components/brand/VnLogo";
import { content } from "@/lib/content/de";
import { usePresentation } from "../PresentationContext";
import { motion } from "motion/react";

export const SceneCover = () => {
  const { goNext, exportInstant } = usePresentation();
  const { cover } = content;

  return (
    <div className="scene-inner grid h-full grid-cols-1 gap-4 lg:grid-cols-2">
      <BentoCard variant="dark" className="relative flex flex-col justify-between overflow-hidden">
        <BlurFade>
          <PillBadge variant="outlined" className="border-white/30 text-white/80">
            {cover.badge}
          </PillBadge>
        </BlurFade>

        <div className="flex flex-1 flex-col justify-center gap-4 py-6">
          <BlurFade delay={0.1}>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {cover.title}
              <br />
              <InlinePill variant="accent">{cover.titleAccent}</InlinePill>
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="max-w-md text-base text-white/70 md:text-lg">{cover.subtitle}</p>
          </BlurFade>
          <BlurFade delay={0.3} className="flex flex-wrap gap-2">
            {cover.pills.map((pill) => (
              <PillBadge key={pill} variant="outlined" className="border-white/30 text-white/80">
                {pill}
              </PillBadge>
            ))}
          </BlurFade>
        </div>

        <BlurFade delay={0.4} className="flex items-center justify-between">
          <div className="flex gap-2">
            {cover.floatingYears.map((year, i) => (
              <motion.span
                key={year}
                animate={exportInstant ? { y: 0 } : { y: [0, -6, 0] }}
                transition={
                  exportInstant
                    ? { duration: 0 }
                    : { duration: 3, repeat: Infinity, delay: i * 0.5 }
                }
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60"
              >
                {year}
              </motion.span>
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            className="group flex items-center gap-2 rounded-full bg-card-light px-5 py-2.5 text-sm font-semibold text-card-dark transition-transform hover:scale-95 active:scale-90"
          >
            {cover.cta}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </BlurFade>
      </BentoCard>

      <BentoCard variant="light" className="relative overflow-hidden p-0">
        <motion.div
          className="relative h-full min-h-[280px] w-full overflow-hidden rounded-[var(--radius-lg)]"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/assets/houses/hero.jpeg"
            alt="VN Modulhaus"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card-dark/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end px-6 pb-6 pt-14">
            <VnLogo
              variant="light"
              width={130}
              height={46}
              cropScale={1.55}
              priority
            />
          </div>
          <button
            type="button"
            aria-label="Weiter"
            onClick={goNext}
            className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-card-dark/20 bg-card-light transition-transform hover:scale-95"
          >
            <ArrowDownRight className="h-4 w-4" />
          </button>
        </motion.div>
      </BentoCard>
    </div>
  );
};
