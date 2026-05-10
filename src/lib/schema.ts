import { SITE } from "./constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SchemaOrganization = Record<string, any>;

export interface SchemaService {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description: string;
  provider: {
    "@type": "MedicalBusiness";
    name: string;
    url: string;
  };
  areaServed: string[];
  url: string;
}

export function getOrganizationSchema(): SchemaOrganization {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    name: SITE.name,
    description:
      "Psychotherapy and couples therapy on the Upper East Side of Manhattan.",
    url: SITE.url,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7644,
      longitude: -73.9718,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Therapy Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Individual Psychotherapy" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Couples Therapy" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Family Therapy" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Adolescent Therapy" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Child Therapy" },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Depth Performance Training",
          },
        },
      ],
    },
    areaServed: [
      { "@type": "City", name: "New York" },
      { "@type": "Neighborhood", name: "Upper East Side" },
    ],
    priceRange: "$$$",
    medicalSpecialty: "Psychiatric",
    currenciesAccepted: "USD",
    paymentAccepted: "Credit Card, Debit Card",
  };
}

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
      "@type": "MedicalBusiness",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: ["Upper East Side", "New York City"],
    url: `${SITE.url}${path}`,
  };
}
