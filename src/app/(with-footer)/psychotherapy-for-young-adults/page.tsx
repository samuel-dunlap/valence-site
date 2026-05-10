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
  title: "Psychotherapy for Young Adults",
  description:
    "Individual psychotherapy for young adults on the Upper East Side of Manhattan. Building self-knowledge, emotional capacity, and clarity of direction.",
  alternates: { canonical: "/psychotherapy-for-young-adults/" },
};

export default function PsychotherapyForYoungAdultsPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Psychotherapy for Young Adults",
          "Individual psychotherapy for young adults on the Upper East Side of Manhattan. Building self-knowledge, emotional capacity, and clarity of direction.",
          "/psychotherapy-for-young-adults/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>
              Psychotherapy for Young Adults
            </h1>
            <p className={sharedStyles.headerSubtitle}>
              Building the foundation for a meaningful life
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.legacySection}>
          <div className={styles.legacySectionContent}>
            <SectionHeader title="What&rsquo;s at Stake" />
            <p className={styles.bodyText}>
              The transition into adulthood is when the patterns that will shape
              your life take root. Who you become depends on the quality of
              attention you bring to this period &mdash; your relationships,
              your sense of purpose, and your capacity to handle difficulty with
              clarity rather than avoidance.
            </p>
          </div>
          <ComparisonColumns
            bare
            stacked
            leftTitle="Common Challenges"
            leftItems={[
              "Uncertainty about identity, direction, or what you actually want",
              "Difficulty forming or sustaining meaningful relationships",
              "Anxiety, self-doubt, or a persistent sense of falling behind",
              "Feeling disconnected from family while still needing their support",
            ]}
            rightTitle="What Becomes Possible"
            rightItems={[
              "Greater self-knowledge and emotional resilience",
              "Clarity about what matters to you and why",
              "Stronger, more honest relationships",
              "Confidence grounded in self-understanding, not performance",
            ]}
          />
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.bodySection}>
          <SectionHeader title="The Approach" />
          <p className={styles.bodyText}>
            This work is grounded in depth psychology &mdash; developing the
            capacity to understand yourself honestly, to recognize and change
            patterns that aren&rsquo;t working, and to build the internal
            resources needed for a life of genuine meaning and connection.
          </p>
        </section>
      </FadeIn>

      <section className={styles.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
