import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { GridGlow } from "@/components/GridGlow";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { IconClipboardCheck, IconDocument, IconUsers } from "@/components/icons";

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
    icon: IconDocument,
    image: "/img/services/photo-1.jpg",
    alt: "A technician inspecting a vehicle under its open hood on a service lift",
  },
  {
    title: "Backlog Claims Processing",
    description:
      "We take over existing backlog claims and clean them quickly. Old, pending, or rejected claims — we fix, submit, and recover eligible revenue for your service department.",
    icon: IconClipboardCheck,
    image: "/img/services/photo-3.jpg",
    alt: "A busy multi-bay service department with technicians working on several vehicles at once",
  },
  {
    title: "Advisor & Technician Training",
    description:
      "We train advisors and technicians to document repairs, diagnostics, and inspections correctly so claims are approved faster. Best practices that reduce rejections.",
    icon: IconUsers,
    image: "/img/services/photo-2.jpg",
    alt: "A service advisor and technician reviewing a vehicle together in the service bay",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Services"
        description="Everything your service department needs to submit, recover, and get paid on warranty claims — handled end to end."
      />

      <section className="relative z-10 -mt-8 rounded-t-[2.5rem] bg-background py-20 sm:-mt-10 sm:rounded-t-[3rem] sm:py-28">
        <Container>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Warranty Services
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 90}>
                <div className="group h-full overflow-hidden rounded-2xl border-[1.5px] border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-primary-dark/0 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 shadow-sm backdrop-blur-sm">
                      <service.icon className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                  <div className="p-7 transition-colors duration-300 group-hover:bg-primary">
                    <h3 className="font-display text-lg font-bold text-primary transition-colors duration-300 group-hover:text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-white/60">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative z-10 -mt-8 overflow-hidden rounded-t-[2.5rem] bg-primary py-20 text-primary-foreground sm:-mt-10 sm:rounded-t-[3rem] sm:py-24">
        <GridGlow />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Trusted Warranty Support for Growing Dealerships
          </h2>
          <Link
            href="/contact"
            className="btn-gradient inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Request Consultation
          </Link>
        </Container>
      </section>
    </>
  );
}
