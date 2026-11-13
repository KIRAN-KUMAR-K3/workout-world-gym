import Reveal from '@/components/Reveal';
import { GraduationCap, Heart, Gift, MapPin } from 'lucide-react';
import { contact, externalLinkProps } from '@/config/siteConfig';

const offers = [
  {
    icon: GraduationCap,
    title: 'Student membership',
    text: 'Studying nearby? Ask about student-friendly options when you visit.',
  },
  {
    icon: Heart,
    title: 'Couple membership',
    text: 'Training together keeps you both accountable. Ask our team in person.',
  },
  {
    icon: Gift,
    title: 'Special offers',
    text: 'We run offers from time to time. Drop in to hear what’s on now.',
  },
];

/** Student, couple and special-offer enquiries — all handled at the gym. */
export default function SpecialEnquiries() {
  return (
    <section className="section-pad relative" aria-labelledby="offers-title">
      <div className="container-px">
        <div className="overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-bg-soft to-bg">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-14">
            <Reveal className="lg:col-span-7">
              <h2
                id="offers-title"
                className="display-title text-6xl text-ink sm:text-7xl"
              >
                Student, couple and special offers
              </h2>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-5">
              <p className="text-lg leading-relaxed text-ink-muted">
                Interested in student discounts, couple memberships or special
                offers? Visit Workout World Gym and speak directly with our
                team.
              </p>
              <a
                href={contact.mapsHref}
                {...externalLinkProps}
                className="btn-primary mt-7"
              >
                <MapPin className="h-4 w-4" aria-hidden /> Visit our gym
              </a>
            </Reveal>
          </div>

          <ul className="grid border-t border-line sm:grid-cols-3 sm:divide-x sm:divide-line">
            {offers.map((offer) => (
              <li
                key={offer.title}
                className="border-b border-line p-7 last:border-b-0 sm:border-b-0 sm:p-8 lg:px-14"
              >
                <offer.icon
                  className="h-6 w-6 text-accent"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  {offer.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {offer.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
