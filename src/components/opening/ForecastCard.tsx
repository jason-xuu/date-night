"use client";

import { weather } from "@/data/weather";
import { UmbrellaIcon } from "@/components/itinerary/icons";

/** Small static forecast card — the fixed July 18 outlook, not a live feed. */
export default function ForecastCard() {
  return (
    <div className="glass-card mx-auto max-w-sm p-5 text-left">
      <div className="flex items-center gap-3">
        <span className="text-glow">
          <UmbrellaIcon />
        </span>
        <p className="font-display text-lg text-cream">{weather.summary}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-cream/70">{weather.detail}</p>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="time-chip text-cream">
          {weather.tempLowF}°–{weather.tempHighF}°F
        </span>
        <span className="text-sm text-cream/60">{weather.umbrellaReminder}</span>
      </div>
    </div>
  );
}
