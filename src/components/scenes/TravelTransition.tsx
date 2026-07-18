"use client";

import { motion } from "framer-motion";
import { ArrowDownIcon } from "@/components/itinerary/icons";

/**
 * Buffer between destinations — deliberately secondary. A single animated route
 * line with a moving dot (the train), the two neighborhood names, and the
 * travel time. Not a transit app; just enough to feel the distance and the
 * change in light. `tone="evening"` warms the palette toward night.
 */
export default function TravelTransition({
  from,
  to,
  hint,
  minutes,
  tone = "day",
}: {
  from: string;
  to: string;
  hint: string;
  minutes: string;
  tone?: "day" | "evening";
}) {
  const line = tone === "evening" ? "#dfa24b" : "#c7d0dc";
  const dot = tone === "evening" ? "#dfa24b" : "#e8b563";

  return (
    <section
      aria-label={`Travel from ${from} to ${to}`}
      className="relative z-10 flex min-h-[52svh] items-center justify-center px-6 py-16"
    >
      <div className="w-full max-w-3xl text-center">
        <p className="eyebrow text-cream/50">{minutes} · in transit</p>

        <div className="mt-8 flex items-center justify-between gap-4 text-cream">
          <span className="font-display text-xl italic sm:text-2xl">{from}</span>

          {/* the line + moving train dot */}
          <div className="relative mx-2 h-px flex-1" style={{ background: `${line}55` }}>
            <motion.span
              initial={{ left: "0%" }}
              whileInView={{ left: "100%" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: dot, boxShadow: `0 0 16px ${dot}` }}
            />
          </div>

          <span className="font-display text-xl italic sm:text-2xl">{to}</span>
        </div>

        <p className="mt-6 text-sm text-cream/60">{hint}</p>
        <div className="mt-8 flex justify-center text-cream/40">
          <ArrowDownIcon />
        </div>
      </div>
    </section>
  );
}
