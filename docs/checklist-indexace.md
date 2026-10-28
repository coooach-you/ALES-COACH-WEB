# Checklist: měření a indexace (provede Aleš)

Bod 3.4 auditu. Nic z toho nejde udělat z repozitáře, vše se nastavuje v účtech služeb.

## Vyhledávače
- [ ] **Google Search Console** – přidat doménu `alesdemjan.cz` (ověření DNS záznamem TXT), odeslat `https://alesdemjan.cz/sitemap.xml`.
- [ ] **Bing Webmaster Tools** – lze importovat nastavení přímo ze Search Console.
- [ ] **Seznam Webmaster** (webmaster.seznam.cz) – důležité pro české vyhledávání; přidat web a odeslat sitemapu.
- [ ] Po nasazení ověřit strukturovaná data v [Rich Results Testu](https://search.google.com/test/rich-results) pro `/`, `/koucink`, `/treninky`.
- [ ] Ověřit náhledy sdílení: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) a Facebook Sharing Debugger.

## Katalogy a profily
- [ ] **Firmy.cz** – založit profil (jméno, IČO, popis, odkaz na web).
- [ ] **Google Business Profile** – jen pokud chcete cílit lokálně na Prahu (vyžaduje adresu nebo oblast působnosti).
- [ ] **LinkedIn** – sjednotit jméno, titulek a popis s webem („Kouč a lektor“, koučink a firemní tréninky na míru), doplnit odkaz na web.

## Analytika
- [ ] **Cloudflare Web Analytics** je na webu nasazené (bez cookies, není potřeba cookie lišta). Data jsou v účtu Cloudflare → Analytics & Logs → Web Analytics.
- [ ] Pozor: Cloudflare Web Analytics **neumí vlastní události** (klik na e-mail, telefon, CTA). Pokud je chcete měřit,
      je potřeba přejít na Plausible (placené, také bez cookies) a doplnit k odkazům označení událostí.

## Po přechodu na e-mail na doméně
- [ ] Spustit `node tools/zmena-emailu.mjs ales@alesdemjan.cz` a přegenerovat QR kód `assets/img/qr-kontakt.png`.
