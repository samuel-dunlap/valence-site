"use client";

import { useState, useEffect } from "react";
import { safeSessionGet, safeSessionSet } from "@/lib/storage";
import styles from "./IntroOverlay.module.css";

const INTRO_KEY = "uest-intro-seen";

const TIMING = {
  SHOW_TEXT: 35,
  START_EXIT: 1155,
  COMPLETE: 1575,
  FAILSAFE: 3000,
} as const;

type Phase = "initial" | "visible" | "exit" | "done";

export default function IntroOverlay(): React.ReactElement | null {
  const [phase, setPhase] = useState<Phase>("done");

  useEffect(() => {
    const removePendingClass = () =>
      document.documentElement.classList.remove("intro-pending");

    if (safeSessionGet(INTRO_KEY)) {
      removePendingClass();
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      safeSessionSet(INTRO_KEY, "1");
      removePendingClass();
      return;
    }

    safeSessionSet(INTRO_KEY, "1");

    const t0 = setTimeout(() => {
      setPhase("initial");
      removePendingClass();
    }, 0);

    const t1 = setTimeout(() => setPhase("visible"), TIMING.SHOW_TEXT);
    const t2 = setTimeout(() => setPhase("exit"), TIMING.START_EXIT);
    const t3 = setTimeout(() => setPhase("done"), TIMING.COMPLETE);

    const failsafe = setTimeout(() => {
      setPhase("done");
    }, TIMING.FAILSAFE);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(failsafe);
    };
  }, []);

  if (phase === "done") return null;

  const showText = phase !== "initial";
  const exiting = phase === "exit";

  return (
    <div
      className={`${styles.overlay} ${exiting ? styles.exiting : ""}`}
      aria-hidden="true"
    >
      <div className={`${styles.wordmark} ${showText ? styles.visible : ""}`}>
        Upper East Side Therapy
      </div>
    </div>
  );
}
