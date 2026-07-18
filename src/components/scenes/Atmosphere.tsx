"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionProfile } from "@/hooks/useMotionProfile";
import RainLayer from "./RainLayer";
import CloudLayer from "./CloudLayer";

/**
 * The signature: one continuous sky behind the whole page. Three time-of-day
 * washes cross-fade with scroll (warm morning → overcast afternoon → amber
 * night), clouds drift, rain falls, and a distant lightning flash arrives every
 * so often. Under reduced motion the sky holds a single calm state and nothing
 * loops.
 */
export default function Atmosphere() {
  const { reducedMotion } = useMotionProfile();
  const morningRef = useRef<HTMLDivElement>(null);
  const afternoonRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);
  const [flash, setFlash] = useState(0);

  // Scroll-linked time-of-day cross-fade (opacity only → cheap).
  useEffect(() => {
    if (reducedMotion) {
      // Calm, fixed overcast-afternoon sky.
      if (morningRef.current) morningRef.current.style.opacity = "0.35";
      if (afternoonRef.current) afternoonRef.current.style.opacity = "1";
      if (nightRef.current) nightRef.current.style.opacity = "0.5";
      return;
    }
    let raf = 0;
    const clamp = (n: number) => Math.min(1, Math.max(0, n));
    const apply = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? clamp(window.scrollY / max) : 0;
      if (morningRef.current) morningRef.current.style.opacity = `${clamp(1 - p * 1.9)}`;
      if (afternoonRef.current)
        afternoonRef.current.style.opacity = `${clamp(1 - Math.abs(p - 0.5) * 2)}`;
      if (nightRef.current) nightRef.current.style.opacity = `${clamp(p * 1.9 - 0.9)}`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  // Distant lightning — a soft double-flash on a loose, non-jittery cadence.
  useEffect(() => {
    if (reducedMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const wait = 20000 + Math.random() * 16000; // 20–36s apart
      timer = setTimeout(() => {
        if (document.hidden) return schedule();
        setFlash(0.14);
        setTimeout(() => setFlash(0.05), 90);
        setTimeout(() => setFlash(0.18), 190);
        setTimeout(() => setFlash(0), 520);
        schedule();
      }, wait);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <div aria-hidden="true">
      {/* Time-of-day washes (fixed, behind everything). */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          ref={morningRef}
          className="absolute inset-0 transition-opacity duration-atmos"
          style={{
            background:
              "linear-gradient(180deg, #b9a68f 0%, #8f8a86 45%, #5c5b63 100%)",
          }}
        />
        <div
          ref={afternoonRef}
          className="absolute inset-0 opacity-0 transition-opacity duration-atmos"
          style={{
            background:
              "linear-gradient(180deg, #7f8794 0%, #6c6f7d 50%, #3d3b47 100%)",
          }}
        />
        <div
          ref={nightRef}
          className="absolute inset-0 opacity-0 transition-opacity duration-atmos"
          style={{
            background:
              "linear-gradient(180deg, #241f2e 0%, #17141f 55%, #0c0a0e 100%)",
          }}
        />
      </div>

      <CloudLayer />
      <RainLayer />

      {/* Lightning flash. */}
      <div
        className="pointer-events-none fixed inset-0 z-[6] bg-white transition-opacity duration-150"
        style={{ opacity: flash }}
      />
    </div>
  );
}
