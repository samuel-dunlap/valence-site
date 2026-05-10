import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn/FadeIn";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import Accordion from "@/components/Accordion/Accordion";
import StructuredData from "@/components/StructuredData/StructuredData";
import { CTA } from "@/lib/constants";
import sharedStyles from "@/styles/page-header.module.css";
import content from "@/styles/content.module.css";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about therapy at Upper East Side Therapy, including rates, scheduling, insurance, and what to expect.",
  alternates: { canonical: "/faq/" },
};

const faqItems = [
  {
    title: "What should I expect in a first session?",
    children: (
      <p>
        A conversation. You share what brings you here, ask any questions you
        have, and we begin to understand whether working together makes sense.
        There is no pressure to commit &mdash; the first session is about fit.
      </p>
    ),
  },
  {
    title: "What types of therapy do you offer?",
    children: (
      <p>
        Individual psychotherapy for adults, young adults, adolescents, and
        children. Couples and marriage counseling. Family therapy. We also offer
        wellness coaching, career coaching, and depth performance training. All
        services are available in-person and via telehealth.
      </p>
    ),
  },
  {
    title: "What issues do you work with?",
    children: (
      <p>
        Anxiety, depression, trauma and PTSD, relationship difficulties, grief
        and loss, stress and burnout, life transitions, creative blocks, and the
        particular pressures that come with high-performance careers. If
        you&rsquo;re unsure whether what you&rsquo;re dealing with fits, reach
        out &mdash; most things do.
      </p>
    ),
  },
  {
    title: "What is your approach to therapy?",
    children: (
      <p>
        Depth psychotherapy &mdash; work that goes past symptom management into
        the underlying patterns, beliefs, and experiences shaping your life. We
        draw on depth psychology, developmental theory, somatic approaches, and
        contemplative practice. The format adapts to how you think and what you
        need.
      </p>
    ),
  },
  {
    title: "How long are sessions, and how many will I need?",
    children: (
      <p>
        Standard sessions are 50 minutes. The number of sessions depends on what
        you&rsquo;re working on &mdash; some people come for a few months around
        a specific issue, others engage in longer-term work. We discuss what
        makes sense for you early on and revisit as the work unfolds.
      </p>
    ),
  },
  {
    title: "What are your rates?",
    children: (
      <p>
        Fees vary by engagement type and are discussed during your initial
        consultation.
      </p>
    ),
  },
  {
    title: "Do you take insurance?",
    children: (
      <p>
        We are out-of-network. After each session you receive a superbill
        &mdash; a receipt you submit to your insurer for partial reimbursement.
        Reimbursement rates vary by plan. Contact your insurance company to ask
        about out-of-network mental health benefits, your deductible, and what
        percentage is reimbursed.
      </p>
    ),
  },
  {
    title: "Do you offer evening or weekend appointments?",
    children: (
      <p>
        Yes. We offer flexible scheduling including evening appointments.
        Weekend availability is limited &mdash; reach out to discuss what works.
      </p>
    ),
  },
  {
    title: "Where is your office?",
    children: (
      <p>
        654 Madison Avenue, New York, NY 10065. You&rsquo;ll receive building
        entry details with your appointment confirmation.
      </p>
    ),
  },
  {
    title: "Do you serve areas beyond the Upper East Side?",
    children: (
      <p>
        Yes. While our office is on the Upper East Side, we work with clients
        from across Manhattan and the greater New York area. Telehealth sessions
        are available for anyone in New York State.
      </p>
    ),
  },
  {
    title: "Do you offer telehealth?",
    children: (
      <p>
        Yes. Secure video and phone sessions for individuals and couples.
        Telehealth is available to anyone located in New York State at the time
        of the session.
      </p>
    ),
  },
  {
    title: "What is your cancellation policy?",
    children: (
      <p>
        We require 24 hours&rsquo; notice for cancellations or rescheduling.
        Missed appointments and late cancellations are billed at the full
        session rate.
      </p>
    ),
  },
  {
    title: "How do I schedule or reschedule?",
    children: (
      <p>
        New clients can reach out through our inquiry page. Existing clients can
        rebook or schedule additional appointments at any time using the
        scheduling link provided. If you need help, reach out directly.
      </p>
    ),
  },
  {
    title: "How do I make a payment?",
    children: (
      <p>
        Payments are due on or before the date of your session. You will receive
        payment instructions during onboarding.
      </p>
    ),
  },
  {
    title: "What paperwork should I complete before we meet?",
    children: (
      <p>
        Complete the secure intake form before your first session. You will
        receive a link with instructions after scheduling.
      </p>
    ),
  },
  {
    title: "Who will I be working with?",
    children: (
      <p>
        Your therapist. All sessions and communication are handled directly
        &mdash; nothing is delegated.
      </p>
    ),
  },
  {
    title: "Is everything confidential?",
    children: (
      <p>
        Yes. All sessions and communication are strictly confidential, in
        keeping with the legal and ethical standards of the profession. The
        narrow exceptions &mdash; imminent harm, child abuse, court order
        &mdash; are reviewed at the start of treatment.
      </p>
    ),
  },
  {
    title: "Can you provide referrals to other specialists?",
    children: (
      <p>
        Yes. We work with a network of psychiatrists, physicians, and
        specialized therapists and will connect you when needed.
      </p>
    ),
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should I expect in a first session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A conversation. You share what brings you here, ask any questions you have, and we begin to understand whether working together makes sense. There is no pressure to commit — the first session is about fit.",
      },
    },
    {
      "@type": "Question",
      name: "What types of therapy do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Individual psychotherapy for adults, young adults, adolescents, and children. Couples and marriage counseling. Family therapy. We also offer wellness coaching, career coaching, and depth performance training. All services are available in-person and via telehealth.",
      },
    },
    {
      "@type": "Question",
      name: "What issues do you work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anxiety, depression, trauma and PTSD, relationship difficulties, grief and loss, stress and burnout, life transitions, creative blocks, and the particular pressures that come with high-performance careers. If you’re unsure whether what you’re dealing with fits, reach out — most things do.",
      },
    },
    {
      "@type": "Question",
      name: "What is your approach to therapy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depth psychotherapy — work that goes past symptom management into the underlying patterns, beliefs, and experiences shaping your life. We draw on depth psychology, developmental theory, somatic approaches, and contemplative practice. The format adapts to how you think and what you need.",
      },
    },
    {
      "@type": "Question",
      name: "How long are sessions, and how many will I need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard sessions are 50 minutes. The number of sessions depends on what you’re working on — some people come for a few months around a specific issue, others engage in longer-term work. We discuss what makes sense for you early on and revisit as the work unfolds.",
      },
    },
    {
      "@type": "Question",
      name: "What are your rates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fees vary by engagement type and are discussed during your initial consultation.",
      },
    },
    {
      "@type": "Question",
      name: "Do you take insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are out-of-network. After each session you receive a superbill — a receipt you submit to your insurer for partial reimbursement. Reimbursement rates vary by plan. Contact your insurance company to ask about out-of-network mental health benefits, your deductible, and what percentage is reimbursed.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer evening or weekend appointments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer flexible scheduling including evening appointments. Weekend availability is limited — reach out to discuss what works.",
      },
    },
    {
      "@type": "Question",
      name: "Where is your office?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "654 Madison Avenue, New York, NY 10065. You’ll receive building entry details with your appointment confirmation.",
      },
    },
    {
      "@type": "Question",
      name: "Do you serve areas beyond the Upper East Side?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. While our office is on the Upper East Side, we work with clients from across Manhattan and the greater New York area. Telehealth sessions are available for anyone in New York State.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer telehealth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Secure video and phone sessions for individuals and couples. Telehealth is available to anyone located in New York State at the time of the session.",
      },
    },
    {
      "@type": "Question",
      name: "What is your cancellation policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We require 24 hours’ notice for cancellations or rescheduling. Missed appointments and late cancellations are billed at the full session rate.",
      },
    },
    {
      "@type": "Question",
      name: "How do I schedule or reschedule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "New clients can reach out through our inquiry page. Existing clients can rebook or schedule additional appointments at any time using the scheduling link provided. If you need help, reach out directly.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make a payment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Payments are due on or before the date of your session. You will receive payment instructions during onboarding.",
      },
    },
    {
      "@type": "Question",
      name: "What paperwork should I complete before we meet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Complete the secure intake form before your first session. You will receive a link with instructions after scheduling.",
      },
    },
    {
      "@type": "Question",
      name: "Who will I be working with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your therapist. All sessions and communication are handled directly — nothing is delegated.",
      },
    },
    {
      "@type": "Question",
      name: "Is everything confidential?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All sessions and communication are strictly confidential, in keeping with the legal and ethical standards of the profession. The narrow exceptions — imminent harm, child abuse, court order — are reviewed at the start of treatment.",
      },
    },
    {
      "@type": "Question",
      name: "Can you provide referrals to other specialists?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work with a network of psychiatrists, physicians, and specialized therapists and will connect you when needed.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      <FadeIn>
        <section className={sharedStyles.header}>
          <div className={sharedStyles.headerContent}>
            <h1 className={sharedStyles.title}>Frequently Asked Questions</h1>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={content.section}>
          <Accordion items={faqItems} />
        </section>
      </FadeIn>

      <section className={content.cta}>
        <ArrowLink text={CTA.requestIntroduction} href="/inquire" />
      </section>
    </>
  );
}
