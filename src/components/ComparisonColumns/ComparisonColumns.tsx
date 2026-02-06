import styles from "./ComparisonColumns.module.css";

interface ComparisonColumnsProps {
  leftTitle: string;
  leftItems: React.ReactNode[];
  rightTitle: string;
  rightItems: React.ReactNode[];
  stacked?: boolean;
}

export default function ComparisonColumns({
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
  stacked,
}: ComparisonColumnsProps): React.ReactElement {
  return (
    <section className="navySection">
      <div className={styles.container}>
        <div className={`${styles.grid} ${stacked ? styles.stacked : ""}`}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{leftTitle}</h3>
            <ul className={styles.list}>
              {leftItems.map((item, i) => (
                <li key={i} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{rightTitle}</h3>
            <ul className={styles.list}>
              {rightItems.map((item, i) => (
                <li key={i} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
