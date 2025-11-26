import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home.jsx'
import QuizPage from '../pages/Quiz.jsx'
import RankingPage from '../pages/Ranking.jsx'

export default function AppRoutes({ user, handleLogout }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage user={user} handleLogout={handleLogout} />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  )
}