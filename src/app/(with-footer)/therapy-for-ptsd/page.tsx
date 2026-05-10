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
  title: "Therapy for PTSD",
  description:
    "PTSD and trauma therapy on the Upper East Side of Manhattan. Processing what happened at a pace that works, not just managing symptoms.",
  alternates: { canonical: "/therapy-for-ptsd/" },
};

export default function TherapyForPTSDPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Therapy for PTSD",
          "PTSD and trauma therapy on the Upper East Side of Manhattan. Processing what happened at a pace that works, not just managing symptoms.",
          "/therapy-for-ptsd/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Therapy for PTSD</h1>
            <p className={sharedStyles.headerSubtitle}>
              Processing what the nervous system is still holding
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="What Trauma Does" />
          <p className={content.text}>
            Trauma reshapes the nervous system. The brain learns to anticipate
            danger even in safe environments &mdash; producing hypervigilance,
            avoidance, intrusive memories, and a persistent sense that something
            is wrong. Many people don&rsquo;t connect their current symptoms to
            past experiences, especially when the trauma occurred in childhood
            or wasn&rsquo;t recognized as traumatic at the time.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="How We Work" />
          <p className={content.text}>
            We process traumatic material at a pace that feels manageable
            &mdash; not avoiding it, but not forcing it either. That means
            working through what the experience meant to you, the ways you
            reorganized your life to avoid being reminded of it, and what got
            shut down as a result.
          </p>
          <p className={content.text}>
            We draw on somatic approaches, EMDR, and depth psychotherapy
            depending on what fits your experience and how you process. The
            timeline varies &mdash; some people find significant relief in a few
            months of focused work, while complex or developmental trauma
            typically requires a longer engagement.
          </p>
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
