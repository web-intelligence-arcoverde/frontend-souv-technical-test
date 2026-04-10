"use client";

import {
  ItemProps,
  ProductItem,
} from "../../molecules/product-item/product-item";
import { EmptyList } from "../../molecules/empty-list/empty-list";

import { PaginationProductList } from "../pagination/pagination";

const sortProducts = (products: ItemProps[]): ItemProps[] => {
  return [...products].sort((a, b) => Number(a.checked) - Number(b.checked));
};

interface PaginatedProducts {
  data: ItemProps[];
  currentPage: number;
  totalPages: number;
}

export const ProductItemList = ({
  products,
  isLoading,
  handleNextPage,
  handlePreviuesPage,
  isReadOnly = false,
}: {
  products: ItemProps[] | PaginatedProducts;
  isLoading: boolean;
  handleNextPage: () => void;
  handlePreviuesPage: () => void;
  isReadOnly?: boolean;
}) => {
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

  const productData = Array.isArray(products) ? products : products.data;
  const currentPage = Array.isArray(products) ? 1 : products.currentPage;

  if (!productData || productData.length === 0) {
    return <EmptyList />;
  }

  const sortedProducts = sortProducts(productData);

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <div className="w-full grid grid-cols-1 gap-4">
        {sortedProducts.map((item) => (
          <ProductItem key={`${item.id}-${item.name}`} {...item} isReadOnly={isReadOnly} />
        ))}
      </div>

      {!isReadOnly && (
        <div className="mt-8 pt-8 border-t border-white/5 w-full">
          <PaginationProductList
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePreviuesPage={handlePreviuesPage}
          />
        </div>
      )}
    </div>
  );
};
