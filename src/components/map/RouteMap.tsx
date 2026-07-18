"use client";

import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { routeLine, routeStops, routeBounds } from "@/data/route";
import { useInViewport } from "@/hooks/useInViewport";
import { stops } from "@/data/itinerary";
import RouteMapFallback from "./RouteMapFallback";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const markerColors = ["#c79a6b", "#ee6c5a", "#dfa24b"];

/**
 * Live Mapbox route — only when a public token is configured, only once scrolled
 * into view (the mapbox-gl bundle is dynamically imported so it never weighs on
 * first paint). Any failure falls back to the static SVG route. The token is a
 * browser token by design; restrict it by allowed URL in the Mapbox dashboard.
 */
export default function RouteMap() {
  const { ref, inView } = useInViewport<HTMLDivElement>("200px");
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!token || !inView || !containerRef.current || failed) return;
    let map: import("mapbox-gl").Map | undefined;
    let cancelled = false;

    (async () => {
      try {
        const mapboxgl = (await import("mapbox-gl")).default;
        if (cancelled || !containerRef.current) return;
        mapboxgl.accessToken = token;
        map = new mapboxgl.Map({
          container: containerRef.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: routeBounds.center,
          zoom: routeBounds.zoom,
          cooperativeGestures: true,
        });

        map.on("error", () => setFailed(true));
        map.on("load", () => {
          if (!map) return;
          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: { type: "LineString", coordinates: routeLine },
            },
          });
          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: { "line-cap": "round", "line-join": "round" },
            paint: { "line-color": "#dfa24b", "line-width": 3, "line-dasharray": [0.5, 2] },
          });

          routeStops.forEach((s, i) => {
            const el = document.createElement("div");
            el.style.cssText = `width:16px;height:16px;border-radius:50%;background:${markerColors[i]};box-shadow:0 0 0 4px ${markerColors[i]}33,0 2px 8px rgba(0,0,0,.5)`;
            new mapboxgl.Marker({ element: el })
              .setLngLat(s.coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 16, closeButton: false }).setHTML(
                  `<strong>${stops[i].name}</strong><br/>${stops[i].timeLabel}`,
                ),
              )
              .addTo(map!);
          });

          const b = new mapboxgl.LngLatBounds();
          routeLine.forEach((c) => b.extend(c));
          map.fitBounds(b, { padding: 70, duration: 1600 });
        });
      } catch {
        setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [inView, failed]);

  return (
    <section id="route" className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <p className="eyebrow text-cream/50">The shape of the day</p>
      <h2 className="mt-3 text-3xl text-cream sm:text-4xl">Queens → Brooklyn → Manhattan</h2>
      <p className="mt-3 max-w-lg text-cream/65">
        A quick loop across the East River and back. Three stops, one umbrella.
      </p>

      <div ref={ref} className="mt-8 h-[420px] w-full sm:h-[520px]">
        {token && !failed ? (
          <div ref={containerRef} className="h-full w-full overflow-hidden rounded-[2rem]" />
        ) : (
          <RouteMapFallback />
        )}
      </div>
    </section>
  );
}
