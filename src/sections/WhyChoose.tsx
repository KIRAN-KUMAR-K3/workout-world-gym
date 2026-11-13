import Reveal from '@/components/Reveal';
import { whyChoose } from '@/data/content';

/** Reasons to train here — set as plain text columns, no boxes. */
export default function WhyChoose() {
  return (
    <section className="section-pad relative bg-bg-soft">
      <div className="container-px grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="display-title text-6xl text-ink sm:text-7xl lg:sticky lg:top-28 lg:text-8xl">
            Why Workout World?
          </h2>
        </Reveal>

        <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {whyChoose.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.05}>
              <div className="border-t border-line py-7">
                <dt className="text-xl font-semibold text-ink">{item.title}</dt>
                <dd className="mt-2 leading-relaxed text-ink-muted">
                  {item.description}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
