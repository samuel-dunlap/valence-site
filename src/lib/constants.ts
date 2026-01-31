export const SITE = {
  name: "Valence",
  tagline: "Private Relationship Advisory",
  url: "https://valenceprivate.com",
  logoFull: ":  V  A  L  E  N  C  E .",
  logoMark: ":  V .",
  phone: "(212) 263-0000",
  email: "contact@samueldunlap.org",
  address: {
    street: "654 Madison Avenue",
    city: "New York",
    state: "NY",
    zip: "10065",
  },
  copyright: `\u00A9 ${new Date().getFullYear()} Valence Relationship Advisory`,
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/couples-retreat", label: "Couples Retreat" },
  { href: "/partner-search", label: "Partner Search" },
  { href: "/inquire", label: "Inquire" },
] as const;

export const FOOTER_HREFS = new Set(['/', '/about', '/inquire']);
