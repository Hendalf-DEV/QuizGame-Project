import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import { QuizPage } from '../../quiz'
import { RankingPage } from '../../ranking'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
