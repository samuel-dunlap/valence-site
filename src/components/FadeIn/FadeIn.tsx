"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FadeIn.module.css";

interface FadeInProps {
  children: React.ReactNode;
}

export default function FadeIn({ children }: FadeInProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isMounted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isMounted) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.wrapper} ${visible ? styles.visible : ""}`}
    >
      {children}
    </div>
  );
}
