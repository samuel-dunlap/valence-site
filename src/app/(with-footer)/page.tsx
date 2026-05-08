import type { Metadata } from "next";
import Hero from "@/components/Hero/Hero";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import FadeIn from "@/components/FadeIn/FadeIn";
import { CTA } from "@/lib/constants";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Valence | Private Relationship Advisory",
  description:
    "Deepening joy in the relationships that matter most. Relationship advisory for high-net-worth couples and families in New York City and Aspen.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero
        headline={
          <>
            Deepening Joy in the
            <br />
            Relationships That Matter Most
          </>
        }
        subtitleLines={[
          "Relationship Advisory for High-Net-Worth Couples & Families.",
          "NYC + Aspen.",
        ]}
        ctaText={CTA.requestIntroduction}
        ctaHref="/inquire"
        imageSrc="/images/family.webp"
        imageAlt="Multigenerational family"
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
              title="Family Consulting"
              tagline="Private consulting for families."
              description="Navigating the relationships that matter most — the ones that money alone can't solve."
              href="/family-consulting"
              ctaText="Learn More"
            />
            <ServiceCard
              title="Team Collaboration Lab"
              tagline="Unlock peak team effectiveness."
              description="A 3-hour diagnostic that pinpoints opportunities for team performance improvement. Designed for senior leadership teams of 3-10 people."
              href="/team-collaboration-lab"
              ctaText="Learn More"
            />
            <ServiceCard
              title="Depth Performance Training"
              tagline="More effective communication and decision-making."
              description="Private advisory for senior leaders and executives."
              href="/depth-performance-training"
              ctaText="Learn More"
            />
          </div>
        </section>
      </FadeIn>
    </>
  );
}
