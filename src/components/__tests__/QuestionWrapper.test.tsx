import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import QuestionWrapper from "../QuestionWrapper";
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
];

describe("QuestionWrapper", () => {
  it("disables Next until the current question is answered", () => {
    render(
      <QuestionWrapper
        questions={questions}
        answers={{}}
        currentIndex={0}
        editingFromSnapshot={false}
        onSelect={() => {}}
        onBack={() => {}}
        onReset={() => {}}
        onFinishEditing={() => {}}
        onNext={() => {}}
      />,
    );

    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("calls onSelect when an option is chosen", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <QuestionWrapper
        questions={questions}
        answers={{}}
        currentIndex={0}
        editingFromSnapshot={false}
        onSelect={onSelect}
        onBack={() => {}}
        onReset={() => {}}
        onFinishEditing={() => {}}
        onNext={() => {}}
      />,
    );

    await user.click(screen.getByLabelText("A"));
    expect(onSelect).toHaveBeenCalledWith("q1", "A");
  });

  it("shows navigation actions and wires callbacks", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    const onReset = vi.fn();
    const onFinishEditing = vi.fn();
    const onNext = vi.fn();

    render(
      <QuestionWrapper
        questions={questions}
        answers={{ q1: "A", q2: "B" }}
        currentIndex={1}
        editingFromSnapshot={true}
        onSelect={() => {}}
        onBack={onBack}
        onReset={onReset}
        onFinishEditing={onFinishEditing}
        onNext={onNext}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(onBack).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Reset answers" }));
    expect(onReset).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Finish" }));
    expect(onFinishEditing).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
