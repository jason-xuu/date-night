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
  summary: "Warm and cloudy with a little summer rain.",
  detail:
    "Humid and grey for most of the day, with a stray thunderstorm or two. None of it changes the plan. If anything, the rain makes the inside spots nicer.",
  humidity: "humid",
  rainWindows: [
    { label: "Late morning", fromHour: 11, toHour: 12 },
    { label: "Midday", fromHour: 12, toHour: 13 },
    { label: "Mid-afternoon", fromHour: 15, toHour: 16 },
  ],
  umbrellaReminder: "Bring one umbrella. Sharing it is the whole point.",
};
