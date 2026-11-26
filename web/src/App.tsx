import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Artists from './pages/Artists'
import Commissions from './pages/Commissions'
import Tutorials from './pages/Tutorials'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import Post from './pages/Post'
import NewPost from './pages/NewPost'
import Notifications from './pages/Notifications'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/artistes" element={<Artists />} />
        <Route path="/commissions" element={<Commissions />} />
        <Route path="/tutoriels" element={<Tutorials />} />
        <Route path="/discussions" element={<Messages />} />
        <Route path="/discussions/:id" element={<Messages />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/artiste/:id" element={<Profile />} />
        <Route path="/publication/:id" element={<Post />} />
        <Route path="/nouvelle-publication" element={<NewPost />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  )
}
