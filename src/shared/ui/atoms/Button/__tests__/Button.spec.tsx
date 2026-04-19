import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button Atom", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary"); // default variant
  });

  it("applies variant classes correctly", () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-error");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-outline-variant/20");

    rerender(<Button variant="premium-gradient">Premium</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-gradient");
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-9");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-14");

    rerender(<Button size="full">Full</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("shows loading state and disables the button", () => {
    render(<Button isLoading={true}>Submit</Button>);
    const button = screen.getByRole("button");
    
    expect(button).toBeDisabled();
    expect(screen.getByText("sync")).toBeInTheDocument(); // material symbol name
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as a different element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    
    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveClass("bg-primary"); // should still have button variant classes
  });
});
