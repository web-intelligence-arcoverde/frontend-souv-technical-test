import { renderHook, act } from "@testing-library/react";
import { useRegisterProduct } from "../use-register-product";
import { useSearchParams } from "next/navigation";
import { useCreateProduct } from "@/hooks/use-create-product";
import { useToast } from "@/hooks/use-toast";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("@/hooks/use-create-product", () => ({
  useCreateProduct: jest.fn(),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

describe("useRegisterProduct", () => {
  const mockMutate = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue("list-123"),
    });
    (useCreateProduct as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useRegisterProduct());
    
    expect(result.current.isPending).toBe(false);
    expect(result.current.isValid).toBe(false); // Empty required fields
  });

  it("should call createProduct on onSubmit", async () => {
    const { result } = renderHook(() => useRegisterProduct());

    const formData = {
      item: "Tomato",
      marketName: "Local Market",
      price: 5.5,
      quantity: { unit: "kg", quantity: 2 },
      category: "Vegetables",
    };

    await act(async () => {
      result.current.onSubmit(formData);
    });

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Tomato",
        listId: "list-123",
        price: 5.5,
        quantity: 2,
        unit: "kg",
      }),
      expect.any(Object)
    );
  });

  it("should not call createProduct if listId is missing", async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    const { result } = renderHook(() => useRegisterProduct());

    await act(async () => {
      result.current.onSubmit({ item: "Milk" } as any);
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("should handle success and error with toasts", async () => {
    const { result } = renderHook(() => useRegisterProduct());
    
    // Simulate internal onSuccess call
    mockMutate.mockImplementation((_, options) => {
      options.onSuccess();
      options.onError();
    });

    await act(async () => {
      result.current.onSubmit({ item: "Milk", quantity: {} } as any);
    });

    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ variant: "success" }));
    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ variant: "destructive" }));
  });
});
