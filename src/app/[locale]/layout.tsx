import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { fontVariables } from "@/lib/fonts";
import { assets } from "@/lib/assets";
import { getHtmlLang, hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

import "../globals.css";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    return {};
  }

  const dict = await getDictionary(locale);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    icons: {
      icon: assets.images.logo,
      shortcut: assets.images.logo,
      apple: assets.images.logo,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={getHtmlLang(locale)}
      className={`${fontVariables} h-full overflow-x-clip bg-black antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-black font-body">
        {children}
      </body>
    </html>
  );
}
