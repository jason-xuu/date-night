"use client";

import { motion } from "framer-motion";
import { dateHuman, stops } from "@/data/itinerary";
import { ArrowDownIcon } from "@/components/itinerary/icons";
import ForecastCard from "./ForecastCard";

/**
 * Full-screen opening. Content is visible on first paint (no JS gate) and rises
 * in as a gentle enhancement, so a stalled animation or a background tab can
 * never leave the page blank. "Begin Our Date" glides down to the first stop.
 */
export default function OpeningScene() {
  const begin = () => {
    document.getElementById(stops[0].id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-28 pt-safe text-center lg:pb-12"
    >
      {/* Transform-only entrance — opacity stays 1 so content is never hidden. */}
      <motion.div
        initial={{ y: 22 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <p className="eyebrow text-cream/60">A date invitation</p>
        <h1 className="mt-5 font-display text-5xl leading-[1.02] text-cream sm:text-7xl md:text-8xl">
          Our Saturday
          <br />
          <span className="italic text-glow">in New York</span>
        </h1>
        <p className="mt-6 time-chip text-cream/80">{dateHuman}</p>
        <p className="mt-4 max-w-md text-base text-cream/70">
          Three neighborhoods, one rainy day — brunch to handrolls, with the
          windows worth sitting beside the whole way through.
        </p>

        <div className="mt-9">
          <ForecastCard />
        </div>

        <button
          type="button"
          onClick={begin}
          className="tap mt-10 rounded-pill bg-glow px-8 text-base font-semibold text-ink shadow-glowsoft transition-transform hover:scale-[1.03] active:scale-95"
        >
          Begin Our Date
        </button>
        <span className="mt-8 animate-bounce text-cream/50" aria-hidden>
          <ArrowDownIcon />
        </span>
      </motion.div>

      {/* animated skyline silhouette */}
      <div aria-hidden data-parallax="-8" className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
        <motion.svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="h-40 w-full opacity-60 sm:h-56"
        >
          <path
            fill="#0c0a0e"
            d="M0 220V120h60v-30h40v30h50V70h30v50h60V95h44v25h40V60h26v60h70V100h40v20h60V50h24v70h80v-30h40v30h60V80h30v40h70V96h40v24h60V64h26v56h80V90h40v30h60V110h50v10h60V70h30v50h60V100h44v20h60V120h60v100z"
          />
        </motion.svg>
      </div>
    </section>
  );
}
