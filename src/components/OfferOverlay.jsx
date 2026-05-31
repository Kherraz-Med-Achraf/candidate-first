import { useEffect } from 'react'
import { initials } from '../utils/helpers'
import { IconPin, IconDoc, IconBack, IconExt, IconMail, IconZap } from '../icons'

const SidebarIcon = ({ children }) => (
  <div className="sidebar-row-icon">{children}</div>
)

export default function OfferOverlay({ offer, onClose, onGenerateMessage }) {
  const url = offer.lienOffre && offer.lienOffre !== '#' ? offer.lienOffre : null

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const sidebarRows = [
    offer.localisation ? { icon: <IconPin />, label: 'Localisation', val: offer.localisation } : null,
    offer.typeContrat  ? { icon: <IconDoc />, label: 'Contrat',      val: offer.typeContrat  } : null,
  ].filter(Boolean)

  return (
    <div className="offer-overlay open" role="dialog" aria-modal="true">
      <div className="offer-topbar">
        <button className="offer-back btn" onClick={onClose}>
          <IconBack />
          Retour
        </button>
        <div className="offer-topbar-title">
          <span>{offer.titre || '—'}</span>
          <small>{offer.entreprise || '—'}</small>
        </div>
        <div className="offer-topbar-actions">
          <button className="btn btn-msg-sm" onClick={() => onGenerateMessage(offer)}>
            <IconMail />
            Générer message
          </button>
          <a
            className="btn btn-apply"
            href={url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={url ? undefined : { opacity: 0.45, pointerEvents: 'none' }}
          >
            <IconExt />
            Voir l'offre
          </a>
        </div>
      </div>

      <div className="offer-scroll">
        <div className="offer-hero">
          <div className="offer-hero-inner">
            <div className="offer-hero-company">
              <div className="offer-company-mark">{initials(offer.entreprise)}</div>
              <div className="offer-company-info">
                <div className="offer-company-label">{offer.entreprise || '—'}</div>
                <div className="offer-new-badge">
                  <svg width="7" height="7" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>
                  LinkedIn
                </div>
              </div>
            </div>
            <div className="offer-hero-title">{offer.titre || '—'}</div>
            <div className="offer-hero-chips">
              {offer.localisation && (
                <span className="hchip"><IconPin />{offer.localisation}</span>
              )}
              {offer.typeContrat && (
                <span className="hchip contract-h"><IconDoc />{offer.typeContrat}</span>
              )}
            </div>
          </div>
        </div>

        <div className="offer-body">
          <div className="offer-content">
            {offer.description && (
              <div className="offer-section">
                <div className="offer-section-title">
                  <div className="offer-section-icon"><IconDoc /></div>
                  Description du poste
                </div>
                <div className="offer-text">
                  {offer.description.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="offer-sidebar">
            {sidebarRows.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-card-head">Détails du poste</div>
                <div className="sidebar-rows">
                  {sidebarRows.map((row, i) => (
                    <div key={i} className="sidebar-row">
                      <SidebarIcon>{row.icon}</SidebarIcon>
                      <div className="sidebar-row-info">
                        <div className="sidebar-row-label">{row.label}</div>
                        <div className="sidebar-row-val">{row.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="sidebar-card">
              <div className="sidebar-cta">
                <a
                  className="btn btn-apply-full"
                  href={url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={url ? undefined : { opacity: 0.45, pointerEvents: 'none' }}
                >
                  <IconExt />
                  Voir sur LinkedIn
                </a>
                <button className="btn btn-msg-full" onClick={() => onGenerateMessage(offer)}>
                  <IconMail />
                  Générer message de prospection
                </button>
              </div>
            </div>

            <div className="cf-banner">
              <div className="cf-banner-label">Candidate First</div>
              <div className="cf-banner-text">Présentez ce poste à vos candidats grâce à un message de prospection personnalisé et prêt à envoyer.</div>
              <div className="cf-banner-tag">
                <IconZap />
                IA de prospection activée
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
