import { useState } from 'react'
import { IconBriefcase, IconPin, IconSearch } from '../icons'

export default function SearchForm({ onSearch, loading }) {
  const [titre, setTitre] = useState('')
  const [localisation, setLocalisation] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!titre.trim() || !localisation.trim()) return
    onSearch({ titre: titre.trim(), localisation: localisation.trim() })
  }

  return (
    <div className="search-card">
      <form className="search-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="field">
          <label htmlFor="titre">Titre du poste</label>
          <div className="input-wrap">
            <IconBriefcase />
            <input
              type="text"
              id="titre"
              placeholder="ex. Développeur Full-Stack"
              required
              value={titre}
              onChange={e => setTitre(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="localisation">Localisation</label>
          <div className="input-wrap">
            <IconPin />
            <input
              type="text"
              id="localisation"
              placeholder="ex. Paris, France"
              required
              value={localisation}
              onChange={e => setLocalisation(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          <IconSearch />
          Rechercher
        </button>
      </form>
    </div>
  )
}
