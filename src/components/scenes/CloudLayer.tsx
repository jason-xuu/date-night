"use client";

/**
 * Slow-drifting cloud banks — pure CSS transforms on soft radial blobs, so it
 * costs nothing and honours prefers-reduced-motion (the drift animation is
 * neutralised globally in that mode). Sits above the time-of-day wash, below
 * the rain and content.
 */
export default function CloudLayer() {
  const clouds = [
    { top: "8%", size: 620, blur: 40, opacity: 0.5, delay: "0s", dur: "34s" },
    { top: "30%", size: 820, blur: 60, opacity: 0.38, delay: "-8s", dur: "46s" },
    { top: "62%", size: 520, blur: 34, opacity: 0.32, delay: "-16s", dur: "40s" },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[3] overflow-hidden">
      {clouds.map((c, i) => (
        <div
          key={i}
          className="absolute animate-drift rounded-full"
          style={{
            top: c.top,
            left: `${-10 + i * 12}%`,
            width: c.size,
            height: c.size * 0.55,
            opacity: c.opacity,
            filter: `blur(${c.blur}px)`,
            background:
              "radial-gradient(closest-side, rgba(235,238,245,0.9), rgba(235,238,245,0))",
            animationDelay: c.delay,
            animationDuration: c.dur,
          }}
        />
      ))}
    </div>
  );
}
