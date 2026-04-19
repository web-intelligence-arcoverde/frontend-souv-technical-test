import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDeleteProduct } from "../use-delete-product";
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

describe("useDeleteProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call deleteProduct and refetch queries after success", async () => {
    (ProductService.deleteProduct as jest.Mock).mockResolvedValue({});

    const wrapper = createWrapper();
    const queryClient = (wrapper({ children: null }) as any).props.client as QueryClient;
    const refetchSpy = jest.spyOn(queryClient, "refetchQueries");

    const { result } = renderHook(() => useDeleteProduct(), { wrapper });

    result.current.mutate({ id: "p1", listId: "list-123" });

    await waitFor(() => expect(ProductService.deleteProduct).toHaveBeenCalledWith("p1"));

    expect(refetchSpy).toHaveBeenCalledWith({
      queryKey: [SHOPPING_LIST_DETAIL_QUERY, "list-123"],
    });
    expect(refetchSpy).toHaveBeenCalledWith({
      queryKey: ["products", "list-123"],
    });
    expect(refetchSpy).toHaveBeenCalledWith({ queryKey: [SHOPPING_LIST_QUERY] });
  });

  it("should log error on failure", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    (ProductService.deleteProduct as jest.Mock).mockRejectedValue(new Error("Delete failed"));

    const wrapper = createWrapper();
    const { result } = renderHook(() => useDeleteProduct(), { wrapper });

    result.current.mutate({ id: "p1", listId: "list-123" });

    await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith("Error:", expect.any(Error)));
    consoleSpy.mockRestore();
  });
});
