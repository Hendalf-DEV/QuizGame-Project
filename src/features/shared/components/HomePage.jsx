import { useAuth } from '../../auth'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { user, logout } = useAuth()

  return (
    <div className="page-container">
      <div className="content-card home-card">
        <h2 className="welcome-title">Welcome Back! 🎉</h2>
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <p className="username">{user?.username}</p>
        </div>

        <div className="navigation-grid">
          <Link to="/quiz" className="nav-card">
            <div className="nav-icon">🧠</div>
            <h3>Start Quiz</h3>
            <p>Test your knowledge</p>
          </Link>

          <Link to="/ranking" className="nav-card">
            <div className="nav-icon">🏆</div>
            <h3>Leaderboard</h3>
            <p>Check your rank</p>
          </Link>
        </div>

        <button onClick={logout} className="logout-button">
          👋 Logout
        </button>
      </div>
    </div>
  )
}

export default HomePage
