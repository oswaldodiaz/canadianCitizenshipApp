# Canadian Citizenship Practice App

A focused study app for the Canadian citizenship test. It presents a randomized set of multiple-choice questions, tracks your progress, and shows a results review with correct/incorrect answers.

## Features

- Randomized quiz set per session
- Progress tracking with review snapshot
- Score summary with pass/fail feedback
- Answer review list with correct vs. incorrect highlights

## Data Source

Questions are loaded from `src/data/questionnaire.json` and randomized in `src/data/questionFetcher.ts`.

## Getting Started

1) Install dependencies:

```bash
npm install
```

2) Run the development server:

```bash
npm run dev
```

3) Build for production:

```bash
npm run build
```

4) Preview the production build locally:

```bash
npm run preview
```

## Tests

Run unit tests with Vitest:

```bash
npm test
```

For a single run:

```bash
npm run test:run
```

## Project Structure

- `src/App.tsx`: App state and routing between views
- `src/components/Question.tsx`: Single question rendering
- `src/components/QuestionWrapper.tsx`: Questionnaire flow UI
- `src/components/Score.tsx`: Score calculation and answer review
- `src/data/questionnaire.json`: Question bank
- `src/data/questionFetcher.ts`: Randomized question selection

## Notes

- The pass threshold is 75%.
- Use “Start over” to reshuffle and reset the quiz.
