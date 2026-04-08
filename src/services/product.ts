import { ProductProps } from "@/types/product";
import api from "@/shared/api/axios";

const API_BASE_URL = "/product";

export const ProductService = {
  async getProducts(page: number, limit: number) {
    const response = await api.get(
      `${API_BASE_URL}?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  async createProduct(product: ProductProps) {
    const response = await api.post(API_BASE_URL, {
      ...product,
      checked: false,
    });
    return response.data;
  },

  async updateProductChecked(id: number, checked: boolean) {
    const response = await api.patch(`${API_BASE_URL}/${id}/checked`, {
      checked,
    });
    return response.data;
  },

  async deleteProduct(id: number) {
    const response = await api.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  },
};
