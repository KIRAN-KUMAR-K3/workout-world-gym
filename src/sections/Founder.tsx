import Reveal from '@/components/Reveal';
import SmartImage from '@/components/SmartImage';
import { Instagram, Trophy } from 'lucide-react';
import {
  contact,
  externalLinkProps,
  registrationFormUrl,
  owner,
  ownerPhoto,
} from '@/config/siteConfig';
import { media } from '@/config/media';

export default function Founder() {
  return (
    <section id="founder" className="section-pad relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgb(var(--accent)/0.08),transparent_55%)]"
        aria-hidden
      />
      {/* Oversized outline name running behind the section */}
      <span
        className="text-stroke-accent pointer-events-none absolute -top-2 left-0 select-none whitespace-nowrap font-display text-[22vw] leading-none opacity-[0.07]"
        aria-hidden
      >
        KAVERAPPA
      </span>

      <div className="container-px relative grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Photo */}
        <Reveal className="relative lg:col-span-7">
          {/* Gradient frame */}
          <div className="rounded-[1.75rem] bg-gradient-to-br from-accent via-accent/20 to-accent-2 p-px shadow-glow">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.7rem] bg-bg">
              {ownerPhoto ? (
                <SmartImage
                  src={ownerPhoto}
                  placeholderLabel={owner.name}
                  alt={`${owner.name}, founder of Workout World Gym, performing a cable crossover on the gym floor`}
                />
              ) : (
                /* Designed monogram shown when no photo is configured */
                <div className="grain relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-bg-soft via-bg to-bg">
                  <div
                    className="absolute h-64 w-64 rounded-full bg-accent/20 blur-3xl"
                    aria-hidden
                  />
                  <span
                    className="text-stroke-accent relative select-none font-display text-[11rem] leading-none"
                    aria-hidden
                  >
                    DK
                  </span>
                </div>
              )}
              {/* Cinematic grading */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent"
                aria-hidden
              />
              {/* Name plate */}
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <div>
                  <p className="display-title text-4xl text-ink sm:text-5xl">
                    {owner.name}
                  </p>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {owner.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="display-title text-6xl text-ink sm:text-7xl lg:text-8xl">
              Led by a champion
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
              Workout World Gym is founded and led by Deepak Kaverappa, an
              international bodybuilder who brings real competitive experience
              to the training floor. His standards shape how the gym is run:
              serious equipment, honest guidance and a focus on helping every
              member train with purpose.
            </p>
          </Reveal>

          {/* Competition titles */}
          <Reveal delay={0.09}>
            <ul
              className="mt-7 flex flex-wrap gap-2"
              aria-label="Competition titles"
            >
              {owner.titles.map((title) => (
                <li
                  key={title}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-soft px-3.5 py-1.5 text-sm font-medium text-ink"
                >
                  <Trophy className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {title}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Competition moments */}
          <Reveal delay={0.12}>
            <ul className="mt-7 grid grid-cols-3 gap-3">
              {media.founder.moments.map((m) => (
                <li
                  key={m.src}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line"
                >
                  <SmartImage src={m.src} alt={m.alt} placeholderLabel={m.label} />
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent px-3 pb-2.5 pt-8 text-xs font-medium text-ink"
                  >
                    {m.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={registrationFormUrl}
                {...externalLinkProps}
                className="btn-primary"
              >
                Train with us
              </a>
              <a
                href={contact.instagramHref}
                {...externalLinkProps}
                className="btn-outline"
              >
                <Instagram className="h-4 w-4" aria-hidden /> Follow on Instagram
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
