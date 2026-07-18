"use client";

import { motion } from "framer-motion";
import type { ItineraryStop } from "@/data/itinerary";
import StopDetails from "@/components/itinerary/StopDetails";
import { rise } from "@/lib/motion";
import SceneFrame from "./SceneFrame";

// The temaki, built one layer at a time as the scene enters.
const layers = [
  { label: "nori", color: "#141018", h: "100%" },
  { label: "rice", color: "#efe7d6", h: "72%" },
  { label: "salmon", color: "#d9713f", h: "48%" },
  { label: "avocado", color: "#7f9b52", h: "40%" },
  { label: "chive", color: "#3c5a3a", h: "30%" },
];

/**
 * Nori Shinn — the intimate close. Dominant concept: one warm counter light in
 * the dark. A handroll assembles layer by layer, a slow wave breathes along the
 * bottom, and the section ends quietly rather than with a call to action.
 */
export default function NoriShinnScene({ stop }: { stop: ItineraryStop }) {
  return (
    <SceneFrame
      id={stop.id}
      interior="linear-gradient(160deg, #1b1720 0%, #141018 55%, #0c0a0e 100%)"
    >
      {/* lantern glow from the counter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-flicker"
        style={{
          background:
            "radial-gradient(90% 60% at 28% 40%, rgba(223,162,75,0.28), rgba(223,162,75,0) 60%)",
        }}
      />

      <div className="relative grid gap-8 p-7 sm:p-10 md:grid-cols-[1fr_0.85fr] md:gap-10 md:p-14">
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <StopDetails stop={stop} tone="light" />

          <p className="mt-8 max-w-md font-display text-xl italic leading-relaxed text-nori-lantern/90">
            Rice still warm, rain on the window, nowhere else we have to be.
            Happy Saturday.
          </p>
        </motion.div>

        {/* the temaki */}
        <div className="relative flex items-center justify-center">
          <div className="flex h-64 items-end gap-1.5" aria-hidden>
            {layers.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: l.h, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="w-8 rounded-t-full"
                style={{ background: l.color }}
              />
            ))}
          </div>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-cream/40">
            temaki, in order
          </span>
        </div>
      </div>

      {/* slow wave breathing along the bottom */}
      <svg
        aria-hidden
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-16 w-full opacity-40"
      >
        <motion.path
          d="M0 40 Q150 10 300 40 T600 40 T900 40 T1200 40 V80 H0 Z"
          fill="#20344a"
          animate={{ d: [
            "M0 40 Q150 10 300 40 T600 40 T900 40 T1200 40 V80 H0 Z",
            "M0 40 Q150 60 300 40 T600 40 T900 40 T1200 40 V80 H0 Z",
            "M0 40 Q150 10 300 40 T600 40 T900 40 T1200 40 V80 H0 Z",
          ] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </SceneFrame>
  );
}
