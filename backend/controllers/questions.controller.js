import { questions } from '../models/question.model.js'
import express from 'express'
const questionsRouter = express.Router()

export default questionsRouter.get('/', async (req, res) => {
  try {
    const allQuestions = await questions.find({})
    res.status(200).json(allQuestions)
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message })
  }
})