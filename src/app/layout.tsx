import type { Metadata, Viewport } from "next";
import { Libre_Baskerville, IBM_Plex_Sans } from "next/font/google";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
// import IntroOverlay from "@/components/IntroOverlay/IntroOverlay"; // TEMPORARILY DISABLED - blue screen bug
import Navbar from "@/components/Navbar/Navbar";
import StructuredData from "@/components/StructuredData/StructuredData";
import { SITE } from "@/lib/constants";
import { getOrganizationSchema } from "@/lib/schema";
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
    template: "%s — VALENCE",
  },
  description:
    "Private relationship advisory for high-net-worth men. Expert matchmaking, couples retreats, and relational coaching in New York City and Aspen.",
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Valence — Private Relationship Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-image.png"],
  },
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
        <StructuredData data={getOrganizationSchema()} />
        <ErrorBoundary>
          {/* <IntroOverlay /> */}
          <Navbar />
          <main id="main-content">{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
