"use client";

import { motion } from "motion/react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { BentoCard } from "@/components/bento/BentoCard";
import { PillBadge } from "@/components/bento/PillBadge";
import { BlurFade } from "@/components/ui/blur-fade";
import { content } from "@/lib/content/de";
import { cn } from "@/lib/utils";
import { useSceneActive } from "@/hooks/useSceneActive";
import { exportTransition } from "@/lib/motion-export";

const { market } = content;

export const SceneMarket = () => {
  const { isActive, exportInstant } = useSceneActive(1);

  return (
    <BentoCard variant="light" className="flex h-full flex-col gap-4 overflow-y-auto md:gap-5">
      <BlurFade inView={isActive}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-0.5 w-6 bg-card-dark" />
              <span className="text-xs font-medium tracking-[0.2em] text-card-dark/50">
                MARKTANALYSE DEUTSCHLAND
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {market.title}
              <br />
              <span className="font-light text-card-dark/60">{market.titleAccent}</span>
            </h2>
          </div>
          <PillBadge variant="outlined" className="hidden shrink-0 md:inline-flex">
            {market.source}
          </PillBadge>
        </div>
      </BlurFade>

      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-[1.5fr_1fr] md:gap-4">
        <BentoCard variant="light" radius="md" className="flex flex-col border border-card-dark/10 p-5 md:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1 pt-1">
            <div className="text-sm font-semibold text-card-dark">{market.chartTitle}</div>
            <div className="flex items-center gap-3 text-xs text-card-dark/50">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-card-dark" />
                {market.chartLegend.housing}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-4 bg-card-accent" />
                {market.chartLegend.index}
              </span>
            </div>
          </div>
          <div className="min-h-[200px] flex-1">
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <ComposedChart
                data={[...market.chartData]}
                margin={{ top: 10, right: 10, bottom: 5, left: -15 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 11, fill: "#6b6b6b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11, fill: "#6b6b6b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[80, 200]}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar
                  yAxisId="left"
                  dataKey="fertigstellungen"
                  fill="#111111"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={48}
                  animationDuration={isActive && !exportInstant ? 1200 : 0}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="baukostenIndex"
                  stroke="#b8d4e8"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#b8d4e8" }}
                  animationDuration={isActive && !exportInstant ? 1500 : 0}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {market.kpisGrid.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={exportInstant ? false : { opacity: 0, scale: 0.9 }}
              animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={exportTransition(exportInstant, { delay: i * 0.1, duration: 0.5 })}
              className="h-full"
            >
              <BentoCard
                variant={kpi.accent === "dark" ? "dark" : "accent"}
                radius="md"
                className="flex h-full min-h-[140px] flex-col justify-between overflow-hidden p-4 md:min-h-[160px] md:p-5"
              >
                <div
                  className={cn(
                    "text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-[0.95] tracking-tight",
                    kpi.accent === "dark" ? "text-card-light" : "text-card-dark",
                  )}
                >
                  {kpi.value}
                </div>
                <div className="mt-3 min-w-0">
                  <div
                    className={cn(
                      "text-sm font-medium leading-tight md:text-base",
                      kpi.accent === "dark" ? "text-card-light/80" : "text-card-dark",
                    )}
                  >
                    {kpi.label}
                  </div>
                  <div
                    className={cn(
                      "mt-1 text-xs leading-snug md:text-sm",
                      kpi.accent === "dark" ? "text-card-light/50" : "text-card-dark/50",
                    )}
                  >
                    {kpi.sub}
                  </div>
                </div>
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
        {market.conclusions.map((conclusion, i) => (
          <motion.div
            key={conclusion.tag}
            initial={exportInstant ? false : { opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={exportTransition(exportInstant, { delay: 0.3 + i * 0.1, duration: 0.5 })}
          >
            <BentoCard
              variant={conclusion.highlight ? "dark" : "accent"}
              radius="md"
              className="h-full p-4 md:p-5"
            >
              <div
                className={cn(
                  "text-[10px] font-semibold tracking-[0.15em]",
                  conclusion.highlight ? "text-card-accent" : "text-card-dark/50",
                )}
              >
                {conclusion.tag}
              </div>
              <div
                className={cn(
                  "mt-1.5 text-base font-bold leading-tight",
                  conclusion.highlight ? "text-card-light" : "text-card-dark",
                )}
              >
                {conclusion.title}
              </div>
              <div
                className={cn(
                  "mt-1 text-xs leading-snug",
                  conclusion.highlight ? "text-card-light/70" : "text-card-dark/70",
                )}
              >
                {conclusion.text}
              </div>
            </BentoCard>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
};
