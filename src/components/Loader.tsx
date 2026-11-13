import { useEffect, useState } from 'react';
import { animate, motion } from 'framer-motion';

interface LoaderProps {
  /** Called when the count reaches 100 */
  onDone: () => void;
}

/**
 * Opening curtain: a rep-counter runs to 100, then the whole panel lifts away
 * to reveal the hero. This and the hero headline are the page's one
 * orchestrated motion sequence.
 */
export default function Loader({ onDone }: LoaderProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      onDone();
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: onDone,
    });
    return () => controls.stop();
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-6 sm:p-10"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label="Loading Workout World Gym"
    >
      <p className="font-display text-2xl tracking-wide text-ink">
        Workout World
      </p>

      <div>
        <div className="flex items-end justify-between">
          <p className="max-w-[12rem] text-sm text-ink-muted">
            Loading the plates.
          </p>
          <p
            className="display-title text-gradient text-[32vw] leading-[0.8] sm:text-[20vw]"
            aria-hidden
          >
            {count}
          </p>
        </div>
        <div className="mt-4 h-px w-full bg-line">
          <div
            className="h-px bg-gradient-to-r from-accent to-accent-2"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
