"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/product";
import {
  SHOPPING_LIST_DETAIL_QUERY,
  SHOPPING_LIST_QUERY,
} from "@/shared/constants/query";

interface MutationProps {
  id: string;
  listId: string;
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: MutationProps) => {
      return ProductService.deleteProduct(id);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
    onSuccess: (_, { listId }) => {
      queryClient.refetchQueries({
        queryKey: [SHOPPING_LIST_DETAIL_QUERY, listId],
      });
      queryClient.refetchQueries({ queryKey: ["products", listId] });
      queryClient.refetchQueries({ queryKey: [SHOPPING_LIST_QUERY] });
    },
  });
};
