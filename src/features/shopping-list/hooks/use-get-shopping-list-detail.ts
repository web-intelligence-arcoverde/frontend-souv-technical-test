"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingListService } from "../api/shopping-list.service";
import { SHOPPING_LIST_DETAIL_QUERY } from "@/shared/constants/query";

export const useGetShoppingListDetail = (id: string | null) => {
	return useQuery({
		queryKey: [SHOPPING_LIST_DETAIL_QUERY, id],
		queryFn: () => (id ? ShoppingListService.getShoppingListById(id) : null),
		enabled: !!id,
	});
};
