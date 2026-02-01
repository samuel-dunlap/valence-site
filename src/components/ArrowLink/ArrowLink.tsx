import Link from "next/link";
import styles from "./ArrowLink.module.css";

interface ArrowLinkProps {
  text: string;
  href: string;
  variant?: "light" | "dark";
}

export default function ArrowLink({
  text,
  href,
  variant = "dark",
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`${styles.link} ${variant === "light" ? styles.light : styles.dark}`}
    >
      {text} →
    </Link>
  );
}
