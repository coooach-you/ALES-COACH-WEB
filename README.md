# alesdemjan.cz

Osobní web Aleše Demjana (koučink a tréninky). Statický web bez frameworku: čisté HTML, CSS a pár řádků vanilla JS. Žádné cookies ani formuláře, návštěvnost měří Cloudflare Web Analytics (bez cookies), písmo Inter je uložené lokálně.

## Co je v repozitáři

```
index.html                          Úvod (/)
koucink.html                        Koučink (/koucink)
treninky.html                       Tréninky (/treninky)
zasady-ochrany-osobnich-udaju.html  Ochrana osobních údajů
404.html                            Stránka „nenalezeno“
assets/style.css                    Společné styly všech stránek
assets/fonts/                       Písmo Inter (woff2) + licence OFL
assets/img/                         Fotky (WebP v několika šířkách), OG obrázky, QR kód
data/temata.json                    Texty karet v katalogu témat (stránka Tréninky)
data/kontakt.json                   Kontaktní e-mail a telefon (zdroj pro skripty)
tools/build-temata.mjs              Vygeneruje karty témat do treninky.html
tools/typografie.mjs                Pevné mezery po předložkách, v číslech atd.
tools/zmena-emailu.mjs              Změní e-mail na celém webu
docs/                               Návrhy a checklisty (nejsou součástí webu)
_redirects, _headers                Nastavení Netlify (301 z .html, typ souboru vizitky)
kontakt.vcf                         Vizitka ke stažení (tlačítko na mobilu)
favicon.svg, favicon.ico, apple-touch-icon.png
robots.txt, sitemap.xml
```

Blog a reference jsou zatím skryté: sekce jsou v HTML zakomentované.

## Jak web upravit

**Běžné texty** jsou přímo v HTML souborech. Po úpravě spusťte `node tools/typografie.mjs`, který doplní pevné mezery po jednopísmenných předložkách a spojkách (k, s, v, z, o, u, a, i) a v číslech.

**Témata tréninků** (rozbalovací karty) se needitují v HTML, ale v `data/temata.json`. Každé téma má `nazev`, `podtitul` a body v `body`. Po úpravě spusťte z kořene repozitáře:

```
node tools/build-temata.mjs
```

Skript přepíše karty v `treninky.html` mezi značkami `TEMATA:START` a `TEMATA:END`, včetně odkazů na skupiny a odkazu „Poptat toto téma“ (potřebuje jen Node.js).

**Změna e-mailu** (např. po založení schránky na doméně):

```
node tools/zmena-emailu.mjs ales@alesdemjan.cz
```

Potom je potřeba přegenerovat QR kód `assets/img/qr-kontakt.png`.

**Fotky** ukládejte jako WebP v několika šířkách (např. 800/1200/1672 px) a v HTML uveďte `srcset`, `sizes`, `width` a `height`. Fotky vytvořené AI mají pod sebou poznámku „Ilustrační fotografie vytvořená pomocí AI.“, kromě fotek, na kterých je Aleš.

**Barvy a písmo** jsou nahoře v `assets/style.css` (proměnné `--bg`, `--accent` atd.).

## Nasazení (Netlify)

Web běží na Netlify a nasazuje se automaticky z větve `main` při každém pushi. Netlify obsluhuje čisté URL (`/koucink` → `koucink.html`), `404.html` a soubory `_redirects` a `_headers`.

Kanonické adresy jsou bez přípony `.html`; varianty s příponou přesměrovává `_redirects` kódem 301. Po přidání nové stránky ji doplňte do `_redirects` i `sitemap.xml`.

Checklist pro Search Console, Seznam Webmaster a další je v `docs/checklist-indexace.md`.
