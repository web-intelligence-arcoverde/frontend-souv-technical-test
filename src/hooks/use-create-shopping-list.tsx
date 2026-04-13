"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingListService } from "@/services/shopping-list";
import type { IShoppingList } from "@/types/shopping-list";
import { SHOPPING_LIST_QUERY } from "@/shared/constants/query";

export const useCreateShoppingList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<IShoppingList>) =>
      ShoppingListService.createShoppingList(data),
    onSuccess: (novaLista: any) => {
      const agora = new Date();
      const timestampFallback = {
        _seconds: Math.floor(agora.getTime() / 1000),
        _nanoseconds: (agora.getTime() % 1000) * 1e6,
      };

      const listaNormalizada = {
        ...novaLista,
        lastModified: novaLista.lastModified
          ? timestampFallback
          : timestampFallback,
        createdAt: novaLista.createdAt || timestampFallback,
      };

      queryClient.setQueriesData<IShoppingList[]>(
        { queryKey: [SHOPPING_LIST_QUERY] },
        (dadosAntigos) => {
          if (!dadosAntigos) return [listaNormalizada];
          if (dadosAntigos.some((l) => l.id === listaNormalizada.id))
            return dadosAntigos;
          return [listaNormalizada, ...dadosAntigos];
        },
      );

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [SHOPPING_LIST_QUERY] });
      }, 2000);
    },
  });
};
