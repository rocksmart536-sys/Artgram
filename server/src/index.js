import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import api from './routes/api.js'
import { startBot } from './bot/bot.js'

const app = express()
app.use(express.json())
app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/api', api)

// Sert le front buildé (web/dist) depuis le même service Railway
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../web/dist')
app.use(express.static(dist))
app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')))

app.use((err, _req, res, _next) => { console.error(err); res.status(500).json({ error: 'erreur serveur' }) })

app.listen(process.env.PORT || 3000, () => console.log('Serveur prêt'))
startBot()
