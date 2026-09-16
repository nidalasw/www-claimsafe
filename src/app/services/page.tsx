import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandWaves } from "@/components/BrandWaves";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Claim processing, backlog claims processing, and advisor & technician training for Stellantis dealership warranty operations.",
};

const services = [
  {
    title: "Claim Processing",
    description:
      "We handle all Stellantis warranty claims — from submission to approval — ensuring clean documentation and audit-ready accuracy. Fewer rejections, faster payments, and more approved hours.",
  },
  {
    title: "Backlog Claims Processing",
    description:
      "We take over existing backlog claims and clean them quickly. Old, pending, or rejected claims — we fix, submit, and recover eligible revenue for your service department.",
  },
  {
    title: "Advisor & Technician Training",
    description:
      "We train advisors and technicians to document repairs, diagnostics, and inspections correctly so claims are approved faster. Best practices that reduce rejections.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Services" />

      <section className="relative z-10 -mt-8 rounded-t-[2.5rem] bg-background py-20 sm:-mt-10 sm:rounded-t-[3rem] sm:py-28">
        <Container>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            Warranty Services
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1727893119356-1702fe921cf9?auto=format&fit=crop&crop=entropy&w=2000&h=1000&q=80"
              alt="A bright, multi-bay dealership service department with technicians working on vehicles"
              width={2000}
              height={1000}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1280px) 1152px, 100vw"
            />
          </div>
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

      <section className="relative z-10 -mt-8 overflow-hidden rounded-t-[2.5rem] bg-primary py-20 text-primary-foreground sm:-mt-10 sm:rounded-t-[3rem] sm:py-24">
        <div className="bg-navy-glow pointer-events-none absolute inset-0 h-full w-full" />
        <BrandWaves variant="quiet" className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Trusted Warranty Support for Growing Dealerships
          </h2>
          <Link
            href="/contact"
            className="btn-gradient inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-primary hover:shadow-lg active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
          >
            Request Consultation
          </Link>
        </Container>
      </section>
    </>
  );
}
