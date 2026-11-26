import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Art, { Avatar } from '../components/Art'
import TopBar from '../components/TopBar'
import { artist, posts } from '../data'
export default function Post() {
  const { id } = useParams()
  const post = posts.find(p => p.id === id) ?? posts[0]
  const a = artist(post.artist)
  const [follow, setFollow] = useState(false)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <>
      <TopBar title="Publication" back />
      <Art hue={post.hue} src={post.src} ratio={post.ratio} />
      <div className="row between pad">
        <Link to={`/artiste/${a.id}`} className="row"><Avatar hue={a.hue} src={a.src} /><div><b>{a.name}</b><small className="muted block">{post.time}</small></div></Link>
        <button className={'btn' + (follow ? ' ghost' : '')} onClick={() => setFollow(!follow)}>{follow ? 'Abonné' : 'Suivre'}</button>
      </div>
      <p className="pad"><b>{post.title}</b><br />{post.caption}</p>
      <div className="row actions pad">
        <button className={'icon' + (liked ? ' liked' : '')} onClick={() => setLiked(!liked)}>♥</button><small>{post.likes}</small>
        <div className="grow" /><span className="icon">💬</span><div className="grow" />
        <button className={'icon' + (saved ? ' saved' : '')} onClick={() => setSaved(!saved)}>★</button>
      </div>
      <Link to="/commissions" className="btn wide">Commissioner cet artiste</Link>
    </>
  )
}
