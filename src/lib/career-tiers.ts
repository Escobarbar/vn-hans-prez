export type MetalTier = "Bronze" | "Silber" | "Gold" | "Platin" | "Diamant";

export type CareerTier = {
  level: number;
  metal: MetalTier;
  role: string;
  title: string;
  subtitle: string;
  promotionFrom?: string;
  rate: number;
  minSqm: number;
  hasStructure: boolean;
  barWidth: string;
  iconBg: string;
  iconColor: string;
};

export const CAREER_TIERS: CareerTier[] = [
  {
    level: 1,
    metal: "Bronze",
    role: "Lotse",
    title: "Bronze · Lotse",
    subtitle: "Startlevel — ab 0 m²/Jahr",
    rate: 50,
    minSqm: 0,
    hasStructure: false,
    barWidth: "22%",
    iconBg: "bg-[#CD7F32]",
    iconColor: "text-white",
  },
  {
    level: 2,
    metal: "Silber",
    role: "Verkaufsberater",
    title: "Silber · Verkaufsberater",
    subtitle: "Aufstieg von Bronze — ab 300 m²/Jahr",
    promotionFrom: "Bronze",
    rate: 110,
    minSqm: 300,
    hasStructure: true,
    barWidth: "48%",
    iconBg: "bg-[#B8B8B8]",
    iconColor: "text-[#2A2A2A]",
  },
  {
    level: 3,
    metal: "Gold",
    role: "Teamleiter",
    title: "Gold · Teamleiter",
    subtitle: "Aufstieg von Silber — ab 1.000 m²/Jahr",
    promotionFrom: "Silber",
    rate: 160,
    minSqm: 1000,
    hasStructure: true,
    barWidth: "70%",
    iconBg: "bg-[#FFD700]",
    iconColor: "text-[#3D3200]",
  },
  {
    level: 4,
    metal: "Platin",
    role: "Regionalleiter",
    title: "Platin · Regionalleiter",
    subtitle: "Aufstieg von Gold — ab 3.500 m²/Jahr",
    promotionFrom: "Gold",
    rate: 200,
    minSqm: 3500,
    hasStructure: true,
    barWidth: "87%",
    iconBg: "bg-[#E5E4E2]",
    iconColor: "text-[#4A4A4A]",
  },
  {
    level: 5,
    metal: "Diamant",
    role: "Gebietsdirektor",
    title: "Diamant · Gebietsdirektor",
    subtitle: "Aufstieg von Platin — ab 12.000 m²/Jahr",
    promotionFrom: "Platin",
    rate: 230,
    minSqm: 12000,
    hasStructure: true,
    barWidth: "100%",
    iconBg: "bg-gradient-to-br from-[#B9F2FF] to-[#7DD3FC]",
    iconColor: "text-[#0C4A6E]",
  },
];

export const TIP_PROVISION = 10;
export const DEFAULT_TIER_LEVEL = 3;
export const DEFAULT_PARTNER_TIER_LEVEL = 1;

export const getTierByLevel = (level: number) =>
  CAREER_TIERS.find((t) => t.level === level) ?? CAREER_TIERS[2];

export const getNextTier = (level: number) =>
  CAREER_TIERS.find((t) => t.level === level + 1);
