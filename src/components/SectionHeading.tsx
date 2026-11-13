import Reveal from './Reveal';

interface SectionHeadingProps {
  title: string;
  description?: string;
  /** 'split' (default): title left, description right. 'stack': one column. */
  layout?: 'split' | 'stack';
}

/**
 * Editorial section header: a large display title on the left with the
 * supporting line set against it on the right, both sitting on one baseline.
 */
export default function SectionHeading({
  title,
  description,
  layout = 'split',
}: SectionHeadingProps) {
  if (layout === 'stack') {
    return (
      <div className="max-w-2xl">
        <Reveal>
          <h2 className="display-title text-6xl text-ink sm:text-7xl lg:text-8xl">
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.06}>
            <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div className="grid items-end gap-5 lg:grid-cols-12 lg:gap-10">
      <Reveal className="lg:col-span-7">
        <h2 className="display-title text-6xl text-ink sm:text-7xl lg:text-8xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.06} className="lg:col-span-5 lg:pb-2">
          <p className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg lg:ml-auto">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
