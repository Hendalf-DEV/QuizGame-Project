import { useState, useEffect, useCallback } from 'react'
import { questionsService } from '../services/questionsService'
import { notificationService } from '../../notifications/services/notificationService'
import { rankingService } from '../../ranking/services/rankingService'
import { useAuth } from '../../auth'

export const useQuiz = () => {
  const { user } = useAuth()
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [answers, setAnswers] = useState([])
  const [currentQuestionCorrectIndex, setCurrentQuestionCorrectIndex] = useState(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true)
        const data = await questionsService.getQuestions()

        if (data && data.length > 0) {
          setQuestions(data)
          notificationService.success(`Loaded ${data.length} questions!`)
        } else {
          notificationService.warning('No questions available')
        }
      } catch (error) {
        console.error('Error fetching questions:', error)
        notificationService.error('Failed to load questions')
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = useCallback(async (answerIndex) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)

    try {

      const result = await questionsService.verifyAnswer(
        currentQuestion._id,
        answerIndex,
        currentQuestion.shuffleMap
      )
      const isCorrect = result.isCorrect
      const correctIndex = result.correctIndex

      setCurrentQuestionCorrectIndex(correctIndex)

      setAnswers(prev => [...prev, {
        questionIndex: currentQuestionIndex,
        selectedAnswer: answerIndex,
        correctAnswer: correctIndex,
        isCorrect
      }])

      if (isCorrect) {
        setScore(prev => prev + 1)
        notificationService.success('Correct! 🎉')
      } else {
        notificationService.error('Wrong answer! 😔')
      }
    } catch (error) {
      console.error('Error verifying answer:', error)
      notificationService.error('Failed to verify answer')
      setIsAnswered(false)
      setSelectedAnswer(null)
    }
  }, [isAnswered, currentQuestion, currentQuestionIndex])

  const handleNextQuestion = useCallback(async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setCurrentQuestionCorrectIndex(null)
    } else {
      setIsQuizComplete(true)
      const percentage = Math.round((score / questions.length) * 100)

      if (user?.id && score > 0) {
        try {
          await rankingService.updateUserScore({
            userId: user.id,
            scoreToAdd: score
          })
        } catch (error) {
          console.error('Error updating score:', error)
        }
      }

      if (percentage >= 80) {
        notificationService.success(`Quiz complete! Score: ${score}/${questions.length}`)
      } else if (percentage >= 50) {
        notificationService.info(`Quiz complete! Score: ${score}/${questions.length}`)
      } else {
        notificationService.warning(`Quiz complete! Score: ${score}/${questions.length}`)
      }
    }
  }, [currentQuestionIndex, questions.length, score, user])

  const handleRestartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setIsAnswered(false)
    setIsQuizComplete(false)
    setAnswers([])
    setCurrentQuestionCorrectIndex(null)
    notificationService.info('Quiz restarted!')
  }, [])

  const progress = questions.length > 0
    ? ((currentQuestionIndex + 1) / questions.length) * 100
    : 0

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    score,
    isAnswered,
    isLoading,
    isQuizComplete,
    answers,
    progress,
    currentQuestionCorrectIndex,
    handleAnswerSelect,
    handleNextQuestion,
    handleRestartQuiz
  }
}

