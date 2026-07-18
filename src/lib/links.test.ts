import { describe, it, expect } from "vitest";
import { stops } from "../data/itinerary";
import { googleCalendarUrl } from "./calendar";
import { mapsSearchUrl, mapsDirectionsUrl } from "./maps";

const henri = stops[0];
const medium = stops[1];

describe("googleCalendarUrl", () => {
  it("encodes floating local times in the New York timezone", () => {
    const url = new URL(googleCalendarUrl(henri));
    expect(url.searchParams.get("dates")).toBe("20260718T113000/20260718T124500");
    expect(url.searchParams.get("ctz")).toBe("America/New_York");
    expect(url.searchParams.get("text")).toBe("Brunch at Café Henri");
    expect(url.searchParams.get("location")).toBe(henri.address);
  });
});

describe("maps links", () => {
  it("search link targets the venue", () => {
    const url = new URL(mapsSearchUrl(medium));
    expect(url.searchParams.get("api")).toBe("1");
    expect(url.searchParams.get("query")).toContain("Happy Medium");
  });

  it("directions link carries origin + transit mode when a from-stop is given", () => {
    const url = new URL(mapsDirectionsUrl(medium, henri));
    expect(url.searchParams.get("origin")).toContain("Café Henri");
    expect(url.searchParams.get("destination")).toContain("Happy Medium");
    expect(url.searchParams.get("travelmode")).toBe("transit");
  });
});
