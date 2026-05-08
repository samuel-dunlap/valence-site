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
    "Private consulting for high-net-worth families navigating the relationships that matter most.",
  alternates: { canonical: "/family-consulting/" },
};

export default function FamilyConsultingPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Family Consulting",
          "Private consulting for high-net-worth families navigating the relationships that matter most.",
          "/family-consulting/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Family Consulting</h1>
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
