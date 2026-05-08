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
    "More effective communication and decision-making. Private advisory for senior leaders and executives.",
  alternates: { canonical: "/depth-performance-training/" },
};

export default function DepthPerformanceTrainingPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Depth Performance Training",
          "More effective communication and decision-making. Private advisory for senior leaders and executives.",
          "/depth-performance-training/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Depth Performance Training</h1>
            <p className={sharedStyles.headerSubtitle}>
              More effective communication and decision-making
            </p>
          </div>
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
