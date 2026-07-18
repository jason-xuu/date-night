/** Shared motion vocabulary so every scene animates on the same clock. */

export const easing = {
  cinema: [0.22, 1, 0.36, 1] as const, // ease-out, no overshoot
  drift: [0.4, 0, 0.2, 1] as const,
};

export const duration = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  scene: 1.2,
};

// Standard content-entrance used across scenes (Framer Motion variants).
export const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.cinema, delay: i * 0.08 },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.slow, ease: easing.drift } },
};
