import sharp from "sharp";
import { access, mkdir } from "node:fs/promises";
import path from "node:path";

const source = path.resolve("public/team/enrico-peruffo.avif");
const target = path.resolve("public/team/enrico-peruffo-transparent.webp");

await access(source);
await mkdir(path.dirname(target), { recursive: true });

await sharp(source, { failOn: "error" })
  .webp({
    quality: 92,
    alphaQuality: 100,
    smartSubsample: true,
  })
  .toFile(target);

console.log("Prepared transparent Enrico portrait:", target);
