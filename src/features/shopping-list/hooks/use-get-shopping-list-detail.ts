"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingListService } from "../api/shopping-list.service";

export const useGetShoppingListDetail = (id: string | null) => {
	return useQuery({
		queryKey: ["shopping-list", id],
		queryFn: () => (id ? ShoppingListService.getShoppingListById(id) : null),
		enabled: !!id,
	});
};
