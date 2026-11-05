// Ndërfaqja (opsionale): lexon formularin dhe shfaq rezultatin e llogarit().
import { llogarit } from "./logjika.js";

const forma = document.getElementById("forma");
const rezultati = document.getElementById("rezultati");

const euro = new Intl.NumberFormat("sq-AL", {
  style: "currency",
  currency: "EUR",
});

function rresht(etiketa, vlera) {
  const dt = document.createElement("dt");
  dt.textContent = etiketa;
  const dd = document.createElement("dd");
  dd.textContent = vlera;
  return [dt, dd];
}

forma.addEventListener("submit", (ngjarja) => {
  ngjarja.preventDefault();

  // valueAsNumber jep NaN kur fusha është bosh ose jo numër.
  const r = llogarit(
    forma.cmimi.valueAsNumber,
    forma.persona.valueAsNumber,
    forma.buxheti.valueAsNumber
  );

  rezultati.replaceChildren();
  const p = document.createElement("p");

  if (!r.ok) {
    p.className = "mesazh gabim";
    p.textContent = `⚠ ${r.error}`;
    rezultati.append(p);
    return;
  }

  p.className = r.brenda ? "mesazh brenda" : "mesazh jashte";
  p.textContent = r.brenda
    ? "✓ Futeni në buxhet."
    : "✗ Nuk futeni në buxhet.";

  const dl = document.createElement("dl");
  dl.append(
    ...rresht("Totali", euro.format(r.total)),
    ...rresht(r.mbetja < 0 ? "Mungojnë" : "Mbeten", euro.format(Math.abs(r.mbetja)))
  );
  rezultati.append(p, dl);
});
