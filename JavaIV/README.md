# Java IV — Festivali që përshtatet në çdo ekran

## Çfarë realizova
Programi i një festivali shkencor të sajuar që përshtatet në telefon, tablet dhe ekran të gjerë:
- `index.html` – menu (Programi, Detajet, Info), banner, gjashtë karta aktivitetesh dhe seksionet e detajeve dhe informatave
- secila kartë ka titull (`h3`), kategori, orar (`<time>`) dhe lidhje "Detaje" që çon te përshkrimi i aktivitetit
- `style.css`:
  - **Flexbox** për menunë (`flex-wrap: wrap`, lidhjet kalojnë në rresht të ri kur s'ka vend)
  - **Grid** për kartat: 1 kolonë nën 600px, 2 kolona nga 600 deri në 899px, 3 kolona nga 900px (me `@media (min-width: …)`)
  - imazh fleksibël: `max-width: 100%; height: auto`
  - pa lartësi fikse për tekstin; `overflow-wrap: anywhere` e thyen tekstin e gjatë brenda kartës
  - fokus i dukshëm me `:focus-visible` për përdorimin me tastierë
- `festivali.svg` – imazhi lokal i banner-it

**Sfida e transferimit:** karta e gjashtë ka titull me 103 karaktere. Ai thyhet në disa rreshta dhe karta zgjatet pa u prishur.

## Si hapet
1. Hape folderin `programimi-www` në VS Code.
2. Klik i djathtë mbi `JavaIV/index.html` → **Open with Live Server**
   (ose: `python -m http.server 8000` dhe hap `http://localhost:8000/JavaIV/`).

## Testet
Testuar në Chrome me pamje responsive.

| Hyrje | Rezultati i pritur | Rezultati i marrë |
|---|---|---|
| Gjerësia 360px | 1 kolonë, pa scroll horizontal | 1 kolonë; gjerësia e faqes nuk e kalon ekranin |
| Gjerësia 768px | 2 kolona, pa scroll horizontal | 2 kolona; pa scroll horizontal |
| Gjerësia 1280px | 3 kolona, pa scroll horizontal | 3 kolona; pa scroll horizontal |
| Titulli 103-karakterësh | Thyhet brenda kartës | Thyhet në 3–4 rreshta, asgjë nuk del jashtë kartës |
| Banner-i në 360px | Ngushtohet sa ekrani | Ngushtohet dhe ruan përpjesëtimin |
| Lidhjet e menysë dhe "Detaje" | Çdo lidhje ka objektivin e vet | Të gjitha `#id` ekzistojnë në faqe |
| Tab në menu | Fokusi shihet; Enter hap lidhjen | Lidhja e fokusuar merr kornizë të gjelbër 3px |

## Deklarimi i AI/burimeve
Skeleti (`index.html`, `style.css`) është marrë nga materiali i ushtrimit. Kodi u shkrua me ndihmën e Claude (AI).
