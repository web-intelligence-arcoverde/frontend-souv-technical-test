import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchForm } from "../SearchForm";

describe("SearchForm", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it("renders correctly with placeholder", () => {
    render(<SearchForm onSearch={mockOnSearch} placeholder="Find items..." />);
    
    expect(screen.getByPlaceholderText(/Find items.../i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });

  it("initializes with initialValue", () => {
    render(<SearchForm onSearch={mockOnSearch} initialValue="Initial Query" />);
    
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("Initial Query");
  });

  it("updates state on input change", () => {
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/Search.../i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New Search" } });
    
    expect(input.value).toBe("New Search");
  });

  it("calls onSearch with current query when submitted", () => {
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(input, { target: { value: "Test Query" } });
    
    fireEvent.submit(screen.getByRole("button", { name: /Search/i }).closest("form")!);
    
    expect(mockOnSearch).toHaveBeenCalledWith("Test Query");
  });

  it("prevents default form submission and calls onSearch", () => {
    render(<SearchForm onSearch={mockOnSearch} />);
    
    fireEvent.submit(screen.getByRole("button", { name: /Search/i }));
    
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
