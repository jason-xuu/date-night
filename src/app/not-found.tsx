import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="eyebrow text-cream/50">Off the itinerary</p>
      <h1 className="font-display text-4xl text-cream">This street isn&apos;t on our map</h1>
      <p className="max-w-sm text-cream/70">
        The page you were looking for wandered off. Let&apos;s get back to the date.
      </p>
      <Link
        href="/"
        className="tap rounded-pill bg-glow px-6 font-semibold text-ink"
      >
        Back to the start
      </Link>
    </main>
  );
}
