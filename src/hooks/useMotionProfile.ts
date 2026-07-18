"use client";

import { useEffect, useState } from "react";

export type MotionProfile = "mobile" | "tablet" | "desktop";

export interface MotionSignals {
  profile: MotionProfile;
  reducedMotion: boolean;
  /** Touch / imprecise pointer — drives tap-first interactions. */
  coarsePointer: boolean;
}

function read(): MotionSignals {
  if (typeof window === "undefined") {
    return { profile: "desktop", reducedMotion: false, coarsePointer: false };
  }
  const w = window.innerWidth;
  const profile: MotionProfile = w < 768 ? "mobile" : w < 1120 ? "tablet" : "desktop";
  return {
    profile,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    coarsePointer: window.matchMedia("(pointer: coarse)").matches,
  };
}

/**
 * Single source of truth for how heavy the motion should be. Scenes read this
 * to scale particle counts, blur, canvas resolution and parallax distance.
 * SSR-safe: renders desktop defaults on the server, corrects after mount.
 */
export function useMotionProfile(): MotionSignals {
  const [signals, setSignals] = useState<MotionSignals>(() => ({
    profile: "desktop",
    reducedMotion: false,
    coarsePointer: false,
  }));

  useEffect(() => {
    const update = () => setSignals(read());
    update();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("resize", update);
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, []);

  return signals;
}

/** Convenience: particle budget scaled to the current profile. */
export function particleBudget(s: MotionSignals, base: number): number {
  if (s.reducedMotion) return 0;
  const factor = s.profile === "mobile" ? 0.4 : s.profile === "tablet" ? 0.7 : 1;
  return Math.round(base * factor);
}
