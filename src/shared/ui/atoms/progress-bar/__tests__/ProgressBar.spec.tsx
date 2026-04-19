import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProgressBar } from "../progress-bar";

describe("ProgressBar Atom", () => {
  it("renders correctly with given value", () => {
    const { container } = render(<ProgressBar value={45} />);
    const innerDiv = container.querySelector(".h-full.rounded-full") as HTMLElement;
    expect(innerDiv).toBeInTheDocument();
    expect(innerDiv.style.width).toBe("45%");
  });

  it("normalizes values between 0 and 100", () => {
    const { rerender } = render(<ProgressBar value={150} />);
    let innerDiv = document.querySelector(".h-full.rounded-full") as HTMLElement;
    expect(innerDiv.style.width).toBe("100%");

    rerender(<ProgressBar value={-50} />);
    innerDiv = document.querySelector(".h-full.rounded-full") as HTMLElement;
    expect(innerDiv.style.width).toBe("0%");
  });

  it("applies variant classes correctly", () => {
    const { rerender } = render(<ProgressBar value={50} variant="secondary" />);
    let innerDiv = document.querySelector(".h-full.rounded-full") as HTMLElement;
    expect(innerDiv).toHaveClass("bg-secondary");

    rerender(<ProgressBar value={50} variant="error" />);
    innerDiv = document.querySelector(".h-full.rounded-full") as HTMLElement;
    expect(innerDiv).toHaveClass("bg-error");
  });

  it("shows glow by default and hides it when showGlow is false", () => {
    const { rerender } = render(<ProgressBar value={50} variant="primary" />);
    let innerDiv = document.querySelector(".h-full.rounded-full") as HTMLElement;
    expect(innerDiv).toHaveClass("shadow-[0_0_12px_rgba(204,151,255,0.4)]");

    rerender(<ProgressBar value={50} variant="primary" showGlow={false} />);
    innerDiv = document.querySelector(".h-full.rounded-full") as HTMLElement;
    expect(innerDiv).not.toHaveClass("shadow-[0_0_12px_rgba(204,151,255,0.4)]");
  });
});
