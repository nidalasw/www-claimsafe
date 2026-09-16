/**
 * Layered wave motif echoing the stacked chevrons in the ClaimSafe mark.
 * Bleeds in from the right edge of dark sections, fading into the navy
 * background — the site's one recurring brand texture.
 */
export function BrandWaves({
  className = "",
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "quiet";
}) {
  const maskId = `brand-waves-fade-${variant}`;
  const bandOpacity = variant === "full" ? 1 : 0.55;

  return (
    <svg
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id={maskId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" />
          <stop offset="38%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        <mask id={`${maskId}-mask`}>
          <rect x="0" y="0" width="1000" height="800" fill={`url(#${maskId})`} />
        </mask>
      </defs>
      <g mask={`url(#${maskId}-mask)`} opacity={bandOpacity}>
        <path
          d="M1080 60 C 860 120, 760 40, 560 140 S 300 340, 60 260 L 60 900 L 1080 900 Z"
          fill="var(--primary-light)"
          opacity="0.5"
        />
        <path
          d="M1080 180 C 880 230, 800 150, 610 240 S 360 420, 120 360 L 120 900 L 1080 900 Z"
          fill="var(--primary-glow)"
          opacity="0.4"
        />
        <path
          d="M1080 300 C 900 340, 840 270, 660 350 S 430 500, 220 450 L 220 900 L 1080 900 Z"
          fill="#ffffff"
          opacity="0.08"
        />
        <path
          d="M1080 420 C 920 450, 860 400, 700 460 S 500 580, 320 540 L 320 900 L 1080 900 Z"
          fill="var(--primary-light)"
          opacity="0.35"
        />
      </g>
    </svg>
  );
}
