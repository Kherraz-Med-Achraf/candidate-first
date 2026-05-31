import { useState, useEffect } from 'react'
import { IconAI } from '../icons'

const AI_MESSAGES = [
  "Connexion à LinkedIn…",
  "Analyse des offres disponibles…",
  "Filtrage par intitulé de poste…",
  "Vérification des entreprises…",
  "Scoring des opportunités…",
  "Optimisation des résultats…",
  "Préparation de votre sélection…",
]

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="sk-row">
        <div className="sk sk-logo" />
        <div className="sk sk-line" style={{ width: '45%' }} />
      </div>
      <div className="sk sk-line" style={{ width: '80%', height: '18px' }} />
      <div className="sk-row">
        <div className="sk sk-line" style={{ width: '70px', height: '24px', borderRadius: '100px' }} />
        <div className="sk sk-line" style={{ width: '90px', height: '24px', borderRadius: '100px' }} />
      </div>
      <div className="sk-row" style={{ marginTop: '6px' }}>
        <div className="sk sk-line" style={{ flex: 1, height: '40px', borderRadius: '11px' }} />
        <div className="sk sk-line" style={{ width: '48px', height: '40px', borderRadius: '11px' }} />
      </div>
    </div>
  )
}

export default function LoaderArea() {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex(i => (i + 1) % AI_MESSAGES.length)
    }, 1900)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <div className="ai-loader">
        <div className="ai-orb"><IconAI /></div>
        <div className="ai-status">
          <div className="ai-eyebrow">Candidate First IA</div>
          <div className="ai-msg-wrap">
            <div key={msgIndex} className="ai-msg">{AI_MESSAGES[msgIndex]}</div>
          </div>
        </div>
        <div className="ai-bar"><div className="ai-bar-fill" /></div>
        <div className="ai-dots">
          <div className="ai-dot" />
          <div className="ai-dot" />
          <div className="ai-dot" />
        </div>
      </div>
      <div className="grid">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  )
}
