import type { Metadata } from "next";
import { EB_Garamond, Lato, Manrope } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getDictionary, locales } from "./dictionaries";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: {
      default: dict.meta.titleDefault,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    icons: {
      icon: "/favicon.png",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${ebGaramond.variable} ${lato.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          {dict.nav.skipToContent}
        </a>
        <Navbar lang={lang} dict={dict} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
