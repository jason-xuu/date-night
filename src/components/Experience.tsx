"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { stops, dateHuman } from "@/data/itinerary";
import { transitLegs } from "@/data/route";
import { useMotionProfile } from "@/hooks/useMotionProfile";
import Atmosphere from "@/components/scenes/Atmosphere";
import OpeningScene from "@/components/opening/OpeningScene";
import CafeHenriScene from "@/components/scenes/CafeHenriScene";
import HappyMediumScene from "@/components/scenes/HappyMediumScene";
import NoriShinnScene from "@/components/scenes/NoriShinnScene";
import TravelTransition from "@/components/scenes/TravelTransition";
import ItineraryTimeline from "@/components/itinerary/ItineraryTimeline";
import MobileItineraryBar from "@/components/itinerary/MobileItineraryBar";

// Mapbox must never run on the server (static export) — load client-side only.
const RouteMap = dynamic(() => import("@/components/map/RouteMap"), {
  ssr: false,
  loading: () => <div className="mx-auto h-[420px] max-w-5xl px-4 sm:h-[520px]" />,
});

export default function Experience() {
  const [activeId, setActiveId] = useState(stops[0].id);
  const { reducedMotion } = useMotionProfile();
  const barRef = useRef<HTMLDivElement>(null);

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Scroll-spy over the three stop scenes.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    stops.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // GSAP ScrollTrigger: reading-progress bar + gentle background parallax.
  useEffect(() => {
    if (reducedMotion) return;
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        if (barRef.current) {
          gsap.fromTo(
            barRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
            },
          );
        }
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = Number(el.dataset.parallax) || 12;
          gsap.to(el, {
            yPercent: speed,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });
    })();
    return () => ctx?.revert();
  }, [reducedMotion]);

  return (
    <>
      {/* reading progress */}
      <div
        ref={barRef}
        aria-hidden
        className="fixed left-0 top-0 z-40 h-[3px] w-full origin-left scale-x-0 bg-glow"
      />

      <Atmosphere />
      <ItineraryTimeline activeId={activeId} onJump={jump} />

      <main className="relative">
        <OpeningScene />

        <CafeHenriScene stop={stops[0]} next={stops[1]} />
        <TravelTransition {...transitLegs[0]} tone="day" />

        <HappyMediumScene stop={stops[1]} next={stops[2]} />
        <TravelTransition {...transitLegs[1]} tone="evening" />

        <NoriShinnScene stop={stops[2]} />

        <RouteMap />

        <footer className="relative z-10 px-6 pb-28 pt-8 text-center lg:pb-16">
          <p className="font-display text-2xl italic text-cream">Rain or shine. Probably rain.</p>
          <p className="mt-2 text-sm text-cream/55">{dateHuman} · New York</p>
          <button
            type="button"
            onClick={() => jump("top")}
            className="tap mt-4 rounded-pill border border-cream/25 text-sm text-cream/80 hover:bg-cream/10"
          >
            Back to the top
          </button>
        </footer>
      </main>

      <MobileItineraryBar activeId={activeId} onJump={jump} />
    </>
  );
}
