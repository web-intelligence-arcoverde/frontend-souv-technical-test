import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { SelectCategory } from "../select-category";
import { useForm } from "react-hook-form";

// Helper component to provide react-hook-form context
const TestForm = ({ children }: { children: (control: any) => React.ReactNode }) => {
  const { control } = useForm();
  return <>{children(control)}</>;
};

const mockOptions = [
  { value: "cat1", label: "Category 1", icon: <span>Icon 1</span> },
  { value: "cat2", label: "Category 2", icon: <span>Icon 2</span> },
];

describe("SelectCategory", () => {
  it("renders correctly with label and placeholder", () => {
    render(
      <TestForm>
        {(control) => (
          <SelectCategory
            label="Category Label"
            name="category"
            control={control}
            options={mockOptions}
            placeholder="Choose one"
          />
        )}
      </TestForm>
    );

    expect(screen.getByText(/Category Label/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose one/i)).toBeInTheDocument();
  });

  it("shows error message when provided", () => {
    render(
      <TestForm>
        {(control) => (
          <SelectCategory
            label="Category Label"
            name="category"
            control={control}
            options={mockOptions}
            error="Please select a category"
          />
        )}
      </TestForm>
    );

    expect(screen.getByText(/Please select a category/i)).toBeInTheDocument();
  });

  // Note: Testing the actual dropdown content can be complex due to Radix UI Portals
  // but we can verify the trigger interaction if needed.
});
