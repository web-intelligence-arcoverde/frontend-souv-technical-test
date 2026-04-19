import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetShoppingLists } from "../use-get-shopping-lists";
import { ShoppingListService } from "../../api/shopping-list.service";

// Mock the service
jest.mock("../../api/shopping-list.service");

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

describe("useGetShoppingLists", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch shopping lists with filters", async () => {
    const mockData = [{ id: "l1", title: "List 1" }];
    (ShoppingListService.getShoppingLists as jest.Mock).mockResolvedValue(mockData);

    const wrapper = createWrapper();
    const { result } = renderHook(
      () => useGetShoppingLists(1, 10, true, "feira", "main"),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(ShoppingListService.getShoppingLists).toHaveBeenCalledWith(
      1, 10, true, "feira", "main"
    );
    expect(result.current.data).toEqual(mockData);
  });

  it("should have correct queryKey", async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(
      () => useGetShoppingLists(2, 20),
      { wrapper }
    );

    expect(result.current.status).toBe("pending");
    // The queryKey is internal to useQuery, but we can verify params passed to service
    await waitFor(() => expect(ShoppingListService.getShoppingLists).toHaveBeenCalledWith(
      2, 20, undefined, undefined, undefined
    ));
  });
});
