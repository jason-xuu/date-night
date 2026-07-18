"use client";

import type { ItineraryStop } from "@/data/itinerary";
import { googleCalendarUrl } from "@/lib/calendar";
import { mapsSearchUrl, mapsDirectionsUrl } from "@/lib/maps";
import ActionLink from "./ActionLink";
import { PinIcon, RouteIcon, CalendarIcon } from "./icons";

/**
 * The content block shared by every scene: the itinerary facts + the three
 * external actions. Scenes pass their own `tone` so the same card reads right
 * on cream (Café Henri) and on charcoal (Nori Shinn).
 */
export default function StopDetails({
  stop,
  next,
  tone = "light",
}: {
  stop: ItineraryStop;
  next?: ItineraryStop;
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-ink/70" : "text-cream/75";
  const strong = tone === "dark" ? "text-ink" : "text-cream";

  return (
    <div className={strong}>
      <p className={`eyebrow ${tone === "dark" ? "text-ink/60" : "text-cream/60"}`}>
        {stop.neighborhood}
      </p>
      <h2 className="mt-3 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{stop.name}</h2>

      <p className={`mt-3 max-w-md font-display text-lg italic ${muted}`}>{stop.tagline}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="time-chip">{stop.timeLabel}</span>
        {stop.note && <span className={`text-sm ${muted}`}>{stop.note}</span>}
      </div>

      <p className={`mt-5 max-w-lg text-base leading-relaxed ${muted}`}>{stop.description}</p>

      <address className={`mt-5 not-italic text-sm ${muted}`}>
        {stop.address}
        {stop.budget && <span className="mx-2">·</span>}
        {stop.budget}
      </address>

      <div className="mt-7 flex flex-wrap gap-3">
        <ActionLink href={mapsSearchUrl(stop)} tone={tone} solid>
          <PinIcon /> Open in Maps
        </ActionLink>
        <ActionLink href={googleCalendarUrl(stop)} tone={tone}>
          <CalendarIcon /> Add to Calendar
        </ActionLink>
        {next && (
          <ActionLink href={mapsDirectionsUrl(next, stop)} tone={tone}>
            <RouteIcon /> Directions to {next.name}
          </ActionLink>
        )}
      </div>
    </div>
  );
}
