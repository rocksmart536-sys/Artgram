import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
const tags = ['#manga', '#digital', '#portrait', '#chat', '#colorisation']
export default function NewPost() {
  const nav = useNavigate()
  const [img, setImg] = useState<string | null>(null)
  const [cap, setCap] = useState('')
  const [sel, setSel] = useState<string[]>([])
  const [comments, setComments] = useState(true)
  const [pub, setPub] = useState(true)
  const [done, setDone] = useState(false)
  const toggle = (t: string) => setSel(s => (s.includes(t) ? s.filter(x => x !== t) : [...s, t]))
  if (done) return <div className="empty big"><h2>Publié</h2><p>Votre dessin est en ligne.</p><button className="btn" onClick={() => nav('/')}>Retour à l’accueil</button></div>
  return (
    <>
      <TopBar title="Nouvelle publication" back right={<button className="btn" disabled={!img} onClick={() => setDone(true)}>Publier</button>} />
      <label className="drop">
        {img ? <img src={img} alt="Aperçu" /> : <><span className="plus">🖼</span><b>Ajouter une image</b></>}
        <input type="file" accept="image/*" hidden onChange={e => { const f = e.target.files?.[0]; if (f) setImg(URL.createObjectURL(f)) }} />
      </label>
      <input className="field" placeholder="Ajoutez une légende" value={cap} onChange={e => setCap(e.target.value)} />
      <p className="pad"><b>hashtags populaires</b></p>
      <div className="tabs">{tags.map(t => <button key={t} className={'tab' + (sel.includes(t) ? ' on' : '')} onClick={() => toggle(t)}>{t}</button>)}</div>
      <div className="row between pad"><span>Autoriser les commentaires</span><button className={'switch' + (comments ? ' on' : '')} onClick={() => setComments(!comments)} aria-label="Commentaires" /></div>
      <div className="row between pad"><span>Partager sur le fil public</span><button className={'switch' + (pub ? ' on' : '')} onClick={() => setPub(!pub)} aria-label="Fil public" /></div>
    </>
  )
}
