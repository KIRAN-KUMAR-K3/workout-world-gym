import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Smooth scrolling (Lenis) wired into GSAP's ticker, plus two small helpers
 * the rest of the app uses so nothing else needs to know Lenis exists.
 *
 * Smooth scrolling is skipped for visitors who prefer reduced motion; touch
 * devices keep their native scrolling.
 */
let lenis: Lenis | null = null;

/**
 * Finds the element an in-page link ("#about") points at. The hash is treated
 * strictly as an element id and looked up with getElementById. It is never
 * parsed as a CSS selector, where an unexpected value could throw or match
 * the wrong element.
 */
function hashTarget(href: string | null): HTMLElement | null {
  if (!href || !href.startsWith('#') || href.length < 2) return null;
  let id: string;
  try {
    id = decodeURIComponent(href.slice(1));
  } catch {
    return null; // malformed percent-encoding
  }
  return document.getElementById(id);
}

export function initSmoothScroll(): () => void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return () => undefined;

  gsap.registerPlugin(ScrollTrigger);
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // In-page links (#about, #membership …) glide instead of jumping.
  const onClick = (e: MouseEvent) => {
    const link = (e.target as HTMLElement | null)?.closest?.(
      'a[href^="#"]',
    ) as HTMLAnchorElement | null;
    if (!link) return;
    const target = hashTarget(link.getAttribute('href'));
    if (!target) return;
    const id = `#${target.id}`;
    e.preventDefault();
    // Lenis already respects the CSS `scroll-padding-top` set on <html>, which
    // keeps the target clear of the fixed navbar.
    lenis?.scrollTo(target as HTMLElement);
    history.replaceState(null, '', id);
  };
  document.addEventListener('click', onClick);

  return () => {
    document.removeEventListener('click', onClick);
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Freeze / release page scrolling (mobile menu, lightbox). */
export function lockScroll(locked: boolean) {
  document.body.style.overflow = locked ? 'hidden' : '';
  if (locked) lenis?.stop();
  else lenis?.start();
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}
