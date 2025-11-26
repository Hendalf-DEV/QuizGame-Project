import express from 'express'
import { User } from '../models/userModel.js'
const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

export default usersRouter