import type { ItineraryStop } from "@/data/itinerary";

/**
 * Google Maps deep links via the documented `?api=1` URL scheme — no Maps API,
 * no key. Works on web and hands off to the native app on mobile.
 */

export function mapsSearchUrl(stop: ItineraryStop): string {
  const params = new URLSearchParams({
    api: "1",
    query: `${stop.name}, ${stop.address}`,
  });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}

export function mapsDirectionsUrl(
  to: ItineraryStop,
  from?: ItineraryStop,
): string {
  const params = new URLSearchParams({
    api: "1",
    destination: `${to.name}, ${to.address}`,
    travelmode: "transit",
  });
  if (from) params.set("origin", `${from.name}, ${from.address}`);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
