const HomePage = ({ handleLogout, user }) => {
  return (
    <div id={'logout-container'}>
      <h2>Welcome!</h2>
      <p>You are logged in as {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default HomePage