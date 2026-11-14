import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import SmartImage from '@/components/SmartImage';
import { MapPin } from 'lucide-react';
import { contact, externalLinkProps } from '@/config/siteConfig';
import { media } from '@/config/media';
import { safeLink } from '@/lib/safeUrl';

/** Build a WhatsApp link with a tailored prefilled message. */
function wa(message: string) {
  return safeLink(
    `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`,
  );
}

const services = [
  {
    title: 'Personal training',
    text: 'Individual workout guidance and one-on-one coaching, so you train with correct form and steady progression.',
  },
  {
    title: 'Strength development',
    text: 'Structured programming focused on building strength, muscle and consistency over time.',
  },
  {
    title: 'Diet plans',
    text: 'Practical nutrition guidance designed around your goals, preferences and daily routine.',
  },
  {
    title: 'Fitness consultations',
    text: 'Sit down with our team to plan your fitness goals and set a clear path forward.',
  },
];

export default function Services() {
  return (
    <section id="services" className="section-pad relative bg-bg-soft">
      <div className="container-px grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="group aspect-[4/5] overflow-hidden rounded-[2rem] border border-line lg:sticky lg:top-28">
            <SmartImage
              src={media.services}
              grade
              placeholderLabel="Deepak Kaverappa"
              alt="Deepak Kaverappa holding a rear double-biceps pose on the gym floor"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading
            layout="stack"
            title="Coaching that moves you forward"
            description="From personal training to diet plans and fitness consultations, our team helps you train smart and stay consistent."
          />

          <dl className="mt-10 border-t border-line">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <div className="grid gap-x-8 gap-y-1 border-b border-line py-6 sm:grid-cols-5">
                  <dt className="display-title text-3xl text-ink sm:col-span-2">
                    {s.title}
                  </dt>
                  <dd className="leading-relaxed text-ink-muted sm:col-span-3">
                    {s.text}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={wa(
                  'Hello Workout World Gym, I would like to enquire about personal training.',
                )}
                {...externalLinkProps}
                className="btn-primary"
              >
                Enquire about personal training
              </a>
              <a
                href={wa(
                  'Hello Workout World Gym, I would like to book a fitness consultation.',
                )}
                {...externalLinkProps}
                className="btn-outline"
              >
                Fitness consultation
              </a>
              <a
                href={contact.mapsHref}
                {...externalLinkProps}
                className="btn-outline"
              >
                <MapPin className="h-4 w-4" aria-hidden /> Visit our gym
              </a>
            </div>
            <p className="mt-5 max-w-xl text-sm text-ink-muted">
              Personal training packages and pricing are shared when you visit
              the gym.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
