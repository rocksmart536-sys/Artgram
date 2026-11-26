import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Art, { Avatar } from '../components/Art'
import Tabs from '../components/Tabs'
import TopBar from '../components/TopBar'
import { artist, posts } from '../data'
export default function Profile() {
  const { id } = useParams()
  const a = artist(id ?? 'leanime')
  const own = !id || id === 'leanime'
  const [tab, setTab] = useState('Mes dessins')
  const [follow, setFollow] = useState(false)
  const list = posts.filter(p => p.artist === a.id)
  const shown = tab === 'Mes dessins' ? list : tab === 'Favoris' ? posts.slice(0, 3) : []
  return (
    <>
      <TopBar title={own ? 'Profil' : a.name} back={!own} right={own ? <Link className="icon" to="/discussions">✉</Link> : undefined} />
      <div className="profile">
        <Avatar hue={a.hue} src={a.src} />
        {own ? <button className="btn dark">Modifier</button> : <button className={'btn' + (follow ? ' ghost' : '')} onClick={() => setFollow(!follow)}>{follow ? 'Abonné' : 'Suivre'}</button>}
      </div>
      <div className="pad"><b>{a.name}</b><small className="muted block">{a.handle}</small></div>
      <div className="stats"><div><b>24</b><small>Publications</small></div><div><b>128,4k</b><small>Abonnés</small></div><div><b>39</b><small>Abonnements</small></div></div>
      <p className="pad">{a.bio}</p>
      <Tabs items={['Mes dessins', 'Commandes', 'Favoris']} value={tab} onChange={setTab} />
      {tab === 'Commandes' ? <Link to="/commissions" className="btn wide">Voir mes commandes</Link> : (
        <div className="grid3">{shown.map(p => <Link key={p.id} to={`/publication/${p.id}`}><Art hue={p.hue} src={p.src} ratio="115/139" round={10} /></Link>)}</div>
      )}
    </>
  )
}
