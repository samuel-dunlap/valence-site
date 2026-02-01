import type { Metadata } from "next";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Request a confidential introduction to Valence Private Relationship Advisory. Response within 24 hours.",
  alternates: { canonical: "/inquire/" },
};

export default function InquirePage() {
  return (
    <section className={`navySection ${styles.page}`}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Inquire</h1>
        <p className={styles.subtitle}>
          Please tell us about yourself, your current priorities, and how you discovered us.
          <br />
          Confidential by default. Response within 24 hours.
        </p>
        <hr className={styles.divider} />
        <ContactInfo className={styles.contactItem} />
      </div>
    </section>
  );
}
