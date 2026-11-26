import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Avatar } from '../components/Art'
import TopBar from '../components/TopBar'
import { artist, chats as initial, Chat } from '../data'
export default function Messages() {
  const { id } = useParams()
  const nav = useNavigate()
  const [chats, setChats] = useState<Chat[]>(initial)
  const [q, setQ] = useState('')
  const [text, setText] = useState('')
  const cur = chats.find(c => c.id === id)
  const add = (m: { text?: string; img?: string }) => setChats(cs => cs.map(c => (c.id === id ? { ...c, unread: 0, last: m.text ?? 'Image', msgs: [...c.msgs, { me: true, time: 'Maintenant', ...m }] } : c)))
  const send = () => { if (text.trim()) { add({ text: text.trim() }); setText('') } }
  const list = chats.filter(c => artist(c.artist).name.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className={'msgs' + (cur ? ' open' : '')}>
      <section className="msg-list">
        <TopBar title="Discussions" back />
        <label className="search"><input placeholder="Rechercher une discussion" value={q} onChange={e => setQ(e.target.value)} /><span>⌕</span></label>
        {list.map(c => { const a = artist(c.artist); return (
          <Link key={c.id} to={`/discussions/${c.id}`} className={'conv' + (c.id === id ? ' on' : '')}>
            <Avatar hue={a.hue} src={a.src} />
            <div className="grow"><b>{a.name}</b><small className="muted block ellipsis">{c.last}</small></div>
            <div className="right"><small className="muted">{c.time}</small>{c.unread > 0 && <span className="badge">{c.unread}</span>}</div>
          </Link>) })}
      </section>
      <section className="thread">
        {cur ? (<>
          <header className="topbar"><button className="icon back-m" onClick={() => nav('/discussions')}>‹</button>
            <Link to={`/artiste/${cur.artist}`} className="row"><Avatar hue={artist(cur.artist).hue} /><b>{artist(cur.artist).name}</b></Link></header>
          <div className="bubbles">{cur.msgs.map((m, i) => (
            <div key={i} className={'bubble' + (m.me ? ' me' : '')}>{m.img && <img src={m.img} alt="" />}{m.text}<small>{m.time}</small></div>))}</div>
          <div className="composer">
            <label className="icon">📎<input type="file" accept="image/*" hidden onChange={e => { const f = e.target.files?.[0]; if (f) add({ img: URL.createObjectURL(f) }) }} /></label>
            <input value={text} placeholder="Écrire un message" onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
            <button className="btn" onClick={send}>Envoyer</button>
          </div></>) : <div className="empty big"><h2>Vos discussions</h2><p>Sélectionnez une conversation pour commencer.</p></div>}
      </section>
    </div>
  )
}
