import type { Config } from "tailwindcss";

/**
 * Design system — "One rainy day, three windows."
 * A shared atmosphere (rain, cloud, warm light) links three distinct color
 * worlds. Bold only in the signature (the weather + light); quiet everywhere else.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Connective tissue — the night/glass/light that runs through every scene.
        ink: {
          DEFAULT: "#141019", // warm aubergine-black (romantic, not gloomy)
          glass: "#2a2733",
          soft: "#221d2b",
        },
        glow: "#f2c879", // warm indoor light
        cream: "#f4ebdd",

        // Café Henri — Parisian rainy morning.
        henri: {
          cream: "#f3e9d8",
          espresso: "#3b2a20",
          burgundy: "#7a2e33",
          tan: "#c79a6b",
          light: "#e8b563",
        },
        // Happy Medium — art studio, colorful but composed.
        medium: {
          paper: "#f7f3ec",
          cobalt: "#3e5fbf",
          viridian: "#3e9e7a",
          coral: "#ee6c5a",
          ochre: "#e4a94f",
          plum: "#7b4b8a",
        },
        // Nori Shinn — intimate rainy night.
        nori: {
          charcoal: "#161318",
          sumi: "#0c0a0e",
          indigo: "#20344a",
          lantern: "#dfa24b",
          red: "#9b3a34",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        lift: "0 20px 60px -20px rgba(20, 16, 25, 0.5)",
        glowsoft: "0 0 40px -8px rgba(242, 200, 121, 0.45)",
        card: "0 10px 40px -16px rgba(20, 16, 25, 0.4)",
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.22, 1, 0.36, 1)", // gentle overshoot-free ease-out
        drift: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        atmos: "1200ms",
      },
      keyframes: {
        steam: {
          "0%": { opacity: "0", transform: "translateY(0) scaleX(1)" },
          "40%": { opacity: "0.5" },
          "100%": { opacity: "0", transform: "translateY(-42px) scaleX(1.6)" },
        },
        drift: {
          "0%": { transform: "translateX(-4%)" },
          "100%": { transform: "translateX(4%)" },
        },
        flicker: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        steam: "steam 4s ease-out infinite",
        drift: "drift 26s ease-in-out infinite alternate",
        flicker: "flicker 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
