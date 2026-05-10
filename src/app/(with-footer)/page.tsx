import type { Metadata } from "next";
import Hero from "@/components/Hero/Hero";
import FadeIn from "@/components/FadeIn/FadeIn";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import Accordion from "@/components/Accordion/Accordion";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import { CTA } from "@/lib/constants";
import content from "@/styles/content.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "Upper East Side Therapy | Psychotherapy & Couples Therapy",
  },
  description:
    "Psychotherapy and couples therapy on the Upper East Side of Manhattan. Depth work for individuals, couples, and families.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero
        headline={
          <>
            Psychotherapy &
            <br />
            Couples Therapy
          </>
        }
        subtitleLines={["Upper East Side, Manhattan."]}
        ctaText={CTA.requestIntroduction}
        ctaHref="/inquire"
      />

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="Welcome" />
          <p className={content.intro}>
            We are psychotherapists who do depth work &mdash; the kind that
            changes how you understand yourself, not just how you manage
            symptoms. We work with individuals, couples, and families on the
            Upper East Side, with remote sessions available.
          </p>
          <ul className={content.list}>
            <li>Depth Psychotherapy for Adults, Adolescents, and Children</li>
            <li>Couples, Marriage, and Family Counseling</li>
            <li>In-person and remote sessions</li>
          </ul>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="How We Work" />
          <p className={content.text}>
            We don&rsquo;t follow a single protocol. Depth work means going past
            symptom management into the patterns, histories, and beliefs that
            keep things the way they are. What that looks like varies &mdash;
            each person brings a different starting point, and the work reflects
            that.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="Testimonials" />
          <div className={content.testimonialGrid}>
            <div>
              <p className={content.testimonial}>
                &ldquo;He is a wonderful therapist. He has helped me through
                challenges with parenting, marriage and the stress of owning my
                own business. He is extremely insightful and intuitive. I highly
                recommend him!&rdquo;
              </p>
              <p className={content.testimonialSource}>
                &mdash;B. C., CEO of a Beauty &amp; Cosmetics Company
              </p>
            </div>
            <div>
              <p className={content.testimonial}>
                &ldquo;Working with him has been such an important step towards
                healing from trauma and embodying my values. He takes our work
                seriously and I feel is just as committed to my growth as I am.
                I feel a resonance in our creative spirits, unique and diverse
                approaches to problem-solving, and excitement about
                results.&rdquo;
              </p>
              <p className={content.testimonialSource}>
                &mdash;S. S., MFA, Visual Artist
              </p>
            </div>
            <div>
              <p className={content.testimonial}>
                &ldquo;Before working with him my life was a little disorganized
                and hectic. Since we have started working together he has given
                me tools to become more grounded and centered, allowing me to
                have less friction within myself and my environment.&rdquo;
              </p>
              <p className={content.testimonialSource}>
                &mdash;D. L., Content Creator
              </p>
            </div>
            <div>
              <p className={content.testimonial}>
                &ldquo;He was my first-ever therapist and he did a fantastic
                job! I was nervous about starting therapy (having never done it
                before), but he made the experience so meaningful and
                worthwhile. My therapy context was mainly processing as I
                shifted from one stage of life to the next. He listened well,
                gave appropriate and meaningful feedback, and offered simple and
                thought-provoking practices to work on outside of our sessions.
                I am super grateful for my time with him, and have no
                hesitations about recommending anyone to his services.&rdquo;
              </p>
              <p className={content.testimonialSource}>
                &mdash;N. M., High School Teacher
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <SectionHeader title="Frequently Asked Questions" />
          <Accordion
            items={[
              {
                title: "What types of therapy do you offer?",
                children: (
                  <p className={content.text}>
                    Depth psychotherapy for adults, adolescents, and children.
                    Couples, marriage, and family counseling. Both in-person and
                    remote.
                  </p>
                ),
              },
              {
                title: "What should I expect in a first session?",
                children: (
                  <p className={content.text}>
                    A conversation. You share what brings you here, ask any
                    questions, and we begin to understand whether working
                    together makes sense.
                  </p>
                ),
              },
              {
                title: "Do you offer remote sessions?",
                children: (
                  <p className={content.text}>
                    Yes. Secure video sessions for individuals and couples.
                  </p>
                ),
              },
              {
                title: "How do I get started?",
                children: (
                  <p className={content.text}>
                    Reach out through our inquiry page. We&rsquo;ll schedule a
                    brief conversation to learn what you&rsquo;re looking for
                    and match you with the right therapist.
                  </p>
                ),
              },
            ]}
          />
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
