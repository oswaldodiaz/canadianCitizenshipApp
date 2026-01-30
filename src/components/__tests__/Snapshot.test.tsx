import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Snapshot from "../Snapshot";
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

describe("Snapshot", () => {
  it("renders answers and wires actions", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onEdit = vi.fn();
    const onReset = vi.fn();
    const onEditQuestion = vi.fn();

    render(
      <Snapshot
        questions={questions}
        answers={{ q1: "A", q2: "C" }}
        onSubmit={onSubmit}
        onEdit={onEdit}
        onReset={onReset}
        onEditQuestion={onEditQuestion}
      />,
    );

    expect(screen.getByText("Question one?")).toBeInTheDocument();
    expect(screen.getByText("Question two?")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Edit answers" }));
    expect(onEdit).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Start over" }));
    expect(onReset).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);

    await user.click(
      screen.getByRole("button", {
        name: "Edit answer for Question one?",
      }),
    );
    expect(onEditQuestion).toHaveBeenCalledWith("q1");
  });
});
