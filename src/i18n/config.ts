export const locales = ["pt-br", "en-us"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-br";

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getHtmlLang(locale: Locale): string {
  return locale === "pt-br" ? "pt-BR" : "en-US";
}
