import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const manifest = JSON.parse(
  readFileSync(join(root, "src/lib/assets.json"), "utf8"),
);

function collectRelativePaths(value) {
  if (typeof value === "string") {
    return [value];
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectRelativePaths);
  }

  return [];
}

function resolveAssetPath(relativePath) {
  if (relativePath.startsWith("src/")) {
    return join(root, relativePath);
  }

  return join(publicDir, relativePath);
}

function formatAssetPath(relativePath) {
  if (relativePath.startsWith("src/")) {
    return relativePath;
  }

  return `public/${relativePath}`;
}

const requiredPaths = collectRelativePaths(manifest);
const missing = requiredPaths.filter(
  (relativePath) => !existsSync(resolveAssetPath(relativePath)),
);

if (missing.length > 0) {
  console.error(`Missing ${missing.length} required asset(s):\n`);
  for (const relativePath of missing) {
    console.error(`  - ${formatAssetPath(relativePath)}`);
  }
  console.error("\nAdd the files above or update src/lib/assets.json.");
  process.exit(1);
}

console.log(`All ${requiredPaths.length} required assets are present.`);
