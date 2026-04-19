"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingListService } from "../api/shopping-list.service";
import { SHOPPING_LIST_QUERY } from "@/shared/constants/query";

export const useGetShoppingLists = (
  page?: number,
  limit?: number,
  shared?: boolean,
  category?: string,
  variant?: string
) => {
  return useQuery({
    queryKey: [SHOPPING_LIST_QUERY, page, limit, shared, category, variant],
    queryFn: () =>
      ShoppingListService.getShoppingLists(
        page,
        limit,
        shared,
        category,
        variant
      ),
  });
};
