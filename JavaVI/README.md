# Java VI — Planifiko një pasdite me 20 euro

## Çfarë realizova
Kalkulator që tregon nëse aktivitetet e një grupi futen në buxhet:
- `logjika.js`: funksioni `llogarit(cmimi, persona, buxheti)`, pa asnjë varësi nga DOM-i.
  - Pranon vetëm vlera të tipit `number` që janë të fundme (`Number.isFinite`). Prandaj `"4"`, `null`, `undefined`, `NaN` dhe `Infinity` refuzohen.
  - `cmimi` dhe `buxheti` duhet të jenë `>= 0`. `persona` duhet të jetë numër i plotë nga 1 deri në 5 (`Number.isInteger`).
  - Me hyrje të pavlefshme kthen `{ ok: false, error: "..." }` me mesazh për fushën e gabuar.
  - Me hyrje valide kthen `{ ok: true, total, mbetja, brenda }`. `brenda` është `true` edhe kur `total === buxheti`.
  - Eurot shndërrohen në centë me `Math.round(euro * 100)` para shumëzimit dhe krahasimit. Kështu `0.1 × 3` jep saktë `0.3`, jo `0.30000000000000004`. `toFixed` nuk përdoret.
  - Kontrolli shtesë: nëse centët dalin jashtë `Number.isSafeInteger` (p.sh. çmimi `1e300`), kthehet gabim në vend të një rezultati të pasaktë.
- `teste.js` + `teste.html`: 25 teste, të ndara në grupe (normal, kufi, tejkalim, negative, NaN, persona, tipi). Rezultatet shfaqen në tabelë dhe në Console.
- `index.html` + `ui.js` (opsionale): formular i vogël që thërret `llogarit()` dhe shfaq rezultatin me `aria-live`. Vlerat lexohen me `valueAsNumber`, që jep `NaN` për fushë bosh. Pra edhe fusha bosh kalon te validimi i `llogarit()`.
- `style.css`: fokusi i dukshëm me `:focus-visible`; tabela e testeve lëviz brenda kutisë së saj në ekran të ngushtë.

## Para kodimit
- **Hyrjet:** `cmimi` (€ për person), `persona` (1–5), `buxheti` (€).
- **Daljet:** `{ ok: true, total, mbetja, brenda }` ose `{ ok: false, error }`.
- **Rast normal:** `llogarit(4, 3, 20)` → total 12, mbetja 8, brenda `true`.
- **Rast kufitar:** `llogarit(4, 5, 20)` → total 20, mbetja 0, brenda `true` (barazia llogaritet brenda).
- **Rast i vështirë:** `llogarit(0.1, 3, 0.3)` → me numra dhjetorë do të jepte `0.30000000000000004 > 0.3`; me centë `30 <= 30`.

## Si hapet
1. Hape folderin `programimi-www` në VS Code.
2. Klik i djathtë mbi `JavaVI/index.html` → **Open with Live Server**
   (ose: `python -m http.server 8000` dhe hap `http://localhost:8000/JavaVI/`).
3. Testet: `http://localhost:8000/JavaVI/teste.html`.

Skedarët JS janë module (`type="module"`), prandaj nuk punojnë kur faqja hapet direkt me `file://`; duhet server lokal.

## Testet
Testuar në Chrome. Të 25 testet te `teste.html` kalojnë (**25 nga 25**).

