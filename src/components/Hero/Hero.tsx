import Image from "next/image";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import { generateListKey } from "@/lib/utils";
import styles from "./Hero.module.css";

interface HeroProps {
  headline: React.ReactNode;
  subtitleLines: string[];
  ctaText?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function Hero({
  headline,
  subtitleLines,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt,
}: HeroProps): React.ReactElement {
  return (
    <section className={`navySection ${styles.hero}`}>
      <div className={imageSrc ? styles.splitContainer : styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>{headline}</h1>

          <div className={styles.subtitles}>
            {subtitleLines.map((line: string, i: number) => (
              <p key={generateListKey("subtitle", i, line)} className={styles.subtitle}>
                {line}
              </p>
            ))}
          </div>

          {ctaText && ctaHref && (
            <div className={styles.cta}>
              <ArrowLink text={ctaText} href={ctaHref} variant="light" />
            </div>
          )}
        </div>

        {imageSrc && (
          <div className={styles.imageWrap}>
            <Image
              src={imageSrc}
              alt={imageAlt ?? "Decorative image"}
              width={540}
              height={670}
              unoptimized
              className={styles.image}
            />
          </div>
        )}
      </div>
    </section>
  );
}
