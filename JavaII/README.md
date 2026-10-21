# Java II — Muzeu i sendeve të zakonshme

## Çfarë realizova
Faqe e një muzeu të sajuar me tre sende të zakonshme:
- `index.html` – lidhje kapërcimi ("Kalo te përmbajtja"), navigim me lidhje të brendshme (`#celesi`, `#filxhani`, `#bileta`), data e ekspozitës me `<time>` dhe tre karta `<article>`
- secila kartë ka `<h2>`, `<figure>` me `<img>` (tekst `alt` përshkrues) dhe `<figcaption>`, si dhe `<details>/<summary>` me "Historia e fshehur"
- `style.css` – kartat në rrjet (`grid`) që përshtaten me gjerësinë e ekranit
- `celesi.svg`, `filxhani.svg`, `bileta.svg` – asetet lokale

## Para kodimit
- **Hyrjet:** tre sende (emri, imazhi, përshkrimi, historia e fshehur) dhe data e ekspozitës.
- **Daljet:** faqe me navigim, tre karta dhe histori që hapen me klik.
- **Rast normal:** klikimi i "Filxhani" në navigim e çon faqen te karta e filxhanit.
- **Rast kufitar 1:** imazhi nuk ngarkohet → shfaqet teksti `alt`.
- **Rast kufitar 2:** ekran i ngushtë (telefon) → kartat renditen njëra nën tjetrën, pa lëvizje horizontale.

## Si hapet
1. Hape folderin `programimi-www` në VS Code.
2. Klik i djathtë mbi `JavaII/index.html` → **Open with Live Server**
   (ose: `python -m http.server 8000` dhe hap `http://localhost:8000/JavaII/`).

## Testet
| Hyrje | Rezultati i pritur | Rezultati i marrë |
|---|---|---|
| Hap `index.html` | Shfaqen h1, navigimi, data dhe 3 karta me imazhe | |
| Kliko "Bileta" në navigim | Faqja kalon te karta `#bileta` | |
| Kliko "Historia e fshehur" | Hapet/mbyllet teksti i fshehur | |
| Shtyp Tab sapo hapet faqja | Shfaqet "Kalo te përmbajtja"; Enter të çon te `main` | |
| Ndrysho emrin e një SVG përkohësisht | Shfaqet teksti `alt` | |
| DevTools → modaliteti telefon (360px) | Kartat njëra nën tjetrën, pa scroll horizontal | |

## Reflektim
<!-- Shkruaj përgjigjen tënde këtu. -->

## Deklarimi i AI/burimeve
Skeleti dhe imazhet SVG janë marrë nga materiali i ushtrimit (Fillimi_JavaII). Kodi u shkrua me ndihmën e Claude (AI).
