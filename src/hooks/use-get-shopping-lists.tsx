"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingListService } from "@/services/shopping-list";

export const useGetShoppingLists = () => {
  return useQuery({
    queryKey: ["shopping-lists"],
    queryFn: () => ShoppingListService.getShoppingLists(),
  });
};
