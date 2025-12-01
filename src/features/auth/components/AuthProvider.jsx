import React, { useReducer, useEffect } from 'react'
import { authService } from '../services/authService'
import { notificationService } from '../../notifications/services/notificationService'
import { syncService } from '../../shared/services/syncService'
import { AuthContext } from '../contexts/AuthContext'
import { AUTH_ACTIONS, initialAuthState, authReducer } from '../utils/authUtils'

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)

  useEffect(() => {
    const validateUserToken = async () => {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true })

      const loggedUserJSON = window.localStorage.getItem('loggedGameUser')
      if (!loggedUserJSON) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
        return
      }

      let user
      try {
        user = JSON.parse(loggedUserJSON)
      } catch (e) {
        window.localStorage.removeItem('loggedGameUser')
        dispatch({ type: AUTH_ACTIONS.AUTH_ERROR, payload: 'Stored user data is corrupted' })
        notificationService.error('Stored user data is corrupted. Please log in again.')
        return
      }

      const validationResult = await authService.validateToken(user.token)

      if (!validationResult.valid) {
        window.localStorage.removeItem('loggedGameUser')
        dispatch({ type: AUTH_ACTIONS.AUTH_ERROR, payload: 'Session expired' })
        notificationService.error('Session expired. Please log in again.')
        return
      }

      dispatch({
        type: AUTH_ACTIONS.AUTH_SUCCESS,
        payload: { ...validationResult.user, token: user.token }
      })
    }

    validateUserToken()

    return syncService.subscribe((message) => {
      switch (message.type) {
      case 'USER_LOGGED_OUT':
        window.localStorage.removeItem('loggedGameUser')
        dispatch({ type: AUTH_ACTIONS.AUTH_LOGOUT })
        break
      case 'USER_LOGGED_IN':
        dispatch({ type: AUTH_ACTIONS.AUTH_SUCCESS, payload: message.user })
        break
      default:
        break
      }
    })
  }, [])

  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.AUTH_START })
      const user = await authService.login(credentials)
      window.localStorage.setItem('loggedGameUser', JSON.stringify(user))
      dispatch({ type: AUTH_ACTIONS.AUTH_SUCCESS, payload: user })
      syncService.userLoggedIn(user)
      notificationService.success('Login successful!')
      return { success: true }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.AUTH_ERROR, payload: 'Login failed' })
      notificationService.error('Wrong username or password')
      return { success: false, error: 'Login failed' }
    }
  }

  const signup = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.AUTH_START })
      await authService.signup(userData)
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
      notificationService.success('Sign-up successful! Please log in.')
      return { success: true }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.AUTH_ERROR, payload: 'Signup failed' })

      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Sign-up failed'

      if (errorMessage.includes('Username already taken')) {
        notificationService.error('Username is already taken')
      } else if (errorMessage.includes('Email already in use')) {
        notificationService.error('Email is already registered')
      } else {
        notificationService.error(errorMessage)
      }

      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedGameUser')
    dispatch({ type: AUTH_ACTIONS.AUTH_LOGOUT })
    syncService.userLoggedOut()
  }

  const value = {
    ...state,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

