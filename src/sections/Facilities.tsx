import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { facilities } from '@/data/content';

/**
 * Facilities as an index: one full-width row per facility, set large, rather
 * than a grid of boxes.
 */
export default function Facilities() {
  return (
    <section id="facilities" className="section-pad relative bg-bg-soft">
      <div className="container-px">
        <SectionHeading
          title="Everything you need to train"
          description="A complete training environment under one roof in Mathikere."
        />

        <ul className="mt-14 border-t border-line">
          {facilities.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.04}>
              <div className="group grid items-center gap-x-8 gap-y-2 border-b border-line py-6 transition-colors duration-300 hover:bg-white/[0.02] sm:py-7 lg:grid-cols-12">
                <div className="flex items-center gap-5 lg:col-span-6">
                  <item.icon
                    className="h-7 w-7 shrink-0 text-ink-muted transition-colors duration-300 group-hover:text-accent"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className="display-title text-4xl text-ink transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                    {item.title}
                  </h3>
                </div>
                <p className="pl-12 text-ink-muted lg:col-span-6 lg:pl-0 lg:text-lg">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
