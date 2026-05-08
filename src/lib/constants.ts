export const SITE = {
  name: "Valence",
  tagline: "Private Relationship Advisory",
  url: "https://valenceprivate.com",
  logoFull: ":  V  A  L  E  N  C  E .",
  logoMark: ":  V .",
  phone: "(212) 263-0000",
  email: "samuel [at] valenceprivate {dot} com",
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
  { href: "/family-consulting", label: "Family Consulting" },
  { href: "/team-collaboration-lab", label: "Team Collaboration Lab" },
  { href: "/depth-performance-training", label: "Depth Performance Training" },
  { href: "/inquire", label: "Inquire" },
] as const;

export const FOOTER_HREFS = new Set(["/", "/about", "/inquire"]);

export const CTA = {
  requestIntroduction: "Request an Introduction",
} as const;
