"use client";

import { useMemo } from "react";
import { getDiffRate } from "@/lib/commission";
import { getTierByLevel, TIP_PROVISION } from "@/lib/career-tiers";

type EarningsInput = {
  tierLevel: number;
  ownSqm: number;
  partnerCount: number;
  partnerSqm: number;
  partnerTierLevel?: number;
};

export const useEarningsCalculator = ({
  tierLevel,
  ownSqm,
  partnerCount,
  partnerSqm,
  partnerTierLevel = 1,
}: EarningsInput) => {
  return useMemo(() => {
    const tier = getTierByLevel(tierLevel);
    const partnerTier = getTierByLevel(partnerTierLevel);
    const teamSqm = partnerCount * partnerSqm;
    const diffRate = getDiffRate(tierLevel, partnerTierLevel);
    const ownEarnings = ownSqm * tier.rate;
    const teamEarnings = teamSqm * diffRate;
    const total = ownEarnings + teamEarnings;

    return {
      tier,
      partnerTier,
      ownEarnings,
      teamEarnings,
      total,
      teamSqm,
      diffRate,
      tipProvision: TIP_PROVISION,
      formulas: {
        own: `${ownSqm.toLocaleString("de-DE")} m² × ${tier.rate} €/m²`,
        team: `${teamSqm.toLocaleString("de-DE")} m² × ${diffRate} €/m² (${tier.metal} − ${partnerTier.metal})`,
      },
    };
  }, [tierLevel, ownSqm, partnerCount, partnerSqm, partnerTierLevel]);
};
