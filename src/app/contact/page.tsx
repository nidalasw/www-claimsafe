import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { IconClock, IconMail, IconPhone, IconPin } from "@/components/icons";
import { siteInfo } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Gestion ClaimSafe Inc. to improve your dealership's warranty operations.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact ClaimSafe"
        description="Let's talk about your warranty operations — we typically respond within one business day."
      />

      <section className="relative z-10 -mt-8 rounded-t-[2.5rem] bg-background py-20 sm:-mt-10 sm:rounded-t-[3rem] sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-accent/30 hover:shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <IconMail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Email</p>
                  <a href={`mailto:${siteInfo.email}`} className="text-base font-semibold text-primary hover:text-accent">
                    {siteInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-accent/30 hover:shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <IconPhone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Phone</p>
                  <a
                    href={`tel:${siteInfo.phone.replace(/[^+\d]/g, "")}`}
                    className="text-base font-semibold text-primary hover:text-accent"
                  >
                    {siteInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-accent/30 hover:shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <IconPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Office</p>
                  <p className="text-base font-semibold text-primary">{siteInfo.contactAddress}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-primary">
                <IconClock className="h-4 w-4 text-accent" />
                Office Hours
              </p>
              <ul className="mt-4 space-y-2.5">
                {siteInfo.hours.map((h) => (
                  <li key={h.days} className="flex justify-between border-b border-border pb-2.5 text-sm last:border-b-0 last:pb-0">
                    <span className="text-muted-foreground">{h.days}</span>
                    <span className="font-semibold text-primary">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-muted p-7 sm:p-10">
            <h3 className="font-display text-xl font-extrabold text-primary">Request a Consultation</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">Fill in your details and we&rsquo;ll be in touch shortly.</p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
