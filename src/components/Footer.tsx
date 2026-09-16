import Image from "next/image";
import Link from "next/link";
import { navLinks, siteInfo } from "@/lib/nav";
import { BrandWaves } from "./BrandWaves";
import { IconClock, IconFacebook, IconInstagram, IconLinkedIn, IconMail, IconPin } from "./icons";

const socialIcons = {
  Facebook: IconFacebook,
  LinkedIn: IconLinkedIn,
  Instagram: IconInstagram,
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-primary-dark bg-primary text-primary-foreground">
      <BrandWaves
        variant="quiet"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/img/logo-white.png" alt="ClaimSafe" width={2172} height={724} className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Your warranty partner, not just an administrator.
          </p>
          <div className="mt-5 flex gap-4">
            {siteInfo.socials.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-primary-foreground/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/60">Navigation</p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-primary-foreground/85 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/60">Hours</p>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/85">
            {siteInfo.hours.map((h) => (
              <li key={h.days} className="flex items-start gap-2.5">
                <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                <span>
                  {h.days}: {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/60">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/85">
            <li className="flex items-start gap-2.5">
              <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
              <a href={`mailto:${siteInfo.email}`} className="hover:text-white">
                {siteInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
              <span>{siteInfo.footerAddress}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-primary-foreground/10 px-6 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} {siteInfo.name} All rights reserved.
      </div>
    </footer>
  );
}
