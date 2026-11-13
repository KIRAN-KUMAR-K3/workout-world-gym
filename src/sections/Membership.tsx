import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import { Info } from 'lucide-react';
import {
  membershipPlans,
  formatINR,
  admissionFee,
  admissionFeeNote,
  enquiryDisclaimer,
  registrationFormUrl,
  externalLinkProps,
} from '@/config/siteConfig';

export default function Membership() {
  return (
    <section id="membership" className="section-pad relative bg-bg-soft">
      <div className="container-px">
        <SectionHeading
          title="Simple, honest pricing"
          description={`Four plans, one price each. A one-time admission fee of ${formatINR(
            admissionFee,
          )} applies only when you join for the first time.`}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {membershipPlans.map((plan, i) => (
            <Reveal
              as="article"
              key={plan.id}
              delay={i * 0.05}
              className="h-full"
            >
              {/* The highlighted plan gets a gradient hairline frame */}
              <div
                className={`h-full rounded-[1.6rem] p-px ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-accent to-accent-2 shadow-glow'
                    : 'bg-line'
                }`}
              >
                <TiltCard
                  max={5}
                  lift={4}
                  className="flex h-full flex-col rounded-[1.55rem] bg-bg p-6 sm:p-7"
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-1 text-xs font-semibold text-bg">
                      Lowest cost per month
                    </span>
                  )}
                  <h3 className="display-title text-3xl text-ink">
                    {plan.duration}
                  </h3>

                  <p className="mt-6">
                    <span
                      className={`display-title text-7xl ${
                        plan.highlight ? 'text-gradient' : 'text-ink'
                      }`}
                    >
                      {formatINR(plan.membershipFee)}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {plan.months === 1
                      ? 'Membership fee, paid monthly'
                      : `Membership fee — about ${formatINR(
                          plan.perMonth,
                        )} a month`}
                  </p>

                  <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-ink-muted">First-time payment</dt>
                      <dd className="font-semibold tabular-nums text-ink">
                        {formatINR(plan.firstTimePayment)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-ink-muted">Renewal</dt>
                      <dd className="font-semibold tabular-nums text-ink">
                        {formatINR(plan.renewal)}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-4 flex-1 text-sm text-ink-muted">
                    {plan.savingVsMonthly > 0
                      ? `${formatINR(
                          plan.savingVsMonthly,
                        )} less than paying monthly for ${plan.months} months.`
                      : 'First payment includes the one-time admission fee.'}
                  </p>

                  <a
                    href={registrationFormUrl}
                    {...externalLinkProps}
                    aria-label={`Join now — ${plan.duration} plan`}
                    className={`mt-6 w-full ${
                      plan.highlight ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    Join now
                  </a>
                </TiltCard>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Admission fee explanation */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-line p-5 sm:p-6">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
            <div className="space-y-2 text-sm leading-relaxed">
              <p className="text-ink">{admissionFeeNote}</p>
              <p className="text-ink-muted">{enquiryDisclaimer}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
