import { Router } from 'express'
import { pool } from '../db/pool.js'
import { auth } from '../middleware/auth.js'

const r = Router()
r.use(auth)

r.get('/me', (req, res) => res.json(req.user))

// Fil d'actualité (?cat=manga pour filtrer)
r.get('/posts', async (req, res) => {
  const { cat } = req.query
  const { rows } = await pool.query(
    `SELECT p.*, u.name AS artist_name, u.handle, u.avatar_url,
            (SELECT count(*) FROM likes l WHERE l.post_id = p.id)::int AS likes
     FROM posts p JOIN users u ON u.id = p.user_id
     WHERE ($1::text IS NULL OR $1 = 'Tous' OR p.category = $1)
     ORDER BY p.created_at DESC LIMIT 50`, [cat || null])
  res.json(rows)
})

r.post('/posts', async (req, res) => {
  const { title, caption, category, image_url, ratio } = req.body
  if (!title || !image_url) return res.status(400).json({ error: 'title et image_url requis' })
  const { rows } = await pool.query(
    `INSERT INTO posts (user_id,title,caption,category,image_url,ratio) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [req.user.id, title, caption, category, image_url, ratio])
  res.status(201).json(rows[0])
})

r.post('/posts/:id/like', async (req, res) => {
  const del = await pool.query('DELETE FROM likes WHERE user_id=$1 AND post_id=$2', [req.user.id, req.params.id])
  if (!del.rowCount) await pool.query('INSERT INTO likes VALUES ($1,$2)', [req.user.id, req.params.id])
  res.json({ liked: !del.rowCount })
})

r.get('/artists', async (_req, res) => {
  const { rows } = await pool.query('SELECT id,name,handle,bio,avatar_url FROM users ORDER BY created_at DESC LIMIT 50')
  res.json(rows)
})

r.get('/artists/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT id,name,handle,bio,avatar_url FROM users WHERE id=$1', [req.params.id])
  if (!rows[0]) return res.status(404).json({ error: 'introuvable' })
  res.json(rows[0])
})

r.post('/artists/:id/follow', async (req, res) => {
  const del = await pool.query('DELETE FROM follows WHERE follower_id=$1 AND followed_id=$2', [req.user.id, req.params.id])
  if (!del.rowCount) await pool.query('INSERT INTO follows VALUES ($1,$2)', [req.user.id, req.params.id])
  res.json({ following: !del.rowCount })
})

export default r
