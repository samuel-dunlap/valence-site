import { describe, it, expect } from "vitest";
import { SITE, NAV_LINKS } from "../constants";

describe("Constants", () => {
  describe("SITE", () => {
    it("exports site name", () => {
      expect(SITE.name).toBe("Valence");
    });

    it("exports site URL", () => {
      expect(SITE.url).toBe("https://valenceprivate.com");
    });

    it("exports contact email", () => {
      expect(SITE.email).toContain("@");
      expect(SITE.email).toBe("contact@samueldunlap.org");
    });

    it("exports phone number", () => {
      expect(SITE.phone).toContain("(212)");
    });

    it("exports address", () => {
      expect(SITE.address.city).toBe("New York");
      expect(SITE.address.state).toBe("NY");
    });
  });

  describe("NAV_LINKS", () => {
    it("exports navigation links array", () => {
      expect(Array.isArray(NAV_LINKS)).toBe(true);
      expect(NAV_LINKS.length).toBeGreaterThan(0);
    });

    it("includes home link", () => {
      const homeLink = NAV_LINKS.find((link) => link.href === "/");
      expect(homeLink).toBeDefined();
      expect(homeLink?.label).toBe("Home");
    });

    it("includes about link", () => {
      const aboutLink = NAV_LINKS.find((link) => link.href === "/about");
      expect(aboutLink).toBeDefined();
      expect(aboutLink?.label).toBe("About");
    });
  });
});
