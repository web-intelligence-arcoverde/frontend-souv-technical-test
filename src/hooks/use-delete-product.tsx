'use client'

import { ProductService } from "@/services/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MutationProps {
  id: string;
  listId: string;
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, listId }: MutationProps) => {
      return ProductService.deleteProduct(id, listId)
    },
    onError: (error) => {
      console.error('Error:', error);
    },
    onSuccess: (_, { listId }) => {
      queryClient.invalidateQueries({ queryKey: ["shopping-list", listId] });
      queryClient.invalidateQueries({ queryKey: ["products", listId] });
    },
  });
};
