import { useState } from 'react'
import { useAuth } from '../hooks/useAuthHook'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

import { notificationService } from '../../notifications/services/notificationService'

const AuthContainer = () => {
  const { login, signup, isLoading } = useAuth()
  const [showSignUp, setShowSignUp] = useState(false)

  const handleLogin = async (credentials) => {
    if (!credentials.username || !credentials.password) {
      notificationService.error('Please fill in all fields')
      return
    }

    return await login(credentials)
  }

  const handleSignUp = async (userData) => {
    if (!userData.username || !userData.password) {
      notificationService.error('Please fill in all fields')
      return { success: false }
    }

    if (userData.username.length < 3) {
      notificationService.error('Username must be at least 3 characters long')
      return { success: false }
    }

    if (userData.password.length < 8) {
      notificationService.error('Password must be at least 8 characters long')
      return { success: false }
    }

    const result = await signup(userData)
    if (result.success) {
      setShowSignUp(false)
    }
    return result
  }

  if (isLoading) {
    return null
  }

  return (
    <div id={'auth-container'}>
      {!showSignUp ? (
        <div>
          <LoginForm onLogin={handleLogin} />
          <button onClick={() => setShowSignUp(true)}>Sign-Up Instead</button>
        </div>
      ) : (
        <div>
          <SignUpForm onSignUp={handleSignUp} />
          <button onClick={() => setShowSignUp(false)}>Login Instead</button>
        </div>
      )}
    </div>
  )
}

export default AuthContainer
