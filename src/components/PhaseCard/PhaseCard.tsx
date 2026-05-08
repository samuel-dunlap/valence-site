import styles from "./PhaseCard.module.css";

interface PhaseCardProps {
  phaseNumber: number;
  title: string;
  description: string;
}

export default function PhaseCard({
  phaseNumber,
  title,
  description,
}: PhaseCardProps): React.ReactElement {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        Phase {phaseNumber}: {title}
      </h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
