# Java V — Formulari i misionit sekret

## Çfarë realizova
Faqe regjistrimi për një mision të sajuar në kampus:
- `index.html`:
  - tabela e orareve me tri rreshta (Mëngjesi, Mesdita, Mbrëmja), me `<caption>`, `<th scope="col">` për titujt e kolonave dhe `<th scope="row">` për emrin e orarit
  - formulari me `action="pranuar.html"` dhe `method="get"`:
    - **Pseudonimi**: `type="text"`, `required`, `minlength="3"`, `maxlength="20"` dhe `pattern=".{3,20}"` (`minlength` kontrollohet vetëm për tekst të shkruar nga përdoruesi; `pattern` e kontrollon gjatësinë edhe kur vlera vendoset ndryshe, p.sh. me autofill ose skript)
    - **Email**: `type="email"`, `required`
    - **Madhësia e grupit**: `type="number"`, `required`, `min="1"`, `max="5"`
    - **Kategoria**: tri radio (Eksplorues, Detektiv, Kartograf) brenda `<fieldset>` me `<legend>`, `required`
    - **Pranimi i rregullave**: checkbox `required`
  - çdo kontroll ka `<label>`; tekstet ndihmëse lidhen me `aria-describedby`
- `pranuar.html`: faqja e demonstrimit. Shfaq query string-un nga URL dhe vlerat e marra (me `textContent`, jo si HTML), dhe shpjegon që asgjë nuk ruhet në server.
- `style.css`: gabimet shfaqen me `:user-invalid` vetëm pasi përdoruesi e ka prekur fushën. Përveç ngjyrës, kufiri trashet dhe para tekstit ndihmës del "⚠ Kontrollo:". Fokusi duket me `:focus-visible`. Në ekran të ngushtë tabela lëviz brenda kutisë së saj, ndërsa faqja jo.

## Para kodimit
- **Hyrjet:** pseudonimi, email-i, madhësia e grupit, kategoria dhe pranimi i rregullave.
- **Daljet:** me të dhëna valide shfletuesi hap `pranuar.html?pseudonimi=…&email=…&grupi=…&kategoria=…&rregullat=po`; me të dhëna jo valide qëndron në formular dhe shfaq mesazhin vendas.
- **Rast normal:** `Dhelpra`, `agjenti@shembull.com`, grupi 3, Detektiv, rregullat të pranuara → kalon te `pranuar.html`.
- **Rast kufitar 1:** grupi 0 ose 6 (jashtë kufirit 1–5) → nuk kalon; grupi 1 dhe 5 kalojnë.
- **Rast kufitar 2:** pseudonimi me 2 karaktere → nuk kalon (`minlength`); me 21 karaktere nuk mund të shkruhet (`maxlength` e ndal shkrimin te karakteri i 20-të).

## Si hapet
1. Hape folderin `programimi-www` në VS Code.
2. Klik i djathtë mbi `JavaV/index.html` → **Open with Live Server**
   (ose: `python -m http.server 8000` dhe hap `http://localhost:8000/JavaV/`).

## GET dhe të dhënat
- Me `method="get"` vlerat e formularit shtohen në URL pas `?`, p.sh. `pranuar.html?pseudonimi=Dhelpra&email=agjenti%40shembull.com&grupi=3&kategoria=Detektiv&rregullat=po`. Ato shihen në shiritin e adresës, ruhen në historikun e shfletuesit dhe mund të ruhen në log-et e serverit. Prandaj përdora vetëm të dhëna të sajuara.
- `pranuar.html` është faqe statike: **nuk ruan asnjë regjistrim në server**. Ajo vetëm lexon parametrat nga URL dhe i shfaq.

## Testet
Testuar në Chrome. Validimi u kontrollua me `form.checkValidity()` për secilin rast; gjerësitë u kontrolluan duke krahasuar `scrollWidth` me `innerWidth`.

