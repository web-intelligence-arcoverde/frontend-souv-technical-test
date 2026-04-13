"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetShoppingLists } from "@/hooks/use-get-shopping-lists";
import { CollectionCard } from "@/shared/ui/molecules/collection-card/collection-card";
import { EmptyShoppingList } from "@/shared/ui/molecules/empty-shopping-list/empty-shopping-list";
import { ErrorCardShoppingList } from "@/shared/ui/molecules/error-card-shopping-list/error-card-shopping-list";
import { SkeletonCardShoppingList } from "@/shared/ui/molecules/skeleton-card-shopping-list/skeleton-card-shopping-list";

const ITEMS_PER_PAGE = 6;

export const CollectionsGrid = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const {
    data: lists,
    isLoading,
    error,
  } = useGetShoppingLists(page, ITEMS_PER_PAGE);

  console.log("listas", lists);

  const isEmptyShoppingList = !lists || lists.length === 0;
  const isLastPage = lists && lists.length < ITEMS_PER_PAGE;

  const handleOpenList = (id: string) => {
    router.push(`/products?listId=${id}`);
  };

  const handleNextPage = () => {
    if (!isLastPage) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  if (isLoading) {
    return <SkeletonCardShoppingList />;
  }

  if (error) {
    return <ErrorCardShoppingList />;
  }

  if (isEmptyShoppingList && page === 1) {
    return <EmptyShoppingList />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {lists?.map((list) => (
          <CollectionCard
            key={list.id}
            {...list}
            onOpen={() => handleOpenList(list.id)}
          />
        ))}
      </div>

      {!isEmptyShoppingList && (
        <div className="flex items-center justify-center gap-4 py-8 border-t border-white/10 mt-4">
          <Button
            variant="ghost"
            onClick={handlePrevPage}
            disabled={page === 1}
            className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          <span className="text-white font-medium px-4 py-2 bg-white/5 rounded-full border border-white/10 min-w-[100px] text-center">
            Página {page}
          </span>

          <Button
            variant="ghost"
            onClick={handleNextPage}
            disabled={isLastPage}
            className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30"
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
