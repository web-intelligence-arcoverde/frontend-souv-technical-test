"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/product";
import type { ProductProps } from "@/types/product";
import type { IShoppingList } from "@/types/shopping-list";
import {
  SHOPPING_LIST_DETAIL_QUERY,
  SHOPPING_LIST_QUERY,
} from "@/shared/constants/query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductProps & { listId: string }) => {
      return ProductService.createProduct(data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
    onSuccess: (novoProduto: ProductProps, variables) => {
      // Update the list details cache optimistically
      queryClient.setQueryData<IShoppingList>(
        [SHOPPING_LIST_DETAIL_QUERY, variables.listId],
        (oldList) => {
          if (!oldList) return oldList;
          return {
            ...oldList,
            items: [...(oldList.items || []), novoProduto],
            totalItems: (oldList.totalItems || 0) + 1,
          };
        },
      );

      // Delay refetching to give the backend worker time to process
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [SHOPPING_LIST_DETAIL_QUERY, variables.listId],
        });
        queryClient.invalidateQueries({ queryKey: ["products", variables.listId] });
        queryClient.invalidateQueries({ queryKey: [SHOPPING_LIST_QUERY] });
      }, 2000);
    },
  });
};
