import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCreateProduct } from "../use-create-product";
import { ProductService } from "@/services/product";
import {
  SHOPPING_LIST_DETAIL_QUERY,
  SHOPPING_LIST_QUERY,
} from "@/shared/constants/query";

// Mock the ProductService
jest.mock("@/services/product");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useCreateProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should call createProduct and invalidate queries after success", async () => {
    const mockProduct = { name: "Milk", listId: "list-123" } as any;
    (ProductService.createProduct as jest.Mock).mockResolvedValue({ id: "p1", ...mockProduct });

    const wrapper = createWrapper();
    const queryClient = (wrapper({ children: null }) as any).props.client as QueryClient;
    const invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useCreateProduct(), { wrapper });

    result.current.mutate(mockProduct);

    await waitFor(() => expect(ProductService.createProduct).toHaveBeenCalledWith(mockProduct));

    // Test the onSuccess delay
    jest.advanceTimersByTime(2001);

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: [SHOPPING_LIST_DETAIL_QUERY, "list-123"],
    });
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["products", "list-123"],
    });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: [SHOPPING_LIST_QUERY] });
  });

  it("should log error on failure", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    (ProductService.createProduct as jest.Mock).mockRejectedValue(new Error("API Error"));

    const wrapper = createWrapper();
    const { result } = renderHook(() => useCreateProduct(), { wrapper });

    result.current.mutate({ name: "Milk", listId: "list-123" } as any);

    await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith("Error:", expect.any(Error)));
    consoleSpy.mockRestore();
  });
});
