import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../hooks/useQuiz'
import { LoadingSpinner } from '../../shared'

const QuizContainer = () => {
  const navigate = useNavigate()
  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    score,
    isAnswered,
    isLoading,
    isQuizComplete,
    progress,
    questions,
    currentQuestionCorrectIndex,
    handleAnswerSelect,
    handleNextQuestion,
    handleRestartQuiz
  } = useQuiz()

  if (isLoading) {
    return <LoadingSpinner message="Loading quiz questions..." />
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="page-container">
        <div className="content-card">
          <button onClick={() => navigate(-1)} className="go-back-button">
            ← Go Back
          </button>
          <h2 className="page-title">📚 No Questions Available</h2>
          <p className="page-description">
            There are no quiz questions available at the moment.
          </p>
          <button onClick={() => navigate('/')} className="primary-button">
            Return Home
          </button>
        </div>
      </div>
    )
  }

  if (isQuizComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    let emoji = '🎉'
    let message = 'Excellent work!'

    if (percentage < 50) {
      emoji = '📚'
      message = 'Keep practicing!'
    } else if (percentage < 80) {
      emoji = '👍'
      message = 'Good effort!'
    }

    return (
      <div className="page-container">
        <div className="content-card quiz-complete">
          <button onClick={() => navigate(-1)} className="go-back-button">
            ← Go Back
          </button>
          <div className="quiz-result">
            <h2 className="result-title">{emoji} Quiz Complete!</h2>
            <div className="score-display">
              <div className="score-circle">
                <div className="score-number">{score}</div>
                <div className="score-total">/ {questions.length}</div>
              </div>
              <div className="percentage">{percentage}%</div>
            </div>
            <p className="result-message">{message}</p>

            <div className="result-actions">
              <button onClick={handleRestartQuiz} className="primary-button">
                🔄 Try Again
              </button>
              <button onClick={() => navigate('/ranking')} className="secondary-button">
                🏆 View Rankings
              </button>
              <button onClick={() => navigate('/')} className="secondary-button">
                🏠 Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="content-card quiz-active">
        <button onClick={() => navigate(-1)} className="go-back-button">
          ← Go Back
        </button>

        <div className="quiz-header">
          <div className="quiz-info">
            <span className="question-counter">
              Question {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span className="score-counter">Score: {score}</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="quiz-question">
          <h2 className="question-text">{currentQuestion.question}</h2>
        </div>

        <div className="quiz-options">
          {currentQuestion.options.map((option, index) => {
            let optionClass = 'quiz-option'

            if (isAnswered) {
              if (index === currentQuestionCorrectIndex) {
                optionClass += ' correct'
              } else if (index === selectedAnswer) {
                optionClass += ' incorrect'
              } else {
                optionClass += ' disabled'
              }
            } else if (selectedAnswer === index) {
              optionClass += ' selected'
            }

            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
                {isAnswered && index === currentQuestionCorrectIndex && (
                  <span className="option-icon">✓</span>
                )}
                {isAnswered && index === selectedAnswer && index !== currentQuestionCorrectIndex && (
                  <span className="option-icon">✗</span>
                )}
              </button>
            )
          })}
        </div>

        {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="next-button"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
          </button>
        )}
      </div>
    </div>
  )
}

export default QuizContainer
