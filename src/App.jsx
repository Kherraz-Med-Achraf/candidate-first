import { useState, useCallback } from 'react'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import ResultsSection from './components/ResultsSection'
import Modal from './components/Modal'
import OfferOverlay from './components/OfferOverlay'
import { normalizeOffer } from './utils/helpers'

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL
const SENDER_NAME = import.meta.env.VITE_SENDER_NAME || "L'équipe Candidate First"
const LS_KEY = 'candidate_jobs'

export default function App() {
  const [uiState, setUiState] = useState('initial')
  const [offers, setOffers] = useState([])
  const [modalOffer, setModalOffer] = useState(null)
  const [detailOffer, setDetailOffer] = useState(null)

  const handleSearch = useCallback(async ({ titre, localisation }) => {
    setUiState('loading')
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titre, localisation }),
      })
      let data = await res.json()
      if (data && !Array.isArray(data) && Array.isArray(data.offers)) data = data.offers
      if (data && !Array.isArray(data) && Array.isArray(data.results)) data = data.results
      if (data && !Array.isArray(data) && Array.isArray(data.data)) data = data.data
      if (data && !Array.isArray(data) && typeof data === 'object') data = [data]
      if (!res.ok && !Array.isArray(data)) throw new Error('HTTP ' + res.status)
      if (!Array.isArray(data)) throw new Error('Format de réponse inattendu')
      const normalized = data.map(normalizeOffer)
      try { localStorage.setItem(LS_KEY, JSON.stringify(normalized)) } catch {}
      setOffers(normalized)
      setUiState(normalized.length ? 'results' : 'empty')
    } catch (err) {
      console.warn('Webhook indisponible:', err.message)
      setUiState('error')
    }
  }, [])

  const handleDetailMessage = useCallback((offer) => {
    setDetailOffer(null)
    setModalOffer(offer)
  }, [])

  return (
    <>
      <Header />
      <main className="wrap">
        <section className="hero">
          <div className="eyebrow">Prospection RH augmentée</div>
          <h1>Trouvez les offres,<br /><span className="accent">générez l'approche.</span></h1>
          <p className="sub">Recherchez des opportunités LinkedIn par poste et localisation, puis générez en un clic un message de prospection prêt à envoyer.</p>
          <SearchForm onSearch={handleSearch} loading={uiState === 'loading'} />
        </section>
        <ResultsSection
          uiState={uiState}
          offers={offers}
          onGenerateMessage={setModalOffer}
          onViewOffer={setDetailOffer}
        />
      </main>

      {modalOffer && (
        <Modal
          offer={modalOffer}
          senderName={SENDER_NAME}
          onClose={() => setModalOffer(null)}
        />
      )}

      {detailOffer && (
        <OfferOverlay
          offer={detailOffer}
          onClose={() => setDetailOffer(null)}
          onGenerateMessage={handleDetailMessage}
        />
      )}
    </>
  )
}
