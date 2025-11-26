import { useAuth } from '../../auth'

const HomePage = () => {
  const { user, logout } = useAuth()

  return (
    <div id={'logout-container'}>
      <h2>Welcome!</h2>
      <p>You are logged in as {user?.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default HomePage
