import Reveal from '@/components/Reveal';
import LoopVideo from '@/components/LoopVideo';
import { media } from '@/config/media';
import { registrationFormUrl, externalLinkProps } from '@/config/siteConfig';

/** Full-width cinematic band with a muted, looping background video. */
export default function VideoBand() {
  return (
    <section
      className="relative isolate flex min-h-[80vh] items-end overflow-hidden"
      aria-label="Training motivation"
    >
      <LoopVideo
        src={media.video.src}
        poster={media.video.poster}
        className="-z-20"
      />
      {/* Cinematic grading */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/50 to-bg/20"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-accent opacity-10 mix-blend-soft-light"
        aria-hidden
      />

      <div className="container-px grid w-full items-end gap-8 pb-16 pt-40 lg:grid-cols-12 lg:pb-20">
        <Reveal className="lg:col-span-8">
          <h2 className="display-title text-[15vw] text-ink sm:text-8xl lg:text-[9rem]">
            No shortcuts.
            <br />
            Just plates and progress.
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-4 lg:pb-4">
          <p className="max-w-sm text-lg text-ink-muted">
            Show up, load the bar and put in the reps. We’ll bring the
            equipment, the coaching and the atmosphere.
          </p>
          <a
            href={registrationFormUrl}
            {...externalLinkProps}
            className="btn-primary mt-7"
          >
            Join now
          </a>
        </Reveal>
      </div>
    </section>
  );
}
