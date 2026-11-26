import { NavLink, Outlet, Link } from 'react-router-dom'
const tabs: [string, string, string][] = [['/', '⌂', 'Accueil'], ['/artistes', '✎', 'Artistes'], ['/tutoriels', '▤', 'Tutoriels'], ['/profil', '☺', 'Profil']]
const Item = ([to, ic, label]: [string, string, string]) => (
  <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => 'nav-item' + (isActive ? ' on' : '')}>
    <span>{ic}</span><small>{label}</small>
  </NavLink>
)
export default function Layout() {
  return (
    <div className="app">
      <main className="page"><Outlet /></main>
      <nav className="bottom-nav">
        {tabs.slice(0, 2).map(Item)}
        <Link to="/nouvelle-publication" className="publish" aria-label="Publier">+</Link>
        {tabs.slice(2).map(Item)}
      </nav>
    </div>
  )
}
