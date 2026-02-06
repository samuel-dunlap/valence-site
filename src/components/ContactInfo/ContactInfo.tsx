"use client";

import { SITE } from "@/lib/constants";
import { formatPhoneForLink } from "@/lib/utils";

interface ContactInfoProps {
  className?: string;
}

export default function ContactInfo({ className }: ContactInfoProps): React.ReactElement | null {
  const phone = SITE.phone;
  const email = SITE.email;

  // Defensive check - return null if essential contact info is missing
  if (!phone || !email) {
    console.error("SITE.phone or SITE.email is not defined in constants");
    return null;
  }

  const phoneLink = formatPhoneForLink(phone);

  return (
    <>
      <p className={className}>
        c: <a href={`tel:${phoneLink}`}>{phone}</a>
      </p>
      <p className={className}>
        e: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p className={className}>{SITE.address.street}</p>
      <p className={className}>
        {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
      </p>
    </>
  );
}
