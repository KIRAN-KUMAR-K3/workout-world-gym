import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}

/**
 * A quiet scroll reveal: content settles in with a short fade and a few
 * pixels of travel. Kept deliberately subtle — the one big motion moment on
 * the page is the hero's opening sequence.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.5, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}
