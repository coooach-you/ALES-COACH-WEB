// Vygeneruje rozbalovací karty témat z data/temata.json a vloží je do treninky.html
// mezi značky <!-- TEMATA:START --> a <!-- TEMATA:END -->.
// Spuštění z kořene repozitáře: node tools/build-temata.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { upravText } from "./typografie.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "data", "temata.json");
const pagePath = join(root, "treninky.html");
const { email } = JSON.parse(readFileSync(join(root, "data", "kontakt.json"), "utf8"));

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Text s českou typografií (pevné mezery), jen pro obsah, ne pro atributy
const txt = (s) => upravText(esc(s));
const slug = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const groups = JSON.parse(readFileSync(dataPath, "utf8"));

const card = (t) => `          <details class="topic">
            <summary><span class="topic-name">${txt(t.nazev)}</span><span class="topic-sub">${txt(t.podtitul)}</span></summary>
            <ul>
${t.body.map((b) => `              <li>${txt(b)}</li>`).join("\n")}
            </ul>
            <a class="topic-ask" href="mailto:${email}?subject=${encodeURIComponent(`Poptávka tréninku – ${t.nazev}`)}">Poptat toto téma</a>
          </details>`;

const chips = `      <nav class="chips" aria-label="Skupiny témat">
${groups.map((g) => `        <a href="#${slug(g.skupina)}">${esc(g.skupina)}</a>`).join("\n")}
      </nav>`;

const html =
  chips +
  "\n" +
  groups
    .map(
      (g) => `      <div class="topic-group" id="${slug(g.skupina)}">
        <h3>${esc(g.skupina)}</h3>
        <div class="topics">
${g.temata.map(card).join("\n")}
        </div>
      </div>`
    )
    .join("\n");

const page = readFileSync(pagePath, "utf8");
const re = /(<!-- TEMATA:START[^>]*-->\r?\n)[\s\S]*?(\s*<!-- TEMATA:END -->)/;
if (!re.test(page)) {
  console.error("V treninky.html chybí značky TEMATA:START / TEMATA:END.");
  process.exit(1);
}
writeFileSync(pagePath, page.replace(re, (_, start, end) => `${start}${html}${end}`));

let total = 0;
for (const g of groups) {
  total += g.temata.length;
  for (const t of g.temata) {
    if (!t.podtitul) console.warn(`Upozornění: téma „${t.nazev}“ nemá podtitul.`);
  }
}
console.log(`Hotovo: ${groups.length} skupin, ${total} témat vloženo do treninky.html.`);
