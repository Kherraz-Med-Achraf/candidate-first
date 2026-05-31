import LoaderArea from './LoaderArea'
import Card from './Card'
import { IconSearch, IconWarn, IconMsg } from '../icons'

export default function ResultsSection({ uiState, offers, onGenerateMessage, onViewOffer }) {
  return (
    <section className="results-section">
      {uiState === 'initial' && (
        <div className="state">
          <div className="state-icon"><IconSearch /></div>
          <h3>Lancez une recherche</h3>
          <p>Saisissez un intitulé de poste et une localisation pour afficher les offres LinkedIn correspondantes.</p>
        </div>
      )}

      {uiState === 'loading' && <LoaderArea />}

      {uiState === 'error' && (
        <div className="state">
          <div className="state-icon"><IconWarn /></div>
          <h3>Connexion au webhook impossible</h3>
          <p>Le service de prospection n'a pas répondu. Vérifiez votre configuration n8n.</p>
        </div>
      )}

      {uiState === 'results' && (
        <div>
          <div className="results-head">
            <h2>Offres correspondantes</h2>
            <div className="results-count">
              <b>{offers.length}</b> offre{offers.length > 1 ? 's' : ''} trouvée{offers.length > 1 ? 's' : ''}
            </div>
          </div>
          <div className="grid">
            {offers.map((offer, i) => (
              <Card
                key={i}
                offer={offer}
                onGenerateMessage={() => onGenerateMessage(offer)}
                onViewOffer={() => onViewOffer(offer)}
              />
            ))}
          </div>
        </div>
      )}

      {uiState === 'empty' && (
        <div className="state">
          <div className="state-icon"><IconMsg /></div>
          <h3>Aucune offre trouvée</h3>
          <p>Essayez d'élargir votre recherche ou de modifier la localisation.</p>
        </div>
      )}
    </section>
  )
}
