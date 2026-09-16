import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { IconMail, IconPhone, IconPin } from "@/components/icons";
import { siteInfo } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Gestion ClaimSafe Inc. to improve your dealership's warranty operations.",
};

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteInfo.contactAddress)}&output=embed`;

  return (
    <>
      <PageHero title="Contact" />

      <section className="relative z-10 -mt-8 rounded-t-[2.5rem] border-b border-border bg-background py-20 sm:-mt-10 sm:rounded-t-[3rem] sm:py-28">
        <Container className="max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            Contact ClaimSafe
          </h2>
          <p className="mt-3 text-lg text-secondary">Let&rsquo;s improve your warranty operations.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
            <a
              href={`mailto:${siteInfo.email}`}
              className="flex items-center gap-2.5 text-base font-medium text-primary transition-colors duration-200 hover:text-accent"
            >
              <IconMail className="h-5 w-5 text-accent" />
              {siteInfo.email}
            </a>
            <a
              href={`tel:${siteInfo.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-2.5 text-base font-medium text-primary transition-colors duration-200 hover:text-accent"
            >
              <IconPhone className="h-5 w-5 text-accent" />
              {siteInfo.phone}
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-muted py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-10">
            <h3 className="font-serif text-2xl font-semibold text-primary">
              Contact ClaimSafe — Request a Consultation
            </h3>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-accent/30 hover:shadow-sm">
              <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-base text-secondary">{siteInfo.contactAddress}</p>
            </div>
            <div className="min-h-80 flex-1 overflow-hidden rounded-2xl border border-border transition-colors duration-200 hover:border-accent/30">
              <iframe
                title="ClaimSafe location map"
                src={mapSrc}
                className="h-full min-h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
