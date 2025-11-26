import axios from 'axios'

const baseUrl = '/api/auth'

const login = async credentials => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const signup = async userData => {
  const response = await axios.post(`${baseUrl}/signup`, userData)
  return response.data
}

const validateToken = async token => {
  try {
    const response = await axios.post(`${baseUrl}/validate`, { token }, {
      timeout: 5000
    })
    return response.data
  } catch (error) {
    console.warn('Token validation failed:', error.message)
    return { valid: false }
  }
}

export const authService = { login, signup, validateToken }