'use client';

import { useState, useEffect } from 'react';
import styles from './IntroOverlay.module.css';

const INTRO_KEY = 'valence-intro-seen';
const EXPAND_LETTERS = ['A', 'L', 'E', 'N', 'C', 'E'];

const TIMING = {
  SHOW_MARK: 35,
  START_EXPAND: 385,
  START_EXIT: 1155,
  COMPLETE: 1575,
} as const;

type Phase = 'initial' | 'mark' | 'expand' | 'exit' | 'done';

export default function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>('initial');

  useEffect(() => {
    if (sessionStorage.getItem(INTRO_KEY)) {
      setPhase('done');
      return;
    }

    const t1 = setTimeout(() => setPhase('mark'), TIMING.SHOW_MARK);
    const t2 = setTimeout(() => setPhase('expand'), TIMING.START_EXPAND);
    const t3 = setTimeout(() => setPhase('exit'), TIMING.START_EXIT);
    const t4 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem(INTRO_KEY, '1');
    }, TIMING.COMPLETE);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (phase === 'done') return null;

  const showMark = phase !== 'initial';
  const expanded = phase === 'expand' || phase === 'exit';
  const exiting = phase === 'exit';

  return (
    <div
      className={`${styles.overlay} ${exiting ? styles.exiting : ''}`}
      aria-hidden="true"
    >
      <div className={`${styles.wordmark} ${showMark ? styles.visible : ''}`}>
        <span className={`${styles.colon} ${expanded ? styles.punctuationVisible : ''}`}>:</span>
        <span className={styles.letter}>V</span>
        <span
          className={`${styles.expandGroup} ${expanded ? styles.expanded : ''}`}
        >
          {EXPAND_LETTERS.map((char, i) => (
            <span
              key={i}
              className={styles.expandLetter}
              style={{ transitionDelay: expanded ? `${i * 60}ms` : '0ms' }}
            >
              {char}
            </span>
          ))}
        </span>
        <span className={`${styles.period} ${expanded ? styles.punctuationVisible : ''}`}>.</span>
      </div>
    </div>
  );
}
