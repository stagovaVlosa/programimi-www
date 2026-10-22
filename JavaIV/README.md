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

## Reflektim individual
**Kur do të zgjidhje Flexbox dhe kur Grid?**

Flexbox e zgjedh kur elementet rreshtohen në një drejtim të vetëm, si menuja ime (Programi, Detajet, Info): lidhjet vihen në një rresht dhe me `flex-wrap` kalojnë në rresht të ri kur s'ka vend. Grid e zgjedh kur kam nevojë për rreshta dhe kolona njëkohësisht, si kartat e festivalit: me `grid-template-columns` dhe media queries caktoj saktë 1, 2 ose 3 kolona sipas gjerësisë së ekranit.

Më konkretisht, në këtë projekt:

- **Menuja (`.menuja`) → Flexbox.** Kam vetëm tri lidhje me gjatësi të ndryshme dhe dua që secila të zërë aq vend sa i duhet teksti i saj. Nuk më intereson që lidhjet të jenë në kolona të barabarta; me `display: flex`, `flex-wrap: wrap` dhe `gap: 0.5rem 1rem` ato rrinë njëra pas tjetrës dhe, në 360px, kalojnë vetë në rresht të ri pa asnjë media query. Renditja në HTML mbetet e njëjtë me renditjen në ekran, ndaj edhe Tab-i me tastierë ecën nga e majta në të djathtë.
- **Kartat (`.kartat`) → Grid.** Kërkesa ishte numër i saktë kolonash: 1 nën 600px, 2 nga 600 deri në 899px, 3 nga 900px. Me Grid e shkruaj këtë drejtpërdrejt: `grid-template-columns: 1fr`, pastaj `repeat(2, 1fr)` dhe `repeat(3, 1fr)` brenda `@media (min-width: …)`. Kartat në të njëjtin rresht marrin të njëjtën lartësi, edhe kur karta e gjashtë (titulli 103-karakterësh) zgjatet në 3–4 rreshta.
- **Pse jo anasjelltas?** Nëse kartat do t'i bëja me Flexbox, do të më duhej të llogarisja gjerësinë e secilës (p.sh. `flex: 0 0 calc(33.333% - gap)`), dhe karta e fundit në një rresht jo të plotë do të shtrihej ose do të mbetej e çrregullt. Nëse menunë do ta bëja me Grid, do të më duhej të caktoja numrin e kolonave, dhe lidhjet e shkurtra si "Info" do të merrnin hapësirë të njëjtë me ato më të gjata pa nevojë.

**Rregulli që nxora:** Flexbox kur përmbajtja vendos madhësinë dhe elementet rrjedhin në një vijë (menu, butona, etiketa si `.kategoria`). Grid kur unë vendos strukturën me rreshta dhe kolona dhe përmbajtja duhet të futet aty (galeri kartash, faqosje e faqes). Shpesh përdoren bashkë: Grid për kartat dhe Flexbox brenda një karte nëse duhen rreshtuar elementet e saj.

## Deklarimi i AI/burimeve
Skeleti (`index.html`, `style.css`) është marrë nga materiali i ushtrimit. Kodi u shkrua me ndihmën e Claude (AI).
