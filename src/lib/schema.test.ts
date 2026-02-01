import { describe, it, expect } from "vitest";
import { getOrganizationSchema, getServiceSchema } from "./schema";
import { SITE } from "./constants";

describe("Schema utilities", () => {
  describe("getOrganizationSchema", () => {
    it("returns valid JSON-LD organization schema", () => {
      const schema = getOrganizationSchema();

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("ProfessionalService");
      expect(schema.name).toBe(SITE.name);
      expect(schema.url).toBe(SITE.url);
      expect(schema.telephone).toBe(SITE.phone);
      expect(schema.email).toBe(SITE.email);
    });

    it("includes complete address from SITE constants", () => {
      const schema = getOrganizationSchema();

      expect(schema.address["@type"]).toBe("PostalAddress");
      expect(schema.address.streetAddress).toBe(SITE.address.street);
      expect(schema.address.addressLocality).toBe(SITE.address.city);
      expect(schema.address.addressRegion).toBe(SITE.address.state);
      expect(schema.address.postalCode).toBe(SITE.address.zip);
      expect(schema.address.addressCountry).toBe("US");
    });

    it("includes founder information", () => {
      const schema = getOrganizationSchema();

      expect(schema.founder["@type"]).toBe("Person");
      expect(schema.founder.name).toBe("Samuel Dunlap");
      expect(schema.founder.jobTitle).toBe(
        "Relationship Advisor & Researcher"
      );
    });

    it("includes area served and price range", () => {
      const schema = getOrganizationSchema();

      expect(schema.areaServed).toEqual(["New York City", "Aspen"]);
      expect(schema.priceRange).toBe("$$$");
    });
  });

  describe("getServiceSchema", () => {
    it("returns valid JSON-LD service schema", () => {
      const schema = getServiceSchema(
        "Test Service",
        "Test Description",
        "/test-service/"
      );

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Service");
      expect(schema.name).toBe("Test Service");
      expect(schema.description).toBe("Test Description");
      expect(schema.url).toBe(`${SITE.url}/test-service/`);
    });

    it("includes provider reference with SITE constants", () => {
      const schema = getServiceSchema("Test", "Desc", "/test/");

      expect(schema.provider["@type"]).toBe("ProfessionalService");
      expect(schema.provider.name).toBe(SITE.name);
      expect(schema.provider.url).toBe(SITE.url);
    });

    it("includes area served", () => {
      const schema = getServiceSchema("Test", "Desc", "/test/");

      expect(schema.areaServed).toEqual(["New York City", "Aspen"]);
    });

    it("constructs full URL from SITE.url and path", () => {
      const schema = getServiceSchema("Test", "Desc", "/couples-retreat/");

      expect(schema.url).toBe(`${SITE.url}/couples-retreat/`);
    });
  });
});
