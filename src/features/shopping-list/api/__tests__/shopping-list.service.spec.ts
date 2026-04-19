import api from "@/shared/api/axios";
import { ShoppingListService } from "../shopping-list.service";

// Mock the axios instance
jest.mock("@/shared/api/axios");

describe("ShoppingListService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getShoppingLists", () => {
    it("should fetch lists with all filter parameters", async () => {
      const mockResponse = { data: [] };
      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await ShoppingListService.getShoppingLists(1, 10, true, "feira", "standard");

      expect(api.get).toHaveBeenCalledWith("/shopping-list", {
        params: { page: 1, limit: 10, shared: true, category: "feira", variant: "standard" },
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("should fetch lists with partial parameters", async () => {
      const mockResponse = { data: [] };
      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      await ShoppingListService.getShoppingLists(undefined, undefined, false);

      expect(api.get).toHaveBeenCalledWith("/shopping-list", {
        params: { page: undefined, limit: undefined, shared: false, category: undefined, variant: undefined },
      });
    });
  });

  describe("getShoppingListById", () => {
    it("should fetch a specific list by id", async () => {
      const mockResponse = { data: { id: "l1", title: "Test List" } };
      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await ShoppingListService.getShoppingListById("l1");

      expect(api.get).toHaveBeenCalledWith("/shopping-list/l1");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getPublicShoppingListById", () => {
    it("should fetch a public list by id", async () => {
      const mockResponse = { data: { id: "l1", title: "Public List" } };
      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await ShoppingListService.getPublicShoppingListById("l1");

      expect(api.get).toHaveBeenCalledWith("/shopping-list/shared/l1");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("createShoppingList", () => {
    it("should create a new list", async () => {
      const mockData = { title: "New List" };
      const mockResponse = { data: { id: "l2", ...mockData } };
      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await ShoppingListService.createShoppingList(mockData);

      expect(api.post).toHaveBeenCalledWith("/shopping-list", mockData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("updateShoppingList", () => {
    it("should update an existing list", async () => {
      (api.patch as jest.Mock).mockResolvedValue({});

      await ShoppingListService.updateShoppingList("l1", { title: "Updated" });

      expect(api.patch).toHaveBeenCalledWith("/shopping-list/l1", { title: "Updated" });
    });
  });

  describe("deleteShoppingList", () => {
    it("should delete a list by id", async () => {
      (api.delete as jest.Mock).mockResolvedValue({});

      await ShoppingListService.deleteShoppingList("l1");

      expect(api.delete).toHaveBeenCalledWith("/shopping-list/l1");
    });
  });

  describe("addProductToList", () => {
    it("should add a product to a specific list", async () => {
      const mockProduct = { name: "Eggs" } as any;
      const mockResponse = { data: mockProduct };
      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await ShoppingListService.addProductToList("l1", mockProduct);

      expect(api.post).toHaveBeenCalledWith("/shopping-list/l1/product", mockProduct);
      expect(result).toEqual(mockResponse.data);
    });
  });
});
