import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Quiz from './pages/quiz.jsx'
import Ranking from './pages/ranking.jsx'

export default function AppRoutes({ user, handleLogout }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} handleLogout={handleLogout} />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  )
}