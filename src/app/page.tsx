import Image from "next/image";
import Link from "next/link";
import { BrandWaves } from "@/components/BrandWaves";
import { Container } from "@/components/Container";
import { IconCheck } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { StatBar } from "@/components/StatBar";
import StickyPhotoGallery from "@/components/ui/sticky-scroll";

const services = [
  {
    title: "Warranty Claim Management",
    description:
      "We handle every step of the warranty claim process — from verification and documentation to submission and follow-up — ensuring accuracy, compliance, and faster payments.",
  },
  {
    title: "Consulting",
    description:
      "We provide expert guidance to help dealerships improve their warranty processes, reduce rejections, and maximize factory reimbursements through proven best practices.",
  },
  {
    title: "Schedule Reconciliation",
    description:
      "We review and align your warranty schedules with manufacturer payments, identifying discrepancies and ensuring your financial records stay accurate and transparent.",
  },
];

const whyChoose = [
  "Fast claim submissions and approvals",
  "Reduced rejections and chargebacks",
  "More recovered warranty revenue",
  "Less workload for advisors and managers",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary-dark via-primary to-primary text-primary-foreground">
        <div className="bg-navy-glow pointer-events-none absolute inset-0 h-full w-full" />
        <BrandWaves className="pointer-events-none absolute inset-0 h-full w-full" />
        <Container className="relative grid gap-10 py-24 sm:py-32">
          <p
            className="animate-entrance text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground/60"
            style={{ animationDelay: "0ms" }}
          >
            Gestion ClaimSafe Inc.
          </p>
          <h1
            className="animate-entrance max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-6xl"
            style={{ animationDelay: "90ms" }}
          >
            Streamlining Warranty Claims for Dealerships
          </h1>
          <ul
            className="animate-entrance flex flex-col gap-3 text-base text-primary-foreground/85 sm:flex-row sm:gap-8 sm:text-lg"
            style={{ animationDelay: "180ms" }}
          >
            <li className="flex items-center gap-2">
              <IconCheck className="h-5 w-5 shrink-0 text-accent" />
              Maximizes warranty revenue
            </li>
            <li className="flex items-center gap-2">
              <IconCheck className="h-5 w-5 shrink-0 text-accent" />
              Full service administration
            </li>
            <li className="flex items-center gap-2">
              <IconCheck className="h-5 w-5 shrink-0 text-accent" />
              Trusted by dealerships across Canada
            </li>
          </ul>
          <div className="animate-entrance" style={{ animationDelay: "270ms" }}>
            <Link
              href="/contact"
              className="btn-gradient inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-primary hover:shadow-lg active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
            >
              Book Now
            </Link>
          </div>
        </Container>
      </section>

      <StatBar />

      {/* About intro */}
      <section className="border-b border-border bg-background py-20 sm:py-28">
        <Container className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Warranty Management Services · About Us
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            &ldquo;Your Warranty Partner, Not Just An Administrator.&rdquo;
          </h2>
          <div className="mt-8">
            <StickyPhotoGallery />
          </div>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-secondary sm:text-lg">
            <p>
              Gestion ClaimSafe Inc. was founded with one clear mission: to help dealerships reclaim time,
              revenue, and peace of mind through expert warranty management. After years of working inside
              dealerships and seeing firsthand how much money and efficiency were lost to incomplete or
              rejected claims, our founder, Moe Naji, decided to change the game.
            </p>
            <p>
              ClaimSafe was created to bring structure, transparency, and results to dealerships. What began
              with 3 dealership partners has grown to 18 locations in just one year, driven by results,
              referrals, and long-term trust.
            </p>
            <p>
              Today, ClaimSafe partners with leading Chrysler, Dodge, Jeep, Ram, Fiat, and Alfa Romeo
              dealerships across Canada and beyond — handling everything from claim submissions and digital
              imaging (DI) approvals, WAC negotiations, VOR escalations, and accounting.
            </p>
          </div>
          <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-primary">Our approach is simple:</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {["Maximize warranty recovery", "Improve service department efficiency", "Reduce chargebacks"].map(
              (item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-4 text-sm font-medium text-card-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-sm"
                >
                  <IconCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent" />
                  {item}
                </li>
              ),
            )}
          </ul>
          <p className="mt-8 text-base leading-relaxed text-secondary sm:text-lg">
            At ClaimSafe, we do more than manage claims — we become an extension of your service team.
          </p>
        </Container>
      </section>

      {/* Services */}
      <section className="border-b border-border bg-muted py-20 sm:py-28">
        <Container>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            Warranty Management Services
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 90}>
                <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
                  <h3 className="font-serif text-xl font-semibold text-primary">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why choose */}
      <section className="bg-background py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              Why Dealerships Choose ClaimSafe
            </h2>
            <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
              We become an extension of your service department — handling warranty operations with speed,
              accuracy, and accountability so your team can stay focused on customers and repairs.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-4 text-sm font-medium text-card-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-sm"
              >
                <IconCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative z-10 -mt-8 overflow-hidden rounded-t-[2.5rem] bg-primary py-20 text-primary-foreground sm:-mt-10 sm:rounded-t-[3rem] sm:py-24">
        <div className="bg-navy-glow pointer-events-none absolute inset-0 h-full w-full" />
        <BrandWaves variant="quiet" className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to Improve Your Warranty Operations?
          </h2>
          <Link
            href="/contact"
            className="btn-gradient inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-primary hover:shadow-lg active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
          >
            Request Consultation
          </Link>
        </Container>
      </section>

      {/* SafeAutoJobs */}
      <section className="relative z-10 -mt-8 rounded-t-[2.5rem] bg-muted py-14 sm:-mt-10 sm:rounded-t-[3rem] sm:py-16">
        <Container>
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <h2 className="font-serif text-2xl font-semibold text-primary sm:text-3xl">
              Hiring in the Automotive Industry?
            </h2>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <Image
                  src="/img/safeautojobs-icon.png"
                  alt="SafeAutoJobs"
                  width={512}
                  height={512}
                  className="h-12 w-12 shrink-0 rounded-xl sm:h-14 sm:w-14"
                />
                <div>
                  <h3 className="text-lg font-semibold text-primary">Meet SafeAutoJobs</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    SafeAutoJobs is a recruitment marketplace built specifically for the automotive industry,
                    connecting automotive businesses with automotive professionals.
                  </p>
                  <p className="mt-3 text-xs font-medium text-muted-foreground sm:text-sm">
                    Technicians • Service Advisors • Parts Professionals • Sales • Body Technicians • Detailers
                    &amp; More
                  </p>
                </div>
              </div>
              <a
                href="https://safeautojobs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                VISIT SAFE AUTO JOBS →
              </a>
            </div>
            <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
              A ClaimSafe Inc. company.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
