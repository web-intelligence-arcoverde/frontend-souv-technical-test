'use client'

import { ProductService } from "@/services/product";
import { ProductProps } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductProps & { listId: string }) => {
      return ProductService.createProduct(data)
    },
    onError: (error) => {
      console.error('Error:', error);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["shopping-list", variables.listId] });
      queryClient.invalidateQueries({ queryKey: ["products", variables.listId] });
    },
  });
};
