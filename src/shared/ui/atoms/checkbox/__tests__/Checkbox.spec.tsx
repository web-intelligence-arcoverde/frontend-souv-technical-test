import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "../checkbox";

describe("Checkbox Atom", () => {
  it("renders correctly with default props", () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
  });

  it("calls onChange when clicked", () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies error styling when error prop is true", () => {
    render(<Checkbox error={true} data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).toHaveClass("border-error/50");
  });

  it("merges custom className correctly", () => {
    render(<Checkbox className="custom-checkbox" data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).toHaveClass("custom-checkbox");
  });
  
  it("can be controlled via checked prop", () => {
    const { rerender } = render(<Checkbox checked={true} readOnly data-testid="checkbox" />);
    expect(screen.getByTestId("checkbox")).toBeChecked();
    
    rerender(<Checkbox checked={false} readOnly data-testid="checkbox" />);
    expect(screen.getByTestId("checkbox")).not.toBeChecked();
  });
});
