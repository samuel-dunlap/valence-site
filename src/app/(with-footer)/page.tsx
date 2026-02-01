import type { Metadata } from "next";
import Hero from "@/components/Hero/Hero";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import FadeIn from "@/components/FadeIn/FadeIn";
import { CTA } from "@/lib/constants";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Valence | Private Relationship Advisory",
  description:
    "Finding and mastering lifelong partnership. Relationship advisory for high-net-worth men in New York City and Aspen.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero
        headline={
          <>
            Finding and Mastering
            <br />
            Lifelong Partnership
          </>
        }
        subtitleLines={[
          "Relationship Advisory for High-Net-Worth Men.",
          "NYC + Aspen.",
        ]}
        ctaText={CTA.requestIntroduction}
        ctaHref="/inquire"
        imageSrc="/images/home.webp"
        imageAlt="Couple in New York City"
      />

      <FadeIn>
        <section className={styles.services}>
          <div className={styles.servicesGrid}>
            <ServiceCard
              title="The Couples Retreat"
              tagline="Private weekends for couples."
              description="Integrating luxury hospitality, wellness, and structured relational work to revitalize partnerships, preserve legacy, and deepen relational mastery."
              href="/couples-retreat"
              ctaText="Explore the Retreat"
            />
            <ServiceCard
              title="The Partner Search"
              tagline="Headhunting for your personal life."
              description="Psychologically curated matchmaking and rigorous screening for lifetime partnership with high-quality & high-integrity women."
              href="/partner-search"
              ctaText="Begin the Search"
            />
          </div>
        </section>
      </FadeIn>
    </>
  );
}
