# Web alesdemjan.cz – pokyny pro Claude

Osobní web Aleše Demjana (koučink a tréninky). Statické HTML/CSS + trochu vanilla JS, bez frameworku a bez build nástroje. Stránky: `index.html` (Úvod), `koucink.html`, `treninky.html`; společné styly v `assets/style.css`. Podrobnosti o struktuře a nasazení jsou v `README.md`.

## Postup práce
- Každou dávku změn dělej v nové větvi z aktuální `origin/main` a otevři pull request (`gh api repos/coooach-you/ales-coach-web/pulls ...`, GraphQL/`gh pr create` v tomto prostředí nefunguje). Slučuje ho Aleš sám, nemerguj a nepřepisuj historii (force push).
- Před založením větve zkontroluj, že předchozí PR je sloučený; pokud ne, přidej změny do jeho větve.
- U drobných textových změn nedělej screenshoty ani testy v prohlížeči. Vizuální a layoutové změny zkontroluj v Playwright na šířkách 360/390, 768 a 1280 px (bez vodorovného posouvání).
- Odpovídej česky, stručně; uveď odkaz na PR a co je potřeba udělat (sloučit).

## Obsah a styl
- Čeština, vykání, autor mluví v jednotném čísle („volím“, „připravuji“), nikdy „my/využíváme“. Texty, které nezadal Aleš, nevymýšlej; když je nutné něco doplnit, výslovně na to upozorni.
- Žádná vymyšlená čísla, statistiky ani superlativy.
- Drobné nadpisy sekcí (`.eyebrow`) jsou zrušené kromě hero sekcí.
- Barvy jen z proměnných v `assets/style.css` (`--bg`, `--bg-alt`, `--ink`, `--ink-soft`, `--accent`, `--accent-dark`, `--line`). Písmo Inter je lokálně v `assets/fonts/` (žádné Google Fonts, analytika ani cookies).
- Kontrast textu aspoň WCAG AA, i na fotkách v hero (měř proti nejtmavšímu pixelu za textem).
- Obrázky vytvořené AI mají poznámku „Ilustrační fotografie vytvořená pomocí AI.“ (fotka na stránce Koučink v sekci „Jak to probíhá“ je skutečná, poznámku nemá). Obrázky ukládej optimalizované (JPG/WebP, desítky až nízké stovky kB).

## Technické poznámky
- Karty témat na stránce Tréninky se needitují v HTML: uprav `data/temata.json` a spusť `node tools/build-temata.mjs` (přepíše blok mezi značkami `TEMATA:START`/`TEMATA:END`). Výška karet je pevná (`.topic { min-height }`), po změně textů ověř, že se zadní strana vejde.
- Hero na stránkách Koučink a Tréninky má fotku v pozadí (`.hero-photo`, světlý přechod zleva doprava, do 900 px rovnoměrná vrstva) a text zarovnaný doleva; Úvod má hero vystředěný.
- Kontaktní sekce (`#kontakt`) je na konci každé stránky a obsahuje QR kód s vizitkou (`assets/img/qr-kontakt.png`).
- Soubor `CNAME` je záměrně smazaný (web zatím běží na github.io); nevracej ho bez pokynu. Kanonické URL a `sitemap.xml` míří na `https://alesdemjan.cz/`.
