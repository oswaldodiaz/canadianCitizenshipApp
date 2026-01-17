import { useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Question from "./components/Question";
import Score from "./components/Score";
import Snapshot from "./components/Snapshot";
import { questions } from "./data/questions";

type View = "start" | "questionnaire" | "snapshot" | "score";

function App() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState<View>("start");
  const [resultScore, setResultScore] = useState<number | null>(null);
  const [editingFromSnapshot, setEditingFromSnapshot] = useState(false);

  const completion = useMemo(() => {
    const answered = questions.filter(
      (question) => answers[question.id],
    ).length;
    return {
      answered,
      total: questions.length,
      percent: Math.round((answered / questions.length) * 100),
    };
  }, [answers]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    if (questionId === currentQuestion.id) {
      if (isLastQuestion) {
        setEditingFromSnapshot(false);
        setView("snapshot");
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
      }
    }
  };

  const handleSubmit = () => {
    const score = Math.floor(Math.random() * questions.length) + 1;
    setResultScore(score);
    setView("score");
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setView("start");
    setResultScore(null);
    setEditingFromSnapshot(false);
  };

  const handleEditQuestion = (questionId: string) => {
    const index = questions.findIndex((question) => question.id === questionId);
    if (index >= 0) {
      setCurrentIndex(index);
    }
    setEditingFromSnapshot(true);
    setView("questionnaire");
  };

  const percentage = resultScore
    ? Math.round((resultScore / questions.length) * 100)
    : 0;
  const passed = percentage >= 75;

  return (
    <main className="app">
      <Header
        answered={completion.answered}
        total={completion.total}
        percent={completion.percent}
        showInstructions={view === "start"}
        showProgress={view === "questionnaire"}
      />

      {view === "start" && (
        <section className="start-card">
          <p>
            When you are ready, start the practice questionnaire. You can review
            your answers before submitting.
          </p>
          <button
            className="primary align-right"
            type="button"
            onClick={() => setView("questionnaire")}
          >
            Start
          </button>
        </section>
      )}

      {view === "questionnaire" && (
        <form
          className="questionnaire"
          onSubmit={(event) => event.preventDefault()}
        >
          <Question
            question={currentQuestion}
            index={currentIndex}
            total={questions.length}
            answer={answers[currentQuestion.id]}
            onSelect={(option) => handleSelect(currentQuestion.id, option)}
          />
          <div className="actions">
            {completion.answered > 0 && (
              <>
                <button
                  className="secondary"
                  type="button"
                  onClick={() =>
                    setCurrentIndex((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={currentIndex === 0}
                >
                  Back
                </button>
                <button className="ghost" type="button" onClick={handleReset}>
                  Reset answers
                </button>
              </>
            )}
            {editingFromSnapshot && (
              <button
                className="ghost"
                type="button"
                onClick={() => {
                  setEditingFromSnapshot(false);
                  setView("snapshot");
                }}
              >
                Finish
              </button>
            )}
            <button
              className="primary align-right"
              type="button"
              onClick={() => {
                if (currentIndex === questions.length - 1) {
                  setEditingFromSnapshot(false);
                  setView("snapshot");
                } else {
                  setCurrentIndex((prev) =>
                    Math.min(prev + 1, questions.length - 1),
                  );
                }
              }}
              disabled={!answers[currentQuestion.id]}
            >
              Next
            </button>
          </div>
        </form>
      )}

      {view === "snapshot" && (
        <Snapshot
          questions={questions}
          answers={answers}
          onSubmit={handleSubmit}
          onEdit={() => {
            setEditingFromSnapshot(true);
            setView("questionnaire");
          }}
          onReset={handleReset}
          onEditQuestion={handleEditQuestion}
        />
      )}

      {view === "score" && (
        <Score percentage={percentage} passed={passed} onReset={handleReset} />
      )}
    </main>
  );
}

export default App;
