import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Art, { Avatar } from '../components/Art'
import Tabs from '../components/Tabs'
import TopBar from '../components/TopBar'
import { artist, notifs, posts } from '../data'
const icons: Record<string, string> = { follow: '＋', like: '♥', comment: '💬', reply: '↩', mention: '@', order: '🛒', message: '✉' }
export default function Notifications() {
  const nav = useNavigate()
  const [list, setList] = useState(notifs)
  const [tab, setTab] = useState('Toutes')
  const shown = list.filter(n => tab === 'Toutes' || (tab === 'Non lues' ? n.unread : n.type === 'mention'))
  const read = (id: string) => setList(l => l.map(n => (n.id === id ? { ...n, unread: false } : n)))
  return (
    <>
      <TopBar title="Notifications" back right={<button className="link" onClick={() => setList(l => l.map(n => ({ ...n, unread: false })))}>Tout lire</button>} />
      <Tabs items={['Toutes', 'Non lues', 'Mentions']} value={tab} onChange={setTab} />
      {shown.map(n => {
        const a = artist(n.artist)
        const p = posts.find(x => x.id === n.post)
        return (
          <div key={n.id} className={'notif' + (n.unread ? ' unread' : '')} onClick={() => { read(n.id); nav(n.to) }}>
            <Avatar hue={a.hue} src={a.src} />
            <div className="grow"><b>{a.name}</b> {n.text}<small className="muted block">{icons[n.type]} {n.time}</small></div>
            {p && <div style={{ width: 48 }}><Art hue={p.hue} src={p.src} ratio="1" round={8} /></div>}
            {n.unread && <button className="dot" aria-label="Marquer comme lue" onClick={e => { e.stopPropagation(); read(n.id) }} />}
          </div>
        )
      })}
      {!shown.length && <div className="empty big"><h2>Rien de nouveau</h2><p>Vos notifications apparaîtront ici.</p></div>}
    </>
  )
}
