"use client";

import { useSearchParams } from "next/navigation";
import { useDeleteProduct as useDeleteProductMutation } from "@/hooks/use-delete-product";
import { useToast } from "@/hooks/use-toast";

export const useDeleteProduct = (onSuccess?: () => void) => {
  const searchParams = useSearchParams();
  const listId = searchParams.get("listId");
  const { mutate: deleteMutation, isPending } = useDeleteProductMutation();
  const { toast } = useToast();

  const deleteProductItem = (id: string) => {
    if (!listId) return;

    deleteMutation(
      { id, listId },
      {
        onSuccess: () => {
          toast({
            title: "Item Removido",
            description: "O produto foi retirado da sua lista.",
            variant: "success",
          });
          onSuccess?.();
        },
        onError: () => {
          toast({
            title: "Erro ao remover",
            description: "Não foi possível remover o item agora.",
            variant: "destructive",
          });
        },
      },
    );
  };

  return { deleteProductItem, isPending };
};
