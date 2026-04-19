import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Spinner } from "../loading";

describe("Spinner Atom", () => {
  it("renders correctly by default", () => {
    // Spinner uses lucide-react Loader2
    const { container } = render(<Spinner />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("text-primary");
  });

  it("applies size classes correctly", () => {
    const { rerender, container } = render(<Spinner size="small" />);
    expect(container.querySelector(".size-6")).toBeInTheDocument();

    rerender(<Spinner size="large" />);
    expect(container.querySelector(".size-12")).toBeInTheDocument();
  });

  it("hides when show is false", () => {
    const { container } = render(<Spinner show={false} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("hidden");
  });

  it("renders children as label", () => {
    render(<Spinner>Loading data...</Spinner>);
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    const { container } = render(<Spinner className="custom-spinner" />);
    expect(container.querySelector(".custom-spinner")).toBeInTheDocument();
  });
});
