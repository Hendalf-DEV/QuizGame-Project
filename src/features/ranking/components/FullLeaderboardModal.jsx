import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'

const FullLeaderboardModal = ({ rankings, user, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredRankings = useMemo(() => {
    if (!searchTerm.trim()) return rankings

    return rankings.filter(rankItem =>
      rankItem.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [rankings, searchTerm])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content full-leaderboard-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">🏆 Full Leaderboard</h2>
          <button className="modal-close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-search">
          <input
            type="text"
            placeholder="🔍 Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            autoFocus
          />
          {searchTerm && (
            <button className="clear-search-button" onClick={() => setSearchTerm('')}>
              ✕
            </button>
          )}
        </div>

        <div className="modal-info">
          {searchTerm ? (
            <p>Found {filteredRankings.length} of {rankings.length} users</p>
          ) : (
            <p>Total: {rankings.length} users</p>
          )}
        </div>

        <div className="modal-leaderboard-list">
          {filteredRankings.length === 0 ? (
            <div className="no-results">
              <p>No users found matching &quot;{searchTerm}&quot;</p>
            </div>
          ) : (
            filteredRankings.map((rankItem, index) => {

              const rank = rankings.findIndex(r => r.userId === rankItem.userId) + 1
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
            })
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-close-footer-button">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

FullLeaderboardModal.propTypes = {
  rankings: PropTypes.array.isRequired,
  user: PropTypes.object,
  onClose: PropTypes.func.isRequired
}

export default FullLeaderboardModal

