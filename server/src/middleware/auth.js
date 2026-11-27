import crypto from 'crypto'
import { pool } from '../db/pool.js'

// Vérifie la signature de Telegram.WebApp.initData (envoyée dans le header x-init-data)
function verify(initData) {
  const p = new URLSearchParams(initData)
  const hash = p.get('hash')
  p.delete('hash')
  const str = [...p.entries()].map(([k, v]) => `${k}=${v}`).sort().join('\n')
  const secret = crypto.createHmac('sha256', 'WebAppData').update(process.env.BOT_TOKEN).digest()
  const calc = crypto.createHmac('sha256', secret).update(str).digest('hex')
  if (calc !== hash) return null
  return JSON.parse(p.get('user'))
}

export async function auth(req, res, next) {
  try {
    const tg = verify(req.get('x-init-data') || '')
    if (!tg) return res.status(401).json({ error: 'unauthorized' })
    const { rows } = await pool.query(
      `INSERT INTO users (telegram_id, name, handle) VALUES ($1,$2,$3)
       ON CONFLICT (telegram_id) DO UPDATE SET name = EXCLUDED.name
       RETURNING *`,
      [tg.id, [tg.first_name, tg.last_name].filter(Boolean).join(' '), tg.username ? '@' + tg.username : null]
    )
    req.user = rows[0]
    next()
  } catch (e) { next(e) }
}
