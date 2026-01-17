import type { Question } from '../data/questions'

type SnapshotProps = {
  questions: Question[]
  answers: Record<string, string>
  onSubmit: () => void
  onEdit: () => void
  onReset: () => void
}

function Snapshot({ questions, answers, onSubmit, onEdit, onReset }: SnapshotProps) {
  return (
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
