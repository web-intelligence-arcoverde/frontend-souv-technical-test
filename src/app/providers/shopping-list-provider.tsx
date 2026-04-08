"use client";

import { useCreateProduct } from "@/hooks/use-create-product";
import { useDeleteProduct } from "@/hooks/use-delete-product";
import { useGetProducts } from "@/hooks/use-get-product";
import { useUpdateProductChecked } from "@/hooks/use-update-checked-product";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define o tipo para um item de produto
type ProductItem = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
  position: number;
};

interface Pagination {
  page: number;
  limit: number;
  data: ProductItem[];
  currentPage: number,
  totalPages: number,
}

// Define o tipo para o contexto
type ShoppingListContextType = {
  addItem: (item: Partial<ProductItem>) => void;
  deleteItem: (id: number) => void;
  toggleItemChecked: (id: number) => void;
  products: Pagination;
  isLoading: boolean;
  isError: boolean;
  handleNextPage: () => void;
  handlePreviuesPage: () => void;
};

// Cria o contexto
const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

// Componente Provider
export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data: products, isLoading, isError } = useGetProducts(page, limit);

  console.log(page)

  const handlePreviuesPage = () => {
    const { totalPages } = products
    console.log('aq', page, totalPages)
    if (page >= 1 && page <= totalPages) {
      setPage((oldPage) => oldPage - 1)
    }
  }

  const handleNextPage = () => {
    const { totalPages } = products
    if (page < totalPages) {
      setPage((oldPage) => oldPage + 1)
    }
  }


  const updateProductCheckedMutation = useUpdateProductChecked();
  const deleteProductMutation = useDeleteProduct()
  const createProductMutation = useCreateProduct()

  const addItem = (item: Partial<ProductItem>) => {
    //@ts-expect-error: mutation expects full item but Partial is passed
    createProductMutation.mutate(item)
  };

  const toggleItemChecked = (id: number) => {
    const findProduct = products.data.find(
      (item: ProductItem) => item.id === id
    );
    updateProductCheckedMutation.mutate({ id, checked: !findProduct.checked });
  };

  const deleteItem = (id: number) => {
    deleteProductMutation.mutate({ id })
  };

  return (
    <ShoppingListContext.Provider
      value={{
        addItem,
        deleteItem,
        toggleItemChecked,
        products,
        isLoading,
        isError,
        handlePreviuesPage,
        handleNextPage,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

// Hook para usar o contexto
export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error(
      "useShoppingList deve ser usado dentro de um ShoppingListProvider"
    );
  }
  return context;
};
