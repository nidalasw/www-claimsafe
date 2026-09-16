"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/nav";
import { IconClose, IconMenu } from "./icons";

const HIDE_THRESHOLD = 96;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > lastScrollY.current;

        setScrolled(y > 8);
        setHidden(!openRef.current && goingDown && y > HIDE_THRESHOLD);

        lastScrollY.current = y;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border transition-all duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "bg-background/80 shadow-sm backdrop-blur-xl" : "bg-background/95 shadow-none backdrop-blur"}`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setOpen(false)} className="shrink-0" aria-label="ClaimSafe home">
          <Image
            src="/img/logo-color.png"
            alt="ClaimSafe"
            width={2172}
            height={724}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-accent ${
                  active ? "text-accent" : "text-secondary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="cursor-pointer rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-colors duration-200 hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Book Now
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="cursor-pointer text-primary md:hidden"
        >
          {open ? <IconClose className="h-7 w-7" /> : <IconMenu className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="animate-entrance border-t border-border bg-background/90 backdrop-blur-xl [animation-duration:280ms] md:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block min-h-11 py-2.5 text-base font-medium text-secondary transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block cursor-pointer rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground"
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
