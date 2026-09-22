export type Content = string | Content[] | { [key: string]: Content };
export type Field = { path: string[]; value: string };

export function fields(content: Content, path: string[] = []): Field[] {
  if (typeof content === "string") return [{ path, value: content }];
  return Object.entries(content).flatMap(([key, value]) => fields(value, [...path, key]));
}

export function label(key: string): string {
  if (/^\d+$/.test(key)) return `Item ${Number(key) + 1}`;
  const names: Record<string, string> = {
    meta: "Search engine text", nav: "Navigation", home: "Home", about: "About",
    services: "Services", contact: "Contact", footer: "Footer", hours: "Office hours",
    contactInfo: "Contact labels", language: "Language names", hero: "Main banner",
    cta: "Call to action", ctaPrimary: "Primary button", ctaSecondary: "Secondary button",
    eyebrow: "Small heading", imageAlt: "Image description", alt: "Image description",
  };
  return names[key] ?? key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());
}

// Form option values are internal identifiers, rather than displayed text.
export function editable(path: string[]): boolean {
  return !(path[0] === "contact" && path[1] === "form" &&
    ["services", "sources"].includes(path[2]) && path.at(-1) === "value");
}

export function replaceText(content: Content, path: string[], value: string): Content {
  if (!path.length) return value;
  const [key, ...rest] = path;
  if (typeof content === "string") throw new Error("Invalid field");
  if (Array.isArray(content)) return content.map((item, i) => String(i) === key ? replaceText(item, rest, value) : item);
  return { ...content, [key]: replaceText(content[key], rest, value) };
}

export function validContent(candidate: unknown, original: Content, path: string[] = []): candidate is Content {
  if (typeof original === "string") {
    return typeof candidate === "string" && candidate.length <= 12000 &&
      (editable(path) || candidate === original) &&
      (path.join(".") !== "meta.titleTemplate" || candidate.includes("%s"));
  }
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate) !== Array.isArray(original)) return false;
  const keys = Object.keys(original);
  if (keys.length !== Object.keys(candidate).length) return false;
  return keys.every((key) => Object.hasOwn(candidate, key) && validContent(
    (candidate as Record<string, unknown>)[key],
    (original as Record<string, Content>)[key], [...path, key],
  ));
}
