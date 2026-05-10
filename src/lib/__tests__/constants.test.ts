import { describe, it, expect } from "vitest";
import { SITE, NAV_LINKS } from "../constants";

describe("Constants", () => {
  describe("SITE", () => {
    it("exports site name", () => {
      expect(SITE.name).toBe("Upper East Side Therapy");
    });

    it("exports site URL", () => {
      expect(SITE.url).toBe("https://uppereastsidetherapy.com");
    });

    it("exports contact email", () => {
      expect(SITE.email).toBe("info [at] uppereastsidetherapy {dot} com");
    });

    it("exports phone number", () => {
      expect(SITE.phone).toContain("(720)");
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

    it("includes inquire link", () => {
      const inquireLink = NAV_LINKS.find((link) => link.href === "/inquire/");
      expect(inquireLink).toBeDefined();
      expect(inquireLink?.label).toBe("Inquire");
    });
  });
});
