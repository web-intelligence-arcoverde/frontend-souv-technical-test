"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingListService } from "../api/shopping-list.service";
import { SHOPPING_LIST_QUERY } from "@/shared/constants/query";

export const useDeleteShoppingList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ShoppingListService.deleteShoppingList(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [SHOPPING_LIST_QUERY] });
    },
  });
};
