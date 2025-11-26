import { useEffect, useState } from 'react'
import SignUpForm from './components/SignUpForm.jsx'
import LoginForm from './components/LoginForm.jsx'
import Logger from './components/Logger.jsx'
import authService from './services/auth.js'
import notificationService from './services/notifications.js'
import syncService from './services/sync.js'
import './styles/loading.css'
import AppRoutes from './routes/routes.jsx'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [showSignUp, setShowSignUp] = useState(false)
  const [isValidating, setIsValidating] = useState(true) // Add loading state

  useEffect(() => {
    const validateUserToken = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedGameUser')
      if (!loggedUserJSON) {
        setIsValidating(false)
        return
      }

      let user
      try {
        user = JSON.parse(loggedUserJSON)
      } catch (e) {
        window.localStorage.removeItem('loggedGameUser')
        setUser(null)
        setIsValidating(false)
        notificationService.error('Stored user data is corrupted. Please log in again.')
        return
      }

      const validationResult = await authService.validateToken(user.token)

      if (!validationResult.valid) {
        window.localStorage.removeItem('loggedGameUser')
        setUser(null)
        setIsValidating(false) // Set loading to false
        notificationService.error('Session expired. Please log in again.')
        return
      }

      setUser({ ...validationResult.user, token: user.token })
      setIsValidating(false) // Always set loading to false when done
    }
    validateUserToken()

    return syncService.subscribe((message) => {
      switch (message.type) {
      case 'USER_LOGGED_OUT':
        window.localStorage.removeItem('loggedGameUser')
        setUser(null)
        break
      case 'USER_LOGGED_IN':
        // Something to do here
        break
      default:
        break
      }
    })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    if (!username || !password) {
      notificationService.error('Please fill in all fields')
      return
    }

    if (username.length < 3) {
      notificationService.error('Username must be at least 3 characters long')
      return
    }

    if (password.length < 3) {
      notificationService.error('Password must be at least 3 characters long')
      return
    }

    try {
      const user = await authService.login({
        username, password,
      })
      window.localStorage.setItem('loggedGameUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      syncService.userLoggedIn(user)
      notificationService.success('Login successful!')
    } catch (error) {
      notificationService.error('Wrong username or password')
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault()

    if (!username || !password) {
      notificationService.error('Please fill in all fields')
      return
    }

    if (username.length < 3) {
      notificationService.error('Username must be at least 3 characters long')
      return
    }

    if (password.length < 3) {
      notificationService.error('Password must be at least 3 characters long')
      return
    }

    try {
      await authService.signup({
        username,
        email,
        password,
      })
      setShowSignUp(false)
      setUsername('')
      setPassword('')
      setEmail('')
      notificationService.success('Sign-up successful! Please log in.')
    } catch (exception) {
      notificationService.error(exception.response?.data?.error || 'Sign-up failed')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedGameUser')
    setUser(null)
    syncService.userLoggedOut()
  }

  return (
    <>
      <Logger />
      {isValidating ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <div className="loading-text">Loading...</div>
        </div>
      ) : !user ? (
        <div id={'auth-container'}>
          {!showSignUp ? (
            <div>
              <LoginForm
                handleLogin={handleLogin}
                setUsername={setUsername}
                setPassword={setPassword}
                username={username}
                password={password}
              />
              <button onClick={() => setShowSignUp(true)}>Sign-Up Instead</button>
            </div>
          ) : (
            <div>
              <SignUpForm
                handleSignUp={handleSignUp}
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
              <button onClick={() => setShowSignUp(false)}>Login Instead</button>
            </div>
          )}
        </div>
      ) : (
        <AppRoutes user={user} handleLogout={handleLogout} />
      )}
    </>
  )
}

export default App
