import { questions, type Question } from './questions'

const shuffle = (items: Question[]) => {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export const fetchRandomQuestions = () => {
  const total = questions.length
  const count = Math.min(20, total)
  return shuffle(questions).slice(0, count)
}
