"use client";

import { routeLine, routeStops } from "@/data/route";

const W = 800;
const H = 460;
const PAD = 70;
const dotColors = ["#c79a6b", "#ee6c5a", "#dfa24b"]; // henri, medium, nori

/**
 * Stylized static route — the default map, and the fallback when Mapbox has no
 * token or fails to load. Projects the real coordinates into an SVG so the shape
 * of the journey (LIC → Greenpoint → East Village) stays truthful.
 */
export default function RouteMapFallback() {
  const lngs = routeLine.map((p) => p[0]);
  const lats = routeLine.map((p) => p[1]);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);

  const project = ([lng, lat]: [number, number]): [number, number] => {
    const x = ((lng - minLng) / (maxLng - minLng || 1)) * (W - 2 * PAD) + PAD;
    const y = ((maxLat - lat) / (maxLat - minLat || 1)) * (H - 2 * PAD) + PAD;
    return [x, y];
  };

  const path = routeLine
    .map((p, i) => {
      const [x, y] = project(p);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#171420] to-[#0c0a0e]">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Route from Long Island City to Greenpoint to the East Village">
        {/* faint grid to read as a map */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />

        {/* route line */}
        <path d={path} fill="none" stroke="#dfa24b" strokeWidth="2.5" strokeDasharray="2 8" strokeLinecap="round" opacity="0.9" />

        {/* stops */}
        {routeStops.map((s, i) => {
          const [x, y] = project(s.coordinates);
          const flip = x > W - 180;
          return (
            <g key={s.label}>
              <circle cx={x} cy={y} r="16" fill={dotColors[i]} opacity="0.18" />
              <circle cx={x} cy={y} r="6" fill={dotColors[i]} />
              <text
                x={flip ? x - 14 : x + 14}
                y={y - 6}
                textAnchor={flip ? "end" : "start"}
                className="fill-cream font-display"
                style={{ fontSize: 17 }}
              >
                {s.label}
              </text>
              <text
                x={flip ? x - 14 : x + 14}
                y={y + 12}
                textAnchor={flip ? "end" : "start"}
                fill="rgba(244,235,221,0.55)"
                style={{ fontSize: 11, letterSpacing: 1 }}
              >
                {["11:30 AM", "2:15 PM", "5:15 PM"][i]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
