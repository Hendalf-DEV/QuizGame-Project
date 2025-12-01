import React from 'react'
import { AuthProvider, useAuth, AuthContainer } from './features/auth'
import { NotificationContainer } from './features/notifications'
import { LoadingSpinner, AppRoutes } from './features/shared'
import './styles/index.css'

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner message="Loading..." />
  }

  if (!isAuthenticated) {
    return <AuthContainer />
  }

  return <AppRoutes />
}

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <NotificationContainer />
        <AppContentWrapper />
      </AuthProvider>
    </div>
  )
}

const AppContentWrapper = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const [showAuthForm, setShowAuthForm] = React.useState(false)
  const [titleClicked, setTitleClicked] = React.useState(false)

  const handleTitleClick = () => {
    if (!isAuthenticated && !isLoading) {
      setTitleClicked(true)
      document.body.classList.add('auth-active')

      setTimeout(() => {
        setShowAuthForm(true)
      }, 800)
    }
  }

  React.useEffect(() => {
    if (isAuthenticated) {
      setShowAuthForm(false)
      setTitleClicked(false)
      document.body.classList.remove('auth-active')
    }

    return () => {
      document.body.classList.remove('auth-active')
    }
  }, [isAuthenticated])

  return (
    <>
      {}
      {!isAuthenticated && !isLoading && (
        <h1
          id='funny-h1'
          className={titleClicked ? 'auth-mode' : 'clickable'}
          onClick={handleTitleClick}
        >
          Quiz-Game!
        </h1>
      )}
      {}
      {isAuthenticated ? (
        <AppContent />
      ) : isLoading ? (
        <AppContent />
      ) : showAuthForm ? (
        <AuthContainer />
      ) : null}
    </>
  )
}

export default App
