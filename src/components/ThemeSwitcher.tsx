import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { themes } from '@/config/themes';
import { theme as themeConfig } from '@/config/siteConfig';
import { useTheme } from './ThemeProvider';

/** The row of colour swatches (used by the floating picker and mobile menu). */
export function ThemeSwatches({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <ul className={`flex items-center gap-2.5 ${className}`} aria-label="Colour themes">
      {themes.map((t) => {
        const active = t.id === theme.id;
        return (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => setTheme(t.id)}
              aria-label={`${t.name} theme`}
              aria-pressed={active}
              title={t.name}
              className={`grid h-9 w-9 place-items-center rounded-full transition-transform hover:scale-110 ${
                active ? 'ring-2 ring-white ring-offset-2 ring-offset-bg' : ''
              }`}
              style={{
                background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`,
              }}
            >
              {active && <Check className="h-4 w-4 text-bg" strokeWidth={3} />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Floating colour-theme picker (tablet and desktop; phones get the swatches
 * inside the menu). Hide it everywhere by setting `theme.showSwitcher = false`
 * in src/config/siteConfig.ts.
 */
export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);

  if (!themeConfig.showSwitcher) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden items-center gap-2 sm:flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Change colour theme"
        className="grid h-12 w-12 place-items-center rounded-full border border-line bg-bg-soft/90 text-accent backdrop-blur transition-colors hover:border-accent"
      >
        <Palette className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="rounded-full border border-line bg-bg-soft/95 p-2 backdrop-blur"
          >
            <ThemeSwatches />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
