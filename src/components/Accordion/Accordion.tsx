"use client";

import { useState } from "react";
import styles from "./Accordion.module.css";

interface AccordionItem {
  title: string;
  children: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({
  items,
}: AccordionProps): React.ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={styles.item}>
            <button
              className={styles.trigger}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className={styles.triggerText}>{item.title}</span>
              <span
                className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
              >
                +
              </span>
            </button>
            <div
              className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
              role="region"
              hidden={!isOpen}
            >
              <div className={styles.panelContent}>{item.children}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
