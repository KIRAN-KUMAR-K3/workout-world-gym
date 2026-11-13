import {
  address,
  admissionFee,
  admissionFeeNote,
  formatINR,
  hoursSummary,
  membershipPlans,
} from '@/config/siteConfig';

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Frequently asked questions. Every answer is built from the verified details
 * in siteConfig.ts, so changing a price or the hours there updates it here.
 */
export const faqs: FaqItem[] = [
  {
    question: 'What are your opening hours?',
    answer: `We are open ${hoursSummary.weekdays}, ${hoursSummary.weekdayHours}. The gym is closed on Sundays.`,
  },
  {
    question: 'How much does membership cost?',
    answer: `${membershipPlans
      .map((p) => `${p.duration}: ${formatINR(p.fee)}`)
      .join('. ')}. There is also a one-time admission fee of ${formatINR(
      admissionFee,
    )} when you first join.`,
  },
  {
    question: 'What is the admission fee?',
    answer: admissionFeeNote,
  },
  {
    question: 'How do I join?',
    answer:
      'Tap any “Join now” button to fill in our short enquiry form, or simply walk in. The form is an enquiry, not a confirmed membership — our team will get in touch to help you get started.',
  },
  {
    question: 'Can I pay online?',
    answer:
      'No. This website does not collect payments. Membership fees are paid in person at the gym.',
  },
  {
    question: 'Do you have student or couple memberships?',
    answer:
      'Student discounts, couple memberships and special offers are discussed directly at the gym. Visit us and speak with our team.',
  },
  {
    question: 'Do you offer personal training and diet plans?',
    answer:
      'Yes. Personal training, diet plans and fitness consultations are available. Packages and pricing are shared when you visit the gym.',
  },
  {
    question: 'Where is the gym?',
    answer: `${address.line1}, ${address.line2}, ${address.city} – ${address.pincode}. We are right by the M.S. Ramaiah Bus Stop in Mathikere.`,
  },
];
