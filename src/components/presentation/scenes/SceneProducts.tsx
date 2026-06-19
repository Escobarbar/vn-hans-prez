"use client";

import { useState } from "react";
import Image from "next/image";
import { Home, Building2, Building, Tent } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BentoCard } from "@/components/bento/BentoCard";
import { PillBadge } from "@/components/bento/PillBadge";
import { IconCircle } from "@/components/bento/IconCircle";
import { BlurFade } from "@/components/ui/blur-fade";
import { content } from "@/lib/content/de";
import { cn } from "@/lib/utils";
import { useSceneActive } from "@/hooks/useSceneActive";
import { usePresentationTheme } from "@/hooks/usePresentationTheme";

const icons = [Home, Building2, Building, Tent];
const { products } = content;

export const SceneProducts = () => {
  const { isActive } = useSceneActive(3);
  const { colors } = usePresentationTheme();
  const [expanded, setExpanded] = useState<string | null>(null);

  const productShadow = `0 0 28px 10px ${colors.productGlow}, 0 0 56px 20px ${colors.productGlowOuter}`;
  const insetGlow = `inset 0 0 48px 12px ${colors.productGlowInset}, inset 0 0 96px 24px ${colors.productGlowInsetOuter}`;

  return (
    <BentoCard variant="light" className="flex h-full flex-col overflow-y-auto">
      <BlurFade inView={isActive}>
        <PillBadge variant="outlined">{products.badge}</PillBadge>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          {products.title}{" "}
          <span className="font-light">{products.titleAccent}</span>
        </h2>
        <p className="mt-2 text-sm text-card-dark/60">{products.subtitle}</p>
      </BlurFade>

      <div className="mt-6 grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
        {products.items.map((item, i) => {
          const Icon = icons[i];
          const isExpanded = expanded === item.id;

          return (
            <BlurFade key={item.id} delay={0.08 * i} inView={isActive}>
              <motion.div
                layout
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group rounded-[var(--radius-md)] transition-shadow duration-300 ease-out"
                style={{ boxShadow: isExpanded ? productShadow : undefined }}
                onMouseEnter={(e) => {
                  if (!isExpanded) e.currentTarget.style.boxShadow = productShadow;
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded) e.currentTarget.style.boxShadow = "";
                }}
              >
                <BentoCard
                  variant="dark"
                  radius="md"
                  className={cn(
                    "relative min-h-[220px] cursor-pointer overflow-hidden border-2 p-0 transition-colors duration-300",
                    isExpanded
                      ? "border-card-accent"
                      : "border-transparent group-hover:border-card-accent",
                  )}
                  onClick={() => setExpanded(isExpanded ? null : item.id)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card-dark via-card-dark/75 to-card-dark/20" />
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 z-[5] transition-opacity duration-300",
                      isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                    style={{
                      boxShadow: insetGlow,
                    }}
                  />

                  <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-end p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <IconCircle icon={Icon} size="sm" className="bg-card-light/15 text-card-light" />
                      <span className="text-xs font-bold text-card-light/40">{item.num}</span>
                    </div>
                    <h3 className="font-bold text-card-light">{item.title}</h3>
                    <p className="mt-2 text-sm text-card-light/75">{item.description}</p>
                    <PillBadge
                      variant="outlined"
                      className="mt-3 border-card-light/30 text-[10px] text-card-light/80"
                    >
                      {item.tag}
                    </PillBadge>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-1.5">
                            {item.models.map((model) => (
                              <span
                                key={model}
                                className="rounded-full bg-card-light/15 px-2.5 py-0.5 text-[10px] text-card-light backdrop-blur-sm"
                              >
                                {model}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </BentoCard>
              </motion.div>
            </BlurFade>
          );
        })}
      </div>
    </BentoCard>
  );
};
