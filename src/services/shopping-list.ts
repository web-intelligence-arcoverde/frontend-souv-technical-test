import api from "@/shared/api/axios";
import { ProductProps } from "@/types/product";
import { IShoppingList } from "@/types/shopping-list";

const API_BASE_URL = "/shopping-list";

export const ShoppingListService = {
  async getShoppingLists(page?: number, limit?: number): Promise<IShoppingList[]> {
    const response = await api.get(API_BASE_URL, {
      params: { page, limit }
    });
    return response.data;
  },

  async getShoppingListById(id: string): Promise<IShoppingList> {
    const response = await api.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  async getPublicShoppingListById(id: string): Promise<IShoppingList> {
    const response = await api.get(`${API_BASE_URL}/shared/${id}`);
    return response.data;
  },

  async createShoppingList(data: Partial<IShoppingList>): Promise<IShoppingList> {
    const response = await api.post(API_BASE_URL, data);
    return response.data;
  },

  async updateShoppingList(id: string, data: Partial<IShoppingList>): Promise<void> {
    await api.patch(`${API_BASE_URL}/${id}`, data);
  },

  async deleteShoppingList(id: string): Promise<void> {
    await api.delete(`${API_BASE_URL}/${id}`);
  },

  async addProductToList(id: string, product: ProductProps): Promise<ProductProps> {
    const response = await api.post<ProductProps>(`${API_BASE_URL}/${id}/product`, product);
    return response.data;
  }
};
