# Java III — Klinika e CSS: shpëto afishen

## Çfarë realizova
Afishe e qartë për klubin e debatit:
- `index.html` – titulli, data dhe ora (`<time>`), vendi, përshkrimi dhe lidhja "Kërko informacion"
- `style.css` – CSS i jashtëm me variabla (`:root`) për ngjyrat dhe hapësirat, si dhe klasa të ripërdorshme (`.etiketa`, `.butoni`, `.poster`)
- tri etiketa: **Falas** (kufi i plotë), **Vende të kufizuara: 20** (kufi i ndërprerë) dhe **Edhe online** (kufi i dyfishtë). Dallohen nga teksti dhe stili i kufirit, jo vetëm nga ngjyra.
- `gabime.css` – skedari i riparuar, me diagnozën në koment

## Diagnoza e gabime.css
1. **Konflikti:** `#poster` (ID) ka specifikë më të lartë se `.poster` (klasë), prandaj fitonte `color: white` dhe teksti ishte i bardhë mbi sfond të bardhë. Riparimi: hoqa rregullin me ID dhe stilin e lashë te klasa `.poster`.
2. **Tejkalimi i gjerësisë:** `width: 700px` + `padding: 80px` në secilën anë jep 860px, që del nga ekrani 360px. Riparimi: `width: 100%` me `max-width`, padding më i vogël në ekran të ngushtë.

Nuk përdora `!important`.

## width, padding, border dhe box-sizing
- Me `box-sizing: content-box` (parazgjedhja): gjerësia totale = `width` + `padding` + `border`. P.sh. 700 + 2·80 + 2·1 = 862px.
- Me `box-sizing: border-box`: `width` e përfshin edhe padding-un dhe border-in, pra kutia mbetet 700px dhe përmbajtja ngushtohet. Prandaj e vendosa `* { box-sizing: border-box; }`.

## Focus
Lidhjet kanë `:focus-visible` me kornizë portokalli 3px, që shihet kur lëviz me tastin Tab. Butoni ndryshon ngjyrë me `:hover`.

## Si hapet
1. Hape folderin `programimi-www` në VS Code.
2. Klik i djathtë mbi `JavaIII/index.html` → **Open with Live Server**
   (ose: `python -m http.server 8000` dhe hap `http://localhost:8000/JavaIII/`).

## Testet
| Hyrje | Rezultati i pritur | Rezultati i marrë |
|---|---|---|
| Hap `index.html` | Afishja shfaqet me stil; CSS ngarkohet nga skedar i veçantë | |
| DevTools → Network | `style.css` dhe `gabime.css` me status 200 | |
| DevTools → telefon 360px | Paneli nuk del nga ekrani, pa scroll horizontal | |
| Shtyp Tab | Shfaqet "Kalo te përmbajtja", pastaj korniza e fokusit te butoni | |
| Shiko faqen pa ngjyra (grayscale) | Etiketat dallohen nga teksti dhe kufiri | |

## Deklarimi i AI/burimeve
Skeleti (`index.html`, `style.css`, `gabime.css`) është marrë nga materiali i ushtrimit. Kodi u shkrua me ndihmën e Claude (AI).
