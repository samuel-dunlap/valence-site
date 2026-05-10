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
  title: "Therapy for Creatives & HSPs",
  description:
    "Therapy for creatives and highly sensitive people on the Upper East Side of Manhattan. Depth work for the patterns that get in the way of your best work.",
  alternates: { canonical: "/therapy-for-creatives/" },
};

export default function TherapyForCreativesPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Therapy for Creatives & HSPs",
          "Therapy for creatives and highly sensitive people on the Upper East Side of Manhattan. Depth work for the patterns that get in the way of your best work.",
          "/therapy-for-creatives/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>
              Therapy for Creatives &amp; HSPs
            </h1>
            <p className={sharedStyles.headerSubtitle}>
              When sensitivity becomes an obstacle instead of an asset
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="What Brings Creatives In" />
          <p className={content.text}>
            The depth of feeling that makes creative work possible is the same
            depth that makes everything harder &mdash; perfectionism that stalls
            projects, self-doubt that distorts judgment, boom-and-bust cycles
            that leave you either producing at full intensity or unable to work
            at all. Highly sensitive people absorb more, which means they also
            carry more: other people&rsquo;s emotions, past criticism, a
            persistent sense that something essential is stuck.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="How We Work" />
          <p className={content.text}>
            We address what&rsquo;s underneath the creative blocks &mdash; the
            old experiences shaping what risks you take, the relationships that
            drain you or leave you isolated, and the parts of yourself
            you&rsquo;ve learned to suppress. The work is about removing what
            gets in the way rather than adding another productivity system or
            borrowed framework. Most creatives don&rsquo;t need more structure;
            they need to understand why the structure they build keeps breaking
            down.
          </p>
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
