"use client";

import { useShoppingList } from "@/app/providers/shopping-list-provider";
import {
  ItemProps,
  ProductItem,
} from "../../molecules/product-item/product-item";
import { EmptyList } from "../../molecules/empty-list/empty-list";
import { Spinner } from "../../atoms/loading/loading";

import { PaginationProductList } from "../pagination/pagination";

const sortProducts = (products: ItemProps[]): ItemProps[] => {
  return [...products].sort((a, b) => Number(a.checked) - Number(b.checked));
};

export const ProductItemList = () => {
  if (false) {
    return <Spinner size="large" className="text-white" />;
  }

  if ([].length === 0) {
    return <EmptyList />;
  }

  return (
    <div className="flex flex-col gap-3 mt-[40px] w-full items-center">
      {[].map((item) => (
        <ProductItem key={`${item.id}-${item.name}`} {...item} />
      ))}
      <PaginationProductList
        currentPage={1}
        handleNextPage={() => {}}
        handlePreviuesPage={() => {}}
      />
    </div>
  );
};
