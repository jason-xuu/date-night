"use client";

import { stops } from "@/data/itinerary";

/**
 * Desktop-only itinerary spine — a slim subway-style line down the left edge.
 * Current stop highlighted; every stop is a real button that glides the page to
 * that scene. Hidden on mobile (see MobileItineraryBar).
 */
export default function ItineraryTimeline({
  activeId,
  onJump,
}: {
  activeId: string;
  onJump: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Itinerary"
      className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ol className="relative flex flex-col gap-9 pl-4">
        {/* connecting line */}
        <span
          aria-hidden
          className="absolute left-[3px] top-1 h-[calc(100%-0.5rem)] w-px bg-cream/20"
        />
        {stops.map((s) => {
          const active = s.id === activeId;
          return (
            <li key={s.id} className="relative">
              <button
                type="button"
                onClick={() => onJump(s.id)}
                aria-current={active ? "true" : undefined}
                className="group flex items-center gap-3 text-left"
              >
                <span
                  className={`relative z-10 -ml-4 block h-[9px] w-[9px] rounded-full transition-all ${
                    active ? "scale-150 bg-glow" : "bg-cream/40 group-hover:bg-cream/70"
                  }`}
                />
                <span
                  className={`transition-all ${
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                  }`}
                >
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-cream/60">
                    {s.timeLabel}
                  </span>
                  <span className="block font-display text-sm text-cream">{s.name}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
