type HeaderProps = {
  answered: number
  total: number
  percent: number
}

function Header({ answered, total, percent }: HeaderProps) {
  return (
    <header className="hero">
      <div className="hero-top">
        <p className="eyebrow">Canadian Citizenship Practice</p>
        <span className="hero-divider" aria-hidden="true" />
      </div>
      <h1>Citizenship questionnaire</h1>
      <p className="subhead">
        This practice questionnaire mirrors the style of the Canadian
        citizenship knowledge check. Choose the best answer for each question.
        You need 75% or higher to pass.
      </p>
      <p className="subhead">
        Take your time, answer based on your knowledge today, and review your
        responses before you submit.
      </p>
      <div className="progress">
        <div className="progress-text">
          {answered} of {total} answered
        </div>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={answered}
        >
          <span style={{ width: `${percent}%` }} />
        </div>
      </div>
    </header>
  )
}

export default Header
