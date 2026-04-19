import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SelectQuantity } from "../select-quantity";
import { useForm } from "react-hook-form";

// Helper component to provide react-hook-form context
const TestForm = ({ children }: { children: (control: any) => React.ReactNode }) => {
  const { control } = useForm({
    defaultValues: {
      quantity: { quantity: 1, unit: "un" }
    }
  });
  return <>{children(control)}</>;
};

describe("SelectQuantity", () => {
  it("renders correctly with initial quantity", () => {
    render(
      <TestForm>
        {(control) => (
          <SelectQuantity
            name="quantity"
            control={control}
          />
        )}
      </TestForm>
    );

    expect(screen.getByText(/Qtd:/i)).toBeInTheDocument();
    const input = screen.getByTitle("Quantidade") as HTMLInputElement;
    expect(input.value).toBe("1");
  });

  it("updates quantity value on input change", () => {
    render(
      <TestForm>
        {(control) => (
          <SelectQuantity
            name="quantity"
            control={control}
          />
        )}
      </TestForm>
    );

    const input = screen.getByTitle("Quantidade") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "5" } });
    expect(input.value).toBe("5");
  });

  it("shows error message when provided", () => {
    render(
      <TestForm>
        {(control) => (
          <SelectQuantity
            name="quantity"
            control={control}
            error="Invalid quantity"
          />
        )}
      </TestForm>
    );

    expect(screen.getByText(/Invalid quantity/i)).toBeInTheDocument();
    expect(screen.getByText(/Qtd:/i)).toHaveClass("text-red-400");
  });

  it("handles empty input as 0", () => {
    render(
      <TestForm>
        {(control) => (
          <SelectQuantity
            name="quantity"
            control={control}
          />
        )}
      </TestForm>
    );

    const input = screen.getByTitle("Quantidade") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("0"); // Component logic converts empty to 0
  });
});
