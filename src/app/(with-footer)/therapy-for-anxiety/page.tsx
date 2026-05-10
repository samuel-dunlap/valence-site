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
  title: "Therapy for Anxiety",
  description:
    "Therapy for anxiety on the Upper East Side of Manhattan. Depth work for people whose anxiety has outgrown their ability to manage it alone.",
  alternates: { canonical: "/therapy-for-anxiety/" },
};

export default function TherapyForAnxietyPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Therapy for Anxiety",
          "Therapy for anxiety on the Upper East Side of Manhattan. Depth work for people whose anxiety has outgrown their ability to manage it alone.",
          "/therapy-for-anxiety/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Therapy for Anxiety</h1>
            <p className={sharedStyles.headerSubtitle}>
              When worry stops being useful
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="What We See" />
          <p className={content.text}>
            Anxiety is not just worry. It&rsquo;s a full-system response &mdash;
            racing thoughts, chest tightness, disrupted sleep, a mind that
            won&rsquo;t stop scanning for threats. Some people channel it into
            relentless productivity. Others withdraw. Many have adapted so
            thoroughly that they don&rsquo;t realize how much energy they spend
            managing it until it becomes impossible to ignore.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="What Clients Say" />
          <div className={content.highlight}>
            <p>
              &ldquo;I have reached a certain point of success, but I
              can&rsquo;t enjoy it. There is always the next thing to worry
              about, the next way it could all fall apart.&rdquo;
            </p>
          </div>
          <div className={content.highlight}>
            <p>
              &ldquo;I am obsessed with fast-paced work and constant output. If
              I slow down, the anxiety gets louder. I use productivity to drown
              it out.&rdquo;
            </p>
          </div>
          <div className={content.highlight}>
            <p>
              &ldquo;I can never relax at night. My mind replays the day,
              invents tomorrow&rsquo;s problems, and refuses to shut off.&rdquo;
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="How We Work" />
          <p className={content.text}>
            We start with what&rsquo;s happening now &mdash; the specific
            triggers, the thought patterns, the way your body holds tension.
            Then we go deeper: into the early experiences that taught your
            nervous system to stay on alert, and the role anxiety has played in
            your life since. The goal is not to eliminate anxiety &mdash;
            that&rsquo;s neither possible nor desirable &mdash; but to bring it
            to a level where it no longer runs your life.
          </p>
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
