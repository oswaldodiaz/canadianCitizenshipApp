import { useMemo, useState } from 'react'
import './App.css'

const questions = [
  {
    id: 'timeline',
    prompt: 'When do you hope to apply for citizenship?',
    options: ['Within 6 months', '6-12 months', '1-2 years', 'Not sure yet'],
  },
  {
    id: 'presence',
    prompt: 'How close are you to meeting the physical presence requirement?',
    options: [
      'Already met',
      'Within 6 months',
      'More than 6 months away',
      'Not tracking yet',
    ],
  },
  {
    id: 'support',
    prompt: 'What kind of guidance would help you most right now?',
    options: [
      'Checklist and timeline',
      'Eligibility review',
      'Document prep tips',
      'Mock test practice',
    ],
  },
]

type View = 'questionnaire' | 'snapshot' | 'score'

function App() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [view, setView] = useState<View>('questionnaire')
  const [resultScore, setResultScore] = useState<number | null>(null)

  const completion = useMemo(() => {
    const answered = questions.filter((question) => answers[question.id]).length
    return {
      answered,
      total: questions.length,
      percent: Math.round((answered / questions.length) * 100),
    }
  }, [answers])

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  const goToSnapshot = () => {
    setView('snapshot')
  }

  const handleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
    if (questionId === currentQuestion.id) {
      if (isLastQuestion) {
        goToSnapshot()
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))
      }
    }
  }

  const handleSubmit = () => {
    const score = Math.floor(Math.random() * questions.length) + 1
    setResultScore(score)
    setView('score')
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentIndex(0)
    setView('questionnaire')
    setResultScore(null)
  }

  const percentage = resultScore
    ? Math.round((resultScore / questions.length) * 100)
    : 0
  const passed = percentage >= 75

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">Citizenship Planner</p>
        <h1>Quick questionnaire</h1>
        <p className="subhead">
          Answer a few multiple-choice questions to shape your next steps and
          get a snapshot of where you stand.
        </p>
        <div className="progress">
          <div className="progress-text">
            {completion.answered} of {completion.total} answered
          </div>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={completion.total}
            aria-valuenow={completion.answered}
          >
            <span style={{ width: `${completion.percent}%` }} />
          </div>
        </div>
      </header>

      {view === 'questionnaire' && (
        <form className="questionnaire" onSubmit={(event) => event.preventDefault()}>
          <fieldset className="question" key={currentQuestion.id}>
            <legend>
              <span className="question-index">Q{currentIndex + 1}</span>
              {currentQuestion.prompt}
            </legend>
            <div className="options">
              {currentQuestion.options.map((option) => {
                const optionId = `${currentQuestion.id}-${option
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`
                return (
                  <label className="option" key={optionId} htmlFor={optionId}>
                    <input
                      id={optionId}
                      type="radio"
                      name={currentQuestion.id}
                      value={option}
                      checked={answers[currentQuestion.id] === option}
                      onChange={() => handleSelect(currentQuestion.id, option)}
                    />
                    <span>{option}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div className="actions">
            <button
              className="secondary"
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
            >
              Back
            </button>
            <button className="ghost" type="button" onClick={handleReset}>
              Reset answers
            </button>
          </div>
        </form>
      )}

      {view === 'snapshot' && (
        <section className="summary">
          <h2>Your snapshot</h2>
          <ul>
            {questions.map((question) => (
              <li key={question.id}>
                <span>{question.prompt}</span>
                <strong>{answers[question.id]}</strong>
              </li>
            ))}
          </ul>
          <div className="actions">
            <button className="primary" type="button" onClick={handleSubmit}>
              Submit
            </button>
            <button
              className="secondary"
              type="button"
              onClick={() => setView('questionnaire')}
            >
              Edit answers
            </button>
            <button className="ghost" type="button" onClick={handleReset}>
              Start over
            </button>
          </div>
          <p className="summary-note">
            Review your answers before submitting. You can still make edits.
          </p>
        </section>
      )}

      {view === 'score' && (
        <section className="summary score-card">
          <h2>Score result</h2>
          <div className="score-pill">
            <strong>{percentage}%</strong>
            <span>{passed ? 'Passed' : 'Failed'}</span>
          </div>
          <p className="summary-note">
            Passing requires 75% or higher. Your result is based on a mock
            score.
          </p>
          <div className="actions">
            <button className="secondary" type="button" onClick={handleReset}>
              Start over
            </button>
          </div>
        </section>
      )}
    </main>
  )
}

export default App
