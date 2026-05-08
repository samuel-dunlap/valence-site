import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn/FadeIn";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
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

      <section className={styles.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
