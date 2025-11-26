import { question } from '../models/questionModel.js'
import express from 'express'
const questionsRouter = express.Router()

export default questionsRouter.get('/', async (req, res) => {
  try {
    const allQuestions = await question.find({})
    res.status(200).json(allQuestions)
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message })
  }
})