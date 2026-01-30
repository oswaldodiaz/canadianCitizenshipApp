import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "../Header";

describe("Header", () => {
  it("renders instructions when enabled", () => {
    render(
      <Header
        answered={0}
        total={20}
        percent={0}
        showInstructions={true}
        showProgress={false}
      />,
    );

    expect(
      screen.getByText(/practice questionnaire mirrors the style/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/review your responses before you submit/i),
    ).toBeInTheDocument();
  });

  it("renders progress when enabled", () => {
    render(
      <Header
        answered={6}
        total={20}
        percent={30}
        showInstructions={false}
        showProgress={true}
      />,
    );

    expect(screen.getByText("6 of 20 answered")).toBeInTheDocument();
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "6");
    expect(progress).toHaveAttribute("aria-valuemax", "20");
  });
});
