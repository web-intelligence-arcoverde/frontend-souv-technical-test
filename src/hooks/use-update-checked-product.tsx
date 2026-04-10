"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/product";

interface MutationProps {
	id: string;
	listId: string;
	checked: boolean;
}

export const useUpdateProductChecked = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, listId, checked }: MutationProps) => {
			return ProductService.updateProductChecked(id, listId, checked);
		},
		onError: (error) => {
			console.error("Error:", error);
		},
		onSuccess: (_, { listId }) => {
			queryClient.invalidateQueries({ queryKey: ["shopping-list", listId] });
			queryClient.invalidateQueries({ queryKey: ["products", listId] });
		},
	});
};
