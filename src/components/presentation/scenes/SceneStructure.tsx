"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Scale,
  Network,
  GitBranch,
  Check,
} from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";
import { PillBadge } from "@/components/bento/PillBadge";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { VnLogo } from "@/components/brand/VnLogo";
import { content } from "@/lib/content/de";
import {
  calcContractExample,
  DIFF_PRESETS,
  getDiffRate,
} from "@/lib/commission";
import { CAREER_TIERS, getTierByLevel } from "@/lib/career-tiers";
import { useSceneActive } from "@/hooks/useSceneActive";
import { usePresentation } from "../PresentationContext";

const { structure } = content;
const principleIcons = [TrendingUp, Scale, Network, GitBranch];

export const SceneStructure = () => {
  const { isActive } = useSceneActive(5);

  const [leaderLevel, setLeaderLevel] = useState(3);
  const [memberLevel, setMemberLevel] = useState(2);

  const diffRate = getDiffRate(leaderLevel, memberLevel);
  const leader = getTierByLevel(leaderLevel);
  const member = getTierByLevel(memberLevel);
  const example = calcContractExample(1200, 3, 2);

  useEffect(() => {
    if (memberLevel >= leaderLevel) {
      setMemberLevel(Math.max(1, leaderLevel - 1));
    }
  }, [leaderLevel, memberLevel]);

  return (
    <BentoCard variant="light" className="flex h-full flex-col overflow-y-auto">
      <BlurFade inView={isActive}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <PillBadge variant="outlined">{structure.badge}</PillBadge>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              {structure.title}
              <br />
              <span className="font-light">{structure.titleAccent}</span>
            </h2>
          </div>
          <div className="ml-auto shrink-0 pr-2 md:pr-4">
            <VnLogo width={72} height={26} cropScale={1.8} />
          </div>
        </div>
      </BlurFade>

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-card-dark/50">
        Grundprinzipien
      </h3>

      <div className="mt-3 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
        <div className="flex h-full flex-col gap-3">
          {structure.principles.map((item, i) => {
            const Icon = principleIcons[i];
            return (
              <BlurFade
                key={item.title}
                delay={0.08 * i}
                inView={isActive}
                className="flex min-h-0 flex-1 flex-col"
              >
                <BentoCard
                  variant="accent"
                  radius="md"
                  className="flex h-full flex-1 items-center gap-4 p-4 md:p-5"
                >
                  <Icon className="h-9 w-9 shrink-0 text-card-dark/80 md:h-10 md:w-10" />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-card-dark/70">{item.text}</p>
                  </div>
                </BentoCard>
              </BlurFade>
            );
          })}
        </div>

        <div className="flex h-full flex-col gap-4">
          <BlurFade delay={0.1} inView={isActive}>
            <BentoCard variant="accent" radius="md" className="space-y-4 p-5">
              <h3 className="font-bold">{structure.diff.title}</h3>
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1 text-sm">
                  <span className="text-card-dark/60">{structure.diff.yourTier}</span>
                  <select
                    value={leaderLevel}
                    onChange={(e) => setLeaderLevel(Number(e.target.value))}
                    className="w-full rounded-full border border-card-dark/20 bg-card-light px-3 py-2 text-sm"
                  >
                    {CAREER_TIERS.map((t) => (
                      <option key={t.level} value={t.level}>
                        {t.metal} ({t.rate} €)
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-1 text-sm">
                  <span className="text-card-dark/60">{structure.diff.partnerTier}</span>
                  <select
                    value={memberLevel}
                    onChange={(e) => setMemberLevel(Number(e.target.value))}
                    className="w-full rounded-full border border-card-dark/20 bg-card-light px-3 py-2 text-sm"
                  >
                    {CAREER_TIERS.filter((t) => t.level < leaderLevel).map((t) => (
                      <option key={t.level} value={t.level}>
                        {t.metal} ({t.rate} €)
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="text-sm text-card-dark/60">
                {structure.diff.formula}: {leader.rate} − {member.rate} ={" "}
                <span className="font-bold text-card-dark">{diffRate} {structure.diff.perSqm}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {DIFF_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setLeaderLevel(preset.leaderLevel);
                      setMemberLevel(preset.memberLevel);
                    }}
                    className="rounded-full border border-card-dark/20 px-3 py-1 text-xs font-medium transition-colors hover:bg-card-dark hover:text-card-light"
                  >
                    {preset.label} = {getDiffRate(preset.leaderLevel, preset.memberLevel)} €/m²
                  </button>
                ))}
              </div>
            </BentoCard>
          </BlurFade>

          <BlurFade delay={0.15} inView={isActive}>
            <BentoCard variant="dark" radius="md" className="space-y-3 p-5 text-white">
              <h3 className="font-bold text-card-accent">{structure.example.title}</h3>
              <p className="text-sm text-white/70">{structure.example.scenario}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>{structure.example.total}</span>
                  <span className="tabular-nums font-semibold">
                    <NumberTicker value={example.totalAtLeaderRate} inView={isActive} /> €
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>− {structure.example.partnerShare}</span>
                  <span className="tabular-nums font-semibold">
                    <NumberTicker value={example.memberShare} inView={isActive} /> €
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-bold text-card-accent">{structure.example.diff}</span>
                  <span className="text-xl font-bold tabular-nums text-card-accent">
                    <NumberTicker value={example.diffTotal} inView={isActive} /> €
                  </span>
                </div>
              </div>
            </BentoCard>
          </BlurFade>
        </div>
      </div>

      <BlurFade delay={0.2} inView={isActive} className="mt-6">
        <BentoCard variant="light" radius="md" className="space-y-2 border-2 border-card-dark/10 p-5">
          <h3 className="font-bold">Wichtige Regeln</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {structure.rules.map((rule) => (
              <div key={rule} className="flex items-start gap-2 text-sm text-card-dark/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-card-dark" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </BentoCard>
      </BlurFade>
    </BentoCard>
  );
};
