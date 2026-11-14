import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { safeMediaUrl } from '@/lib/safeUrl';

interface SmartImageProps {
  /** Image source. If missing or it fails to load, a neutral placeholder shows. */
  src?: string;
  alt: string;
  className?: string;
  /** Label shown on the placeholder */
  placeholderLabel?: string;
  /** Load immediately (above-the-fold images) */
  eager?: boolean;
  /**
   * Apply the site's photographic grade (slightly desaturated, darker, with a
   * faint accent wash) so mixed-source photos look like one set. Colour
   * returns when the nearest `.group` is hovered.
   */
  grade?: boolean;
  /** `cover` (default) fills the frame; `contain` shows the whole photo. */
  fit?: 'cover' | 'contain';
}

/** Lazy-loaded image with a skeleton loader and a graceful fallback. */
export default function SmartImage({
  src,
  alt,
  className = '',
  placeholderLabel,
  eager = false,
  grade = false,
  fit = 'cover',
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const safeSrc = safeMediaUrl(src);
  const showPlaceholder = !safeSrc || errored;

  return (
    <div className="relative h-full w-full overflow-hidden bg-bg-soft">
      {showPlaceholder ? (
        <div className="grain flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-bg-soft to-bg p-6 text-center">
          <ImageIcon className="h-7 w-7 text-line" aria-hidden />
          <span className="text-sm text-ink-muted">
            {placeholderLabel ?? 'Photo unavailable'}
          </span>
        </div>
      ) : (
        <>
          {!loaded && <div className="img-skeleton absolute inset-0" />}
          <img
            src={safeSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} transition-opacity duration-700 ${
              loaded ? 'opacity-100' : 'opacity-0'
            } ${grade ? 'photo-grade' : ''} ${className}`}
          />
          {grade && (
            <span
              className="pointer-events-none absolute inset-0 bg-accent opacity-[0.12] mix-blend-soft-light"
              aria-hidden
            />
          )}
        </>
      )}
    </div>
  );
}
