import api from "@/shared/api/axios";
import type { ProductProps } from "@/types/product";

const API_BASE_URL = "/product";

export const ProductService = {
	async getProducts(page: number, limit: number, listId: string) {
		const response = await api.get(
			`${API_BASE_URL}?page=${page}&limit=${limit}&listId=${listId}`,
		);
		return response.data;
	},

	async createProduct(product: ProductProps & { listId: string }) {
		const response = await api.post(API_BASE_URL, {
			...product,
			checked: false,
		});
		return response.data;
	},

	async updateProductChecked(id: string, listId: string, checked: boolean) {
		const response = await api.patch(`${API_BASE_URL}/${id}/toggle-checked`, {
			checked,
			listId,
		});
		return response.data;
	},

	async deleteProduct(id: string, listId: string) {
		const response = await api.delete(`${API_BASE_URL}/${id}?listId=${listId}`);
		return response.data;
	},
};
