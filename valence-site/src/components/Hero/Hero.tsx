import ArrowLink from '@/components/ArrowLink/ArrowLink';
import styles from './Hero.module.css';

interface HeroProps {
  headline: React.ReactNode;
  subtitleLines: string[];
  ctaText?: string;
  ctaHref?: string;
}

export default function Hero({ headline, subtitleLines, ctaText, ctaHref }: HeroProps) {
  return (
    <section className={`navySection ${styles.hero}`}>
      <div className={styles.container}>
        <h1 className={styles.headline}>{headline}</h1>

        <div className={styles.subtitles}>
          {subtitleLines.map((line, i) => (
            <p key={i} className={styles.subtitle}>{line}</p>
          ))}
        </div>

        {ctaText && ctaHref && (
          <div className={styles.cta}>
            <ArrowLink text={ctaText} href={ctaHref} variant="light" />
          </div>
        )}
      </div>
    </section>
  );
}
