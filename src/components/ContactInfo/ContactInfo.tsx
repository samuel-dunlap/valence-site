"use client";

import { useState, useEffect } from "react";
import { SITE } from "@/lib/constants";

interface ContactInfoProps {
  className?: string;
}

export default function ContactInfo({ className }: ContactInfoProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  if (!visible) {
    return (
      <>
        <p className={className}>Loading contact details&hellip;</p>
      </>
    );
  }

  const phone = SITE.phone;
  const email = SITE.email;
  const cleanPhone = phone.replace(/\D/g, "");

  return (
    <>
      <p className={className}>
        c: <a href={`tel:+1${cleanPhone}`}>{phone}</a>
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
