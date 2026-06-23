export const locales = ["pt-br", "en-us", "es-es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-br";

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

const htmlLangByLocale: Record<Locale, string> = {
  "pt-br": "pt-BR",
  "en-us": "en-US",
  "es-es": "es-ES",
};

export function getHtmlLang(locale: Locale): string {
  return htmlLangByLocale[locale];
}
