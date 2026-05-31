export function buildEmail(offer, senderName) {
  const titre      = offer.titre      || 'le poste à pourvoir'
  const entreprise = offer.entreprise || 'votre entreprise'

  const subject = `Candidature pour ${titre} — Candidate First`

  const body = `Bonjour,

Je me permets de vous contacter au sujet de votre offre « ${titre} » au sein de ${entreprise}.

Chez Candidate First, nous accompagnons les entreprises dans l'identification et l'approche de candidats qualifiés. Notre méthode combine un sourcing ciblé sur LinkedIn et une qualification rigoureuse afin de vous présenter uniquement des profils réellement alignés avec vos besoins.

Pour le poste de ${titre}, nous serions ravis de vous proposer une première sélection de candidats sous quelques jours, sans engagement de votre part.

Seriez-vous disponible cette semaine pour un court échange de 15 minutes ? Je m'adapte volontiers à votre agenda.

Dans l'attente de votre retour, je reste à votre entière disposition.

Bien cordialement,
${senderName}
Candidate First — Prospection & recrutement`

  return { subject, body }
}
