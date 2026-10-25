"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Stagger siblings by ~0.06–0.08s. */
  delay?: number;
}

/**
 * Single, repeated entrance: a short fade with a 16px rise, played once.
 * Dropped entirely when the visitor prefers reduced motion.
 *
 * Motion writes its `initial` styles into the server HTML but not into the
 * hydration pass, so the attribute diff on this element is expected; it is
 * suppressed locally instead of being patched up. `.reveal` keeps the content
 * visible when scripting is unavailable (see globals.css).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      suppressHydrationWarning
      className={cn("reveal", className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
