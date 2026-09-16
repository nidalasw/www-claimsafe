import { Container } from "./Container";
import { GridGlow } from "./GridGlow";

export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="relative overflow-hidden bg-primary pt-36 pb-20 text-primary-foreground sm:pt-40 sm:pb-24">
      <GridGlow />
      <Container className="relative">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-light">{eyebrow}</p>
        )}
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">{description}</p>
        )}
      </Container>
    </section>
  );
}
