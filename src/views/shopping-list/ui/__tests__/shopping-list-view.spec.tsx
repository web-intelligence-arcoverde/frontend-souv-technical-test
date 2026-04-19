import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { ShoppingListView } from "../shopping-list-view";

// Mock high-level components
jest.mock("@/shared/ui/templates/app-shell/app-shell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div data-testid="app-shell">{children}</div>,
}));

jest.mock("@/features/shopping-list", () => ({
  CollectionsGrid: ({ filters }: { filters: any }) => (
    <div data-testid="collections-grid">
      Grid Category: {filters.category || "none"}
    </div>
  ),
  FilterBar: ({ onFilterChange }: { onFilterChange: any }) => (
    <div data-testid="filter-bar">
      <button onClick={() => onFilterChange({ category: "feira" })}>Apply Filter</button>
    </div>
  ),
}));

describe("ShoppingListView", () => {
  it("renders correctly and manages filter state", () => {
    render(<ShoppingListView />);
    
    expect(screen.getByTestId("app-shell")).toBeInTheDocument();
    expect(screen.getByText(/Listas Compartilhadas/i)).toBeInTheDocument();
    expect(screen.getByTestId("collections-grid")).toHaveTextContent("Grid Category: none");

    // Simulate filter change
    const filterButton = screen.getByText(/Apply Filter/i);
    act(() => {
      filterButton.click();
    });

    expect(screen.getByTestId("collections-grid")).toHaveTextContent("Grid Category: feira");
  });
});
