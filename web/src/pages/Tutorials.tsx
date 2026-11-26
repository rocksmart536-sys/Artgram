import { useState } from 'react'
import Art from '../components/Art'
import Tabs from '../components/Tabs'
import TopBar from '../components/TopBar'
import { tutorialCats, tutorials } from '../data'
export default function Tutorials() {
  const [cat, setCat] = useState('Tout')
  const list = tutorials.filter(t => cat === 'Tout' || t.cat === cat)
  return (
    <>
      <TopBar title="Tutoriels" />
      <Tabs items={tutorialCats} value={cat} onChange={setCat} />
      {list.map(t => (
        <article key={t.id} className="card">
          <div className="thumb"><Art hue={t.hue} ratio="16/9" /><span className="play">▶</span><small className="dur">{t.dur}</small></div>
          <p className="pad"><b>{t.title}</b><small className="muted block">{t.cat}</small></p>
        </article>
      ))}
      {!list.length && <p className="empty">Aucun tutoriel dans cette catégorie.</p>}
    </>
  )
}
