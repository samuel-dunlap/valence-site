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
  title: "Couples Therapy",
  description:
    "Couples therapy on the Upper East Side of Manhattan. Depth work for couples stuck in recurring conflict, emotional distance, or broken trust.",
  alternates: { canonical: "/couples-therapy/" },
};

export default function CouplesTherapyPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Couples Therapy",
          "Couples therapy on the Upper East Side of Manhattan. Depth work for couples stuck in recurring conflict, emotional distance, or broken trust.",
          "/couples-therapy/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Couples Therapy</h1>
            <p className={sharedStyles.headerSubtitle}>
              Understanding the patterns that keep you stuck
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="The Pattern" />
          <p className={content.text}>
            Most couples who come to us have been having the same argument for
            months or years. The content changes &mdash; money, kids, sex, who
            does what &mdash; but the cycle doesn&rsquo;t. One person pursues,
            the other withdraws. Or both escalate until someone shuts down. The
            specifics matter less than the pattern underneath.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="The Work" />
          <p className={content.text}>
            We help you see the cycle clearly, understand what each of you is
            actually asking for beneath the surface conflict, and build the
            capacity to respond to each other differently. This isn&rsquo;t
            about learning communication tricks. It&rsquo;s about understanding
            why you get triggered by this person in ways you don&rsquo;t with
            anyone else &mdash; and what to do about it.
          </p>
          <p className={content.text}>
            Couples who do this work don&rsquo;t just fight less. They
            understand each other better. They repair faster after conflict. And
            they develop a shared language for the hard conversations that used
            to derail them.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="Honesty" />
          <p className={content.text}>
            Couples therapy requires both people to show up and do real work.
            It&rsquo;s uncomfortable. And it doesn&rsquo;t always mean staying
            together &mdash; sometimes the most honest outcome is a clearer
            understanding of whether the relationship is working. We won&rsquo;t
            pretend otherwise.
          </p>
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
