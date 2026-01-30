import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Question, { type Question as QuestionType } from "../Question";

describe("Question", () => {
  const baseQuestion: QuestionType = {
    id: "q1",
    prompt: "What is the capital of Canada?",
    options: ["Toronto", "Ottawa", "Montreal", "Vancouver"],
    answer: "Ottawa",
  };

  it("renders the prompt with id and question index", () => {
    render(
      <Question
        question={baseQuestion}
        index={0}
        total={4}
        answer={undefined}
        onSelect={() => {}}
      />,
    );

    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(
      screen.getByText("q1 - What is the capital of Canada?"),
    ).toBeInTheDocument();
  });

  it("calls onSelect when an option is chosen", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <Question
        question={baseQuestion}
        index={0}
        total={4}
        answer={undefined}
        onSelect={onSelect}
      />,
    );

    await user.click(screen.getByLabelText("Ottawa"));
    expect(onSelect).toHaveBeenCalledWith("Ottawa");
  });
});
