/**
 * Static, lightweight hero visual used when WebGL is unavailable or the user
 * prefers reduced motion. Pure inline SVG — clearly a graphic, loads instantly.
 */
export default function HeroFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="absolute h-72 w-72 rounded-full bg-accent/20 blur-3xl sm:h-96 sm:w-96"
        aria-hidden
      />
      <svg
        viewBox="0 0 400 200"
        className="relative w-[80%] max-w-md drop-shadow-[0_0_30px_rgb(var(--accent)/0.3)]"
        role="img"
        aria-label="Dumbbell illustration"
      >
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a4a4a" />
            <stop offset="50%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#141414" />
          </linearGradient>
        </defs>
        {/* Handle */}
        <rect x="130" y="92" width="140" height="16" rx="8" fill="url(#metal)" />
        {/* Left plates */}
        <rect x="96" y="60" width="22" height="80" rx="8" fill="url(#metal)" />
        <rect x="74" y="72" width="20" height="56" rx="8" fill="url(#metal)" />
        {/* Right plates */}
        <rect x="282" y="60" width="22" height="80" rx="8" fill="url(#metal)" />
        <rect x="306" y="72" width="20" height="56" rx="8" fill="url(#metal)" />
        {/* Accent rings */}
        <rect x="96" y="60" width="22" height="80" rx="8" fill="none" style={{ stroke: 'rgb(var(--accent))' }} strokeWidth="2" />
        <rect x="282" y="60" width="22" height="80" rx="8" fill="none" style={{ stroke: 'rgb(var(--accent))' }} strokeWidth="2" />
      </svg>
    </div>
  );
}
