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
  title: "Psychotherapy for Adults",
  description:
    "Individual psychotherapy for adults on the Upper East Side of Manhattan. Depth work for people ready to understand the patterns shaping their lives.",
  alternates: { canonical: "/psychotherapy-for-adults/" },
};

export default function PsychotherapyForAdultsPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Psychotherapy for Adults",
          "Individual psychotherapy for adults on the Upper East Side of Manhattan. Depth work for people ready to understand the patterns shaping their lives.",
          "/psychotherapy-for-adults/"
        )}
      />

      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Psychotherapy for Adults</h1>
            <p className={sharedStyles.headerSubtitle}>
              Understanding what drives the patterns you repeat
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="What Brings People In" />
          <p className={content.text}>
            Most adults who come to therapy are carrying patterns that once
            served a purpose but now create problems &mdash; in relationships,
            at work, or in the quiet gap between the life they&rsquo;re living
            and the life they want. Sometimes it&rsquo;s a specific crisis.
            Often it&rsquo;s a slower accumulation &mdash; a sense that
            something isn&rsquo;t working but you can&rsquo;t quite name what.
            You don&rsquo;t need a crisis to begin therapy. Curiosity about your
            own patterns is more than enough.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="How We Work" />
          <p className={content.text}>
            We go past the surface. The work is about understanding the
            structure beneath the pattern &mdash; what you learned early on
            about yourself and the world, and why those conclusions keep
            reasserting themselves. Medication can be a valuable part of
            treatment, but it addresses symptoms without touching this
            structure. Therapy works at the root.
          </p>
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
