import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn/FadeIn";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import StructuredData from "@/components/StructuredData/StructuredData";
import { CTA } from "@/lib/constants";
import { getServiceSchema } from "@/lib/schema";
import sharedStyles from "@/styles/page-header.module.css";
import styles from "@/styles/service-page.module.css";

export const metadata: Metadata = {
  title: "Family Consulting",
  description:
    "A learning community for committed families to grow intergenerational relationships, skills, and legacies.",
  alternates: { canonical: "/family-consulting/" },
};

export default function FamilyConsultingPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Family Consulting",
          "A learning community for committed families to grow intergenerational relationships, skills, and legacies.",
          "/family-consulting/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Family Consulting</h1>
            <p className={sharedStyles.headerSubtitle}>
              A learning community for committed families to grow
              intergenerational relationships, skills, and legacies
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.bodySection}>
          <ul className={styles.pillars}>
            <li>Communication breakdown between parents and children</li>
            <li>
              Feeling ineffective as a parent despite success in other aspects
              of life
            </li>
            <li>
              Children lacking motivation, direction, or readiness for
              independence
            </li>
            <li>Not knowing when to step in and when to step back</li>
          </ul>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.bodySection}>
          <SectionHeader title="What&rsquo;s at Stake" />
          <p className={styles.bodyText}>
            Every parent carries some version of the same fear: that the
            distance growing between you and your children will become
            permanent. You know what it felt like to not have the relationship
            you wanted with your own parents. You don&rsquo;t want that for your
            kids.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.bodySection}>
          <SectionHeader title="The Unique Value" />
          <p className={styles.bodyText}>
            I become part of your family &mdash; someone who knows your
            children, understands your history, and is there as things evolve. I
            spend time with parents and children &mdash; separately and together
            &mdash; building the kind of trust and understanding that only comes
            from being there. Where families share similar values and
            challenges, I facilitate connections between them &mdash; creating a
            private community where families learn and grow alongside each
            other.
          </p>
        </section>
      </FadeIn>

      <section className={styles.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
