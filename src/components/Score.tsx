type ScoreProps = {
  percentage: number
  passed: boolean
  onReset: () => void
}

function Score({ percentage, passed, onReset }: ScoreProps) {
  return (
    <section className="summary score-card">
      <h2>Score result</h2>
      <div className="score-pill">
        <strong>{percentage}%</strong>
        <span>{passed ? 'Passed' : 'Failed'}</span>
      </div>
      <p className="summary-note">
        Passing requires 75% or higher. Your result is based on a mock score.
      </p>
      <div className="actions">
        <button className="secondary" type="button" onClick={onReset}>
          Start over
        </button>
      </div>
    </section>
  )
}

export default Score
