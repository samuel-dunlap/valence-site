"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Accordion.module.css";

interface AccordionSection {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  sections: AccordionSection[];
}

export default function Accordion({ sections }: AccordionProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    sections.forEach((section) => {
      if (section.defaultOpen) initial.add(section.title);
    });
    return initial;
  });

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  const measureHeights = useCallback(() => {
    const measured = contentRefs.current.map((ref) => ref?.scrollHeight ?? 0);
    setHeights(measured);
  }, []);

  useEffect(() => {
    measureHeights();
  }, [measureHeights, sections]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      measureHeights();
    });

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [measureHeights, sections]);

  const toggle = (title: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  return (
    <div className={styles.accordion}>
      {sections.map((section, i) => {
        const isOpen = openSections.has(section.title);

        return (
          <div key={section.title} className={styles.section}>
            <button
              type="button"
              className={styles.header}
              onClick={() => toggle(section.title)}
              aria-expanded={isOpen}
            >
              <span className={styles.title}>{section.title}</span>
              <span
                className={`${styles.indicator} ${isOpen ? styles.indicatorOpen : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <div
              className={styles.contentWrapper}
              style={{
                maxHeight: isOpen ? `${heights[i] ?? 0}px` : "0px",
              }}
            >
              <div
                className={styles.content}
                ref={(el) => {
                  contentRefs.current[i] = el;
                }}
              >
                {section.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
