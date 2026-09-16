import { notFound } from "next/navigation";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const locales = Object.keys(dictionaries) as Locale[];

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries;

export const getDictionary = async (locale: string) => {
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
