// Testet për llogarit(). Hapen te teste.html (rezultatet dalin edhe në Console).
import { llogarit } from "./logjika.js";

// Çdo test: emri, grupi, hyrjet dhe rezultati i pritur.
// Për hyrje të pavlefshme kontrollohet vetëm ok:false dhe që ka mesazh gabimi.
export const testet = [
  // Normal
  { grupi: "Normal", emri: "3 persona × 4 €, buxheti 20 €", hyrje: [4, 3, 20], pritet: { ok: true, total: 12, mbetja: 8, brenda: true } },
  { grupi: "Normal", emri: "1 person × 7.25 €, buxheti 20 €", hyrje: [7.25, 1, 20], pritet: { ok: true, total: 7.25, mbetja: 12.75, brenda: true } },

  // Kufi
  { grupi: "Kufi", emri: "Pranimi: 4 € × 5 = buxheti 20 €", hyrje: [4, 5, 20], pritet: { ok: true, total: 20, mbetja: 0, brenda: true } },
  { grupi: "Kufi", emri: "Pranimi: 0.1 € × 3 = 0.3 € (pa gabim float)", hyrje: [0.1, 3, 0.3], pritet: { ok: true, total: 0.3, mbetja: 0, brenda: true } },
  { grupi: "Kufi", emri: "0.7 € × 3 = 2.1 €", hyrje: [0.7, 3, 2.1], pritet: { ok: true, total: 2.1, mbetja: 0, brenda: true } },
  { grupi: "Kufi", emri: "Çmimi 0 dhe buxheti 0", hyrje: [0, 2, 0], pritet: { ok: true, total: 0, mbetja: 0, brenda: true } },
  { grupi: "Kufi", emri: "Persona = 1 (kufiri i poshtëm)", hyrje: [5, 1, 5], pritet: { ok: true, total: 5, mbetja: 0, brenda: true } },
  { grupi: "Kufi", emri: "Persona = 5 (kufiri i sipërm)", hyrje: [1, 5, 5], pritet: { ok: true, total: 5, mbetja: 0, brenda: true } },
  { grupi: "Kufi", emri: "Një cent mbi buxhet: 4.01 € × 5", hyrje: [4.01, 5, 20], pritet: { ok: true, total: 20.05, mbetja: -0.05, brenda: false } },

  // Tejkalim
  { grupi: "Tejkalim", emri: "Pranimi: 4.5 € × 5, buxheti 20 €", hyrje: [4.5, 5, 20], pritet: { ok: true, total: 22.5, mbetja: -2.5, brenda: false } },
  { grupi: "Tejkalim", emri: "Buxheti 0, çmimi 1 €", hyrje: [1, 1, 0], pritet: { ok: true, total: 1, mbetja: -1, brenda: false } },

  // Hyrje negative
  { grupi: "Negative", emri: "Çmimi -1", hyrje: [-1, 2, 20], pritet: { ok: false } },
  { grupi: "Negative", emri: "Buxheti -5", hyrje: [4, 2, -5], pritet: { ok: false } },
  { grupi: "Negative", emri: "Persona -2", hyrje: [4, -2, 20], pritet: { ok: false } },

  // NaN dhe vlera jo të fundme
  { grupi: "NaN", emri: "Çmimi NaN", hyrje: [NaN, 2, 20], pritet: { ok: false } },
  { grupi: "NaN", emri: "Pranimi: persona NaN", hyrje: [4, NaN, 20], pritet: { ok: false } },
  { grupi: "NaN", emri: "Buxheti NaN", hyrje: [4, 2, NaN], pritet: { ok: false } },
  { grupi: "NaN", emri: "Buxheti Infinity", hyrje: [4, 2, Infinity], pritet: { ok: false } },

  // Persona jashtë kufirit ose jo i plotë
  { grupi: "Persona", emri: "Pranimi: persona 0", hyrje: [4, 0, 20], pritet: { ok: false } },
  { grupi: "Persona", emri: "Persona 6", hyrje: [4, 6, 20], pritet: { ok: false } },
  { grupi: "Persona", emri: "Persona 2.5", hyrje: [4, 2.5, 20], pritet: { ok: false } },

  // Tipa të gabuar
  { grupi: "Tipi", emri: 'Çmimi si tekst "4"', hyrje: ["4", 2, 20], pritet: { ok: false } },
  { grupi: "Tipi", emri: "Persona null", hyrje: [4, null, 20], pritet: { ok: false } },
  { grupi: "Tipi", emri: "Buxheti mungon (undefined)", hyrje: [4, 2], pritet: { ok: false } },
  { grupi: "Tipi", emri: "Çmimi shumë i madh (1e300)", hyrje: [1e300, 1, 20], pritet: { ok: false } },
];

function perputhet(marre, pritet) {
  if (pritet.ok === false) {
    return marre.ok === false && typeof marre.error === "string" && marre.error.length > 0;
  }
  return (
    marre.ok === true &&
    Object.is(marre.total, pritet.total) &&
    Object.is(marre.mbetja, pritet.mbetja) &&
    marre.brenda === pritet.brenda
  );
}

export function ekzekutoTestet() {
  return testet.map((t) => {
    const marre = llogarit(...t.hyrje);
    return { ...t, marre, kalon: perputhet(marre, t.pritet) };
  });
}
