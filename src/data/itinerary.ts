/**
 * The itinerary — single source of truth for all three stops. Addresses and
 * coordinates verified against the venues' own listings (July 2026).
 * Times are wall-clock in America/New_York for Saturday, July 18, 2026.
 */

export type Category = "brunch" | "art" | "dinner";
export type SceneKey = "henri" | "medium" | "nori";

export interface ItineraryStop {
  id: string;
  name: string;
  category: Category;
  scene: SceneKey;
  date: string; // ISO date, America/New_York
  startTime: string; // "HH:mm" 24h local
  endTime: string; // "HH:mm" 24h local
  timeLabel: string; // pretty display, e.g. "11:30 AM"
  neighborhood: string;
  address: string;
  coordinates: [number, number]; // [lng, lat] for Mapbox
  tagline: string;
  description: string;
  note?: string; // walk-in / reservation guidance
  budget?: string;
  calendar: {
    title: string;
    details: string;
  };
  mood: string;
}

export const dateHuman = "Saturday, July 18, 2026";
export const dateISO = "2026-07-18";

export const stops: ItineraryStop[] = [
  {
    id: "cafe-henri",
    name: "Café Henri",
    category: "brunch",
    scene: "henri",
    date: dateISO,
    startTime: "11:30",
    endTime: "12:45",
    timeLabel: "11:30 AM",
    neighborhood: "Long Island City, Queens",
    address: "10-10 50th Ave, Long Island City, NY 11101",
    coordinates: [-73.9545, 40.7423],
    tagline: "A Parisian morning, one stop from Manhattan.",
    description:
      "We start slow. A corner French bistro from the Casa Enrique team — buckwheat crêpes, eggs Benedict, café crème — with the rain drawing lines down the window while we take our time.",
    budget: "$$ · brunch for two",
    calendar: {
      title: "Brunch at Café Henri",
      details:
        "French brunch to start our Saturday — crêpes, eggs Benedict, café crème. 10-10 50th Ave, Long Island City.",
    },
    mood: "warm · relaxed · Parisian morning",
  },
  {
    id: "happy-medium",
    name: "Happy Medium",
    category: "art",
    scene: "medium",
    date: dateISO,
    startTime: "14:15",
    endTime: "16:15",
    timeLabel: "2:15 PM",
    neighborhood: "Greenpoint, Brooklyn",
    address: "224 Franklin St, Brooklyn, NY 11222",
    coordinates: [-73.9578, 40.7296],
    tagline: "Two hours, a table of paint, and no rules.",
    description:
      "An art café with a garden out back. We pick something to make — ceramics, watercolors, a small collage — and spend the wet afternoon getting our hands messy. Reservation at 2:15.",
    note: "Reserved · 2:15 PM · ~2 hours",
    budget: "$$ · project + a coffee each",
    calendar: {
      title: "Happy Medium — art café",
      details:
        "Reserved art session — pick a project and make something. 224 Franklin St, Greenpoint. Reservation at 2:15 PM.",
    },
    mood: "artistic · playful · colorful",
  },
  {
    id: "nori-shinn",
    name: "Nori Shinn",
    category: "dinner",
    scene: "nori",
    date: dateISO,
    startTime: "17:15",
    endTime: "19:00",
    timeLabel: "5:15 PM",
    neighborhood: "East Village, Manhattan",
    address: "210 1st Ave, New York, NY 10009",
    coordinates: [-73.984, 40.7316],
    tagline: "Warm counter, cold rain, handrolls in order.",
    description:
      "We end at a small handroll bar on 1st Ave — seaweed crisp, rice warm, one roll at a time across the counter. Walk-in, so we arrive early and let the evening settle in around us.",
    note: "Walk-in · arrive 5:00–5:30 to beat the wait",
    budget: "$$$ · omakase-style handroll set",
    calendar: {
      title: "Dinner at Nori Shinn",
      details:
        "Handroll dinner to close the day — walk-in handroll bar. 210 1st Ave, East Village. Aim to arrive 5:00–5:30 PM.",
    },
    mood: "intimate · dark · elegant",
  },
];

export const stopById = (id: string) => stops.find((s) => s.id === id);
