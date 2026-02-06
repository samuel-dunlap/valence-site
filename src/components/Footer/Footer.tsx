import Image from "next/image";
import Link from "next/link";
import { SITE, NAV_LINKS, FOOTER_HREFS } from "@/lib/constants";
import { formatPhoneForLink } from "@/lib/utils";
import styles from "./Footer.module.css";

const FOOTER_LINKS = NAV_LINKS.filter((l) => FOOTER_HREFS.has(l.href));

export default function Footer(): React.ReactElement {
  return (
    <footer className={`navySection ${styles.footer}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Image
            src="/images/logo-mark.png"
            alt="Valence"
            width={40}
            height={40}
            className={styles.logo}
          />
          <p className={styles.text}>{SITE.copyright}</p>
          <p className={styles.text}>
            {SITE.address.street}, {SITE.address.city}, {SITE.address.state}{" "}
            {SITE.address.zip}
          </p>
          <p className={styles.text}>
            <a href={`tel:${formatPhoneForLink(SITE.phone)}`}>{SITE.phone}</a>
          </p>
        </div>
        <nav className={styles.nav}>
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
