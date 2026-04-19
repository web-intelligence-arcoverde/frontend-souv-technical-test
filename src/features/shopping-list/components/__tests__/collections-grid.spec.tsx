import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { CollectionsGrid } from "../collections-grid";
import { useGetShoppingLists } from "../../hooks/use-get-shopping-lists";
import { useRouter } from "next/navigation";

// Mock dependencies
jest.mock("../../hooks/use-get-shopping-lists");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock sub-components to focus on CollectionsGrid logic
jest.mock("../../ui/skeleton-card/skeleton-card-shopping-list", () => ({
  SkeletonCardShoppingList: () => <div data-testid="loading-skeleton">Loading...</div>,
}));
jest.mock("../../ui/error-card/error-card-shopping-list", () => ({
  ErrorCardShoppingList: () => <div data-testid="error-card">Error</div>,
}));
jest.mock("../../ui/empty-list/empty-shopping-list", () => ({
  EmptyShoppingList: () => <div data-testid="empty-list">Empty</div>,
}));
jest.mock("@/shared/ui/molecules/collection-card/collection-card", () => ({
  CollectionCard: ({ title, onOpen }: any) => (
    <div data-testid="collection-card">
      <h3>{title}</h3>
      <button onClick={onOpen}>Open</button>
    </div>
  ),
}));

describe("CollectionsGrid Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("shows loading skeleton when data is loading", () => {
    (useGetShoppingLists as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<CollectionsGrid />);
    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  it("shows error card when there is an error", () => {
    (useGetShoppingLists as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Fail"),
    });

    render(<CollectionsGrid />);
    expect(screen.getByTestId("error-card")).toBeInTheDocument();
  });

  it("shows empty list when data is empty on page 1", () => {
    (useGetShoppingLists as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<CollectionsGrid />);
    expect(screen.getByTestId("empty-list")).toBeInTheDocument();
  });

  it("renders collection cards when data is available", () => {
    const mockData = [
      { id: "1", title: "List 1" },
      { id: "2", title: "List 2" },
    ];
    (useGetShoppingLists as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(<CollectionsGrid />);
    
    const cards = screen.getAllByTestId("collection-card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("List 1")).toBeInTheDocument();
  });

  it("navigates to products page when card is opened", () => {
    const mockData = [{ id: "123", title: "Test List" }];
    (useGetShoppingLists as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(<CollectionsGrid />);
    
    fireEvent.click(screen.getByText("Open"));
    expect(mockPush).toHaveBeenCalledWith("/products?listId=123");
  });

  it("handles pagination correctly", () => {
    const mockDataPage1 = Array.from({ length: 6 }, (_, i) => ({ id: `${i}`, title: `List ${i}` }));
    const mockDataPage2 = [{ id: "6", title: "List 6" }];

    (useGetShoppingLists as jest.Mock)
      .mockReturnValueOnce({ data: mockDataPage1, isLoading: false, error: null })
      .mockReturnValueOnce({ data: mockDataPage2, isLoading: false, error: null });

    render(<CollectionsGrid />);
    
    expect(screen.getByText("Página 1")).toBeInTheDocument();
    
    const nextButton = screen.getByText(/Próximo/i);
    fireEvent.click(nextButton);
    
    // Page state updates, trigger re-render
    expect(useGetShoppingLists).toHaveBeenCalledWith(2, 6, undefined, undefined, undefined);
  });
});
