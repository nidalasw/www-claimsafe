import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GridGlow } from "@/components/GridGlow";
import { IconCar, IconCheck, IconChat, IconClipboardCheck, IconDocument, IconScale, IconShield, IconUsers } from "@/components/icons";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { StatBar } from "@/components/StatBar";

const marqueeItems = [
  "Warranty Claim Management",
  "Consulting",
  "Schedule Reconciliation",
  "Backlog Claim Recovery",
  "DI & WAC Submissions",
  "Advisor Training",
];

const services = [
  {
    title: "Warranty Claim Management",
    description:
      "We handle every step of the warranty claim process — from verification and documentation to submission and follow-up — ensuring accuracy, compliance, and faster payments.",
    icon: IconDocument,
  },
  {
    title: "Consulting",
    description:
      "We provide expert guidance to help dealerships improve their warranty processes, reduce rejections, and maximize factory reimbursements through proven best practices.",
    icon: IconChat,
  },
  {
    title: "Schedule Reconciliation",
    description:
      "We review and align your warranty schedules with manufacturer payments, identifying discrepancies and ensuring your financial records stay accurate and transparent.",
    icon: IconScale,
  },
];

const whyStats = [
  { icon: IconShield, value: "18+", label: "Dealership partners across Canada" },
  { icon: IconCar, value: "6", label: "Stellantis brands served" },
  { icon: IconUsers, value: "1 → 18", label: "Locations grown in a single year" },
];

const whyItems = [
  {
    title: "Fast Claim Submissions",
    description: "Clean, complete, audit-ready claims submitted quickly to reduce rejections and delays.",
    icon: IconClipboardCheck,
  },
  {
    title: "Reduced Rejections & Chargebacks",
    description: "We defend diagnostic time and required operations so fewer claims come back unpaid.",
    icon: IconShield,
  },
  {
    title: "More Recovered Warranty Revenue",
    description: "We chase down RA, WAC, and DI approvals so nothing eligible slips through the cracks.",
    icon: IconDocument,
  },
  {
    title: "Less Workload for Your Team",
    description: "Advisors and managers stay focused on customers — not paperwork and follow-ups.",
    icon: IconUsers,
  },
];

const process = [
  {
    number: "01",
    title: "Onboarding & Assessment",
    description:
      "We review your current warranty workflow, open claims, and backlog to understand exactly where revenue is being lost.",
  },
  {
    number: "02",
    title: "We Take Over Your Claims",
    description:
      "Our team manages submissions, DI approvals, WAC negotiations, and VOR escalations as an extension of your service department.",
  },
  {
    number: "03",
    title: "You Get Paid Faster",
    description:
      "Clean documentation and consistent follow-up mean fewer rejections, quicker approvals, and more recovered revenue.",
  },
];

const whoWeHelp = ["Chrysler", "Dodge", "Jeep", "Ram", "Fiat", "Alfa Romeo", "Service Advisors", "Warranty Administrators"];

