// Změní kontaktní e-mail na celém webu (stránky, JSON-LD, vizitka, data/kontakt.json).
// Spuštění z kořene repozitáře: node tools/zmena-emailu.mjs ales@alesdemjan.cz

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const kontaktPath = join(root, "data", "kontakt.json");
const novy = process.argv[2];
if (!novy || !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(novy)) {
  console.error("Použití: node tools/zmena-emailu.mjs novy@email.cz");
  process.exit(1);
}

const kontakt = JSON.parse(readFileSync(kontaktPath, "utf8"));
const stary = kontakt.email;
const soubory = [
  ...readdirSync(root).filter((f) => f.endsWith(".html") || f.endsWith(".vcf")),
  "data/temata.json",
];

for (const f of soubory) {
  const p = join(root, f);
  const obsah = readFileSync(p, "utf8");
  if (!obsah.includes(stary)) continue;
  writeFileSync(p, obsah.replaceAll(stary, novy));
  console.log(`Upraveno: ${f}`);
}
kontakt.email = novy;
writeFileSync(kontaktPath, JSON.stringify(kontakt, null, 2) + "\n");
console.log(`Hotovo: ${stary} → ${novy}. Nezapomeňte přegenerovat QR kód (assets/img/qr-kontakt.png).`);
