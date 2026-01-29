import type { Question } from "./Question";

type ScoreProps = {
  questions: Question[];
  answers: Record<string, string>;
  onReset: () => void;
};

function Score({ questions, answers, onReset }: ScoreProps) {
  const correct = questions.reduce((total, question) => {
    return total + (answers[question.id] === question.answer ? 1 : 0);
  }, 0);
  const total = questions.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passed = percentage >= 75;

  return (
    <section
      className={`summary score-card ${passed ? "is-passed" : "is-failed"}`}
    >
      <h2>Score result</h2>
      <p className="score-instructions">
        Passing requires 75% or higher. Your result is based on your answers.
      </p>
      <div className="score-pill">
        <strong>{percentage}%</strong>
        <span>{passed ? 'Passed' : 'Failed'}</span>
      </div>
      <p className="score-message">
        {passed
          ? "Great work! You met the passing mark. Keep the momentum and you’ll be ready for the real test. 🎉✅"
          : "You’re close. A bit more review will make a big difference—focus on the topics you missed and try again. 💪📚"}
      </p>
      <div className="answer-review">
        <h3>Answer review</h3>
        <ul>
          {questions.map((question) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.answer;
            return (
              <li key={question.id} className={isCorrect ? "correct" : "wrong"}>
                <div className="review-header">
                  <span className="review-status">
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                  <span className="review-question">{question.prompt}</span>
                </div>
                <div className="review-meta">
                  <span>Your answer: {userAnswer ?? "Not answered"}</span>
                  <span>Correct answer: {question.answer}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="actions">
        <button className="secondary" type="button" onClick={onReset}>
          Start over
        </button>
      </div>
    </section>
  );
}

export default Score;
