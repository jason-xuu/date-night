"use client";

import { useEffect, useRef } from "react";
import { useMotionProfile } from "@/hooks/useMotionProfile";

const colors = ["#3e5fbf", "#3e9e7a", "#ee6c5a", "#e4a94f", "#7b4b8a"];

/**
 * Desktop-only ambient flourish: a soft paint trail that follows the cursor
 * inside its parent and fades out. pointer-events:none so it never intercepts
 * clicks or scroll. Off entirely on touch devices and under reduced motion.
 */
export default function PaintTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { coarsePointer, reducedMotion } = useMotionProfile();

  useEffect(() => {
    if (coarsePointer || reducedMotion) return;
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let hue = 0;
    const fit = () => {
      const r = parent.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      ctx.fillStyle = colors[hue % colors.length];
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
      hue++;
    };

    // Fade the whole layer gently each frame.
    let raf = 0;
    const fade = () => {
      ctx.globalAlpha = 0.06;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(fade);
    };
    raf = requestAnimationFrame(fade);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", fit);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", fit);
    };
  }, [coarsePointer, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full rounded-[2rem]"
    />
  );
}
