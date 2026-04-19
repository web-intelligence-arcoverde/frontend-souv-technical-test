import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge Atom", () => {
  it("renders correctly with default variant", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-primary-container");
  });

  it("applies variant classes correctly", () => {
    const { rerender } = render(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText("Secondary")).toHaveClass("bg-secondary-container");

    rerender(<Badge variant="tertiary">Tertiary</Badge>);
    expect(screen.getByText("Tertiary")).toHaveClass("bg-tertiary-container");

    rerender(<Badge variant="error">Error</Badge>);
    expect(screen.getByText("Error")).toHaveClass("bg-error-container");

    rerender(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toHaveClass("border-outline-variant/30");

    rerender(<Badge variant="premium">Premium</Badge>);
    expect(screen.getByText("Premium")).toHaveClass("backdrop-blur-md");
  });

  it("merges custom className correctly", () => {
    render(<Badge className="custom-class">Badge</Badge>);
    expect(screen.getByText("Badge")).toHaveClass("custom-class");
  });
});
