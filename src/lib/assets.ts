import manifest from "./assets.json";

type RelativePath = string;

function toPublicPath(relativePath: RelativePath): `/${RelativePath}` {
  return `/${relativePath}`;
}

function mapPaths<T extends Record<string, RelativePath>>(group: T) {
  return Object.fromEntries(
    Object.entries(group).map(([key, value]) => [key, toPublicPath(value)]),
  ) as { [K in keyof T]: `/${T[K]}` };
}

/** Static assets served from `/public`. Run `pnpm assets:check` to verify files exist. */
export const assets = {
  images: mapPaths(manifest.images),
  icons: mapPaths(manifest.icons),
  videos: mapPaths(manifest.videos),
  fonts: mapPaths(manifest.fonts),
} as const;

export type AttractionIcon =
  | "grill"
  | "guitar"
  | "podcast"
  | "speaker"
  | "motor"
  | "exhibitor";

export const attractionIcons: Record<AttractionIcon, (typeof assets.icons)[AttractionIcon]> = {
  grill: assets.icons.grill,
  guitar: assets.icons.guitar,
  podcast: assets.icons.podcast,
  speaker: assets.icons.speaker,
  motor: assets.icons.motor,
  exhibitor: assets.icons.exhibitor,
};

export const socialIcons = {
  instagram: assets.icons.instagram,
  facebook: assets.icons.facebook,
  spotify: assets.icons.spotify,
  whatsapp: assets.icons.whatsapp,
} as const;

function collectRelativePaths(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectRelativePaths);
  }

  return [];
}

export const requiredAssetPaths = collectRelativePaths(manifest).map(toPublicPath);
