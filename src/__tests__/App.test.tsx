import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import App from "../App";
import type { Question } from "../components/Question";
import { fetchRandomQuestions } from "../data/questionFetcher";

vi.mock("../data/questionFetcher", () => ({
  fetchRandomQuestions: vi.fn(),
}));

const questionsSet: Question[] = [
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

const mockedFetch = vi.mocked(fetchRandomQuestions);

describe("App", () => {
  it("walks through questionnaire to score and resets", async () => {
    const user = userEvent.setup();
    mockedFetch.mockReturnValue(questionsSet);
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Start" }));

    await user.click(screen.getByLabelText("A"));
    await user.click(screen.getByRole("button", { name: "Next" }));

    await user.click(screen.getByLabelText("B"));
    expect(screen.getByText("Your answers")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(screen.getByText("Score result")).toBeInTheDocument();
    expect(screen.getByText("Answer review")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Start over" }));
    expect(mockedFetch).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
  });
});
