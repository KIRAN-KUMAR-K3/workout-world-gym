import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import SmartImage from '@/components/SmartImage';
import Reveal from '@/components/Reveal';
import { gallerySlots } from '@/data/content';
import { lockScroll } from '@/lib/scroll';

/**
 * Bento layout: how many columns/rows each tile spans. Seven tiles fill a
 * 4-column grid exactly (3 rows): [2x2][1][tall] / [2x2][1][tall] / [wide][1][1].
 */
const SPANS = [
  'col-span-2 row-span-2',
  '',
  'row-span-2',
  '',
  'col-span-2',
  '',
  '',
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + gallerySlots.length) % gallerySlots.length,
      ),
    [],
  );
  const next = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i + 1) % gallerySlots.length,
      ),
    [],
  );

  // Keyboard controls for the lightbox
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    lockScroll(true);
    return () => {
      document.removeEventListener('keydown', onKey);
      lockScroll(false);
    };
  }, [openIndex, close, prev, next]);

  const active = openIndex === null ? null : gallerySlots[openIndex];

  return (
    <section id="gallery" className="section-pad relative">
      <div className="container-px">
        <SectionHeading
          title="The iron atmosphere"
          description="Deepak Kaverappa on the Workout World floor — the standard every member trains to. Select any picture to see it larger."
        />

        <div className="mt-14 grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[190px] lg:grid-cols-4 lg:auto-rows-[210px]">
          {gallerySlots.map((slot, i) => (
            <Reveal key={slot.id} delay={(i % 4) * 0.05} className={SPANS[i % SPANS.length]}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl border border-line"
                aria-label={`Open ${slot.label} image`}
              >
                <div className="h-full w-full grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-focus-visible:grayscale-0">
                  <SmartImage
                    src={slot.image}
                    alt={slot.alt}
                    placeholderLabel={slot.label}
                  />
                </div>
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent"
                  aria-hidden
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-left">
                  <span className="text-sm font-medium text-ink">
                    {slot.label}
                  </span>
                  <span className="grid h-8 w-8 translate-y-2 place-items-center rounded-full bg-accent text-bg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-muted/70">
          Drop by to see the floor for yourself — we are happy to show you around.
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/95 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.label} image viewer`}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-line bg-bg-soft text-ink hover:border-accent hover:text-accent"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 grid h-11 w-11 place-items-center rounded-full border border-line bg-bg-soft text-ink hover:border-accent hover:text-accent"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg-soft text-ink hover:border-accent hover:text-accent"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              key={active.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl border border-line"
            >
              <SmartImage
                src={active.image}
                alt={active.alt}
                placeholderLabel={active.label}
                eager
                fit="contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
