// Česká typografie v textech stránek: pevná mezera po jednopísmenných předložkách a spojkách
// (k s v z o u a i), mezi číslem a následujícím slovem a uvnitř čísel (telefon, PSČ, datum).
// Mění jen text mezi značkami v <body>, ne atributy, skripty ani styly. Opakované spuštění nic nerozbije.
// Spuštění z kořene repozitáře: node tools/typografie.mjs

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export function upravText(t) {
  return t
    .replace(/(^|[\s(„>]|&nbsp;)([kKsSvVzZoOuUaAiI])\s+(?=\S)/g, "$1$2&nbsp;")
    .replace(/(^|[\s(„>]|&nbsp;)([kKsSvVzZoOuUaAiI])\s+(?=\S)/g, "$1$2&nbsp;")
    .replace(/(\d)[ \t]+(?=\d)/g, "$1&nbsp;")
    .replace(/(\d\.)[ \t]+(?=\d)/g, "$1&nbsp;")
    .replace(/(\d)\s+(?=[\p{L}%])/gu, "$1&nbsp;");
}

export function upravHtml(html) {
  const [pred, telo] = html.split(/(?=<body)/);
  if (!telo) return html;
  // Rozdělí na značky a text; uvnitř <script> a <style> nic neměníme
  let vSkriptu = false;
  const casti = telo.split(/(<[^>]*>)/);
  for (let i = 0; i < casti.length; i++) {
    const c = casti[i];
    if (c.startsWith("<")) {
      if (/^<(script|style)\b/i.test(c)) vSkriptu = true;
      if (/^<\/(script|style)>/i.test(c)) vSkriptu = false;
      continue;
    }
    if (!vSkriptu && c.trim()) casti[i] = upravText(c);
  }
  return pred + casti.join("");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  for (const f of readdirSync(root).filter((f) => f.endsWith(".html"))) {
    const p = join(root, f);
    const puvodni = readFileSync(p, "utf8");
    const nove = upravHtml(puvodni);
    if (nove !== puvodni) {
      writeFileSync(p, nove);
      console.log(`Upraveno: ${f}`);
    }
  }
}
