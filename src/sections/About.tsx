import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import SmartImage from '@/components/SmartImage';
import {
  services,
  registrationFormUrl,
  externalLinkProps,
} from '@/config/siteConfig';
import { media } from '@/config/media';

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-px grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading
            layout="stack"
            title="A gym built for real results"
            description="Workout World Gym in Mathikere, Bengaluru is a dedicated strength and fitness space for people who are serious about change. Whether you are lifting for the first time or chasing a new personal best, our floor, equipment and coaching are here to back your discipline."
          />

          <Reveal delay={0.1}>
            <ul className="mt-9 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
              {services.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 border-b border-line py-3.5 text-ink"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {service}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <a
              href={registrationFormUrl}
              {...externalLinkProps}
              className="btn-primary mt-10"
            >
              Start your journey
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="lg:col-span-6">
          <div className="group aspect-[4/5] overflow-hidden rounded-[2rem] border border-line">
            <SmartImage
              src={media.about}
              grade
              placeholderLabel="Gym floor"
              alt="Dimly lit gym floor with rows of strength machines"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
