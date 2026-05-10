import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn/FadeIn";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import StructuredData from "@/components/StructuredData/StructuredData";
import { CTA } from "@/lib/constants";
import { getServiceSchema } from "@/lib/schema";
import sharedStyles from "@/styles/page-header.module.css";
import styles from "@/styles/service-page.module.css";

export const metadata: Metadata = {
  title: "Depth Performance Training",
  description:
    "Mastering learning, communication, and choice. Private advisory for senior leaders and executives.",
  alternates: { canonical: "/depth-performance-training/" },
};

export default function DepthPerformanceTrainingPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Depth Performance Training",
          "Mastering learning, communication, and choice. Private advisory for senior leaders and executives.",
          "/depth-performance-training/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Depth Performance Training</h1>
            <p className={sharedStyles.headerSubtitle}>
              Mastering learning, communication, and choice
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.bodySection}>
          <ul className={styles.pillars}>
            <li>
              <strong>Learning:</strong> How do I more effectively deepen,
              broaden, and refine my skills and knowledge?
            </li>
            <li>
              <strong>Communication:</strong> How do I ask better questions and
              give better responses?
            </li>
            <li>
              <strong>Choice:</strong> How do I more effectively create what I
              want?
            </li>
          </ul>
        </section>
      </FadeIn>

      <section className={styles.cta}>
        <ArrowLink text={CTA.getInTouch} href="/inquire" />
      </section>
    </>
  );
}
