import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/FadeIn/FadeIn";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import ComparisonColumns from "@/components/ComparisonColumns/ComparisonColumns";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Couples Retreat",
  description:
    "Multi-day private training program for driven couples to develop advanced relational skills, preserve family legacy, and deepen partnership mastery.",
  alternates: { canonical: "/couples-retreat" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "The Couples Retreat",
  description:
    "Multi-day private training program for driven couples to develop advanced relational skills, preserve family legacy, and deepen partnership mastery.",
  provider: {
    "@type": "ProfessionalService",
    name: "Valence",
    url: "https://valenceprivate.com",
  },
  areaServed: ["New York City", "Aspen"],
  url: "https://valenceprivate.com/couples-retreat",
};

export default function CouplesRetreatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FadeIn>
        <section className={`navySection ${styles.header}`}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>The Couples Retreat</h1>
            <p className={styles.intro}>
              Your family legacy is the ultimate expression of your
              relationship&rsquo;s value. Yet the unique pressures from growing
              and preserving your legacy threaten your relationship. When your
              core relationship is compromised, your family legacy is at risk.
            </p>
            <div className={styles.statsGrid}>
              <div className={styles.statCell}>
                <span className={styles.statNumber}>90%</span>
                <p className={styles.statDescription}>
                  of wealthy families have lost their assets by the third
                  generation
                </p>
              </div>
              <div className={styles.statCell}>
                <span className={styles.statNumber}>60%</span>
                <p className={styles.statDescription}>
                  of asset loss from breakdowns in family communication and
                  trust
                </p>
              </div>
              <div className={styles.statCell}>
                <span className={styles.statNumber}>#1</span>
                <p className={styles.statDescription}>
                  cause of divorce: arguments around money
                </p>
              </div>
              <div className={styles.statCell}>
                <span className={styles.statNumber}>40%</span>
                <p className={styles.statDescription}>
                  of marriages end in divorce, with 50&ndash;77% loss of net
                  worth
                </p>
              </div>
            </div>
            <p>
              High net-worth partners are often well resourced in tax and estate
              advice, family governance tools, succession planning, and
              philanthropic giving. These available services are not sufficient
              for developing the{" "}
              <strong>advanced relational skills</strong> required to more
              effectively preserve and potentiate family legacies.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.bodySection}>
          <SectionHeader title="The Method" />
          <p className={styles.bodyText}>
            The Couples Retreat is a multi-day training program for driven
            couples to develop the essential knowledge and advanced skills for{" "}
            <strong>interpersonal mastery</strong>. Couples will learn more in
            these few days than in years of therapy.
          </p>
        </section>
        <section className={styles.bodySection}>
          <SectionHeader title="The Setting" />
          <p className={styles.bodyText}>
            We partner with the world&rsquo;s most exclusive properties that
            provide the clean container designed for clarity, rest, and
            physiological reset. Outside of our sessions, you will have space for
            high-quality time together&mdash;moving your bodies, engaging in
            wellness activities, and simply enjoying the beauty of the setting.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <div className={styles.accentWrap}>
          <Image
            src="/images/retreat.webp"
            alt="Luxury retreat with mountain views"
            width={600}
            height={400}
            unoptimized
            className={styles.accentImage}
          />
        </div>
      </FadeIn>

      <FadeIn>
        <ComparisonColumns
          leftTitle="Unmitigated Costs & Risks"
          leftItems={[
            "Continued or protracted power struggles that degrade trust and respect",
            "Critical misalignments on decisions about parenting, finances, and family legacy",
            "Chronic imbalances in time, energy, and resource allocations",
            "Fragilities in family wealth and intergenerational well-being",
          ]}
          rightTitle="Benefits of Couples Retreats"
          rightItems={[
            "Greater personal integrity and dignity",
            "Demonstrable skills and behaviors of relational intimacy and emotional maturity",
            "Stronger communication and deeper intimacies even when navigating conflict",
            "Greater coherence around shared vision and legacy",
            "Deeper joy in partnership, family, and life",
          ]}
        />
      </FadeIn>

      <section className={`navySection ${styles.cta}`}>
        <ArrowLink
          text="Request an Introduction"
          href="/inquire"
          variant="light"
        />
      </section>
    </>
  );
}
