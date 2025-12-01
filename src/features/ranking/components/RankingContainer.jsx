import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRanking } from '../hooks/useRanking'
import { LoadingSpinner } from '../../shared'
import { useAuth } from '../../auth'
import FullLeaderboardModal from './FullLeaderboardModal'

const RankingContainer = () => {
  const navigate = useNavigate()
  const { rankings, userRank, isLoading, refreshRankings } = useRanking()
  const { user } = useAuth()
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false)

  if (isLoading) {
    return <LoadingSpinner message="Loading rankings..." />
  }

  const getRankEmoji = (rank) => {
    switch (rank) {
    case 1: return '🥇'
    case 2: return '🥈'
    case 3: return '🥉'
    default: return '🏅'
    }
  }

  const getRankClass = (rank) => {
    switch (rank) {
    case 1: return 'rank-gold'
    case 2: return 'rank-silver'
    case 3: return 'rank-bronze'
    default: return ''
    }
  }

  return (
    <div className="page-container">
      <div className="content-card ranking-container">
        <button onClick={() => navigate(-1)} className="go-back-button">
          ← Go Back
        </button>

        <h1 className="page-title">🏆 Leaderboard</h1>
        <p className="page-description">See how you rank against other quiz masters!</p>

        {userRank && (
          <div className="user-rank-card">
            <div className="user-rank-header">Your Rank</div>
            <div className="user-rank-content">
              <div className="user-rank-position">
                <span className="rank-emoji">{getRankEmoji(userRank.rank)}</span>
              </div>
              <div className="user-rank-details">
                <div className="user-rank-name">{user?.username}</div>
                <div className="user-rank-score">{userRank.score} points</div>
              </div>
            </div>
          </div>
        )}

        <div className="ranking-actions">
          <button onClick={refreshRankings} className="refresh-button">
            🔄 Refresh Rankings
          </button>
        </div>

        <div className="leaderboard-list">
          {rankings.length === 0 ? (
            <div className="no-rankings">
              <p>No rankings yet. Be the first to complete a quiz!</p>
              <button onClick={() => navigate('/quiz')} className="primary-button">
                Start Quiz 🚀
              </button>
            </div>
          ) : (
            <>
              {rankings.slice(0, 5).map((rankItem, index) => {
                const rank = index + 1
                const isCurrentUser = user?.id === rankItem.userId

                return (
                  <div
                    key={rankItem.userId || index}
                    className={`rank-item ${getRankClass(rank)} ${isCurrentUser ? 'current-user' : ''}`}
                  >
                    <div className="rank-position">
                      <span className="rank-emoji">{getRankEmoji(rank)}</span>
                      <span className="rank-number">#{rank}</span>
                    </div>
                    <div className="rank-info">
                      <h3 className="rank-username">
                        {rankItem.username}
                        {isCurrentUser && <span className="you-badge">You</span>}
                      </h3>
                      <p className="rank-score">{rankItem.score} points</p>
                    </div>
                    {rank <= 3 && (
                      <div className="rank-trophy">
                        {rank === 1 && '👑'}
                        {rank === 2 && '⭐'}
                        {rank === 3 && '🌟'}
                      </div>
                    )}
                  </div>
                )
              })}

              {rankings.length > 5 && (
                <button
                  onClick={() => setShowFullLeaderboard(true)}
                  className="view-full-leaderboard-button"
                >
                  View Full Leaderboard ({rankings.length} users) 📊
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {showFullLeaderboard && (
        <FullLeaderboardModal
          rankings={rankings}
          user={user}
          onClose={() => setShowFullLeaderboard(false)}
        />
      )}
    </div>
  )
}

export default RankingContainer

