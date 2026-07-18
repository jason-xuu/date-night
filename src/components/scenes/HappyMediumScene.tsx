"use client";

import { motion } from "framer-motion";
import type { ItineraryStop } from "@/data/itinerary";
import StopDetails from "@/components/itinerary/StopDetails";
import DoodleCanvas from "@/components/interactive/DoodleCanvas";
import PaintTrail from "@/components/interactive/PaintTrail";
import { rise } from "@/lib/motion";
import SceneFrame from "./SceneFrame";

const blooms = [
  { c: "#3e5fbf", top: "-6%", left: "-4%", size: 340 },
  { c: "#ee6c5a", top: "40%", left: "62%", size: 300 },
  { c: "#3e9e7a", top: "68%", left: "8%", size: 260 },
  { c: "#e4a94f", top: "10%", left: "70%", size: 220 },
];

/**
 * Happy Medium — the colorful middle of the day. Dominant concept: color
 * blooming onto blank paper. Watercolor blooms open as the section enters, a
 * cursor paint trail (desktop) drifts across it, and there's a real canvas to
 * draw on. Bright but held together by lots of quiet paper around it.
 */
export default function HappyMediumScene({
  stop,
  next,
}: {
  stop: ItineraryStop;
  next: ItineraryStop;
}) {
  return (
    <SceneFrame id={stop.id} interior="#f7f3ec">
      {/* watercolor blooms */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {blooms.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.5, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="absolute rounded-full"
            style={{
              top: b.top,
              left: b.left,
              width: b.size,
              height: b.size,
              filter: "blur(36px)",
              background: `radial-gradient(closest-side, ${b.c}, transparent)`,
            }}
          />
        ))}
      </div>

      <PaintTrail />

      <div className="relative grid gap-8 p-7 sm:p-10 md:grid-cols-2 md:gap-10 md:p-14">
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <StopDetails stop={stop} next={next} tone="dark" />

          {/* playful session timeline */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-sm text-ink/60">
              <span className="time-chip">2:15</span>
              <span className="eyebrow text-ink/50">two hours of making</span>
              <span className="time-chip">4:15</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-pill bg-ink/10">
              <div className="h-full w-2/3 rounded-pill bg-gradient-to-r from-medium-cobalt via-medium-coral to-medium-ochre" />
            </div>
          </div>
        </motion.div>

        <div className="self-center">
          <DoodleCanvas />
        </div>
      </div>
    </SceneFrame>
  );
}
