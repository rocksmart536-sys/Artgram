import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
export default function TopBar({ title, back, right }: { title: string; back?: boolean; right?: ReactNode }) {
  const nav = useNavigate()
  return (
    <header className="topbar">
      {back && <button className="icon" aria-label="Retour" onClick={() => nav(-1)}>‹</button>}
      <h1>{title}</h1>
      <div className="grow" />
      {right}
    </header>
  )
}
