// Logjika e kalkulatorit të buxhetit. Nuk varet nga DOM-i.

const PERSONA_MIN = 1;
const PERSONA_MAX = 5;

// true vetëm për vlera të tipit number që nuk janë NaN, Infinity ose -Infinity.
// "5", null, undefined dhe true nuk pranohen, sepse nuk janë numra.
function eshteNumerFundem(vlera) {
  return typeof vlera === "number" && Number.isFinite(vlera);
}

// Eurot shndërrohen në centë (numër i plotë) para çdo llogaritjeje,
// që 0.1 + 0.2 të mos japë 0.30000000000000004.
export function neCente(euro) {
  return Math.round(euro * 100);
}

// Centët kthehen në euro. "+ 0" e kthen -0 në 0.
function neEuro(cente) {
  return cente / 100 + 0;
}

function gabim(mesazhi) {
  return { ok: false, error: mesazhi };
}

export function llogarit(cmimi, persona, buxheti) {
  if (!eshteNumerFundem(cmimi) || cmimi < 0) {
    return gabim("Çmimi duhet të jetë numër i fundëm, 0 ose më i madh.");
  }
  if (
    !Number.isInteger(persona) ||
    persona < PERSONA_MIN ||
    persona > PERSONA_MAX
  ) {
    return gabim(
      `Numri i personave duhet të jetë numër i plotë nga ${PERSONA_MIN} deri në ${PERSONA_MAX}.`
    );
  }
  if (!eshteNumerFundem(buxheti) || buxheti < 0) {
    return gabim("Buxheti duhet të jetë numër i fundëm, 0 ose më i madh.");
  }

  const cmimiCente = neCente(cmimi);
  const buxhetiCente = neCente(buxheti);
  const totalCente = cmimiCente * persona;

  // Me vlera shumë të mëdha centët nuk mbahen më saktë si numra të plotë.
  if (
    !Number.isSafeInteger(totalCente) ||
    !Number.isSafeInteger(buxhetiCente)
  ) {
    return gabim("Vlerat janë shumë të mëdha për t'u llogaritur saktë.");
  }

  const mbetjaCente = buxhetiCente - totalCente;

  return {
    ok: true,
    total: neEuro(totalCente),
    mbetja: neEuro(mbetjaCente),
    brenda: totalCente <= buxhetiCente,
  };
}
