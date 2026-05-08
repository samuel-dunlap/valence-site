import Link from "next/link";
import styles from "./ArrowLink.module.css";

interface ArrowLinkProps {
  text: string;
  href: string;
}

export default function ArrowLink({
  text,
  href,
}: ArrowLinkProps): React.ReactElement {
  return (
    <Link href={href} className={styles.link}>
      {text} →
    </Link>
  );
}
