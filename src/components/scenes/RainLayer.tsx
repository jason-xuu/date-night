"use client";

import { useEffect, useRef } from "react";
import { useMotionProfile, particleBudget } from "@/hooks/useMotionProfile";

interface Drop {
  x: number;
  y: number;
  len: number;
  vy: number;
  a: number;
}

/**
 * Ambient diagonal drizzle on a full-viewport canvas. Subtle by design — a few
 * hundred faint streaks, never a downpour. Pauses entirely under reduced motion
 * or when the tab is hidden; particle count scales with the device profile.
 */
export default function RainLayer({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signals = useMotionProfile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = Math.round(particleBudget(signals, 260) * intensity);
    if (count === 0) return; // reduced motion → static, no canvas work

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const drops: Drop[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      drops.length = 0;
      for (let i = 0; i < count; i++) {
        drops.push({
          x: Math.random() * w,
          y: Math.random() * h,
          len: 8 + Math.random() * 14,
          vy: 3.2 + Math.random() * 4.5,
          a: 0.06 + Math.random() * 0.16,
        });
      }
    };

    resize();
    seed();

    const wind = 1.1; // gentle diagonal
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (const d of drops) {
        ctx.strokeStyle = `rgba(210, 224, 245, ${d.a})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - wind * (d.len / 3), d.y + d.len);
        ctx.stroke();
        d.y += d.vy;
        d.x -= wind;
        if (d.y > h) {
          d.y = -d.len;
          d.x = Math.random() * w;
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => {
      resize();
      seed();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, [signals, intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] h-full w-full"
    />
  );
}
