import Image from "next/image";
import Link from "next/link";
import { navLinks, siteInfo } from "@/lib/nav";
import { GridGlow } from "./GridGlow";
import { IconClock, IconFacebook, IconInstagram, IconLinkedIn, IconMail, IconPin } from "./icons";

const socialIcons = {
  Facebook: IconFacebook,
  LinkedIn: IconLinkedIn,
  Instagram: IconInstagram,
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-primary-dark text-primary-foreground">
      <GridGlow />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/img/logo-white.png" alt="ClaimSafe" width={2172} height={724} className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
            Your warranty partner, not just an administrator.
          </p>
          <div className="mt-5 flex gap-2.5">
            {siteInfo.socials.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/8 bg-white/5 transition-all duration-200 hover:border-accent-light/30 hover:bg-accent/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon className="h-4 w-4 text-white/45" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-white/30">Navigation</p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/50 transition-colors duration-200 hover:text-accent-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-white/30">Hours</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/50">
            {siteInfo.hours.map((h) => (
              <li key={h.days} className="flex items-start gap-2.5">
                <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />
                <span>
                  {h.days}: {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-white/30">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/50">
            <li className="flex items-start gap-2.5">
              <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />
              <a href={`mailto:${siteInfo.email}`} className="hover:text-accent-light">
                {siteInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />
              <span>{siteInfo.footerAddress}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/8 px-6 py-5 text-center text-xs text-white/30">
        © {new Date().getFullYear()} {siteInfo.name} All rights reserved.
      </div>
    </footer>
  );
}
