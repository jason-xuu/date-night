"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

/**
 * Every destination is framed like a lit window you're looking into from the
 * rainy street: a rounded interior panel with the scene's own light, set over
 * the shared sky so the same rain falls across all three. One structural device,
 * used consistently — that's the through-line.
 */
export default function SceneFrame({
  id,
  children,
  interior,
  className = "",
}: {
  id: string;
  children: ReactNode;
  /** CSS background for the window interior — the scene's color world. */
  interior: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 py-20 sm:px-6"
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`relative w-full max-w-6xl overflow-hidden rounded-[2rem] shadow-lift ${className}`}
        style={{ background: interior }}
      >
        {/* faint inner window edge */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
        {children}
      </motion.div>
    </section>
  );
}
