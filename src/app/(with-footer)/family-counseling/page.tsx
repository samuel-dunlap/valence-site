import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn/FadeIn";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import StructuredData from "@/components/StructuredData/StructuredData";
import { CTA } from "@/lib/constants";
import { getServiceSchema } from "@/lib/schema";
import sharedStyles from "@/styles/page-header.module.css";
import content from "@/styles/content.module.css";

export const metadata: Metadata = {
  title: "Family Counseling",
  description:
    "Family counseling on the Upper East Side of Manhattan. Working with the family as a system when one person's difficulty affects everyone.",
  alternates: { canonical: "/family-counseling/" },
};

export default function FamilyCounselingPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Family Counseling",
          "Family counseling on the Upper East Side of Manhattan. Working with the family as a system when one person's difficulty affects everyone.",
          "/family-counseling/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Family Counseling</h1>
            <p className={sharedStyles.headerSubtitle}>
              When one person&rsquo;s struggle affects everyone
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="What Brings Families In" />
          <p className={content.text}>
            Family conflicts rarely stay contained. One person&rsquo;s
            difficulty &mdash; whether it&rsquo;s a transition, a loss, a
            behavioral shift in a child, or years of unresolved tension &mdash;
            ripples through the entire household. When communication has broken
            down and the same arguments keep cycling, family counseling
            addresses the system rather than just the individuals in it.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="How We Work" />
          <p className={content.text}>
            We help each family member be heard &mdash; honestly, without the
            defensive patterns that have built up over time. The work focuses on
            understanding the roles people have fallen into, the communication
            habits that keep things stuck, and what each person actually needs
            from the others. The goal is not just to resolve the current
            conflict but to change how the family handles difficulty going
            forward.
          </p>
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
