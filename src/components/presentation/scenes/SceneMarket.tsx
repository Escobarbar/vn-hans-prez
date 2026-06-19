"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, Lightbulb, TrendingDown, TrendingUp } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";
import { PillBadge } from "@/components/bento/PillBadge";
import { BlurFade } from "@/components/ui/blur-fade";
import { content } from "@/lib/content/de";
import { cn } from "@/lib/utils";
import { useSceneActive } from "@/hooks/useSceneActive";
import { exportTransition } from "@/lib/motion-export";
import { usePresentationTheme } from "@/hooks/usePresentationTheme";

const { market } = content;

export const SceneMarket = () => {
  const { isActive, exportInstant } = useSceneActive(1);
  const { colors, theme } = usePresentationTheme();

  return (
    <BentoCard variant="light" className="flex h-full flex-col gap-3 overflow-y-auto md:gap-4">
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

      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-[1.45fr_1fr] md:gap-4">
        <div className="flex min-h-0 flex-col gap-3">
          <BentoCard
            variant="light"
            radius="md"
            className="flex min-h-[220px] flex-1 flex-col border border-card-dark/10 p-4 md:min-h-[240px] md:p-5"
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-1">
              <div className="text-sm font-semibold text-card-dark">{market.chartTitle}</div>
              <div className="flex items-center gap-3 text-xs text-card-dark/50">
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: colors.chartBar }}
                  />
                  {market.chartLegend.housing}
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-0.5 w-4 shrink-0 rounded-full"
                    style={{ backgroundColor: colors.chartLine }}
                  />
                  {market.chartLegend.index}
                </span>
              </div>
            </div>
            <div
              className="market-chart min-h-[160px] flex-1"
              style={
                {
                  "--chart-bar": colors.chartBar,
                  "--chart-line": colors.chartLine,
                } as CSSProperties
              }
            >
              <ResponsiveContainer width="100%" height="100%" minHeight={160}>
                <ComposedChart
                  key={theme}
                  data={[...market.chartData]}
                  margin={{ top: 8, right: 8, bottom: 4, left: -15 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.chartGrid} vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 10, fill: colors.chartTick }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 10, fill: colors.chartTick }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[80, 200]}
                    tick={{ fontSize: 10, fill: colors.chartTickMuted }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="fertigstellungen"
                    fill={colors.chartBar}
                    radius={[6, 6, 0, 0]}
                    maxBarSize={40}
                    isAnimationActive={isActive && !exportInstant}
                    animationDuration={isActive && !exportInstant ? 1200 : 0}
                  >
                    {market.chartData.map((entry) => (
                      <Cell key={entry.year} fill={colors.chartBar} />
                    ))}
                  </Bar>
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="baukostenIndex"
                    stroke={colors.chartLine}
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: colors.chartLine, stroke: colors.chartLine }}
                    isAnimationActive={isActive && !exportInstant}
                    animationDuration={isActive && !exportInstant ? 1500 : 0}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>

          <motion.div
            initial={exportInstant ? false : { opacity: 0, y: 12 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={exportTransition(exportInstant, { delay: 0.15, duration: 0.45 })}
          >
            <BentoCard variant="accent" radius="md" className="p-4 md:p-5">
              <div className="text-[10px] font-semibold tracking-[0.15em] text-card-dark/50">
                {market.costComparison.title}
              </div>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <div className="text-2xl font-bold leading-none text-card-dark md:text-3xl">
                    {market.costComparison.from.value}
                  </div>
                  <div className="mt-1 text-xs text-card-dark/50">
                    {market.costComparison.from.unit} · {market.costComparison.from.year}
                  </div>
                </div>
                <ArrowRight className="mb-1 h-5 w-5 shrink-0 text-card-dark/30" aria-hidden />
                <div className="text-right">
                  <div className="text-2xl font-bold leading-none text-card-dark md:text-3xl">
                    {market.costComparison.to.value}
                  </div>
                  <div className="mt-1 text-xs text-card-dark/50">
                    {market.costComparison.to.unit} · {market.costComparison.to.year}
                  </div>
                </div>
              </div>
              <div className="mt-3 border-t border-card-dark/10 pt-2 text-xs leading-snug text-card-dark/70 md:text-sm">
                {market.costComparison.footnote}
              </div>
            </BentoCard>
          </motion.div>

          <motion.div
            initial={exportInstant ? false : { opacity: 0, y: 12 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={exportTransition(exportInstant, { delay: 0.22, duration: 0.45 })}
          >
            <BentoCard
              variant="light"
              radius="md"
              className="flex gap-3 border border-card-dark/10 p-4 md:p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-card-accent/30">
                <Lightbulb className="h-4 w-4 text-card-dark" aria-hidden />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-card-dark">{market.chartInsight.title}</div>
                <p className="mt-1 text-xs leading-snug text-card-dark/70 md:text-sm">
                  {market.chartInsight.text}
                </p>
              </div>
            </BentoCard>
          </motion.div>
        </div>

        <div className="flex min-h-0 flex-col gap-3">
          <div className="grid flex-1 grid-cols-2 gap-3 md:gap-3">
            {market.kpisGrid.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={exportInstant ? false : { opacity: 0, scale: 0.9 }}
                animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={exportTransition(exportInstant, { delay: i * 0.08, duration: 0.45 })}
                className="h-full"
              >
                <BentoCard
                  variant={kpi.accent === "dark" ? "dark" : "accent"}
                  radius="md"
                  className="flex h-full min-h-[118px] flex-col justify-between overflow-hidden p-3.5 md:min-h-[128px] md:p-4"
                >
                  <div
                    className={cn(
                      "text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold leading-[0.95] tracking-tight",
                      kpi.accent === "dark" ? "text-card-light" : "text-card-dark",
                    )}
                  >
                    {kpi.value}
                  </div>
                  <div className="mt-2 min-w-0">
                    <div
                      className={cn(
                        "text-xs font-medium leading-tight md:text-sm",
                        kpi.accent === "dark" ? "text-card-light/80" : "text-card-dark",
                      )}
                    >
                      {kpi.label}
                    </div>
                    <div
                      className={cn(
                        "mt-0.5 text-[10px] leading-snug md:text-xs",
                        kpi.accent === "dark" ? "text-card-light/50" : "text-card-dark/50",
                      )}
                    >
                      {kpi.sub}
                    </div>
                    {"trend" in kpi && kpi.trend ? (
                      <div
                        className={cn(
                          "mt-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                          kpi.trend.direction === "up"
                            ? kpi.accent === "dark"
                              ? "bg-card-light/10 text-card-accent"
                              : "bg-card-dark/5 text-card-dark/70"
                            : kpi.accent === "dark"
                              ? "bg-card-light/10 text-card-light/70"
                              : "bg-card-dark/5 text-card-dark/60",
                        )}
                      >
                        {kpi.trend.direction === "up" ? (
                          <TrendingUp className="h-3 w-3" aria-hidden />
                        ) : (
                          <TrendingDown className="h-3 w-3" aria-hidden />
                        )}
                        {kpi.trend.label}
                      </div>
                    ) : null}
                  </div>
                </BentoCard>
              </motion.div>
            ))}
          </div>

          {market.highlights.map((highlight, i) => (
            <motion.div
              key={highlight.title}
              initial={exportInstant ? false : { opacity: 0, x: 12 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={exportTransition(exportInstant, { delay: 0.35 + i * 0.08, duration: 0.45 })}
            >
              <BentoCard
                variant="light"
                radius="md"
                className="border border-card-dark/10 p-3.5 md:p-4"
              >
                <div className="text-sm font-bold leading-tight text-card-dark">
                  {highlight.title}
                </div>
                <p className="mt-1 text-xs leading-snug text-card-dark/70">{highlight.text}</p>
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-3">
        {market.conclusions.map((conclusion, i) => (
          <motion.div
            key={conclusion.tag}
            initial={exportInstant ? false : { opacity: 0, y: 16 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={exportTransition(exportInstant, { delay: 0.4 + i * 0.08, duration: 0.45 })}
          >
            <BentoCard
              variant={conclusion.highlight ? "dark" : "accent"}
              radius="md"
              className="h-full p-3.5 md:p-4"
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
                  "mt-1 text-sm font-bold leading-tight md:text-base",
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
