import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, Space_Mono } from "next/font/google";
import { dateHuman } from "@/data/itinerary";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Saturday in New York",
  description: `A rainy-day date across three neighborhoods — ${dateHuman}.`,
};

export const viewport: Viewport = {
  themeColor: "#141019",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // enable iPhone safe-area insets
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