| Hyrje | Rezultati i pritur | Rezultati i marrë |
|---|---|---|
| Formulari bosh → Dërgo | Nuk kalon | Nuk kalon; të pavlefshme: pseudonimi, email, grupi, kategoria, rregullat |
| Të dhëna valide (Dhelpra, agjenti@shembull.com, 3, Detektiv, ✓) | Kalon te `pranuar.html` | Kalon; `pranuar.html` shfaq të pesë vlerat dhe query string-un |
| Email `agjenti.shembull.com` | Nuk kalon | Nuk kalon (email) |
| Grupi 0 | Nuk kalon | Nuk kalon (grupi) |
| Grupi 6 | Nuk kalon | Nuk kalon (grupi) |
| Grupi 1 dhe 5 | Kalon | Kalon |
| Pa zgjedhur kategori | Nuk kalon | Nuk kalon (kategoria) |
| Pa pranuar rregullat | Nuk kalon | Nuk kalon (rregullat) |
| Pseudonimi 2 / 3 / 20 / 21 karaktere | 2 dhe 21 nuk kalojnë; 3 dhe 20 kalojnë | 2 → nuk kalon, 3 → kalon, 20 → kalon, 21 → nuk kalon |
| Tabela | Ka caption dhe tituj kolonash | `caption`, 4 `th scope="col"`, 3 `th scope="row"` |
| URL me `pseudonimi=<b>x</b>` | Shfaqet si tekst | Shfaqet `<b>x</b>` si tekst, jo si HTML |
| URL e shkruar me dorë `pranuar.html?grupi=999` | (Tregon kufirin e validimit në frontend) | Faqja e shfaq 999: GET-i e anashkalon formularin |
| Gjerësia 360 / 768 / 1280px | Pa scroll horizontal të faqes | Pa scroll në asnjërën; në 360px tabela lëviz vetëm brenda kutisë së saj |
| Tab nëpër formular | Fokusi duket | Korniza portokalli 3px te fusha/butoni i fokusuar |

## Reflektim individual
**Pse `required` në frontend nuk provon që të dhënat në një sistem real janë të sigurta?**

Sepse validimi në frontend ekzekutohet në kompjuterin e përdoruesit, dhe atë kompjuter e kontrollon përdoruesi, jo serveri. Në këtë projekt, `required`, `type="email"`, `min="1" max="5"` dhe `minlength="3"` vetëm e ndalojnë **shfletuesin** që të dërgojë formularin. Mirëpo:

- Kushdo mund ta anashkalojë: në DevTools mund ta fshijë atributin `required` ose `max="5"`, ose t'i shtojë formularit `novalidate`.
- Me GET nuk duhet as formulari: mjafton të shkruash vetë URL-në `pranuar.html?grupi=999&email=jo-email`, dhe faqja i merr këto vlera pa asnjë kontroll. Njësoj mund të dërgohet kërkesë me `curl` ose me një skript.
- Edhe kur të dhëna kalojnë validimin, kjo s'do të thotë se janë të sigurta. `type="email"` kontrollon vetëm formën (`a@b.com`), jo nëse email-i ekziston apo i përket personit. Një pseudonim valid me 3–20 karaktere mund të përmbajë `<script>`. Prandaj te `pranuar.html` vlerat i shfaq me `textContent`, jo me `innerHTML`.

Pra validimi në frontend është për **përdorshmëri**: i jep përdoruesit përgjigje të shpejtë për gabimet. Siguria kërkon validim në **server**: të njëjtat rregulla (gjatësia, formati, kufiri 1–5) kontrollohen sërish atje, të dhënat pastrohen para se të ruhen ose të shfaqen, dhe të dhënat personale dërgohen me POST përmes HTTPS, jo me GET në URL.

## Deklarimi i AI/burimeve
Skeleti (`index.html`, `style.css`) është marrë nga materiali i ushtrimit (Fillimi_JavaV). Kodi u shkrua me ndihmën e Claude (AI).
