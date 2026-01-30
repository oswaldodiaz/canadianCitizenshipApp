import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Score from "../Score";
import type { Question } from "../Question";

const questions: Question[] = [
  {
    id: "q1",
    prompt: "Question one?",
    options: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    id: "q2",
    prompt: "Question two?",
    options: ["A", "B", "C", "D"],
    answer: "B",
  },
  {
    id: "q3",
    prompt: "Question three?",
    options: ["A", "B", "C", "D"],
    answer: "C",
  },
  {
    id: "q4",
    prompt: "Question four?",
    options: ["A", "B", "C", "D"],
    answer: "D",
  },
];

describe("Score", () => {
  it("shows a passing result when at or above 75%", () => {
    const answers = { q1: "A", q2: "B", q3: "C", q4: "A" };

    render(
      <Score questions={questions} answers={answers} onReset={() => {}} />,
    );

    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("Passed")).toBeInTheDocument();
    expect(screen.getByText(/Great work!/i)).toBeInTheDocument();
    expect(screen.getByText("Answer review")).toBeInTheDocument();
  });

  it("shows a failing result when below 75%", () => {
    const answers = { q1: "A", q2: "B", q3: "A", q4: "A" };

    render(
      <Score questions={questions} answers={answers} onReset={() => {}} />,
    );

    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("Failed")).toBeInTheDocument();
    expect(screen.getByText(/close/i)).toBeInTheDocument();
    expect(screen.getAllByText("Correct").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Incorrect").length).toBeGreaterThan(0);
  });
});
