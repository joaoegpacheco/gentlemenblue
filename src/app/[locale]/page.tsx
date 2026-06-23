import { notFound } from "next/navigation";

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
    </main>
  );
}
