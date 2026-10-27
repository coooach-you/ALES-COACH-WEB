// Vygeneruje karty témat z data/temata.json a vloží je do treninky.html
// mezi značky <!-- TEMATA:START --> a <!-- TEMATA:END -->.
// Spuštění z kořene repozitáře: node tools/build-temata.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "data", "temata.json");
const pagePath = join(root, "treninky.html");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const groups = JSON.parse(readFileSync(dataPath, "utf8"));

const card = (t) => `        <div class="topic" tabindex="0" role="button" aria-pressed="false">
          <div class="topic-inner">
            <div class="topic-face topic-front">
              <h4>${esc(t.nazev)}</h4>
              <p class="aneb">${esc(t.aneb)}</p>
              <span class="turn" aria-hidden="true">Co obsahuje</span>
            </div>
            <div class="topic-face topic-back" aria-hidden="true">
              <p class="title">${esc(t.nazev)}</p>
              <p class="aneb">${esc(t.aneb)}</p>
              <ul>
${t.body.map((b) => `                <li>${esc(b)}</li>`).join("\n")}
              </ul>
            </div>
          </div>
        </div>`;

const html = groups
  .map(
    (g) => `      <div class="topic-group">
        <h3>${esc(g.skupina)}</h3>
        <div class="topics">
${g.temata.map(card).join("\n")}
        </div>
      </div>`
  )
  .join("\n");

const page = readFileSync(pagePath, "utf8");
const re = /(<!-- TEMATA:START[^>]*-->\n)[\s\S]*?(\s*<!-- TEMATA:END -->)/;
if (!re.test(page)) {
  console.error("V treninky.html chybí značky TEMATA:START / TEMATA:END.");
  process.exit(1);
}
writeFileSync(pagePath, page.replace(re, `$1${html}$2`));

let total = 0;
for (const g of groups) {
  total += g.temata.length;
  if (g.temata.length % 3 !== 0) {
    console.warn(
      `Upozornění: skupina „${g.skupina}“ má ${g.temata.length} témat. ` +
        "Na desktopu (3 sloupce) poslední řada nevyjde celá."
    );
  }
  for (const t of g.temata) {
    if (t.body.length !== 5) {
      console.warn(`Upozornění: téma „${t.nazev}“ má ${t.body.length} bodů (karta je navržená na 5).`);
    }
  }
}
console.log(`Hotovo: ${groups.length} skupin, ${total} témat vloženo do treninky.html.`);
