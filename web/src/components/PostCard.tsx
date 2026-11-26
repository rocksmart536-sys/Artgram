import { useState } from 'react'
import { Link } from 'react-router-dom'
import Art, { Avatar } from './Art'
import { artist, PostT } from '../data'
export default function PostCard({ post }: { post: PostT }) {
  const a = artist(post.artist)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <article className="card">
      <Link to={`/artiste/${a.id}`} className="row">
        <Avatar hue={a.hue} src={a.src} />
        <div><b>{a.name}</b><small className="muted block">{post.time}</small></div>
      </Link>
      <Link to={`/publication/${post.id}`}><Art hue={post.hue} src={post.src} ratio={post.ratio} /></Link>
      <div className="row actions">
        <button className={'icon' + (liked ? ' liked' : '')} onClick={() => setLiked(!liked)} aria-label="J’aime">♥</button>
        <small>{post.likes}</small>
        <div className="grow" />
        <Link className="icon" to={`/publication/${post.id}`} aria-label="Commentaires">💬</Link>
        <div className="grow" />
        <button className={'icon' + (saved ? ' saved' : '')} onClick={() => setSaved(!saved)} aria-label="Favori">★</button>
      </div>
    </article>
  )
}
