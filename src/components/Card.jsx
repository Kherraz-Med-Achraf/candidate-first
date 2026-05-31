import { initials } from '../utils/helpers'
import { IconPin, IconDoc, IconMail, IconExt } from '../icons'

export default function Card({ offer, onGenerateMessage, onViewOffer }) {
  return (
    <article className="card">
      <div className="card-top">
        <div className="card-company">
          <div className="company-logo">{initials(offer.entreprise)}</div>
          <div className="company-name">{offer.entreprise || 'Entreprise'}</div>
        </div>
        <div className="card-title">{offer.titre || 'Poste'}</div>
        {offer.description && (
          <div className="card-desc">{offer.description}</div>
        )}
        <div className="card-meta">
          {offer.localisation && (
            <span className="chip"><IconPin />{offer.localisation}</span>
          )}
          {offer.typeContrat && (
            <span className="chip contract"><IconDoc />{offer.typeContrat}</span>
          )}
        </div>
      </div>
      <div className="card-actions">
        <button className="btn btn-generate" onClick={onGenerateMessage}>
          <IconMail /> Générer message
        </button>
        <button className="btn btn-link" onClick={onViewOffer} title="Voir l'offre">
          <IconExt />
        </button>
      </div>
    </article>
  )
}
