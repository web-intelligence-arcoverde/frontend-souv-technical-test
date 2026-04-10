"use client";

import { useGetShoppingListDetail } from "@/hooks/use-get-shopping-list-detail";
import { ProductItemList } from "@/shared/ui/organisms/product-item-list/product-item-list";

const SharedShoppingList = ({ listId }: { listId: string }) => {
  console.log(listId);

  const { data, isLoading } = useGetShoppingListDetail(listId);

  return (
    <ProductItemList
      products={data?.items || []}
      isLoading={isLoading}
      handleNextPage={() => {}}
      handlePreviuesPage={() => {}}
    />
  );
};

export default SharedShoppingList;
