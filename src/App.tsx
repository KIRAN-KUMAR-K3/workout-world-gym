import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import SEO from '@/components/SEO';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import BackToTop from '@/components/BackToTop';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MobileActionBar from '@/components/MobileActionBar';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import { initSmoothScroll, lockScroll } from '@/lib/scroll';

import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Founder from '@/sections/Founder';
import Facilities from '@/sections/Facilities';
import Equipment from '@/sections/Equipment';
import VideoBand from '@/sections/VideoBand';
import Membership from '@/sections/Membership';
import SpecialEnquiries from '@/sections/SpecialEnquiries';
import Services from '@/sections/Services';
import Reels from '@/sections/Reels';
import Gallery from '@/sections/Gallery';
import WhyChoose from '@/sections/WhyChoose';
import Hours from '@/sections/Hours';
import Faq from '@/sections/Faq';
import Contact from '@/sections/Contact';
import FinalCTA from '@/sections/FinalCTA';

export default function App() {
  // `loading` keeps the opening curtain up; when it lifts, the hero headline
  // reveal starts. Together they are the page's one orchestrated sequence.
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  useEffect(() => initSmoothScroll(), []);

  // Hold the page still while the curtain is up
  useEffect(() => {
    lockScroll(loading);
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <SEO />
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={finishLoading} />}
      </AnimatePresence>

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <ScrollProgressBar />
      <Navbar />

      <main>
        <Hero ready={!loading} />
        <Marquee />
        <About />
        <Founder />
        <Facilities />
        <Equipment />
        <VideoBand />
        <Membership />
        <SpecialEnquiries />
        <Services />
        <Reels />
        <Gallery />
        <WhyChoose />
        <Hours />
        <Faq />
        <Contact />
        <FinalCTA />
      </main>

      <Footer />

      {/* Fine film grain over everything */}
      <div
        className="film-grain pointer-events-none fixed inset-0 z-[80] opacity-[0.06]"
        aria-hidden
      />

      <ThemeSwitcher />
      <FloatingWhatsApp />
      <MobileActionBar />
      <BackToTop />
    </MotionConfig>
  );
}
