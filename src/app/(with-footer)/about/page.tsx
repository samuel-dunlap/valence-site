import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/FadeIn/FadeIn";
import Accordion from "@/components/Accordion/Accordion";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Samuel Dunlap — Author & Advisor. Advisor to high-net-worth couples and families. 10,000+ hours advising 300+ high-performing clients.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <FadeIn>
        <section className={styles.header}>
          <h1 className={styles.name}>Samuel Dunlap</h1>
          <p className={styles.subtitle}>Author &amp; Advisor</p>
          <div className={styles.photoWrapper}>
            <Image
              src="/images/profile.webp"
              alt="Samuel Dunlap"
              width={450}
              height={450}
              unoptimized
              className={styles.photo}
            />
          </div>
          <p className={styles.bio}>
            After years of practicing as a clinical couples therapist, I have
            transitioned exclusively to my writing and private advisory for
            high-net-worth couples and families in New York City, San Diego, and
            Aspen, CO. My research focuses on the question: How can we make more
            effective choices in building healthier relationships with
            ourselves, our work, and the people we most care about?
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.accordionSection}>
          <hr className={styles.divider} />
          <Accordion
            sections={[
              {
                title: "Track Record",
                defaultOpen: true,
                content: (
                  <ul className={styles.list}>
                    <li>Ranked #1 therapist on Google in New York City.</li>
                    <li>
                      Advises a diverse range of high-performing clients, from
                      Olympic athletes to executives at organizations including
                      The United Nations, Google, Merrill Lynch, Stanford
                      University, McKinsey &amp; Co, Carnegie Hall, and The City
                      of Boulder
                    </li>
                    <li>
                      10,000+ hours advising 300+ clients (as of Aug 2025)
                    </li>
                    <li>
                      Psychoanalytic training completed at Integral
                      Psychotherapy private practice clinic.
                    </li>
                    <li>
                      University of Michigan &amp; Northern Michigan University,
                      Masters of Social Work
                    </li>
                    <li>
                      University of Michigan, Bachelors Degree in Jazz &amp;
                      Contemplative Studies
                    </li>
                    <li>Member, American Psychological Association</li>
                    <li>
                      Clinical Licenses (LCSW): Colorado, Connecticut, New York
                      (pending approval)
                    </li>
                  </ul>
                ),
              },
              {
                title: "Foundational Research",
                defaultOpen: false,
                content: (
                  <>
                    <p className={styles.accordionIntro}>
                      Samuel has studied all major psychological theories and
                      methods including:
                    </p>
                    <ul className={styles.list}>
                      <li>
                        Neurophysiological, Cognitive, and Behavioral sciences
                      </li>
                      <li>
                        Psychoanalytic (Depth) &amp; Existential-Humanistic
                        psychology
                      </li>
                      <li>Developmental &amp; Transpersonal psychology</li>
                      <li>Social &amp; Evolutionary psychology</li>
                      <li>Psychology of marriage and intimate relationships</li>
                      <li>
                        Complexity science &amp; Bayesian math (as
                        epistemological tools)
                      </li>
                      <li>
                        Metaphysics and Non-dual wisdom traditions (as
                        ontological tools)
                      </li>
                    </ul>
                    <p className={styles.accordionClosing}>
                      Learn more about Samuel&apos;s writing and research at{" "}
                      <a
                        href="https://www.psychprinciples.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        psychprinciples.com
                      </a>
                      .
                    </p>
                  </>
                ),
              },
            ]}
          />
        </section>
      </FadeIn>
    </>
  );
}
