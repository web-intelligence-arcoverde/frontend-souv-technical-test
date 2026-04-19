import api from "@/shared/api/axios";
import { ProductService } from "../product";

// Mock the axios instance
jest.mock("@/shared/api/axios");

describe("ProductService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("should fetch products with correct parameters", async () => {
      const mockResponse = { data: { products: [], total: 0 } };
      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await ProductService.getProducts(1, 10, "list-123");

      expect(api.get).toHaveBeenCalledWith("/product?page=1&limit=10&listId=list-123");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("createProduct", () => {
    it("should create a product and set checked to false", async () => {
      const mockProduct = { name: "Milk", listId: "list-123" } as any;
      const mockResponse = { data: { id: "p1", ...mockProduct, checked: false } };
      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await ProductService.createProduct(mockProduct);

      expect(api.post).toHaveBeenCalledWith("/product", {
        ...mockProduct,
        checked: false,
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("updateProductChecked", () => {
    it("should update product checked status correctly", async () => {
      const mockResponse = { data: { success: true } };
      (api.patch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await ProductService.updateProductChecked("p1", true);

      expect(api.patch).toHaveBeenCalledWith("/product/p1/toggle-checked", {
        checked: true,
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product by id", async () => {
      const mockResponse = { data: { success: true } };
      (api.delete as jest.Mock).mockResolvedValue(mockResponse);

      const result = await ProductService.deleteProduct("p1");

      expect(api.delete).toHaveBeenCalledWith("/product/p1");
      expect(result).toEqual(mockResponse.data);
    });
  });
});
