import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/FadeIn/FadeIn";
import Accordion from "@/components/Accordion/Accordion";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Samuel Dunlap — Relationship Advisor & Researcher. Ranked #1 therapist on Google in NYC. 10,000+ hours advising 300+ high-performing clients.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <FadeIn>
        <section className={styles.header}>
          <h1 className={styles.name}>Samuel Dunlap</h1>
          <p className={styles.subtitle}>
            Relationship Advisor &amp; Researcher
          </p>
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
            After years of practicing as a clinical couples therapist, Samuel has
            transitioned exclusively to private advisory for high-net-worth men
            in New York City and Aspen, CO.
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
                    <li>
                      Ranked #1 therapist on Google in New York City.
                    </li>
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
                      <li>
                        Developmental &amp; Transpersonal psychology
                      </li>
                      <li>Social &amp; Evolutionary psychology</li>
                      <li>
                        Psychology of marriage and intimate relationships
                      </li>
                      <li>
                        Complexity science &amp; Bayesian math (as modeling
                        systems)
                      </li>
                      <li>
                        Metaphysics and Non-dual wisdom traditions (as ontological
                        tools)
                      </li>
                    </ul>
                    <p className={styles.accordionClosing}>
                      He is currently writing a book that distills the essential
                      principles from these bodies of theory and practice.
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
