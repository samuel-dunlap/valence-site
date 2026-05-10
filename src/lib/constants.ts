export const SITE = {
  name: "Upper East Side Therapy",
  tagline: "Psychotherapy & Couples Therapy",
  url: "https://uppereastsidetherapy.com",
  logoFull: "Upper East Side Therapy",
  logoMark: "Upper East Side Therapy",
  phone: "(212) 930-9380",
  address: {
    street: "654 Madison Avenue",
    city: "New York",
    state: "NY",
    zip: "10065",
  },
  copyright: `© ${new Date().getFullYear()} Upper East Side Therapy`,
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/our-approach/", label: "Our Approach" },
  { href: "/faq/", label: "FAQ" },
  { href: "/inquire/", label: "Inquire" },
] as const;

export const SERVICE_LINKS = [
  { href: "/psychotherapy-for-adults/", label: "Psychotherapy for Adults" },
  {
    href: "/psychotherapy-for-young-adults/",
    label: "Psychotherapy for Young Adults",
  },
  {
    href: "/psychotherapy-for-adolescents/",
    label: "Psychotherapy for Adolescents",
  },
  {
    href: "/psychotherapy-for-children/",
    label: "Psychotherapy for Children",
  },
  { href: "/couples-therapy/", label: "Couples Therapy" },
  { href: "/family-counseling/", label: "Family Counseling" },
  { href: "/therapy-for-anxiety/", label: "Therapy for Anxiety" },
  { href: "/therapy-for-ptsd/", label: "Therapy for PTSD" },
  {
    href: "/therapy-for-college-students/",
    label: "Therapy for College Students",
  },
  { href: "/therapy-for-creatives/", label: "Therapy for Creatives & HSPs" },
  { href: "/wellness-coaching/", label: "Wellness Coaching" },
  { href: "/career-coaching/", label: "Career Coaching" },
  {
    href: "/depth-performance-training/",
    label: "Depth Performance Training",
  },
] as const;

export const FOOTER_HREFS = new Set([
  "/",
  "/our-approach/",
  "/faq/",
  "/inquire/",
]);

export const CTA = {
  requestIntroduction: "Request an Introduction",
  getInTouch: "Get in Touch",
} as const;
