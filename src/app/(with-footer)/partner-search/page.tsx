import type { Metadata } from "next";
import Image from "next/image";
import FadeIn from "@/components/FadeIn/FadeIn";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import PhaseCard from "@/components/PhaseCard/PhaseCard";
import { SITE } from "@/lib/constants";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Partner Search",
  description:
    "Psychologically curated matchmaking and rigorous screening for lifetime partnership. Headhunting for your personal life.",
  alternates: { canonical: "/partner-search/" },
};

export default function PartnerSearchPage() {
  return (
    <>
      <script type="application/ld+json" src="/schema/partner-search.json" />
      <FadeIn>
        <section className={`navySection ${styles.header}`}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>The Partner Search</h1>
            <p className={styles.intro}>
              You are successful, discerning, and ready for a serious
              commitment, but the open dating market is inefficient. Most men in
              your position currently:
            </p>
            <ul className={styles.bulletList}>
              <li>
                struggle to find a partner who meets their standards for
                character and beauty.
              </li>
              <li>
                waste time &amp; energy on incompatible or unserious partners.
              </li>
              <li>
                are exposed to emotionally immature or adversely-motivated women
                that threaten their peace, reputation, and assets.
              </li>
              <li>
                are sick of low-quality matches &amp; interactions on dating
                apps.
              </li>
            </ul>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <div className={styles.accentWrap}>
          <Image
            src="/images/assessment.webp"
            alt="Partner assessment consultation"
            width={1074}
            height={669}
            unoptimized
            className={styles.accentImage}
          />
        </div>
      </FadeIn>

      <FadeIn>
        <section className={styles.methodSection}>
          <SectionHeader title="Our Method" />
          <div className={styles.phaseGrid}>
            <PhaseCard
              phaseNumber={1}
              title="Profile"
              description="We analyze your psychological profile and non-negotiables to define the specific partner archetype that complements your goals."
            />
            <PhaseCard
              phaseNumber={2}
              title="Search"
              description="We do not wait for applications. We actively headhunt candidates via offline networks to build a registry of women not on dating apps."
            />
            <PhaseCard
              phaseNumber={3}
              title="Filter"
              description="You browse qualified candidates invisibly. Once you select a profile, we perform a comprehensive character assessment. If we find red flags, we reject her on your behalf."
            />
            <PhaseCard
              phaseNumber={4}
              title="Date"
              description="We secure the venue, manage all reservations, and synchronize calendars. We give you a short briefing on your date. You just show up."
            />
            <PhaseCard
              phaseNumber={5}
              title="Recalibrate"
              description="We gather candid feedback from both you and the woman after the date to refine future matches or provide you with critical performance insights."
            />
            <PhaseCard
              phaseNumber={6}
              title="Commitment"
              description="Once mutual exclusivity is established, we suspend active sourcing. We monitor the initial 90-day period to ensure relationship stability before formally closing the search."
            />
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.cta}>
          <ArrowLink
            text="Request an Introduction"
            href="/inquire"
            variant="dark"
          />
        </section>
      </FadeIn>
    </>
  );
}
