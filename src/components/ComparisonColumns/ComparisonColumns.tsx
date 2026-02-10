import styles from "./ComparisonColumns.module.css";

interface ComparisonColumnsProps {
  leftTitle: string;
  leftItems: React.ReactNode[];
  rightTitle: string;
  rightItems: React.ReactNode[];
  stacked?: boolean;
  className?: string;
  bare?: boolean;
}

export default function ComparisonColumns({
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
  stacked,
  className,
  bare,
}: ComparisonColumnsProps): React.ReactElement {
  const content = (
    <div
      className={`${styles.container}${bare ? ` ${styles.bare}` : ""}${className ? ` ${className}` : ""}`}
    >
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
  );

  if (bare) return content;
  return <section className="navySection">{content}</section>;
}
