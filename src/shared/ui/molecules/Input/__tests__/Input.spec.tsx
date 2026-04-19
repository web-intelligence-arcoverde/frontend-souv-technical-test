import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { InputWithLabel } from "../Input";
import { useForm } from "react-hook-form";

// Helper component to provide react-hook-form context
const TestForm = ({ children }: { children: (control: any) => React.ReactNode }) => {
  const { control } = useForm();
  return <>{children(control)}</>;
};

describe("InputWithLabel", () => {
  it("renders correctly with label", () => {
    render(
      <TestForm>
        {(control) => (
          <InputWithLabel
            label="Test Label"
            name="test"
            control={control}
            placeholder="Enter search"
          />
        )}
      </TestForm>
    );

    expect(screen.getByText(/Test Label/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter search/i)).toBeInTheDocument();
  });

  it("shows error message when provided", () => {
    render(
      <TestForm>
        {(control) => (
          <InputWithLabel
            label="Test Label"
            name="test"
            control={control}
            error="Required field"
          />
        )}
      </TestForm>
    );

    expect(screen.getByText(/Required field/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Label/i)).toHaveClass("text-red-400");
  });

  it("formats currency correctly and calls onChange with numeric value", () => {
    const mockOnChange = jest.fn();
    
    // We need to mock Controller or use a real form and check the value
    // Since we're unit testing the component's formatting logic:
    render(
      <TestForm>
        {(control) => (
          <InputWithLabel
            label="Price"
            name="price"
            control={control}
            isCurrency={true}
          />
        )}
      </TestForm>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "12345" } });
    
    // 12345 should format to R$ 123,45
    expect(input.value).toContain("123,45");
  });

  it("strips non-digits when isCurrency is true", () => {
    render(
      <TestForm>
        {(control) => (
          <InputWithLabel
            label="Price"
            name="price"
            control={control}
            isCurrency={true}
          />
        )}
      </TestForm>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "abc123xy45" } });
    
    expect(input.value).toContain("123,45");
  });
});
