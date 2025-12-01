import { useState, useEffect } from 'react'
import { rankingService } from '../services/rankingService'
import { notificationService } from '../../notifications/services/notificationService'
import { useAuth } from '../../auth'

export const useRanking = () => {
  const [rankings, setRankings] = useState([])
  const [userRank, setUserRank] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const rankingsData = await rankingService.getRankings(100)
        setRankings(rankingsData)

        if (user?.id) {
          try {
            const userRankData = await rankingService.getUserRank(user.id)
            setUserRank(userRankData)
          } catch (err) {
            console.error('Error fetching user rank:', err)

          }
        }
      } catch (err) {
        console.error('Error fetching rankings:', err)
        setError('Failed to load rankings')
        notificationService.error('Failed to load rankings')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRankings()
  }, [user?.id])

  const refreshRankings = async () => {
    try {
      const rankingsData = await rankingService.getRankings(100)
      setRankings(rankingsData)

      if (user?.id) {
        const userRankData = await rankingService.getUserRank(user.id)
        setUserRank(userRankData)
      }

      notificationService.success('Rankings updated!')
    } catch (err) {
      console.error('Error refreshing rankings:', err)
      notificationService.error('Failed to refresh rankings')
    }
  }

  return {
    rankings,
    userRank,
    isLoading,
    error,
    refreshRankings
  }
}

