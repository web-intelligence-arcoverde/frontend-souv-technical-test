import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterBar } from "../filter-bar";
import { SHOPPING_LIST_TYPES } from "../../constants/shopping-list-types";

describe("FilterBar Component", () => {
  const mockOnFilterChange = jest.fn();
  const defaultFilters = { category: undefined, shared: false, variant: undefined };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default filters", () => {
    render(<FilterBar filters={defaultFilters} onFilterChange={mockOnFilterChange} />);
    
    expect(screen.getByText("Todas as Categorias")).toBeInTheDocument();
    SHOPPING_LIST_TYPES.forEach((type) => {
      expect(screen.getByText(type.label)).toBeInTheDocument();
    });
    expect(screen.getByText("Compartilhadas")).toBeInTheDocument();
  });

  it("calls onFilterChange when a category is selected", () => {
    render(<FilterBar filters={defaultFilters} onFilterChange={mockOnFilterChange} />);
    
    const firstCategory = SHOPPING_LIST_TYPES[0];
    const categoryButton = screen.getByText(firstCategory.label).closest("button")!;
    
    fireEvent.click(categoryButton);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      category: firstCategory.id,
    });
  });

  it("calls onFilterChange to clear category when 'Todas as Categorias' is clicked", () => {
    const filtersWithCategory = { ...defaultFilters, category: "feira" };
    render(<FilterBar filters={filtersWithCategory} onFilterChange={mockOnFilterChange} />);
    
    const clearButton = screen.getByText("Todas as Categorias");
    fireEvent.click(clearButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      category: undefined,
    });
  });

  it("toggles shared filter correctly", () => {
    const { rerender } = render(<FilterBar filters={defaultFilters} onFilterChange={mockOnFilterChange} />);
    
    const sharedButton = screen.getByText("Compartilhadas").closest("button")!;
    fireEvent.click(sharedButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      shared: true,
    });

    rerender(<FilterBar filters={{ ...defaultFilters, shared: true }} onFilterChange={mockOnFilterChange} />);
    fireEvent.click(sharedButton);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      shared: false,
    });
  });

  it("applies active styling to the selected category", () => {
    const activeCategory = SHOPPING_LIST_TYPES[0].id;
    render(<FilterBar filters={{ ...defaultFilters, category: activeCategory }} onFilterChange={mockOnFilterChange} />);
    
    const activeButton = screen.getByText(SHOPPING_LIST_TYPES[0].label).closest("button")!;
    expect(activeButton).toHaveClass("bg-primary");
    
    const inactiveButton = screen.getByText("Todas as Categorias");
    expect(inactiveButton).not.toHaveClass("bg-primary");
  });
});
