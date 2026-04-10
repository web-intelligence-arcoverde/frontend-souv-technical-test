"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingListService } from "@/services/shopping-list";

export const useDeleteShoppingList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ShoppingListService.deleteShoppingList(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-lists"] });
    },
  });
};
