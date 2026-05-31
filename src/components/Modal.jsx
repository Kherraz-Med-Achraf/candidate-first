import { useState, useEffect } from 'react'
import { buildEmail } from '../utils/emailTemplate'
import { IconClose, IconCopy } from '../icons'

export default function Modal({ offer, senderName, onClose }) {
  const { subject, body } = buildEmail(offer, senderName)
  const [subjectVal, setSubjectVal] = useState(subject)
  const [bodyVal, setBodyVal] = useState(body)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const { subject: s, body: b } = buildEmail(offer, senderName)
    setSubjectVal(s)
    setBodyVal(b)
    setCopied(false)
  }, [offer, senderName])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleCopy() {
    const text = `Objet : ${subjectVal}\n\n${bodyVal}`
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch {}
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="modal-overlay open" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="modal-head">
          <div>
            <div className="label">Message de prospection</div>
            <h3 id="modalTitle">
              {offer.titre || 'Poste'}
              <small>{offer.entreprise || 'Entreprise'}</small>
            </h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">
            <IconClose />
          </button>
        </div>
        <div className="modal-body">
          <div className="email-field">
            <span className="ef-label">Objet</span>
            <input
              type="text"
              className="email-subject"
              value={subjectVal}
              onChange={e => setSubjectVal(e.target.value)}
            />
          </div>
          <div className="email-field">
            <span className="ef-label">Message</span>
            <textarea
              className="email-body"
              value={bodyVal}
              onChange={e => setBodyVal(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-foot">
          <span className="hint">Modifiez librement le texte avant de l'envoyer.</span>
          <button className="btn btn-ghost" onClick={onClose}>Fermer</button>
          <button className={`btn btn-copy${copied ? ' copied' : ''}`} onClick={handleCopy}>
            <IconCopy />
            {copied ? 'Copié !' : 'Copier le message'}
          </button>
        </div>
      </div>
    </div>
  )
}
