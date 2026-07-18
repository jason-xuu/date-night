"use client";

import { useEffect, useRef, useState } from "react";

const palette = ["#3e5fbf", "#3e9e7a", "#ee6c5a", "#e4a94f", "#7b4b8a", "#161318"];

/**
 * A small opt-in drawing surface. `touch-action: none` is scoped to THIS canvas
 * only, so drawing here never blocks page scroll anywhere else. Draw, clear, and
 * save a PNG straight to the device — no cloud, no storage.
 */
export default function DoodleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState(palette[0]);
  const [dirty, setDirty] = useState(false);

  // Size the canvas to its box at DPR for crisp strokes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const pos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent) => {
    drawing.current = true;
    last.current = pos(e);
    canvasRef.current?.setPointerCapture(e.pointerId);
  };

  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !last.current) return;
    const p = pos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    if (!dirty) setDirty(true);
  };

  const end = () => {
    drawing.current = false;
    last.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDirty(false);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Flatten onto paper so the PNG isn't transparent.
    const out = document.createElement("canvas");
    out.width = canvas.width;
    out.height = canvas.height;
    const octx = out.getContext("2d")!;
    octx.fillStyle = "#f7f3ec";
    octx.fillRect(0, 0, out.width, out.height);
    octx.drawImage(canvas, 0, 0);
    const a = document.createElement("a");
    a.href = out.toDataURL("image/png");
    a.download = "our-saturday-doodle.png";
    a.click();
  };

  return (
    <div className="rounded-card border border-medium-plum/20 bg-white/60 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-lg text-medium-plum">Leave a little something</p>
        <div className="flex items-center gap-2" role="radiogroup" aria-label="Brush color">
          {palette.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={color === c}
              aria-label={`Color ${c}`}
              onClick={() => setColor(c)}
              className={`h-7 w-7 rounded-full border-2 transition-transform ${
                color === c ? "scale-110 border-medium-plum" : "border-white"
              }`}
              style={{ background: c }}
            />
          ))}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        className="h-56 w-full touch-none rounded-lg bg-[#f7f3ec] shadow-inner"
        style={{ cursor: "crosshair" }}
        aria-label="Drawing canvas — draw with mouse or finger"
        role="img"
      />
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={clear}
          className="tap flex-1 rounded-pill border border-medium-plum/30 text-medium-plum hover:bg-medium-plum/10"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={save}
          disabled={!dirty}
          className="tap flex-1 rounded-pill bg-medium-plum text-white transition-opacity disabled:opacity-40"
        >
          Save PNG
        </button>
      </div>
    </div>
  );
}
