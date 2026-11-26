import { useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'
import Tabs from '../components/Tabs'
import { categories, posts } from '../data'
export default function Home() {
  const [cat, setCat] = useState('Tous')
  const [q, setQ] = useState('')
  const list = posts.filter(p => (cat === 'Tous' || p.cat === cat) && p.title.toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <section
  className="hero"
  style={{
    backgroundImage: "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('/images/banner.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
        <h2>Bienvenue sur Artgram</h2>
        <Link to="/artistes" className="btn">Explorer</Link>
        <div className="hero-links"><Link to="/notifications" className="icon">🔔</Link><Link to="/discussions" className="icon">✉</Link></div>
      </section>
      <label className="search"><input placeholder="Rechercher un artiste" value={q} onChange={e => setQ(e.target.value)} /><span>⌕</span></label>
      <Tabs items={categories} value={cat} onChange={setCat} />
      {list.length ? list.map(p => <PostCard key={p.id} post={p} />) : <p className="empty">Aucune publication trouvée.</p>}
    </>
  )
}
