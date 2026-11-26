import { useState } from 'react'
import { Link } from 'react-router-dom'
import Art, { Avatar } from '../components/Art'
import Tabs from '../components/Tabs'
import TopBar from '../components/TopBar'
import { artist, artists, orders } from '../data'
export default function Commissions() {
  const [tab, setTab] = useState('Artistes')
  const [asked, setAsked] = useState<string[]>([])
  return (
    <>
      <TopBar title="Commissions" back />
      <Tabs items={['Artistes', 'Mes commandes']} value={tab} onChange={setTab} />
      {tab === 'Artistes' ? artists.slice(1).map(a => (
        <div key={a.id} className="card row between pad">
          <Link to={`/artiste/${a.id}`} className="row"><Avatar hue={a.hue} src={a.src} /><div><b>{a.name}</b><small className="muted block">À partir de 15 €</small></div></Link>
          <button className={'btn' + (asked.includes(a.id) ? ' ghost' : '')} onClick={() => setAsked(s => (s.includes(a.id) ? s : [...s, a.id]))}>{asked.includes(a.id) ? 'Demande envoyée' : 'Commander'}</button>
        </div>
      )) : orders.map(o => (
        <div key={o.id} className="card row pad">
          <div style={{ width: 72 }}><Art hue={o.hue} ratio="1" round={12} /></div>
          <div className="grow"><b>{o.title}</b><small className="muted block">par {artist(o.artist).name} · {o.price}</small></div>
          <span className={'chip ' + (o.status === 'Livrée' ? 'ok' : '')}>{o.status}</span>
        </div>
      ))}
    </>
  )
}
