import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import express from 'express'
const signupRouter = express.Router()

signupRouter.post('/', async (req, res) => {
  try {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken.' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({ username, passwordHash: hashedPassword, email })
    await newUser.save()

    res.status(201).json({ message: 'User created successfully.' })
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message })
  }
})

export default signupRouter