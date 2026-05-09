import type { Metadata } from "next";
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
              An immersive weekend for deepening joy and intimacy in partnership
            </p>
            <p className={sharedStyles.intro}>
              The Couples Retreat is a multi-day training program for driven
              couples to develop the essential knowledge and advanced skills for{" "}
              <strong>interpersonal mastery</strong>.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.legacySection}>
          <div className={styles.legacySectionContent}>
            <SectionHeader title="What&rsquo;s at Stake" />
            <p className={styles.bodyText}>
              Your children are watching your relationship. What they absorb
              becomes their template for love, conflict, and intimacy. When your
              partnership is struggling, what&rsquo;s at risk isn&rsquo;t just
              your connection to each other &mdash; it&rsquo;s what gets passed
              down.
            </p>
          </div>
          <ComparisonColumns
            bare
            stacked
            leftTitle="Unmitigated Costs & Risks"
            leftItems={[
              "Continued power struggles that degrade trust and respect",
              "Growing distance that both partners feel but neither knows how to close",
              "Children absorbing patterns of disconnection, conflict avoidance, or resentment as normal",
              "The slow erosion of partnership into a functional arrangement — organized around logistics, not intimacy",
            ]}
            rightTitle="Benefits of Couples Retreats"
            rightItems={[
              "A partnership your children actually want to emulate",
              "The capacity to repair, not just endure",
              "Deeper intimacy and joy — not just the absence of conflict",
              "Coming back to your family with more presence, energy, and love",
            ]}
          />
        </section>
      </FadeIn>

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
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
