# Our Saturday in New York

A cinematic, fully-static date-itinerary site for one rainy Saturday across three
NYC neighborhoods — **Café Henri** (LIC brunch) → **Happy Medium** (Greenpoint art
café) → **Nori Shinn** (East Village handrolls). Built to deploy on GitHub Pages
with zero server.

## Stack

Next.js 14 (App Router, `output: "export"`) · TypeScript · Tailwind CSS · Framer
Motion · GSAP ScrollTrigger · Mapbox GL (optional, graceful fallback).

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Validate everything the way CI does:

```bash
npm run typecheck
npm run lint
npm run test
npm run build      # static HTML/CSS/JS → ./out
npx serve out      # test the REAL export, not just the dev server
```

## Design system (the short version)

One continuous rainy day seen through three lit windows. A fixed atmosphere
layer (rain canvas + drifting clouds + distant lightning) sits behind every
scene; a time-of-day wash cross-fades **warm morning → overcast afternoon →
amber night** as you scroll, so the three color worlds read as one day.

- **Type** — Fraunces (display), Instrument Sans (body), Space Mono (times/data).
- **Color** — a shared ink/glass/glow base, then per-scene palettes (Parisian
  cream, art-studio brights, handroll-bar charcoal). See `tailwind.config.ts`.
- **Motion** — one dominant idea per scene (warmth through a cold window /
  color blooming onto paper / one warm light in the dark). Shared easings and
  durations live in `src/lib/motion.ts`.

## Static data

No live APIs. Everything is typed and local:

- `src/data/itinerary.ts` — the three stops (addresses & coordinates verified
  against the venues' own listings, July 2026), times in America/New_York.
- `src/data/weather.ts` — the fixed July 18 forecast that drives the visuals.
- `src/data/route.ts` — the stylized route line + transit legs.

Google Calendar and Google Maps links are generated client-side (`src/lib/`) —
no keys, no APIs.

## Mapbox token (optional)

The route map renders a stylized **static SVG by default** — no token required.
To light up the live Mapbox map, set a **public** browser token:

- Locally: `echo 'NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxxx' > .env.local`
- In CI: add repo secret `NEXT_PUBLIC_MAPBOX_TOKEN`.

The token is exposed in the browser by design — restrict it by **allowed URL**
(your Pages domain) in the Mapbox dashboard. Never commit a secret token. If the
token is missing or Mapbox fails to load, the SVG fallback is shown instead.

## GitHub Pages deployment

Push to `main`. `.github/workflows/deploy.yml` runs typecheck → lint → test →
build, then deploys `out/` via GitHub Pages.

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. (Optional) add the `NEXT_PUBLIC_MAPBOX_TOKEN` secret.

**Base path is automatic.** `actions/configure-pages` detects a project site
(`username.github.io/date-night`) and passes the base path into
`NEXT_PUBLIC_BASE_PATH`, which `next.config.mjs` applies to `basePath` /
`assetPrefix`. A user/root site (`username.github.io`) needs no base path. A
`.nojekyll` file is emitted so `_next/` assets aren't stripped.

- Project site URL: `https://<username>.github.io/date-night/`
- User site URL: `https://<username>.github.io/`

## Accessibility & motion

Semantic landmarks, keyboard-navigable itinerary, visible focus rings, alt/labels
on canvases and icons. `prefers-reduced-motion` holds the sky in one calm state
and disables rain, lightning, parallax, and scroll-linked transforms.

## Known limitations

- Weather is fixed static design data, not a live forecast (intentional).
- The live Mapbox map needs a public token; without one you get the SVG route.
- The doodle canvas saves a PNG to the device only — no cloud storage.
