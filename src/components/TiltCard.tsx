import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees */
  max?: number;
  /** Lift on hover in px */
  lift?: number;
}

/**
 * Pointer-driven 3D tilt. Adds depth on hover by rotating the card toward the
 * cursor. Fully disabled when the user prefers reduced motion, and never runs
 * on touch (pointer events with fine pointers only via hover).
 */
export default function TiltCard({
  children,
  className = '',
  max = 8,
  lift = 6,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${
      -py * max
    }deg) translateY(-${lift}px)`;
  };

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform =
        'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    }
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`group/tilt relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Cursor spotlight */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--accent) / 0.14), transparent 60%)',
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}
