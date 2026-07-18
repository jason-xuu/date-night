/**
 * Fixed forecast for Saturday, July 18, 2026 (NYC). Static by design — no live
 * weather API. Drives the site's atmosphere (rain timing, cloud cover, light).
 */

export interface RainWindow {
  /** Human label, e.g. "Late morning". */
  label: string;
  /** 24h start/end used to gate heavier rain in the atmosphere layer. */
  fromHour: number;
  toHour: number;
}

export interface Weather {
  date: string;
  tempLowF: number;
  tempHighF: number;
  summary: string;
  detail: string;
  humidity: "humid" | "moderate" | "dry";
  /** Windows where rain is most likely — used for subtle intensity cues only. */
  rainWindows: RainWindow[];
  umbrellaReminder: string;
}

export const weather: Weather = {
  date: "2026-07-18",
  tempLowF: 76,
  tempHighF: 79,
  summary: "Warm and cloudy with occasional summer rain.",
  detail:
    "Warm, humid, and mostly cloudy through the day, with a chance of passing thunderstorms. Nothing to reroute us — just enough rain to make the windows worth sitting beside.",
  humidity: "humid",
  rainWindows: [
    { label: "Late morning", fromHour: 11, toHour: 12 },
    { label: "Midday", fromHour: 12, toHour: 13 },
    { label: "Mid-afternoon", fromHour: 15, toHour: 16 },
  ],
  umbrellaReminder: "Bring one umbrella. Sharing it is the whole point.",
};
