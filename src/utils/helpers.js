export function initials(name) {
  return String(name || '?').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

export function normalizeOffer(o) {
  return {
    titre:        o.titre        || o.title       || '',
    entreprise:   o.entreprise   || o.company      || '',
    localisation: o.localisation || o.location     || '',
    typeContrat:  o.typeContrat  || o.type_contrat || o.contractType || '',
    lienOffre:    o.lienOffre    || o.url          || o.link         || '',
    description:  o.description  || '',
  }
}
