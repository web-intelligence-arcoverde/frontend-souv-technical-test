import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdateProductChecked } from "../use-update-checked-product";
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

describe("useUpdateProductChecked", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call updateProductChecked and refetch queries after success", async () => {
    (ProductService.updateProductChecked as jest.Mock).mockResolvedValue({});

    const wrapper = createWrapper();
    const queryClient = (wrapper({ children: null }) as any).props.client as QueryClient;
    const refetchSpy = jest.spyOn(queryClient, "refetchQueries");

    const { result } = renderHook(() => useUpdateProductChecked(), { wrapper });

    result.current.mutate({ id: "p1", listId: "list-123", checked: true });

    await waitFor(() => expect(ProductService.updateProductChecked).toHaveBeenCalledWith("p1", true));

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
    (ProductService.updateProductChecked as jest.Mock).mockRejectedValue(new Error("Update failed"));

    const wrapper = createWrapper();
    const { result } = renderHook(() => useUpdateProductChecked(), { wrapper });

    result.current.mutate({ id: "p1", listId: "list-123", checked: false });

    await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith("Error:", expect.any(Error)));
    consoleSpy.mockRestore();
  });
});
