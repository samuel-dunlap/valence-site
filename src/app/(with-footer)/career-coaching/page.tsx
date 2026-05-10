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
  title: "Career Coaching",
  description:
    "Career coaching on the Upper East Side of Manhattan. For people stuck in the wrong career or unsure what the right one looks like.",
  alternates: { canonical: "/career-coaching/" },
};

export default function CareerCoachingPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Career Coaching",
          "Career coaching on the Upper East Side of Manhattan. For people stuck in the wrong career or unsure what the right one looks like.",
          "/career-coaching/"
        )}
      />

      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Career Coaching</h1>
            <p className={sharedStyles.headerSubtitle}>
              When you know something needs to change but not what
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="What Brings People In" />
          <p className={content.text}>
            Most people who seek career coaching aren&rsquo;t lazy or lost.
            They&rsquo;re high-functioning but misaligned &mdash; in a career
            that made sense at one point but no longer fits who they&rsquo;ve
            become. The dissatisfaction is real but hard to name, which makes it
            easy to dismiss. Career coaching gives it structure.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="How We Work" />
          <p className={content.text}>
            We start with who you actually are &mdash; your strengths, values,
            and what energizes you versus what drains you. From there, we build
            a clear picture of what a better fit looks like and a practical plan
            for getting there. This might mean a transition, a pivot within your
            current field, or simply understanding why you feel stuck so you can
            engage differently with the work you already have.
          </p>
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
