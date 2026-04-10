"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CollectionCard } from "@/shared/ui/molecules/collection-card/collection-card";
import { useGetShoppingLists } from "@/hooks/use-get-shopping-lists";
import { SkeletonCardShoppingList } from "@/shared/ui/molecules/skeleton-card-shopping-list/skeleton-card-shopping-list";
import { ErrorCardShoppingList } from "@/shared/ui/molecules/error-card-shopping-list/error-card-shopping-list";
import { EmptyShoppingList } from "@/shared/ui/molecules/empty-shopping-list/empty-shopping-list";

export const CollectionsGrid = () => {
  const router = useRouter();
  const { data: lists, isLoading, error } = useGetShoppingLists();

  const isEmptyShoppingList = !lists || lists.length === 0;

  const handleOpenList = (id: string) => {
    router.push(`/products?listId=${id}`);
  };

  if (isLoading) {
    return <SkeletonCardShoppingList />;
  }

  if (error) {
    return <ErrorCardShoppingList />;
  }

  if (isEmptyShoppingList) {
    return <EmptyShoppingList />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {lists.map((list) => (
        <CollectionCard
          key={list.id}
          {...list}
          onOpen={() => handleOpenList(list.id)}
        />
      ))}
    </div>
  );
};
