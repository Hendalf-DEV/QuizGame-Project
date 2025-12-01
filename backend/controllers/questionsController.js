import { question } from '../models/questionModel.js'
import express from 'express'
const questionsRouter = express.Router()

const shuffleArrayWithMap = (array) => {
  const indices = array.map((_, index) => index)
  const shuffled = [...array]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    [indices[i], indices[j]] = [indices[j], indices[i]]
  }

  return { shuffled, originalIndices: indices }
}

questionsRouter.get('/', async (req, res) => {
  try {
    const allQuestions = await question.find({})

    const questionsWithoutAnswers = allQuestions.map(q => {
      const { shuffled, originalIndices } = shuffleArrayWithMap(q.options)

      return {
        _id: q._id,
        question: q.question,
        options: shuffled,
        shuffleMap: originalIndices
      }
    })

    res.status(200).json(questionsWithoutAnswers)
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message })
  }
})

questionsRouter.post('/verify', async (req, res) => {
  try {
    const { questionId, answerIndex, shuffleMap } = req.body

    if (!questionId || answerIndex === undefined || !shuffleMap) {
      return res.status(400).json({
        message: 'Question ID, answer index, and shuffle map are required'
      })
    }

    const questionData = await question.findById(questionId)

    if (!questionData) {
      return res.status(404).json({ message: 'Question not found' })
    }

    const originalAnswerIndex = shuffleMap[answerIndex]
    const isCorrect = originalAnswerIndex === questionData.correctIndex

    const shuffledCorrectIndex = shuffleMap.indexOf(questionData.correctIndex)

    res.status(200).json({
      isCorrect,
      correctIndex: shuffledCorrectIndex
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message })
  }
})

export default questionsRouter
