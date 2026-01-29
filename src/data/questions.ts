export type Question = {
  id: string
  prompt: string
  options: string[]
  answer: string
}

export const questions: Question[] = [
  {
    id: 'timeline',
    prompt: 'When do you hope to apply for citizenship?',
    options: ['Within 6 months', '6-12 months', '1-2 years', 'Not sure yet'],
    answer: '1-2 years',
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
    answer: 'Already met',
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
    answer: 'Checklist and timeline',
  },
]
