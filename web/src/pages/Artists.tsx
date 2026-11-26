import { useState } from 'react'
import { Link } from 'react-router-dom'
import Art from '../components/Art'
import Tabs from '../components/Tabs'
import TopBar from '../components/TopBar'
import { artist, categories, posts } from '../data'
export default function Artists() {
  const [cat, setCat] = useState('Tous')
  const [q, setQ] = useState('')
  const list = posts.filter(p => (cat === 'Tous' || p.cat === cat) && (artist(p.artist).name + p.title).toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <TopBar title="Artistes" right={<Link className="icon" to="/commissions">🛒</Link>} />
      <label className="search"><input placeholder="Rechercher un artiste" value={q} onChange={e => setQ(e.target.value)} /><span>⌕</span></label>
      <Tabs items={categories} value={cat} onChange={setCat} />
      <div className="grid2">
        {list.map(p => (
          <Link key={p.id} to={`/publication/${p.id}`} className="tile">
            <Art hue={p.hue} src={p.src} ratio="3/4" round={14} /><span className="tile-like">♥ {p.likes}</span>
          </Link>
        ))}
      </div>
      {!list.length && <p className="empty">Aucun résultat.</p>}
    </>
  )
}
