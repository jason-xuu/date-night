"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reports whether an element is on screen. Scenes use it to pause expensive
 * canvas/GSAP work when scrolled away (perf + battery).
 */
export function useInViewport<T extends Element = HTMLDivElement>(
  rootMargin = "0px",
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true); // no observer support → assume visible, never hide content
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0.01 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
