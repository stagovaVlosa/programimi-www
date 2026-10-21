# Java I — Pasaporta digjitale

## Çfarë realizova
Pasaportë digjitale për personazhin e sajuar **Arta Orbita**, udhërrëfyese e kampusit imagjinar:
- `index.html` – prezantimi, lista me 3 aftësi dhe lidhja relative te `rreth.html`
- `rreth.html` – historia e shkurtër dhe lidhja e kthimit te `index.html`
- `style.css` – stil i thjeshtë i përbashkët

## Si hapet
1. Klono repository-n: `git clone https://github.com/stagovaVlosa/programimi-www.git`
2. Hape folderin `programimi-www` në VS Code.
3. Klik i djathtë mbi `JavaI/index.html` → **Open with Live Server**
   (ose në terminal: `python -m http.server 8000` dhe hap `http://localhost:8000/JavaI/`).

## Testet
| Hyrje | Rezultati i pritur | Rezultati i marrë |
|---|---|---|
| Hap `index.html` | Shfaqet h1 dhe lista me 3 aftësi | 
| Kliko "Rreth Artës" | Hapet `rreth.html`, pa 404 |
| Kliko "Kthehu te pasaporta" | Kthehet te `index.html`, pa 404 |
| DevTools → Network, rifresko | URL, metoda GET, statusi 200 | 

