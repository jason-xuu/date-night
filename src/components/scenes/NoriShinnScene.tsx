"use client";

import { motion } from "framer-motion";
import type { ItineraryStop } from "@/data/itinerary";
import StopDetails from "@/components/itinerary/StopDetails";
import { rise } from "@/lib/motion";
import SceneFrame from "./SceneFrame";

// Fillings that rise out of the handroll, one after another, as the scene enters.
const fillings = [
  { c: "#d9713f", x: 100, angle: -16, len: 82, w: 12 }, // salmon
  { c: "#b0463b", x: 112, angle: -6, len: 70, w: 11 }, // tuna
  { c: "#e6b45a", x: 122, angle: 2, len: 60, w: 11 }, // tamago
  { c: "#86a35a", x: 132, angle: 10, len: 80, w: 12 }, // avocado
  { c: "#4e7d46", x: 144, angle: 18, len: 56, w: 9 }, // cucumber
];
const rootY = 100;

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
            This is the part I&apos;m looking forward to most. Warm rice, rain
            outside, and you. Happy Saturday.
          </p>
        </motion.div>

        {/* the handroll */}
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 240 280" className="h-72 w-full max-w-[260px]" role="img" aria-label="A hand roll being made, fillings tucked into the seaweed cone">
            <g transform="rotate(-8 120 150)">
              {/* rice sitting in the opening (behind the fillings) */}
              <motion.ellipse
                cx={120} cy={104} rx={58} ry={20} fill="#efe7d6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
              />

              {/* fillings rising out of the roll */}
              {fillings.map((f, i) => (
                <g key={i} transform={`rotate(${f.angle} ${f.x} ${rootY})`}>
                  <motion.rect
                    x={f.x - f.w / 2} y={rootY - f.len} width={f.w} height={f.len + 16} rx={f.w / 2}
                    fill={f.c}
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.45 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
                  />
                </g>
              ))}

              {/* nori cone wrapping the front */}
              <motion.g
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
              >
                <path d="M62 104 A58 20 0 0 0 178 104 L120 250 Z" fill="#15111b" />
                {/* far rim of the opening */}
                <path d="M62 104 A58 20 0 0 1 178 104" fill="none" stroke="#0c0a12" strokeWidth={3} opacity={0.7} />
                {/* soft sheen down the seaweed */}
                <path d="M96 118 L118 244" fill="none" stroke="#2c2436" strokeWidth={4} strokeLinecap="round" opacity={0.7} />
              </motion.g>
            </g>
          </svg>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-cream/40">
            made to order
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
