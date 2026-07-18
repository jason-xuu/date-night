"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ItineraryStop } from "@/data/itinerary";
import StopDetails from "@/components/itinerary/StopDetails";
import { rise } from "@/lib/motion";
import SceneFrame from "./SceneFrame";

const menu = [
  { dish: "Crêpe complète", note: "buckwheat, egg, gruyère" },
  { dish: "Œufs Bénédicte", note: "smoked salmon, hollandaise" },
  { dish: "Café crème · deux", note: "and a pain au chocolat to share" },
];

/**
 * Café Henri — warm Parisian morning. Dominant concept: warmth leaking out of a
 * cold rainy window. A steaming cup and a folded menu card you tap open; the sky
 * outside stays grey, the interior glows.
 */
export default function CafeHenriScene({
  stop,
  next,
}: {
  stop: ItineraryStop;
  next: ItineraryStop;
}) {
  const [open, setOpen] = useState(false);

  return (
    <SceneFrame
      id={stop.id}
      interior="linear-gradient(155deg, #f5ecdb 0%, #efe0c9 55%, #e7cfa6 100%)"
    >
      <div className="grid gap-8 p-7 sm:p-10 md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:p-14">
        {/* Left — the window & the cup */}
        <div className="relative order-2 md:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-gradient-to-b from-[#e9d3ad] to-[#d8b483] shadow-inner">
            {/* warm light pooling from the top */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 70% 0%, rgba(255,224,160,0.75), rgba(255,224,160,0) 60%)",
              }}
            />
            {/* rain streaks on the glass */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(102deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 22px)",
              }}
            />
            {/* the cup */}
            <div className="absolute inset-x-0 bottom-8 flex flex-col items-center">
              <div aria-hidden className="relative mb-1 h-16 w-24">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute bottom-0 block h-16 w-1.5 rounded-full bg-white/70 animate-steam"
                    style={{ left: `${28 + i * 22}%`, animationDelay: `${i * 1.1}s` }}
                  />
                ))}
              </div>
              {/* saucer + cup, simple CSS */}
              <div className="h-14 w-20 rounded-b-[3rem] rounded-t-lg bg-[#4a2f22] shadow-lift" />
              <div className="mt-1 h-2 w-28 rounded-full bg-[#3b2a20]/70" />
            </div>
            <span className="absolute left-4 top-4 font-display text-2xl italic text-henri-espresso/80">
              bonjour
            </span>
          </div>

          {/* Tappable folded menu card */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="tap mt-4 w-full justify-between rounded-card border border-henri-espresso/25 bg-white/50 px-5 text-left text-henri-espresso hover:bg-white/70"
          >
            <span className="font-display text-lg">Today&apos;s table</span>
            <span className="time-chip text-henri-burgundy">{open ? "close" : "open"}</span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-2 rounded-card border border-henri-espresso/15 bg-white/40 p-5 text-henri-espresso">
              {menu.map((m) => (
                <li key={m.dish} className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-display text-lg">{m.dish}</span>
                  <span className="text-sm text-henri-espresso/70">{m.note}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right — the itinerary content */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="order-1 md:order-2"
        >
          <StopDetails stop={stop} next={next} tone="dark" />
        </motion.div>
      </div>
    </SceneFrame>
  );
}
