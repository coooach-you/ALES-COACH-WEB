# Návrh: samostatné stránky pro nejpoptávanější témata tréninků

Stav: **jen návrh, neimplementováno** (bod 3.3 auditu). Čeká na schválení a na texty od Aleše.

## Proč
Stránka `/treninky` dnes pokrývá 21 témat na jedné URL. Vyhledávače i lidé, kteří hledají konkrétní věc
(„školení AI pro firmy“, „workshop zpětná vazba“), najdou lépe stránku věnovanou jen jednomu tématu.

## Architektura

| URL | Pokrývá témata z katalogu | Klíčová slova (přirozeně, bez vycpávání) |
|---|---|---|
| `/treninky/ai-v-praci` | AI nástroje v každodenní práci, Efektivita v Microsoft Office | AI v každodenní práci školení, školení AI pro firmy |
| `/treninky/komunikace-a-feedback` | Komunikace, která funguje, Obtížné rozhovory, Asertivita, Feedback, Neverbální komunikace, Prezentační dovednosti | workshop komunikace, školení soft skills, zpětná vazba |
| `/treninky/vedeni-tymu` | Vztahy v týmu, Budování výkonných týmů, Koučink pro každodenní situace, Porady, Firemní kultura | leadership, vedení týmu, školení manažerů |
| `/treninky/odolnost-a-energie` | Mozek v práci, Mindfulness, Stres management, Time management, Work–life balance | stres management školení, time management workshop |

`/treninky` zůstane rozcestníkem: u každé skupiny v katalogu přibude odkaz „Více o tématu“ na příslušnou podstránku.

## Obsah každé podstránky (600–900 slov)
1. H1 s tématem a jedna věta, komu je trénink určený.
2. Co účastníci získají (3–5 bodů, bez slibů a čísel, která nejsou ověřená).
3. Příklad programu (např. půldenní workshop: bloky a cvičení) – **texty dodá Aleš**.
4. Formát: délka, prezenčně / online, velikost skupiny – **údaje dodá Aleš**.
5. Pro koho: cílová skupina (týmy, vedoucí, HR).
6. CTA „Poptat trénink“ s předvyplněným předmětem e-mailu.
7. Vlastní `title` (≤ 60 znaků), `description` (≤ 155), canonical, OG obrázek, JSON-LD `Service` + `BreadcrumbList`.

## Technicky
- Soubory `treninky/ai-v-praci.html` atd. Netlify je obslouží jako `/treninky/ai-v-praci` bez přípony;
  do `_redirects` přidat 301 z varianty `.html`.
- Na podstránkách používat absolutní cesty k `/assets/…` (jsou o úroveň níž).
- Doplnit URL do `sitemap.xml`.
- Blog zůstává skrytý.
