# Web alesdemjan.cz – pokyny pro Claude

Osobní web Aleše Demjana (koučink a tréninky). Statické HTML/CSS + trochu vanilla JS, bez frameworku a bez build nástroje. Stránky: `index.html` (Úvod), `koucink.html`, `treninky.html`, `zasady-ochrany-osobnich-udaju.html`, `404.html`; společné styly v `assets/style.css`. Podrobnosti o struktuře a nasazení jsou v `README.md`.

## Postup práce
- Každou dávku změn dělej v nové větvi z aktuální `origin/main` a otevři pull request (`gh api repos/coooach-you/ales-coach-web/pulls ...`, GraphQL/`gh pr create` v tomto prostředí nefunguje). Slučuje ho Aleš sám, nemerguj a nepřepisuj historii (force push).
- Před založením větve zkontroluj, že předchozí PR je sloučený; pokud ne, přidej změny do jeho větve.
- U drobných textových změn nedělej screenshoty ani testy v prohlížeči. Vizuální a layoutové změny zkontroluj v Playwright na šířkách 360/390, 768 a 1280 px (bez vodorovného posouvání).
- Odpovídej česky, stručně; uveď odkaz na PR a co je potřeba udělat (sloučit).
- Prostředí (Windows, PowerShell 5.1): git, gh a node najdeš až po `$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`. Commit message a tělo PR předávej přes soubor (`git commit -F soubor`, `gh api ... -F "body=@soubor"`), here-stringy s diakritikou se rozbíjejí. Pomocné npm balíčky (sharp, playwright, qrcode, jsqr) instaluj mimo repozitář, např. do `%LOCALAPPDATA%\Temp\adweb-tools`.
- Každý PR má náhled `https://deploy-preview-<číslo PR>--alescoach.netlify.app/`. Po sloučení se produkce nasadí za pár minut; ověř na `https://alesdemjan.cz/`. Netlify jede na kreditech – když dojdou, produkční nasazení se pozastaví (web dál běží ve staré verzi).

## Obsah a styl
- Čeština, vykání, autor mluví v jednotném čísle („volím“, „připravuji“), nikdy „my/využíváme“. Texty, které nezadal Aleš, nevymýšlej; když je nutné něco doplnit, výslovně na to upozorni.
- Žádná vymyšlená čísla, statistiky ani superlativy.
- Drobné nadpisy sekcí (`.eyebrow`) jsou zrušené kromě hero sekcí.
- Barvy jen z proměnných v `assets/style.css` (`--bg`, `--bg-alt`, `--ink`, `--ink-soft`, `--accent`, `--accent-dark`, `--line`). Písmo Inter je lokálně v `assets/fonts/` (žádné Google Fonts ani cookies). Jediná analytika je Cloudflare Web Analytics (bez cookies), skript je na konci každé stránky.
- Kontrast textu aspoň WCAG AA, i na fotkách v hero (měř proti nejtmavšímu pixelu za textem).
- Obrázky vytvořené AI mají poznámku „Ilustrační fotografie vytvořená pomocí AI.“, kromě fotek, na kterých je Aleš (hero Koučink a Tréninky, Forma dodání, „Jak to probíhá“). Obrázky ukládej jako WebP v několika šířkách se `srcset`/`sizes` (desítky až nízké stovky kB).
- Po úpravě textů spusť `node tools/typografie.mjs` (pevné mezery po předložkách a v číslech).

## Technické poznámky
- Karty témat na stránce Tréninky se needitují v HTML: uprav `data/temata.json` a spusť `node tools/build-temata.mjs` (přepíše blok mezi značkami `TEMATA:START`/`TEMATA:END`). Karty jsou rozbalovací (`<details>`), bez pevné výšky.
- Interní odkazy používají čisté URL (`/`, `/koucink`, `/treninky`). Web běží na Netlify; `_redirects` dělá 301 z variant s `.html`. Novou stránku doplň do `_redirects`, `sitemap.xml` a patičky.
- E-mail je na více místech; měň ho jen přes `node tools/zmena-emailu.mjs` (zdroj je `data/kontakt.json`). Aktuální e-mail je `ales@alesdemjan.cz` (přeposílání přes ImprovMX do schránky u Microsoftu; tak je to i v zásadách ochrany údajů).
- Lokální náhled: servírovat kořen repozitáře serverem, který umí čisté URL a `404.html` (odkazy začínají `/`, přes `file://` nefungují).
- Hero na stránkách Koučink a Tréninky má fotku v pozadí (`.hero-photo`, světlý přechod zleva doprava, do 900 px rovnoměrná vrstva) a text zarovnaný doleva; Úvod má hero vystředěný.
- Kontaktní sekce (`#kontakt`) je na konci každé stránky a obsahuje QR kód s vizitkou (`assets/img/qr-kontakt.png`). QR obsahuje přesně text `kontakt.vcf`; po změně vizitky nebo e-mailu ho přegeneruj (npm `qrcode`, úroveň korekce M, okraj 1 modul, PNG 339 × 341 px kvůli rozměrům v HTML) a ověř zpětným dekódováním (`jsqr`).
- Ověření pro Seznam Webmaster: meta tag `seznam-wmt` v hlavičce `index.html` a soubor `seznam-wmt-JIRCoSpfmSWYtO6NpO6xeVzpzrVFv6SQ.txt` v kořeni. Nemazat, Seznam ověření průběžně kontroluje.

## Otevřené úkoly (čekají na podklady od Aleše)
- Tréninky: roky a rozsah praxe, typy firem, velikost skupin, jazyky (místo s komentářem `DOPLNIT` v `treninky.html`).
- Reference a typy firem – sekce na Úvodu je zakomentovaná, zveřejnit jen se souhlasem autorů citací.
- Koučink, sekce Praktické informace: konkrétní délka a četnost setkání, případně cena (teď je tam obecný text).
- Právní kontrola zásad ochrany osobních údajů (včetně navržené roční lhůty uchování korespondence).
- Body z `docs/checklist-indexace.md` (Google Search Console apod.).
- Drobnosti k zvážení: kroky „Jak to probíhá“ na Koučinku mají čísla 01–04 (jinde už jsou kroky bez čísel); fotky v hero Koučinku a v „Jak to probíhá“ mají podobný motiv.
- Soubor `CNAME` je záměrně smazaný (doména alesdemjan.cz běží na Netlify, ne na GitHub Pages); nevracej ho bez pokynu. Kanonické URL a `sitemap.xml` míří na `https://alesdemjan.cz/` bez přípony `.html`.
