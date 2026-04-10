"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingListService } from "@/services/shopping-list";
import type { IShoppingList } from "@/types/shopping-list";

export const useCreateShoppingList = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Partial<IShoppingList>) =>
			ShoppingListService.createShoppingList(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["shopping-lists"] });
		},
	});
};
