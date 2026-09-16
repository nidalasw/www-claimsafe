/**
 * Layered grid-line texture + soft radial glow used behind dark navy
 * sections (hero, CTA banners, footer). Replaces flat color with the
 * subtle depth that reads as "premium SaaS" rather than "flat brochure".
 */
export function GridGlow({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="bg-grid-lines absolute inset-0" />
      <div className="bg-navy-glow absolute inset-0" />
    </div>
  );
}
