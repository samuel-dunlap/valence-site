"use client";

import { useState, useEffect } from "react";
import { safeSessionGet, safeSessionSet } from "@/lib/storage";
import styles from "./IntroOverlay.module.css";

const INTRO_KEY = "valence-intro-seen";
const EXPAND_LETTERS = ["A", "L", "E", "N", "C", "E"];

const TIMING = {
  SHOW_MARK: 35,
  START_EXPAND: 385,
  START_EXIT: 1155,
  COMPLETE: 1575,
  FAILSAFE: 3000, // Force hide after 3 seconds as failsafe
} as const;

type Phase = "initial" | "mark" | "expand" | "exit" | "done";

export default function IntroOverlay(): React.ReactElement | null {
  // Start as "done" to match SSR output (null) and avoid hydration mismatch.
  // The mount effect below will initialise the real phase on the client.
  const [phase, setPhase] = useState<Phase>("done");

  useEffect(() => {
    // Skip if already seen this session
    if (safeSessionGet(INTRO_KEY)) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      safeSessionSet(INTRO_KEY, "1");
      return;
    }

    // Mark as seen immediately to prevent replays on back-navigation
    safeSessionSet(INTRO_KEY, "1");

    // Kick off the animation timeline
    setPhase("initial");

    const t1 = setTimeout(() => setPhase("mark"), TIMING.SHOW_MARK);
    const t2 = setTimeout(() => setPhase("expand"), TIMING.START_EXPAND);
    const t3 = setTimeout(() => setPhase("exit"), TIMING.START_EXIT);
    const t4 = setTimeout(() => setPhase("done"), TIMING.COMPLETE);

    // Failsafe: Force completion after max time to prevent stuck overlay
    const failsafe = setTimeout(() => {
      setPhase("done");
    }, TIMING.FAILSAFE);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(failsafe);
    };
  }, []); // Empty dependency array - run once on mount

  if (phase === "done") return null;

  const showMark = phase !== "initial";
  const expanded = phase === "expand" || phase === "exit";
  const exiting = phase === "exit";

  return (
    <div
      className={`${styles.overlay} ${exiting ? styles.exiting : ""}`}
      aria-hidden="true"
    >
      <div className={`${styles.wordmark} ${showMark ? styles.visible : ""}`}>
        <span
          className={`${styles.colon} ${expanded ? styles.punctuationVisible : ""}`}
        >
          :
        </span>
        <span className={styles.letter}>V</span>
        <span
          className={`${styles.expandGroup} ${expanded ? styles.expanded : ""}`}
        >
          {EXPAND_LETTERS.map((char, i) => (
            <span
              key={`letter-${char}-${i}`}
              className={styles.expandLetter}
              style={{ transitionDelay: expanded ? `${i * 60}ms` : "0ms" }}
            >
              {char}
            </span>
          ))}
        </span>
        <span
          className={`${styles.period} ${expanded ? styles.punctuationVisible : ""}`}
        >
          .
        </span>
      </div>
    </div>
  );
}
