"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingListService } from "@/services/shopping-list";
import { SHOPPING_LIST_QUERY } from "@/shared/constants/query";

export const useGetShoppingLists = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: [SHOPPING_LIST_QUERY, page, limit],
    queryFn: () => ShoppingListService.getShoppingLists(page, limit),
  });
};
