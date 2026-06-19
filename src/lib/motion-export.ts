import type { Transition } from "motion/react";

export const exportTransition = (
  instant: boolean,
  transition: Transition,
): Transition => (instant ? { duration: 0 } : transition);
