import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { IconCheck, IconClipboardCheck, IconDocument, IconShield, IconTag, IconUsers } from "@/components/icons";
import { getDictionary } from "../dictionaries";

const reasonIcons = [IconClipboardCheck, IconDocument, IconShield, IconUsers, IconTag];

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.about.meta.title,
    description: dict.about.meta.description,
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const about = dict.about;
  const reasons = about.why.reasons.map((reason, i) => ({ ...reason, icon: reasonIcons[i] }));

  return (
    <>
      <PageHero eyebrow={about.hero.eyebrow} title={about.hero.title} description={about.hero.description} />

      <section className="relative z-10 -mt-8 rounded-t-[2.5rem] border-b border-border bg-background py-20 sm:-mt-10 sm:rounded-t-[3rem] sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{about.story.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              {about.story.title}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-secondary sm:text-lg">
              <p>{about.story.paragraph1}</p>
              <p>{about.story.paragraph2}</p>
            </div>
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">{about.story.purposeLabel}</p>
              <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                {about.story.purposeTitle}
              </p>
              <p className="mt-1 text-base text-secondary">{about.story.purposeSubtitle}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/img/about/photo-1.jpg"
              alt={about.story.imageAlt}
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{about.why.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            {about.why.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">{about.why.description}</p>
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
                <p className="text-base font-semibold text-primary">{about.why.allInOne.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{about.why.allInOne.description}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
