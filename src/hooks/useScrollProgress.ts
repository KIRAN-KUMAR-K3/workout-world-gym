import { useEffect, useState } from 'react';

/** Returns page scroll progress as a 0–1 value. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(height > 0 ? Math.min(scrollTop / height, 1) : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return progress;
}
