import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { CollectionCard } from "../collection-card";
import { useDeleteShoppingList } from "@/features/shopping-list";
import { useToast } from "@/hooks/use-toast";

// Mock hooks
jest.mock("@/features/shopping-list", () => ({
  useDeleteShoppingList: jest.fn(),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

jest.mock("@/lib/date-utils", () => ({
  formatRelativeTime: jest.fn().mockReturnValue("now"),
}));

describe("CollectionCard", () => {
  const mockProps = {
    id: "l1",
    title: "Feira Semanal",
    description: "Itens básicos",
    category: "Feira",
    variant: "primary" as const,
    totalItems: 10,
    securedItems: 5,
    items: [
      {
        id: "p1",
        name: "Tomato",
        quantity: 2,
        unit: "kg",
        category: "Hortifruti",
        marketName: "Carrefour",
        price: 5.5,
        checked: false,
      },
    ],
    lastModified: { _seconds: 0, _nanoseconds: 0 },
    onOpen: jest.fn(),
  };

  const mockDeleteList = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDeleteShoppingList as jest.Mock).mockReturnValue({
      mutate: mockDeleteList,
      isPending: false,
    });
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  it("renders basic information correctly", () => {
    render(<CollectionCard {...mockProps} />);
    
    expect(screen.getByText("Feira Semanal")).toBeInTheDocument();
    expect(screen.getByText("Itens básicos")).toBeInTheDocument();
    expect(screen.getByText("Feira")).toBeInTheDocument();
    expect(screen.getByText(/5 de 10 obtidos/i)).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("calls onOpen when 'Abrir Lista' is clicked", () => {
    render(<CollectionCard {...mockProps} />);
    
    const openButton = screen.getByText(/Abrir Lista/i);
    fireEvent.click(openButton);
    
    expect(mockProps.onOpen).toHaveBeenCalled();
  });

  it("calls deleteList when delete button is clicked and confirmed", () => {
    window.confirm = jest.fn().mockReturnValue(true);
    render(<CollectionCard {...mockProps} />);
    
    const deleteButton = screen.getByText("delete").closest("button")!;
    fireEvent.click(deleteButton);
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockDeleteList).toHaveBeenCalledWith("l1");
  });

  it("does not call deleteList if delete is cancelled", () => {
    window.confirm = jest.fn().mockReturnValue(false);
    render(<CollectionCard {...mockProps} />);
    
    const deleteButton = screen.getByText("delete").closest("button")!;
    fireEvent.click(deleteButton);
    
    expect(mockDeleteList).not.toHaveBeenCalled();
  });

  it("shows shared icon and copies link when shared prop is true", () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });

    render(<CollectionCard {...mockProps} shared={true} />);
    
    const shareButton = screen.getByText("share").closest("button")!;
    fireEvent.click(shareButton);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining("/shared/l1"));
  });
});
