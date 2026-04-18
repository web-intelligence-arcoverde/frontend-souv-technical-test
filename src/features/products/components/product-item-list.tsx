"use client";

import { EmptyList } from "@/shared/ui/molecules/empty-list/empty-list";
import { useProductList } from "../hooks/use-product-list";
import { ProductItem } from "./product-item";
import { ProductProps } from "@/types/product";

interface ProductItemListProps {
  products?: ProductProps[];
  isLoading?: boolean;
  isError?: boolean;
  isReadOnly?: boolean;
}

export const ProductItemList = ({
  products: externalProducts,
  isLoading: externalLoading,
  isError: externalError,
  isReadOnly = false,
}: ProductItemListProps) => {
  const { sortedProducts, isLoading, isError, toggleItemChecked, isEmpty } =
    useProductList(externalProducts);

  const finalLoading = externalLoading ?? isLoading;
  const finalError = externalError ?? isError;

  if (finalError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-primary font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">
          Erro ao carregar produtos
        </p>
      </div>
    );
  }

  if (finalLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-primary font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">
          Carregando Curadoria...
        </p>
      </div>
    );
  }

  if (isEmpty && !finalLoading) {
    return <EmptyList />;
  }

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <div className="w-full grid grid-cols-1 gap-4">
        {sortedProducts.map((item) => (
          <ProductItem
            key={`${item.id}-${item.name}`}
            {...item}
            toggleItemChecked={toggleItemChecked}
            isReadOnly={isReadOnly}
          />
        ))}
      </div>
    </div>
  );
};
