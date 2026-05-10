import type { Metadata } from "next";
import Script from "next/script";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Request an introduction to Upper East Side Therapy. Psychotherapy and couples therapy in Manhattan. Response within 24 hours.",
  alternates: { canonical: "/inquire/" },
};

export default function InquirePage() {
  return (
    <section className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Inquire</h1>
        <p className={styles.subtitle}>
          Please tell us about yourself, your current priorities, and how you
          discovered us.
          <br />
          Confidential by default. Response within 24 hours.
        </p>
        <hr className={styles.divider} />
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/samuel-valenceprivate/consultation-call?background_color=faf9f6&text_color=002042&primary_color=002042"
          style={{ minWidth: "320px", height: "700px" }}
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
        <hr className={styles.divider} />
        <ContactInfo className={styles.contactItem} />
      </div>
    </section>
  );
}
