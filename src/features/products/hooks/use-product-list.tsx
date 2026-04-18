"use client";

import { useSearchParams } from "next/navigation";
import { ProductProps } from "@/types/product";
import { useGetShoppingListDetail } from "@/features/shopping-list";
import { useUpdateProductChecked } from "@/hooks/use-update-checked-product";

const sortProducts = (products: ProductProps[]): ProductProps[] => {
  return [...products].sort((a, b) => Number(a.checked) - Number(b.checked));
};

export const useProductList = (externalProducts?: ProductProps[]) => {
  const searchParams = useSearchParams();
  const listId = searchParams.get("listId");

  const { data, isLoading, isError } = useGetShoppingListDetail(externalProducts ? null : listId);
  const updateProductCheckedMutation = useUpdateProductChecked();

  const toggleItemChecked = (id: string) => {
    if (externalProducts) return; // Prevent toggle in read-only/external mode if desired
    if (!listId || !data) return;
    const findProduct = data.items.find((item: ProductProps) => item.id === id);
    if (!findProduct) return;

    updateProductCheckedMutation.mutate({
      id,
      listId,
      checked: !findProduct.checked,
    });
  };

  const productData = externalProducts || (data?.items && Array.isArray(data.items) ? data.items : []);
  const sortedProducts = sortProducts(productData);

  return {
    sortedProducts,
    isLoading: externalProducts ? false : isLoading,
    isError: externalProducts ? false : isError,
    toggleItemChecked,
    isEmpty: productData.length === 0 && !isLoading && !isError,
  };
};
