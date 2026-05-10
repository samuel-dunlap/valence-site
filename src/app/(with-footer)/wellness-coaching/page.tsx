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
  title: "Wellness Coaching",
  description:
    "Wellness coaching on the Upper East Side of Manhattan. Practical support for stress, sleep, habits, and the physical foundations of mental health.",
  alternates: { canonical: "/wellness-coaching/" },
};

export default function HolisticWellnessCoachingPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Wellness Coaching",
          "Wellness coaching on the Upper East Side of Manhattan. Practical support for stress, sleep, habits, and the physical foundations of mental health.",
          "/wellness-coaching/"
        )}
      />

      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Wellness Coaching</h1>
            <p className={sharedStyles.headerSubtitle}>
              The physical foundations of mental health
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="What This Is" />
          <p className={content.text}>
            Emotional life doesn&rsquo;t exist in isolation from the body.
            Sleep, nutrition, movement, stress habits, substance use &mdash;
            these aren&rsquo;t peripheral concerns. They&rsquo;re often the
            difference between a nervous system that can regulate and one that
            can&rsquo;t. Wellness coaching addresses the practical, daily
            foundations that either support or undermine your mental health.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="How We Work" />
          <p className={content.text}>
            We identify the specific habits and conditions that are keeping you
            stuck &mdash; chronic overcommitment, poor sleep architecture,
            stress-driven eating, reliance on caffeine or alcohol to manage
            energy. Then we build concrete, sustainable changes that fit your
            actual life. This is not about willpower or optimization culture.
            It&rsquo;s about understanding what your body and mind actually need
            and building a daily routine that reflects that.
          </p>
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
