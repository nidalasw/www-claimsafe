"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteInfo } from "@/lib/nav";
import { IconClose, IconMenu } from "./icons";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        scrolled || open
          ? "bg-primary-dark/90 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="shrink-0" aria-label="ClaimSafe home">
          <Image
            src="/img/logo-white.png"
            alt="ClaimSafe"
            width={2172}
            height={724}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 hover:bg-white/8 hover:text-white ${
                  active ? "text-white" : "text-white/65"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={`tel:${siteInfo.phone.replace(/[^+\d]/g, "")}`}
            className="text-sm font-semibold text-white/55 transition-colors duration-200 hover:text-accent-light"
          >
            {siteInfo.phone}
          </a>
          <Link
            href="/contact"
            className="cursor-pointer rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-light hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="cursor-pointer rounded-lg bg-white/6 p-2 text-white md:hidden"
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="animate-entrance border-t border-white/10 bg-primary-dark px-6 py-4 [animation-duration:220ms] md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block min-h-11 rounded-lg px-3 py-2.5 text-base font-medium text-white/80 transition-colors duration-200 hover:bg-white/8 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block cursor-pointer rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
