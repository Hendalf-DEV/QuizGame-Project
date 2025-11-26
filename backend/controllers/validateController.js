import express from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'
import { User } from '../models/userModel.js'

const validateRouter = express.Router()

validateRouter.post('/', async (req, res) => {
  const { token } = req.body

  if (!token) {
    return res.status(401).json({ valid: false, error: 'Token missing' })
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET)

    const user = await User.findById(decodedToken.id).select('username email score')
    if (!user) {
      return res.status(401).json({ valid: false, error: 'User no longer exists' })
    }

    return res.json({
      valid: true,
      user: user
    })
  } catch (error) {
    return res.status(401).json({ valid: false, error: 'Token invalid or expired' })
  }
})

export default validateRouter
