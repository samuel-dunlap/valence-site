import Link from 'next/link';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  title: string;
  tagline: string;
  description: string;
  href: string;
  ctaText?: string;
}

export default function ServiceCard({ title, tagline, description, href, ctaText = "Learn more" }: ServiceCardProps) {
  return (
    <Link href={href} className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.tagline}>{tagline}</p>
      <p className={styles.description}>{description}</p>
      <span className={styles.ctaLabel}>{ctaText} →</span>
    </Link>
  );
}
