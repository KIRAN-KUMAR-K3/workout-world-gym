import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import LoopVideo from '@/components/LoopVideo';
import { media } from '@/config/media';

/** Three looping training clips — the site's "moving pictures". */
export default function Reels() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-px relative">
        <SectionHeading
          title="Press. Pull. Lift."
          description="Strength is built one rep at a time. This is what the work looks like."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {media.reels.map((reel, i) => (
            <Reveal key={reel.title} delay={i * 0.06}>
              <article
                className={`group relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-line ${
                  i === 1 ? 'md:translate-y-10' : ''
                }`}
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <LoopVideo src={reel.src} poster={reel.poster} />
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <h3 className="display-title text-6xl text-ink">
                    {reel.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">{reel.caption}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {/* Room for the offset middle tile */}
        <div className="hidden md:block md:h-10" aria-hidden />
      </div>
    </section>
  );
}
