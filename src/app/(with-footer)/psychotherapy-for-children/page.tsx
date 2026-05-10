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
  title: "Psychotherapy for Children",
  description:
    "Child psychotherapy on the Upper East Side of Manhattan. Helping children build emotional skills through play, art, and creative expression.",
  alternates: { canonical: "/psychotherapy-for-children/" },
};

export default function PsychotherapyForChildrenPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Psychotherapy for Children",
          "Child psychotherapy on the Upper East Side of Manhattan. Helping children build emotional skills through play, art, and creative expression.",
          "/psychotherapy-for-children/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Psychotherapy for Children</h1>
            <p className={sharedStyles.headerSubtitle}>
              Building emotional capacity early
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="What We See" />
          <p className={content.text}>
            Children often can&rsquo;t put into words what&rsquo;s wrong. It
            shows up instead &mdash; in behavior, in school, in how they relate
            to friends and family. Persistent mood changes, physical complaints
            without a medical cause, difficulty with peers, a sudden drop in
            school performance &mdash; these are signals that something
            underneath needs attention.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="How We Work" />
          <p className={content.text}>
            Therapy for children uses play, art, drawing, and storytelling to
            reach what words alone cannot. The goal is not to fix behavior but
            to build emotional capacity &mdash; helping a child recognize what
            they&rsquo;re feeling, work through it, and relate to others with
            more confidence. We work closely with parents and caregivers
            throughout, because what happens at home matters as much as what
            happens in sessions.
          </p>
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
