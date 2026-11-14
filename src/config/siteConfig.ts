/**
 * =============================================================================
 *  WORKOUT WORLD GYM — CENTRALISED SITE CONFIGURATION
 * =============================================================================
 *  This is the SINGLE SOURCE OF TRUTH for all business information, pricing,
 *  links and the Google Form registration URL.
 *
 *  To update the website, edit the values in THIS FILE ONLY. Every component
 *  reads from here, so there are no duplicated URLs or prices anywhere else.
 *
 *  Common edits:
 *    • Replace the registration form → `registrationFormUrl`
 *    • Change prices            → `membershipPlans` + `admissionFee`
 *    • Change phone / WhatsApp  → `contact`
 *    • Change the live domain   → `site.url`  (also update index.html canonical)
 * =============================================================================
 */

import { safeLink } from '@/lib/safeUrl';
import { media } from '@/config/media';

/* ------------------------------------------------------------------ */
/*  Site / brand                                                       */
/* ------------------------------------------------------------------ */
export const site = {
  name: 'Workout World Gym',
  shortName: 'Workout World',
  tagline: 'Built Different. Train Different.',
  /** Production URL. Update after connecting your Cloudflare Pages / custom domain. */
  url: 'https://workoutworldgym.pages.dev',
  locationLabel: 'Mathikere, Bengaluru',
} as const;

/* ------------------------------------------------------------------ */
/*  Address                                                            */
/* ------------------------------------------------------------------ */
export const address = {
  line1: '#23 GNR Complex, 1st Floor',
  line2: 'M.S. Ramaiah Bus Stop, Mathikere',
  city: 'Bengaluru',
  pincode: '560054',
  state: 'Karnataka',
  country: 'India',
  /** Full one-line address for display / structured data */
  full: '#23 GNR Complex, 1st Floor, M.S. Ramaiah Bus Stop, Mathikere, Bengaluru – 560054, Karnataka, India',
} as const;

/* ------------------------------------------------------------------ */
/*  Contact + social                                                   */
/* ------------------------------------------------------------------ */
const PHONE_RAW = '9686889915';
const PHONE_INTL = '919686889915'; // country code 91 + number

export const contact = {
  phoneDisplay: PHONE_RAW,
  /** Click-to-call */
  phoneHref: safeLink(`tel:+${PHONE_INTL}`),
  whatsappNumber: PHONE_INTL,
  /** WhatsApp with a prefilled enquiry message */
  whatsappHref: safeLink(
    `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(
      'Hello Workout World Gym, I would like to know more about your membership plans.',
    )}`,
  ),
  /** Google Maps location + directions */
  mapsHref: safeLink('https://maps.app.goo.gl/vDCnT9VAuu1QdVuB7'),
  instagramHref: safeLink('https://www.instagram.com/deepakkaverappa/'),
} as const;

/* ------------------------------------------------------------------ */
/*  Registration — ACTUAL Google Form                                 */
/*  Used by every JOIN NOW / REGISTER / MEMBERSHIP ENQUIRY button.     */
/* ------------------------------------------------------------------ */
export const registrationFormUrl = safeLink(
  'https://docs.google.com/forms/d/e/1FAIpQLSfqqR0F8KQCd3UdDBH01BSheaZLr8QrjIcqEVfDTJd1B7ZcHg/viewform',
);

/**
 * Props to spread on any external link so it opens safely in a new tab:
 * `noopener` stops the new page controlling this one, `noreferrer` stops it
 * learning which page the visitor came from.
 */
export const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

/* ------------------------------------------------------------------ */
/*  Founder / owner                                                    */
/*  Photos live in public/images/ and are mapped in src/config/media.ts */
/* ------------------------------------------------------------------ */
export const owner = {
  name: 'Deepak Kaverappa',
  role: 'Founder · International bodybuilder (IFBF)',
  /** Competition titles, as printed on the gym's own signage. */
  titles: ['Mr. Universe (IFBF)', 'Mr. India', 'Mr. Karnataka', 'Mr. Dasara'],
} as const;

/** Main founder photo. Leave undefined to show the "DK" monogram instead. */
export const ownerPhoto: string | undefined = media.founder.main;

