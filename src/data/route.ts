import { stops } from "./itinerary";

/**
 * Stylized route through the three neighborhoods. Coordinates are the stops
 * themselves plus a couple of shaping points so the drawn line curves along the
 * waterfront/bridges instead of cutting straight lines through the city.
 */

export interface RoutePoint {
  coordinates: [number, number]; // [lng, lat]
  label?: string;
}

// Ordered path: LIC -> (East River) -> Greenpoint -> (Williamsburg Bridge arc) -> East Village.
export const routeLine: [number, number][] = [
  stops[0].coordinates,
  [-73.9585, 40.7365], // East River, off Gantry Plaza
  stops[1].coordinates,
  [-73.9628, 40.722], // down toward Williamsburg
  [-73.9755, 40.7155], // Williamsburg Bridge arc into Manhattan
  stops[2].coordinates,
];

export const routeStops: RoutePoint[] = stops.map((s) => ({
  coordinates: s.coordinates,
  label: s.name,
}));

// Camera fit for the fallback + initial map view (roughly LIC↔East Village).
export const routeBounds = {
  center: [-73.968, 40.732] as [number, number],
  zoom: 11.6,
};

export const transitLegs = [
  {
    from: "Long Island City",
    to: "Greenpoint",
    hint: "G train, or a quick ride across the creek",
    minutes: "about 20 min",
  },
  {
    from: "Greenpoint",
    to: "East Village",
    hint: "L train straight to 1st Ave",
    minutes: "about 30 min",
  },
];
