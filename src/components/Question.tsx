const slugify = (value: string) => value.toLowerCase().replace(/\s+/g, '-')

export type Question = {
  id: string
  prompt: string
  options: string[]
  answer: string
}

type QuestionProps = {
  question: Question
  index: number
  total: number
  answer: string | undefined
  onSelect: (option: string) => void
}

function Question({ question, index, total, answer, onSelect }: QuestionProps) {
  return (
    <fieldset className="question">
      <legend>
        <span className="question-index">Q{index + 1}</span>
        {`${question.id} - ${question.prompt}`}
      </legend>
      <div className="options">
        {question.options.map((option) => {
          const optionId = `${question.id}-${slugify(option)}`
          return (
            <label
              className={`option ${answer === option ? "is-selected" : ""}`}
              key={optionId}
              htmlFor={optionId}
            >
              <input
                id={optionId}
                type="radio"
                name={question.id}
                value={option}
                checked={answer === option}
                onChange={() => onSelect(option)}
              />
              <span>{option}</span>
            </label>
          )
        })}
      </div>
      <div className="question-meta">
        Question {index + 1} of {total}
      </div>
    </fieldset>
  )
}

export default Question
