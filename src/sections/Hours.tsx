import { useEffect, useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { openingHours } from '@/config/siteConfig';

/**
 * Which weekday it is at the gym right now (India time), so the timetable can
 * mark today's row. This only marks the day — it never claims the gym is open
 * or closed at this moment.
 */
function useTodayInIndia(): string | null {
  const [day, setDay] = useState<string | null>(null);
  useEffect(() => {
    try {
      setDay(
        new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          timeZone: 'Asia/Kolkata',
        }).format(new Date()),
      );
    } catch {
      setDay(null);
    }
  }, []);
  return day;
}

export default function Hours() {
  const today = useTodayInIndia();

  return (
    <section className="section-pad relative" aria-label="Opening hours">
      <div className="container-px grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            layout="stack"
            title="When we’re open"
            description="Train six days a week, early morning to late night. We are closed on Sundays."
          />
        </div>

        <Reveal delay={0.05} className="lg:col-span-7">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Weekly opening hours</caption>
            <tbody>
              {openingHours.map((row) => {
                const isToday = today === row.day;
                return (
                  <tr
                    key={row.day}
                    className={`border-b border-line first:border-t ${
                      row.closed ? 'text-ink-muted' : 'text-ink'
                    }`}
                  >
                    <th
                      scope="row"
                      className="py-4 pr-4 text-base font-medium sm:text-lg"
                    >
                      {row.day}
                      {isToday && (
                        <span className="ml-3 rounded-full bg-accent px-2.5 py-0.5 align-middle text-xs font-semibold text-bg">
                          Today
                        </span>
                      )}
                    </th>
                    <td className="py-4 text-right">
                      {row.closed ? (
                        <span className="display-title text-3xl text-accent sm:text-4xl">
                          Closed
                        </span>
                      ) : (
                        <span className="display-title text-3xl tabular-nums sm:text-4xl">
                          {row.hours}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
