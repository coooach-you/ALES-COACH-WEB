# alesdemjan.cz

Osobní web Aleše Demjana (koučink a tréninky). Statický web bez frameworku: čisté HTML, CSS a pár řádků vanilla JS. Žádná analytika, cookies ani formuláře, písmo Inter je uložené lokálně.

## Co je v repozitáři

```
index.html            Úvodní stránka
koucink.html          Koučink
treninky.html         Tréninky
assets/style.css      Společné styly všech stránek
assets/fonts/         Písmo Inter (woff2) + licence OFL
assets/img/           Portrét a fotky z tréninků
data/temata.json      Texty karet v katalogu témat (stránka Tréninky)
tools/build-temata.mjs  Skript, který z temata.json vygeneruje karty do treninky.html
CNAME                 Doména pro GitHub Pages (alesdemjan.cz)
robots.txt, sitemap.xml
.nojekyll             GitHub Pages web nezpracovává Jekyllem
```

Blog je zatím skrytý: sekce je v `koucink.html` a `index.html` zakomentovaná a v navigaci na něj nic neodkazuje.

## Jak web upravit

**Běžné texty** jsou přímo v HTML souborech (`index.html`, `koucink.html`, `treninky.html`). Stačí upravit text mezi značkami a uložit.

**Témata tréninků** (otočné karty) se needitují v HTML, ale v `data/temata.json`. Každé téma má `nazev`, `aneb` a pět položek v `body`. Po úpravě spusťte z kořene repozitáře:

```
node tools/build-temata.mjs
```

Skript přepíše karty v `treninky.html` mezi značkami `TEMATA:START` a `TEMATA:END` (potřebuje jen Node.js, nic dalšího se neinstaluje). Upozorní, pokud některá skupina nemá počet témat dělitelný třemi (na desktopu by poslední řada nevyšla celá) nebo pokud téma nemá pět bodů.

**Fotky z tréninků**: stačí nahrát soubory do `assets/img/` s těmito názvy, kód je připravený:

| Soubor | Kde se zobrazí |
|---|---|
| `trenink-1-prezentace.jpg` | pod úvodem stránky Tréninky |
| `trenink-2-poznamky.jpg` | v sekci Formy spolupráce |
| `trenink-3-skupina.jpg` | před kontaktem |

Formát JPG, poměr 3:2, šířka kolem 1600 px, ideálně do 300 kB. Dokud soubor chybí, zobrazuje se šedý zástupný blok „Fotka bude doplněna“. Kdyby fotky byly ve WebP, je potřeba v `treninky.html` změnit příponu v atributu `src`.

**Barvy a písmo** jsou nahoře v `assets/style.css` (proměnné `--bg`, `--accent` atd.).

## Nasazení (GitHub Pages)

Web se nasazuje automaticky z větve `main` při každém pushi.

Jednorázové nastavení v GitHubu (*Settings → Pages*):

1. **Source:** Deploy from a branch, **Branch:** `main`, složka `/ (root)`, uložit.
2. **Custom domain:** `alesdemjan.cz` (soubor `CNAME` už v repozitáři je), uložit.
3. Po ověření domény a vystavení certifikátu (obvykle do hodiny po nastavení DNS) zaškrtnout **Enforce HTTPS**.

Doporučeno: *Settings → Pages → Verify domain* (doménu ověřit pro účet), aby ji nemohl převzít nikdo jiný.

### DNS u registrátora domény

Smazat stávající A/AAAA záznamy pro kořen domény (např. parkovací stránku registrátora) a nastavit:

| Typ | Název (host) | Hodnota |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `coooach-you.github.io.` |

AAAA záznamy (IPv6) jsou volitelné, ale doporučené. Změna DNS se projeví během minut až hodin. Ověření z terminálu:

```
dig alesdemjan.cz +short        # čtyři adresy 185.199.10x.153
dig www.alesdemjan.cz +short    # coooach-you.github.io a pak tytéž adresy
curl -sI https://alesdemjan.cz  # HTTP/2 200
```

Adresa `www.alesdemjan.cz` bude automaticky přesměrovaná na `alesdemjan.cz`.
