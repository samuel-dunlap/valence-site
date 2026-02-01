import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <hr className={styles.rule} />
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
