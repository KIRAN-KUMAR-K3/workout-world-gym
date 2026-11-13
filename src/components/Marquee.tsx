import { Dumbbell } from 'lucide-react';

const WORDS = [
  'Strength',
  'Discipline',
  'Transformation',
  'Personal Training',
  'Diet Plans',
  'No Excuses',
  'Mathikere',
];

/**
 * Infinite scrolling ticker. Pure CSS animation (paused automatically for
 * users who prefer reduced motion via the global rule in index.css).
 */
export default function Marquee() {
  const row = (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden>
      {WORDS.map((w) => (
        <li key={w} className="flex items-center gap-10">
          <span className="font-display text-4xl uppercase tracking-wide text-bg sm:text-5xl">
            {w}
          </span>
          <Dumbbell className="h-6 w-6 text-bg/70" strokeWidth={2.5} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative z-10 overflow-hidden py-3" role="presentation">
      <div className="-mx-4 -rotate-1 bg-accent py-4 shadow-accent">
        <div className="flex w-max animate-marquee">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
