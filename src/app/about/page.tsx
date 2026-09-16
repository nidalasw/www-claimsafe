import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { IconCheck, IconClipboardCheck, IconDocument, IconShield, IconTag, IconUsers } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded by Moe Naji, ClaimSafe provides a premium warranty-management service built exclusively for Stellantis dealerships.",
};

const reasons = [
  {
    number: "01",
    title: "First-Time Accuracy",
    description: "We submit clean, complete, audit-ready claims to reduce rejections, resubmissions, and delays.",
    icon: IconClipboardCheck,
  },
  {
    number: "02",
    title: "Faster Approvals",
    description: "We handle RA, WAC, loaner requests, DI submissions, and escalations quickly and professionally.",
    icon: IconDocument,
  },
  {
    number: "03",
    title: "More Approved Hours",
    description: "We defend diagnostic time and required operations to maximize approved labor revenue.",
    icon: IconShield,
  },
  {
    number: "04",
    title: "Zero Advisor Stress",
    description: "Your advisors focus on customers — not paperwork, follow-ups, or chasing guidelines.",
    icon: IconUsers,
  },
  {
    number: "05",
    title: "Predictable Pricing",
    description: "Simple monthly pricing with no surprises. A premium service that pays for itself through increased recovery.",
    icon: IconTag,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="About ClaimSafe"
        description="A premium warranty-management service built exclusively for Stellantis dealerships across Canada."
      />

      <section className="relative z-10 -mt-8 rounded-t-[2.5rem] border-b border-border bg-background py-20 sm:-mt-10 sm:rounded-t-[3rem] sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Our Story</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              About ClaimSafe
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-secondary sm:text-lg">
              <p>
                Founded by Moe Naji, ClaimSafe provides a premium warranty-management service built exclusively
                for Stellantis dealerships. We manage your entire warranty workflow claims.
              </p>
              <p>
                Operating as an integrated part of your service department, ClaimSafe delivers audit-ready
                documentation, first-time approvals, and a seamless process that improves profitability and
                customer satisfaction.
              </p>
            </div>
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">Our purpose is clear</p>
              <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                Fast. Accurate. Profitable.
              </p>
              <p className="mt-1 text-base text-secondary">Your warranty program — elevated.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1632733711679-529326f6db12?auto=format&fit=crop&crop=entropy&w=1200&h=1400&q=80"
              alt="A technician inspecting a vehicle's fuse box during a warranty diagnostic"
              width={1200}
              height={1400}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 480px, 100vw"
            />
          </div>
        </Container>
      </section>

      <section className="bg-muted py-20 sm:py-28">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Why Choose Us</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Built for Dealership Results
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            We help Stellantis dealerships recover more warranty revenue with less stress, fewer rejections,
            and faster approvals. Our process is clean, reliable, and built to make your service department
            run smoothly every single day.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, i) => (
              <Reveal key={reason.number} delay={i * 80}>
                <div className="group h-full rounded-2xl border-[1.5px] border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-primary hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors duration-300 group-hover:bg-white/10">
                      <reason.icon className="h-5.5 w-5.5 text-accent transition-colors duration-300 group-hover:text-accent-light" />
                    </div>
                    <p className="font-display text-3xl font-extrabold text-border transition-colors duration-300 group-hover:text-white/15">
                      {reason.number}
                    </p>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-primary transition-colors duration-300 group-hover:text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-white/60">
                    {reason.description}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={reasons.length * 80}>
              <div className="flex h-full flex-col justify-center gap-3 rounded-2xl border-[1.5px] border-dashed border-accent/30 bg-accent/5 p-7">
                <IconCheck className="h-6 w-6 text-accent" />
                <p className="text-base font-semibold text-primary">All Services Under One Roof</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Claim processing, backlog recovery, and advisor training — everything managed in one place.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
