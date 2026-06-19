import { getTierByLevel } from "@/lib/career-tiers";

export const getDiffRate = (leaderLevel: number, memberLevel: number): number => {
  const leader = getTierByLevel(leaderLevel);
  const member = getTierByLevel(memberLevel);
  if (member.level >= leader.level) return 0;
  return Math.max(leader.rate - member.rate, 0);
};

export const calcOwnEarnings = (sqm: number, tierLevel: number) =>
  sqm * getTierByLevel(tierLevel).rate;

export const calcTeamEarnings = (
  teamSqm: number,
  leaderLevel: number,
  memberLevel: number,
) => teamSqm * getDiffRate(leaderLevel, memberLevel);

export const calcContractExample = (sqm: number, leaderLevel: number, memberLevel: number) => {
  const leader = getTierByLevel(leaderLevel);
  const member = getTierByLevel(memberLevel);
  const totalAtLeaderRate = sqm * leader.rate;
  const memberShare = sqm * member.rate;
  const diffTotal = totalAtLeaderRate - memberShare;
  const diffRate = getDiffRate(leaderLevel, memberLevel);

  return {
    leader,
    member,
    sqm,
    totalAtLeaderRate,
    memberShare,
    diffTotal,
    diffRate,
  };
};

export const CONTRACT_PRESET = {
  leaderLevel: 3,
  memberLevel: 2,
  sqm: 1200,
  partnerCount: 1,
  ownSqm: 0,
} as const;

export const DIFF_PRESETS = [
  { id: "gold-bronze", leaderLevel: 3, memberLevel: 1, label: "Gold − Bronze" },
  { id: "gold-silver", leaderLevel: 3, memberLevel: 2, label: "Gold − Silber" },
] as const;
