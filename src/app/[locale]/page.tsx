import { notFound } from "next/navigation";

import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { SirBlue } from "@/components/SirBlue";
import { Sponsors } from "@/components/Sponsors";
import { Attractions } from "@/components/Attractions";
import { Structure } from "@/components/Structure";
import { Hero } from "@/components/Hero";
import { Movement } from "@/components/Movement";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <main className="bg-[#0a1628]">
      <Hero dict={dict} />
      <Movement dict={dict.movement} />
      <Attractions dict={dict.attractions} />
      <Structure dict={dict.structure} />
      <SirBlue dict={dict.sirBlue} />
      <Sponsors dict={dict.sponsors} />
      <Faq dict={dict.faq} />
      <Contact dict={dict.contact} />
      <Footer dict={dict.footer} />
    </main>
  );
}
