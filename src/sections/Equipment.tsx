import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import SmartImage from '@/components/SmartImage';
import {
  equipment,
  activeCategories,
  type EquipmentCategory,
} from '@/data/equipment';

type Filter = 'All' | EquipmentCategory;

export default function Equipment() {
  const [filter, setFilter] = useState<Filter>('All');

  const filters: Filter[] = useMemo(() => ['All', ...activeCategories], []);

  const items = useMemo(
    () =>
      filter === 'All'
        ? equipment
        : equipment.filter((e) => e.category === filter),
    [filter],
  );

  return (
    <section id="equipment" className="section-pad relative">
      <div className="container-px">
        <SectionHeading
          title="Built for serious training"
          description="The strength and cardio equipment you can train on at Workout World. Pick a muscle group to narrow it down."
        />

        {/* Category filters */}
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter equipment by muscle group"
        >
          {filters.map((f) => {
            const count =
              f === 'All'
                ? equipment.length
                : equipment.filter((e) => e.category === f).length;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                  filter === f
                    ? 'border-accent bg-accent font-semibold text-bg'
                    : 'border-line text-ink-muted hover:border-ink-muted hover:text-ink'
                }`}
              >
                {f}
                <span
                  className={`ml-2 text-xs tabular-nums ${
                    filter === f ? 'text-bg/60' : 'text-ink-muted/60'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Default (sync) mode on purpose: "popLayout" injects a <style> tag
              at runtime, which the site's Content-Security-Policy forbids. */}
          <AnimatePresence>
            {items.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                  <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                    <SmartImage
                      src={item.image}
                      grade
                      alt={`${item.name} — ${item.target}`}
                      placeholderLabel={item.name}
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="display-title text-3xl text-ink">
                    {item.name}
                  </h3>
                  <span className="shrink-0 text-sm text-accent">
                    {item.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink">{item.target}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-10 text-sm text-ink-muted/70">
          Images are representative. Visit the gym to see the full floor in
          person.
        </p>
      </div>
    </section>
  );
}
