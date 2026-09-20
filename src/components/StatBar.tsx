import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { StatNumber } from "./StatNumber";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function StatBar({ dict }: { dict: Dictionary["home"]["statBar"] }) {
  return (
    <section className="relative z-10 -mt-10 sm:-mt-14">
      <Container>
        <Reveal>
          <div className="grid gap-6 rounded-3xl border border-white/60 bg-white p-8 shadow-2xl backdrop-blur-xl sm:grid-cols-3 sm:p-10">
            <div className="text-center sm:border-r sm:border-border/60 sm:pr-6 sm:text-left">
              <p className="font-display text-4xl font-extrabold tracking-tight text-primary">
                <StatNumber value={18} suffix="+" />
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{dict.partners}</p>
            </div>
            <div className="text-center sm:border-r sm:border-border/60 sm:pr-6 sm:text-left">
              <p className="font-display text-4xl font-extrabold tracking-tight text-primary">
                <StatNumber value={6} />
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{dict.brands}</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-display text-4xl font-extrabold tracking-tight text-primary">{dict.yearValue}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{dict.yearLabel}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