| Hyrje | Rezultati i pritur | Rezultati i marrë |
|---|---|---|
| `llogarit(4, 5, 20)` | total 20, mbetja 0, brenda true | total 20, mbetja 0, brenda true |
| `llogarit(4.5, 5, 20)` | total 22.5, mbetja -2.5, brenda false | total 22.5, mbetja -2.5, brenda false |
| `llogarit(0.1, 3, 0.3)` | total 0.3, mbetja 0, brenda true | total 0.3, mbetja 0, brenda true |
| `llogarit(0.7, 3, 2.1)` | total 2.1, mbetja 0 | total 2.1, mbetja 0 |
| `llogarit(4.01, 5, 20)` (një cent mbi) | total 20.05, mbetja -0.05, brenda false | total 20.05, mbetja -0.05, brenda false |
| `llogarit(0, 2, 0)` | total 0, mbetja 0, brenda true | total 0, mbetja 0, brenda true |
| `llogarit(5, 1, 5)` / `llogarit(1, 5, 5)` (persona 1 dhe 5) | ok true | ok true |
| `llogarit(4, 0, 20)` / `llogarit(4, 6, 20)` | ok false | ok false (persona) |
| `llogarit(4, 2.5, 20)` | ok false | ok false (persona) |
| `llogarit(-1, 2, 20)` / `llogarit(4, 2, -5)` / `llogarit(4, -2, 20)` | ok false | ok false |
| `llogarit(NaN, 2, 20)` / `llogarit(4, NaN, 20)` / `llogarit(4, 2, NaN)` | ok false | ok false |
| `llogarit(4, 2, Infinity)` | ok false | ok false (buxheti) |
| `llogarit("4", 2, 20)` | ok false | ok false (çmimi) |
| `llogarit(4, null, 20)` / `llogarit(4, 2)` | ok false | ok false |
| `llogarit(1e300, 1, 20)` | ok false | ok false (vlera shumë të mëdha) |
| UI: 4 / 5 / 20 → Llogarit | "Futeni në buxhet", totali €20.00, mbeten €0.00 | Njësoj |
| UI: 4.5 / 5 / 20 | "Nuk futeni", mungojnë €2.50 | Njësoj |
| UI: çmimi bosh | Mesazh gabimi për çmimin | "⚠ Çmimi duhet të jetë numër i fundëm, 0 ose më i madh." |
| Gjerësia 360px | Pa scroll horizontal | `scrollWidth` = `innerWidth` = 360 |

## Reflektim individual
**Çfarë dallimi ka mes `0`, `"0"`, `null` dhe `NaN`?**

| Vlera | `typeof` | `Number(vlera)` | Si kusht (`if`) | `llogarit` e pranon? |
|---|---|---|---|---|
| `0` | `"number"` | `0` | false | Po, si çmim ose buxhet |
| `"0"` | `"string"` | `0` | **true** | Jo, është tekst |
| `null` | `"object"` | `0` | false | Jo |
| `NaN` | `"number"` | `NaN` | false | Jo, nuk është i fundëm |

- **`0`** është numër i vërtetë dhe valid: çmim 0 € (aktivitet falas) ose buxhet 0 € janë raste reale. Prandaj nuk mund të kontrolloja me `if (!cmimi)`, sepse ai do ta refuzonte edhe `0`-n.
- **`"0"`** duket si zero, por është tekst. Si kusht është `true` (çdo tekst jo bosh është truthy), dhe me `+` bashkohet si tekst: `"0" + 5` jep `"05"`. Fushat e formularit kthejnë gjithmonë tekst (`input.value`), prandaj në UI përdora `valueAsNumber`.
- **`null`** do të thotë "mungon vlera me qëllim". Rreziku është se `Number(null)` jep `0`, kështu që një kontroll si `Number(persona) >= 0` do ta kalonte. `typeof null` është `"object"` (gabim i vjetër i gjuhës), prandaj kontrolli `typeof vlera === "number"` e refuzon.
- **`NaN`** ("not a number") ka tipin `"number"`, por është rezultat i një llogaritjeje të dështuar, p.sh. `Number("abc")` ose fushë bosh me `valueAsNumber`. `NaN` nuk është i barabartë as me veten (`NaN === NaN` është `false`) dhe çdo krahasim me të jep `false`: `NaN < 0` dhe `NaN >= 0` janë të dyja `false`. Kjo do të thotë se një kontroll i vetëm `if (cmimi < 0)` do ta lejonte të kalonte. Prandaj përdora `Number.isFinite`, që e refuzon `NaN`-in (dhe `Infinity`-n).

Pra `0` dhe `NaN` janë numra, `"0"` është tekst dhe `null` është mungesë vlere. Por me `==`, `Number()` ose si kusht, JavaScript i shndërron në heshtje dhe ato fillojnë të duken njësoj. Kjo është arsyeja pse funksioni kontrollon tipin dhe fundshmërinë para çdo llogaritjeje.

## Deklarimi i AI/burimeve
Skeleti (`index.html`, `logjika.js`, `style.css`) është marrë nga materiali i ushtrimit (Fillimi_JavaVI). Kodi u shkrua me ndihmën e Claude (AI).
