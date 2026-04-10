"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/product";
import type { ProductProps } from "@/types/product";

export const useCreateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ProductProps & { listId: string }) => {
			return ProductService.createProduct(data);
		},
		onError: (error) => {
			console.error("Error:", error);
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["shopping-list", variables.listId],
			});
			queryClient.invalidateQueries({
				queryKey: ["products", variables.listId],
			});
		},
	});
};
