"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingListService } from "@/services/shopping-list";

export const useGetShoppingLists = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ["shopping-lists", page, limit],
    queryFn: () => ShoppingListService.getShoppingLists(page, limit),
  });
};
