import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { hasLocale, locales } from "@/i18n/config";
import { getLocaleFromRequest } from "@/i18n/get-locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    const locale = pathname.split("/")[1];

    if (hasLocale(locale)) {
      const response = NextResponse.next();
      response.cookies.set("NEXT_LOCALE", locale, { path: "/" });
      return response;
    }
  }

  const locale = getLocaleFromRequest(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set("NEXT_LOCALE", locale, { path: "/" });

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
