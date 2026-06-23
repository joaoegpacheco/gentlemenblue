import "server-only";

import type { Locale } from "./config";
import type ptBr from "./dictionaries/pt-br.json";

export type Dictionary = typeof ptBr;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  "pt-br": () =>
    import("./dictionaries/pt-br.json").then((module) => module.default),
  "en-us": () =>
    import("./dictionaries/en-us.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
