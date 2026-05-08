import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn/FadeIn";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import PhaseCard from "@/components/PhaseCard/PhaseCard";
import StructuredData from "@/components/StructuredData/StructuredData";
import { CTA } from "@/lib/constants";
import { getServiceSchema } from "@/lib/schema";
import sharedStyles from "@/styles/page-header.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Team Collaboration Diagnostic",
  description:
    "A 3-hour introductory diagnostic that pinpoints opportunities for team performance improvement. Designed for senior leadership teams of 3-10 people.",
  alternates: { canonical: "/team-collaboration-diagnostic/" },
};

export default function TCDPage() {
  return (
    <>
      <StructuredData
        data={getServiceSchema(
          "Team Collaboration Diagnostic (TCD)",
          "A 3-hour introductory diagnostic that pinpoints opportunities for team performance improvement. Designed for senior leadership teams of 3-10 people.",
          "/team-collaboration-diagnostic/"
        )}
      />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>
              Team Collaboration Diagnostic
            </h1>
            <p className={sharedStyles.headerSubtitle}>
              What foundational levers can you pull to unlock peak team
              effectiveness?
            </p>
            <p className={sharedStyles.intro}>
              A 3-hour introductory diagnostic that pinpoints opportunities for
              team performance improvement. Designed for senior leadership teams
              of 3&ndash;10 people who aspire for elite levels of leadership and
              collaboration.
            </p>
          </div>
        </section>
      </FadeIn>

      <div className="navySection">
        <FadeIn>
          <section className={styles.navyContent}>
            <SectionHeader title="Why It Matters" />
            <p className={styles.bodyTextLight}>
              <strong>80% of teams</strong> are not reaching their performance
              potential.<sup>1</sup> Organizations with high-performing teams
              achieve better results:
            </p>
            <div className={styles.statsGrid}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>23%</span>
                <span className={styles.statLabel}>
                  More profitable<sup>2</sup>
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>50%</span>
                <span className={styles.statLabel}>
                  Higher customer retention<sup>3</sup>
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>30%</span>
                <span className={styles.statLabel}>
                  Faster revenue growth<sup>4</sup>
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>27%</span>
                <span className={styles.statLabel}>
                  Lower employee turnover<sup>5</sup>
                </span>
              </div>
            </div>

            <h3 className={styles.subhead}>Root Causes</h3>
            <ul className={styles.list}>
              <li>
                <strong>Mediocre Execution</strong> &mdash; lack of
                prioritization, low-value habits, lack of accountability.
                67&ndash;90% of strategic plans fail due to poor execution.
                <sup>6</sup>
              </li>
              <li>
                <strong>Poor Collaboration</strong> &mdash; unhealthy conflict,
                hyper-individualism or groupthink, communication breakdowns. 97%
                of leaders say team misalignments have negatively impacted their
                performance.<sup>7</sup>
              </li>
              <li>
                <strong>Low Engagement</strong> &mdash; low resilience, chronic
                stress and burnout, lack of motivation. Only 33% of employees
                are actually engaged at work.<sup>8</sup>
              </li>
              <li>
                <strong>Insufficient Skills</strong> &mdash; resistance to
                change, knowledge-transfer gaps, lack of effective training.
                70&ndash;89% of employees don&apos;t have the skills to succeed
                in rapidly changing environments.<sup>9</sup>
              </li>
            </ul>
          </section>
        </FadeIn>
      </div>

      <FadeIn>
        <section className={styles.bodySection}>
          <SectionHeader title="How It Works" />
          <p className={styles.bodyText}>
            3 hours over 4 days. Low-effort, high value-density implementation.
          </p>
          <div className={styles.phasesGrid}>
            <PhaseCard
              phaseNumber={1}
              title="Proprietary Survey"
              description="A 60-minute interview using better questions that are easy, fast, specific, sufficient, and anonymous. Precisely focused on concrete behaviors that return results, supported by 3+ years of research."
            />
            <PhaseCard
              phaseNumber={2}
              title="Sense-making Workshop"
              description="A 90-minute facilitated workshop to prioritize data-backed problems, identify core dynamics impacting performance, and establish baselines for future benchmarking."
            />
            <PhaseCard
              phaseNumber={3}
              title="Actionable Report"
              description="A 30-minute debrief delivering a synthesis of survey and workshop results with actionable recommendations your team can implement immediately."
            />
          </div>
        </section>
        <section className={styles.bodySection}>
          <SectionHeader title="Change Is Hard to Implement" />
          <p className={styles.bodyText}>
            Only <strong>10%</strong> of managers know how to both create and
            sustain behavioral change effectively.<sup>10</sup> The diagnostic
            is just the beginning &mdash; we partner with you from
            recommendations through permanent behavior change.
          </p>
        </section>
      </FadeIn>

      <section className={styles.cta}>
        <ArrowLink
          text={CTA.requestIntroduction}
          href="/inquire"
          variant="dark"
        />
      </section>

      <footer className={styles.footnotes}>
        <ol>
          <li>McKinsey</li>
          <li>Gallup</li>
          <li>Forrester Research</li>
          <li>McKinsey</li>
          <li>Google, Project Aristotle</li>
          <li>
            Harvard Business Review; Norton &amp; Kaplan; Bridges Business
            Consultancy; Brightline
          </li>
          <li>NCBI</li>
          <li>Gallup</li>
          <li>McKinsey; Gartner; The Corporate Executive Board</li>
          <li>IMD Business School</li>
        </ol>
      </footer>
    </>
  );
}
