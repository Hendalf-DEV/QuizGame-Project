import axios from 'axios'

const baseUrl = '/api'

const getQuestions = async () => {
  const response = await axios.get(`${baseUrl}/questions`)
  return response.data
}

const verifyAnswer = async (questionId, answerIndex, shuffleMap) => {
  const response = await axios.post(`${baseUrl}/questions/verify`, {
    questionId,
    answerIndex,
    shuffleMap
  })
  return response.data
}

const submitScore = async (scoreData) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(`${baseUrl}/scores`, scoreData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const questionsService = {
  getQuestions,
  verifyAnswer,
  submitScore
}
