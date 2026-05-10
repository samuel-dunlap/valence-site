import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn/FadeIn";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { CTA } from "@/lib/constants";
import sharedStyles from "@/styles/page-header.module.css";
import content from "@/styles/content.module.css";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "Depth psychology, developmental frameworks, and contemplative practice — adapted to how each person thinks and what they need. Upper East Side, Manhattan.",
  alternates: { canonical: "/our-approach/" },
};

export default function OurApproachPage() {
  return (
    <>
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Our Approach</h1>
            <p className={sharedStyles.headerSubtitle}>
              Philosophy and engagement
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="Philosophy" />
          <p className={content.text}>
            We draw on depth psychology, developmental theory, and contemplative
            traditions. The common thread: real change requires more than
            managing symptoms. It means engaging with who you actually are
            &mdash; the patterns you repeat, the parts of yourself you avoid,
            and the growth you&rsquo;re capable of.
          </p>
          <p className={content.text}>
            We work with five developmental dimensions:
          </p>
          <ol className={content.numberedList}>
            <li>
              <strong>Growing up &amp; maturing</strong> &mdash; developing
              cognitive, emotional, and moral complexity over time
            </li>
            <li>
              <strong>Cleaning up &amp; healing</strong> &mdash; working through
              unresolved material, trauma, and what you&rsquo;ve avoided or
              suppressed
            </li>
            <li>
              <strong>Waking up &amp; realizing</strong> &mdash; deepening
              awareness, presence, and contact with what lies beneath ordinary
              experience
            </li>
            <li>
              <strong>Showing up &amp; enacting</strong> &mdash; translating
              insight into embodied action in daily life and relationships
            </li>
            <li>
              <strong>Teaming up &amp; relating</strong> &mdash; learning to be
              honest with the people who matter and to build relationships that
              actually work
            </li>
          </ol>
          <blockquote className={content.quote}>
            &ldquo;The point is not to be the best in the world, but to be the
            best for the world.&rdquo;
            <p className={content.quoteSource}>&mdash;Ken Wilber</p>
          </blockquote>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="How We Work" />
          <p className={content.text}>
            We adapt to how you think &mdash; whether that&rsquo;s through
            conversation, creative work, movement, or contemplation. Sessions
            happen in the office, on a walk, or wherever the work is best
            supported. The format serves the process.
          </p>
          <blockquote className={content.quote}>
            &ldquo;The shoe that fits one person pinches another; there is no
            recipe for living that suits all cases.&rdquo;
            <p className={content.quoteSource}>&mdash;Carl Jung</p>
          </blockquote>
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
