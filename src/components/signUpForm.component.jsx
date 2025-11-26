const SignUpForm = ({ handleSignUp, setUsername, setEmail, setPassword }) => {
  return (
    <div className={'sign-up'}>
      <h2>Sign-Up</h2>
      <form onSubmit={handleSignUp}>
        <div className={'input-group'}>
          <label htmlFor={'username'}>Username</label>
          <input
            type="text"
            id={'username'}
            name="Username"
            autoComplete={'off'}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className={'input-group'}>
          <label htmlFor={'email'}>Email</label>
          <input
            type="email"
            id='email'
            name="Email"
            autoComplete={'off'}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div className={'input-group'}>
          <label htmlFor={'password'}>Password</label>
          <input
            type="password"
            id={'password'}
            name="Password"
            autoComplete={'off'}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Sign-Up</button>
      </form>
    </div>
  )
}
export default SignUpForm