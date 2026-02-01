import styles from "./ComparisonColumns.module.css";

interface ComparisonColumnsProps {
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}

export default function ComparisonColumns({
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
}: ComparisonColumnsProps) {
  return (
    <section className="navySection">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{leftTitle}</h3>
            <ul className={styles.list}>
              {leftItems.map((item, i) => (
                <li
                  key={`left-${i}-${item.slice(0, 30)}`}
                  className={styles.item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{rightTitle}</h3>
            <ul className={styles.list}>
              {rightItems.map((item, i) => (
                <li
                  key={`right-${i}-${item.slice(0, 30)}`}
                  className={styles.item}
                >
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
