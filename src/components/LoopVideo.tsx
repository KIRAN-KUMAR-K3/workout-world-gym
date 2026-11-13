import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { safeMediaUrl } from '@/lib/safeUrl';

interface LoopVideoProps {
  src: string;
  poster: string;
  className?: string;
}

/**
 * Muted, looping, GIF-style background video.
 * - The poster image is always rendered underneath as the fallback.
 * - The video is only fetched and played while it is on screen.
 * - Skipped entirely for visitors who prefer reduced motion, and hidden if the
 *   file fails to load.
 */
export default function LoopVideo({
  src,
  poster,
  className = '',
}: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const safeSrc = safeMediaUrl(src);
  const safePoster = safeMediaUrl(poster);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      {safePoster && (
        <img
          src={safePoster}
          referrerPolicy="no-referrer"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {!reduced && !failed && safeSrc && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={safeSrc}
          poster={safePoster}
          muted
          loop
          playsInline
          preload="none"
          onError={() => setFailed(true)}
          aria-hidden
        />
      )}
    </div>
  );
}
