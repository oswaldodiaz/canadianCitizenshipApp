import type { ReactNode } from 'react'

type HeaderProps = {
  answered: number
  total: number
  percent: number
}

function Header({ answered, total, percent }: HeaderProps) {
  return (
    <header className="hero">
      <p className="eyebrow">Citizenship Planner</p>
      <h1>Quick questionnaire</h1>
      <p className="subhead">
        Answer a few multiple-choice questions to shape your next steps and get
        a snapshot of where you stand.
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
