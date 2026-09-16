import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { StatNumber } from "./StatNumber";

export function StatBar() {
  return (
    <section className="relative z-10 -mt-10 sm:-mt-14">
      <Container>
        <Reveal>
          <div className="grid gap-6 rounded-3xl border border-white/60 bg-white/75 p-8 shadow-2xl backdrop-blur-xl sm:grid-cols-3 sm:p-10">
            <div className="text-center sm:border-r sm:border-border/60 sm:pr-6 sm:text-left">
              <p className="font-serif text-4xl font-semibold text-primary">
                <StatNumber value={18} suffix="+" />
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">Dealership Partners</p>
            </div>
            <div className="text-center sm:border-r sm:border-border/60 sm:pr-6 sm:text-left">
              <p className="font-serif text-4xl font-semibold text-primary">
                <StatNumber value={6} />
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">Stellantis Brands Served</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-serif text-4xl font-semibold text-primary">1 Year</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">3 to 18 Locations</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