/* ------------------------------------------------------------------ */
/*  Colour theme                                                       */
/*  default: 'volt' (lime) | 'inferno' (orange/red) | 'gold' | 'ice'   */
/*  showSwitcher: show the floating palette button so visitors (or     */
/*  you, while deciding) can try each combination. Set to false to     */
/*  lock the site to the default theme.                                */
/* ------------------------------------------------------------------ */
export const theme: {
  default: 'volt' | 'inferno' | 'gold' | 'ice';
  showSwitcher: boolean;
} = {
  default: 'volt',
  showSwitcher: true,
};

/* ------------------------------------------------------------------ */
/*  Opening hours                                                      */
/* ------------------------------------------------------------------ */
export interface OpeningHour {
  day: string;
  hours: string;
  closed: boolean;
}

export const openingHours: OpeningHour[] = [
  { day: 'Monday', hours: '5:00 AM – 11:00 PM', closed: false },
  { day: 'Tuesday', hours: '5:00 AM – 11:00 PM', closed: false },
  { day: 'Wednesday', hours: '5:00 AM – 11:00 PM', closed: false },
  { day: 'Thursday', hours: '5:00 AM – 11:00 PM', closed: false },
  { day: 'Friday', hours: '5:00 AM – 11:00 PM', closed: false },
  { day: 'Saturday', hours: '5:00 AM – 11:00 PM', closed: false },
  { day: 'Sunday', hours: 'Closed', closed: true },
];

export const hoursSummary = {
  weekdays: 'Monday – Saturday',
  weekdayHours: '5:00 AM – 11:00 PM',
  sunday: 'Sunday: Closed',
} as const;

/* ------------------------------------------------------------------ */
/*  Membership pricing                                                 */
/*                                                                     */
/*  admissionFee is a ONE-TIME fee for first-time joiners only.        */
/*  firstTimePayment = membershipFee + admissionFee (computed).        */
/*  renewal          = membershipFee (computed).                       */
/* ------------------------------------------------------------------ */
export const admissionFee = 500;

interface MembershipPlanInput {
  id: string;
  duration: string;
  /** Length of the plan in months (used for the per-month figure) */
  months: number;
  /** Recurring membership fee in INR */
  fee: number;
  /** Visually highlight this plan (no fake "popular" stats) */
  highlight?: boolean;
  /** Short human note, e.g. best value framing (factual only) */
  note?: string;
}

const membershipPlansInput: MembershipPlanInput[] = [
  { id: 'monthly', duration: 'Monthly', months: 1, fee: 1499 },
  { id: '3-months', duration: '3 Months', months: 3, fee: 3999 },
  { id: '6-months', duration: '6 Months', months: 6, fee: 5999 },
  {
    id: '12-months',
    duration: '12 Months',
    months: 12,
    fee: 9999,
    highlight: true,
  },
];

const MONTHLY_FEE = membershipPlansInput[0].fee;

export interface MembershipPlan extends MembershipPlanInput {
  /** Recurring fee (same as fee) */
  membershipFee: number;
  /** First-time payment = fee + one-time admission fee */
  firstTimePayment: number;
  /** Renewal amount = fee only */
  renewal: number;
  /** Fee divided by the number of months, rounded to the nearest rupee */
  perMonth: number;
  /** How much less this plan costs than paying the monthly fee each month */
  savingVsMonthly: number;
}

export const membershipPlans: MembershipPlan[] = membershipPlansInput.map(
  (plan) => ({
    ...plan,
    membershipFee: plan.fee,
    firstTimePayment: plan.fee + admissionFee,
    renewal: plan.fee,
    perMonth: Math.round(plan.fee / plan.months),
    savingVsMonthly: MONTHLY_FEE * plan.months - plan.fee,
  }),
);

/** Format a number as Indian Rupees, e.g. 9999 → "₹9,999" */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export const admissionFeeNote =
  'The ₹500 admission fee is payable only once when joining for the first time. Subsequent renewals require only the selected membership fee.';

export const enquiryDisclaimer =
  'Submitting the registration form is an enquiry only — it is not a confirmed membership. Our team will get in touch, and payments are completed in person at the gym.';

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */
export const services = [
  'Gym membership',
  'Strength training',
  'Weight training',
  'Personal training',
  'Diet plans',
  'Fitness consultations',
  'General fitness training',
] as const;

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Founder', href: '#founder' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Equipment', href: '#equipment' },
  { label: 'Membership', href: '#membership' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
] as const;
