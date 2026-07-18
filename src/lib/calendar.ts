import type { ItineraryStop } from "@/data/itinerary";

/**
 * Build a "Add to Google Calendar" URL entirely client-side — no Calendar API.
 * Times are floating local values interpreted in ctz (America/New_York), so the
 * event lands at the right wall-clock time regardless of the viewer's timezone.
 */

const TZ = "America/New_York";

// "2026-07-18" + "11:30" -> "20260718T113000"
function toCalStamp(dateISO: string, time24: string): string {
  const compactDate = dateISO.replace(/-/g, "");
  const [h, m] = time24.split(":");
  return `${compactDate}T${h}${m}00`;
}

export function googleCalendarUrl(stop: ItineraryStop): string {
  const start = toCalStamp(stop.date, stop.startTime);
  const end = toCalStamp(stop.date, stop.endTime);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: stop.calendar.title,
    dates: `${start}/${end}`,
    details: stop.calendar.details,
    location: stop.address,
    ctz: TZ,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
