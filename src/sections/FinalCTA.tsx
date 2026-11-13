import Reveal from '@/components/Reveal';
import { Phone } from 'lucide-react';
import {
  registrationFormUrl,
  externalLinkProps,
  contact,
} from '@/config/siteConfig';
import { media } from '@/config/media';
import { safeMediaUrl } from '@/lib/safeUrl';

export default function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-40">
      <img
        src={safeMediaUrl(media.finalCta)}
        referrerPolicy="no-referrer"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/60 to-bg"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(var(--accent)/0.16),transparent_60%)]"
        aria-hidden
      />

      <div className="container-px relative text-center">
        <Reveal>
          <h2 className="display-title mx-auto max-w-5xl text-[17vw] text-ink sm:text-8xl lg:text-[10rem]">
            Your transformation starts today
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-muted">
            Send a quick enquiry and our team will help you get started. It’s
            an enquiry, not a payment — you complete everything in person at
            the gym.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={registrationFormUrl}
              {...externalLinkProps}
              className="btn-primary"
            >
              Join now
            </a>
            <a href={contact.phoneHref} className="btn-outline">
              <Phone className="h-4 w-4" aria-hidden /> Call{' '}
              {contact.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
