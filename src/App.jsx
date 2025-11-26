import { AuthProvider, useAuth, AuthContainer } from './features/auth'
import { NotificationContainer } from './features/notifications'
import { LoadingSpinner, AppRoutes } from './features/shared'
import './styles/loading.css'

// Inner App component that uses auth context
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

// Main App component with providers
function App() {

  return (
    <AuthProvider>
      <NotificationContainer />
      <AppContent />
    </AuthProvider>
  )
}

export default App
