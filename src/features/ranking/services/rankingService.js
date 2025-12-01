import axios from 'axios'

const baseUrl = '/api'

const getRankings = async (limit = 100) => {
  const response = await axios.get(`${baseUrl}/rankings`, {
    params: { limit }
  })
  return response.data
}

const getUserRank = async (userId) => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${baseUrl}/rankings/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

const updateUserScore = async (scoreData) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(`${baseUrl}/rankings/score`, scoreData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const rankingService = {
  getRankings,
  getUserRank,
  updateUserScore
}

