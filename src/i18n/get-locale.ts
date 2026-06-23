import type { NextRequest } from "next/server";

import { defaultLocale, type Locale, locales } from "./config";

function parseAcceptLanguage(header: string): string[] {
  return header
    .split(",")
    .map((part) => {
      const [language, qualityPart] = part.trim().split(";q=");
      const quality = qualityPart ? Number.parseFloat(qualityPart) : 1;

      return { language: language.toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality)
    .map(({ language }) => language);
}

function matchLocale(language: string): Locale | null {
  const normalized = language.toLowerCase();

  if (normalized.startsWith("pt")) {
    return "pt-br";
  }

  if (normalized.startsWith("en")) {
    return "en-us";
  }

  if (normalized.startsWith("es")) {
    return "es-es";
  }

  return null;
}

export function getLocaleFromRequest(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    for (const language of parseAcceptLanguage(acceptLanguage)) {
      const locale = matchLocale(language);

      if (locale) {
        return locale;
      }
    }
  }

  return defaultLocale;
}
