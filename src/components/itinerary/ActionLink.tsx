"use client";

import type { ReactNode } from "react";

/**
 * External-link primitive for every Maps/Calendar action. Enforces safe rel,
 * a 44px touch target, and a consistent look that each scene tints via
 * `tone` (border/text) rather than re-implementing the button.
 */
export default function ActionLink({
  href,
  children,
  tone = "light",
  solid = false,
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  solid?: boolean;
}) {
  const base =
    "tap rounded-pill text-sm font-medium transition-colors ease-drift focus-visible:outline-offset-4";
  const styles = solid
    ? "bg-glow text-ink hover:bg-glow/90"
    : tone === "dark"
      ? "border border-ink/25 text-ink hover:bg-ink/10"
      : "border border-cream/30 text-cream hover:bg-cream/10";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles}`}
    >
      {children}
    </a>
  );
}
