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
  title: "Therapy for College Students",
  description:
    "Therapy for college students on the Upper East Side of Manhattan. Support for the pressures, identity questions, and emotional challenges of college life.",
  alternates: { canonical: "/therapy-for-college-students/" },
};

export default function TherapyForCollegeStudentsPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Therapy for College Students",
          "Therapy for college students on the Upper East Side of Manhattan. Support for the pressures, identity questions, and emotional challenges of college life.",
          "/therapy-for-college-students/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Therapy for College Students</h1>
            <p className={sharedStyles.headerSubtitle}>
              When the weight of it becomes hard to carry alone
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="What Brings Students In" />
          <p className={content.text}>
            College concentrates pressure in ways that are hard to prepare for
            &mdash; academic demands, new relationships, identity questions,
            financial stress, distance from family, and an uncertain future, all
            happening at once. Many students dismiss what they&rsquo;re feeling
            as normal stress. Sometimes it is. But when avoidance, anxiety, or
            emotional overwhelm start narrowing your life &mdash; skipping
            classes, withdrawing from people, struggling to sleep or concentrate
            &mdash; that&rsquo;s a signal worth paying attention to.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="What the Work Looks Like" />
          <p className={content.text}>
            College is when most people&rsquo;s coping habits solidify &mdash;
            how you handle stress, what you do when things get hard, how honest
            you are with yourself about what you need. We help you build
            self-knowledge and emotional capacity now, rather than spending your
            thirties trying to undo what got established in your twenties.
          </p>
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
