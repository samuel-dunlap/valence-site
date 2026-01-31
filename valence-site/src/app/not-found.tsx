import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={`navySection ${styles.page}`}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Page Not Found</h1>
        <p className={styles.subtitle}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className={styles.link}>
          Return Home &rarr;
        </Link>
      </div>
    </section>
  );
}
