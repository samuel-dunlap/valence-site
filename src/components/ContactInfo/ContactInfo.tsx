"use client";

import { SITE } from "@/lib/constants";
import { formatPhoneForLink } from "@/lib/utils";

interface ContactInfoProps {
  className?: string;
}

export default function ContactInfo({
  className,
}: ContactInfoProps): React.ReactElement | null {
  const phone = SITE.phone;

  if (!phone) {
    console.error("SITE.phone is not defined in constants");
    return null;
  }

  const phoneLink = formatPhoneForLink(phone);

  return (
    <>
      <p className={className}>
        c: <a href={`tel:${phoneLink}`}>{phone}</a>
      </p>
      <p className={className}>
        {SITE.address.street}, {SITE.address.city}, {SITE.address.state}{" "}
        {SITE.address.zip}
      </p>
    </>
  );
}
