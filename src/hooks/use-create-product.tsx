"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/product";
import type { ProductProps } from "@/types/product";
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
    onSuccess: (_: ProductProps, variables) => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [SHOPPING_LIST_DETAIL_QUERY, variables.listId],
        });
        queryClient.invalidateQueries({
          queryKey: ["products", variables.listId],
        });
        queryClient.invalidateQueries({ queryKey: [SHOPPING_LIST_QUERY] });
      }, 2000);
    },
  });
};
