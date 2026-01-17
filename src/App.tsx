import { useMemo, useState, type FormEvent } from 'react'
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

function App() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const completion = useMemo(() => {
    const answered = questions.filter((question) => answers[question.id]).length
    return {
      answered,
      total: questions.length,
      percent: Math.round((answered / questions.length) * 100),
    }
  }, [answers])

  const handleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
    if (submitted) {
      setSubmitted(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
  }

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

      <form className="questionnaire" onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <fieldset className="question" key={question.id}>
            <legend>
              <span className="question-index">Q{index + 1}</span>
              {question.prompt}
            </legend>
            <div className="options">
              {question.options.map((option) => {
                const optionId = `${question.id}-${option
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`
                return (
                  <label className="option" key={optionId} htmlFor={optionId}>
                    <input
                      id={optionId}
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleSelect(question.id, option)}
                    />
                    <span>{option}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}

        <div className="actions">
          <button
            className="primary"
            type="submit"
            disabled={completion.answered !== completion.total}
          >
            See my results
          </button>
          <button className="secondary" type="button" onClick={handleReset}>
            Reset answers
          </button>
        </div>
      </form>

      {submitted && (
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
          <p className="summary-note">
            This is a starting point. You can export a checklist once you have
            your answers confirmed.
          </p>
        </section>
      )}
    </main>
  )
}

export default App
