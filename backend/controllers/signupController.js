import { User } from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import express from 'express'
const signupRouter = express.Router()

signupRouter.post('/', async (req, res) => {
  try {
    const { username, password, email } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' })
    }

    const existingUser = await User.findOne({ username }).collation({ locale: 'en', strength: 2 })
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken.' })
    }

    if (email && email.trim() !== '') {
      const existingEmail = await User.findOne({ email: email.trim() })
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already in use.' })
      }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userDoc = { username, passwordHash: hashedPassword }

    if (email && email.trim() !== '') {
      userDoc.email = email.trim()
    }

    const newUser = new User(userDoc)
    await newUser.save()

    res.status(201).json({ message: 'User created successfully.' })
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message })
  }
})

export default signupRouter