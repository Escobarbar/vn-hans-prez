"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Building2, Layers, Calculator, ArrowRight } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";
import { PillBadge } from "@/components/bento/PillBadge";
import { CAREER_TIERS } from "@/lib/career-tiers";
import { content } from "@/lib/content/de";
import { cn, formatEuro } from "@/lib/utils";
import { usePresentation } from "@/components/presentation/PresentationContext";
import { exportTransition } from "@/lib/motion-export";

const { earnings } = content;

export const CommissionCalculator = () => {
  const { exportInstant } = usePresentation();
  const [level, setLevel] = useState(3);
  const [ownM2, setOwnM2] = useState(1000);
  const [teamPartners, setTeamPartners] = useState(3);
  const [teamM2Per, setTeamM2Per] = useState(300);
  const [teamLevel, setTeamLevel] = useState(1);

  const currentLevel = CAREER_TIERS.find((l) => l.level === level)!;
  const teamLevelData = CAREER_TIERS.find((l) => l.level === teamLevel)!;

  const calc = useMemo(() => {
    const ownEarnings = ownM2 * currentLevel.rate;
    const teamTotalM2 = teamPartners * teamM2Per;
    const diffProvision = currentLevel.rate - teamLevelData.rate;
    const teamEarnings = teamTotalM2 * Math.max(0, diffProvision);
    const total = ownEarnings + teamEarnings;

    return { ownEarnings, teamEarnings, total, teamTotalM2, diffProvision };
  }, [ownM2, currentLevel, teamPartners, teamM2Per, teamLevelData]);

  const availableTeamLevels = CAREER_TIERS.filter((l) => l.level < level);

  return (
    <div className="flex h-full flex-col gap-3 md:gap-4">
      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        <BentoCard variant="light" radius="md" className="flex flex-col border border-card-dark/10 p-5 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-card-dark">
                <Calculator className="h-4 w-4 text-card-light" />
              </div>
              <h3 className="text-base font-bold text-card-dark">Interaktiver Rechner</h3>
            </div>
            <PillBadge variant="filledAccent" className="text-[10px]">
              Live
            </PillBadge>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-card-dark">
                <Layers className="h-3.5 w-3.5" />
                Ihre Stufe
              </label>
              <div className="flex gap-1">
                {CAREER_TIERS.map((l) => (
                  <button
                    key={l.level}
                    type="button"
                    onClick={() => {
                      setLevel(l.level);
                      if (teamLevel >= l.level) {
                        setTeamLevel(Math.max(1, l.level - 1));
                      }
                    }}
                    className={cn(
                      "flex-1 rounded-xl py-2 text-xs font-bold transition-all",
                      level === l.level
                        ? "bg-card-dark text-card-light"
                        : "bg-card-accent text-card-dark hover:bg-card-accent/70",
                    )}
                  >
                    {l.level}
                  </button>
                ))}
              </div>
              <div className="mt-1.5 text-[10px] text-card-dark/50">
                {currentLevel.rate} €/m² · ab {currentLevel.minSqm.toLocaleString("de-DE")} m² ·{" "}
                {currentLevel.role}
              </div>
            </div>

            <div>
              <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-card-dark">
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  Eigengeschäft (m²/Jahr)
                </span>
                <span className="text-sm font-bold tabular-nums">{ownM2.toLocaleString("de-DE")}</span>
              </label>
              <input
                type="range"
                min="0"
                max="3000"
                step="50"
                value={ownM2}
                onChange={(e) => setOwnM2(Number(e.target.value))}
                className="w-full accent-card-dark"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-card-dark">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    Partner
                  </span>
                  <span className="text-sm font-bold tabular-nums">{teamPartners}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={teamPartners}
                  onChange={(e) => setTeamPartners(Number(e.target.value))}
                  className="w-full accent-card-dark"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-card-dark">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    m²/Partner
                  </span>
                  <span className="text-sm font-bold tabular-nums">
                    {teamM2Per.toLocaleString("de-DE")}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={teamM2Per}
                  onChange={(e) => setTeamM2Per(Number(e.target.value))}
                  className="w-full accent-card-dark"
                />
              </div>
            </div>

            {availableTeamLevels.length > 0 && (
              <div>
                <label className="mb-1.5 text-xs font-medium text-card-dark">
                  Stufe der Team-Partner
                </label>
                <div className="flex gap-1">
                  {availableTeamLevels.map((l) => (
                    <button
                      key={l.level}
                      type="button"
                      onClick={() => setTeamLevel(l.level)}
                      className={cn(
                        "flex-1 rounded-xl py-2 text-xs font-bold transition-all",
                        teamLevel === l.level
                          ? "bg-card-accent text-card-dark"
                          : "bg-[#ebf3f7] text-card-dark hover:bg-card-accent/50",
                      )}
                    >
                      Stufe {l.level}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-card-dark/10 pt-3">
            <div className="rounded-[14px] bg-card-accent/40 p-3">
              <div className="text-[10px] font-medium tracking-[0.1em] text-card-dark/50">
                EIGENVERDIENST
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={calc.ownEarnings}
                  initial={exportInstant ? false : { opacity: 0.5, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0.5 }}
                  transition={exportTransition(exportInstant, { duration: 0.2 })}
                  className="mt-1 text-xl font-extrabold tabular-nums text-card-dark"
                >
                  {formatEuro(calc.ownEarnings)}
                </motion.div>
              </AnimatePresence>
              <div className="mt-0.5 text-[10px] text-card-dark/50">
                {ownM2.toLocaleString("de-DE")} m² × {currentLevel.rate} €
              </div>
            </div>

            <div className="rounded-[14px] bg-card-accent p-3">
              <div className="text-[10px] font-medium tracking-[0.1em] text-card-dark/60">
                TEAM-VERDIENST
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={calc.teamEarnings}
                  initial={exportInstant ? false : { opacity: 0.5, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0.5 }}
                  transition={exportTransition(exportInstant, { duration: 0.2 })}
                  className="mt-1 text-xl font-extrabold tabular-nums text-card-dark"
                >
                  {formatEuro(calc.teamEarnings)}
                </motion.div>
              </AnimatePresence>
              <div className="mt-0.5 text-[10px] text-card-dark/60">
                {calc.teamTotalM2.toLocaleString("de-DE")} m² × {calc.diffProvision} €
              </div>
            </div>
          </div>
        </BentoCard>

        <div className="flex flex-col gap-3 md:gap-4">
          <BentoCard variant="dark" radius="md" className="flex flex-1 flex-col justify-between p-5 md:p-6">
            <div>
              <div className="text-xs font-medium tracking-[0.2em] text-card-accent">
                GESAMTeinkommen / JAHR
              </div>
              <p className="mt-1.5 text-sm text-card-light/60">
                Eigenverkauf + Team-Umsatz = passives Einkommen durch Struktur
              </p>
            </div>

            <div className="my-4 flex items-center justify-center">
              <div className="text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={calc.total}
                    initial={exportInstant ? false : { scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={exportTransition(exportInstant, {
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    })}
                  >
                    <div className="text-5xl font-extrabold leading-none tracking-tight text-card-light md:text-6xl">
                      {formatEuro(calc.total)}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-2 text-xs font-medium tracking-[0.1em] text-card-light/40">
                  PRO JAHR · STUFE {level} · UNVERBINDLICH
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-card-light/10 pt-4">
              <div>
                <div className="text-[10px] font-medium tracking-[0.1em] text-card-light/40">
                  EIGENGESCHÄFT
                </div>
                <div className="mt-1 text-xl font-bold tabular-nums text-card-accent">
                  {formatEuro(calc.ownEarnings)}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-medium tracking-[0.1em] text-card-light/40">
                  TEAM-UMSATZ
                </div>
                <div className="mt-1 text-xl font-bold tabular-nums text-card-accent">
                  {formatEuro(calc.teamEarnings)}
                </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard variant="accent" radius="md" className="p-4 md:p-5">
            <div className="flex items-center gap-3">
              <div className="flex-1 text-sm font-bold text-card-dark">
                Ein eigenes Team multipliziert Ihren Erfolg — passiv.
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card-dark">
                <ArrowRight className="h-4 w-4 text-card-light" />
              </div>
            </div>
          </BentoCard>

          <BentoCard variant="light" radius="md" className="border border-card-dark/10 p-4 md:p-5">
            <div className="text-[10px] font-medium tracking-[0.1em] text-card-dark/50">
              VERTRAGSOPTIONEN
            </div>
            <div className="mt-2 flex gap-3">
              {earnings.contractOptions.map((opt) => (
                <div key={opt.law} className="flex-1">
                  <span className="text-sm font-bold text-card-dark">{opt.law}:</span>{" "}
                  <span className="text-sm text-card-dark/70">{opt.max}</span>
                </div>
              ))}
            </div>
            <p className="mt-1.5 text-[10px] text-card-dark/50">{earnings.disclaimer}</p>
          </BentoCard>
        </div>
      </div>
    </div>
  );
};
