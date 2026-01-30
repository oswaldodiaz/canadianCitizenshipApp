import type { Question } from './Question'

type SnapshotProps = {
  questions: Question[]
  answers: Record<string, string>
  onSubmit: () => void
  onEdit: () => void
  onReset: () => void
  onEditQuestion: (questionId: string) => void
}

function Snapshot({
  questions,
  answers,
  onSubmit,
  onEdit,
  onReset,
  onEditQuestion,
}: SnapshotProps) {
  return (
    <section className="summary">
      <h2>Your answers</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <span className="answer-question">{question.prompt}</span>
            <div className="answer-actions">
              <strong>{answers[question.id]}</strong>
              <button
                className="icon-button"
                type="button"
                onClick={() => onEditQuestion(question.id)}
                aria-label={`Edit answer for ${question.prompt}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 16.75V20h3.25L17.81 9.44l-3.25-3.25L4 16.75zm2.04 1.21l8.02-8.02 1.04 1.04-8.02 8.02H6.04zM19.71 7.54a1 1 0 000-1.41l-1.84-1.84a1 1 0 00-1.41 0l-1.1 1.1 3.25 3.25 1.1-1.1z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="actions">
        <button className="secondary" type="button" onClick={onEdit}>
          Edit answers
        </button>
        <button className="ghost" type="button" onClick={onReset}>
          Start over
        </button>
        <button className="primary align-right" type="button" onClick={onSubmit}>
          Submit
        </button>
      </div>
      <p className="summary-note">
        Review your answers before submitting. You can still make edits.
      </p>
    </section>
  )
}

export default Snapshot
