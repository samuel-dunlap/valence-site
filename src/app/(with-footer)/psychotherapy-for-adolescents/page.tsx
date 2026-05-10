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
  title: "Psychotherapy for Adolescents",
  description:
    "Psychotherapy for adolescents on the Upper East Side of Manhattan. Supporting teens through identity formation and emotional development.",
  alternates: { canonical: "/psychotherapy-for-adolescents/" },
};

export default function PsychotherapyForAdolescentsPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Psychotherapy for Adolescents",
          "Psychotherapy for adolescents on the Upper East Side of Manhattan. Supporting teens through identity formation and emotional development.",
          "/psychotherapy-for-adolescents/"
        )}
      />

      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>
              Psychotherapy for Adolescents
            </h1>
            <p className={sharedStyles.headerSubtitle}>
              When growing pains become something more
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="When to Consider Therapy" />
          <p className={content.text}>
            Adolescence is naturally turbulent &mdash; which makes it hard to
            tell the difference between typical growing pains and something that
            needs attention. A drop in grades, withdrawal from friends or
            activities, persistent anxiety, emotional outbursts that go beyond
            the usual, expressions of hopelessness &mdash; these are worth
            taking seriously. The patterns your teen develops now will shape how
            they handle difficulty for decades.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="How We Work" />
          <p className={content.text}>
            Therapy with teenagers looks different than therapy with adults.
            Some talk readily; others need to build trust before they&rsquo;ll
            engage. We adjust to each teen&rsquo;s personality and what they
            respond to, and we go past coping strategies into the deeper
            question of what&rsquo;s driving the distress. We also work closely
            with parents, because adolescent therapy is most effective when the
            family understands how to support the process without overriding it.
          </p>
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
