import styles from './PhaseCard.module.css';

interface PhaseCardProps {
  phaseNumber: number;
  title: string;
  description: string;
}

export default function PhaseCard({ phaseNumber, title, description }: PhaseCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>phase {phaseNumber}:</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
