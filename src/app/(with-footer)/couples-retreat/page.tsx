import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/FadeIn/FadeIn";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import ComparisonColumns from "@/components/ComparisonColumns/ComparisonColumns";
import StructuredData from "@/components/StructuredData/StructuredData";
import { CTA } from "@/lib/constants";
import { getServiceSchema } from "@/lib/schema";
import sharedStyles from "@/styles/page-header.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Couples Retreat",
  description:
    "Multi-day private training program for driven couples to develop advanced relational skills, preserve family legacy, and deepen partnership mastery.",
  alternates: { canonical: "/couples-retreat/" },
};

export default function CouplesRetreatPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "The Couples Retreat",
          "Multi-day private training program for driven couples to develop advanced relational skills, preserve family legacy, and deepen partnership mastery.",
          "/couples-retreat/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>The Couples Retreat</h1>
            <p className={sharedStyles.headerSubtitle}>
              an immersive weekend
              <br />
              for deepening joy and intimacy
              <br />
              in the relationships that matter most
            </p>
            <p className={sharedStyles.intro}>
              The Couples Retreat is a multi-day training program for driven
              couples to develop the essential knowledge and advanced skills for{" "}
              <strong>interpersonal mastery</strong>.
            </p>
          </div>
        </section>
      </FadeIn>

      <div className="navySection">
        <FadeIn>
          <section className={styles.legacySection}>
            <div className={styles.legacySectionContent}>
              <SectionHeader title="What&rsquo;s at Stake" />
              <p className={styles.bodyText}>
                Your family legacy is the ultimate expression of your
                relationship&rsquo;s value. Yet the unique pressures from
                growing and preserving your legacy threaten your relationship.
                When your core relationship is compromised, your family legacy
                is at risk.
              </p>
            </div>
            <ComparisonColumns
              bare
              stacked
              leftTitle="Unmitigated Costs & Risks"
              leftItems={[
                "Continued or protracted power struggles that degrade trust and respect",
                "Critical misalignments on decisions about parenting, finances, and family legacy",
                "Chronic imbalances in time, energy, and resource allocations",
                <>
                  Most wealthy families lose their assets by the third
                  generation &mdash; and in <strong>60%</strong> of these cases,
                  the root cause is a breakdown in family communication and
                  trust.
                </>,
                <>
                  The <strong>#1</strong> cause of divorce is arguments around
                  money, and <strong>40%</strong> of marriages end in divorce,
                  with <strong>50&ndash;77%</strong> loss of net worth for each
                  partner
                </>,
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
            <div className={styles.legacySectionContent}>
              <Image
                src="/images/retreat.webp"
                alt="Luxury retreat with mountain views"
                width={1018}
                height={661}
                unoptimized
                loading="lazy"
                className={styles.sectionImage}
              />
            </div>
          </section>
        </FadeIn>
      </div>

      <FadeIn>
        <section className={styles.bodySection}>
          <SectionHeader title="The Unique Value" />
          <p className={styles.bodyText}>
            Couples will learn more in these few days than in years of therapy.
            Couples therapy focuses on processing past conflicts and wounds. The
            Couples Retreat trains you in the embodied relational skills that
            you actually want, opening up more possibilities. The effectiveness
            of therapy depends on the critically limited knowledge and skills of
            the therapist. The Couples Retreat is a structured program using
            first principles and best practices drawn from an exhaustive
            meta-analysis of the entire body of relational research that exists
            in the library of congress.
          </p>
          <p className={styles.bodyText}>
            Advisors in high-net-worth ecosystems are often well resourced in
            tax and estate advice, family governance tools, succession planning,
            and philanthropic giving. These available services are not
            sufficient for developing the{" "}
            <strong>advanced relational skills</strong> required to more
            effectively preserve and potentiate family legacies.
          </p>
        </section>
      </FadeIn>

      <section className={styles.cta}>
        <ArrowLink
          text={CTA.requestIntroduction}
          href="/inquire"
          variant="dark"
        />
      </section>
    </>
  );
}
