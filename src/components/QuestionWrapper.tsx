import { useMemo } from "react";
import type { Question as QuestionType } from "./Question";
import Question from "./Question";

type QuestionWrapperProps = {
  questions: QuestionType[];
  answers: Record<string, string>;
  currentIndex: number;
  editingFromSnapshot: boolean;
  onSelect: (questionId: string, option: string) => void;
  onBack: () => void;
  onReset: () => void;
  onFinishEditing: () => void;
  onNext: () => void;
};

function QuestionWrapper({
  questions,
  answers,
  currentIndex,
  editingFromSnapshot,
  onSelect,
  onBack,
  onReset,
  onFinishEditing,
  onNext,
}: QuestionWrapperProps) {
  const completion = useMemo(() => {
    const answered = questions.filter((question) => answers[question.id]).length;
    return {
      answered,
      total: questions.length,
    };
  }, [answers, questions]);

  const currentQuestion = questions[currentIndex];

  return (
    <form
      className="questionnaire"
      onSubmit={(event) => event.preventDefault()}
    >
      <Question
        question={currentQuestion}
        index={currentIndex}
        total={questions.length}
        answer={answers[currentQuestion.id]}
        onSelect={(option) => onSelect(currentQuestion.id, option)}
      />
      <div className="actions">
        {completion.answered > 0 && (
          <>
            <button
              className="secondary"
              type="button"
              onClick={onBack}
              disabled={currentIndex === 0}
            >
              Back
            </button>
            <button className="ghost" type="button" onClick={onReset}>
              Reset answers
            </button>
          </>
        )}
        {editingFromSnapshot && (
          <button className="ghost" type="button" onClick={onFinishEditing}>
            Finish
          </button>
        )}
        <button
          className="primary align-right"
          type="button"
          onClick={onNext}
          disabled={!answers[currentQuestion.id]}
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default QuestionWrapper;
