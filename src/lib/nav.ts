export const navLinks = [
  { key: "home", path: "/" },
  { key: "services", path: "/services" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
] as const;

export const siteInfo = {
  name: "Gestion ClaimSafe Inc.",
  email: "naji@claimsafeinc.com",
  phone: "+1 (514) 999-2604",
  bookingUrl: "https://cal.com/moe-naji-vtsnta",
  footerAddress: "2200 Rue Sauvé O. Montreal, QC H4N 0E1",
  contactAddress: "2200 Rue Sauvé O, Saint-Laurent, QC H4N 0E1, Canada",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/people/Gestion-ClaimSafe-Inc/61578038550514/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/gestion-claimsafe-inc/" },
    { label: "Instagram", href: "https://www.instagram.com/claimsafeinc" },
  ],
};

export function localePath(lang: string, path: string) {
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}
