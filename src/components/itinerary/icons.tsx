/** Tiny inline icon set — no icon dependency, aria-hidden (labels carry meaning). */
const p = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const };

export const PinIcon = () => (
  <svg {...p} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

export const RouteIcon = () => (
  <svg {...p} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="18" r="2.4" />
    <circle cx="18" cy="6" r="2.4" />
    <path d="M8 16c6-1 8-3 8-8" />
  </svg>
);

export const CalendarIcon = () => (
  <svg {...p} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
  </svg>
);

export const UmbrellaIcon = () => (
  <svg {...p} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9Z" />
    <path d="M12 12v6a2.5 2.5 0 0 0 5 0" />
  </svg>
);

export const ArrowDownIcon = () => (
  <svg {...p} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);
