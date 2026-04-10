"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingListService } from "@/services/shopping-list";

export const useGetShoppingListDetail = (id: string | null) => {
	return useQuery({
		queryKey: ["shopping-list", id],
		queryFn: () => (id ? ShoppingListService.getShoppingListById(id) : null),
		enabled: !!id,
	});
};
