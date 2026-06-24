import { notFound } from "next/navigation";

import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Store } from "@/components/Store";
import { SirBlue } from "@/components/SirBlue";
import { Sponsors } from "@/components/Sponsors";
import { AttractionsStructureScroll } from "@/components/AttractionsStructureScroll";
import { BackToTop } from "@/components/BackToTop";
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
    <main className="bg-[#000000]">
      <Hero dict={dict} />
      <Movement dict={dict.movement} />
      <AttractionsStructureScroll
        attractionsDict={dict.attractions}
        structureDict={dict.structure}
      />
      <SirBlue dict={dict.sirBlue} />
      <Sponsors dict={dict.sponsors} />
      <Gallery dict={dict.gallery} />
      <Store dict={dict.store} />
      <Faq dict={dict.faq} />
      <Contact dict={dict.contact} />
      <Footer dict={dict.footer} />
      <BackToTop label={dict.backToTop} />
    </main>
  );
}
