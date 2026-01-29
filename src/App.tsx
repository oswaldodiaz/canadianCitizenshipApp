import { useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import QuestionWrapper from "./components/QuestionWrapper";
import Score from "./components/Score";
import Snapshot from "./components/Snapshot";
import { fetchRandomQuestions } from "./data/questionFetcher";

type View = "start" | "questionnaire" | "snapshot" | "score";

function App() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState<View>("start");
  const [editingFromSnapshot, setEditingFromSnapshot] = useState(false);
  const [questions, setQuestions] = useState(() => fetchRandomQuestions());

  const completion = useMemo(() => {
    const answered = questions.filter(
      (question) => answers[question.id],
    ).length;
    return {
      answered,
      total: questions.length,
      percent: Math.round((answered / questions.length) * 100),
    };
  }, [answers, questions]);

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
    setView("score");
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setView("start");
    setEditingFromSnapshot(false);
    setQuestions(fetchRandomQuestions());
  };

  const handleEditQuestion = (questionId: string) => {
    const index = questions.findIndex((question) => question.id === questionId);
    if (index >= 0) {
      setCurrentIndex(index);
    }
    setEditingFromSnapshot(true);
    setView("questionnaire");
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setEditingFromSnapshot(false);
      setView("snapshot");
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
    }
  };

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
        <QuestionWrapper
          questions={questions}
          answers={answers}
          currentIndex={currentIndex}
          editingFromSnapshot={editingFromSnapshot}
          onSelect={handleSelect}
          onBack={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          onReset={handleReset}
          onFinishEditing={() => {
            setEditingFromSnapshot(false);
            setView("snapshot");
          }}
          onNext={handleNext}
        />
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
        <Score questions={questions} answers={answers} onReset={handleReset} />
      )}
    </main>
  );
}

export default App;
