import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Dumbbell } from "lucide-react";
import {
  navLinks,
  registrationFormUrl,
  externalLinkProps,
  site,
  theme as themeConfig,
} from "@/config/siteConfig";
import { ThemeSwatches } from "./ThemeSwitcher";
import { lockScroll } from "@/lib/scroll";

/**
 * Which nav section the visitor is currently reading: the last one whose top
 * has passed the upper part of the screen. Sections without a nav entry
 * (hours, FAQ…) simply keep the previous entry highlighted.
 */
function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}

const SECTION_IDS = navLinks.map((l) => l.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  // Close the menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "border-b border-line bg-bg/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="container-px flex h-16 items-center justify-between sm:h-[72px]"
          aria-label="Main"
        >
          <a
            href="#home"
            className="group flex items-center gap-3"
            aria-label={`${site.name} — back to top`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-bg transition-transform duration-300 group-hover:-rotate-12">
              <Dumbbell className="h-5 w-5" strokeWidth={2.5} aria-hidden />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-wide text-ink">
                Workout World
              </span>
              <span className="mt-0.5 text-[11px] text-ink-muted">
                Mathikere, Bengaluru
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3 py-2 text-sm transition-colors ${
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={registrationFormUrl}
              {...externalLinkProps}
              className="btn-primary hidden !px-6 !pb-2.5 !pt-3 !text-lg sm:inline-flex"
            >
              Join now
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — rendered outside the header so the header's blur
        doesn't clip it */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-16 z-[49] overflow-y-auto overscroll-contain bg-bg lg:hidden"
            data-lenis-prevent
          >
            <motion.ul
              className="container-px flex flex-col py-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.04 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line pb-2 pt-2.5 font-display text-3xl uppercase tracking-wide text-ink transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                className="pt-6"
              >
                <a
                  href={registrationFormUrl}
                  {...externalLinkProps}
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Join now
                </a>
              </motion.li>
              {themeConfig.showSwitcher && (
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="flex items-center justify-between pb-10 pt-7"
                >
                  <span className="text-sm text-ink-muted">Colour theme</span>
                  <ThemeSwatches />
                </motion.li>
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
