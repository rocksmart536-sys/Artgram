import { readFileSync } from 'fs'
import { pool } from './pool.js'
const sql = readFileSync(new URL('./schema.sql', import.meta.url), 'utf8')
await pool.query(sql)
console.log('Migration OK')
await pool.end()
