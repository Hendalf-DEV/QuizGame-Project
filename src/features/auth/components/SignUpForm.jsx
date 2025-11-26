import { useState } from 'react'

const SignUpForm = ({ onSignUp }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    const result = await onSignUp(userData)
    if (result.success) {
      setUserData({
        username: '',
        email: '',
        password: ''
      })
    }
  }

  const handleChange = (field) => (event) => {
    setUserData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  return (
    <div className={'sign-up'}>
      <h2>Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <div className={'input-group'}>
          <label htmlFor={'username'}>Username</label>
          <input
            type="text"
            id={'username'}
            name="Username"
            value={userData.username}
            autoComplete={'off'}
            onChange={handleChange('username')}
          />
        </div>
        <div className={'input-group'}>
          <label htmlFor={'email'}>Email</label>
          <input
            type="email"
            id='email'
            name="Email"
            value={userData.email}
            autoComplete={'off'}
            onChange={handleChange('email')}
          />
        </div>
        <div className={'input-group'}>
          <label htmlFor={'password'}>Password</label>
          <input
            type="password"
            id={'password'}
            name="Password"
            value={userData.password}
            autoComplete={'off'}
            onChange={handleChange('password')}
          />
        </div>
        <button type="submit">Sign-Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
