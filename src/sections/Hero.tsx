import { Suspense, lazy, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  registrationFormUrl,
  externalLinkProps,
  hoursSummary,
  membershipPlans,
  formatINR,
} from '@/config/siteConfig';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import HeroFallback from '@/three/HeroFallback';
import { useTheme } from '@/components/ThemeProvider';
import ErrorBoundary from '@/components/ErrorBoundary';

// Heavy 3D code is only fetched when actually used.
const HeroScene = lazy(() => import('@/three/HeroScene'));

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  /** True once the opening curtain has lifted — starts the headline reveal. */
  ready: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** One headline line that rises out of a clipping mask. */
function Line({
  children,
  ready,
  delay,
  className = '',
}: {
  children: React.ReactNode;
  ready: boolean;
  delay: number;
  className?: string;
}) {
  return (
    <span
      className={`block overflow-hidden pb-[0.06em] pt-[0.04em] ${className}`}
    >
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={ready ? { y: 0 } : { y: '110%' }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({ ready }: HeroProps) {
  const webgl = useWebGLSupport();
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const sceneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const use3D = webgl === true && !reduced;

  // Scroll: the headline drifts up and fades while the 3D layer sinks slightly.
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      };
      gsap.to(contentRef.current, {
        yPercent: -14,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: trigger,
      });
      gsap.to(sceneRef.current, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: trigger,
      });
    });
    return () => ctx.revert();
  }, [reduced, use3D]);

  const facts = [
    {
      label: 'Open',
      value: `${hoursSummary.weekdayHours}, Monday to Saturday`,
    },
    { label: 'Find us', value: 'Near M.S. Ramaiah Bus Stop, Mathikere' },
    {
      label: 'Membership',
      value: `From ${formatINR(membershipPlans[0].fee)} a month`,
    },
  ];

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  // Static artwork: shown without WebGL, with reduced motion, or if the 3D
  // scene fails to load or crashes.
  const staticArt = (
    <div className="absolute inset-x-0 top-[12%] h-[38%] sm:inset-x-auto sm:right-[4%] sm:top-[14%] sm:h-[46%] sm:w-[46%]">
      <HeroFallback />
    </div>
  );

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16 sm:pt-[72px]"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgb(var(--accent)/0.10),transparent_55%)]"
        aria-hidden
      />

      {/* 3D / fallback layer */}
      <motion.div
        ref={sceneRef}
        className="pointer-events-none absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        aria-hidden
      >
        {use3D ? (
          <ErrorBoundary fallback={staticArt}>
            <Suspense fallback={null}>
              <HeroScene
                animate={!reduced}
                accent={theme.accent}
                accent2={theme.accent2}
              />
            </Suspense>
          </ErrorBoundary>
        ) : (
          staticArt
        )}
      </motion.div>

      {/* Content */}
      <div className="container-px relative z-10 flex flex-1 flex-col justify-end pb-28 sm:justify-center sm:pb-10">
        <div ref={contentRef}>
          <h1 className="display-title text-[16.5vw] text-ink sm:text-[12vw] lg:text-[9vw] 2xl:text-[9rem]">
            <Line ready={ready} delay={0.05}>
              Built different.
            </Line>
            <Line ready={ready} delay={0.17} className="lg:text-right">
              <span className="text-gradient">Train different.</span>
            </Line>
          </h1>

          <div className="mt-6 grid gap-8 sm:mt-10 lg:grid-cols-12 lg:items-end">
            <motion.div className="lg:col-span-5" {...fade(0.55)}>
              <p className="max-w-md text-lg leading-relaxed text-ink-muted">
                Your strength. Your discipline. Your transformation. Welcome to
                Workout World Gym.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={registrationFormUrl}
                  {...externalLinkProps}
                  className="btn-primary"
                >
                  Join now
                </a>
                <a href="#facilities" className="btn-outline">
                  Explore our gym
                </a>
              </div>
            </motion.div>

            {/* Plain facts a first-time visitor is looking for */}
            <motion.dl
              className="hidden gap-x-8 gap-y-4 border-t border-line pt-5 sm:grid sm:grid-cols-3 lg:col-span-7"
              {...fade(0.7)}
            >
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-sm text-ink-muted">{f.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink sm:text-base">
                    {f.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>
    </section>
  );
}
