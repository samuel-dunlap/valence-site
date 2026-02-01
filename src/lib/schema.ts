import { SITE } from "./constants";

export interface SchemaOrganization {
  "@context": "https://schema.org";
  "@type": "ProfessionalService";
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  founder: {
    "@type": "Person";
    name: string;
    jobTitle: string;
  };
  areaServed: string[];
  priceRange: string;
}

export interface SchemaService {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description: string;
  provider: {
    "@type": "ProfessionalService";
    name: string;
    url: string;
  };
  areaServed: string[];
  url: string;
}

/**
 * Generates Schema.org structured data for the organization
 * @returns Organization schema object
 */
export function getOrganizationSchema(): SchemaOrganization {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    description: "Private Relationship Advisory for High-Net-Worth Men",
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      name: "Samuel Dunlap",
      jobTitle: "Relationship Advisor & Researcher",
    },
    areaServed: ["New York City", "Aspen"],
    priceRange: "$$$",
  };
}

/**
 * Generates Schema.org structured data for a service offering
 * @param name - Service name
 * @param description - Service description
 * @param path - Service page path (e.g., "/couples-retreat/")
 * @returns Service schema object
 */
export function getServiceSchema(
  name: string,
  description: string,
  path: string
): SchemaService {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "ProfessionalService",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: ["New York City", "Aspen"],
    url: `${SITE.url}${path}`,
  };
}
