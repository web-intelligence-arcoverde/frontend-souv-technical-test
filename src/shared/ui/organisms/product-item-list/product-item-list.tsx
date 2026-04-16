"use client";

import { EmptyList } from "../../molecules/empty-list/empty-list";
import { ProductItem } from "../../molecules/product-item/product-item";
import { useSearchParams } from "next/navigation";

import { ProductProps } from "@/types/product";
import { useGetShoppingListDetail } from "@/features/shopping-list";
import { useUpdateProductChecked } from "@/hooks/use-update-checked-product";

const sortProducts = (products: ProductProps[]): ProductProps[] => {
  return [...products].sort((a, b) => Number(a.checked) - Number(b.checked));
};

export const ProductItemList = () => {
  const searchParams = useSearchParams();

  const listId = searchParams.get("listId");

  const { data, isLoading, isError } = useGetShoppingListDetail(listId);

  const updateProductCheckedMutation = useUpdateProductChecked();

  const toggleItemChecked = (id: string) => {
    if (!listId || !data) return;
    const findProduct = data.items.find((item: ProductProps) => item.id === id);
    if (!findProduct) return;

    updateProductCheckedMutation.mutate({
      id,
      listId,
      checked: !findProduct.checked,
    });
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-primary font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">
          Erro ao carregar produtos
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-primary font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">
          Carregando Curadoria...
        </p>
      </div>
    );
  }

  const productData =
    data?.items && Array.isArray(data.items) ? data.items : [];

  if (!productData || productData.length === 0) {
    return <EmptyList />;
  }

  const sortedProducts = sortProducts(productData);

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <div className="w-full grid grid-cols-1 gap-4">
        {sortedProducts.map((item) => (
          <ProductItem
            key={`${item.id}-${item.name}`}
            {...item}
            toggleItemChecked={toggleItemChecked}
          />
        ))}
      </div>

      {/*!isReadOnly && (
        <div className="mt-8 pt-8 border-t border-white/5 w-full">
          <PaginationProductList
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePreviuesPage={handlePreviuesPage}
          />
        </div>
      )*/}
    </div>
  );
};
