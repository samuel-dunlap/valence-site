'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { SITE, NAV_LINKS } from '@/lib/constants';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const renderLogo = (variant: 'full' | 'mark') => {
    const text = variant === 'full' ? SITE.logoFull : SITE.logoMark;
    return (
      <span className={styles.logoText}>
        {text.split('').map((char, i) => (
          <span
            key={i}
            className={
              char === ':' || char === '.'
                ? styles.logoPunctuation
                : styles.logoLetter
            }
          >
            {char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} aria-label="Valence Home">
            <span className={styles.logoFull}>{renderLogo('full')}</span>
            <span className={styles.logoMark}>{renderLogo('mark')}</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  pathname === link.href ? styles.active : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </header>

      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <button
          className={styles.closeBtn}
          onClick={closeMenu}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
        >
          <span className={styles.closeLine} />
          <span className={styles.closeLine} />
        </button>

        <nav className={styles.overlayNav} aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.overlayLink} ${
                pathname === link.href ? styles.overlayLinkActive : ''
              }`}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
