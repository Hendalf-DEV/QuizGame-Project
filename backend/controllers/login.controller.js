import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import express from 'express'
import { User } from '../models/user.model.js'
import { JWT_SECRET } from '../modules/utils/config/config.js'
const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, JWT_SECRET, { expiresIn: '1h' })

  res.status(200).json({ token, ...user.toJSON() })
})

export default loginRouter