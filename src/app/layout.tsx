import type { Metadata, Viewport } from "next";
import { Libre_Baskerville, IBM_Plex_Sans } from "next/font/google";
import IntroOverlay from "@/components/IntroOverlay/IntroOverlay";
import Navbar from "@/components/Navbar/Navbar";
import { SITE } from "@/lib/constants";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-libre-baskerville",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#002042",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Valence | Private Relationship Advisory",
    template: "%s — : V A L E N C E .",
  },
  description:
    "Relationship Advisory for High-Net-Worth Men. NYC + Aspen.",
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "Valence | Private Relationship Advisory",
    description: "Relationship Advisory for High-Net-Worth Men. NYC + Aspen.",
    images: [
      {
        url: "/images/logo-mark-large.png",
        alt: "Valence",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Valence | Private Relationship Advisory",
    description: "Relationship Advisory for High-Net-Worth Men. NYC + Aspen.",
    images: ["/images/logo-mark-large.png"],
  },
};

const jsonLd = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${ibmPlexSans.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <IntroOverlay />
        <Navbar />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
