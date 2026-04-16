"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingListService } from "../api/shopping-list.service";
import type { IShoppingList } from "../types/shopping-list";
import { SHOPPING_LIST_QUERY } from "@/shared/constants/query";

export const useCreateShoppingList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<IShoppingList>) =>
      ShoppingListService.createShoppingList(data),
    onSuccess: async () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [SHOPPING_LIST_QUERY] });
      }, 1000);
    },
  });
};
