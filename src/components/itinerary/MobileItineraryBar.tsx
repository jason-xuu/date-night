"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { stops } from "@/data/itinerary";

/**
 * Mobile itinerary — a compact sticky bar above the home indicator. Shows the
 * current stop + progress dots, and expands into a full drawer of large tap
 * targets. Hidden on desktop. Respects the iOS safe area.
 */
export default function MobileItineraryBar({
  activeId,
  onJump,
}: {
  activeId: string;
  onJump: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const active = stops.find((s) => s.id === activeId) ?? stops[0];
  const activeIndex = stops.findIndex((s) => s.id === active.id);

  const jump = (id: string) => {
    onJump(id);
    setOpen(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 lg:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mx-3 mb-2 overflow-hidden rounded-card border border-white/12 bg-ink/90 backdrop-blur-xl"
          >
            <ul className="p-2">
              {stops.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => jump(s.id)}
                    aria-current={s.id === activeId ? "true" : undefined}
                    className="flex min-h-[52px] w-full items-center gap-3 rounded-xl px-3 text-left hover:bg-white/5"
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        s.id === activeId ? "bg-glow" : "bg-cream/30"
                      }`}
                    />
                    <span className="flex-1">
                      <span className="block font-display text-base text-cream">{s.name}</span>
                      <span className="block text-xs text-cream/55">{s.neighborhood}</span>
                    </span>
                    <span className="time-chip text-cream/70">{s.timeLabel}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pb-safe px-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Open itinerary"
          className="flex min-h-[56px] w-full items-center justify-between rounded-card border border-white/12 bg-ink/90 px-4 backdrop-blur-xl"
        >
          <span className="text-left">
            <span className="block text-[11px] uppercase tracking-widest text-cream/50">
              Now · stop {activeIndex + 1} of {stops.length}
            </span>
            <span className="block font-display text-base text-cream">{active.name}</span>
          </span>
          <span className="flex items-center gap-2">
            {stops.map((s) => (
              <span
                key={s.id}
                className={`h-1.5 rounded-full transition-all ${
                  s.id === activeId ? "w-5 bg-glow" : "w-1.5 bg-cream/30"
                }`}
              />
            ))}
          </span>
        </button>
      </div>
    </div>
  );
}