const faqs = [
  {
    question: "Which dealerships do you work with?",
    answer:
      "We partner with Chrysler, Dodge, Jeep, Ram, Fiat, and Alfa Romeo dealerships across Canada, handling their full warranty claim workflow from submission to payment.",
  },
  {
    question: "How does ClaimSafe fit into our existing service department?",
    answer:
      "We operate as an extension of your team — not a replacement. Your advisors and technicians keep working as usual while we manage claim documentation, submission, and follow-up in the background.",
  },
  {
    question: "Can you help with an existing backlog of rejected or unfiled claims?",
    answer:
      "Yes. Backlog claims processing is one of our core services — we review old, pending, or rejected claims, correct them, and resubmit to recover eligible revenue.",
  },
  {
    question: "What does pricing look like?",
    answer:
      "We offer simple, predictable monthly pricing with no surprise fees. Because our service is built to recover warranty revenue you'd otherwise lose, it typically pays for itself.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "After a short onboarding assessment of your current claims and workflow, we can begin managing new submissions right away while we work through any backlog in parallel.",
  },
  {
    question: "Do you offer training for our advisors and technicians?",
    answer:
      "Yes. We train your team on documentation best practices for repairs, diagnostics, and inspections so future claims are approved faster and rejected less often.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pt-36 pb-24 text-primary-foreground sm:pt-44 sm:pb-32">
        <GridGlow />
        <Container className="relative grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div className="grid gap-8">
            <div
              className="animate-entrance inline-flex w-fit items-center gap-2 rounded-full border border-accent-light/20 bg-accent/10 px-4 py-2"
              style={{ animationDelay: "0ms" }}
            >
              <span className="animate-pulse-dot h-2 w-2 rounded-full bg-accent-light" />
              <span className="text-xs font-semibold text-accent-light">Trusted by Stellantis Dealerships Across Canada</span>
            </div>
            <h1
              className="animate-entrance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
              style={{ animationDelay: "90ms" }}
            >
              Warranty Claims,
              <span className="mt-1 block font-display text-3xl font-bold text-white/60 sm:text-5xl">
                Made Simple.
              </span>
            </h1>
            <p
              className="animate-entrance max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
              style={{ animationDelay: "150ms" }}
            >
              Full-service warranty claim management for Stellantis dealerships — handled with the accuracy, speed,
              and accountability your service department deserves.
            </p>
            <div className="animate-entrance flex flex-wrap gap-3" style={{ animationDelay: "220ms" }}>
              <Link
                href="/contact"
                className="btn-gradient inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Book a Consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/8 hover:border-white/40"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div
            className="animate-entrance relative"
            style={{ animationDelay: "180ms" }}
          >
            <div className="overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
              <Image
                src="/img/home/photo-hero.jpg"
                alt="A service advisor reviewing an approved warranty claim on screen, with a dealership service bay behind him"
                width={908}
                height={650}
                priority
                className="aspect-[4/3] h-auto w-full object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <StatBar />

      <Marquee items={marqueeItems} />

      {/* About intro */}
      <section className="border-b border-border bg-background py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/img/home/photo-warranty.jpg"
                alt="A ClaimSafe team reviewing warranty claim submissions, approvals, and recoveries on screen"
                width={917}
                height={623}
                priority
                className="aspect-[4/3] h-auto w-full object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Warranty Management Services · About Us
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              <span className="font-serif font-normal italic text-accent">&ldquo;Your Warranty Partner,</span>
              <br />
              Not Just An Administrator.&rdquo;
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-secondary sm:text-lg">
              <p>
                Founded by Moe Naji after years inside dealership service departments, ClaimSafe exists to end
                the time and revenue lost to incomplete or rejected warranty claims.
              </p>
              <p>
                What began with 3 dealership partners has grown to 18 in just one year. Today we partner with
                leading Chrysler, Dodge, Jeep, Ram, Fiat, and Alfa Romeo dealerships across Canada — handling
                claim submissions, DI approvals, WAC negotiations, VOR escalations, and accounting.
              </p>
            </div>
            <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-primary">Our approach is simple:</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
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
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="border-b border-border bg-muted py-20 sm:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">What We Do</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Warranty Management Services
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              View All Services
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 90}>
                <div className="group relative h-full overflow-hidden rounded-2xl border-[1.5px] border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-primary hover:shadow-xl">
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-accent/10 transition-colors duration-300 group-hover:bg-white/10">
                    <service.icon className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-accent-light" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-primary transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-white/60">
                    {service.description}
                  </p>
                  <Link
                    href="/services"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors duration-300 group-hover:text-accent-light"
                  >
                    Learn more
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why choose */}
      <section className="bg-background py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div className="flex flex-col gap-4">
            {whyStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90}>
                <div
                  className={`flex items-center gap-5 rounded-2xl border p-6 shadow-sm ${
                    i === 0 ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-card"
                  }`}
                >
                  <div
                    className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl ${
                      i === 0 ? "bg-white/10" : "bg-accent/10"
                    }`}
                  >
                    <stat.icon className={`h-6 w-6 ${i === 0 ? "text-accent-light" : "text-accent"}`} />
                  </div>
                  <div>
                    <p className={`font-display text-2xl font-extrabold tracking-tight ${i === 0 ? "text-white" : "text-primary"}`}>
                      {stat.value}
                    </p>
                    <p className={`text-sm ${i === 0 ? "text-white/50" : "text-muted-foreground"}`}>{stat.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Why ClaimSafe</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              Why Dealerships Choose Us
            </h2>
            <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
              We become an extension of your service department — handling warranty operations with speed,
              accuracy, and accountability so your team can stay focused on customers and repairs.
            </p>
            <div className="mt-8 flex flex-col gap-5">
              {whyItems.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <item.icon className="h-4.5 w-4.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-primary">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-t border-border bg-muted py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">How It Works</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              Get Started in 3 Simple Steps
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {process.map((step, i) => (
              <Reveal key={step.number} delay={i * 100}>
                <div className="h-full rounded-2xl border border-border bg-card p-8">
                  <p className="font-display text-5xl font-extrabold tracking-tight text-border">{step.number}</p>
                  <h3 className="mt-5 text-lg font-bold text-primary">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Who we help */}
      <section className="bg-background py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Who We Serve</p>
            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
              Stellantis Dealerships & Their Teams
            </h2>
          </div>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {whoWeHelp.map((item) => (
              <span
                key={item}
                className="inline-flex cursor-default items-center gap-2 rounded-full border-[1.5px] border-border bg-card px-5 py-3 text-sm font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-sm"
              >
                <IconCheck className="h-4 w-4 text-accent" />
                {item}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted py-20 sm:py-28">
        <Container className="max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-12">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative z-10 -mt-8 overflow-hidden rounded-t-[2.5rem] bg-primary py-20 text-primary-foreground sm:-mt-10 sm:rounded-t-[3rem] sm:py-24">
        <GridGlow />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to Improve Your Warranty Operations?
          </h2>
          <Link
            href="/contact"
            className="btn-gradient inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Request Consultation
          </Link>
        </Container>
      </section>

      {/* SafeAutoJobs */}
      <section className="relative z-10 -mt-8 rounded-t-[2.5rem] bg-muted py-14 sm:-mt-10 sm:rounded-t-[3rem] sm:py-16">
        <Container>
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <h2 className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
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
